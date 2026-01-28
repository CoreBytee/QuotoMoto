import QuotoMoto from "../quotomoto";
import type AbstractQuoteTarget from "./abstract-quote-target";

export default class DiscordQuoteTarget implements AbstractQuoteTarget {
	type = "discord";
	identifier: string;
	constructor(identifier: string) {
		this.identifier = identifier;
	}

	async getName() {
		const user = await QuotoMoto.instance().discord.users.fetch(
			this.identifier,
		);

		return user.displayName;
	}
}
