"use client";

import { Repair } from "@/types/repair";

import AccessoriesCard from "./AccessoriesCard";
import CustomerCard from "./CustomerCard";
import DeviceCard from "./DeviceCard";
import EstimateCard from "./EstimateCard";
import Header from "./Header";
import ProblemCard from "./ProblemCard";
import TimelineCard from "./TimelineCard";

interface RepairDetailsProps {
  repair: Repair;
}

export default function RepairDetails({
  repair,
}: RepairDetailsProps) {
  return (
    <div className="space-y-6">
      {/* ==========================================
          Header
      ========================================== */}

      <Header
        repair={repair}
        onPrint={() => window.print()}
      />

      {/* ==========================================
          Customer + Device
      ========================================== */}

      <div className="grid gap-6 xl:grid-cols-2">
        <CustomerCard
          customer={repair.customer}
        />

        <DeviceCard
          device={repair.device}
        />
      </div>

      {/* ==========================================
          Problem + Estimate
      ========================================== */}

      <div className="grid gap-6 xl:grid-cols-2">
        <ProblemCard
          problem={repair.problem}
        />

        <EstimateCard
          estimate={repair.estimate}
        />
      </div>

      {/* ==========================================
          Accessories
      ========================================== */}

      <AccessoriesCard
        accessories={repair.accessories}
      />

      {/* ==========================================
          Timeline
      ========================================== */}

      <TimelineCard
        timeline={repair.timeline}
      />
    </div>
  );
}