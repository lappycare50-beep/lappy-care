export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Laptop Repair in Punawale",

    serviceType: "Laptop Repair Service",

    description:
      "Professional laptop repair services in Punawale, Pune including motherboard repair, laptop screen replacement, battery replacement, SSD upgrades, RAM upgrades, keyboard replacement and data recovery.",

    url: "https://lappycarepune.in/laptop-repair-punawale",

    areaServed: {
      "@type": "Place",
      name: "Punawale, Pune",
    },

    provider: {
      "@type": "LocalBusiness",

      name: "Lappy Care",

      url: "https://lappycarepune.in",

      image: "https://lappycarepune.in/logo.png",

      telephone: "+91 95950 57006",

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
            name: "Battery Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Keyboard Replacement",
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