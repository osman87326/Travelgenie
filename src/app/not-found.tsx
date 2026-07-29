import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white px-6">
      <h1 className="text-7xl font-bold text-teal-400">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-slate-400 text-center max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-500 transition"
      >
        Go Back Home
      </Link>
    </main>
  );
}