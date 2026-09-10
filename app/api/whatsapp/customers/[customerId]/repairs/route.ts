
import { NextRequest, NextResponse } from "next/server";
import { getRepairsByCustomerId } from "@/services/repairService";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{ customerId: string }>;
  }
) {
  try {
    const { customerId } = await context.params;

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer ID is required",
        },
        { status: 400 }
      );
    }

    const repairs =
      await getRepairsByCustomerId(customerId);

    return NextResponse.json({
      success: true,
      repairs,
    });
  } catch (error) {
    console.error(
      "WhatsApp customer repairs error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get customer repairs",
      },
      { status: 500 }
    );
  }
}
