"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user, token, logout } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="w-full max-w-5xl">
          <h1 className="mb-6 text-4xl font-bold">LIMS Dashboard</h1>

          {token && user ? (
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-2xl">
                Welcome back,{" "}
                <span className="font-semibold text-blue-600">
                  {user.username}
                </span>
                !
              </h2>
              <button
                onClick={logout}
                className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                Logout
              </button>
              {/* Add a link to the sample list here later */}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-2xl">You are not logged in.</h2>
              <p className="mb-6 text-gray-700">
                Please log in or register to manage your samples.
              </p>
              <Link
                href="/login"
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
