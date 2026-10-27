"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useAuth } from "@/context/Auth";
import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  Save,
  Loader2,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  LibraryBig,
  ShoppingBag,
  RefreshCw,
  Clock3,
  ReceiptText,
} from "lucide-react";

type ProfileData = {
  name: string;
  email: string;
  photoURL: string;
  role: string;
  createdAt: string;
};

type OrderData = {
  id: string;
  orderId: string;
  bookTitle: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date | null;
};

function formatOrderDate(date: Date | null) {
  if (!date || Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Karachi",
  });
}

function getOrderStatus(status: string) {
  const normalized = status.toLowerCase();

  if (normalized === "paid") {
    return {
      label: "Paid",
      className:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    };
  }

  if (normalized === "pending") {
    return {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    };
  }

  if (
    ["failed", "failure", "cancelled", "canceled", "expired"].includes(
      normalized
    )
  ) {
    return {
      label: normalized.charAt(0).toUpperCase() + normalized.slice(1),
      className: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
    };
  }

  return {
    label: status.replace(/[_-]/g, " "),
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  };
}

export default function CustomerProfilePage() {
  const router = useRouter();
  const { user, role, loading: authLoading } = useAuth();

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    photoURL: "",
    role: "user",
    createdAt: "",
  });

  const [originalName, setOriginalName] = useState("");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderError, setOrderError] = useState("");
  const [refreshingOrders, setRefreshingOrders] = useState(false);
  const [ordersReloadKey, setOrdersReloadKey] = useState(0);

  // Load profile
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoadingProfile(false);
      router.replace("/login");
      return;
    }

    let cancelled = false;

    async function loadProfile() {
      setLoadingProfile(true);
      setError("");

      try {
        const currentUser = auth.currentUser;

        if (!currentUser || currentUser.uid !== user?.uid) {
          router.replace("/login");
          return;
        }

        const snapshot = await getDoc(doc(db, "users", currentUser.uid));

        if (!snapshot.exists()) {
          if (!cancelled) {
            setError(
              "Your account profile could not be found. Please contact support."
            );
          }
          return;
        }

        const data = snapshot.data();
        const displayName = data.name ?? currentUser.displayName ?? "";

        const createdAt = data.createdAt?.toDate
          ? data.createdAt.toDate().toLocaleDateString("en-PK", {
              timeZone: "Asia/Karachi",
            })
          : "";

        if (!cancelled) {
          setProfile({
            name: displayName,
            email: currentUser.email ?? data.email ?? "",
            photoURL: data.photoURL ?? currentUser.photoURL ?? "",
            role: data.role ?? role ?? "user",
            createdAt,
          });

          setOriginalName(displayName);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);

        if (!cancelled) {
          setError("Unable to load your profile. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoadingProfile(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, role, router]);

  // Load current user's order history
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setOrders([]);
      setLoadingOrders(false);
      return;
    }

    let cancelled = false;

    async function loadOrders() {
      setLoadingOrders(true);
      setOrderError("");

      try {
        const currentUser = auth.currentUser;

        if (!currentUser || currentUser.uid !== user?.uid) {
          if (!cancelled) {
            setOrders([]);
            setLoadingOrders(false);
          }
          return;
        }

        const ordersQuery = query(
          collection(db, "kuickpay_orders"),
          where("userId", "==", currentUser.uid)
        );

        const snapshot = await getDocs(ordersQuery);

        const orderList: OrderData[] = snapshot.docs.map((orderDoc) => {
          const data = orderDoc.data();
          const rawDate = data.createdAt;

          let createdAt: Date | null = null;

          if (rawDate && typeof rawDate.toDate === "function") {
            createdAt = rawDate.toDate();
          } else if (rawDate instanceof Date) {
            createdAt = rawDate;
          } else if (typeof data.timestamp === "string") {
            const parsed = new Date(data.timestamp);
            if (!Number.isNaN(parsed.getTime())) createdAt = parsed;
          }

          return {
            id: orderDoc.id,
            orderId: String(data.orderId ?? orderDoc.id),
            bookTitle: String(data.bookTitle ?? "Book purchase"),
            amount: Number(
              data.amountPayable ?? data.amount ?? data.gatewayAmount ?? 0
            ),
            currency: String(data.currency ?? "PKR"),
            status: String(data.status ?? "pending").toLowerCase(),
            createdAt,
          };
        });

        orderList.sort(
          (a, b) =>
            (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
        );

        if (!cancelled) {
          setOrders(orderList);
        }
      } catch (err) {
        console.error("Failed to load order history:", err);

        if (!cancelled) {
          setOrderError(
            "Unable to load your order history. Check your connection and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingOrders(false);
          setRefreshingOrders(false);
        }
      }
    }

    void loadOrders();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, ordersReloadKey]);

  function updateName(value: string) {
    setProfile((current) => ({
      ...current,
      name: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const currentUser = auth.currentUser;

    if (!currentUser || !user || currentUser.uid !== user.uid) {
      setError("Please sign in again to update your profile.");
      return;
    }

    const trimmedName = profile.name.trim();

    if (trimmedName.length < 2) {
      setError("Your name must contain at least 2 characters.");
      return;
    }

    if (trimmedName.length > 100) {
      setError("Your name cannot exceed 100 characters.");
      return;
    }

    if (trimmedName === originalName) {
      setSuccess("Your profile is already up to date.");
      return;
    }

    setSaving(true);

    try {
      await updateProfile(currentUser, {
        displayName: trimmedName,
      });

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          name: trimmedName,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setOriginalName(trimmedName);
      setProfile((current) => ({
        ...current,
        name: trimmedName,
      }));

      setSuccess("Your profile has been updated successfully.");
    } catch (err) {
      console.error("Profile update failed:", err);
      setError(
        "Unable to save your profile. Check your permissions and try again."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    setError("");
    setLoggingOut(true);

    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Unable to sign out. Please try again.");
      setLoggingOut(false);
    }
  }

  function refreshOrders() {
    setRefreshingOrders(true);
    setOrdersReloadKey((key) => key + 1);
  }

  if (authLoading || loadingProfile) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
        <span className="ml-3 text-sm text-slate-500">
          Loading your profile...
        </span>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
        <span className="ml-3 text-sm text-slate-500">
          Redirecting to login...
        </span>
      </main>
    );
  }

  const initials =
    profile.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push("/mab")}
              className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-indigo-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to books
            </button>

            <h1 className="text-3xl font-bold tracking-tight">My profile</h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your personal information, purchases and account settings.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {loggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            {loggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>

        {/* Feedback */}
        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{success}</p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Profile sidebar */}
          <aside className="space-y-6">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="h-28 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600" />

              <div className="px-6 pb-6">
                <div className="-mt-12 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-indigo-100 text-2xl font-bold text-indigo-700 shadow-md dark:border-slate-900 dark:bg-indigo-950 dark:text-indigo-300">
                    {profile.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={profile.photoURL}
                        alt={profile.name || "Profile"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h2 className="break-words text-xl font-bold">
                    {profile.name || "Your name"}
                  </h2>

                  <p className="mt-1 break-all text-sm text-slate-500">
                    {profile.email}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold capitalize text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {profile.role} account
                  </span>
                </div>

                {profile.createdAt && (
                  <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-500 dark:border-slate-800">
                    <CalendarDays className="h-4 w-4" />
                    Member since {profile.createdAt}
                  </div>
                )}
              </div>
            </section>

            <button
              type="button"
              onClick={() => router.push("/mab")}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <span className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                <BookOpen className="h-5 w-5" />
              </span>

              <span className="flex-1">
                <span className="block text-sm font-semibold">
                  Browse books
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  Explore the available collection
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/mab/library")}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <span className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                <LibraryBig className="h-5 w-5" />
              </span>

              <span className="flex-1">
                <span className="block text-sm font-semibold">My Library</span>
                <span className="mt-1 block text-xs text-slate-500">
                  Read your purchased books
                </span>
              </span>
            </button>
          </aside>

          {/* Right column */}
          <div className="space-y-6">
            {/* Edit profile form */}
            <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold">Personal information</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Update the name displayed on your account.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    value={profile.name}
                    onChange={(event) => updateName(event.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="email"
                      type="email"
                      readOnly
                      value={profile.email}
                      className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Your email is read-only here. Changing your Authentication
                    email requires a separate verified flow.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Account type
                  </label>

                  <input
                    id="role"
                    type="text"
                    readOnly
                    value={profile.role}
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm capitalize text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-950"
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Your account role cannot be changed from this page.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
                  <button
                    type="submit"
                    disabled={saving || profile.name.trim() === originalName}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}

                    {saving ? "Saving changes..." : "Save changes"}
                  </button>
                </div>
              </form>
            </section>

            {/* Order history */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-3 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                    <ReceiptText className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">Order history</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Your book purchases and payment status.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={refreshOrders}
                  disabled={loadingOrders || refreshingOrders}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      loadingOrders || refreshingOrders ? "animate-spin" : ""
                    }`}
                  />
                  Refresh
                </button>
              </div>

              {!loadingOrders && !orderError && (
                <div className="flex flex-wrap gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
                  <div className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                    <p className="text-xs text-slate-500">Total orders</p>
                    <p className="mt-1 text-xl font-bold">{orders.length}</p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 px-4 py-3 dark:bg-emerald-950/30">
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Paid orders
                    </p>
                    <p className="mt-1 text-xl font-bold text-emerald-700 dark:text-emerald-300">
                      {orders.filter((order) => order.status === "paid").length}
                    </p>
                  </div>

                  <div className="rounded-xl bg-amber-50 px-4 py-3 dark:bg-amber-950/30">
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      Pending orders
                    </p>
                    <p className="mt-1 text-xl font-bold text-amber-700 dark:text-amber-300">
                      {
                        orders.filter((order) => order.status === "pending")
                          .length
                      }
                    </p>
                  </div>
                </div>
              )}

              {loadingOrders ? (
                <div className="flex items-center justify-center gap-3 p-10 text-sm text-slate-500">
                  <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
                  Loading your orders...
                </div>
              ) : orderError ? (
                <div className="p-6">
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{orderError}</p>
                  </div>

                  <button
                    type="button"
                    onClick={refreshOrders}
                    className="mt-4 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Try again
                  </button>
                </div>
              ) : orders.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                    <ShoppingBag className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 font-semibold">No orders yet</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Your book purchases will appear here.
                  </p>

                  <button
                    type="button"
                    onClick={() => router.push("/mab")}
                    className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Browse books
                  </button>
                </div>
              ) : (
                <>
                  {/* Desktop orders table */}
                  <div className="hidden overflow-x-auto sm:block">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-950/50">
                        <tr>
                          <th className="px-6 py-4 font-semibold">
                            Book / Order
                          </th>
                          <th className="px-6 py-4 font-semibold">Date</th>
                          <th className="px-6 py-4 font-semibold">Amount</th>
                          <th className="px-6 py-4 font-semibold">Status</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {orders.map((order) => {
                          const status = getOrderStatus(order.status);

                          return (
                            <tr
                              key={order.id}
                              className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                            >
                              <td className="max-w-xs px-6 py-4">
                                <p className="truncate font-semibold text-slate-800 dark:text-slate-100">
                                  {order.bookTitle}
                                </p>
                                <p className="mt-1 break-all text-xs text-slate-500">
                                  {order.orderId}
                                </p>
                              </td>

                              <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                                {formatOrderDate(order.createdAt)}
                              </td>

                              <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">
                                {order.currency}{" "}
                                {order.amount.toLocaleString("en-PK")}
                              </td>

                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${status.className}`}
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                  {status.label}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile order cards */}
                  <div className="space-y-3 p-4 sm:hidden">
                    {orders.map((order) => {
                      const status = getOrderStatus(order.status);

                      return (
                        <article
                          key={order.id}
                          className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {order.bookTitle}
                              </h3>

                              <p className="mt-1 break-all text-xs text-slate-500">
                                Order: {order.orderId}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${status.className}`}
                            >
                              {status.label}
                            </span>
                          </div>

                          <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                            <div className="min-w-0">
                              <p className="text-xs text-slate-500">
                                Order date
                              </p>
                              <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">
                                {formatOrderDate(order.createdAt)}
                              </p>
                            </div>

                            <p className="shrink-0 text-sm font-bold text-slate-900 dark:text-white">
                              {order.currency}{" "}
                              {order.amount.toLocaleString("en-PK")}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </>
              )}
            </section>
          </div>
        </div>

        <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800">
          MAB Books · Your digital reading library
        </footer>
      </div>
    </main>
  );
}
