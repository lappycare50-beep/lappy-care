"use client";

import { Repair } from "@/types/repair";

type Props = {
  status: Repair["status"];
};

export default function TrackingStatus({
  status,
}: Props) {

  const styles: Record<
    Repair["status"],
    string
  > = {

    Received:
      "bg-blue-100 text-blue-700",

    Diagnosing:
      "bg-indigo-100 text-indigo-700",

    "Waiting Approval":
      "bg-yellow-100 text-yellow-700",

    "Waiting Parts":
      "bg-orange-100 text-orange-700",

    Repairing:
      "bg-purple-100 text-purple-700",

    Testing:
      "bg-cyan-100 text-cyan-700",

    Ready:
      "bg-green-100 text-green-700",

    Delivered:
      "bg-emerald-100 text-emerald-700",

    Cancelled:
      "bg-red-100 text-red-700",

  };

  return (

    <span
      className={`rounded-full px-4 py-2 text-sm font-bold ${styles[status]}`}
    >

      {status.toUpperCase()}

    </span>

  );

}