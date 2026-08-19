"use client";

import { useRouter } from "next/navigation";

import { Copy, Pencil, Trash2 } from "lucide-react";

import { GeneratedPost } from "@/types/generatedPost";

interface Props {
  post: GeneratedPost;

  onCopy?: (post: GeneratedPost) => void;

  onDelete?: (post: GeneratedPost) => void;
}

export default function GeneratedPostRow({
  post,
  onCopy,
  onDelete,
}: Props) {
  const router = useRouter();

  function formatDate() {
    if (!post.createdAt) {
      return "-";
    }

    try {
      if (
        typeof (post.createdAt as any).toDate ===
        "function"
      ) {
        return (
          post.createdAt as any
        ).toDate().toLocaleDateString();
      }

      if (
        (post.createdAt as any).seconds !==
        undefined
      ) {
        return new Date(
          (post.createdAt as any).seconds *
            1000
        ).toLocaleDateString();
      }

      return new Date(
        post.createdAt as any
      ).toLocaleDateString();
    } catch {
      return "-";
    }
  }

  function statusClass() {
    switch (post.status) {
      case "Published":
        return "bg-green-500/20 text-green-400";

      case "Draft":
        return "bg-blue-500/20 text-blue-400";

      case "Scheduled":
        return "bg-purple-500/20 text-purple-400";

      case "Ready":
        return "bg-cyan-500/20 text-cyan-400";

      case "Failed":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-yellow-500/20 text-yellow-400";
    }
  }

  return (
    <tr
      onClick={() =>
        router.push(
          `/admin/marketing/posts/${post.id}`
        )
      }
      className="cursor-pointer border-t border-zinc-800 transition-all duration-200 hover:bg-zinc-800/40"
    >
      <td className="px-5 py-4 font-medium text-white">
        {post.platform}
      </td>

      <td className="px-5 py-4 text-zinc-300">
        {post.category}
      </td>

      <td className="px-5 py-4">

        <div className="font-semibold text-white">
          {post.title}
        </div>

        <div className="mt-1 line-clamp-2 text-sm text-zinc-500">
          {post.caption}
        </div>

      </td>

      <td className="px-5 py-4">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass()}`}
        >
          {post.status}
        </span>

      </td>

      <td className="px-5 py-4 text-zinc-400">
        {formatDate()}
      </td>

      <td className="px-5 py-4">

        <div
          className="flex justify-end gap-2"
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          <button
            onClick={() =>
              onCopy?.(post)
            }
            className="rounded-lg border border-green-500 p-2 text-green-400 transition hover:bg-green-500 hover:text-white"
            title="Copy"
          >
            <Copy size={16} />
          </button>

          <button
            onClick={() =>
              router.push(
                `/admin/marketing/posts/${post.id}/edit`
              )
            }
            className="rounded-lg border border-yellow-500 p-2 text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
            title="Edit"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() =>
              onDelete?.(post)
            }
            className="rounded-lg border border-red-500 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </td>
    </tr>
  );
}