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
}
