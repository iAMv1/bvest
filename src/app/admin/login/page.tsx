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
import { PasswordInput } from "@/components/PasswordInput";
import { SubmitButton } from "@/components/SubmitButton";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

const STATUS_LINES = [
  { label: "SOCIETIES REGISTERED", value: "30+", live: true },
  { label: "ALLOCATION ENGINE", value: "STANDBY", live: true },
  { label: "SESSION", value: "AUTH REQUIRED", live: false },
];

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  const errorMessage =
    error === "missing"
      ? "Please enter the admin password."
      : error === "invalid"
      ? "Access denied — invalid master password."
      : null;

  return (
    <div className="relative flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 overflow-hidden bg-[#F0EDF6] dark:bg-black">
      {/* Dynamic Tilted Society Names Background Graphic */}
      <SocietyBackgroundGraphic />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-center">
        {/* ── Left: console panel ── */}
        <div className="hidden lg:flex flex-col gap-10 pr-6 animate-rise-in">
          <div className="flex flex-col gap-6">
            <h1 className="font-heading text-4xl font-bold text-stone-950 dark:text-white leading-tight">
              Allocation
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                Console
              </span>
            </h1>
            <p className="text-sm text-stone-950 dark:text-gray-400 leading-relaxed max-w-sm font-mono">
              Review, manage, and monitor society domain allocations across technical & non-technical societies of BVCOE Delhi.
            </p>
          </div>

          {/* Console status readouts */}
          <div className="flex flex-col divide-y divide-black/5 dark:divide-white/5 border border-black/10 dark:border-white/10 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-sm overflow-hidden">
            {STATUS_LINES.map((line, i) => (
              <div
                key={line.label}
                className="animate-rise-in flex items-center justify-between px-5 py-3.5 font-mono text-xs transition-colors duration-200 ease-fluid hover:bg-black/5 dark:hover:bg-white/5"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <span className="tracking-widest text-stone-950 dark:text-gray-500">{line.label}</span>
                <span className="flex items-center gap-2 text-stone-800 dark:text-gray-200">
                  <span className="text-violet-600 dark:text-violet-300">{line.value}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${line.live ? "bg-emerald-500 dark:bg-emerald-400 animate-pulse" : "bg-gray-400 dark:bg-gray-600"}`} />
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-stone-950 dark:text-gray-600 font-mono tracking-widest animate-rise-in" style={{ animationDelay: "270ms" }}>
            AUTHORIZED PERSONNEL ONLY &middot; BVEST ADMIN CONSOLE
          </p>
        </div>

        {/* ── Right: glass login card ── */}
        <div className="w-full max-w-md lg:justify-self-center">
          <div className="animate-card-in hard-shell !rounded-[2rem] bg-gradient-to-b from-black/10 to-black/[0.02] dark:from-white/10 dark:to-white/[0.02] shadow-[0_24px_80px_rgba(23,21,15,0.18)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            <div className={`hard-core !rounded-[calc(2rem-1.5px)] bg-white/85 dark:bg-black/60 backdrop-blur-2xl p-8 md:p-10 relative overflow-hidden ${errorMessage ? "animate-shake" : ""}`}>
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 dark:via-violet-400/50 to-transparent" />

              <div className="mb-8">
                <h1 className="font-heading text-3xl font-bold text-stone-950 dark:text-white mb-2">
                  Admin Portal
                </h1>
                <p className="text-sm text-stone-950 dark:text-gray-400 leading-relaxed">
                  Authenticate to open the allocation console.
                </p>
              </div>

              <form action={login} className="space-y-5">
                {/* Password */}
                <PasswordInput
                  id="password"
                  name="password"
                  label="Master Password"
                  mono
                />

                {/* Error */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="animate-error-in flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-sm"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-red-500 dark:text-red-400"
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

                {/* Submit — pending spinner + nested arrow */}
                <SubmitButton
                  label="Authenticate & Access"
                  pendingLabel="Authenticating…"
                  variant="console"
                />
              </form>
            </div>
          </div>

          {/* Mobile fallback hint */}
          <p className="lg:hidden text-center text-xs text-stone-950 dark:text-gray-600 mt-6 font-mono tracking-widest">
            AUTHORIZED PERSONNEL ONLY
          </p>
        </div>
      </div>
    </div>
  );
}