import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";

export const usersTable = pgTable("users_table", {
  uid: text("uid").primaryKey().notNull(),
  email: text("email").unique(),
  displayName: text("display_name"),
  photoURL: text("photo_url"),
  roleId: integer("role_id"),
  ...timestamps,
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
