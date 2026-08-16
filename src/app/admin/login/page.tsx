export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import type { SessionData } from "@/lib/session";
import { sessionOptions } from "@/lib/session";

// ── Server Action ─────────────────────────────────────────────────────────────
async function login(formData: FormData) {
  "use server";

  const password = (formData.get("password") as string | null) ?? "";
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!password) {
    redirect("/admin/login?error=missing");
  }

  if (!correctPassword || password !== correctPassword) {
    redirect("/admin/login?error=invalid");
  }

  // Set session cookie
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  session.isAdmin = true;
  await session.save();

  redirect("/admin/allocations");
}
// ─────────────────────────────────────────────────────────────────────────────

import { SocietyBackgroundGraphic } from "@/components/SocietyBackgroundGraphic";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  const errorMessage =
    error === "missing"
      ? "Please enter the admin password."
      : error === "invalid"
      ? "Invalid password. Please try again."
      : null;

  return (
    <div className="relative flex-1 h-[calc(100vh-4rem)] flex items-center justify-center px-4 overflow-hidden bg-black">
      {/* Dynamic Tilted Society Names Background Graphic */}
      <SocietyBackgroundGraphic />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 p-8 md:p-10 relative overflow-hidden">
          {/* Subtle top accent gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[11px] font-bold uppercase tracking-widest mb-3">
              <span>Admin Access</span>
            </div>
            <h1 className="font-heading text-3xl font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Review, manage, and monitor society domain allocations across technical & non-technical societies of BVCOE Delhi.
            </p>
          </div>

          <form action={login} className="space-y-5">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5"
              >
                Admin Master Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-800 bg-black/60 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Error */}
            {errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-sm"
              >
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              id="login-submit"
              className="w-full py-3.5 px-6 bg-white text-black hover:bg-gray-200 font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg duration-200 text-sm cursor-pointer"
            >
              Authenticate & Access &rarr;
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Authorized personnel only &middot; BVEST Admin Console
        </p>
      </div>
    </div>
  );
}
