"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";


import {
  cancelScheduledPost,
  getGeneratedPosts,
  rescheduleGeneratedPost,
  scheduleGeneratedPost,
} from "@/services/generatedPostsService";

import { GeneratedPost } from "@/types/generatedPost";

type CalendarDay = {
  date: Date;
  currentMonth: boolean;
};

type ScheduleMode =
  | "schedule"
  | "reschedule";

function startOfDay(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

function getPostDate(
  post: GeneratedPost
): Date | null {
  const value =
    post.scheduledAt ??
    post.createdAt;

  if (!value) {
    return null;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (
      value as {
        toDate?: unknown;
      }
    ).toDate === "function"
  ) {
    return (
      value as {
        toDate: () => Date;
      }
    ).toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string") {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  if (typeof value === "number") {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
}

function getCalendarDays(
  year: number,
  month: number
): CalendarDay[] {
  const firstDay = new Date(
    year,
    month,
    1
  );

  const firstWeekday =
    firstDay.getDay();

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const previousMonthDays =
    new Date(
      year,
      month,
      0
    ).getDate();

  const days: CalendarDay[] = [];

  for (
    let i = firstWeekday - 1;
    i >= 0;
    i--
  ) {
    days.push({
      date: new Date(
        year,
        month - 1,
        previousMonthDays - i
      ),
      currentMonth: false,
    });
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    days.push({
      date: new Date(
        year,
        month,
        day
      ),
      currentMonth: true,
    });
  }

  let nextDay = 1;

  while (days.length < 42) {
    days.push({
      date: new Date(
        year,
        month + 1,
        nextDay
      ),
      currentMonth: false,
    });

    nextDay++;
  }

  return days;
}

function sameDay(
  first: Date,
  second: Date
) {
  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  );
}

function getPlatformClass(
  platform?: string
) {
  switch (platform) {
    case "Google":
    case "Google Business":
      return "bg-red-500/15 text-red-400";

    case "Facebook":
      return "bg-blue-500/15 text-blue-400";

    case "Instagram":
      return "bg-pink-500/15 text-pink-400";

    case "LinkedIn":
      return "bg-sky-500/15 text-sky-400";

    default:
      return "bg-zinc-800 text-zinc-300";
  }
}

function formatTime(
  date: Date
) {
  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function formatDateTime(
  date: Date
) {
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

function toDateInputValue(
  date: Date
) {
  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function ContentCalendarPage() {
  const today = startOfDay(
    new Date()
  );

  const [currentDate, setCurrentDate] =
    useState(today);

  const [posts, setPosts] = useState<
    GeneratedPost[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [platformFilter, setPlatformFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [showScheduleModal, setShowScheduleModal] =
    useState(false);

  const [scheduleMode, setScheduleMode] =
    useState<ScheduleMode>("schedule");

  const [selectedPostId, setSelectedPostId] =
    useState("");

  const [scheduleDate, setScheduleDate] =
    useState(
      toDateInputValue(today)
    );

  const [scheduleTime, setScheduleTime] =
    useState("10:00");

  const [saving, setSaving] =
    useState(false);

  const [selectedPost, setSelectedPost] =
    useState<GeneratedPost | null>(
      null
    );

  async function loadPosts() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getGeneratedPosts();

      setPosts(data);
    } catch (error) {
      console.error(
        "Failed to load calendar posts:",
        error
      );

      setError(
        "Failed to load calendar posts."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const platformMatch =
        platformFilter === "All" ||
        post.platform ===
          platformFilter;

      const statusMatch =
        statusFilter === "All" ||
        post.status ===
          statusFilter;

      return (
        platformMatch &&
        statusMatch
      );
    });
  }, [
    posts,
    platformFilter,
    statusFilter,
  ]);

  const calendarDays = useMemo(
    () =>
      getCalendarDays(
        currentDate.getFullYear(),
        currentDate.getMonth()
      ),
    [currentDate]
  );

  const postsForDay = (
    date: Date
  ) => {
    return filteredPosts.filter(
      (post) => {
        const postDate =
          getPostDate(post);

        if (!postDate) {
          return false;
        }

        return sameDay(
          postDate,
          date
        );
      }
    );
  };

  const selectedPosts =
    selectedDate
      ? postsForDay(selectedDate)
      : [];

  /*
   * Posts available for scheduling.
   * Draft posts are the primary candidates.
   * We also allow Generated status if it exists
   * in the current project.
   */
  const schedulablePosts =
    posts.filter(
      (post) =>
        post.status === "Draft" ||
        post.status === "Generated"
    );

  function goPreviousMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );

    setSelectedDate(null);
  }

  function goNextMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );

    setSelectedDate(null);
  }

  function goToday() {
    const now =
      startOfDay(new Date());

    setCurrentDate(now);
    setSelectedDate(now);
  }

  function openScheduleModal(
    post?: GeneratedPost,
    date?: Date
  ) {
    setError("");

    if (post) {
      setScheduleMode(
        "reschedule"
      );

      setSelectedPost(post);
      setSelectedPostId(post.id);

      const postDate =
        getPostDate(post);

      if (postDate) {
        setScheduleDate(
          toDateInputValue(
            postDate
          )
        );

        setScheduleTime(
          `${String(
            postDate.getHours()
          ).padStart(2, "0")}:${String(
            postDate.getMinutes()
          ).padStart(2, "0")}`
        );
      }
    } else {
      setScheduleMode(
        "schedule"
      );

      setSelectedPost(null);

      setSelectedPostId("");

      const targetDate =
        date ?? selectedDate ?? today;

      setScheduleDate(
        toDateInputValue(
          targetDate
        )
      );

      setScheduleTime(
        "10:00"
      );
    }

    setShowScheduleModal(true);
  }

  function closeScheduleModal() {
    if (saving) {
      return;
    }

    setShowScheduleModal(false);
    setSelectedPost(null);
    setSelectedPostId("");
    setError("");
  }

  async function handleScheduleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!selectedPostId) {
      setError(
        "Please select a post."
      );

      return;
    }

    if (!scheduleDate) {
      setError(
        "Please select a date."
      );

      return;
    }

    if (!scheduleTime) {
      setError(
        "Please select a time."
      );

      return;
    }

    const scheduledDate =
      new Date(
        `${scheduleDate}T${scheduleTime}`
      );

    if (
      Number.isNaN(
        scheduledDate.getTime()
      )
    ) {
      setError(
        "Please select a valid date and time."
      );

      return;
    }

    if (
      scheduledDate.getTime() <=
      Date.now()
    ) {
      setError(
        "Scheduled time must be in the future."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      if (
        scheduleMode ===
        "reschedule"
      ) {
        await rescheduleGeneratedPost(
          selectedPostId,
          scheduledDate
        );
      } else {
        await scheduleGeneratedPost(
          selectedPostId,
          scheduledDate
        );
      }

      await loadPosts();

      setCurrentDate(
        new Date(
          scheduledDate.getFullYear(),
          scheduledDate.getMonth(),
          1
        )
      );

      setSelectedDate(
        startOfDay(
          scheduledDate
        )
      );

      setShowScheduleModal(false);
      setSelectedPost(null);
      setSelectedPostId("");
    } catch (error) {
      console.error(
        "Failed to schedule post:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to schedule post."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleCancelSchedule(
    post: GeneratedPost
  ) {
    const confirmed =
      window.confirm(
        `Cancel schedule for "${post.title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await cancelScheduledPost(
        post.id
      );

      await loadPosts();
    } catch (error) {
      console.error(
        "Failed to cancel schedule:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to cancel schedule."
      );
    }
  }

  const monthTitle =
    currentDate.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Content Calendar
            </h1>

            <p className="mt-2 text-zinc-400">
              Plan, schedule and manage
              your marketing content.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() =>
                openScheduleModal(
                  undefined,
                  selectedDate ??
                    today
                )
              }
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-yellow-500
                px-5
                py-3
                font-semibold
                text-yellow-400
                transition
                hover:bg-yellow-500
                hover:text-black
              "
            >
              + Schedule Post
            </button>

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

        </div>

        {/* FILTERS */}

        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-wrap gap-3">

              <select
                value={platformFilter}
                onChange={(event) =>
                  setPlatformFilter(
                    event.target.value
                  )
                }
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-4
                  py-3
                  text-sm
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

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-4
                  py-3
                  text-sm
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
              </select>

            </div>

            <div className="text-sm text-zinc-500">
              {filteredPosts.length} posts
            </div>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-900 bg-red-950/30 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* LOADING */}

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">

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
                Loading calendar...
              </p>

            </div>

          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

            {/* CALENDAR HEADER */}

            <div className="flex flex-col gap-4 border-b border-zinc-800 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={goPreviousMonth}
                  className="
                    rounded-lg
                    border
                    border-zinc-700
                    px-3
                    py-2
                    text-zinc-300
                    hover:bg-zinc-800
                  "
                >
                  ←
                </button>

                <h2 className="min-w-[180px] text-center text-xl font-semibold">
                  {monthTitle}
                </h2>

                <button
                  type="button"
                  onClick={goNextMonth}
                  className="
                    rounded-lg
                    border
                    border-zinc-700
                    px-3
                    py-2
                    text-zinc-300
                    hover:bg-zinc-800
                  "
                >
                  →
                </button>

              </div>

              <button
                type="button"
                onClick={goToday}
                className="
                  rounded-lg
                  border
                  border-zinc-700
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-zinc-300
                  hover:bg-zinc-800
                  hover:text-white
                "
              >
                Today
              </button>

            </div>

            {/* WEEK DAYS */}

            <div className="grid grid-cols-7 border-b border-zinc-800">

              {[
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ].map((day) => (
                <div
                  key={day}
                  className="
                    border-r
                    border-zinc-800
                    px-2
                    py-3
                    text-center
                    text-xs
                    font-semibold
                    uppercase
                    text-zinc-500
                  "
                >
                  {day}
                </div>
              ))}

            </div>

            {/* DAYS */}

            <div className="grid grid-cols-7">

              {calendarDays.map(
                (calendarDay) => {
                  const dayPosts =
                    postsForDay(
                      calendarDay.date
                    );

                  const isToday =
                    sameDay(
                      calendarDay.date,
                      today
                    );

                  const isSelected =
                    selectedDate
                      ? sameDay(
                          calendarDay.date,
                          selectedDate
                        )
                      : false;

                  return (
                    <button
                      key={calendarDay.date.toISOString()}
                      type="button"
                      onClick={() =>
                        setSelectedDate(
                          calendarDay.date
                        )
                      }
                      className={`
                        min-h-[145px]
                        border-r
                        border-b
                        border-zinc-800
                        p-2
                        text-left
                        transition
                        hover:bg-zinc-800/60
                        ${
                          !calendarDay.currentMonth
                            ? "bg-zinc-950/50 text-zinc-700"
                            : "bg-zinc-900"
                        }
                        ${
                          isSelected
                            ? "ring-2 ring-inset ring-yellow-500"
                            : ""
                        }
                      `}
                    >

                      <div className="mb-2 flex items-center justify-between">

                        <span
                          className={`
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            text-sm
                            font-medium
                            ${
                              isToday
                                ? "bg-yellow-500 text-black"
                                : calendarDay.currentMonth
                                ? "text-zinc-300"
                                : "text-zinc-700"
                            }
                          `}
                        >
                          {
                            calendarDay.date.getDate()
                          }
                        </span>

                        {dayPosts.length >
                          0 && (
                          <span className="text-[10px] text-zinc-500">
                            {dayPosts.length}
                          </span>
                        )}

                      </div>

                      <div className="space-y-1">

                        {dayPosts
                          .slice(0, 3)
                          .map((post) => {
                            const postDate =
                              getPostDate(
                                post
                              );

                            const isScheduled =
                              post.status ===
                              "Scheduled";

                            return (
                              <div
                                key={post.id}
                                className={`
                                  truncate
                                  rounded-md
                                  px-2
                                  py-1
                                  text-[11px]
                                  ${getPlatformClass(
                                    post.platform
                                  )}
                                `}
                                title={
                                  post.title
                                }
                              >
                                <span className="font-semibold">
                                  {isScheduled &&
                                    postDate &&
                                    `${formatTime(
                                      postDate
                                    )} • `}
                                </span>

                                {post.title}
                              </div>
                            );
                          })}

                        {dayPosts.length >
                          3 && (
                          <div className="px-2 text-[10px] text-zinc-500">
                            +
                            {dayPosts.length -
                              3}{" "}
                            more
                          </div>
                        )}

                      </div>

                    </button>
                  );
                }
              )}

            </div>

          </div>
        )}

        {/* SELECTED DAY */}

        {selectedDate && (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl font-semibold">
                  {selectedDate.toLocaleDateString(
                    "en-IN",
                    {
                      weekday:
                        "long",
                      day: "numeric",
                      month:
                        "long",
                      year:
                        "numeric",
                    }
                  )}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {selectedPosts.length}{" "}
                  post
                  {selectedPosts.length !==
                  1
                    ? "s"
                    : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openScheduleModal(
                    undefined,
                    selectedDate
                  )
                }
                className="
                  rounded-xl
                  bg-yellow-500
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-black
                  hover:bg-yellow-400
                "
              >
                + Schedule Post
              </button>

            </div>

            {selectedPosts.length ===
            0 ? (
              <div className="rounded-xl border border-dashed border-zinc-700 p-8 text-center">

                <p className="text-zinc-500">
                  No posts on this date.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    openScheduleModal(
                      undefined,
                      selectedDate
                    )
                  }
                  className="mt-3 text-sm font-semibold text-yellow-400 hover:text-yellow-300"
                >
                  Schedule a post
                </button>

              </div>
            ) : (
              <div className="space-y-3">

                {selectedPosts.map(
                  (post) => {
                    const postDate =
                      getPostDate(
                        post
                      );

                    const isScheduled =
                      post.status ===
                      "Scheduled";

                    return (
                      <div
                        key={post.id}
                        className="
                          rounded-xl
                          border
                          border-zinc-800
                          bg-zinc-950
                          p-4
                        "
                      >

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                          <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                              <span
                                className={`
                                  rounded-full
                                  px-2.5
                                  py-1
                                  text-xs
                                  font-semibold
                                  ${getPlatformClass(
                                    post.platform
                                  )}
                                `}
                              >
                                {
                                  post.platform
                                }
                              </span>

                              <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-300">
                                {
                                  post.status
                                }
                              </span>

                            </div>

                            <h3 className="mt-3 truncate text-base font-semibold text-white">
                              {post.title}
                            </h3>

                            {isScheduled &&
                              postDate && (
                                <p className="mt-1 text-sm text-yellow-400">
                                  Scheduled:{" "}
                                  {formatDateTime(
                                    postDate
                                  )}
                                </p>
                              )}

                          </div>

                          <div className="flex flex-wrap gap-2">

                            <a
                              href={`/admin/marketing/posts/${post.id}`}
                              className="
                                rounded-lg
                                border
                                border-zinc-700
                                px-3
                                py-2
                                text-sm
                                font-medium
                                text-zinc-300
                                hover:bg-zinc-800
                                hover:text-white
                              "
                            >
                              View
                            </a>

                            {isScheduled ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    openScheduleModal(
                                      post
                                    )
                                  }
                                  className="
                                    rounded-lg
                                    border
                                    border-yellow-600
                                    px-3
                                    py-2
                                    text-sm
                                    font-semibold
                                    text-yellow-400
                                    hover:bg-yellow-500
                                    hover:text-black
                                  "
                                >
                                  Reschedule
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCancelSchedule(
                                      post
                                    )
                                  }
                                  className="
                                    rounded-lg
                                    border
                                    border-red-900
                                    px-3
                                    py-2
                                    text-sm
                                    font-semibold
                                    text-red-400
                                    hover:bg-red-950
                                  "
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  openScheduleModal(
                                    post,
                                    selectedDate
                                  )
                                }
                                className="
                                  rounded-lg
                                  bg-yellow-500
                                  px-3
                                  py-2
                                  text-sm
                                  font-semibold
                                  text-black
                                  hover:bg-yellow-400
                                "
                              >
                                Schedule
                              </button>
                            )}

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            )}

          </div>
        )}

      </main>

      {/* SCHEDULE MODAL */}

      {showScheduleModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeScheduleModal();
            }
          }}
        >

          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="border-b border-zinc-800 p-6">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h2 className="text-xl font-bold">
                    {scheduleMode ===
                    "reschedule"
                      ? "Reschedule Post"
                      : "Schedule Post"}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Choose the post,
                    date and time.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    closeScheduleModal
                  }
                  disabled={saving}
                  className="
                    rounded-lg
                    p-2
                    text-zinc-500
                    hover:bg-zinc-800
                    hover:text-white
                  "
                >
                  ✕
                </button>

              </div>

            </div>

            {/* MODAL BODY */}

            <form
              onSubmit={
                handleScheduleSubmit
              }
            >

              <div className="space-y-5 p-6">

                {error && (
                  <div className="rounded-xl border border-red-900 bg-red-950/30 p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* POST */}

                <div>
                  <label
                    htmlFor="schedule-post"
                    className="mb-2 block text-sm font-semibold text-zinc-300"
                  >
                    Post
                  </label>

                  {scheduleMode ===
                    "reschedule" &&
                  selectedPost ? (
                    <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">

                      <div className="flex flex-wrap gap-2">

                        <span
                          className={`
                            rounded-full
                            px-2.5
                            py-1
                            text-xs
                            font-semibold
                            ${getPlatformClass(
                              selectedPost.platform
                            )}
                          `}
                        >
                          {
                            selectedPost.platform
                          }
                        </span>

                        <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                          {
                            selectedPost.status
                          }
                        </span>

                      </div>

                      <p className="mt-3 font-semibold text-white">
                        {
                          selectedPost.title
                        }
                      </p>

                    </div>
                  ) : (
                    <select
                      id="schedule-post"
                      value={
                        selectedPostId
                      }
                      onChange={(
                        event
                      ) => {
                        setSelectedPostId(
                          event.target
                            .value
                        );

                        setError("");
                      }}
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
                        Select a post
                      </option>

                      {schedulablePosts.map(
                        (post) => (
                          <option
                            key={
                              post.id
                            }
                            value={
                              post.id
                            }
                          >
                            {
                              post.title
                            }
                          </option>
                        )
                      )}

                    </select>
                  )}

                  {scheduleMode ===
                    "schedule" &&
                    schedulablePosts.length ===
                      0 && (
                      <p className="mt-2 text-xs text-zinc-500">
                        No Draft or
                        Generated posts
                        are available
                        for scheduling.
                      </p>
                    )}

                </div>

                {/* DATE */}

                <div>
                  <label
                    htmlFor="schedule-date"
                    className="mb-2 block text-sm font-semibold text-zinc-300"
                  >
                    Schedule Date
                  </label>

                  <input
                    id="schedule-date"
                    type="date"
                    value={
                      scheduleDate
                    }
                    min={toDateInputValue(
                      today
                    )}
                    onChange={(event) =>
                      setScheduleDate(
                        event.target
                          .value
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
                  />
                </div>

                {/* TIME */}

                <div>
                  <label
                    htmlFor="schedule-time"
                    className="mb-2 block text-sm font-semibold text-zinc-300"
                  >
                    Schedule Time
                  </label>

                  <input
                    id="schedule-time"
                    type="time"
                    value={
                      scheduleTime
                    }
                    onChange={(event) =>
                      setScheduleTime(
                        event.target
                          .value
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
                  />
                </div>

                <div className="rounded-xl border border-yellow-900/50 bg-yellow-950/20 p-4 text-sm text-yellow-400">
                  The post will be
                  marked as{" "}
                  <strong>
                    Scheduled
                  </strong>{" "}
                  at the selected date
                  and time.
                </div>

              </div>

              {/* MODAL FOOTER */}

              <div className="flex flex-col-reverse gap-3 border-t border-zinc-800 p-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={
                    closeScheduleModal
                  }
                  disabled={saving}
                  className="
                    rounded-xl
                    border
                    border-zinc-700
                    px-5
                    py-3
                    font-semibold
                    text-zinc-300
                    hover:bg-zinc-800
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    (scheduleMode ===
                      "schedule" &&
                      schedulablePosts.length ===
                        0)
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
                  {saving
                    ? "Saving..."
                    : scheduleMode ===
                      "reschedule"
                    ? "Save New Schedule"
                    : "Schedule Post"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}
