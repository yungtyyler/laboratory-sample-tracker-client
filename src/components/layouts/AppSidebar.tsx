"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FiXSquare } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiX } from "react-icons/pi";

const AppSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: <LuLayoutDashboard /> },
    { name: "Register Sample", href: "/dashboard/new", icon: <PiX /> },
    // Add more here as they are built:
    // { name: "Inventory", href: "/dashboard/inventory" }, // icon: <ClipboardList />
    // { name: "Settings", href: "/dashboard/settings" }, // icon: <Settings />
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <nav
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col gap-4 border-r bg-white p-4 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} {/* This is the key: forces it to be on desktop */} visible md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-2 py-4">
          <h1 className="text-xl font-bold text-gray-900">
            LIMS <span className="font-light">App</span>
          </h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-500 md:hidden"
            aria-label="Close sidebar"
          >
            <FiXSquare className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default AppSidebar;
