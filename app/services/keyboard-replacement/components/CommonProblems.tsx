import {
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Keyboard,
  KeyRound,
  Laptop,
  ShieldAlert,
  Wrench,
} from "lucide-react";

const problems = [
  {
    icon: Keyboard,
    title: "Keyboard Not Working",
    description:
      "Complete keyboard failure caused by hardware faults, damaged circuits or connector issues.",
  },
  {
    icon: KeyRound,
    title: "Broken or Missing Keys",
    description:
      "Loose, broken or missing keys make typing difficult and reduce productivity.",
  },
  {
    icon: Droplets,
    title: "Liquid Spill Damage",
    description:
      "Water, tea or coffee spills can damage the keyboard membrane and internal circuitry.",
  },
  {
    icon: Wrench,
    title: "Some Keys Not Responding",
    description:
      "Individual or multiple keys stop working because of wear, dust, connector or hardware faults.",
  },
  {
    icon: ShieldAlert,
    title: "Backlit Keyboard Failure",
    description:
      "Backlight stops working or becomes uneven due to keyboard or power circuit issues.",
  },
  {
    icon: Laptop,
    title: "Ribbon Connector Damage",
    description:
      "Keyboard ribbon cable or motherboard connector damage requires professional diagnosis.",
  },
];

const solutions = [
  "Keyboard Replacement",
  "Backlit Keyboard Replacement",
  "Liquid Damage Inspection",
  "Ribbon Cable Repair",
  "Keyboard Connector Diagnosis",
  "Quality Tested Installation",
  "Warranty Supported",
  "Same Day Service*",
];

export default function CommonProblems() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Common Keyboard Problems
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            We Fix Every Type of
            <span className="block text-yellow-500">
              Laptop Keyboard Problem
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether your keyboard has stopped working, several keys are missing,
            the backlight has failed or liquid has damaged the keyboard,
            Lappy Care provides professional keyboard repair and replacement
            services for all major laptop brands.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <div
                key={problem.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {problem.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-black p-10 text-white">
            <h3 className="text-3xl font-bold">
              Our Keyboard Replacement Solutions
            </h3>

            <p className="mt-6 leading-8 text-gray-300">
              Every keyboard replacement is performed by experienced technicians
              using high-quality replacement parts. We test every key and
              function before handing your laptop back.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {solutions.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-yellow-400 p-10 text-black">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8" />

              <h3 className="text-3xl font-bold">
                Important Advice
              </h3>
            </div>

            <p className="mt-6 leading-8">
              If your laptop keyboard stops working after a liquid spill,
              immediately turn off the laptop and disconnect the charger.
              Continuing to use it may cause additional internal damage.
            </p>

            <div className="mt-8 rounded-2xl bg-black p-6 text-white">
              <p className="font-semibold">
                ✔ Turn off the laptop immediately.
              </p>

              <p className="mt-3">
                ✔ Avoid pressing damaged or stuck keys repeatedly.
              </p>

              <p className="mt-3">
                ✔ Visit Lappy Care for professional diagnosis before further
                damage occurs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}