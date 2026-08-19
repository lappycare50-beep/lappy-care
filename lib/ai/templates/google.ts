import { AIContentRequest } from "@/types/aiContent";
import { BusinessProfile } from "@/types/businessProfile";

export function buildGoogleBusinessPrompt(
  request: AIContentRequest,
  business: BusinessProfile
): string {
  return `
You are an expert Google Business Profile SEO writer.

Create a Google Business Profile post.

Requirements:

- Local SEO optimized
- Mention business name naturally
- Mention target location
- Mention service category
- Include CTA
- Include hashtags
- Friendly but professional
- Maximum 1500 characters
- Return ONLY JSON

Business Name:
${business.businessName}

Services:
${business.services.join(", ")}

SEO Keywords:
${business.keywords.join(", ")}

Service Areas:
${business.serviceAreas.join(", ")}

Phone:
${business.contact.phone}

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

JSON:

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