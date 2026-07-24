export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    "@id":
      "https://lappycarepune.in/services/laptop-repair#service",

    name: "Laptop Repair Service in Pune",

    description:
      "Professional laptop repair service in Pune by Lappy Care. We repair HP, Dell, Lenovo, ASUS, Acer, Apple, MSI, Samsung and other laptop brands. Services include motherboard repair, screen replacement, keyboard replacement, battery replacement, SSD upgrade, RAM upgrade and data recovery.",

    serviceType: "Laptop Repair",

    url: "https://lappycarepune.in/services/laptop-repair",

    areaServed: [
      {
        "@type": "City",
        name: "Pune",
      },
      {
        "@type": "Place",
        name: "Wakad",
      },
      {
        "@type": "Place",
        name: "Hinjawadi",
      },
      {
        "@type": "Place",
        name: "Baner",
      },
      {
        "@type": "Place",
        name: "Pimple Saudagar",
      },
      {
        "@type": "Place",
        name: "Tathawade",
      },
      {
        "@type": "Place",
        name: "Punawale",
      },
      {
        "@type": "Place",
        name: "Ravet",
      },
      {
        "@type": "Place",
        name: "PCMC",
      },
    ],

    provider: {
      "@type": "ComputerStore",

      "@id": "https://lappycarepune.in/#organization",

      name: "Lappy Care",

      url: "https://lappycarepune.in",

      telephone: "+91-9595057006",

      email: "lappycarepune@gmail.com",

      image:
        "https://lappycarepune.in/images/logo.png",

      logo:
        "https://lappycarepune.in/images/logo.png",

      address: {
        "@type": "PostalAddress",

        streetAddress:
          "Janoba Chowk, Datta Mandir Road, Wakad",

        addressLocality: "Pune",

        addressRegion: "Maharashtra",

        postalCode: "411057",

        addressCountry: "IN",
      },

      sameAs: [
        "https://www.facebook.com/",
        "https://www.instagram.com/",
      ],
    },

    offers: {
      "@type": "Offer",

      availability:
        "https://schema.org/InStock",

      priceCurrency: "INR",

      url:
        "https://lappycarepune.in/services/laptop-repair",
    },

    aggregateRating: {
      "@type": "AggregateRating",

      ratingValue: "4.7",

      reviewCount: "556",

      bestRating: "5",

      worstRating: "1",
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