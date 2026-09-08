import { NextResponse } from "next/server";

import {
  findGoogleBusinessLocation,
  hasBusinessManageScope,
} from "@/services/server/googleBusinessApi";

import {
  getGoogleToken,
  getValidGoogleAccessToken,
} from "@/services/server/oauthAdminService";

import {
  saveGoogleBusinessProfile,
} from "@/services/server/googleBusinessProfileService";

export async function POST() {
  try {
    /* =======================================================
       1. Check Google OAuth token
    ======================================================= */

    const googleToken =
      await getGoogleToken();

    if (!googleToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Business Profile is not connected. Please connect Google first.",
        },
        { status: 400 }
      );
    }

    if (!googleToken.connected) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Business Profile connection is inactive. Please reconnect Google.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       2. Check Business Profile scope
    ======================================================= */

    if (
      !hasBusinessManageScope(
        googleToken.scope
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Business Profile permission is missing. Please reconnect Google and allow Business Profile access.",
        },
        { status: 403 }
      );
    }

    /* =======================================================
       3. Get valid access token
    ======================================================= */

    const {
      accessToken,
      token,
    } =
      await getValidGoogleAccessToken();

    /* =======================================================
       4. Discover Google Business Account + Location
    ======================================================= */

    const result =
      await findGoogleBusinessLocation({
        accessToken,
      });

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No Google Business Profile location was found for this Google account.",
        },
        { status: 404 }
      );
    }

    /* =======================================================
       5. Save Google Business Profile
    ======================================================= */

    const profileId =
      await saveGoogleBusinessProfile({
        oauthTokenId:
          token.id,

        accountEmail:
          token.accountEmail,

        account:
          result.account,

        location:
          result.location,
      });

    /* =======================================================
       6. Return success
    ======================================================= */

    return NextResponse.json({
      success: true,

      data: {
        profileId,

        account: {
          name:
            result.account.name,

          accountName:
            result.account.accountName ??
            "",
        },

        location: {
          name:
            result.location.name,

          title:
            result.location.title ??
            "",

          website:
            result.location.websiteUri ??
            "",

          phone:
            result.location.phoneNumbers
              ?.primaryPhone ??
            "",
        },
      },
    });
  } catch (error) {
    console.error(
      "Google Business Profile Discovery Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to discover Google Business Profile.",
      },
      { status: 500 }
    );
  }
}