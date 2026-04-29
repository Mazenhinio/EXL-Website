# EXL Agency - Antigravity V3 Changelog

## [2026-04-29] - V7 High-Fidelity Refinements & GSAP Stabilization

### Added
- **Technical Standard: The Rail System**: Established the "Physical Rail" as the mandatory implementation pattern for scrubbed GSAP animations. Replaces absolute-positioned floating elements with a contiguous track of panels (e.g., 200vh height or 200vw width) to resolve "clipping" and bidirectional sync issues.
- **Brand Treatments**: Applied "Treatment B" (Hand-drawn SVG Underline) to key differentiator hooks in the Advantage and How Different sections.
- **Rising 2x2 Grid**: Implemented a cinematic "platform reveal" for the What We Do section, where the 2x2 capability grid rises vertically on a rail to meet the fixed headline.
- **Cinematic Overlays**: Applied standardized dual-layer overlays (35% solid + 85% bottom gradient) to all image-backed components (Capability Cards, Flagship Cards, Best in B2B).

### Changed
- **What We Do (Section 3)**: Re-architected into a Vertical Rail system (Panel-to-Panel swipe) to ensure rock-solid scroll stability in both directions.
- **Flagship Services**: Restored to the Horizontal Rail interaction ("just as it was") while maintaining the updated V7 typography and image treatments.
- **Header Standardization**: Applied "Standard 3" (Label -> Thin Vertical Rule -> H2) across all sections to ensure editorial consistency.
- **Desktop Spacing**: Unified all major section padding to the V7 standard of `80px 48px`.

### Fixed
- **Bidirectional Clipping**: Resolved the high-priority bug where scrubbed animations would skip or "jump" to the end state when scrolling down.
- **Image Overflow**: Fixed scaling issues on capability cards by switching to the Rail container model.
- **Layout Regressions**: Purged unreferenced "dummy code" (`Ticker.tsx`, `CredibilityLine.tsx`) to prevent bundle bloat and component confusion.

## [2026-04-28] - Homepage High-Fidelity Refinements

### Added
- **Signature Animations**: Integrated GSAP `clip-path` wipe reveals for major section headings and "settle" effects (scale 1.04 → 1) for full-bleed photography.
- **Pillar Hover States**: Implemented specified hover interaction for "How We're Different" pillars, featuring a #F2FFB8 (Lemon) background and a +12px padding shift.
- **Section Numbers**: Added/Corrected vertical section labels throughout the homepage (e.g., "02 — What we do", "04 — Our work").

### Design Pivot
- **Light Editorial Focus**: Explicitly moving away from dark-mode transitions (e.g., for the "How We Work" section) to maintain a consistent, airy, and premium light editorial aesthetic across the entire homepage.

### Changed
- **What We Do (Section 3)**: Completely rebuilt into a consolidated 2-column pinned scroll experience.
    - Left panel (40%) is now sticky with core brand messaging.
    - Right panel (60%) features scrolling cinematic capability cards (reduced to 80vh for better focus).
- **EXL Advantage**: Refined entrance animations to trigger earlier (75% viewport) and added a premium staggered blur-to-focus effect.
- **Credibility Ticker**: Replaced generic items with a consolidated IHG/Best in B2B credibility statement. Increased font size to 14px for better legibility.
- **Flagship Services**: Polished CTA pill buttons and resolved text clipping issues on titles by adjusting line-height and padding.
- **Best in B2B**: Updated background to #E0C8F8 (Lavender) and applied signature motion profiles.

### Fixed
- **Component Stability**: Resolved syntax errors and logic duplications in `WhatWeDo.tsx`.
- **Responsive Layouts**: Improved mobile fallbacks for all refined sections to ensure stable rendering on smaller screens.
