export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Laptop RAM Upgrade",

    serviceType: "Laptop RAM Upgrade",

    description:
      "Professional laptop RAM upgrade service in Pune. Upgrade DDR4 and DDR5 RAM for faster performance, smoother multitasking and improved productivity. We provide RAM installation, compatibility checks and performance optimization for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook, MSI and other laptop brands.",

    provider: {
      "@type": "ComputerStore",

      name: "Lappy Care",

      url: "https://lappycarepune.in",

      logo: "https://lappycarepune.in/logo.png",

      telephone: "+91-9595057006",

      email: "support@lappycare.in",

      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Datta Mandir Road, Janoba Chowk, Near Croma, Wakad",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411057",
        addressCountry: "IN",
      },

      areaServed: [
        "Pune",
        "PCMC",
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
    },

    areaServed: [
      {
        "@type": "City",
        name: "Pune",
      },
      {
        "@type": "City",
        name: "Pimpri-Chinchwad",
      },
    ],

    hasOfferCatalog: {
      "@type": "OfferCatalog",

      name: "Laptop RAM Upgrade Services",

      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DDR4 RAM Upgrade",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DDR5 RAM Upgrade",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Laptop RAM Installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "RAM Compatibility Check",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Laptop Performance Optimization",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Memory Upgrade Consultation",
          },
        },
      ],
    },

    brand: [
      {
        "@type": "Brand",
        name: "HP",
      },
      {
        "@type": "Brand",
        name: "Dell",
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
      {
        "@type": "Brand",
        name: "Samsung",
      },
      {
        "@type": "Brand",
        name: "LG",
      },
      {
        "@type": "Brand",
        name: "Microsoft",
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