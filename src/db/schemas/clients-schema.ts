import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";
import { genderEnum } from "./enums";

export const clientsTable = pgTable("clients_table", {
  clientId: uuid("client_id").defaultRandom().primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").unique(),
  phone: text("phone"),
  profilePicture: text("profile_picture"),
  gender: genderEnum("gender"),
  uid: text("uid").notNull(),
  ...timestamps,
});

export type InsertClient = typeof clientsTable.$inferInsert;
export type SelectClient = typeof clientsTable.$inferSelect;
