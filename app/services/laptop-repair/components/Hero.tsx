"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Phone, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

        {/* Left Content */}
        <div>

          <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            ⭐ Trusted Laptop Repair Experts in Pune
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Laptop Repair
            <span className="block text-yellow-400">
              Service in Pune
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Professional laptop repair service for HP, Dell, Lenovo,
            ASUS, Acer, Apple, MSI and all major brands.
            Fast diagnosis, genuine spare parts and experienced
            technicians at affordable prices.
          </p>

          {/* Features */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="flex items-center gap-3 text-white">
              <CheckCircle className="text-yellow-400" size={20} />
              Same Day Repair
            </div>

            <div className="flex items-center gap-3 text-white">
              <CheckCircle className="text-yellow-400" size={20} />
              Genuine Spare Parts
            </div>

            <div className="flex items-center gap-3 text-white">
              <CheckCircle className="text-yellow-400" size={20} />
              Certified Engineers
            </div>

            <div className="flex items-center gap-3 text-white">
              <CheckCircle className="text-yellow-400" size={20} />
              Service Warranty
            </div>

          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="tel:+919595057006"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 font-bold text-black transition hover:bg-yellow-300"
            >
              <Phone size={18} />
              Call Now
            </a>

            <Link
              href="https://wa.me/919595057006"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-yellow-400 px-6 py-4 font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              <MessageCircle size={18} />
              WhatsApp
            </Link>

          </div>

        </div>

        {/* Right Image */}
        <div className="relative">

          <div className="absolute inset-0 rounded-full bg-yellow-400/10 blur-3xl" />

          <Image
            src="/images/services/laptop-repair-hero.webp"
            alt="Laptop Repair Pune"
            width={700}
            height={650}
            priority
            className="relative mx-auto w-full max-w-xl object-contain"
          />

        </div>

      </div>
    </section>
  );
}