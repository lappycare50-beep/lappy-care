"use client";

import { LucideIcon, TrendingUp } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  description,
}: DashboardCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10">

      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-500/5 blur-3xl transition-opacity duration-300 group-hover:bg-yellow-500/10" />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          {description ? (
            <p className="mt-2 text-sm text-zinc-500">
              {description}
            </p>
          ) : (
            <div className="mt-3 flex items-center gap-2 text-sm text-emerald-400">

              <TrendingUp className="h-4 w-4" />

              <span>Live Data</span>

            </div>
          )}

        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-500/20">

          <Icon className="h-8 w-8 text-yellow-400" />

        </div>

      </div>

      {/* Progress Bar */}

      <div className="mt-6">

        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-500 group-hover:w-full" />

        </div>

      </div>

    </div>
  );
}