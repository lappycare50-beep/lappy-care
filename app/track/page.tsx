"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Search,
  ArrowRight,
} from "lucide-react";

export default function TrackRepairPage() {

  const router =
    useRouter();

  const [repairId, setRepairId] =
    useState("");

  function handleTrack() {

    const id =
      repairId
        .trim()
        .toUpperCase();

    if (!id) {

      alert(
        "Please enter Repair ID."
      );

      return;

    }

    router.push(
      `/track/${id}`
    );

  }

  return (

    <main className="min-h-screen bg-black">

      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20">

        {/* Heading */}

        <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">

          Repair Tracking

        </span>

        <h1 className="mt-6 text-center text-5xl font-bold text-white">

          Track Your Laptop Repair

        </h1>

        <p className="mt-4 max-w-xl text-center text-gray-400">

          Enter your Repair ID to check the latest repair
          status, technician updates, estimate and delivery
          progress.

        </p>

        {/* Card */}

        <div className="mt-12 w-full rounded-3xl border border-yellow-500/20 bg-[#111111] p-8 shadow-2xl">

          <label className="mb-3 block text-sm font-semibold text-gray-300">

            Repair ID

          </label>

          <div className="flex flex-col gap-4 md:flex-row">

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={repairId}
                placeholder="Example : LC000001"
                onChange={(e) =>
                  setRepairId(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {

                    handleTrack();

                  }

                }}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-700
                  bg-black
                  py-4
                  pl-12
                  pr-4
                  text-lg
                  uppercase
                  text-white
                  outline-none
                  transition
                  focus:border-yellow-400
                "
              />

            </div>

            <button
              type="button"
              onClick={handleTrack}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-yellow-400
                px-8
                py-4
                font-bold
                text-black
                transition
                hover:bg-yellow-300
              "
            >

              Track

              <ArrowRight
                size={18}
              />

            </button>

          </div>

          <div className="mt-8 rounded-xl bg-[#1B1B1B] p-5">

            <h3 className="font-semibold text-yellow-400">

              Example Repair IDs

            </h3>

            <div className="mt-3 flex flex-wrap gap-3">

              <span className="rounded-lg bg-black px-4 py-2 text-sm text-gray-300">

                LC000001

              </span>

              <span className="rounded-lg bg-black px-4 py-2 text-sm text-gray-300">

                LC000125

              </span>

              <span className="rounded-lg bg-black px-4 py-2 text-sm text-gray-300">

                LC000998

              </span>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}