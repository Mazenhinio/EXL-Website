# 🛡️ EXL Website Development Workflow & Guardrails

This document establishes the official collaboration workflow, design principles, and visual guardrails for building and editing the **EXL Website**. These rules must be strictly adhered to before any code is modified or created.

---

## 🔄 1. Page & Section Development Workflow

Every new page or section is built iteratively using the following three-step workflow:

### Step 1: Section Discussion
Before a single line of code is written, we will discuss the target section under these categories:
*   **UX (User Experience)**: Reading order, accessibility, device scaling, layout pacing, and ease of navigation.
*   **UI (User Interface)**: Typography weight, alignment rules, padding, element borders, and background contrasts.
*   **Animations & Micro-interactions**: GSAP ScrollTrigger timelines, durations, triggers, hover behaviors, and state changes.
*   **Layout & Core Design**: Grid structures, flex alignment, mobile responsiveness, and spatial distribution.
*   **Undisputed Source Copy**: The absolute text content source of truth is **`EXL_Website_Copy_Master_v4.docx`** (extracted as [`docx_text.txt`](file:///c:/Users/Work%20pc/Desktop/Desktop%20Github%20repos/EXL%20Website/docx_text.txt)). Copy is undisputed but can be shortened or streamlined upon explicit request if the exact semantic meaning is preserved.

### Step 2: The Three-Recommendation Rule
For every section discussed, the AI Assistant must present exactly **3 distinct design/implementation recommendations** covering the UX/UI/animations/layout.
*   The recommendations will be presented directly in the chat.
*   The **USER** will review the suggestions and pick the desired option (or request a hybrid).
*   The AI Assistant will implement the selected design.
*   The **USER** will review the live implementation (`http://localhost:3000`), request any minor polish edits, and only when fully satisfied, will we move on to the next section.

### Step 3: Realistic & Grounded Imagery
When a section requires images, they must feel authentic, premium, and human:
*   **Grounded Setting**: We are a small advisory and podcast production agency shooting in client office spaces or public settings around **Dallas, Texas**. We are *not* a giant tech conglomerate or silicon valley giant—the imagery must reflect a premium, localized, high-touch boutique agency feel.
*   **Natural Poses**: People in generated images must be shown in natural, candid poses reflecting EXL’s active business workflows (e.g., in a strategic meeting, recording a podcast behind professional mics, editing footage, or conversing naturally). No awkward, robotic, or overly staged AI poses.
*   **Brand Styling & Color Ingestion**: Images must subtly inherit and showcase the EXL brand aesthetic, color accents, and environmental tone.

---

## 🎨 2. EXL Brand Palette & Hex Codes

All designs, components, borders, shadows, backgrounds, text styles, and generated imagery must align with the official EXL color systems listed below.

### Core Brand Colors

| Color Name | Hex Code | Tone & Application |
| :--- | :--- | :--- |
| **Chartreuse** | `#DEFF00` | Bright accent highlights, markers, pulsing status dots |
| **Black** | `#000000` | Dominant text, dark backgrounds, high contrast |
| **Pale Silver** | `#CEC5B7` | Subdued borders, thin line rules, metadata elements |
| **Eerie Black** | `#1C2416` | Deep rich dark forest green-black panels & overlays |
| **Nyanza** | `#E8FFDC` | Subtle green-white tints, light backlights, tags |
| **Mystic Red** | `#FF5500` | Warm warning/accent pipelines (specifically B2B podcast page) |
| **Platinum** | `#E5E5E5` | Structural dividers, secondary button containers |

### Fine-Tuned Accent Palette

Use these curated hex colors for background glows, component cards, hover statuses, tag highlights, and illustration gradient overlays:

```
1.  #F5FFE8   (Airy Mint Light)
2.  #EEFFAA   (Light Lemon Tint)
3.  #E8FF55   (Vibrant Chartreuse-Lime)
4.  #F0EDE0   (Premium Editorial Cream)
5.  #BBEA6A   (Soft Pear Green)
6.  #D5E8BA   (Sage-Olive Muted Tint)
7.  #C5B8B0   (Warm Stone Grey)
8.  #D8EAF5   (Crisp Sky Tint)
9.  #9BBCD0   (Muted Steel Blue)
10. #B8E2F8   (Soft Ice Blue)
11. #F2CAFC   (Dreamy Lavender Highlight)
12. #DD8AEF   (Orchid Pink Accent)
13. #FAD8F8   (Soft Rose Fog)
14. #F07A6A   (Muted Coral-Terra Cotta)
15. #F8B8A8   (Pale Peach Clay)
```

---

> [!IMPORTANT]
> Do not skip steps. Always perform the 3-recommendation layout brainstorm in the chat before implementing code edits.
