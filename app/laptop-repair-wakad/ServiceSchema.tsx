export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ComputerStore",
        "@id": "https://lappycarepune.in/#business",
        name: "Lappy Care",
        url: "https://lappycarepune.in",
        image: "https://lappycarepune.in/logo.png",
        telephone: "+91XXXXXXXXXX", // Replace with your number
        email: "info@lappycarepune.in", // Replace if available
        address: {
          "@type": "PostalAddress",
          streetAddress: "Datta Mandir Road, Janoba Chowk",
          addressLocality: "Wakad",
          addressRegion: "Maharashtra",
          postalCode: "411057",
          addressCountry: "IN",
        },
        areaServed: [
          "Wakad",
          "Hinjawadi",
          "Baner",
          "Balewadi",
          "Punawale",
          "Tathawade",
          "Ravet",
          "Pimple Saudagar",
          "Pimpri",
          "Chinchwad",
          "Aundh",
          "Pashan",
        ],
        openingHours: "Mo-Sa 10:00-20:00",
        priceRange: "₹₹",
      },
      {
        "@type": "Service",
        "@id": "https://lappycarepune.in/laptop-repair-wakad#service",
        serviceType: "Laptop Repair Service",
        name: "Laptop Repair in Wakad",
        provider: {
          "@id": "https://lappycarepune.in/#business",
        },
        areaServed: {
          "@type": "City",
          name: "Wakad",
        },
        description:
          "Professional laptop repair services in Wakad including motherboard repair, screen replacement, SSD upgrade, RAM upgrade, battery replacement, keyboard repair, laptop servicing and data recovery.",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}