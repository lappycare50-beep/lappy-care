const WHATSAPP_API_VERSION = "v23.0";

function getWhatsAppConfig() {
  const accessToken =
    process.env.META_ACCESS_TOKEN?.trim();

  const phoneNumberId =
    process.env.META_PHONE_NUMBER_ID?.trim();

  if (!accessToken) {
    throw new Error(
      "META_ACCESS_TOKEN is not configured"
    );
  }

  if (!phoneNumberId) {
    throw new Error(
      "META_PHONE_NUMBER_ID is not configured"
    );
  }

  return {
    accessToken,
    phoneNumberId,
  };
}

// =====================================================
// NORMALIZE WHATSAPP NUMBER
//
// Accepted examples:
// 9898989898
// +91 9898989898
// +91-9898989898
// 919898989898
//
// Meta receives digits only:
// 9898989898
// =====================================================

function normalizeWhatsAppNumber(
  to: string
) {
  let number = String(to ?? "").trim();

  number = number.replace(
    /[^\d]/g,
    ""
  );

  if (number.length === 10) {
    number = `91${number}`;
  }

  if (!/^\d{10,15}$/.test(number)) {
    throw new Error(
      "Invalid WhatsApp recipient phone number. Use +91 9898989898 format."
    );
  }

  return number;
}

// =====================================================
// SEND WHATSAPP TEXT MESSAGE
// =====================================================

export async function sendWhatsAppTextMessage(
  to: string,
  message: string
) {
  const {
    accessToken,
    phoneNumberId,
  } = getWhatsAppConfig();

  const recipient =
    normalizeWhatsAppNumber(to);

  const finalMessage =
    String(message ?? "").trim();

  if (!finalMessage) {
    throw new Error(
      "WhatsApp message cannot be empty"
    );
  }

  const url =
    `https://graph.facebook.com/` +
    `${WHATSAPP_API_VERSION}/` +
    `${phoneNumberId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      preview_url: true,
      body: finalMessage,
    },
  };

  console.log(
    "========================================"
  );

  console.log(
    "WHATSAPP OUTGOING MESSAGE"
  );

  console.log(
    JSON.stringify(
      {
        phoneNumberId,
        originalRecipient: to,
        normalizedRecipient: recipient,
        displayRecipient:
          recipient.length === 12 &&
          recipient.startsWith("91")
            ? `+91 ${recipient.slice(2)}`
            : recipient,
        messageLength:
          finalMessage.length,
        hasTrackingUrl:
          finalMessage.includes(
            "https://lappycarepune.in/track/"
          ),
      },
      null,
      2
    )
  );

  console.log(
    "WHATSAPP API PAYLOAD"
  );

  console.log(
    JSON.stringify(
      payload,
      null,
      2
    )
  );

  const response =
    await fetch(
      url,
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

  const raw =
    await response.text();

  let data: any;

  try {
    data =
      raw
        ? JSON.parse(raw)
        : null;
  } catch {
    data = {
      raw,
    };
  }

  // ===================================================
  // META ERROR
  // ===================================================

  if (!response.ok) {
    console.error(
      "WhatsApp API error:",
      JSON.stringify(
        data,
        null,
        2
      )
    );

    throw new Error(
      data?.error?.message ||
        data?.error?.error_user_msg ||
        data?.error?.error_data?.details ||
        `WhatsApp API request failed with status ${response.status}`
    );
  }

  // ===================================================
  // MESSAGE ID
  // ===================================================

  const messageId =
    data?.messages?.[0]?.id ||
    "";

  console.log(
    "WHATSAPP MESSAGE ACCEPTED BY META"
  );

  console.log(
    JSON.stringify(
      {
        messageId,
        recipient,
        status:
          data?.messages?.[0]?.message_status ||
          "accepted",
        response: data,
      },
      null,
      2
    )
  );

  console.log(
    "========================================"
  );

  return data;
}
