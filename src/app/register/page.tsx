"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Registration Disabled
      </h1>

      <p className="mb-6">
        Registration has not been implemented yet.
      </p>

      <Link
        href="/login"
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Go to Login
      </Link>
    </div>
  );
}