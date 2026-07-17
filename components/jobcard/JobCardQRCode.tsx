"use client";

type Props = {
  repairId: string;
};

export default function JobCardQRCode({
  repairId,
}: Props) {
  return (
    <div className="flex flex-col items-center">

      <div className="flex h-28 w-28 items-center justify-center rounded-lg border-2 border-black bg-white">

        <div className="text-center">

          <div className="text-lg font-bold">
            QR
          </div>

          <div className="mt-1 text-[10px] text-gray-500">
            Coming Soon
          </div>

        </div>

      </div>

      <p className="mt-2 text-xs font-semibold">
        Scan to Track
      </p>

      <p className="mt-1 text-[10px] text-gray-500">
        {repairId}
      </p>

    </div>
  );
}