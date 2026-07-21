export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: [
      {
        "@type": "Question",
        name: "Do you provide laptop repair service in Hinjawadi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Lappy Care provides professional laptop repair services across Hinjawadi Phase 1, Phase 2, Phase 3, Blue Ridge, Megapolis, Marunji, Maan and nearby areas. Pickup & drop service is available in eligible locations.",
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
        name: "Do you offer pickup and drop service in Hinjawadi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pickup and drop service is available for customers in Hinjawadi and nearby areas, subject to availability.",
        },
      },
      {
        "@type": "Question",
        name: "How long does laptop repair usually take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Software repairs, SSD upgrades, RAM upgrades and screen replacements are often completed on the same day. Motherboard repairs and complex hardware issues may require additional diagnostic and repair time.",
        },
      },
      {
        "@type": "Question",
        name: "Do you repair Apple MacBooks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We repair Apple MacBook devices including display replacement, battery replacement, motherboard repair, keyboard repair and data recovery.",
        },
      },
      {
        "@type": "Question",
        name: "Can you recover data from a damaged laptop?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide professional SSD and HDD data recovery services. Recovery success depends on the condition of the storage device.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide warranty on repairs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Warranty is available on eligible repairs and replaced parts. Warranty duration depends on the repair and components used.",
        },
      },
      {
        "@type": "Question",
        name: "How much does laptop repair cost in Hinjawadi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Repair cost depends on the laptop model, fault and required parts. We provide a transparent quotation after diagnosis before starting any repair work.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)}
      }
    />
  );
}