"use client";

import { RepairAccessories } from "@/types/repair";

type Props = {
  accessories: RepairAccessories;
  setAccessories: (
    accessories: RepairAccessories
  ) => void;
};

const ACCESSORIES = [
  "Charger",
  "Laptop Bag",
  "Mouse",
  "Adapter",
  "HDD",
  "SSD",
  "RAM",
  "Pendrive",
  "Power Cable",
  "Battery",
  "DVD Drive",
];

export default function AccessoriesSection({
  accessories,
  setAccessories,
}: Props) {

  const toggleItem = (item: string) => {

    const exists = accessories.items.includes(item);

    if (exists) {

      setAccessories({
        ...accessories,
        items: accessories.items.filter(
          (accessory) => accessory !== item
        ),
      });

    } else {

      setAccessories({
        ...accessories,
        items: [
          ...accessories.items,
          item,
        ],
      });

    }

  };

  return (

    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      {/* Heading */}

      <h2 className="mb-6 text-2xl font-bold text-white">
        Accessories Received
      </h2>

      {/* Accessories List */}

      <div className="grid gap-4 md:grid-cols-3">

        {ACCESSORIES.map((item) => (

          <label
            key={item}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-700 bg-black p-4 transition hover:border-yellow-400"
          >

            <input
              type="checkbox"
              checked={accessories.items.includes(item)}
              onChange={() => toggleItem(item)}
              className="h-5 w-5 accent-yellow-400"
            />

            <span className="text-white">
              {item}
            </span>

          </label>

        ))}

      </div>

      {/* Other Accessories */}

      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium text-gray-300">
          Other Accessories
        </label>

        <input
          type="text"
          value={accessories.other}
          onChange={(e) =>
            setAccessories({
              ...accessories,
              other: e.target.value,
            })
          }
          placeholder="HDMI Cable, Dock, USB Hub..."
          className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none transition focus:border-yellow-400"
        />

      </div>

      {/* Selected Accessories Preview */}

      {accessories.items.length > 0 && (

        <div className="mt-6">

          <h3 className="mb-3 text-sm font-semibold text-yellow-400">
            Selected Accessories
          </h3>

          <div className="flex flex-wrap gap-2">

            {accessories.items.map((item) => (

              <span
                key={item}
                className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm text-yellow-300"
              >
                {item}
              </span>

            ))}

          </div>

        </div>

      )}

    </div>

  );

}