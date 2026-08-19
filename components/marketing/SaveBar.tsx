interface SaveBarProps {
  saving: boolean;
  onSave: () => void;
}

export default function SaveBar({
  saving,
  onSave,
}: SaveBarProps) {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 mt-8 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">

        <div>
          <h3 className="font-semibold text-white">
            Unsaved Changes
          </h3>

          <p className="text-sm text-zinc-400">
            Save your changes before leaving this page.
          </p>
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </div>
  );
}