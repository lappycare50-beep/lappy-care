"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import MarketingSidebar from "@/components/marketing/MarketingSidebar";

import {
  getCampaign,
  updateCampaign,
} from "@/services/campaignService";

import {
  CampaignObjective,
  CampaignPlatform,
  CampaignStatus,
} from "@/types/campaign";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditCampaignPage({
  params,
}: Props) {
  const router = useRouter();

  const [campaignId, setCampaignId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [name, setName] =
    useState("");

  const [objective, setObjective] =
    useState<CampaignObjective>(
      "Lead Generation"
    );

  const [platform, setPlatform] =
    useState<CampaignPlatform>(
      "Google Business"
    );

  const [status, setStatus] =
    useState<CampaignStatus>("Draft");

  const [budget, setBudget] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [description, setDescription] =
    useState("");

  useEffect(() => {
    async function loadCampaign() {
      const { id } = await params;

      setCampaignId(id);

      try {
        const campaign =
          await getCampaign(id);

        if (!campaign) {
          alert("Campaign not found.");

          router.push(
            "/admin/marketing/campaigns"
          );

          return;
        }

        setName(campaign.name);

        setObjective(
          campaign.objective
        );

        setPlatform(
          campaign.platform
        );

        setStatus(
          campaign.status
        );

        setBudget(
          String(campaign.budget)
        );

        setDescription(
          campaign.description
        );

        if (campaign.startDate) {
          const date =
            typeof (
              campaign.startDate as any
            ).toDate === "function"
              ? (
                  campaign.startDate as any
                ).toDate()
              : new Date(
                  campaign.startDate as any
                );

          setStartDate(
            date
              .toISOString()
              .split("T")[0]
          );
        }

        if (campaign.endDate) {
          const date =
            typeof (
              campaign.endDate as any
            ).toDate === "function"
              ? (
                  campaign.endDate as any
                ).toDate()
              : new Date(
                  campaign.endDate as any
                );

          setEndDate(
            date
              .toISOString()
              .split("T")[0]
          );
        }
      } catch (error) {
        console.error(error);

        alert(
          "Failed to load campaign."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCampaign();
  }, [params, router]);

  async function handleSave() {
    if (!name.trim()) {
      alert(
        "Campaign name is required."
      );

      return;
    }

    try {
      setSaving(true);

      await updateCampaign(
        campaignId,
        {
          name,

          objective,

          platform,

          status,

          budget:
            Number(budget) || 0,

          description,

          startDate: startDate
            ? new Date(startDate)
            : undefined,

          endDate: endDate
            ? new Date(endDate)
            : undefined,
        }
      );

      alert(
        "Campaign updated successfully."
      );

      router.push(
        `/admin/marketing/campaigns/${campaignId}`
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update campaign."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading campaign...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">

      <MarketingSidebar />

      <main className="flex-1 overflow-y-auto p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Edit Campaign
            </h1>

            <p className="mt-2 text-zinc-400">
              Update campaign details.
            </p>

          </div>

          <Link
            href={`/admin/marketing/campaigns/${campaignId}`}
            className="rounded-lg border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:bg-zinc-900"
          >
            Back
          </Link>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <div className="grid gap-6 md:grid-cols-2">

                      <div>

              <label className="mb-2 block text-sm font-semibold text-white">
                Campaign Name
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-white">
                Objective
              </label>

              <select
                value={objective}
                onChange={(e) =>
                  setObjective(
                    e.target.value as CampaignObjective
                  )
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
              >
                <option>Lead Generation</option>
                <option>Sales</option>
                <option>Brand Awareness</option>
                <option>Website Traffic</option>
                <option>Engagement</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-white">
                Platform
              </label>

              <select
                value={platform}
                onChange={(e) =>
                  setPlatform(
                    e.target.value as CampaignPlatform
                  )
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
              >
                <option>Google Business</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>LinkedIn</option>
                <option>X</option>
                <option>Multi Platform</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-white">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as CampaignStatus
                  )
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
              >
                <option>Draft</option>
                <option>Active</option>
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-white">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-white">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-white">
                Budget
              </label>

              <input
                type="number"
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-white">
                Description
              </label>

              <textarea
                rows={5}
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
              />

            </div>

          </div>

          <div className="mt-8 flex justify-end gap-4">

            <Link
              href={`/admin/marketing/campaigns/${campaignId}`}
              className="rounded-lg border border-zinc-700 px-6 py-3 text-zinc-300 transition hover:bg-zinc-800"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}
