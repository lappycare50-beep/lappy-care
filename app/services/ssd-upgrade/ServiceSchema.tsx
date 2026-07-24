export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Laptop SSD Upgrade",

    serviceType: "Laptop SSD Upgrade",

    description:
      "Professional laptop SSD upgrade service in Pune. Upgrade your laptop with high-speed NVMe or SATA SSDs for faster boot time, improved performance and better reliability. We provide SSD installation, data migration and performance optimization for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook, MSI and other laptop brands.",

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
      name: "Laptop SSD Upgrade Services",

      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "NVMe SSD Upgrade",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SATA SSD Upgrade",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SSD Installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Operating System Installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SSD Data Migration",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Laptop Performance Optimization",
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