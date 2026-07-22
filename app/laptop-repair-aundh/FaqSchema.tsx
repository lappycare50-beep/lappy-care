export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you provide laptop repair services in Aundh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Lappy Care provides professional laptop repair services in Aundh and nearby areas including Baner, Pashan, Balewadi, Pimple Nilakh, Sangvi and Bavdhan.",
        },
      },
      {
        "@type": "Question",
        name: "Which laptop brands do you repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung, LG, Microsoft Surface and most other major laptop brands.",
        },
      },
      {
        "@type": "Question",
        name: "How much does laptop repair cost in Aundh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Repair charges depend on the issue and replacement parts required. After diagnosing your laptop, we provide a transparent estimate before beginning any repair.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer same-day laptop repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many software issues, SSD upgrades, RAM upgrades, operating system installations and some hardware repairs can often be completed on the same day, subject to diagnosis and parts availability.",
        },
      },
      {
        "@type": "Question",
        name: "Can you repair laptop motherboards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our technicians perform chip-level motherboard diagnosis and repair for power failures, charging problems, display issues and other motherboard-related faults.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide data recovery services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We recover data from laptops, HDDs and SSDs whenever recovery is technically possible. We recommend stopping device usage immediately if important data has been lost.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer pickup and drop service in Aundh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pickup and drop service is available across Aundh and nearby Pune locations for your convenience.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide warranty on repairs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Warranty is available on eligible repairs and replacement parts. The warranty period depends on the type of repair or component installed.",
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