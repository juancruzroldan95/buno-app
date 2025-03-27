import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";

export const experiencesSchema = pgTable("experiences_table", {
  experienceId: uuid("experience_id").defaultRandom().primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  startDate: date("start_date", { mode: "date" }).notNull(),
  endDate: date("end_date", { mode: "date" }),
  description: text("description").notNull(),
  lawyerId: uuid("lawyer_id").notNull(),
  ...timestamps,
});

export type InsertExperience = typeof experiencesSchema.$inferInsert;
export type SelectExperience = typeof experiencesSchema.$inferSelect;
