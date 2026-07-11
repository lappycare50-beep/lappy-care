import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8K1-b3vEVQL_ZZtttGeAXy77zkl-gB0U",
  authDomain: "lappy-care.firebaseapp.com",
  projectId: "lappy-care",
  storageBucket: "lappy-care.firebasestorage.app",
  messagingSenderId: "515648121481",
  appId: "1:515648121481:web:ceddefe26bc4d62c7e7458",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);