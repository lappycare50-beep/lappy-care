// src/lib/ai/parser.ts

import { AIContentResponse } from "@/types/aiContent";
import { AIServiceError } from "./errors";

const DEFAULT_RESPONSE: AIContentResponse = {
  title: "",
  primaryText: "",
  caption: "",
  hashtags: [],
  callToAction: "",
  imagePrompt: "",
};

function removeMarkdown(text: string): string {
  return text
    .replace(/^```[a-zA-Z]*\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function repairJson(text: string): string {
  return text
    .replace(/,\s*}/g, "}")
    .replace(/,\s*]/g, "]");
}

export function parseAIResponse(
  response: string
): AIContentResponse {
  try {
    const cleanResponse = repairJson(
      removeMarkdown(response)
    );

    const parsed = JSON.parse(cleanResponse);

    const result: AIContentResponse = {
      title:
        typeof parsed.title === "string"
          ? parsed.title
          : "",

      primaryText:
        typeof parsed.primaryText === "string"
          ? parsed.primaryText
          : "",

      caption:
        typeof parsed.caption === "string"
          ? parsed.caption
          : "",

      hashtags: Array.isArray(parsed.hashtags)
  ? Array.from(
      new Set(
        parsed.hashtags.filter(
          (tag: unknown): tag is string =>
            typeof tag === "string"
        )
      )
    )
  : [],

      callToAction:
        typeof parsed.callToAction === "string"
          ? parsed.callToAction
          : "",

      imagePrompt:
        typeof parsed.imagePrompt === "string"
          ? parsed.imagePrompt
          : "",
    };

    if (
      !result.title &&
      !result.primaryText &&
      !result.caption
    ) {
      throw new AIServiceError(
        "AI returned empty content.",
        500
      );
    }

    return result;
  } catch (error) {
    console.error("AI Parse Error:", error);

    if (error instanceof AIServiceError) {
      throw error;
    }

    throw new AIServiceError(
      "Invalid AI JSON response.",
      500
    );
  }
}

export function validateAIResponse(
  data: AIContentResponse
): AIContentResponse {
  return {
    ...DEFAULT_RESPONSE,

    ...data,

    title:
      (data.title ?? "").trim() ||
      "Untitled Content",

    primaryText:
      (data.primaryText ?? "").trim(),

    caption:
      (data.caption ?? "").trim(),

    hashtags:
  data.hashtags.length > 0
    ? Array.from(new Set(data.hashtags))
    : ["#LappyCare"],

    callToAction:
      (data.callToAction ?? "").trim(),

    imagePrompt:
      (data.imagePrompt ?? "").trim(),
  };
}

export function parseAndValidateAIResponse(
  response: string
): AIContentResponse {
  return validateAIResponse(
    parseAIResponse(response)
  );
}