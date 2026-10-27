"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth";

type AllowedRole = "admin" | "publisher";

export default function ProtectedRoute({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: AllowedRole;
}) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace(`/${allowedRole}/login`);
      return;
    }

    if (role === "admin" || role === "publisher") {
      if (role !== allowedRole) {
        router.replace(`/${role}/dashboard`);
      }
    }
  }, [user, role, loading, allowedRole, router]);

  if (
    loading ||
    !user ||
    (role !== "admin" && role !== "publisher") ||
    role !== allowedRole
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05060a] text-white">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />

          <h2 className="mt-5 text-lg font-semibold">Verifying access</h2>

          <p className="mt-1 text-sm text-white/50">
            Please wait while we verify your account.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
