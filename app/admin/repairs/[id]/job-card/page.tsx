"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import AdminLayout from "@/components/admin/AdminLayout";
import JobCardPreview from "@/components/jobcard/JobCardPreview";

import { Repair } from "@/types/repair";
import { getRepairById } from "@/services/repairService";

export default function JobCardPage() {
  const params = useParams();
  const id = params.id as string;

  const [repair, setRepair] = useState<Repair | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepair() {
      try {
        if (!id) return;

        const data = await getRepairById(id);

        setRepair(data);
      } catch (error) {
        console.error("Failed to load repair:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRepair();
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="text-xl text-white">
            Loading Job Card...
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!repair) {
    return (
      <AdminLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="rounded-xl bg-red-600 px-8 py-5 text-xl font-semibold text-white">
            Repair Not Found
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <JobCardPreview repair={repair} />
      </div>
    </AdminLayout>
  );
}