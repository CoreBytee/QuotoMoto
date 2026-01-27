import Database from "./classes/database";
import QuotoMoto from "./classes/quotomoto";
import { migrations } from "./migrations";

await Database.migrate("quotomoto.db", migrations);

new QuotoMoto();
