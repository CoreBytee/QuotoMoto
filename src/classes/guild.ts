import type { Guild } from "discord.js";
import GuildSettings from "./guild-settings";
import type QuotoMoto from "./quotomoto";

export default class QuotoMotoGuild {
	quotomoto: QuotoMoto;
	guild: Guild;
	settings: GuildSettings;
	constructor(quotomoto: QuotoMoto, guild: Guild) {
		this.quotomoto = quotomoto;
		this.guild = guild;
		this.settings = new GuildSettings(this.quotomoto.database, this.id);
	}

	get id() {
		return this.guild.id;
	}

	async getQuoteChannel() {
		const channelId = await this.settings.getQuoteChannel();
		if (!channelId) return null;

		const channel = await this.guild.channels.fetch(channelId);
		if (!channel) return null;

		if (!channel.isTextBased()) return null;
		if (!channel.isSendable()) return null;

		return channel;
	}
}
