"use client";

import { Repair } from "@/types/repair";

type Props = {
  repair: Repair;
};

export default function JobCardAccessories({
  repair,
}: Props) {

  const selected =
    repair.accessories.items || [];

  return (

    <div className="mb-8">

      {/* ==========================
          Section Title
      ========================== */}

      <div className="mb-4 border-b-2 border-black pb-2">

        <h2 className="text-xl font-bold uppercase tracking-wide">
          Accessories Received
        </h2>

      </div>

      {/* ==========================
          Selected Accessories
      ========================== */}

      <div className="rounded-lg border border-gray-300 bg-gray-50 p-5">

        {selected.length === 0 ? (

          <p className="italic text-gray-500">
            No Accessories Received
          </p>

        ) : (

          <div className="grid grid-cols-2 gap-x-10 gap-y-2">

            {selected.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >

                <div className="flex h-5 w-5 items-center justify-center rounded border border-green-700 bg-green-600 text-xs font-bold text-white">

                  ✓

                </div>

                <span className="text-sm font-medium">

                  {item}

                </span>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ==========================
          Other Accessories
      ========================== */}

      {(repair.accessories.other ?? "").trim() !== "" && (

        <div className="mt-5 rounded-lg border border-gray-300 p-4">

          <div className="flex">

            <div className="w-44 font-semibold">
              Other Accessories
            </div>

            <div className="flex-1">
              {repair.accessories.other}
            </div>

          </div>

        </div>

      )}

    </div>

  );

}