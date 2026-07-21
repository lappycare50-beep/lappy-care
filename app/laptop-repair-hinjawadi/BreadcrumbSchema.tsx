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
        name: "Laptop Repair",
        item: "https://lappycarepune.in/laptop-repair",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Laptop Repair Hinjawadi",
        item: "https://lappycarepune.in/laptop-repair-hinjawadi",
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