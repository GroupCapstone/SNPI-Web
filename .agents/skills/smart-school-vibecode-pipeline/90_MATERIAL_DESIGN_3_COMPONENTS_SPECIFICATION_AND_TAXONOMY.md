# Google Material Design 3 (M3) Component Specification & Taxonomy
## Authoritative Architecture for the 30+ M3 UI Primitives across Actions, Communication, Containment, Navigation, Selection & Inputs

### Executive Overview & Strategic Synthesis

This specification establishes the authoritative architectural blueprint for the complete **Google Material Design 3 (M3) Component Library**, derived directly from the official Google Material Design 3 Component guidelines (`https://m3.material.io/components`). 

Material Design 3 organizes UI components into **6 Functional Categories**:
1. **Actions**: Common buttons, Floating Action Buttons (FAB), Extended FABs, Icon buttons, Segmented buttons.
2. **Communication**: Badges, Progress indicators, Snackbars, Tooltips (Plain & Rich).
3. **Containment**: Bottom sheets, Side sheets, Cards, Carousel, Dialogs, Dividers, Lists.
4. **Navigation**: Bottom app bars, Navigation bar, Navigation drawer, Navigation rail, Search (Search Bar & Search View), Tabs, Top app bars.
5. **Selection**: Checkboxes, Chips, Date pickers, Menus, Radio buttons, Sliders, Switches, Time pickers.
6. **Text inputs**: Text fields (Filled, Outlined, Text Area).

This document codifies the design anatomy, state layers, responsive transformations, logical styling tokens, and interaction mechanics for each component, integrating them into the Smart School Enterprise Platform.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   GOOGLE MATERIAL DESIGN 3: THE 6 FUNCTIONAL COMPONENT PILLARS                   │
├─────────────────┬──────────────────────────────────┬─────────────────────────────────────────────┤
│ Functional Area │ Primary M3 Components            │ Key Architectural Role                      │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────────────────┤
│ 1. ACTIONS      │ Buttons, FAB, Extended FAB,      │ Primary user intent execution, toolbars,    │
│                 │ Icon Buttons, Segmented Buttons  │ and multi-option segmented toggles.         │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────────────────┤
│ 2. COMMUNICATION│ Badges, Progress Bars,           │ System status telemetry, unread counters,   │
│                 │ Snackbars, Plain & Rich Tooltips │ feedback snackbars, and contextual cards.   │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────────────────┤
│ 3. CONTAINMENT  │ Bottom/Side Sheets, Cards,       │ Spatial layout grouping, multi-browse       │
│                 │ Carousel, Dialogs, Dividers      │ carousels, modals, and list containers.     │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────────────────┤
│ 4. NAVIGATION   │ Nav Bar, Nav Rail, Nav Drawer,   │ Cross-screen wayfinding, expandable search  │
│                 │ Search View, Tabs, Top App Bars  │ overlays, and adaptive responsive rails.    │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────────────────┤
│ 5. SELECTION    │ Checkboxes, Chips, Date Pickers, │ Data filtering, calendar dates, analog      │
│                 │ Time Pickers, Sliders, Switches  │ clock dials, sliders, and option selection. │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────────────────┤
│ 6. TEXT INPUTS  │ Filled & Outlined Text Fields,   │ Form data capture, multi-line notes, and    │
│                 │ Multiline Text Areas             │ floating label validation containers.       │
└─────────────────┴──────────────────────────────────┴─────────────────────────────────────────────┘
```

---

## 1. Actions Subsystem (Buttons, FAB, Segmented Buttons)

### 1.1 Segmented Buttons (`<md-segmented-button-set>`)
Segmented buttons help users select options, switch views, or sort elements across a unified horizontal pill container.
- **Configurations**:
  - *Single-Select*: Mutually exclusive options (e.g. Day / Week / Month timetable view).
  - *Multi-Select*: Independent multi-option selection (e.g. Bold, Italic, Underline formatting).
- **Anatomy & Sizing**:
  - Container Height: 40dp.
  - Corner Radii: Outer left corners `20px` (start), inner segment corners `0px`, outer right corners `20px` (end).
  - Selected State: Features an animated checkmark icon prefix (`check`) with container fill `var(--md-sys-color-secondary-container)` and label `var(--md-sys-color-on-secondary-container)`.
  - Unselected State: Transparent background with `var(--md-sys-color-outline)` 1px border.

```html
<!-- Single-Select Segmented Button Example -->
<md-segmented-button-set>
  <md-segmented-button label="Day" selected></md-segmented-button>
  <md-segmented-button label="Week"></md-segmented-button>
  <md-segmented-button label="Month"></md-segmented-button>
</md-segmented-button-set>
```

### 1.2 Extended Floating Action Button (Extended FAB)
Extended FABs provide a prominent call to action with both an icon and text label for high visual clarity.
- **Anatomy & Dimensions**:
  - Height: 56dp.
  - Corner Radius: 16dp (`var(--md-sys-shape-corner-large)`).
  - Elevation: Level 3 at rest (box shadow + surface tint), Level 4 on hover.
  - Responsive Behavior: Dynamically collapses from an Extended FAB (icon + label) into a standard 56dp FAB (icon only) when the user scrolls down a data table or student list, expanding back on scroll-to-top.

---

## 2. Communication Subsystem (Badges, Tooltips, Progress)

### 2.1 Small Dot & Large Numeric Badges
Badges communicate dynamic notification counts or unread presence over icons, avatar photos, or navigation tabs.
- **Small Dot Badge**:
  - Dimensions: 6dp diameter circle.
  - Role: Indicates unread activity without explicit numeric value.
  - Token: Background `var(--md-sys-color-error, #BA1A1A)`.
- **Large Numeric Badge**:
  - Height: 16dp pill; Width: min 16dp (expands dynamically up to 4 digits).
  - Maximum Display: 3 digits (`999`); 4+ digits format with plus sign (`999+`).
  - Typography: `var(--md-sys-typescale-label-small)` (11px, weight 500).
  - Offset Alignment: Positioned over the top-trailing corner of the parent target with `8px` center offset.

### 2.2 Plain Tooltips vs. Rich Tooltips
- **Plain Tooltip**:
  - Sizing: Single-line text pill (height 24dp, corner 4dp).
  - Background: `var(--md-sys-color-inverse-surface, #313033)`, text `var(--md-sys-color-inverse-on-surface, #F4EFF4)`.
  - Trigger: Mouse hover (>500ms delay) or keyboard focus.
- **Rich Tooltip**:
  - Purpose: Detailed contextual assistance or educational walkthroughs.
  - Anatomy: Sub-headline (14px bold), Body text (12px regular), and optional Action buttons (e.g. "Learn more", "Dismiss").
  - Container: Elevated card (corner 12dp, elevation Level 2, surface `var(--md-sys-color-surface-container)`).
  - Persistence: Remains visible until explicit user dismissal or outside tap.

---

## 3. Containment Subsystem (Sheets, Carousel, Dialogs)

### 3.1 Bottom Sheets & Side Sheets
Sheets provide secondary surfaces anchored to the viewport edges for detailed tasks or auxiliary navigation.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                          SHEET ADAPTATION ACROSS BREAKPOINTS                                     │
├───────────────────────────────────────┬──────────────────────────────────────────────────────────┤
│ Compact Devices (< 600dp / Mobile)    │ Expanded Devices (>= 840dp / Tablet & Desktop)           │
├───────────────────────────────────────┼──────────────────────────────────────────────────────────┤
│ MODAL BOTTOM SHEET                    │ CO-PLANAR SIDE SHEET                                     │
│ - Slides up from bottom of viewport   │ - Slides in from right margin as a docked panel          │
│ - Top drag handle (32x4dp pill)       │ - Maintains full vertical viewport height (100vh)        │
│ - Modal scrim overlay (#000 at 32%)   │ - Pushes main content (co-planar) or overlays            │
│ - Swipe-down to dismiss gesture       │ - Standard width: 360dp to 400dp                         │
└───────────────────────────────────────┴──────────────────────────────────────────────────────────┘
```

### 3.2 Carousel Primitives (Multi-Browse & Hero Uncontained)
M3 Carousels display horizontal scrolling collections of related items with dynamic edge clipping:
- **Multi-Browse Carousel**: Shows a large primary card, a medium trailing card, and a small cut-off preview card indicating horizontal scrollability.
- **Hero Carousel**: One dominant full-width card with small trailing edge peek.
- **Physics**: CSS scroll snap (`scroll-snap-type: x mandatory;`) with spring momentum and edge padding (16px).

---

## 4. Navigation Subsystem (Search View, Nav Rail, Top App Bars)

### 4.1 Search Bar & Search View Transition
M3 introduces an integrated search pattern replacing static inputs with an active search surface:
- **Search Bar (Rest State)**: A 56dp high pill container (`corner-full` 9999px) with leading search icon, trailing avatar/clear button, and surface `var(--md-sys-color-surface-container-high)`.
- **Search View (Active State)**: Upon tap/click, the Search Bar expands through an Emphasized ease-out motion curve into a full-screen surface (or 720dp modal on desktop), displaying recent searches, filter chips, and real-time auto-complete list items.

```html
<!-- M3 Search Bar & View Concept -->
<div class="md-search-bar" role="search">
  <span class="material-symbols-outlined">search</span>
  <input type="search" placeholder="Search students, classes, or invoices..." />
  <span class="material-symbols-outlined">mic</span>
</div>
```

### 4.2 Adaptive Navigation: Bottom Bar to Navigation Rail
- **Mobile (< 600dp)**: Navigation Bar docked to viewport bottom with 3 to 5 destinations. Each destination has an active pill indicator (`width 64dp, height 32dp`) and label text.
- **Tablet & Desktop (>= 600dp)**: Automatically reflows into a **Navigation Rail** anchored to the left viewport edge:
  - Width: 80dp.
  - Top Action: FAB or Logo.
  - Middle: Vertical destination icons with active pills.
  - Bottom: Settings, Profile, or Dark Mode toggle.

### 4.3 Top App Bar Hierarchy (Small, Center-Aligned, Medium, Large)
1. **Small Top App Bar**: 64dp height, single-line headline with leading navigation icon and trailing actions.
2. **Center-Aligned Top App Bar**: 64dp height, title centered for primary landing screens.
3. **Medium Top App Bar**: 112dp height, 2-line title collapsing to 64dp on scroll.
4. **Large Top App Bar**: 152dp height, prominent 32px display title collapsing smoothly into a 64dp small app bar as the user scrolls downwards, with elevation tint activation.

---

## 5. Selection Subsystem (Date & Time Pickers, Sliders, Chips)

### 5.1 Dual-Mode Date Pickers
- **Modal Date Picker (Calendar Grid)**:
  - Header: Shows selected date in human format (e.g. "Wed, Sep 12").
  - Body: 7-column calendar matrix with month/year pagination.
  - Mode Switch: Pencil icon toggles from visual calendar grid to manual text input mode.
- **Modal Date Range Picker**:
  - Enables start date and end date selection connected by a continuous colored selection band (`var(--md-sys-color-secondary-container)`).

### 5.2 Time Pickers (Analog Clock Dial & Digital Input)
- **Analog Clock Dial Mode**:
  - Interactive circular clock face with rotating selector arm.
  - 12/24 hour radial numbers with touch drag precision.
- **Digital Input Mode**:
  - Two large input boxes for Hours and Minutes (56x56dp, 24px numbers).
  - Vertical AM/PM toggle pill.

### 5.3 High-Fidelity Sliders (Continuous, Discrete, Range)
- **Continuous Slider**: Smooth tracking without quantization.
- **Discrete Slider with Tick Marks**: Snaps to integer intervals with value indicator bubble appearing above the thumb on drag.
- **Range Slider**: Dual thumbs (`start` and `end`) controlling a bounded numerical interval (e.g. fee range, grade boundary).

---

## 6. Text Inputs Subsystem (Filled & Outlined Anatomy)

### 6.1 Filled vs Outlined Architecture
```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                         M3 TEXT FIELD ANATOMY & COMPARISON                                       │
├───────────────────────────────┬──────────────────────────────────────────────────────────────────┤
│ FILLED TEXT FIELD             │ OUTLINED TEXT FIELD                                              │
├───────────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ - Container fill: Surface-Var │ - Container fill: 100% transparent                               │
│ - Bottom active indicator (1px│ - Continuous outline stroke (1px resting, 2px focused)           │
│   resting, 2px focused primary)│ - Floating label cuts through the outline border                 │
│ - Corner radius: 4px top only │ - Corner radius: 4px or 8px on all 4 corners                     │
│ - Best for dense data forms   │ - Best for clean, distinct visual separation on colored surfaces │
└───────────────────────────────┴──────────────────────────────────────────────────────────────────┘
```

### 6.2 Universal Form Field Accessories
Both variants support standardized slot compartments:
- Leading Icon (24px, optical weight 500).
- Floating Label (transitions to 12px on focus or non-empty value).
- Prefix Text (e.g. `$`, `៛`, `+855`).
- Suffix Text (e.g. `kg`, `USD`, `mins`).
- Trailing Action (Clear button, password visibility eye toggle, error icon).
- Supporting Text & Character Counter (`42 / 100`).

---

## 7. Inviolable Platform Standards Compliance

1. **Strict Zero-Emoji Directive**: 100% free of emojis or Unicode pictorial glyphs across all specs, code, and documentation.
2. **Iconography Standard**: Standardized exclusively on Google Material Symbols Outlined (`wght 500`).
3. **Three-Font Typographic System**:
   - English Content: Ubuntu / Roboto.
   - Khmer Localized UI: Google Sans Khmer with zero-width space `\u200B` word boundary separators.
   - Formal Diplomas & Certificates: Moul.
