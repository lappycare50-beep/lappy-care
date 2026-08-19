import { notFound } from "next/navigation";

import MarketingSidebar from "@/components/marketing/MarketingSidebar";
import CampaignDetails from "@/components/marketing/campaigns/CampaignDetails";

import { getCampaign } from "@/services/campaignService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CampaignDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const campaign = await getCampaign(id);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">

      <MarketingSidebar />

      <main className="flex-1 overflow-y-auto p-8">

        <CampaignDetails
          campaign={campaign}
        />

      </main>

    </div>
  );
}