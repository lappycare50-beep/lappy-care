export default function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComputerStore",

    "@id": "https://lappycarepune.in/#organization",

    name: "Lappy Care",

    url: "https://lappycarepune.in",

    logo: "https://lappycarepune.in/images/logo.png",

    image: "https://lappycarepune.in/og-image.jpg",

    telephone: "+91 9595057006",

    email: "info@lappycare.in",

    description:
      "Professional Laptop Repair, Computer Repair, Laptop Service, Refurbished Laptop Sales, SSD Upgrade, RAM Upgrade, Data Recovery, Motherboard Repair and Pickup & Drop Service in Wakad, Pune.",

    priceRange: "₹₹",

    keywords: [
      "Laptop Repair",
      "Computer Repair",
      "Laptop Service",
      "Refurbished Laptop",
      "Used Laptop",
      "Second Hand Laptop",
      "Laptop Shop",
      "Computer Store",
      "SSD Upgrade",
      "RAM Upgrade",
      "Motherboard Repair",
      "Data Recovery",
      "Laptop Screen Replacement",
      "Laptop Keyboard Replacement",
      "Laptop Battery Replacement",
    ],

    address: {
      "@type": "PostalAddress",
      streetAddress: "Janoba Chowk, Datta Mandir Road",
      addressLocality: "Wakad",
      addressRegion: "Maharashtra",
      postalCode: "411057",
      addressCountry: "IN",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.5970",
      longitude: "73.7636",
    },

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
    ],

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
      "Pune",
      "PCMC",
    ],

    sameAs: [
      "https://www.google.com/search?q=lappy+care+laptop+repair+shop+wakad",
    ],

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Laptop Repair Services",

      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Laptop Repair",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Computer Repair",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Refurbished Laptop Sales",
          },
        },
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
            name: "Data Recovery",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Laptop Keyboard Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Laptop Battery Replacement",
          },
        },
      ],
    },

    potentialAction: {
      "@type": "SearchAction",
      target: "https://lappycarepune.in/?q={search_term_string}",
      "query-input": "required name=search_term_string",
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