// src/lib/ai/models.ts

export const AI_MODELS = {
  DEFAULT: "gpt-5",
  FAST: "gpt-5-mini",
} as const;

export type AIModel =
  (typeof AI_MODELS)[keyof typeof AI_MODELS];