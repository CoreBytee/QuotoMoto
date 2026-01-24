import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import type BaseQuotePerson from "./quote-person/base-quote-person";
import DiscordQuotePerson from "./quote-person/discord-quote-person";

export default class Quote {
	quote: string;
	person: BaseQuotePerson;
	date: Date;

	constructor() {
		this.quote =
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

		this.person = new DiscordQuotePerson();
		this.date = new Date();
	}

	async render() {
		const frame = await Bun.file(
			join(import.meta.dir, "../..", "frames", "framea47.png"),
		).bytes();

		const svg = await satori(
			<div
				style={{
					width: "100%",
					height: "100%",
					backgroundImage: `url("data:image/png;base64,${frame.toBase64()}")`,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{/* Main Content */}
				<div
					style={{
						padding: 100,
						height: "95%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<p
						style={{
							fontFamily: "Rubik",
							fontSize: 64,
							fontWeight: 900,
							color: "white",
							textShadow: "2px 2px 30px rgba(0, 0, 0, 1)",
							textAlign: "center",
						}}
					>
						"{this.quote}"
					</p>

					<p
						style={{
							fontFamily: "Rubik",
							fontSize: 45,
							fontWeight: 500,
							color: "white",
							textShadow: "2px 2px 10px rgba(0, 0, 0, 1)",
							textAlign: "center",
						}}
					>
						{this.person.name} {this.date.getFullYear()}
					</p>
				</div>
				{/* Credit Footer */}
				<div
					style={{
						display: "flex",
						height: "5%",
						padding: 5,
					}}
				>
					<p
						style={{
							fontFamily: "Rubik",
							color: "white",
							fontSize: 24,
							fontWeight: 500,
							textShadow: "2px 2px 5px rgba(0, 0, 0, 1)",
						}}
					>
						Quote saved using QuotoMoto Discord Bot
					</p>
				</div>
			</div>,
			{
				width: 1920,
				height: 1080,
				fonts: [
					{
						name: "Rubik",
						data: await Bun.file(
							(
								await import(
									"@fontsource/rubik/files/rubik-latin-400-normal.woff"
								)
							).default,
						).arrayBuffer(),
						style: "normal",
						weight: 400,
					},
					{
						name: "Rubik",
						data: await Bun.file(
							(
								await import(
									"@fontsource/rubik/files/rubik-latin-500-normal.woff"
								)
							).default,
						).arrayBuffer(),
						style: "normal",
						weight: 500,
					},
					{
						name: "Rubik",
						data: await Bun.file(
							(
								await import(
									"@fontsource/rubik/files/rubik-latin-600-normal.woff"
								)
							).default,
						).arrayBuffer(),
						style: "normal",
						weight: 600,
					},
					{
						name: "Rubik",
						data: await Bun.file(
							(
								await import(
									"@fontsource/rubik/files/rubik-latin-700-normal.woff"
								)
							).default,
						).arrayBuffer(),
						style: "normal",
						weight: 700,
					},
					{
						name: "Rubik",
						data: await Bun.file(
							(
								await import(
									"@fontsource/rubik/files/rubik-latin-800-normal.woff"
								)
							).default,
						).arrayBuffer(),
						style: "normal",
						weight: 800,
					},
					{
						name: "Rubik",
						data: await Bun.file(
							(
								await import(
									"@fontsource/rubik/files/rubik-latin-900-normal.woff"
								)
							).default,
						).arrayBuffer(),
						style: "normal",
						weight: 900,
					},
				],
			},
		);

		Bun.write("./test.svg", svg);

		const resvg = new Resvg(svg, { fitTo: { mode: "original" } });
		const pngData = resvg.render();
		const pngBuffer = pngData.asPng();

		Bun.write("./test.png", pngBuffer);
	}
}
