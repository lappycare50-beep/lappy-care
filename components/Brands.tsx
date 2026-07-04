"use client";

import { motion } from "framer-motion";

const brands = [
  "HP",
  "Dell",
  "Lenovo",
  "ASUS",
  "Acer",
  "Apple",
  "MSI",
  "Samsung",
  "Microsoft",
];

export default function Brands() {
  return (
    <section className="overflow-hidden bg-black py-10 border-y border-yellow-500/10">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
          We Repair All Major Brands
        </p>
      </div>

      <div className="relative">

        {/* Left Fade */}
        <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent"></div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent"></div>

        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="rounded-full border border-yellow-500/20 bg-[#111111] px-8 py-4 text-xl font-bold text-white transition duration-300 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}