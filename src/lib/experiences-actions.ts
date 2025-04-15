"use server";

import { revalidatePath } from "next/cache";
import { and, desc, eq } from "drizzle-orm";
import {
  InsertExperience,
  SelectExperience,
  experiencesSchema,
} from "@/db/schemas/experiences-schema";
import { db } from "../db";

async function getAllExperiences(lawyerId: SelectExperience["lawyerId"]) {
  if (!lawyerId) {
    throw new Error("El ID del abogado no puede estar vacío.");
  }

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
  if (!id) {
    throw new Error("El ID de la experiencia laboral no puede estar vacío.");
  }

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
  if (!id) {
    throw new Error("El ID de la experiencia laboral no puede estar vacío.");
  }

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
  if (!id) {
    throw new Error("El ID de la experiencia laboral no puede estar vacío.");
  }

  const data = { isDeleted: true, deletedAt: new Date() };
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

export {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
