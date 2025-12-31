import { Client, GatewayIntentBits } from "discord.js";
import { DISCORD_BOT_TOKEN } from "../env";

export default class QuotoMoto {
	discord: Client<boolean>;
	constructor() {
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
