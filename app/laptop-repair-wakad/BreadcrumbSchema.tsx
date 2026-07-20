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
        name: "Laptop Repair Pune",
        item: "https://lappycarepune.in/laptop-repair-pune",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Laptop Repair Wakad",
        item: "https://lappycarepune.in/laptop-repair-wakad",
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