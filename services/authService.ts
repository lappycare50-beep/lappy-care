import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

/**
 * Login
 */
export async function login(
  email: string,
  password: string
) {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

/**
 * Logout
 */
export async function logout() {
  return await signOut(auth);
}

/**
 * Current User Listener
 */
export function subscribeAuth(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback);
}