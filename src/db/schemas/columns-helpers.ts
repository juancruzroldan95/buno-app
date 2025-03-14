import { boolean, timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  isDeleted: boolean("is_deleted").default(false),
  deletedAt: timestamp("deleted_at"),
};
