"use server";

import { and, eq } from "drizzle-orm";
import {
  InsertLawyerToLawArea,
  SelectLawyerToLawArea,
  lawyersToLawAreas,
} from "@/db/schemas/lawyers-to-law-areas-schema";
import { db } from "../db";

async function getLawAreasByLawyerId(
  lawyerId: SelectLawyerToLawArea["lawyerId"]
) {
  if (!lawyerId) {
    throw new Error("El ID del abogado no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(lawyersToLawAreas)
    .where(
      and(
        eq(lawyersToLawAreas.lawyerId, lawyerId),
        eq(lawyersToLawAreas.isDeleted, false)
      )
    );

  return result;
}

async function addLawAreaToLawyer(data: InsertLawyerToLawArea) {
  if (!data.lawyerId || !data.lawAreaId) {
    throw new Error("Faltan datos para asignar el área al abogado.");
  }

  const exists = await db
    .select()
    .from(lawyersToLawAreas)
    .where(
      and(
        eq(lawyersToLawAreas.lawyerId, data.lawyerId),
        eq(lawyersToLawAreas.lawAreaId, data.lawAreaId),
        eq(lawyersToLawAreas.isDeleted, false)
      )
    );

  if (exists.length > 0) {
    throw new Error("El abogado ya tiene asignada esta área legal.");
  }

  const result = await db.insert(lawyersToLawAreas).values(data);
  return result;
}

async function removeLawAreaFromLawyer(
  lawyerId: SelectLawyerToLawArea["lawyerId"],
  lawAreaId: SelectLawyerToLawArea["lawAreaId"]
) {
  if (!lawyerId || !lawAreaId) {
    throw new Error("Faltan datos para eliminar el vínculo.");
  }

  const result = await db
    .update(lawyersToLawAreas)
    .set({ isDeleted: true, deletedAt: new Date() })
    .where(
      and(
        eq(lawyersToLawAreas.lawyerId, lawyerId),
        eq(lawyersToLawAreas.lawAreaId, lawAreaId),
        eq(lawyersToLawAreas.isDeleted, false)
      )
    )
    .returning();

  if (result.length === 0) {
    throw new Error(
      "No se encontró el vínculo activo entre abogado y área legal."
    );
  }

  return result[0];
}

export { getLawAreasByLawyerId, addLawAreaToLawyer, removeLawAreaFromLawyer };
