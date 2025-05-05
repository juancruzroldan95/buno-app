"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import {
  InsertReview,
  SelectReview,
  reviewsTable,
} from "@/db/schemas/reviews-schema";
import { db } from "../db";

async function getReviewByCaseId(caseId: SelectReview["caseId"]) {
  if (!caseId) {
    throw new Error("El ID del caso no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(reviewsTable)
    .where(
      and(eq(reviewsTable.caseId, caseId), eq(reviewsTable.isDeleted, false))
    );

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna reseña para el caso: ${caseId}`);
  }

  return result[0];
}

async function getReviewById(reviewId: SelectReview["reviewId"]) {
  if (!reviewId) {
    throw new Error("El ID de la reseña no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(reviewsTable)
    .where(
      and(
        eq(reviewsTable.reviewId, reviewId),
        eq(reviewsTable.isDeleted, false)
      )
    );

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna reseña con el ID: ${reviewId}`);
  }

  return result[0];
}

async function createReview(data: InsertReview) {
  const result = await db.insert(reviewsTable).values(data);
  revalidatePath("/cases");
  return result;
}

async function updateReview(
  reviewId: SelectReview["reviewId"],
  data: Partial<Omit<SelectReview, "reviewId">>
) {
  if (!reviewId) {
    throw new Error("El ID de la reseña no puede estar vacío.");
  }

  const result = await db
    .update(reviewsTable)
    .set(data)
    .where(eq(reviewsTable.reviewId, reviewId))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna reseña con el ID: ${reviewId}`);
  }

  revalidatePath("/cases");
  return result[0];
}

async function deleteReview(reviewId: SelectReview["reviewId"]) {
  if (!reviewId) {
    throw new Error("El ID de la reseña no puede estar vacío.");
  }

  const data = { isDeleted: true, deletedAt: new Date() };
  const result = await db
    .update(reviewsTable)
    .set(data)
    .where(eq(reviewsTable.reviewId, reviewId))
    .returning();

  if (result.length === 0) {
    throw new Error(`No se encontró ninguna reseña con el ID: ${reviewId}`);
  }

  revalidatePath("/cases");
  return result[0];
}

async function getAllReviewsByClientId(clientId: SelectReview["clientId"]) {
  if (!clientId) {
    throw new Error("El ID del cliente no puede estar vacío.");
  }

  const result = await db
    .select()
    .from(reviewsTable)
    .where(
      and(
        eq(reviewsTable.clientId, clientId),
        eq(reviewsTable.isDeleted, false)
      )
    );

  return result;
}

export {
  getReviewByCaseId,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getAllReviewsByClientId,
};
