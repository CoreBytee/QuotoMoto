import type Database from "../classes/database";

export const name = "0002-create-quotes-table";

export async function up(db: Database<any>) {
	await db.schema
		.createTable("quotes")
		.addColumn("id", "integer", (build) =>
			build.notNull().primaryKey().autoIncrement(),
		)
		.addColumn("guildId", "text", (build) => build.notNull())
		.addColumn("channelId", "text", (build) => build.notNull())
		.addColumn("messageId", "text", (build) => build.notNull())
		.addColumn("quoterId", "text", (build) => build.notNull())
		.addColumn("targetType", "text", (build) => build.notNull())
		.addColumn("targetId", "text", (build) => build.notNull())
		.addColumn("quote", "text", (build) => build.notNull())
		.addColumn("backgroundId", "text", (build) => build.notNull())
		.addColumn("date", "integer", (build) => build.notNull())
		.execute();
}

export async function down(db: Database<any>) {
	await db.schema.dropTable("quotes").execute();
}
