// src/types/generatedPost.ts

import { Timestamp } from "firebase/firestore";

import {
  Platform,
  Language,
  Tone,
  PostStatus,
} from "./marketing";

export type ContentCategory =
  | "Laptop Repair"
  | "Screen Replacement"
  | "Battery Replacement"
  | "Keyboard Replacement"
  | "Motherboard Repair"
  | "SSD Upgrade"
  | "RAM Upgrade"
  | "Refurbished Laptop"
  | "Laptop Accessories"
  | "Festival Offer"
  | "Customer Review"
  | "Educational";

export interface GeneratedPost {
  id: string;

  businessProfileId: string;

  platform: Platform;

  category: ContentCategory;

  language: Language;

  tone: Tone;

  targetLocation: string;

  keywords: string[];

  title: string;

  primaryText: string;

  caption: string;

  hashtags: string[];

  callToAction: string;

  imagePrompt: string;

  imageUrl?: string;

  status: PostStatus;

  scheduledAt?: Timestamp | Date;

  publishedAt?: Timestamp | Date;

  createdAt?: Timestamp | Date;

  updatedAt?: Timestamp | Date;
}