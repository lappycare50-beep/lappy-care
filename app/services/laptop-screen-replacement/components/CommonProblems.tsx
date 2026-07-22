import {
  AlertTriangle,
  MonitorX,
  ScanLine,
  PanelsTopLeft,
  EyeOff,
  MousePointerClick,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Cracked or Broken Screen",
    description:
      "Accidental drops or pressure damage can crack the laptop display, making it difficult or impossible to use.",
  },
  {
    icon: MonitorX,
    title: "Black Screen",
    description:
      "The laptop powers on but the display remains black due to a damaged panel, loose connection, or other display-related issue.",
  },
  {
    icon: ScanLine,
    title: "Flickering Display",
    description:
      "Continuous screen flickering, flashing, or unstable brightness while working.",
  },
  {
    icon: PanelsTopLeft,
    title: "Lines on Screen",
    description:
      "Vertical or horizontal coloured lines caused by display damage, cable faults, or panel failure.",
  },
  {
    icon: EyeOff,
    title: "Dead Pixels & White Spots",
    description:
      "Dead pixels, pressure marks, or white patches that reduce display quality and viewing experience.",
  },
  {
    icon: MousePointerClick,
    title: "Touch Screen Not Working",
    description:
      "Touch-enabled laptops may stop responding because of screen or digitizer damage.",
  },
  {
    icon: Lightbulb,
    title: "Dim Display / Backlight Issue",
    description:
      "The display is barely visible because of backlight or display component problems.",
  },
  {
    icon: CheckCircle2,
    title: "Display Colour Issues",
    description:
      "Incorrect colours, blurry images, ghosting, or poor brightness caused by a failing display panel.",
  },
];

export default function CommonProblems() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Common Laptop Display Problems
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Signs Your Laptop Screen May Need Replacement
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Laptop displays can fail due to accidental damage, pressure,
            ageing, or hardware faults. If you notice any of the
            following symptoms, a professional inspection can help
            determine whether the screen needs replacement or another
            repair is required.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <div
                key={problem.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black transition group-hover:scale-110">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {problem.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-zinc-900 p-10 text-white">
          <h3 className="text-3xl font-bold text-yellow-400">
            When Should You Replace Your Laptop Screen?
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            If your laptop has a cracked display, flickering screen,
            display lines, dead pixels, backlight issues, or a completely
            black screen, it is a good idea to have it inspected by a
            qualified technician. In many cases, replacing the display
            restores normal usability. The exact repair recommendation
            depends on the model and the underlying cause of the problem.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-black/30 p-6">
              <h4 className="text-xl font-semibold text-yellow-400">
                We Replace Screens For
              </h4>

              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• HP Laptops</li>
                <li>• Dell Laptops</li>
                <li>• Lenovo Laptops</li>
                <li>• ASUS Laptops</li>
                <li>• Acer Laptops</li>
                <li>• Apple MacBooks</li>
                <li>• MSI Laptops</li>
                <li>• Samsung & LG Laptops</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-black/30 p-6">
              <h4 className="text-xl font-semibold text-yellow-400">
                Display Types Supported
              </h4>

              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• LCD Displays</li>
                <li>• LED Displays</li>
                <li>• IPS Panels</li>
                <li>• OLED Displays (Selected Models)</li>
                <li>• Touch Screens</li>
                <li>• Full HD & UHD Displays</li>
                <li>• High Refresh Rate Displays</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}