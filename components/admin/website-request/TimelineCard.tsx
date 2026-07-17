import { BookingTimeline } from "@/types/bookingRequest";

type Props = {
  timeline: BookingTimeline[];
};

export default function TimelineCard({
  timeline,
}: Props) {
  const items = [...timeline].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111111] p-6">

      <h2 className="mb-6 text-2xl font-bold text-yellow-400">
        Activity Timeline
      </h2>

      {items.length === 0 ? (

        <div className="rounded-xl border border-dashed border-gray-700 p-6 text-center text-gray-400">
          No activity available.
        </div>

      ) : (

        <div className="space-y-6">

          {items.map((item, index) => (

            <div
              key={`${item.date}-${index}`}
              className="flex gap-4"
            >

              {/* Timeline Dot */}

              <div className="flex flex-col items-center">

                <div className="h-4 w-4 rounded-full bg-yellow-400" />

                {index !== items.length - 1 && (
                  <div className="mt-2 h-full w-px bg-gray-700" />
                )}

              </div>

              {/* Timeline Content */}

              <div className="flex-1 rounded-xl border border-gray-800 bg-[#181818] p-4">

                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                  <h3 className="font-semibold text-white">
                    {item.status}
                  </h3>

                  <span className="text-sm text-gray-400">
                    {new Date(item.date).toLocaleString()}
                  </span>

                </div>

                <p className="mt-3 text-sm text-gray-300">
                  Updated By:{" "}
                  <span className="font-medium text-white">
                    {item.updatedBy}
                  </span>
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}