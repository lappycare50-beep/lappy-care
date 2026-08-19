// src/lib/ai/prompts.ts

import { AIContentRequest } from "@/types/aiContent";
import { BusinessProfile } from "@/types/businessProfile";

import { buildGoogleBusinessPrompt } from "./templates/google";
import { buildFacebookPrompt } from "./templates/facebook";

export function buildMarketingPrompt(
  request: AIContentRequest,
  business: BusinessProfile
): string {
  switch (request.platform) {
    case "Google Business":
      return buildGoogleBusinessPrompt(
        request,
        business
      );

    case "Facebook":
      return buildFacebookPrompt(
        request,
        business
      );

    default:
      return buildGoogleBusinessPrompt(
        request,
        business
      );
  }
}

export default buildMarketingPrompt;