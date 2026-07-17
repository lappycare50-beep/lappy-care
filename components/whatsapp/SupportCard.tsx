"use client";

type Props = {
  isOpen: boolean;
};

export default function SupportCard({
  isOpen,
}: Props) {

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

      {/* ==========================================
          Header
      ========================================== */}

      <div className="flex items-center gap-3">

        {/* Avatar */}

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white">

          👨‍💼

        </div>

        {/* Details */}

        <div className="flex-1">

          <h3 className="font-bold text-gray-900">

            Lappy Care Support

          </h3>

          <div className="mt-1 flex items-center gap-2">

            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isOpen
                  ? "animate-pulse bg-green-500"
                  : "bg-red-500"
              }`}
            />

            <span
              className={`text-sm font-medium ${
                isOpen
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >

              {isOpen
                ? "Online"
                : "Offline"}

            </span>

          </div>

        </div>

      </div>

      {/* ==========================================
          Contact
      ========================================== */}

      <div className="mt-5 space-y-2 text-sm">

        <div className="flex items-center gap-2">

          <span>📞</span>

          <a
            href="tel:+919595057006"
            className="text-gray-700 hover:text-green-600"
          >

            +91 95950 57006

          </a>

        </div>

        <div className="flex items-center gap-2">

          <span>📧</span>

          <a
            href="mailto:info@lappycarepune.in"
            className="text-gray-700 hover:text-green-600"
          >

            info@lappycarepune.in

          </a>

        </div>

        <div className="flex items-center gap-2">

          <span>📍</span>

          <span className="text-gray-700">

            Datta Mandir Road,
            Wakad, Pune

          </span>

        </div>

      </div>

      {/* ==========================================
          Footer
      ========================================== */}

      <div className="mt-5 rounded-lg bg-green-50 p-3">

        <p className="text-sm font-semibold text-green-700">

          ⭐ Usually replies within 2 minutes

        </p>

        <p className="mt-1 text-xs text-green-600">

          We're happy to help you with laptop repair,
          upgrades, refurbished laptops and technical support.

        </p>

      </div>

    </div>

  );

}