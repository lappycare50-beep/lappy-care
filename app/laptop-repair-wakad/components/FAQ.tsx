import { HelpCircle, Plus } from "lucide-react";

const faqs = [
  {
    question: "Do you repair all laptop brands in Wakad?",
    answer:
      "Yes. We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung, LG and most major laptop brands at our Wakad service center.",
  },
  {
    question: "How much does laptop repair cost in Wakad?",
    answer:
      "Repair costs depend on the issue and required spare parts. After diagnosis, we provide a transparent estimate before starting any repair work.",
  },
  {
    question: "Do you provide same-day laptop repair?",
    answer:
      "Yes. Many common issues such as SSD upgrades, RAM upgrades, software installation, virus removal and basic servicing can often be completed on the same day.",
  },
  {
    question: "Do you offer pickup and drop service in Wakad?",
    answer:
      "Yes. We provide pickup and drop service in Wakad and nearby locations including Hinjawadi, Baner, Balewadi, Punawale, Tathawade, Ravet and surrounding areas.",
  },
  {
    question: "Do you provide warranty on repairs?",
    answer:
      "Yes. Warranty is available on eligible repairs and replacement parts. The warranty period depends on the type of repair or component installed.",
  },
  {
    question: "Can you repair water-damaged laptops?",
    answer:
      "Yes. We perform professional inspection and chip-level repair for laptops affected by liquid damage. Early diagnosis improves the chances of successful recovery.",
  },
  {
    question: "Can you upgrade SSD and RAM?",
    answer:
      "Yes. We provide SSD upgrades, RAM upgrades and complete laptop performance optimization for supported laptop models.",
  },
  {
    question: "Do you recover deleted or lost data?",
    answer:
      "Yes. We offer professional data recovery services for damaged HDDs, SSDs and other storage devices, depending on their condition.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">

      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">

            <HelpCircle size={16} />

            Frequently Asked Questions

          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900">
            Laptop Repair FAQs – Wakad
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find answers to the most common questions about laptop repair,
            repair costs, warranty, pickup & drop service and turnaround
            time at Lappy Care Wakad.
          </p>

        </div>

        {/* FAQ */}

        <div className="mt-16 space-y-5">

          {faqs.map((faq) => (

            <details
              key={faq.question}
              className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-yellow-400 hover:shadow-lg"
            >

              <summary className="flex cursor-pointer list-none items-center justify-between p-6">

                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>

                <Plus
                  size={22}
                  className="text-yellow-600 transition-transform duration-300 group-open:rotate-45"
                />

              </summary>

              <div className="border-t border-gray-100 px-6 pb-6 pt-4">

                <p className="leading-7 text-gray-600">
                  {faq.answer}
                </p>

              </div>

            </details>

          ))}

        </div>

        {/* Bottom Info */}

        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">

          <h3 className="text-3xl font-bold">
            Still Have Questions?
          </h3>

          <p className="mt-4 max-w-2xl mx-auto leading-8 text-gray-300">
            If you need more information about laptop repair, motherboard
            repair, SSD upgrades, screen replacement or data recovery,
            our experts are happy to help.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <a
              href="tel:+919999999999"
              className="rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:bg-yellow-300"
            >
              Call Now
            </a>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-500"
            >
              WhatsApp
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}