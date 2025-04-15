"use server";

import { eq } from "drizzle-orm";
import {
  InsertClient,
  SelectClient,
  clientsTable,
} from "@/db/schemas/clients-schema";
import { SelectUser } from "@/db/schemas/users-schema";
import { db } from "../db";

async function getClientByUserId(userId: SelectUser["uid"]) {
  if (!userId) {
    throw new Error("El ID del usuario es requerido para buscar el cliente.");
  }

  const result = await db
    .select()
    .from(clientsTable)
    .where(eq(clientsTable.uid, userId));

  if (result.length === 0) {
    throw new Error(
      `No se encontró ningún cliente asociado al usuario con el ID: ${userId}`
    );
  }

  return result[0];
}

async function getClientById(id: SelectClient["clientId"]) {
  if (!id) {
    throw new Error("El ID del cliente es requerido para buscarlo.");
  }

  const result = await db
    .select()
    .from(clientsTable)
    .where(eq(clientsTable.clientId, id));

  if (result.length === 0) {
    throw new Error(`No se encontró ningún cliente con el ID: ${id}`);
  }

  return result[0];
}

async function createClient(data: InsertClient) {
  await db.insert(clientsTable).values(data);
}

async function updateClient(
  id: SelectClient["clientId"],
  data: Partial<Omit<SelectClient, "clientId">>
) {
  if (!id) {
    throw new Error("El ID del cliente es requerido para actualizarlo.");
  }

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

async function deleteClient(id: SelectClient["clientId"]) {
  if (!id) {
    throw new Error("El ID del cliente es requerido para eliminarlo.");
  }

  const data = { isDeleted: true, deletedAt: new Date() };
  await db.update(clientsTable).set(data).where(eq(clientsTable.clientId, id));
}

export {
  getClientByUserId,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
