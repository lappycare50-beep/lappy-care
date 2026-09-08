"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import MarketingSidebar from "@/components/marketing/MarketingSidebar";

import {
  deleteGeneratedPost,
  duplicateGeneratedPost,
  getGeneratedPost,
} from "@/services/generatedPostsService";

import { GeneratedPost } from "@/types/generatedPost";
import { Language } from "@/types/marketing";

const LANGUAGES = [
  { value: "English", label: "🇬🇧 English" },
  { value: "Marathi", label: "🇮🇳 Marathi (मराठी)" },
  { value: "Hindi", label: "🇮🇳 Hindi (हिंदी)" },
  { value: "Gujarati", label: "🇮🇳 Gujarati (ગુજરાતી)" },
  { value: "Kannada", label: "🇮🇳 Kannada (ಕನ್ನಡ)" },
  { value: "Telugu", label: "🇮🇳 Telugu (తెలుగు)" },
  { value: "Tamil", label: "🇮🇳 Tamil (தமிழ்)" },
  { value: "Bengali", label: "🇮🇳 Bengali (বাংলা)" },
  { value: "Punjabi", label: "🇮🇳 Punjabi (ਪੰਜਾਬੀ)" },
] as const;

export default function ViewGeneratedPostPage() {
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : "";

  const [post, setPost] =
    useState<GeneratedPost | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [actionLoading, setActionLoading] =
    useState(false);

  const [publishLoading, setPublishLoading] =
    useState(false);

  // ----------------------------------------
  // Translation State
  // ----------------------------------------

  const [showTranslate, setShowTranslate] =
    useState(false);

  const [targetLanguage, setTargetLanguage] =
    useState<Language>("English");

  const [translateLoading, setTranslateLoading] =
    useState(false);

  // ----------------------------------------
  // Load Post
  // ----------------------------------------

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
      } catch (error) {
        console.error(
          "Failed to load generated post:",
          error
        );

        setError(
          "Failed to load generated post."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  // ----------------------------------------
  // COPY
  // ----------------------------------------

  async function handleCopy() {
    if (!post) {
      return;
    }

    try {
      const text = [
        post.title,
        post.caption,
      ]
        .filter(Boolean)
        .join("\n\n");

      await navigator.clipboard.writeText(text);

      alert("Post copied successfully.");
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );

      alert("Failed to copy post.");
    }
  }

  // ----------------------------------------
  // DUPLICATE
  // ----------------------------------------

  async function handleDuplicate() {
    if (!post) {
      return;
    }

    try {
      setActionLoading(true);

      await duplicateGeneratedPost(
        post.id
      );

      alert(
        "Post duplicated successfully."
      );

      window.location.href =
        "/admin/marketing/posts";
    } catch (error) {
      console.error(
        "Duplicate failed:",
        error
      );

      alert(
        "Failed to duplicate post."
      );
    } finally {
      setActionLoading(false);
    }
  }

  // ----------------------------------------
  // DELETE
  // ----------------------------------------

  async function handleDelete() {
    if (!post) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this post?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);

      await deleteGeneratedPost(
        post.id
      );

      window.location.href =
        "/admin/marketing/posts";
    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );

      alert(
        "Failed to delete post."
      );

      setActionLoading(false);
    }
  }

  // ----------------------------------------
  // TRANSLATE POST
  // ----------------------------------------

  async function handleTranslate() {
    if (!post) {
      return;
    }

    if (
      targetLanguage === post.language
    ) {
      alert(
        "Please select a different language."
      );

      return;
    }

    try {
      setTranslateLoading(true);

      const response =
        await fetch(
          "/api/ai/translate",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              postId: post.id,
              targetLanguage,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Failed to translate post."
        );
      }

      alert(
        "Post translated and saved successfully."
      );

      window.location.href =
        "/admin/marketing/posts";

    } catch (error) {
      console.error(
        "Translation failed:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to translate post."
      );
    } finally {
      setTranslateLoading(false);
    }
  }

  // ----------------------------------------
  // PUBLISH NOW
  // ----------------------------------------

  async function handlePublishNow() {
    if (!post) {
      return;
    }

    if (
      post.platform !== "Google Business"
    ) {
      alert(
        "Publish Now is currently available only for Google Business posts."
      );

      return;
    }

    if (
      post.status !== "Scheduled"
    ) {
      alert(
        "Only scheduled posts can be published."
      );

      return;
    }

    const confirmed =
      window.confirm(
        "Publish this post to Google Business now?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setPublishLoading(true);

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
              postId: post.id,

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

              scheduledAt:
                post.scheduledAt ?? null,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            result?.message ||
            "Failed to publish post."
        );
      }

      setPost((current) =>
        current
          ? {
              ...current,

              status:
                "Published",

              publishedAt:
                new Date(),
            }
          : current
      );

      alert(
        "Post published successfully to Google Business."
      );
    } catch (error) {
      console.error(
        "Publish failed:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to publish post."
      );
    } finally {
      setPublishLoading(false);
    }
  }

  // ----------------------------------------
  // STATUS CLASS
  // ----------------------------------------

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

      default:
        return "bg-yellow-500/10 text-yellow-400";
    }
  }

  // ----------------------------------------
  // PLATFORM CLASS
  // ----------------------------------------

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

  // ----------------------------------------
  // LOADING
  // ----------------------------------------

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

  // ----------------------------------------
  // ERROR
  // ----------------------------------------

  if (error || !post) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-white">
        <MarketingSidebar />

        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-3xl">
            <a
              href="/admin/marketing/posts"
              className="
                mb-6
                inline-flex
                text-sm
                text-zinc-400
                hover:text-white
              "
            >
              ← Back to Posts
            </a>

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
                Post Not Found
              </h1>

              <p className="mt-2 text-zinc-400">
                {error ||
                  "The requested post could not be found."}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ----------------------------------------
  // CAN PUBLISH
  // ----------------------------------------

  const isGoogleBusiness =
    post.platform ===
    "Google Business";

  const canPublish =
    isGoogleBusiness &&
    post.status === "Scheduled";

  // ----------------------------------------
  // PAGE
  // ----------------------------------------

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <MarketingSidebar />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">

          {/* HEADER */}

          <div
            className="
              mb-8
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div>
              <a
                href="/admin/marketing/posts"
                className="
                  mb-3
                  inline-flex
                  text-sm
                  text-zinc-500
                  hover:text-white
                "
              >
                ← Back to Posts
              </a>

              <h1 className="text-3xl font-bold">
                View Post
              </h1>

              <p className="mt-2 text-zinc-400">
                Review your generated marketing content.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">

              {/* TRANSLATE */}

              <button
                type="button"
                onClick={() =>
                  setShowTranslate(
                    !showTranslate
                  )
                }
                disabled={
                  translateLoading ||
                  actionLoading ||
                  publishLoading
                }
                className="
                  rounded-xl
                  border
                  border-yellow-500/40
                  bg-yellow-500/10
                  px-5
                  py-3
                  font-semibold
                  text-yellow-400
                  hover:bg-yellow-500/20
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                🌐 Translate Post
              </button>

              {/* PUBLISH */}

              {canPublish && (
                <button
                  type="button"
                  onClick={
                    handlePublishNow
                  }
                  disabled={
                    publishLoading ||
                    actionLoading ||
                    translateLoading
                  }
                  className="
                    rounded-xl
                    bg-green-500
                    px-5
                    py-3
                    font-semibold
                    text-black
                    hover:bg-green-400
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {publishLoading
                    ? "Publishing..."
                    : "Publish Now"}
                </button>
              )}

              {/* EDIT */}

              <a
                href={`/admin/marketing/posts/${post.id}/edit`}
                className="
                  rounded-xl
                  bg-yellow-500
                  px-5
                  py-3
                  font-semibold
                  text-black
                  hover:bg-yellow-400
                "
              >
                Edit Post
              </a>
            </div>
          </div>

          {/* TRANSLATE PANEL */}

          {showTranslate && (
            <div
              className="
                mb-6
                rounded-2xl
                border
                border-yellow-500/20
                bg-zinc-900
                p-6
              "
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                <div className="flex-1">
                  <label className="mb-2 block text-sm font-medium text-zinc-400">
                    Translate To
                  </label>

                  <select
                    value={targetLanguage}
                    onChange={(e) =>
                      setTargetLanguage(
                        e.target.value as Language
                      )
                    }
                    disabled={
                      translateLoading
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
                    {LANGUAGES.map(
                      (language) => (
                        <option
                          key={
                            language.value
                          }
                          value={
                            language.value
                          }
                        >
                          {language.label}
                        </option>
                      )
                    )}
                  </select>

                  <p className="mt-2 text-xs text-zinc-500">
                    Current language:{" "}
                    {post.language}
                  </p>
                </div>

                <div className="flex gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setShowTranslate(
                        false
                      )
                    }
                    disabled={
                      translateLoading
                    }
                    className="
                      rounded-xl
                      border
                      border-zinc-700
                      px-5
                      py-3
                      font-medium
                      text-zinc-300
                      hover:bg-zinc-800
                      hover:text-white
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleTranslate
                    }
                    disabled={
                      translateLoading ||
                      targetLanguage ===
                        post.language
                    }
                    className="
                      rounded-xl
                      bg-yellow-500
                      px-5
                      py-3
                      font-semibold
                      text-black
                      hover:bg-yellow-400
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {translateLoading
                      ? "Translating..."
                      : "Translate & Save"}
                  </button>

                </div>
              </div>
            </div>
          )}

          {/* POST CARD */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
            "
          >

            {/* TOP */}

            <div
              className="
                border-b
                border-zinc-800
                p-6
              "
            >
              <div className="flex flex-wrap gap-2">

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
                    "Unknown Platform"}
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

                <span
                  className="
                    rounded-full
                    bg-purple-500/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-purple-400
                  "
                >
                  🌐 {post.language}
                </span>

              </div>

              <h2
                className="
                  mt-5
                  text-2xl
                  font-bold
                "
              >
                {post.title ||
                  "Untitled Post"}
              </h2>
            </div>

            {/* CAPTION */}

            <div className="p-6">
              <h3
                className="
                  mb-3
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wide
                  text-zinc-500
                "
              >
                Caption
              </h3>

              <div
                className="
                  whitespace-pre-line
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-950
                  p-5
                  leading-7
                  text-zinc-300
                "
              >
                {post.caption ||
                  "No caption available."}
              </div>
            </div>

            {/* DETAILS */}

            <div
              className="
                grid
                gap-4
                border-t
                border-zinc-800
                p-6
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              <DetailItem
                label="Platform"
                value={
                  post.platform ||
                  "—"
                }
              />

              <DetailItem
                label="Language"
                value={
                  post.language ||
                  "—"
                }
              />

              <DetailItem
                label="Status"
                value={
                  post.status ||
                  "—"
                }
              />

              <DetailItem
                label="Post ID"
                value={post.id}
              />
            </div>

            {/* ACTIONS */}

            <div
              className="
                flex
                flex-wrap
                gap-3
                border-t
                border-zinc-800
                p-6
              "
            >

              {/* PUBLISH */}

              {canPublish && (
                <button
                  type="button"
                  onClick={
                    handlePublishNow
                  }
                  disabled={
                    publishLoading ||
                    actionLoading ||
                    translateLoading
                  }
                  className="
                    rounded-xl
                    bg-green-500
                    px-5
                    py-3
                    font-semibold
                    text-black
                    hover:bg-green-400
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {publishLoading
                    ? "Publishing..."
                    : "Publish Now"}
                </button>
              )}

              {/* COPY */}

              <button
                type="button"
                onClick={handleCopy}
                disabled={
                  actionLoading ||
                  publishLoading ||
                  translateLoading
                }
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  px-5
                  py-3
                  font-medium
                  text-zinc-300
                  hover:bg-zinc-800
                  hover:text-white
                  disabled:opacity-50
                "
              >
                Copy Post
              </button>

              {/* DUPLICATE */}

              <button
                type="button"
                onClick={
                  handleDuplicate
                }
                disabled={
                  actionLoading ||
                  publishLoading ||
                  translateLoading
                }
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  px-5
                  py-3
                  font-medium
                  text-zinc-300
                  hover:bg-zinc-800
                  hover:text-white
                  disabled:opacity-50
                "
              >
                Duplicate
              </button>

              {/* DELETE */}

              <button
                type="button"
                onClick={handleDelete}
                disabled={
                  actionLoading ||
                  publishLoading ||
                  translateLoading
                }
                className="
                  rounded-xl
                  border
                  border-red-900
                  px-5
                  py-3
                  font-medium
                  text-red-400
                  hover:bg-red-950
                  disabled:opacity-50
                "
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-800
        bg-zinc-950
        p-4
      "
    >
      <p
        className="
          text-xs
          uppercase
          tracking-wide
          text-zinc-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          break-all
          text-sm
          font-medium
          text-zinc-300
        "
      >
        {value}
      </p>
    </div>
  );
}