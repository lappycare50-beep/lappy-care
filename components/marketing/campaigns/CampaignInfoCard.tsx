"use client";

import { Campaign } from "@/types/campaign";

interface Props {
  campaign: Campaign;
}

function formatDate(value: any) {
  if (!value) return "-";

  try {
    if (typeof value.toDate === "function") {
      return value.toDate().toLocaleDateString();
    }

    if (value.seconds !== undefined) {
      return new Date(
        value.seconds * 1000
      ).toLocaleDateString();
    }

    return new Date(value).toLocaleDateString();
  } catch {
    return "-";
  }
}

export default function CampaignInfoCard({
  campaign,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Campaign Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Campaign Name
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {campaign.name}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Platform
          </p>

          <p className="mt-2 text-white">
            {campaign.platform}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Objective
          </p>

          <p className="mt-2 text-white">
            {campaign.objective}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Status
          </p>

          <span className="mt-2 inline-flex rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-semibold text-yellow-400">
            {campaign.status}
          </span>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Budget
          </p>

          <p className="mt-2 text-white">
            ₹{campaign.budget.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Duration
          </p>

          <p className="mt-2 text-white">
            {formatDate(campaign.startDate)}
            {"  "}
            →
            {"  "}
            {formatDate(campaign.endDate)}
          </p>
        </div>

        <div className="md:col-span-2">

          <p className="text-xs uppercase text-zinc-500">
            Description
          </p>

          <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4">

            <p className="whitespace-pre-wrap text-zinc-300">
              {campaign.description || "-"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}