import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul P.",
    location: "Wakad",
    review:
      "My HP laptop battery was draining within an hour. Lappy Care diagnosed the issue, replaced the battery and now the backup is much better. The service was quick and professional.",
  },
  {
    name: "Sneha K.",
    location: "Hinjawadi",
    review:
      "Excellent experience! My Dell laptop wasn't charging properly. They checked the charging system first and replaced only the battery after confirming it was faulty. Transparent service and friendly staff.",
  },
  {
    name: "Amit S.",
    location: "Baner",
    review:
      "Very satisfied with the battery replacement for my Lenovo laptop. The installation was completed quickly and the laptop now holds charge throughout my workday.",
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
            Trusted by Laptop Users Across Pune &amp; PCMC
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Customer satisfaction is our priority. Here are a few examples of
            the feedback we receive from customers who choose Lappy Care for
            professional laptop battery replacement services.
          </p>
        </div>

        {/* Review Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.location}`}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
            >
              <Quote className="h-10 w-10 text-yellow-400" />

              <div className="mt-5 flex gap-1">
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

        {/* Bottom Section */}
        <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">
          <h3 className="text-2xl font-bold">
            Professional Laptop Battery Replacement You Can Trust
          </h3>

          <p className="mx-auto mt-5 max-w-4xl leading-8 text-gray-300">
            From battery health checks to professional battery replacement,
            Lappy Care is committed to delivering reliable service, transparent
            recommendations and quality workmanship for customers across
            Wakad, Hinjawadi, Baner, Balewadi, Punawale, Tathawade, Ravet,
            Pimpri, Chinchwad, Aundh, Pashan and nearby areas.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-6 py-3 font-semibold text-yellow-400">
            Trusted Service • Quality Batteries • Customer Satisfaction
          </div>
        </div>
      </div>
    </section>
  );
}