"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import faqs from "../data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Laptop Motherboard Repair FAQs
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Find answers to common questions about laptop motherboard
            repair, chip-level diagnosis, repair time, warranty and our
            repair process.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-gray-50"
                >
                  <span className="pr-4 text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-yellow-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-100 px-6 py-5 leading-8 text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Still Have Questions?
          </h3>

          <p className="mx-auto mt-4 max-w-3xl leading-8 text-gray-300">
            If you are unsure whether your laptop motherboard can be
            repaired, visit Lappy Care for a professional diagnosis.
            Our experienced technicians will inspect your laptop,
            explain the fault and recommend the most suitable repair
            solution.
          </p>

          <a
            href="/#booking"
            className="mt-8 inline-flex rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
          >
            Book Motherboard Diagnosis
          </a>
        </div>
      </div>
    </section>
  );
}