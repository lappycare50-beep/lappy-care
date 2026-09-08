import { NextRequest, NextResponse } from "next/server";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase-admin";
import { getOpenAIClient } from "@/lib/ai/openai";
import { AI_MODELS } from "@/lib/ai/models";

const COLLECTION = "customerReviews";

type GenerateReplyBody = {
  reviewId?: string;
};

function getLanguageInstruction(
  reviewText: string
): string {
  const text = reviewText.trim();

  if (/[\u0900-\u097F]/.test(text)) {
    return `
The customer review appears to use Devanagari script.
Reply in the same language/script used by the customer.
Do not translate the reply into English.
`;
  }

  return `
Reply in the same language used by the customer.
Do not unnecessarily translate the customer's language.
`;
}

function cleanReply(
  value: string
): string {
  return value
    .replace(/^```[\w]*\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

export async function POST(
  request: NextRequest
) {
  try {
    /* =====================================================
       1. Read request
    ===================================================== */

    const body =
      (await request.json()) as GenerateReplyBody;

    const reviewId =
      typeof body?.reviewId === "string"
        ? body.reviewId.trim()
        : "";

    if (!reviewId) {
      return NextResponse.json(
        {
          success: false,
          error: "Review ID is required.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       2. Get review from Firestore
    ===================================================== */

    const db = getAdminDb();

    const reviewRef = db
      .collection(COLLECTION)
      .doc(reviewId);

    const reviewSnapshot =
      await reviewRef.get();

    if (!reviewSnapshot.exists) {
      return NextResponse.json(
        {
          success: false,
          error: "Review not found.",
        },
        { status: 404 }
      );
    }

    const review =
      reviewSnapshot.data() ?? {};

    const customerName =
      typeof review.customerName === "string"
        ? review.customerName
        : "Customer";

    const rating =
      typeof review.rating === "number"
        ? review.rating
        : Number(review.rating ?? 0);

    const reviewText =
      typeof review.reviewText === "string"
        ? review.reviewText.trim()
        : "";

    if (!reviewText) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This review does not contain any review text.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       3. AI Prompt
    ===================================================== */

    const languageInstruction =
      getLanguageInstruction(
        reviewText
      );

    const prompt = `
You are a professional Google Business Profile review reply assistant for Lappy Care.

Write a short, natural and professional reply to the customer's Google review.

BUSINESS:
Lappy Care

CUSTOMER:
${customerName}

RATING:
${rating}/5

CUSTOMER REVIEW:
${reviewText}

IMPORTANT RULES:

- Reply as Lappy Care.
- Be polite, warm and professional.
- Keep the reply concise.
- Usually keep it between 30 and 80 words.
- Acknowledge the customer's experience.
- For positive reviews, thank the customer genuinely.
- For neutral reviews, acknowledge the feedback professionally.
- For negative reviews, remain calm and respectful.
- Never argue with the customer.
- Never blame the customer.
- Never invent facts.
- Never invent prices, offers, services or guarantees.
- Never invent employee names.
- Never claim something was fixed unless the customer said so.
- Do not mention internal systems or AI.
- Do not use excessive emojis.
- Do not use hashtags.
- Do not include quotation marks around the entire reply.
- Do not start with "Dear Customer" unless appropriate.
- Do not repeat the entire review.
- Make the reply sound human and natural.

${languageInstruction}

Return ONLY the reply text.
Do not return JSON.
Do not return markdown.
`;

    /* =====================================================
       4. Generate AI Reply
    ===================================================== */

    const client =
      getOpenAIClient();

    const completion =
      await client.chat.completions.create({
        model:
          AI_MODELS.FAST,

        temperature: 0.5,

        messages: [
          {
            role: "system",
            content:
              "You write concise, professional and honest Google Business Profile review replies.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const rawReply =
      completion
        .choices?.[0]
        ?.message?.content ?? "";

    const aiReply =
      cleanReply(rawReply);

    if (!aiReply) {
      throw new Error(
        "AI did not return a reply."
      );
    }

    /* =====================================================
       5. Save AI Reply
    ===================================================== */

    await reviewRef.update({
      aiReply,

      status:
        "Reply Generated",

      updatedAt:
        new Date().toISOString(),

      firestoreUpdatedAt:
        FieldValue.serverTimestamp(),
    });

    /* =====================================================
       6. Response
    ===================================================== */

    return NextResponse.json({
      success: true,

      data: {
        reviewId,

        aiReply,

        status:
          "Reply Generated",
      },
    });
  } catch (error) {
    console.error(
      "Generate Review Reply API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to generate review reply.",
      },
      { status: 500 }
    );
  }
}