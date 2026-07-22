import type { Metadata } from "next";

const SITE_URL = "https://lappycarepune.in";
const PAGE_URL = `${SITE_URL}/services/laptop-screen-replacement`;

const metadata: Metadata = {
  title: "Laptop Screen Replacement in Pune | HP, Dell, Lenovo | Lappy Care",

  description:
    "Professional laptop screen replacement service in Pune for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook and more. Cracked screen, flickering display, black screen, display lines and LCD replacement by experienced technicians.",

  keywords: [
    "Laptop Screen Replacement Pune",
    "Laptop Display Replacement Pune",
    "Laptop LCD Replacement Pune",
    "Laptop Screen Repair Pune",
    "Cracked Laptop Screen Repair",
    "HP Laptop Screen Replacement",
    "Dell Laptop Screen Replacement",
    "Lenovo Laptop Screen Replacement",
    "ASUS Laptop Screen Replacement",
    "Acer Laptop Screen Replacement",
    "MacBook Screen Replacement Pune",
    "Laptop Display Repair Near Me",
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
    title: "Laptop Screen Replacement in Pune | Lappy Care",

    description:
      "Professional laptop screen replacement for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook and more across Pune & PCMC.",

    url: PAGE_URL,
    siteName: "Lappy Care",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Laptop Screen Replacement - Lappy Care",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Laptop Screen Replacement in Pune | Lappy Care",

    description:
      "Professional laptop screen replacement services across Pune & PCMC.",

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