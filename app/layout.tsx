import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";

import FloatingWhatsApp from "@/components/whatsapp/FloatingWhatsApp";

import GoogleAnalytics from "@/components/GoogleAnalytics";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lappycarepune.in"),

  title: {
    default: "Lappy Care | Laptop Repair & Refurbished Laptops in Wakad Pune",
    template: "%s | Lappy Care",
  },

  description:
    "Professional Laptop Repair, Screen Replacement, SSD Upgrade, Data Recovery and Refurbished Laptop Sales in Wakad, Hinjawadi, Baner, Tathawade & PCMC.",

  keywords: [
    "Laptop Repair Wakad",
    "Laptop Repair Pune",
    "Laptop Repair Near Me",
    "Laptop Service Center Wakad",
    "Refurbished Laptop Pune",
    "HP Laptop Repair",
    "Dell Laptop Repair",
    "Lenovo Laptop Repair",
    "SSD Upgrade Pune",
    "Data Recovery Pune",
    "Lappy Care",
  ],

  authors: [{ name: "Lappy Care" }],
  creator: "Lappy Care",
  publisher: "Lappy Care",

  openGraph: {
    title: "Lappy Care | Laptop Repair & Refurbished Laptops",
    description:
      "Professional Laptop Repair & Refurbished Laptop Store in Wakad, Pune.",

    url: "https://lappycarepune.in",
    siteName: "Lappy Care",
    locale: "en_IN",
    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lappy Care",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Lappy Care",
    description:
      "Laptop Repair & Refurbished Laptop Store in Wakad, Pune.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <GoogleAnalytics />

        <AuthProvider>
          {children}
          <FloatingWhatsApp />
        </AuthProvider>
      </body>
    </html>
  );
}