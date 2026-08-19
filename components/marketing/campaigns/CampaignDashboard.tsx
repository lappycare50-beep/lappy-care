"use client";

import Link from "next/link";

import {
  Megaphone,
  PlayCircle,
  CheckCircle2,
  FileText,
  CalendarClock,
  Ban,
  IndianRupee,
  BarChart3,
} from "lucide-react";

interface Props {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  draftCampaigns: number;
  scheduledCampaigns: number;
  cancelledCampaigns: number;

  totalBudget: number;
  totalSpend: number;
}

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
}: CardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div
          className={`rounded-xl p-4 ${color}`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>

      </div>

    </div>
  );
}

export default function CampaignDashboard({
  totalCampaigns,
  activeCampaigns,
  completedCampaigns,
  draftCampaigns,
  scheduledCampaigns,
  cancelledCampaigns,
  totalBudget,
  totalSpend,
}: Props) {
  const remainingBudget =
    totalBudget - totalSpend;

  return (
    <div className="space-y-8">

      {/* Campaign Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <DashboardCard
          title="Total Campaigns"
          value={totalCampaigns}
          icon={Megaphone}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Active"
          value={activeCampaigns}
          icon={PlayCircle}
          color="bg-green-600"
        />

        <DashboardCard
          title="Completed"
          value={completedCampaigns}
          icon={CheckCircle2}
          color="bg-emerald-600"
        />

        <DashboardCard
          title="Draft"
          value={draftCampaigns}
          icon={FileText}
          color="bg-yellow-600"
        />

        <DashboardCard
          title="Scheduled"
          value={scheduledCampaigns}
          icon={CalendarClock}
          color="bg-indigo-600"
        />

        <DashboardCard
          title="Cancelled"
          value={cancelledCampaigns}
          icon={Ban}
          color="bg-red-600"
        />

      </div>

      {/* Budget */}

      <div className="grid gap-6 lg:grid-cols-3">

        <DashboardCard
          title="Total Budget"
          value={`₹${totalBudget.toLocaleString()}`}
          icon={IndianRupee}
          color="bg-yellow-600"
        />

        <DashboardCard
          title="Total Spend"
          value={`₹${totalSpend.toLocaleString()}`}
          icon={BarChart3}
          color="bg-orange-600"
        />

        <DashboardCard
          title="Remaining Budget"
          value={`₹${remainingBudget.toLocaleString()}`}
          icon={IndianRupee}
          color="bg-green-700"
        />

      </div>

      {/* CTA */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Create a New Campaign
            </h2>

            <p className="mt-2 text-zinc-400">
              Organize AI generated posts into campaigns and track performance.
            </p>

          </div>

          <Link
            href="/admin/marketing/campaigns/create"
            className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            + Create Campaign
          </Link>

        </div>

      </div>

    </div>
  );
}