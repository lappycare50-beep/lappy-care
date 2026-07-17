"use client";

import { useEffect, useState } from "react";

export default function Greeting() {

  const [greeting, setGreeting] =
    useState("");

  useEffect(() => {

    const updateGreeting = () => {

      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {

        setGreeting("🌅 Good Morning");

      } else if (hour >= 12 && hour < 17) {

        setGreeting("☀️ Good Afternoon");

      } else if (hour >= 17 && hour < 21) {

        setGreeting("🌇 Good Evening");

      } else {

        setGreeting("🌙 Good Night");

      }

    };

    updateGreeting();

    // दर मिनिटाला greeting refresh
    const interval = setInterval(
      updateGreeting,
      60000
    );

    return () => clearInterval(interval);

  }, []);

  return (

    <div>

      <h3 className="text-lg font-bold text-gray-900">

        {greeting}

      </h3>

      <p className="mt-1 text-sm text-gray-600">

        Welcome to <span className="font-semibold text-green-600">
          Lappy Care
        </span>

      </p>

    </div>

  );

}