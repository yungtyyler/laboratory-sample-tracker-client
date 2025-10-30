"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import AppSidebar from "@/components/layouts/AppSidebar";
import AppHeader from "@/components/layouts/AppHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [loading, token, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
        <span className="ml-3">Verifying authentication...</span>
      </div>
    );
  }

  if (token) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AppSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex flex-1 flex-col md:pl-64">
          <AppHeader setIsSidebarOpen={setIsSidebarOpen} />
          <main className="grow p-6 md:p-8">{children}</main>
        </div>
      </div>
    );
  }

  return null;
}
