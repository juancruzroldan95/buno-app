"use server";

import { revalidatePath } from "next/cache";
import { and, desc, eq } from "drizzle-orm";
import { InsertCase, SelectCase, casesTable } from "@/db/schemas/cases-schema";
import { lawAreasCatalog } from "@/db/schemas/law-areas-schema";
import { provincesCatalog } from "@/db/schemas/provinces-schema";
import { db } from "../db";

async function getCaseById(caseId: SelectCase["caseId"]) {
  if (!caseId) {
    throw new Error("El ID del caso no puede estar vacío.");
  }

  const result = await db
    .select({
      caseId: casesTable.caseId,
      title: casesTable.title,
      description: casesTable.description,
      lawAreaId: casesTable.lawAreaId,
      lawAreaLabel: lawAreasCatalog.lawAreaLabel,
      provinceId: casesTable.provinceId,
      provinceLabel: provincesCatalog.provinceLabel,
      status: casesTable.status,
      createdAt: casesTable.createdAt,
    })
    .from(casesTable)
    .leftJoin(
      lawAreasCatalog,
      eq(casesTable.lawAreaId, lawAreasCatalog.lawAreaId)
    )
    .leftJoin(
      provincesCatalog,
      eq(casesTable.provinceId, provincesCatalog.provinceId)
    )
    .where(and(eq(casesTable.caseId, caseId), eq(casesTable.isDeleted, false)));

  if (result.length === 0) {
    throw new Error(`No se encontró ningún caso con el ID: ${caseId}`);
  }

  return result[0];
}

async function createCase(data: InsertCase) {
  const result = await db.insert(casesTable).values(data).returning();

  revalidatePath("/tus-casos");
  return result;
}

async function updateCase(
  caseId: SelectCase["caseId"],
  data: Partial<Omit<SelectCase, "caseId">>
) {
  if (!caseId) {
    throw new Error("El ID del caso no puede estar vacío.");
  }

  const result = await db
    .update(casesTable)
    .set(data)
    .where(eq(casesTable.caseId, caseId))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ningún caso con el ID: ${caseId}`);
  }

  revalidatePath("/mis-casos");
  return result[0];
}

async function deleteCase(caseId: SelectCase["caseId"]) {
  if (!caseId) {
    throw new Error("El ID del caso no puede estar vacío.");
  }

  const data = { isDeleted: true, deletedAt: new Date() };
  const result = await db
    .update(casesTable)
    .set(data)
    .where(eq(casesTable.caseId, caseId))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ningún caso con el ID: ${caseId}`);
  }

  revalidatePath("/mis-casos");
  return result[0];
}

async function getAllCasesByClientId(clientId: SelectCase["clientId"]) {
  if (!clientId) {
    throw new Error("El ID del cliente no puede estar vacío.");
  }

  const result = await db
    .select({
      caseId: casesTable.caseId,
      title: casesTable.title,
      description: casesTable.description,
      lawAreaId: casesTable.lawAreaId,
      lawAreaLabel: lawAreasCatalog.lawAreaLabel,
      provinceId: casesTable.provinceId,
      provinceLabel: provincesCatalog.provinceLabel,
      status: casesTable.status,
      createdAt: casesTable.createdAt,
    })
    .from(casesTable)
    .leftJoin(
      lawAreasCatalog,
      eq(casesTable.lawAreaId, lawAreasCatalog.lawAreaId)
    )
    .leftJoin(
      provincesCatalog,
      eq(casesTable.provinceId, provincesCatalog.provinceId)
    )
    .where(
      and(eq(casesTable.clientId, clientId), eq(casesTable.isDeleted, false))
    )
    .orderBy(desc(casesTable.createdAt));

  return result;
}

async function getAllActiveCases() {
  const result = await db
    .select({
      caseId: casesTable.caseId,
      title: casesTable.title,
      description: casesTable.description,
      lawAreaId: casesTable.lawAreaId,
      lawAreaLabel: lawAreasCatalog.lawAreaLabel,
      provinceId: casesTable.provinceId,
      provinceLabel: provincesCatalog.provinceLabel,
      status: casesTable.status,
      countBids: casesTable.countBids,
      createdAt: casesTable.createdAt,
    })
    .from(casesTable)
    .leftJoin(
      lawAreasCatalog,
      eq(casesTable.lawAreaId, lawAreasCatalog.lawAreaId)
    )
    .leftJoin(
      provincesCatalog,
      eq(casesTable.provinceId, provincesCatalog.provinceId)
    )
    .where(and(eq(casesTable.status, "open"), eq(casesTable.isDeleted, false)))
    .orderBy(desc(casesTable.createdAt));

  return result;
}

export {
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
  getAllCasesByClientId,
  getAllActiveCases,
};
