"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  InsertLawyer,
  SelectLawyer,
  lawyersTable,
} from "@/db/schemas/lawyers-schema";

export async function getLawyerById(id: SelectLawyer["lawyerId"]) {
  const result = await db
    .select()
    .from(lawyersTable)
    .where(eq(lawyersTable.lawyerId, id));

  if (result.length === 0) {
    throw new Error(`No se encontró ningún abogado con el ID: ${id}`);
  }

  return result[0];
}

export async function createLawyer(data: InsertLawyer) {
  await db.insert(lawyersTable).values(data);
}

export async function updateLawyer(
  id: SelectLawyer["lawyerId"],
  data: Partial<Omit<SelectLawyer, "lawyerId">>
) {
  const result = await db
    .update(lawyersTable)
    .set(data)
    .where(eq(lawyersTable.lawyerId, id))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ningún abogado con el ID: ${id}`);
  }

  return result[0];
}

export async function deleteLawyer(id: SelectLawyer["lawyerId"]) {
  const data = { isDeleted: true };
  await db.update(lawyersTable).set(data).where(eq(lawyersTable.lawyerId, id));
}
