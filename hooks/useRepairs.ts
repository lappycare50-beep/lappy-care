"use client";

import { useCallback, useEffect, useState } from "react";

import { Repair } from "@/types/repair";
import { getRepairs } from "@/services/repairService";

export function useRepairs() {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getRepairs();

      setRepairs(data);
    } catch (err) {
      console.error(err);

      setError("Failed to load repairs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    repairs,
    loading,
    error,
    refresh,
  };
}