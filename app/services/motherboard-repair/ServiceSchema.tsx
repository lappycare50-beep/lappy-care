export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",

    "@type": "Service",

    name: "Laptop Motherboard Repair",

    serviceType: "Laptop Motherboard Repair",

    description:
      "Professional laptop motherboard repair and chip-level repair services in Pune for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook and other leading laptop brands. We diagnose and repair dead laptops, no power issues, no display problems, liquid damage, motherboard IC faults, charging circuit issues and BIOS-related problems.",

    provider: {
      "@type": "ComputerStore",

      name: "Lappy Care",

      image: "https://lappycarepune.in/logo.png",

      url: "https://lappycarepune.in",

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

      name: "Laptop Motherboard Repair Services",

      itemListElement: [
        {
          "@type": "Offer",

          itemOffered: {
            "@type": "Service",
            name: "Chip Level Motherboard Repair",
          },
        },
        {
          "@type": "Offer",

          itemOffered: {
            "@type": "Service",
            name: "Dead Laptop Repair",
          },
        },
        {
          "@type": "Offer",

          itemOffered: {
            "@type": "Service",
            name: "No Display Motherboard Repair",
          },
        },
        {
          "@type": "Offer",

          itemOffered: {
            "@type": "Service",
            name: "Laptop Liquid Damage Repair",
          },
        },
        {
          "@type": "Offer",

          itemOffered: {
            "@type": "Service",
            name: "Laptop BIOS Repair",
          },
        },
        {
          "@type": "Offer",

          itemOffered: {
            "@type": "Service",
            name: "Charging IC & Power Section Repair",
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
    ],

    url: "https://lappycarepune.in/services/motherboard-repair",
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