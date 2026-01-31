import type Database from "../classes/database";

export const name = "0003-add-context-column";

export async function up(db: Database<any>) {
	await db.schema
		.alterTable("quotes")
		.addColumn("context", "text", (col) => col)
		.execute();
}

export async function down(db: Database<any>) {
	await db.schema.alterTable("quotes").dropColumn("context").execute();
}
