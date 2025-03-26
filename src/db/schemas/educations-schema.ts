import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";

export const educationsSchema = pgTable("educations_table", {
  educationId: uuid("education_id").defaultRandom().primaryKey(),
  institution: text("institution").notNull(),
  field: text("field").notNull(),
  graduationDate: date("graduation_date", { mode: "date" }).notNull(),
  lawyerId: uuid("lawyer_id").notNull(),
  ...timestamps,
});

export type InsertEducation = typeof educationsSchema.$inferInsert;
export type SelectEducation = typeof educationsSchema.$inferSelect;
