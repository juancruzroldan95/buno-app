import { boolean, timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  isDeleted: boolean("is_deleted").default(false),
};
