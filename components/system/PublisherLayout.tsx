"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import PublisherSidebar from "./PublisherSidebar";

export default function PublisherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#05060a] dark:text-white">
      <Navbar
        title="Publisher Panel"
        loginUrl="/publisher/login"
        toggleSidebar={() => setOpen((value) => !value)}
      />

      <PublisherSidebar open={open} setOpen={setOpen} />

      <main className="min-h-screen pt-16 ml-0 transition-all duration-300 lg:ml-64">
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
