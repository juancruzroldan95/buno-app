import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  InsertRole,
  SelectRole,
  rolesCatalog,
} from "@/db/schemas/roles-schema";

export async function getRoleById(id: SelectRole["roleId"]) {
  return db.select().from(rolesCatalog).where(eq(rolesCatalog.roleId, id));
}

export async function createRole(data: InsertRole) {
  await db.insert(rolesCatalog).values(data);
}

export async function updateRole(
  id: SelectRole["roleId"],
  data: Partial<Omit<SelectRole, "roleId">>
) {
  await db.update(rolesCatalog).set(data).where(eq(rolesCatalog.roleId, id));
}

export async function deleteRole(id: SelectRole["roleId"]) {
  const data = { isDeleted: true };
  await db.update(rolesCatalog).set(data).where(eq(rolesCatalog.roleId, id));
}
