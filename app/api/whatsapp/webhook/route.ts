import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN =
  process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN?.trim() ||
  "lappy-care-webhook";

// =====================================================
// WEBHOOK VERIFICATION
// =====================================================

export async function GET(
  request: NextRequest
) {
  const searchParams =
    request.nextUrl.searchParams;

  const mode =
    searchParams.get("hub.mode");

  const token =
    searchParams.get(
      "hub.verify_token"
    );

  const challenge =
    searchParams.get(
      "hub.challenge"
    );

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
      error:
        "Webhook verification failed",
    },
    { status: 403 }
  );
}

// =====================================================
// WEBHOOK EVENTS
// =====================================================

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

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

    // =================================================
    // PROCESS WHATSAPP CHANGES
    // =================================================

    const entries =
      Array.isArray(body?.entry)
        ? body.entry
        : [];

    for (const entry of entries) {
      const changes =
        Array.isArray(
          entry?.changes
        )
          ? entry.changes
          : [];

      for (const change of changes) {
        const value =
          change?.value;

        // =============================================
        // DELIVERY / READ / FAILED STATUS
        // =============================================

        const statuses =
          Array.isArray(
            value?.statuses
          )
            ? value.statuses
            : [];

        for (
          const status of statuses
        ) {
          const recipient =
            String(
              status?.recipient_id ||
                ""
            );

          const displayRecipient =
            recipient.length === 12 &&
            recipient.startsWith(
              "91"
            )
              ? `+91 ${recipient.slice(
                  2
                )}`
              : recipient;

          console.log(
            "----------------------------------------"
          );

          console.log(
            "WHATSAPP DELIVERY STATUS"
          );

          console.log(
            JSON.stringify(
              {
                messageId:
                  status?.id ||
                  "",
                status:
                  status?.status ||
                  "",
                recipient:
                  displayRecipient,
                recipientRaw:
                  recipient,
                timestamp:
                  status?.timestamp ||
                  "",
                conversation:
                  status?.conversation ||
                  null,
                pricing:
                  status?.pricing ||
                  null,
                errors:
                  status?.errors ||
                  [],
              },
              null,
              2
            )
          );

          // =========================================
          // EXPLICIT FAILED ERROR DETAILS
          // =========================================

          if (
            status?.status ===
              "failed" &&
            Array.isArray(
              status?.errors
            )
          ) {
            for (
              const error of status.errors
            ) {
              console.error(
                "WHATSAPP MESSAGE FAILED",
                JSON.stringify(
                  {
                    messageId:
                      status?.id ||
                      "",
                    recipient:
                      displayRecipient,
                    code:
                      error?.code ||
                      "",
                    title:
                      error?.title ||
                      "",
                    message:
                      error?.message ||
                      "",
                    errorData:
                      error?.error_data ||
                      null,
                  },
                  null,
                  2
                )
              );
            }
          }
        }

        // =============================================
        // INCOMING MESSAGE EVENTS
        // =============================================

        const messages =
          Array.isArray(
            value?.messages
          )
            ? value.messages
            : [];

        for (
          const incoming of messages
        ) {
          console.log(
            "WHATSAPP INCOMING MESSAGE",
            JSON.stringify(
              {
                messageId:
                  incoming?.id ||
                  "",
                from:
                  incoming?.from ||
                  "",
                type:
                  incoming?.type ||
                  "",
                timestamp:
                  incoming?.timestamp ||
                  "",
                text:
                  incoming?.text?.body ||
                  "",
              },
              null,
              2
            )
          );
        }
      }
    }

    console.log(
      "========================================"
    );

    // Always acknowledge Meta quickly.
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

    // Return 200 so Meta does not continuously
    // retry a malformed event while we inspect logs.
    return NextResponse.json(
      {
        success: false,
      },
      { status: 200 }
    );
  }
}
