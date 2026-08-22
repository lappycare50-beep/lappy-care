import Link from "next/link";

export const metadata = {
  title: "Thank You | Lappy Care",
  description:
    "Thank you for choosing Lappy Care. Share your experience with us.",
};

export default function ReviewPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12">
      <div className="w-full max-w-md text-center">

        {/* Brand */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-wide text-yellow-400">
            LAPPY CARE
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Laptop Repair & Service
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">

          <div className="mb-6 text-5xl">
            ⭐
          </div>

          <h2 className="text-2xl font-bold text-white">
            Thank You!
          </h2>

          <p className="mt-4 text-lg text-zinc-300">
            तुमचा अनुभव आमच्यासोबत
            <br />
            share करा.
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            तुमचा feedback आम्हाला आमची service
            आणखी चांगली करण्यास मदत करतो.
          </p>

          {/* CTA */}
          <Link
            href="/review/assistant"
            className="mt-8 block w-full rounded-xl bg-yellow-500 px-6 py-4 text-base font-bold text-black transition hover:bg-yellow-400"
          >
            Share Your Experience ⭐
          </Link>

          <p className="mt-5 text-xs text-zinc-600">
            Takes less than a minute
          </p>

        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-zinc-600">
          © {new Date().getFullYear()} Lappy Care
        </p>

      </div>
    </main>
  );
}