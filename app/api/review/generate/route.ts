import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getOpenAIClient,
} from "@/lib/ai/openai";

import {
  AI_MODELS,
} from "@/lib/ai/models";

type ReviewResponse = {
  review: string;
};

function createFallbackReview(
  experience: string
): string {
  return experience
    .replace(/\s+/g, " ")
    .trim();
}

function isQuotaError(
  error: unknown
): boolean {
  const err =
    error as {
      status?: number;
      code?: string;
      type?: string;
      message?: string;
      error?: {
        code?: string;
        type?: string;
        message?: string;
      };
    };

  const status =
    err?.status;

  const code =
    String(
      err?.code ??
      err?.error?.code ??
      ""
    ).toLowerCase();

  const type =
    String(
      err?.type ??
      err?.error?.type ??
      ""
    ).toLowerCase();

  const message =
    String(
      err?.message ??
      err?.error?.message ??
      ""
    ).toLowerCase();

  return (
    status === 429 ||
    code === "insufficient_quota" ||
    type === "insufficient_quota" ||
    message.includes(
      "insufficient_quota"
    ) ||
    message.includes(
      "exceeded your current quota"
    )
  );
}

function parseAIResponse(
  content: string
): ReviewResponse | null {
  const cleaned =
    content
      .replace(
        /^```json\s*/i,
        ""
      )
      .replace(
        /^```\s*/i,
        ""
      )
      .replace(
        /\s*```$/i,
        ""
      )
      .trim();

  try {
    const parsed =
      JSON.parse(cleaned);

    if (
      parsed &&
      typeof parsed.review ===
        "string" &&
      parsed.review.trim()
    ) {
      return {
        review:
          parsed.review.trim(),
      };
    }

    return null;
  } catch {
    return null;
  }
}

export async function POST(
  req: NextRequest
) {
  try {
    // ----------------------------------------
    // 1. Read request
    // ----------------------------------------

    const body =
      await req.json();

    const experience =
      typeof body?.experience ===
      "string"
        ? body.experience.trim()
        : "";

    // ----------------------------------------
    // 2. Validate experience
    // ----------------------------------------

    if (!experience) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Customer experience is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (experience.length < 20) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide at least 20 characters.",
        },
        {
          status: 400,
        }
      );
    }

    if (experience.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Experience must not exceed 1000 characters.",
        },
        {
          status: 400,
        }
      );
    }

    // ----------------------------------------
    // 3. Prepare safe fallback
    // ----------------------------------------

    const fallbackReview =
      createFallbackReview(
        experience
      );

    // ----------------------------------------
    // 4. AI Prompt
    // ----------------------------------------

    const prompt = `
You are a professional customer review writing assistant for Lappy Care.

Create a natural Google review using ONLY the customer's own experience.

IMPORTANT RULES:

- Do not invent facts.
- Do not add services the customer did not mention.
- Do not invent prices.
- Do not invent discounts.
- Do not invent staff names.
- Do not invent guarantees.
- Do not exaggerate the experience.
- Preserve the customer's actual meaning.
- Improve grammar and readability.
- Keep the review honest and believable.
- Keep the review suitable for Google.
- Keep "Lappy Care" unchanged.
- If the customer writes in Marathi, respond in Marathi.
- If the customer writes in Hindi, respond in Hindi.
- If the customer writes in English, respond in English.
- Otherwise, respond in the same language used by the customer.
- Keep the review natural and concise.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not add explanations.

Return exactly:

{
  "review": "..."
}

CUSTOMER EXPERIENCE:

${experience}
`;

    // ----------------------------------------
    // 5. Try OpenAI
    // ----------------------------------------

    try {
      const client =
        getOpenAIClient();

      const completion =
        await client.chat.completions.create(
          {
            model:
              AI_MODELS.DEFAULT,

            temperature: 0.5,

            messages: [
              {
                role: "system",
                content:
                  "You are an honest multilingual customer review assistant. Return ONLY valid JSON.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
          }
        );

      const content =
        completion
          .choices?.[0]
          ?.message?.content;

      if (content) {
        const parsed =
          parseAIResponse(
            content
          );

        if (parsed) {
          return NextResponse.json({
            success: true,
            data: {
              review:
                parsed.review,
              source: "ai",
            },
          });
        }
      }

      console.warn(
        "OpenAI returned an empty or invalid review. Using fallback."
      );

    } catch (aiError) {
      // --------------------------------------
      // IMPORTANT:
      // Never break the customer review flow
      // because of an AI failure.
      // --------------------------------------

      if (isQuotaError(aiError)) {
        console.warn(
          "OpenAI quota unavailable. Using fallback review."
        );
      } else {
        console.error(
          "OpenAI review generation failed. Using fallback review:",
          aiError
        );
      }
    }

    // ----------------------------------------
    // 6. Safe fallback
    // ----------------------------------------

    return NextResponse.json({
      success: true,
      data: {
        review:
          fallbackReview,
        source: "fallback",
      },
    });

  } catch (error) {
    // ----------------------------------------
    // 7. Request / unexpected error
    // ----------------------------------------

    console.error(
      "Review Generation API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to process your review.",
      },
      {
        status: 500,
      }
    );
  }
}