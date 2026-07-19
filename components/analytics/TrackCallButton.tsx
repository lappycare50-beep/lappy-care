"use client";

import { trackCallClick } from "@/lib/analytics";

type Props = {
  className?: string;
};

export default function TrackCallButton({ className }: Props) {
  return (
    <a
      href="tel:+919595057006"
      onClick={trackCallClick}
      className={className}
    >
      📞 Call Now
    </a>
  );
}