// src/services/reviewService.ts

import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  CustomerReview,
  ReviewStatus,
} from "@/types/review";

const COLLECTION_NAME = "customer_reviews";

// ----------------------------------------
// Create Review
// ----------------------------------------

export async function createReview(
  data: Omit<
    CustomerReview,
    "id" | "createdAt" | "updatedAt"
  >
): Promise<string> {
  const now = Timestamp.now();

  const docRef = await addDoc(
    collection(db, COLLECTION_NAME),
    {
      ...data,
      createdAt: now,
      updatedAt: now,
    }
  );

  return docRef.id;
}

// ----------------------------------------
// Get Review
// ----------------------------------------

export async function getReview(
  reviewId: string
): Promise<CustomerReview | null> {
  const docRef = doc(
    db,
    COLLECTION_NAME,
    reviewId
  );

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as CustomerReview;
}

// ----------------------------------------
// Update Review
// ----------------------------------------

export async function updateReview(
  reviewId: string,
  data: Partial<CustomerReview>
): Promise<void> {
  const docRef = doc(
    db,
    COLLECTION_NAME,
    reviewId
  );

  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

// ----------------------------------------
// Update Review Status
// ----------------------------------------

export async function updateReviewStatus(
  reviewId: string,
  status: ReviewStatus
): Promise<void> {
  await updateReview(reviewId, {
    status,
  });
}