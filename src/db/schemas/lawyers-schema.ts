import { pgTable, real, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns-helpers";

export const lawyersTable = pgTable("lawyers_table", {
  lawyerId: uuid("lawyer_id").defaultRandom().primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").unique(),
  phone: text("phone"),
  profilePicture: text("profile_picture"),
  bio: text("bio"),
  linkedinUrl: text("linkedin_url"),
  website: text("website"),
  location: text("location"),
  rating: real("rating"),
  userId: uuid("user_id").notNull(),
  ...timestamps,
});

export type InsertLawyer = typeof lawyersTable.$inferInsert;
export type SelectLawyer = typeof lawyersTable.$inferSelect;
