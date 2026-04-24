# EXL Website — Build Changelog
**Phase 1: Homepage**
**Last updated:** 2026-04-24
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
│   ├── hero-video.mp4          ← HERO VIDEO.mp4 (renamed, no space)
│   ├── exl-logo-white.png
│   ├── exl-logo-black.png
│   ├── exl-logo-neon.png
│   ├── advise-card.png
│   ├── produce-card.png
│   ├── build-card.png
│   ├── grow-card.png
│   ├── imm-card.png
│   └── podcast-card.png
├── src/
│   ├── app/
│   │   ├── globals.css         ← Design system (tokens, typography, resets)
│   │   ├── layout.tsx          ← Root layout + metadata/SEO
│   │   └── page.tsx            ← Homepage — assembles all sections
│   └── components/
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── WhatWeDoSection.tsx
│       ├── EXLAdvantageSection.tsx
│       ├── CredibilitySection.tsx
│       ├── HowWereDifferentSection.tsx
│       ├── FlagshipServicesSection.tsx
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

## CSS Changes — 2026-04-24

### Line-height fix on headline classes
**File:** `src/app/globals.css`

Previous values (0.92–0.95) caused multi-line header text to visually collide.
Increased to give each headline class natural breathing room.

| Class | Before | After |
|---|---|---|
| `.headline-hero` | `0.92` | `1.04` |
| `.headline-section` | `0.92` | `1.06` |
| `.headline-card` | `0.95` | `1.08` |

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
