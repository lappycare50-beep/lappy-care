import { BookingRequest } from "@/types/bookingRequest";

type Props = {
  status: BookingRequest["status"];
  technician: string;
  remarks: string;
  saving: boolean;

  onStatusChange: (
    status: BookingRequest["status"]
  ) => void;

  onTechnicianChange: (
    technician: string
  ) => void;

  onRemarksChange: (
    remarks: string
  ) => void;

  onSave: () => void;
};

const TECHNICIANS = [
  "",
  "Sagar",
  "Rahul",
  "Amit",
  "Rakesh",
];

export default function AdminCard({
  status,
  technician,
  remarks,
  saving,
  onStatusChange,
  onTechnicianChange,
  onRemarksChange,
  onSave,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111111] p-6">

      <h2 className="mb-6 text-2xl font-bold text-yellow-400">
        Admin Management
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Status */}

        <div>

          <label className="mb-2 block text-sm text-gray-400">
            Booking Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(
                e.target.value as BookingRequest["status"]
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-[#181818] p-4 text-white outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="Contacted">Contacted</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Pickup Assigned">
              Pickup Assigned
            </option>
            <option value="Received">Received</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Converted">Converted</option>
          </select>

        </div>

        {/* Technician */}

        <div>

          <label className="mb-2 block text-sm text-gray-400">
            Assigned Technician
          </label>

          <select
            value={technician}
            onChange={(e) =>
              onTechnicianChange(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-700 bg-[#181818] p-4 text-white outline-none"
          >
            {TECHNICIANS.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item || "Select Technician"}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* Remarks */}

      <div className="mt-6">

        <label className="mb-2 block text-sm text-gray-400">
          Admin Remarks
        </label>

        <textarea
          rows={5}
          value={remarks}
          onChange={(e) =>
            onRemarksChange(
              e.target.value
            )
          }
          placeholder="Enter internal remarks..."
          className="w-full rounded-xl border border-gray-700 bg-[#181818] p-4 text-white outline-none"
        />

      </div>

      {/* Save */}

      <div className="mt-8">

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-xl bg-yellow-400 px-8 py-3 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </div>
  );
}