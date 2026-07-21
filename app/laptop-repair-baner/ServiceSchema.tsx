export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    name: "Lappy Care",
    url: "https://lappycarepune.in/laptop-repair-baner",
    image: "https://lappycarepune.in/logo.png",
    telephone: "+919595057006", 
    areaServed: [
      "Baner",
      "Balewadi",
      "Pashan",
      "Aundh",
      "Sus",
      "Mahalunge",
      "Pune",
    ],
    serviceType: [
      "Laptop Repair",
      "Motherboard Repair",
      "Screen Replacement",
      "Battery Replacement",
      "SSD Upgrade",
      "RAM Upgrade",
      "Data Recovery",
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