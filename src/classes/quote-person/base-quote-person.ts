import type { JSONValue } from "../../types/json-value";

export default abstract class BaseQuotePerson {
	abstract name: string;

	abstract save(): Promise<JSONValue>;
}
