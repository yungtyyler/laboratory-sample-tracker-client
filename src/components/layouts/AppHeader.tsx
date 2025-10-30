"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { BiMenu } from "react-icons/bi";

const AppHeader = ({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
      <Link href={"/"} className="text-xl font-bold text-gray-900">
        LIMS <span className="font-light">App</span>
      </Link>
      {/* Burger Button - visible only on mobile */}
      <div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-500 md:hidden"
          aria-label="Open sidebar"
        >
          <BiMenu className="h-6 w-6" />
        </button>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <span className="hidden text-sm text-gray-700 sm:block">
            Hi, {user?.username}!
          </span>
          <button
            onClick={logout}
            className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
