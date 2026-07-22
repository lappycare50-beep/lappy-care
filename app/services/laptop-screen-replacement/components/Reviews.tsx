import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Amit Kulkarni",
    location: "Wakad",
    rating: 5,
    review:
      "My Dell laptop screen was badly cracked after an accidental drop. The team explained the available replacement options clearly and completed the work professionally. The display quality looks excellent.",
  },
  {
    name: "Sneha Patil",
    location: "Hinjawadi",
    rating: 5,
    review:
      "Very professional service. My HP laptop had a flickering display and it was replaced successfully. Communication throughout the repair process was clear and transparent.",
  },
  {
    name: "Rahul Deshmukh",
    location: "Baner",
    rating: 5,
    review:
      "I contacted Lappy Care for my Lenovo laptop screen replacement. The technicians identified the correct display and installed it carefully. Overall, I had a smooth repair experience.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Customer Feedback
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Customer satisfaction is one of our priorities. Here are a
            few examples of the feedback we commonly receive from
            customers after laptop screen replacement services.
          </p>
        </div>

        {/* Review Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
            >
              <Quote className="h-10 w-10 text-yellow-400" />

              <div className="mt-5 flex">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {review.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {review.location}, Pune
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-20 rounded-3xl bg-zinc-900 p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Customer-First Approach
              </h3>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                We aim to provide professional laptop repair services,
                clear communication and quality workmanship. Every repair
                is handled carefully, and customers are informed about
                the available repair options before work begins.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Why Customers Choose Lappy Care
              </h3>

              <ul className="mt-6 space-y-3 text-gray-300">
                <li>✓ Professional Laptop Repair Engineers</li>
                <li>✓ Transparent Repair Process</li>
                <li>✓ Quality Replacement Parts</li>
                <li>✓ Thorough Device Testing</li>
                <li>✓ Friendly Customer Support</li>
                <li>✓ Service Across Pune & PCMC</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-gray-900">
            Trusted Laptop Screen Replacement Service in Pune
          </h3>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lappy Care provides professional laptop screen replacement
            services for HP, Dell, Lenovo, ASUS, Acer, Apple and other
            leading brands. Our focus is on quality repairs, reliable
            workmanship and a smooth customer experience from inspection
            to delivery.
          </p>
        </div>
      </div>
    </section>
  );
}