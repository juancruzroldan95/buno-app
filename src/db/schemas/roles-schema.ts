import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";

export const rolesCatalog = pgTable("roles_catalog", {
  roleId: serial("role_id").primaryKey(),
  roleName: text("role_name").notNull(),
  ...timestamps,
});

export type InsertRole = typeof rolesCatalog.$inferInsert;
export type SelectRole = typeof rolesCatalog.$inferSelect;
