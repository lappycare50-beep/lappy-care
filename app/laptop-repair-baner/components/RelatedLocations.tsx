import Link from "next/link";
import { MapPin } from "lucide-react";

const locations = [
  {
    name: "Laptop Repair Wakad",
    href: "/laptop-repair-wakad",
    description:
      "Professional laptop repair services in Wakad with pickup & drop support.",
  },
  {
    name: "Laptop Repair Hinjawadi",
    href: "/laptop-repair-hinjawadi",
    description:
      "Expert laptop repair for IT professionals and businesses in Hinjawadi.",
  },
  {
    name: "Laptop Repair Balewadi",
    href: "/laptop-repair-balewadi",
    description:
      "Reliable laptop repair services near Balewadi for all major brands.",
  },
  {
    name: "Laptop Repair Pashan",
    href: "/laptop-repair-pashan",
    description:
      "Affordable laptop repair, SSD upgrades and screen replacement in Pashan.",
  },
  {
    name: "Laptop Repair Aundh",
    href: "/laptop-repair-aundh",
    description:
      "Trusted laptop repair and computer service in Aundh, Pune.",
  },
  {
    name: "Laptop Repair Tathawade",
    href: "/laptop-repair-tathawade",
    description:
      "Fast laptop repair solutions for students, professionals and businesses.",
  },
];

export default function RelatedLocations() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Nearby Locations
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Repair Services Near Baner
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Lappy Care proudly serves customers across Baner and nearby Pune
            locations with professional laptop repair, motherboard repair,
            screen replacement, SSD upgrades and data recovery services.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={location.href}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
                <MapPin className="h-8 w-8 text-black" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {location.name}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {location.description}
              </p>

              <span className="mt-6 inline-block font-semibold text-yellow-600 transition group-hover:translate-x-1">
                Explore Location →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            Serving Baner & Nearby Areas
          </h3>

          <p className="mx-auto mt-4 max-w-4xl text-lg leading-8 text-gray-300">
            We regularly provide laptop repair services across Baner,
            Balewadi, Pashan, Aundh, Sus, Mahalunge, Wakad, Hinjawadi and
            surrounding Pune locations with expert technicians and transparent
            pricing.
          </p>
        </div>
      </div>
    </section>
  );
}