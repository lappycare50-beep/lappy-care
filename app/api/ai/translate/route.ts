import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  translateGeneratedPost,
} from "@/services/aiTranslationService";

import {
  AIServiceError,
} from "@/lib/ai/errors";

import {
  Language,
} from "@/types/marketing";

export async function POST(
  req: NextRequest
) {
  try {
    const body =
      await req.json();

    const postId =
      body.postId;

    const targetLanguage =
      body.targetLanguage;

    // ----------------------------------------
    // Validation
    // ----------------------------------------

    if (!postId) {
      return NextResponse.json(
        {
          success: false,
          error: "Post ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!targetLanguage) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Target language is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ----------------------------------------
    // Translate
    // ----------------------------------------

    const result =
      await translateGeneratedPost(
        postId,
        targetLanguage as Language
      );

    // ----------------------------------------
    // Success
    // ----------------------------------------

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error(
      "Translation API Error:",
      error
    );

    if (
      error instanceof AIServiceError
    ) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status:
            error.statusCode,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}