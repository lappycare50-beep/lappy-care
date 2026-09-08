import MarketingSidebar from "@/components/marketing/MarketingSidebar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <MarketingSidebar />

      <main className="min-h-screen ml-72">
        {children}
      </main>
    </div>
  );
}
