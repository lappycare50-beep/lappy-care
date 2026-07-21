import Link from "next/link";
import { Phone, MessageCircle, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#facc1530,transparent_45%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            Trusted Laptop Repair Service in Punawale
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Laptop Repair in{" "}
            <span className="text-yellow-400">Punawale</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Lappy Care provides professional laptop repair services in
            Punawale for Dell, HP, Lenovo, ASUS, Acer, Apple MacBook and
            other major brands. We specialize in motherboard repair,
            screen replacement, SSD & RAM upgrades, battery replacement,
            software troubleshooting and data recovery with pickup &
            drop support.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="h-5 w-5 text-yellow-400" />
              Same Day Repair for Selected Issues
            </div>

            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="h-5 w-5 text-yellow-400" />
              Experienced Laptop Repair Technicians
            </div>

            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="h-5 w-5 text-yellow-400" />
              Genuine Parts & Transparent Pricing
            </div>

            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle className="h-5 w-5 text-yellow-400" />
              Pickup & Drop Available in Punawale
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="tel:+919595057006"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Link>

            <Link
              href="https://wa.me/919595057006"
              target="_blank"
              className="inline-flex items-center justify-center rounded-xl border border-yellow-400 px-8 py-4 text-lg font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">
            <span>⭐ 4.7 Google Rating</span>
            <span>5000+ Repairs</span>
            <span>14+ Years Experience</span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl">
            <img
              src="/images/laptop-repair-hero.webp"
              alt="Laptop Repair in Punawale"
              className="w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}