"use client";

type Props = {
  remarks: string;
  setRemarks: (value: string) => void;
};

export default function NotesSection({
  remarks,
  setRemarks,
}: Props) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Notes & Remarks
      </h2>

      <textarea
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        placeholder="Add technician notes, repair details, customer instructions..."
        rows={6}
        className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none resize-none focus:border-yellow-400"
      />

      <p className="mt-3 text-sm text-gray-500">
        These notes are for internal reference and can also be printed on the job card if required.
      </p>

    </div>
  );
}