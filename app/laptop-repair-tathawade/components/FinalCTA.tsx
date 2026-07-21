import Link from "next/link";
import { Phone, MessageCircle, Wrench } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-10 md:p-14">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Need Professional Laptop Repair in{" "}
            <span className="text-yellow-400">Tathawade?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Whether your laptop needs a motherboard repair, screen replacement,
            battery replacement, SSD upgrade, RAM upgrade or data recovery,
            Lappy Care is ready to help with fast diagnostics, experienced
            technicians and transparent pricing.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#booking"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              <Wrench className="mr-2 h-5 w-5" />
              Book Laptop Repair
            </Link>

            <Link
              href="https://wa.me/919595057006"
              target="_blank"
              className="inline-flex items-center justify-center rounded-xl border border-yellow-400 px-8 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Now
            </Link>

            <Link
              href="tel:+919595057006"
              className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-8 py-4 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="text-3xl font-bold text-yellow-400">5000+</h3>
              <p className="mt-2 text-gray-300">Laptops Repaired</p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="text-3xl font-bold text-yellow-400">14+</h3>
              <p className="mt-2 text-gray-300">Years Experience</p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="text-3xl font-bold text-yellow-400">4.9★</h3>
              <p className="mt-2 text-gray-300">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}