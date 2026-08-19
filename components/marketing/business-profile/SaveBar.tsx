"use client";

interface SaveBarProps {
  saving: boolean;
  hasChanges?: boolean;
  lastSaved?: string;
  onSave: () => void;
  onReset?: () => void;
}

export default function SaveBar({
  saving,
  hasChanges = true,
  lastSaved,
  onSave,
  onReset,
}: SaveBarProps) {
  return (
    <div className="sticky bottom-6 z-20 mt-8 rounded-xl border border-zinc-800 bg-zinc-900/95 p-5 shadow-xl backdrop-blur">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h3 className="text-lg font-semibold text-white">
            Business Profile
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {saving
              ? "Saving changes..."
              : hasChanges
              ? "You have unsaved changes."
              : "Everything is up to date."}
          </p>

          {lastSaved && (
            <p className="mt-1 text-xs text-zinc-500">
              Last Saved: {lastSaved}
            </p>
          )}

        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={onReset}
            disabled={saving}
            className="rounded-lg border border-zinc-700 px-6 py-3 text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving || !hasChanges}
            className="rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Business Profile"}
          </button>

        </div>

      </div>

    </div>
  );
}