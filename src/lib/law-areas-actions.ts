"use server";

import { eq } from "drizzle-orm";
import {
  InsertLawArea,
  SelectLawArea,
  lawAreasCatalog,
} from "@/db/schemas/law-areas-schema";
import { db } from "../db";

async function getAllLawAreas() {
  const result = await db
    .select({
      lawAreaId: lawAreasCatalog.lawAreaId,
      lawAreaLabel: lawAreasCatalog.lawAreaLabel,
    })
    .from(lawAreasCatalog)
    .orderBy(lawAreasCatalog.lawAreaLabel);
  return result;
}

async function getLawAreaById(lawAreaId: SelectLawArea["lawAreaId"]) {
  if (!lawAreaId) {
    throw new Error("El ID del área de práctica no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(lawAreasCatalog)
    .where(eq(lawAreasCatalog.lawAreaId, lawAreaId));

  if (result.length === 0) {
    throw new Error(`No se encontró ningún área legal con el ID: ${lawAreaId}`);
  }

  return result[0];
}

async function createLawArea(data: InsertLawArea) {
  const result = await db.insert(lawAreasCatalog).values(data);
  return result;
}

async function updateLawArea(
  lawAreaId: SelectLawArea["lawAreaId"],
  data: Partial<Omit<SelectLawArea, "lawAreaId">>
) {
  if (!lawAreaId) {
    throw new Error("El ID del área de práctica no puede estar vacío.");
  }

  const result = await db
    .update(lawAreasCatalog)
    .set(data)
    .where(eq(lawAreasCatalog.lawAreaId, lawAreaId))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ningún área legal con el ID: ${lawAreaId}`);
  }

  return result[0];
}

async function deleteLawArea(lawAreaId: SelectLawArea["lawAreaId"]) {
  if (!lawAreaId) {
    throw new Error("El ID del área de práctica no puede estar vacío.");
  }

  const result = await db
    .delete(lawAreasCatalog)
    .where(eq(lawAreasCatalog.lawAreaId, lawAreaId))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ningún área legal con el ID: ${lawAreaId}`);
  }

  return result[0];
}

export {
  getAllLawAreas,
  getLawAreaById,
  createLawArea,
  updateLawArea,
  deleteLawArea,
};
