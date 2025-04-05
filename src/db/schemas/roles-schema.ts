import { pgTable, serial } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";
import { roleEnum } from "./enums";

export const rolesCatalog = pgTable("roles_catalog", {
  roleId: serial("role_id").primaryKey(),
  roleName: roleEnum("role_name").notNull(),
  ...timestamps,
});

export type InsertRole = typeof rolesCatalog.$inferInsert;
export type SelectRole = typeof rolesCatalog.$inferSelect;
