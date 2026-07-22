import { MapPin } from "lucide-react";

const areas = [
  "Pashan",
  "Bavdhan",
  "Aundh",
  "Baner",
  "Balewadi",
  "Hinjawadi",
  "Wakad",
  "Punawale",
  "Tathawade",
  "Ravet",
  "Pimple Saudagar",
  "Chinchwad",
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
            Laptop Repair Services Near Pashan
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop repair services across
            Pashan and nearby Pune locations with experienced technicians,
            genuine quality parts and fast turnaround time.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="mr-4 rounded-xl bg-yellow-400 p-3">
                <MapPin className="h-5 w-5 text-black" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">{area}</h3>
                <p className="text-sm text-gray-500">
                  Laptop Repair Service
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Serving Pashan & Nearby Locations
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">
            Our technicians provide reliable laptop repair services for
            customers across Pashan, Bavdhan, Aundh, Baner, Balewadi,
            Hinjawadi, Wakad, Punawale, Tathawade, Ravet, Pimple Saudagar
            and Chinchwad.
          </p>
        </div>
      </div>
    </section>
  );
}