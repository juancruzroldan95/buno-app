import { relations } from "drizzle-orm";
import {
  date,
  integer,
  numeric,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { bidsTable } from "./bids-schema";
import { timestamps } from "./columns-helpers";
import { educationsTable } from "./educations-schema";
import { genderEnum } from "./enums";
import { experiencesTable } from "./experiences-schema";
import { lawyersToLawAreas } from "./lawyers-to-law-areas-schema";
import { provincesCatalog } from "./provinces-schema";
import { usersTable } from "./users-schema";

export const lawyersTable = pgTable("lawyers_table", {
  lawyerId: uuid("lawyer_id").defaultRandom().primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").unique(),
  phone: text("phone"),
  profilePicture: text("profile_picture"),
  provinceId: integer("province_id").references(
    () => provincesCatalog.provinceId
  ),
  gender: genderEnum("gender"),
  bio: text("bio"),
  documentNumber: integer("document_number"),
  birthDate: date("birth_date", { mode: "date" }),
  linkedinUrl: text("linkedin_url"),
  website: text("website"),
  rating: numeric("rating", { precision: 3, scale: 2 }),
  uid: text("uid")
    .references(() => usersTable.uid)
    .notNull(),
  ...timestamps,
});

export const lawyersTableRelations = relations(
  lawyersTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [lawyersTable.uid],
      references: [usersTable.uid],
    }),
    province: one(provincesCatalog, {
      fields: [lawyersTable.provinceId],
      references: [provincesCatalog.provinceId],
    }),
    experiences: many(experiencesTable),
    educations: many(educationsTable),
    lawyersToLawAreas: many(lawyersToLawAreas),
    bids: many(bidsTable),
  })
);

export type InsertLawyer = typeof lawyersTable.$inferInsert;
export type SelectLawyer = typeof lawyersTable.$inferSelect;
