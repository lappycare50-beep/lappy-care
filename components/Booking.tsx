export default function Booking() {
  return (
    <section id="booking" className="bg-black py-20">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-yellow-400">
            Book Repair
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Book Your Laptop Repair
          </h2>

          <p className="mt-4 text-gray-400">
            Fill out the form and we'll contact you shortly.
          </p>
        </div>

        <div className="rounded-3xl border border-yellow-500/20 bg-[#111] p-8">

          <form className="grid gap-6 md:grid-cols-2">

            <input
              type="text"
              placeholder="Full Name"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            <select
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            >
              <option>Select Brand</option>
              <option>HP</option>
              <option>Dell</option>
              <option>Lenovo</option>
              <option>ASUS</option>
              <option>Acer</option>
              <option>Apple</option>
              <option>MSI</option>
            </select>

            <input
              type="text"
              placeholder="Laptop Model"
              className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            <textarea
              rows={5}
              placeholder="Describe Your Problem"
              className="md:col-span-2 rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
            />

            <button
              className="md:col-span-2 rounded-xl bg-yellow-400 py-4 text-lg font-bold text-black transition hover:scale-[1.02]"
            >
              Book Repair
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}