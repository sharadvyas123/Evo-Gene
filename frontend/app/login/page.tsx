"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/lib/authService"; // ✅ Import from your axios helper

// ✅ Form type definition
type LoginFormData = {
  email: string;
  password: string;
};

// ✅ Yup validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  // ✅ Handle form submit
  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setServerError("");

    try {
      await loginUser(data.email, data.password);
      router.push("/dashboard");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Invalid email or password";
      setServerError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#050B1E] text-white">
      <div className="w-full max-w-md bg-[#0B1228] rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

        {serverError && <p className="text-red-400 text-center mb-4">{serverError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <p className="text-red-400 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <p className="text-red-400 text-sm mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            className="mt-4 p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded font-semibold hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-cyan-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
