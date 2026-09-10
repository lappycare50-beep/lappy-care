import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN =
  process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN?.trim() ||
  "lappy-care-webhook";

export async function GET(
  request: NextRequest
) {
  const searchParams =
    request.nextUrl.searchParams;

  const mode =
    searchParams.get("hub.mode");

  const token =
    searchParams.get("hub.verify_token");

  const challenge =
    searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    token === VERIFY_TOKEN &&
    challenge
  ) {
    return new NextResponse(
      challenge,
      {
        status: 200,
        headers: {
          "Content-Type":
            "text/plain",
        },
      }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: "Webhook verification failed",
    },
    { status: 403 }
  );
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    console.log(
      "========================================"
    );

    console.log(
      "WHATSAPP WEBHOOK RECEIVED"
    );

    console.log(
      JSON.stringify(
        body,
        null,
        2
      )
    );

    console.log(
      "========================================"
    );

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "WhatsApp webhook error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
      },
      { status: 200 }
    );
  }
}