// src/types/marketing.ts

export type Platform =
  | "Google Business"
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "X";

export type Language =
  | "English"
  | "Marathi"
  | "Hindi";

export type Tone =
  | "Professional"
  | "Friendly"
  | "Sales"
  | "Educational"
  | "Luxury";

export type PostStatus =
  | "Generated"
  | "Draft"
  | "Ready"
  | "Scheduled"
  | "Published"
  | "Failed";

export interface GeneratedPost {
  id: string;

  title: string;
  caption: string;
  primaryText: string;

  cta?: string;
  hashtags?: string;
  imagePrompt?: string;

  category: string;
  platform: string;

  status: PostStatus;

  createdAt: any;
  updatedAt?: any;
}