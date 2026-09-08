import { NextRequest, NextResponse } from "next/server";

import {
  getGoogleToken,
} from "@/services/server/oauthAdminService";

import {
  getGoogleBusinessProfile,
  saveGoogleBusinessProfile,
  disconnectGoogleBusinessProfile,
} from "@/services/server/googleBusinessProfileService";

import {
  GoogleBusinessAccount,
  GoogleBusinessLocation,
} from "@/services/server/googleBusinessApi";

/* =====================================================
   GET
   Load saved Google Business Profile
===================================================== */

export async function GET() {
  try {
    const profile =
      await getGoogleBusinessProfile();

    return NextResponse.json({
      success: true,
      connected: Boolean(
        profile?.connected
      ),
      profile: profile ?? null,
    });
  } catch (error) {
    console.error(
      "Google Business Profile GET Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        connected: false,
        profile: null,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load Google Business Profile.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   POST
   Save / Change Google Business Location
===================================================== */

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const account =
      body.account as
        | GoogleBusinessAccount
        | undefined;

    const location =
      body.location as
        | GoogleBusinessLocation
        | undefined;

    if (!account?.name) {
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

    if (!location?.name) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Business location is required.",
        },
        {
          status: 400,
        }
      );
    }

    const token =
      await getGoogleToken();

    if (
      !token ||
      !token.connected
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Business Profile is not connected.",
        },
        {
          status: 401,
        }
      );
    }

    const profileId =
      await saveGoogleBusinessProfile({
        oauthTokenId:
          token.id,

        accountEmail:
          token.accountEmail,

        account,

        location,
      });

    return NextResponse.json({
      success: true,
      profileId,
    });
  } catch (error) {
    console.error(
      "Google Business Profile Save Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to save Google Business Profile.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   DELETE
   Disconnect Google Business Profile
===================================================== */

export async function DELETE(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const id =
      body.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Business Profile ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    await disconnectGoogleBusinessProfile(
      id
    );

    return NextResponse.json({
      success: true,
      message:
        "Google Business Profile disconnected successfully.",
    });
  } catch (error) {
    console.error(
      "Google Business Profile Disconnect Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to disconnect Google Business Profile.",
      },
      {
        status: 500,
      }
    );
  }
}