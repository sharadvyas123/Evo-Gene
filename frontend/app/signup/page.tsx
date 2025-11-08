"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signupUser } from "@/lib/authService";

// ✅ Type definition
type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

// ✅ Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 chars").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export default function SignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
  });

  // ✅ Handle signup
  const onSubmit = async (data: SignupFormData) => {
    setServerError("");
    try {
      await signupUser(data.email, data.password);
      router.push("/dashboard");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Signup failed";
      setServerError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#050B1E] text-white">
      <div className="w-full max-w-md bg-[#0B1228] rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

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

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword?.message}</p>
          </div>

          <button
            type="submit"
            className="mt-4 p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded font-semibold hover:scale-105 transition-transform"
          >
            Sign Up
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
