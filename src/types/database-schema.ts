import type { Generated } from "kysely";

export type DatabaseSchema = {
	guildSettings: {
		id: string;
		quoteChannelId: string | null;
	};
	quotes: {
		id: Generated<number>;
		guildId: string;
		channelId: string;
		messageId: string;
		quoterId: string;
		targetType: string;
		targetId: string;
		quote: string;
		backgroundId: string;
		date: number;
	};
};
