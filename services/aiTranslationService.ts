import {
  AIContentResponse,
} from "@/types/aiContent";

import {
  Language,
} from "@/types/marketing";

import {
  getGeneratedPost,
  createGeneratedPost,
} from "@/services/generatedPostsService";

import {
  parseAndValidateAIResponse,
} from "@/lib/ai/parser";

import {
  AIServiceError,
} from "@/lib/ai/errors";

import {
  getOpenAIClient,
} from "@/lib/ai/openai";

import {
  AI_MODELS,
} from "@/lib/ai/models";

function getLanguageInstruction(
  language: string
): string {
  const instructions: Record<string, string> = {
    English:
      "Translate the complete marketing content into natural, professional English.",

    Marathi:
      "Translate the complete marketing content into natural, professional Marathi (मराठी) suitable for customers in Maharashtra.",

    Hindi:
      "Translate the complete marketing content into natural, professional Hindi (हिंदी) suitable for Indian customers.",

    Gujarati:
      "Translate the complete marketing content into natural, professional Gujarati (ગુજરાતી) suitable for customers in Gujarat.",

    Kannada:
      "Translate the complete marketing content into natural, professional Kannada (ಕನ್ನಡ) suitable for customers in Karnataka.",

    Telugu:
      "Translate the complete marketing content into natural, professional Telugu (తెలుగు) suitable for customers in Andhra Pradesh and Telangana.",

    Tamil:
      "Translate the complete marketing content into natural, professional Tamil (தமிழ்) suitable for customers in Tamil Nadu.",

    Bengali:
      "Translate the complete marketing content into natural, professional Bengali (বাংলা) suitable for Indian customers.",

    Punjabi:
      "Translate the complete marketing content into natural, professional Punjabi (ਪੰਜਾਬੀ) suitable for Indian customers.",
  };

  return (
    instructions[language] ||
    `Translate the complete marketing content into ${language}.`
  );
}

export async function translateGeneratedPost(
  postId: string,
  targetLanguage: Language
): Promise<AIContentResponse> {
  try {
    // ----------------------------------------
    // 1. Get Original Post
    // ----------------------------------------

    const source =
      await getGeneratedPost(postId);

    if (!source) {
      throw new AIServiceError(
        "Generated post not found.",
        404
      );
    }

    // ----------------------------------------
    // 2. Prevent Same Language
    // ----------------------------------------

    if (
      source.language === targetLanguage
    ) {
      throw new AIServiceError(
        "The post is already in the selected language.",
        400
      );
    }

    // ----------------------------------------
    // 3. Build Translation Prompt
    // ----------------------------------------

    const languageInstruction =
      getLanguageInstruction(
        targetLanguage
      );

    const prompt = `
${languageInstruction}

You are an expert multilingual marketing copywriter for Lappy Care.

Translate and adapt the following existing marketing post into the target language.

IMPORTANT RULES:

- Preserve the original marketing meaning.
- Keep "Lappy Care" unchanged.
- Keep phone numbers unchanged.
- Keep prices unchanged.
- Keep locations accurate.
- Keep proper nouns accurate.
- Make the translation natural and customer-friendly.
- Do not translate brand names.
- Preserve SEO intent.
- Preserve the marketing purpose.
- Translate title.
- Translate primary text.
- Translate caption.
- Translate call to action.
- Adapt hashtags naturally.
- Keep useful English SEO hashtags when appropriate.
- Adapt image prompt appropriately.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not add explanations.

TARGET LANGUAGE:
${targetLanguage}

ORIGINAL CONTENT:

Title:
${source.title}

Primary Text:
${source.primaryText}

Caption:
${source.caption}

Hashtags:
${source.hashtags.join(" ")}

Call To Action:
${source.callToAction}

Image Prompt:
${source.imagePrompt}
`;

    // ----------------------------------------
    // 4. OpenAI Client
    // ----------------------------------------

    let client;

    try {
      client = getOpenAIClient();
    } catch (error) {
      console.error(
        "OpenAI Client Error:",
        error
      );

      throw new AIServiceError(
        "OpenAI client initialization failed.",
        500
      );
    }

    // ----------------------------------------
    // 5. OpenAI Translation
    // ----------------------------------------

    let completion;

    try {
      completion =
        await client.chat.completions.create({
          model: AI_MODELS.DEFAULT,

          temperature: 0.6,

          messages: [
            {
              role: "system",
              content:
                "You are an expert multilingual marketing copywriter. Return ONLY valid JSON matching the requested marketing content structure.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        });
    } catch (error) {
      console.error(
        "OpenAI Translation Error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unknown OpenAI error.";

      throw new AIServiceError(
        `OpenAI translation failed: ${message}`,
        500
      );
    }

    // ----------------------------------------
    // 6. Get AI Response
    // ----------------------------------------

    const content =
      completion.choices?.[0]?.message?.content;

    if (!content) {
      throw new AIServiceError(
        "AI returned an empty translation response.",
        500
      );
    }

    console.log(
      "Translation AI Response:",
      content
    );

    // ----------------------------------------
    // 7. Parse AI Response
    // ----------------------------------------

    let translated: AIContentResponse;

    try {
      translated =
        parseAndValidateAIResponse(
          content
        );
    } catch (error) {
      console.error(
        "Translation Parser Error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Invalid AI response.";

      throw new AIServiceError(
        `Translation response validation failed: ${message}`,
        500
      );
    }

    // ----------------------------------------
    // 8. Save Translated Post
    // ----------------------------------------

    try {
      await createGeneratedPost({
        businessProfileId:
          source.businessProfileId,

        platform:
          source.platform,

        category:
          source.category,

        language:
          targetLanguage,

        tone:
          source.tone,

        targetLocation:
          source.targetLocation,

        keywords:
          source.keywords,

        title:
          translated.title,

        primaryText:
          translated.primaryText,

        caption:
          translated.caption,

        hashtags:
          translated.hashtags,

        callToAction:
          translated.callToAction,

        imagePrompt:
          translated.imagePrompt,

        imageUrl:
          undefined,

        status:
          "Generated",

        scheduledAt:
          undefined,

        publishedAt:
          undefined,
      });
    } catch (error) {
      console.error(
        "Save Translated Post Error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unknown database error.";

      throw new AIServiceError(
        `Translated post could not be saved: ${message}`,
        500
      );
    }

    // ----------------------------------------
    // 9. Success
    // ----------------------------------------

    console.log(
      `Post ${postId} translated successfully to ${targetLanguage}.`
    );

    return translated;

  } catch (error) {
    console.error(
      "Post Translation Error:",
      error
    );

    if (
      error instanceof AIServiceError
    ) {
      throw error;
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unknown translation error.";

    throw new AIServiceError(
      `Translation failed: ${message}`,
      500
    );
  }
}
