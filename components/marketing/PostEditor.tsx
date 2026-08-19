import { PostStatus } from "@/types/marketing";

interface PostEditorProps {
  title: string;
  setTitle: (value: string) => void;

  primaryText: string;
  setPrimaryText: (value: string) => void;

  caption: string;
  setCaption: (value: string) => void;

  callToAction: string;
  setCallToAction: (value: string) => void;

  hashtags: string;
  setHashtags: (value: string) => void;

  imagePrompt: string;
  setImagePrompt: (value: string) => void;

  status: PostStatus;
  setStatus: (value: PostStatus) => void;

  platform: string;
  category: string;
}

export default function PostEditor({
  title,
  setTitle,
  primaryText,
  setPrimaryText,
  caption,
  setCaption,
  callToAction,
  setCallToAction,
  hashtags,
  setHashtags,
  imagePrompt,
  setImagePrompt,
  status,
  setStatus,
  platform,
  category,
}: PostEditorProps) {
  return (
    <div className="space-y-6">

      <div>
        <label className="mb-2 block font-semibold">
          Title
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="mb-2 block font-semibold">
            Platform
          </label>

          <input
            disabled
            value={platform}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <input
            disabled
            value={category}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
          />
        </div>

      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Primary Text
        </label>

        <textarea
          rows={5}
          value={primaryText}
          onChange={(e) => setPrimaryText(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Caption
        </label>

        <textarea
          rows={5}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Call To Action
        </label>

        <input
          value={callToAction}
          onChange={(e) => setCallToAction(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Hashtags
        </label>

        <textarea
          rows={3}
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />

        <p className="mt-2 text-xs text-zinc-400">
          Example: #LaptopRepair #Wakad #LappyCare
        </p>
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Image Prompt
        </label>

        <textarea
          rows={4}
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as PostStatus)
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        >
          <option value="Generated">Generated</option>
          <option value="Draft">Draft</option>
          <option value="Ready">Ready</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Published">Published</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

    </div>
  );
}