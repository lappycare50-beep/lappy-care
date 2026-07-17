"use client";

type Props = {
  remarks: string;
  setRemarks: (remarks: string) => void;
};

export default function NotesSection({
  remarks,
  setRemarks,
}: Props) {

  return (

    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      {/* Heading */}

      <h2 className="mb-6 text-2xl font-bold text-white">
        Notes & Remarks
      </h2>

      {/* Textarea */}

      <textarea
        rows={8}
        value={remarks}
        onChange={(e) =>
          setRemarks(e.target.value)
        }
        placeholder={`Example:

• Laptop received in working condition.
• Customer approved motherboard repair.
• Replace keyboard and clean cooling fan.
• Inform customer before changing any additional parts.
• Warranty applicable only on replaced parts.
`}
        className="w-full resize-none rounded-xl border border-gray-700 bg-black p-4 text-white outline-none transition focus:border-yellow-400"
      />

      {/* Info Card */}

      <div className="mt-6 rounded-xl border border-blue-500/20 bg-[#111] p-4">

        <h3 className="mb-2 text-lg font-semibold text-blue-400">
          Internal Notes
        </h3>

        <ul className="space-y-2 text-sm text-gray-300">

          <li>
            • These notes are visible only inside ERP.
          </li>

          <li>
            • Technician observations can be recorded here.
          </li>

          <li>
            • Customer approval details may also be noted.
          </li>

          <li>
            • Job Card can optionally print these notes.
          </li>

        </ul>

      </div>

    </div>

  );

}