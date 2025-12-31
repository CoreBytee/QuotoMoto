import { env } from "bun";

export const isProduction = env.NODE_ENV === "production";
