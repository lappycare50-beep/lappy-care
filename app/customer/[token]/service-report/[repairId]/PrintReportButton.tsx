function StatusBadge({
  status,
}: {
  status?: string;
}) {
  const value = status || "Service";
  const normalized = value.toLowerCase();

  const className =
    normalized === "completed"
      ? "bg-green-50 text-green-700"
      : normalized === "waiting parts"
      ? "bg-orange-50 text-orange-700"
      : normalized === "diagnosing"
      ? "bg-yellow-50 text-yellow-700"
      : normalized === "cancelled"
      ? "bg-red-50 text-red-700"
      : normalized === "received"
      ? "bg-blue-50 text-blue-700"
      : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold ${className}`}
    >
      {value}
    </span>
  );
}

function money(value?: number) {
  if (typeof value !== "number") {
    return "—";
  }

  return `₹${value.toLocaleString("en-IN")}`;
}

function formatDate(value?: string) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}