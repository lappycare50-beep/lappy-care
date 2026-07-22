import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";

const stats = [
  {
    value: "5000+",
    label: "Laptops Repaired",
  },
  {
    value: "14+",
    label: "Years Experience",
  },
  {
    value: "4.9★",
    label: "Customer Rating",
  },
  {
    value: "Warranty",
    label: "On Eligible Repairs",
  },
];

const highlights = [
  "Same-Day Laptop Repair",
  "Experienced Technicians",
  "Genuine Spare Parts",
  "Pickup & Drop Available",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              Trusted Laptop Repair Service in Pimple Saudagar
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-6xl">
              Laptop Repair in{" "}
              <span className="text-yellow-400">
                Pimple Saudagar
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Lappy Care provides professional laptop repair services in
              Pimple Saudagar including motherboard repair, screen replacement,
              battery replacement, SSD & RAM upgrades, keyboard replacement,
              software installation and data recovery for all major laptop
              brands.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-yellow-400" />

                  <span className="text-gray-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#booking"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
              >
                Book Repair
              </Link>

              <Link
                href="https://wa.me/919595057006"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-yellow-400 px-8 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Link>

              <Link
                href="tel:+919876543210"
                className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-8 py-4 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call
              </Link>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-yellow-400/20 bg-white/5 p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-black/40 p-6 text-center"
                  >
                    <h3 className="text-3xl font-bold text-yellow-400">
                      {stat.value}
                    </h3>

                    <p className="mt-2 text-sm text-gray-300">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Fast & Reliable Laptop Repair
                </h3>

                <p className="mt-3 text-gray-300">
                  We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook,
                  MSI and other major laptop brands using professional
                  diagnostic tools and quality spare parts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}