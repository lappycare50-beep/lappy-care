"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import MarketingSidebar from "@/components/marketing/MarketingSidebar";

import {
  getGeneratedPost,
  updateGeneratedPost,
} from "@/services/generatedPostsService";

import { GeneratedPost } from "@/types/generatedPost";

export default function EditGeneratedPostPage() {
  const params = useParams();
  const router = useRouter();

  const id =
    typeof params.id === "string"
      ? params.id
      : "";

  const [post, setPost] =
    useState<GeneratedPost | null>(null);

  const [title, setTitle] =
    useState("");

  const [caption, setCaption] =
    useState("");

  const [platform, setPlatform] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadPost() {
      if (!id) {
        setError("Post ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data =
          await getGeneratedPost(id);

        if (!data) {
          setError("Post not found.");
          return;
        }

        setPost(data);

        setTitle(
          data.title ?? ""
        );

        setCaption(
          data.caption ?? ""
        );

        setPlatform(
          data.platform ?? ""
        );

        setStatus(
          data.status ?? ""
        );
      } catch (error) {
        console.error(
          "Failed to load post for editing:",
          error
        );

        setError(
          "Failed to load post."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  async function handleSave(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!id) {
      setError("Post ID is missing.");
      return;
    }

    if (!title.trim()) {
      setError("Post title is required.");
      return;
    }

    if (!caption.trim()) {
      setError("Post caption is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateGeneratedPost(
        id,
        {
          title: title.trim(),
          caption: caption.trim(),
          platform:
            platform as GeneratedPost["platform"],
          status:
            status as GeneratedPost["status"],
        }
      );

      router.push(
        `/admin/marketing/posts/${id}`
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Failed to update generated post:",
        error
      );

      setError(
        "Failed to save changes. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    router.push(
      `/admin/marketing/posts/${id}`
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-white">
        <MarketingSidebar />

        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">

            <div
              className="
                mx-auto
                mb-4
                h-8
                w-8
                animate-spin
                rounded-full
                border-4
                border-zinc-700
                border-t-yellow-500
              "
            />

            <p className="text-zinc-400">
              Loading post...
            </p>

          </div>
        </main>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-white">
        <MarketingSidebar />

        <main className="flex-1 p-6 lg:p-8">

          <div className="mx-auto max-w-3xl">

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/marketing/posts"
                )
              }
              className="
                mb-6
                text-sm
                text-zinc-400
                hover:text-white
              "
            >
              ← Back to Posts
            </button>

            <div
              className="
                rounded-2xl
                border
                border-red-900
                bg-red-950/20
                p-8
              "
            >
              <h1 className="text-xl font-semibold text-red-400">
                Unable to Load Post
              </h1>

              <p className="mt-2 text-zinc-400">
                {error}
              </p>
            </div>

          </div>

        </main>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      <MarketingSidebar />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">

        <div className="mx-auto max-w-4xl">

          {/* HEADER */}

          <div className="mb-8">

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/admin/marketing/posts/${id}`
                )
              }
              className="
                mb-3
                text-sm
                text-zinc-500
                hover:text-white
              "
            >
              ← Back to Post
            </button>

            <h1 className="text-3xl font-bold">
              Edit Post
            </h1>

            <p className="mt-2 text-zinc-400">
              Update your generated marketing content.
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div
              className="
                mb-6
                rounded-xl
                border
                border-red-900
                bg-red-950/20
                px-5
                py-4
                text-sm
                text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSave}
            className="
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
            "
          >

            {/* BASIC INFORMATION */}

            <div className="space-y-6 p-6">

              <div>
                <label
                  htmlFor="title"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-zinc-300
                  "
                >
                  Post Title
                </label>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Enter post title"
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
                    transition
                    focus:border-yellow-500
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="caption"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-zinc-300
                  "
                >
                  Caption
                </label>

                <textarea
                  id="caption"
                  value={caption}
                  onChange={(event) =>
                    setCaption(event.target.value)
                  }
                  placeholder="Write your post caption..."
                  rows={10}
                  className="
                    w-full
                    resize-y
                    rounded-xl
                    border
                    border-zinc-700
                    bg-zinc-950
                    px-4
                    py-3
                    leading-7
                    text-white
                    outline-none
                    transition
                    focus:border-yellow-500
                  "
                />
              </div>

              {/* PLATFORM + STATUS */}

              <div className="
                grid
                gap-6
                md:grid-cols-2
              ">

                <div>
                  <label
                    htmlFor="platform"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-zinc-300
                    "
                  >
                    Platform
                  </label>

                  <select
                    id="platform"
                    value={platform}
                    onChange={(event) =>
                      setPlatform(
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
                    <option value="">
                      Select Platform
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

                    <option value="X">
                      X (Twitter)
                    </option>

                    {platform &&
                      ![
                        "Google Business",
                        "Facebook",
                        "Instagram",
                        "LinkedIn",
                        "X",
                      ].includes(platform) && (
                        <option value={platform}>
                          {platform}
                        </option>
                      )}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-zinc-300
                    "
                  >
                    Status
                  </label>

                  <select
                    id="status"
                    value={status}
                    onChange={(event) =>
                      setStatus(
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
                    <option value="">
                      Select Status
                    </option>

                    <option value="Draft">
                      Draft
                    </option>

                    <option value="Generated">
                      Generated
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

                    {status &&
                      ![
                        "Draft",
                        "Generated",
                        "Scheduled",
                        "Published",
                        "Failed",
                      ].includes(status) && (
                        <option value={status}>
                          {status}
                        </option>
                      )}
                  </select>
                </div>

              </div>

            </div>

            {/* FOOTER ACTIONS */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-zinc-800
                p-6
                sm:flex-row
                sm:justify-end
              "
            >

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  px-6
                  py-3
                  font-semibold
                  text-zinc-300
                  transition
                  hover:bg-zinc-800
                  hover:text-white
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="
                  rounded-xl
                  bg-yellow-500
                  px-6
                  py-3
                  font-semibold
                  text-black
                  transition
                  hover:bg-yellow-400
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}