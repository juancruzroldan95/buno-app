"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  InsertClient,
  SelectClient,
  clientsTable,
} from "@/db/schemas/clients-schema";

export async function getClientById(id: SelectClient["clientId"]) {
  const result = await db
    .select()
    .from(clientsTable)
    .where(eq(clientsTable.clientId, id));

  if (result.length === 0) {
    throw new Error(`No se encontró ningún cliente con el ID: ${id}`);
  }

  return result[0];
}

export async function createClient(data: InsertClient) {
  await db.insert(clientsTable).values(data);
}

export async function updateClient(
  id: SelectClient["clientId"],
  data: Partial<Omit<SelectClient, "clientId">>
) {
  const result = await db
    .update(clientsTable)
    .set(data)
    .where(eq(clientsTable.clientId, id))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ningún cliente con el ID: ${id}`);
  }

  return result[0];
}

export async function deleteClient(id: SelectClient["clientId"]) {
  const data = { isDeleted: true };
  await db.update(clientsTable).set(data).where(eq(clientsTable.clientId, id));
}
