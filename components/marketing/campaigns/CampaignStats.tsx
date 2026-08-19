"use client";

import {
  Megaphone,
  PlayCircle,
  CheckCircle2,
  FileText,
  CalendarClock,
  Ban,
} from "lucide-react";

interface Props {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  draftCampaigns: number;
  scheduledCampaigns: number;
  cancelledCampaigns: number;
}

interface CardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

function StatCard({
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

export default function CampaignStats({
  totalCampaigns,
  activeCampaigns,
  completedCampaigns,
  draftCampaigns,
  scheduledCampaigns,
  cancelledCampaigns,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      <StatCard
        title="Total Campaigns"
        value={totalCampaigns}
        icon={Megaphone}
        color="bg-blue-600"
      />

      <StatCard
        title="Active"
        value={activeCampaigns}
        icon={PlayCircle}
        color="bg-green-600"
      />

      <StatCard
        title="Completed"
        value={completedCampaigns}
        icon={CheckCircle2}
        color="bg-emerald-600"
      />

      <StatCard
        title="Draft"
        value={draftCampaigns}
        icon={FileText}
        color="bg-yellow-600"
      />

      <StatCard
        title="Scheduled"
        value={scheduledCampaigns}
        icon={CalendarClock}
        color="bg-indigo-600"
      />

      <StatCard
        title="Cancelled"
        value={cancelledCampaigns}
        icon={Ban}
        color="bg-red-600"
      />

    </div>
  );
}