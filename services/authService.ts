import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

/**
 * Login
 *
 * Firebase authentication is kept only
 * for the current browser session.
 *
 * When the browser is closed,
 * the user will need to login again.
 */
export async function login(
  email: string,
  password: string
) {
  await setPersistence(
    auth,
    browserSessionPersistence
  );

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
  return onAuthStateChanged(
    auth,
    callback
  );
}