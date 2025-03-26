"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  InsertWorkExperience,
  SelectWorkExperience,
  workExperiencesSchema,
} from "@/db/schemas/work-experiences-schema";

export async function getWorkExperienceById(
  id: SelectWorkExperience["workExperienceId"]
) {
  const result = await db
    .select()
    .from(workExperiencesSchema)
    .where(eq(workExperiencesSchema.workExperienceId, id));

  if (result.length === 0) {
    throw new Error(
      `No se encontró ninguna experiencia laboral con el ID: ${id}`
    );
  }

  return result[0];
}

export async function createWorkExperience(data: InsertWorkExperience) {
  await db.insert(workExperiencesSchema).values(data);
}

export async function updateWorkExperience(
  id: SelectWorkExperience["workExperienceId"],
  data: Partial<Omit<SelectWorkExperience, "workExperienceId">>
) {
  const result = await db
    .update(workExperiencesSchema)
    .set(data)
    .where(eq(workExperiencesSchema.workExperienceId, id))
    .returning();

  if (result.length === 0) {
    throw new Error(
      `No se encontró ninguna experiencia laboral con el ID: ${id}`
    );
  }

  return result[0];
}

export async function deleteWorkExperience(
  id: SelectWorkExperience["workExperienceId"]
) {
  const data = { isDeleted: true };
  await db
    .update(workExperiencesSchema)
    .set(data)
    .where(eq(workExperiencesSchema.workExperienceId, id));
}
