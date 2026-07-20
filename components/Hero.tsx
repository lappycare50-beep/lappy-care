"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, CheckCircle, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] text-white">
      {/* Background Glow */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="mx-auto grid min-h-[75vh] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Rating */}
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-[#151515] px-5 py-2">
            <Star
              className="fill-yellow-400 text-yellow-400"
              size={18}
            />
            <span className="text-sm">
              ⭐ 4.7 Google Rating
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

          {/* Description */}
          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
            Expert Laptop Repair, SSD Upgrade, Data Recovery,
            Motherboard Repair and Refurbished Laptop Sales
            in Wakad, Hinjawadi, Baner and Pune.
          </p>

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="flex items-center gap-2">
              <CheckCircle
                className="text-yellow-400"
                size={20}
              />
              <span>Same Day Repair</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle
                className="text-yellow-400"
                size={20}
              />
              <span>Genuine Parts</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle
                className="text-yellow-400"
                size={20}
              />
              <span>Pickup & Delivery</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle
                className="text-yellow-400"
                size={20}
              />
              <span>Warranty Support</span>
            </div>

          </div>

          {/* Service Area */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-yellow-400/20 bg-[#151515] px-5 py-3">
            <MapPin
              className="text-yellow-400"
              size={22}
            />

            <div>
              <p className="text-sm font-semibold text-yellow-400">
                Serving Areas
              </p>

              <p className="text-sm text-gray-300">
                Wakad • Hinjawadi • Baner • PCMC
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="#booking"
              aria-label="Book Laptop Repair"
              className="rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition duration-300 hover:scale-105"
            >
              Book Repair
            </a>

            <a
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="rounded-xl border border-yellow-400 px-8 py-4 font-bold text-white transition duration-300 hover:bg-yellow-400 hover:text-black"
            >
              WhatsApp
            </a>

          </div>

          {/* Google Reviews */}
          <div className="mt-6 flex items-center gap-4">

            <a
              href="https://www.google.com/search?q=lappy+care+-+laptop+repair+shop+and+service+center+in+wakad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Google Reviews for Lappy Care"
              className="inline-flex items-center gap-3 rounded-xl border border-yellow-400 bg-[#111111] px-6 py-3 transition duration-300 hover:bg-yellow-400 hover:text-black"
            >
              <span className="text-xl">⭐</span>

              <div>
                <p className="font-bold">
                  View Google Reviews
                </p>

                <p className="text-xs opacity-80">
                  Rated 4.7 ★ by Customers
                </p>
              </div>
            </a>

          </div>

        </motion.div>

        {/* Right */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-3xl" />

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/hero-laptop.webp"
              alt="Laptop Repair and Refurbished Laptop Store in Wakad Pune"
              width={760}
              height={650}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 760px"
              className="relative mx-auto h-auto w-full max-w-[760px]"
            />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}