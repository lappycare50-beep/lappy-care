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
    default:
      "Lappy Care | Laptop Repair & Refurbished Laptop Store in Wakad Pune",
    template: "%s | Lappy Care",
  },

  description:
    "Lappy Care provides professional Laptop Repair, Computer Repair, Refurbished Laptop Sales, SSD Upgrade, RAM Upgrade, Screen Replacement, Motherboard Repair, Data Recovery, Keyboard Replacement, Laptop Cleaning and Pickup & Drop Service in Wakad, Hinjawadi, Baner, Balewadi, Tathawade, Punawale, Ravet, Pimple Saudagar, Pimpri Chinchwad and Pune.",

  keywords: [
    // Laptop Repair
    "Laptop Repair Wakad",
    "Laptop Repair Pune",
    "Laptop Repair Near Me",
    "Laptop Service Center Wakad",
    "Laptop Service Center Pune",
    "Laptop Repair Hinjawadi",
    "Laptop Repair Baner",
    "Laptop Repair Balewadi",
    "Laptop Repair Tathawade",
    "Laptop Repair Punawale",
    "Laptop Repair Ravet",
    "Laptop Repair Pimple Saudagar",
    "Laptop Repair PCMC",

    // Computer Repair
    "Computer Repair Pune",
    "Computer Repair Wakad",
    "Computer Service Center Pune",
    "Computer Service Center Wakad",
    "Desktop Repair Pune",
    "Desktop Repair Wakad",

    // Refurbished Laptop
    "Refurbished Laptop Pune",
    "Refurbished Laptop Wakad",
    "Refurbished Laptop Near Me",
    "Best Refurbished Laptop Pune",
    "Certified Refurbished Laptop",
    "Business Refurbished Laptop",
    "Used Laptop Pune",
    "Second Hand Laptop Pune",
    "Renewed Laptop Pune",

    // Dealer & Shop
    "Laptop Dealer Pune",
    "Laptop Dealer Wakad",
    "Computer Dealer Pune",
    "Computer Dealer Wakad",
    "Laptop Shop Pune",
    "Laptop Shop Wakad",
    "Computer Shop Pune",
    "Computer Shop Wakad",
    "Laptop Store Pune",
    "Laptop Store Wakad",
    "Computer Store Pune",
    "Computer Store Wakad",

    // Sales
    "Buy Refurbished Laptop Pune",
    "Buy Used Laptop Pune",
    "Business Laptop Pune",
    "Office Laptop Pune",
    "Student Laptop Pune",
    "Laptop Sale Pune",
    "Refurbished HP Laptop Pune",
    "Refurbished Dell Laptop Pune",
    "Refurbished Lenovo Laptop Pune",

    // Brands
    "HP Laptop Repair",
    "Dell Laptop Repair",
    "Lenovo Laptop Repair",
    "Asus Laptop Repair",
    "Acer Laptop Repair",
    "Apple MacBook Repair",
    "MSI Laptop Repair",
    "Samsung Laptop Repair",

    // Services
    "Laptop Screen Replacement",
    "Laptop Display Repair",
    "Laptop Keyboard Replacement",
    "Laptop Battery Replacement",
    "Laptop Charger",
    "Laptop Adapter",
    "SSD Upgrade Pune",
    "RAM Upgrade Pune",
    "Motherboard Repair Pune",
    "Data Recovery Pune",
    "Laptop Formatting",
    "Windows Installation",
    "Laptop Cleaning Service",
    "Laptop Hinge Repair",
    "Laptop Body Repair",
    "Laptop Pickup and Drop",
    "Laptop AMC Pune",

    // Brand
    "Lappy Care",
    "Lappy Care Pune",
    "Lappy Care Wakad",
    "Laptop Repair Lappy Care",
    "Computer Repair Lappy Care",
    "Refurbished Laptop Lappy Care",
  ],

  authors: [
    {
      name: "Lappy Care",
    },
  ],

  creator: "Lappy Care",
  publisher: "Lappy Care",

  verification: {
    google: "NZ0gL4jHfP0Yw-JHG74jZgTpgAEG2E5mVJNmU01cYBo",
  },

  alternates: {
    canonical: "https://lappycarepune.in",
  },

  openGraph: {
    title:
      "Lappy Care | Laptop Repair & Refurbished Laptop Store in Wakad Pune",

    description:
      "Professional Laptop Repair, Computer Repair & Refurbished Laptop Store in Pune.",

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

    title:
      "Lappy Care | Laptop Repair & Refurbished Laptop Store",

    description:
      "Laptop Repair, Computer Repair & Refurbished Laptop Sales in Pune.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "Technology",
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