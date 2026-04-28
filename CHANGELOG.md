# EXL Agency - Antigravity V3 Changelog

## [2026-04-28] - Homepage High-Fidelity Refinements

### Added
- **Signature Animations**: Integrated GSAP `clip-path` wipe reveals for major section headings and "settle" effects (scale 1.04 → 1) for full-bleed photography.
- **Pillar Hover States**: Implemented specified hover interaction for "How We're Different" pillars, featuring a #F2FFB8 (Lemon) background and a +12px padding shift.
- **Section Numbers**: Added/Corrected vertical section labels throughout the homepage (e.g., "02 — What we do", "04 — Our work").

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
