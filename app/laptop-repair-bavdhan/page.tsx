import { metadata } from "./metadata";

import BreadcrumbSchema from "./BreadcrumbSchema";
import ServiceSchema from "./ServiceSchema";
import FaqSchema from "./FaqSchema";

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

export { metadata };

export default function LaptopRepairBavdhanPage() {
  return (
    <>
      <BreadcrumbSchema />
      <ServiceSchema />
      <FaqSchema />

      <main className="bg-white">
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
    </>
  );
}