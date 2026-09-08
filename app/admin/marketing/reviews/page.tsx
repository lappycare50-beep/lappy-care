"use client";

import { useEffect, useMemo, useState } from "react";


import {
  getReviews,
  updateReview,
} from "@/services/reviewService";

import type {
  CustomerReview,
  ReviewStatus,
} from "@/types/review";

export default function ReviewsPage() {
  const [reviews, setReviews] =
    useState<CustomerReview[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [syncing, setSyncing] =
    useState(false);

  const [generatingId, setGeneratingId] =
    useState<string | null>(null);

  const [savingId, setSavingId] =
    useState<string | null>(null);

  const [approvingId, setApprovingId] =
    useState<string | null>(null);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editReply, setEditReply] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [search, setSearch] =
    useState("");

  /* =========================================================
     LOAD REVIEWS
  ========================================================= */

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getReviews();

      setReviews(data);
    } catch (err) {
      console.error(
        "Failed to load reviews:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load reviews."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     SYNC GOOGLE REVIEWS
  ========================================================= */

  async function syncGoogleReviews() {
    try {
      setSyncing(true);
      setError("");
      setSuccess("");

      const response =
        await fetch(
          "/api/marketing/reviews/sync",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data?.error ||
            "Unable to sync Google reviews."
        );
      }

      const result =
        data.data;

      setSuccess(
        `Google Reviews synced successfully. ${
          result?.created ?? 0
        } new review${
          result?.created === 1
            ? ""
            : "s"
        } found.`
      );

      await loadReviews();
    } catch (err) {
      console.error(
        "Google Reviews Sync Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to sync Google reviews."
      );
    } finally {
      setSyncing(false);
    }
  }

  /* =========================================================
     GENERATE AI REPLY
  ========================================================= */

  async function generateAIReply(
    review: CustomerReview
  ) {
    try {
      setGeneratingId(review.id);
      setError("");
      setSuccess("");

      const response =
        await fetch(
          "/api/marketing/reviews/generate-reply",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              reviewId:
                review.id,
            }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data?.error ||
            "Unable to generate AI reply."
        );
      }

      const aiReply =
        data?.data?.aiReply;

      const status =
        data?.data?.status;

      if (!aiReply) {
        throw new Error(
          "AI reply was not returned."
        );
      }

      setReviews(
        (current) =>
          current.map(
            (item) =>
              item.id === review.id
                ? {
                    ...item,

                    aiReply,

                    status:
                      status ??
                      "Reply Generated",
                  }
                : item
          )
      );

      setSuccess(
        "AI reply generated successfully."
      );
    } catch (err) {
      console.error(
        "Generate AI Reply Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate AI reply."
      );
    } finally {
      setGeneratingId(null);
    }
  }

  /* =========================================================
     START EDIT
  ========================================================= */

  function startEditing(
    review: CustomerReview
  ) {
    setEditingId(review.id);

    setEditReply(
      review.aiReply ||
        review.reviewReply ||
        ""
    );

    setError("");
    setSuccess("");
  }

  /* =========================================================
     CANCEL EDIT
  ========================================================= */

  function cancelEditing() {
    setEditingId(null);
    setEditReply("");
  }

  /* =========================================================
     SAVE EDITED REPLY
  ========================================================= */

  async function saveEditedReply(
    review: CustomerReview
  ) {
    const reply =
      editReply.trim();

    if (!reply) {
      setError(
        "Reply cannot be empty."
      );
      return;
    }

    try {
      setSavingId(review.id);
      setError("");
      setSuccess("");

      await updateReview(
        review.id,
        {
          aiReply: reply,

          status:
            "Pending Approval",
        }
      );

      setReviews(
        (current) =>
          current.map(
            (item) =>
              item.id === review.id
                ? {
                    ...item,

                    aiReply: reply,

                    status:
                      "Pending Approval",
                  }
                : item
          )
      );

      setEditingId(null);
      setEditReply("");

      setSuccess(
        "Reply saved and moved to Pending Approval."
      );
    } catch (err) {
      console.error(
        "Save Reply Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save reply."
      );
    } finally {
      setSavingId(null);
    }
  }

  /* =========================================================
     APPROVE + POST TO GOOGLE
  ========================================================= */

  async function approveReply(
    review: CustomerReview
  ) {
    const reply =
      review.aiReply?.trim();

    if (!reply) {
      setError(
        "Generate or add a reply before approving."
      );
      return;
    }

    try {
      setApprovingId(review.id);
      setError("");
      setSuccess("");

      /* =====================================================
         1. POST REPLY TO GOOGLE
      ===================================================== */

      const response =
        await fetch(
          "/api/marketing/reviews/reply",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              reviewId:
                review.id,

              reply,
            }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data?.error ||
            "Unable to post reply to Google."
        );
      }

      /* =====================================================
         2. GET GOOGLE REPLY DATA
      ===================================================== */

      const googleReply =
        data?.data?.reviewReply ??
        reply;

      const repliedAt =
        data?.data?.repliedAt ??
        new Date().toISOString();

      /* =====================================================
         3. SAVE REPLIED STATUS IN FIRESTORE
      ===================================================== */

      await updateReview(
        review.id,
        {
          aiReply:
            reply,

          reviewReply:
            googleReply,

          status:
            "Replied",

          repliedAt,
        }
      );

      /* =====================================================
         4. UPDATE UI
      ===================================================== */

      setReviews(
        (current) =>
          current.map(
            (item) =>
              item.id === review.id
                ? {
                    ...item,

                    aiReply:
                      reply,

                    reviewReply:
                      googleReply,

                    status:
                      "Replied",

                    repliedAt,
                  }
                : item
          )
      );

      setSuccess(
        "Reply approved and posted to Google successfully."
      );
    } catch (err) {
      console.error(
        "Approve Reply Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to approve and post reply."
      );
    } finally {
      setApprovingId(null);
    }
  }

  /* =========================================================
     STATISTICS
  ========================================================= */

  const statistics =
    useMemo(() => {
      const total =
        reviews.length;

      const newReviews =
        reviews.filter(
          (review) =>
            review.status ===
            "New"
        ).length;

      const replyGenerated =
        reviews.filter(
          (review) =>
            review.status ===
            "Reply Generated"
        ).length;

      const pendingApproval =
        reviews.filter(
          (review) =>
            review.status ===
            "Pending Approval"
        ).length;

      const approved =
        reviews.filter(
          (review) =>
            review.status ===
            "Approved"
        ).length;

      const replied =
        reviews.filter(
          (review) =>
            review.status ===
            "Replied"
        ).length;

      const ratingTotal =
        reviews.reduce(
          (sum, review) =>
            sum + review.rating,
          0
        );

      const averageRating =
        total > 0
          ? ratingTotal / total
          : 0;

      return {
        total,
        newReviews,
        replyGenerated,
        pendingApproval,
        approved,
        replied,
        averageRating,
      };
    }, [reviews]);

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredReviews =
    useMemo(() => {
      const value =
        search
          .trim()
          .toLowerCase();

      if (!value) {
        return reviews;
      }

      return reviews.filter(
        (review) =>
          review.customerName
            .toLowerCase()
            .includes(value) ||
          review.reviewText
            .toLowerCase()
            .includes(value) ||
          review.status
            .toLowerCase()
            .includes(value) ||
          review.aiReply
            ?.toLowerCase()
            .includes(value)
      );
    }, [reviews, search]);

  /* =========================================================
     STATUS CLASSES
  ========================================================= */

  function getStatusClasses(
    status: ReviewStatus
  ) {
    switch (status) {
      case "New":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "Reply Generated":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "Pending Approval":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      case "Approved":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "Replied":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

      case "Ignored":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";

      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  }

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  function formatDate(
    date?: string
  ) {
    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  /* =========================================================
     RENDER STARS
  ========================================================= */

  function renderStars(
    rating: number
  ) {
    return (
      <span
        className="whitespace-nowrap text-sm"
        aria-label={`${rating} out of 5 stars`}
      >
        {"★".repeat(
          Math.max(
            0,
            Math.min(5, rating)
          )
        )}

        <span className="text-zinc-700">
          {"★".repeat(
            Math.max(
              0,
              5 -
                Math.min(
                  5,
                  rating
                )
            )
          )}
        </span>
      </span>
    );
  }

  /* =========================================================
     REPLY ACTIONS
  ========================================================= */

  function renderReplyActions(
    review: CustomerReview
  ) {
    const isGenerating =
      generatingId === review.id;

    const isSaving =
      savingId === review.id;

    const isApproving =
      approvingId === review.id;

    const isEditing =
      editingId === review.id;

    return (
      <div className="mt-5 border-t border-zinc-800 pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h4 className="text-sm font-bold text-white">
            AI Reply
          </h4>

          {review.aiReply && (
            <span className="text-xs text-zinc-600">
              AI generated
            </span>
          )}
        </div>

        {isEditing ? (
          <>
            <textarea
              value={editReply}
              onChange={(event) =>
                setEditReply(
                  event.target.value
                )
              }
              rows={5}
              className="w-full resize-y rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-zinc-600 focus:border-green-500"
              placeholder="Write or edit the reply..."
            />

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  saveEditedReply(
                    review
                  )
                }
                disabled={isSaving}
                className="rounded-lg bg-green-500 px-4 py-2 text-xs font-black text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving
                  ? "Saving..."
                  : "Save Reply"}
              </button>

              <button
                type="button"
                onClick={
                  cancelEditing
                }
                disabled={isSaving}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-xs font-bold text-zinc-300 transition hover:bg-zinc-800 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </>
        ) : review.aiReply ? (
          <>
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-300">
                {review.aiReply}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  startEditing(
                    review
                  )
                }
                disabled={
                  isApproving
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 text-xs font-bold text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ✏️ Edit Reply
              </button>

              {(review.status ===
                "Reply Generated" ||
                review.status ===
                  "Pending Approval") && (
                <button
                  type="button"
                  onClick={() =>
                    approveReply(
                      review
                    )
                  }
                  disabled={
                    isApproving
                  }
                  className="rounded-lg bg-green-500 px-4 py-2 text-xs font-black text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isApproving
                    ? "Posting to Google..."
                    : "✓ Approve & Reply"}
                </button>
              )}
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() =>
              generateAIReply(
                review
              )
            }
            disabled={
              isGenerating
            }
            className="rounded-lg bg-purple-500 px-4 py-2 text-xs font-black text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating
              ? "Generating..."
              : "🤖 Generate AI Reply"}
          </button>
        )}

        {review.reviewReply &&
          review.status ===
            "Replied" && (
            <div className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-emerald-400">
                Google Reply
              </p>

              <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-300">
                {review.reviewReply}
              </p>
            </div>
          )}
      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="flex min-h-screen bg-zinc-950">

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Reviews
            </h1>

            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              Manage Google Reviews and AI-powered replies
            </p>
          </div>

          <button
            type="button"
            onClick={
              syncGoogleReviews
            }
            disabled={
              loading ||
              syncing
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-black text-black shadow-sm transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {syncing
              ? "Syncing..."
              : "↻ Sync Google Reviews"}
          </button>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
            {success}
          </div>
        )}

        {/* STATISTICS */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <StatCard
            label="Total Reviews"
            value={
              statistics.total
            }
            icon="📝"
          />

          <StatCard
            label="New"
            value={
              statistics.newReviews
            }
            icon="🆕"
          />

          <StatCard
            label="AI Generated"
            value={
              statistics.replyGenerated
            }
            icon="🤖"
          />

          <StatCard
            label="Pending Approval"
            value={
              statistics.pendingApproval
            }
            icon="⏳"
          />

          <StatCard
            label="Approved"
            value={
              statistics.approved
            }
            icon="✓"
          />

          <StatCard
            label="Replied"
            value={
              statistics.replied
            }
            icon="💬"
          />
        </div>

        {/* REVIEW PANEL */}

        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
          {/* PANEL HEADER */}

          <div className="flex flex-col gap-4 border-b border-zinc-800 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Customer Reviews
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {filteredReviews.length} review
                {filteredReviews.length ===
                1
                  ? ""
                  : "s"}{" "}
                found
              </p>
            </div>

            <div className="w-full lg:w-80">
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search reviews..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-green-500"
              />
            </div>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="p-10 text-center text-sm text-zinc-500">
              Loading reviews...
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !error &&
            filteredReviews.length ===
              0 && (
              <div className="p-12 text-center">
                <div className="mb-3 text-4xl">
                  ⭐
                </div>

                <h3 className="text-lg font-bold text-white">
                  No reviews found
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                  {reviews.length ===
                  0
                    ? "No customer reviews are available yet."
                    : "Try changing your search."}
                </p>
              </div>
            )}

          {/* DESKTOP */}

          {!loading &&
            filteredReviews.length >
              0 && (
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1100px]">
                  <thead>
                    <tr className="border-b border-zinc-800 text-left">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-zinc-500">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-zinc-500">
                        Rating
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-zinc-500">
                        Review & Reply
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-zinc-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-zinc-500">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredReviews.map(
                      (review) => (
                        <tr
                          key={
                            review.id
                          }
                          className="border-b border-zinc-800/70 align-top transition hover:bg-zinc-800/30"
                        >
                          <td className="px-6 py-5">
                            <div className="font-semibold text-white">
                              {
                                review.customerName
                              }
                            </div>

                            <div className="mt-1 text-xs text-zinc-600">
                              {
                                review.source
                              }
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            {renderStars(
                              review.rating
                            )}

                            <div className="mt-1 text-xs text-zinc-500">
                              {
                                review.rating
                              }
                              /5
                            </div>
                          </td>

                          <td className="max-w-xl px-6 py-5">
                            <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-300">
                              {review.reviewText ||
                                "No written review"}
                            </p>

                            {renderReplyActions(
                              review
                            )}
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                                review.status
                              )}`}
                            >
                              {
                                review.status
                              }
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-6 py-5 text-sm text-zinc-500">
                            {formatDate(
                              review.reviewDate
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

          {/* MOBILE */}

          {!loading &&
            filteredReviews.length >
              0 && (
              <div className="space-y-4 p-4 lg:hidden">
                {filteredReviews.map(
                  (review) => (
                    <article
                      key={
                        review.id
                      }
                      className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-white">
                            {
                              review.customerName
                            }
                          </h3>

                          <p className="mt-1 text-xs text-zinc-600">
                            {
                              review.source
                            }
                          </p>
                        </div>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(
                            review.status
                          )}`}
                        >
                          {
                            review.status
                          }
                        </span>
                      </div>

                      <div className="mt-4">
                        {renderStars(
                          review.rating
                        )}

                        <span className="ml-2 text-xs text-zinc-500">
                          {
                            review.rating
                          }
                          /5
                        </span>
                      </div>

                      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-zinc-300">
                        {review.reviewText ||
                          "No written review"}
                      </p>

                      {renderReplyActions(
                        review
                      )}

                      <div className="mt-4 border-t border-zinc-800 pt-3 text-xs text-zinc-600">
                        {formatDate(
                          review.reviewDate
                        )}
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
        </section>
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
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
      <div className="flex items-center justify-between">
        <span className="text-2xl">
          {icon}
        </span>

        <span className="text-2xl font-black text-white">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-zinc-500">
        {label}
      </p>
    </div>
  );
}
