// src/services/aiContentService.ts

import {
  AIContentRequest,
  AIContentResponse,
} from "@/types/aiContent";

import { BusinessProfile } from "@/types/businessProfile";

import { buildMarketingPrompt } from "@/lib/ai/prompts";
import { parseAndValidateAIResponse } from "@/lib/ai/parser";
import { AIServiceError } from "@/lib/ai/errors";
import { getOpenAIClient } from "@/lib/ai/openai";
import { AI_MODELS } from "@/lib/ai/models";

import { createGeneratedPost } from "@/services/generatedPostsService";

export async function generateAIContent(
  request: AIContentRequest,
  business: BusinessProfile
): Promise<AIContentResponse> {
  try {
    // Build AI Prompt
    const prompt = buildMarketingPrompt(
      request,
      business
    );

    // OpenAI Client
    const client = getOpenAIClient();

    // Generate Content
    const completion =
      await client.chat.completions.create({
        model: AI_MODELS.DEFAULT,

        temperature: 0.8,

        messages: [
          {
            role: "system",
            content:
              "You are an expert AI marketing copywriter. Return ONLY valid JSON.",
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
        "AI returned an empty response.",
        500
      );
    }

    // Parse AI Response
    const aiResult =
      parseAndValidateAIResponse(content);

    // Save Generated Post
    await createGeneratedPost({
      businessProfileId: business.id,

      platform: request.platform as any,

      category: request.category as any,

      language: request.language,

      tone: request.tone as any,

      targetLocation: request.location,

      keywords: request.keywords,

      title: aiResult.title,

      primaryText: aiResult.primaryText,

      caption: aiResult.caption,

      hashtags: aiResult.hashtags,

      callToAction: aiResult.callToAction,

      imagePrompt: aiResult.imagePrompt,

      imageUrl: undefined,

      status: "Generated",

      scheduledAt: undefined,

      publishedAt: undefined,
    });

    return aiResult;

  } catch (error) {
  console.error("AI Generation Error:", error);

  // Development Fallback
  const fallback: AIContentResponse = {
    title: `${request.category} in ${request.location}`,

    primaryText: `Looking for ${request.category.toLowerCase()} service in ${request.location}? Lappy Care provides fast, reliable and professional laptop services with genuine parts and affordable pricing.`,

    caption: `⚡ ${request.category} available in ${request.location}. Fast turnaround. Genuine parts. Contact Lappy Care today!`,

    hashtags: [
      "#LappyCare",
      "#LaptopRepair",
      "#Wakad",
      "#Pune",
    ],

    callToAction: "Call Now: 9595057006",

    imagePrompt: `Modern ${request.category} advertisement for Lappy Care using black and yellow branding.`,
  };

  try {
    await createGeneratedPost({
  businessProfileId: business.id,

  platform: request.platform as any,

  category: request.category as any,

  language: request.language,

  tone: request.tone as any,

  targetLocation: request.location,

  keywords: request.keywords,

  title: fallback.title,

  primaryText: fallback.primaryText,

  caption: fallback.caption,

  hashtags: fallback.hashtags,

  callToAction: fallback.callToAction,

  imagePrompt: fallback.imagePrompt,

  status: "Generated",
});
  } catch (saveError) {
    console.error(
      "Failed to save fallback content:",
      saveError
    );
  }

  return fallback;
}

}