import ReadingNavbar from "@/components/panel/ReadingNavbar";
import type { ReactNode } from "react";

export default function ReadingPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <ReadingNavbar />
      {children}
    </div>
  );
}
