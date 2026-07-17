import Link from "next/link";

type Props = {
  converted: boolean;
  repairId?: string;
  repairDocId?: string;
  converting: boolean;
  onConvert: () => void;
};

export default function ConvertCard({
  converted,
  repairId,
  repairDocId,
  converting,
  onConvert,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111111] p-6">
      <h2 className="mb-6 text-2xl font-bold text-yellow-400">
        Convert To Repair
      </h2>

      {converted ? (
        <div className="space-y-5">
          <div className="rounded-xl border border-green-600 bg-green-900/20 p-5">
            <p className="text-sm text-green-300">
              Booking successfully converted.
            </p>

            <p className="mt-2 text-xl font-bold text-white">
              Repair ID : {repairId}
            </p>
          </div>

          {repairDocId && (
            <Link
              href={`/admin/repairs/${repairDocId}`}
              className="inline-flex rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
            >
              Open Repair
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-gray-300">
            Convert this website booking into an ERP Repair Job Card.
          </p>

          <button
            type="button"
            onClick={onConvert}
            disabled={converting}
            className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {converting
              ? "Converting..."
              : "Convert To Repair"}
          </button>
        </div>
      )}
    </div>
  );
}