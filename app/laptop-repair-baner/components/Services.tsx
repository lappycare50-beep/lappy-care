import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/common/services";

export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Our Services
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
  Professional Laptop Repair Services in Baner
</h2>

<p className="mt-5 text-lg leading-8 text-gray-600">
  We provide reliable laptop repair solutions for students,
  working professionals, businesses and home users across Baner.
  Our certified technicians repair all major laptop brands using
  quality spare parts and modern diagnostic tools.
</p>
        </div>

        {/* Services Grid */}

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 transition group-hover:bg-yellow-400">
                  <Icon className="h-8 w-8 text-yellow-600 group-hover:text-black" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <Link
                  href="/book-repair"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-yellow-600 transition hover:text-yellow-700"
                >
                  Book Repair

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}

        <div className="mt-20 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            Need Fast Laptop Repair in BANER?
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            From motherboard repair and screen replacement to SSD upgrades,
            battery replacement and data recovery, Lappy Care provides trusted
            laptop repair services with quick turnaround and pickup & drop
            support in eligible locations.
          </p>

          <Link
            href="/book-repair"
            className="mt-8 inline-flex rounded-xl bg-yellow-400 px-8 py-4 text-lg font-bold text-black transition hover:bg-yellow-300"
          >
            Book Your Laptop Repair
          </Link>
        </div>
      </div>
    </section>
  );
}