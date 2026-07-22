export default function SeoSchema() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",

      "@id": "https://lappycarepune.in/#organization",

      name: "Lappy Care",

      alternateName: "Lappy Care Pune",

      url: "https://lappycarepune.in",

      logo: {
        "@type": "ImageObject",
        url: "https://lappycarepune.in/logo.png",
      },

      image: "https://lappycarepune.in/og-image.jpg",

      description:
        "Lappy Care provides professional laptop repair services, computer repair, refurbished laptop sales, motherboard repair, SSD upgrades, RAM upgrades, data recovery and doorstep pickup & drop service across Pune.",

      telephone: "+91-9595057006",

      email: "info@lappycare.in",

      priceRange: "₹₹",

      slogan: "Professional Laptop Repair & Refurbished Laptop Store",

      foundingLocation: {
        "@type": "Place",
        name: "Wakad, Pune",
      },

      address: {
        "@type": "PostalAddress",

        streetAddress: "Datta Mandir Road, Janoba Chowk",

        addressLocality: "Wakad",

        addressRegion: "Maharashtra",

        postalCode: "411057",

        addressCountry: "IN",
      },

      contactPoint: {
        "@type": "ContactPoint",

        telephone: "+91-9595057006",

        contactType: "customer support",

        areaServed: "IN",

        availableLanguage: [
          "English",
          "Hindi",
          "Marathi",
        ],
      },

      areaServed: [
        {
          "@type": "City",
          name: "Pune",
        },
        {
          "@type": "City",
          name: "Wakad",
        },
        {
          "@type": "City",
          name: "Hinjawadi",
        },
        {
          "@type": "City",
          name: "Baner",
        },
        {
          "@type": "City",
          name: "Balewadi",
        },
        {
          "@type": "City",
          name: "Bavdhan",
        },
        {
          "@type": "City",
          name: "Pashan",
        },
        {
          "@type": "City",
          name: "Aundh",
        },
        {
          "@type": "City",
          name: "Punawale",
        },
        {
          "@type": "City",
          name: "Tathawade",
        },
        {
          "@type": "City",
          name: "Ravet",
        },
        {
          "@type": "City",
          name: "Pimple Saudagar",
        },
        {
          "@type": "City",
          name: "Chinchwad",
        },
      ],

      knowsAbout: [
        "Laptop Repair",
        "Computer Repair",
        "Motherboard Repair",
        "Laptop Screen Replacement",
        "Laptop Battery Replacement",
        "Laptop Keyboard Replacement",
        "SSD Upgrade",
        "RAM Upgrade",
        "Data Recovery",
        "Refurbished Laptops",
        "Laptop AMC",
        "Windows Installation",
      ],

      sameAs: [
        "https://www.facebook.com/lappycare1/",
        "https://www.instagram.com/lappycarewakad/",
      ],
    },
        {
      "@context": "https://schema.org",

      "@type": "WebSite",

      "@id": "https://lappycarepune.in/#website",

      url: "https://lappycarepune.in",

      name: "Lappy Care",

      alternateName: "Lappy Care Pune",

      publisher: {
        "@id": "https://lappycarepune.in/#organization",
      },

      inLanguage: "en-IN",

      potentialAction: {
        "@type": "SearchAction",

       

        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schema,
        }),
      }}
    />
  );
}