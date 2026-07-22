"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you provide laptop repair services in Aundh?",
    answer:
      "Yes. Lappy Care provides professional laptop repair services in Aundh and nearby areas including Baner, Pashan, Balewadi, Pimple Nilakh, Sangvi and Bavdhan.",
  },
  {
    question: "Which laptop brands do you repair?",
    answer:
      "We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung, LG, Microsoft Surface and most other major laptop brands.",
  },
  {
    question: "How much does laptop repair cost in Aundh?",
    answer:
      "Repair charges depend on the issue and replacement parts required. After diagnosing your laptop, we provide a transparent estimate before beginning any repair.",
  },
  {
    question: "Do you offer same-day laptop repair?",
    answer:
      "Yes. Many software issues, SSD upgrades, RAM upgrades, operating system installations and some hardware repairs can often be completed on the same day, subject to diagnosis and parts availability.",
  },
  {
    question: "Can you repair laptop motherboards?",
    answer:
      "Yes. Our technicians perform chip-level motherboard diagnosis and repair for power failures, charging problems, display issues and other motherboard-related faults.",
  },
  {
    question: "Do you provide data recovery services?",
    answer:
      "Yes. We recover data from laptops, HDDs and SSDs whenever recovery is technically possible. We recommend stopping device usage immediately if important data has been lost.",
  },
  {
    question: "Do you offer pickup and drop service in Aundh?",
    answer:
      "Yes. Pickup and drop service is available across Aundh and nearby Pune locations for your convenience.",
  },
  {
    question: "Do you provide warranty on repairs?",
    answer:
      "Yes. Warranty is available on eligible repairs and replacement parts. The warranty period depends on the type of repair or component installed.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop Repair FAQ – Aundh
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Find answers to the most common questions about our laptop repair
            services in Aundh and nearby Pune locations.
          </p>
        </div>

        <div className="mt-16 space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left transition hover:bg-gray-50"
                >
                  <span className="pr-6 text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-6 w-6 flex-shrink-0 text-yellow-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 px-6 pb-6 pt-5">
                    <p className="leading-7 text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Still Have Questions?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Contact our team today for expert advice, a free diagnosis and a
            transparent repair estimate for your laptop.
          </p>
        </div>
      </div>
    </section>
  );
}