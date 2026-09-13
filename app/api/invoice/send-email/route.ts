import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      disabled: true,
      error:
        "Invoice email sending is disabled. WhatsApp is used for customer communication.",
    },
    {
      status: 410,
    }
  );
}