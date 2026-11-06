---
name: open-source-design-system-checklist
description: Authoritative 4 Macro-Phases & 230 Checks Open-Source Design System Checklist to Build Better Design Systems (Design Language, Foundations, 29 Core Components, Maintenance Strategy).
---

# Open-Source Design System Checklist: 4 Macro-Phases (230 Total Checks)

## Architectural Principle: Isolated Categorical Grouping
All 230 checks of the Open-Source Design System Checklist are grouped together into one authoritative macro-phase verification structure. Under no circumstances should phases be merged into unrelated manuals or collapsed into a single phase. Each phase preserves its distinct boundary, subcategory counts, and verification targets.

---

## Master Metric Summary

| Macro-Phase | Status | Completed | Total Checks | Subcategories / Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1: Design Language** | In Progress | 5 | 10 | Brand (5/5) &middot; Guidelines (0/5) |
| **Phase 2: Foundations** | Queued | 0 | 26 | Tokens (4), Color (4), Layout (4), Spacing (3), Typography (5), Elevation (3), Motion (3), Iconography (3) |
| **Phase 3: Core Components** | Queued | 0 | 166 | 29 Reusable UI Primitives (Accordion through Tooltip) |
| **Phase 4: Maintenance** | Queued | 0 | 28 | Documentation (10), Local Libraries (4), Team Processes (6), Community Support (4), Contribution (4) |
| **Total System Checks** | **Operational** | **5** | **230** | **4 Comprehensive Architectural Pillars** |

---

## Phase 1: Design Language (5/10 Completed)

### 1.1 Brand Invariants (5/5 Completed)
1. **Vision** (`B1`): Clear long-term educational mission, institutional goals, and unified cross-campus product vision.
2. **Design Principles** (`B2`): Accessibility-first, Liquid Glass ergonomics, Zero Emoji policy, strict typographic discipline.
3. **Tone of Voice** (`B3`): Professional, encouraging, clear, educational institutional tone across student, teacher, and admin roles.
4. **Terminology** (`B4`): Standardized institutional nomenclature across English and Khmer.
5. **Brand Assets** (`B5`): High-resolution SVG brand marks, official crests, favicon packages, and light/dark lockups.

### 1.2 Design Guidelines (0/5 Queued)
6. **Accessibility Guidelines** (`G1`): WCAG 2.2 AA compliance, 4.5:1 text contrast, keyboard focus rings, and screen-reader ARIA semantics.
7. **Writing Guidelines** (`G2`): Sentence case capitalization, active voice verbs, concise error states, and clear instructional copy.
8. **Microcopy Guidelines** (`G3`): Action labels, contextual placeholders, empty states, and dismissible notification banners.
9. **Terminology & Material Lexicon** (`G4`): Cross-mapped dictionary linking design token terminology to technical implementation variables.
10. **Internationalisation (Khmer & English)** (`G5`): Bilingual typography scaling, Khmer Unicode (U+1780-U+17FF) word-break handling, and layout adaptability.

---

## Phase 2: Foundations (0/26 Queued)

### 2.1 Tokens (0/4)
11. **Design Tokens Architecture** (`F01`): Tiered structure (Global primitives -> Semantic aliases -> Component-scoped tokens).
12. **Token Naming Taxonomy** (`F02`): Kebab-case semantic syntax: `[system]-[concept]-[property]-[variant]-[state]`.
13. **Tokens Studio Integration** (`F03`): Bi-directional sync between Figma tokens and Tailwind CSS variables.
14. **Platform-Agnostic JSON Spec** (`F04`): DTCG-compliant JSON token exports ready for web and mobile runtimes.

### 2.2 Color (0/4)
15. **11-Step Contrast Color Ramps** (`F05`): Calibrated 50-950 luminance scales across Blue, Indigo, Emerald, Amber, and Slate.
16. **Semantic Functional Roles** (`F06`): Explicit mapping for Primary, Secondary, Tertiary, Surface, Error, Success, and Warning.
17. **Contrast Verification Matrices** (`F07`): Mathematical verification of 4.5:1 text and 3:1 graphic contrast boundaries.
18. **Light / Dark Theme Invariants** (`F08`): Dual-palette elevation shifts preserving daytime pure-white canvas readability.

### 2.3 Layout (0/4)
19. **12-Column Responsive Grid** (`F09`): Fluid container grid with flexible gutters (16px to 32px) and max-width thresholds.
20. **Breakpoint Standards** (`F10`): Media query triggers: xs (360px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).
21. **Scaffold Architecture** (`F11`): Material 3 standard layout primitives: Bars, Rails, Panes, and Floating Anchors.
22. **Safe Areas & Padding Envelopes** (`F12`): Dynamic viewport padding protecting touch targets and scroll boundaries.

### 2.4 Spacing (0/3)
23. **4px Base Spacing Scale** (`F13`): Harmonic 4px geometric progressions (4, 8, 12, 16, 24, 32, 48, 64, 96px).
24. **Density Modes** (`F14`): Dynamic data-table and list density toggling for high-volume enterprise data review.
25. **Container Padding Rules** (`F15`): Predictable internal card, modal, and drawer padding envelopes for visual balance.

### 2.5 Typography (0/5)
26. **Modular Type Scale** (`F16`): Typeface hierarchy spanning Display, Headline, Title, Body, and Label scales.
27. **Line-Height Pairings** (`F17`): Optical leading calibrations ensuring optimal scanning speeds.
28. **Font Weight Matrix** (`F18`): Explicit font-weight mapping: Regular (400), Medium (500), Bold (700), Black (900).
29. **Khmer Typographic Rendering** (`F19`): Subscript consonant clustering, vowel reordering, and baseline alignment.
30. **Code & Monospace Fonts** (`F20`): Tabular numeral formatting for currency, percentages, timestamps, and API schemas.

### 2.6 Elevation (0/3)
31. **5-Level Elevation Shadow Tokens** (`F21`): Multi-stop diffused ambient and key drop-shadow definitions.
32. **Z-Index Layer Architecture** (`F22`): Strict categorical stack: Base (0), Raised (10), Sticky (20), Overlay (30), Modal (40), Toast (50).
33. **Surface Tint Hierarchy** (`F23`): Material 3 tonal surface overlays reflecting elevation height.

### 2.7 Motion (0/3)
34. **Cubic Bézier Easing Curves** (`F24`): Standard, decelerated, and accelerated motion curves with interruption resilience.
35. **Duration Token System** (`F25`): Strict duration constraints honoring the <300ms perceptual responsiveness threshold.
36. **Spring Physics Parameters** (`F26`): Mass, stiffness, and damping coefficients for fluid tactile micro-interactions.

---

## Phase 3: Core Components (0/166 Queued across 29 Primitives)

| Index | Component Name | Category | Check Count | Core Capabilities Verified |
| :--- | :--- | :--- | :--- | :--- |
| `C01` | **Accordion** | Containers | 4 checks | Collapsible panel, keyboard navigation, animated height, aria-expanded |
| `C02` | **Alert** | Feedback | 6 checks | Severity levels, dismiss action, assertive aria-live, icon pairing, title, border accent |
| `C03` | **Avatar** | Data Display | 7 checks | Image fallback, initials generation, online presence dot, size scale, shape variants, border ring, grouping |
| `C04` | **Badge** | Data Display | 7 checks | Numeric pill, color ramps, dot badge, removable tag, icon prefix, size scaling, max count truncate |
| `C05` | **Button** | Actions | 10 checks | 5 variants, loading spinner, disabled state, focus ring, icon slot, full-width, keyboard trigger, tap bounds |
| `C06` | **Breadcrumbs** | Navigation | 4 checks | Path separator, active leaf item, overflow collapse dropdown, structured data schema |
| `C07` | **Calendar** | Selection | 7 checks | Month/Year navigation, date range pick, disabled dates, week numbering, keyboard arrows, today marker, locale |
| `C08` | **Card** | Containers | 5 checks | Header slot, media banner, body typography, actions footer, elevated/outlined styles |
| `C09` | **Carousel** | Media | 6 checks | Touch swipe gestures, slide indicators, next/prev arrow buttons, autoplay control, keyboard tabs, aria-roledescription |
| `C10` | **Checkbox** | Forms | 7 checks | Indeterminate state, custom checkmark SVG, focus ring, disabled mode, label wrapping, error text, group validation |
| `C11` | **Divider** | Layout | 2 checks | Horizontal/Vertical orientations, optional inset margins with centered text label |
| `C12` | **Dropdown** | Actions | 6 checks | Click outside dismiss, keyboard navigation, nested sub-menus, icon items, shortcut badge, portal positioning |
| `C13` | **Icon** | Media | 3 checks | 24px bounding box, stroke weight token alignment, accessible aria-hidden or title |
| `C14` | **Image** | Media | 4 checks | Responsive srcset, aspect-ratio placeholder, blur skeleton loading, fallback error container |
| `C15` | **Link** | Navigation | 6 checks | External icon suffix, security rel="noreferrer", underline hover styles, focus ring, router integration, color variants |
| `C16` | **List** | Data Display | 3 checks | Ordered/Unordered types, custom bullet tokens, multi-line item spacing |
| `C17` | **Loading Indicator** | Feedback | 5 checks | Circular spinner, linear bar, size scale, color token binding, aria-busy state |
| `C18` | **Modal** | Overlays | 8 checks | Focus trap, ESC key dismiss, backdrop blur, scroll lock, header/footer slots, size variants, animation |
| `C19` | **Pagination** | Navigation | 6 checks | Page number pills, ellipsis truncate, previous/next controls, jump-to-page input, total count label, keyboard access |
| `C20` | **Progress Bar** | Feedback | 4 checks | Determinate percentage, indeterminate pulse, color tokens, aria-valuenow |
| `C21` | **Radio Group** | Forms | 5 checks | Radio pill, arrow key selection, disabled variant, card option style, validation message |
| `C22` | **Select** | Forms | 8 checks | Searchable options, multi-select tags, clear button, virtualized list, option grouping, loading state, error outline |
| `C23` | **Skeleton** | Feedback | 4 checks | Shimmer animation wave, text line variant, rectangular card skeleton, circular avatar placeholder |
| `C24` | **Switch** | Forms | 5 checks | Toggle thumb animation, active color change, disabled state, label association, keyboard space trigger |
| `C25` | **Tabs** | Navigation | 7 checks | Active indicator line, keyboard arrow traversal, scrollable tabs, icon prefix, badge counters, disabled tab, vertical mode |
| `C26` | **Text Area** | Forms | 7 checks | Auto-resizing height, character counter, error helper text, clear button, max-length enforcement, disabled style, resize handle |
| `C27` | **Text Field** | Forms | 9 checks | Leading/Trailing icons, clear button, password visibility toggle, helper text, error state, floating label, input mask, disabled style, required marker |
| `C28` | **Toast** | Feedback | 8 checks | Auto-dismiss timer, pause on hover, action button, swipe to dismiss, stacking animation, polite aria-live, severity color, portal |
| `C29` | **Tooltip** | Overlays | 3 checks | Hover delay trigger, dynamic collision boundary flip, keyboard focus reveal |

---

## Phase 4: Maintenance (0/28 Queued across 5 Strategic Pillars)

### 4.1 Documentation (0/10)
37. **Design System Principles** (`M01`): Communicates team values and objective decision-making criteria.
38. **Getting Started Guide** (`M02`): Rapid installation guide enabling autonomous product feature building.
39. **Design Best Practices** (`M03`): Scalable Figma patterns and eliminating common visual regression traps.
40. **Development Best Practices** (`M04`): Recommended dependencies, tree-shaking, and code standards.
41. **Component Anatomy** (`M05`): Clear breakdown of customizable slots, boundaries, and internal tokens.
42. **Component Properties** (`M06`): Cross-platform property alignment between design tools and TypeScript code.
43. **Component Composition Examples** (`M07`): Advanced compositions using primitive slots and layout wrappers.
44. **Sandbox Product Example** (`M08`): Isolated simulation testing components in realistic mock workflows.
45. **Browser / OS Support Matrix** (`M09`): Explicit tier support across evergreen browsers, Safari, and mobile engines.
46. **Predictable Release Cycle** (`M10`): Documented semver cadence for breaking changes and migration planning.

### 4.2 Local Libraries (0/4)
47. **When to Build Guidance** (`M11`): Explicit criteria for custom local components vs requesting core system primitives.
48. **Horizontal vs Vertical Libraries** (`M12`): Architectural distinction between multi-product shared libs and single-feature libs.
49. **Library Quality Expectations** (`M13`): Quality thresholds, test coverage, and documentation requirements.
50. **Release Cycle Alignment** (`M14`): Keeping local packages in sync with core design system semver releases.

### 4.3 Team Processes (0/6)
51. **Decision-Making Log (ADR)** (`M15`): Context preservation logs preventing circular design debates.
52. **Long-Term Roadmap** (`M16`): Strategic allocation balancing new features against community maintenance.
53. **Stakeholder Mapping** (`M17`): Cross-functional directory of design, engineering, and leadership champions.
54. **Usage Analytics & Telemetry** (`M18`): Metrics tracking component import counts, doc visits, and token utilization.
55. **Support Shifts (On-Call Rotation)** (`M19`): Structured triage rotations protecting core builders from ad-hoc interruptions.
56. **Service Level Agreements (SLA)** (`M20`): Defined turnaround times for bug triage, feature requests, and PR reviews.

### 4.4 Community Support (0/4)
57. **Dedicated Support Channels** (`M21`): Platform-segmented channels for real-time developer troubleshooting.
58. **Standardized Issue Templates** (`M22`): Reproduction environments and design proposal RFC templates.
59. **Regular Release Updates** (`M23`): Scheduled release showcases and developer upgrade newsletters.
60. **Bookable Office Hours** (`M24`): Synchronous consultation slots for deep architectural problem solving.

### 4.5 Contribution (0/4)
61. **House Rules for the System** (`M25`): Explaining why design systems prioritize scalability over hasty feature additions.
62. **Contribution Guidelines** (`M26`): Step-by-step local setup, linting, tests, and pull request verification.
63. **Feature Proposal RFC Template** (`M27`): Structured proposal template verifying cross-platform parity and zero regressions.
64. **Contributor Recognition & Engagement** (`M28`): Public changelog attribution and management sponsorship.

---

## AI Agent Operational Instructions
When prompted to design, scaffold, or inspect components:
1. **Never merge phases**: Maintain the distinction between Design Language (10), Foundations (26), Core Components (166), and Maintenance (28).
2. **Verify against targets**: Look up the target item index (`B1-B5`, `G1-G5`, `F01-F26`, `C01-C29`, `M01-M28`).
3. **Reference the live tracker**: Use [`open-source-checklist-section.tsx`](file:///Users/Apple16/Desktop/SNP-SMS/apps/frontend/features/document/components/ui-library/open-source-checklist-section.tsx) for runtime validation.
