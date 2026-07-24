import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const locations = [
  {
    name: "Laptop Repair Wakad",
    href: "/laptop-repair-wakad",
    description:
      "Professional laptop repair service for customers in Wakad.",
  },
  {
    name: "Laptop Repair Hinjawadi",
    href: "/laptop-repair-hinjawadi",
    description:
      "Fast laptop repair service near Hinjawadi IT Park.",
  },
  {
    name: "Laptop Repair Baner",
    href: "/laptop-repair-baner",
    description:
      "Expert laptop repair and upgrade services in Baner.",
  },
  {
    name: "Laptop Repair Tathawade",
    href: "/laptop-repair-tathawade",
    description:
      "Affordable laptop repair services in Tathawade.",
  },
  {
    name: "Laptop Repair Punawale",
    href: "/laptop-repair-punawale",
    description:
      "Reliable laptop repair for homes and businesses in Punawale.",
  },
  {
    name: "Laptop Repair Ravet",
    href: "/laptop-repair-ravet",
    description:
      "Quick diagnosis and laptop repair near Ravet.",
  },
];

export default function RelatedLocations() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Service Areas
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop Repair Services Across Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop repair services across
            Pune and nearby PCMC areas. Explore our dedicated location pages
            below.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={location.href}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <MapPin size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900 group-hover:text-yellow-600">
                {location.name}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {location.description}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 font-semibold text-yellow-600">
                Explore Location
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-white">
            Can't Find Your Area?
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            If your location isn't listed, contact us. We serve customers from
            many other areas across Pune and PCMC.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919595057006"
              className="rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-yellow-400 px-6 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}