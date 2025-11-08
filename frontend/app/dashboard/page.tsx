"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/authService";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/login");
    // (Optional) fetch user info later using getUserProfile()
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#050B1E] text-white">
      <div className="p-8 rounded-xl bg-[#0B1228] shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to EvoGene 🚀</h1>
        <p className="text-gray-300 mb-8">Logged in successfully!</p>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 rounded font-semibold hover:scale-105 transition-transform"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
