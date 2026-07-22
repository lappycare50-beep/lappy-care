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
  {
    name: "Laptop Repair Pimpri",
    href: "/laptop-repair-pimpri",
  },
  {
    name: "Laptop Repair Chinchwad",
    href: "/laptop-repair-chinchwad",
  },
  {
    name: "Laptop Repair Aundh",
    href: "/laptop-repair-aundh",
  },
  {
    name: "Laptop Repair Pashan",
    href: "/laptop-repair-pashan",
  },
];

export default function RelatedLocations() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Service Locations
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Laptop Motherboard Repair Near You
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop motherboard repair
            services across Pune and PCMC. Explore our dedicated location
            pages to learn more about repair services available in your area.
          </p>
        </div>

        {/* Location Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={location.href}
              className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <MapPin className="h-5 w-5" />
                </div>

                <span className="font-semibold text-gray-900">
                  {location.name}
                </span>
              </div>

              <ArrowRight className="h-5 w-5 text-yellow-600 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        {/* Bottom Content */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Local Laptop Motherboard Repair Experts
          </h3>

          <p className="mx-auto mt-5 max-w-4xl leading-8 text-gray-300">
            Whether you're in Wakad, Hinjawadi, Baner, Balewadi,
            Punawale, Tathawade, Ravet, Pimpri, Chinchwad, Aundh,
            Pashan or nearby areas, Lappy Care provides professional
            motherboard diagnosis, chip-level repair, BIOS repair,
            charging circuit repair and complete laptop repair services.
            Visit the location page nearest to you for more information.
          </p>
        </div>
      </div>
    </section>
  );
}