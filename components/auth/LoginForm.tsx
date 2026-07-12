"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, LogIn } from "lucide-react";

import { login } from "@/services/authService";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("lappycare50@gmail.com");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error(err);

      switch (err.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/user-not-found":
          setError("User not found.");
          break;

        case "auth/wrong-password":
          setError("Wrong password.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Try again later.");
          break;

        default:
          setError("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-yellow-500/20 bg-[#181818] p-8 shadow-2xl">

      <h1 className="mb-2 text-center text-3xl font-bold text-white">
        Admin Login
      </h1>

      <p className="mb-8 text-center text-gray-400">
        Lappy Care ERP
      </p>

      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-5">

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 pr-14 text-white outline-none focus:border-yellow-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-4 font-bold text-black transition hover:bg-yellow-300 disabled:opacity-50"
        >
          <LogIn size={18} />

          {loading ? "Signing In..." : "Login"}
        </button>

      </div>

    </div>
  );
}