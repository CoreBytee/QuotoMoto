import type AbstractQuotePerson from "./abstract-quote-person";

export default class OtherQuotePerson implements AbstractQuotePerson {
	get name() {
		return "[Random person]";
	}

	async save() {
		return {
			type: "other",
		};
	}
}
