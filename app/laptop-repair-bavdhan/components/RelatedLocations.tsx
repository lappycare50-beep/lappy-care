import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const locations = [
  {
    name: "Laptop Repair Wakad",
    href: "/laptop-repair-wakad",
  },
  {
    name: "Laptop Repair Baner",
    href: "/laptop-repair-baner",
  },
  {
    name: "Laptop Repair Aundh",
    href: "/laptop-repair-aundh",
  },
  {
    name: "Laptop Repair Pashan",
    href: "/laptop-repair-pashan",
  },
  {
    name: "Laptop Repair Balewadi",
    href: "/laptop-repair-balewadi",
  },
  {
    name: "Laptop Repair Hinjawadi",
    href: "/laptop-repair-hinjawadi",
  },
  {
    name: "Laptop Repair Kothrud",
    href: "/laptop-repair-kothrud",
  },
  {
    name: "Laptop Repair Tathawade",
    href: "/laptop-repair-tathawade",
  },
];

export default function RelatedLocations() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Nearby Locations
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop Repair Services Near Bavdhan
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Lappy Care offers professional laptop repair services across
            Bavdhan and nearby Pune locations. Explore our dedicated
            location pages to find trusted laptop repair services near you.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={location.href}
              className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-yellow-400 p-3 text-black">
                  <MapPin className="h-5 w-5" />
                </div>

                <span className="font-semibold text-gray-900">
                  {location.name}
                </span>
              </div>

              <ArrowRight className="h-5 w-5 text-yellow-600 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Serving Bavdhan & Nearby Pune Locations
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">
            Whether you're in Bavdhan, Baner, Aundh, Balewadi, Pashan,
            Hinjawadi, Tathawade or Kothrud, our experienced technicians
            provide reliable laptop repair services with genuine quality
            parts, transparent pricing and fast turnaround.
          </p>

          <Link
            href="/#booking"
            className="mt-8 inline-flex items-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            Book Laptop Repair
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}