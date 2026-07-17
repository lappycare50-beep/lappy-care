import BookingForm from "@/components/website/BookingForm";

export const metadata = {
  title: "Book Laptop Repair | Lappy Care",
  description:
    "Book your laptop repair online with Lappy Care. Fast, professional and trusted laptop repair service in Wakad, Pune.",
};

export default function BookRepairPage() {
  return (
    <main className="min-h-screen bg-black">

      {/* Hero */}

      <section className="border-b border-yellow-500/20 bg-[#111111]">

        <div className="mx-auto max-w-6xl px-6 py-16">

          <div className="text-center">

            <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              Lappy Care
            </span>

            <h1 className="mt-6 text-5xl font-bold text-white">
              Book Your Laptop Repair
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              Fill in your details below and our support team
              will contact you shortly to confirm your repair
              request.
            </p>

          </div>

        </div>

      </section>

      {/* Booking Form */}

      <section className="py-16">

        <div className="mx-auto max-w-5xl px-6">

          <BookingForm />

        </div>

      </section>

    </main>
  );
}