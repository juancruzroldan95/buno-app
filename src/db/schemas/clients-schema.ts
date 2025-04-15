import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { casesTable } from "./cases-schema";
import { timestamps } from "./columns-helpers";
import { genderEnum } from "./enums";
import { reviewsTable } from "./reviews-schema";
import { usersTable } from "./users-schema";

export const clientsTable = pgTable("clients_table", {
  clientId: uuid("client_id").defaultRandom().primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").unique(),
  phone: text("phone"),
  profilePicture: text("profile_picture"),
  gender: genderEnum("gender"),
  uid: text("uid").references(() => usersTable.uid),
  ...timestamps,
});

export const clientsTableRelations = relations(
  clientsTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [clientsTable.uid],
      references: [usersTable.uid],
    }),
    cases: many(casesTable),
    reviews: many(reviewsTable),
  })
);

export type InsertClient = typeof clientsTable.$inferInsert;
export type SelectClient = typeof clientsTable.$inferSelect;
