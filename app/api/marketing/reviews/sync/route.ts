import { NextResponse } from "next/server";

import { syncGoogleReviews } from "@/services/server/googleReviewsService";

/* =========================================================
   POST
   Sync Google Reviews
========================================================= */

export async function POST() {
  try {
    const result = await syncGoogleReviews();

    return NextResponse.json({
      success: true,

      data: {
        fetched: result.fetched,

        created: result.created,

        updated: result.updated,

        skipped: result.skipped,

        totalReviewCount:
          result.totalReviewCount ?? null,

        averageRating:
          result.averageRating ?? null,
      },
    });
  } catch (error) {
    console.error(
      "Google Reviews Sync API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to sync Google reviews.",
      },
      {
        status: 500,
      }
    );
  }
}