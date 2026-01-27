import { readdir, rename } from "node:fs/promises";
import { join } from "node:path";

const directory = join(import.meta.dir, "../backgrounds");

const names = await readdir(directory);
const files = names.map((name) => join(directory, name));

for (const file of files) {
	const content = await Bun.file(file).bytes();
	const hash = Bun.hash(content);
	await rename(file, join(directory, `${hash}.png`));
	console.log(`${file}: ${hash}`);
}
