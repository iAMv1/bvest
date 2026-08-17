# BVEST — Project Handoff (Agent Context)

> Last updated: 2026-08-17. Read this BEFORE touching any code.

## 1. What This Is

**BVEST** = annual technical fest of BVCOE Delhi (Bharati Vidyapeeth's College of Engineering), thematically built around the **17 UN Sustainable Development Goals (SDGs)**. Every society is assigned an SDG and hosts events in that domain.

The site is a Next.js marketing site + society/admin portal:
- Public landing (`/`) — hero, about, 17-goal bento grid, featured events, sponsors, footer
- Society portal — `/society/login` → `/society/preferences` (pick 3 ranked domain preferences, submit, locked)
- Admin console — `/admin/login` → `/admin/allocations` (read-only table of submitted preferences)

**Status:** production-ready lean v1. Admin capabilities roadmap documented in `docs/FUTURE-ROADMAP.md` (NOT implemented).

## 2. Stack & Versions (check package.json before assuming)

- **Next.js 16** (App Router, Server Components default), TypeScript strict
- **Tailwind CSS v4** (`@tailwindcss/postcss`, `@theme inline` tokens in `globals.css`)
- **framer-motion** (Motion) — entry reveals, intro curtain, magnetic CTAs, modal
- **Prisma + better-sqlite3** (SQLite) — `Society` + `Preference` models
- **iron-session** — session cookies (Society ID / isAdmin)
- **bcryptjs** — password hashing
- Fonts via `next/font`: Space Grotesk (`--font-heading`) + Plus Jakarta Sans (`--font-sans`)

## 3. Commands

```bash
npm run dev            # dev server (port 3000)
npm run build          # production build
npm run lint           # eslint (0 errors required; 2-3 baseline warnings OK)
npx tsc --noEmit       # typecheck
```

**Seed** (must run from repo root; ts-node on PowerShell mangles quotes otherwise):
```powershell
$env:DATABASE_URL="file:./dev.db"; npx ts-node --compiler-options '{\"module\":\"CommonJS\"}' prisma/seed.ts
```

**DB schema sync:** `npx prisma db push` (no migrations in repo; DB = root `dev.db`).
**CRITICAL:** `DATABASE_URL` must be `file:./dev.db` — the default `file:./prisma/dev.db` points at a nonexistent file. Set it in `.env.local` for every runtime (dev server, seed, e2e).

## 4. Environment (`.env.local` — do not commit)

```
DATABASE_URL="file:./dev.db"
SESSION_SECRET=<64 hex chars>
ADMIN_PASSWORD=<admin password>
```

`.env.example` documents shape; `.env.local` does NOT exist in repo (create locally).

## 5. Theme System (LIGHT + DARK — the crown jewel, read fully)

### 5.1 Mechanism
- `src/components/ThemeProvider.tsx` — client context: `theme` ("light"|"dark"), `preference` (+"system"), `setPreference`. Persists `bvest-theme` in localStorage. Boot reads storage inside `requestAnimationFrame` (repo rule: NO synchronous setState-in-effect).
- No-flash inline script in `layout.tsx` `<head>` + `global-error.tsx` `<head>` — sets `html.dark` + `color-scheme` before hydration.
- Toggle button in `SiteNav` (sun/moon morph, AnimatePresence).
- **Default = system preference** (dark when unspecified).

### 5.2 Design tokens (globals.css — ALWAYS use tokens, never hardcode)
Light root vars: `--background: #F5F6F8` (cool neutral canvas — NOT white, NOT warm beige), `--ink: #17150F`, `--ink-soft`, `--stroke` (0.1), `--stroke-strong` (0.18), `--glass: rgba(255,255,255,0.85)`, `--glass-stroke`, `--dots`, `--ghost-stroke`, `--bezel`, `--island-shadow`. `.dark` overrides all.
- `.dark` class on `<html>` drives Tailwind `dark:` variants AND the dark token block.

### 5.3 SDG palette (the brand colors)
17 tokens in `@theme`: `sdg1 #E5243B` (red) … `sdg17 #19486A` (navy), plus `sdg6 #26BDE2` (cyan = primary accent), `sdg7 #FCC30B` (amber warm accent), `sdg10 #DD1367` (rose alert accent). Use `bg-sdgX/N`, `from-sdgX`, `text-sdgX`, etc.
Light mode uses SDG-colored section washes (About = sdg6/5, Goals = sdg7/7, Events = sdg10/5, Sponsors = sdg11/9) + login canvases tinted (society = cyan `#EAF4F7`, admin = violet `#F0EDF6`). Dark = black + orbs.

### 5.4 CRITICAL Tailwind v4 gotchas (both fixed — do not regress)
1. **Class-based `dark:` variant.** Tailwind v4 defaults `dark:` to `prefers-color-scheme` (OS). This project toggles `.dark` on `<html>` — globals.css MUST keep `@custom-variant dark (&:where(.dark, .dark *));` at the top. Without it every `dark:` utility silently dies (ink text on black = invisible; fixes round 2026-08-17).
2. **Gradient position.** Tailwind v4 emits `to right in oklab` — rejected by Chrome/Edge <111, FF <113, Safari <16.4 → `bg-clip-text text-transparent` goes INVISIBLE. globals.css re-emits `.bg-gradient-to-r/b/t` with classic `--tw-gradient-position` (no `in oklab`). Do not remove.

### 5.5 Light-mode rules (from design review)
- Body text = `text-stone-950` on light (near-black, ~17:1). Never `stone-500`/`gray-400` for content text.
- Every color utility needs a `dark:` pair (page has ONE theme per mode; no mixed inversions).
- Hover on dark-ink text = `hover:text-sdg6` (was no-op).
- Placeholders `placeholder:text-stone-700` (visible but distinct from input text).
- Logo: `logo.png` = WHITE artwork (dark surfaces only); `logo-dark.png` = ink artwork (light surfaces). Auto-switch in `BvestLogo` via `useTheme`; `variant="dark-on-dark"` FORCES white art for dark-only surfaces (IntroOverlay). Never put the white logo on a light surface (invisible).
- Logo dark facets: `e2e/make-logo-dark.js` backs up pristine art to `e2e/logo-original.png`, lifts dark SDG facets (navy/deep-blue `v<0.62 → 0.66`) so the V reads on black, then derives the ink variant. Re-run after any artwork swap.
- Intentional dark surfaces in BOTH modes: IntroOverlay curtain only. Everything else (footer, logins, tables) is themed.
- `.outline-text` (editorial ghost display; `--ghost-stroke` light .28 / dark .22) + `.ghost-faint` (giant watermarks, .10 both) — both token-driven.
- UPDATED 2026-08-17 (user decision): sponsors + footer chips are INTENTIONAL template markers — `[Sponsor Logo N]` text + `[TODO: Twitter]`-style chips, filled when client supplies data. DO NOT replace with icons/monograms without asking.
- FestTicker text = solid (`text-stone-950/80 dark:text-gray-200/90`), not outline.
- **No route `loading.tsx`** — deleted 2026-08-17. Only the first-load IntroOverlay splash exists (dark curtain, ~2.75s). Do not re-add a route loader.
- **SiteNav behavior**: scroll progress hairline (SDG gradient @ top), island hides on scroll-down / reveals on scroll-up (past 480px; reduced-motion exempt), solidifies past 24px (shadow deepens), theme toggle at OUTER right edge after the CTA. Matches `BackToTop` (floating, conic progress ring via `--ring-track` token).
- SiteNav 2026-08-17 refresh: ALL 5 links incl. Contact (was sliced off — regression), CTA "Explore Events" → `/#featured-events` (was `/#goals` — wrong section), CTA `hidden lg:inline-flex` (was md — overflow at 768–1023px clipped the toggle), island `pr-4` + `shrink-0` controls (toggle no longer bites the pill curve). Verified 768–1440 no overflow (probe since removed).
- Section rhythm (2026-08-17, user: "spacing too high"): hero `pt-24 md:pt-28`, About `py-20 md:py-24`, Goals `py-20 md:py-24`, Events `py-24 md:py-28`. Sponsors unchanged.
- **SDG collage idle bob**: `.sdg-bob` wrapper keyframes (globals; disabled under `prefers-reduced-motion: reduce`); framer entrance/hover stay on inner element so transforms never conflict.
- Hero has TWO button variants (normal + reduced-motion branch) — BOTH must carry full light/dark pairs (missed once → white-on-white invisible capsule).
- Login pages 2026-08-17: left panels/steps/status lines had `animationDelay` with NO animation class (dead code). Now `animate-rise-in` + stagger. ErrorShell content also `animate-rise-in`.
- **BackdropAurora (hero-only, 2026-08-17, user: "no aurora in other sections")**: `src/components/BackdropAurora.tsx` mounted in page.tsx hero `absolute inset-0 z-[1]` — cursor-tracked cyan+amber radial glows (springs `stiffness 100, damping 21, mass 0.8`, window-level mousemove via ref rect — element is `pointer-events-none`, onMouseMove would never fire), `useMotionTemplate` radial gradients per layer, scroll parallax (`parallax` prop = px drift @1000px scroll, hero 55 → -66px @scrollY 1200 verified), settles home on leave, `prefers-reduced-motion` → static glows (no listener, no parallax). Layer transforms live in child `AuroraLayer` component (hooks-in-loop = eslint error, do not move back). Generic (props: layers/home/parallax) but only hero uses it. Do NOT attach handlers to the div itself.
- Section backdrops (2026-08-17): token-driven textures — `.bg-grid` (44px engineering grid, `--grid-line`) in Goals + Events; `.bg-rings` (720px concentric signal rings, `--dots`) in About; `.bg-dots` everywhere + tuned orbs. `--grid-line` light `rgba(23,21,15,.05)` / dark `rgba(255,255,255,.06)`.
- Ghost display text seams (2026-08-17): Goals/Events ghosts now `-top-6/-8 md:-top-10/-12` + `[mask-image:linear-gradient(to_bottom,black_45%,transparent_85%)]` so they dissolve before the heading; footer watermark gets radial mask (transparent center 30%, black 72% edge) + `--ghost-faint-stroke` dropped .10→.08 both themes. Verified by vision: no collisions light+dark.
- **Portal redesign (2026-08-17, user: "make design better of society portal + admin dashboard")**: society picker page + locked receipt view + admin allocations console rebuilt. Design DNA carried from login pages: hard-shell/glass, mono uppercase eyebrow chips, ghost display words (PRIORITY / SEALED / LEDGER), rank-progress rail (R1→R2→R3 segments w/ domain-color fills), console domain-id tags on cards, admin ledger table with domain pills + pulse status chips + All/Pending/Locked filter tabs (`?status=` searchParams, server-side). Verified 6 render shots via vision (both themes + locked) + flow/theme green.
- **Admin registry + program (2026-08-17, user request: admin creates society ID/password; events hosted by combined-group societies)**: schema `+Society.kind ("SOCIETY"|"GROUP")` + `Society.memberIds` (JSON member ids) + `Event` model (no EventResult yet). New admin pages `/admin/societies` (create society/group + bcrypt-12 hash, reset password per row, duplicate/id/name/password validation via `?error=`) and `/admin/events` (create event: slug, SDG domain, host society/group dropdown, venue/dates/status/registrationUrl). Shared `AdminNav` (Console/Societies/Events pills) on all three admin pages. Actions: `src/app/admin/{societies,events}/actions.ts` ("use server"; validation redirects). Groups = one ID+password shared by member societies of an event; login works identically. NOTE: `prisma db push` then RESTART dev server before e2e — runtime client caches old schema (stale `kind` error otherwise).
- **Registry semantics (2026-08-17, user: "single societies not participating — groups only")**: participating units = `kind: GROUP` only. Member societies (`kind: SOCIETY`) = pool records (login blocked → `/society/login?error=group-only` "Member societies don't participate directly"). Registry form type select: "Collaboration group — participates" / "Member society — pool only, no login"; events host dropdown filters `kind=GROUP` only. Seed corebvest now `kind: GROUP` (committee participates; e2e flows unchanged).
- **db-reset fix (2026-08-17)**: `e2e/db-reset.js` + `db-check.js` targeted `file:./dev.db` (root) but app reads `prisma/dev.db` — resets silently never applied (caused lock-state flakes). Both now `file:./prisma/dev.db` (flow-test asserts exactly 1 society row — probe data must be cleaned before running).
- **Repo cleanup (2026-08-17, user request "clean repo, remove our test files")**: all our scratch probes/sweeps/screenshots removed from `e2e/` + `e2e/shots/` (probe-*.js, vision-sweep, login-shots, light-sweep, theme-check, make-logo-dark, db-clean-probes, dev-server.log). CLONE-ORIGINAL e2e harness retained: `flow-test.js`, `db-reset.js`, `db-check.js`. Dev-server log now writes to `%TEMP%\bvest-dev.log` (not repo). Seed credentials note moved to `docs/seeds-plaintext.txt` (gitignored).
- **Chained-run flake (2026-08-17)**: back-to-back flow+theme in one shell occasionally fails (locked-view heading + society login) — dev recompile lag + intro-overlay timing on fresh pages. Isolated re-runs pass 13/13 + 5/5. Run tests isolated with `db-reset` + `Start-Sleep 2` between.

## 6. Architecture Map

```
src/app/
  layout.tsx            Root: ThemeProvider > IntroProvider > IntroOverlay > SiteNav > children > BackToTop > noise
  page.tsx              Landing (6 sections: Hero / About / 17-goal bento / Events / Sponsors / Footer)
  template.tsx          Motion page template
  not-found.tsx error.tsx global-error.tsx   (no route loading.tsx — deleted)
  society/login/page.tsx        Server action login (iron-session) → redirect /preferences
  society/preferences/page.tsx  Server page; locked view + PreferencePicker
  society/preferences/PreferencePicker.tsx   Client: 3-rank picker, sticky summary, confirm modal
  admin/login/page.tsx          Server action login (ADMIN_PASSWORD)
  admin/allocations/page.tsx    Auth-gated table of preferences
src/components/
  ThemeProvider.tsx     theme context (5.1)
  IntroOverlay.tsx      dark curtain splash (~2.75s; reduce-motion safe; replay on hard load)
  IntroContext.tsx      intro completion state
  SiteNav.tsx           floating glass island; pathname-gated CTA (hidden on /society/*, /admin/*); theme toggle; mobile overlay
  Hero.tsx              left text + right SDG floating tiles; Magnetic CTAs
  BvestLogo.tsx         white/ink auto artwork (5.5)
  SocietyBackgroundGraphic.tsx  login marquee watermarks
  FestTicker.tsx        marquee strip
  Reveal.tsx  Magnetic.tsx  StatCounter.tsx  PasswordInput.tsx  SubmitButton.tsx  ErrorShell.tsx  SDGColorStrip.tsx  SDGColorWheel.tsx (unused)  SDGBadge.tsx
src/lib/  db.ts (Prisma client) · session.ts (iron-session opts) · domains.ts (17 SDG data)
prisma/schema.prisma   Society(id, name, password, locked, submittedAt) / Preference(id, societyId, domainId, rank)
e2e/                   Playwright harness (clone-original, kept):
  flow-test.js         13 assertions: society error→happy→locked; admin; home; #goals anchor; mobile overlay; zero JS errors
  db-reset.js          resets DB (unlocks societies, clears preferences)
  db-check.js          verifies reset state
  debug-login.js  check-errors.js  clone-original diagnostics (unmodified)
```

## 7. Motion Rules

- Behavior-gated: every animation respects `useReducedMotion` (no-op/instant under reduce).
- Intro overlay replays every HARD load (~2.75s) — accepted behavior.
- Ease tokens: `--ease-fluid` (0.32,0.72,0,1), `--ease-out-expo`. Springs for micro-feedback (`active:scale-[0.96]`).
- Scroll reveals via `Reveal` component; magnetic via `Magnetic` (motion values, not state).
- Repo lint rule: NO synchronous setState in effects (use rAF/cb pattern).

## 8. Known Issues / Traps

1. **Stale prod build syndrome** — `npm run build` regenerates `.next`; `npm run start` serves the OLD build until rebuilt. For live iteration use `npm run dev`. After any theme change: rebuild before `next start`. Also: STOP the dev server before `next build` (they share `.next`; builds while dev runs corrupt the dev server).
2. **`dark:` variant death** — if dark mode ever renders light-text colors, check `@custom-variant dark` line in globals.css first (see 5.4).
2. `better-sqlite3` needs `npm rebuild better-sqlite3` after fresh install (prebuilt binary fetch).
3. `/events/{n}` routes DO NOT exist — goal/event links 404 (styled 404; roadmap step 3).
4. Admin/society auth requires `ADMIN_PASSWORD` + `SESSION_SECRET` or login redirect-loops.
5. Logo art is AI-generated PNG; light variant (`logo-dark.png`) produced by recolor script (script removed in 08-17 cleanup — regenerate manually if needed).
6. `prefers-color-scheme: light` + no stored pref → LIGHT theme instantly (verify both).

## 9. Git

- Origin: `https://github.com/iAMv1/bvest.git` (public), branch `main`.
- `.gitignore`: `designs/`, `e2e/shots/`, `dev.db*`, `.env*.local` (`.env.example` force-added).
- Do NOT commit without explicit user request. User explicitly said "don't push" (2026-08-17).

## 10. Design Direction (user's latest word, 2026-08-17)

- "Light mode does NOT mean white background." Theme IS the SDG goals — light mode must carry SDG color atmosphere (section washes, tinted canvases, colored accents). Dark mode = ethereal black glass; light mode = SDG-colored daylight, same hierarchy.
- Contrast complaints resolved via: near-black ink text, token strokes 0.1+, glass 0.85 white, oklab-free gradients. Do not soften.
- $150k-agency-tier target: no template look, everything behavior-gated, both themes verified per component.

## 11. Verification Checklist (before declaring done)

1. `npm run lint` 0 errors · `npx tsc --noEmit` clean · `npm run build` succeeds
2. `node e2e/db-reset.js` then `node e2e/flow-test.js` → 13/13 PASS, zero JS errors
3. Replace `e2e/shots/` with fresh screenshots; eyeball washes, ink text, logo variant
4. Spot-check dark mode after ANY light change (dark: pairs)
5. If prod server was used: rebuild AFTER theme changes