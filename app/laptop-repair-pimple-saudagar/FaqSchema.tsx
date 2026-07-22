export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: [
      {
        "@type": "Question",
        name: "Do you provide laptop repair services in Pimple Saudagar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Lappy Care provides professional laptop repair services across Pimple Saudagar, Rahatani, Pimple Gurav, Vishal Nagar, Wakad, Baner, Aundh, Kalewadi and nearby Pune areas.",
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
        name: "How much does laptop repair cost in Pimple Saudagar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Repair charges depend on the issue, laptop model and replacement parts required. After diagnosis, we provide a transparent estimate before starting the repair.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide same-day laptop repair?",
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
        name: "Do you offer data recovery services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We recover important data from damaged HDDs, SSDs and laptops affected by storage failures whenever recovery is technically possible.",
        },
      },
      {
        "@type": "Question",
        name: "Is pickup and drop service available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pickup and drop service is available for eligible locations across Pimple Saudagar and nearby Pune areas.",
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