import "server-only";

import {
  FieldValue,
} from "firebase-admin/firestore";

import {
  getAdminDb,
} from "@/lib/firebase-admin";

import {
  getGoogleBusinessProfile,
} from "@/services/server/googleBusinessProfileService";

import {
  getValidGoogleAccessToken,
} from "@/services/server/oauthAdminService";

/* =========================================================
   TYPES
========================================================= */

interface GoogleReviewer {
  displayName?: string;
  profilePhotoUrl?: string;
  isAnonymous?: boolean;
}

interface GoogleReviewReply {
  comment?: string;
  updateTime?: string;
}

interface GoogleReview {
  name?: string;
  reviewId?: string;

  reviewer?: GoogleReviewer;

  starRating?:
    | "STAR_RATING_UNSPECIFIED"
    | "ONE"
    | "TWO"
    | "THREE"
    | "FOUR"
    | "FIVE";

  comment?: string;

  createTime?: string;

  updateTime?: string;

  reviewReply?: GoogleReviewReply;

  reviewReplyUrl?: string;
}

interface GoogleReviewsResponse {
  reviews?: GoogleReview[];

  averageRating?: number;

  totalReviewCount?: number;

  nextPageToken?: string;
}

/* =========================================================
   RESULT
========================================================= */

export interface GoogleReviewsSyncResult {
  fetched: number;

  created: number;

  updated: number;

  skipped: number;

  totalReviewCount?: number;

  averageRating?: number;
}

/* =========================================================
   CONSTANTS
========================================================= */

const COLLECTION =
  "customerReviews";

const GOOGLE_REVIEWS_API =
  "https://mybusiness.googleapis.com/v4";

/* =========================================================
   HELPERS
========================================================= */

function getGoogleReviewId(
  review: GoogleReview
): string {
  if (
    review.reviewId?.trim()
  ) {
    return review.reviewId.trim();
  }

  if (
    review.name?.trim()
  ) {
    const parts =
      review.name.split("/");

    return (
      parts[
        parts.length - 1
      ] ?? ""
    );
  }

  return "";
}

function getRating(
  starRating?: GoogleReview["starRating"]
): number {
  switch (starRating) {
    case "ONE":
      return 1;

    case "TWO":
      return 2;

    case "THREE":
      return 3;

    case "FOUR":
      return 4;

    case "FIVE":
      return 5;

    default:
      return 0;
  }
}

function getCustomerName(
  reviewer?: GoogleReviewer
): string {
  if (
    reviewer?.isAnonymous
  ) {
    return "Google Customer";
  }

  return (
    reviewer?.displayName?.trim() ||
    "Google Customer"
  );
}

function getInitialStatus(
  review: GoogleReview
) {
  const existingReply =
    review.reviewReply?.comment?.trim();

  if (existingReply) {
    return "Replied" as const;
  }

  return "New" as const;
}

/* =========================================================
   FETCH GOOGLE REVIEWS
========================================================= */

async function fetchGoogleReviews(
  accountId: string,
  locationId: string,
  accessToken: string
): Promise<GoogleReviewsResponse> {
  const locationName =
    `accounts/${accountId}/locations/${locationId}`;

  const url =
    `${GOOGLE_REVIEWS_API}/${locationName}/reviews` +
    "?pageSize=50" +
    "&orderBy=update_time%20desc";

  const response =
    await fetch(
      url,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          Accept:
            "application/json",
        },

        cache: "no-store",
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    console.error(
      "Google Reviews API Error:",
      {
        status:
          response.status,

        data,
      }
    );

    const message =
      data?.error?.message ||
      "Unable to fetch Google reviews.";

    throw new Error(
      message
    );
  }

  return data as GoogleReviewsResponse;
}

/* =========================================================
   SYNC REVIEWS
========================================================= */

export async function syncGoogleReviews(): Promise<
  GoogleReviewsSyncResult
> {
  const profile =
    await getGoogleBusinessProfile();

  if (!profile) {
    throw new Error(
      "Google Business Profile is not connected."
    );
  }

  if (!profile.connected) {
    throw new Error(
      "Google Business Profile is not connected."
    );
  }

  if (
    !profile.accountId ||
    !profile.locationId
  ) {
    throw new Error(
      "Google Business account or location information is missing."
    );
  }

  const {
    accessToken,
  } =
    await getValidGoogleAccessToken();

  const googleData =
    await fetchGoogleReviews(
      profile.accountId,
      profile.locationId,
      accessToken
    );

  const reviews =
    googleData.reviews ?? [];

  const db =
    getAdminDb();

  let created = 0;

  let updated = 0;

  let skipped = 0;

  for (
    const review of reviews
  ) {
    const googleReviewId =
      getGoogleReviewId(
        review
      );

    if (!googleReviewId) {
      skipped++;
      continue;
    }

    const reviewText =
      review.comment?.trim() || "";

    /*
     * Google review without text
     * is still a valid review.
     */

    const documentId =
      `google_${googleReviewId}`;

    const reviewRef =
      db
        .collection(COLLECTION)
        .doc(documentId);

    const existing =
      await reviewRef.get();

    const now =
      new Date().toISOString();

    if (!existing.exists) {
      /*
       * First sync.
       */

      await reviewRef.set({
        businessProfileId:
          profile.id,

        source:
          "Google",

        googleReviewId,

        customerName:
          getCustomerName(
            review.reviewer
          ),

        rating:
          getRating(
            review.starRating
          ),

        reviewText,

        reviewDate:
          review.createTime ?? null,

        status:
          getInitialStatus(
            review
          ),

        reviewReply:
          review.reviewReply
            ?.comment ??
          null,

        aiReply:
          null,

        repliedAt:
          review.reviewReply
            ?.updateTime ??
          null,

        createdAt:
          now,

        updatedAt:
          now,

        firestoreCreatedAt:
          FieldValue.serverTimestamp(),

        firestoreUpdatedAt:
          FieldValue.serverTimestamp(),
      });

      created++;

      continue;
    }

    /*
     * Existing review.
     *
     * Important:
     * Do NOT overwrite AI reply,
     * admin approval status or
     * manually edited reply.
     */

    const existingData =
      existing.data() ?? {};

    const updateData: Record<
      string,
      unknown
    > = {
      customerName:
        getCustomerName(
          review.reviewer
        ),

      rating:
        getRating(
          review.starRating
        ),

      reviewText,

      reviewDate:
        review.createTime ??
        existingData.reviewDate ??
        null,

      updatedAt:
        now,

      firestoreUpdatedAt:
        FieldValue.serverTimestamp(),
    };

    /*
     * If Google already has a reply,
     * update Google's reply information.
     */

    if (
      review.reviewReply?.comment
        ?.trim()
    ) {
      updateData.reviewReply =
        review.reviewReply.comment;

      updateData.repliedAt =
        review.reviewReply
          .updateTime ??
        existingData.repliedAt ??
        null;

      /*
       * Only mark Replied if the local
       * review wasn't in an active
       * AI/admin workflow.
       */

      const currentStatus =
        existingData.status;

      if (
        currentStatus === "New" ||
        currentStatus === "Replied"
      ) {
        updateData.status =
          "Replied";
      }
    }

    await reviewRef.update(
      updateData
    );

    updated++;
  }

  return {
    fetched:
      reviews.length,

    created,

    updated,

    skipped,

    totalReviewCount:
      googleData.totalReviewCount,

    averageRating:
      googleData.averageRating,
  };
}