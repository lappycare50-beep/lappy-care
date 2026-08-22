"use client";

import { useState } from "react";
import Link from "next/link";

const GOOGLE_REVIEW_URL =
  "https://g.page/r/CRCGvIT5hA6VEAE/review";

export default function ReviewAssistantPage() {
  const [experience, setExperience] = useState("");
  const [review, setReview] = useState("");

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [isAccepted, setIsAccepted] =
    useState(false);

  const [isCopied, setIsCopied] =
    useState(false);

  const [error, setError] = useState("");

  const minCharacters = 20;

  const isValid =
    experience.trim().length >= minCharacters;

  // ----------------------------------------
  // Generate Review
  // ----------------------------------------

  async function handleGenerate() {
    if (!isValid || isGenerating) {
      return;
    }

    setIsGenerating(true);
    setError("");
    setReview("");
    setIsAccepted(false);
    setIsCopied(false);

    try {
      const response = await fetch(
        "/api/review/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experience: experience.trim(),
          }),
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ||
            "Unable to generate review."
        );
      }

      const generatedReview =
        result?.data?.review;

      if (
        !generatedReview ||
        typeof generatedReview !== "string"
      ) {
        throw new Error(
          "Invalid review received."
        );
      }

      setReview(
        generatedReview.trim()
      );
    } catch (error) {
      console.error(
        "Review Generation Error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to generate review."
      );
    } finally {
      setIsGenerating(false);
    }
  }

  // ----------------------------------------
  // Accept Review
  // ----------------------------------------

  function handleAccept() {
    if (!review.trim()) {
      return;
    }

    setIsAccepted(true);
    setIsCopied(false);
    setError("");
  }

  // ----------------------------------------
  // Generate Again
  // ----------------------------------------

  function handleGenerateAgain() {
    setReview("");
    setIsAccepted(false);
    setIsCopied(false);
    setError("");
  }

  // ----------------------------------------
  // Post on Google
  // ----------------------------------------

  async function handlePostOnGoogle() {
    if (!review.trim()) {
      return;
    }

    setError("");

    try {
      await navigator.clipboard.writeText(
        review.trim()
      );

      setIsCopied(true);

      window.open(
        GOOGLE_REVIEW_URL,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      console.error(
        "Clipboard Error:",
        error
      );

      // Even if clipboard permission fails,
      // still open Google review page.
      setError(
        "Google Review page opened. Please copy your review manually and paste it there."
      );

      window.open(
        GOOGLE_REVIEW_URL,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6">

      <div className="mx-auto w-full max-w-2xl">

        {/* Brand */}
        <div className="mb-8 text-center">

          <Link
            href="/review"
            className="text-3xl font-extrabold tracking-wide text-yellow-400"
          >
            LAPPY CARE
          </Link>

          <p className="mt-2 text-sm text-zinc-500">
            Laptop Repair & Service
          </p>

        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:p-8">

          {/* Header */}
          <div className="text-center">

            <div className="mb-5 text-5xl">
              ⭐
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Share Your Experience
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-400">
              Tell us about your experience
              with Lappy Care in your own words.
            </p>

          </div>

          {/* -------------------------------- */}
          {/* Experience Input */}
          {/* -------------------------------- */}

          {!review && (
            <div className="mt-8">

              <label
                htmlFor="experience"
                className="mb-2 block text-sm font-semibold text-zinc-300"
              >
                Your Experience
              </label>

              <textarea
                id="experience"
                value={experience}
                onChange={(event) =>
                  setExperience(
                    event.target.value
                  )
                }
                rows={7}
                maxLength={1000}
                disabled={isGenerating}
                placeholder="Example: My laptop battery was not working properly. Lappy Care replaced the battery quickly and the service was good."
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 disabled:opacity-50"
              />

              <div className="mt-2 flex items-center justify-between text-xs">

                <span
                  className={
                    isValid
                      ? "text-green-400"
                      : "text-zinc-600"
                  }
                >
                  {isValid
                    ? "Ready to generate"
                    : `Minimum ${minCharacters} characters`}
                </span>

                <span className="text-zinc-600">
                  {experience.length}/1000
                </span>

              </div>

              {/* AI Notice */}
              <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs leading-5 text-zinc-500">
                  💡 Your experience remains
                  your own. AI will only help
                  turn what you wrote into a
                  natural and well-written review.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-5 rounded-xl border border-red-900 bg-red-950/30 p-4">
                  <p className="text-sm leading-6 text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Generate */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={
                  !isValid ||
                  isGenerating
                }
                className="mt-6 w-full rounded-xl bg-yellow-500 px-6 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isGenerating
                  ? "Generating Review..."
                  : "Generate My Review ✨"}
              </button>

            </div>
          )}

          {/* -------------------------------- */}
          {/* Suggested Review */}
          {/* -------------------------------- */}

          {review && (
            <div className="mt-8">

              <div className="mb-3 flex items-center justify-between">

                <h2 className="text-sm font-semibold text-white">
                  Suggested Review
                </h2>

                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                  AI Assisted
                </span>

              </div>

              <textarea
                value={review}
                onChange={(event) => {
                  setReview(
                    event.target.value
                  );

                  setIsAccepted(false);
                  setIsCopied(false);
                }}
                rows={8}
                maxLength={1500}
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-4 text-sm leading-7 text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />

              <p className="mt-2 text-xs text-zinc-600">
                You can edit this review before
                accepting it.
              </p>

              {/* -------------------------------- */}
              {/* Before Accept */}
              {/* -------------------------------- */}

              {!isAccepted && (
                <div className="mt-6 space-y-3">

                  <button
                    type="button"
                    onClick={handleAccept}
                    disabled={!review.trim()}
                    className="w-full rounded-xl bg-yellow-500 px-6 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Accept Review ✓
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleGenerateAgain
                    }
                    className="w-full rounded-xl border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
                  >
                    Generate Again
                  </button>

                </div>
              )}

              {/* -------------------------------- */}
              {/* Accepted */}
              {/* -------------------------------- */}

              {isAccepted && (
                <div className="mt-6 rounded-xl border border-green-900 bg-green-950/20 p-5">

                  <div className="text-center">

                    <div className="text-4xl">
                      ✓
                    </div>

                    <h3 className="mt-3 font-semibold text-green-400">
                      Review Accepted
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      Your review is ready.
                      We will copy it and open
                      Google so you can post it.
                    </p>

                  </div>

                  {/* Copied Message */}
                  {isCopied && (
                    <div className="mt-5 rounded-lg border border-green-800 bg-green-950/40 p-3 text-center">
                      <p className="text-sm font-medium text-green-400">
                        ✓ Review copied!
                      </p>

                      <p className="mt-1 text-xs text-green-500/80">
                        Paste your review on the
                        Google Review page.
                      </p>
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div className="mt-5 rounded-lg border border-yellow-900 bg-yellow-950/20 p-3">
                      <p className="text-xs leading-5 text-yellow-500">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Google Button */}
                  <button
                    type="button"
                    onClick={
                      handlePostOnGoogle
                    }
                    disabled={!review.trim()}
                    className="mt-5 w-full rounded-xl bg-yellow-500 px-6 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isCopied
                      ? "Open Google Review ⭐"
                      : "Post on Google ⭐"}
                  </button>

                  {/* Edit Again */}
                  <button
                    type="button"
                    onClick={() =>
                      setIsAccepted(false)
                    }
                    className="mt-3 w-full rounded-xl border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                  >
                    Edit Review
                  </button>

                </div>
              )}

            </div>
          )}

          {/* Privacy Notice */}
          <p className="mt-7 text-center text-[11px] leading-5 text-zinc-600">
            You control your review. You can
            edit or change the suggested content
            before posting it on Google.
          </p>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-700">
          © {new Date().getFullYear()} Lappy Care
        </p>

      </div>

    </main>
  );
}