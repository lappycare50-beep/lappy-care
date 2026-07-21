import { MapPin } from "lucide-react";

const areas = [
  "Punawale",
  "Wakad",
  "Tathawade",
  "Ravet",
  "Pradhikaran",
  "Nigdi",
  "Akurdi",
  "Kiwale",
  "Thergaon",
  "Hinjawadi",
  "Baner",
  "Balewadi",
];

export default function Areas() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Service Areas
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Repair Services Across Punawale & Nearby Areas
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Lappy Care proudly serves customers throughout Punawale and nearby
            Pune locations with professional laptop repair, motherboard repair,
            screen replacement, SSD upgrades, battery replacement, keyboard
            repair and data recovery services.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400">
                <MapPin className="h-6 w-6 text-black" />
              </div>

              <span className="font-semibold text-gray-900">
                {area}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            Local Laptop Repair Experts in Punawale
          </h3>

          <p className="mx-auto mt-4 max-w-4xl text-lg leading-8 text-gray-300">
            Whether you are a student, working professional, gamer or business
            owner, Lappy Care delivers reliable laptop repair services in
            Punawale with experienced technicians, transparent pricing,
            genuine replacement parts and convenient pickup & drop support
            across nearby Pune locations.
          </p>
        </div>
      </div>
    </section>
  );
}