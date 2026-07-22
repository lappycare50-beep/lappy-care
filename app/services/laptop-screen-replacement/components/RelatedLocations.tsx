import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

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
    name: "Laptop Repair Chinchwad",
    href: "/laptop-repair-chinchwad",
  },
  {
    name: "Laptop Repair Aundh",
    href: "/laptop-repair-aundh",
  },
  {
    name: "Laptop Repair Bavdhan",
    href: "/laptop-repair-bavdhan",
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
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Service Areas
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Screen Replacement Across Pune & PCMC
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop screen replacement
            services across multiple locations in Pune and PCMC. Select
            your nearby area to learn more about our local laptop repair
            services.
          </p>
        </div>

        {/* Location Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {locations.map((location) => (
            <Link
              key={location.href}
              href={location.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                <MapPin size={28} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {location.name}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                Professional laptop repair and screen replacement
                services available in {location.name.replace("Laptop Repair ", "")}.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 font-semibold text-yellow-600 transition group-hover:gap-3">
                View Location
                <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Content */}
        <div className="mt-20 rounded-3xl bg-zinc-900 p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Serving Customers Across Pune
              </h3>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Whether you are located in Wakad, Hinjawadi, Baner,
                Balewadi, Punawale, Tathawade, Ravet, Aundh,
                Chinchwad, Bavdhan, Pashan or nearby areas, our team
                provides professional laptop repair services for a wide
                range of laptop brands and models.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Our Services Include
              </h3>

              <ul className="mt-6 space-y-3 text-gray-300">
                <li>✓ Laptop Screen Replacement</li>
                <li>✓ Motherboard Repair</li>
                <li>✓ SSD Upgrade</li>
                <li>✓ RAM Upgrade</li>
                <li>✓ Battery Replacement</li>
                <li>✓ Data Recovery</li>
                <li>✓ General Laptop Diagnostics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-gray-900">
            Find Laptop Screen Replacement Near You
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our dedicated location pages to learn more about
            laptop repair services available in your area. Each location
            page includes local service information, repair details and
            ways to contact Lappy Care.
          </p>
        </div>
      </div>
    </section>
  );
}