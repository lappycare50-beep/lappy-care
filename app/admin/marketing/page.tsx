import { Suspense } from "react";

import MarketingSidebar from "@/components/marketing/MarketingSidebar";
import DashboardCards from "@/components/marketing/DashboardCards";
import QuickActions from "@/components/marketing/QuickActions";
import RecentPosts from "@/components/marketing/RecentPosts";

export const metadata = {
  title: "Marketing Dashboard | Lappy Care ERP",
};

export default function MarketingDashboardPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <MarketingSidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Marketing Dashboard
          </h1>

          <p className="mt-2 text-zinc-400">
            AI Powered Marketing Control Center
          </p>
        </div>

        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <DashboardCards />
        </Suspense>

        <QuickActions />

        <Suspense fallback={<div>Loading Posts...</div>}>
          <RecentPosts />
        </Suspense>
      </main>
    </div>
  );
}