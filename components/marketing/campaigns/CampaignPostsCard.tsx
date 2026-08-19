"use client";

import Link from "next/link";

import { Trash2 } from "lucide-react";

import { GeneratedPost } from "@/types/generatedPost";

interface Props {
  posts: GeneratedPost[];
  onManagePosts: () => void;
  onRemovePost: (postId: string) => void;
}

export default function CampaignPostsCard({
  posts,
  onManagePosts,
  onRemovePost,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Generated Posts
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Posts attached to this campaign
          </p>

        </div>

        <button
          type="button"
          onClick={onManagePosts}
          className="rounded-lg border border-yellow-500 px-4 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
        >
          Manage Posts
        </button>

      </div>

      {/* Empty State */}

      {posts.length === 0 && (

        <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950 py-12 text-center">

          <h3 className="text-lg font-semibold text-white">
            No Posts Attached
          </h3>

          <p className="mt-2 text-zinc-400">
            Attach AI generated posts to this campaign.
          </p>

          <button
            type="button"
            onClick={onManagePosts}
            className="mt-6 rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Attach Posts
          </button>

        </div>

      )}

      {/* Posts */}

      {posts.length > 0 && (

        <div className="space-y-4">

          {posts.map((post) => (

            <div
              key={post.id}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-yellow-500"
            >

              <div className="flex items-start justify-between gap-4">

                {/* Left */}

                <div className="min-w-0 flex-1">

                  <h3 className="truncate text-lg font-semibold text-white">
                    {post.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                    {post.caption}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">

                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {post.platform}
                    </span>

                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {post.category}
                    </span>

                    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400">
                      {post.status}
                    </span>

                  </div>

                </div>

                {/* Right */}

                <div className="flex flex-col gap-2">

                  <Link
                    href={`/admin/marketing/posts/${post.id}`}
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-center text-sm font-semibold text-black transition hover:bg-yellow-400"
                  >
                    View
                  </Link>

                  <Link
                    href={`/admin/marketing/posts/${post.id}/edit`}
                    className="rounded-lg border border-blue-500 px-4 py-2 text-center text-sm font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      onRemovePost(post.id)
                    }
                    className="flex items-center justify-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={16} />

                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}