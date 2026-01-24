import type BaseQuotePerson from "./base-quote-person";

export default class DiscordQuotePerson implements BaseQuotePerson {
	get name() {
		return "DiscordUser";
	}

	async save() {
		return {
			type: "other",
		};
	}
}
