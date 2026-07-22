import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-gray-900 to-black p-10 lg:p-16">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              Trusted Laptop Repair Service in Ravet
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">
              Need Professional Laptop Repair in Ravet?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Whether your laptop has a broken screen, motherboard issue,
              battery problem, charging fault, keyboard damage or software
              issue, Lappy Care provides reliable repair services with
              experienced technicians, transparent pricing and quality
              workmanship.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#booking"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
              >
                Book Laptop Repair
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="https://wa.me/919595057006"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-yellow-400 px-8 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Now
              </Link>

              <Link
                href="tel:+919876543210"
                className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-8 py-4 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Link>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-white/5 p-6">
                <h3 className="text-3xl font-bold text-yellow-400">5000+</h3>
                <p className="mt-2 text-gray-300">Laptops Repaired</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-6">
                <h3 className="text-3xl font-bold text-yellow-400">14+</h3>
                <p className="mt-2 text-gray-300">Years Experience</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-6">
                <h3 className="text-3xl font-bold text-yellow-400">4.9★</h3>
                <p className="mt-2 text-gray-300">Customer Rating</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-6">
                <h3 className="text-3xl font-bold text-yellow-400">Warranty</h3>
                <p className="mt-2 text-gray-300">On Eligible Repairs</p>
              </div>
            </div>

            <p className="mt-10 text-sm leading-7 text-gray-400">
              Proudly serving Ravet, Kiwale, Punawale, Tathawade, Nigdi,
              Akurdi, Chinchwad, Dehu Road, Pradhikaran, Wakad, Hinjawadi
              and nearby Pune locations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}