import type { NamedMigration } from "../classes/database";

export const migrations: NamedMigration[] = [
	await import("./0001-create-settings-table"),
];
