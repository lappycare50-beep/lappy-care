export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Laptop Repair in Ravet",
    serviceType: "Laptop Repair Service",

    description:
      "Professional laptop repair services in Ravet, Pune including motherboard repair, laptop screen replacement, battery replacement, keyboard repair, SSD & RAM upgrades, software installation and data recovery.",

    url: "https://lappycarepune.in/laptop-repair-ravet",

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
        name: "Ravet",
      },
      {
        "@type": "City",
        name: "Kiwale",
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
        name: "Nigdi",
      },
      {
        "@type": "City",
        name: "Akurdi",
      },
      {
        "@type": "City",
        name: "Chinchwad",
      },
      {
        "@type": "City",
        name: "Wakad",
      },
      {
        "@type": "City",
        name: "Hinjawadi",
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