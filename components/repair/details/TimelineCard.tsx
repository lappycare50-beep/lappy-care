"use client";

import {
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { RepairTimeline } from "@/types/repair";

import RepairStatusBadge from "../table/RepairStatusBadge";

interface TimelineCardProps {
  timeline: RepairTimeline[];
}

export default function TimelineCard({
  timeline,
}: TimelineCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
      {/* ==========================================
          Header
      ========================================== */}

      <div className="mb-6 flex items-center gap-3">
        <Clock3
          size={22}
          className="text-yellow-400"
        />

        <h2 className="text-xl font-bold text-yellow-400">
          Repair Timeline
        </h2>
      </div>

      {/* ==========================================
          Empty State
      ========================================== */}

      {timeline.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/10 bg-[#1A1A1A] px-4 py-6 text-center text-gray-500">
          No timeline available.
        </div>
      ) : (
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="relative flex gap-4"
            >
              {/* Timeline Line */}

              {index !== timeline.length - 1 && (
                <div className="absolute left-4 top-9 h-full w-px bg-white/10" />
              )}

              {/* Timeline Dot */}

              <div className="relative z-10 mt-1 rounded-full bg-green-500 p-1">
                <CheckCircle2
                  size={14}
                  className="text-white"
                />
              </div>

              {/* Content */}

              <div className="flex-1 rounded-lg border border-white/10 bg-[#1A1A1A] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <RepairStatusBadge
                    status={item.status}
                  />

                  <span className="text-sm text-gray-400">
                    {item.createdAt}
                  </span>
                </div>

                {item.note && (
                  <p className="mt-3 text-gray-300">
                    {item.note}
                  </p>
                )}

                {item.updatedBy && (
                  <p className="mt-2 text-sm text-gray-500">
                    Updated By:{" "}
                    <span className="text-white">
                      {item.updatedBy}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}