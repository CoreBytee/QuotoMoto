import { Client, GatewayIntentBits, type Guild } from "discord.js";
import { DISCORD_BOT_TOKEN } from "../env";
import { interactions } from "../interactions";
import type { DatabaseSchema } from "../types/database-schema";
import Database from "./database";
import QuotoMotoGuild from "./guild";
import Interactions from "./interactions";

export default class QuotoMoto {
	database: Database<DatabaseSchema>;
	discord: Client<boolean>;
	interactions: Interactions<QuotoMoto>;
	guilds: QuotoMotoGuild[] = [];
	constructor() {
		this.database = Database.connect<DatabaseSchema>("quotomoto.db");

		this.discord = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
			],
		});

		console.info("Logging in to discord");
		this.discord.login(DISCORD_BOT_TOKEN);

		this.interactions = new Interactions<QuotoMoto>(
			this.discord,
			this,
			interactions,
		);

		this.discord.on("clientReady", async () => {
			console.info("QuotoMoto is online!");
			await this.interactions.deploy();
		});

		this.discord.on("interactionCreate", async (interaction) => {
			await this.interactions.handle(interaction);
		});

		this.discord.on("guildAvailable", (guild) => {
			this.loadGuild(guild);
		});

		this.discord.on("guildUnavailable", (guild) => {
			this.unloadGuild(guild);
		});
	}

	getGuild(id: string) {
		return this.guilds.find((g) => g.id === id);
	}

	loadGuild(guild: Guild) {
		console.info(`Loading guild ${guild.id} "${guild.name}"`);
		this.guilds.push(new QuotoMotoGuild(this, guild));
	}

	unloadGuild(guild: Guild) {
		console.info(`Unloading guild ${guild.id} "${guild.name}"`);
		this.guilds = this.guilds.filter((g) => g.id !== guild.id);
	}
}
