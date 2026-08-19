"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Copy,
  CopyPlus,
  Pencil,
  Trash2,
  RefreshCw,
  Check,
} from "lucide-react";

import { GeneratedPost } from "@/types/generatedPost";

import {
  duplicateGeneratedPost,
} from "@/services/generatedPostsService";

interface Props {
  post: GeneratedPost;

  onDelete?: () => void;

  onRegenerate?: () => void;
}

export default function ActionButtons({
  post,
  onDelete,
  onRegenerate,
}: Props) {
  const router = useRouter();

  const [copied, setCopied] =
    useState(false);

  const [duplicating, setDuplicating] =
    useState(false);

  async function copyPost() {
    const content = `
${post.title}

${post.primaryText}

${post.caption}

${post.hashtags.join(" ")}

${post.callToAction}
`;

    try {
      await navigator.clipboard.writeText(
        content
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function duplicatePost() {
    try {
      setDuplicating(true);

      const newId =
        await duplicateGeneratedPost(post.id);

      router.push(
        `/admin/marketing/posts/${newId}/edit`
      );
    } catch (error) {
      console.error(error);

      alert("Failed to duplicate post.");
    } finally {
      setDuplicating(false);
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <button
          onClick={copyPost}
          className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-5 py-3 text-white transition hover:border-yellow-500 hover:text-yellow-400"
        >
          {copied ? (
            <>
              <Check size={18} />
              Copied
            </>
          ) : (
            <>
              <Copy size={18} />
              Copy
            </>
          )}
        </button>

        <Link
          href={`/admin/marketing/posts/${post.id}/edit`}
          className="flex items-center justify-center gap-2 rounded-lg border border-blue-500 px-5 py-3 text-blue-400 transition hover:bg-blue-500 hover:text-white"
        >
          <Pencil size={18} />
          Edit
        </Link>

        <button
          onClick={onDelete}
          className="flex items-center justify-center gap-2 rounded-lg border border-red-500 px-5 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <Trash2 size={18} />
          Delete
        </button>

        <button
          onClick={duplicatePost}
          disabled={duplicating}
          className="flex items-center justify-center gap-2 rounded-lg border border-green-500 px-5 py-3 text-green-400 transition hover:bg-green-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CopyPlus size={18} />

          {duplicating
            ? "Duplicating..."
            : "Duplicate"}
        </button>

      </div>

    </div>
  );
}