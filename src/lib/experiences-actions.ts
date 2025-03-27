"use server";

import { eq, and, desc } from "drizzle-orm";
import { db } from "../db";
import {
  InsertExperience,
  SelectExperience,
  experiencesSchema,
} from "@/db/schemas/experiences-schema";
import { revalidatePath } from "next/cache";

async function getAllExperiences(lawyerId: SelectExperience["lawyerId"]) {
  const result = await db
    .select()
    .from(experiencesSchema)
    .where(
      and(
        eq(experiencesSchema.lawyerId, lawyerId),
        eq(experiencesSchema.isDeleted, false)
      )
    )
    .orderBy(desc(experiencesSchema.startDate));

  return result;
}

async function getExperienceById(id: SelectExperience["experienceId"]) {
  const result = await db
    .select()
    .from(experiencesSchema)
    .where(
      and(
        eq(experiencesSchema.experienceId, id),
        eq(experiencesSchema.isDeleted, false)
      )
    );

  if (result.length === 0) {
    throw new Error(
      `No se encontró ninguna experiencia laboral con el ID: ${id}`
    );
  }

  return result[0];
}

async function createExperience(data: InsertExperience) {
  const result = await db.insert(experiencesSchema).values(data);

  revalidatePath("/profile");
  return result;
}

async function updateExperience(
  id: SelectExperience["experienceId"],
  data: Partial<Omit<SelectExperience, "experienceId">>
) {
  const result = await db
    .update(experiencesSchema)
    .set(data)
    .where(eq(experiencesSchema.experienceId, id))
    .returning();

  if (result.length === 0) {
    throw new Error(
      `No se encontró ninguna experiencia laboral con el ID: ${id}`
    );
  }

  revalidatePath("/profile");
  return result[0];
}

async function deleteExperience(id: SelectExperience["experienceId"]) {
  const data = { isDeleted: true, deletedAt: new Date() };
  const result = await db
    .update(experiencesSchema)
    .set(data)
    .where(eq(experiencesSchema.experienceId, id))
    .returning();

  revalidatePath("/profile");
  return result;
}

export {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
