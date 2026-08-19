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
  updateDoc,
  where,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { GeneratedPost } from "@/types/generatedPost";

import {
  Platform,
  PostStatus,
} from "@/types/marketing";

const COLLECTION = "generated_posts";

export async function getGeneratedPosts(): Promise<
  GeneratedPost[]
> {
  try {
    const q = query(
      collection(db, COLLECTION),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<
        GeneratedPost,
        "id"
      >),
    }));
  } catch (error) {
    console.error(
      "Failed to fetch generated posts",
      error
    );
    throw error;
  }
}

export async function getGeneratedPost(
  id: string
): Promise<GeneratedPost | null> {
  try {
    const ref = doc(db, COLLECTION, id);

    const snapshot = await getDoc(ref);

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
      "Failed to fetch generated post",
      error
    );
    throw error;
  }
}

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
      "Failed to create generated post",
      error
    );
    throw error;
  }
}

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
      "Failed to update generated post",
      error
    );
    throw error;
  }
}

export async function deleteGeneratedPost(
  id: string
): Promise<void> {
  try {
    await deleteDoc(
      doc(db, COLLECTION, id)
    );
  } catch (error) {
    console.error(
      "Failed to delete generated post",
      error
    );
    throw error;
  }
}

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

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<
        GeneratedPost,
        "id"
      >),
    }));
  } catch (error) {
    console.error(
      "Failed to fetch posts by platform",
      error
    );
    throw error;
  }
}

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

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<
        GeneratedPost,
        "id"
      >),
    }));
  } catch (error) {
    console.error(
      "Failed to fetch posts by status",
      error
    );
    throw error;
  }
}
export async function duplicateGeneratedPost(
  id: string
): Promise<string> {
  try {
    const source = await getGeneratedPost(id);

    if (!source) {
      throw new Error("Post not found.");
    }

    const { id: _, ...postData } = source;

    const newRef = doc(
      collection(db, COLLECTION)
    );

    await setDoc(newRef, {
      ...postData,

      status: "Draft",

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return newRef.id;
  } catch (error) {
    console.error(
      "Failed to duplicate generated post",
      error
    );

    throw error;
  }
}