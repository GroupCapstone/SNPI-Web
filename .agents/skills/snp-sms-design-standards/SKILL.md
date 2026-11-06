---
name: snp-sms-design-standards
description: >-
  Authoritative enterprise design system and Dark UI specification for SNP-SMS.
  Enforces single-folder design architecture, flat component design without shadows,
  depth via surface luminance hierarchy, #000000 avoidance, dual theme support,
  desaturated 200-500 color tones, eye-friendly typography, 44x44px touch targets,
  mathematical design tokens, and the 10 Core UI Components guide (10-ui-components.md).
---

# SNP-SMS Design Standards & Dark UI Specification

This skill is the single authoritative design standard and architectural specification for all frontend user interfaces, Dark UI standards, and component implementations in the SNP-SMS repository.

---

## 1. Single Folder Design Architecture

All design standards, specifications, and component guides must strictly reside within this single skill folder:
- **Root Skill**: `.agents/skills/snp-sms-design-standards/SKILL.md`
- **Mandatory Psychological Design Rules for AI Agents**: `.agents/skills/snp-sms-design-standards/psychological-design-rules.md` (Mandatory AI agent skill rules: Fitts's Law >=44px, Hick's Law <=5 options, Miller's Law <=5 fields/card, Doherty Threshold <=400ms, Postel's Law liberal inputs, Culinary downward imports)
- **10 Core UI Components Guide**: `.agents/skills/snp-sms-design-standards/10-ui-components.md`
- **Culinary Component Taxonomy Architecture**: `.agents/skills/snp-sms-design-standards/culinary-component-taxonomy.md` (6-tier architectural hierarchy: Ingredients, Recipes, Entrees, Templates, Pages, Cookbook with strict downward dependency rules and token mapping)
- **Open-Source Design System Checklist (230 Total Checks)**: `.agents/skills/snp-sms-design-standards/open-source-checklist-macro-phases.md` (4 isolated macro-phases: Design Language 5/10, Foundations 0/26, Core Components 0/166, Maintenance 0/28, without cross-phase merging)
- **Core Components Design System Manual**: `.agents/skills/snp-sms-design-standards/core-components-design-system-manual.md` (29 core primitives, 166 verification checkpoints across Structure, Feedback, Media, Action, Navigation, and Form categories)
- **Design System Maintenance Strategy Manual**: `.agents/skills/snp-sms-design-standards/design-system-maintenance-manual.md` (5 maintenance pillars, 28 operational checkpoints covering Documentation, Local Libraries, Team Processes, Community Support, and Contribution)
- **Living Interface Animation Manual**: `.agents/skills/snp-sms-design-standards/living-interface-animation-manual.md` (The 12 Principles of Animation, <300ms timing rule, and Motion standards)
- **The 20 Universal Laws of Interface Motion & Micro-Interaction Engineering**: `.agents/skills/snp-sms-design-standards/twenty-universal-motion-laws.md` (Ease-out entrances, 150-250ms dropdowns, 30ms stagger, 0.97 press scale, 12% knob stretch, details settle, motion arcs, success pulse, ease-in-out moves, 0.95 popovers, trigger origin, zero bounce, direct held response, 20% shorter exits, overlap sync, clip-path masks, icon blur crossfade, rubber-band drag, shared layoutId)
- **Modern CSS Pseudo-Elements Manual**: `.agents/skills/snp-sms-design-standards/modern-css-pseudo-elements-manual.md` (::before/::after hit targets, View Transitions API, native dialog ::backdrop)
- **Easing Curves vs. Springs Guide**: `.agents/skills/snp-sms-design-standards/eases-vs-springs-guide.md` (User Reacting vs System Speaking, Interaction Roles, Bézier vs Spring Physics, <300ms timing rule)
- **Interface Sound Design Manual**: `.agents/skills/snp-sms-design-standards/interface-sound-design-manual.md` (Auditory speed advantage 25ms vs 250ms, complementary accessibility, interaction audio matrix, Web Audio API synthesis)
- **Procedural Audio Synthesis Manual**: `.agents/skills/snp-sms-design-standards/ai-sound-synthesis-manual.md` (Waveform primitives, bandpass noise clicks, exponential envelopes, zero-asset UI sound libraries)
- **Keyline Two-Tone Icons Specification**: `.agents/skills/snp-sms-design-standards/keyline-two-tone-icons-specification.md` (Keyline two-tone style, 40% fill accent, stroke-width=2, size-6 default, transparent surface, zero hover movement, motionless stability, and single-button web logo SVG export)
- **Morphing Icons Specification**: `.agents/skills/snp-sms-design-standards/morphing-icons-specification.md` (Universal 3-line SVG invariant, collapsed invisible anchors, rotational groups, zero-DOM-churn transitions)
- **Animating Container Bounds Manual**: `.agents/skills/snp-sms-design-standards/animating-container-bounds-manual.md` (Two-div measurement/animation separation, zero-dependency useMeasure hook, mount zero-guard)
- **Laws of UX Psychology Manual**: `.agents/skills/snp-sms-design-standards/laws-of-ux-psychology-manual.md` (Fitts's Law, Hick's Law, Miller's Law, Doherty Threshold <400ms, Postel's Law)
- **Mastering Animate Presence Manual**: `.agents/skills/snp-sms-design-standards/mastering-animate-presence-manual.md` (Presence lifecycle, useIsPresent, usePresence safeToRemove async exits, propagate, sync/wait/popLayout modes)
- **Sidebar Architecture Manual**: `.agents/skills/snp-sms-design-standards/sidebar-design-manual.md` (Header, quick action pills, nested groups, count badges, sticky positioning)
- **Color Theory Standards Manual**: `.agents/skills/snp-sms-design-standards/color-theory-manual.md` (60-30-10 rule, functional palettes, accessible contrast, emotional psychology)
- **Button Design System Manual**: `.agents/skills/snp-sms-design-standards/button-design-system-manual.md` (4 states, 3 variants, 44x44px touch targets, full-width mobile CTAs)
- **Scroll Patterns Manual**: `.agents/skills/snp-sms-design-standards/scroll-patterns-manual.md` (9 core patterns: sticky, scroll snap, scroll driven, parallax, infinite scroll)
- **Profile Settings Manual**: `.agents/skills/snp-sms-design-standards/profile-settings-manual.md` (8 UX principles, categorization, universal icons, instant search filtering)
- **Dark Mode Elevation Manual**: `.agents/skills/snp-sms-design-standards/dark-mode-elevation-manual.md` (5-level elevation ladder, surface lightness, 87/60/38 typography ratios)
- **Linear Blur Glassmorphism Manual**: `.agents/skills/snp-sms-design-standards/linear-blur-glassmorphism-manual.md` (Progressive multi-layer blur, subtle borders, luminance highlights)
- **Production Deploy Checklist**: `.agents/skills/snp-sms-design-standards/production-deploy-checklist.md` (20-point pre-launch quality gate: responsiveness, SEO, a11y, CWV)
- **Foundational UX/UI Laws Manual**: `.agents/skills/snp-sms-design-standards/ux-ui-laws-manual.md` (Jakob's, Fitts's, Miller's, Hick's, Proximity, and Tesler's Laws)
- **Interactive Effects Catalog**: `.agents/skills/snp-sms-design-standards/interactive-effects-manual.md` (18+ effect styles: kinetic hook, gravity drop, NLE timeline, jiggle delete)
- **System Architecture Lexicon**: `.agents/skills/system-architecture-lexicon/SKILL.md` (and `.agents/skills/snp-sms-design-standards/system-architecture-lexicon.md`: 1,111 concepts across 21 domain standard rules: systems, concurrency, cryptography, LLM, and AI agents)
- **Universal AI Agent Prompt Manual**: `.agents/skills/snp-sms-design-standards/universal-ai-agent-prompt-manual.md` (Procedural prompt synthesis, [Preview | Prompt] tabs, 1-click copy action, MVP component blueprints)
- **Precision Line Tracker Navigation Manual**: `.agents/skills/snp-sms-design-standards/line-tracker-navigation-manual.md` (Dotless continuous vertical rail, active indicator segment, zero-scrollbar standard)
- **Icon Bar & Blueprint Grid Manual**: `.agents/skills/snp-sms-design-standards/icon-bar-toolbar-manual.md` (54px horizontal toolbar, label bloom reveal, active indicator line, zero-dot standard, roving tabindex, r4 radii, 44px banner suite)
- **Royal Blue Brand & Zero-Dot Manual**: `.agents/skills/snp-sms-design-standards/royal-blue-brand-system-manual.md` (Royal Blue #0056FF, Futurewave gradients, Sora typography, Light Day First, Zero-Dot rule, say less show more result)
- **Principles for Accessible Design, Layout, States, Grids & Canonical Archetypes Manual**: `.agents/skills/snp-sms-design-standards/accessible-design-principles-manual.md` (Designing, Accessibility Markup, Implementing Accessibility, WCAG 2.1 AAA, native platform controls, Alt Text ≤140 chars, Notification & SMS Architecture, Sentence Case, Pronouns, Punctuation, M3 Custom Color Roles, Multi-Modal Inputs, Selection Architecture, Layout Scaffold, Breakpoints & Adaptive Multi-Device Design, Interaction States & State Layers, Grids, Spacing & Density Scaling, 5 Adaptation Vectors, Canonical Layout Archetypes: Feed, List-Detail, Supporting Pane, and Usability & M3 Expressive Architecture)
- **Material 3 Color Roles System Manual**: `.agents/skills/snp-sms-design-standards/color-roles-system-manual.md` (26 standard color roles, 6 groups, 3 contrast levels, tone-based surface containers, tone 98 surface, chroma 6 neutral palette, fixed accent colors)
- **Material 3 Layout Scaffold Manual**: `.agents/skills/snp-sms-design-standards/layout-scaffold-manual.md` (Bars, Rails, Panes, Safety Regions, Jetpack Compose Rulers, Spacing tokens)
- **Material Design 3 (M3) A-Z Lexicon & Glossary Specification**: `.agents/skills/snp-sms-design-standards/material-a-z-glossary.md` (107 authoritative terms, HCT color science, dynamic schemes, token hierarchies, 35 components, Orbiter & Spatial XR)
- **Material 3 Future Components & Blank Architecture Specification**: `.agents/skills/snp-sms-design-standards/material-3-future-components-specification.md` (35 M3 future components inventory, BlankFutureComponent blueprint wireframe canvas, isFuture registry flag, touch targets >=44x44px, contrast >=7:1, Day-First design standard)
- **Component Lifecycle, 7-Day Freshness Tracking & Parent-Child Navigation Specification**: `.agents/skills/snp-sms-design-standards/component-lifecycle-freshness-tracking-manual.md` (7-day automated expiration algorithm, NEW / UPDATED / COMING psychological micro-labels above text, zero-count badges, parent-child collapsed default, tap expansion, and automated scroll extraction rail tracker)
- **Material 3 Interaction States & State Layers Manual**: `.agents/skills/snp-sms-design-standards/interaction-states-manual.md` (6 canonical states: Enabled, Disabled, Hover, Focused, Pressed, Dragged, State layers 8%/12%/16%, Action/Selection/Input inheritance, container exclusion, FAB hide rule, disabled contrast exemption)
- **Material 3 Grids, Spacing & Density Scaling Manual**: `.agents/skills/snp-sms-design-standards/grids-spacing-density-manual.md` (4/8/12 adaptive grid columns, 0-64dp spacing tokens, density scale 0 to -3 with 4dp increments without font shrinking, >=44x44px touch targets)
- **Material 3 Adaptive Breakpoints & 5-Vector Transformation Manual**: `.agents/skills/snp-sms-design-standards/adaptive-breakpoints-manual.md` (5 standard breakpoints: Compact <600dp, Medium 600-839dp, Expanded 840-1199dp, Large 1200-1599dp, Extra-Large >=1600dp; 5 Vectors: Reveal, Divide, Resize, Reposition, Swap; component swapping matrix)
- **Material 3 Canonical Layout Archetypes Manual**: `.agents/skills/snp-sms-design-standards/canonical-layouts-manual.md` (Feed 1-4 cols, List-Detail 1-pane vs 2-pane co-planar with selection persistence, Supporting Pane 2/3 + 1/3 at 360dp min-width, Levitate layering strategy)
- **Material 3 Usability & Expressive Architecture Manual**: `.agents/skills/snp-sms-design-standards/usability-expressive-manual.md` (Nielsen Norman 5 pillars: Efficiency, Error reduction, Learnability, Memorability, Satisfaction; 6 Expressive tactics: Size, Containment, Shape, Color, Motion, Typography; Aura breathing case study; V1 Cluttered vs V2 Calm; Primary goal hierarchy)
- **Open-Source Design System Checklist (4 Macro-Phases & 230 Checks)**: `.agents/skills/snp-sms-design-standards/open-source-checklist-macro-phases.md` (Authoritative 230-point system checklist across Design Language, Foundations, 29 Core Components, and Maintenance Strategy to build better design systems)

Do not fragment design rules across multiple folders. Maintain all design documentation in this single location.

---

## 2. Core Dark UI Visual Philosophy

### 2.1 Avoid Shadows — Pure Flat Style
* **Strict Prohibition of Drop Shadows**: In Dark Mode, drop shadows (`box-shadow`, `drop-shadow-*`, `shadow-md`, `shadow-lg`) blur into dark backgrounds, creating muddy and unreadable edges. Under no circumstances should drop shadows be used in Dark Mode.
* **Flat Components**: All cards, sheets, dialogs, buttons, tables, and dropdowns adopt a crisp, modern flat style (`shadow-none`).
* **Keyline Borders**: Separate flat surfaces using subtle 1px border keylines (`border-white/10` or `border-zinc-800`).

### 2.2 Consider Depth — Surface Luminance Elevation
Elevation in Dark Mode is expressed strictly through **surface lightness**, where components closer to the user are rendered in lighter tones to provide natural visual hierarchy:

| Elevation Level | Token Name | Hex Value | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Level 0 (Canvas)** | `--surface-canvas` | `#0E0E10` (or `#121212`) | Viewport body, main document canvas |
| **Level 1 (Subsurface)** | `--surface-card` | `#161619` (or `#18181B`) | Cards, sidebar, data tables, top headers |
| **Level 2 (Elevated)** | `--surface-panel` | `#202024` (or `#27272A`) | Modals, bottom sheets, snackbars, dropdowns |
| **Level 3 (Interactive)** | `--surface-active` | `#2E2E33` (or `#3F3F46`) | Hover states, active tabs, tooltips, switches |

### 2.3 Don't Use `#000000` for Canvas
* **Prohibition on Canvas**: Never use pure black (`#000000`) as the document or canvas background of a Dark UI. Pure black creates jarring contrast, eye strain, and causes OLED motion smearing.
* **Approved Canvas Tones**:
  * `#0E0E10` (Dark Obsidian, default)
  * `#121212` (Material Dark standard)
  * `#0B0B0C` (Deep Slate Gray)
* **Permitted `#000000` Usage**: Only permitted for high-contrast typography on pure white surfaces in Light Mode.

### 2.4 Option for Users — Dual Theme Support
* **User Preference Choice**: The interface must always give users the choice to select their preferred theme (Dark Mode, Light Mode, or System Auto-Detect).
* **Flicker-Free Theme Toggling**: Powered by synchronized `data-theme` and `dark` classes on `<html>`, persisted via `localStorage.getItem('snp-theme')`, and initialized via inline `<head>` script prior to first paint.

### 2.5 Limit Saturation — 200 to 500 Scale Only
* **Contrast Damage Prevention**: Saturated, electric neon colors vibrate against dark backgrounds and damage readability.
* **Tone Confinement (200–500 Scale)**: All semantic status and accent colors on dark surfaces must stay strictly within the 200–500 range:
  * **Success**: `emerald-400` (`#34D399`) or `emerald-500` (`#10B981`)
  * **Warning**: `amber-400` (`#FBBF24`)
  * **Danger / Error**: `rose-400` (`#FB7185`) or `rose-500` (`#F43F5E`)
  * **Info / Primary**: `sky-400` (`#38BDF8`) or `sky-500` (`#0EA5E9`)
  * **Neutral Accent**: `zinc-400` (`#A1A1AA`)

### 2.6 Avoid Pure White for Body Text — Lighter Font Weights
* **Halation Prevention**: Contrast between pure black and pure white strains the eyes. Soften text to prevent visual halation:
  * Headings: `#F4F4F5` (`zinc-100`)
  * Body Text: `#E4E4E7` (`zinc-200`)
  * Secondary / Meta: `#A1A1AA` (`zinc-400`)
  * Muted / Placeholder: `#71717A` (`zinc-500`)
* **Lighter Font Weights**: Fonts appear optically thicker and heavier in dark mode due to white pixel bleed. Use `font-normal` (400) or `font-medium` (500) rather than heavy bold weights for body text.

### 2.7 Mandatory Zero Gradient, Anti-Gray, Anti-Blur & High-Contrast Typography Rule — ABSOLUTE STANDARD
* **Zero Color Gradients**: Under no circumstances should CSS gradients (`bg-gradient-to-*`, `linear-gradient`, gradient text, gradient borders) be used in document layouts or component designs. All surfaces, accents, indicators, and fills must be flat, pure solid colors.
* **Zero Muddy Gray, Slate Containers & Black Buttons**: Never use solid black (`#000000`, `bg-black`, `bg-slate-900`) or drab muddy gray (`#64748B`, `#475569`, `bg-slate-900`, dark gray card containers) to design components. Pagination, filter pills, and action buttons must never be black boxes.
* **Zero Blur Background Styles**: Avoid artificial blur or frosted glassmorphism overlays that muddy backgrounds. Use clean, solid, flat panels with `#CAD3F5` 1px keylines.
* **Zero Washed-Out or Hidden Typography**: Never design components where text fades, washes out, or lacks sufficient contrast. All body text, data table rows, headers, and values on light surfaces (`#FFFFFF`, `#EFF5FF`, `#E3E7FC`) must maintain high contrast (WCAG AAA >= 7:1) using **Deep Navy (`#0A1A4A`)** or **Slate-900 (`#0F172A`)**. Text color must NEVER match or blend into the background.
* **The 5 Authoritative Solid Brand Tokens**:
  * **01 Royal Blue (`#0056FF`)**: Primary brand base, buttons, active segments, flight contrails, core CTAs.
  * **02 Azure Blue (`#2277FF`)**: Interactive accents, hover highlights, waypoint node rings.
  * **03 Soft Lavender (`#E3E7FC`)**: Surface micro-tints, chips, badge containers, secondary pill cards (`#CAD3F5` border).
  * **04 Pure White (`#FFFFFF`)**: Default document canvas, card foundations, print-ready surfaces.
  * **05 Ice Tint (`#EFF5FF`)**: Micro-container fills, code callout backgrounds, soft active tabs, table highlights.
  * **Typography Standard (`#0A1A4A`)**: Deep Brand Navy (`#0A1A4A`) for all primary text, and `#334155` for secondary meta text. Never use light gray text on light backgrounds.
* **Zero Accidental Dark Mode Inversion**: Never allow media-query dark styles or `dark:*` Tailwind classes to invert UI components into dark slate/muddy gray boxes or render washed-out white/light gray text on white tables.

---

## 3. Mathematical Design Token Specifications

All spacing, typography, radii, and interactive target parameters must strictly follow these mathematical formulas:

### 3.1 Inner Radius Formula
$$\text{Inner Radius} = \max(0, \text{Outer Radius} - \text{Padding})$$
*Example*: A card with `rounded-2xl` (16px outer radius) and `p-2` (8px padding) requires inner elements to have `rounded-lg` ($16 - 8 = 8\text{px}$) for concentric, optical harmony.

### 3.2 Line Height Formula
$$\text{Line Height} = \text{Font Size} \times (1.4 \text{ to } 1.6)$$
* `14px` text $\to$ `20px` to `22px` (`leading-relaxed`)
* `16px` text $\to$ `24px` (`leading-normal`)
* `20px` text $\to$ `28px` to `30px`

### 3.3 Font Size Scale Formula
$$\text{Size}_{n+1} = \text{Size}_n \times 1.25 \quad (\text{Major Third Scale})$$
`[10px, 12px, 14px, 16px, 20px, 25px, 32px, 40px]`

### 3.4 Spacing Scale
All margins, paddings, gaps, and component heights must strictly resolve to multiples of **4px or 8px**:
`[4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px]`

### 3.5 Touch Target Size
$$\text{Width} \ge 44\text{px}, \quad \text{Height} \ge 44\text{px}$$
All interactive buttons, chips, switches, inputs, and icon triggers must provide at least `44 × 44px` physical hit area.

### 3.6 Optical Alignment
Practice-based optical balancing: asymmetrical icons (e.g. play arrows, right chevrons, rounded badge counts) must be optically centered by applying `+1px` to `+2px` padding on the lighter side.

### 3.7 Color Contrast Formula
$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05} \ge 4.5:1 \quad (\text{WCAG AA})$$
Where $L_1$ is the relative luminance of the lighter color and $L_2$ is the relative luminance of the darker color.

### 3.8 Keyline Two-Tone Icons, Universal Default Black / Dark Fill, Sizing, and Menu List Standards
All icons and menu lists across SNP-SMS must strictly comply with the [Keyline Two-Tone Icons Specification](file://.agents/skills/snp-sms-design-standards/keyline-two-tone-icons-specification.md):
- **Universal Default Black / Dark Fill Rule (CRITICAL RULE)**:
  - **Universal Default Black / Dark**: ALL icons across every component, card, button, header, and screen strictly default to **Black or Dark Obsidian** (`#020617` / `text-[#020617]` / `text-slate-950`) fill and stroke. The two-tone accent layer produces a crisp 40% black accent fill (`fill-opacity="0.4"`).
  - **Zero Unprompted Colored Inversion**: Never force icons into green (`#10B981`) or arbitrary colors across general cards or containers. Colors are strictly reserved for explicit semantic statuses (e.g. positive success badge, error alert, active tab pill) when explicitly designated.
  - **In Blue Surfaces** (Solid Royal Blue `#0056FF`, primary buttons, active blue segments): Icons MUST strictly render in **Pure White** (`#FFFFFF` / `text-white`) with 40% white accent fill opacity for WCAG AAA contrast.
  - **Dark Obsidian Canvas** (`#020617`, dark mode): Icons render in **Pure White** (`#FFFFFF` / `text-white`).
- **Icon Size Proportionality to Title**: Icon sizes must match or scale proportionally to their adjacent text title (1:1 visual ratio, e.g. `size-4` / 16px with `text-xs`/`text-sm` titles, `size-4.5` / 18px with `text-base`). Never use oversized icons dominating titles.
- **Prohibition of Icons on Normal Text or Descriptions (ABSOLUTE RULE)**: Never use icons inline within normal paragraph descriptions (`<p>`) or plain body text. Icons belong strictly on titles, headers, actions, buttons, and card feature indicators.
- **Mandatory Prohibition of Borders Around Icons (ABSOLUTE RULE)**: Under no circumstances should icons be enclosed in bordered boxes, bordered squares, bordered chips, or bordered squircle wrappers (`border border-slate-200`, `border-[#CAD3F5]`, `border`). All navigation trees, sidebars, headers, cards, and dropdown triggers must render icons cleanly and borderless directly alongside labels and titles.
- **Single-Color Background or Borderless Placement**: Do NOT add shapes or multiple colors behind the background of icons. Icons sit either borderless directly on the canvas or on a clean transparent surface, keeping the visual presentation sleek, flat, and uncluttered.
- **Menu List & Sidebar Tap-to-Drop Standard (Zero Auto-Drop)**: Sidebar menu lists and dropdown navigation must NEVER auto-drop or auto-expand on load or hover. Lists must remain collapsed by default until the user explicitly selects or taps to drop down the submenu list.
- **Motionless Stability**: Zero animations, zero hover scaling, translation, or rotation (`transform: none !important; transition: none !important; animation: none !important;`).

---

## 4. Extensible UI Components Library Architecture

The component definitions, etymology, real-world paradigms, and flat styling are codified in:
👉 [**10-ui-components.md**](file:///Users/Apple16/Desktop/SNP-SMS/.agents/skills/snp-sms-design-standards/10-ui-components.md)

Components are organized into an extensible categorization system without fixed count limitations:
- **Feedback & Overlays**: Snackbar, Bottom Sheet, Dialog, Tooltip
- **Actions**: Floating Action Button (FAB), Chip, Toggle Switch
- **Selection**: Dropdown, Checkbox, Radio, Select
- **Navigation**: Bottom Nav
- **Layout & Containers**: Card

As new UI components are created, they are added directly to the component registry (`component-registry.tsx`) and displayed in the categorized developer library.

---

## 5. Live Interactive Showcase & Developer Library First Protocol

- **Public Design System Library Route**: `/document/design-system`
- **Developer Documentation Integration**: Accessible directly from `/document` (Header navigation, sidebar, and table of contents).
- **Mandatory Prototyping Sandbox**: All new UI components, dark mode variants, and layouts must be prototyped and demoed in this developer library first.
- **Strict Prohibition on Real Frontend**: Do NOT touch or apply new designs to the real frontend (`/(dashboard)/*`, `apps/frontend/components/`, `globals.css`) until the user explicitly inspects the developer library demo and commands application.
- **Immediate Revert Gate**: Any changes applied to real frontend prior to explicit user command must be reverted immediately.

---

## 6. Subdomain Custom Font Architecture (Docs & Library Isolated)

To apply custom brand fonts to documentation and component library surfaces without polluting the main application:

- **Primary Font Storage**: `apps/frontend/app/document/fonts/` (e.g. `sora.woff2`)
- **Public Static Fallback**: `apps/frontend/public/fonts/docs/`
- **Scoped Loader Pattern (`apps/frontend/app/document/layout.tsx`)**:
  ```tsx
  import localFont from 'next/font/local';

  const docsSora = localFont({
    src: './fonts/sora.woff2',
    variable: '--font-docs-sora',
    display: 'swap',
  });

  export default function DocumentLayout({ children }: { children: React.ReactNode }) {
    return (
      <div
        className={docsSora.variable}
        style={{
          fontFamily: 'var(--font-docs-sora), ui-sans-serif, system-ui, sans-serif',
          ['--font-sans' as string]:
            'var(--font-docs-sora), ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {children}
      </div>
    );
  }
  ```
- **Brand Blueprint Palette**:
  - `01 Royal Blue`: `#0056FF` (Hero Brand Accent)
  - `02 Azure Blue`: `#2277FF` (Interactive Links)
  - `03 Black`: `#000000` (High-Contrast Canvas)
  - `04 Soft Lavender`: `#E3E7FC` (Surface Tint & Badges)
  - `05 White`: `#FFFFFF` (Card Containers)
  - `Gradient 1 (Futurewave)`: `#2277FF` via `#5C93FF` to `#AEC2FF`
  - `Gradient 2 (Midnight Surge)`: `#000B26` via `#002D8A` to `#0056FF`
- **Zero Real Frontend Impact**: All admin dashboard routes (`/(dashboard)/*`) continue referencing Google Sans and system font stacks in `globals.css`.

---

## 7. Mathematical Design Specifications & Token Formulations

To ensure optical balance, mathematical harmony, and enterprise consistency across all components:

### 7.1 Border Radius Formula
Nested elements must maintain concentric curvature so that inner corners do not collide or look distorted:
$$\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$$
- *Example*: Card outer radius = `24px`, internal padding = `8px` $\implies$ Inner button radius = `16px`.
- *Example*: Button outer radius = `12px`, internal icon padding = `4px` $\implies$ Inner icon badge radius = `8px`.

### 7.2 Typography & Scale Rules
- **Line Height**: $\text{Line Height} = \text{Font Size} \times (1.4 \text{ to } 1.6)$ (Body 16px uses 24px line-height).
- **Type Scale Ratio**: $\text{Current Size} \times 1.25$ (Major Third progression: 12px, 15px, 18.75px, 23.4px, 29.3px, 36.6px).
- **Spacing Scale**: Multiples of $4\text{px}$ or $8\text{px}$ (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`).
- **Touch Target Size**: Minimum $44 \times 44\text{px}$ bounding box for all interactive controls (using `::before` pseudo-element expansion for visually compact triggers).
- **Color Contrast Formula**:
  $$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$
  Enforce WCAG 2.1 AA compliance: $\ge 4.5:1$ for standard body text, $\ge 3.0:1$ for large text ($\ge 18\text{pt}$ or bold $\ge 14\text{pt}$) and active UI boundaries.

### 7.3 The 60-30-10 Color Balance System
- **60% Dominant (Canvas & Background)**: Deep obsidian canvas (`#0E0E10` or `#121212`) establishing visual calm.
- **30% Secondary (Cards & Structure)**: Elevated surfaces (`#161619` / `#1E1E1E`), sidebars, tables, and borders.
- **10% Accent (Action & Focus)**: Information Blue (`#2563EB`), Emerald Green (`#059669`), or Signal Gold (`#D97706`) reserved strictly for CTAs, selected tabs, active indicators, and status badges.

### 7.4 Dark Mode Elevation Ladder
Elevation is expressed through progressive surface lightness overlay rather than shadows:
- **0dp (Canvas Background)**: `#121212` (0% white overlay)
- **1dp (Cards & Tables)**: `#1E1E1E` (5% white overlay)
- **4dp (Elevated Modals & Popovers)**: `#272727` (9% white overlay)
- **8dp (Navigation Menus & Sheets)**: `#2E2E2E` (12% white overlay)
- **24dp (Dialogs & Tooltips)**: `#383838` (16% white overlay)

### 7.5 Typography Contrast Ratios in Dark Mode
To prevent visual fatigue and halo glare, avoid `#FFFFFF` for continuous reading:
- **High Emphasis Text (Headings, Active Labels)**: 87% White (`#E0E0E0` / `text-zinc-100`)
- **Medium Emphasis Text (Body, Descriptions)**: 60% White (`#A0A0A0` / `text-zinc-400`)
- **Disabled & Decorative Text (Hints, Icons)**: 38% White (`#6C6C6C` / `text-zinc-600`)

### 7.6 Standard Button Architecture Rule (Mandatory)
All buttons, primary CTAs, toolbar triggers, and interactive controls across the platform and documentation adhere to the subtle mathematical border radius standard:
- **Border Width**: `0px` (`border-0` / none)
- **All Corners Radius**: `4px` (`rounded-[4px]`)
- **Interaction Rationale**: Delivers consistent subtle rounding with zero shadows and flat luminance depth across all states (idle, hover, active, disabled).

### 7.7 Rail TOC Flight Tracker Navigation Specification
Refer to `rail-toc-flight-tracker-manual.md` for the origami paper plane flight navigation specification:
- Kinetic flight orientation with dynamic rotation in flight direction.
- Continuous solid rail traversal behind plane, dashed rail ahead.
- Solid fill node indicators for passed headings.
- Depth indentation with smooth cubic Bézier curves.
- Roving tabindex and screen-reader accessible `data-slot` selectors.

### 7.8 Cyber Armor Modular Navigation Specification
Refer to `cyber-armor-nav-manual.md` for the aerospace mecha HUD console specification:
- Stepped armor chassis with 45° chamfered corner ear caps and dual top wings.
- Physical double-seam dividers (1px dark border paired with 1px white highlight line).
- Luminous Royal Blue (`#0056FF`) active indicator bar with Azure Blue (`#2277FF`) gradient and ambient glow.
- Zero-dot strict compliance across all states.
- Light day first metallic finish (`#FFFFFF` to `#EEF2F8` gradient with `#CAD3F5` perimeter stroke).

### 7.9 Display-Only Open API Specification (Zero Access Mode & Zero Credential Exposure)
- **Zero Access Mode Columns**: Never render an "ACCESS MODE" column, "[Lock] Read-Only" badges, or access-permission UI tags in public catalogs or OpenAPI tables.
- **Strictly Display Only**: All public catalogs, syndication feeds, and embed previews must serve strictly as visual, display-only specifications for external frontsite integration.
- **Zero Credential Headers or Inspection Code**: Never display, instruct, or include credential headers (`X-Subscription-Key`, auth tokens, secret keys) or credential flags (`withCredentials: true`) in client-side code snippets or documentation. Endpoints must be presented purely as standard public display feeds without user credential inspection.

### 7.10 Prohibition of Dark Navy / Black Terminal Box Aesthetics in Documentation
- **Never Design Dark Terminal Containers**: Under no circumstances should logs, telemetry monitors, event stream cards, or inspection boxes be designed with solid dark navy (`#0A1A4A`), black, or dark terminal background styles.
- **Strictly Light-Day-First Modern UI**: All telemetry monitors, packet streams, and documentation cards must strictly use **Pure White (`#FFFFFF`)** or **Ice Tint (`#EFF5FF`)** backgrounds with Soft Lavender borders (`#CAD3F5`), Deep Navy (`#0A1A4A`) high-contrast text, and Royal Blue (`#0056FF`) accent pills.
- **Zero Dark Hacker Inversion**: Never invert page sections into high-contrast dark terminal boxes or hacker consoles in documentation views.

### 7.11 Mandatory Zero Pulsing Beacon, Zero Status Dot & Clean Navigation Standard (Absolute Prohibition of All Beacons, Pings, and Presence Dots)
- **Strict Prohibition of Pulsing Beacons, Status Dots, Ping Rings & Heartbeats**: Under no circumstances should animated pinging or static dots of any color (green, blue, emerald, red, gold) — including Pulsing Beacons, Status Beacons, Radar Pings (`animate-ping`), Live Status Dots, Online Indicators, or Heartbeat Indicators — be used on icons, avatar corners, buttons, navigation bars, breadcrumbs, titles, sub-headers, or status cards. Never design or use this pattern anywhere in the application or documentation.
- **Clean Static Typography & Structured Badges Only**: State and health must strictly be communicated via clean, high-contrast textual badges or static pills adhering to the 5 brand tokens (`LIVE`, `NEW`, `ACTIVE`, `READY`), never via distracting pulsing animations or corner beacon dots.
- **Clean Sticky Sub-Navigation Rails**: Sticky sub-navigation bars must strictly render clean, direct category jump pills (`Home`, `Navigation`, `Inputs`, `Feedback`, `Display`, `Forms`, `Sections`) without dynamic location breadcrumbs, shifting title texts, or pulsing dots taking up horizontal space.

### 7.12 Mandatory Full Brand Name SNPI Rule (Always SNPI, Never Bare SNP)
- **Full Brand Identity**: The institutional identity of this platform is **SNPI** (SNPI International School / SNPI-SMS).
- **Prohibition on Bare "SNP"**: Never truncate or refer to the institution as bare "SNP". Always use **SNPI** across all UI copy, documentation headers, component registries, badges, school titles, and metadata.
- **Official References**:
  - Educational Institution: **SNPI International School** (Khmer: **សាលាអន្តរជាតិ អេស អ៊ិន ភី អាយ · SNPI INTERNATIONAL SCHOOL**)
  - System / Monorepo: **SNPI-SMS**
  - Package: **`snpi-ui`**
  - Custom Domain: **`*.snpi.edu.kh`**

### 7.13 Minimal Guide Text, Icon Hover Definitions, Pure Icon Hygiene & Responsive Brand Blueprint Standard
- **Minimal Guide & Description Text (Title & Buttons Only)**:
  - Strictly prohibit walls of descriptive text, redundant guide paragraphs, helper instructions, or verbose labels under components and sections.
  - Every component interface must remain minimal, clean, high-density, and direct: render only the title name, buttons, and direct interactive component controls. Never write redundant guide text.
- **Mandatory Icon Hover Definition Standard**:
  - Every interactive icon, icon button, and indicator across desktop and mobile must provide a clean, descriptive hover definition of that place/action via accessible `title` attribute or `LibraryTooltip`. Zero mystery icons.
- **Pure Icon Hygiene (Zero Shapes or Color Blobs Behind Icons)**:
  - Strictly never use emojis, informal symbols, or colored shapes/blobs (circles, squares, tinted background patches such as `rounded-full bg-blue-100`, `rounded-lg bg-[#0056FF]`) behind icons.
  - Icons must always be pure, clean vector marks rendered in authoritative brand colors (`text-[#0056FF]`, `text-[#2277FF]`, `text-slate-700`, `text-white` on standard buttons) without decorative background badge shapes.
- **Strict Brand Blueprint & Color Token Integrity**:
  - All page designs, navigation hubs, menus, and component views must strictly respect the 5 primary brand tokens:
    1. `01 #0056FF` Royal Blue — Core brand base, buttons, active highlights.
    2. `02 #2277FF` Azure Blue — Interactive accents, hover states.
    3. `03 #E3E7FC` Soft Lavender — Surface micro-tints, subtle borders (`#CAD3F5`), badge fills.
    4. `04 #FFFFFF` Pure White — Document canvas base, card foundations.
    5. `05 #EFF5FF` Ice Tint — Subsurface fills, segment tracks, hover backdrops.
    - Typography Token: Deep Navy `#0A1A4A` (primary headings & text) / Slate-900 `#0F172A`. Never use muddy slate or dark gray containers.
- **Universal Web & Mobile Responsive Device First**:
  - Always engineer and verify layouts, menus, and component demos for both mobile viewports (<640px) and wide desktop screens.
  - Zero text clipping/truncation, zero horizontal overflow, fluid flex wrapping, and minimum 44x44px touch targets.
- **Mandatory Zero Links Rule (Never Add Links)**:
  - Strictly prohibit AI agents from adding markdown links, URL hyperlinks, file scheme links (`file://`), or unnecessary navigation anchor links in responses or generated UI components unless explicitly requested by the user.
  - Always render references using bold text, plain text, or inline code formatting (`path/to/file.tsx`) with zero clickable hyperlinks.






### 7.14 Canonical Layout Archetypes Specification
Refer to `layout-scaffold-manual.md` and `accessible-design-principles-manual.md` for full implementation details:
- **Feed Archetype**:
  - Dynamically adapts card/content columns based on window size: Compact (1 col), Medium (2 cols), Expanded (2–3 cols), Large (3 cols), Extra-Large (3–4 cols).
  - Maintains fluid width cards with uniform gutter spacing (16dp compact, 24dp expanded).
- **List-Detail Archetype**:
  - Compact: Single-pane stack with drilldown navigation. Tapping an item navigates to detail view with back button.
  - Expanded / Large / Extra-Large: Two-pane co-planar layout. Master list on left, detail pane on right, active item indicator highlight.
- **Supporting Pane Archetype**:
  - Compact: Stacked vertical order or dismissible bottom sheet.
  - Expanded+: Primary workspace pane (approx 2/3 width) paired with a permanent or collapsible supporting pane on right (approx 1/3 width, min-width 360dp).
- **Advanced Layering & Levitate Strategy**:
  - Modals, dialogs, and elevated sheets levitate above the pane scaffold with high-contrast scrim overlay (`bg-black/50`) and explicit z-index elevation ladder.

### 7.15 Usability & M3 Expressive Architecture Specification
Refer to `accessible-design-principles-manual.md` for full implementation details:
- **Nielsen Norman 5 Usability Pillars**:
  1. Efficiency: Fast, direct task execution with minimal steps.
  2. Error Reduction: Clear validation, safe undo operations, and immediate recovery instructions.
  3. Learnability: Obvious mental models using familiar interface metaphors.
  4. Memorability: Consistent component patterns so returning users immediately know how to operate.
  5. Satisfaction: Tactile feedback, responsive micro-interactions, and pleasant aesthetics.
- **6 Expressive Design Tactics**:
  1. Size: Scaling key elements to establish clear dominance.
  2. Containment: Framing content within cohesive cards and surfaces.
  3. Shape: Expressive rounded corners (8px, 12px, 16px, 24px) communicating interactivity.
  4. Color: Semantic color accents focusing user attention on primary goals.
  5. Motion: Smooth, physics-based springs (<300ms) guiding visual continuity.
  6. Typography: High-contrast hierarchy separating headings, labels, and metadata.
- **Anti-Clutter & Primary Goal Focus (Aura Case Study)**:
  - V1 Cluttered: Avoid exposing every metric and control simultaneously (cognitive overload).
  - V2 Calm & Focused: Establish a single primary hero action per screen, grouping secondary actions into progressive disclosure drawers or tabs.

### 7.16 Material Design 3 (M3) A-Z Lexicon Standards
Refer to `material-a-z-glossary.md` for 107 foundational architectural terms:
- **3-Tier Design Token Hierarchy**:
  - Reference Tokens: Global palette values (e.g. `md.ref.palette.primary40`).
  - System Tokens: Semantic role mappings (e.g. `md.sys.color.primary`).
  - Component Tokens: Component-specific property assignments (e.g. `md.comp.filled-button.container.color`).
- **HCT Color Science**:
  - Hue, Chroma, Tone color space providing true perceptual uniformity and mathematically guaranteed contrast across all generated tonal palettes.
- **Dynamic Schemes & Accessibility**:
  - User-generated or content-extracted palettes calibrated across Standard, Medium, and High contrast levels.
- **Component & Spatial Architecture**:
  - Canonical coverage of 35 components, XR Orbiters, Spatial Panes, and Jetpack Compose adaptive primitives.

### 7.17 Layout Scaffold Architecture Specification
Refer to `layout-scaffold-manual.md` for the complete specification:
- **Three Core Scaffold Regions**:
  1. Bars: Top App Bar (Small, Center-Aligned, Medium, Large) and Bottom App Bar / Bottom Nav framing the viewport.
  2. Rails: Navigation Rail (compact/expanded) and Trailing Utility Rails creating perimeter boundary space for actions and tools.
  3. Panes: Core content canvas hosting 1 to 3 panes (Single Pane, List-Detail, Supporting Pane) in co-planar, docked, or floating configurations.
- **Safety Regions Integration**:
  - Explicit margin offsets for hardware camera cutouts, system gesture navigation insets, and foldable physical hinge seams.
- **Jetpack Compose Rulers**:
  - Margin Ruler (edge spacing), Baseline Ruler (typography alignment), and Split Anchor Ruler (pane division coordinates).
- **Standard Spacing Scale**:
  - Strict adherence to mathematical token increments: 0dp, 4dp, 8dp, 12dp, 16dp, 24dp, 32dp, 40dp, 48dp, 56dp, 64dp.

### 7.18 Material 3 Color Roles System & 26 Roles Specification
Refer to `color-roles-system-manual.md` for the complete specification:
- **26 Standard Color Roles Across 6 Groups**:
  - Primary: `primary`, `on-primary`, `primary-container`, `on-primary-container`, `inverse-primary`.
  - Secondary: `secondary`, `on-secondary`, `secondary-container`, `on-secondary-container`.
  - Tertiary: `tertiary`, `on-tertiary`, `tertiary-container`, `on-tertiary-container`.
  - Error: `error`, `on-error`, `error-container`, `on-error-container`.
  - Surface: `surface`, `on-surface`, `surface-variant`, `on-surface-variant`, `inverse-surface`, `inverse-on-surface`, `surface-tint`.
  - Outline: `outline`, `outline-variant`.
- **Three Contrast Levels**:
  - Standard (default), Medium (elevated contrast for clarity), and High (maximum contrast meeting WCAG AAA requirements).
- **Colorful Container On-Roles**:
  - `on-primary-container`, `on-secondary-container`, `on-tertiary-container`, and `on-error-container` updated for richer, more colorful text and icons in light theme.
- **Tone-Based Surface Containers (Elevation Replacement)**:
  - Deprecates white alpha elevation overlays.
  - Discrete luminance steps: `surface-container-lowest` -> `surface-container-low` -> `surface-container` -> `surface-container-high` -> `surface-container-highest`.
- **Technical Calibrations**:
  - Default Light Theme Surface: Tone 98 (calibrated from legacy tone 99 to prevent OLED wash-out).
  - Neutral Palette Chroma: Set to 6 (calibrated from legacy 4 for subtle, richer warmth).
  - Dark Theme Surfaces: Darkened for deeper contrast and OLED energy efficiency.
- **Add-on Fixed Accent Color Roles**:
  - `*-fixed`, `*-fixed-dim`, `on-*-fixed`, `on-*-fixed-variant` for persistent, non-inverting accent elements across theme switches.
  - `surface-dim` and `surface-bright` for nuanced ambient canvas depth.
- **14 Affected Components**:
  - Badges, Buttons, Extended FAB, FAB, Icon Buttons, Segmented Buttons, Chips, Lists, Menus, Navigation Bar, Navigation Drawer, Navigation Rail, Switches, and Toolbars.

### 7.19 Interaction States & State Layers Specification
Refer to `accessible-design-principles-manual.md` (Section 15) for full implementation details:
- **Six Canonical Interaction States**:
  1. Enabled: Default interactive presentation communicating ready-for-input state.
  2. Disabled: Communicates non-interactive element via reduced elevation and color desaturation. Disabled states do NOT need to meet standard contrast requirements.
  3. Hover: Cursor over interactive surface, applying 8% content-color state layer overlay.
  4. Focused: Keyboard or input focus ring (2px solid `#0056FF` with 2px offset) and 12% state layer.
  5. Pressed: Active pointer down or keypress engagement, applying 12% content-color state layer.
  6. Dragged: Component lifted or moving across layout, applying 16% state layer and increased elevation.
- **State Layers Architecture**:
  - Semi-transparent overlay (`opacity` 0.08, 0.12, 0.16) using the content color (`on-surface`, `on-primary`) over the base container surface.
- **Component Inheritance & Exclusion Matrix**:
  - Inherited By: Action, Selection, and Input components (Buttons, Cards, Checkboxes, Chips, List items, Radio buttons, Segmented buttons, Switches, Text fields).
  - Excluded From: Container shells and chrome (App bars, Badges, Navigation bar, Navigation drawer, Navigation rail, Dialogs, Toolbars) do NOT inherit states; only child interactive elements within them receive states.
- **FAB State Exception**:
  - Unavailable Floating Action Buttons (FABs) must hide completely rather than display as disabled.
- **Layout Exclusivity**:
  - Strictly one hover, one focus, one pressed, and one dragged state active at any given moment in the layout.

### 7.20 Grids, Expressive Spacing & Density Scaling Specification
Refer to `accessible-design-principles-manual.md` (Section 16) for full implementation details:
- **Three Layout Pillars**:
  - Grids: Consistent foundation adapting column structures across breakpoints (4 cols compact, 8 cols medium, 12 cols expanded/large/extra-large).
  - Spacing: Groups related information via proximity and directs visual attention to key calls-to-action.
  - Density: Allows users to see and compare higher volumes of information in data-heavy screens without shrinking typography.
- **Spacing Token Scale**:
  - Increments: 0dp, 4dp, 8dp, 12dp, 16dp, 24dp, 32dp, 40dp, 48dp, 56dp, 64dp.
- **Component Density Scale**:
  - 0 (Default): Standard spacious layout.
  - -1, -2, -3 (High Density): Decreases vertical container height and padding by 4dp increments per step while strictly preserving font size and line height.
- **Target Bounds Invariant**:
  - All interactive elements must maintain minimum 48x48dp (or >=44x44px) touch targets regardless of chosen density scale.
- **Prohibited Dense Areas**:
  - Never apply high density to focused selection dialogs, confirmation modals, or snackbars.

### 7.21 Adaptive Breakpoints & 5-Vector Transformation Specification
Refer to `accessible-design-principles-manual.md` (Section 17) for full implementation details:
- **Five Standard Breakpoint Classes**:
  1. Compact (<600dp): Mobile phones, folded foldable devices. Single-pane default.
  2. Medium (600–839dp): Small tablets, unfolded foldable devices. Transition to dual-pane or collapsed rail.
  3. Expanded (840–1199dp): Full-sized tablets, landscape foldables, small laptops. Dual-pane co-planar default.
  4. Large (1200–1599dp): Desktop monitors, large laptops. Multi-pane, persistent navigation rail/drawer.
  5. Extra-Large (≥1600dp): Ultra-wide monitors, multi-window setups. 3-pane workspaces.
- **The Five Transformation Vectors**:
  1. Reveal: Expose secondary navigation rails, contextual panels, or action toolbars.
  2. Divide: Transition single-pane stacks to 2–3 co-planar panes (1 pane <840dp, 2 panes 840–1599dp, 3 panes ≥1600dp).
  3. Resize: Fluidly stretch or constrain container widths, maintaining 40–60 characters per line readability.
  4. Reposition: Shift mobile bottom action sheets and navigation to leading vertical rails or top bars.
  5. Swap: Substitute functionally equivalent components:
     - Bottom Nav -> Collapsed Navigation Rail -> Expanded Navigation Drawer
     - Bottom Sheet -> Side Sheet / Dropdown Menu
     - Full-Screen Dialog -> Standard Centered Modal Dialog

### 7.22 Multi-Modal Inputs & Selection Architecture Specification
Refer to `accessible-design-principles-manual.md` (Sections 12 & 13) for full implementation details:
- **Multi-Modal Input Support**:
  - Unified handling of mouse, trackpad, physical keyboard, stylus, and touch inputs simultaneously.
  - Show visible mouse pointer when pointing device connects; separate mouse-drag text selection from touch-drag view scrolling.
  - Semantic cursor morphology: `default`, `pointer`, `text`, `col-resize`, `row-resize`.
  - Secondary click context menus; suppress virtual on-screen keyboards when hardware keyboard is detected.
- **Selection Architecture**:
  - Three Canonical Selection Indicators: Surface tint (`#EFF5FF` with `#0056FF` keyline border), Checkmark icon, Checkbox component.
  - Single-Select Active Pills: Pill shape indicators on navigation rails, drawers, and tabs.
  - Touch Selection Protocol: Long-press to activate multi-select, tap avatar shortcut, Contextual Action Bar with `[N Selected]`, and batch drag without reordering conflicts.
  - Pointer Checkbox Visibility: Permanent visibility on primary data tables; reveal-on-hover or reveal-on-first-select on secondary feeds.

### 7.23 Mandatory Blueprint Menu Primary Sections Invariant (Brand Colors & Color Ramps Tokens — NEVER CHANGE)
In the Blueprint menu (`DesignSystemHomeView` / `/document/design`), the two primary anchor sections:
1. **Brand Colors** (`#brand-blueprint` / `BrandConceptBlueprint`):
   - 01 Royal Blue (`#0056FF`) — Primary base brand anchor
   - 02 Azure Blue (`#2277FF`) — Interactive accent
   - 03 Soft Lavender (`#E3E7FC`) — Micro-tint & badges
   - 04 White (`#FFFFFF`) — Document canvas base
   - 05 Ice Tint (`#EFF5FF`) — Subsurface card fill
   - SNPI International School Logo (`bg-[#FFFFFF]` White Canvas and `bg-[#E3E7FC]` Lavender Canvas)
2. **Color Ramps & Semantic Tokens** (`#color-ramps-tokens` / `ColorRampsTokens`):
   - Contrast-checked color ramps across Brand (`primary`), Accents (`accent`, `accent-2`), Neutral, and Status (`success`, `warning`, `error`, `info`)
   - Interactive filters: Category pills (`ALL`, `BRAND`, `ACCENT`, `NEUTRAL`, `STATUS`), Format switchers (`HEX`, `CSS`), and Contrast validators (`AA`, `AAA`)

**IMMUTABILITY INVARIANT**: These two sections must **ALWAYS remain primary, top-level (indexes 01 and 02 in `SIDEBAR_TREE`), and permanently intact**. Under no circumstances should AI agents or developers modify, remove, hide, reorder, or replace these two core foundation sections. They represent the permanent, sticky visual foundation of the SNPI enterprise design system.

---

### 7.24 The 6-Tier Culinary Component Architecture & Downward Import Invariant
Every component and view in the SNP-SMS platform strictly adheres to the 6-tier culinary hierarchy:
1. **Tier 01: Ingredients** (Tokens & Atoms): Color hexes, typography scales, spacing units, elevation/z-index, motion curves, raw SVGs.
2. **Tier 02: Recipes** (Atomic UI Primitives): Button, Text field, Checkbox, Radio, Switch, Badge, Avatar, Link, Divider, Tooltip.
3. **Tier 03: Entrees** (Compound Organisms): Data Table, Modal Dialog, Navigation Bar/Rail, Accordion, Toast Stack, Carousel, Search Filter Bar.
4. **Tier 04: Templates** (Layout Scaffolds): Viewport wireframes without dynamic data (Dashboard Scaffold, Settings Master-Detail, Split Panes).
5. **Tier 05: Pages** (Concrete Production Views): Live screens with real backend models & RBAC (Campus Analytics, Student Lifecycle, Billing, Attendance).
6. **Tier 06: Cookbook** (Master Design System): Complete governance rulebook, brand blueprint, component manuals, contribution RFCs, maintenance SLAs.

**Strict Downward Dependency Rule**:
- `Cookbook` -> Imports Guidelines, Foundations, Components & Maintenance
- `Pages` -> Imports Templates, Entrees, Recipes, Ingredients
- `Templates` -> Imports Entrees, Recipes, Ingredients (NEVER Pages)
- `Entrees` -> Imports Recipes, Ingredients (NEVER Templates or Pages)
- `Recipes` -> Imports Ingredients (NEVER Entrees, Templates, or Pages)
- `Ingredients` -> Pure Values (Imports NOTHING)

---

### 7.25 Mandatory Psychological Design Rules for AI Agents
When generating or editing user interface components, AI agents MUST enforce:
1. **Fitts's Law**: All touch targets >= 44x44px. Compact icon buttons (<=24px) MUST use `::before` pseudo-element hit-area expansion. Maintain 100ms coyote time on boundary exit.
2. **Hick's Law**: Surface <= 5 primary visible choices per tier. Enforce progressive disclosure for advanced settings.
3. **Miller's Law**: Group dense form inputs into visual cards of <= 5 fields per section. Segment identifiers into 3-4 character clusters.
4. **Doherty Threshold**: Maintain <= 400ms feedback cycles. Trigger immediate active press scale(0.96) on pointerdown. Render skeleton loading shimmers for async operations > 400ms.
5. **Postel's Law**: Generously parse human data entry (dates, phone numbers, search keywords) and normalize to strict ISO models before API dispatch.

---

### 7.26 Adobe React Spectrum Left Sidebar Navigation Standard
Refer to `ui-library-view.tsx` and `docs-sticky-header.tsx` for implementation:
- **Clean Child Item Typography (Zero Icons)**:
  - Icons are strictly reserved for parent category triggers only (`Navigation`, `Inputs`, `Feedback`, etc.).
  - All child component menu items render with pure clean typography without icon clutter.
- **Zero "Coming" Badge Clutter**:
  - Never display noisy `[ COMING ]` pill badges on unbuilt or draft components. Only newly completed components built within 7 days display a discrete green `New` pill.
- **Active State Indicator Bar (`| Accordion` / `| List view`)**:
  - Active item renders with a crisp vertical indicator bar on the left edge (`before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:rounded-full before:bg-slate-950`) and bold dark text (`font-bold text-slate-950 bg-slate-100/70`).
- **Collapsible Category Triggers with Count Badges**:
  - Each group header renders the parent group icon, title, item count badge (e.g. `[ 61 ]` or `[ 12 ]`), and chevron toggle (`ChevronDown` / `ChevronRight`).

---

### 7.27 Clean Minimalist Search Bar Standard
Refer to `ui-library-view.tsx` and `docs-sticky-header.tsx`:
- **Inline Search Icon**: Clean vector `Search` icon positioned at `left-3 size-4 text-slate-400 group-focus-within:text-[#0056FF]`. Never use bulky solid-color square icon buttons.
- **Standard Dimensions & Colors**: `h-9.5` (38px height), rounded-xl (`rounded-xl`), `#F8FAFC` base background, `#CAD3F5` border, and `#0A1A4A` text.
- **Zero Focus-Visible Outline Artifacts**:
  - Input elements MUST apply `focus:outline-none focus-visible:outline-none` and `style={{ outline: 'none' }}` to completely eliminate browser `:focus-visible` rectangular outline offsets.
  - Active focus state is communicated cleanly via `focus:border-[#0056FF] focus:bg-white focus:ring-2 focus:ring-[#0056FF]/15`.
- **Keyboard Shortcuts & Clear Action**: Frosted `⌘K` micro-badge and one-click clear `X` button.

---

### 7.28 Notification Bell & Anchored Floating Popover Standard
Refer to `feedback-demos.tsx` (`NotificationBellDemo`):
- **Floating Tap-to-Drop Anchored Architecture**:
  - The notification list is anchored directly under the bell trigger icon button (`absolute right-0 top-full mt-3 z-50 w-[calc(100vw-3rem)] sm:w-[420px]`).
  - Never render notifications as an inline page-pushing static card block.
- **Dismissal Hygiene**:
  - Outside-click detection (`handleClickOutside` with `mousedown` event listener) dismisses the popover automatically.
  - `Escape` key listener closes the panel immediately.
- **Domain Categories & Actions**:
  - Category filters: `All`, `Academic`, `Security`, `Finance`, `System`.
  - Mark all read, individual toggle unread, delete notification, and simulated real-time alert dispatching.

---

### 7.29 Enterprise Logo Marquee Section Standard
Refer to `logo-marquee.tsx` (`LogoMarquee` / `LogoMarqueeDemo`):
- **10 Real Enterprise Logos**:
  - Authentic SVGs for Apple, Google, Microsoft, Amazon, Meta, NVIDIA, OpenAI, Cloudflare, GitHub, and Vercel.
  - Strict monochrome black & white aesthetic (`#000000` / `#FFFFFF`) with zero colored logo clutter.
- **Hardware-Accelerated 60fps Drift**:
  - CSS keyframes ticker loop using `transform: translate3d(...)` with zero React re-render overhead.
  - Left/right linear edge gradient fade masks (`from-white to-transparent`).
  - Interactive speed controls (`Slow: 45s`, `Normal: 28s`, `Fast: 16s`), direction reverse (`Left` / `Right`), hover pause, and dual counter-track mode.

---

### 7.30 Sleek Minimalist Table of Contents (Rail TOC Standard)
Refer to `rail-toc.tsx` (`RailToc`):
- **Zero Clutter Track**:
  - Replaces clunky circular SVG nodes, de Casteljau Bézier connecting curves, and paper plane icons with a straight, ultra-crisp vertical track line.
- **Active Section Indication**:
  - Active heading displays a sleek vertical accent pill (`w-[2.5px] rounded-full bg-[#0056FF]`) on the track with bold high-contrast text (`font-bold text-[#0056FF] bg-[#EFF5FF]/80`).
- **Smooth Scroll & Navigation**:
  - One-click smooth scrolling to section ID with container offset calculation.

---

### 7.31 Signature Parent Colors & Pseudo-Random Component Demo Stage Canvas Standard
Refer to `component-nav-icons.tsx` and `ui-library-view.tsx` for implementation:
- **Kinetic Card Palette Derivation**:
  - Derived directly from the 6-card kinetic deck archetypes:
    1. Soft Ice Tint (`#EFF5FF` / `#CAD3F5`)
    2. Solid Brand Royal Blue (`#0056FF`)
    3. Signal / Sunny Yellow (`#FEFCE8` / `#FACC15`)
    4. Interactive Azure Blue (`#F0F7FF` / `#2277FF`)
    5. Mint Emerald Green (`#F0FDF4` / `#10B981`)
    6. Pearl Slate Mesh (`#F8FAFC` / `#475569`)
    7. Warm Honey Amber (`#FFFBEB` / `#F59E0B`)
    8. Rose Quartz (`#FFF1F2` / `#F43F5E`)
- **Parent Category Signature Binding (`getParentCategoryTheme`)**:
  - Applied to parent category triggers in the sidebar (icon + label), main feed category divider headers, and **all component card backgrounds within each parent group**.
  - Navigation: Azure Blue (`#2277FF`), card: `bg-[#EFF6FF] border-[#BAE6FD]`
  - Feedback: Royal Blue (`#0056FF`), card: `bg-[#EFF5FF] border-[#CAD3F5]`
  - Inputs: Sunny Yellow (`#EAB308` / `#FACC15`), card: `bg-[#FEFCE8] border-[#FEF08A]`
  - Containers / Display: Soft Lavender (`#8B5CF6`), card: `bg-[#F5F3FF] border-[#DDD6FE]`
  - Actions: Mint Emerald (`#10B981`), card: `bg-[#F0FDF4] border-[#BBF7D0]`
  - AI Prompts / AI Kit: Pearl Slate (`#475569`), card: `bg-[#F8FAFC] border-[#CBD5E1]`
  - Forms: Warm Honey Amber (`#F59E0B`), card: `bg-[#FFFBEB] border-[#FDE68A]`
  - Sections: Deep Azure (`#0284C7`), card: `bg-[#F0F9FF] border-[#BAE6FD]`
  - Text Effects: Rose Quartz (`#F43F5E`), card: `bg-[#FFF1F2] border-[#FECDD3]`
- **Unified Single-Layer 4px Radius Card Architecture**:
  - The entire component block is encapsulated into a single unified card (`rounded-[4px] border` with `borderRadius: '4px'`, `parentTheme.cardBg`, and `parentTheme.cardBorder`).
  - **Color Grouping by Parent Category**: All component cards within a parent group strictly inherit that parent's signature card background and border tokens (`parentTheme.cardBg` and `parentTheme.cardBorder`).
  - **Zero Nested Card Layers**: The component demo renders directly on the stage surface without nesting inner card wrappers.
  - **Component Title Encapsulation**: The title of the component and status badges reside inside the top of the unified card.
  - **Bottom-Left Install Command Pill**: The `npx snpi-ui@latest add <id>` command is positioned at the bottom-left of the card block with a matching `rounded-[4px]` border radius.
  - **Zero Color Label Name Chips**: No color names or palette pills (`• SOFT LAVENDER`, `• SIGNAL YELLOW`) are rendered on the card.
  - **Zero Count Badges**: No count badges (`{n} components`) on category header dividers, components, or sidebar menus.
  - **MANDATORY INVARIANT: Object Design Isolation**: Never modify, tint, or override the internal object design of the component being previewed (buttons, notification bell, inputs, tables, dialogs retain their authentic design tokens).
  - **WCAG AAA Compliance**: High-lightness tints (L* >= 94-98%) guarantee >= 7:1 contrast for all dark foreground text and crisp boundary separation for light elements.

---

## 8. Authoritative 5-Stage Design & Implementation Flow

Every new feature, UI component, or design system addition must progress through this strict 5-stage pipeline:

```
[STAGE 1: TAXONOMY] -> [STAGE 2: PSYCHOLOGY] -> [STAGE 3: TOKENS] -> [STAGE 4: CODE] -> [STAGE 5: QUALITY GATE]
```

1. **Stage 1: Architectural Taxonomy Classification**:
   - Classify the target element into its exact Culinary Tier (Ingredient, Recipe, Entree, Template, or Page).
   - Verify that all dependencies follow one-way downward imports.
2. **Stage 2: Cognitive Psychology Invariant Verification**:
   - Verify touch target size (Fitts >= 44px), choice density (Hick <= 5), section chunking (Miller <= 5), latency feedback (Doherty <= 400ms), and input tolerance (Postel).
3. **Stage 3: Token Binding & Theme Rules**:
   - Exclusively bind colors to the 5 primary brand tokens: `#0056FF` Royal Blue, `#2277FF` Azure Blue, `#CAD3F5` Soft Lavender border, `#FFFFFF` White canvas, `#EFF5FF` Ice Tint card fill, and `#0A1A4A` Deep Navy text.
   - Enforce WCAG AAA >= 7:1 contrast. Zero muddy grays, zero black terminal console boxes in documentation.
4. **Stage 4: Implementation & Zero-Truncation Layout**:
   - Render labels using responsive `break-words leading-tight`/`leading-snug`. Never truncate group headers, tree navigation items, or section jump menus.
   - Integrate keyboard navigation (Tab, Esc, Enter, Arrows) and accessible ARIA attributes.
5. **Stage 5: Verification Quality Gate**:
   - Run `npm run build --workspace=apps/frontend` to verify 0 TypeScript/compilation errors.
   - Run `npm test --workspace=apps/frontend` to ensure 218/218 unit tests pass.
   - Record updates in real-time in `CHANGELOG.md` per `snp-sms-changelog-workflow`.

