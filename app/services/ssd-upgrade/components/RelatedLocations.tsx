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
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Service Areas
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            SSD Upgrade Services Across Pune & PCMC
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop SSD upgrade services across
            Pune and PCMC. Whether you need a high-speed NVMe SSD, SATA SSD
            installation, data migration or Windows installation, our expert
            technicians are ready to help.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={location.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400">
                <MapPin className="h-6 w-6 text-black" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-yellow-600">
                {location.name}
              </h3>

              <div className="mt-5 inline-flex items-center gap-2 font-medium text-yellow-600">
                View Location
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            Local SSD Upgrade Experts
          </h3>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-300">
            We help customers across Wakad, Hinjawadi, Baner, Balewadi,
            Punawale, Tathawade, Ravet and Pimple Saudagar upgrade their laptops
            with faster NVMe and SATA SSDs. Every upgrade includes compatibility
            verification, professional installation, optional data migration and
            complete performance testing.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Wakad",
              "Hinjawadi",
              "Baner",
              "Balewadi",
              "Punawale",
              "Tathawade",
              "Ravet",
              "Pimple Saudagar",
            ].map((area) => (
              <span
                key={area}
                className="rounded-full border border-yellow-400 px-4 py-2 text-sm font-medium text-yellow-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}