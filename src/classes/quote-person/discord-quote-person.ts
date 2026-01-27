import type AbstractQuotePerson from "./abstract-quote-person";

export default class DiscordQuotePerson implements AbstractQuotePerson {
	get name() {
		return "DiscordUser";
	}

	async save() {
		return {
			type: "other",
		};
	}
}
