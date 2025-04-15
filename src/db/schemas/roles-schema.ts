import { relations } from "drizzle-orm";
import { pgTable, serial } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";
import { roleEnum } from "./enums";
import { usersTable } from "./users-schema";

export const rolesCatalog = pgTable("roles_catalog", {
  roleId: serial("role_id").primaryKey(),
  roleName: roleEnum("role_name").notNull(),
  ...timestamps,
});

export const rolesCatalogRelations = relations(rolesCatalog, ({ many }) => ({
  users: many(usersTable),
}));

export type InsertRole = typeof rolesCatalog.$inferInsert;
export type SelectRole = typeof rolesCatalog.$inferSelect;
