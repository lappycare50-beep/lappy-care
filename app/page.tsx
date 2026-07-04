import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Brands from "@/components/Brands";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";
import Products from "@/components/Products";
import Reviews from "@/components/Reviews";
import Process from "@/components/Process";
import Booking from "@/components/Booking";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import GoogleMap from "@/components/GoogleMap";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <Navbar />
      <Hero />
      <Stats />
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
      <FloatingWhatsapp />
    </>
  );
}