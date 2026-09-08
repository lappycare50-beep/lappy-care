// src/services/generatedPostsService.ts

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { GeneratedPost } from "@/types/generatedPost";

import {
  Platform,
  PostStatus,
} from "@/types/marketing";

const COLLECTION = "generated_posts";

/* =========================================================
   GET ALL GENERATED POSTS
========================================================= */

export async function getGeneratedPosts(): Promise<
  GeneratedPost[]
> {
  try {
    const q = query(
      collection(db, COLLECTION),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<
        GeneratedPost,
        "id"
      >),
    }));
  } catch (error) {
    console.error(
      "Failed to fetch generated posts:",
      error
    );

    throw error;
  }
}

/* =========================================================
   GET SINGLE GENERATED POST
========================================================= */

export async function getGeneratedPost(
  id: string
): Promise<GeneratedPost | null> {
  try {
    const snapshot = await getDoc(
      doc(db, COLLECTION, id)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<
        GeneratedPost,
        "id"
      >),
    };
  } catch (error) {
    console.error(
      "Failed to fetch generated post:",
      error
    );

    throw error;
  }
}

/* =========================================================
   CREATE GENERATED POST
========================================================= */

export async function createGeneratedPost(
  post: Omit<
    GeneratedPost,
    "id" | "createdAt" | "updatedAt"
  >
): Promise<string> {
  try {
    const ref = await addDoc(
      collection(db, COLLECTION),
      {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
    );

    return ref.id;
  } catch (error) {
    console.error(
      "Failed to create generated post:",
      error
    );

    throw error;
  }
}

/* =========================================================
   UPDATE GENERATED POST
========================================================= */

export async function updateGeneratedPost(
  id: string,
  data: Partial<GeneratedPost>
): Promise<void> {
  try {
    await updateDoc(
      doc(db, COLLECTION, id),
      {
        ...data,
        updatedAt: serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(
      "Failed to update generated post:",
      error
    );

    throw error;
  }
}

/* =========================================================
   DELETE GENERATED POST
========================================================= */

export async function deleteGeneratedPost(
  id: string
): Promise<void> {
  try {
    await deleteDoc(
      doc(db, COLLECTION, id)
    );
  } catch (error) {
    console.error(
      "Failed to delete generated post:",
      error
    );

    throw error;
  }
}

/* =========================================================
   GET POSTS BY PLATFORM
========================================================= */

export async function getPostsByPlatform(
  platform: Platform
): Promise<GeneratedPost[]> {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("platform", "==", platform),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<
        GeneratedPost,
        "id"
      >),
    }));
  } catch (error) {
    console.error(
      "Failed to fetch posts by platform:",
      error
    );

    throw error;
  }
}

/* =========================================================
   GET POSTS BY STATUS
========================================================= */

export async function getPostsByStatus(
  status: PostStatus
): Promise<GeneratedPost[]> {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<
        GeneratedPost,
        "id"
      >),
    }));
  } catch (error) {
    console.error(
      "Failed to fetch posts by status:",
      error
    );

    throw error;
  }
}

/* =========================================================
   GET SCHEDULED POSTS
========================================================= */

export async function getScheduledPosts(): Promise<
  GeneratedPost[]
> {
  try {
    const q = query(
      collection(db, COLLECTION),
      where(
        "status",
        "==",
        "Scheduled"
      ),
      orderBy(
        "scheduledAt",
        "asc"
      )
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<
        GeneratedPost,
        "id"
      >),
    }));
  } catch (error) {
    console.error(
      "Failed to fetch scheduled posts:",
      error
    );

    throw error;
  }
}

/* =========================================================
   GET DUE SCHEDULED POSTS
========================================================= */

export async function getDueScheduledPosts(): Promise<
  GeneratedPost[]
> {
  try {
    const now =
      Timestamp.now();

    const q = query(
      collection(db, COLLECTION),
      where(
        "status",
        "==",
        "Scheduled"
      ),
      where(
        "scheduledAt",
        "<=",
        now
      ),
      orderBy(
        "scheduledAt",
        "asc"
      )
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<
        GeneratedPost,
        "id"
      >),
    }));
  } catch (error) {
    console.error(
      "Failed to fetch due scheduled posts:",
      error
    );

    throw error;
  }
}

/* =========================================================
   DUPLICATE GENERATED POST
========================================================= */

export async function duplicateGeneratedPost(
  id: string
): Promise<string> {
  try {
    const source =
      await getGeneratedPost(id);

    if (!source) {
      throw new Error(
        "Post not found."
      );
    }

    const {
      id: _,
      scheduledAt: __,
      publishedAt: ___,
      ...postData
    } = source;

    const newRef = doc(
      collection(db, COLLECTION)
    );

    await setDoc(newRef, {
      ...postData,

      status: "Draft",

      scheduledAt: null,

      publishedAt: null,

      createdAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp(),
    });

    return newRef.id;
  } catch (error) {
    console.error(
      "Failed to duplicate generated post:",
      error
    );

    throw error;
  }
}

/* =========================================================
   SCHEDULE GENERATED POST
========================================================= */

export async function scheduleGeneratedPost(
  id: string,
  scheduledAt: Date
): Promise<void> {
  try {
    if (!(scheduledAt instanceof Date)) {
      throw new Error(
        "A valid schedule date is required."
      );
    }

    if (
      Number.isNaN(
        scheduledAt.getTime()
      )
    ) {
      throw new Error(
        "Invalid schedule date."
      );
    }

    if (
      scheduledAt.getTime() <=
      Date.now()
    ) {
      throw new Error(
        "Scheduled time must be in the future."
      );
    }

    await updateDoc(
      doc(db, COLLECTION, id),
      {
        scheduledAt:
          Timestamp.fromDate(
            scheduledAt
          ),

        status:
          "Scheduled",

        publishedAt: null,

        updatedAt:
          serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(
      "Failed to schedule generated post:",
      error
    );

    throw error;
  }
}

/* =========================================================
   RESCHEDULE GENERATED POST
========================================================= */

export async function rescheduleGeneratedPost(
  id: string,
  scheduledAt: Date
): Promise<void> {
  try {
    if (!(scheduledAt instanceof Date)) {
      throw new Error(
        "A valid schedule date is required."
      );
    }

    if (
      Number.isNaN(
        scheduledAt.getTime()
      )
    ) {
      throw new Error(
        "Invalid schedule date."
      );
    }

    if (
      scheduledAt.getTime() <=
      Date.now()
    ) {
      throw new Error(
        "Scheduled time must be in the future."
      );
    }

    await updateDoc(
      doc(db, COLLECTION, id),
      {
        scheduledAt:
          Timestamp.fromDate(
            scheduledAt
          ),

        status:
          "Scheduled",

        updatedAt:
          serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(
      "Failed to reschedule generated post:",
      error
    );

    throw error;
  }
}

/* =========================================================
   CANCEL SCHEDULE
========================================================= */

export async function cancelScheduledPost(
  id: string
): Promise<void> {
  try {
    await updateDoc(
      doc(db, COLLECTION, id),
      {
        scheduledAt: null,

        status:
          "Draft",

        updatedAt:
          serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(
      "Failed to cancel scheduled post:",
      error
    );

    throw error;
  }
}

/* =========================================================
   MARK POST AS PUBLISHING
========================================================= */

export async function markPostAsPublishing(
  id: string
): Promise<void> {
  try {
    await updateDoc(
      doc(db, COLLECTION, id),
      {
        status:
          "Publishing",

        updatedAt:
          serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(
      "Failed to mark post as publishing:",
      error
    );

    throw error;
  }
}

/* =========================================================
   MARK POST AS PUBLISHED
========================================================= */

export async function markPostAsPublished(
  id: string
): Promise<void> {
  try {
    await updateDoc(
      doc(db, COLLECTION, id),
      {
        status:
          "Published",

        publishedAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(
      "Failed to mark post as published:",
      error
    );

    throw error;
  }
}

/* =========================================================
   MARK POST AS FAILED
========================================================= */

export async function markPostAsFailed(
  id: string
): Promise<void> {
  try {
    await updateDoc(
      doc(db, COLLECTION, id),
      {
        status:
          "Failed",

        updatedAt:
          serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(
      "Failed to mark post as failed:",
      error
    );

    throw error;
  }
}