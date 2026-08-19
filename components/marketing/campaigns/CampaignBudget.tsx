"use client";

import {
  IndianRupee,
  Wallet,
  TrendingUp,
  PieChart,
} from "lucide-react";

interface Props {
  totalBudget: number;
  totalSpend: number;
}

interface BudgetCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

function BudgetCard({
  title,
  value,
  icon: Icon,
  color,
}: BudgetCardProps) {
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

export default function CampaignBudget({
  totalBudget,
  totalSpend,
}: Props) {
  const remainingBudget =
    Math.max(0, totalBudget - totalSpend);

  const utilization =
    totalBudget > 0
      ? (
          (totalSpend / totalBudget) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <BudgetCard
          title="Total Budget"
          value={`₹${totalBudget.toLocaleString()}`}
          icon={IndianRupee}
          color="bg-blue-600"
        />

        <BudgetCard
          title="Total Spend"
          value={`₹${totalSpend.toLocaleString()}`}
          icon={TrendingUp}
          color="bg-orange-600"
        />

        <BudgetCard
          title="Remaining Budget"
          value={`₹${remainingBudget.toLocaleString()}`}
          icon={Wallet}
          color="bg-green-600"
        />

        <BudgetCard
          title="Budget Utilization"
          value={`${utilization}%`}
          icon={PieChart}
          color="bg-purple-600"
        />

      </div>

      {/* Progress */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <div className="mb-3 flex items-center justify-between">

          <span className="font-medium text-white">
            Budget Usage
          </span>

          <span className="text-sm font-semibold text-yellow-400">
            {utilization}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

          <div
            className="h-full rounded-full bg-yellow-500 transition-all duration-500"
            style={{
              width: `${Math.min(
                Number(utilization),
                100
              )}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}