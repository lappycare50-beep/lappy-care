import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const locations = [
  {
    name: "Laptop Repair Wakad",
    href: "/laptop-repair-wakad",
  },
  {
    name: "Laptop Repair Punawale",
    href: "/laptop-repair-punawale",
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
    name: "Laptop Repair Hinjawadi",
    href: "/laptop-repair-hinjawadi",
  },
  {
    name: "Laptop Repair Ravet",
    href: "/laptop-repair-ravet",
  },
];

export default function RelatedLocations() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Laptop Repair Services Near Tathawade
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Lappy Care also provides professional laptop repair services in
            nearby Pune locations. Explore our dedicated service pages below.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.href}
              href={location.href}
              className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-100 p-3">
                  <MapPin className="h-6 w-6 text-yellow-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600">
                    {location.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    View Service Page
                  </p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:text-yellow-600" />
            </Link>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-black px-8 py-12 text-center text-white">
          <h3 className="text-3xl font-bold">
            Serving Tathawade & Nearby Areas
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            Whether you're in Tathawade, Wakad, Punawale, Baner, Balewadi,
            Hinjawadi or Ravet, Lappy Care offers reliable laptop repair,
            upgrades and data recovery with professional support.
          </p>
        </div>
      </div>
    </section>
  );
}