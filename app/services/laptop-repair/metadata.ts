import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Laptop Repair Pune | Expert Laptop Repair Service | Lappy Care",

  description:
    "Professional Laptop Repair in Pune by Lappy Care. We repair HP, Dell, Lenovo, ASUS, Acer, Apple, MSI, Samsung and all major laptop brands. Fast diagnosis, genuine spare parts, affordable pricing and warranty on repairs.",

  keywords: [
    "Laptop Repair Pune",
    "Laptop Repair Wakad",
    "Laptop Service Pune",
    "Computer Repair Pune",
    "Laptop Repair Near Me",
    "HP Laptop Repair",
    "Dell Laptop Repair",
    "Lenovo Laptop Repair",
    "ASUS Laptop Repair",
    "Acer Laptop Repair",
    "Apple MacBook Repair",
    "Laptop Motherboard Repair",
    "Laptop Screen Repair",
    "Laptop Keyboard Repair",
    "Laptop Battery Replacement",
    "SSD Upgrade Pune",
    "RAM Upgrade Pune",
    "Data Recovery Pune",
    "Lappy Care Pune",
  ],

  alternates: {
    canonical:
      "https://lappycarepune.in/services/laptop-repair",
  },

  openGraph: {
    title:
      "Laptop Repair Pune | Lappy Care",
    description:
      "Professional Laptop Repair Service in Pune for all laptop brands. Fast turnaround, genuine spare parts and warranty on repairs.",
    url:
      "https://lappycarepune.in/services/laptop-repair",
    siteName: "Lappy Care",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/services/laptop-repair-og.jpg",
        width: 1200,
        height: 630,
        alt: "Laptop Repair Pune - Lappy Care",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Laptop Repair Pune | Lappy Care",
    description:
      "Expert Laptop Repair Service in Pune for HP, Dell, Lenovo, ASUS, Acer, Apple and more.",
    images: [
      "/images/services/laptop-repair-og.jpg",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};