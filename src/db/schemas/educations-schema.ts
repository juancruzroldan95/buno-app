import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";
import { lawyersTable } from "./lawyers-schema";

export const educationsTable = pgTable("educations_table", {
  educationId: uuid("education_id").defaultRandom().primaryKey(),
  institution: text("institution").notNull(),
  field: text("field").notNull(),
  graduationDate: date("graduation_date", { mode: "date" }).notNull(),
  lawyerId: uuid("lawyer_id")
    .references(() => lawyersTable.lawyerId)
    .notNull(),
  ...timestamps,
});

export const educationsTableRelations = relations(
  educationsTable,
  ({ one }) => ({
    lawyer: one(lawyersTable, {
      fields: [educationsTable.lawyerId],
      references: [lawyersTable.lawyerId],
    }),
  })
);

export type InsertEducation = typeof educationsTable.$inferInsert;
export type SelectEducation = typeof educationsTable.$inferSelect;
