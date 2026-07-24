export { metadata } from "./metadata";

import BreadcrumbSchema from "./BreadcrumbSchema";
import ServiceSchema from "./ServiceSchema";
import FaqSchema from "./FaqSchema";

import Hero from "./components/Hero";
import ServiceOverview from "./components/ServiceOverview";
import Benefits from "./components/Benefits";
import SSDTypes from "./components/SSDTypes";
import UpgradeProcess from "./components/UpgradeProcess";
import WhyChoose from "./components/WhyChoose";
import Pricing from "./components/Pricing";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import RelatedServices from "./components/RelatedServices";
import RelatedLocations from "./components/RelatedLocations";
import FinalCTA from "./components/FinalCTA";

export default function SSDUpgradePage() {
  return (
    <>
      <BreadcrumbSchema />
      <ServiceSchema />
      <FaqSchema />

      <main className="min-h-screen bg-white">
        <Hero />
        <ServiceOverview />
        <Benefits />
        <SSDTypes />
        <UpgradeProcess />
        <WhyChoose />
        <Pricing />
        <Reviews />
        <FAQ />
        <RelatedServices />
        <RelatedLocations />
        <FinalCTA />
      </main>
    </>
  );
}