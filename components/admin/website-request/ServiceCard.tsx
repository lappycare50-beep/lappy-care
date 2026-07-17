type Props = {
  pickupRequired: boolean;
  pickupDate: string;
  pickupTime: string;
  onPickupDateChange: (value: string) => void;
  onPickupTimeChange: (value: string) => void;
};

export default function ServiceCard({
  pickupRequired,
  pickupDate,
  pickupTime,
  onPickupDateChange,
  onPickupTimeChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111111] p-6">

      <h2 className="mb-6 text-2xl font-bold text-yellow-400">
        Service Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Pickup Required */}

        <div className="rounded-xl border border-gray-800 bg-[#181818] p-4">

          <p className="text-sm text-gray-400">
            Pickup Required
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {pickupRequired ? "Yes" : "No"}
          </p>

        </div>

        {/* Pickup Date */}

        <div>

          <label className="mb-2 block text-sm text-gray-400">
            Pickup Date
          </label>

          <input
            type="date"
            value={pickupDate}
            onChange={(e) =>
              onPickupDateChange(e.target.value)
            }
            disabled={!pickupRequired}
            className="w-full rounded-xl border border-gray-700 bg-[#181818] p-4 text-white outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />

        </div>

        {/* Pickup Time */}

        <div>

          <label className="mb-2 block text-sm text-gray-400">
            Pickup Time
          </label>

          <input
            type="time"
            value={pickupTime}
            onChange={(e) =>
              onPickupTimeChange(e.target.value)
            }
            disabled={!pickupRequired}
            className="w-full rounded-xl border border-gray-700 bg-[#181818] p-4 text-white outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />

        </div>

      </div>

    </div>
  );
}