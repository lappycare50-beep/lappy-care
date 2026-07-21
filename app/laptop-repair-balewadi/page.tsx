import type { Metadata } from "next";

import Hero from "./components/Hero";
import Services from "./components/Services";
import Areas from "./components/Areas";
import WhyChoose from "./components/WhyChoose";
import RepairProcess from "./components/RepairProcess";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import RelatedServices from "./components/RelatedServices";
import RelatedLocations from "./components/RelatedLocations";
import FinalCTA from "./components/FinalCTA";

import BreadcrumbSchema from "./BreadcrumbSchema";
import ServiceSchema from "./ServiceSchema";
import FaqSchema from "./FaqSchema";

export const metadata: Metadata = {
  title:
    "Laptop Repair in Balewadi | Laptop Service Center Balewadi Pune | Lappy Care",
  description:
    "Professional laptop repair in Balewadi, Pune. Screen replacement, motherboard repair, SSD & RAM upgrades, battery replacement, keyboard repair and data recovery with pickup & drop service.",
  alternates: {
    canonical: "https://lappycarepune.in/laptop-repair-balewadi",
  },
};

export default function LaptopRepairBalewadiPage() {
  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbSchema />
      <ServiceSchema />
      <FaqSchema />

      <Hero />
      <Services />
      <Areas />
      <WhyChoose />
      <RepairProcess />
      <Reviews />
      <FAQ />
      <RelatedServices />
      <RelatedLocations />
      <FinalCTA />
    </main>
  );
}