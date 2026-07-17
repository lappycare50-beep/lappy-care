import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-500">
        Repair Not Found
      </h1>

      <p className="mt-3 text-gray-400">
        This repair record does not exist.
      </p>

      <Link
        href="/admin/repairs"
        className="mt-6 rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-black"
      >
        Back to Repairs
      </Link>
    </div>
  );
}