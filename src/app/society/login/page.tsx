export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import type { SessionData } from "@/lib/session";
import { sessionOptions } from "@/lib/session";

// ── Server Action ─────────────────────────────────────────────────────────────
async function login(formData: FormData) {
  "use server";

  const societyId = (formData.get("societyId") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (!societyId || !password) {
    redirect("/society/login?error=missing");
  }

  const society = await prisma.society.findUnique({ where: { id: societyId } });

  if (!society) {
    redirect("/society/login?error=invalid");
  }

  const valid = await bcrypt.compare(password, society.password);
  if (!valid) {
    redirect("/society/login?error=invalid");
  }

  // Set session cookie
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  session.societyId = society.id;
  await session.save();

  redirect("/society/preferences");
}
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  const errorMessage =
    error === "missing"
      ? "Please enter your Society ID and password."
      : error === "invalid"
      ? "Invalid Society ID or password. Please try again."
      : null;

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-10">
          <div className="mb-8">
            <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Society Login
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Use the credentials issued to your society by the BVEST team.
            </p>
          </div>

          <form action={login} className="space-y-5">
            {/* Society ID */}
            <div>
              <label
                htmlFor="societyId"
                className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5"
              >
                Society ID
              </label>
              <input
                id="societyId"
                name="societyId"
                type="text"
                autoComplete="username"
                required
                placeholder="e.g. corebvest"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent transition-all"
              />
            </div>

            {/* Error */}
            {errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-sm"
              >
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0"
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
              className="w-full py-3 px-6 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg duration-200 text-sm"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-6">
          Credentials are issued by the BVEST organizing committee.
        </p>
      </div>
    </div>
  );
}
