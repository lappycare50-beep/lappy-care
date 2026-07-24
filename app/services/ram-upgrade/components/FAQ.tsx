"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import faqs from "../data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop RAM Upgrade FAQs
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Find answers to the most common questions about laptop RAM upgrades,
            DDR3, DDR4, DDR5 compatibility, installation, pricing and
            performance improvements.
          </p>
        </div>

        <div className="mt-16 space-y-4">
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
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-gray-50"
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

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-100 px-6 py-5 text-gray-600 leading-7">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            Still Have Questions?
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Not sure which RAM upgrade is compatible with your laptop?
            Visit Lappy Care for a free compatibility check and get expert
            recommendations for the best DDR3, DDR4 or DDR5 upgrade.
          </p>

          <a
            href="/#booking"
            className="mt-8 inline-flex rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            Book RAM Upgrade
          </a>
        </div>
      </div>
    </section>
  );
}