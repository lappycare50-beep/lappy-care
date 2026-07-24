"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  MapPin,
  Phone,
  MessageCircle,
  Star,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0B0B0B] text-white"
    >
      {/* Background */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[80vh] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Rating */}
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-[#151515] px-5 py-2">
            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="text-sm text-gray-300">
              4.7 Google Rating
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
            Laptop Repair
            <br />
            <span className="text-yellow-400">
              Made Easy.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
            Professional Laptop Repair, SSD Upgrade, Motherboard Repair,
            Screen Replacement, Data Recovery and Refurbished Laptop Sales
            in Wakad, Hinjawadi, Baner, PCMC and Pune.
          </p>

          {/* Features */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="flex items-center gap-3">
              <CheckCircle className="text-yellow-400" size={20} />
              <span>Same Day Repair</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-yellow-400" size={20} />
              <span>Genuine Parts</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-yellow-400" size={20} />
              <span>Pickup & Drop</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-yellow-400" size={20} />
              <span>Warranty Support</span>
            </div>

          </div>

          {/* Area */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-yellow-400/20 bg-[#151515] px-5 py-3">

            <MapPin className="text-yellow-400" size={22} />

            <div>
              <p className="text-sm font-semibold text-yellow-400">
                Serving Areas
              </p>

              <p className="text-sm text-gray-300">
                Wakad • Hinjawadi • Baner • PCMC
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="#booking"
              className="inline-flex items-center rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5" />
              Book Repair
            </Link>

            <Link
              href="https://wa.me/919595057006"
              target="_blank"
              className="inline-flex items-center rounded-xl border border-yellow-400 px-8 py-4 font-bold text-white transition hover:bg-yellow-400 hover:text-black"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Link>

          </div>

          {/* Reviews */}
          <div className="mt-8">
            <Link
              href="https://www.google.com/search?q=lappy+care+-+laptop+repair+shop+and+service+center+in+wakad"
              target="_blank"
              className="inline-flex items-center gap-3 rounded-xl border border-yellow-400 bg-[#111111] px-6 py-3 transition hover:bg-yellow-400 hover:text-black"
            >
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

              <div>
                <p className="font-bold">
                  View Google Reviews
                </p>

                <p className="text-xs opacity-80">
                  Rated 4.7 ★ by Customers
                </p>
              </div>

            </Link>
          </div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-yellow-400/10 blur-3xl" />

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/hero-laptop.webp"
              alt="Laptop Repair and Refurbished Laptop Store in Pune"
              width={860}
              height={760}
              priority
              className="relative mx-auto h-auto w-full max-w-[760px]"
            />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}