import {
  Laptop,
  MonitorX,
  BatteryWarning,
  Thermometer,
  Keyboard,
  Droplets,
  HardDrive,
  Cpu,
} from "lucide-react";

const problems = [
  {
    icon: Laptop,
    title: "Laptop Running Slow",
    description:
      "Slow startup, freezing, hanging or poor overall performance.",
  },
  {
    icon: MonitorX,
    title: "No Display / Broken Screen",
    description:
      "Blank screen, cracked display, flickering or display lines.",
  },
  {
    icon: BatteryWarning,
    title: "Battery Not Charging",
    description:
      "Battery drains quickly, won't charge or needs replacement.",
  },
  {
    icon: Thermometer,
    title: "Overheating",
    description:
      "Laptop gets hot, fan noise increases or shuts down unexpectedly.",
  },
  {
    icon: Keyboard,
    title: "Keyboard / Touchpad Issues",
    description:
      "Keys not working, stuck keys or touchpad not responding.",
  },
  {
    icon: Droplets,
    title: "Liquid Damage",
    description:
      "Tea, coffee or water spill causing hardware failure.",
  },
  {
    icon: HardDrive,
    title: "Hard Disk / SSD Failure",
    description:
      "Boot failure, clicking sound or important data inaccessible.",
  },
  {
    icon: Cpu,
    title: "Motherboard Problems",
    description:
      "Dead laptop, power issues or advanced chip-level faults.",
  },
];

export default function CommonProblems() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Common Laptop Issues
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            We Repair All Types of Laptop Problems
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether your laptop is slow, overheating, has a broken screen,
            charging issue or motherboard fault, our expert technicians can
            diagnose and repair it quickly using professional tools and quality
            spare parts.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <div
                key={problem.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {problem.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-black px-8 py-12 text-center">
          <h3 className="text-3xl font-bold text-white">
            Not Sure What's Wrong With Your Laptop?
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">
            Bring your laptop to Lappy Care for a professional diagnosis. Our
            experienced technicians will identify the exact issue and provide a
            transparent repair estimate before any work begins.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919595057006"
              className="rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-yellow-400 px-6 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}