export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you provide laptop repair services in Baner?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Lappy Care provides professional laptop repair services across Baner and nearby Pune areas.",
        },
      },
      {
        "@type": "Question",
        name: "Do you repair all laptop brands?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook and most major laptop brands.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide pickup and drop service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pickup and drop service is available in eligible areas around Baner.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer motherboard repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide professional chip-level motherboard repair for supported laptop models.",
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