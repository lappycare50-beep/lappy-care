import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const nearbyAreas = [
  {
    name: "Hinjawadi Phase 1",
    href: "/laptop-repair-hinjawadi",
  },
  {
    name: "Hinjawadi Phase 2",
    href: "/laptop-repair-hinjawadi",
  },
  {
    name: "Hinjawadi Phase 3",
    href: "/laptop-repair-hinjawadi",
  },
  {
    name: "Blue Ridge",
    href: "/laptop-repair-hinjawadi",
  },
  {
    name: "Megapolis",
    href: "/laptop-repair-hinjawadi",
  },
  {
    name: "Marunji",
    href: "/laptop-repair-hinjawadi",
  },
  {
    name: "Maan",
    href: "/laptop-repair-hinjawadi",
  },
  {
    name: "Wakad",
    href: "/laptop-repair-wakad",
  },
  {
    name: "Tathawade",
    href: "/laptop-repair-tathawade",
  },
  {
    name: "Baner",
    href: "/laptop-repair-baner",
  },
  {
    name: "Balewadi",
    href: "/laptop-repair-balewadi",
  },
  {
    name: "Pashan",
    href: "/laptop-repair-pashan",
  },
];

export default function Areas() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Service Areas
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Repair Near Hinjawadi
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            Lappy Care provides professional laptop repair services across
            Hinjawadi and nearby Pune locations with fast turnaround,
            experienced technicians and pickup & drop support in eligible
            areas.
          </p>
        </div>

        {/* Area Cards */}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {nearbyAreas.map((area) => (
            <Link
              key={area.name}
              href={area.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
                <MapPin
                  size={28}
                  className="text-yellow-600"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {area.name}
              </h3>

              <div className="mt-6 flex items-center gap-2 font-semibold text-yellow-600">
                Explore Area

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Local SEO Content */}

        <div className="mt-20 rounded-3xl bg-yellow-400 p-10">
          <h3 className="text-3xl font-bold text-black">
            Trusted Laptop Repair Service in Hinjawadi
          </h3>

          <p className="mt-6 leading-8 text-black/80">
            Lappy Care offers professional laptop repair services throughout
            Hinjawadi including Phase 1, Phase 2, Phase 3, Blue Ridge,
            Megapolis, Marunji and Maan. Whether you need motherboard repair,
            laptop screen replacement, SSD upgrade, RAM upgrade, battery
            replacement, keyboard repair, charging port repair or data
            recovery, our experienced technicians provide reliable solutions
            using quality spare parts.

            <br />
            <br />

            We regularly serve employees working in Rajiv Gandhi Infotech
            Park, IT professionals, students, startups and businesses across
            Hinjawadi with fast diagnostics, transparent pricing and pickup &
            drop service in eligible locations.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {nearbyAreas.map((area) => (
              <Link
                key={area.name}
                href={area.href}
                className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}