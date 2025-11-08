"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ Optional: Redirect to /login if no cookie is found
  useEffect(() => {
    const cookies = document.cookie.split(";").map(c => c.trim());
    const loggedIn = cookies.find(c => c.startsWith("loggedInUser="));
    if (!loggedIn) router.push("/login");
  }, [router]);

  // ✅ Logout logic
  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/logout", { method: "POST" }); // clears the cookie
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#050B1E] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to EvoGene Dashboard</h1>
        <p className="text-gray-300 mb-8">
          You are logged in — this page is protected by middleware.
        </p>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="px-6 py-3 bg-red-500 rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
