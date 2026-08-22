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

import {
  AIServiceError,
} from "@/lib/ai/errors";

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const experience =
      typeof body.experience === "string"
        ? body.experience.trim()
        : "";

    // ----------------------------------------
    // Validation
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
    // AI Prompt
    // ----------------------------------------

    const prompt = `
You are a professional customer review writing assistant for Lappy Care.

Create a natural Google review using ONLY the customer's own experience below.

IMPORTANT RULES:

- Do not invent facts.
- Do not add services the customer did not mention.
- Do not invent prices.
- Do not invent discounts.
- Do not invent staff names.
- Do not invent guarantees.
- Do not exaggerate the experience.
- Keep the review honest and believable.
- Preserve the customer's actual meaning.
- Improve grammar and readability.
- Keep the review suitable for Google.
- Keep "Lappy Care" unchanged.
- If the customer writes in Marathi, generate the review in Marathi.
- If the customer writes in Hindi, generate the review in Hindi.
- If the customer writes in English, generate the review in English.
- Otherwise, respond in the same language used by the customer.
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
    // OpenAI
    // ----------------------------------------

    try {
      const client =
        getOpenAIClient();

      const completion =
        await client.chat.completions.create({
          model: AI_MODELS.DEFAULT,

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
        });

      const content =
        completion.choices?.[0]?.message?.content;

      if (!content) {
        throw new AIServiceError(
          "AI returned an empty review.",
          500
        );
      }

      let parsed: {
        review?: string;
      };

      try {
        parsed = JSON.parse(content);
      } catch {
        throw new AIServiceError(
          "AI returned an invalid response.",
          500
        );
      }

      if (
        !parsed.review ||
        typeof parsed.review !== "string"
      ) {
        throw new AIServiceError(
          "AI returned an invalid review.",
          500
        );
      }

      return NextResponse.json({
        success: true,

        data: {
          review:
            parsed.review.trim(),

          source: "ai",
        },
      });

    } catch (error: any) {

      // ----------------------------------------
      // OpenAI Quota Fallback
      // ----------------------------------------

      const isQuotaError =
        error?.status === 429 ||
        error?.code ===
          "insufficient_quota" ||
        error?.error?.code ===
          "insufficient_quota";

      if (isQuotaError) {
        console.warn(
          "OpenAI quota unavailable. Using development fallback."
        );

        const fallbackReview =
          createFallbackReview(
            experience
          );

        return NextResponse.json({
          success: true,

          data: {
            review:
              fallbackReview,

            source:
              "fallback",
          },
        });
      }

      throw error;
    }

  } catch (error) {

    console.error(
      "Review Generation API Error:",
      error
    );

    if (
      error instanceof AIServiceError
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            error.message,
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
          "Unable to generate review.",
      },
      {
        status: 500,
      }
    );
  }
}

// ----------------------------------------
// Development Fallback
// ----------------------------------------

function createFallbackReview(
  experience: string
): string {

  const cleaned =
    experience
      .replace(/\s+/g, " ")
      .trim();

  // Marathi indicators
  const isMarathi =
    /[ळऱ]/.test(cleaned) ||
    /\b(माझा|माझी|माझे|आहे|होता|होती|सेवा|अनुभव|लॅपटॉप|दुरुस्ती)\b/.test(
      cleaned
    );

  if (isMarathi) {
    return `Lappy Care मधील माझा अनुभव चांगला होता. ${cleaned}`;
  }

  // Hindi indicators
  const isHindi =
    /\b(मेरा|मेरी|मेरे|था|थी|सेवा|अनुभव|लैपटॉप|मरम्मत)\b/.test(
      cleaned
    );

  if (isHindi) {
    return `Lappy Care के साथ मेरा अनुभव अच्छा रहा। ${cleaned}`;
  }

  // English fallback
  return `I had a good experience with Lappy Care. ${cleaned}`;
}