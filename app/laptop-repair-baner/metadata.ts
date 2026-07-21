import type { Metadata } from "next";

const siteUrl = "https://lappycarepune.in";
const pageUrl = `${siteUrl}/laptop-repair-baner`;

export const metadata: Metadata = {
  title: "Laptop Repair Baner Pune | Laptop Service Near Baner | Lappy Care",

  description:
    "Looking for laptop repair in Baner, Pune? Lappy Care provides motherboard repair, screen replacement, SSD upgrades, battery replacement, keyboard repair, data recovery and pickup & drop service across Baner and nearby areas.",

  keywords: [
    "Laptop Repair Baner",
    "Laptop Repair Baner Pune",
    "Laptop Service Baner",
    "Laptop Repair Near Baner",
    "Computer Repair Baner",
    "Dell Laptop Repair Baner",
    "HP Laptop Repair Baner",
    "Lenovo Laptop Repair Baner",
    "Apple MacBook Repair Baner",
    "Laptop Screen Replacement Baner",
    "Laptop Motherboard Repair Baner",
    "SSD Upgrade Baner",
    "Battery Replacement Baner",
    "Data Recovery Baner",
    "Laptop Repair Pune",
  ],

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    title: "Laptop Repair Baner Pune | Lappy Care",
    description:
      "Professional laptop repair services in Baner with pickup & drop, expert technicians and transparent pricing.",
    url: pageUrl,
    siteName: "Lappy Care",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Laptop Repair Baner - Lappy Care",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Laptop Repair Baner Pune | Lappy Care",
    description:
      "Trusted laptop repair service in Baner for Dell, HP, Lenovo, ASUS, Acer and Apple MacBook.",
    images: [`${siteUrl}/og-image.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  category: "Laptop Repair",
};