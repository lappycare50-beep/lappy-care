export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: [
      {
        "@type": "Question",
        name: "Do you provide laptop repair services in Chinchwad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Lappy Care provides professional laptop repair services across Chinchwad, Akurdi, Nigdi, Pimpri, Thergaon, Ravet, Kalewadi, Punawale and nearby PCMC areas.",
        },
      },
      {
        "@type": "Question",
        name: "Which laptop brands do you repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung and most major laptop brands.",
        },
      },
      {
        "@type": "Question",
        name: "How much does laptop repair cost in Chinchwad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Repair cost depends on the laptop model, the issue and the replacement parts required. We provide a transparent estimate after diagnosis before starting any repair.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer same-day laptop repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many software repairs, SSD upgrades, RAM upgrades and screen replacements can often be completed on the same day depending on parts availability and repair complexity.",
        },
      },
      {
        "@type": "Question",
        name: "Do you repair laptop motherboards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide professional chip-level motherboard diagnosis and repair for supported laptop models and hardware issues.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide data recovery services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We recover important data from damaged HDDs, SSDs and laptops whenever recovery is technically possible.",
        },
      },
      {
        "@type": "Question",
        name: "Is pickup and drop service available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pickup and drop service is available for eligible locations across Chinchwad and nearby PCMC areas.",
        },
      },
      {
        "@type": "Question",
        name: "Do repaired laptops come with a warranty?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Eligible repairs and replacement parts include a service warranty. Warranty duration depends on the repair performed and the parts installed.",
        },
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