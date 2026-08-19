"use client";

import Link from "next/link";

interface Props {
  campaignId: string;

  onManagePosts: () => void;
}

export default function CampaignQuickActions({
  campaignId,
  onManagePosts,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="space-y-3">

        <Link
          href={`/admin/marketing/campaigns/${campaignId}/edit`}
          className="block rounded-lg bg-yellow-500 px-4 py-3 text-center font-semibold text-black transition hover:bg-yellow-400"
        >
          Edit Campaign
        </Link>

        <button
          type="button"
          onClick={onManagePosts}
          className="block w-full rounded-lg border border-zinc-700 px-4 py-3 text-center text-white transition hover:bg-zinc-800"
        >
          Attach Generated Posts
        </button>

        <Link
          href="/admin/marketing/campaigns"
          className="block rounded-lg border border-zinc-700 px-4 py-3 text-center text-zinc-300 transition hover:bg-zinc-800"
        >
          Back to Campaigns
        </Link>

      </div>

    </div>
  );
}