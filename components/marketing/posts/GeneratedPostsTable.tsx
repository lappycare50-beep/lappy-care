"use client";

import { useEffect, useMemo, useState } from "react";

import { GeneratedPost } from "@/types/generatedPost";

import {
  deleteGeneratedPost,
  getGeneratedPosts,
} from "@/services/generatedPostsService";

import GeneratedPostRow from "./GeneratedPostRow";

export default function GeneratedPostsTable() {
  const [posts, setPosts] = useState<
    GeneratedPost[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [
    platformFilter,
    setPlatformFilter,
  ] = useState("All");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);

      const data =
        await getGeneratedPosts();

      setPosts(data);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to load generated posts."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(
    post: GeneratedPost
  ) {
    try {
      await navigator.clipboard.writeText(
`${post.title}

${post.primaryText}

${post.caption}

${post.hashtags.join(" ")}

${post.callToAction}`
      );

      alert(
        "Content copied successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to copy content."
      );
    }
  }

  async function handleDelete(
    post: GeneratedPost
  ) {
    const confirmed = window.confirm(
      `Delete "${post.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteGeneratedPost(
        post.id
      );

      setPosts((prev) =>
        prev.filter(
          (item) => item.id !== post.id
        )
      );

      alert(
        "Post deleted successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to delete post."
      );
    }
  }

  const platforms = [
    "All",
    ...new Set(
      posts.map((p) => p.platform)
    ),
  ];

  const categories = [
    "All",
    ...new Set(
      posts.map((p) => p.category)
    ),
  ];

  const filteredPosts = useMemo(() => {
    const result = posts.filter(
      (post) => {
        const searchText =
          search.toLowerCase();

        const matchesSearch =
          post.title
            .toLowerCase()
            .includes(searchText) ||
          post.primaryText
            .toLowerCase()
            .includes(searchText) ||
          post.caption
            .toLowerCase()
            .includes(searchText) ||
          post.category
            .toLowerCase()
            .includes(searchText) ||
          post.keywords
            .join(" ")
            .toLowerCase()
            .includes(searchText);

        const matchesStatus =
          statusFilter === "All" ||
          post.status === statusFilter;

        const matchesPlatform =
          platformFilter === "All" ||
          post.platform ===
            platformFilter;

        const matchesCategory =
          categoryFilter === "All" ||
          post.category ===
            categoryFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPlatform &&
          matchesCategory
        );
      }
    );

    result.sort((a, b) => {
      const aTime =
        (a.createdAt as any)?.seconds ??
        0;

      const bTime =
        (b.createdAt as any)?.seconds ??
        0;

      return sortBy === "Newest"
        ? bTime - aTime
        : aTime - bTime;
    });

    return result;
  }, [
    posts,
    search,
    statusFilter,
    platformFilter,
    categoryFilter,
    sortBy,
  ]);

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-300">
        Loading generated posts...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-10 text-center">
        <h2 className="text-2xl font-bold text-white">
          No Generated Posts
        </h2>

        <p className="mt-3 text-zinc-400">
          Generate your first AI
          marketing content to see it
          here.
        </p>
      </div>
    );
  }
    return (
    <div className="space-y-6">

      <div className="grid gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5 md:grid-cols-4">

        <input
          type="text"
          placeholder="🔍 Search posts..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-yellow-500 focus:outline-none md:col-span-2"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
        >
          <option>All</option>
          <option>Generated</option>
          <option>Draft</option>
          <option>Ready</option>
          <option>Scheduled</option>
          <option>Published</option>
          <option>Failed</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>

        <select
          value={platformFilter}
          onChange={(e) =>
            setPlatformFilter(
              e.target.value
            )
          }
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
        >
          {platforms.map((platform) => (
            <option
              key={platform}
              value={platform}
            >
              {platform}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">

        <table className="min-w-full">

          <thead className="bg-zinc-950">

            <tr>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Platform
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Category
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Content
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Status
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
                Created
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-zinc-300">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <GeneratedPostRow
                  key={post.id}
                  post={post}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-zinc-400"
                >
                  No matching posts found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}