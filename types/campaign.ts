import { Timestamp } from "firebase/firestore";

export type CampaignObjective =
  | "Lead Generation"
  | "Sales"
  | "Brand Awareness"
  | "Website Traffic"
  | "Engagement";

export type CampaignPlatform =
  | "Google Business"
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "X"
  | "Multi Platform";

export type CampaignStatus =
  | "Draft"
  | "Active"
  | "Scheduled"
  | "Completed"
  | "Cancelled";

export interface CampaignAnalytics {
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  spend: number;
}

export interface Campaign {
  id: string;

  name: string;

  objective: CampaignObjective;

  platform: CampaignPlatform;

  status: CampaignStatus;

  budget: number;

  description: string;

  startDate?: Timestamp | Date;

  endDate?: Timestamp | Date;

  businessProfileId?: string;

  generatedPostIds: string[];

  analytics: CampaignAnalytics;

  createdAt?: Timestamp | Date;

  updatedAt?: Timestamp | Date;
}