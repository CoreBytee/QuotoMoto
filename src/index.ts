import Database from "./classes/database";
import Quote from "./classes/quote";
import QuotoMoto from "./classes/quotomoto";
import { migrations } from "./migrations";

await Database.migrate("quotomoto.db", migrations);

new Quote().render();

new QuotoMoto();
