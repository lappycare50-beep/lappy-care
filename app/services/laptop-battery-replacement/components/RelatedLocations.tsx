import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const locations = [
  {
    name: "Laptop Repair Wakad",
    href: "/laptop-repair-wakad",
  },
  {
    name: "Laptop Repair Hinjawadi",
    href: "/laptop-repair-hinjawadi",
  },
  {
    name: "Laptop Repair Baner",
    href: "/laptop-repair-baner",
  },
  {
    name: "Laptop Repair Balewadi",
    href: "/laptop-repair-balewadi",
  },
  {
    name: "Laptop Repair Punawale",
    href: "/laptop-repair-punawale",
  },
  {
    name: "Laptop Repair Tathawade",
    href: "/laptop-repair-tathawade",
  },
  {
    name: "Laptop Repair Ravet",
    href: "/laptop-repair-ravet",
  },
  {
    name: "Laptop Repair Pimple Saudagar",
    href: "/laptop-repair-pimple-saudagar",
  },
];

export default function RelatedLocations() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Service Areas
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Laptop Battery Replacement Near You
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop battery replacement services
            across Pune and PCMC. Explore our dedicated location pages to learn
            more about services available in your area.
          </p>
        </div>

        {/* Location Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={location.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-black">
                <MapPin className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {location.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Fast laptop battery replacement with professional diagnosis,
                quality batteries and expert installation.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 font-semibold text-yellow-600 transition-all group-hover:gap-3">
                View Location
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Serving Customers Across Pune &amp; PCMC
          </h3>

          <p className="mx-auto mt-5 max-w-4xl leading-8 text-gray-300">
            Whether you're in Wakad, Hinjawadi, Baner, Balewadi, Punawale,
            Tathawade, Ravet, Pimple Saudagar or nearby areas, our technicians
            provide professional laptop battery replacement, battery health
            checks and charging issue diagnosis for all major laptop brands.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-6 py-3 font-semibold text-yellow-400">
            Pune • PCMC • Fast Service • Trusted Technicians
          </div>
        </div>
      </div>
    </section>
  );
}