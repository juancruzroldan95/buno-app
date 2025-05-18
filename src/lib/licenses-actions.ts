"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import {
  InsertLicense,
  SelectLicense,
  licensesTable,
} from "@/db/schemas/licenses-schema";
import { db } from "../db";

async function getAllLicenses(lawyerId: SelectLicense["lawyerId"]) {
  const result = await db
    .select()
    .from(licensesTable)
    .where(
      and(
        eq(licensesTable.lawyerId, lawyerId),
        eq(licensesTable.isDeleted, false)
      )
    );

  return result;
}

async function getLicenseById(id: SelectLicense["licenseId"]) {
  const result = await db
    .select()
    .from(licensesTable)
    .where(
      and(eq(licensesTable.licenseId, id), eq(licensesTable.isDeleted, false))
    );

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna matrícula con el ID: ${id}`);
  }

  return result[0];
}

async function createLicense(data: InsertLicense) {
  const result = await db.insert(licensesTable).values(data).returning();

  revalidatePath("/perfil");
  return result;
}

async function updateLicense(
  id: SelectLicense["licenseId"],
  data: Partial<Omit<SelectLicense, "licenseId">>
) {
  const result = await db
    .update(licensesTable)
    .set(data)
    .where(eq(licensesTable.licenseId, id))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna matrícula con el ID: ${id}`);
  }

  revalidatePath("/perfil");
  return result[0];
}

async function deleteLicense(id: SelectLicense["licenseId"]) {
  const data = { isDeleted: true, deletedAt: new Date() };
  const result = await db
    .update(licensesTable)
    .set(data)
    .where(eq(licensesTable.licenseId, id))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna matrícula con el ID: ${id}`);
  }

  revalidatePath("/perfil");
  return result[0];
}

export {
  getAllLicenses,
  getLicenseById,
  createLicense,
  updateLicense,
  deleteLicense,
};
