import { NextResponse } from "next/server";

export async function GET() {
  const clientId =
    process.env.GOOGLE_CLIENT_ID;

  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "Google OAuth is not configured.",
      },
      {
        status: 500,
      }
    );
  }

  const scope = [
    "openid",
    "email",
    "profile",
    "https://www.googleapis.com/auth/business.manage",
  ].join(" ");

  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
      scope,
    }).toString();

  return NextResponse.redirect(url);
}