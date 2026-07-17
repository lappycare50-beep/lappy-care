"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { RepairDetails } from "@/components/repair/details";

import { getRepairById } from "@/services/repairService";

import { Repair } from "@/types/repair";

export default function RepairDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [repair, setRepair] =
    useState<Repair | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // ==========================================
  // Load Repair
  // ==========================================

  useEffect(() => {
    async function loadRepair() {
      try {
        setLoading(true);

        setError(null);

        const data =
          await getRepairById(id);

        if (!data) {
          setError("Repair not found.");
          return;
        }

        setRepair(data);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load repair."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadRepair();
    }
  }, [id]);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-lg text-gray-400">
          Loading Repair...
        </div>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6">
        <h2 className="text-xl font-bold text-red-400">
          Error
        </h2>

        <p className="mt-2 text-gray-300">
          {error}
        </p>
      </div>
    );
  }

  // ==========================================
  // Not Found
  // ==========================================

  if (!repair) {
    return (
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-6">
        <h2 className="text-xl font-bold text-yellow-400">
          Repair Not Found
        </h2>

        <p className="mt-2 text-gray-300">
          The requested repair record does
          not exist.
        </p>
      </div>
    );
  }

  // ==========================================
  // Page
  // ==========================================

  return (
    <main className="space-y-6 p-6">
      <RepairDetails repair={repair} />
    </main>
  );
}