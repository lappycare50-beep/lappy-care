import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  CreateCustomerReviewInput,
  CustomerReview,
  UpdateCustomerReviewInput,
} from "@/types/review";

const COLLECTION_NAME = "customerReviews";
const GOOGLE_COLLECTION_NAME = "google_business_reviews";

/* =========================================================
   HELPERS
========================================================= */

function toStringValue(
  value: unknown,
  fallback = ""
): string {
  return typeof value === "string"
    ? value
    : fallback;
}

function toNumberValue(
  value: unknown,
  fallback = 0
): number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    return Number.isFinite(parsed)
      ? parsed
      : fallback;
  }

  return fallback;
}

function convertReview(
  id: string,
  data: Record<string, unknown>
): CustomerReview {
  return {
    id,

    businessProfileId:
      toStringValue(
        data.businessProfileId ??
          data.profileId
      ),

    source: "Google",

    googleReviewId:
      toStringValue(
        data.googleReviewId ??
          data.reviewId ??
          id
      ),

    customerName:
      toStringValue(
        data.customerName ??
          (
            data.reviewer as
              | Record<string, unknown>
              | undefined
          )?.displayName,
        "Google Customer"
      ),

    rating:
      toNumberValue(
        data.rating ??
          data.starRating
      ),

    reviewText:
      toStringValue(
        data.reviewText ??
          data.comment
      ),

    reviewReply:
      toStringValue(
        data.reviewReply
      ) || undefined,

    aiReply:
      toStringValue(
        data.aiReply
      ) || undefined,

    status:
      typeof data.status === "string"
        ? (data.status as CustomerReview["status"])
        : data.reviewReply
          ? "Replied"
          : "New",

    reviewDate:
      toStringValue(
        data.reviewDate ??
          data.createTime
      ) || undefined,

    repliedAt:
      toStringValue(
        data.repliedAt
      ) || undefined,

    createdAt:
      toStringValue(
        data.createdAt ??
          data.createTime ??
          data.syncedAt
      ),

    updatedAt:
      toStringValue(
        data.updatedAt ??
          data.updateTime ??
          data.syncedAt
      ),
  };
}

/* =========================================================
   GET ALL REVIEWS
   Reads both:
   - customerReviews
   - google_business_reviews
========================================================= */

export async function getReviews(): Promise<
  CustomerReview[]
> {
  const results: CustomerReview[] = [];

  /* =======================================================
     1. Existing normalized reviews
  ======================================================= */

  try {
    const reviewsRef =
      collection(
        db,
        COLLECTION_NAME
      );

    const snapshot =
      await getDocs(reviewsRef);

    for (const item of snapshot.docs) {
      results.push(
        convertReview(
          item.id,
          item.data()
        )
      );
    }
  } catch (error) {
    console.error(
      "Unable to load customerReviews:",
      error
    );
  }

  /* =======================================================
     2. Google Business reviews
  ======================================================= */

  try {
    const googleReviewsRef =
      collection(
        db,
        GOOGLE_COLLECTION_NAME
      );

    const snapshot =
      await getDocs(
        googleReviewsRef
      );

    for (const item of snapshot.docs) {
      const googleReview =
        convertReview(
          item.id,
          item.data()
        );

      /*
       * Prevent duplicate review if the same
       * Google review already exists in
       * customerReviews.
       */

      const duplicate =
        results.some(
          (review) =>
            review.googleReviewId ===
            googleReview.googleReviewId
        );

      if (!duplicate) {
        results.push(
          googleReview
        );
      }
    }
  } catch (error) {
    console.error(
      "Unable to load google_business_reviews:",
      error
    );
  }

  /* =======================================================
     3. Sort newest first
  ======================================================= */

  results.sort(
    (a, b) => {
      const dateA =
        new Date(
          a.reviewDate ??
            a.createdAt ??
            ""
        ).getTime();

      const dateB =
        new Date(
          b.reviewDate ??
            b.createdAt ??
            ""
        ).getTime();

      return (
        (Number.isFinite(dateB)
          ? dateB
          : 0) -
        (Number.isFinite(dateA)
          ? dateA
          : 0)
      );
    }
  );

  return results;
}

/* =========================================================
   GET SINGLE REVIEW
========================================================= */

export async function getReview(
  id: string
): Promise<CustomerReview | null> {
  if (!id) {
    return null;
  }

  /* =======================================================
     1. customerReviews
  ======================================================= */

  const reviewRef =
    doc(
      db,
      COLLECTION_NAME,
      id
    );

  const snapshot =
    await getDoc(reviewRef);

  if (snapshot.exists()) {
    return convertReview(
      snapshot.id,
      snapshot.data()
    );
  }

  /* =======================================================
     2. google_business_reviews
  ======================================================= */

  const googleReviewRef =
    doc(
      db,
      GOOGLE_COLLECTION_NAME,
      id
    );

  const googleSnapshot =
    await getDoc(
      googleReviewRef
    );

  if (!googleSnapshot.exists()) {
    return null;
  }

  return convertReview(
    googleSnapshot.id,
    googleSnapshot.data()
  );
}

/* =========================================================
   CREATE REVIEW
   Auto-generated Firestore document ID
========================================================= */

export async function createReview(
  input: CreateCustomerReviewInput
): Promise<string> {
  const reviewRef =
    doc(
      collection(
        db,
        COLLECTION_NAME
      )
    );

  const now =
    new Date().toISOString();

  await setDoc(
    reviewRef,
    {
      ...input,

      status:
        input.status ??
        "New",

      createdAt: now,

      updatedAt: now,

      firestoreCreatedAt:
        serverTimestamp(),

      firestoreUpdatedAt:
        serverTimestamp(),
    }
  );

  return reviewRef.id;
}

/* =========================================================
   CREATE REVIEW WITH SPECIFIC ID

   Used for Google Review normalization.
========================================================= */

export async function createReviewWithId(
  id: string,
  input: CreateCustomerReviewInput
): Promise<string> {
  if (!id) {
    throw new Error(
      "Review ID is required."
    );
  }

  const reviewRef =
    doc(
      db,
      COLLECTION_NAME,
      id
    );

  const existing =
    await getDoc(reviewRef);

  if (existing.exists()) {
    return existing.id;
  }

  const now =
    new Date().toISOString();

  await setDoc(
    reviewRef,
    {
      ...input,

      status:
        input.status ??
        "New",

      createdAt: now,

      updatedAt: now,

      firestoreCreatedAt:
        serverTimestamp(),

      firestoreUpdatedAt:
        serverTimestamp(),
    }
  );

  return reviewRef.id;
}

/* =========================================================
   UPDATE REVIEW
========================================================= */

export async function updateReview(
  id: string,
  input: UpdateCustomerReviewInput
): Promise<void> {
  if (!id) {
    throw new Error(
      "Review ID is required."
    );
  }

  const now =
    new Date().toISOString();

  /* =======================================================
     1. Try customerReviews
  ======================================================= */

  const reviewRef =
    doc(
      db,
      COLLECTION_NAME,
      id
    );

  const snapshot =
    await getDoc(reviewRef);

  if (snapshot.exists()) {
    await updateDoc(
      reviewRef,
      {
        ...input,

        updatedAt: now,

        firestoreUpdatedAt:
          serverTimestamp(),
      }
    );

    return;
  }

  /* =======================================================
     2. Try google_business_reviews
  ======================================================= */

  const googleReviewRef =
    doc(
      db,
      GOOGLE_COLLECTION_NAME,
      id
    );

  const googleSnapshot =
    await getDoc(
      googleReviewRef
    );

  if (!googleSnapshot.exists()) {
    throw new Error(
      "Review not found."
    );
  }

  await updateDoc(
    googleReviewRef,
    {
      ...input,

      updatedAt: now,

      firestoreUpdatedAt:
        serverTimestamp(),
    }
  );
}

/* =========================================================
   DELETE REVIEW
========================================================= */

export async function deleteReview(
  id: string
): Promise<void> {
  if (!id) {
    throw new Error(
      "Review ID is required."
    );
  }

  /* =======================================================
     1. customerReviews
  ======================================================= */

  const reviewRef =
    doc(
      db,
      COLLECTION_NAME,
      id
    );

  const snapshot =
    await getDoc(reviewRef);

  if (snapshot.exists()) {
    await deleteDoc(
      reviewRef
    );

    return;
  }

  /* =======================================================
     2. google_business_reviews
  ======================================================= */

  const googleReviewRef =
    doc(
      db,
      GOOGLE_COLLECTION_NAME,
      id
    );

  const googleSnapshot =
    await getDoc(
      googleReviewRef
    );

  if (!googleSnapshot.exists()) {
    throw new Error(
      "Review not found."
    );
  }

  await deleteDoc(
    googleReviewRef
  );
}