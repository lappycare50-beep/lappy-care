export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    "@id": "https://lappycarepune.in/laptop-repair-pashan#computerstore",
    name: "Lappy Care",
    url: "https://lappycarepune.in/laptop-repair-pashan",
    image: "https://lappycarepune.in/logo.png",
    telephone: "+91-9595057006",
    priceRange: "₹₹",
    description:
      "Professional laptop repair service in Pashan, Pune. We provide motherboard repair, screen replacement, battery replacement, SSD & RAM upgrades, keyboard repair and data recovery for all major laptop brands.",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Datta Mandir Road, Near Croma, Janoba Chowk, Wakad",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411057",
      addressCountry: "IN",
    },

    areaServed: [
      { "@type": "City", name: "Pashan" },
      { "@type": "City", name: "Bavdhan" },
      { "@type": "City", name: "Aundh" },
      { "@type": "City", name: "Baner" },
      { "@type": "City", name: "Balewadi" },
      { "@type": "City", name: "Hinjawadi" },
      { "@type": "City", name: "Wakad" },
    ],

    openingHours: "Mo-Sa 10:00-20:00",

    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
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
            name: "Battery Replacement",
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
            name: "Keyboard Repair",
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

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
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