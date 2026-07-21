"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you provide laptop repair services in Tathawade?",
    answer:
      "Yes. Lappy Care provides professional laptop repair services across Tathawade and nearby areas including Punawale, Wakad, Ravet, Kiwale, Hinjawadi and Balewadi.",
  },
  {
    question: "Which laptop brands do you repair?",
    answer:
      "We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung and most major laptop brands.",
  },
  {
    question: "How much does laptop repair cost in Tathawade?",
    answer:
      "Repair charges depend on the fault and replacement parts required. After diagnosis, we provide a transparent estimate before starting the repair.",
  },
  {
    question: "Do you provide same-day laptop repair?",
    answer:
      "Yes. Many software issues, SSD upgrades, RAM upgrades and screen replacements can often be completed on the same day, depending on parts availability and repair complexity.",
  },
  {
    question: "Do you repair laptop motherboards?",
    answer:
      "Yes. We provide professional chip-level motherboard diagnostics and repair for supported laptop models.",
  },
  {
    question: "Do you offer data recovery services?",
    answer:
      "Yes. We recover data from damaged hard drives, SSDs and laptops with software or storage-related issues whenever recovery is technically possible.",
  },
  {
    question: "Is pickup and drop service available?",
    answer:
      "Yes. Pickup and drop service is available for eligible locations around Tathawade and nearby Pune areas.",
  },
  {
    question: "Do repaired laptops come with a warranty?",
    answer:
      "Yes. Eligible repairs and replacement parts include a service warranty. The warranty period depends on the repair and parts used.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Laptop Repair Tathawade – FAQs
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Find answers to the most frequently asked questions about our laptop
            repair services in Tathawade.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-gray-200 px-6 py-5">
                    <p className="leading-7 text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}