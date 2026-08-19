import { NextRequest, NextResponse } from "next/server";

import {
  getGoogleBusinessAccounts,
  getGoogleBusinessLocations,
} from "@/services/server/googleBusinessApi";

import { saveGoogleBusinessProfile } from "@/services/server/googleBusinessProfileService";

import { saveGoogleToken } from "@/services/server/oauthAdminService";

export async function GET(
  request: NextRequest
) {
  const code =
    request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      {
        error:
          "Authorization code not found.",
      },
      {
        status: 400,
      }
    );
  }

  const clientId =
    process.env.GOOGLE_CLIENT_ID;

  const clientSecret =
    process.env.GOOGLE_CLIENT_SECRET;

  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI;

  if (
    !clientId ||
    !clientSecret ||
    !redirectUri
  ) {
    return NextResponse.json(
      {
        error:
          "Google OAuth environment variables are missing.",
      },
      {
        status: 500,
      }
    );
  }

  try {
    /* ==========================================
       1. Exchange OAuth Code
    ========================================== */

    const tokenResponse =
      await fetch(
        "https://oauth2.googleapis.com/token",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret:
              clientSecret,
            redirect_uri:
              redirectUri,
            grant_type:
              "authorization_code",
          }),
        }
      );

    const token =
      await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json(
        token,
        {
          status:
            tokenResponse.status,
        }
      );
    }

    /* ==========================================
       2. Get Google Profile
    ========================================== */

    const profileResponse =
      await fetch(
        "https://openidconnect.googleapis.com/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );

    const profile =
      await profileResponse.json();

    if (!profileResponse.ok) {
      return NextResponse.json(
        {
          error:
            "Unable to fetch Google profile.",
        },
        {
          status:
            profileResponse.status,
        }
      );
    }

    /* ==========================================
       3. Save OAuth Token
    ========================================== */

    const oauthTokenId =
      await saveGoogleToken({
        provider: "google",

        accountEmail:
          profile.email ?? "",

        accessToken:
          token.access_token,

        refreshToken:
          token.refresh_token ?? "",

        tokenType:
          token.token_type,

        scope:
          token.scope,

        expiresIn:
          token.expires_in,

        expiresAt:
          Date.now() +
          token.expires_in *
            1000,

        connected: true,
      });

    /* ==========================================
       4. Get Business Accounts
    ========================================== */

    const accounts =
      await getGoogleBusinessAccounts({
        accessToken:
          token.access_token,
      });

    if (accounts.length === 0) {
      return NextResponse.redirect(
        new URL(
          "/admin/marketing/social-accounts?google=connected-no-business",
          request.url
        )
      );
    }

    /* ==========================================
       5. Find Business Location
    ========================================== */

    let businessSaved =
      false;

    for (const account of accounts) {
      if (!account.name) {
        continue;
      }

      const locations =
        await getGoogleBusinessLocations(
          account.name,
          {
            accessToken:
              token.access_token,
          }
        );

      if (locations.length === 0) {
        continue;
      }

      /* ========================================
         6. Save First Business Location
      ======================================== */

      await saveGoogleBusinessProfile({
        oauthTokenId,

        accountEmail:
          profile.email ?? "",

        account,

        location:
          locations[0],
      });

      businessSaved = true;

      break;
    }

    /* ==========================================
       7. Redirect
    ========================================== */

    if (!businessSaved) {
      return NextResponse.redirect(
        new URL(
          "/admin/marketing/social-accounts?google=connected-no-location",
          request.url
        )
      );
    }

    return NextResponse.redirect(
      new URL(
        "/admin/marketing/social-accounts?google=connected",
        request.url
      )
    );

        } catch (error) {
    console.error(
      "Google OAuth Callback Error:",
      error
    );

    const details =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        error:
          "Failed to complete Google OAuth.",
        details,
      },
      {
        status: 500,
      }
    );
  }
}