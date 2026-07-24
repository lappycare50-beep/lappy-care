export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Laptop Data Recovery",

    serviceType: "Laptop Data Recovery",

    description:
      "Professional laptop data recovery service in Pune. Recover deleted files, formatted drives, SSD data, HDD data, corrupted partitions and external hard disk data. We provide secure data recovery solutions for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook, MSI and other laptop brands.",

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

      name: "Laptop Data Recovery Services",

      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Deleted File Recovery",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Formatted Drive Recovery",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SSD Data Recovery",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hard Disk Data Recovery",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "External Hard Disk Recovery",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Partition Recovery",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Photo & Document Recovery",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Virus & Corrupted Drive Recovery",
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