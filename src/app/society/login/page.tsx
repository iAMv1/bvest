export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { getIronSession } from "iron-session";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import type { SessionData } from "@/lib/session";
import { sessionOptions } from "@/lib/session";
import { checkRateLimit } from "@/lib/rate-limit";

// ── Server Action ─────────────────────────────────────────────────────────────
async function login(formData: FormData) {
  "use server";

  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown").slice(0, 64);
  const rl = checkRateLimit(`society-login:${ip}`, 8, 15 * 60 * 1000);
  if (!rl.allowed) redirect("/society/login?error=rate_limited");

  const societyId = ((formData.get("societyId") as string | null)?.trim() ?? "").toLowerCase();
  const password = (formData.get("password") as string | null) ?? "";

  if (!societyId || !password) {
    redirect("/society/login?error=missing");
  }

  const society = await prisma.society.findUnique({ where: { id: societyId } });

  if (!society) {
    // still burn bcrypt to keep timing uniform (≈ 12 rounds)
    await bcrypt.compare(password, "$2a$12$aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    redirect("/society/login?error=invalid");
  }

  const valid = await bcrypt.compare(password, society.password);
  if (!valid) {
    redirect("/society/login?error=invalid");
  }

  if (society.kind !== "GROUP") {
    redirect("/society/login?error=group-only");
  }

  // Regenerate session to prevent fixation
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  await session.destroy();
  const fresh = await getIronSession<SessionData>(cookieStore, sessionOptions);
  fresh.societyId = society.id;
  await fresh.save();

  redirect("/society/preferences");
}
// ─────────────────────────────────────────────────────────────────────────────

import { SocietyBackgroundGraphic } from "@/components/SocietyBackgroundGraphic";
import { BvestLogo } from "@/components/BvestLogo";
import { PasswordInput } from "@/components/PasswordInput";
import { SubmitButton } from "@/components/SubmitButton";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

const STEPS = [
  { n: "01", title: "Select", desc: "Pick your society's 3 domain preferences" },
  { n: "02", title: "Review", desc: "Rank-order and review before submitting" },
  { n: "03", title: "Lock", desc: "Submit — choices are final and locked" },
];

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  const errorMessage =
    error === "missing"
      ? "Please enter your Society ID and password."
      : error === "invalid"
      ? "Invalid Society ID or password. Please try again."
      : error === "group-only"
        ? "Member societies don't participate directly — log in with your collaboration group's ID & password."
        : error === "rate_limited"
          ? "Too many attempts — try again in a few minutes."
          : null;

  return (
    <div className="relative flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 overflow-hidden bg-[#EAF4F7] dark:bg-black">
      {/* Dynamic Tilted Society Names Background Graphic */}
      <SocietyBackgroundGraphic />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-center">
        {/* ── Left: brand flow panel ── */}
        <div className="hidden lg:flex flex-col gap-10 pr-6 animate-rise-in">
          <div className="flex flex-col gap-6">
            <BvestLogo size={120} />
            <p className="text-2xl font-heading font-semibold text-stone-950 dark:text-white leading-snug max-w-md">
              Your society&apos;s voice in{" "}
              <span className="bg-gradient-to-r from-sdg6 to-sdg3 bg-clip-text text-transparent">
                BVEST 2026
              </span>
            </p>
            <p className="text-sm text-stone-950 dark:text-gray-400 leading-relaxed max-w-sm">
              Sign in with your society credentials to lock in your official UN SDG domain preferences.
            </p>
          </div>

          {/* Three-step flow */}
          <div className="flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className="group animate-rise-in flex items-center gap-4 transition-transform duration-300 ease-fluid hover:translate-x-1.5 motion-reduce:hover:translate-x-0"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <span className="outline-text font-heading text-3xl font-black tabular-nums w-12 shrink-0 transition-all duration-300 ease-fluid group-hover:[-webkit-text-stroke:1px_rgba(23,21,15,0.35)] dark:group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.35)]">
                  {step.n}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-stone-950 dark:text-white">{step.title}</span>
                  <span className="text-xs text-stone-950 dark:text-gray-500">{step.desc}</span>
                </div>
                <span className="ml-auto h-px w-10 bg-gradient-to-r from-black/25 dark:from-white/25 to-transparent transition-all duration-300 ease-fluid group-hover:w-16 group-hover:from-sdg6/80 dark:group-hover:from-sdg6/80" />
              </div>
            ))}
          </div>

          <p className="text-[11px] text-stone-950 dark:text-gray-600 animate-rise-in" style={{ animationDelay: "270ms" }}>
            Credentials are issued by the BVEST organizing committee.
          </p>
        </div>

        {/* ── Right: glass login card ── */}
        <div className="w-full max-w-md lg:justify-self-center">
          <div className="animate-card-in hard-shell !rounded-[2rem] bg-gradient-to-b from-black/10 to-black/[0.02] dark:from-white/10 dark:to-white/[0.02] shadow-[0_24px_80px_rgba(23,21,15,0.18)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            <div className={`hard-core !rounded-[calc(2rem-1.5px)] bg-white/85 dark:bg-black/60 backdrop-blur-2xl p-8 md:p-10 relative overflow-hidden ${errorMessage ? "animate-shake" : ""}`}>
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sdg6/60 dark:via-blue-400/50 to-transparent" />

              <div className="mb-8">
                <h1 className="font-heading text-3xl font-bold text-stone-950 dark:text-white mb-2">
                  Society Portal Login
                </h1>
                <p className="text-sm text-stone-950 dark:text-gray-400 leading-relaxed">
                  Sign in to continue to the domain preference flow.
                </p>
              </div>

              <form action={login} className="space-y-5">
                {/* Society ID */}
                <div>
                  <label
                    htmlFor="societyId"
                    className="block text-xs font-semibold text-stone-900 dark:text-gray-300 uppercase tracking-wider mb-2"
                  >
                    Society ID
                  </label>
                  <input
                    id="societyId"
                    name="societyId"
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="e.g. corebvest, ieee, etc."
                    className="w-full px-4 py-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-stone-950 dark:text-white placeholder:text-stone-700 dark:placeholder:text-gray-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/40 transition-all duration-200 ease-fluid"
                  />
                </div>

                {/* Password */}
                <PasswordInput id="password" name="password" label="Password" />

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
                <SubmitButton label="Sign In to Portal" pendingLabel="Signing in…" />
              </form>
            </div>
          </div>

          {/* Mobile fallback hint */}
          <p className="lg:hidden text-center text-xs text-stone-950 dark:text-gray-600 mt-6">
            Credentials are issued by the BVEST organizing committee.
          </p>
        </div>
      </div>
    </div>
  );
}