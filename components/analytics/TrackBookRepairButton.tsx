"use client";

import Link from "next/link";

import { trackBookRepairClick } from "@/lib/analytics";

type Props = {
  className?: string;
};

export default function TrackBookRepairButton({
  className,
}: Props) {
  return (
    <Link
      href="/#booking"
      onClick={trackBookRepairClick}
      className={className}
    >
      Book Repair
    </Link>
  );
}