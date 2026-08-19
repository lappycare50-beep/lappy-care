"use client";

export default function UpcomingPosts() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Upcoming Schedule
      </h2>

      <div className="space-y-4">
        <div className="rounded-lg border border-zinc-800 p-4">
          <p className="font-medium text-white">
            Independence Day Offer
          </p>

          <p className="text-sm text-zinc-400">
            15 Aug • Facebook • Scheduled
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 p-4">
          <p className="font-medium text-white">
            Laptop Repair Tips
          </p>

          <p className="text-sm text-zinc-400">
            Tomorrow • Google Business
          </p>
        </div>
      </div>
    </div>
  );
}