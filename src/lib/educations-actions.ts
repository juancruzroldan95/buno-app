"use server";

import { eq, and } from "drizzle-orm";
import { db } from "../db";
import {
  InsertEducation,
  SelectEducation,
  educationsSchema,
} from "@/db/schemas/educations-schema";

async function getAllEducations(lawyerId: SelectEducation["lawyerId"]) {
  const result = await db
    .select()
    .from(educationsSchema)
    .where(
      and(
        eq(educationsSchema.lawyerId, lawyerId),
        eq(educationsSchema.isDeleted, false)
      )
    );

  return result;
}

async function getEducationById(id: SelectEducation["educationId"]) {
  const result = await db
    .select()
    .from(educationsSchema)
    .where(eq(educationsSchema.educationId, id));

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna educación con el ID: ${id}`);
  }

  return result[0];
}

async function createEducation(data: InsertEducation) {
  await db.insert(educationsSchema).values(data);
}

async function updateEducation(
  id: SelectEducation["educationId"],
  data: Partial<Omit<SelectEducation, "educationId">>
) {
  const result = await db
    .update(educationsSchema)
    .set(data)
    .where(eq(educationsSchema.educationId, id))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna educación con el ID: ${id}`);
  }

  return result[0];
}

async function deleteEducation(id: SelectEducation["educationId"]) {
  const data = { isDeleted: true };
  await db
    .update(educationsSchema)
    .set(data)
    .where(eq(educationsSchema.educationId, id));
}

export {
  getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
