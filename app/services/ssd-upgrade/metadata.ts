import type { Metadata } from "next";

const SITE_URL = "https://lappycarepune.in";
const PAGE_URL = `${SITE_URL}/services/ssd-upgrade`;

export const metadata: Metadata = {
  title:
    "Laptop SSD Upgrade in Pune | NVMe & SATA SSD Installation | Lappy Care",

  description:
    "Upgrade your laptop with a high-speed SSD at Lappy Care Pune. Professional NVMe and SATA SSD installation for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook, MSI and more. Faster boot time, improved performance and expert installation across Wakad, Hinjawadi, Baner and PCMC.",

  keywords: [
    "SSD Upgrade Pune",
    "Laptop SSD Upgrade Pune",
    "SSD Installation Pune",
    "Laptop SSD Installation",
    "NVMe SSD Upgrade",
    "SATA SSD Upgrade",
    "Laptop Performance Upgrade",
    "Laptop Speed Upgrade",
    "Laptop Slow Performance Solution",
    "SSD Upgrade Wakad",
    "SSD Upgrade Hinjawadi",
    "SSD Upgrade Baner",
    "SSD Upgrade PCMC",
    "SSD Upgrade Near Me",
    "HP SSD Upgrade",
    "Dell SSD Upgrade",
    "Lenovo SSD Upgrade",
    "ASUS SSD Upgrade",
    "Acer SSD Upgrade",
    "Apple MacBook SSD Upgrade",
    "Lappy Care Pune",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    title:
      "Laptop SSD Upgrade in Pune | NVMe & SATA SSD Installation | Lappy Care",
    description:
      "Professional SSD upgrade services in Pune for faster laptop performance. Genuine NVMe and SATA SSD installation with expert service for all major laptop brands.",
    siteName: "Lappy Care",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/images/ssd-upgrade-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Laptop SSD Upgrade Service - Lappy Care Pune",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Laptop SSD Upgrade in Pune | Lappy Care",
    description:
      "Upgrade your laptop with a fast NVMe or SATA SSD. Professional installation and performance optimization in Pune.",
    images: [`${SITE_URL}/images/ssd-upgrade-og.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Laptop Repair Service",

  applicationName: "Lappy Care",

  creator: "Lappy Care",

  publisher: "Lappy Care",

  metadataBase: new URL(SITE_URL),
};