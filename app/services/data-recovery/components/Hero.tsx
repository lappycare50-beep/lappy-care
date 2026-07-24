import Link from "next/link";
import {
  HardDrive,
  ShieldCheck,
  FileSearch,
  Database,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_45%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:px-8">
        {/* Left */}
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            Professional Data Recovery Service
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Laptop Data Recovery
            <span className="block text-yellow-400">
              Service in Pune
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Recover deleted files, formatted drives, SSD data, hard disk
            data, office documents, photos, videos and important business
            files with professional laptop data recovery experts in Pune.
            Safe, secure and confidential recovery solutions for all major
            laptop brands.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-yellow-400" />
              <span>Deleted File Recovery</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-yellow-400" />
              <span>SSD & HDD Recovery</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-yellow-400" />
              <span>Formatted Drive Recovery</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-yellow-400" />
              <span>Secure & Confidential</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#booking"
              className="inline-flex items-center rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
            >
              Book Data Recovery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <a
              href="tel:+919595057006"
              className="inline-flex items-center rounded-xl border border-yellow-400 px-6 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">
            <span>✓ Fast Diagnosis</span>
            <span>✓ Professional Tools</span>
            <span>✓ Data Privacy</span>
            <span>✓ Pune & PCMC</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex w-full max-w-md justify-center lg:justify-end">
          <div className="w-full rounded-3xl border border-yellow-500/20 bg-white/5 p-8 backdrop-blur">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
              <HardDrive className="h-8 w-8" />
            </div>

            <h2 className="text-2xl font-bold text-yellow-400">
              Recover Your Valuable Data
            </h2>

            <p className="mt-3 text-gray-300">
              Our specialists recover important files from failed laptops,
              SSDs, hard disks and external storage devices using advanced
              recovery techniques.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <FileSearch className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold">Deleted File Recovery</h3>
                  <p className="text-sm text-gray-400">
                    Recover accidentally deleted files and folders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Database className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold">SSD & HDD Recovery</h3>
                  <p className="text-sm text-gray-400">
                    Recover data from damaged or inaccessible storage devices.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold">100% Confidential Process</h3>
                  <p className="text-sm text-gray-400">
                    Your recovered files remain private and securely handled.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-yellow-400 p-5 text-center text-black">
              <p className="text-sm font-medium">
                Serving Wakad • Hinjawadi • Baner • Balewadi • Punawale •
                Tathawade • Ravet • Pimple Saudagar • Pune • PCMC
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}