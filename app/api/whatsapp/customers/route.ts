
import { NextRequest, NextResponse } from "next/server";
import { searchCustomers } from "@/services/customerService";

export async function GET(request: NextRequest) {
  try {
    const search =
      request.nextUrl.searchParams.get("search")?.trim() || "";

    if (!search) {
      return NextResponse.json({
        success: true,
        customers: [],
      });
    }

    const customers = await searchCustomers(search);

    return NextResponse.json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error("WhatsApp customer search error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to search customers",
      },
      { status: 500 }
    );
  }
}
