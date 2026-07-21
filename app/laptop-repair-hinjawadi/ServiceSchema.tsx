export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",

    "@type": ["LocalBusiness", "ProfessionalService", "Store"],

    "@id":
      "https://lappycarepune.in/laptop-repair-hinjawadi#business",

    additionalType:
      "https://www.wikidata.org/wiki/Q175212",

    name: "Lappy Care",

    alternateName:
      "Lappy Care Laptop Repair Pune",

    description:
      "Professional laptop repair service in Hinjawadi, Pune. Motherboard repair, screen replacement, SSD upgrade, RAM upgrade, battery replacement, MacBook repair, data recovery and pickup & drop service.",

    url:
      "https://lappycarepune.in/laptop-repair-hinjawadi",

    image: [
      "https://lappycarepune.in/og-image.jpg"
    ],

    logo:
      "https://lappycarepune.in/logo.png",

    telephone: "+91-9595057006",

    email: "support@lappycarepune.in",

    priceRange: "₹₹",

    currenciesAccepted: "INR",

    paymentAccepted: [
      "Cash",
      "UPI",
      "Credit Card",
      "Debit Card"
    ],

    address: {
      "@type": "PostalAddress",

      streetAddress:
        "Datta Mandir Road",

      addressLocality:
        "Wakad",

      addressRegion:
        "Maharashtra",

      postalCode:
        "411057",

      addressCountry:
        "IN",
    },

    geo: {
      "@type": "GeoCoordinates",

      latitude: 18.5975,

      longitude: 73.7617,
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
      {
        "@type": "City",
        name: "Hinjawadi",
      },
      {
        "@type": "Place",
        name: "Hinjawadi Phase 1",
      },
      {
        "@type": "Place",
        name: "Hinjawadi Phase 2",
      },
      {
        "@type": "Place",
        name: "Hinjawadi Phase 3",
      },
      {
        "@type": "Place",
        name: "Blue Ridge",
      },
      {
        "@type": "Place",
        name: "Megapolis",
      },
      {
        "@type": "Place",
        name: "Marunji",
      },
      {
        "@type": "Place",
        name: "Maan",
      },
      {
        "@type": "City",
        name: "Pune",
      },
    ],

    knowsAbout: [
      "Laptop Repair",
      "Laptop Service",
      "Motherboard Repair",
      "Laptop Screen Replacement",
      "Battery Replacement",
      "SSD Upgrade",
      "RAM Upgrade",
      "MacBook Repair",
      "Data Recovery",
      "Laptop Keyboard Repair",
      "Laptop Charging Port Repair",
      "Windows Installation",
    ],

    brand: [
      {
        "@type": "Brand",
        name: "Dell",
      },
      {
        "@type": "Brand",
        name: "HP",
      },
      {
        "@type": "Brand",
        name: "Lenovo",
      },
      {
        "@type": "Brand",
        name: "ASUS",
      },
      {
        "@type": "Brand",
        name: "Acer",
      },
      {
        "@type": "Brand",
        name: "Apple",
      },
      {
        "@type": "Brand",
        name: "MSI",
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
            name: "Laptop Repair",
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
            name: "Laptop Screen Replacement",
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
            name: "MacBook Repair",
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

    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://maps.google.com/",
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