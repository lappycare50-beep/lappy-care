"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { GeneratedPost } from "@/types/generatedPost";

interface Props {
  post: GeneratedPost;
}

export default function PostHeader({
  post,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <Link
            href="/admin/marketing/posts"
            className="mb-4 inline-flex items-center gap-2 text-sm text-yellow-400 transition hover:text-yellow-300"
          >
            <ArrowLeft size={18} />
            Back to Posts
          </Link>

          <h1 className="text-3xl font-bold text-white">
            {post.title}
          </h1>

          <p className="mt-2 text-zinc-400">
            AI Generated Marketing Content
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400">
            {post.platform}
          </span>

          <span className="rounded-full bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-400">
            {post.category}
          </span>

          <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
            {post.status}
          </span>

        </div>

      </div>

    </div>
  );
}