// src/types/review.ts

import { Timestamp } from "firebase/firestore";

export type ReviewStatus =
  | "Started"
  | "Experience Submitted"
  | "Suggestion Generated"
  | "Accepted"
  | "Completed";

export interface CustomerReview {
  id: string;

  businessProfileId?: string;

  customerName?: string;

  experience: string;

  suggestedReview?: string;

  finalReview?: string;

  status: ReviewStatus;

  source: "QR" | "Website";

  createdAt?: Timestamp | Date;

  updatedAt?: Timestamp | Date;
}