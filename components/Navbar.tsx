"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookUser,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CircleUserRound,
  Contact,
  GalleryThumbnails,
  Home,
  LibraryBig,
  LogIn,
  LogOut,
  Menu,
  NotebookText,
  Package,
  Settings,
  User,
  X,
  Code2,
  CalendarDays,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuth } from "@/context/Auth";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/ecosystem", label: "Ecosystem", icon: Building2 },
  { href: "/companies", label: "Companies", icon: BriefcaseBusiness },
  { href: "/products", label: "Products", icon: Package },
  {
    href: "#",
    label: "Programs",
    icon: NotebookText,
    dropdown: [
      {
        href: "/production-llm-and-agentic-ai-engineering",
        label: "Production LLM & Agentic AI Engineering",
      },
      {
        href: "/performance-marketing-mastery-program",
        label: "Performance Marketing Mastery",
      },
    ],
  },
  { href: "/books", label: "Books", icon: BookUser },
  { href: "/gallery", label: "Gallery", icon: GalleryThumbnails },
  { href: "/blogs", label: "Blogs", icon: NotebookText },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Contact },
];

const bookingHref = "/bookings?mode=arfa";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const programsActive =
    navItems
      .find((item) => item.label === "Programs")
      ?.dropdown?.some((item) => isActive(item.href)) ?? false;

  useEffect(() => {
    setOpen(false);
    setProgramsOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setProfileOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setProgramsOpen(false);
    setProfileOpen(false);
  };

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await signOut(auth);
      closeMenu();
      router.push("/login");
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#0A0A0A]/90">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-3 px-4 sm:h-[76px] sm:px-6 xl:px-8"
        >
          {/* Brand */}
          <Link
            href="/"
            aria-label="MAB home"
            className="flex shrink-0 items-center gap-2"
          >
            <span className="font-heading text-xl font-bold tracking-[-1px] text-slate-950 dark:text-white sm:text-2xl">
              MAB
            </span>
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_16px_rgba(59,130,246,0.75)]" />
          </Link>

          {/* Desktop navigation: only displayed when there is enough room */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-4 2xl:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.label === "Programs"
                  ? programsActive
                  : isActive(item.href);

              if (item.dropdown) {
                return (
                  <div key={item.label} className="group relative">
                    <button
                      type="button"
                      aria-haspopup="true"
                      className={`flex items-center gap-1.5 whitespace-nowrap py-3 text-[13px] font-medium transition-colors ${
                        active
                          ? "text-blue-600 dark:text-blue-300"
                          : "text-slate-600 hover:text-blue-600 dark:text-white/70 dark:hover:text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      />
                    </button>

                    <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 translate-y-2 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 dark:border-white/10 dark:bg-[#101116]">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block rounded-lg px-3 py-3 text-sm transition-colors ${
                            isActive(subItem.href)
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-300"
                              : "text-slate-700 hover:bg-blue-500/10 hover:text-blue-600 dark:text-white/75 dark:hover:text-blue-300"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap py-3 text-[13px] font-medium transition-colors ${
                    active
                      ? "text-blue-600 dark:text-blue-300"
                      : "text-slate-600 hover:text-blue-600 dark:text-white/70 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-0 bottom-1 h-0.5 rounded-full bg-blue-500 transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2.5 2xl:flex">
            <Link
              href="/playground"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-blue-600/40 px-3.5 text-sm font-medium text-blue-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400/40 dark:text-blue-300 dark:hover:bg-blue-400 dark:hover:text-black"
            >
              <Code2 size={16} />
              Playground
            </Link>

            <Link
              href={bookingHref}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <CalendarDays size={16} />
              Booking
            </Link>

            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 transition hover:bg-blue-500/20 dark:text-blue-300"
                >
                  <CircleUserRound size={25} />
                </button>

                {profileOpen && (
                  <>
                    <button
                      type="button"
                      aria-label="Close profile menu"
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setProfileOpen(false)}
                    />

                    <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#101116]">
                      <div className="border-b border-slate-200 px-3 py-3 dark:border-white/10">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {user.name || "My Account"}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500 dark:text-white/60">
                          {user.email}
                        </p>
                      </div>

                      <ProfileLink
                        href="/mab/library"
                        icon={<LibraryBig size={17} />}
                        label="My Library"
                        onClick={() => setProfileOpen(false)}
                      />
                      <ProfileLink
                        href="/mab/profile"
                        icon={<Settings size={17} />}
                        label="My Profile"
                        onClick={() => setProfileOpen(false)}
                      />

                      <button
                        type="button"
                        disabled={signingOut}
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-600 transition hover:bg-red-500/10 disabled:opacity-50 dark:text-red-400"
                      >
                        <LogOut size={17} />
                        {signingOut ? "Signing out..." : "Sign Out"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-white/15 dark:text-white/80 dark:hover:text-blue-300"
              >
                <LogIn size={16} />
                Login
              </Link>
            )}
          </div>

          {/* Tablet and mobile actions */}
          <div className="flex shrink-0 items-center gap-2 2xl:hidden">
            <Link
              href={bookingHref}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-4"
            >
              <CalendarDays size={16} />
              <span>Booking</span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 transition hover:border-blue-500 hover:text-blue-600 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:text-blue-300"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <button
        type="button"
        aria-label="Close navigation overlay"
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
        className={`fixed inset-0 z-[250] bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 2xl:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile / tablet drawer */}
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[300] flex h-[100dvh] w-[min(88vw,380px)] flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-white/10 dark:bg-[#0B0D13] 2xl:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
            tabIndex={open ? 0 : -1}
          >
            <span className="font-heading text-xl font-bold tracking-tight text-slate-950 dark:text-white">
              MAB
            </span>
            <span className="h-2 w-2 rounded-full bg-blue-500" />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation"
            tabIndex={open ? 0 : -1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
          >
            <X size={21} />
          </button>
        </div>

        {/* Scrollable navigation */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-white/40">
            Navigation
          </p>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.label === "Programs"
                  ? programsActive
                  : isActive(item.href);

              if (item.dropdown) {
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      aria-expanded={programsOpen}
                      onClick={() => setProgramsOpen((value) => !value)}
                      tabIndex={open ? 0 : -1}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left text-sm font-medium transition-colors ${
                        active
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-300"
                          : "text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/5"
                      }`}
                    >
                      <Icon size={19} className="shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      <ChevronDown
                        size={17}
                        className={`shrink-0 transition-transform duration-200 ${
                          programsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ${
                        programsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-6 mt-1 space-y-1 border-l border-blue-500/25 pl-3">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              tabIndex={open && programsOpen ? 0 : -1}
                              onClick={closeMenu}
                              className={`block rounded-lg px-3 py-3 text-sm leading-5 transition-colors ${
                                isActive(subItem.href)
                                  ? "bg-blue-500/10 font-medium text-blue-600 dark:text-blue-300"
                                  : "text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  tabIndex={open ? 0 : -1}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-300"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  <Icon size={19} className="shrink-0" />
                  <span>{item.label}</span>
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="my-5 border-t border-slate-200 dark:border-white/10" />

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-white/40">
            Quick Access
          </p>

          <div className="space-y-2">
            <Link
              href="/playground"
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-3 py-3.5 text-sm font-medium text-blue-600 transition hover:bg-blue-500/10 dark:text-blue-300"
            >
              <Code2 size={19} />
              Playground
            </Link>

            <Link
              href={bookingHref}
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <CalendarDays size={18} />
              Book an Appointment
            </Link>
          </div>
        </div>

        {/* Drawer footer: account actions */}
        <div className="shrink-0 border-t border-slate-200 bg-slate-50/80 p-4 pb-[max(16px,env(safe-area-inset-bottom))] dark:border-white/10 dark:bg-white/[0.025]">
          {user ? (
            <>
              <div className="mb-3 flex min-w-0 items-center gap-3 px-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-300">
                  <CircleUserRound size={26} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {user.name || "My Account"}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-white/55">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/mab/library"
                  tabIndex={open ? 0 : -1}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-2 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:text-white/80 dark:hover:text-blue-300"
                >
                  <LibraryBig size={17} />
                  Library
                </Link>

                <Link
                  href="/mab/profile"
                  tabIndex={open ? 0 : -1}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-2 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:text-white/80 dark:hover:text-blue-300"
                >
                  <Settings size={17} />
                  Profile
                </Link>
              </div>

              <button
                type="button"
                disabled={signingOut}
                tabIndex={open ? 0 : -1}
                onClick={handleSignOut}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400"
              >
                <LogOut size={17} />
                {signingOut ? "Signing out..." : "Sign Out"}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <LogIn size={18} />
              Login to Your Account
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

function ProfileLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-blue-500/10 hover:text-blue-600 dark:text-white/80 dark:hover:text-blue-300"
    >
      {icon}
      {label}
    </Link>
  );
}
