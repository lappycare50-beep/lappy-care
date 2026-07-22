import type { Metadata } from "next";

const SITE_URL = "https://lappycarepune.in";
const PAGE_URL = `${SITE_URL}/services/motherboard-repair`;

const metadata: Metadata = {
  title:
    "Laptop Motherboard Repair in Pune | Chip Level Repair | Lappy Care",

  description:
    "Professional laptop motherboard repair in Pune for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook and all major brands. Chip-level motherboard repair, dead laptop repair, liquid damage repair, no display, no power and motherboard IC replacement by experienced technicians.",

  keywords: [
    "Laptop Motherboard Repair Pune",
    "Motherboard Repair Pune",
    "Chip Level Laptop Repair",
    "Laptop Chip Level Repair",
    "Dead Laptop Repair",
    "Laptop No Power Repair",
    "Laptop Not Turning On Repair",
    "Laptop No Display Repair",
    "Laptop Liquid Damage Repair",
    "Laptop Motherboard IC Repair",
    "Laptop Motherboard Service",
    "Laptop BIOS Repair Pune",
    "HP Laptop Motherboard Repair",
    "Dell Laptop Motherboard Repair",
    "Lenovo Laptop Motherboard Repair",
    "ASUS Laptop Motherboard Repair",
    "Acer Laptop Motherboard Repair",
    "MacBook Motherboard Repair Pune",
    "Laptop Repair Pune",
    "Laptop Repair Wakad",
    "Laptop Repair Hinjawadi",
    "Laptop Repair Baner",
    "Laptop Repair PCMC",
    "Lappy Care",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title:
      "Laptop Motherboard Repair in Pune | Chip Level Repair | Lappy Care",

    description:
      "Professional motherboard chip-level repair, dead laptop repair, no display, no power and liquid damage repair across Pune & PCMC.",

    url: PAGE_URL,

    siteName: "Lappy Care",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Laptop Motherboard Repair - Lappy Care",
      },
    ],

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Laptop Motherboard Repair in Pune | Lappy Care",

    description:
      "Professional laptop motherboard chip-level repair services across Pune & PCMC.",

    images: ["/og-image.jpg"],
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

  category: "Laptop Repair",

  applicationName: "Lappy Care",

  creator: "Lappy Care",

  publisher: "Lappy Care",
};

export default metadata;