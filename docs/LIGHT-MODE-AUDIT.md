# BVEST — Light Mode Audit

Goal: add an SDG-inspired light theme. This doc lists every dark-hardcoded surface that would break with light mode, and the strategy to make theming safe.

## 0. The good news (already theme-aware)

- `globals.css` already defines `:root` light tokens (`--background: #FAFAF8`, `--foreground: #1A1A1A`) + `.dark` overrides, and `body` consumes them via `var()`. Foundation exists.
- `src/app/admin/allocations/page.tsx` is fully paired (`bg-gray-50 dark:bg-gray-800`, `white dark:bg-gray-900`, `green-100 dark:bg-green-900`...) — the reference pattern.
- `SocietyBackgroundGraphic` marquees already use light-first + `dark:` overrides.
- Most section headings already use `text-gray-900 dark:text-white`.
- SDG goal icons (`E-WEB-Goal-*.png`) are official UN colored tiles — theme-neutral.
- SDG brand colors are saturated; white text on them works in both themes.

## 1. Kill switches (hard blocks before anything else)

| File | Issue |
|---|---|
| `src/app/layout.tsx:27` | `className="... dark"` — theme is **hard-locked to dark**. No toggle, no localStorage, no system pref. |
| `src/app/global-error.tsx` | Own `<html className="dark">` — must follow theme too (or stay dark, see §6). |
| `IntroOverlay` | Brand curtain `bg-black` + `bg-[#060D17] dark:bg-[#04080F]` — cinematic moment; recommend **always dark** (see §6). |

## 2. CSS utilities hardcoded dark (globals.css)

| Utility | Dark-only value | Light needs |
|---|---|---|
| `.bg-dots` (line 142) | `rgba(255,255,255,0.07)` dots | `rgba(26,26,26,0.07)` — invisible on light |
| `.outline-text` (line 136) | white 8% stroke | `rgba(26,26,26,0.08)` ink stroke |
| scrollbar (112–124) | track/thumb `#050505` + white thumb | ink-on-light variants |
| `::selection` (130) | `color: #fff` | ink color |
| `.island-glass` (228) | white glass + dark shadow | dark-tinted glass (`rgba(26,26,26,0.06)` border `rgba(26,26,26,0.1)`), lighter shadow |
| `.hard-shell` (213) | base = white bezel (fine dark-only, wrong on light) | light bezel = ink gradient; `.dark` override already exists (219) — **invert the pattern** |
| `.hero-dot-grid` (74–89) | — | ✓ already themed both (copy this pattern) |
| `.noise-overlay`, `.btn-shine::before` | — | ✓ theme-safe |

## 3. Component surfaces hardcoded dark (no `dark:` at all)

| File | Count | Key offenders |
|---|---|---|
| `PreferencePicker.tsx` | ~37 | `bg-[#0B0B0C]`/`bg-[#101012]` cards, `text-white` titles, `bg-white/10 text-white` selected chip, dashed `border-white/15` spots, modal scrim `bg-black/70`, `from-white/10` shell |
| `SiteNav.tsx` | ~16 | link `text-white/90` + full-white hover, mobile overlay `bg-black/85`, hamburger `bg-white/5 border-white/10`, CTA arrow chip `bg-black/10` |
| `society/login` + `admin/login` | ~32 | full-bleed `bg-black` zones, status rows `divide-white/5`, cards `from-white/10 to-white/[0.02]`, `shadow rgba(0,0,0,0.6)` |
| `Hero.tsx` | ~14 | secondary island-glass CTA `text-white`, secondary text `text-gray-300`, CTA icon chips `bg-white/10` |
| `page.tsx` landing | 67 (6 dark:) | goal/event cards `bg-[#0B0B0C]`, eyebrow pills `bg-white/5 border-white/10`, bands `bg-white/[0.02] border-white/5`, ghost numerals fine (SDG color), footer `bg-black` + `bg-white/4` glow |
| `PasswordInput.tsx` | 7 | `text-white` input, `border-white/10 bg-white/5`, `placeholder:text-gray-500` |
| `StatCounter.tsx` | 2 | `text-white` display values |
| `ErrorShell.tsx` | 11 | pills `bg-white/5 border-white/10`, secondary CTA `border-white/15 text-white` |
| `FestTicker.tsx` | 2 | band `border-white/5 bg-white/[0.02]` + `outline-text` wordmark (invisible on light) |
| `loading.tsx` | 4 | white hairline rings |
| `SDGColorWheel.tsx` | 3 | tooltip `bg-gray-950/95 text-white border-white/10` |
| `SubmitButton.tsx` | 2 | arrow chip `bg-black/10` (inside white button — actually fine both) |
| `society/preferences/page.tsx` | 16 | locked rows `bg-[#0B0B0C]`, rank chips `text-white` on SDG color (fine), pills |

## 4. Overlay-on-image chips — KEEP dark in both themes

`SDGBoxCollage` arrow chip (`bg-black/55`), event date chip (`bg-black/45`) sit on colorful photo tiles — they're image overlays, not theme surfaces. Keep as-is.

## 5. Assets

- `public/logo.png` (261 KB) — likely white/light artwork on transparency. **Invisible on light background** (nav island + intro). Action: produce a dark-ink variant (or apply CSS `brightness(0)`/SVG swap) gated by theme.
- SDG goal PNGs — neutral ✓.

## 6. Design decisions to make (flagged, not blocked)

1. **Admin console + society brand panel** (`bg-black` zones on login pages): keep as intentional dark zones inside a light page (premium contrast band), or fully light-adapt. Recommend: keep dark — console identity.
2. **IntroOverlay curtain**: always dark, both themes (cinematic brand moment).
3. **Light accents from SDG palette**: use sdg6 cyan as primary accent, sdg7/sdg11 amber for warmth, sdg10 rose for alerts; background `#FAFAF8`, surfaces white/`#FFFFFF`, hairline ink borders. Noise overlay stays.

## 7. Recommended implementation order

1. Theme mechanism: `ThemeProvider` (localStorage + `prefers-color-scheme`, class on `<html>`), remove hardcoded `dark` from `layout.tsx`/`global-error.tsx`, add toggle to SiteNav island.
2. Tokenize surfaces in `globals.css`: `--surface`, `--surface-core`, `--ink`, `--stroke`, `--glass` vars; fix `.bg-dots`, `.outline-text`, scrollbar, selection, `.hard-shell`, `.island-glass` with light variants + `dark:` overrides.
3. Theme the high-traffic components first: SiteNav → Hero → landing cards (`page.tsx`) → FestTicker → error surfaces → loading.
4. Portal flows: PasswordInput, PreferencePicker, preferences page, then login zones (decision §6.1).
5. Logo light variant.
6. QA sweep: screenshot both themes per route (reuse `e2e/flow-test.js` harness with theme toggle), verify contrast + drift orbs visibility (white-tinted orbs `bg-sdg6/10` = invisible on light → add dark-tinted orb tints).