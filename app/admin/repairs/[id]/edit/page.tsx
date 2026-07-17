"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import RepairForm from "@/components/repairs/RepairForm";

import { getRepairById } from "@/services/repairService";

import { Repair } from "@/types/repair";

export default function EditRepairPage() {
  const params = useParams();

  const router = useRouter();

  const id = params.id as string;

  const [repair, setRepair] =
    useState<Repair | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadRepair() {
      try {
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

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (error || !repair) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <RepairForm
        editRepair={repair}
        onSuccess={() =>
          router.push(
            `/admin/repairs/${repair.id}`
          )
        }
      />
    </div>
  );
}