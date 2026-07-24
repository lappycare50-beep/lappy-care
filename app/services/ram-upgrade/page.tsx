import BreadcrumbSchema from "./BreadcrumbSchema";
import ServiceSchema from "./ServiceSchema";
import FaqSchema from "./FaqSchema";

import Hero from "./components/Hero";
import ServiceOverview from "./components/ServiceOverview";
import Benefits from "./components/Benefits";
import RAMTypes from "./components/RAMTypes";
import UpgradeProcess from "./components/UpgradeProcess";
import WhyChoose from "./components/WhyChoose";
import Pricing from "./components/Pricing";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import RelatedServices from "./components/RelatedServices";
import RelatedLocations from "./components/RelatedLocations";
import FinalCTA from "./components/FinalCTA";

export default function RAMUpgradePage() {
  return (
    <>
      {/* SEO Structured Data */}
      <BreadcrumbSchema />
      <ServiceSchema />
      <FaqSchema />

      {/* Hero */}
      <Hero />

      {/* Service Overview */}
      <ServiceOverview />

      {/* Benefits */}
      <Benefits />

      {/* RAM Types */}
      <RAMTypes />

      {/* Upgrade Process */}
      <UpgradeProcess />

      {/* Why Choose Lappy Care */}
      <WhyChoose />

      {/* Pricing */}
      <Pricing />

      {/* Customer Reviews */}
      <Reviews />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Related Services */}
      <RelatedServices />

      {/* Related Locations */}
      <RelatedLocations />

      {/* Final Call To Action */}
      <FinalCTA />
    </>
  );
}