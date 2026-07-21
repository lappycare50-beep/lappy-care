import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const locations = [
  {
    name: "Laptop Repair Wakad",
    area: "Wakad",
    href: "/laptop-repair-wakad",
  },
  {
    name: "Laptop Repair Baner",
    area: "Baner",
    href: "/laptop-repair-baner",
  },
  {
    name: "Laptop Repair Balewadi",
    area: "Balewadi",
    href: "/laptop-repair-balewadi",
  },
  {
    name: "Laptop Repair Tathawade",
    area: "Tathawade",
    href: "/laptop-repair-tathawade",
  },
  {
    name: "Laptop Repair Punawale",
    area: "Punawale",
    href: "/laptop-repair-punawale",
  },
  {
    name: "Laptop Repair Ravet",
    area: "Ravet",
    href: "/laptop-repair-ravet",
  },
  {
    name: "Laptop Repair Pimple Saudagar",
    area: "Pimple Saudagar",
    href: "/laptop-repair-pimple-saudagar",
  },
  {
    name: "Laptop Repair Aundh",
    area: "Aundh",
    href: "/laptop-repair-aundh",
  },
];

export default function RelatedLocations() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Nearby Service Areas
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Repair Services Near Hinjawadi
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Lappy Care proudly serves customers across Hinjawadi and nearby
            Pune locations. Explore our dedicated location pages to find
            professional laptop repair services near you.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={location.href}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 transition group-hover:bg-yellow-400">
                <MapPin className="h-8 w-8 text-yellow-600 group-hover:text-black" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {location.name}
              </h3>

              <p className="mt-3 text-gray-600">
                Professional laptop repair service in {location.area}.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 font-semibold text-yellow-600">
                View Location

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Content */}

        <div className="mt-20 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            Serving Hinjawadi & Nearby Pune Areas
          </h3>

          <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-gray-300">
            Our technicians regularly provide laptop repair, motherboard
            repair, MacBook repair, SSD upgrades, screen replacement,
            keyboard repair, battery replacement and data recovery services
            across Hinjawadi, Wakad, Baner, Balewadi, Tathawade, Punawale,
            Ravet, Aundh and surrounding locations.
          </p>
        </div>
      </div>
    </section>
  );
}