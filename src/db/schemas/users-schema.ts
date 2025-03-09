import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";

export const usersTable = pgTable("users_table", {
  userId: uuid("user_id").defaultRandom().primaryKey(),
  username: text("username"),
  email: text("email").notNull().unique(),
  roleId: integer("role_id").notNull(),
  ...timestamps,
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
