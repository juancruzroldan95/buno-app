"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { InsertUser, SelectUser, usersTable } from "@/db/schemas/users-schema";

async function getUserByUid(uid: SelectUser["uid"]) {
  if (!uid) {
    throw new Error("El UID no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.uid, uid));

  if (result.length === 0) {
    throw new Error(`No se encontró ningún usuario con el UID: ${uid}`);
  }

  return result[0];
}

async function createUser(data: InsertUser) {
  const result = await db.insert(usersTable).values(data).returning();
  return result;
}

async function updateUser(
  uid: SelectUser["uid"],
  data: Partial<Omit<SelectUser, "uid">>
) {
  if (!uid) {
    throw new Error("El UID no puede estar vacío.");
  }

  const result = await db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.uid, uid))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ningún usuario con el UID: ${uid}`);
  }

  revalidatePath("/profile");
  return result[0];
}

async function deleteUser(uid: SelectUser["uid"]) {
  if (!uid) {
    throw new Error("El UID no puede estar vacío.");
  }

  const data = { isDeleted: true, deletedAt: new Date() };
  await db.update(usersTable).set(data).where(eq(usersTable.uid, uid));
}

export { getUserByUid, createUser, updateUser, deleteUser };
