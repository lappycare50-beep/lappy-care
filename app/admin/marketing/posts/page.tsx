"use client";

import { useEffect, useMemo, useState } from "react";


import {
  deleteGeneratedPost,
  duplicateGeneratedPost,
  getGeneratedPosts,
} from "@/services/generatedPostsService";

import { GeneratedPost } from "@/types/generatedPost";

export default function MarketingPostsPage() {
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [actionLoading, setActionLoading] =
    useState<string | null>(null);

  /* =====================================================
     LOAD POSTS
  ===================================================== */

  async function loadPosts() {
    try {
      setLoading(true);
      setError("");

      const data = await getGeneratedPosts();

      setPosts(data);
    } catch (error) {
      console.error(
        "Failed to load generated posts:",
        error
      );

      setError(
        "Failed to load generated posts."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  /* =====================================================
     FILTER POSTS
  ===================================================== */

  const filteredPosts = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    return posts.filter((post) => {
      const searchableText = [
        post.title,
        post.caption,
        post.platform,
        post.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !keyword ||
        searchableText.includes(keyword);

      const matchesPlatform =
        platformFilter === "All" ||
        post.platform === platformFilter;

      const matchesStatus =
        statusFilter === "All" ||
        post.status === statusFilter;

      return (
        matchesSearch &&
        matchesPlatform &&
        matchesStatus
      );
    });
  }, [
    posts,
    search,
    platformFilter,
    statusFilter,
  ]);

  /* =====================================================
     DELETE
  ===================================================== */

  async function handleDelete(
    id: string
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(id);

      await deleteGeneratedPost(id);

      setPosts((current) =>
        current.filter(
          (post) => post.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete post:",
        error
      );

      alert(
        "Failed to delete post."
      );
    } finally {
      setActionLoading(null);
    }
  }

  /* =====================================================
     DUPLICATE
  ===================================================== */

  async function handleDuplicate(
    id: string
  ) {
    try {
      setActionLoading(id);

      await duplicateGeneratedPost(id);

      await loadPosts();
    } catch (error) {
      console.error(
        "Failed to duplicate post:",
        error
      );

      alert(
        "Failed to duplicate post."
      );
    } finally {
      setActionLoading(null);
    }
  }

  /* =====================================================
     COPY
  ===================================================== */

  async function handleCopy(
    post: GeneratedPost
  ) {
    try {
      const text = [
        post.title,
        post.caption,
      ]
        .filter(Boolean)
        .join("\n\n");

      await navigator.clipboard.writeText(
        text
      );

      alert("Post copied.");
    } catch (error) {
      console.error(
        "Failed to copy post:",
        error
      );

      alert(
        "Unable to copy post."
      );
    }
  }

  /* =====================================================
     STATUS CLASS
  ===================================================== */

  function getStatusClass(
    status?: string
  ) {
    switch (status) {
      case "Published":
        return "bg-green-500/10 text-green-400";

      case "Scheduled":
        return "bg-blue-500/10 text-blue-400";

      case "Failed":
        return "bg-red-500/10 text-red-400";

      case "Draft":
      default:
        return "bg-yellow-500/10 text-yellow-400";
    }
  }

  /* =====================================================
     PLATFORM CLASS
  ===================================================== */

  function getPlatformClass(
    platform?: string
  ) {
    switch (platform) {
      case "Google":
      case "Google Business":
        return "bg-red-500/10 text-red-400";

      case "Facebook":
        return "bg-blue-500/10 text-blue-400";

      case "Instagram":
        return "bg-pink-500/10 text-pink-400";

      case "LinkedIn":
        return "bg-sky-500/10 text-sky-400";

      default:
        return "bg-zinc-800 text-zinc-300";
    }
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      <main className="min-h-screen overflow-y-auto p-6 lg:p-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Posts
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage your AI generated marketing posts.
            </p>
          </div>

          <a
            href="/admin/marketing/ai-post-generator"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-yellow-500
              px-5
              py-3
              font-semibold
              text-black
              transition
              hover:bg-yellow-400
            "
          >
            + Create Post
          </a>

        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <StatCard
            label="Total Posts"
            value={posts.length}
          />

          <StatCard
            label="Draft"
            value={
              posts.filter(
                (post) =>
                  post.status === "Draft"
              ).length
            }
          />

          <StatCard
            label="Scheduled"
            value={
              posts.filter(
                (post) =>
                  post.status === "Scheduled"
              ).length
            }
          />

          <StatCard
            label="Published"
            value={
              posts.filter(
                (post) =>
                  post.status === "Published"
              ).length
            }
          />

        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

          <div className="grid gap-4 lg:grid-cols-3">

            {/* SEARCH */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search posts..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-4
                  py-3
                  text-white
                  outline-none
                  placeholder:text-zinc-600
                  focus:border-yellow-500
                "
              />
            </div>

            {/* PLATFORM */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">
                Platform
              </label>

              <select
                value={platformFilter}
                onChange={(event) =>
                  setPlatformFilter(
                    event.target.value
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-yellow-500
                "
              >
                <option value="All">
                  All Platforms
                </option>

                <option value="Google">
                  Google
                </option>

                <option value="Google Business">
                  Google Business
                </option>

                <option value="Facebook">
                  Facebook
                </option>

                <option value="Instagram">
                  Instagram
                </option>

                <option value="LinkedIn">
                  LinkedIn
                </option>
              </select>
            </div>

            {/* STATUS */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-yellow-500
                "
              >
                <option value="All">
                  All Status
                </option>

                <option value="Draft">
                  Draft
                </option>

                <option value="Scheduled">
                  Scheduled
                </option>

                <option value="Published">
                  Published
                </option>

                <option value="Failed">
                  Failed
                </option>
              </select>
            </div>

          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-900 bg-red-950/30 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">

            <div className="
              mx-auto
              mb-4
              h-8
              w-8
              animate-spin
              rounded-full
              border-4
              border-zinc-700
              border-t-yellow-500
            " />

            <p className="text-zinc-400">
              Loading posts...
            </p>

          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!loading &&
          filteredPosts.length === 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">

              <div className="mb-4 text-5xl">
                📝
              </div>

              <h2 className="text-xl font-semibold">
                No posts found
              </h2>

              <p className="mt-2 text-zinc-400">
                {posts.length === 0
                  ? "Create your first AI generated marketing post."
                  : "Try changing your search or filters."}
              </p>

              {posts.length === 0 && (
                <a
                  href="/admin/marketing/ai-post-generator"
                  className="
                    mt-6
                    inline-flex
                    rounded-xl
                    bg-yellow-500
                    px-5
                    py-3
                    font-semibold
                    text-black
                    hover:bg-yellow-400
                  "
                >
                  Create First Post
                </a>
              )}

            </div>
          )}

        {/* =================================================
            POSTS LIST
        ================================================= */}

        {!loading &&
          filteredPosts.length > 0 && (

            <div className="space-y-4">

              {filteredPosts.map((post) => {

                const busy =
                  actionLoading === post.id;

                return (
                  <div
                    key={post.id}
                    className="
                      rounded-2xl
                      border
                      border-zinc-800
                      bg-zinc-900
                      p-5
                      transition
                      hover:border-zinc-700
                    "
                  >

                    <div className="
                      flex
                      flex-col
                      gap-5
                      xl:flex-row
                      xl:items-start
                      xl:justify-between
                    ">

                      {/* POST INFORMATION */}

                      <div className="min-w-0 flex-1">

                        <div className="mb-3 flex flex-wrap items-center gap-2">

                          <span
                            className={`
                              rounded-full
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              ${getPlatformClass(
                                post.platform
                              )}
                            `}
                          >
                            {post.platform ||
                              "Unknown"}
                          </span>

                          <span
                            className={`
                              rounded-full
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              ${getStatusClass(
                                post.status
                              )}
                            `}
                          >
                            {post.status ||
                              "Draft"}
                          </span>

                        </div>

                        <h2 className="
                          truncate
                          text-xl
                          font-semibold
                          text-white
                        ">
                          {post.title ||
                            "Untitled Post"}
                        </h2>

                        {post.caption && (
                          <p className="
                            mt-2
                            line-clamp-3
                            whitespace-pre-line
                            text-zinc-400
                          ">
                            {post.caption}
                          </p>
                        )}

                        <div className="
                          mt-4
                          text-xs
                          text-zinc-600
                        ">
                          ID: {post.id}
                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="
                        flex
                        flex-wrap
                        gap-2
                        xl:w-[420px]
                        xl:justify-end
                      ">

                        <a
                          href={`/admin/marketing/posts/${post.id}`}
                          className="
                            rounded-lg
                            border
                            border-zinc-700
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-zinc-300
                            transition
                            hover:border-zinc-500
                            hover:text-white
                          "
                        >
                          View
                        </a>

                        <a
                          href={`/admin/marketing/posts/${post.id}/edit`}
                          className="
                            rounded-lg
                            border
                            border-zinc-700
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-zinc-300
                            transition
                            hover:border-zinc-500
                            hover:text-white
                          "
                        >
                          Edit
                        </a>

                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            handleCopy(post)
                          }
                          className="
                            rounded-lg
                            border
                            border-zinc-700
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-zinc-300
                            transition
                            hover:border-zinc-500
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          Copy
                        </button>

                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            handleDuplicate(
                              post.id
                            )
                          }
                          className="
                            rounded-lg
                            border
                            border-zinc-700
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-zinc-300
                            transition
                            hover:border-zinc-500
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          {busy
                            ? "..."
                            : "Duplicate"}
                        </button>

                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            handleDelete(
                              post.id
                            )
                          }
                          className="
                            rounded-lg
                            border
                            border-red-900
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-red-400
                            transition
                            hover:bg-red-950
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          )}

        {/* =================================================
            RESULT COUNT
        ================================================= */}

        {!loading &&
          posts.length > 0 && (
            <div className="mt-6 text-sm text-zinc-600">
              Showing{" "}
              {filteredPosts.length} of{" "}
              {posts.length} posts
            </div>
          )}

      </main>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="
      rounded-2xl
      border
      border-zinc-800
      bg-zinc-900
      p-5
    ">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="
        mt-2
        text-3xl
        font-bold
        text-white
      ">
        {value}
      </p>
    </div>
  );
}
