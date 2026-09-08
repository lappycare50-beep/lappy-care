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

function getLanguageInstruction(language: string): string {
  const instructions: Record<string, string> = {
    English:
      "Generate the complete marketing content in English.",

    Marathi:
      "Generate the complete marketing content in Marathi (मराठी). Use natural, professional Marathi suitable for customers in Maharashtra. Do not translate word-by-word from English.",

    Hindi:
      "Generate the complete marketing content in Hindi (हिंदी). Use natural, professional Hindi suitable for Indian customers. Do not translate word-by-word from English.",

    Gujarati:
      "Generate the complete marketing content in Gujarati (ગુજરાતી). Use natural, professional Gujarati suitable for customers in Gujarat.",

    Kannada:
      "Generate the complete marketing content in Kannada (ಕನ್ನಡ). Use natural, professional Kannada suitable for customers in Karnataka.",

    Telugu:
      "Generate the complete marketing content in Telugu (తెలుగు). Use natural, professional Telugu suitable for customers in Andhra Pradesh and Telangana.",

    Tamil:
      "Generate the complete marketing content in Tamil (தமிழ்). Use natural, professional Tamil suitable for customers in Tamil Nadu.",

    Bengali:
      "Generate the complete marketing content in Bengali (বাংলা). Use natural, professional Bengali suitable for Indian customers.",

    Punjabi:
      "Generate the complete marketing content in Punjabi (ਪੰਜਾਬੀ). Use natural, professional Punjabi suitable for Indian customers.",
  };

  return (
    instructions[language] ||
    `Generate the complete marketing content in ${language}.`
  );
}

function getFallbackContent(
  request: AIContentRequest
): AIContentResponse {
  const language = request.language;

  if (language === "Marathi") {
    return {
      title: `${request.location} मध्ये ${request.category}`,

      primaryText:
        `${request.location} मध्ये ${request.category} साठी Lappy Care वर विश्वास ठेवा. जलद सेवा, दर्जेदार पार्ट्स आणि प्रोफेशनल लॅपटॉप सर्व्हिस. तुमच्या लॅपटॉपची काळजी आमची जबाबदारी.`,

      caption:
        `⚡ ${request.location} मध्ये ${request.category} सेवा उपलब्ध! जलद सेवा • Genuine Parts • Professional Support. आजच Lappy Care शी संपर्क करा!`,

      hashtags: [
        "#LappyCare",
        "#LaptopRepair",
        "#LaptopRepairWakad",
        "#Wakad",
        "#Pune",
      ],

      callToAction:
        "आजच कॉल करा: 9595057006",

      imagePrompt:
        `Modern ${request.category} advertisement for Lappy Care using black and yellow branding. Create the advertisement text in Marathi.`,
    };
  }

  if (language === "Hindi") {
    return {
      title:
        `${request.location} में ${request.category}`,

      primaryText:
        `${request.location} में ${request.category} के लिए Lappy Care पर भरोसा करें। तेज़ सर्विस, Genuine Parts और Professional Laptop Service.`,

      caption:
        `⚡ ${request.location} में ${request.category} Service उपलब्ध! तेज़ सर्विस • Genuine Parts • Professional Support. आज ही Lappy Care से संपर्क करें!`,

      hashtags: [
        "#LappyCare",
        "#LaptopRepair",
        "#LaptopRepairWakad",
        "#Wakad",
        "#Pune",
      ],

      callToAction:
        "आज ही कॉल करें: 9595057006",

      imagePrompt:
        `Modern ${request.category} advertisement for Lappy Care using black and yellow branding. Create the advertisement text in Hindi.`,
    };
  }

  return {
    title:
      `${request.category} in ${request.location}`,

    primaryText:
      `Looking for ${request.category.toLowerCase()} service in ${request.location}? Lappy Care provides fast, reliable and professional laptop services with genuine parts and affordable pricing.`,

    caption:
      `⚡ ${request.category} available in ${request.location}. Fast turnaround. Genuine parts. Contact Lappy Care today!`,

    hashtags: [
      "#LappyCare",
      "#LaptopRepair",
      "#Wakad",
      "#Pune",
    ],

    callToAction:
      "Call Now: 9595057006",

    imagePrompt:
      `Modern ${request.category} advertisement for Lappy Care using black and yellow branding.`,
  };
}

export async function generateAIContent(
  request: AIContentRequest,
  business: BusinessProfile
): Promise<AIContentResponse> {
  try {
    // ----------------------------------------
    // 1. Build Existing Marketing Prompt
    // ----------------------------------------

    const basePrompt = buildMarketingPrompt(
      request,
      business
    );

    // ----------------------------------------
    // 2. Add Language Instruction
    // ----------------------------------------

    const languageInstruction =
      getLanguageInstruction(
        request.language
      );

    const prompt = `
${languageInstruction}

IMPORTANT LANGUAGE RULES:
- The title must be written in the selected language.
- The primaryText must be written in the selected language.
- The caption must be written in the selected language.
- The callToAction must be written in the selected language.
- The imagePrompt should describe the creative appropriately for the selected language.
- Hashtags may remain in commonly used English/SEO format when appropriate.
- Do not mix English sentences into the selected language unless a brand name, product name, technical term, phone number, URL, or commonly used marketing term requires it.
- Keep the meaning natural and marketing-friendly.
- Return ONLY valid JSON.
- Do not add markdown.
- Do not add explanations outside the JSON.

SELECTED LANGUAGE:
${request.language}

BUSINESS MARKETING REQUIREMENTS:
${basePrompt}
`;

    // ----------------------------------------
    // 3. OpenAI Client
    // ----------------------------------------

    const client =
      getOpenAIClient();

    // ----------------------------------------
    // 4. Generate Content
    // ----------------------------------------

    const completion =
      await client.chat.completions.create({
        model: AI_MODELS.DEFAULT,

        temperature: 0.8,

        messages: [
          {
            role: "system",
            content:
              "You are an expert AI marketing copywriter. Generate high-quality local marketing content. Follow the selected language strictly. Return ONLY valid JSON.",
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

    // ----------------------------------------
    // 5. Parse AI Response
    // ----------------------------------------

    const aiResult =
      parseAndValidateAIResponse(
        content
      );

    // ----------------------------------------
    // 6. Save Generated Post
    // ----------------------------------------

    await createGeneratedPost({
      businessProfileId:
        business.id,

      platform:
        request.platform as any,

      category:
        request.category as any,

      language:
        request.language,

      tone:
        request.tone as any,

      targetLocation:
        request.location,

      keywords:
        request.keywords,

      title:
        aiResult.title,

      primaryText:
        aiResult.primaryText,

      caption:
        aiResult.caption,

      hashtags:
        aiResult.hashtags,

      callToAction:
        aiResult.callToAction,

      imagePrompt:
        aiResult.imagePrompt,

      imageUrl:
        undefined,

      status:
        "Generated",

      scheduledAt:
        undefined,

      publishedAt:
        undefined,
    });

    return aiResult;

  } catch (error) {
    console.error(
      "AI Generation Error:",
      error
    );

    // ----------------------------------------
    // 7. Development Fallback
    // ----------------------------------------

    const fallback =
      getFallbackContent(request);

    // ----------------------------------------
    // 8. Save Fallback Content
    // ----------------------------------------

    try {
      await createGeneratedPost({
        businessProfileId:
          business.id,

        platform:
          request.platform as any,

        category:
          request.category as any,

        language:
          request.language,

        tone:
          request.tone as any,

        targetLocation:
          request.location,

        keywords:
          request.keywords,

        title:
          fallback.title,

        primaryText:
          fallback.primaryText,

        caption:
          fallback.caption,

        hashtags:
          fallback.hashtags,

        callToAction:
          fallback.callToAction,

        imagePrompt:
          fallback.imagePrompt,

        imageUrl:
          undefined,

        status:
          "Generated",

        scheduledAt:
          undefined,

        publishedAt:
          undefined,
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