"use client";

import { useEffect, useMemo, useState } from "react";

import { X } from "lucide-react";

import { GeneratedPost } from "@/types/generatedPost";

import { getGeneratedPosts } from "@/services/generatedPostsService";

interface Props {
  open: boolean;

  selectedPostIds: string[];

  onClose: () => void;

  onSave: (ids: string[]) => void;
}

export default function AttachPostsModal({
  open,
  selectedPostIds,
  onClose,
  onSave,
}: Props) {
  const [posts, setPosts] =
    useState<GeneratedPost[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selected, setSelected] =
    useState<string[]>(selectedPostIds);

  useEffect(() => {
    setSelected(selectedPostIds);
  }, [selectedPostIds]);

  useEffect(() => {
    if (!open) return;

    loadPosts();
  }, [open]);

  async function loadPosts() {
    try {
      setLoading(true);

      const data =
        await getGeneratedPosts();

      setPosts(data);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to load posts."
      );
    } finally {
      setLoading(false);
    }
  }

  function togglePost(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) => item !== id
          )
        : [...prev, id]
    );
  }

  const filteredPosts =
    useMemo(() => {
      return posts.filter((post) => {
        const q =
          search.toLowerCase();

        return (
          post.title
            .toLowerCase()
            .includes(q) ||
          post.caption
            .toLowerCase()
            .includes(q)
        );
      });
    }, [posts, search]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Attach Generated Posts
            </h2>

            <p className="mt-1 text-zinc-400">
              Select one or more AI posts.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700 p-2 text-zinc-400 hover:bg-zinc-800"
          >
            <X size={20} />
          </button>

        </div>

        <div className="border-b border-zinc-800 p-5">

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search posts..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
          />

        </div>
                {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">

          {loading ? (

            <div className="py-16 text-center text-zinc-400">
              Loading generated posts...
            </div>

          ) : filteredPosts.length === 0 ? (

            <div className="py-16 text-center text-zinc-400">
              No generated posts found.
            </div>

          ) : (

            <div className="space-y-3">

              {filteredPosts.map((post) => {

                const checked =
                  selected.includes(post.id);

                return (

                  <label
                    key={post.id}
                    className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                      checked
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        togglePost(post.id)
                      }
                      className="mt-1 h-5 w-5"
                    />

                    <div className="min-w-0 flex-1">

                      <h3 className="font-semibold text-white">
                        {post.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                        {post.caption}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">

                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                          {post.platform}
                        </span>

                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                          {post.category}
                        </span>

                        <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400">
                          {post.status}
                        </span>

                      </div>

                    </div>

                  </label>

                );

              })}

            </div>

          )}

        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-zinc-800 p-6">

          <p className="text-sm text-zinc-400">
            {selected.length} post(s) selected
          </p>

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="rounded-lg border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onSave(selected);
                onClose();
              }}
              className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              Attach Posts
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}