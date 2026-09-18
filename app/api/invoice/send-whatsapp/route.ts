import {
  NextRequest,
  NextResponse,
} from "next/server";

const WHATSAPP_API_VERSION = "v26.0";

// =====================================================
// NORMALIZE WHATSAPP NUMBER
// =====================================================

function normalizeWhatsAppNumber(
  value: string
): string {
  let number = String(value ?? "").replace(
    /\D/g,
    ""
  );

  if (number.length === 10) {
    number = `91${number}`;
  }

  if (!/^\d{10,15}$/.test(number)) {
    throw new Error(
      "Invalid WhatsApp recipient phone number."
    );
  }

  return number;
}

// =====================================================
// POST
// =====================================================

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      to,
      pdfBase64,
      filename,
      caption,
    } = body ?? {};

    // ===================================================
    // VALIDATE INPUT
    // ===================================================

    if (!to) {
      return NextResponse.json(
        {
          success: false,
          error:
            "WhatsApp recipient number is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!pdfBase64) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invoice PDF data is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ===================================================
    // META CONFIG
    // ===================================================

    const accessToken =
      process.env.META_ACCESS_TOKEN?.trim();

    const phoneNumberId =
      process.env.META_PHONE_NUMBER_ID?.trim();

    if (!accessToken) {
      throw new Error(
        "META_ACCESS_TOKEN is not configured."
      );
    }

    if (!phoneNumberId) {
      throw new Error(
        "META_PHONE_NUMBER_ID is not configured."
      );
    }

    // ===================================================
    // CLEAN BASE64
    // ===================================================

    const cleanBase64 = String(pdfBase64)
      .replace(
        /^data:application\/pdf;base64,/i,
        ""
      )
      .replace(
        /^data:.*;base64,/i,
        ""
      )
      .trim();

    if (!cleanBase64) {
      throw new Error(
        "Invalid invoice PDF data."
      );
    }

    // ===================================================
    // PDF BUFFER
    // ===================================================

    const pdfBuffer = Buffer.from(
      cleanBase64,
      "base64"
    );

    if (!pdfBuffer.length) {
      throw new Error(
        "Generated invoice PDF is empty."
      );
    }

    const finalFilename =
      typeof filename === "string" &&
      filename.trim()
        ? filename.trim()
        : "Lappy-Care-Invoice.pdf";

    // ===================================================
    // LOG CONFIG
    // ===================================================

    console.log(
      "========================================"
    );

    console.log(
      "WHATSAPP INVOICE SEND"
    );

    console.log(
      JSON.stringify(
        {
          apiVersion:
            WHATSAPP_API_VERSION,

          phoneNumberId:
            phoneNumberId,

          recipient:
            normalizeWhatsAppNumber(to),

          filename:
            finalFilename,

          pdfBytes:
            pdfBuffer.length,

          pdfMB:
            (
              pdfBuffer.length /
              (1024 * 1024)
            ).toFixed(2),
        },
        null,
        2
      )
    );

    console.log(
      "========================================"
    );

    // ===================================================
    // UPLOAD PDF TO WHATSAPP MEDIA API
    // ===================================================

    const mediaUrl =
      `https://graph.facebook.com/` +
      `${WHATSAPP_API_VERSION}/` +
      `${phoneNumberId}/media`;

    const formData = new FormData();

    formData.append(
      "messaging_product",
      "whatsapp"
    );

    formData.append(
      "type",
      "application/pdf"
    );

    const pdfBlob = new Blob(
      [pdfBuffer],
      {
        type: "application/pdf",
      }
    );

    formData.append(
      "file",
      pdfBlob,
      finalFilename
    );

    console.log(
      "Uploading invoice PDF to WhatsApp Media API...",
      {
        filename: finalFilename,
        bytes: pdfBuffer.length,
      }
    );

    const mediaResponse =
      await fetch(
        mediaUrl,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },

          body: formData,
        }
      );

    const mediaRaw =
      await mediaResponse.text();

    let mediaData: any = null;

    try {
      mediaData = mediaRaw
        ? JSON.parse(mediaRaw)
        : null;
    } catch {
      mediaData = {
        raw: mediaRaw,
      };
    }

    // ===================================================
    // MEDIA ERROR
    // ===================================================

    if (!mediaResponse.ok) {
      console.error(
        "========================================"
      );

      console.error(
        "WHATSAPP MEDIA UPLOAD ERROR"
      );

      console.error(
        "Status:",
        mediaResponse.status
      );

      console.error(
        JSON.stringify(
          mediaData,
          null,
          2
        )
      );

      console.error(
        "========================================"
      );

      throw new Error(
        mediaData?.error?.message ||
          mediaData?.error?.error_user_msg ||
          mediaData?.error?.error_data
            ?.details ||
          `WhatsApp media upload failed with status ${mediaResponse.status}.`
      );
    }

    // ===================================================
    // MEDIA ID
    // ===================================================

    const mediaId =
      mediaData?.id;

    if (!mediaId) {
      console.error(
        "WhatsApp Media API response:",
        JSON.stringify(
          mediaData,
          null,
          2
        )
      );

      throw new Error(
        "WhatsApp Media API did not return a media ID."
      );
    }

    console.log(
      "Invoice PDF uploaded successfully:",
      {
        mediaId,
      }
    );

    // ===================================================
    // NORMALIZE RECIPIENT
    // ===================================================

    const recipient =
      normalizeWhatsAppNumber(to);

    // ===================================================
    // SEND DOCUMENT
    // ===================================================

    const messagesUrl =
      `https://graph.facebook.com/` +
      `${WHATSAPP_API_VERSION}/` +
      `${phoneNumberId}/messages`;

    const payload = {
      messaging_product:
        "whatsapp",

      recipient_type:
        "individual",

      to: recipient,

      type: "document",

      document: {
        id: mediaId,

        filename:
          finalFilename,

        caption:
          caption ||
          "Your Lappy Care invoice is attached.",
      },
    };

    console.log(
      "========================================"
    );

    console.log(
      "SENDING WHATSAPP DOCUMENT"
    );

    console.log(
      JSON.stringify(
        {
          url: messagesUrl,
          payload,
        },
        null,
        2
      )
    );

    console.log(
      "========================================"
    );

    const messageResponse =
      await fetch(
        messagesUrl,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${accessToken}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

    const messageRaw =
      await messageResponse.text();

    let messageData: any = null;

    try {
      messageData =
        messageRaw
          ? JSON.parse(
              messageRaw
            )
          : null;
    } catch {
      messageData = {
        raw: messageRaw,
      };
    }

    // ===================================================
    // MESSAGE ERROR
    // ===================================================

    if (!messageResponse.ok) {
      console.error(
        "========================================"
      );

      console.error(
        "WHATSAPP DOCUMENT SEND ERROR"
      );

      console.error(
        "HTTP STATUS:",
        messageResponse.status
      );

      console.error(
        "FULL META RESPONSE:"
      );

      console.error(
        JSON.stringify(
          messageData,
          null,
          2
        )
      );

      console.error(
        "========================================"
      );

      const details =
        messageData?.error?.error_data
          ?.details;

      const message =
        messageData?.error?.message;

      const userMessage =
        messageData?.error
          ?.error_user_msg;

      throw new Error(
        details ||
          userMessage ||
          message ||
          `WhatsApp document send failed with status ${messageResponse.status}.`
      );
    }

    // ===================================================
    // SUCCESS
    // ===================================================

    console.log(
      "========================================"
    );

    console.log(
      "WHATSAPP INVOICE SENT SUCCESSFULLY"
    );

    console.log(
      JSON.stringify(
        {
          recipient,
          mediaId,
          whatsapp:
            messageData,
        },
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

        data: {
          mediaId,

          whatsapp:
            messageData,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "========================================"
    );

    console.error(
      "INVOICE WHATSAPP API ERROR"
    );

    console.error(
      error
    );

    console.error(
      "========================================"
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Failed to send invoice PDF on WhatsApp.",
      },
      {
        status: 500,
      }
    );
  }
}