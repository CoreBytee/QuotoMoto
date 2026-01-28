import { readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import {
	ContainerBuilder,
	type Guild,
	italic,
	MediaGalleryBuilder,
	type Message,
	MessageFlags,
	type TextChannel,
	TextDisplayBuilder,
	type User,
	userMention,
} from "discord.js";
import random from "just-random";
import satori from "satori";
import { fonts } from "src/constants/fonts";
import QuoteTemplate from "src/templates/quote-template";
import type { DatabaseSchema } from "src/types/database-schema";
import type Database from "./database";
import type AbstractQuoteTarget from "./quote-target/abstract-quote-target";

const BACKGROUNDS_DIRECTORY = join(import.meta.dir, "../..", "backgrounds");

const BACKGROUNDS = readdirSync(BACKGROUNDS_DIRECTORY).map((file) =>
	basename(file, ".png"),
);

export default class Quote {
	id: number | null = null;
	message: Message | null = null;

	quote: string;
	target: AbstractQuoteTarget;
	guild: Guild;
	quoter: User;

	date: Date;
	background: string;

	constructor(
		quote: string,
		target: AbstractQuoteTarget,
		guild: Guild,
		quoter: User,
	) {
		this.quote = quote;
		this.target = target;
		this.guild = guild;
		this.quoter = quoter;

		this.date = new Date();
		this.background = random(BACKGROUNDS)!;
	}

	get backgroundPath() {
		return join(BACKGROUNDS_DIRECTORY, `${this.background}.png`);
	}

	async render() {
		const frame = await Bun.file(this.backgroundPath).bytes();

		const svg = await satori(
			<QuoteTemplate
				quote={this.quote}
				target={await this.target.getName()}
				year={this.date.getFullYear()}
				background={Buffer.from(frame).toString("base64")}
			/>,
			{
				width: 1920,
				height: 1080,
				fonts: fonts,
			},
		);

		const resvg = new Resvg(svg, { fitTo: { mode: "original" } });
		const image = resvg.render();
		const png = image.asPng();

		return png;
	}

	async post(channel: TextChannel) {
		const image = await this.render();

		this.message = await channel.send({
			flags: [MessageFlags.IsComponentsV2],
			components: [
				new ContainerBuilder()
					.addTextDisplayComponents(
						new TextDisplayBuilder().setContent(`"${italic(this.quote)}"`),
					)
					.addTextDisplayComponents(
						new TextDisplayBuilder().setContent(
							`\\- ${
								this.target.type === "discord"
									? userMention(this.target.identifier)
									: this.target.identifier
							} ${this.date.getFullYear()}`,
						),
					)
					.addMediaGalleryComponents(
						new MediaGalleryBuilder().addItems((item) =>
							item
								.setDescription("Quote Image")
								.setURL("attachment://quote.png"),
						),
					),
			],
			files: [
				{
					attachment: Buffer.from(image),
					name: "quote.png",
				},
			],
		});
	}

	async save(database: Database<DatabaseSchema>) {
		if (!this.message) throw new Error("Cannot save quote without message");

		const result = await database
			.insertInto("quotes")
			.values({
				guildId: this.guild.id,
				channelId: this.message.channel.id,
				messageId: this.message.id,
				quoterId: this.quoter.id,
				targetType: this.target.type,
				targetId: this.target.identifier,
				quote: this.quote,
				backgroundId: this.background,
				date: Math.floor(this.date.getTime() / 1000),
			})
			.returning("id")
			.executeTakeFirstOrThrow();

		this.id = result.id;
	}
}
