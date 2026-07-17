"use client";

import { useMemo, useState } from "react";
import { RepairProblem } from "@/types/repair";

type Props = {
  problem: RepairProblem;
  setProblem: (problem: RepairProblem) => void;
};

const CATEGORIES = [
  {
    title: "🖥 Display",
    items: [
      "Display Crack",
      "Dead Pixel",
      "Backlight Issue",
      "Flickering",
      "No Display",
    ],
  },
  {
    title: "⌨ Keyboard",
    items: [
      "Keyboard Damage",
      "Missing Key",
      "Keyboard Not Working",
      "Keyboard Backlight Issue",
    ],
  },
  {
    title: "🖱 Touchpad",
    items: [
      "Touchpad Issue",
      "Left Click Issue",
      "Right Click Issue",
    ],
  },
  {
    title: "🧱 Body",
    items: [
      "Body Scratch",
      "Body Dent",
      "Broken Hinge",
      "Loose Hinge",
      "Missing Screw",
    ],
  },
  {
    title: "🔋 Battery",
    items: [
      "Battery Swollen",
      "Battery Backup Low",
      "Battery Not Detected",
    ],
  },
  {
    title: "💧 Liquid Damage",
    items: [
      "Liquid Damage",
      "Rust",
      "Corrosion",
    ],
  },
  {
    title: "🌡 Cooling",
    items: [
      "Fan Noise",
      "Heating",
      "Dust Inside",
    ],
  },
  {
    title: "🔌 Ports",
    items: [
      "USB Port Issue",
      "HDMI Port Issue",
      "LAN Port Issue",
      "Audio Jack Issue",
    ],
  },
  {
    title: "🌐 Network",
    items: [
      "WiFi Issue",
      "Bluetooth Issue",
    ],
  },
  {
    title: "🔊 Audio / Camera",
    items: [
      "Speaker Issue",
      "Microphone Issue",
      "Webcam Issue",
    ],
  },
];

export default function ConditionSection({
  problem,
  setProblem,
}: Props) {

  const [search, setSearch] = useState("");

  function update(value: string) {
    setProblem({
      ...problem,
      physicalCondition: value,
    });
  }

  function toggleItem(item: string) {

    const list = problem.physicalCondition
      ? problem.physicalCondition
          .split("\n")
          .filter(Boolean)
      : [];

    const exists = list.includes(item);

    const updated = exists
      ? list.filter((x) => x !== item)
      : [...list, item];

    update(updated.join("\n"));
  }

  function selectAll() {

    update(
      CATEGORIES.flatMap(
        (c) => c.items
      ).join("\n")
    );

  }

  function clearAll() {
    update("");
  }

  const filteredCategories =
    useMemo(() => {

      if (!search.trim())
        return CATEGORIES;

      return CATEGORIES
        .map((category) => ({
          ...category,
          items: category.items.filter(
            (item) =>
              item
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
          ),
        }))
        .filter(
          (category) =>
            category.items.length > 0
        );

    }, [search]);

  return (

    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-white">
          Physical Inspection
        </h2>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={selectAll}
            className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black hover:bg-yellow-300"
          >
            Select All
          </button>

          <button
            type="button"
            onClick={clearAll}
            className="rounded-lg border border-red-500 px-4 py-2 text-red-400 hover:bg-red-500/10"
          >
            Clear
          </button>

        </div>

      </div>

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search inspection item..."
        className="mb-6 w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
      />
            {/* ==========================
          Inspection Categories
      ========================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        {filteredCategories.map((category) => (

          <div
            key={category.title}
            className="rounded-xl border border-yellow-500/20 bg-black p-5"
          >

            <h3 className="mb-5 text-lg font-bold text-yellow-400">
              {category.title}
            </h3>

            <div className="grid gap-3">

              {category.items.map((item) => {

                const checked =
                  problem.physicalCondition
                    .split("\n")
                    .filter(Boolean)
                    .includes(item);

                return (

                  <label
                    key={item}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all duration-200

                    ${
                      checked
                        ? "border-yellow-400 bg-yellow-400/10"
                        : "border-gray-700 hover:border-yellow-500 hover:bg-[#181818]"
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggleItem(item)
                      }
                      className="h-5 w-5 accent-yellow-400"
                    />

                    <div className="flex flex-1 items-center justify-between">

                      <span
                        className={`

                        ${
                          checked
                            ? "font-semibold text-yellow-300"
                            : "text-gray-300"
                        }`}
                      >
                        {item}
                      </span>

                      {checked && (

                        <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">
                          ✓
                        </span>

                      )}

                    </div>

                  </label>

                );

              })}

            </div>

          </div>

        ))}

      </div>

      {/* ==========================
          Inspection Notes
      ========================== */}

      <div className="mt-8">

        <label className="mb-3 block text-lg font-semibold text-white">
          Technician Inspection Notes
        </label>

        <textarea
          rows={7}
          value={problem.physicalCondition}
          onChange={(e) =>
            update(e.target.value)
          }
          placeholder={`Example:

• Display has crack on left side
• Hinge is loose
• Battery swollen
• Fan making noise`}
          className="w-full resize-none rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

      </div>
            {/* ==========================
          Inspection Summary
      ========================== */}

      <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-black p-6">

        <div className="mb-5 flex items-center justify-between">

          <h3 className="text-xl font-bold text-yellow-400">
            Inspection Summary
          </h3>

          <div className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">

            {
              problem.physicalCondition
                .split("\n")
                .filter(Boolean)
                .length
            } Selected

          </div>

        </div>

        {problem.physicalCondition
          .split("\n")
          .filter(Boolean)
          .length === 0 ? (

          <div className="rounded-xl border border-dashed border-gray-700 p-10 text-center">

            <div className="mb-2 text-5xl">
              📋
            </div>

            <p className="text-gray-500">
              No inspection items selected yet.
            </p>

          </div>

        ) : (

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">

            {problem.physicalCondition
              .split("\n")
              .filter(Boolean)
              .map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-3 transition hover:border-green-400"
                >

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-bold text-white">

                    ✓

                  </div>

                  <span className="font-medium text-white">
                    {item}
                  </span>

                </div>

              ))}

          </div>

        )}

      </div>

      {/* ==========================
          Inspection Progress
      ========================== */}

      <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm font-semibold text-blue-400">
            Inspection Progress
          </span>

          <span className="text-sm text-white">

            {
              problem.physicalCondition
                .split("\n")
                .filter(Boolean)
                .length
            } / {

              CATEGORIES.flatMap(
                (c) => c.items
              ).length

            }

          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-[#2a2a2a]">

          <div
            className="h-full rounded-full bg-yellow-400 transition-all duration-300"
            style={{
              width: `${
                (
                  problem.physicalCondition
                    .split("\n")
                    .filter(Boolean).length /
                  CATEGORIES.flatMap(
                    (c) => c.items
                  ).length
                ) * 100
              }%`,
            }}
          />

        </div>

      </div>
            {/* ==========================
          Technician Reminder
      ========================== */}

      <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">

        <h3 className="mb-4 text-xl font-bold text-blue-400">
          👨‍🔧 Technician Checklist
        </h3>

        <div className="grid gap-3 md:grid-cols-2">

          <div className="flex items-center gap-3 rounded-lg bg-black/30 p-3">
            <span className="text-xl">📷</span>
            <span className="text-gray-300">
              Take Front & Back Photos
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-black/30 p-3">
            <span className="text-xl">🔌</span>
            <span className="text-gray-300">
              Verify Charger & Accessories
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-black/30 p-3">
            <span className="text-xl">💧</span>
            <span className="text-gray-300">
              Check Liquid Damage Carefully
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-black/30 p-3">
            <span className="text-xl">📝</span>
            <span className="text-gray-300">
              Record Visible Physical Damage
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-black/30 p-3">
            <span className="text-xl">🪛</span>
            <span className="text-gray-300">
              Verify Missing Screws / Parts
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-black/30 p-3">
            <span className="text-xl">✅</span>
            <span className="text-gray-300">
              Get Customer Confirmation
            </span>
          </div>

        </div>

      </div>

      {/* ==========================
          Footer
      ========================== */}

      <div className="mt-8 rounded-xl border border-yellow-500/20 bg-[#111111] p-4 text-center">

        <p className="text-sm text-gray-400">
          ✔ Physical Inspection data will appear on
          <span className="font-semibold text-yellow-400">
            {" "}Job Card
          </span>,
          <span className="font-semibold text-yellow-400">
            {" "}Repair Details
          </span>
          {" "}and future
          <span className="font-semibold text-yellow-400">
            {" "}Customer History
          </span>.
        </p>

      </div>

    </div>

  );

}