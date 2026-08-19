// src/types/aiContent.ts

import {
  Platform,
  Language,
  Tone,
} from "./marketing";

export interface AIContentRequest {
  platform: Platform;

  category: string;

  language: Language;

  tone: Tone;

  location: string;

  keywords: string[];

  offer?: string;
}

export interface AIContentResponse {
  title: string;

  primaryText: string;

  caption: string;

  hashtags: string[];

  callToAction: string;

  imagePrompt: string;
}