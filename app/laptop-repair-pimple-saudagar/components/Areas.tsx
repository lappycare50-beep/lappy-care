import { MapPin } from "lucide-react";

const areas = [
  "Pimple Saudagar",
  "Pimple Gurav",
  "Rahatani",
  "Wakad",
  "Vishal Nagar",
  "Aundh",
  "Baner",
  "Kalewadi",
  "Sangvi",
  "Hinjawadi",
  "Pimpri",
  "Chinchwad",
];

export default function Areas() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Areas We Serve Around Pimple Saudagar
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Lappy Care provides professional laptop repair services across
            Pimple Saudagar and nearby areas with pickup & drop support,
            experienced technicians and fast turnaround.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="rounded-full bg-yellow-100 p-2">
                <MapPin className="h-5 w-5 text-yellow-600" />
              </div>

              <span className="font-medium text-gray-800">
                {area}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-black px-8 py-12 text-center text-white">
          <h3 className="text-3xl font-bold">
            Laptop Repair Near You in Pimple Saudagar
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            We proudly serve customers across Pimple Saudagar, Rahatani,
            Pimple Gurav, Vishal Nagar, Wakad, Baner, Aundh, Kalewadi,
            Sangvi, Hinjawadi, Pimpri and Chinchwad with professional laptop
            repair, motherboard repair, screen replacement, SSD upgrades,
            battery replacement and data recovery services.
          </p>
        </div>
      </div>
    </section>
  );
}