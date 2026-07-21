import { MapPin } from "lucide-react";

const areas = [
  "Balewadi High Street",
  "Balewadi Phata",
  "Mahalunge",
  "Baner",
  "Sus",
  "Aundh",
  "Pashan",
  "Hinjawadi",
  "Wakad",
  "Tathawade",
  "Punawale",
  "Bavdhan",
];

export default function Areas() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Areas We Serve
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Laptop Repair Services Across Balewadi
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop repair services across
            Balewadi and nearby Pune locations. Whether you need motherboard
            repair, screen replacement, SSD upgrades, battery replacement or
            data recovery, our experienced technicians are ready to help.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
                <MapPin className="h-5 w-5 text-black" />
              </div>

              <span className="font-medium text-gray-800">{area}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-black p-10 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            Trusted Laptop Repair Near Balewadi
          </h3>

          <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-gray-300">
            We proudly serve customers across Balewadi, Baner, Mahalunge, Sus,
            Pashan, Aundh, Hinjawadi, Wakad and nearby Pune areas with reliable
            laptop repair services, transparent pricing and professional
            support.
          </p>
        </div>
      </div>
    </section>
  );
}