"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // ✅ Simulate successful login and store token
    localStorage.setItem("accessToken", "loggedin-token");

    // ✅ Redirect after login
    const redirectPath = localStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      localStorage.removeItem("redirectAfterLogin");
      router.push(redirectPath);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#050B1E] text-white">
      <div className="w-full max-w-md bg-[#0B1228] rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            type="submit"
            className="mt-4 p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded font-semibold hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
