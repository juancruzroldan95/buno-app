"use server";

import { revalidatePath } from "next/cache";
import { and, desc, eq } from "drizzle-orm";
import { InsertBid, SelectBid, bidsTable } from "@/db/schemas/bids-schema";
import { casesTable } from "@/db/schemas/cases-schema";
import { db } from "../db";

async function getAllBidsByCase(caseId: SelectBid["caseId"]) {
  if (!caseId) {
    throw new Error("El ID del caso no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(bidsTable)
    .where(and(eq(bidsTable.caseId, caseId), eq(bidsTable.isDeleted, false)))
    .orderBy(desc(bidsTable.createdAt));

  return result;
}

async function getAllBidsByLawyerId(lawyerId: SelectBid["lawyerId"]) {
  if (!lawyerId) {
    throw new Error("El ID del abogado no puede estar vacío.");
  }

  const result = await db
    .select({
      bid: bidsTable,
      case: {
        caseId: casesTable.caseId,
        title: casesTable.title,
      },
    })
    .from(bidsTable)
    .innerJoin(casesTable, eq(bidsTable.caseId, casesTable.caseId))
    .where(
      and(eq(bidsTable.lawyerId, lawyerId), eq(bidsTable.isDeleted, false))
    )
    .orderBy(desc(bidsTable.createdAt));

  return result;
}

async function getBidById(bidId: SelectBid["bidId"]) {
  if (!bidId) {
    throw new Error("El ID de la propuesta no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(bidsTable)
    .where(and(eq(bidsTable.bidId, bidId), eq(bidsTable.isDeleted, false)));

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna propuesta con el ID: ${bidId}`);
  }

  return result[0];
}

async function createBid(data: InsertBid) {
  const result = await db.insert(bidsTable).values(data).returning();
  // revalidatePath("/cases");
  return result;
}

async function updateBid(
  bidId: SelectBid["bidId"],
  data: Partial<Omit<SelectBid, "bidId">>
) {
  if (!bidId) {
    throw new Error("El ID de la propuesta no puede estar vacío.");
  }

  const result = await db
    .update(bidsTable)
    .set(data)
    .where(eq(bidsTable.bidId, bidId))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna propuesta con el ID: ${bidId}`);
  }

  // revalidatePath("/cases");
  return result[0];
}

async function deleteBid(bidId: SelectBid["bidId"]) {
  if (!bidId) {
    throw new Error("El ID de la propuesta no puede estar vacío.");
  }

  const data = { isDeleted: true, deletedAt: new Date() };
  const result = await db
    .update(bidsTable)
    .set(data)
    .where(eq(bidsTable.bidId, bidId))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna propuesta con el ID: ${bidId}`);
  }

  // revalidatePath("/cases");
  return result[0];
}

async function seenBid(bidId: SelectBid["bidId"]) {
  if (!bidId) {
    throw new Error("El ID de la propuesta no puede estar vacío.");
  }

  const result = await db
    .update(bidsTable)
    .set({ status: "seen" })
    .where(eq(bidsTable.bidId, bidId))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna propuesta con el ID: ${bidId}`);
  }

  return result[0];
}

export {
  getAllBidsByCase,
  getAllBidsByLawyerId,
  getBidById,
  createBid,
  updateBid,
  deleteBid,
  seenBid,
};
