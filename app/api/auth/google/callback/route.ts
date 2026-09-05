import { NextRequest, NextResponse } from "next/server";

import { saveGoogleToken } from "@/services/server/oauthAdminService";

/* =========================================================
   GOOGLE OAUTH CALLBACK

   Responsibilities:
   1. Receive Google authorization code
   2. Exchange code for OAuth token
   3. Verify business.manage scope
   4. Get Google user profile
   5. Save OAuth token
   6. Redirect to Social Accounts

   IMPORTANT:
   This route does NOT call:
   - getGoogleBusinessAccounts()
   - getGoogleBusinessLocations()
   - saveGoogleBusinessProfile()

   Business Profile discovery is handled separately.
========================================================= */

const BUSINESS_MANAGE_SCOPE =
  "https://www.googleapis.com/auth/business.manage";

export async function GET(
  request: NextRequest
) {
  /* =======================================================
     1. READ OAUTH PARAMETERS
  ======================================================= */

  const code =
    request.nextUrl.searchParams.get("code");

  const oauthError =
    request.nextUrl.searchParams.get("error");

  /* =======================================================
     2. HANDLE GOOGLE OAUTH ERROR
  ======================================================= */

  if (oauthError) {
    console.error(
      "Google OAuth Error:",
      oauthError
    );

    return NextResponse.redirect(
      new URL(
        `/admin/marketing/social-accounts?google=error&reason=${encodeURIComponent(
          oauthError
        )}`,
        request.url
      )
    );
  }

  /* =======================================================
     3. VALIDATE AUTHORIZATION CODE
  ======================================================= */

  if (!code) {
    return NextResponse.redirect(
      new URL(
        "/admin/marketing/social-accounts?google=missing-code",
        request.url
      )
    );
  }

  /* =======================================================
     4. ENVIRONMENT VARIABLES
  ======================================================= */

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
    console.error(
      "Google OAuth environment variables are missing."
    );

    return NextResponse.redirect(
      new URL(
        "/admin/marketing/social-accounts?google=config-error",
        request.url
      )
    );
  }

  try {
    /* =====================================================
       5. EXCHANGE AUTHORIZATION CODE FOR TOKEN
    ===================================================== */

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

          cache: "no-store",
        }
      );

    const token =
      await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error(
        "Google Token Exchange Error:",
        token
      );

      return NextResponse.redirect(
        new URL(
          `/admin/marketing/social-accounts?google=token-error&reason=${encodeURIComponent(
            token?.error_description ??
              token?.error ??
              "Token exchange failed."
          )}`,
          request.url
        )
      );
    }

    if (!token.access_token) {
      throw new Error(
        "Google access token was not returned."
      );
    }

    console.log(
      "Google OAuth token received."
    );

    /* =====================================================
       6. VERIFY GRANTED GOOGLE SCOPES
    ===================================================== */

    const grantedScope =
      typeof token.scope === "string"
        ? token.scope
        : "";

    console.log(
      "Google OAuth Granted Scope:",
      grantedScope ||
        "(scope not returned)"
    );

    const grantedScopes =
      grantedScope
        .split(" ")
        .map(
          (scope: string) =>
            scope.trim()
        )
        .filter(Boolean);

    const hasBusinessManageScope =
      grantedScopes.includes(
        BUSINESS_MANAGE_SCOPE
      );

    if (!hasBusinessManageScope) {
      console.error(
        "Google OAuth ERROR: business.manage scope was NOT granted.",
        {
          scope:
            grantedScope ||
            "(scope not returned)",
        }
      );

      return NextResponse.redirect(
        new URL(
          "/admin/marketing/social-accounts?google=missing-business-scope",
          request.url
        )
      );
    }

    console.log(
      "Google Business Profile scope verified."
    );

    /* =====================================================
       7. GET GOOGLE USER PROFILE
    ===================================================== */

    const profileResponse =
      await fetch(
        "https://openidconnect.googleapis.com/v1/userinfo",
        {
          headers: {
            Authorization:
              `Bearer ${token.access_token}`,
          },

          cache: "no-store",
        }
      );

    const profile =
      await profileResponse.json();

    if (!profileResponse.ok) {
      console.error(
        "Google User Profile Error:",
        profile
      );

      return NextResponse.redirect(
        new URL(
          `/admin/marketing/social-accounts?google=profile-error&reason=${encodeURIComponent(
            profile?.error_description ??
              profile?.error ??
              "Unable to fetch Google profile."
          )}`,
          request.url
        )
      );
    }

    console.log(
      "Google OAuth connected:",
      profile.email
    );

    /* =====================================================
       8. CALCULATE TOKEN EXPIRY
    ===================================================== */

    const expiresIn =
      Number(token.expires_in) ||
      3600;

    const expiresAt =
      Date.now() +
      expiresIn * 1000;

    /* =====================================================
       9. SAVE OAUTH TOKEN
    ===================================================== */

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
          token.token_type ?? "Bearer",

        scope:
          grantedScope,

        expiresIn,

        expiresAt,

        connected: true,
      });

    console.log(
      "Google OAuth token saved:",
      oauthTokenId
    );

    /* =====================================================
       10. REDIRECT
    ===================================================== */

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

    return NextResponse.redirect(
      new URL(
        `/admin/marketing/social-accounts?google=error&reason=${encodeURIComponent(
          details
        )}`,
        request.url
      )
    );
  }
}