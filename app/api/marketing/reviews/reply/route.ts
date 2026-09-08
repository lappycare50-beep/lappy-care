import { NextRequest, NextResponse } from "next/server";

import {
  replyToGoogleReview,
} from "@/services/server/googleBusinessApi";

import {
  getReview,
  updateReview,
} from "@/services/reviewService";

import {
  getValidGoogleAccessToken,
} from "@/services/server/oauthAdminService";

/* =========================================================
   POST
   Reply to Google Review
========================================================= */

export async function POST(
  req: NextRequest
) {
  try {
    /* =======================================================
       1. Read request
    ======================================================= */

    const body = await req.json();

    const reviewId =
      typeof body?.reviewId === "string"
        ? body.reviewId.trim()
        : "";

    const reply =
      typeof body?.reply === "string"
        ? body.reply.trim()
        : "";

    /* =======================================================
       2. Validate
    ======================================================= */

    if (!reviewId) {
      return NextResponse.json(
        {
          success: false,
          error: "Review ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!reply) {
      return NextResponse.json(
        {
          success: false,
          error: "Reply cannot be empty.",
        },
        {
          status: 400,
        }
      );
    }

    /* =======================================================
       3. Get Firestore review
    ======================================================= */

    const review =
      await getReview(reviewId);

    if (!review) {
      return NextResponse.json(
        {
          success: false,
          error: "Review not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* =======================================================
       4. Google Review ID
    ======================================================= */

    const googleReviewId =
      review.googleReviewId?.trim();

    if (!googleReviewId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Review ID is missing for this review.",
        },
        {
          status: 400,
        }
      );
    }

    /* =======================================================
       5. Get valid Google access token
    ======================================================= */

    const {
      accessToken,
    } =
      await getValidGoogleAccessToken();

    /* =======================================================
       6. Build Google Review resource name
       
       Google expects:
       accounts/{accountId}/locations/{locationId}/reviews/{reviewId}

       googleReviewId from sync may already contain the
       complete resource path. Use it when available.
    ======================================================= */

    let reviewName =
      googleReviewId;

    if (
      !reviewName.startsWith(
        "accounts/"
      )
    ) {
      /*
       * In the current synced data, googleReviewId
       * is normally the Google review identifier.
       *
       * If it is already a resource name, it is used
       * directly. Otherwise the Google API may reject it.
       */
      reviewName =
        googleReviewId;
    }

    /* =======================================================
       7. Send reply to Google
    ======================================================= */

    const googleReply =
      await replyToGoogleReview(
        {
          reviewName,
          comment: reply,
        },
        {
          accessToken,
        }
      );

    /* =======================================================
       8. Save reply in Firestore
    ======================================================= */

    const repliedAt =
      googleReply?.updateTime ??
      new Date().toISOString();

    await updateReview(
      reviewId,
      {
        aiReply: reply,

        reviewReply: reply,

        status: "Replied",

        repliedAt,
      }
    );

    /* =======================================================
       9. Success
    ======================================================= */

    return NextResponse.json({
      success: true,

      data: {
        reviewId,

        googleReviewId,

        reply,

        repliedAt,

        status: "Replied",
      },
    });
  } catch (error) {
    console.error(
      "Google Review Reply API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to reply to Google review.",
      },
      {
        status: 500,
      }
    );
  }
}