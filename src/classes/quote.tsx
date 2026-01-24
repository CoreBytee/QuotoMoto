import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { fonts } from "src/constants/fonts";
import QuoteTemplate from "src/templates/quote-template";
import type BaseQuotePerson from "./quote-person/base-quote-person";
import DiscordQuotePerson from "./quote-person/discord-quote-person";

export default class Quote {
	quote: string;
	person: BaseQuotePerson;
	date: Date;
	background: string;

	constructor() {
		this.quote =
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

		this.person = new DiscordQuotePerson();
		this.date = new Date();
		this.background = "framea47.png";
	}

	async render() {
		const start = Date.now();
		const frame = await Bun.file(
			join(import.meta.dir, "../..", "backgrounds", this.background),
		).bytes();

		const svg = await satori(
			<QuoteTemplate
				quote={this.quote}
				person={this.person.name}
				year={this.date.getFullYear()}
				background={Buffer.from(frame).toString("base64")}
			/>,
			{
				width: 1920,
				height: 1080,
				fonts: fonts,
			},
		);

		console.log(`Satori in ${Date.now() - start}ms`);

		await Bun.write("./test.svg", svg);

		const resvg = new Resvg(svg, { fitTo: { mode: "original" } });
		const pngData = resvg.render();
		const pngBuffer = pngData.asPng();

		await Bun.write("./test.png", pngBuffer);
		console.log(`Rendered in ${Date.now() - start}ms`);
	}
}
