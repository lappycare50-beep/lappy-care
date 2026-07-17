"use client";

import { useEffect, useState } from "react";

export default function BusinessStatus() {

  const [isOpen, setIsOpen] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState("");

  const [today, setToday] =
    useState("");

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    function updateStatus() {

      const now = new Date();

      // -----------------------------
      // Current Time
      // -----------------------------

      setCurrentTime(

        now.toLocaleTimeString("en-IN", {

          hour: "2-digit",

          minute: "2-digit",

          hour12: true,

        })

      );

      // -----------------------------
      // Today
      // -----------------------------

      setToday(

        now.toLocaleDateString("en-IN", {

          weekday: "long",

        })

      );

      // -----------------------------
      // Business Hours
      // Every Day
      // 10:00 AM - 10:00 PM
      // -----------------------------

      const hour = now.getHours();

      const minute = now.getMinutes();

      const currentMinutes =
        hour * 60 + minute;

      const openMinutes =
        10 * 60;

      const closeMinutes =
        22 * 60;

      const open =
        currentMinutes >= openMinutes &&
        currentMinutes < closeMinutes;

      setIsOpen(open);

      if (open) {

        const remaining =
          closeMinutes -
          currentMinutes;

        const hrs =
          Math.floor(
            remaining / 60
          );

        const mins =
          remaining % 60;

        setMessage(

          `Closing in ${hrs}h ${mins}m`

        );

      } else {

        if (
          currentMinutes <
          openMinutes
        ) {

          setMessage(
            "Opens Today at 10:00 AM"
          );

        } else {

          setMessage(
            "Opens Tomorrow at 10:00 AM"
          );

        }

      }

    }

    updateStatus();

    const timer =
      setInterval(
        updateStatus,
        60000
      );

    return () =>
      clearInterval(timer);

  }, []);

  return (

    <div className="rounded-2xl border border-green-200 bg-green-50 p-4">

      {/* ==========================
          Status
      ========================== */}

      <div className="flex items-center gap-2">

        <span
          className={`h-3 w-3 rounded-full ${
            isOpen
              ? "animate-pulse bg-green-500"
              : "bg-red-500"
          }`}
        />

        <span
          className={`font-semibold ${
            isOpen
              ? "text-green-700"
              : "text-red-700"
          }`}
        >

          {isOpen
            ? "We're Open Now"
            : "Currently Closed"}

        </span>

      </div>

      {/* ==========================
          Today
      ========================== */}

      <div className="mt-4 flex items-center justify-between">

        <span className="text-sm text-gray-600">

          📅 Today

        </span>

        <span className="text-sm font-semibold text-gray-800">

          {today}

        </span>

      </div>

      {/* ==========================
          Current Time
      ========================== */}

      <div className="mt-2 flex items-center justify-between">

        <span className="text-sm text-gray-600">

          🕒 Current Time

        </span>

        <span className="text-sm font-semibold text-gray-800">

          {currentTime}

        </span>

      </div>

      {/* ==========================
          Business Hours
      ========================== */}

      <div className="mt-4 rounded-xl bg-white p-3 shadow-sm">

        <p className="font-semibold text-gray-800">

          Business Hours

        </p>

        <p className="mt-1 text-sm text-gray-600">

          Monday – Sunday

        </p>

        <p className="text-sm text-gray-600">

          10:00 AM – 10:00 PM

        </p>

      </div>

      {/* ==========================
          Message
      ========================== */}

      <div
        className={`mt-4 rounded-xl p-3 text-sm font-medium ${
          isOpen
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >

        {message}

      </div>

    </div>

  );

}