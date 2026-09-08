import { NextRequest, NextResponse } from "next/server";

import {
  getGoogleBusinessLocations,
} from "@/services/server/googleBusinessApi";

import {
  getValidGoogleAccessToken,
} from "@/services/server/oauthAdminService";

/* =========================================================
   GET GOOGLE BUSINESS LOCATIONS
========================================================= */

export async function GET(
  request: NextRequest
) {
  try {
    /* =====================================================
       Get Account Name
    ===================================================== */

    const accountName =
      request.nextUrl.searchParams.get(
        "account"
      );

    if (!accountName) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Google Business account is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       Get Valid Google Access Token
    ===================================================== */

    const {
      accessToken,
    } =
      await getValidGoogleAccessToken();

    /* =====================================================
       Fetch Google Business Locations
    ===================================================== */

    const locations =
      await getGoogleBusinessLocations(
        accountName,
        {
          accessToken,
        }
      );

    return NextResponse.json({
      success: true,

      locations,
    });
  } catch (error) {
    console.error(
      "Google Business Locations Error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch Google Business Locations.";

    /* =====================================================
       Authentication / Reconnect Error
    ===================================================== */

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

    /* =====================================================
       Quota Error
    ===================================================== */

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

    /* =====================================================
       Generic Error
    ===================================================== */

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