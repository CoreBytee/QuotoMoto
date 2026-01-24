import type { Font } from "satori";

export const fonts = [
	{
		name: "Rubik",
		data: await Bun.file(
			(await import("@fontsource/rubik/files/rubik-latin-400-normal.woff"))
				.default,
		).arrayBuffer(),
		style: "normal",
		weight: 400,
	},
	{
		name: "Rubik",
		data: await Bun.file(
			(await import("@fontsource/rubik/files/rubik-latin-500-normal.woff"))
				.default,
		).arrayBuffer(),
		style: "normal",
		weight: 500,
	},
	{
		name: "Rubik",
		data: await Bun.file(
			(await import("@fontsource/rubik/files/rubik-latin-600-normal.woff"))
				.default,
		).arrayBuffer(),
		style: "normal",
		weight: 600,
	},
	{
		name: "Rubik",
		data: await Bun.file(
			(await import("@fontsource/rubik/files/rubik-latin-700-normal.woff"))
				.default,
		).arrayBuffer(),
		style: "normal",
		weight: 700,
	},
	{
		name: "Rubik",
		data: await Bun.file(
			(await import("@fontsource/rubik/files/rubik-latin-800-normal.woff"))
				.default,
		).arrayBuffer(),
		style: "normal",
		weight: 800,
	},
	{
		name: "Rubik",
		data: await Bun.file(
			(await import("@fontsource/rubik/files/rubik-latin-900-normal.woff"))
				.default,
		).arrayBuffer(),
		style: "normal",
		weight: 900,
	},
] as Font[];
