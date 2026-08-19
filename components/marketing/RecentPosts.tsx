"use client";

const posts = [
  {
    title: "Laptop Battery Replacement Offer",
    platform: "Facebook",
    status: "Published",
  },
  {
    title: "Laptop Screen Replacement",
    platform: "Google Business",
    status: "Scheduled",
  },
];

export default function RecentPosts() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Recent Posts
      </h2>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-zinc-800 p-4"
          >
            <div>
              <h3 className="font-medium text-white">
                {post.title}
              </h3>

              <p className="text-sm text-zinc-400">
                {post.platform}
              </p>
            </div>

            <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-medium text-black">
              {post.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}