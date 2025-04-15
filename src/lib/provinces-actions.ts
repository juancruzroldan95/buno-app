"use server";

import { eq } from "drizzle-orm";
import {
  InsertProvince,
  SelectProvince,
  provincesCatalog,
} from "@/db/schemas/provinces-schema";
import { db } from "../db";

async function getAllProvinces() {
  const result = await db
    .select({
      provinceId: provincesCatalog.provinceId,
      provinceLabel: provincesCatalog.provinceLabel,
    })
    .from(provincesCatalog)
    .orderBy(provincesCatalog.provinceLabel);
  return result;
}

async function getProvinceById(provinceId: SelectProvince["provinceId"]) {
  if (!provinceId) {
    throw new Error("El ID de la provincia no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(provincesCatalog)
    .where(eq(provincesCatalog.provinceId, provinceId));

  if (result.length === 0) {
    throw new Error(
      `No se encontró ninguna provincia con el ID: ${provinceId}`
    );
  }

  return result[0];
}

async function createProvince(data: InsertProvince) {
  const result = await db.insert(provincesCatalog).values(data);
  return result;
}

async function updateProvince(
  provinceId: SelectProvince["provinceId"],
  data: Partial<Omit<SelectProvince, "provinceId">>
) {
  if (!provinceId) {
    throw new Error("El ID de la provincia no puede estar vacío.");
  }

  const result = await db
    .update(provincesCatalog)
    .set(data)
    .where(eq(provincesCatalog.provinceId, provinceId))
    .returning();

  if (result.length === 0) {
    throw new Error(
      `No se encontró ninguna provincia con el ID: ${provinceId}`
    );
  }

  return result[0];
}

async function deleteProvince(provinceId: SelectProvince["provinceId"]) {
  if (!provinceId) {
    throw new Error("El ID de la provincia no puede estar vacío.");
  }

  const result = await db
    .delete(provincesCatalog)
    .where(eq(provincesCatalog.provinceId, provinceId))
    .returning();

  if (result.length === 0) {
    throw new Error(
      `No se encontró ninguna provincia con el ID: ${provinceId}`
    );
  }

  return result[0];
}

export {
  getAllProvinces,
  getProvinceById,
  createProvince,
  updateProvince,
  deleteProvince,
};
