"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, UserRound, X } from "lucide-react";
import { useEffect } from "react";

const navItems = [
  {
    name: "Dashboard",
    href: "/publisher/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Create Blog",
    href: "/publisher/create-blog",
    icon: FileText,
  },
  {
    name: "My Blogs",
    href: "/publisher/blogs",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/publisher/profile",
    icon: UserRound,
  },
];

export default function PublisherSidebar({
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
    href === "/publisher/blogs"
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
        <div className="border-b border-slate-200 p-4 dark:border-white/10">
          <p className="font-semibold text-slate-900 dark:text-white">
            Publisher Workspace
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
            Manage your blog content
          </p>
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
