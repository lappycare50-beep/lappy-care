export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    serviceType: "Laptop Repair",

    name: "Laptop Repair in Pune",

    provider: {
      "@type": "ComputerStore",
      name: "Lappy Care",
      url: "https://lappycarepune.in",
    },

    areaServed: [
      "Pune",
      "Wakad",
      "Hinjawadi",
      "Baner",
      "Balewadi",
      "Punawale",
      "Tathawade",
      "Pimpri Chinchwad",
    ],

    description:
      "Professional Laptop Repair Services including Motherboard Repair, Screen Replacement, SSD Upgrade, RAM Upgrade, Data Recovery and Refurbished Laptop Sales.",

    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
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