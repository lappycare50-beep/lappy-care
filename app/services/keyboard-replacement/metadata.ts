import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://lappycarepune.in"),

  title:
    "Laptop Keyboard Replacement in Pune | HP, Dell, Lenovo, ASUS | Lappy Care",

  description:
    "Professional laptop keyboard replacement and keyboard repair service in Pune. We replace damaged, faulty, backlit and spill-damaged keyboards for HP, Dell, Lenovo, ASUS, Acer, Apple and all major laptop brands.",

  keywords: [
    "Laptop Keyboard Replacement Pune",
    "Laptop Keyboard Repair Pune",
    "Keyboard Replacement Wakad",
    "Laptop Keyboard Service Pune",
    "Laptop Keyboard Not Working",
    "Backlit Keyboard Replacement",
    "Laptop Keys Replacement",
    "HP Laptop Keyboard Replacement",
    "Dell Laptop Keyboard Replacement",
    "Lenovo Keyboard Repair",
    "ASUS Laptop Keyboard Replacement",
    "Acer Laptop Keyboard Repair",
    "Apple MacBook Keyboard Replacement",
    "Keyboard Repair Near Me",
    "Laptop Repair Pune",
  ],

  alternates: {
    canonical: "/services/keyboard-replacement",
  },

  openGraph: {
    type: "website",
    url: "https://lappycarepune.in/services/keyboard-replacement",
    title:
      "Laptop Keyboard Replacement in Pune | Lappy Care",
    description:
      "Expert laptop keyboard replacement for HP, Dell, Lenovo, ASUS, Acer, Apple and other leading brands. Fast service with genuine replacement parts.",
    siteName: "Lappy Care",
    images: [
      {
        url: "/images/keyboard-replacement-og.jpg",
        width: 1200,
        height: 630,
        alt: "Laptop Keyboard Replacement - Lappy Care Pune",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Laptop Keyboard Replacement in Pune | Lappy Care",
    description:
      "Professional laptop keyboard replacement and repair service in Pune for all major laptop brands.",
    images: ["/images/keyboard-replacement-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  category: "Laptop Repair",
};