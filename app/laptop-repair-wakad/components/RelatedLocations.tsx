import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const locations = [
  {
    name: "Laptop Repair Hinjawadi",
    area: "Hinjawadi",
    href: "/laptop-repair-hinjawadi",
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
    name: "Laptop Repair Punawale",
    area: "Punawale",
    href: "/laptop-repair-punawale",
  },
  {
    name: "Laptop Repair Tathawade",
    area: "Tathawade",
    href: "/laptop-repair-tathawade",
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
    name: "Laptop Repair Pimpri",
    area: "Pimpri",
    href: "/laptop-repair-pimpri",
  },
  {
    name: "Laptop Repair Chinchwad",
    area: "Chinchwad",
    href: "/laptop-repair-chinchwad",
  },
  {
    name: "Laptop Repair Aundh",
    area: "Aundh",
    href: "/laptop-repair-aundh",
  },
  {
    name: "Laptop Repair Pashan",
    area: "Pashan",
    href: "/laptop-repair-pashan",
  },
  {
    name: "Laptop Repair Wakad",
    area: "Wakad",
    href: "/laptop-repair-wakad",
  },
];

export default function RelatedLocations() {
  return (
    <section className="py-24 bg-black text-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
            Nearby Service Areas
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold">
            Laptop Repair Across Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Lappy Care provides professional laptop repair services across
            Wakad and nearby Pune locations. Explore our dedicated location
            pages to find trusted laptop repair services near you.
          </p>

        </div>

        {/* Location Cards */}

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {locations.map((location) => (

            <Link
              key={location.name}
              href={location.href}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:bg-zinc-800"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">

                <MapPin
                  size={28}
                  className="text-yellow-600"
                />

              </div>

              <h3 className="mt-5 text-xl font-bold">
                {location.name}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {location.area}, Pune
              </p>

              <div className="mt-6 flex items-center gap-2 font-semibold text-yellow-400">

                Explore Location

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />

              </div>

            </Link>

          ))}

        </div>

        {/* SEO Content */}

        <div className="mt-20 rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-500 p-10">

          <h3 className="text-3xl font-bold text-black">
            Trusted Laptop Repair Near You
          </h3>

          <p className="mt-6 leading-8 text-black/80">
            Whether you are located in Wakad, Hinjawadi, Baner, Balewadi,
            Punawale, Tathawade, Ravet, Pimple Saudagar, Pimpri, Chinchwad,
            Aundh or Pashan, Lappy Care offers reliable laptop repair,
            motherboard repair, screen replacement, SSD upgrades, battery
            replacement, keyboard repair and data recovery services with
            pickup & drop support in eligible areas.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            {locations.map((location) => (

              <Link
                key={location.area}
                href={location.href}
                className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                {location.area}
              </Link>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}