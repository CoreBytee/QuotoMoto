import {
	bold,
	type ChatInputCommandInteraction,
	InteractionContextType,
	InteractionType,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";
import Quote from "src/classes/quote";
import DiscordQuoteTarget from "src/classes/quote-target/discord-quote-target";
import OtherQuoteTarget from "src/classes/quote-target/other-quote-target";
import type QuotoMoto from "../../classes/quotomoto";

export const name = "quote";
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
			)
			.addStringOption((builder) =>
				builder
					.setName("context")
					.setDescription(
						"Add a little bit of context to make it even funnier",
					),
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
			)
			.addStringOption((builder) =>
				builder
					.setName("context")
					.setDescription(
						"Add a little bit of context to make it even funnier",
					),
			),
	);

export async function handle(
	quotomoto: QuotoMoto,
	interaction: ChatInputCommandInteraction,
) {
	if (!interaction.inGuild() || !interaction.guild) return;

	const guild = quotomoto.getGuild(interaction.guildId);
	if (!guild) throw new Error("Guild not found");

	const channel = await guild.getQuoteChannel();
	if (!channel)
		return interaction.reply({
			content: `Quote channel is not set. Please ask an administrator to set it using ${bold("/settings setchannel")}.`,
			flags: [MessageFlags.Ephemeral],
		});

	const subCommand = interaction.options.getSubcommand();

	const quote = new Quote(
		interaction.options.getString("quote", true),
		interaction.options.getString("context") ?? null,
		subCommand === "here"
			? new DiscordQuoteTarget(interaction.options.getUser("person", true).id)
			: new OtherQuoteTarget(interaction.options.getString("person", true)),
		interaction.guild,
		interaction.user,
	);

	await quote.post(channel);
	await quote.save(quotomoto.database);

	return interaction.reply({
		content: `Quote saved successfully! You can view it here: ${quote.message!.url}`,
		flags: [MessageFlags.Ephemeral],
	});
}
