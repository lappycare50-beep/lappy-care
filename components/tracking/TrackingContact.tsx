"use client";

export default function TrackingContact() {

  return (

    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* ==========================
          Heading
      ========================== */}

      <h2 className="mb-6 text-2xl font-bold text-gray-900">

        Need Help?

      </h2>

      <p className="mb-8 text-gray-600">

        Our support team is available during business hours.
        Contact us using any of the options below.

      </p>

      {/* ==========================
          Contact Buttons
      ========================== */}

      <div className="grid gap-4 md:grid-cols-3">

        {/* Call */}

        <a
          href="tel:+919595057006"
          className="flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          📞 Call Now
        </a>

        {/* WhatsApp */}

        <a
          href="https://wa.me/919595057006"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
        >
          💬 WhatsApp
        </a>

        {/* Google Maps */}

        <a
  href="https://www.google.com/maps/place/Lappy+Care+-+Laptop+Repair+Shop+and+Service+Center+in+Wakad/data=!4m2!3m1!1s0x0:0x950e84f984bc8610?sa=X&ved=1t:2428&ictx=111"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center rounded-xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700"
>
  📍 Open in Google Maps
</a>

      </div>

      {/* ==========================
          Shop Details
      ========================== */}

      <div className="mt-8 rounded-xl bg-gray-50 p-5">

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Working Hours
            </p>

            <p className="mt-2 text-lg font-semibold text-gray-900">
              Monday - Saturday
            </p>

            <p className="text-gray-700">
              10:00 AM – 8:00 PM
            </p>

          </div>

          <div>

            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Address
            </p>

            <p className="mt-2 text-gray-900">

              Lappy Care<br />

              Datta Mandir Road,<br />

              Wakad, Pune - 411057

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}