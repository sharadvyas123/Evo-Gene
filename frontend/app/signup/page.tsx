"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500); // ✅ redirect to login after success
      } else {
        setError(data.detail || data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#050B1E] text-white">
      <div className="bg-[#0B1228] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}
        {success && <p className="text-green-400 text-center mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="p-3 mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded font-semibold hover:scale-105 transition-transform"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
