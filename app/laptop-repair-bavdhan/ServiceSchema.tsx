export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Laptop Repair in Chinchwad",
    serviceType: "Laptop Repair Service",

    description:
      "Professional laptop repair services in Chinchwad, Pune including motherboard repair, laptop screen replacement, battery replacement, SSD & RAM upgrades, keyboard repair, software installation and data recovery.",

    url: "https://lappycarepune.in/laptop-repair-chinchwad",

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
        name: "Chinchwad",
      },
      {
        "@type": "City",
        name: "Pimpri",
      },
      {
        "@type": "City",
        name: "Akurdi",
      },
      {
        "@type": "City",
        name: "Nigdi",
      },
      {
        "@type": "City",
        name: "Thergaon",
      },
      {
        "@type": "City",
        name: "Ravet",
      },
      {
        "@type": "City",
        name: "Punawale",
      },
      {
        "@type": "City",
        name: "Tathawade",
      },
      {
        "@type": "City",
        name: "Kalewadi",
      },
      {
        "@type": "City",
        name: "Pimple Saudagar",
      },
      {
        "@type": "City",
        name: "Wakad",
      },
      {
        "@type": "City",
        name: "Baner",
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
            name: "Keyboard Repair",
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
      "https://www.facebook.com/lappycarepune",
      "https://www.instagram.com/lappycarepune",
      "https://g.page/r/YOUR_GOOGLE_BUSINESS_ID",
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