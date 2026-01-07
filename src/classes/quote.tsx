import { join } from "node:path";
import fontNormal from "@fontsource/libre-baskerville/files/libre-baskerville-latin-400-normal.woff";
import fontItalic from "@fontsource/libre-baskerville/files/libre-baskerville-latin-700-italic.woff";
import satori from "satori";
import type BaseQuotePerson from "./quote-person/base-quote-person";
import DiscordQuotePerson from "./quote-person/discord-quote-person";

export default class Quote {
	quote: string;
	person: BaseQuotePerson;

	constructor() {
		this.quote = "Quote";

		this.person = new DiscordQuotePerson();
	}

	async render() {
		const frame = await Bun.file(
			join(import.meta.dir, "../..", "frames", "frame.png"),
		).bytes();

		const svg = await satori(
			<div
				style={{
					width: "100%",
					height: "100%",
					backgroundImage: `url("data:image/png;base64,${frame.toBase64()}")`,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					padding: 100,
				}}
			>
				<p
					style={{
						fontFamily: "Libre Baskerville",
						fontSize: 64,
						fontStyle: "italic",
						fontWeight: 700,
						color: "white",
						textShadow: "2px 2px 10px rgba(0, 0, 0, 1)",
						textAlign: "center",
					}}
				>
					"{this.quote}"
				</p>

				<p
					style={{
						fontFamily: "Libre Baskerville",
						fontSize: 32,
						fontStyle: "italic",
						color: "white",
						textShadow: "2px 2px 10px rgba(0, 0, 0, 1)",
						textAlign: "center",
					}}
				>
					- {this.person.name}
				</p>
			</div>,
			{
				width: 1920,
				height: 1080,
				fonts: [
					{
						name: "Libre Baskerville",
						data: await Bun.file(fontItalic).arrayBuffer(),
						style: "italic",
						weight: 700,
					},
					{
						name: "Libre Baskerville",
						data: await Bun.file(fontNormal).arrayBuffer(),
						style: "normal",
						weight: 400,
					},
				],
			},
		);

		Bun.write("./test.svg", svg);
	}
}
