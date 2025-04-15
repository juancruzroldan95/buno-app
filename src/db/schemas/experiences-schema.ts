import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";
import { lawyersTable } from "./lawyers-schema";

export const experiencesTable = pgTable("experiences_table", {
  experienceId: uuid("experience_id").defaultRandom().primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  startDate: date("start_date", { mode: "date" }).notNull(),
  endDate: date("end_date", { mode: "date" }),
  description: text("description").notNull(),
  lawyerId: uuid("lawyer_id")
    .references(() => lawyersTable.lawyerId)
    .notNull(),
  ...timestamps,
});

export const experiencesTableRelations = relations(
  experiencesTable,
  ({ one }) => ({
    lawyer: one(lawyersTable, {
      fields: [experiencesTable.lawyerId],
      references: [lawyersTable.lawyerId],
    }),
  })
);

export type InsertExperience = typeof experiencesTable.$inferInsert;
export type SelectExperience = typeof experiencesTable.$inferSelect;
