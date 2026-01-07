import type BaseQuotePerson from "./base-quote-person";

export default class DiscordQuotePerson implements BaseQuotePerson {
	get name() {
		return "Person";
	}

	async save() {
		return {
			type: "other",
		};
	}
}
