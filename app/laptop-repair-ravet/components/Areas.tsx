const areas = [
  "Ravet",
  "Kiwale",
  "Punawale",
  "Tathawade",
  "Wakad",
  "Nigdi",
  "Akurdi",
  "Pimpri",
  "Chinchwad",
  "Dehu Road",
  "Pradhikaran",
  "Hinjawadi",
];

export default function Areas() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Areas We Serve Around Ravet
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Lappy Care provides professional laptop repair services throughout
            Ravet and nearby locations. Whether you need motherboard repair,
            screen replacement, SSD upgrade, battery replacement or data
            recovery, our experienced technicians are ready to help with fast
            turnaround and pickup & drop service for eligible locations.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {areas.map((area) => (
            <div
              key={area}
              className="rounded-xl border border-gray-200 bg-white px-6 py-4 text-center font-medium text-gray-800 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
            >
              {area}
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-black p-10 text-center text-white">
          <h3 className="text-3xl font-bold">
            Laptop Repair Near You in Ravet
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            We proudly serve customers across Ravet, Kiwale, Punawale,
            Tathawade, Wakad, Nigdi, Akurdi, Pimpri and nearby Pune locations.
            From hardware repairs to software troubleshooting, Lappy Care
            delivers reliable laptop repair with genuine parts and experienced
            technicians.
          </p>
        </div>
      </div>
    </section>
  );
}