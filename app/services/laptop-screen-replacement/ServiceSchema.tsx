const SITE_URL = "https://lappycarepune.in";
const PAGE_URL = `${SITE_URL}/services/laptop-screen-replacement`;

export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Laptop Screen Replacement in Pune",
    serviceType: "Laptop Screen Replacement",

    description:
      "Professional laptop screen replacement service for HP, Dell, Lenovo, ASUS, Acer, Apple MacBook and other laptop brands across Pune and PCMC.",

    url: PAGE_URL,

    provider: {
      "@type": "ComputerStore",
      name: "Lappy Care",
      url: SITE_URL,
      image: `${SITE_URL}/images/og-image.jpg`, // Replace with your actual image
      telephone: "+919595057006", // Replace with your business number

      address: {
        "@type": "PostalAddress",
        addressLocality: "Wakad",
        addressRegion: "Maharashtra",
        postalCode: "411057",
        addressCountry: "IN",
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

      sameAs: [
        "https://www.facebook.com/lappycare1/",
        "https://www.instagram.com/lappycarewakad/",
        "https://www.google.com/maps/place/Lappy+Care+-+Laptop+Repair+Shop+and+Service+Center+in+Wakad/data=!4m2!3m1!1s0x0:0x950e84f984bc8610?sa=X&ved=1t:2428&hl=en-GB&ictx=111",
      ], // Replace with your actual profiles
    },

    areaServed: [
      "Wakad",
      "Hinjawadi",
      "Baner",
      "Balewadi",
      "Punawale",
      "Tathawade",
      "Ravet",
      "Pimple Saudagar",
      "Chinchwad",
      "Aundh",
      "Bavdhan",
      "Pashan",
      "Pune",
      "Pimpri-Chinchwad",
    ],

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
            name: "Laptop Battery Replacement",
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

    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: PAGE_URL,
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