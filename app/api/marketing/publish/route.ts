import { NextRequest, NextResponse } from "next/server";

import {
  getGoogleToken,
  isTokenExpired,
} from "@/services/server/oauthAdminService";

import {
  getGoogleBusinessProfile,
} from "@/services/server/googleBusinessProfileService";

import {
  publishGoogleBusinessPost,
} from "@/services/server/googleBusinessApi";

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const {
      platform,
      title,
      primaryText,
      caption,
      callToAction,
      imageUrl,
      language,
    } = body;

    /* =====================================================
       PLATFORM VALIDATION
    ===================================================== */

    if (!platform) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Platform is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      platform !==
        "Google Business" &&
      platform !== "Google"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only Google Business publishing is currently supported.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       CONTENT VALIDATION
    ===================================================== */

    const content =
      primaryText?.trim() ||
      caption?.trim() ||
      title?.trim();

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Post content is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       LOAD SAVED GOOGLE BUSINESS PROFILE
    ===================================================== */

    const profile =
      await getGoogleBusinessProfile();

    if (!profile) {
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

    if (!profile.connected) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Business Profile is disconnected.",
        },
        {
          status: 401,
        }
      );
    }

    if (!profile.accountName) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Business account information is missing.",
        },
        {
          status: 400,
        }
      );
    }

    if (!profile.locationName) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Business location information is missing.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       LOAD SERVER-SIDE GOOGLE OAUTH TOKEN
    ===================================================== */

    const token =
      await getGoogleToken();

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google OAuth connection was not found.",
        },
        {
          status: 401,
        }
      );
    }

    if (!token.connected) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google OAuth connection is inactive.",
        },
        {
          status: 401,
        }
      );
    }

    if (
      isTokenExpired(token)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google OAuth token has expired. Please reconnect Google Business.",
        },
        {
          status: 401,
        }
      );
    }

    if (!token.accessToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google access token is missing.",
        },
        {
          status: 401,
        }
      );
    }

    /* =====================================================
       PUBLISH
    ===================================================== */

    console.log(
      "Publishing Marketing Hub post..."
    );

    console.log(
      "Google Business:",
      profile.businessName
    );

    console.log(
      "Google Business Account:",
      profile.accountName
    );

    console.log(
      "Google Business Location:",
      profile.locationName
    );

    const result =
  await publishGoogleBusinessPost(
    {
      locationName:
        profile.locationName,

      summary:
        primaryText?.trim() ||
        caption?.trim() ||
        title?.trim() ||
        "",

      languageCode:
        language || "en-US",

      callToAction,

      imageUrl,
    },
    {
      accessToken:
        token.accessToken,
    }
  );

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Google Business post published successfully.",

        result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Marketing publish API error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to publish post.";

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