"use client";

import { AIContentResponse } from "@/types/aiContent";

interface Props {
  data: AIContentResponse;
}

export default function GeneratedContent({
  data,
}: Props) {
  return (
    <div className="space-y-5 rounded-xl border border-zinc-700 p-6">

      <div>
        <h3>Title</h3>
        <p>{data.title}</p>
      </div>

      <div>
        <h3>Primary Text</h3>
        <p>{data.primaryText}</p>
      </div>

      <div>
        <h3>Caption</h3>
        <p>{data.caption}</p>
      </div>

      <div>
        <h3>Hashtags</h3>

        <p>
          {data.hashtags.join(" ")}
        </p>
      </div>

      <div>
        <h3>CTA</h3>
        <p>{data.callToAction}</p>
      </div>

      <div>
        <h3>Image Prompt</h3>
        <p>{data.imagePrompt}</p>
      </div>

    </div>
  );
}