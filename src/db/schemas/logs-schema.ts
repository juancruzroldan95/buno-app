import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";

export const logsTable = pgTable("logs_table", {
  logId: uuid("log_id").defaultRandom().primaryKey(),
  eventName: text("event_name").notNull(),
  uid: text("uid").notNull(),
  ...timestamps,
});
