"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop Repair FAQs
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find answers to the most common questions about our laptop repair
            services in Pune.
          </p>
        </div>

        {/* FAQ List */}

        <div className="mt-14 space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all"
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
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={22}
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
                    <div className="border-t bg-gray-50 px-6 py-5">
                      <p className="leading-8 text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-white">
            Still Have Questions?
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Contact Lappy Care today. Our team will help you diagnose your
            laptop issue and recommend the best repair solution.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919595057006"
              className="rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-yellow-400 px-6 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}