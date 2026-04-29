# EXL Homepage — Update Brief for Antigravity
**From:** EXL / Plankbot  
**Date:** April 2026  
**Ref:** Homepage v6 → v7  
**Priority:** High — client review pending

---

## Context

The approved homepage mockup (`index.html`) is the design foundation. This brief covers six specific updates that must be applied to the homepage before client review. Do not deviate from the existing design system — colors, typography, spacing, and animation language are locked. These are targeted changes only.

The reference mockup and the approved copy document (`EXL_Website_Copy_Master_v4.md`) remain the source of truth for all other decisions.

---

## Update 1 — Remove the Credibility Ticker

**Remove entirely.** The horizontal scrolling marquee strip (chartreuse background, scrolling text: "Senior Strategy ▲ IHG Resort Partner ▲ ...") is to be deleted from the homepage.

**Reason:** It reads as low-quality and no visitor will read it.

**What replaces it:** Nothing. The section above it (EXL Advantage, eerie black background) and the section below it (How We're Different) sit directly adjacent. Ensure the visual transition between these two sections is clean — adjust padding/spacing as needed so there is no awkward gap.

---

## Update 2 — Capability Cards: Replace Flat Color with Background Images

**Current state:** The four capability cards (Advise, Produce, Build, Grow) have flat background colors (Nyanza, Sky, Pale Silver, Chartreuse).

**New state:** Each card gets a full-bleed background image using the same visual treatment as the flagship service cards below — real photography fills the card, a dark overlay sits on top, and the text (number, capability name, description, explore link) renders over the overlay.

**Visual treatment (match exactly to flagship cards):**
- Photography fills `100%` width and height via `object-fit: cover`
- Layer 1 (on image): `rgba(0,0,0,0.35)` full overlay
- Layer 2 (on image): bottom-to-top gradient, `rgba(0,0,0,0.85)` at bottom, transparent at top — covers approximately 65% of the card height
- All text sits above these two layers (z-index above overlays)
- The capability name renders in white, Tusker Grotesk, large
- The number label (01, 02, 03, 04) in small uppercase, `rgba(255,255,255,0.45)`
- The description in white at `rgba(255,255,255,0.6)`, 12px, DM Sans/Cabinet Grotesk Regular
- The "Explore" link in white with a chartreuse underline

**Image assets to use:**

| Card | Capability | Image |
|---|---|---|
| 01 | Advise. | `cap-advise.jpg` — overhead aerial of consultant at desk, warm directional light, Dallas skyline |
| 02 | Produce. | `cap-produce.jpg` — cinematic production setup, softbox rig, camera on tripod, golden hour |
| 03 | Build. | `cap-build.jpg` — overhead of campaign war room, printed layouts, long table, loft space |
| 04 | Grow. | `cap-grow.jpg` — monitor showing analytics dashboard, green upward trend lines, dark room |

*(Images provided separately. If not yet received, use the existing placeholder images from the mockup in the same overlay treatment until final assets arrive.)*

**Card hover state:**
- On hover: the background image transitions from `scale(1.04)` to `scale(1.0)` — a subtle settle effect. Duration `0.8s`, `ease-out`.
- No other hover effects. Do not add borders, shadows, or color changes on hover.

**Layout:** The 4-column grid on desktop and 2×2 on mobile remains unchanged. Only the background treatment changes.

---

## Update 3 — Text Highlighting: Replace Bold with Brand Treatments

**Current state:** Key phrases in body copy and section headings use standard CSS bold weight for emphasis.

**New state:** Two approved brand highlighting treatments replace generic bold. Use contextually — not on every piece of emphasis, only where it genuinely earns attention.

**Treatment A — Chartreuse highlight block:**
```css
.highlight-block {
  background: #DEFF00;
  color: #000000;
  padding: 0 6px 2px;
  display: inline;
  font-weight: 700;
}
```
Use for: the most important 2–4 word phrases in a section. Maximum one use per section. Example: in "AI-native, so your **timeline isn't a problem**" — the highlighted phrase could be "timeline isn't a problem."

**Treatment B — Hand-drawn underline stroke:**
Use an SVG underline element beneath key words. The stroke should feel irregular/gestural — not a clean CSS border-bottom. Recommend using an inline SVG path that loosely follows the text baseline with slight wave/imperfection. Color: `#DEFF00` (chartreuse). Stroke-width: 3–4px.

```html
<!-- Example implementation -->
<span class="highlight-underline">
  senior thinking
  <svg class="underline-stroke" viewBox="0 0 200 8" preserveAspectRatio="none">
    <path d="M0,6 Q50,2 100,5 Q150,8 200,4" 
          stroke="#DEFF00" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>
</span>
```

**Where to apply these treatments on the homepage:**

| Section | Text to highlight | Treatment |
|---|---|---|
| Hero H1 | "production floor" | Already chartreuse color — keep as is |
| EXL Advantage H2 | "AI-native" | Already chartreuse — keep as is |
| EXL Advantage bullets | "Weeks, not quarters" | Treatment B (underline) |
| How We're Different | Pillar titles | Treatment B (underline) on the key 2–3 word hook in each title |
| Footer CTA H2 | "worth watching" | Treatment A (chartreuse block) |

**Do not apply to:** body copy paragraphs, labels, button text, captions, or any text smaller than 14px.

---

## Update 4 — Remove Unnecessary Buttons and CTAs

Audit every CTA button and link on the homepage. Remove any that do not directly serve a conversion action or navigation decision. The principle: if a reasonable person scrolling the page would not pause to click it, it comes out.

**Specific removals:**

- The "See what we do" secondary CTA in the hero — remove. Keep only "Book a call."
- The "Explore Advise / Explore Produce / Explore Build / Explore Grow" links inside the capability cards — keep one per card maximum. If the card already has enough visual weight and a clear explore link at the bottom, do not add a second CTA.
- The "Visit b2b.media" link in the Best in B2B section — keep. This is the only outbound link in this section and it earns its place.
- Section labels (e.g. "What we do", "Featured Engagements") — these are display elements, not CTAs. They stay.

**Principle going forward:** Each section should have a maximum of one CTA. The homepage has one job — get the visitor to book a call. Every button that competes with that goal is a distraction.

---

## Update 5 — Flagship Section: Train-Slide Animation

**This is the highest-priority update.** The two flagship service cards (Integrated Marketing Management, B2B Video Podcast Production) must use the following scroll-triggered animation.

**Headline treatment:**
```
Line 1: "Two Flagship"    — solid black fill, Tusker Grotesk
Line 2: "Engagements."   — stroke/outline only, transparent fill, Tusker Grotesk
                           -webkit-text-stroke: 2px #000000;
                           color: transparent;
```

Both lines animate in on section enter: `translateY(110%) → 0`, `opacity: 0 → 1`. Duration `0.7s`, `power3.out`. Line 2 delayed `0.1s` after Line 1.

**Card animation — the train arrival:**

The two cards begin off-screen to the right. As the user scrolls into the section, they slide left into their final positions, like two train carriages arriving at a station.

```javascript
// GSAP + ScrollTrigger implementation
gsap.registerPlugin(ScrollTrigger);

// Initial positions — both cards off-screen right
// Card 1 starts at 80vw, Card 2 starts at 140vw (further back in the train)
gsap.set('#card-imm', { x: '80vw', opacity: 0 });
gsap.set('#card-podcast', { x: '140vw', opacity: 0 });

// Scrubbed animation — tied to scroll, feels physical
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.flagship-section',
    start: 'top 65%',
    end: 'top 15%',
    scrub: 1.2,
  }
});

tl.to('#card-imm', {
  x: 0,
  opacity: 1,
  ease: 'power2.out',
  duration: 1
}, 0);

tl.to('#card-podcast', {
  x: 0,
  opacity: 1,
  ease: 'power2.out',
  duration: 1
}, 0.12); // slight offset — second carriage arrives just after first
```

**After cards settle:** trigger the ghost brand text wipe (`clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)`) on both cards. Duration `1.2s`, `power4.out`, with `0.4s` delay after cards reach final position.

**Mobile fallback (< 1024px):** Replace train animation with simple staggered fade-up. `translateY: 40px → 0`, `opacity: 0 → 1`. Duration `0.7s`, stagger `0.15s`.

**Card content (exact copy — do not paraphrase):**

Card 1 — IMM:
```
Ghost text:   YOUR MARKETING DEPT.    (chartreuse, 12% opacity, Tusker Grotesk, top-left)
Tag:          01 — IMM
Title:        Integrated Marketing Management.
Body:         Your marketing department, on retainer. Strategy, online presence, 
              PR coordination, social oversight, collateral, influencer programs, 
              and vendor management, all run by one accountable team. Built for 
              five-star hospitality, luxury brands, and B2B companies whose 
              reputation is their asset.
CTA:          Explore IMM    (chartreuse pill button)
```

Card 2 — Podcast:
```
Ghost text:   A SHOW WORTH WATCHING.    (chartreuse, 12% opacity, Tusker Grotesk, top-left)
Tag:          02 — Production
Title:        B2B Video Podcast Production.
Body:         A cinematic B2B video podcast that builds pipeline, not just downloads. 
              We run the show end to end: strategy, guest pipeline, on-location 
              production, post-production, and distribution. The same engine we 
              use to produce Best in B2B.
CTA:          Explore Podcast Production    (outline pill button, white)
```

---

## Update 6 — Visual Consistency Across All Sections

The homepage must feel like one continuous piece, not a collection of independently designed sections. The section Mohamed identified as the best on the page (the flagship sliding section) sets the standard. Every section should feel like it belongs to the same page as that section.

**Audit each section against these standards:**

**Standard 1 — Every section with an image panel must use the same overlay treatment.** Full-bleed photography + `rgba(0,0,0,0.35)` full overlay + bottom gradient. No exceptions. This applies to: What We Do panel, Best in B2B panel, all capability cards, all flagship cards.

**Standard 2 — Section transitions must be intentional.** Dark section (eerie `#1C2416`) → light section (off-white `#EDE8DF`) is a valid transition. Light → light with no visual break feels like the page accidentally repeated itself. Audit every section boundary and add a `0.5px solid rgba(0,0,0,0.08)` border-top where sections of similar tone meet.

**Standard 3 — Typography hierarchy is consistent throughout.** Section label (9–10px, uppercase, Cabinet Grotesk 600, `--taupe`) → thin vertical rule (0.5px, 28–36px height) → H2 (Cabinet Grotesk Light 300 / Bold 600 mixed). This three-part entry pattern opens every section. Do not skip any element in this sequence.

**Standard 4 — Spacing rhythm is consistent.** Section padding: `52px 20px` mobile, `80px 48px` desktop. Do not use custom padding values per section unless there is a specific structural reason. Consistency in rhythm is what makes the page feel intentional.

**Standard 5 — Animation language is consistent.** Every text element that appears on scroll uses the same default reveal: `opacity: 0 → 1`, `translateY: 26px → 0`, `0.65s`, `power2.out`. Brand text wipes (the chartreuse words on images) always use `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)`, `1.0s`, `power4.out`. Do not invent new animation patterns — use only these two.

---

## Deliverable

A single updated `index.html` that incorporates all six changes above. Self-contained with all images embedded or properly referenced. Tested on:
- Mobile: 390px (iPhone 14 Pro)
- Tablet: 768px (iPad)
- Desktop: 1440px (standard)

The `flagship_section.html` file provided separately contains the working reference implementation of Update 5 (train animation). Use this as the technical reference for the GSAP implementation.

---

## What Not to Change

- All copy is locked. Do not rewrite, shorten, or paraphrase any text element.
- Color tokens are locked. Do not introduce new colors.
- The editorial layout of the What We Do section (28% / 57% / 15% grid) and the Best in B2B section — locked.
- The footer, footer CTA section, and How We Work section — no changes needed.
- The nav — no changes needed.

---

*Questions: mo@exl.agency*  
*EXL Ventures LLC · exl.agency · Confidential — for Antigravity use only*
