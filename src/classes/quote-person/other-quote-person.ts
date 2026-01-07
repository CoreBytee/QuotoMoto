import type BaseQuotePerson from "./base-quote-person";

export default class OtherQuotePerson implements BaseQuotePerson {
	get name() {
		return "[Random person]";
	}

	async save() {
		return {
			type: "other",
		};
	}
}
