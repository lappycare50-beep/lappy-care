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

export default function LaptopRepairBanerPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* SEO Structured Data */}
      <BreadcrumbSchema />
      <ServiceSchema />
      <FaqSchema />

      {/* Page Sections */}
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