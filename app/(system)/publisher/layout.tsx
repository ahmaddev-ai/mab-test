import ProtectedRoute from "@/components/login/ProtectedRoutes";
import PublisherLayout from "@/components/system/PublisherLayout";

export default function PublisherSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRole="publisher">
      <PublisherLayout>{children}</PublisherLayout>
    </ProtectedRoute>
  );
}
