"use client";

import { useEffect, useState } from "react";

import {
  Sparkles,
  CalendarClock,
  Send,
  Megaphone,
} from "lucide-react";

import DashboardCard from "./DashboardCard";

import { getGeneratedPosts } from "@/services/generatedPostsService";

export default function DashboardCards() {
  const [loading, setLoading] =
    useState(true);

  const [totalPosts, setTotalPosts] =
    useState(0);

  const [scheduledPosts, setScheduledPosts] =
    useState(0);

  const [publishedPosts, setPublishedPosts] =
    useState(0);

  const [draftPosts, setDraftPosts] =
    useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const posts =
        await getGeneratedPosts();

      setTotalPosts(posts.length);

      setScheduledPosts(
        posts.filter(
          (p) => p.status === "Scheduled"
        ).length
      );

      setPublishedPosts(
        posts.filter(
          (p) => p.status === "Published"
        ).length
      );

      setDraftPosts(
        posts.filter(
          (p) =>
            p.status === "Draft" ||
            p.status === "Generated"
        ).length
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title: "AI Posts",
      value: totalPosts,
      icon: Sparkles,
    },
    {
      title: "Draft",
      value: draftPosts,
      icon: Megaphone,
    },
    {
      title: "Scheduled",
      value: scheduledPosts,
      icon: CalendarClock,
    },
    {
      title: "Published",
      value: publishedPosts,
      icon: Send,
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-xl bg-zinc-900"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <DashboardCard
          key={card.title}
          {...card}
        />
      ))}
    </div>
  );
}