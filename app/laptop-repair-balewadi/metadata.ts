import type { Metadata } from "next";

const siteUrl = "https://lappycarepune.in";
const pageUrl = `${siteUrl}/laptop-repair-balewadi`;

export const metadata: Metadata = {
  title:
    "Laptop Repair Balewadi Pune | Laptop Service Near Balewadi | Lappy Care",

  description:
    "Looking for laptop repair in Balewadi, Pune? Lappy Care provides motherboard repair, screen replacement, SSD upgrades, battery replacement, keyboard repair, data recovery and pickup & drop service across Balewadi and nearby areas.",

  keywords: [
    "Laptop Repair Balewadi",
    "Laptop Repair Balewadi Pune",
    "Laptop Service Balewadi",
    "Laptop Repair Near Balewadi",
    "Computer Repair Balewadi",
    "Dell Laptop Repair Balewadi",
    "HP Laptop Repair Balewadi",
    "Lenovo Laptop Repair Balewadi",
    "MacBook Repair Balewadi",
    "Laptop Screen Replacement Balewadi",
    "Laptop Motherboard Repair Balewadi",
    "SSD Upgrade Balewadi",
    "Battery Replacement Balewadi",
    "Data Recovery Balewadi",
    "Laptop Repair Pune",
  ],

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    title: "Laptop Repair Balewadi Pune | Lappy Care",
    description:
      "Professional laptop repair services in Balewadi with pickup & drop, expert technicians and transparent pricing.",
    url: pageUrl,
    siteName: "Lappy Care",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Laptop Repair Balewadi - Lappy Care",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Laptop Repair Balewadi Pune | Lappy Care",
    description:
      "Trusted laptop repair service in Balewadi for Dell, HP, Lenovo, ASUS, Acer and Apple MacBook.",
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