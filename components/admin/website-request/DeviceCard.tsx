import { BookingRequest } from "@/types/bookingRequest";

type Props = {
  request: BookingRequest;
};

export default function DeviceCard({
  request,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111111] p-6">

      <h2 className="mb-6 text-2xl font-bold text-yellow-400">
        Device Details
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <Info
          label="Brand"
          value={request.brand}
        />

        <Info
          label="Model"
          value={request.model}
        />

      </div>

      <div className="mt-6">

        <p className="mb-2 text-sm text-gray-400">
          Problem Description
        </p>

        <div className="min-h-[120px] rounded-xl border border-gray-800 bg-[#181818] p-4">

          <p className="whitespace-pre-wrap text-white">
            {request.problem || "-"}
          </p>

        </div>

      </div>

    </div>
  );
}

type InfoProps = {
  label: string;
  value: string;
};

function Info({
  label,
  value,
}: InfoProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#181818] p-4">

      <p className="text-sm text-gray-400">
        {label}
      </p>

      <p className="mt-2 break-words text-lg font-semibold text-white">
        {value || "-"}
      </p>

    </div>
  );
}