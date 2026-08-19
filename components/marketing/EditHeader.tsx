interface EditHeaderProps {
  status: string;
}

export default function EditHeader({
  status,
}: EditHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-6">

      <div>
        <h1 className="text-3xl font-bold">
          Edit Generated Post
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Update AI generated marketing content before publishing.
        </p>
      </div>

      <div className="rounded-lg border border-yellow-500 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
        {status}
      </div>

    </div>
  );
}