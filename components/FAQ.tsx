"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-4xl px-6">

        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-yellow-400">
            FAQ
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-400">
            Everything you need to know about our services.
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#111111]"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="border-t border-yellow-500/10 px-6 pb-6 pt-4 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}