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

export const proposalStatusEnum = pgEnum("proposal_status", [
  "pending",
  "accepted",
  "rejected",
  "withdrawn",
]);
