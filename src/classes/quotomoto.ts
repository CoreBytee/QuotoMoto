import { Client, GatewayIntentBits } from "discord.js";
import { DISCORD_BOT_TOKEN } from "../env";
import type { DatabaseSchema } from "../types/database-schema";
import Database from "./database";

export default class QuotoMoto {
	database: Database<DatabaseSchema>;
	discord: Client<boolean>;
	constructor() {
		this.database = Database.connect<DatabaseSchema>("quotomoto.db");

		this.discord = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
			],
		});

		this.discord.login(DISCORD_BOT_TOKEN);

		this.discord.on("clientReady", () => {
			console.info("QuotoMoto is online!");
		});
	}
}
