import Link from "next/link";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const highlights = [
  "Same Day Repair Available*",
  "Pickup & Drop Service",
  "Experienced Technicians",
  "Warranty on Eligible Repairs",
];

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-black via-zinc-900 to-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-zinc-900 shadow-2xl">
          <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-16">
            {/* Left */}

            <div>
              <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
                Book Your Repair Today
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white lg:text-5xl">
                Need Laptop Repair in{" "}
                <span className="text-yellow-400">
                  Hinjawadi?
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Whether your laptop has a motherboard issue, broken screen,
                battery problem, charging issue, keyboard fault, SSD failure
                or software problem, Lappy Care is here to help. We provide
                fast, reliable and professional laptop repair services across
                Hinjawadi and nearby Pune locations.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-green-400"
                    />

                    <span className="text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}

            <div className="rounded-3xl bg-yellow-400 p-8 text-center">
              <h3 className="text-3xl font-bold text-black">
                Get a Free Diagnosis
              </h3>

              <p className="mt-4 leading-7 text-black/80">
                Contact our team today for expert advice and a transparent
                repair estimate. We're ready to assist customers across
                Hinjawadi, Phase 1, Phase 2, Phase 3, Blue Ridge, Megapolis,
                Marunji and nearby areas.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="tel:+919595057006"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-black px-6 py-4 text-lg font-bold text-white transition hover:bg-zinc-800"
                >
                  <Phone size={22} />
                  Call Now
                </a>

                <a
                  href="https://wa.me/919595057006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-green-500"
                >
                  <MessageCircle size={22} />
                  WhatsApp Now
                </a>

                <Link
                  href="/book-repair"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-black px-6 py-4 text-lg font-bold text-black transition hover:bg-black hover:text-white"
                >
                  Book Online

                  <ArrowRight size={20} />
                </Link>
              </div>

              <div className="mt-8 rounded-2xl bg-black/10 p-4">
                <p className="font-semibold text-black">
                  ⭐ Trusted by 5000+ Customers
                </p>

                <p className="mt-2 text-sm text-black/80">
                  Fast turnaround • Quality Parts • Transparent Pricing
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom SEO */}

        <div className="mx-auto mt-14 max-w-5xl text-center">
          <h3 className="text-3xl font-bold text-white">
            Trusted Laptop Repair Near Hinjawadi
          </h3>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Lappy Care proudly serves customers across Hinjawadi Phase 1,
            Phase 2, Phase 3, Blue Ridge, Megapolis, Marunji, Maan and nearby
            Pune areas. From motherboard repair and screen replacement to SSD
            upgrades, MacBook repair and data recovery, we provide dependable
            repair solutions for all major laptop brands.
          </p>
        </div>
      </div>
    </section>
  );
}