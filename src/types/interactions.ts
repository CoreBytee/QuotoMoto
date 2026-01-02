import type {
	ChatInputCommandInteraction,
	InteractionType,
	MessageComponentInteraction,
	SlashCommandBuilder,
	SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export type DeployableInteraction<Custom> =
	| DeployableCommandInteraction<Custom>
	| DeployableMessageComponentInteraction<Custom>;

interface BaseDeployableInteraction<Custom, Interaction> {
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: Allow to return early in handler
	handle: (custom: Custom, interaction: Interaction) => any;
}

export interface DeployableCommandInteraction<Custom>
	extends BaseDeployableInteraction<Custom, ChatInputCommandInteraction> {
	type: InteractionType.ApplicationCommand;
	data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
}

export interface DeployableMessageComponentInteraction<Custom>
	extends BaseDeployableInteraction<Custom, MessageComponentInteraction> {
	type: InteractionType.MessageComponent;
}
