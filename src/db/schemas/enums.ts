import { pgEnum } from "drizzle-orm/pg-core";

// Gender Enum
export const genderEnum = pgEnum("gender", [
  "male",
  "female",
  "non_binary",
  "other",
]);

// Role Enum (if you choose to move roles to the DB later)
export const roleEnum = pgEnum("role", ["client", "lawyer"]);

// Case Status Enum
export const caseStatusEnum = pgEnum("case_status", [
  "open",
  "in_progress",
  "closed",
  "cancelled",
]);

// Proposal Status Enum
export const proposalStatusEnum = pgEnum("proposal_status", [
  "pending",
  "accepted",
  "rejected",
  "withdrawn",
]);
