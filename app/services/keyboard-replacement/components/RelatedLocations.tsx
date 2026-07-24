import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const locations = [
  {
    name: "Laptop Repair Wakad",
    href: "/laptop-repair-wakad",
    description:
      "Professional laptop keyboard replacement and repair services in Wakad.",
  },
  {
    name: "Laptop Repair Hinjawadi",
    href: "/laptop-repair-hinjawadi",
    description:
      "Fast keyboard replacement services for homes, offices and IT professionals.",
  },
  {
    name: "Laptop Repair Baner",
    href: "/laptop-repair-baner",
    description:
      "Reliable laptop keyboard repair and replacement for all major brands.",
  },
  {
    name: "Laptop Repair Balewadi",
    href: "/laptop-repair-balewadi",
    description:
      "Professional laptop repair and keyboard replacement near Balewadi.",
  },
  {
    name: "Laptop Repair Punawale",
    href: "/laptop-repair-punawale",
    description:
      "Affordable keyboard replacement with quality-tested spare parts.",
  },
  {
    name: "Laptop Repair Tathawade",
    href: "/laptop-repair-tathawade",
    description:
      "Trusted laptop keyboard repair service for students, professionals and businesses.",
  },
];

export default function RelatedLocations() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Service Locations
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Laptop Keyboard Replacement
            <span className="block text-yellow-500">
              Across Pune & PCMC
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop keyboard replacement,
            backlit keyboard replacement and keyboard repair services across
            Pune and nearby PCMC areas.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={location.href}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <MapPin className="h-8 w-8" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600">
                {location.name}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {location.description}
              </p>

              <div className="mt-8 inline-flex items-center font-semibold text-yellow-600">
                View Location
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold">
                Local Laptop Repair Experts
              </h3>

              <p className="mt-6 leading-8 text-gray-300">
                Whether you're in Wakad, Hinjawadi, Baner, Balewadi,
                Punawale or Tathawade, our technicians provide professional
                keyboard replacement using high-quality parts and reliable
                workmanship.
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-400 p-8 text-black">
              <h3 className="text-2xl font-bold">
                We Also Serve
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-3 font-medium">
                <span>• Ravet</span>
                <span>• Pimple Saudagar</span>
                <span>• Pimpri</span>
                <span>• Chinchwad</span>
                <span>• Aundh</span>
                <span>• Pashan</span>
                <span>• Bavdhan</span>
                <span>• Pune City</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}