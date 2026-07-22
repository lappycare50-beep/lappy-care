import metadata from "./metadata";

import BreadcrumbSchema from "./BreadcrumbSchema";
import ServiceSchema from "./ServiceSchema";
import FaqSchema from "./FaqSchema";

import Hero from "./components/Hero";
import ServiceOverview from "./components/ServiceOverview";
import CommonProblems from "./components/CommonProblems";
import SupportedBrands from "./components/SupportedBrands";
import RepairProcess from "./components/RepairProcess";
import WhyChoose from "./components/WhyChoose";
import Pricing from "./components/Pricing";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import RelatedServices from "./components/RelatedServices";
import RelatedLocations from "./components/RelatedLocations";
import FinalCTA from "./components/FinalCTA";

export { metadata };

export default function LaptopBatteryReplacementPage() {
  return (
    <>
      {/* SEO Structured Data */}
      <BreadcrumbSchema />
      <ServiceSchema />
      <FaqSchema />

      {/* Page Sections */}
      <Hero />

      <ServiceOverview />

      <CommonProblems />

      <SupportedBrands />

      <RepairProcess />

      <WhyChoose />

      <Pricing />

      <Reviews />

      <FAQ />

      <RelatedServices />

      <RelatedLocations />

      <FinalCTA />
    </>
  );
}