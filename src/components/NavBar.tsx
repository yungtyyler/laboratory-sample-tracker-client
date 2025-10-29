"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Spinner from "./Spinner";

function NavBar() {
  const { user, token, logout, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
        <h1 className="mb-6 text-4xl font-bold">LIMS Dashboard</h1>
        <div className="mx-4 flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow">
          <p>Loading user...</p>
          <Spinner className="mt-4" />
        </div>
      </main>
    );
  }

  return (
    <nav className="bg-white px-8 py-4 shadow-2xl">
      <div className="flex w-full items-center justify-between">
        <Link href={`/`} className="text-3xl font-bold text-gray-900">
          LIMS <span className="font-light">Sample Tracker</span>
        </Link>
        {user && token ? (
          <div className="flex items-center justify-center gap-4">
            <Link
              href={`/dashboard`}
              className="bg-primary hover:bg-primary-dark h-fit w-fit rounded-md px-4 py-2 text-sm text-white transition md:text-base"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="h-fit w-fit rounded-md bg-red-600 px-4 py-2 text-sm text-white transition hover:cursor-pointer hover:bg-red-700 md:text-base"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href={`/login`}
            className="bg-primary hover:bg-primary-dark h-fit w-fit rounded-md px-4 py-2 text-sm text-white transition md:text-base"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
