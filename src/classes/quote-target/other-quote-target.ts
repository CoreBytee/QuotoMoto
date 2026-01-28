import type AbstractQuoteTarget from "./abstract-quote-target";

export default class OtherQuoteTarget implements AbstractQuoteTarget {
	type = "other";
	identifier: string;
	constructor(identifier: string) {
		this.identifier = identifier;
	}

	getName() {
		return this.identifier;
	}
}
