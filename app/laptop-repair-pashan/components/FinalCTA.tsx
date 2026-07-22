import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck, CheckCircle2 } from "lucide-react";

const highlights = [
  "14+ Years of Experience",
  "5000+ Laptops Repaired",
  "Pickup & Drop Available",
  "Warranty on Eligible Repairs",
];

export default function FinalCTA() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-black via-gray-900 to-black px-8 py-16 text-center shadow-2xl">
          <span className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black">
            Laptop Repair in Pashan
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Need Fast & Reliable Laptop Repair?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Whether your laptop has a screen issue, motherboard fault, battery
            problem, keyboard damage, SSD failure or software issue, our
            experienced technicians are ready to help with reliable repair
            solutions in Pashan and nearby Pune locations.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-2 rounded-xl border border-yellow-400/20 bg-white/5 px-4 py-4"
              >
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium text-white">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="tel:+919595057006"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Link>

            <Link
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-green-500 bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Link>

            <Link
              href="/#booking"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/20"
            >
              <CalendarCheck className="mr-2 h-5 w-5" />
              Book Repair
            </Link>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-lg font-semibold text-yellow-400">
              ★ 4.9 Google Rating
            </p>

            <p className="mt-3 text-gray-400">
              Trusted by customers across Pashan, Bavdhan, Aundh, Baner,
              Balewadi, Hinjawadi, Wakad and nearby Pune locations for
              professional laptop repair services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}