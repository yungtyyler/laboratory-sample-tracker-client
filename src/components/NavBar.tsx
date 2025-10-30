"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Spinner from "./Spinner";
import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";

function NavBar() {
  const { user, token, logout, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <MaxWidthContainer className="py-2">
        <div className="flex h-16 items-center justify-between">
          <Link
            href={`/`}
            className="text-xl font-bold text-gray-900 md:text-3xl"
          >
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
          ) : loading ? (
            <Spinner />
          ) : (
            <Link
              href={`/login`}
              className="bg-primary hover:bg-primary-dark h-fit w-fit rounded-md px-4 py-2 text-sm text-white transition md:text-base"
            >
              Login
            </Link>
          )}
        </div>
      </MaxWidthContainer>
    </nav>
  );
}

export default NavBar;
