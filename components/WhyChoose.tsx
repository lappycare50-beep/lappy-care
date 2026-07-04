import { stats } from "@/data/stats";

export default function WhyChoose() {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            Why Choose Us
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Trusted by Thousands of Customers
          </h2>

          <p className="mt-4 text-gray-400">
            Quality service, genuine parts and customer satisfaction.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(255,208,0,0.2)]"
            >
              <h3 className="text-5xl font-extrabold text-yellow-400">
                {item.number}
              </h3>

              <p className="mt-4 text-lg text-gray-300">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}