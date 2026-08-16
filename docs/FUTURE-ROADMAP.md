# BVEST — Admin & Future Capabilities Roadmap

Status: **NOT IMPLEMENTED — future reference only.**

Covers: dynamic admin navigation, event management + result rollout, student-facing leaderboard (side quest), and platform-collaboration registration (Devfolio / GfG).

---

## 0. Current State (baseline)

| Area | Today |
|---|---|
| Landing data | Placeholders: `[Society Name Placeholder]`, `[Event Name Placeholder]`, `(Placeholder)` titles on goals grid + featured events |
| Schema (`prisma/schema.prisma`) | `Society` + `Preference` only. No Event, Page, Registration, Leaderboard models |
| Nav | Hard-coded `NAV_LINKS` in `src/components/SiteNav.tsx`; anchors `/#goals`, `/#featured-events`, `/#contact` |
| Admin | Login + allocations table only; no CRUD, no dashboards |
| Content routes | `/events/{n}` linked from collage + goal cards + event banners → **404 today** (styled via `src/app/not-found.tsx`) |

---

## 1. Dynamic Navigation from the Admin Panel

**Need:** Admin creates new pages; site nav must reflect them without a code deploy.

### Architecture (recommended)

1. New model `Page`:
   ```prisma
   model Page {
     id        String   @id @default(cuid())
     slug      String   @unique        // "leaderboard", "results/robo-war"
     title     String
     navLabel  String?
     order     Int      @default(0)
     showInNav Boolean  @default(true)
     adminOnly Boolean  @default(false)
     section   String   @default("main") // "main" | "portal" | "footer"
     enabled   Boolean  @default(true)
     createdAt DateTime @default(now())
   }
   ```
2. `SiteNav` becomes a **server-fed client component**: parent layout (or a `getNavLinks()` helper) queries `Page` where `enabled && showInNav`, sorts by `order`, merges with the static core links (Goals / Events / Contact anchors must **stay hard-coded** — they anchor into landing sections, not routes).
3. Admin console gains a "Pages & Navigation" manager: create, order (drag or up/down), toggle visibility, mark admin-only. Save → nav updates everywhere instantly (no rebuild).
4. Guard rails:
   - Reserve slugs: `/society/*`, `/admin/*`, `/events/*`, `/leaderboard`, `/` — reject at creation.
   - `adminOnly` links only render when an admin session cookie exists (same check as `/admin/allocations`).
   - Landing-anchor links (`/#goals`) stay static; new route-based pages are the dynamic part.

---

## 2. Event Management + Result Rollout

**Need (client request):** Admin confirms all event details → "Hosted by" + "Event name" placeholders on the landing page auto-update for the full event. Admin later rolls out results.

### Data model

```prisma
model Event {
  id               String   @id @default(cuid())
  slug             String   @unique
  title            String
  hostSocietyId    String?                          // links Society (corebvest…)
  sdgDomainId      String                           // 1–17, mirrors sdg-data
  description      String
  venue            String?
  startDate        DateTime?
  endDate          DateTime?
  bannerUrl        String?
  registrationUrl  String?                          // Devfolio / GfG / Unstop link
  status           String   @default("DRAFT")       // DRAFT | PENDING | CONFIRMED | LIVE | COMPLETED
  resultsPublished Boolean  @default(false)
  results          EventResult[]
  registrations    EventRegistration[]
  createdAt        DateTime @default(now())
}

model EventResult {
  id        String @id @default(cuid())
  eventId   String
  rank      Int
  teamName  String
  points    Int?
  event     Event @relation(fields: [eventId], references: [id])
  @@unique([eventId, rank])
}

model EventRegistration {
  id         String @id @default(cuid())
  eventId    String
  teamName   String
  memberCount Int  @default(1)
  contact    String?
  source     String @default("DEVFOLIO")           // DEVFOLIO | GEEKSFORGEEKS | INTERNAL
  externalId String?                               // platform's registration id
  event      Event @relation(fields: [eventId], references: [id])
}
```

### Admin flow

1. **Create Event** (console): title, SDG domain, host society (dropdown from `Society`), description, dates, venue, banner, status.
2. **Pending → Confirmed**: admin reviews all details, marks `CONFIRMED`. This is the single source of truth flip.
3. **Landing auto-update**: home page becomes partially dynamic —
   - Goals grid (`src/app/page.tsx`): `hostedBy` + `eventName` per SDG queried from `Event` where `sdgDomainId = n` and `status IN (CONFIRMED, LIVE)`. Keep placeholder text **only when no confirmed event exists** (graceful fallback).
   - Featured events: replace `(Placeholder)` titles/descriptions with real confirmed events (pick `status = LIVE` first, fall back to CONFIRMED, newest first). Keep the 3-card slot or convert to N-card grid.
   - `sectionData` via a small `getLandingEvents()` server helper; page stays static-eligible via caching only if data rarely changes — accept dynamic rendering instead (simpler, correct).
4. **Results rollout**: per-event "Publish Results" button (sets `resultsPublished = true`, attaches `EventResult` rows). Event cards gain a "Results Live" badge + `/events/{n}` page shows a podium/table. Badge + results respect reduced-motion.

### Notes

- One society hosts one event per SDG per edition (matches existing `Preference` allocation model).
- Winners data should be locked after publish; add `publishedAt` timestamp + optional "unpublish" with confirmation modal (mirror the preferences confirm-modal pattern).

---

## 3. Student-Facing Leaderboard (Side Quest)

**Need:** During the event, a live leaderboard page for students with proper motion.

### Route & access

- `/leaderboard` — public, no auth (event buzz surface).
- Admin pushes scores from console ("Leaderboard" section) or a coordinator quick-add UI.

### Data model

```prisma
model ScoreEntry {
  id        String   @id @default(cuid())
  eventId   String?
  teamName  String
  points    Int
  meta      String?                          // JSON: quest id, round, notes
  updatedAt DateTime @updatedAt
}
```
Or reuse `EventRegistration` + `EventResult.points` when registrations flow in. Decide at build time; simplest correct first.

### Design & animation spec (on-brand)

- Page shell matches landing: `bg-dots` backdrop, ghost `LEADERBOARD` outline word, numbered eyebrow pill, drifting orbs.
- **Top 3 podium**: entrance slide-up stagger (eyebrow → cards), rank medals pop with spring (`[0.34,1.56,0.64,1]`), crown/glow on rank 1 (sdg-color tinted).
- **Rows 4+**: staggered rise on load (30–50 ms), hairline separators, rank number in `font-mono`, points count-up on change (spring-eased, tabular-nums to avoid jitter).
- **Live updates**: poll server action every 10–15 s (or SSE); on change — row highlights (flash), automatic re-sort with FLIP motion, points re-count, subtle confetti only when rank-1 team changes (rare-tier delight).
- **Highlight "my team"**: `?team=` query param → row pinned visible with sdg-border glow + auto-scroll.
- Respect `useReducedMotion` + `motion-reduce:` everywhere (skip FLIP/count-up/confetti).
- Empty state: "No quests scored yet — check back at booth 3" style copy, still polished.

---

## 4. Team Registration via Platform Collaboration (Devfolio / GfG)

**Need:** Teams register for society events through external platforms (GeeksforGeeks, Devfolio).

### Approach

1. **Primary: external platform links.** `Event.registrationUrl` → "Register" CTA on event cards + `/events/{n}` pages (external, `target="_blank" rel="noopener"`). Hosting platforms: Devfolio (hackathons), GfG / Unstop / HackerEarth (contests). Admin pastes link per event; cards render CTA only when URL exists.
2. **Import**: coordinators export platform CSV → admin bulk-import into `EventRegistration` (source = platform). Used for: team rosters, leaderboard seeding, capacity checks.
3. **Fallback (if a platform isn't used)**: inline registration form on `/events/{n}` → server action writing `EventRegistration` with `source = "INTERNAL"`. Keep it a server action, same validation style as preferences.
4. No OAuth/API deep-integration planned — links + CSV import keep it robust across platform API churn.

---

## 5. Recommended Build Order

1. `Page` model + dynamic nav + admin Pages manager (unblocks everything else)
2. `Event` model + admin CRUD + landing auto-update (client-requested results flow)
3. `/events/{n}` dynamic page (needed by #2; replaces the 404 links point at today)
4. `EventResult` + publish flow + Results badges/pages
5. Registration URLs on events (zero-build win) → CSV import
6. `ScoreEntry` + admin score push + `/leaderboard` with motion spec above

## Constraints carried from current codebase

- Animation discipline: transform/opacity only, `ease-fluid` / `[0.22,1,0.36,1]` curves, reduced-motion honored — apply to all new motion.
- Design tokens: `hard-shell`, `hard-core`, `island-glass`, `btn-shine`, `outline-text`, `bg-dots`, `animate-drift`.
- Auth: admin via `ADMIN_PASSWORD` session; portal via society credentials — never weaken these for new surfaces.
- SQLite (`better-sqlite3` adapter) — no Postgres-specific features; avoid `@db` extensions.