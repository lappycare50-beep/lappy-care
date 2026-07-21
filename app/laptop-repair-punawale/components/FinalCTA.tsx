import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-10 text-center md:p-16">
          <span className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black">
            Book Your Laptop Repair Today
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
            Need Professional Laptop Repair in Punawale?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Whether your laptop has a motherboard issue, broken screen,
            battery problem, charging issue, software error, SSD failure or
            needs a performance upgrade, Lappy Care is here to help.
            Our experienced technicians provide reliable laptop repair
            services across Punawale and nearby Pune locations.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
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
              WhatsApp Us
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-6">
              <h3 className="text-xl font-bold text-yellow-400">
                Same Day Service
              </h3>

              <p className="mt-3 leading-7 text-gray-300">
                Fast diagnosis and quick repairs for many common laptop
                problems, subject to parts availability.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-6">
              <h3 className="text-xl font-bold text-yellow-400">
                Genuine Support
              </h3>

              <p className="mt-3 leading-7 text-gray-300">
                Transparent repair estimates, quality replacement parts
                and experienced technicians you can trust.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-6">
              <h3 className="text-xl font-bold text-yellow-400">
                Pickup & Drop
              </h3>

              <p className="mt-3 leading-7 text-gray-300">
                Convenient pickup and delivery service available across
                Punawale, Tathawade, Ravet and nearby Pune areas.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <Link
              href="/contact"
              className="inline-flex items-center text-lg font-semibold text-yellow-400 transition hover:text-yellow-300"
            >
              Contact Lappy Care Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}