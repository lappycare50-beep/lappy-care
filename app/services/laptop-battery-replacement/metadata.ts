import type { Metadata } from "next";

const SITE_URL = "https://lappycarepune.in";
const PAGE_URL = `${SITE_URL}/services/laptop-battery-replacement`;

const metadata: Metadata = {
  title:
    "Laptop Battery Replacement in Pune | HP, Dell, Lenovo | Lappy Care",

  description:
    "Professional laptop battery replacement in Pune for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook, MSI and other brands. Genuine & compatible batteries with expert installation and warranty on eligible replacements.",

  keywords: [
    "Laptop Battery Replacement Pune",
    "Laptop Battery Replacement Wakad",
    "Laptop Battery Replacement Hinjawadi",
    "Laptop Battery Replacement Baner",
    "HP Laptop Battery Replacement",
    "Dell Laptop Battery Replacement",
    "Lenovo Laptop Battery Replacement",
    "ASUS Laptop Battery Replacement",
    "Acer Laptop Battery Replacement",
    "MacBook Battery Replacement Pune",
    "Laptop Battery Not Charging",
    "Swollen Laptop Battery",
    "Laptop Battery Replacement PCMC",
    "Laptop Battery Service Pune",
    "Genuine Laptop Battery",
    "Compatible Laptop Battery",
    "Laptop Repair Pune",
    "Lappy Care",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title:
      "Laptop Battery Replacement in Pune | Lappy Care",
    description:
      "Professional laptop battery replacement for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook and more. Fast service in Pune & PCMC.",
    url: PAGE_URL,
    siteName: "Lappy Care",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Laptop Battery Replacement in Pune | Lappy Care",
    description:
      "Expert laptop battery replacement with genuine & compatible batteries across Pune and PCMC.",
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
};

export default metadata;