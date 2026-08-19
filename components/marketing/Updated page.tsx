import { Suspense } from "react";

import MarketingSidebar from "@/components/marketing/MarketingSidebar";
import DashboardHeader from "@/components/marketing/DashboardHeader";
import DashboardCards from "@/components/marketing/DashboardCards";
import QuickActions from "@/components/marketing/QuickActions";
import RecentPosts from "@/components/marketing/RecentPosts";
import UpcomingPosts from "@/components/marketing/UpcomingPosts";

export default function MarketingDashboardPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <MarketingSidebar />

      <main className="flex-1 p-8 space-y-8">
        <DashboardHeader
          title="Marketing Dashboard"
          subtitle="AI Powered Marketing Control Center"
        />

        <Suspense fallback={<div>Loading...</div>}>
          <DashboardCards />
        </Suspense>

        <QuickActions />

        <div className="grid gap-6 lg:grid-cols-2">
          <Suspense fallback={<div>Loading...</div>}>
            <RecentPosts />
          </Suspense>

          <UpcomingPosts />
        </div>
      </main>
    </div>
  );
}