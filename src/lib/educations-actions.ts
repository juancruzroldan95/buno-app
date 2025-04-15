"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import {
  InsertEducation,
  SelectEducation,
  educationsTable,
} from "@/db/schemas/educations-schema";
import { db } from "../db";

async function getAllEducations(lawyerId: SelectEducation["lawyerId"]) {
  const result = await db
    .select()
    .from(educationsTable)
    .where(
      and(
        eq(educationsTable.lawyerId, lawyerId),
        eq(educationsTable.isDeleted, false)
      )
    );

  return result;
}

async function getEducationById(id: SelectEducation["educationId"]) {
  const result = await db
    .select()
    .from(educationsTable)
    .where(
      and(
        eq(educationsTable.educationId, id),
        eq(educationsTable.isDeleted, false)
      )
    );

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna educación con el ID: ${id}`);
  }

  return result[0];
}

async function createEducation(data: InsertEducation) {
  const result = await db.insert(educationsTable).values(data);

  revalidatePath("/profile");
  return result;
}

async function updateEducation(
  id: SelectEducation["educationId"],
  data: Partial<Omit<SelectEducation, "educationId">>
) {
  const result = await db
    .update(educationsTable)
    .set(data)
    .where(eq(educationsTable.educationId, id))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna educación con el ID: ${id}`);
  }

  revalidatePath("/profile");
  return result[0];
}

async function deleteEducation(id: SelectEducation["educationId"]) {
  const data = { isDeleted: true, deletedAt: new Date() };
  const result = await db
    .update(educationsTable)
    .set(data)
    .where(eq(educationsTable.educationId, id))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna educación con el ID: ${id}`);
  }

  revalidatePath("/profile");
  return result[0];
}

export {
  getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
