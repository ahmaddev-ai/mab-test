"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Tags,
  Ticket,
  X,
  User2,
  PanelsRightBottomIcon,
} from "lucide-react";
import { useEffect } from "react";
import { FaBlog } from "react-icons/fa";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Books",
    href: "/admin/books",
    icon: BookOpen,
  },
  {
    name: "Promo Code",
    href: "/admin/promo-codes",
    icon: PanelsRightBottomIcon,
  },
  {
    name: "Create Blog",
    href: "/admin/create-blog",
    icon: FaBlog,
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
    icon: FaBlog,
  },
  {
    name: "Publishers",
    href: "/admin/publishers",
    icon: Users,
  },
  {
    name: "Profile",
    href: "/admin/profile",
    icon: User2,
  },
];

export default function AdminSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  const isActive = (href: string) =>
    href === "/admin/books"
      ? pathname === href || pathname.startsWith(`${href}/`)
      : pathname === href;

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-16 z-50 h-[calc(100vh-64px)] w-64 border-r border-slate-200 bg-white transition-transform duration-300 dark:border-white/10 dark:bg-[#0a0c12] ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-white/10">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Administration
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
              Manage your platform
            </p>
          </div>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-1 p-4">
          {navItems.map(({ name, href, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  active
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-white/70 dark:hover:bg-white/5"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-emerald-400" />
                )}

                <Icon size={18} />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
