export default function GoogleMap() {
  return (
    <section
      id="location"
      className="bg-black py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-yellow-400">
            Visit Our Store
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white lg:text-5xl">
            Find Lappy Care
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Janoba Chowk, Near Croma, Datta Mandir Road,
            Wakad, Pune - 411057
          </p>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-3xl border border-yellow-500/20 shadow-2xl">
          <div className="aspect-[16/9] w-full">
            <iframe
              title="Lappy Care Google Map"
              src="https://www.google.com/maps?q=Lappy+Care+Laptop+Repair+Shop+and+Service+Center+in+Wakad&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://maps.google.com/?q=Lappy+Care+Laptop+Repair+Shop+and+Service+Center+in+Wakad"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition-all duration-200 hover:scale-105 hover:bg-yellow-300"
          >
            📍 Get Directions
          </a>

          <a
            href="tel:+919595057006"
            className="rounded-xl border border-yellow-400 px-8 py-4 font-bold text-white transition-all duration-200 hover:bg-yellow-400 hover:text-black"
          >
            📞 Call Now
          </a>
        </div>
      </div>
    </section>
  );
}