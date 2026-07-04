import { processSteps } from "@/data/process";

export default function Process() {
  return (
    <section className="bg-[#111111] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-yellow-400">
            How It Works
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Laptop Repair Process
          </h2>

          <p className="mt-4 text-gray-400">
            Simple, fast and transparent.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-yellow-500/20 bg-black p-8 text-center transition hover:-translate-y-2 hover:border-yellow-400"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-2xl font-bold text-black">
                {step.step}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {step.title}
              </h3>

              <p className="text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}