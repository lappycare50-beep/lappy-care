import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const locations = [
  {
    title: "Laptop RAM Upgrade Wakad",
    href: "/laptop-repair-wakad",
    description:
      "Professional laptop RAM upgrade service in Wakad with DDR3, DDR4 and DDR5 compatibility checks.",
  },
  {
    title: "Laptop RAM Upgrade Hinjawadi",
    href: "/laptop-repair-hinjawadi",
    description:
      "Fast and reliable laptop RAM upgrade service for homes, offices and IT professionals in Hinjawadi.",
  },
  {
    title: "Laptop RAM Upgrade Baner",
    href: "/laptop-repair-baner",
    description:
      "Upgrade your laptop memory with professional installation and performance testing in Baner.",
  },
  {
    title: "Laptop RAM Upgrade Balewadi",
    href: "/laptop-repair-balewadi",
    description:
      "Trusted RAM upgrade solutions for students, professionals and businesses in Balewadi.",
  },
  {
    title: "Laptop RAM Upgrade Punawale",
    href: "/laptop-repair-punawale",
    description:
      "Affordable DDR4 and DDR5 RAM upgrades with complete compatibility verification in Punawale.",
  },
  {
    title: "Laptop RAM Upgrade Tathawade",
    href: "/laptop-repair-tathawade",
    description:
      "Laptop memory upgrades and performance optimization services in Tathawade.",
  },
];

export default function RelatedLocations() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Service Areas
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop RAM Upgrade Near You
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop RAM upgrade services across
            Pune and PCMC. Explore our dedicated location pages for faster local
            support and expert laptop upgrade services near you.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.title}
              href={location.href}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <MapPin className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900 group-hover:text-yellow-600">
                {location.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {location.description}
              </p>

              <div className="mt-8 inline-flex items-center gap-2 font-semibold text-yellow-600">
                View Location
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            Serving Pune & PCMC
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Our technicians provide expert laptop RAM upgrades throughout
            Wakad, Hinjawadi, Baner, Balewadi, Punawale, Tathawade and nearby
            areas. Every upgrade includes compatibility verification,
            professional installation and performance testing for reliable,
            long-term results.
          </p>
        </div>
      </div>
    </section>
  );
}