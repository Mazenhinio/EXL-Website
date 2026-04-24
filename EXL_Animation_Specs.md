# EXL Website — Animation & Interaction Specs
**Handoff document for Antigravity**
**Page: Homepage (exl.agency)**
**Version: 1.0 — In progress**

---

## SECTION 2 — WHAT WE DO
**Copy reference:** "One firm. Four capabilities. No handoffs."
**Cards:** Advise / Produce / Build / Grow

### Layout
Each capability (Advise, Produce, Build, Grow) is its own full-width card. Cards are stacked vertically in scroll order. Each card spans the full viewport width and is tall enough to display its heading, body copy, and CTA comfortably — roughly 80–90vh.

Cards alternate background colors per EXL brand:
- Odd cards (Advise, Build): Black background, chartreuse heading
- Even cards (Produce, Grow): Chartreuse background, black heading
(Antigravity to confirm final color sequence with design direction.)

A large ghost numeral (01, 02, 03, 04) sits flush right on each card, low opacity, in the card's own background color — oversized, cropped at the right edge. Same treatment as reference screenshots.

---

### Scroll-Stacking Animation

**Trigger:** Scroll position

**Behavior per card:**

As the user scrolls down and the *next* card begins to enter the viewport from the bottom:

1. **Scale down** — The current (active) card shrinks in both width and height simultaneously. It does not disappear — it scales to approximately 90–92% of its original size, centered horizontally. Think of it as zooming out to make room for what's coming.

2. **Blur** — As the card scales down, a subtle blur is applied to it (approximately 2–4px blur). The blur increases proportionally with the scale reduction. It should feel like the card is receding into the background, not disappearing.

3. **Stack** — The incoming card slides up from the bottom and lays on top of the now-scaled-down previous card. The previous card remains visible beneath it — slightly smaller, slightly blurred — creating a physical stacking effect like cards on a table.

4. **Persistence** — All previous cards remain in the stack below, each progressively smaller and more blurred the further back they are. By card 4 (Grow), cards 1–3 are visible as a layered stack beneath it.

**Easing:** Smooth, spring-like. Not linear. Suggested: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` or equivalent spring easing.

**Scroll scrubbing:** The animation is tied directly to scroll position — it is not triggered once and played. It should feel physical, like the user's scroll is literally pushing the cards down.

---

### Globe Element (Top Right)
A wireframe globe icon sits in the top-right corner of the section — or optionally fixed to the viewport top-right during this section's scroll duration.

**Behavior:**
- Rotates continuously and slowly on its Y axis (spin), independent of scroll.
- Circular text ring orbits around it (text reads something brand-relevant — TBD, placeholder in reference reads skills/tags).
- Rotation speed: slow and ambient — roughly one full rotation every 8–10 seconds.
- This is a decorative ambient element, not interactive.

---

---

## SECTION 4 — CREDIBILITY LINE
**Copy reference:** "Trusted to run the marketing function for a flagship IHG resort property, and to produce Best in B2B, the only B2B podcast filmed on location across Dallas-Fort Worth."

### Layout
Full-width horizontal marquee ticker. No other content in this section. The section is narrow in height — roughly 120–160px tall. It sits as a visual break between Section 3 and Section 5.

### Marquee Behavior
- The credibility line scrolls continuously from right to left, looping seamlessly
- The text repeats with a **separator mark** between each loop — use a chartreuse **✦** or **·** symbol as the divider
- Two or three instances of the text run simultaneously so the loop is never visibly empty
- Speed: medium-slow — readable but clearly in motion. Approximately 60–80 seconds for one full pass across the viewport
- Scrolling is **not tied to user scroll position** — it runs autonomously, always moving
- On hover: marquee **pauses**

### Typography & Color
- Font: Tusker Grotesk Semibold, all caps
- Font size: Large — approximately 2.5–3rem
- Background: Black
- Text: Chartreuse on first pass, white on second pass — alternating per loop instance, so both are always visible simultaneously in the ticker

### Entry Animation
- On scroll-into-view: the ticker band slides in from the right edge of the viewport, settling into its looping position
- Entry duration: ~600ms, ease-out
- Once settled, the autonomous loop begins immediately

---

---

## SECTION 5 — HOW WE'RE DIFFERENT
**Copy reference:** "Why clients pick EXL over the alternatives."
**Three pillars:** Senior strategy / AI-native / Engineered for impact

### Layout
The section is **pinned/sticky** for the full duration of its scroll. The page does not visually advance while the user scrolls through this section — instead, scroll progress drives the internal animation. The section only unpins and releases the user to the next section once all three pillars have been revealed.

The layout has two parts:
- **Top half:** Main section headline + three pillar tab labels + progress bar — all static and sticky
- **Bottom half:** Content area where pillar copy swaps in and out

---

### Progress Bar

A full-width horizontal bar sits below the three pillar tab labels. It is divided into three equal segments — one per pillar.

**Color:** Chartreuse (`#C8F135` or brand equivalent)
**Background track:** Dark grey or black at low opacity — the unfilled portion of the bar

**Behavior:**
- As the user scrolls, the bar fills from **left to right**, continuously
- The fill is tied directly to scroll position — it is scrubbed, not played automatically
- Each third of the bar corresponds to one pillar
- When the fill crosses the boundary of each segment, the content below transitions to the next pillar

**Tab labels above the bar:**
Three labels sit evenly spaced above the bar, each aligned to its segment:
1. `SENIOR STRATEGY, NOT JUNIOR EXECUTION`
2. `AI-NATIVE, SO YOUR TIMELINE ISN'T A PROBLEM`
3. `ENGINEERED FOR IMPACT, TOP TO BOTTOM`

Active tab label treatment: full opacity, white or chartreuse
Inactive tab labels: reduced opacity (~30%), greyed out
As the bar progresses into each segment, that segment's label activates

---

### Content Area — Pillar Swap Animation

**Transition type:** Fade off / fade on — not a slide, not a wipe. Pure opacity.

- Outgoing pillar content: fades to 0 opacity over ~300ms
- Incoming pillar content: fades in from 0 to full opacity over ~300ms
- There is a very brief overlap or crossfade (~100ms) so the transition doesn't feel like a hard cut

**Each pillar content block contains:**
- Pillar headline (Tusker Grotesk, large)
- Body copy (Cabinet Grotesk Regular, body size)
- No CTA needed in this section — this is a proof/differentiator block, not a conversion moment

**Pillar 1 — Senior strategy, not junior execution**
> Every engagement is led by a founder with international consulting experience across three continents. You get the senior thinking the big firms charge for, without the layers between you and the person actually solving your problem.

**Pillar 2 — AI-native, so your timeline isn't a problem**
> We built our production and content stack on AI from day one. A lean Dallas team ships in weeks what traditional agencies ship in quarters. You move at the pace of your market, not the pace of your agency.

**Pillar 3 — Engineered for impact, top to bottom**
> Every decision, from the strategy brief to the lens choice on the shoot, runs through one filter: will this move the number? We build marketing that's accountable from planning through delivery, and we own the outcome end to end.

---

### Section Headline
**Text:** "WHY CLIENTS PICK EXL OVER THE ALTERNATIVES."
**Font:** Tusker Grotesk Semibold
**Position:** Top-left of the pinned section, static — does not animate
**Color:** White on black background

---

### Background
Black throughout. The chartreuse progress bar and active tab label are the only color elements. Content text is white.

---

---

## SECTION 6 — FLAGSHIP SERVICES
**Copy reference:** "Two engagements we're known for."
**Services:** Integrated Marketing Management / B2B Video Podcast Production

---

### Phase 1 — Section Headline Entry

**Text:** "TWO ENGAGEMENTS WE'RE KNOWN FOR."
**Font:** Tusker Grotesk Semibold, large — not full viewport scale, but commanding. Roughly 8–10vw.
**Position:** Centered or left-aligned, upper portion of the section

**Animation:**
- As the user scrolls into this section, the headline **scrolls upward** while simultaneously **fading in** from 0 to full opacity
- The two effects happen together: translate Y upward + opacity increase, tied to scroll position
- By the time the headline reaches its resting position, it is fully opaque
- Once settled, it stays fixed in place as the cards below animate in

---

### Phase 2 — Service Cards (Alternating Left / Right)

There are **two service cards** — one per flagship service. They appear sequentially as the user scrolls, alternating sides:

- **Card 1 — Integrated Marketing Management:** enters from the **left**
- **Card 2 — B2B Video Podcast Production:** enters from the **right**

---

### Card Animation — iPhone App Open Effect

Each card animates in using an **expand-from-center** motion that mimics opening an app on iPhone — the card starts as a small, centered rectangle and scales outward to its full size, as if the content is blooming open from a single point.

**Detailed behavior:**
- Initial state: the card exists at roughly 5–8% of its final size, centered on its entry point, fully transparent
- As scroll progresses: the card scales up (transform: scale) from its center origin simultaneously with fading in (opacity 0 → 1)
- The scale and opacity are both tied to scroll position — scrubbed, not auto-played
- End state: card is at 100% scale, fully opaque, settled in its left or right position
- There is a very slight overshoot on the scale (scale briefly hits ~1.03) before settling to 1.0 — this gives it a tactile, physical feel

**Easing:** Spring-based. Suggested: `cubic-bezier(0.34, 1.56, 0.64, 1)` — this produces the natural overshoot without being bouncy.

---

### Card Layout & Content

Each card is a large rectangular block occupying roughly 50–60% of the viewport width, tall enough to contain image + headline + short descriptor + CTA.

**Card structure (top to bottom):**
1. **Service image** — full bleed at top of card, rounded corners (12–16px radius, consistent with brand)
2. **Service label** — small caps tag, e.g. `FLAGSHIP SERVICE`
3. **Service headline** — Tusker Grotesk, e.g. `INTEGRATED MARKETING MANAGEMENT`
4. **Short descriptor** — 1–2 lines from the copy, Cabinet Grotesk Regular
5. **CTA** — text link with arrow, e.g. `Explore →`

**Card 1 — Integrated Marketing Management**
- Image: AI-generated — a luxury hotel marketing environment, showing coordinated brand materials, a senior professional overseeing multiple channels. Premium, editorial feel. Dark/moody tone to match EXL brand.
- Background: Black card
- Text: White headline, white body

**Card 2 — B2B Video Podcast Production**
- Image: AI-generated — a cinematic on-location podcast shoot. Multi-camera setup, professional lighting, a guest and host mid-conversation in a real environment (not a studio). Dallas-adjacent feel if possible.
- Background: Chartreuse card
- Text: Black headline, black body

---

### Left / Right Alternation

Card 1 sits on the **left half** of the viewport, slightly offset from center.
Card 2 sits on the **right half**, slightly offset from center, and sits lower than Card 1 — creating a staggered diagonal feel rather than a flat grid.

The two cards are both visible simultaneously once both have animated in — they coexist on screen and can be read together.

---

### Image Note for Antigravity
Images for both cards need to be AI-generated before build. Brief above per card. Style reference: editorial, cinematic, dark and premium. Must match EXL brand photography direction from brand guidelines (professional, high contrast, not stock-looking).

---

*More sections to be added as briefed.*

---

## SECTION 3 — THE EXL ADVANTAGE
**Copy reference:** "A traditional consultancy with an AI-native engine underneath."
**Differentiators:** Senior strategy / AI-native / Engineered for impact

This section has three distinct animation phases that play out as the user scrolls through it.

---

### Phase 1 — Full-Viewport Letterform Zoom

**Initial state:**
The letters **E X L** are displayed in Tusker Grotesk Semibold at full viewport scale — the word fills the entire screen edge to edge, vertically and horizontally. Black background. Chartreuse or white type (Antigravity to decide based on visual weight). No other content visible. This is a pure typographic moment.

**Scroll behavior:**
As the user begins to scroll, the viewport zooms into the **X** — the center letterform. The camera pushes forward into it as if flying through it.

**Technical requirement — critical:**
The letterform must be rendered as **SVG, not rasterized**. It must not pixelate at any zoom level. The zoom should feel infinite and cinematic. Suggested implementation: SVG viewport scaling tied to scroll position, or a canvas-based approach. Do not use a rasterized PNG/JPG of the letter at any point in this animation.

**End state of Phase 1:**
The X fills and then passes the viewport entirely, transitioning into Phase 2. The transition should feel like emerging through the letter into the content behind it.

---

### Phase 2 — Headline with Typewriter Cycling Animation

**Layout:**
White or off-white background. Large centered headline in Tusker Grotesk. The headline reads:

> **A TRADITIONAL CONSULTANCY**
> **THAT IS**
> **[CYCLING WORD]**

The first two lines are static. The third line cycles through the three EXL differentiator phrases using a typewriter effect.

**Cycling words/phrases (in order, looping):**
1. `SENIOR-LED`
2. `AI-NATIVE`
3. `BUILT FOR IMPACT`

**Typewriter animation behavior:**
- Each phrase types in character by character, left to right
- A blinking cursor ( `|` ) is visible while typing and while the phrase rests
- After a short pause (approximately 1.2 seconds), the phrase deletes character by character, right to left
- The next phrase immediately begins typing
- Loop is continuous
- Font: Tusker Grotesk Semibold — same scale as the rest of the headline
- The cycling phrase renders in **chartreuse** (#C8F135 or brand equivalent) to differentiate it from the static lines above

**Cursor style:** A simple vertical bar `|` in chartreuse, blinking at 500ms interval

---

### Phase 3 — Angled Card Transition

**Trigger:** As the user continues to scroll past the typewriter headline

**Behavior:**
A content card rises from the bottom of the viewport at a **tilted angle** — rotated approximately 4–6 degrees clockwise. As it rises and covers the previous content, it **rotates back to 0 degrees** and settles flat. The motion should feel like a physical card being dealt or flipped onto a table.

**There are three cards total**, one per differentiator pillar. Each card replaces the previous using the same angled-rise motion:

**Card 1 — Senior strategy, not junior execution**
- Background: Black
- Heading: "SENIOR STRATEGY, NOT JUNIOR EXECUTION" in Tusker Grotesk, white
- Body: Copy from Section 5, pillar 1
- Label: Small section tag top-left, e.g. "01"

**Card 2 — AI-native, so your timeline isn't a problem**
- Background: Chartreuse
- Heading: in black
- Body: Copy from Section 5, pillar 2
- Label: "02"

**Card 3 — Engineered for impact, top to bottom**
- Background: Black
- Heading: white
- Body: Copy from Section 5, pillar 3
- Label: "03"

**Easing on card entry:** Starts fast (card enters quickly from below), decelerates as it reaches flat/settled position. Suggested: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out).

**Rotation arc:** Card enters at ~5° tilt, rotates to 0° as it locks into place. Rotation and translation happen simultaneously.

---

## SECTION 1 — HERO
**Copy reference:** "A B2B consultancy with its own production floor."
**Subhead:** "We advise, produce, build, and grow for ambitious B2B and luxury brands. Senior strategy, AI-native workflows, cinematic output. From Dallas, for clients across North America and the Middle East."
**CTAs:** `[ Book a call ]` `[ See what we do ]`

Three options are defined below. Client to confirm which to build. All three share the same copy, CTA placement, and nav treatment.

---

### Shared Elements (All Options)

**Navigation:**
- Logo: EXL wordmark, top-left, white
- Nav links: Services, About, Insights, Contact — top-right, Cabinet Grotesk
- CTA button: `Book a call` — chartreuse background, black text, pill shape
- Nav is transparent on load. On scroll: dark background fades in beneath it

**Hero copy block:**
- Headline: `A B2B CONSULTANCY WITH ITS OWN PRODUCTION FLOOR.` — Tusker Grotesk Semibold, white, fluid type (clamp 5vw–96px)
- Subhead: Cabinet Grotesk Regular, white at 80% opacity
- CTAs: `Book a call` (chartreuse fill, black text) + `See what we do` (transparent, white border)
- Copy block sits lower-left of viewport

**Entry animation (shared across all options):**
- Headline lines reveal via clip mask slide-up, staggered 80ms per line
- Subhead fades in after headline, 200ms delay
- CTAs fade and slide up last, 150ms after subhead
- Total load-to-complete: ~1.2 seconds

---

### OPTION A — Cinematic Video Background

**Background:** Full-viewport video, silent, looping. Shows EXL Dallas studio — equipment, shoot in progress, lighting rigs, team at work. Dark, moody, cinematic grade.

**Video treatment:**
- Black overlay at 55–65% opacity over video to keep copy legible at all times
- Muted, no controls, looped
- Fallback: strong still frame from same video for low-power/mobile

**Parallax:** Video layer scrolls at 60% of page scroll speed. Copy scrolls at normal speed.

**Scroll exit:** Hero fades to black before Section 2 begins.

**Asset required:** Studio/shoot footage — MP4, H.264, 1920×1080 min, 15–45 seconds. WebM version ideal for Chrome.

---

### OPTION B — Kinetic Full-Viewport Typography

**Background:** Pure black. No image, no video.

**Headline treatment:**
- Line 1: `A B2B CONSULTANCY`
- Line 2: `WITH ITS OWN`
- Line 3: `PRODUCTION FLOOR.`
- Each line in Tusker Grotesk Semibold, fluid width — fills its column edge to edge
- Lines reveal sequentially via clip mask slide-up on load

**Ambient motion:**
- Large, low-opacity chartreuse geometric shape (triangle or arrow from brand guidelines) drifts slowly in background — autonomous, not scroll-driven
- Opacity: 6–8%. Cycle: ~20 seconds. Prevents black from feeling inert.

**Scroll behavior:**
- As user scrolls, headline lines split apart — odd lines translate up, even lines translate down — parting to reveal Section 2 beneath

**No external assets required.** Fully buildable from brand assets.

---

### OPTION C — Split Layout (Type Left / Visual Right)

**Layout:**
- Left 55%: typographic content on black background
- Right 45%: visual panel
- Divider: 1px chartreuse vertical line between panels

**Right panel:**
- Looping short video clip (single cinematic shot, 15–20s) or editorial still image
- Inner parallax: image scrolls at 70% speed relative to left panel
- On load: right panel slides in from right edge, ~800ms ease-out, arriving as copy reveals on left

**Scroll exit:**
- The chartreuse divider line extends downward as user scrolls, connecting hero to Section 2 as a visual thread

**Asset required:** Single cinematic still or short clip for right panel. Studio shot, shoot still, or AI-generated if footage not yet available.

---

---

# ANTIGRAVITY BUILD BRIEF

## What You Are Building
The EXL website — exl.agency. A multi-page marketing site for a B2B consultancy and media production studio based in Dallas, Texas. 8 pages total. Homepage is Phase 1.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Hosting:** Vercel
- **Scroll animation:** GSAP with ScrollTrigger for all scroll-based animations. Framer Motion acceptable for component-level transitions.
- **Fonts:** Tusker Grotesk Semibold (headlines) + Cabinet Grotesk Regular/Bold/Black (body and subheads) — license required before build
- **Styling:** Tailwind CSS
- **3D/SVG animation:** Three.js or raw SVG manipulation for the Section 3 letterform zoom

## Brand Tokens
- Primary accent: Chartreuse (confirm exact hex from brand PDF — approximately `#C8F135`)
- Background: Black `#0A0A0A`
- Text: White `#FFFFFF`
- Text secondary: White at 60% opacity
- Secondary background: Pale silver/off-white (confirm from brand PDF)

## Pages (Phase 1 = Homepage Only)
1. Homepage — exl.agency
2. Services Overview — exl.agency/services
3. Advise — exl.agency/services/advise
4. Produce — exl.agency/services/produce
5. Build — exl.agency/services/build
6. Grow — exl.agency/services/grow
7. Integrated Marketing Management — exl.agency/integrated-marketing-management
8. B2B Video Podcast Production — exl.agency/podcast-production

## Copy
All copy is final and approved. Source: `EXL_Website_Copy_Master_v4.docx`. Use verbatim. Do not write, paraphrase, or invent any copy.

## Animation Rules
- All scroll animations are scrubbed (scroll position = animation progress) unless explicitly marked autonomous
- Autonomous animations: marquee ticker, globe rotation, typewriter cycling — these run independently of scroll
- Nothing autoplays and finishes before user engages
- Performance floor: 60fps on modern laptop. All animations must degrade gracefully on mobile.
- No layout shift from any animation

## Homepage Section Build Order
1. Hero — Option TBC by client
2. What We Do — stacking scroll cards (Section 2)
3. The EXL Advantage — letterform zoom + typewriter + angled cards (Section 3)
4. Credibility Line — marquee ticker (Section 4)
5. How We're Different — pinned progress bar + content swap (Section 5)
6. Flagship Services — iPhone-open card animation (Section 6)
7. Best in B2B — spec TBD
8. How We Work — spec TBD
9. Footer CTA + Footer — spec TBD

Do not build placeholder sections for 7, 8, 9. Wait for full specs.

---

---

# ASSETS CHECKLIST — REQUIRED FROM CLIENT

Items marked **[BLOCKING]** will prevent specific sections from being built until delivered.

## Fonts
- [ ] Tusker Grotesk Semibold — web font license or embed code **[BLOCKING — all pages]**
- [ ] Cabinet Grotesk Regular, Bold, Black — web font license or embed code **[BLOCKING — all pages]**

## Brand
- [ ] EXL logo — SVG, white version **[BLOCKING — nav + footer]**
- [ ] EXL logo — SVG, black version **[BLOCKING — nav + footer]**
- [ ] EXL logo — SVG, chartreuse version (if exists)
- [ ] Confirmed chartreuse hex code from brand PDF
- [ ] Brand pattern/texture assets (triangles, arrow motifs) as SVG files

## Hero
- [ ] Confirmation of which Hero option to build — A, B, or C **[BLOCKING — Section 1]**
- [ ] For Option A: studio/shoot footage reel — MP4 H.264, 1920×1080 min, 15–45 sec loop **[BLOCKING — Option A]**
- [ ] For Option C: single cinematic still or short clip for right panel **[BLOCKING — Option C]**

## AI-Generated Images (all 6 required before build)
Prompts for all images are in the IMAGE GENERATION PROMPTS section of this document. Deliver as WebP, 2048px wide minimum, named as specified.

- [ ] `img-advise.webp` — Senior executive, single document, dark conference room **[BLOCKING — Section 2]**
- [ ] `img-produce.webp` — Cinema camera setup, empty interview chair, dark studio **[BLOCKING — Section 2]**
- [ ] `img-build.webp` — Dark desk, monitors with wireframes, brand collateral **[BLOCKING — Section 2]**
- [ ] `img-grow.webp` — Analytics dashboard on dark monitor, ambient light **[BLOCKING — Section 2]**
- [ ] `img-imm.webp` — Five-star hotel lobby, coordinated brand materials **[BLOCKING — Section 6]**
- [ ] `img-podcast.webp` — On-location cinematic podcast shoot, two professionals **[BLOCKING — Section 6]**

## Integrations
- [ ] Calendly link or booking URL — destination for all `Book a call` CTAs **[BLOCKING — all CTAs]**
- [ ] Confirmation that info@exl.agency is live

## Hosting & Domain
- [ ] Vercel account — access or confirmed deployment pipeline
- [ ] Domain exl.agency — DNS access for Vercel connection

---


