# EXL Agency Website — Build Specification
**For:** Antigravity  
**Client:** EXL Ventures LLC  
**URL:** exl.agency  
**Prepared:** April 2026  
**Version:** 3.0  
**Last updated:** April 28, 2026 — includes all requirements from client direction session

---

## 1. Project Overview

EXL is a B2B consultancy and media production studio based in Dallas, Texas. The website serves as the primary commercial asset for winning high-value clients — five-star hospitality groups, B2B SaaS companies, private equity portfolios, and luxury brands.

**Primary objective:** A senior B2B decision-maker lands on the page and within 90 seconds understands exactly what EXL does, believes EXL operates at their level, and takes action to book a call.

**Reference mockup:** The approved HTML mockup (`index.html`) is the design source of truth. Pixel-match it. Where this spec extends beyond the mockup — additional pages, interactions, sections — follow the design system and direction established in the mockup exactly.

**Positioning:** EXL is an integrated marketing consultancy with its own production floor, AI-native workflows, and proprietary content distribution infrastructure. It is not a traditional agency. Every design and copy decision should reinforce this.

---

## 2. Scope

### Phase 1 — Homepage
The approved homepage mockup. Every section, animation, and layout described in this document applies to the homepage build. Ship this first.

### Phase 2 — Internal Pages
Four capability sub-pages, two flagship service pages, and a contact page. Each internal page functions as a standalone **landing page** suitable for paid advertising. This is not optional — the client intends to run paid ads directly to these pages from launch. They must convert independently without relying on the homepage.

### Phase 3 — Blog / Insights
A blog section with success stories and field notes. Hidden from nav and homepage until a minimum of three articles are published. Structure and templates built in Phase 2, content-gated until populated.

---

## 3. Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | GSAP + ScrollTrigger |
| Deployment | Vercel |
| Fonts | Tusker Grotesk + Cabinet Grotesk (see Section 3.2) |
| Images | Static assets (provided) |

**No CMS in Phase 1.** All copy is hardcoded from the approved copy document. CMS is a Phase 3 consideration.

---

## 4. Design System

### 4.1 Color Tokens

```css
/* Primary */
--chartreuse:   #DEFF00;   /* Brand accent — use sparingly, earns its moments */
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
- Page background is always `--off-white` (#EDE8DF). Never pure white (#FFFFFF) except for elements on dark backgrounds.
- Chartreuse is used for: CTAs, brand text moments on images, ticker background, footer CTA background, logo in nav, accent dots. It does NOT appear on every section — that is intentional. It earns its moments.
- The eerie dark section (`#1C2416`) breaks up the page's rhythm. It appears after the What We Do section and again as the Advantage section. Do not skip or reorder it.
- Secondary pastels (Nyanza, Sky, Lavender, Lemon) give individual sections personality without fighting the primary palette.

### 4.2 Typography

**Brand fonts (required for production):**

| Font | Role | Weight | Source |
|---|---|---|---|
| Tusker Grotesk | Headlines, capability names, all large display type | 7600 Semibold | Pangram Pangram Foundry |
| Cabinet Grotesk | Subheads, body, labels, buttons, all UI text | Black / Bold / Regular | Fontshare (free) |

**Development fallbacks (Google Fonts):**
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet">
```

**Important:** Bebas Neue is a development approximation only. Tusker Grotesk must be licensed and swapped in before launch. The letterforms are meaningfully different — do not ship with the fallback. Cabinet Grotesk is available free from Fontshare and should be used from the start.

**Type scale:**

| Role | Size | Weight | Font |
|---|---|---|---|
| Hero H1 | clamp(50px, 13vw, 130px) | Semibold | Tusker Grotesk |
| Section H2 | clamp(24px, 6vw, 44px) | Light 300 / Bold 600 | Cabinet Grotesk |
| Capability name | clamp(32px, 7vw, 62px) | — | Tusker Grotesk |
| Brand moment text | clamp(32px, 9vw, 68px) | — | Tusker Grotesk |
| Footer CTA H2 | clamp(54px, 14vw, 110px) | — | Tusker Grotesk |
| Body | 13–15px | 300–400 | Cabinet Grotesk |
| Section label | 9–10px | 600 | Cabinet Grotesk |
| CTA / Button | 10–11px | 700 | Cabinet Grotesk |

### 4.3 Spacing

8px base grid. Common values: 8, 16, 20, 24, 32, 40, 48, 56, 64, 80, 100px.

### 4.4 Border

All dividers: `0.5px solid rgba(0,0,0,0.08)`. Never 1px. The thinness is intentional and consistent throughout.

### 4.5 Logo

The EXL logo is a custom geometric wordmark — not a font, not an approximation.

**Asset:** `Exl_Logo_Black.webp` — black wordmark on transparent background.

**Usage:**
- Nav and all light backgrounds (off-white, pale silver, lavender): use as-is
- Dark backgrounds (eerie, black): apply `filter: brightness(0) invert(1)` to render white
- Chartreuse backgrounds: use as-is (black on chartreuse is an approved combination)

**Sizing:** 28px height in nav, 24px height in footer. Width: auto. Never distort proportions.

**Do not** recreate the logo in CSS or substitute any font. Always use the provided PNG.

### 4.6 Brand Cutout Treatment

EXL's brand identity uses a signature cutout effect: PNG images of people are cut out against a transparent background and displayed with a chartreuse glow outline around the subject. This treatment appears in the brand guidelines on billboards, social ads, and on the website footer CTA.

**Current asset:** `cutout_model.webp` — chartreuse outline is baked into the PNG.

**For future cutout assets without a baked-in outline:**
```css
filter: drop-shadow(0 0 0 8px #DEFF00);
```
Use `drop-shadow` not `box-shadow`. `drop-shadow` follows the transparent cutout shape. `box-shadow` follows the rectangular bounding box and will not produce the correct effect.

---

## 5. Page Structure — Homepage

| # | Section | Background |
|---|---|---|
| — | Navigation | Off-white (fixed) |
| 1 | Hero | Eerie Black `#1C2416` |
| 2 | Credibility Line | Eerie Black (continuation) |
| 3a | What We Do — Editorial panel | Off-white + image panel |
| 3b | What We Do — Pinned scroll capabilities | Off-white |
| 4 | The EXL Advantage | Eerie Black `#1C2416` |
| 5 | Credibility Ticker | Chartreuse `#DEFF00` |
| 6 | How We're Different | Off-white |
| 7 | Flagship Services | Off-white |
| 8 | Best in B2B | Lavender `#E0C8F8` + image panel |
| 9 | How We Work | Pale Silver `#CEC5B7` |
| 10 | Footer CTA | Chartreuse `#DEFF00` |
| — | Footer | Black `#000000` |

---

## 6. Section Specifications — Homepage

### 6.1 Navigation

**Mobile (< 768px):**
- Logo left, hamburger right, Book a Call button right of hamburger
- Fixed position, 52px height, off-white background
- Hamburger opens a full-screen mobile menu (slide down or fade in)
- On scroll past 50px: bottom border increases to `rgba(0,0,0,0.18)`

**Tablet (768–1023px):**
- Logo left, Call us link + Book a Call button right
- Hamburger hidden
- 56px height

**Desktop (≥ 1024px):**
- Logo left, nav links center, Call us + Book a Call right
- Nav links: Services, IMM, Podcast Production, Best in B2B, About
- 56px height

---

### 6.2 Hero (Section 1)

**Layout:** Full viewport height (`100svh`). Content pinned to bottom-left. Photography fills entire background.

**Background image:** `hero.webp` — dark film studio, director's chair, cinematic. Apply bottom-to-top gradient: `rgba(0,0,0,0.85)` at bottom, transparent at top.

**Brand element:** Giant ghost letterform "EXL" behind content. Tusker Grotesk, ~95vw font size, `rgba(222,255,0,0.04)` opacity. Bottom-left positioned. Decorative only — not interactive.

**Copy (exact):**
```
Eyebrow:  exl.agency · Dallas, Texas
H1:       A B2B consultancy with its own production floor.
          "production" renders in --chartreuse
Sub:      We advise, produce, build, and grow for ambitious B2B 
          and luxury brands. Senior strategy, AI-native workflows, 
          cinematic output. From Dallas, for clients across North 
          America and the Middle East.
CTA 1:    Book a call        → /contact
CTA 2:    See what we do     → /#capabilities
```

**CTAs:** Flat rectangular. "Book a call": black background, chartreuse text. "See what we do": transparent, white text, 0.5px white border.

---

### 6.3 Credibility Line (Section 2)

Eerie black continuation of hero. 18–20px padding top/bottom.

**Copy (exact):**
> Trusted to run the marketing function for a flagship IHG resort property, and to produce Best in B2B, the only B2B podcast filmed on location across Dallas-Fort Worth.

"A flagship IHG resort property" and "Best in B2B" render at `rgba(255,255,255,0.85)`. Surrounding text at `rgba(255,255,255,0.45)`.

---

### 6.4 What We Do — Editorial Panel (Section 3a)

**Desktop layout:** Three-column CSS Grid — `28% 57% 15%`
- Column 1 (28%): Label, rule, H2, intro paragraph
- Column 2 (57%): Full-height photography
- Column 3 (15%): Section number `02 — What we do`, vertical text

**Mobile layout:** Image first, full width, `60vw` min-height. Text panel below.

**Image:** `what-we-do.webp` fills column with `object-fit: cover`. Bottom gradient. Brand moment text at bottom.

**Brand moment:** "No handoffs." in `--chartreuse`, Tusker Grotesk, `clamp(32px, 9vw, 68px)`. Wipes in left-to-right on scroll enter. See animation Section 8.3.

**Copy (exact):**
```
Label:  What we do
H2:     One firm. Four capabilities. No handoffs.
Intro:  Most B2B brands juggle a strategy firm, an agency, a dev 
        shop, and a freelancer. We built EXL so you don't have to.
```

---

### 6.5 What We Do — Pinned Scroll Capabilities (Section 3b)

**This is the primary capabilities interaction. It is a scroll-pinned experience, not a static grid.**

The client specifically requested this layout: the section headline pins to the left side of the screen while the four capability panels scroll into view one by one on the right as the user scrolls down through the section.

**Behaviour:**
- The section occupies `400vh` of scroll distance on desktop
- The left column (28%) containing the label, H2, and intro is pinned via `ScrollTrigger pin: true` for the full duration of the section
- The right column (57%) contains the four capability panels stacked vertically. They scroll normally — one panel per 100vh of scroll
- As each capability panel reaches the center of the viewport, it snaps or smoothly settles into a fully-visible state
- The section number column (15%) remains static

**Left column (pinned) — copy (exact):**
```
Label:  What we do
H2:     One firm. Four capabilities. No handoffs.
Intro:  Most B2B brands juggle a strategy firm, an agency, a 
        dev shop, and a freelancer. We built EXL so you don't 
        have to.
```

**Right column — four panels:**

Each panel is a full-height card (`100vh` tall on desktop) with a background color. The capability name is in Tusker Grotesk, large. Body text and Explore link sit below.

| Panel | Capability | Background |
|---|---|---|
| 01 | Advise. | `--nyanza` (#E8FFDC) |
| 02 | Produce. | `--sky` (#B8D0F0) |
| 03 | Build. | `--pale-silver` (#CEC5B7) |
| 04 | Grow. | `--chartreuse` (#DEFF00) |

**Panel copy (exact):**

**Advise.**
> Positioning, brand, and go-to-market strategy from a team that has built businesses across three continents. We sit in the room before we pick up a camera.

**Produce.**
> Podcasts, video, and social content shot in-house from our Dallas studio. Every frame shot and lit the way a film crew would. Every sound captured the way a record label would. B2B that looks like media.

**Build.**
> Projects, launches, and integrated campaigns executed end to end. A new brand identity. A product launch. A website tied to a campaign moment. We scope it, build it, ship it, measure it.

**Grow.**
> Partnerships, channels, and distribution systems that turn content into pipeline. Because strategy and production don't matter if no one sees the work.

Each panel links to its capability sub-page: `/services/advise`, `/services/produce`, `/services/build`, `/services/grow`.

**Mobile fallback:** On mobile and tablet, the pinned scroll interaction is replaced by a simple 2×2 grid of cards (same colors, same copy). The scroll interaction is desktop only (`≥ 1024px`).

**GSAP implementation:**
```javascript
// Pin the left column for the full scroll distance of the section
ScrollTrigger.create({
  trigger: ".capabilities-section",
  start: "top top",
  end: "bottom bottom",
  pin: ".capabilities-left",
  pinSpacing: false
});

// Animate each panel as it enters the viewport
gsap.utils.toArray(".cap-panel").forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top 60%",
    onEnter: () => panel.classList.add("active"),
    onLeaveBack: () => panel.classList.remove("active")
  });
});
```

---

### 6.6 The EXL Advantage (Section 4)

**Background:** Eerie Black `#1C2416`

**Desktop layout:** Two-column grid, `1fr 1fr`, 88px gap.

**Copy (exact):**
```
Label:  The EXL Advantage
H2:     A traditional consultancy with an AI-native engine underneath.
        "AI-native" renders in --chartreuse
Body:   Every EXL deliverable runs through an AI-accelerated workflow. 
        Not to replace the work, to compress the timeline. We build 
        and maintain internal automation systems that handle research, 
        transcription, editing assistance, content repurposing, CRM sync, 
        and distribution, so our senior team spends their hours on strategy 
        and craft, not on tasks a machine can do better.

Sub-label: What this means for you:

Bullet 1:  Weeks, not quarters, from brief to first delivery.
Bullet 2:  Senior judgment on every decision, with machines doing the 
           lift underneath.
Bullet 3:  Production and distribution systems that scale with your 
           growth, not your headcount.
```

Bullets use a small chartreuse dot as marker. Not a standard HTML list bullet.

---

### 6.7 Credibility Ticker (Section 5)

Full-width horizontal marquee. Background: chartreuse `#DEFF00`. Black text.

Scrolls continuously left at approximately 22s per full loop. Seamless — duplicate items for infinite loop.

**Items:**
```
Senior Strategy  ▲  IHG Resort Partner  ▲  AI-Native Workflows  ▲  
Best in B2B  ▲  Dallas Studio  ▲  Cinematic Production  ▲  
North America · Middle East  ▲
```

`▲` is the brand triangle symbol from the EXL brand guidelines. Black, 30% opacity.

---

### 6.8 How We're Different (Section 6)

**Background:** Off-white

**Desktop layout:** Three columns, separated by 0.5px borders. Text only. No cards, no shadows.

**Copy (exact):**
```
Label:  Why clients pick EXL
H2:     Why clients pick EXL over the alternatives.
```

**Pillar 1 — Senior strategy, not junior execution.**
> Every engagement is led by a founder with international consulting experience across three continents. You get the senior thinking the big firms charge for, without the layers between you and the person actually solving your problem.

**Pillar 2 — AI-native, so your timeline isn't a problem.**
> We built our production and content stack on AI from day one. A lean Dallas team ships in weeks what traditional agencies ship in quarters. You move at the pace of your market, not the pace of your agency.

**Pillar 3 — Engineered for impact, top to bottom.**
> Every decision, from the strategy brief to the lens choice on the shoot, runs through one filter: will this move the number? We build marketing that's accountable from planning through delivery, and we own the outcome end to end.

**Hover state:** Each pillar gets `--lemon` (#F2FFB8) background + 12px left padding on hover. Transition 0.25s.

---

### 6.9 Flagship Services (Section 7)

**Background:** Off-white

**Copy (exact):**
```
Label:  Featured Engagements
H2:     Two engagements we're known for.
Intro:  Most EXL clients start with one of these two offers. Both 
        combine our four capabilities into a single monthly engagement, 
        led by a senior partner, delivered by our in-house team.
```

**Two full-height cards side by side** (stacked on mobile). Min-height 560px desktop.

**Card structure:** Photography fills entire card as background layer. Semi-transparent dark overlay (35% black). Bottom gradient (85% black at bottom, transparent at top). Ghost brand text at top-left wipes in on enter. Service info panel at bottom.

**Card 1 — IMM:**
```
Image:       flagship-imm.webp (five-star hotel lobby)
Brand text:  YOUR MARKETING DEPT.   (chartreuse, 12% opacity, Tusker Grotesk)
Tag:         Flagship Service — 01
Title:       Integrated Marketing Management.
Body:        Your marketing department, on retainer. Strategy, online 
             presence, PR coordination, social oversight, collateral, 
             influencer programs, and vendor management, all run by one 
             accountable team. Built for five-star hospitality, luxury 
             brands, and B2B companies whose reputation is their asset.
CTA:         Explore Integrated Marketing Management → /integrated-marketing-management
CTA style:   Chartreuse pill, black text
```

**Card 2 — Podcast:**
```
Image:       flagship-podcast.webp (podcast studio, Shure mics)
Brand text:  A SHOW WORTH WATCHING.   (chartreuse, 12% opacity, Tusker Grotesk)
Tag:         Flagship Service — 02
Title:       B2B Video Podcast Production.
Body:        A cinematic B2B video podcast that builds pipeline, not just 
             downloads. We run the show end to end: strategy, guest pipeline, 
             on-location production, post-production, and distribution. The 
             same engine we use to produce Best in B2B.
CTA:         Explore Podcast Production → /podcast-production
CTA style:   Outline pill, white text
```

---

### 6.10 Best in B2B (Section 8)

**Desktop layout:** Three-column grid — `28% 57% 15%`
- Column 1 (28%): Text panel, background `--lavender`
- Column 2 (57%): Image panel, full height photography
- Column 3 (15%): Section number `04 — Our work`, vertical text, background `--lavender`

**Mobile layout:** Text panel first, image below.

**Image:** `best-in-b2b.webp` — Dallas on-location production setup, camera rig, Dallas skyline at golden hour through floor-to-ceiling windows. Brand moment text at bottom.

**Brand moment:** "Best in B2B." in `--chartreuse`, Tusker Grotesk. Left-to-right wipe on scroll enter.

**Copy (exact):**
```
Label:  Owned Media
H2:     Our most visible build: Best in B2B.
Body:   Best in B2B is our own video podcast, filmed on location 
        across Dallas-Fort Worth. Framework-driven conversations 
        with the operators shaping the market. Everything we build 
        for our clients, we built here first.
CTA:    Visit b2b.media  → https://b2b.media
```

---

### 6.11 How We Work (Section 9)

**Background:** Pale Silver `#CEC5B7`

**Copy (exact):**
```
Label:  How we work
H2:     Four steps. No theater.
```

**Four steps:** 4-column desktop, 2×2 mobile.

**Step 1 — Discover.**
> We dig into your market, your buyer, and your brand. Not a workshop. A real audit.

**Step 2 — Strategize.**
> We ship a positioning, content, and distribution plan you can actually execute.

**Step 3 — Produce and manage.**
> Our Dallas team films, edits, writes, designs, and builds in-house. For anything we don't do under our roof, we manage the vendors, the timelines, and the quality so you don't have to.

**Step 4 — Distribute.**
> We deploy across paid, earned, and owned channels, then measure what moved pipeline.

Step numbers: Tusker Grotesk, ~64px, `rgba(0,0,0,0.10)`. Decorative only.

---

### 6.12 Footer CTA (Section 10)

**Background:** Chartreuse `#DEFF00`. `position: relative; overflow: hidden`.

**Layout:** Two-column desktop (headline left, sub + CTA right). Stacked mobile.

**Cutout brand element:** `cutout_model.webp` positioned absolutely, bottom-right, `height: 115%`, `right: -10px`. Bleeds above the section. Desktop only at full opacity. Mobile: `height: 70%`, `opacity: 0.5`.

**Content area:** `max-width: 50%` on desktop so copy doesn't compete with the figure.

**Copy (exact):**
```
H2:    Let's build something worth watching.
Sub:   Book a 20-minute call. No deck, no pitch. Just a conversation 
       about what you're trying to ship.
CTA:   Book a call   → /contact
       info@exl.agency
```

H2: Tusker Grotesk, `clamp(54px, 14vw, 110px)`, black.

---

### 6.13 Footer

**Background:** Black `#000000`

Three-column desktop, stacked mobile.

**Column 1:**
```
Logo:     Exl_Logo_Black.webp at 24px, filter: brightness(0) invert(1)
Tagline:  A B2B consultancy and media production studio.
Address:  825 Watters Creek Blvd., Building M, Suite 250
          Allen, Texas 75013
          info@exl.agency
```

**Column 2 — Services:** Advise, Produce, Build, Grow, Integrated Marketing Management, Podcast Production

**Column 3 — Company:** About, Best in B2B, Insights, Contact, LinkedIn, YouTube, Instagram

**Bottom bar:** `© 2026 EXL Ventures LLC. All rights reserved.` — left. `exl.agency` — right.

---

## 7. Animation Specifications — Homepage

All animations use GSAP + ScrollTrigger in production.

### 7.1 Hero Entrance (on load)

| Element | Animation | Duration | Delay | Easing |
|---|---|---|---|---|
| Ghost EXL letterform | Fade in | 2.5s | 0.1s | ease-out |
| Eyebrow | Fade up 22px | 0.6s | 0.3s | ease-out |
| H1 | Fade up 32px | 0.9s | 0.45s | power2.out |
| Sub text | Fade up 22px | 0.6s | 0.85s | ease-out |
| CTA buttons | Fade up 22px | 0.6s | 1.05s | ease-out |

### 7.2 Default Scroll Reveal

`opacity: 0 → 1`, `translateY: 26px → 0`. Duration `0.65s`, easing `power2.out`. Trigger at `80%` viewport.

Applies to: all section labels, H2s, body text, links, footer columns.

### 7.3 Brand Text Wipe

The EXL brand's signature motion. Feels like a film title reveal — confident and immediate.

```
clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)
Duration: 1.0s
Easing: power4.out
Trigger: 25% viewport
```

**Applies to:** "No handoffs." on What We Do, "Best in B2B." on Best in B2B, ghost brand text on Flagship cards.

### 7.4 Capabilities Pinned Scroll

See Section 6.5 for full GSAP implementation. The left column pins for `400vh`. Each panel activates as it enters the viewport at 60%.

### 7.5 Capabilities Cards (mobile fallback grid)

On mobile where the pinned scroll becomes a static grid: stagger cards 1–4 fade up, `110ms` between each. Trigger at 10% viewport.

### 7.6 Advantage Stats

Slide in from right. `translateX: 20px → 0`, `opacity: 0 → 1`. Stagger `130ms`. Trigger at 10% viewport.

### 7.7 Flagship Image Settle

On card enter: image `scale(1.04) → scale(1)`. Duration `1.3s`, `power2.out`. Creates a subtle settle on enter.

### 7.8 Footer Headline

Each word in "Let's build something worth watching." drops in sequentially. `translateY: 55% → 0`, `opacity: 0 → 1`. Stagger `75ms` per word.

### 7.9 Footer Cutout Figure

On section enter: `opacity: 0 → 1`, `translateY: 12px → 0`. Duration `0.7s`, delay `0.3s`, `ease-out`. Fires after the headline words begin their stagger.

### 7.10 Nav Border on Scroll

After 50px scroll: nav bottom border increases to `rgba(0,0,0,0.18)`. Transition `0.3s`.

### 7.11 Pillar Hover

CSS only. `background → --lemon`, `padding-left +12px`. Duration `0.25s`.

---

## 8. Responsive Breakpoints

| Breakpoint | Label | Notes |
|---|---|---|
| 0–767px | Mobile | Single column, stacked layouts, pinned scroll disabled |
| 768–1023px | Tablet | Two-column where applicable, pinned scroll disabled |
| 1024px+ | Desktop | Full editorial grids, section nav visible, pinned scroll active |

**Mobile first.** All CSS written for mobile, overridden upward.

**Critical mobile behaviours:**
- Capabilities section: pinned scroll → 2×2 static grid
- Editorial sections (What We Do, Best in B2B): image top, text below
- Flagship cards: stacked full-width
- Section number column: hidden on mobile and tablet
- Footer CTA cutout: `height: 70%`, `opacity: 0.5`
- Footer CTA: headline first, sub + CTA below

---

## 9. Image Assets

| Filename | Section | Notes |
|---|---|---|
| `hero.webp` | Hero | Dark film studio, director's chair |
| `what-we-do.webp` | What We Do panel | Overhead strategy meeting |
| `flagship-imm.webp` | Flagship IMM card | Five-star hotel lobby, golden hour |
| `flagship-podcast.webp` | Flagship Podcast card | Podcast studio, Shure mics |
| `best-in-b2b.webp` | Best in B2B panel | Dallas production setup, city skyline |
| `cutout_model.webp` | Footer CTA | PNG cutout, transparent bg, chartreuse outline baked in |
| `Exl_Logo_Black.webp` | Nav + Footer | Black wordmark on transparent bg |

All photography: `object-fit: cover`, `object-position: center`. No developer cropping decisions — images are pre-framed.

**Performance:** Convert all photography to WebP. Use `next/image` with correct `sizes`. Lazy-load all images except hero. Preload hero. Defer GSAP until after first paint.

---

## 10. Phase 2 — Internal Pages

### 10.1 Principles

Every internal page is a **standalone landing page**. A visitor arriving from a paid ad should be able to understand what EXL does, what this specific service delivers, and take action — without ever visiting the homepage. Each page must:

- Open with a clear hero that states the service and its commercial outcome
- Show the most relevant credibility signal above the fold
- Have a prominent Book a Call CTA within the first scroll
- Use the same design system, color rhythm, and animation language as the homepage

### 10.2 Pages in Scope

| URL | Page | Priority |
|---|---|---|
| `/services` | Services overview | High |
| `/services/advise` | Advise capability | High |
| `/services/produce` | Produce capability | High |
| `/services/build` | Build capability | Medium |
| `/services/grow` | Grow capability | Medium |
| `/integrated-marketing-management` | IMM flagship | High — primary ad landing page |
| `/podcast-production` | Podcast Production flagship | High — primary ad landing page |
| `/contact` | Contact / Book a call | High |

The two flagship pages (`/integrated-marketing-management` and `/podcast-production`) sit at the root level — not nested under `/services` — for shorter URLs suitable for outreach and ads.

### 10.3 Services Overview Page (`/services`)

This page functions as a conversion-optimised overview of all four capabilities. It is a landing page for broad brand awareness ads. It should:

- Open with the hero: "Consulting-grade thinking. In-house execution. One team."
- Present all four capabilities with clear descriptions and links
- Feature both flagship services as cards
- Include the three differentiator pillars
- End with a strong footer CTA

Copy source: `EXL_Website_Copy_Master_v4.docx` — Page 2.

### 10.4 Capability Sub-Pages

Each capability page follows the same template:

1. **Hero** — Capability name large, one-line descriptor, Book a Call CTA
2. **Problem** — The specific problem this capability solves (2–3 sentences)
3. **What's inside** — The specific services within this capability (styled list or cards)
4. **How it's different** — Three differentiators specific to this capability
5. **Deliverables** — What the client walks away with
6. **Process** — The engagement process for this capability
7. **Who it's for** — Target client description
8. **Footer CTA** — Same as homepage

Copy source: Pages 3–6 of `EXL_Website_Copy_Master_v4.docx`.

### 10.5 Flagship Service Pages

The two flagship pages are the highest-priority ad landing pages. They must convert.

Structure:
1. **Hero** — Service name, positioning line, Book a Discovery Call CTA
2. **Problem** — The specific pain point this solves
3. **What's inside** — Full service breakdown
4. **How it's different** — Three reasons this is different from alternatives
5. **Deliverables** — Monthly deliverables list
6. **Process** — The four engagement phases
7. **Who it's for** — Target client
8. **FAQ** — 4–5 most common questions (copy provided)
9. **Footer CTA**

Copy source: Pages 7–8 of `EXL_Website_Copy_Master_v4.docx`.

---

## 11. Phase 3 — Blog / Insights

### 11.1 When to Build

The Insights section is built in Phase 2 but remains hidden until populated. It is hidden from:
- The site navigation
- The homepage
- Sitemaps

It becomes visible when a minimum of three articles are published. The client controls this toggle.

### 11.2 Content Direction

Articles are not generic marketing content. They are:
- Essays and frameworks from the EXL team on B2B marketing, media strategy, and production
- Field notes from producing Best in B2B
- Client success stories (written as case studies, without naming clients where confidentiality applies)

The blog serves a dual purpose: SEO and portfolio evidence. Since EXL cannot display a traditional client logo wall at launch, success stories in article format serve as the proof layer.

### 11.3 URL Structure

```
/insights              — index page, grid of articles
/insights/[slug]       — individual article
```

### 11.4 Article Template

Each article page should include:
- Article title and date
- Author name and title
- Estimated read time
- Article body with proper heading hierarchy
- Related articles (3 max)
- Footer CTA (same as homepage)

---

## 12. SEO

### 12.1 Homepage

| Tag | Value |
|---|---|
| `<title>` | EXL — B2B Consultancy & Production Studio |
| `meta description` | We advise, produce, build, and grow for ambitious B2B and luxury brands. Senior strategy, AI-native workflows, cinematic output. Dallas. |
| `og:title` | EXL — A B2B consultancy with its own production floor. |
| `og:description` | Senior strategy, AI-native workflows, cinematic output. From Dallas, for clients across North America and the Middle East. |
| `og:image` | `/og-image.webp` (1200×630) |
| Canonical | https://exl.agency |

### 12.2 Internal Pages

Each internal page has its own unique title, meta description, and OG image. Follow this pattern:

| Page | Title | Meta Description |
|---|---|---|
| `/services` | EXL Services — Advise, Produce, Build, Grow | Consulting-grade thinking and in-house execution for ambitious B2B and luxury brands. |
| `/services/advise` | EXL Advise — Senior B2B Strategy & Consulting | Positioning, brand, and go-to-market strategy from a team that has built businesses across three continents. |
| `/services/produce` | EXL Produce — Cinematic B2B Video & Podcast Production | In-house video, podcast, and content production from our Dallas studio. B2B that looks like media. |
| `/services/build` | EXL Build — Integrated Campaigns & Project Execution | Projects, launches, and integrated campaigns executed end to end. We scope it, build it, ship it, measure it. |
| `/services/grow` | EXL Grow — B2B Distribution, Paid Media & CRM | Distribution systems that turn content into pipeline. Paid media, organic, email automation, and reporting. |
| `/integrated-marketing-management` | Integrated Marketing Management — EXL | Your marketing department, on retainer. Strategy, presence, PR, social, collateral — one accountable team. |
| `/podcast-production` | B2B Video Podcast Production — EXL | A cinematic B2B video podcast that builds pipeline. Strategy, guests, production, distribution — one engine. |

### 12.3 Technical SEO

- Canonical tags on all pages
- `next/head` for all meta tags
- Structured data: `Organization` schema on homepage
- `sitemap.xml` auto-generated via Next.js
- `robots.txt` — exclude `/insights` until Phase 3 goes live
- All images have descriptive `alt` attributes
- Page speed target: LCP < 2.5s on mobile

---

## 13. Links & Routes

| Label | Route |
|---|---|
| Book a call | /contact |
| See what we do | /#capabilities |
| Explore Advise | /services/advise |
| Explore Produce | /services/produce |
| Explore Build | /services/build |
| Explore Grow | /services/grow |
| Explore IMM | /integrated-marketing-management |
| Explore Podcast Production | /podcast-production |
| Visit b2b.media | https://b2b.media |
| info@exl.agency | mailto:info@exl.agency |
| LinkedIn | https://linkedin.com/company/exlagency |
| YouTube | https://youtube.com/@exlagency |
| Instagram | https://instagram.com/exlagency |

Phase 1: all internal links except `/contact` point to `#` until Phase 2 pages are built.

---

## 14. Performance Targets

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse Performance (desktop) | ≥ 95 |

---

## 15. Handoff Checklist

**Assets to be delivered by EXL before build starts:**
- [ ] `index.html` — approved mockup, design source of truth
- [ ] `Exl_Logo_Black.webp` — official wordmark
- [ ] `cutout_model.webp` — footer CTA cutout figure
- [ ] `hero.webp` — hero background photography
- [ ] `what-we-do.webp` — What We Do panel photography
- [ ] `flagship-imm.webp` — IMM card photography
- [ ] `flagship-podcast.webp` — Podcast card photography
- [ ] `best-in-b2b.webp` — Best in B2B panel photography
- [ ] `EXL_Website_Copy_Master_v4.docx` — all approved copy
- [ ] Tusker Grotesk font files (purchased from Pangram Pangram)
- [ ] Cabinet Grotesk font files (free from Fontshare)
- [ ] Vercel project access for `exl.agency`
- [ ] Domain DNS access for `exl.agency`

**Confirmed before build starts:**
- [ ] Approved mockup reviewed and signed off by EXL
- [ ] Phase 1, 2, and 3 scope locked
- [ ] Pinned scroll capabilities interaction confirmed (Section 6.5)
- [ ] Services pages confirmed as standalone landing pages (Section 10.1)
- [ ] Blog section confirmed as hidden until populated (Section 11.1)

---

## 16. Out of Scope

- CMS or content management system (Phase 3 consideration)
- Contact form backend / email handling (coordinate separately)
- Analytics and tracking setup (coordinate separately)
- A/B testing infrastructure
- Multilingual support
- Client portal or authenticated pages

---

*EXL Ventures LLC · exl.agency · Confidential — for Antigravity use only*
