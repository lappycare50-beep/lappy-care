interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-2 text-zinc-400">
        {subtitle}
      </p>
    </div>
  );
}