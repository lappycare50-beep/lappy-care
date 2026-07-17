import { BookingRequest } from "@/types/bookingRequest";

type CustomerCardProps = {
  request: BookingRequest;
};

export default function CustomerCard({
  request,
}: CustomerCardProps) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111111] p-6">

      <h2 className="mb-6 text-2xl font-bold text-yellow-400">
        Customer Details
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <InfoItem
          label="Customer Name"
          value={request.customerName}
        />

        <InfoItem
          label="Mobile Number"
          value={request.mobile}
        />

        <InfoItem
          label="Alternate Mobile"
          value={request.alternateMobile || "-"}
        />

        <InfoItem
          label="Email Address"
          value={request.email || "-"}
        />

      </div>

    </div>
  );
}

type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#181818] p-4">

      <p className="text-sm text-gray-400">
        {label}
      </p>

      <p className="mt-2 break-words text-lg font-semibold text-white">
        {value}
      </p>

    </div>
  );
}