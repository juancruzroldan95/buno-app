"use server";

import { logsTable } from "@/db/schemas/logs-schema";
import { db } from "../db";

export async function sendLog(data: { eventName: string; uid: string }) {
  const { eventName, uid } = data;

  if (!eventName || !uid) {
    throw new Error("Faltan datos requeridos para registrar el log.");
  }

  await db.insert(logsTable).values({
    eventName,
    uid,
  });
}
