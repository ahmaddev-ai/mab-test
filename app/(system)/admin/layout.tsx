"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/login/ProtectedRoutes";
import AdminLayout from "@/components/system/AdminLayout";

export default function AdminSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname.replace(/\/$/, "") === "/admin/login";

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0F172A",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />

      {isLoginPage ? (
        children
      ) : (
        <ProtectedRoute allowedRole="admin">
          <AdminLayout>{children}</AdminLayout>
        </ProtectedRoute>
      )}
    </>
  );
}
