import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";
import { verifiedStatusEnum } from "./enums";
import { lawyersTable } from "./lawyers-schema";

export const licensesTable = pgTable("licenses_table", {
  licenseId: uuid("license_id").defaultRandom().primaryKey(),
  barAssociation: text("bar_association").notNull(),
  volume: integer("volume").notNull(),
  folio: integer("folio").notNull(),
  verifiedStatus: verifiedStatusEnum("verified_status")
    .notNull()
    .default("pending"),
  lawyerId: uuid("lawyer_id")
    .references(() => lawyersTable.lawyerId)
    .notNull(),
  ...timestamps,
});

export const licensesTableRelations = relations(licensesTable, ({ one }) => ({
  lawyer: one(lawyersTable, {
    fields: [licensesTable.lawyerId],
    references: [lawyersTable.lawyerId],
  }),
}));

export type InsertLicense = typeof licensesTable.$inferInsert;
export type SelectLicense = typeof licensesTable.$inferSelect;
