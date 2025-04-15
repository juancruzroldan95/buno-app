import { relations } from "drizzle-orm";
import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { casesTable } from "./cases-schema";
import { timestamps } from "./columns-helpers";
import { bidStatusEnum } from "./enums";
import { lawyersTable } from "./lawyers-schema";

export const bidsTable = pgTable("bids_table", {
  bidId: uuid("bid_id").defaultRandom().primaryKey(),
  proposal: text("proposal").notNull(),
  caseId: uuid("case_id")
    .references(() => casesTable.caseId)
    .notNull(),
  bid_amount: numeric("bid_amount", { precision: 10, scale: 2 }),
  bid_type: text("bid_type"),
  status: bidStatusEnum("status").notNull().default("pending"),
  lawyerId: uuid("lawyer_id")
    .references(() => lawyersTable.lawyerId)
    .notNull(),
  ...timestamps,
});

export const bidsTableRelations = relations(bidsTable, ({ one }) => ({
  case: one(casesTable, {
    fields: [bidsTable.caseId],
    references: [casesTable.caseId],
  }),
  lawyer: one(lawyersTable, {
    fields: [bidsTable.lawyerId],
    references: [lawyersTable.lawyerId],
  }),
}));

export type InsertBid = typeof bidsTable.$inferInsert;
export type SelectBid = typeof bidsTable.$inferSelect;
