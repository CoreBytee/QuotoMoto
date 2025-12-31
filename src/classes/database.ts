import { Database as SQLite } from "bun:sqlite";
import { relative } from "node:path";
import type { Migration } from "kysely";
import { CamelCasePlugin, Kysely, Migrator } from "kysely";
import { BunSqliteDialect } from "kysely-bun-sqlite";
import { isProduction } from "../utility/is-production";

export type NamedMigration = {
	name: string;
} & Migration;

export default class Database<Schema> extends Kysely<Schema> {
	static connect<Schema>(file: string) {
		return new Kysely<Schema>({
			plugins: [new CamelCasePlugin()],
			dialect: new BunSqliteDialect({
				database: new SQLite(file),
			}),
		});
	}

	static async migrate(file: string, migrations: NamedMigration[]) {
		const database = Database.connect(file);
		const migrator = new Migrator({
			db: database,
			provider: {
				getMigrations: async () => {
					return Object.fromEntries(
						migrations.map((migration) => [migration.name, migration]),
					);
				},
			},
		});

		const available = await migrator.getMigrations();
		const pending = available.filter((migration) => !migration.executedAt);
		if (pending.length === 0) return database;

		if (!isProduction) {
			alert(
				`The following migrations are pending (./${relative(".", file)}):\n${pending.map((migration) => ` - ${migration.name}`).join("\n")}\nDo you want to execute them?`,
			);
		}

		for (const migration of pending) {
			const migrationName = migration.name;
			const result = await migrator.migrateTo(migration.name);
			if (result.error) {
				console.error(`Migration to ${migrationName} failed`);
				console.error(result.error);
				process.exit(1);
			}
			console.info(`Migrated to ${migrationName}`);
		}

		return database;
	}
}
