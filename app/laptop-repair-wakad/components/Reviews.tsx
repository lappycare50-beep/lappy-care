import {
  Star,
  Quote,
  CircleUserRound,
  BadgeCheck,
} from "lucide-react";

const reviews = [
  {
    name: "Rahul Patil",
    location: "Wakad",
    review:
      "Excellent service! My Dell laptop motherboard was repaired within a day. The staff explained everything clearly and the laptop is working perfectly.",
  },
  {
    name: "Sneha Kulkarni",
    location: "Hinjawadi",
    review:
      "Very professional team. SSD upgrade was completed quickly and my laptop became much faster. Highly recommended.",
  },
  {
    name: "Amit Shinde",
    location: "Baner",
    review:
      "Affordable pricing, genuine parts and excellent customer support. Pickup and delivery service was smooth.",
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Customer Reviews
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900">
            Trusted by Customers Across Wakad
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Thousands of customers trust Lappy Care for laptop repair,
            motherboard repair, SSD upgrades, screen replacement and
            professional customer support.
          </p>

        </div>

        {/* Review Cards */}

        <div className="mt-16 grid md:grid-cols-3 gap-8">

          {reviews.map((review) => (

            <div
              key={review.name}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl"
            >

              <Quote
                size={34}
                className="text-yellow-500"
              />

              <div className="mt-5 flex gap-1">

                {[1, 2, 3, 4, 5].map((star) => (

                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                ))}

              </div>

              <p className="mt-6 italic leading-7 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">

                  <CircleUserRound
                    size={30}
                    className="text-yellow-600"
                  />

                </div>

                <div>

                  <h3 className="font-bold text-gray-900">
                    {review.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {review.location}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm text-green-700">

                    <BadgeCheck size={16} />

                    Verified Customer

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Google Rating */}

        <div className="mt-20 rounded-3xl bg-black p-10 text-white">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>

              <h3 className="text-5xl font-bold text-yellow-400">
                4.9★
              </h3>

              <p className="mt-3 text-gray-300">
                Google Rating
              </p>

            </div>

            <div>

              <h3 className="text-5xl font-bold text-yellow-400">
                5000+
              </h3>

              <p className="mt-3 text-gray-300">
                Repairs Completed
              </p>

            </div>

            <div>

              <h3 className="text-5xl font-bold text-yellow-400">
                14+
              </h3>

              <p className="mt-3 text-gray-300">
                Years Experience
              </p>

            </div>

            <div>

              <h3 className="text-5xl font-bold text-yellow-400">
                98%
              </h3>

              <p className="mt-3 text-gray-300">
                Customer Satisfaction
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}