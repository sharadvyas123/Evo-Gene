"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ✅ Validation Schema using Yup
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    rePassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please re-enter your password"),
});

export default function SignupPage() {
    const router = useRouter();
    const [generalError, setGeneralError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const exists = users.find((u: any) => u.email === data.email);

        if (exists) {
            setGeneralError("User already exists. Please login.");
            return;
        }

        users.push(data);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify(data));
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#050B1E] text-white">
            <div className="w-full max-w-md bg-[#0B1228] rounded-xl p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

                {generalError && <p className="text-red-400 text-center mb-4">{generalError}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            {...register("name")}
                            className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <p className="text-red-400 text-sm mt-1">{errors.name?.message}</p>
                    </div>

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
                            placeholder="Re-enter Password"
                            {...register("rePassword")}
                            className="w-full p-3 rounded bg-[#101832] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <p className="text-red-400 text-sm mt-1">{errors.rePassword?.message}</p>
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
