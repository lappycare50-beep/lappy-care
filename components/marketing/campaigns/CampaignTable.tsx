"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Campaign } from "@/types/campaign";

import {
  deleteCampaign,
  getCampaigns,
} from "@/services/campaignService";

export default function CampaignTable() {
  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      setLoading(true);

      const data =
        await getCampaigns();

      setCampaigns(data);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to load campaigns."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    campaign: Campaign
  ) {
    const confirmed = window.confirm(
      `Delete "${campaign.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCampaign(
        campaign.id
      );

      setCampaigns((prev) =>
        prev.filter(
          (item) =>
            item.id !== campaign.id
        )
      );

      alert(
        "Campaign deleted successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to delete campaign."
      );
    }
  }

  function formatDate(
    value: any
  ) {
    if (!value) return "-";

    try {
      if (
        typeof value.toDate ===
        "function"
      ) {
        return value
          .toDate()
          .toLocaleDateString();
      }

      if (
        value.seconds !== undefined
      ) {
        return new Date(
          value.seconds * 1000
        ).toLocaleDateString();
      }

      return new Date(
        value
      ).toLocaleDateString();
    } catch {
      return "-";
    }
  }

  const filteredCampaigns =
    useMemo(() => {
      return campaigns.filter(
        (campaign) => {
          const matchesSearch =
            campaign.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesStatus =
            statusFilter ===
              "All" ||
            campaign.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      campaigns,
      search,
      statusFilter,
    ]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-300">
        Loading campaigns...
      </div>
    );
  }
    return (
    <div className="space-y-6">

      {/* Toolbar */}

      <div className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:grid-cols-2">

        <input
          type="text"
          placeholder="🔍 Search campaigns..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-yellow-500 focus:outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
        >
          <option>All</option>
          <option>Draft</option>
          <option>Active</option>
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

        <table className="min-w-full">

          <thead className="bg-zinc-950">

            <tr>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Campaign
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Platform
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Status
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Budget
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Start
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                End
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-zinc-300">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCampaigns.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="px-6 py-16 text-center"
                >

                  <h3 className="text-2xl font-bold text-white">
                    No Campaigns Found
                  </h3>

                  <p className="mt-3 text-zinc-400">
                    Create your first marketing campaign.
                  </p>

                  <Link
                    href="/admin/marketing/campaigns/create"
                    className="mt-8 inline-flex rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                  >
                    + Create Campaign
                  </Link>

                </td>

              </tr>

            ) : (

              filteredCampaigns.map(
                (campaign) => (

                  <tr
                    key={campaign.id}
                    className="border-t border-zinc-800 hover:bg-zinc-800/40"
                  >

                    <td className="px-5 py-4 font-medium text-white">
                      {campaign.name}
                    </td>

                    <td className="px-5 py-4 text-zinc-300">
                      {campaign.platform}
                    </td>

                    <td className="px-5 py-4">

                      <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400">
                        {campaign.status}
                      </span>

                    </td>

                    <td className="px-5 py-4 text-zinc-300">
                      ₹{campaign.budget.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-zinc-400">
                      {formatDate(
                        campaign.startDate
                      )}
                    </td>

                    <td className="px-5 py-4 text-zinc-400">
                      {formatDate(
                        campaign.endDate
                      )}
                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <Link
                          href={`/admin/marketing/campaigns/${campaign.id}`}
                          className="rounded-lg border border-blue-500 p-2 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                        >
                          <Eye size={16} />
                        </Link>

                        <Link
                          href={`/admin/marketing/campaigns/${campaign.id}/edit`}
                          className="rounded-lg border border-yellow-500 p-2 text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              campaign
                            )
                          }
                          className="rounded-lg border border-red-500 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}