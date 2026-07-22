import {
  Monitor,
  Laptop,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Professional Screen Replacement",
    description:
      "We replace cracked, broken, flickering, black, white, dead, and damaged laptop screens using premium-quality compatible and genuine display panels.",
  },
  {
    icon: Laptop,
    title: "All Laptop Brands Supported",
    description:
      "Our technicians repair HP, Dell, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung, LG, Microsoft Surface, and many other laptop brands.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Tested Displays",
    description:
      "Every replacement display is thoroughly tested for brightness, colour accuracy, touch functionality (where applicable), and overall performance before delivery.",
  },
  {
    icon: BadgeCheck,
    title: "Experienced Engineers",
    description:
      "Our experienced laptop repair engineers carefully install and test every display to ensure reliable performance and long-lasting results.",
  },
];

export default function ServiceOverview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Laptop Display Repair Experts
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Professional Laptop Screen Replacement Services in Pune
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            A damaged laptop screen can affect your productivity,
            online meetings, studies, and daily work. Whether your
            laptop display has physical damage, lines on the screen,
            flickering issues, black display, white screen, dead
            pixels, or backlight problems, Lappy Care provides
            professional laptop screen replacement services with
            reliable workmanship and quality replacement displays.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-zinc-900 p-10 text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            Why Timely Screen Replacement Matters
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Continuing to use a laptop with a cracked or damaged display
            can reduce visibility and make everyday tasks difficult.
            Replacing a faulty screen restores a clear display and helps
            ensure comfortable day-to-day use. If other hardware issues
            are also present, our technicians will explain the available
            repair options before any work is carried out.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-black/40 p-5">
              <h4 className="font-semibold text-yellow-400">
                Common Display Issues
              </h4>

              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Cracked Laptop Screen</li>
                <li>• Flickering Display</li>
                <li>• Vertical or Horizontal Lines</li>
                <li>• Black Screen</li>
                <li>• White Screen</li>
                <li>• Dead Pixels</li>
              </ul>
            </div>

            <div className="rounded-xl bg-black/40 p-5">
              <h4 className="font-semibold text-yellow-400">
                Supported Display Types
              </h4>

              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• LCD Displays</li>
                <li>• LED Displays</li>
                <li>• IPS Panels</li>
                <li>• Full HD Displays</li>
                <li>• Touch Screens</li>
                <li>• High Refresh Rate Displays</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}