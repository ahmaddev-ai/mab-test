"use client";

import Link from "next/link";
import { useAuth } from "@/context/Auth";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText } from "lucide-react";
import { useEffect } from "react";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const { role } = useAuth();
  const pathname = usePathname();

  /* ---------- auto close on route change (mobile UX) ---------- */

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItems = [
    {
      name: "Dashboard",
      href: `/${role}/dashboard`,
      icon: LayoutDashboard,
      show: true,
    },
    {
      name: "Publishers",
      href: "/admin/publishers",
      icon: Users,
      show: role === "admin",
    },
    {
      name: "Create Blogs",
      href: `/${role}/create-blog`,
      icon: FileText,
      show: true,
    },
    {
      name: "My Blogs",
      href: `/${role}/blogs`,
      icon: FileText,
      show: true,
    },
    {
      name: "Profile",
      href: `/${role}/profile`,
      icon: Users,
      show: true,
    },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      {/* -------- Mobile Overlay -------- */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* -------- Sidebar -------- */}
      <aside
        className={`
          fixed top-16 left-0
          h-[calc(100vh-64px)]
          w-64
          bg-white dark:bg-[#0a0c12]
          border-r border-slate-200 dark:border-white/10
          z-50

          transform transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        <div className="p-4 space-y-2">
          {navItems
            .filter((item) => item.show)
            .map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-xl
                    transition

                    ${
                      active
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-emerald-400 rounded-r" />
                  )}

                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
        </div>
      </aside>
    </>
  );
}
