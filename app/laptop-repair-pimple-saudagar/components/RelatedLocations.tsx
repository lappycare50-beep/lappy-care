import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const locations = [
  {
    name: "Wakad",
    href: "/laptop-repair-wakad",
    description:
      "Professional laptop repair services with same-day support and pickup & drop.",
  },
  {
    name: "Baner",
    href: "/laptop-repair-baner",
    description:
      "Expert laptop repair with genuine spare parts and transparent pricing.",
  },
  {
    name: "Balewadi",
    href: "/laptop-repair-balewadi",
    description:
      "Reliable laptop servicing including screen replacement and motherboard repair.",
  },
  {
    name: "Punawale",
    href: "/laptop-repair-punawale",
    description:
      "Trusted laptop repair, motherboard repair, SSD upgrades and data recovery.",
  },
  {
    name: "Tathawade",
    href: "/laptop-repair-tathawade",
    description:
      "Complete laptop repair solutions for students, professionals and businesses.",
  },
  {
    name: "Ravet",
    href: "/laptop-repair-ravet",
    description:
      "Professional laptop repair services with experienced technicians and quality spare parts.",
  },
];

export default function RelatedLocations() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Laptop Repair Services Near Pimple Saudagar
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Lappy Care also serves nearby Pune locations with professional
            laptop repair, upgrades, motherboard repair and data recovery.
            Explore our dedicated service pages below.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={location.href}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="mb-6 inline-flex rounded-xl bg-yellow-100 p-4">
                <MapPin className="h-8 w-8 text-yellow-600" />
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 transition group-hover:text-yellow-600">
                  {location.name}
                </h3>

                <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-yellow-600" />
              </div>

              <p className="mt-4 text-gray-600">
                {location.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-black px-8 py-12 text-center text-white">
          <h3 className="text-3xl font-bold">
            Serving Pimple Saudagar & Nearby Pune Areas
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            Whether you're in Pimple Saudagar, Wakad, Baner, Balewadi,
            Punawale, Tathawade or Ravet, Lappy Care offers dependable laptop
            repair, motherboard repair, screen replacement, SSD upgrades,
            battery replacement and data recovery backed by experienced
            technicians.
          </p>

          <Link
            href="/#booking"
            className="mt-8 inline-flex rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            Book Laptop Repair
          </Link>
        </div>
      </div>
    </section>
  );
}