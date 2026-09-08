"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  getScheduledPosts,
  updateGeneratedPost,
} from "@/services/generatedPostsService";

import {
  GeneratedPost,
} from "@/types/generatedPost";

/* =========================================================
   DATE HELPERS
========================================================= */

function toDate(
  value: GeneratedPost["scheduledAt"]
): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate();
  }

  if (
    typeof value === "object" &&
    "seconds" in value &&
    typeof value.seconds === "number"
  ) {
    return new Date(
      value.seconds * 1000
    );
  }

  return null;
}

function formatDate(
  value: GeneratedPost["scheduledAt"]
): string {
  const date = toDate(value);

  if (!date) {
    return "Not scheduled";
  }

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function isDue(
  value: GeneratedPost["scheduledAt"]
): boolean {
  const date = toDate(value);

  if (!date) {
    return false;
  }

  return (
    date.getTime() <=
    Date.now()
  );
}

/* =========================================================
   PLATFORM HELPERS
========================================================= */

function getPlatformLabel(
  platform?: string
): string {
  switch (platform) {
    case "Google Business":
      return "Google Business";

    case "Instagram":
      return "Instagram";

    case "Facebook":
      return "Facebook";

    case "LinkedIn":
      return "LinkedIn";

    case "X":
    case "Twitter":
      return "X";

    default:
      return platform || "Unknown";
  }
}

function getPlatformClass(
  platform?: string
): string {
  switch (platform) {
    case "Google Business":
      return "bg-red-500/15 text-red-400";

    case "Instagram":
      return "bg-pink-500/15 text-pink-400";

    case "Facebook":
      return "bg-blue-500/15 text-blue-400";

    case "LinkedIn":
      return "bg-sky-500/15 text-sky-400";

    default:
      return "bg-zinc-800 text-zinc-300";
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function PublishingQueuePage() {
  const [
    posts,
    setPosts,
  ] = useState<GeneratedPost[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    publishingId,
    setPublishingId,
  ] = useState<string | null>(null);

  const [
    publishError,
    setPublishError,
  ] = useState("");

  const [
    publishSuccess,
    setPublishSuccess,
  ] = useState("");

  /* =======================================================
     LOAD QUEUE
  ======================================================= */

  const loadQueue =
    useCallback(
      async () => {
        try {
          setError("");

          const data =
            await getScheduledPosts();

          setPosts(data);
        } catch (error) {
          console.error(
            "Failed to load publishing queue:",
            error
          );

          setError(
            "Failed to load publishing queue."
          );
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
      },
      []
    );

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  /* =======================================================
     SORT POSTS
  ======================================================= */

  const sortedPosts =
    useMemo(() => {
      return [...posts].sort(
        (first, second) => {
          const firstDate =
            toDate(
              first.scheduledAt
            )?.getTime() ?? 0;

          const secondDate =
            toDate(
              second.scheduledAt
            )?.getTime() ?? 0;

          return (
            firstDate -
            secondDate
          );
        }
      );
    }, [posts]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const dueCount =
    sortedPosts.filter(
      (post) =>
        isDue(
          post.scheduledAt
        )
    ).length;

  const upcomingCount =
    sortedPosts.length -
    dueCount;

  /* =======================================================
     REFRESH
  ======================================================= */

  function refreshQueue() {
    setRefreshing(true);
    setPublishError("");
    setPublishSuccess("");

    loadQueue();
  }

  /* =======================================================
     PUBLISH NOW
  ======================================================= */

  async function publishNow(
    post: GeneratedPost
  ) {
    if (
      publishingId !== null
    ) {
      return;
    }

    /* -------------------------------------------------------
       CURRENTLY SUPPORTED PLATFORM
    ------------------------------------------------------- */

    if (
      post.platform !==
      "Google Business"
    ) {
      setPublishError(
        "Publishing is currently available only for Google Business."
      );

      return;
    }

    try {
      setPublishingId(
        post.id
      );

      setPublishError("");
      setPublishSuccess("");

      /* -----------------------------------------------------
         CALL SERVER PUBLISH API
      ----------------------------------------------------- */

      const response =
        await fetch(
          "/api/marketing/publish",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              platform:
                post.platform,

              title:
                post.title,

              primaryText:
                post.primaryText,

              caption:
                post.caption,

              callToAction:
                post.callToAction,

              imageUrl:
                post.imageUrl,

              language:
                post.language,
            }),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ||
            "Failed to publish post."
        );
      }

      /* -----------------------------------------------------
         UPDATE FIRESTORE STATUS
      ----------------------------------------------------- */

      await updateGeneratedPost(
        post.id,
        {
          status: "Published",

          publishedAt:
            new Date(),
        }
      );

      /* -----------------------------------------------------
         REMOVE FROM LOCAL QUEUE
      ----------------------------------------------------- */

      setPosts(
        (currentPosts) =>
          currentPosts.filter(
            (item) =>
              item.id !==
              post.id
          )
      );

      setPublishSuccess(
        `"${post.title || "Post"}" published successfully.`
      );
    } catch (error) {
      console.error(
        "Failed to publish post:",
        error
      );

      setPublishError(
        error instanceof Error
          ? error.message
          : "Failed to publish post."
      );
    } finally {
      setPublishingId(
        null
      );
    }
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <Link
              href="/admin/marketing/calendar"
              className="mb-3 inline-block text-sm text-zinc-400 transition hover:text-white"
            >
              ← Back to Calendar
            </Link>

            <h1 className="text-3xl font-bold tracking-tight">
              Publishing Queue
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage scheduled marketing posts
              before they are published.
            </p>
          </div>

          <button
            type="button"
            onClick={
              refreshQueue
            }
            disabled={
              refreshing
            }
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {refreshing
              ? "Refreshing..."
              : "Refresh Queue"}
          </button>
        </div>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="mb-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-zinc-500">
              Total Scheduled
            </p>

            <p className="mt-2 text-3xl font-bold">
              {sortedPosts.length}
            </p>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <p className="text-sm text-yellow-400">
              Due for Publishing
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {dueCount}
            </p>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
            <p className="text-sm text-green-400">
              Upcoming
            </p>

            <p className="mt-2 text-3xl font-bold text-green-400">
              {upcomingCount}
            </p>
          </div>

        </div>

        {/* =================================================
            LOAD ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* =================================================
            PUBLISH ERROR
        ================================================= */}

        {publishError && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">

            <div>
              <p className="font-semibold">
                Publishing failed
              </p>

              <p className="mt-1">
                {publishError}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setPublishError("")
              }
              className="text-red-400 transition hover:text-white"
            >
              ✕
            </button>

          </div>
        )}

        {/* =================================================
            PUBLISH SUCCESS
        ================================================= */}

        {publishSuccess && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">

            <div>
              <p className="font-semibold">
                Published successfully
              </p>

              <p className="mt-1">
                {publishSuccess}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setPublishSuccess("")
              }
              className="text-green-400 transition hover:text-white"
            >
              ✕
            </button>

          </div>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-10 text-center text-zinc-400">
            Loading publishing queue...
          </div>
        ) : sortedPosts.length ===
          0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-12 text-center">

            <div className="text-4xl">
              📭
            </div>

            <h2 className="mt-4 text-xl font-semibold">
              Queue is empty
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              No posts are currently scheduled
              for publishing.
            </p>

            <Link
              href="/admin/marketing/calendar"
              className="mt-6 inline-block rounded-lg bg-yellow-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
            >
              Open Content Calendar
            </Link>

          </div>
        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">

            {/* TABLE HEADER */}

            <div className="hidden grid-cols-[1fr_180px_180px_120px_150px] gap-4 border-b border-zinc-800 bg-zinc-900 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500 md:grid">

              <div>
                Post
              </div>

              <div>
                Platform
              </div>

              <div>
                Scheduled At
              </div>

              <div>
                Status
              </div>

              <div>
                Action
              </div>

            </div>

            {/* POSTS */}

            <div className="divide-y divide-zinc-800">

              {sortedPosts.map(
                (post) => {
                  const due =
                    isDue(
                      post.scheduledAt
                    );

                  const isPublishing =
                    publishingId ===
                    post.id;

                  const isGoogle =
                    post.platform ===
                    "Google Business";

                  return (
                    <div
                      key={post.id}
                      className="grid gap-4 px-6 py-5 transition hover:bg-zinc-900/60 md:grid-cols-[1fr_180px_180px_120px_150px] md:items-center"
                    >

                      {/* POST */}

                      <div className="min-w-0">

                        <div className="mb-2 flex items-center gap-2">

                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getPlatformClass(
                              post.platform
                            )}`}
                          >
                            {getPlatformLabel(
                              post.platform
                            )}
                          </span>

                          {due && (
                            <span className="rounded-full bg-yellow-500/15 px-2.5 py-1 text-[11px] font-semibold text-yellow-400">
                              Due
                            </span>
                          )}

                        </div>

                        <Link
                          href={`/admin/marketing/posts/${post.id}`}
                          className="block truncate text-base font-semibold text-white transition hover:text-yellow-400"
                        >
                          {post.title ||
                            "Untitled Post"}
                        </Link>

                        {post.caption && (
                          <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                            {post.caption}
                          </p>
                        )}

                      </div>

                      {/* PLATFORM */}

                      <div className="text-sm text-zinc-300">
                        {getPlatformLabel(
                          post.platform
                        )}
                      </div>

                      {/* SCHEDULED AT */}

                      <div className="text-sm text-zinc-400">
                        {formatDate(
                          post.scheduledAt
                        )}
                      </div>

                      {/* STATUS */}

                      <div>
                        <span className="inline-flex rounded-full bg-yellow-500/15 px-3 py-1.5 text-xs font-semibold text-yellow-400">
                          Scheduled
                        </span>
                      </div>

                      {/* ACTION */}

                      <div>
                        {isGoogle ? (
                          <button
                            type="button"
                            onClick={() =>
                              publishNow(
                                post
                              )
                            }
                            disabled={
                              publishingId !==
                              null
                            }
                            className="w-full rounded-lg bg-yellow-400 px-4 py-2.5 text-xs font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isPublishing
                              ? "Publishing..."
                              : "Publish Now"}
                          </button>
                        ) : (
                          <span className="text-xs text-zinc-600">
                            Coming soon
                          </span>
                        )}
                      </div>

                    </div>
                  );
                }
              )}

            </div>
          </div>
        )}

        {/* =================================================
            FOOTER INFO
        ================================================= */}

        {!loading &&
          sortedPosts.length >
            0 && (
            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

              <div className="flex items-start gap-3">

                <div className="text-xl">
                  ℹ️
                </div>

                <div>
                  <h3 className="font-semibold">
                    Publishing automation
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    Google Business posts can
                    be published directly from
                    this queue. Facebook,
                    Instagram and other
                    platform publishing
                    integrations will be added
                    next.
                  </p>
                </div>

              </div>

            </div>
          )}

      </div>
    </main>
  );
}
