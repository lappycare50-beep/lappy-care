import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}

          <div>
            <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
              Trusted Laptop Repair in Hinjawadi
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white lg:text-6xl">
              Laptop Repair in{" "}
              <span className="text-yellow-400">
                Hinjawadi
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Lappy Care provides professional laptop repair services in
              Hinjawadi, including motherboard repair, laptop screen
              replacement, SSD upgrades, RAM upgrades, battery replacement,
              keyboard repair, software troubleshooting and data recovery for
              Dell, HP, Lenovo, ASUS, Acer, Apple MacBook and other major
              brands.
            </p>

            <div className="mt-6 flex items-center gap-2 text-yellow-300">
              <CheckCircle2 size={18} />
              <span>
                Rajiv Gandhi Infotech Park • Phase 1 • Phase 2 • Phase 3 •
                Hinjawadi • Pune
              </span>
            </div>

            {/* CTA Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+919595057006"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:bg-yellow-300"
              >
                <Phone size={20} />
                Call Now
              </a>

              <a
                href="https://wa.me/919595057006"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-500"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>

            {/* Trust Points */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Same Day Repair Available*",
                "Pickup & Drop Service",
                "Genuine Quality Parts",
                "Warranty on Eligible Repairs",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <CheckCircle2
                    size={18}
                    className="text-green-400"
                  />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stats Card */}

          <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900 p-10 shadow-2xl">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-5xl font-bold text-yellow-400">
                  4.9★
                </h3>
                <p className="mt-2 text-gray-400">
                  Google Rating
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-bold text-yellow-400">
                  5000+
                </h3>
                <p className="mt-2 text-gray-400">
                  Repairs Completed
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-bold text-yellow-400">
                  14+
                </h3>
                <p className="mt-2 text-gray-400">
                  Years Experience
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-bold text-yellow-400">
                  98%
                </h3>
                <p className="mt-2 text-gray-400">
                  Customer Satisfaction
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-yellow-400 p-6 text-center">
              <h3 className="text-2xl font-bold text-black">
                Serving Hinjawadi IT Professionals
              </h3>

              <p className="mt-3 text-black/80">
                Fast laptop repair solutions for employees, students,
                freelancers and businesses across Hinjawadi and nearby areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}