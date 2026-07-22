import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            Trusted Laptop Repair Service in Chinchwad
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Laptop Repair in Chinchwad
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Lappy Care provides professional laptop repair services in
            Chinchwad for all major brands including Dell, HP, Lenovo,
            ASUS, Acer and Apple MacBook. We specialize in motherboard
            repair, screen replacement, battery replacement, SSD & RAM
            upgrades, keyboard repair, software installation and data
            recovery with fast turnaround and transparent pricing.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#booking"
              className="inline-flex items-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              Book Laptop Repair
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-yellow-400 px-8 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Link>

            <Link
              href="tel:+919595057006"
              className="inline-flex items-center rounded-xl border border-gray-700 px-8 py-4 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Link>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl font-bold text-yellow-400">
                5000+
              </div>
              <p className="mt-2 text-sm text-gray-300">
                Laptops Repaired
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl font-bold text-yellow-400">
                14+
              </div>
              <p className="mt-2 text-sm text-gray-300">
                Years Experience
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-center gap-1 text-3xl font-bold text-yellow-400">
                4.9
                <Star className="h-6 w-6 fill-yellow-400" />
              </div>
              <p className="mt-2 text-sm text-gray-300">
                Google Rating
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl font-bold text-yellow-400">
                Warranty
              </div>
              <p className="mt-2 text-sm text-gray-300">
                On Eligible Repairs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}