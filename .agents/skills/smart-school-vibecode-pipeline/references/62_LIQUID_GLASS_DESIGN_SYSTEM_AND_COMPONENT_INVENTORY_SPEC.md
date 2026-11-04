---
name: smart-school-design-system
description: Authoritative Liquid Glass Design System, Foundations, Tokens, Accessibility standards, and 26-Component Inventory for the Smart School Enterprise Platform. Enforces strict zero-emoji compliance, Google Material Symbols Outlined (wght 500), Ubuntu + Google Sans Khmer typography, and tactile brutalist-glass physics.
---

# Liquid Glass Design System & Component Library Standard
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Design System Mission

The **Smart School Design System** provides a unified visual, interactive, and architectural foundation across all eight institutional web portals, public front sites, and native mobile interfaces. 

It synthesizes the **Liquid Glass Design DNA** with enterprise-grade durability:
- **Zero-Emoji Policy**: Pure typographic hierarchy and solid Google Material Symbols Outlined exclusively (`wght: 500`).
- **Tactile Brutalist-Glass Physics**: Frosted glass surfaces (`backdrop-blur-xl`), 360-degree specular top highlights (`border-t-white/95`), and crisp zero-blur offset elevation shadows (`shadow-[0_4px_0_0_...]`).
- **Three-Font Standard**: English in **Ubuntu**, Khmer UI in **Google Sans**, and Ceremonial Khmer in **Moul**.
- **WCAG 2.2 Level AA Accessibility**: Full keyboard navigation, visible focus indicators, and programmatic ARIA bindings.

---

## 1. Design System Foundations

### 1.1. Typography System (`Aa Typography`)

The platform implements a strict multi-lingual font architecture self-hosted internally for instant TTFB and zero Cumulative Layout Shift (CLS):

| Typography Tier | Font Family | Tailwind Class | Primary Usage & Line Height Rules |
|:---|:---|:---|:---|
| **English Primary** | **Ubuntu** (`sans-serif`) | `font-ubuntu` | All English interface copy, numbers, navigation, tabular data grids, metrics, and labels. Default leading: `1.4`. |
| **Khmer Primary** | **Google Sans Khmer** | `font-khmer` | All Khmer localized UI text, student profiles, messages, and announcements. Mandatory line-height `1.48` to prevent vowel clipping. |
| **Khmer Ceremonial** | **Moul** | `font-moul` | Formal diplomas, graduation certificates, and institutional award crests. |
| **Monospace / Code** | **JetBrains Mono** | `font-mono` | Accession numbers (`B001-8921`), student admission numbers (`18001`), voucher codes, and API tokens. |

#### Typographic Scale Hierarchy
- **Display 1**: `text-4xl font-bold tracking-tight leading-tight` (36px / 44px) - Landing page heroes & portal greetings.
- **Heading 1**: `text-2xl font-bold tracking-tight` (24px / 32px) - Page module titles (`Book List`, `Collect Fees`).
- **Heading 2**: `text-xl font-semibold` (20px / 28px) - Section card headers, modal titles.
- **Heading 3**: `text-base font-semibold` (16px / 24px) - Group headers, panel subsection bars.
- **Body Regular**: `text-sm font-normal text-slate-700` (14px / 20px) - General paragraph copy, table cell content.
- **Body Medium**: `text-sm font-medium text-slate-900` (14px / 20px) - Interactive labels, dropdown items.
- **Caption / Meta**: `text-xs font-normal text-slate-500` (12px / 16px) - Timestamps, helper texts, table column headers.

---

### 1.2. Color System & Role Brand Matrix (`Color System`)

The institutional color system defines distinct semantic role accents (`src/config/brand.ts`) alongside traffic status tokens:

#### A. Institutional Role Color Spectrum
- **Super Admin**: `#8E24AA` (`bg-[#8E24AA]`, `border-[#6A1B9A]`, `shadow-[#4A148C]`) - Imperial Purple.
- **Campus Admin (Dean)**: `#0288D1` (`bg-[#0288D1]`, `border-[#0277BD]`, `shadow-[#01579B]`) - Cerulean Blue.
- **Teacher**: `#2563EB` (`bg-[#2563EB]`, `border-[#1D4ED8]`, `shadow-[#1E40AF]`) - Royal Blue.
- **Student**: `#8BC34A` (`bg-[#8BC34A]`, `border-[#7CB342]`, `shadow-[#558B2F]`) - Vitality Lime.
- **Parent**: `#E91E63` (`bg-[#E91E63]`, `border-[#D81B60]`, `shadow-[#AD1457]`) - Rose Pink.
- **Accountant**: `#FF9800` (`bg-[#FF9800]`, `border-[#F57C00]`, `shadow-[#E65100]`) - Ledger Amber.
- **Receptionist**: `#00BCD4` (`bg-[#00BCD4]`, `border-[#00ACC1]`, `shadow-[#00838F]`) - Cyan Teal.
- **Librarian**: `#4CAF50` (`bg-[#4CAF50]`, `border-[#43A047]`, `shadow-[#2E7D32]`) - Forest Emerald.

#### B. Semantic Status Palette
- **Success / Present / Paid**: `#10B981` (Emerald-500) | Canvas: `bg-emerald-50 text-emerald-800 border-emerald-200`
- **Danger / Absent / Overdue**: `#EF4444` (Rose-500) | Canvas: `bg-rose-50 text-rose-800 border-rose-200`
- **Warning / Half-Day / Partial**: `#F59E0B` (Amber-500) | Canvas: `bg-amber-50 text-amber-800 border-amber-200`
- **Info / Announcement**: `#3B82F6` (Blue-500) | Canvas: `bg-blue-50 text-blue-800 border-blue-200`
- **Neutral Surface**: Canvas: `bg-slate-50 border-slate-200 text-slate-700`

---

### 1.3. Design Tokens (`{}` Tokens)

```css
:root {
  /* Liquid Glass Surface Tokens */
  --glass-bg: rgba(255, 255, 255, 0.82);
  --glass-blur: blur(20px);
  --glass-border: rgba(255, 255, 255, 0.65);
  --glass-specular: rgba(255, 255, 255, 0.95);
  
  /* Hard Tactile Elevation Shadows */
  --shadow-flat-sm: 0 2px 0 0 rgba(15, 23, 42, 0.08);
  --shadow-flat-md: 0 4px 0 0 rgba(15, 23, 42, 0.08);
  --shadow-flat-lg: 0 8px 0 0 rgba(15, 23, 42, 0.06);
  --shadow-btn-primary: 0 4px 0 0 #4A148C;

  /* Corner Radii */
  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-full: 9999px;
}
```

---

### 1.4. Spacing, Grid & Layout (`Spacing / Grid`)

- **Base Incremental Engine**: Strict 4px / 8px scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`).
- **Responsive Grid**: 12-column responsive layout (`gap-4` on mobile, `gap-6` on desktop).
- **Standard Container Widths**:
  - Portal App Shell: Max width `1600px` with persistent responsive left sidebar.
  - Public Front Site: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

---

### 1.5. Accessibility Standards (`Accessibility`)

- **Contrast Compliance**: Minimum contrast ratio of `4.5:1` for normal text and `3:1` for large text and interactive components.
- **Focus Rings**: Universal visible focus indicator: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2`.
- **Keyboard Trapping & Modals**: Implemented via `@radix-ui/react-dialog` with Escape key dismiss and automated focus return.
- **Screen Reader Support**: All icons tagged with `aria-hidden="true"`; interactive icon buttons provide `aria-label`.

---

## 2. Master Component Inventory (26 Production Components)

Below is the authoritative specification for all 26 components in the design system:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SMART SCHOOL 26-COMPONENT INVENTORY                             │
├──────────────────────┬──────────────────────┬───────────────────┬──────────────────────┤
│ 1. Navigation        │ 2. Data Display      │ 3. Form Controls  │ 4. Overlays & Alerts │
├──────────────────────┼──────────────────────┼───────────────────┼──────────────────────┤
│ • Drawer             │ • Table (Data Grid)  │ • Button (Tactile)│ • Modal (Dialog)     │
│ • Accordion          │ • Card (Liquid Glass)│ • Input Field     │ • Dropdown Menu      │
│ • Breadcrumb         │ • Badge (Pill)       │ • Searchbar       │ • Toast              │
│ • Tabs               │ • Avatar (Squircle)  │ • Checkbox        │ • Alert              │
│ • Stepper            │ • Skeleton           │ • Radio           │ • Banner             │
│                      │ • Carousel           │ • Toggle (Switch) │ • Loading (Spinner)  │
│                      │ • Tooltip            │ • Slider          │ • Icon (Material)    │
│                      │                      │ • Date Picker     │                      │
└──────────────────────┴──────────────────────┴───────────────────┴──────────────────────┘
```

---

### Component Catalog & Implementation Specifications

#### 1. Button (`Button`)
- **Physics**: Tactile sticker button. Hard bottom offset shadow. On active press: `active:translate-y-[2px] active:shadow-[0_2px_0_0_...]`.
- **Variants**:
  - `Primary`: Solid role color (`bg-[#8E24AA] text-white shadow-[0_4px_0_0_#4A148C]`).
  - `Secondary`: Frosted white (`bg-white/90 text-slate-800 border border-slate-200 shadow-[0_4px_0_0_#CBD5E1]`).
  - `Danger`: Rose crimson (`bg-[#EF4444] text-white shadow-[0_4px_0_0_#991B1B]`).
  - `Ghost`: Transparent (`hover:bg-slate-100 text-slate-700`).

#### 2. Card (`Card`)
- **Design DNA**: `bg-white/80 backdrop-blur-xl border border-white/60 border-t-white/95 rounded-2xl shadow-[0_8px_0_0_rgba(15,23,42,0.06)] p-6`.
- **States**: Default, Hover interactive (`hover:border-purple-200 transition-all`), Selected (`ring-2 ring-purple-600`).

#### 3. Table (`Table`)
- **Engine**: Headless **TanStack Table v8** with row virtualization.
- **Styling**: Frosted white container, sticky header (`bg-slate-50/75 backdrop-blur-md`), hoverable zebra rows, sort indicators (`arrow_upward` / `arrow_downward`).

#### 4. Input Field (`Input Field`)
- **Structure**: Rounded-xl input with crisp slate-200 border, white/80 glass fill, leading icon, clear button, and inline validation message.
- **States**: Default, Focus (`border-purple-600 ring-2 ring-purple-100`), Error (`border-rose-500 ring-2 ring-rose-100 text-rose-900`), Disabled.

#### 5. Searchbar (`Searchbar`)
- **Structure**: Composite search control with `search` Material Symbol, debounce timer (300ms), keyboard shortcut hint (`Cmd+K`), and clear trigger (`close`).

#### 6. Modal / Dialog (`Modal`)
- **Backing Primitive**: `@radix-ui/react-dialog`.
- **Backdrop**: `bg-slate-900/40 backdrop-blur-md animate-fade-in`.
- **Dialog Surface**: Centered liquid glass card with fixed header, scrollable body, and sticky bottom action footer.

#### 7. Drawer / Sheet (`Drawer`)
- **Backing Primitive**: `@radix-ui/react-dialog`.
- **Placement**: Slides in from Right (`max-w-md w-full bg-white/95 backdrop-blur-2xl border-l border-slate-200 shadow-2xl`). Used for quick issue-book checkout and student detail peek panels.

#### 8. Accordion (`Accordion`)
- **Backing Primitive**: `@radix-ui/react-accordion`.
- **Usage**: Multi-tier module settings, fee breakdown categories, and FAQ lists. Features rotating chevron symbol (`expand_more`).

#### 9. Tabs (`Tabs`)
- **Variants**:
  - `Segmented Glass Pill`: Enclosed capsule (`bg-slate-100/80 p-1 rounded-xl`) with active white glass pill.
  - `Underline`: Border-bottom active indicator in role brand color.

#### 10. Stepper (`Stepper`)
- **Structure**: Sequential workflow indicator for Student Admission Wizard and Session Rollover. Shows completed states (`check_circle`), active step (pulsing ring), and upcoming steps.

#### 11. Dropdown Menu (`Dropdown Menu`)
- **Backing Primitive**: `@radix-ui/react-dropdown-menu`.
- **Surface**: Floating glass popover (`bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl rounded-xl p-1.5 min-w-[200px]`).

#### 12. Toast (`Toast`)
- **Position**: Top-right or bottom-right floating viewport.
- **Styling**: Compact liquid glass pill with role/status accent border, dismiss trigger, and automatic 4-second timeout.

#### 13. Alert (`Alert`)
- **Usage**: Static in-page callout banner.
- **Variants**: `Info` (Blue), `Success` (Emerald), `Warning` (Amber), `Danger` (Rose). Features matching solid Material Symbol and clean typography.

#### 14. Banner (`Banner`)
- **Usage**: Full-width persistent institutional notification ribbon (e.g., Campus closure alerts, fee deadline countdown).

#### 15. Badge (`Badge`)
- **Form**: Rounded-full pill (`px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider`).
- **Variants**: Status colors (Emerald, Rose, Amber, Blue, Slate, Purple).

#### 16. Avatar (`Avatar`)
- **Shape**: Modern macOS squircle (`rounded-2xl`).
- **Fallback**: Two-letter uppercase initials on role-colored pastel background. Active status dot (`ring-2 ring-white`).

#### 17. Checkbox (`Checkbox`)
- **Primitive**: `@radix-ui/react-checkbox`.
- **Design**: Rounded-md tactile box with solid purple checked fill and white checkmark symbol (`check`). Supports indeterminate state (`horizontal_rule`).

#### 18. Radio (`Radio`)
- **Primitive**: `@radix-ui/react-radio-group`.
- **Design**: Circular radio ring with solid inner dot on selection.

#### 19. Toggle / Switch (`Toggle`)
- **Primitive**: `@radix-ui/react-switch`.
- **Design**: Pill track (`w-11 h-6 rounded-full`) with smooth sliding circular glass thumb.

#### 20. Slider (`Slider`)
- **Primitive**: `@radix-ui/react-slider`.
- **Usage**: Pass mark thresholds, budget sliders, and font scaling adjusters.

#### 21. Date Picker (`Date Picker`)
- **Structure**: Glass calendar popover supporting single date selection and academic date range picking with quick presets (`Today`, `This Month`, `Term 1`).

#### 22. Breadcrumb (`Breadcrumb`)
- **Structure**: Horizontal path trail (`Library > Circulation > Issue Book`) with separator symbol (`chevron_right`).

#### 23. Skeleton (`Skeleton`)
- **Design**: Shimmering pulse effect (`bg-slate-200/70 animate-pulse rounded-lg`) mapped to tables, cards, and avatars during TanStack Query fetching.

#### 24. Loading / Spinner (`Loading`)
- **Variants**: Circular indeterminate spinner (`animate-spin`), horizontal progress bar, and full-page glass loader.

#### 25. Carousel (`Carousel`)
- **Usage**: Public Front Site testimonial slider, campus photo gallery, and student badge showcase.

#### 26. Icon (`Icon`)
- **Engine**: Google Material Symbols Outlined exclusively (`wght: 500`). Zero emojis allowed anywhere.

---

## 3. Production Verification & Architectural Conformance

- [x] Strict Zero Emoji Policy enforced across all 26 components.
- [x] Three-Font Architecture codified (Ubuntu, Google Sans Khmer, Moul).
- [x] 8 Institutional Role Accents mapped to button, border, and badge tokens.
- [x] WCAG 2.2 AA compliant focus states and Radix UI headless primitives specified.
