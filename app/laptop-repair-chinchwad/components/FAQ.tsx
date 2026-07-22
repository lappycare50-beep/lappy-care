"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you provide laptop repair services in Chinchwad?",
    answer:
      "Yes. Lappy Care provides professional laptop repair services across Chinchwad, Akurdi, Nigdi, Pimpri, Thergaon, Ravet, Kalewadi, Punawale and nearby PCMC areas.",
  },
  {
    question: "Which laptop brands do you repair?",
    answer:
      "We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung and most other major laptop brands.",
  },
  {
    question: "How much does laptop repair cost in Chinchwad?",
    answer:
      "Repair cost depends on the issue, laptop model and replacement parts required. After diagnosis, we provide a transparent repair estimate before any work begins.",
  },
  {
    question: "Do you offer same-day laptop repair?",
    answer:
      "Yes. Many software issues, SSD upgrades, RAM upgrades and screen replacements can often be completed on the same day, depending on parts availability and repair complexity.",
  },
  {
    question: "Do you repair laptop motherboards?",
    answer:
      "Yes. Our technicians perform professional chip-level motherboard diagnosis and repair for supported laptop models.",
  },
  {
    question: "Do you provide data recovery services?",
    answer:
      "Yes. We recover important data from damaged HDDs, SSDs and laptops whenever recovery is technically possible.",
  },
  {
    question: "Is pickup and drop service available?",
    answer:
      "Yes. Pickup and drop service is available across Chinchwad and nearby PCMC locations for eligible repairs.",
  },
  {
    question: "Do you provide warranty on repairs?",
    answer:
      "Yes. Eligible repairs and replacement parts include a service warranty. The warranty period depends on the repair performed and the parts installed.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop Repair FAQ – Chinchwad
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Find answers to the most common questions about our laptop repair
            services in Chinchwad and nearby PCMC areas.
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-gray-200"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between bg-white px-6 py-5 text-left transition hover:bg-gray-50"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-yellow-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 bg-gray-50 px-6 py-5">
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
            Contact Lappy Care today for expert guidance, a free diagnosis
            consultation and reliable laptop repair services in Chinchwad.
          </p>
        </div>
      </div>
    </section>
  );
}