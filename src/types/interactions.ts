import type {
	CommandInteraction,
	InteractionType,
	MessageComponentInteraction,
	SlashCommandBuilder,
} from "discord.js";

export type DeployableInteraction<Custom> =
	| DeployableCommandInteraction<Custom>
	| DeployableMessageComponentInteraction<Custom>;

interface BaseDeployableInteraction<Custom, Interaction> {
	name: string;
	handle: (custom: Custom, interaction: Interaction) => void;
}

export interface DeployableCommandInteraction<Custom>
	extends BaseDeployableInteraction<Custom, CommandInteraction> {
	type: InteractionType.ApplicationCommand;
	data: SlashCommandBuilder;
}

export interface DeployableMessageComponentInteraction<Custom>
	extends BaseDeployableInteraction<Custom, MessageComponentInteraction> {
	type: InteractionType.MessageComponent;
}
