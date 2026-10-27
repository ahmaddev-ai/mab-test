"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth";
import { auth, loginUser } from "@/firebase/config";
import { signOut } from "firebase/auth";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  ShieldCheck,
  BookOpen,
  FileText,
  BarChart3,
  Users,
} from "lucide-react";

type LoginClientProps = {
  userType: "admin" | "publisher";
};

export default function LoginClient({ userType }: LoginClientProps) {
  const router = useRouter();
  const { role, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);

  const isAdmin = userType === "admin";

  const pageTitle = isAdmin ? "Admin Portal" : "Publisher Portal";

  const pageDescription = isAdmin
    ? "Manage users, content, books and platform settings."
    : "Create, manage and publish your blogs.";

  const dashboardUrl = `/${userType}/dashboard`;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginLoading) return;

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoginLoading(true);
      setLoginAttempted(true);
      setError("");

      await loginUser(email.trim(), password);

      // Firebase Auth and the Auth context will update.
      // The useEffect below validates the role.
    } catch (e) {
      console.error("Login failed:", e);

      setError("Invalid email or password.");
      setLoginLoading(false);
      setLoginAttempted(false);
    }
  };

  useEffect(() => {
    if (authLoading || !role) return;

    if (!loginAttempted) return;

    if (role !== userType) {
      const handleWrongRole = async () => {
        setLoginLoading(true);
        setError("");

        try {
          await signOut(auth);
        } catch (e) {
          console.error("Failed to sign out:", e);
        } finally {
          setError(`This account does not have ${userType} access.`);
          setLoginLoading(false);
          setLoginAttempted(false);
        }
      };

      void handleWrongRole();
      return;
    }

    router.replace(dashboardUrl);
  }, [role, authLoading, router, userType, dashboardUrl, loginAttempted]);

  // Show the loader while authentication is being checked
  // or the current login attempt is being processed.
  if (loginLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05060a] text-white px-6">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />

          <div className="text-center">
            <h2 className="text-xl font-semibold">
              {authLoading ? "Checking Authentication" : "Signing you in..."}
            </h2>

            <p className="text-white/50 text-sm mt-2">
              Please wait while we verify your account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex bg-[#05060a] text-white">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center border-r border-white/10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-emerald-500/20 blur-[160px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />

        <div className="relative max-w-lg px-10">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              {isAdmin ? (
                <ShieldCheck size={25} className="text-emerald-400" />
              ) : (
                <BookOpen size={25} className="text-emerald-400" />
              )}
            </div>

            <span className="text-sm font-semibold tracking-[0.2em] text-white/70 uppercase">
              {isAdmin ? "Admin Access" : "Publisher Access"}
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome to
            <br />
            <span className="text-emerald-400">Mian Ahmad Basit Blog</span>
          </h1>

          <p className="mt-6 text-white/60 leading-relaxed">
            {pageDescription} Access your dedicated workspace through a secure,
            role-specific login.
          </p>

          <div className="mt-12 space-y-5">
            {isAdmin ? (
              <>
                <Feature
                  icon={<Users size={18} />}
                  text="Manage users and publishers"
                />
                <Feature
                  icon={<BookOpen size={18} />}
                  text="Manage premium books and pricing"
                />
                <Feature
                  icon={<BarChart3 size={18} />}
                  text="Monitor platform activity"
                />
              </>
            ) : (
              <>
                <Feature
                  icon={<FileText size={18} />}
                  text="Create and manage blogs"
                />
                <Feature
                  icon={<BookOpen size={18} />}
                  text="Organize your content"
                />
                <Feature
                  icon={<BarChart3 size={18} />}
                  text="Track your publishing activity"
                />
              </>
            )}
          </div>

          <div className="mt-14 pt-6 border-t border-white/10">
            <p className="text-xs text-white/40">
              Secure workspace · Authorized access only
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="relative bg-[#0a0c12] border border-white/10 rounded-3xl p-7 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {/* Mobile Branding */}
            <div className="lg:hidden text-center mb-8">
              <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                {isAdmin ? (
                  <ShieldCheck size={28} className="text-emerald-400" />
                ) : (
                  <BookOpen size={28} className="text-emerald-400" />
                )}
              </div>

              <h1 className="text-2xl font-bold text-emerald-400">
                Mian Ahmad Basit Blog
              </h1>

              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">
                {userType} workspace
              </p>
            </div>

            {/* Title */}
            <div className="mb-8">
              <p className="text-emerald-400 text-sm font-medium mb-2">
                {pageTitle}
              </p>

              <h2 className="text-3xl font-bold">Sign in</h2>

              <p className="text-white/50 text-sm mt-2">{pageDescription}</p>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-5 text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl"
              >
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor={`${userType}-email`}
                  className="text-sm text-white/70"
                >
                  Email address
                </label>

                <div className="mt-2 flex items-center bg-black/40 border border-white/10 rounded-xl px-4 focus-within:border-emerald-500/50 transition">
                  <Mail size={17} className="text-white/40 shrink-0" />

                  <input
                    id={`${userType}-email`}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-3 py-3.5 outline-none text-white placeholder:text-white/25"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor={`${userType}-password`}
                  className="text-sm text-white/70"
                >
                  Password
                </label>

                <div className="mt-2 flex items-center bg-black/40 border border-white/10 rounded-xl px-4 focus-within:border-emerald-500/50 transition">
                  <Lock size={17} className="text-white/40 shrink-0" />

                  <input
                    id={`${userType}-password`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent px-3 py-3.5 outline-none text-white placeholder:text-white/25"
                    required
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((current) => !current)}
                    className="text-white/40 transition hover:text-white/80"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full mt-8 bg-emerald-500 text-black font-semibold py-3.5 rounded-xl hover:bg-emerald-400 active:scale-[0.99] transition shadow-lg shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Lock size={17} />
                )}

                {loginLoading
                  ? "Signing in..."
                  : `Sign in as ${isAdmin ? "Admin" : "Publisher"}`}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
                <ShieldCheck size={15} />
                <span>Secure {userType} access</span>
              </div>
            </div>
          </div>

          <p className="text-center text-white/30 text-xs mt-6">
            Mian Ahmad Basit Blog · Authorized users only
          </p>
        </div>
      </div>
    </section>
  );
}

function Feature({ text, icon }: { text: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-white/70">
      <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
        {icon}
      </div>

      <span>{text}</span>
    </div>
  );
}
