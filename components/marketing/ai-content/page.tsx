import MarketingSidebar from "@/components/marketing/MarketingSidebar";
import AIContentForm from "@/components/marketing/ai/AIContentForm";

export default function AIContentPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <MarketingSidebar />

      <main className="flex-1 p-8">
        <h1 className="mb-8 text-3xl font-bold text-white">
          AI Content Studio
        </h1>

        <AIContentForm />
      </main>
    </div>
  );
}