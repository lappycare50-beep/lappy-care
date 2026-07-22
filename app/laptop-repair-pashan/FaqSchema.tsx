export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you provide laptop repair services in Pashan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Lappy Care provides professional laptop repair services in Pashan and nearby locations including Bavdhan, Aundh, Baner, Balewadi, Wakad, Hinjawadi and other nearby areas.",
        },
      },
      {
        "@type": "Question",
        name: "Which laptop brands do you repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung, LG, Microsoft Surface and most other laptop brands.",
        },
      },
      {
        "@type": "Question",
        name: "How much does laptop repair cost in Pashan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The repair cost depends on the issue and replacement parts required. After diagnosis, we provide a transparent repair estimate before starting any repair work.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer same-day laptop repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many software issues, SSD upgrades, RAM upgrades, operating system installation and selected hardware repairs can often be completed on the same day depending on spare part availability.",
        },
      },
      {
        "@type": "Question",
        name: "Can you repair laptop motherboards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide advanced chip-level motherboard diagnosis and repair for power issues, charging problems, display faults and other motherboard failures.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide data recovery services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer professional data recovery services for laptops, HDDs and SSDs whenever recovery is technically possible.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer pickup and drop service in Pashan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pickup and drop service is available across Pashan and nearby Pune locations for customer convenience.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide warranty on repairs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Warranty is available on eligible repairs and replacement parts. The warranty period depends on the repair type and installed components.",
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