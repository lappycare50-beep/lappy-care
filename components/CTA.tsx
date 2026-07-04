import { ArrowRight, Phone, MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-[#FFD000] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="rounded-3xl bg-black p-10 lg:flex lg:items-center lg:justify-between">

          {/* Left */}
          <div className="max-w-2xl">
            <p className="font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Need Help?
            </p>

            <h2 className="mt-4 text-4xl font-bold text-white">
              Ready to Repair Your Laptop?
            </h2>

            <p className="mt-4 text-lg text-gray-400">
              Fast diagnosis, genuine spare parts, same-day repair (where possible),
              and pickup & delivery service across Wakad and nearby areas.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <div className="flex items-center gap-2 text-white">
                ✅ Same Day Repair
              </div>

              <div className="flex items-center gap-2 text-white">
                ✅ Genuine Parts
              </div>

              <div className="flex items-center gap-2 text-white">
                ✅ Warranty Support
              </div>

            </div>
          </div>

          {/* Right */}
          <div className="mt-10 flex flex-col gap-4 lg:mt-0">

            <a
              href="tel:+919595057006"
              className="flex items-center justify-center gap-3 rounded-xl bg-yellow-400 px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
            >
              <Phone size={20} />
              Call Now
            </a>

            <a
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl border border-yellow-400 px-8 py-4 text-lg font-bold text-white transition hover:bg-yellow-400 hover:text-black"
            >
              <MessageCircle size={20} />
              WhatsApp Now
            </a>

            <a
              href="#booking"
              className="flex items-center justify-center gap-2 text-yellow-400 hover:underline"
            >
              Book Online
              <ArrowRight size={18} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}