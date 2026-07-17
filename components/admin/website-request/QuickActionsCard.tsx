import { BookingRequest } from "@/types/bookingRequest";

type Props = {
  request: BookingRequest;
  onPrint?: () => void;
};

export default function QuickActionsCard({
  request,
  onPrint,
}: Props) {
  const whatsappUrl = `https://wa.me/91${request.mobile}`;

  const callUrl = `tel:${request.mobile}`;

  const emailUrl = request.email
    ? `mailto:${request.email}`
    : "";

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111111] p-6">

      <h2 className="mb-6 text-2xl font-bold text-yellow-400">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Call */}

        <a
          href={callUrl}
          className="flex items-center justify-center rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-500"
        >
          📞 Call Customer
        </a>

        {/* WhatsApp */}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-xl bg-green-600 px-5 py-4 font-semibold text-white transition hover:bg-green-500"
        >
          💬 WhatsApp
        </a>

        {/* Email */}

        {request.email ? (
          <a
            href={emailUrl}
            className="flex items-center justify-center rounded-xl bg-sky-600 px-5 py-4 font-semibold text-white transition hover:bg-sky-500"
          >
            ✉️ Email
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-xl bg-gray-700 px-5 py-4 font-semibold text-gray-400"
          >
            ✉️ No Email
          </button>
        )}

        {/* Print */}

        <button
          type="button"
          onClick={() => {
            if (onPrint) {
              onPrint();
            } else {
              window.print();
            }
          }}
          className="rounded-xl bg-yellow-400 px-5 py-4 font-semibold text-black transition hover:bg-yellow-300"
        >
          🖨️ Print
        </button>

      </div>

    </div>
  );
}