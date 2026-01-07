import {
	bold,
	type ChatInputCommandInteraction,
	InteractionContextType,
	InteractionType,
	italic,
	SlashCommandBuilder,
	userMention,
} from "discord.js";
import type QuotoMoto from "../../classes/quotomoto";

export const name = "savequote";
export const type = InteractionType.ApplicationCommand;

export const data = new SlashCommandBuilder()
	.setName(name)
	.setDescription("Quote someone")
	.setContexts([InteractionContextType.Guild])
	.addSubcommand((sub) =>
		sub
			.setName("here")
			.setDescription("Quote someone from this discord")
			.addUserOption((builder) =>
				builder
					.setName("person")
					.setDescription("The person to quote")
					.setRequired(true),
			)
			.addStringOption((builder) =>
				builder
					.setName("quote")
					.setDescription("The quote to save")
					.setRequired(true),
			),
	)
	.addSubcommand((sub) =>
		sub
			.setName("elsewhere")
			.setDescription("Quote someone from outside this discord")
			.addStringOption((builder) =>
				builder
					.setName("person")
					.setDescription("The person to quote")
					.setRequired(true),
			)
			.addStringOption((builder) =>
				builder
					.setName("quote")
					.setDescription("The quote to save")
					.setRequired(true),
			),
	);

export async function handle(
	quotomoto: QuotoMoto,
	interaction: ChatInputCommandInteraction,
) {
	if (!interaction.inGuild()) return;

	const guild = quotomoto.getGuild(interaction.guildId);
	if (!guild) throw new Error("Guild not found");

	const channel = await guild.getQuoteChannel();
	if (!channel) return;

	switch (interaction.options.getSubcommand()) {
		case "here": {
			const person = interaction.options.getUser("person", true);
			const quote = interaction.options.getString("quote", true);

			channel.send(
				`${italic(quote)}\n\\- ${userMention(person.id)} ${new Date().getFullYear()}`,
			);

			break;
		}
		case "elsewhere": {
			const person = interaction.options.getString("person", true);
			const quote = interaction.options.getString("quote", true);

			channel.send(
				`${italic(quote)}\n\\- ${bold(person)} ${new Date().getFullYear()}`,
			);

			break;
		}
	}
}
