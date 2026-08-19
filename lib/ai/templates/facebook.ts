import { AIContentRequest } from "@/types/aiContent";
import { BusinessProfile } from "@/types/businessProfile";

export function buildFacebookPrompt(
  request: AIContentRequest,
  business: BusinessProfile
): string {
  return `
You are an expert Facebook Ads and Social Media Copywriter.

Write a HIGH-CONVERTING Facebook post.

Rules:

• Create an attention-grabbing opening line.
• Focus on customer benefits.
• Use engaging language.
• Add relevant emojis.
• Include a strong Call-To-Action.
• Generate 5–10 hashtags.
• Return ONLY valid JSON.

Business Name:
${business.businessName}

Tagline:
${business.tagline}

Description:
${business.description}

Services:
${business.services.join(", ")}

SEO Keywords:
${business.keywords.join(", ")}

Service Areas:
${business.serviceAreas.join(", ")}

Phone:
${business.contact.phone}

WhatsApp:
${business.contact.whatsapp}

Website:
${business.contact.website}

Category:
${request.category}

Location:
${request.location}

Offer:
${request.offer}

Language:
${request.language}

Tone:
${request.tone}

Return ONLY this JSON:

{
"title":"",
"primaryText":"",
"caption":"",
"hashtags":[],
"callToAction":"",
"imagePrompt":""
}
`;
}