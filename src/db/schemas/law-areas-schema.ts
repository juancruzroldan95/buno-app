import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { casesTable } from "./cases-schema";
import { timestamps } from "./columns-helpers";
import { lawyersToLawAreas } from "./lawyers-to-law-areas-schema";

export const lawAreasCatalog = pgTable("law_areas_catalog", {
  lawAreaId: serial("law_area_id").primaryKey(),
  lawAreaSlug: text("law_area_slug").notNull(),
  lawAreaLabel: text("law_area_label").notNull(),
  ...timestamps,
});

export const lawAreasCatalogRelations = relations(
  lawAreasCatalog,
  ({ many }) => ({
    cases: many(casesTable),
    lawyersToLawAreas: many(lawyersToLawAreas),
  })
);

export type InsertLawArea = typeof lawAreasCatalog.$inferInsert;
export type SelectLawArea = typeof lawAreasCatalog.$inferSelect;
