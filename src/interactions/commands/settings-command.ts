import {
	ChannelType,
	type ChatInputCommandInteraction,
	type GuildMember,
	InteractionContextType,
	InteractionType,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";
import type QuotoMoto from "../../classes/quotomoto";
import isPermitted from "../../utility/is-permitted";

export const name = "settings";
export const type = InteractionType.ApplicationCommand;

export const data = new SlashCommandBuilder()
	.setName(name)
	.setDescription("Configure QuotoMoto settings")
	.setContexts([InteractionContextType.Guild])
	.addSubcommand((sub) =>
		sub.setName("view").setDescription("View the current settings"),
	)
	.addSubcommand((sub) =>
		sub
			.setName("setchannel")
			.setDescription("Set the channel where quotes appear"),
	);

export async function handle(
	quotomoto: QuotoMoto,
	interaction: ChatInputCommandInteraction,
) {
	if (!interaction.inGuild()) return;

	if (!isPermitted(interaction.member as GuildMember))
		return interaction.reply({
			content: "You do not have permission to use this command.",
			flags: [MessageFlags.Ephemeral],
		});

	const guild = quotomoto.getGuild(interaction.guildId);
	if (!guild) throw new Error("Guild not found");

	switch (interaction.options.getSubcommand()) {
		case "view": {
			const settings = await guild.settings.get();
			await interaction.reply({
				content: `Current quote channel: ${
					settings.quoteChannelId
						? `<#${settings.quoteChannelId}>`
						: "`Not set`"
				}`,
				flags: [MessageFlags.Ephemeral],
			});
			break;
		}
		case "setchannel": {
			const channel = interaction.channel;
			if (channel?.type !== ChannelType.GuildText)
				return interaction.reply({
					content: "The quote channel can only be set to a text channel.",
					flags: [MessageFlags.Ephemeral],
				});

			guild.settings.setQuoteChannel(interaction.channelId);
			await interaction.reply({
				content: `Set quote channel to <#${interaction.channelId}>`,
				flags: [MessageFlags.Ephemeral],
			});
			break;
		}
	}
}
