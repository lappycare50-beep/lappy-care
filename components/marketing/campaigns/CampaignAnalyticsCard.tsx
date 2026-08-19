"use client";

import { Campaign } from "@/types/campaign";

interface Props {
  campaign: Campaign;
}

interface StatRowProps {
  label: string;
  value: number | string;
  highlight?: boolean;
}

function StatRow({
  label,
  value,
  highlight = false,
}: StatRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 py-3 last:border-0">

      <span className="text-zinc-400">
        {label}
      </span>

      <span
        className={`font-semibold ${
          highlight
            ? "text-yellow-400"
            : "text-white"
        }`}
      >
        {typeof value === "number"
          ? value.toLocaleString()
          : value}
      </span>

    </div>
  );
}

export default function CampaignAnalyticsCard({
  campaign,
}: Props) {
  const analytics =
    campaign.analytics;

  const ctr =
    analytics.impressions > 0
      ? (
          (analytics.clicks /
            analytics.impressions) *
          100
        ).toFixed(2)
      : "0.00";

  const conversionRate =
    analytics.clicks > 0
      ? (
          (analytics.conversions /
            analytics.clicks) *
          100
        ).toFixed(2)
      : "0.00";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Campaign Analytics
      </h2>

      <StatRow
        label="Impressions"
        value={analytics.impressions}
      />

      <StatRow
        label="Clicks"
        value={analytics.clicks}
      />

      <StatRow
        label="Leads"
        value={analytics.leads}
      />

      <StatRow
        label="Conversions"
        value={analytics.conversions}
      />

      <StatRow
        label="CTR"
        value={`${ctr}%`}
      />

      <StatRow
        label="Conversion Rate"
        value={`${conversionRate}%`}
      />

      <StatRow
        label="Spend"
        value={`₹${analytics.spend.toLocaleString()}`}
        highlight
      />

    </div>
  );
}