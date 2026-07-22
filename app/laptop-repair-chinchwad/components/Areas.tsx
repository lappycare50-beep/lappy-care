import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const areas = [
  "Chinchwad",
  "Chinchwad Gaon",
  "Akurdi",
  "Nigdi",
  "Pimpri",
  "Thergaon",
  "Kalewadi",
  "Wakad",
  "Ravet",
  "Punawale",
  "Tathawade",
  "Pimple Saudagar",
];

export default function Areas() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Service Areas
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Areas We Serve Around Chinchwad
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Lappy Care provides professional laptop repair services across
            Chinchwad and nearby PCMC areas with pickup & drop support,
            experienced technicians and transparent pricing.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="rounded-xl bg-yellow-400 p-3 text-black">
                <MapPin className="h-5 w-5" />
              </div>

              <span className="font-semibold text-gray-800">
                {area}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Laptop Repair Near You in Chinchwad
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Whether you're in Chinchwad, Akurdi, Nigdi, Pimpri, Thergaon,
            Ravet or nearby areas, our expert technicians are ready to
            provide reliable laptop repair services with quick turnaround
            and genuine replacement parts.
          </p>

          <Link
            href="/#booking"
            className="mt-8 inline-flex items-center rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            Book Laptop Repair
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}