import { Campaign } from "@/types/campaign";

import { getCampaigns } from "./campaignService";

export interface CampaignDashboardData {
  totalCampaigns: number;

  activeCampaigns: number;

  draftCampaigns: number;

  scheduledCampaigns: number;

  completedCampaigns: number;

  cancelledCampaigns: number;

  totalBudget: number;

  totalSpend: number;

  remainingBudget: number;

  recentCampaigns: Campaign[];
}

export async function getCampaignDashboardData(): Promise<CampaignDashboardData> {
  const campaigns =
    await getCampaigns();

  const totalCampaigns =
    campaigns.length;

  const activeCampaigns =
    campaigns.filter(
      (c) => c.status === "Active"
    ).length;

  const draftCampaigns =
    campaigns.filter(
      (c) => c.status === "Draft"
    ).length;

  const scheduledCampaigns =
    campaigns.filter(
      (c) => c.status === "Scheduled"
    ).length;

  const completedCampaigns =
    campaigns.filter(
      (c) => c.status === "Completed"
    ).length;

  const cancelledCampaigns =
    campaigns.filter(
      (c) => c.status === "Cancelled"
    ).length;

  const totalBudget =
    campaigns.reduce(
      (sum, c) => sum + c.budget,
      0
    );

  const totalSpend =
    campaigns.reduce(
      (sum, c) =>
        sum + c.analytics.spend,
      0
    );

  const remainingBudget =
    totalBudget - totalSpend;

  const recentCampaigns =
    [...campaigns].slice(0, 5);

  return {
    totalCampaigns,

    activeCampaigns,

    draftCampaigns,

    scheduledCampaigns,

    completedCampaigns,

    cancelledCampaigns,

    totalBudget,

    totalSpend,

    remainingBudget,

    recentCampaigns,
  };
}