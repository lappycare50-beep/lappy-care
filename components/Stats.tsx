"use client";

import { Laptop, Users, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Laptop,
    value: "5000+",
    label: "Laptops Repaired",
  },
  {
    icon: Users,
    value: "1500+",
    label: "Happy Customers",
  },
  {
    icon: Star,
    value: "4.7★",
    label: "Google Rating",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Warranty Support",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#111111] py-14">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-yellow-500/20 bg-black p-8 text-center hover:border-yellow-400 transition"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="text-4xl font-bold text-yellow-400">
                  {item.value}
                </h3>

                <p className="mt-3 text-gray-400">
                  {item.label}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}