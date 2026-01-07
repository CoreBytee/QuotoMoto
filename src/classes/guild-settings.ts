import type { DatabaseSchema } from "../types/database-schema";
import type Database from "./database";

export default class GuildSettings {
	database: Database<DatabaseSchema>;
	id: string;
	constructor(database: Database<DatabaseSchema>, id: string) {
		this.database = database;
		this.id = id;
		this.init();
	}

	private async init() {
		await this.database
			.insertInto("guildSettings")
			.values({ id: this.id })
			.onConflict((oc) => oc.doNothing())
			.execute();
	}

	async get() {
		return await this.database
			.selectFrom("guildSettings")
			.where("id", "=", this.id)
			.select("guildSettings.quoteChannelId")
			.executeTakeFirstOrThrow();
	}

	async getQuoteChannel() {
		const { quoteChannelId } = await this.database
			.selectFrom("guildSettings")
			.where("id", "=", this.id)
			.select("quoteChannelId")
			.executeTakeFirstOrThrow();

		return quoteChannelId;
	}

	async setQuoteChannel(quoteChannelId: string | null) {
		await this.database
			.updateTable("guildSettings")
			.set({ quoteChannelId })
			.where("id", "=", this.id)
			.execute();
	}
}
