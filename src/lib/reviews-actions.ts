"use server";

import { revalidatePath } from "next/cache";
import { and, eq, inArray } from "drizzle-orm";
import { bidsTable } from "@/db/schemas/bids-schema";
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

async function getAverageRatingForLawyer(lawyerId: string) {
  if (!lawyerId) {
    throw new Error("El ID del abogado no puede estar vacío.");
  }

  const acceptedCases = await db
    .select({ caseId: bidsTable.caseId })
    .from(bidsTable)
    .where(
      and(
        eq(bidsTable.lawyerId, lawyerId),
        eq(bidsTable.status, "accepted"),
        eq(bidsTable.isDeleted, false)
      )
    );

  const caseIds = acceptedCases.map((bid) => bid.caseId);

  if (caseIds.length === 0) return 0;

  const reviews = await db
    .select({ rating: reviewsTable.rating })
    .from(reviewsTable)
    .where(
      and(
        inArray(reviewsTable.caseId, caseIds),
        eq(reviewsTable.isDeleted, false)
      )
    );

  if (reviews.length === 0) return 0;

  const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const average = total / reviews.length;

  return Number(average.toFixed(2));
}

export {
  getReviewByCaseId,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getAllReviewsByClientId,
  getAverageRatingForLawyer,
};
