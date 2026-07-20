import Link from "next/link";
import {
  ShieldCheck,
  Clock3,
  Star,
  CheckCircle2,
  Phone,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-yellow-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[32px] border border-yellow-500/20 bg-zinc-900 shadow-2xl">
          <div className="grid lg:grid-cols-2">
            {/* Left Side */}
            <div className="p-10 lg:p-16">
              <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
                Book Your Laptop Repair Today
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white lg:text-5xl">
                Professional Laptop Repair in Wakad
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                We repair motherboard issues, broken screens, SSD upgrades,
                RAM upgrades, battery replacement, keyboard issues, software
                problems and data recovery for all major laptop brands.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Same Day Repair Available*",
                  "Pickup & Drop Service",
                  "Genuine Quality Parts",
                  "Warranty on Eligible Repairs",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="text-green-400" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-10 lg:p-16">
              <div className="rounded-3xl bg-white p-8 shadow-xl">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                    <ShieldCheck size={40} className="text-yellow-600" />
                  </div>

                  <h3 className="mt-6 text-3xl font-bold text-gray-900">
                    Need Laptop Repair?
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    Contact our experts today for fast diagnosis and
                    professional laptop repair service.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 space-y-4">
                  <a
                    href="tel:+919999999999"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 font-bold text-white transition hover:bg-zinc-800"
                  >
                    <Phone size={20} />
                    Call Now
                  </a>

                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-bold text-white transition hover:bg-green-500"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>

                  <Link
                    href="/book-repair"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-4 font-bold text-black transition hover:bg-yellow-300"
                  >
                    <CalendarCheck size={20} />
                    Book Repair
                  </Link>
                </div>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-3 gap-4 border-t pt-8">
                  <div className="text-center">
                    <Star
                      className="mx-auto fill-yellow-400 text-yellow-400"
                      size={22}
                    />
                    <h4 className="mt-2 text-2xl font-bold">4.9★</h4>
                    <p className="text-sm text-gray-500">Google Rating</p>
                  </div>

                  <div className="text-center">
                    <Clock3
                      className="mx-auto text-yellow-600"
                      size={22}
                    />
                    <h4 className="mt-2 text-2xl font-bold">14+</h4>
                    <p className="text-sm text-gray-500">Years</p>
                  </div>

                  <div className="text-center">
                    <ShieldCheck
                      className="mx-auto text-green-600"
                      size={22}
                    />
                    <h4 className="mt-2 text-2xl font-bold">5000+</h4>
                    <p className="text-sm text-gray-500">Repairs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}