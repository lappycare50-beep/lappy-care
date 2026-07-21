"use client";

import Link from "next/link";
import { Wrench, Phone, MessageCircle, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center lg:px-8">

        <div className="mb-6 inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Trusted Laptop Repair Service in Tathawade
        </div>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          Laptop Repair in{" "}
          <span className="text-yellow-400">Tathawade</span>
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-gray-300 md:text-xl">
          Fast, reliable and affordable laptop repair services in Tathawade.
          We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook and all major
          laptop brands with genuine spare parts and experienced technicians.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/#booking"
            className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            <Wrench className="mr-2 h-5 w-5" />
            Book Laptop Repair
          </Link>

          <Link
            href="https://wa.me/919595057006"
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg border border-yellow-400 px-8 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            WhatsApp Now
          </Link>

          <Link
            href="tel:+919595057006"
            className="inline-flex items-center justify-center rounded-lg border border-gray-700 px-8 py-4 font-semibold transition hover:border-yellow-400 hover:text-yellow-400"
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Now
          </Link>
        </div>

        <div className="mt-14 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-3xl font-bold text-yellow-400">5000+</h3>
            <p className="mt-2 text-gray-400">Laptops Repaired</p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-3xl font-bold text-yellow-400">14+</h3>
            <p className="mt-2 text-gray-400">Years Experience</p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-3xl font-bold text-yellow-400">4.9★</h3>
            <p className="mt-2 text-gray-400">Customer Rating</p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-3xl font-bold text-yellow-400">Warranty</h3>
            <p className="mt-2 text-gray-400">On Eligible Repairs</p>
          </div>
        </div>
      </div>
    </section>
  );
}