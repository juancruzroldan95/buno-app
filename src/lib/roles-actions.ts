"use server";

import { eq } from "drizzle-orm";
import {
  InsertRole,
  SelectRole,
  rolesCatalog,
} from "@/db/schemas/roles-schema";
import { db } from "../db";

export async function getRoleById(id: SelectRole["roleId"]) {
  if (!id) {
    throw new Error("El ID del rol no puede estar vacío.");
  }

  return db.select().from(rolesCatalog).where(eq(rolesCatalog.roleId, id));
}

export async function createRole(data: InsertRole) {
  await db.insert(rolesCatalog).values(data);
}

export async function updateRole(
  id: SelectRole["roleId"],
  data: Partial<Omit<SelectRole, "roleId">>
) {
  if (!id) {
    throw new Error("El ID del rol no puede estar vacío.");
  }

  await db.update(rolesCatalog).set(data).where(eq(rolesCatalog.roleId, id));
}

export async function deleteRole(id: SelectRole["roleId"]) {
  if (!id) {
    throw new Error("El ID del rol no puede estar vacío.");
  }

  const data = { isDeleted: true, deletedAt: new Date() };
  await db.update(rolesCatalog).set(data).where(eq(rolesCatalog.roleId, id));
}
