import { type GuildMember, PermissionFlagsBits } from "discord.js";

export default function isPermitted(member: GuildMember) {
	const client = member.client;
	const application = client.application;

	return (
		member.id === application.owner?.id ||
		member.permissions.has(PermissionFlagsBits.Administrator)
	);
}
