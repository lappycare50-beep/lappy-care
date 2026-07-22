"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Screen Replacement FAQs
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find answers to the most common questions about laptop screen
            replacement services.
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
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-gray-50"
                >
                  <span className="pr-6 text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-yellow-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 px-6 py-5 leading-7 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="mt-16 rounded-3xl bg-zinc-900 p-10 text-center text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            Still Have Questions?
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Contact Lappy Care for professional guidance regarding laptop
            screen replacement and repair services.
          </p>
        </div>
      </div>
    </section>
  );
}