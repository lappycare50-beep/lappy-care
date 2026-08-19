"use client";

import Link from "next/link";

import { Campaign } from "@/types/campaign";

interface Props {
  campaigns: Campaign[];
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

function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-500/20 text-green-400";

    case "Completed":
      return "bg-blue-500/20 text-blue-400";

    case "Scheduled":
      return "bg-indigo-500/20 text-indigo-400";

    case "Cancelled":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-yellow-500/20 text-yellow-400";
  }
}

export default function RecentCampaigns({
  campaigns,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Recent Campaigns
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Latest marketing campaigns
          </p>

        </div>

        <Link
          href="/admin/marketing/campaigns"
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
        >
          View All
        </Link>

      </div>

      {campaigns.length === 0 ? (

        <div className="rounded-xl border border-dashed border-zinc-700 py-12 text-center">

          <h3 className="text-lg font-semibold text-white">
            No Campaigns
          </h3>

          <p className="mt-2 text-zinc-400">
            Create your first campaign to get started.
          </p>

          <Link
            href="/admin/marketing/campaigns/create"
            className="mt-6 inline-block rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            + Create Campaign
          </Link>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b border-zinc-800">

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-400">
                  Campaign
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-400">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-400">
                  Budget
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-400">
                  Start
                </th>

                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-zinc-400">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {campaigns.map((campaign) => (

                <tr
                  key={campaign.id}
                  className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/40"
                >

                  <td className="px-4 py-4">

                    <div>

                      <p className="font-semibold text-white">
                        {campaign.name}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        {campaign.platform}
                      </p>

                    </div>

                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>

                  </td>

                  <td className="px-4 py-4 text-white">
                    ₹
                    {campaign.budget.toLocaleString()}
                  </td>

                  <td className="px-4 py-4 text-zinc-400">
                    {formatDate(
                      campaign.startDate
                    )}
                  </td>

                  <td className="px-4 py-4">

                    <div className="flex justify-end gap-2">

                      <Link
                        href={`/admin/marketing/campaigns/${campaign.id}`}
                        className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/marketing/campaigns/${campaign.id}/edit`}
                        className="rounded-lg border border-blue-500 px-3 py-2 text-sm font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
                      >
                        Edit
                      </Link>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}