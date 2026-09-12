"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Repair } from "@/types/repair";
import { getRepairs } from "@/services/repairService";

export function useRepairs() {
  const [
    repairs,
    setRepairs,
  ] = useState<Repair[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const refresh =
    useCallback(
      async (
        forceRefresh = false
      ) => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getRepairs(
              forceRefresh
            );

          setRepairs(data);
        } catch (err) {
          console.error(
            "Repair Load Error:",
            err
          );

          setError(
            "Failed to load repairs."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  const removeRepair =
    useCallback(
      (repairId: string) => {
        setRepairs(
          (previous) =>
            previous.filter(
              (repair) =>
                repair.id !==
                repairId
            )
        );
      },
      []
    );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    repairs,
    loading,
    error,
    refresh,
    removeRepair,
  };
}
