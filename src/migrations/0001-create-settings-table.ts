import type Database from "../classes/database";

export const name = "0001-create-settings-table";

export async function up(db: Database<any>) {
	await db.schema
		.createTable("guildSettings")
		.addColumn("id", "text", (build) => build.notNull().primaryKey())
		.addColumn("quoteChannelId", "text", (build) => build)
		.execute();
}

export async function down(db: Database<any>) {
	await db.schema.dropTable("guildSettings").execute();
}
