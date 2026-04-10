"use client";

import { register } from "@/app/auth/actions";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError("");
    startTransition(async () => {
      const result = await register(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Create an account</h1>
      <p className="text-sm text-gray-500 mb-6">Start managing your tasks today</p>

      <form action={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition cursor-pointer"
        >
          {isPending ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-gray-900 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
