import type { MaybePromise } from "bun";

export default abstract class AbstractQuoteTarget {
	abstract type: string;
	abstract identifier: string;

	abstract getName(): MaybePromise<string>;
}
