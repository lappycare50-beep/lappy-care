import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-[#0B0B0B]">

      <Sidebar />

      <div className="flex-1">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-yellow-500/20 bg-[#111111] px-8 py-5">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Dashboard
            </h2>

            <p className="text-sm text-gray-400">
              Welcome back, Admin 👋
            </p>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-[#181818] px-5 py-3 text-white">
            Lappy Care
          </div>

        </header>

        <div className="p-8">
          {children}
        </div>

      </div>

    </main>
  );
}