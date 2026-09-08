import { NextResponse } from "next/server";

export async function GET() {
  try {
    const appId = process.env.META_APP_ID;
    const redirectUri =
      process.env.META_FACEBOOK_REDIRECT_URI;

    if (!appId) {
      return NextResponse.json(
        {
          success: false,
          error: "META_APP_ID is not configured.",
        },
        { status: 500 }
      );
    }

    if (!redirectUri) {
      return NextResponse.json(
        {
          success: false,
          error:
            "META_FACEBOOK_REDIRECT_URI is not configured.",
        },
        { status: 500 }
      );
    }

    const state = crypto.randomUUID();

    const params = new URLSearchParams({
      client_id: appId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope:
        "public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts",
      state,
    });

    const facebookLoginUrl =
      `https://www.facebook.com/dialog/oauth?${params.toString()}`;

    const response =
      NextResponse.redirect(
        facebookLoginUrl
      );

    response.cookies.set(
      "facebook_oauth_state",
      state,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 600,
        path: "/",
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Facebook OAuth Start Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to start Facebook connection.",
      },
      { status: 500 }
    );
  }
}