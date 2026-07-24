import Link from "next/link";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  Clock3,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black py-20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#facc15_0%,transparent_35%)] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-white/5 p-10 backdrop-blur-sm lg:p-16">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left */}

            <div>

              <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
                Ready to Repair Your Laptop?
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Get Your Laptop
                <span className="block text-yellow-400">
                  Repaired by Experts
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Whether your laptop has a broken screen, motherboard issue,
                charging problem, overheating, keyboard fault or performance
                issue, our experienced technicians are ready to help.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 text-white">
                  <Clock3 className="text-yellow-400" size={22} />
                  Same Day Repair*
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 text-white">
                  <ShieldCheck className="text-yellow-400" size={22} />
                  Repair Warranty
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 text-white">
                  <Wrench className="text-yellow-400" size={22} />
                  Certified Engineers
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 text-white">
                  <Phone className="text-yellow-400" size={22} />
                  Free Repair Estimate
                </div>

              </div>

            </div>

            {/* Right */}

            <div className="rounded-3xl bg-yellow-400 p-8 text-center">

              <h3 className="text-3xl font-bold text-black">
                Contact Lappy Care Today
              </h3>

              <p className="mt-4 text-gray-800">
                Speak with our experts and get the best solution for your
                laptop repair needs.
              </p>

              <div className="mt-8 space-y-4">

                <a
                  href="tel:+919595057006"
                  className="flex items-center justify-center gap-3 rounded-xl bg-black px-6 py-4 font-bold text-white transition hover:bg-gray-900"
                >
                  <Phone size={20} />
                  Call +91 95950 57006
                </a>

                <Link
                  href="https://wa.me/919595057006"
                  target="_blank"
                  className="flex items-center justify-center gap-3 rounded-xl border-2 border-black px-6 py-4 font-bold text-black transition hover:bg-black hover:text-white"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </Link>

              </div>

              <div className="mt-8 rounded-2xl bg-white p-5">

                <p className="font-semibold text-gray-900">
                  📍 Lappy Care
                </p>

                <p className="mt-2 text-gray-600">
                  Janoba Chowk, Datta Mandir Road,
                  Wakad, Pune
                </p>

                <div className="mt-4 inline-flex items-center gap-2 font-semibold text-yellow-600">
                  Visit Our Store
                  <ArrowRight size={18} />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}