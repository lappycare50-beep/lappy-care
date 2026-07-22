export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Laptop Battery Replacement",

    serviceType: "Laptop Battery Replacement",

    description:
      "Professional laptop battery replacement service in Pune for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook, MSI and other laptop brands. We replace weak, swollen, damaged or non-charging batteries using genuine or high-quality compatible batteries with professional installation and warranty on eligible replacements.",

    provider: {
      "@type": "ComputerStore",

      name: "Lappy Care",

      url: "https://lappycarepune.in",

      logo: "https://lappycarepune.in/logo.png",

      telephone: "+91-9595057006",

      email: "support@lappycarepune.in",

      address: {
        "@type": "PostalAddress",

        streetAddress: "Datta Mandir Road, Janoba Chowk, Near Croma",

        addressLocality: "Wakad",

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

      name: "Laptop Battery Replacement Services",

      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "HP Laptop Battery Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dell Laptop Battery Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lenovo Laptop Battery Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ASUS Laptop Battery Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Acer Laptop Battery Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Apple MacBook Battery Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Laptop Battery Health Check",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Battery Performance Diagnosis",
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

    url: "https://lappycarepune.in/services/laptop-battery-replacement",
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