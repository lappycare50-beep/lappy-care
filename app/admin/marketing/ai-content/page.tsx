import MarketingSidebar from "@/components/marketing/MarketingSidebar";
import AIContentForm from "@/components/marketing/ai/AIContentForm";

export default function AIContentPage() {
  return (
    <div className="flex">
      <MarketingSidebar />

      <main className="p-10">
        <AIContentForm />
      </main>
    </div>
  );
}