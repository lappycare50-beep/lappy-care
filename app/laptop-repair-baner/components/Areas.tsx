import { MapPin } from "lucide-react";

const areas = [
  "Baner",
  "Balewadi",
  "Pashan",
  "Aundh",
  "Sus",
  "Mahalunge",
  "Veerbhadra Nagar",
  "Baner Road",
];

export default function Areas() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Service Areas
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Repair Services Across Baner
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Lappy Care provides fast and reliable laptop repair services across
            Baner and nearby Pune locations. Our pickup & drop service is
            available in eligible areas for added convenience.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-50 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400">
                <MapPin className="h-6 w-6 text-black" />
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

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            Trusted Laptop Repair Near Baner
          </h3>

          <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-gray-300">
            Our technicians regularly serve customers across Baner, Balewadi,
            Pashan, Aundh, Sus, Mahalunge, Veerbhadra Nagar and surrounding
            areas with motherboard repair, screen replacement, SSD upgrades,
            battery replacement, keyboard repair and professional data recovery
            services.
          </p>
        </div>
      </div>
    </section>
  );
}