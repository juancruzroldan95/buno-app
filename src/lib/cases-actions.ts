"use server";

import { revalidatePath } from "next/cache";
import { and, desc, eq } from "drizzle-orm";
import { InsertCase, SelectCase, casesTable } from "@/db/schemas/cases-schema";
import { lawAreasCatalog } from "@/db/schemas/law-areas-schema";
import { provincesCatalog } from "@/db/schemas/provinces-schema";
import { db } from "../db";

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

async function getCaseById(caseId: SelectCase["caseId"]) {
  if (!caseId) {
    throw new Error("El ID del caso no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(casesTable)
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

export type GetCase = {
  caseId: string;
  title: string | null;
  description: string;
  lawAreaId: number;
  lawAreaLabel: string | null;
  provinceId: number;
  provinceLabel: string | null;
  status: "open" | "in_progress" | "closed" | "cancelled";
  createdAt: Date;
};

export {
  getAllCasesByClientId,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
};
