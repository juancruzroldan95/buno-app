import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";
import { lawAreasCatalog } from "./law-areas-schema";
import { lawyersTable } from "./lawyers-schema";

export const lawyersToLawAreas = pgTable(
  "lawyers_to_law_areas",
  {
    lawyerId: uuid("lawyer_id")
      .notNull()
      .references(() => lawyersTable.lawyerId),
    lawAreaId: integer("law_area_id")
      .notNull()
      .references(() => lawAreasCatalog.lawAreaId),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.lawyerId, t.lawAreaId] })]
);

export const lawyersToLawAreasRelations = relations(
  lawyersToLawAreas,
  ({ one }) => ({
    lawArea: one(lawAreasCatalog, {
      fields: [lawyersToLawAreas.lawAreaId],
      references: [lawAreasCatalog.lawAreaId],
    }),
    lawyer: one(lawyersTable, {
      fields: [lawyersToLawAreas.lawyerId],
      references: [lawyersTable.lawyerId],
    }),
  })
);

export type InsertLawyerToLawArea = typeof lawyersToLawAreas.$inferInsert;
export type SelectLawyerToLawArea = typeof lawyersToLawAreas.$inferSelect;
