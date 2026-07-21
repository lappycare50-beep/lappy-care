"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";


const faqs = [
  {
    question: "Do you provide laptop repair service in Hinjawadi?",
    answer:
      "Yes. Lappy Care provides professional laptop repair services across Hinjawadi Phase 1, Phase 2, Phase 3, Blue Ridge, Megapolis, Marunji, Maan and nearby areas. Pickup & drop service is available in eligible locations.",
  },
  {
    question: "Which laptop brands do you repair?",
    answer:
      "We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung, LG, Microsoft Surface and most other laptop brands.",
  },
  {
    question: "Do you offer pickup and drop service in Hinjawadi?",
    answer:
      "Yes. Pickup and drop service is available for customers in Hinjawadi and nearby areas, subject to availability.",
  },
  {
    question: "How long does laptop repair usually take?",
    answer:
      "Most software issues, SSD upgrades, RAM upgrades and screen replacements can often be completed on the same day. Motherboard repairs and complex hardware issues may require additional diagnostic and repair time.",
  },
  {
    question: "Do you repair MacBooks?",
    answer:
      "Yes. We provide repair services for Apple MacBook devices, including display replacement, battery replacement, keyboard repair, motherboard repair and data recovery.",
  },
  {
    question: "Can you recover data from a damaged laptop?",
    answer:
      "Yes. We provide data recovery services for laptops with SSD or HDD failures, accidental deletion, formatting issues and operating system problems. Recovery success depends on the condition of the storage device.",
  },
  {
    question: "Do you provide warranty on repairs?",
    answer:
      "Yes. Warranty is available on eligible repairs and replaced parts. The warranty period depends on the type of repair or component used.",
  },
  {
    question: "How much does laptop repair cost in Hinjawadi?",
    answer:
      "Repair charges depend on the fault, required parts and laptop model. After diagnosis, we provide a transparent quotation before any repair work begins.",
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
            Laptop Repair FAQ – Hinjawadi
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Find answers to the most common questions about laptop repair,
            motherboard repair, MacBook repair, pickup & drop service,
            warranty and pricing in Hinjawadi.
          </p>
        </div>

        <div className="mt-12 space-y-4">
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
                  className={`h-5 w-5 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="border-t border-gray-200 px-6 pb-6 pt-4">
                  <p className="leading-7 text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-yellow-400 p-8 text-center">
          <h3 className="text-2xl font-bold text-black">
            Still have questions?
          </h3>

          <p className="mt-3 text-black/80">
            Contact Lappy Care today for expert advice, a free diagnosis
            estimate and fast laptop repair service in Hinjawadi.
          </p>
        </div>
      </div>
    </section>
  );
}