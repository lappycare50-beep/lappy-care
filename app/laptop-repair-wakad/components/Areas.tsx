import Link from "next/link";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

const areas = [
  {
    name: "Hinjawadi",
    href: "/laptop-repair-hinjawadi",
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
    name: "Punawale",
    href: "/laptop-repair-punawale",
  },
  {
    name: "Tathawade",
    href: "/laptop-repair-tathawade",
  },
  {
    name: "Ravet",
    href: "/laptop-repair-ravet",
  },
  {
    name: "Pimple Saudagar",
    href: "/laptop-repair-pimple-saudagar",
  },
  {
    name: "Pimpri",
    href: "/laptop-repair-pimpri",
  },
  {
    name: "Chinchwad",
    href: "/laptop-repair-chinchwad",
  },
  {
    name: "Aundh",
    href: "/laptop-repair-aundh",
  },
  {
    name: "Pashan",
    href: "/laptop-repair-pashan",
  },
  {
    name: "Wakad",
    href: "/laptop-repair-wakad",
  },
];

export default function Areas() {
  return (
    <section className="py-24 bg-black text-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
            Service Areas
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold">
            Laptop Repair Near Wakad
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Lappy Care proudly serves customers in Wakad and nearby areas
            with professional laptop repair, motherboard repair, SSD
            upgrades, screen replacement, battery replacement and pickup &
            drop service.
          </p>

        </div>

        {/* Area Cards */}

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {areas.map((area) => (

            <Link
              key={area.name}
              href={area.href}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:bg-zinc-800"
            >

              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 mx-auto">

                <MapPin
                  size={28}
                  className="text-yellow-600"
                />

              </div>

              <h3 className="mt-5 text-center text-xl font-bold">
                {area.name}
              </h3>

              <p className="mt-2 text-center text-sm text-gray-400">
                Laptop Repair Service
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 text-yellow-400 font-semibold">

                Explore

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />

              </div>

            </Link>

          ))}

        </div>

        {/* Local SEO Content */}

        <div className="mt-20 rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-500 p-10">

          <h3 className="text-3xl font-bold text-black">
            Trusted Laptop Repair Service in Wakad & Nearby Areas
          </h3>

          <p className="mt-6 text-black/80 leading-8">
            If you are searching for <strong>laptop repair in Wakad</strong>,
            <strong> laptop repair near me</strong>,
            <strong> laptop service center in Wakad</strong>,
            <strong> motherboard repair</strong>,
            <strong> SSD upgrade</strong>,
            <strong> RAM upgrade</strong>,
            <strong> screen replacement</strong> or
            <strong> data recovery services</strong>, Lappy Care provides
            professional repair solutions across Wakad, Hinjawadi, Baner,
            Balewadi, Punawale, Tathawade, Ravet, Pimple Saudagar, Pimpri,
            Chinchwad and nearby locations.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-4">

            <div className="flex items-center gap-3">

              <CheckCircle2 className="text-green-700" />

              Same Day Repair Available

            </div>

            <div className="flex items-center gap-3">

              <CheckCircle2 className="text-green-700" />

              Pickup & Drop Service

            </div>

            <div className="flex items-center gap-3">

              <CheckCircle2 className="text-green-700" />

              Genuine Spare Parts

            </div>

            <div className="flex items-center gap-3">

              <CheckCircle2 className="text-green-700" />

              Warranty on Eligible Repairs

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}