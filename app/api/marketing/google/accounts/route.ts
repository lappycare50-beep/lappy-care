import { NextResponse } from "next/server";

import {
  getGoogleBusinessAccounts,
} from "@/services/server/googleBusinessApi";

import {
  getValidGoogleAccessToken,
} from "@/services/server/oauthAdminService";

/* =========================================================
   GET GOOGLE BUSINESS ACCOUNTS
========================================================= */

export async function GET() {
  try {
    /*
     * Get a valid Google access token.
     *
     * If the existing access token is expired,
     * oauthAdminService will automatically refresh it
     * using the saved refresh token.
     */

    const {
      accessToken,
    } =
      await getValidGoogleAccessToken();

    /* =====================================================
       Fetch Google Business Accounts
    ===================================================== */

    const accounts =
      await getGoogleBusinessAccounts({
        accessToken,
      });

    return NextResponse.json({
      success: true,

      accounts,
    });
  } catch (error) {
    console.error(
      "Google Business Accounts Error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch Google Business Accounts.";

    /*
     * Authentication / connection errors
     */

    if (
      message
        .toLowerCase()
        .includes("reconnect")
    ) {
      return NextResponse.json(
        {
          success: false,

          error: message,

          requiresReconnect: true,
        },
        {
          status: 401,
        }
      );
    }

    /*
     * Google quota error
     */

    if (
      message
        .toLowerCase()
        .includes("quota")
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Google Business API quota is temporarily exceeded. Please wait a few minutes and try again.",

          quotaExceeded: true,
        },
        {
          status: 429,
        }
      );
    }

    /*
     * Generic error
     */

    return NextResponse.json(
      {
        success: false,

        error: message,
      },
      {
        status: 500,
      }
    );
  }
}