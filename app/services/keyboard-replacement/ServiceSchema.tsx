export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Laptop Keyboard Replacement Service",

    serviceType: "Laptop Keyboard Replacement",

    description:
      "Professional laptop keyboard replacement and keyboard repair service in Pune. We replace damaged, faulty, backlit and spill-damaged keyboards for HP, Dell, Lenovo, ASUS, Acer, Apple and all major laptop brands.",

    url: "https://lappycarepune.in/services/keyboard-replacement",

    provider: {
      "@type": "ComputerStore",

      name: "Lappy Care",

      image: "https://lappycarepune.in/logo.png",

      url: "https://lappycarepune.in",

      telephone: "+91-9595057006",

      email: "support@lappycarepune.in",

      address: {
        "@type": "PostalAddress",
        streetAddress: "Datta Mandir Road, Near Croma, Janoba Chowk",
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
        "Aundh",
        "Pashan",
        "Pimpri",
        "Chinchwad",
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
      name: "Laptop Keyboard Replacement Services",

      itemListElement: [
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
            name: "Laptop Keyboard Repair",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Backlit Keyboard Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Liquid Damaged Keyboard Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Laptop Key Replacement",
          },
        },
      ],
    },

    brand: [
      { "@type": "Brand", name: "HP" },
      { "@type": "Brand", name: "Dell" },
      { "@type": "Brand", name: "Lenovo" },
      { "@type": "Brand", name: "ASUS" },
      { "@type": "Brand", name: "Acer" },
      { "@type": "Brand", name: "Apple" },
      { "@type": "Brand", name: "MSI" },
      { "@type": "Brand", name: "Samsung" },
      { "@type": "Brand", name: "LG" },
      { "@type": "Brand", name: "Microsoft" },
    ],

    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl:
        "https://lappycarepune.in/services/keyboard-replacement",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: "+91-9595057006",
      },
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