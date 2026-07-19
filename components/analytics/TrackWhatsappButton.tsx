"use client";

import { trackWhatsAppClick } from "@/lib/analytics";

type Props = {
  className?: string;
};

export default function TrackWhatsappButton({
  className,
}: Props) {
  return (
    <a
      href="https://wa.me/919595057006"
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppClick}
      className={className}
    >
      WhatsApp
    </a>
  );
}