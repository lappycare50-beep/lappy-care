"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you provide laptop repair services in Punawale?",
    answer:
      "Yes. Lappy Care provides professional laptop repair services across Punawale, Tathawade, Ravet, Wakad, Kiwale, Nigdi, Akurdi and nearby Pune areas. Pickup & drop service is available for eligible locations.",
  },
  {
    question: "Which laptop brands do you repair?",
    answer:
      "We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung and most major laptop brands.",
  },
  {
    question: "How much does laptop repair cost in Punawale?",
    answer:
      "Repair charges depend on the issue and replacement parts required. After diagnosis, we provide a transparent repair estimate before starting any work.",
  },
  {
    question: "Do you offer same-day laptop repair?",
    answer:
      "Yes. Many software issues, SSD upgrades, RAM upgrades and screen replacements can often be completed on the same day, depending on parts availability and the repair required.",
  },
  {
    question: "Do you repair laptop motherboards?",
    answer:
      "Yes. We provide professional chip-level motherboard diagnostics and repair for supported laptop models whenever repair is technically feasible.",
  },
  {
    question: "Can you recover data from a damaged laptop?",
    answer:
      "Yes. We provide data recovery services for laptops with software issues, failed SSDs, hard drives and other storage-related problems whenever recovery is possible.",
  },
  {
    question: "Do repaired laptops include a warranty?",
    answer:
      "Eligible repairs and replacement parts include a warranty. Warranty duration depends on the repair performed and the parts installed.",
  },
  {
    question: "How can I book a laptop repair?",
    answer:
      "You can call us, send a WhatsApp message or submit an online booking request through our website. Our team will contact you to schedule the repair.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Repair Punawale – FAQs
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Find answers to the most common questions about laptop repair
            services in Punawale, including pricing, turnaround time,
            warranty, pickup & drop service and supported laptop brands.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="pr-6 text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`h-6 w-6 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="border-t border-gray-100 px-6 pb-6">
                  <p className="pt-5 leading-8 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            Still Have Questions?
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-300">
            Contact Lappy Care today for expert guidance and professional
            laptop repair services in Punawale. Our technicians will diagnose
            your issue and recommend the best repair solution.
          </p>
        </div>
      </div>
    </section>
  );
}