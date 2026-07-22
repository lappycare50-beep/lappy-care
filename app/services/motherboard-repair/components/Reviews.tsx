import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Rahul P.",
    location: "Wakad",
    review:
      "My Dell laptop suddenly stopped turning on due to a motherboard issue. The team diagnosed the problem clearly and completed the repair professionally. The laptop has been working perfectly since then.",
  },
  {
    name: "Sneha K.",
    location: "Hinjawadi",
    review:
      "Excellent motherboard repair service. They explained the fault, shared the repair estimate before starting the work and kept me updated throughout the process. Highly recommended.",
  },
  {
    name: "Amit S.",
    location: "Baner",
    review:
      "My laptop had liquid damage and I thought the motherboard would need replacement. Lappy Care repaired it successfully and saved me from buying a new motherboard.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Customer Reviews
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We focus on accurate diagnosis, transparent communication and
            reliable motherboard repairs. Here are a few examples of the
            feedback we receive from customers across Pune and PCMC.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.location}`}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
            >
              <Quote className="h-10 w-10 text-yellow-400" />

              <div className="mt-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-8 border-t border-gray-200 pt-5">
                <h3 className="font-bold text-gray-900">
                  {review.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {review.location}, Pune
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Trusted Laptop Repair Service Across Pune
          </h3>

          <p className="mx-auto mt-4 max-w-4xl leading-8 text-gray-300">
            Customers choose Lappy Care for professional motherboard repair,
            chip-level diagnostics, transparent pricing and reliable service.
            We proudly serve Wakad, Hinjawadi, Baner, Balewadi, Punawale,
            Tathawade, Ravet, Pimpri, Chinchwad, Aundh, Pashan and nearby
            areas across Pune & PCMC.
          </p>
        </div>
      </div>
    </section>
  );
}