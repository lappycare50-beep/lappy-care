import { services } from "@/data/common/services";

export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Our Services
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Professional Laptop Repair Services in Wakad
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            We provide reliable repair, upgrade and maintenance services for
            Dell, HP, Lenovo, ASUS, Acer, Apple MacBook and other leading
            laptop brands using quality parts and experienced technicians.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-10 text-center">
          <h3 className="text-3xl font-bold text-white">
            Need Expert Laptop Repair?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Our experienced technicians diagnose the issue, explain the repair
            process clearly, and use quality spare parts to restore your laptop
            quickly and reliably.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919595057006"
              className="rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:bg-yellow-300"
            >
              Call Now
            </a>

            <a
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-500"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}