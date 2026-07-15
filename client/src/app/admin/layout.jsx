"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {

    if (loading) return;

    if (!user) {

      router.replace("/login");

      return;
    }

    if (user.role !== "admin") {

      router.replace("/");

    }

  }, [user, loading, router]);

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }

  if (!user || user.role !== "admin") {

    return null;

  }

  return (
    <DashboardLayout>

      {children}

    </DashboardLayout>
  );
}