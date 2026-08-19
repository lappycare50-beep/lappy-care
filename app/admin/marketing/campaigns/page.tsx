import Link from "next/link";

import MarketingSidebar from "@/components/marketing/MarketingSidebar";
import CampaignTable from "@/components/marketing/campaigns/CampaignTable";

export const metadata = {
  title: "Campaigns | Lappy Care ERP",
};

export default function CampaignsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">

      <MarketingSidebar />

      <main className="flex-1 overflow-y-auto p-8">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Campaigns
            </h1>

            <p className="mt-2 text-zinc-400">
              Create, organize and manage your AI marketing campaigns.
            </p>

          </div>

          <Link
            href="/admin/marketing/campaigns/create"
            className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            + Create Campaign
          </Link>

        </div>

        {/* Campaign Table */}

        <CampaignTable />

      </main>

    </div>
  );
}