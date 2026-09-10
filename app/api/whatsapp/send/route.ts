import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppTextMessage } from "@/services/server/whatsappService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { to, message } = body;

    if (!to || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number and message are required",
        },
        { status: 400 }
      );
    }

    const result = await sendWhatsAppTextMessage(
      to,
      message
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("WhatsApp send error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send WhatsApp message",
      },
      { status: 500 }
    );
  }
}