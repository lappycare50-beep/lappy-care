export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you provide laptop repair services in Balewadi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Lappy Care provides professional laptop repair services across Balewadi, Baner, Mahalunge, Sus, Aundh, Pashan and nearby Pune areas. Pickup & Drop service is available for eligible locations.",
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
        name: "How much does laptop repair cost in Balewadi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Repair charges depend on the problem and replacement parts required. After diagnosis, we provide a transparent estimate before starting the repair.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer same-day laptop repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many software repairs, SSD upgrades, RAM upgrades and screen replacements can often be completed on the same day, subject to parts availability and the complexity of the repair.",
        },
      },
      {
        "@type": "Question",
        name: "Do you repair laptop motherboards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide professional chip-level motherboard diagnostics and repair for supported laptop models whenever repair is technically feasible.",
        },
      },
      {
        "@type": "Question",
        name: "Can you recover data from a damaged laptop?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide professional data recovery services for laptops with software issues, failed SSDs, hard drives and other storage-related problems whenever recovery is possible.",
        },
      },
      {
        "@type": "Question",
        name: "Do repaired laptops include a warranty?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eligible repairs and replacement parts include a warranty. The warranty period depends on the repair performed and the parts installed.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book a laptop repair in Balewadi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can call us, send a WhatsApp message or submit an online booking request through our website. Our team will contact you to schedule your laptop repair.",
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