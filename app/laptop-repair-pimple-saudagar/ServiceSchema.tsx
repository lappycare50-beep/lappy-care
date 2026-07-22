export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Laptop Repair in Pimple Saudagar",
    serviceType: "Laptop Repair Service",

    description:
      "Professional laptop repair services in Pimple Saudagar, Pune including motherboard repair, laptop screen replacement, battery replacement, keyboard repair, SSD & RAM upgrades, software installation and data recovery.",

    url: "https://lappycarepune.in/laptop-repair-pimple-saudagar",

    provider: {
      "@type": "LocalBusiness",
      name: "Lappy Care",
      url: "https://lappycarepune.in",
      image: "https://lappycarepune.in/logo.png",
      telephone: "+919595057006",

      address: {
        "@type": "PostalAddress",
        addressLocality: "Wakad",
        addressRegion: "Maharashtra",
        postalCode: "411057",
        addressCountry: "IN",
      },
    },

    areaServed: [
      {
        "@type": "City",
        name: "Pimple Saudagar",
      },
      {
        "@type": "City",
        name: "Rahatani",
      },
      {
        "@type": "City",
        name: "Pimple Gurav",
      },
      {
        "@type": "City",
        name: "Vishal Nagar",
      },
      {
        "@type": "City",
        name: "Wakad",
      },
      {
        "@type": "City",
        name: "Baner",
      },
      {
        "@type": "City",
        name: "Aundh",
      },
      {
        "@type": "City",
        name: "Kalewadi",
      },
      {
        "@type": "City",
        name: "Sangvi",
      },
      {
        "@type": "City",
        name: "Hinjawadi",
      },
      {
        "@type": "City",
        name: "Pimpri",
      },
      {
        "@type": "City",
        name: "Chinchwad",
      },
    ],

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
            name: "Laptop Battery Replacement",
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
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Software Installation",
          },
        },
      ],
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },

    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://g.page/",
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