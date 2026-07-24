"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import faqs from "../data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop Keyboard Replacement
            <span className="block text-yellow-500">FAQs</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find answers to the most common questions about laptop keyboard
            replacement, repair, pricing, warranty and service availability at
            Lappy Care Pune.
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
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-gray-50"
                >
                  <h3 className="pr-4 text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>

                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-gray-200 px-6 py-5">
                    <p className="leading-8 text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-3xl font-bold">
            Still Have Questions?
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Contact Lappy Care for expert advice on laptop keyboard repair,
            replacement, pricing and compatible spare parts.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              Book Keyboard Service
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="tel:+919595057006"
              className="inline-flex items-center rounded-xl border border-gray-600 px-6 py-4 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              Call Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}