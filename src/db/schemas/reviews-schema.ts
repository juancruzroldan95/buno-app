import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { casesTable } from "./cases-schema";
import { clientsTable } from "./clients-schema";
import { timestamps } from "./columns-helpers";

export const reviewsTable = pgTable("reviews_table", {
  reviewId: uuid("review_id").defaultRandom().primaryKey(),
  comment: text("title").notNull(),
  rating: integer("rating").notNull().default(0),
  clientId: uuid("client_id")
    .references(() => clientsTable.clientId)
    .notNull(),
  caseId: uuid("case_id")
    .references(() => casesTable.caseId)
    .notNull(),
  ...timestamps,
});

export const reviewsTableRelations = relations(reviewsTable, ({ one }) => ({
  client: one(clientsTable, {
    fields: [reviewsTable.clientId],
    references: [clientsTable.clientId],
  }),
  case: one(casesTable, {
    fields: [reviewsTable.caseId],
    references: [casesTable.caseId],
  }),
}));

export type InsertReview = typeof reviewsTable.$inferInsert;
export type SelectReview = typeof reviewsTable.$inferSelect;
