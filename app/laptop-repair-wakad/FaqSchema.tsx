export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you repair all laptop brands in Wakad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung, LG and most major laptop brands at our Wakad service center.",
        },
      },
      {
        "@type": "Question",
        name: "How much does laptop repair cost in Wakad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Repair costs depend on the issue and required spare parts. After diagnosis, we provide a transparent estimate before starting any repair work.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide same-day laptop repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many common issues such as SSD upgrades, RAM upgrades, software installation, virus removal and basic servicing can often be completed on the same day.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer pickup and drop service in Wakad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide pickup and drop service in Wakad and nearby locations including Hinjawadi, Baner, Balewadi, Punawale, Tathawade, Ravet and surrounding areas.",
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
      {
        "@type": "Question",
        name: "Can you repair water-damaged laptops?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We perform professional inspection and chip-level repair for laptops affected by liquid damage. Early diagnosis improves the chances of successful recovery.",
        },
      },
      {
        "@type": "Question",
        name: "Can you upgrade SSD and RAM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide SSD upgrades, RAM upgrades and complete laptop performance optimization for supported laptop models.",
        },
      },
      {
        "@type": "Question",
        name: "Do you recover deleted or lost data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer professional data recovery services for damaged HDDs, SSDs and other storage devices, depending on their condition.",
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