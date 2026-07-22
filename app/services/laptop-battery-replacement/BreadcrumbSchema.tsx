export default function BreadcrumbSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://lappycarepune.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://lappycarepune.in/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Laptop Battery Replacement",
        item: "https://lappycarepune.in/services/laptop-battery-replacement",
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