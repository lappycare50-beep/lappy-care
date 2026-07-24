import Script from "next/script";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";

const SectionLoader = ({
  height = "h-64",
}: {
  height?: string;
}) => (
  <section className={`w-full ${height} animate-pulse bg-[#0B0B0B]`} />
);

const Brands = dynamic(() => import("@/components/Brands"), {
  loading: () => <SectionLoader height="h-32" />,
});

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <SectionLoader />,
});

const WhyChoose = dynamic(() => import("@/components/WhyChoose"), {
  loading: () => <SectionLoader />,
});

const Products = dynamic(() => import("@/components/Products"), {
  loading: () => <SectionLoader height="h-[500px]" />,
});

const Reviews = dynamic(() => import("@/components/Reviews"), {
  loading: () => <SectionLoader height="h-[450px]" />,
});

const Process = dynamic(() => import("@/components/Process"), {
  loading: () => <SectionLoader />,
});

const Booking = dynamic(() => import("@/components/Booking"), {
  loading: () => <SectionLoader height="h-[650px]" />,
});

const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <SectionLoader />,
});

const CTA = dynamic(() => import("@/components/CTA"), {
  loading: () => <SectionLoader height="h-56" />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <SectionLoader height="h-[500px]" />,
});

const GoogleMap = dynamic(() => import("@/components/GoogleMap"), {
  loading: () => (
    <SectionLoader height="h-[450px]" />
  ),
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <SectionLoader height="h-40" />,
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ComputerStore",

  name: "Lappy Care",

  image: "https://lappycarepune.in/og-image.jpg",

  url: "https://lappycarepune.in",

  telephone: "+91 9595057006",

  email: "info@lappycare.in",

  address: {
    "@type": "PostalAddress",
    streetAddress: "Janoba Chowk, Datta Mandir Road",
    addressLocality: "Wakad",
    addressRegion: "Maharashtra",
    postalCode: "411057",
    addressCountry: "IN",
  },

  openingHours: "Mo-Sa 10:00-20:00",

  areaServed: [
    "Wakad",
    "Hinjawadi",
    "Baner",
    "Balewadi",
    "Punawale",
    "Ravet",
    "Pimple Saudagar",
    "Tathawade",
    "Pune",
  ],

  priceRange: "₹₹",

  sameAs: [
    "https://www.google.com/search?q=lappy+care+-+laptop+repair+shop+and+service+center+in+wakad",
  ],
};

export default function Home() {
  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* Above the Fold */}
      <Navbar />
      <Hero />
      <Stats />

      {/* Below the Fold */}
      <Brands />
      <Services />
      <WhyChoose />
      <Products />
      <Reviews />
      <Process />
      <Booking />
      <FAQ />
      <CTA />
      <Contact />
      <GoogleMap />
      <Footer />
    </>
  );
}