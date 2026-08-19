"use client";

import { GeneratedPost } from "@/types/generatedPost";

interface Props {
  post: GeneratedPost;
}

interface SectionProps {
  title: string;
  content: string;
}

function ContentSection({
  title,
  content,
}: SectionProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-yellow-400">
        {title}
      </h3>

      <p className="whitespace-pre-wrap break-words text-zinc-200">
        {content || "-"}
      </p>
    </div>
  );
}

export default function PostContentCard({
  post,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Generated Content
      </h2>

      <div className="space-y-6">

        <ContentSection
          title="Title"
          content={post.title}
        />

        <ContentSection
          title="Primary Text"
          content={post.primaryText}
        />

        <ContentSection
          title="Caption"
          content={post.caption}
        />

        <ContentSection
          title="Call To Action"
          content={post.callToAction}
        />

        <ContentSection
          title="Image Prompt"
          content={post.imagePrompt}
        />

      </div>

    </div>
  );
}