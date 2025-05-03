import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { bidsTable } from "./bids-schema";
import { clientsTable } from "./clients-schema";
import { timestamps } from "./columns-helpers";
import { caseStatusEnum } from "./enums";
import { lawAreasCatalog } from "./law-areas-schema";
import { provincesCatalog } from "./provinces-schema";
import { reviewsTable } from "./reviews-schema";

export const casesTable = pgTable("cases_table", {
  caseId: uuid("case_id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  lawAreaId: integer("law_area_id")
    .references(() => lawAreasCatalog.lawAreaId)
    .notNull(),
  provinceId: integer("province_id")
    .references(() => provincesCatalog.provinceId)
    .notNull(),
  status: caseStatusEnum("status").notNull().default("open"),
  countBids: integer("count_bids").default(0),
  clientId: uuid("client_id")
    .references(() => clientsTable.clientId)
    .notNull(),
  ...timestamps,
});

export const casesTableRelations = relations(casesTable, ({ one, many }) => ({
  client: one(clientsTable, {
    fields: [casesTable.clientId],
    references: [clientsTable.clientId],
  }),
  lawArea: one(lawAreasCatalog, {
    fields: [casesTable.lawAreaId],
    references: [lawAreasCatalog.lawAreaId],
  }),
  province: one(provincesCatalog, {
    fields: [casesTable.provinceId],
    references: [provincesCatalog.provinceId],
  }),
  bids: many(bidsTable),
  review: one(reviewsTable),
}));

export type InsertCase = typeof casesTable.$inferInsert;
export type SelectCase = typeof casesTable.$inferSelect;
