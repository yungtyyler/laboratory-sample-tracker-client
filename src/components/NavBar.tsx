"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { PiX } from "react-icons/pi";

function NavBar() {
  const { user, token, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Features", href: "/features" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <MaxWidthContainer>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            LIMS <span className="font-light">Sample Tracker</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center space-x-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-primary text-sm font-medium text-gray-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center space-x-2 md:flex">
            {token && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-primary hover:bg-primary-dark rounded-md px-3 py-2 text-sm font-medium text-white transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary hover:bg-primary-dark rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Burger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <PiX className="h-6 w-6" />
              ) : (
                <BiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </MaxWidthContainer>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {/* Nav Links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-primary block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="space-y-2 border-t border-gray-100 px-2 pt-3 pb-4">
            {token && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-primary hover:bg-primary-dark block w-full rounded-md px-3 py-2 text-base font-medium text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block w-full rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary hover:bg-primary-dark block w-full rounded-md px-3 py-2 text-center text-base font-medium text-white shadow-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
