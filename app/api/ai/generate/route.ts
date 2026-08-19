// src/app/api/ai/generate/route.ts

import { NextRequest, NextResponse } from "next/server";

import { generateAIContent } from "@/services/aiContentService";
import { getBusinessProfile } from "@/services/businessProfileService";

import { AIContentRequest } from "@/types/aiContent";
import { AIServiceError } from "@/lib/ai/errors";

export async function POST(req: NextRequest) {
  try {
    const body: AIContentRequest = await req.json();

    if (!body.platform) {
      return NextResponse.json(
        { error: "Platform is required." },
        { status: 400 }
      );
    }

    if (!body.category) {
      return NextResponse.json(
        { error: "Category is required." },
        { status: 400 }
      );
    }

    if (!body.language) {
      return NextResponse.json(
        { error: "Language is required." },
        { status: 400 }
      );
    }

    const business =
      await getBusinessProfile();

    if (!business) {
      return NextResponse.json(
        {
          error: "Business Profile not found.",
        },
        {
          status: 404,
        }
      );
    }

    const result =
      await generateAIContent(
        body,
        business
      );

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error(error);

    if (
      error instanceof AIServiceError
    ) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: error.statusCode,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}