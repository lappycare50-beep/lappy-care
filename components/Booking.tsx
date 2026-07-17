import BookingForm from "./website/BookingForm";

export default function Booking() {
  return (
    <section
      id="booking"
      className="bg-black py-20 scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-yellow-400">
            Book Repair
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Book Your Laptop Repair
          </h2>

          <p className="mt-4 text-gray-400">
            Fill out the form and we'll contact you shortly.
          </p>
        </div>

        <BookingForm />

      </div>
    </section>
  );
}