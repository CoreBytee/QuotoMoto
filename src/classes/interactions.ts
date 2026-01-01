import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
	type Client,
	type Interaction,
	InteractionType,
	REST,
	Routes,
} from "discord.js";
import type { DeployableInteraction } from "../types/interactions";

export default class Interactions<Custom> {
	client: Client<boolean>;
	custom: Custom;
	interactions: DeployableInteraction<Custom>[];
	constructor(
		client: Client,
		custom: Custom,
		interactions: DeployableInteraction<Custom>[],
	) {
		this.client = client;
		this.custom = custom;
		this.interactions = interactions;
	}

	private get lockfile() {
		return join(import.meta.dir, "../..", "interactions.lock");
	}

	private readLock() {
		return readFileSync(this.lockfile, "utf-8");
	}

	private writeLock(content: string) {
		writeFileSync(this.lockfile, content, "utf-8");
	}

	private generateLock(data: string) {
		return Bun.hash(data).toString();
	}

	private hasChanged(data: string, update = false) {
		const newLock = this.generateLock(data);
		const oldLock = this.readLock().toString();
		if (newLock === oldLock) return false;
		if (update) this.writeLock(newLock);
		return true;
	}

	async deploy() {
		const data = this.interactions
			.filter(
				(interaction) =>
					interaction.type === InteractionType.ApplicationCommand,
			)
			.map((interaction) => interaction.data.toJSON());

		if (!this.hasChanged(JSON.stringify(data), true)) return;

		const rest = new REST().setToken(this.client.token!);
		await rest.put(Routes.applicationCommands(this.client.user!.id!), {
			body: data,
		});

		console.info(`Updated ${data.length} interactions`);
	}

	async handle(interaction: Interaction) {
		const name =
			"customId" in interaction
				? interaction.customId
				: interaction.commandName;

		const matched = this.interactions.find(
			(i) => i.name === name && i.type === interaction.type,
		);

		if (!matched) {
			console.warn(`No handler found for interaction: ${name}`);
			return;
		}

		// biome-ignore lint/suspicious/noExplicitAny: We need to cast here
		matched.handle(this.custom, interaction as any);
	}
}
