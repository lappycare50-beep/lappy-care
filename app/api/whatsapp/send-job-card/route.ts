import {
  NextRequest,
  NextResponse,
} from "next/server";

// =====================================================
// WHATSAPP CONFIG
// =====================================================

const WHATSAPP_API_VERSION =
  "v23.0";

// =====================================================
// NORMALIZE NUMBER
// =====================================================

function normalizeWhatsAppNumber(
  value: string
): string {
  let number =
    String(
      value ?? ""
    ).replace(
      /\D/g,
      ""
    );

  if (
    number.length === 10
  ) {
    number =
      `91${number}`;
  }

  if (
    !/^\d{10,15}$/.test(
      number
    )
  ) {
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
    const body =
      await request.json();

    const {
      to,
      pdfBase64,
      filename,
      caption,
    } = body ?? {};

    // =================================================
    // VALIDATION
    // =================================================

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
            "Job Card PDF data is required.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // META CONFIG
    // =================================================

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

    // =================================================
    // CLEAN BASE64
    // =================================================

    const cleanBase64 =
      String(
        pdfBase64
      )
        .replace(
          /^data:application\/pdf;base64,/,
          ""
        )
        .replace(
          /^data:.*;base64,/,
          ""
        )
        .trim();

    if (!cleanBase64) {
      throw new Error(
        "Invalid Job Card PDF data."
      );
    }

    // =================================================
    // BUFFER
    // =================================================

    const pdfBuffer =
      Buffer.from(
        cleanBase64,
        "base64"
      );

    if (
      !pdfBuffer.length
    ) {
      throw new Error(
        "Generated Job Card PDF is empty."
      );
    }

    const finalFilename =
      filename ||
      "Lappy-Care-Job-Card.pdf";

    // =================================================
    // MEDIA UPLOAD
    // =================================================

    const mediaUrl =
      `https://graph.facebook.com/` +
      `${WHATSAPP_API_VERSION}/` +
      `${phoneNumberId}/media`;

    const formData =
      new FormData();

    formData.append(
      "messaging_product",
      "whatsapp"
    );

    formData.append(
      "type",
      "application/pdf"
    );

    const pdfBlob =
      new Blob(
        [pdfBuffer],
        {
          type:
            "application/pdf",
        }
      );

    formData.append(
      "file",
      pdfBlob,
      finalFilename
    );

    console.log(
      "Uploading Job Card PDF to WhatsApp...",
      {
        filename:
          finalFilename,

        bytes:
          pdfBuffer.length,
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

    let mediaData:
      any = null;

    try {
      mediaData =
        mediaRaw
          ? JSON.parse(
              mediaRaw
            )
          : null;
    } catch {
      mediaData = {
        raw: mediaRaw,
      };
    }

    if (
      !mediaResponse.ok
    ) {
      console.error(
        "Job Card Media Upload Error:",
        {
          status:
            mediaResponse.status,

          data:
            mediaData,
        }
      );

      throw new Error(
        mediaData?.error?.message ||
          mediaData?.error?.error_user_msg ||
          mediaData?.error?.error_data
            ?.details ||
          `WhatsApp media upload failed with status ${mediaResponse.status}.`
      );
    }

    const mediaId =
      mediaData?.id;

    if (!mediaId) {
      throw new Error(
        "WhatsApp Media API did not return a media ID."
      );
    }

    // =================================================
    // SEND DOCUMENT
    // =================================================

    const recipient =
      normalizeWhatsAppNumber(
        to
      );

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

      type:
        "document",

      document: {
        id: mediaId,

        filename:
          finalFilename,

        caption:
          caption ||
          "Your Lappy Care Job Card is attached.",
      },
    };

    console.log(
      "Sending Job Card PDF to customer...",
      {
        recipient,
        mediaId,
        filename:
          finalFilename,
      }
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

          body:
            JSON.stringify(
              payload
            ),
        }
      );

    const messageRaw =
      await messageResponse.text();

    let messageData:
      any = null;

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

    if (
      !messageResponse.ok
    ) {
      console.error(
        "Job Card WhatsApp Document Error:",
        {
          status:
            messageResponse.status,

          data:
            messageData,
        }
      );

      throw new Error(
        messageData?.error?.message ||
          messageData?.error?.error_user_msg ||
          messageData?.error?.error_data
            ?.details ||
          `WhatsApp document send failed with status ${messageResponse.status}.`
      );
    }

    // =================================================
    // SUCCESS
    // =================================================

    console.log(
      "Job Card PDF sent successfully:",
      {
        recipient,

        mediaId,

        whatsapp:
          messageData,
      }
    );

    return NextResponse.json({
      success: true,

      data: {
        mediaId,

        whatsapp:
          messageData,
      },
    });
  } catch (error) {
    console.error(
      "Job Card WhatsApp API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Failed to send Job Card PDF on WhatsApp.",
      },
      {
        status: 500,
      }
    );
  }
}