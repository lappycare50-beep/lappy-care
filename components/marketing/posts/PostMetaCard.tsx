"use client";

import { GeneratedPost } from "@/types/generatedPost";

interface Props {
  post: GeneratedPost;
}

interface MetaItemProps {
  label: string;
  value: string;
}

function MetaItem({
  label,
  value,
}: MetaItemProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-2 break-words text-white">
        {value || "-"}
      </p>
    </div>
  );
}

function formatDate(value: any): string {
  if (!value) return "-";

  try {
    // Firestore Timestamp
    if (typeof value.toDate === "function") {
      return value.toDate().toLocaleString();
    }

    // Firestore serialized object
    if (
      value.seconds !== undefined &&
      value.nanoseconds !== undefined
    ) {
      return new Date(
        value.seconds * 1000
      ).toLocaleString();
    }

    // JavaScript Date
    if (value instanceof Date) {
      return value.toLocaleString();
    }

    // ISO String
    return new Date(value).toLocaleString();
  } catch {
    return "-";
  }
}

export default function PostMetaCard({
  post,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Post Information
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        <MetaItem
          label="Platform"
          value={post.platform}
        />

        <MetaItem
          label="Category"
          value={post.category}
        />

        <MetaItem
          label="Language"
          value={post.language}
        />

        <MetaItem
          label="Tone"
          value={post.tone}
        />

        <MetaItem
          label="Status"
          value={post.status}
        />

        <MetaItem
          label="Target Location"
          value={post.targetLocation}
        />

        <MetaItem
          label="Keywords"
          value={
            post.keywords.length
              ? post.keywords.join(", ")
              : "-"
          }
        />

        <MetaItem
          label="Created At"
          value={formatDate(post.createdAt)}
        />

        <MetaItem
          label="Updated At"
          value={formatDate(post.updatedAt)}
        />

      </div>

    </div>
  );
}