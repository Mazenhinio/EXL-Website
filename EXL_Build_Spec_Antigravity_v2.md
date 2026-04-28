# EXL Agency Website — Build Specification
**For:** Antigravity  
**Client:** EXL Ventures LLC  
**URL:** exl.agency  
**Prepared:** April 2026  
**Version:** 2.0  
**Last updated:** April 28, 2026 — reflects all approved mockup changes through v6

---

## 1. Project Overview

EXL is a B2B consultancy and media production studio based in Dallas, Texas. The website serves as the primary commercial asset for winning high-value clients — five-star hospitality groups, B2B SaaS companies, private equity portfolios, and luxury brands.

The homepage is the only page in scope for Phase 1. All other pages (capability sub-pages, flagship service pages) follow in Phase 2 using the same design system established here.

**Primary objective:** A senior B2B decision-maker lands on the page and within 90 seconds understands exactly what EXL does, believes EXL operates at their level, and takes action to book a call.

**Reference mockup:** The approved HTML mockup (`index.html`) is the design source of truth. Pixel-match it.

---

## 2. Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | GSAP + ScrollTrigger |
| Deployment | Vercel |
| Fonts | Google Fonts (see Typography) |
| Images | Static assets (provided) |

**No CMS in Phase 1.** All copy is hardcoded from the approved copy document.

---

## 3. Design System

### 3.1 Color Tokens

```css
/* Primary */
--chartreuse:   #DEFF00;   /* Brand accent — use sparingly */
--black:        #000000;   /* Primary text and dark sections */
--pale-silver:  #CEC5B7;   /* Warm neutral surfaces */
--eerie:        #1C2416;   /* Dark section backgrounds */
--nyanza:       #E8FFDC;   /* Capability card 1 */
--mystic-red:   #FF550D;   /* Accent — use very sparingly */
--platinum:     #E5E5E5;   /* Lightest neutral */
--off-white:    #EDE8DF;   /* Page background — NOT pure white */

/* Secondary palette */
--sky:          #B8D0F0;   /* Capability card 2 */
--sage:         #C4DDB0;   /* Reserved */
--lavender:     #E0C8F8;   /* Best in B2B text panel */
--peach:        #F8C8B0;   /* Reserved */
--lemon:        #F2FFB8;   /* Pillar hover state */
--taupe:        #B8AFA0;   /* Section label text */
```

**Color rules:**
- Page background is always `--off-white`. Never pure white except for elements on dark backgrounds.
- Chartreuse is used for: CTAs, brand text moments on images, ticker background, footer CTA background, logo mark, accent dots.
- Chartreuse does NOT appear on every section. It earns its moments.
- The eerie dark section breaks up the page and creates visual rhythm. Do not skip it.

### 3.2 Typography

```css
/* Primary — Headlines */
font-family: 'Tusker Grotesk', sans-serif;   /* 7600 Semibold weight */
/* Web fallback: 'Bebas Neue' from Google Fonts */

/* Secondary — Body, UI, Sub-heads */
font-family: 'Cabinet Grotesk', sans-serif;  /* Black / Bold / Regular */
/* Web fallback: 'DM Sans' from Google Fonts */
```

**Google Fonts import (fallback for development):**
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet">
```

**Type scale:**
| Role | Size | Weight | Font |
|---|---|---|---|
| Hero H1 | clamp(50px, 13vw, 130px) | Semibold | Tusker Grotesk |
| Section H2 | clamp(24px, 6vw, 44px) | Light 300 / Bold 600 | Cabinet Grotesk |
| Capability name | clamp(32px, 7vw, 56px) | — | Tusker Grotesk |
| Body | 13–15px | 300–400 | Cabinet Grotesk |
| Section label | 9–10px | 600 | Cabinet Grotesk |
| CTA / Button | 10–11px | 700 | Cabinet Grotesk |

### 3.3 Spacing

Use an 8px base grid. Common values: 8, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100px.

### 3.4 Border

All dividers: `0.5px solid rgba(0,0,0,0.08)`. Never 1px. The thinness is intentional.

### 3.5 Logo

The EXL logo is a custom geometric wordmark — not a font. Use the provided asset files:

- `Exl_Logo_Black.png` — black wordmark on transparent background. Use on off-white, pale silver, lavender, and all light backgrounds.
- For dark backgrounds (nav on dark, footer): apply `filter: brightness(0) invert(1)` to the same PNG to render it white. No separate white asset needed.
- For chartreuse backgrounds: use `Exl_Logo_Black.png` directly (black on chartreuse is an approved brand combination).

**Nav implementation:**
```html
<img src="/assets/Exl_Logo_Black.png" alt="EXL" style="height:28px;width:auto">
```
Height: 28px in nav, 24px in footer. Width: auto.

**Do not** recreate the logo in CSS or approximate it with a font. Always use the provided PNG asset.

### 3.6 Brand Cutout Treatment

EXL's brand identity uses a signature cutout effect: PNG images of people are cut out against a transparent background and displayed with a chartreuse glow/outline around the subject. This is used on social assets, billboards, and the website footer CTA.

**Implementation:** The provided `cutout_model.png` already includes the chartreuse outline as part of the PNG. No CSS filter is required to create the outline — it is baked into the asset.

**Future cutout assets:** If new cutout PNGs are created without the outline baked in, apply `filter: drop-shadow(0 0 0 8px #DEFF00)` to replicate the effect in CSS. Note this is `drop-shadow`, not `box-shadow` — `box-shadow` follows the element's bounding box, `drop-shadow` follows the actual transparent cutout shape.

The homepage consists of 11 sections in this order:

| # | Section | Background |
|---|---|---|
| 1 | Hero | Eerie Black `#1C2416` |
| 2 | Credibility Line | Eerie Black (continuation) |
| 3 | What We Do — Editorial panel | Off-white + image panel |
| 3b | What We Do — Capabilities grid | Off-white (full width, separate row) |
| 4 | The EXL Advantage | Eerie Black `#1C2416` |
| 5 | Credibility Ticker | Chartreuse `#DEFF00` |
| 6 | How We're Different | Off-white |
| 7 | Flagship Services | Off-white |
| 8 | Best in B2B | Lavender `#E0C8F8` + image panel |
| 9 | How We Work | Pale Silver `#CEC5B7` |
| 10 | Footer CTA | Chartreuse `#DEFF00` |
| — | Footer | Black `#000000` |

---

## 5. Section Specifications

### 5.1 Navigation

**Mobile (< 768px):**
- Logo left, Book a Call button right, hamburger icon right
- Fixed position, 52px height
- Off-white background, 0.5px bottom border
- On scroll: border darkens to `rgba(0,0,0,0.18)`

**Desktop (≥ 1024px):**
- Logo left, nav links center, Call us + Book a Call right
- Nav links: Services, IMM, Podcast Production, Best in B2B, About
- 56px height
- Hamburger hidden

---

### 5.2 Hero (Section 1)

**Layout:** Full viewport height (`100svh`). Content pinned to bottom-left. Image fills entire background.

**Background image:** Cinematic production studio with director's chair. Image is dark and moody. Apply a bottom-to-top gradient overlay (`rgba(0,0,0,0.85)` at bottom, transparent at top) so headline is legible.

**Brand element:** Giant ghost EXL letterform behind content. Tusker Grotesk, ~95vw font size, `rgba(222,255,0,0.04)` opacity. Positioned bottom-left. This is a decorative background layer only.

**Copy (exact):**
```
Eyebrow:    exl.agency · Dallas, Texas
H1:         A B2B consultancy with its own production floor.
            (The word "production" renders in --chartreuse)
Sub:        We advise, produce, build, and grow for ambitious B2B 
            and luxury brands. Senior strategy, AI-native workflows, 
            cinematic output. From Dallas, for clients across North 
            America and the Middle East.
CTA 1:      Book a call        → /contact
CTA 2:      See what we do     → /#what-we-do
```

**CTAs:** Flat rectangular buttons. "Book a call" is black background / chartreuse text. "See what we do" is transparent / white text with 0.5px white border.

---

### 5.3 Credibility Line (Section 2)

Sits immediately below hero. Eerie black background, 18px padding top/bottom.

**Copy (exact):**
> Trusted to run the marketing function for a flagship IHG resort property, and to produce Best in B2B, the only B2B podcast filmed on location across Dallas-Fort Worth.

"A flagship IHG resort property" and "Best in B2B" render in `rgba(255,255,255,0.8)` (slightly brighter than surrounding text).

---

### 5.4 What We Do (Section 3)

**This section is split into two distinct sub-sections rendered back to back:**

---

#### 3a — Editorial Panel

**Desktop layout:** Three-column CSS Grid — `28% 57% 15%`
- Column 1 (28%): Text content only (label, rule, H2, intro paragraph)
- Column 2 (57%): Image panel (full height, photography fills column)
- Column 3 (15%): Section number `02 — What we do`, vertical text, right-aligned

**Mobile layout:** Stacked — image first (full width, `60vw` min-height), text panel below.

**Image panel:** Photography fills the column with `object-fit: cover`. Bottom gradient overlay. Brand moment text overlaid.

**Brand moment:** The words "No handoffs." appear in `--chartreuse`, Tusker Grotesk, `clamp(32px, 9vw, 68px)`, positioned at the bottom of the image over the gradient. Wipes in left-to-right via `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)` on scroll enter. Trigger at 25% viewport. Duration 1.0s, `power4.out`.

**Copy (exact):**
```
Label:  What we do
H2:     One firm. Four capabilities. No handoffs.
Intro:  Most B2B brands juggle a strategy firm, an agency, a dev 
        shop, and a freelancer. We built EXL so you don't have to.
```

---

#### 3b — Capabilities Grid (standalone full-width section)

**CRITICAL:** The capabilities grid is a **separate section** rendered directly below the editorial panel. It is NOT nested inside the editorial column. This prevents the image panel from overlapping or covering any capability card at any viewport width.

**Background:** Off-white `#EDE8DF`. `border-top: 0.5px solid rgba(0,0,0,0.08)`.

**Layout:**
- Mobile: 2×2 grid
- Tablet (≥ 768px): 4-column grid
- Desktop (≥ 1024px): 4-column grid, `min-height: 310px` per card

**Card colors:**

| Card | Name | Background |
|---|---|---|
| 01 | Advise. | `--nyanza` (#E8FFDC) |
| 02 | Produce. | `--sky` (#B8D0F0) |
| 03 | Build. | `--pale-silver` (#CEC5B7) |
| 04 | Grow. | `--chartreuse` (#DEFF00) |

**Card structure:** Number (top), capability name in Tusker Grotesk (large), body copy, Explore link (bottom). Cards use `display: flex; flex-direction: column; justify-content: space-between`.

**Each card copy (exact):**

**Advise.**
> Positioning, brand, and go-to-market strategy from a team that has built businesses across three continents. We sit in the room before we pick up a camera.

**Produce.**
> Podcasts, video, and social content shot in-house from our Dallas studio. Every frame shot and lit the way a film crew would. Every sound captured the way a record label would. B2B that looks like media.

**Build.**
> Projects, launches, and integrated campaigns executed end to end. A new brand identity. A product launch. A website tied to a campaign moment. We scope it, build it, ship it, measure it.

**Grow.**
> Partnerships, channels, and distribution systems that turn content into pipeline. Because strategy and production don't matter if no one sees the work.

Each card links to its capability sub-page (`/services/advise`, `/services/produce`, `/services/build`, `/services/grow`).

---

### 5.5 The EXL Advantage (Section 4)

**Background:** Eerie Black `#1C2416`

**Desktop layout:** Two-column grid, `1fr 1fr`, 88px gap.

**Copy (exact):**
```
Label:  The EXL Advantage
H2:     A traditional consultancy with an AI-native engine underneath.
        ("AI-native" renders in --chartreuse)
Body:   Every EXL deliverable runs through an AI-accelerated workflow. 
        Not to replace the work, to compress the timeline. We build 
        and maintain internal automation systems that handle research, 
        transcription, editing assistance, content repurposing, CRM sync, 
        and distribution, so our senior team spends their hours on strategy 
        and craft, not on tasks a machine can do better.

Sub-label: What this means for you:

Bullet 1:  Weeks, not quarters, from brief to first delivery.
Bullet 2:  Senior judgment on every decision, with machines doing the lift underneath.
Bullet 3:  Production and distribution systems that scale with your growth, not your headcount.
```

Bullet points use a small chartreuse dot as marker (not a standard list bullet).

---

### 5.6 Credibility Ticker (Section 5)

Full-width horizontal marquee. Chartreuse background `#DEFF00`. Black text.

Scrolls continuously left. Speed: approximately 22s for one full loop.

Items (repeat twice for seamless loop):
```
Senior Strategy  ▲  IHG Resort Partner  ▲  AI-Native Workflows  ▲  Best in B2B  ▲  Dallas Studio  ▲  Cinematic Production  ▲  North America · Middle East  ▲
```

The `▲` separator is the brand triangle symbol, black, 30% opacity.

---

### 5.7 How We're Different (Section 6)

**Background:** Off-white

**Desktop layout:** Three columns side by side, separated by 0.5px borders. No card shadows. Text only.

**Copy (exact):**
```
Label:  Why clients pick EXL
H2:     Why clients pick EXL over the alternatives.
```

**Pillar 1:**
> **Senior strategy, not junior execution.**
> Every engagement is led by a founder with international consulting experience across three continents. You get the senior thinking the big firms charge for, without the layers between you and the person actually solving your problem.

**Pillar 2:**
> **AI-native, so your timeline isn't a problem.**
> We built our production and content stack on AI from day one. A lean Dallas team ships in weeks what traditional agencies ship in quarters. You move at the pace of your market, not the pace of your agency.

**Pillar 3:**
> **Engineered for impact, top to bottom.**
> Every decision, from the strategy brief to the lens choice on the shoot, runs through one filter: will this move the number? We build marketing that's accountable from planning through delivery, and we own the outcome end to end.

**Hover state:** Each pillar gets `--lemon` (#F2FFB8) background and 12px left padding on hover. Transition: 0.25s ease.

---

### 5.8 Flagship Services (Section 7)

**Background:** Off-white

**Copy (exact):**
```
Label:  Featured Engagements
H2:     Two engagements we're known for.
Intro:  Most EXL clients start with one of these two offers. Both combine 
        our four capabilities into a single monthly engagement, led by a 
        senior partner, delivered by our in-house team.
```

**Two cards side by side** (stacked on mobile). Each card is `min-height: 560px` on desktop.

**Card structure:**
- Full-bleed photography as background (fills entire card)
- Semi-transparent dark overlay (35% black)
- Bottom gradient overlay (85% black at bottom, transparent at top — for text legibility)
- Brand moment text: Tusker Grotesk, large, `rgba(222,255,0,0.12)` — ghosted, positioned top-left. Wipes in on scroll.
- Service info panel at bottom: tag, title, body, CTA pill

**Card 1 — IMM:**
```
Image:        Five-star luxury hotel lobby (provided)
Brand text:   YOUR MARKETING DEPT.
Tag:          Flagship Service — 01
Title:        Integrated Marketing Management.
Body:         Your marketing department, on retainer. Strategy, online presence, 
              PR coordination, social oversight, collateral, influencer programs, 
              and vendor management, all run by one accountable team. Built for 
              five-star hospitality, luxury brands, and B2B companies whose 
              reputation is their asset.
CTA:          Explore Integrated Marketing Management   → /integrated-marketing-management
CTA style:    Chartreuse pill button, black text
```

**Card 2 — Podcast:**
```
Image:        Cinematic podcast studio with microphones (provided)
Brand text:   A SHOW WORTH WATCHING.
Tag:          Flagship Service — 02
Title:        B2B Video Podcast Production.
Body:         A cinematic B2B video podcast that builds pipeline, not just 
              downloads. We run the show end to end: strategy, guest pipeline, 
              on-location production, post-production, and distribution. The 
              same engine we use to produce Best in B2B.
CTA:          Explore Podcast Production   → /podcast-production
CTA style:    Outline pill button, white text
```

---

### 5.9 Best in B2B (Section 8)

**Desktop layout:** Three-column grid — `28% 57% 15%`
- Column 1 (28%): Text panel, background `--lavender` (#E0C8F8)
- Column 2 (57%): Image panel (full height)
- Column 3 (15%): Section number, vertical text, background `--lavender`

**Mobile layout:** Text panel first, then image below.

**Image panel:** Dallas on-location production setup photograph (provided). Shows real camera setup with Dallas skyline at golden hour through floor-to-ceiling windows. Brand moment text overlaid.

**Brand moment:** "Best in B2B." in `--chartreuse`, Tusker Grotesk, wipes in left-to-right on scroll enter.

**Copy (exact):**
```
Label:  Owned Media
H2:     Our most visible build: Best in B2B.
Body:   Best in B2B is our own video podcast, filmed on location across 
        Dallas-Fort Worth. Framework-driven conversations with the operators 
        shaping the market. Everything we build for our clients, we built 
        here first.
CTA:    Visit b2b.media   → https://b2b.media
```

---

### 5.10 How We Work (Section 9)

**Background:** Pale Silver `#CEC5B7`

**Copy (exact):**
```
Label:  How we work
H2:     Four steps. No theater.
```

**Four steps layout:** 4-column grid on desktop, 2×2 on mobile.

**Step 1 — Discover.**
> We dig into your market, your buyer, and your brand. Not a workshop. A real audit.

**Step 2 — Strategize.**
> We ship a positioning, content, and distribution plan you can actually execute.

**Step 3 — Produce and manage.**
> Our Dallas team films, edits, writes, designs, and builds in-house. For anything we don't do under our roof, we manage the vendors, the timelines, and the quality so you don't have to.

**Step 4 — Distribute.**
> We deploy across paid, earned, and owned channels, then measure what moved pipeline.

Step numbers use Tusker Grotesk, ~64px, `rgba(0,0,0,0.10)` — decorative, not primary.

---

### 5.11 Footer CTA (Section 10)

**Background:** Full-bleed Chartreuse `#DEFF00`

**Layout:** Two-column on desktop (headline left, sub + CTA right). Stacked on mobile. `position: relative; overflow: hidden` — required for the cutout figure.

**Cutout brand element:**
A PNG cutout of a person (provided as `cutout_model.png`) is positioned absolutely inside this section, anchored to the bottom-right. This is the EXL brand's signature cutout treatment — seen throughout the brand guidelines on billboards and social assets.

```css
.footer-cutout {
  position: absolute;
  bottom: 0;
  right: -10px;
  height: 115%;        /* taller than section — bleeds above */
  width: auto;
  object-fit: contain;
  object-position: bottom;
  pointer-events: none;
}
```

**Mobile:** Reduce to `height: 70%`, `opacity: 0.5`, pull to `right: -20px` so it doesn't block the CTA text.

**Desktop:** Content area (`max-width: 50%`) so text content doesn't compete with the figure.

**Animation:** On section enter — fade in + `translateY: 12px → 0`. Duration `0.7s`, delay `0.3s`, `ease-out`.

**Copy (exact):**
```
H2:   Let's build something worth watching.
Sub:  Book a 20-minute call. No deck, no pitch. Just a conversation 
      about what you're trying to ship.
CTA:  Book a call   → /contact
      info@exl.agency
```

H2 uses Tusker Grotesk, `clamp(54px, 14vw, 110px)`, black.

---

### 5.12 Footer

**Background:** Black `#000000`

Three-column layout on desktop, stacked on mobile.

**Column 1:** EXL logo mark + tagline + address
```
Logo: Exl_Logo_Black.png at 24px height, filter: brightness(0) invert(1) 
      to render white on black background
Tagline: A B2B consultancy and media production studio.
Address: 825 Watters Creek Blvd., Building M, Suite 250, Allen, Texas 75013
         info@exl.agency
```

**Column 2 — Services:**
Advise, Produce, Build, Grow, Integrated Marketing Management, Podcast Production

**Column 3 — Company:**
About, Best in B2B, Insights, Contact, LinkedIn, YouTube, Instagram

**Footer bottom bar:** `© 2026 EXL Ventures LLC. All rights reserved.` left, `exl.agency` right.

---

## 6. Animation Specifications

All animations use GSAP + ScrollTrigger. No CSS-only animations in production (CSS fallbacks acceptable for dev only).

### 6.1 Hero Entrance (on page load, no scroll required)

| Element | Animation | Duration | Delay | Easing |
|---|---|---|---|---|
| Ghost EXL letterform | Fade in | 2.5s | 0.1s | ease-out |
| Eyebrow text | Fade up 22px | 0.6s | 0.3s | ease-out |
| H1 headline | Fade up 32px | 0.9s | 0.45s | power2.out |
| Sub text | Fade up 22px | 0.6s | 0.85s | ease-out |
| CTA buttons | Fade up 22px | 0.6s | 1.05s | ease-out |

### 6.2 Scroll-Triggered Reveals

**Default reveal:** `opacity: 0 → 1`, `translateY: 26px → 0`, duration `0.65s`, easing `power2.out`, trigger at `80% viewport`.

Apply to: all section labels, headings, body text, links, footer columns.

### 6.3 Brand Text Wipe (key cinematic moments)

**Applies to:** "No handoffs." on What We Do, "Best in B2B." on Best in B2B section, ghost brand text on Flagship cards.

**Animation:** `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)`

Duration: `1.0s`, easing: `power4.out`, trigger at `25% viewport`.

This is the EXL brand's signature motion. It must feel like a film title reveal — instant start, fast wipe, confident.

### 6.4 Capabilities Cards

Stagger: cards 1–4 fade up sequentially, `110ms` between each. Trigger when grid enters viewport at 10%.

### 6.5 Advantage Stats

Each stat item slides in from right (`translateX: 20px → 0`). Stagger `130ms`. Triggered when list enters at 10%.

### 6.6 Flagship Card Images

On card enter: image starts at `scale(1.04)`, eases to `scale(1)`. Duration `1.3s`, easing `power2.out`. Creates a subtle "settle" effect on enter.

### 6.7 Footer Headline

Each word in "Let's build something worth watching." drops in sequentially. `translateY: 55% → 0`, `opacity: 0 → 1`. Stagger `75ms` per word.

### 6.8 Nav on Scroll

After 50px scroll: nav bottom border increases to `rgba(0,0,0,0.18)`. Transition `0.3s`.

### 6.9 Pillar Hover

On hover: background transitions to `--lemon` (#F2FFB8), `padding-left` increases by 12px. Duration `0.25s`. No JS required — pure CSS transition.

### 6.10 Footer CTA Cutout Figure

On section enter (triggered by IntersectionObserver at 12% viewport):

```css
/* Start state */
opacity: 0;
transform: translateY(12px);

/* End state */
opacity: 1;
transform: translateY(0);
transition: opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s;
```

The figure fades up after the headline words have begun their stagger animation, creating a sequence: words drop in → figure rises up.

---

## 7. Responsive Breakpoints

| Breakpoint | Label | Notes |
|---|---|---|
| 0–767px | Mobile | Single column, stacked layouts |
| 768–1023px | Tablet | Two-column where applicable, no hamburger |
| 1024px+ | Desktop | Full editorial grid layouts, section nav visible |

**Mobile first.** All CSS written for mobile, overridden upward at breakpoints.

**Critical mobile behaviours:**
- Editorial sections (What We Do, Best in B2B): image panel goes full-width on top, text panel below
- Capabilities: 2×2 grid (not 4-column)
- Process steps: 2×2 grid (not 4-column)
- Flagship cards: stacked full-width
- Section number column: hidden on mobile and tablet
- Footer CTA: stacked, headline first, sub + CTA below

---

## 8. Image Assets

| Filename | Section | Description |
|---|---|---|
| `hero.jpg` | Hero background | Dark film studio, director's chair, cinematic |
| `what-we-do.jpg` | What We Do panel | Overhead strategy meeting, glass office |
| `flagship-imm.jpg` | Flagship IMM card | Five-star hotel lobby, golden hour |
| `flagship-podcast.jpg` | Flagship Podcast card | Professional podcast studio, Shure mics |
| `best-in-b2b.jpg` | Best in B2B panel | Dallas production setup, city skyline |
| `cutout_model.png` | Footer CTA | PNG cutout of person, transparent background, chartreuse glow outline |
| `Exl_Logo_Black.png` | Nav + Footer | Official EXL wordmark, black on transparent, use at 28px (nav) / 24px (footer) |

All images provided as high-resolution JPG/PNG. Implement with `object-fit: cover` filling the full container. No cropping decisions by the developer — images are pre-framed.

**Performance:** Compress all images to WebP for production. Use `next/image` with appropriate `sizes` prop.

---

## 9. Copy Source

All website copy is locked and approved. The master copy document is `EXL_Website_Copy_Master_v4.docx`. Do not paraphrase, shorten, or rewrite any copy element. If copy and the mockup differ, the copy document is the authority.

Section labels (e.g. "What we do", "Featured Engagements") are display elements, not page headings. They appear above the H2 in small uppercase with a thin vertical rule between them.

---

## 10. Links & Routes

| Label | Route |
|---|---|
| Book a call | /contact |
| See what we do | /#what-we-do |
| Explore Advise | /services/advise |
| Explore Produce | /services/produce |
| Explore Build | /services/build |
| Explore Grow | /services/grow |
| Explore Integrated Marketing Management | /integrated-marketing-management |
| Explore Podcast Production | /podcast-production |
| Visit b2b.media | https://b2b.media |
| info@exl.agency | mailto:info@exl.agency |

Phase 1 ships the homepage only. All internal links except `/contact` can point to a `coming-soon` placeholder or `#` until Phase 2 pages are built.

---

## 11. SEO

| Tag | Value |
|---|---|
| `<title>` | EXL — B2B Consultancy & Production Studio |
| `meta description` | We advise, produce, build, and grow for ambitious B2B and luxury brands. Senior strategy, AI-native workflows, cinematic output. Dallas. |
| `og:title` | EXL — A B2B consultancy with its own production floor. |
| `og:description` | Senior strategy, AI-native workflows, cinematic output. From Dallas, for clients across North America and the Middle East. |
| `og:image` | `/og-image.jpg` (1200×630, hero image with EXL logo) |
| Canonical | https://exl.agency |

---

## 12. Performance Targets

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID/INP | < 200ms |
| Lighthouse Performance | ≥ 90 |

Use `next/image` for all images. Lazy-load all images except hero. Preload hero image. Defer GSAP until after first paint.

---

## 13. Handoff Checklist

- [ ] Approved mockup HTML (`index.html`) reviewed and agreed — **this is the design source of truth**
- [ ] Brand assets delivered: `Exl_Logo_Black.png`, `cutout_model.png`
- [ ] Photography delivered: 5 images listed in Section 8
- [ ] Copy document delivered: `EXL_Website_Copy_Master_v4.docx`
- [ ] Domain access confirmed (`exl.agency` on Vercel)
- [ ] Font licensing confirmed (Tusker Grotesk, Cabinet Grotesk — purchased separately)
- [ ] Phase 1 scope locked: homepage only
- [ ] Phase 2 scope confirmed: capability sub-pages + flagship service pages
- [ ] Capabilities grid confirmed as standalone section (not nested in editorial column)

---

## 14. What This Document Does Not Cover

- CMS integration (not in scope for Phase 1)
- Blog / Insights section (hidden until 3 articles published — see copy doc)
- Contact form backend
- Analytics integration
- Phase 2 pages

Questions to EXL: mo@exl.agency

---

*EXL Ventures LLC · exl.agency · Confidential — for Antigravity use only*
