export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: [
      {
        "@type": "Question",
        name: "Do you repair all laptop brands?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung, LG and all major laptop brands.",
        },
      },
      {
        "@type": "Question",
        name: "How long does laptop repair take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most repairs are completed within the same day or within 1–3 working days.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide pickup and drop?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pickup and drop service is available across Pune and PCMC.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide warranty?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Warranty is available on eligible repairs and replacement parts.",
        },
      },
      {
        "@type": "Question",
        name: "Can you upgrade SSD and RAM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide SSD upgrades and RAM upgrades for better laptop performance.",
        },
      },
      {
        "@type": "Question",
        name: "Do you recover lost data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Professional data recovery services are available.",
        },
      },
      {
        "@type": "Question",
        name: "Do you sell refurbished laptops?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We sell tested refurbished Dell, HP and Lenovo laptops with warranty.",
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