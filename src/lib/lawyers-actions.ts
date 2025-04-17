"use server";

import { UpdateLawyerInput } from "@/types";
import { eq, sql } from "drizzle-orm";
import {
  InsertLawyer,
  SelectLawyer,
  lawyersTable,
} from "@/db/schemas/lawyers-schema";
import { lawyersToLawAreas } from "@/db/schemas/lawyers-to-law-areas-schema";
import { SelectUser } from "@/db/schemas/users-schema";
import { db } from "../db";

async function getLawyerByUserId(userId: SelectUser["uid"]) {
  if (!userId) {
    throw new Error("El UID no puede estar vacío.");
  }

  const result = await db
    .select({
      lawyer: lawyersTable,
      lawAreaIds: sql<number[]>`
        (
          SELECT array_agg(${lawyersToLawAreas.lawAreaId})
          FROM ${lawyersToLawAreas}
          WHERE ${lawyersToLawAreas.lawyerId} = ${lawyersTable.lawyerId}
        )
      `.as("lawAreaIds"),
    })
    .from(lawyersTable)
    .where(eq(lawyersTable.uid, userId));

  if (result.length === 0) {
    throw new Error(
      `No se encontró ningún abogado asociado al usuario con el UID: ${userId}`
    );
  }

  return {
    ...result[0].lawyer,
    lawAreaIds: result[0].lawAreaIds ?? [],
  };
}

async function getLawyerById(id: SelectLawyer["lawyerId"]) {
  if (!id) {
    throw new Error("El ID del abogado no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(lawyersTable)
    .where(eq(lawyersTable.lawyerId, id));

  if (result.length === 0) {
    throw new Error(`No se encontró ningún abogado con el ID: ${id}`);
  }

  return result[0];
}

async function createLawyer(data: InsertLawyer) {
  await db.insert(lawyersTable).values(data);
}

async function updateLawyer(
  id: SelectLawyer["lawyerId"],
  data: UpdateLawyerInput
) {
  if (!id) {
    throw new Error("El ID del abogado no puede estar vacío.");
  }

  const { lawAreaIds, ...lawyerData } = data;

  const result = await db
    .update(lawyersTable)
    .set(lawyerData)
    .where(eq(lawyersTable.lawyerId, id))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ningún abogado con el ID: ${id}`);
  }

  if (lawAreaIds) {
    await db
      .delete(lawyersToLawAreas)
      .where(eq(lawyersToLawAreas.lawyerId, id));

    const newRelations = lawAreaIds.map((lawAreaId) => ({
      lawyerId: id,
      lawAreaId,
    }));

    if (newRelations.length > 0) {
      await db.insert(lawyersToLawAreas).values(newRelations);
    }
  }

  return result[0];
}

async function deleteLawyer(id: SelectLawyer["lawyerId"]) {
  if (!id) {
    throw new Error("El ID del abogado no puede estar vacío.");
  }

  const data = { isDeleted: true, deletedAt: new Date() };
  await db.update(lawyersTable).set(data).where(eq(lawyersTable.lawyerId, id));
}

export {
  getLawyerByUserId,
  getLawyerById,
  createLawyer,
  updateLawyer,
  deleteLawyer,
};
