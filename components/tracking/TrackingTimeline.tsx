"use client";

import { Repair } from "@/types/repair";

type Props = {
  status: Repair["status"];
};

const STEPS: Repair["status"][] = [
  "Received",
  "Diagnosing",
  "Waiting Approval",
  "Waiting Parts",
  "Repairing",
  "Testing",
  "Ready",
  "Delivered",
];

export default function TrackingTimeline({
  status,
}: Props) {

  const currentIndex =
    STEPS.indexOf(status);

  return (

    <div className="mt-10">

      <h2 className="mb-5 text-2xl font-bold text-black">
        Repair Progress
      </h2>

      <div className="space-y-4">

        {STEPS.map((step, index) => {

          const completed =
            index < currentIndex;

          const current =
            index === currentIndex;

          return (

            <div
              key={step}
              className="flex items-center gap-4"
            >

              {/* Circle */}

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold

                ${
                  completed
                    ? "border-green-600 bg-green-600 text-white"
                    : current
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >

                {completed
                  ? "✓"
                  : current
                  ? "●"
                  : ""}

              </div>

              {/* Status */}

              <div>

                <p
                  className={`font-semibold

                  ${
                    completed
                      ? "text-green-700"
                      : current
                      ? "text-blue-700"
                      : "text-gray-500"
                  }`}
                >

                  {step}

                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}