"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.push("/login");
      }
    }
  }, [loading, token, router]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-(--spacing(16))-(--spacing(32)))] items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-600">Verifying authentication...</span>
      </div>
    );
  }

  if (token) {
    return <>{children}</>;
  }

  return null;
};

export default DashboardLayout;
