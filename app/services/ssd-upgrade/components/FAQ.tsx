"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import faqs from "../data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop SSD Upgrade FAQs
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Find answers to the most common questions about laptop SSD
            upgrades, NVMe & SATA SSD compatibility, data migration,
            installation and performance improvements.
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-6 text-left transition hover:bg-gray-50"
              >
                <h3 className="pr-6 text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>

                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                )}
              </button>

              {openIndex === index && (
                <div className="border-t border-gray-100 px-6 py-5">
                  <p className="leading-7 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            Still Have Questions?
          </h3>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-300">
            Contact Lappy Care for expert advice on choosing the right SSD,
            compatibility checks and professional installation. We'll help you
            select the best upgrade for your laptop.
          </p>

          <div className="mt-8">
            <Link
              href="/#booking"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              Book SSD Upgrade
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}