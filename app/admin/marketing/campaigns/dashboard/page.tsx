import MarketingSidebar from "@/components/marketing/MarketingSidebar";

import CampaignStats from "@/components/marketing/campaigns/CampaignStats";
import CampaignBudget from "@/components/marketing/campaigns/CampaignBudget";
import RecentCampaigns from "@/components/marketing/campaigns/RecentCampaigns";

import {
  getCampaignDashboardData,
} from "@/services/campaignDashboardService";

export const metadata = {
  title:
    "Campaign Dashboard | Lappy Care ERP",
};

export default async function CampaignDashboardPage() {
  const dashboard =
    await getCampaignDashboardData();

  return (
    <div className="flex min-h-screen bg-zinc-950">

      <MarketingSidebar />

      <main className="flex-1 overflow-y-auto p-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-white">
            Campaign Dashboard
          </h1>

          <p className="mt-2 text-zinc-400">
            Live overview of all marketing campaigns.
          </p>

        </div>

        <CampaignStats
          totalCampaigns={
            dashboard.totalCampaigns
          }
          activeCampaigns={
            dashboard.activeCampaigns
          }
          completedCampaigns={
            dashboard.completedCampaigns
          }
          draftCampaigns={
            dashboard.draftCampaigns
          }
          scheduledCampaigns={
            dashboard.scheduledCampaigns
          }
          cancelledCampaigns={
            dashboard.cancelledCampaigns
          }
        />

        <div className="mt-8">

          <CampaignBudget
            totalBudget={
              dashboard.totalBudget
            }
            totalSpend={
              dashboard.totalSpend
            }
          />

        </div>

        <div className="mt-8">

          <RecentCampaigns
            campaigns={
              dashboard.recentCampaigns
            }
          />

        </div>

      </main>

    </div>
  );
}