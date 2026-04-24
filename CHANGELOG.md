# EXL Website — Build Changelog
**Phase 1: Homepage**
**Last updated:** 2026-04-24 (Session 3)
**Dev server:** `http://localhost:3000`
**Project root:** `EXL Website/exl-website/`

---

## What Was Built

Phase 1 delivers the full EXL homepage (`exl.agency`) — all six specified sections, per the `EXL_Animation_Specs.md` handoff document, using verbatim copy from `EXL_Website_Copy_Master_v4.docx`.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16.2.4 (App Router, Turbopack) |
| Styling | Vanilla CSS via `globals.css` (no Tailwind utility classes in components) |
| Scroll animation | GSAP + ScrollTrigger |
| Fonts | TuskerGrotesk (local TTF) + CabinetGrotesk (local OTF) |
| Images | Next.js `<Image />` component with WebP/AVIF optimisation |
| Hosting (planned) | Vercel |

---

## Brand Tokens

```css
--chartreuse:   #C8F135
--black:        #0A0A0A
--white:        #FFFFFF
--white-60:     rgba(255, 255, 255, 0.6)
--font-tusker:  'TuskerGrotesk' (Semibold weight)
--font-cabinet: 'CabinetGrotesk' (Regular / Bold / Black)
```

---

## File Structure

```
exl-website/
├── public/
│   ├── fonts/
│   │   ├── TuskerGrotesk-Semibold.ttf
│   │   ├── CabinetGrotesk-Regular.otf
│   │   ├── CabinetGrotesk-Bold.otf
│   │   └── CabinetGrotesk-Black.otf
│   ├── hero-video.mp4              ← HERO VIDEO.mp4 (renamed, no space)
│   ├── exl-logo-white.png
│   ├── exl-logo-black.png
│   ├── exl-logo-neon.png
│   ├── exl-icon.png                ← Chartreuse rounded-square X icon (navbar + favicon)
│   ├── icon-exclamation.png        ← Brand symbol — used in What We Do
│   ├── icon-question.png           ← Brand symbol — used in How We're Different
│   ├── icon-star.png               ← Brand symbol — used in Flagship Services
│   ├── icon-percent.png            ← Brand symbol — used in EXL Advantage
│   ├── yellow-line.png             ← Directional arrow line — section separator
│   ├── advise-card.png
│   ├── produce-card.png
│   ├── build-card.png
│   ├── grow-card.png
│   ├── imm-card.png
│   └── podcast-card.png
├── src/
│   ├── app/
│   │   ├── globals.css             ← Design system (tokens, typography, resets)
│   │   ├── layout.tsx              ← Root layout + metadata/SEO
│   │   └── page.tsx                ← Homepage — assembles all sections
│   └── components/
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── WhatWeDoSection.tsx
│       ├── EXLAdvantageSection.tsx
│       ├── CredibilitySection.tsx
│       ├── HowWereDifferentSection.tsx
│       ├── FlagshipServicesSection.tsx
│       ├── SectionSeparator.tsx    ← [NEW] Reusable yellow-line divider
│       └── Footer.tsx
```

---

## Section Implementation Notes

### Section 1 — Hero (Option A: Cinematic Video Background)
**File:** `HeroSection.tsx`

- Full-viewport `<video>` with `autoPlay muted loop playsInline` — source at `/hero-video.mp4`
- Gradient overlay deepens opacity on scroll via `window` scroll listener
- Video parallax at 35% of scroll speed
- Headline reveal: **CSS keyframes** (`revealLine`) — clip-mask slide-up per line, staggered 80ms delays. Used CSS instead of GSAP to avoid `opacity: 0` SSR flash.
- Subhead + CTAs: `fadeSlideUp` CSS animation with staggered delays
- Scroll indicator: animated chartreuse vertical line, right edge

### Section 2 — What We Do (Stacking Scroll Cards)
**File:** `WhatWeDoSection.tsx`

- Four `position: sticky` cards with incrementing `top` offsets for the physical stack
- GSAP ScrollTrigger scrubs `scale` + `filter: blur()` on each card as the next enters
- Ghost oversized numerals (01–04) — low opacity, flush right
- Alternating black + chartreuse backgrounds (Advise/Build = black, Produce/Grow = chartreuse)
- Real client photography used for right-half image panels

### Section 3 — The EXL Advantage (3-Phase Scroll)
**File:** `EXLAdvantageSection.tsx`

- **Phase 1:** SVG `<text>` "EXL" — GSAP scrubs `viewBox` to zoom into the X letterform. Vector — never rasterised.
- **Phase 2:** Typewriter cycling headline — `useState` loop cycles `SENIOR-LED → AI-NATIVE → BUILT FOR IMPACT` with blinking `|` cursor in chartreuse. Autonomous, no scroll dependency.
- **Phase 3:** Three differentiator cards — GSAP `rotate: 5° → 0°` + `y: 60% → 0` with `expo.out` easing on scroll entry.

### Section 4 — Credibility Line (Marquee Ticker)
**File:** `CredibilitySection.tsx`

- Three text clones in a flex row; GSAP `modifiers` creates a seamless 65s infinite loop
- Slide-in from right on scroll entry (700ms ease-out)
- Alternating chartreuse / white per clone — both visible simultaneously
- `mouseenter` pauses; `mouseleave` resumes
- `✦` bullet separator between loop instances

### Section 5 — How We're Different (Pinned Progress Bar)
**File:** `HowWereDifferentSection.tsx`

- Pinned for `+=250%` scroll distance via GSAP `ScrollTrigger`
- Chartreuse progress bar fills left→right tied to scroll progress
- Active tab label: full opacity + chartreuse; inactive: 30% opacity
- Pillar content swap via CSS opacity + translateY (React `useState` from `onUpdate` callback)

### Section 6 — Flagship Services (iPhone App-Open Cards)
**File:** `FlagshipServicesSection.tsx`

- Card 1 (IMM, black): GSAP `scale: 0.06 → 1` from left with `back.out(1.2)` overshoot easing
- Card 2 (Podcast, chartreuse): same from right with `marginTop` offset for diagonal stagger
- Headline: scroll-scrubbed `y + opacity` reveal

### Navbar
**File:** `Navbar.tsx`

- Transparent on load → dark blur on scroll (threshold 40px)
- Chartreuse pill `Book a call` CTA
- EXL white logo via PNG + `brightness(0) invert(1)` CSS filter

### Footer
**File:** `Footer.tsx`

- Chartreuse CTA section: "LET'S BUILD SOMETHING WORTH WATCHING."
- 3-column footer: brand/address · nav links · social links

---

## CSS Changes — Session 2 (2026-04-24)

### Brand icon integration
**Files:** `Navbar.tsx`, `layout.tsx`, `WhatWeDoSection.tsx`, `EXLAdvantageSection.tsx`, `HowWereDifferentSection.tsx`, `FlagshipServicesSection.tsx`, `SectionSeparator.tsx` [NEW], `page.tsx`

All six brand symbol assets (EXL Icon, Exclamation, Question Mark, Star, Percent, Yellow Line) were copied from `Assets/Images/` to `public/` and integrated across the site.

| Asset | Placement | Visual role |
|---|---|---|
| `exl-icon.png` | Navbar + browser favicon | Chartreuse X icon beside wordmark; spins -3° on hover |
| `yellow-line.png` | Between major sections (`SectionSeparator`) | Full-width directional arrow separator, alternates L/R direction |
| `icon-exclamation.png` | What We Do label | Small icon beside label + faint ghost floater (8° tilt, 18% opacity) |
| `icon-question.png` | How We're Different label | Icon beside label + large ghost behind header (7% opacity, -6° tilt) |
| `icon-star.png` | Flagship Services label | Flanking stars on label + slow-spinning ghost (20s, 8% opacity) |
| `icon-percent.png` | EXL Advantage typewriter | Flanking icons on label + two ghost `%` background decorations |

**Favicon:** Set via `metadata.icons` in `layout.tsx` — `icon`, `apple`, and `shortcut` all point to `/exl-icon.png`.

**`SectionSeparator` component:** Accepts optional `flip` prop to mirror the arrow direction for visual rhythm.

---

## Changes — Session 3 (2026-04-24)

### 1. Section separator cleanup
**File:** `src/app/page.tsx`

Removed 3 of 5 section separators per client feedback. Remaining two create deliberate rhythm without visual noise.

| Separator position | Result |
|---|---|
| Hero → What We Do | ✅ Kept |
| What We Do → EXL Advantage | ❌ Removed |
| Credibility → How We're Different | ❌ Removed |
| How We're Different → Flagship Services | ✅ Kept |
| Flagship Services → Footer | ❌ Removed |

### 2. Section 5 — Pillar 0 stale closure bugfix
**File:** `src/components/HowWereDifferentSection.tsx`

Section was opening on the second pillar (AI-Native) instead of the first (Senior Strategy).

**Root cause:** GSAP `ScrollTrigger.onUpdate` is created once inside `useEffect`. It captured the initial `activePillar = 0` React state value and never saw subsequent updates — a classic stale closure. The condition `if (newPillar !== activePillar)` evaluated against the frozen `0`, causing unpredictable pillar jumps on first scroll entry.

**Fix:** Introduced `activePillarRef = useRef(0)` as a mutable ref that GSAP reads and writes directly. React `setActivePillar` is still called to trigger re-renders, but the comparison now uses the ref:

```ts
// Before (broken — stale closure)
if (newPillar !== activePillar) { setActivePillar(newPillar); }

// After (fixed — ref always current)
if (newPillar !== activePillarRef.current) {
  activePillarRef.current = newPillar;
  setActivePillar(newPillar);
}
```

### 3. Body text size +20%
**File:** `src/app/globals.css`

Applied to the `.body-text` global class — all section paragraphs inherit automatically.

| Property | Before | After |
|---|---|---|
| `font-size` | `clamp(1rem, 1.4vw, 1.25rem)` | `clamp(1.2rem, 1.68vw, 1.5rem)` |
| `line-height` | `1.65` | `1.7` |

---

## Open Items / Blockers

| Item | Status | Notes |
|---|---|---|
| Calendly / booking URL | ❌ Missing | CTAs link to `#contact` for now |
| EXL logo SVG | ❌ Missing | Using PNG + CSS filter; SVG preferred |
| Confirmed chartreuse hex | ⚠️ Assumed | Using `#C8F135` — verify against brand PDF |
| Sections 7–9 specs | ⏳ Pending | Best in B2B, How We Work, Footer variants |
| Mobile responsive pass | ⏳ Pending | Desktop layout done; mobile not dialled in |
| WebM video fallback | ⏳ Pending | MP4 only; WebM would improve Chrome perf |
| `info@exl.agency` inbox | ⏳ Pending | Confirm live before launch |

---

## Running Locally

```bash
cd "EXL Website/exl-website"
npm run dev
# → http://localhost:3000
```
