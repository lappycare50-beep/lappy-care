export default function GoogleMap() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-yellow-400">
            Visit Our Store
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Find Lappy Care
          </h2>

          <p className="mt-4 text-gray-400">
            Janoba Chowk, Near Croma, Datta Mandir Road, Wakad
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-yellow-500/20">

          <iframe
            src="https://www.google.com/maps?q=Lappy+Care+Laptop+Repair+Shop+and+Service+Center+in+Wakad&output=embed"
            width="100%"
            height="500"
            loading="lazy"
            style={{ border: 0 }}
            allowFullScreen
          />

        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <a
            href="https://maps.google.com/?q=Lappy+Care+Laptop+Repair+Shop+and+Service+Center+in+Wakad"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black"
          >
            📍 Get Directions
          </a>

          <a
            href="tel:+919595057006"
            className="rounded-xl border border-yellow-400 px-8 py-4 font-bold text-white hover:bg-yellow-400 hover:text-black"
          >
            📞 Call Now
          </a>

        </div>

      </div>
    </section>
  );
}