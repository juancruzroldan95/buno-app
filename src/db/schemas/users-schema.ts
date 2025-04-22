import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { clientsTable } from "./clients-schema";
import { timestamps } from "./columns-helpers";
import { lawyersTable } from "./lawyers-schema";
import { rolesCatalog } from "./roles-schema";

export const usersTable = pgTable("users_table", {
  uid: text("uid").primaryKey().notNull(),
  email: text("email").unique(),
  displayName: text("display_name"),
  photoURL: text("photo_url"),
  roleId: integer("role_id").references(() => rolesCatalog.roleId),
  ...timestamps,
});

export const usersTableRelations = relations(usersTable, ({ one }) => ({
  lawyer: one(lawyersTable),
  client: one(clientsTable),
  role: one(rolesCatalog, {
    fields: [usersTable.roleId],
    references: [rolesCatalog.roleId],
  }),
}));

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
