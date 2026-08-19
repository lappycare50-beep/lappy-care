import MarketingSidebar from "@/components/marketing/MarketingSidebar";
import GeneratedPostsTable from "@/components/marketing/posts/GeneratedPostsTable";

export default function GeneratedPostsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <MarketingSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Generated Posts
          </h1>

          <p className="mt-2 text-zinc-400">
            View, manage and reuse AI-generated marketing content.
          </p>
        </div>

        <GeneratedPostsTable />
      </main>
    </div>
  );
}