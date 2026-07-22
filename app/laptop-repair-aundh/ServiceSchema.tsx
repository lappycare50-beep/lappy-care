export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id":
      "https://lappycarepune.in/laptop-repair-aundh#service",
    name: "Laptop Repair in Aundh",
    description:
      "Professional laptop repair services in Aundh including motherboard repair, screen replacement, battery replacement, keyboard repair, SSD & RAM upgrades and data recovery.",
    serviceType: "Laptop Repair Service",
    areaServed: {
      "@type": "City",
      name: "Aundh, Pune",
    },
    provider: {
      "@type": "ComputerStore",
      "@id": "https://lappycarepune.in/#organization",
      name: "Lappy Care",
      url: "https://lappycarepune.in",
      telephone: "+91-9595057006",
      image: "https://lappycarepune.in/logo.png",
      logo: "https://lappycarepune.in/logo.png",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Wakad",
        addressRegion: "Maharashtra",
        postalCode: "411057",
        addressCountry: "IN",
      },
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Laptop Repair Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Laptop Screen Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Motherboard Repair",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Battery Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Keyboard Repair",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SSD Upgrade",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "RAM Upgrade",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Data Recovery",
          },
        },
      ],
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl:
        "https://lappycarepune.in/laptop-repair-aundh",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: "+91-9595057006",
        contactType: "Customer Service",
      },
    },
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