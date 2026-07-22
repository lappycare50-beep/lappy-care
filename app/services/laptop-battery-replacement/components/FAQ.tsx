"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import faqs from "../data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Laptop Battery Replacement FAQs
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find answers to the most common questions about laptop battery
            replacement, charging issues, battery health, warranty and our
            repair process.
          </p>
        </div>

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
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <h3 className="pr-6 text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-yellow-600 transition-transform duration-300 ${
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
                    <p className="px-6 pb-6 leading-8 text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Still Have Questions?
          </h3>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-300">
            If you need help choosing the right battery or you're unsure
            whether the issue is caused by the battery, charger or charging
            circuit, our technicians are happy to help.
          </p>

          <a
            href="/#booking"
            className="mt-8 inline-flex rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
          >
            Book Battery Inspection
          </a>
        </div>
      </div>
    </section>
  );
}