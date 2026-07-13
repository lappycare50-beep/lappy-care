type Props = {
  title: string;
  value: string | number;
  color?: string;
};

export default function StatCard({
  title,
  value,
  color = "text-yellow-400",
}: Props) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">
      <p className="text-sm text-gray-400">{title}</p>

      <h2 className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}