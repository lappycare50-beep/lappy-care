import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900 p-10 shadow-2xl lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <span className="inline-flex rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
                Ready to Repair Your Laptop?
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
                Need a Laptop Screen Replacement in Pune?
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Whether your laptop screen is cracked, flickering,
                showing display lines, suffering from backlight issues or
                not working properly, our technicians can inspect your
                device and recommend the appropriate repair solution.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-yellow-400" />
                  <span>Professional diagnosis before repair</span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-yellow-400" />
                  <span>Quality replacement display options</span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-yellow-400" />
                  <span>Experienced laptop repair technicians</span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-yellow-400" />
                  <span>Transparent repair recommendations</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="rounded-3xl bg-black/40 p-8">
              <h3 className="text-3xl font-bold text-yellow-400">
                Book Your Laptop Repair
              </h3>

              <p className="mt-5 leading-8 text-gray-300">
                Contact Lappy Care today for laptop screen replacement,
                repair advice or a quotation based on your laptop model.
              </p>

              <div className="mt-10 space-y-4">
                <Link
                  href="/#booking"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-yellow-400 px-6 py-4 text-lg font-semibold text-black transition hover:bg-yellow-300"
                >
                  <CalendarCheck size={22} />
                  Book Repair Online
                </Link>

                <Link
                  href="tel:+919876543210"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-yellow-400 px-6 py-4 text-lg font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >
                  <PhoneCall size={22} />
                  Call Now
                </Link>

                <Link
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-green-500 bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-500"
                >
                  <MessageCircle size={22} />
                  Chat on WhatsApp
                </Link>
              </div>

              <div className="mt-10 rounded-2xl bg-yellow-400/10 p-6">
                <h4 className="font-bold text-yellow-400">
                  Service Coverage
                </h4>

                <p className="mt-3 leading-7 text-gray-300">
                  We serve customers across Wakad, Hinjawadi, Baner,
                  Balewadi, Punawale, Tathawade, Ravet, Pimple
                  Saudagar, Chinchwad, Aundh, Bavdhan, Pashan and nearby
                  areas.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 border-t border-zinc-700 pt-10 text-center">
            <h3 className="text-3xl font-bold">
              Lappy Care – Laptop Repair & Screen Replacement Experts
            </h3>

            <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-gray-300">
              From laptop screen replacement and motherboard repair to
              SSD upgrades, RAM upgrades, battery replacement and data
              recovery, Lappy Care provides professional laptop repair
              services for customers across Pune and PCMC.
            </p>

            <Link
              href="/#booking"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-300"
            >
              Get Started Today
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}