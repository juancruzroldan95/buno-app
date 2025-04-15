import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { casesTable } from "./cases-schema";
import { timestamps } from "./columns-helpers";
import { lawyersTable } from "./lawyers-schema";

export const provincesCatalog = pgTable("provinces_catalog", {
  provinceId: serial("province_id").primaryKey(),
  provinceSlug: text("province_slug").notNull(),
  provinceLabel: text("province_label").notNull(),
  ...timestamps,
});

export const provincesCatalogRelations = relations(
  provincesCatalog,
  ({ many }) => ({
    lawyers: many(lawyersTable),
    cases: many(casesTable),
  })
);

export type InsertProvince = typeof provincesCatalog.$inferInsert;
export type SelectProvince = typeof provincesCatalog.$inferSelect;
