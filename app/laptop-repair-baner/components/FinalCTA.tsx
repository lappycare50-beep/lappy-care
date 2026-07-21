import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-zinc-900 to-black p-10 lg:p-16">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
              Book Your Laptop Repair Today
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
              Looking for Laptop Repair in Baner?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Lappy Care provides trusted laptop repair services in Baner,
              Balewadi, Pashan, Aundh, Sus and nearby Pune areas. From
              motherboard repair and screen replacement to SSD upgrades,
              battery replacement and data recovery, our experienced
              technicians are ready to help.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/book-repair"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:scale-105"
              >
                Book Repair
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="https://wa.me/919595057006"
                target="_blank"
                className="inline-flex items-center justify-center rounded-xl border border-green-500 bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Now
              </Link>

              <Link
                href="tel:+919595057006"
                className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-8 py-4 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Link>
            </div>

            <div className="mt-12 grid gap-6 border-t border-gray-800 pt-10 text-center md:grid-cols-4">
              <div>
                <h3 className="text-3xl font-bold text-yellow-400">5000+</h3>
                <p className="mt-2 text-gray-400">Repairs Completed</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-yellow-400">4.9★</h3>
                <p className="mt-2 text-gray-400">Google Rating</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-yellow-400">14+</h3>
                <p className="mt-2 text-gray-400">Years Experience</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-yellow-400">98%</h3>
                <p className="mt-2 text-gray-400">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}