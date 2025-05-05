import { pgEnum } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", [
  "male",
  "female",
  "non_binary",
  "other",
]);

export const roleEnum = pgEnum("role", ["client", "lawyer"]);

export const caseStatusEnum = pgEnum("case_status", [
  "open",
  "in_progress",
  "closed",
  "cancelled",
]);

export const bidStatusEnum = pgEnum("bid_status", ["sent", "seen"]);
export type BidStatus = (typeof bidStatusEnum.enumValues)[number];

export const verifiedStatusEnum = pgEnum("verified_status", [
  "pending",
  "in_review",
  "verified",
  "rejected",
]);
