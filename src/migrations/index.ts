import type { NamedMigration } from "../classes/database";

export const migrations: NamedMigration[] = [
	await import("./0001-create-settings-table"),
	await import("./0002-create-quotes-table"),
];
