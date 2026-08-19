interface LivePreviewProps {
  title: string;
  primaryText: string;
  caption: string;
  callToAction: string;
  hashtags: string;
}

export default function LivePreview({
  title,
  primaryText,
  caption,
  callToAction,
  hashtags,
}: LivePreviewProps) {
  return (
    <div className="sticky top-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-5 text-xl font-bold">
        Live Preview
      </h2>

      <div className="rounded-xl border border-zinc-700 bg-black p-5">

        <div className="mb-4 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
            G
          </div>

          <div>
            <p className="font-semibold">
              Google Business
            </p>

            <p className="text-xs text-zinc-400">
              Preview
            </p>
          </div>

        </div>

        <h3 className="text-xl font-bold">
          {title || "Post Title"}
        </h3>

        <p className="mt-4 whitespace-pre-wrap text-zinc-300">
          {primaryText || "Primary text..."}
        </p>

        <p className="mt-4 whitespace-pre-wrap text-zinc-400">
          {caption || "Caption..."}
        </p>

        <button
          type="button"
          className="mt-6 w-full rounded-lg bg-yellow-500 py-3 font-semibold text-black"
        >
          {callToAction || "Call Now"}
        </button>

        <div className="mt-5 border-t border-zinc-800 pt-4">

          <p className="text-sm text-sky-400 break-words">
            {hashtags}
          </p>

        </div>

      </div>

    </div>
  );
}