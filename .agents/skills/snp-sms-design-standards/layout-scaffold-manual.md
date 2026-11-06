# Material 3 Layout Scaffold & Structural Composition Manual

Authoritative engineering and design reference for the Material 3 Layout Scaffold—a fundamental UI design structure that provides a standard platform for assembling key components across all viewports and device form factors.

---

## 1. Scaffold Overview & Architectural Philosophy

The layout scaffold structures every element of an adaptive application interface into three primary functional regions surrounded by system boundaries:

```
+-------------------------------------------------------------------------+
| SYSTEM SAFETY REGION (Cutouts, Status Bars, Gesture Insets)             |
+-------------------------------------------------------------------------+
| [TOP APP BAR] (Context, Title, Key Actions, Search)                     |
+------------+---------------------------------------------+--------------+
| [RAIL]     | [PRIMARY PANE]                              | [SUPPORTING  |
| Navigation | Content, Lists, Feeds, Workspaces           |  PANE / RAIL]|
| Toolbars   |                                             | Contextual   |
| FABs       |                                             | Tools, Chat  |
+------------+---------------------------------------------+--------------+
| [BOTTOM APP BAR / NAVIGATION BAR] (Mobile Ergonomics)                   |
+-------------------------------------------------------------------------+
| SYSTEM SAFETY REGION (Home Indicator, Navigation Bar)                   |
+-------------------------------------------------------------------------+
```

### Core Invariants
1. **Bars**: Frame the page to guide navigation and supply persistent context across single or multi-pane views.
2. **Rails**: Perimeter space surrounding panes, reserving ergonomic room for navigation rails, toolbars, and floating actions.
3. **Panes**: Primary content containers that dynamically adapt across breakpoints (Compact to Extra-Large) and layout conditions.
4. **Safety Region**: The inviolable system perimeter protecting application content from device hardware cutouts, software gesture bars, camera notches, and foldable hinges.

---

## 2. Bars Architecture

Bars provide structural framing at the top and bottom of the viewport:

### 2.1 Top App Bar Configurations
* **Center-Aligned Top App Bar**: Root-level navigation with 1 centered title, leading navigation icon (menu or back), and 1–2 trailing action icons. Recommended for mobile root destinations.
* **Small Top App Bar**: Compact 64dp header with left-aligned title. Standard for desktop sub-pages and modal dialogs.
* **Medium Top App Bar**: Two-row header (112dp) providing a prominent headline that collapses into a small app bar upon upward scrolling.
* **Large Top App Bar**: Extended three-row header (152dp) reserved for rich editorial spaces or hero landing dashboards.

### 2.2 Bottom App Bar & Navigation Bar
* **Bottom Navigation Bar**: Persistent 80dp mobile navigation spanning 3–5 top-level destinations with active indicator pills (`#EFF5FF` fill, `#0056FF` icon/label).
* **Bottom App Bar**: Ergonomic mobile container hosting 3–4 high-frequency contextual actions and optional docked Floating Action Button (FAB).
* **Pane Spanning Rule**: On multi-pane desktop layouts, top app bars can span across the entire window or remain scoped to individual panes; bottom navigation bars collapse and swap into vertical navigation rails.

---

## 3. Rails Architecture

Rails create dedicated perimeter space bordering content panes:

### 3.1 Navigation Rail
* **Standard Rail (80dp width)**: Anchored to the leading edge (left for LTR, right for RTL). Houses 3–7 primary destination icons with accessible hover tooltips and optional top FAB.
* **Expanded Navigation Drawer**: Shifts from 80dp collapsed rail into 280–360dp expanded drawer on large screens (≥1200dp) for dense enterprise menus.

### 3.2 Vertical Toolbars & Utility Rails
* **Editing Toolbars**: Docked along the leading or trailing perimeter of content panes in rich text, graphic, or code editors.
* **Floating Action Buttons (FABs)**: Anchored at bottom-right or docked inside leading rails; put key actions within thumb reach. Unavailable actions must hide completely rather than display disabled.

### 3.3 Spatial XR Orbiters
* In Extended Reality (XR) or spatial computing, physical edge rails transform into floating, detached **Orbiters** hovering adjacent to 3D content panels.

---

## 4. Panes Architecture

Panes are the modular building blocks containing the product's primary information and interactive workflows:

### 4.1 Pane Adaptation by Breakpoint
* **Compact (<600dp)**: Single pane view. Navigation between master and child views pushes stacked routes with top app bar back navigation.
* **Medium (600–839dp)**: Single pane (high density) or 2 panes with split sheet / bottom sheet.
* **Expanded (840–1199dp)**: Co-planar 2-pane view (e.g. List-Detail or Primary + Supporting Tool).
* **Large & Extra-Large (≥1200dp)**: 2–3 co-planar panes with persistent rails and centered maximum content widths (40–60 characters per line).

### 4.2 Spatial Pane Relationships
* **Co-Planar**: Panes sitting side by side on the same z-plane with 1px keyline separation (`#CAD3F5`).
* **Docked**: Panes anchored to a viewport edge extending inward (side sheets, bottom sheets).
* **Floating**: Panes elevated above canvas with modal scrims (centered dialogs, modal menus).

### 4.3 Grouping Paradigms
* **Implicit Grouping**: Content visually belongs together purely through proximity and shared whitespace (8dp/16dp grid).
* **Explicit Grouping**: Content bounded by distinct surface containers, 1px keylines, or subtle background micro-tints (`#EFF5FF`).

---

## 5. System Safety Regions & Edge-to-Edge Insets

Modern devices feature hardware and software edge intrusions:
* **Display Cutouts & Notches**: Top or side camera cutouts require minimum 24–48dp insets.
* **System Gesture Bars**: Bottom home indicator requires 16–32dp bottom padding to prevent accidental touch trigger.
* **Hardware Hinges**: Foldable devices require splitting panes across the physical hinge without severing text.
* **Implementation Invariant**: Use CSS `env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`, or Jetpack Compose `WindowInsets.safeDrawing`.

---

## 6. Jetpack Compose Rulers & Spacing Tokens

Rulers establish global alignment lines coordinating elements across disparate panes:

### 6.1 Standard Rulers
* **Margin Ruler**: Enforces consistent leading/trailing canvas padding (16dp on mobile, 24dp on tablet, 32dp+ on desktop).
* **Title Baseline Ruler**: Aligns page titles across top app bars and neighboring panes.
* **Split Anchor Ruler**: Defines the vertical divider coordinate separating master and detail panes.

### 6.2 Material 3 Spacing Scale Tokens
* `md.sys.spacing.0`: 0dp (No space)
* `md.sys.spacing.1`: 4dp (Micro alignment, icon-to-label gaps)
* `md.sys.spacing.2`: 8dp (Standard component internal padding)
* `md.sys.spacing.3`: 12dp (Subtle group separation)
* `md.sys.spacing.4`: 16dp (Standard card padding, mobile margin)
* `md.sys.spacing.5`: 24dp (Section spacing, tablet margin)
* `md.sys.spacing.6`: 32dp (Desktop canvas margin)
* `md.sys.spacing.7`: 40dp (Large pane separation)
* `md.sys.spacing.8`: 48dp (Primary touch target minimum dimension)
* `md.sys.spacing.9`: 56dp (Top app bar standard height)
* `md.sys.spacing.10`: 64dp (Extended header offset)

---

## 7. Scaffold Invariants Matrix

| Element | Structural Purpose | Mobile Ergonomics (<600dp) | Desktop Ergonomics (≥840dp) | Architectural Invariant |
| :--- | :--- | :--- | :--- | :--- |
| **Top Bar** | Title, context, global actions | 56–64dp center/small | 64dp left-aligned + search | Persistent context; back button in 1-pane |
| **Bottom Bar** | Primary destinations & actions | 80dp bottom navigation | Collapsed / hidden | Swaps to vertical rail on desktop |
| **Leading Rail** | Persistent vertical navigation | Hidden (uses bottom nav) | 80dp rail / 280dp drawer | Roving tabindex; active indicator segment |
| **Trailing Rail** | Auxiliary tools & actions | Docked bottom sheet | 360dp supporting rail | Only present when tied to primary pane |
| **Panes** | Core content & data views | 1 pane full screen | 2–3 co-planar panes | Reflows; reading order follows DOM |
| **Safety Insets**| Prevents hardware clipping | 24–48dp notch/gesture | Standard window borders | Zero text/button overlap with cutouts |

---

## 8. The 6-Stage Design System Progression Hierarchy

Material 3 Layout Scaffold operates as Level 4 (Templates) within the 6-stage architectural hierarchy:

```
[Level 1: Ingredients] Tokens & Atoms (Color, Typography, Spacing, Elevation, Motion)
       |
[Level 2: Recipes]     UI Primitives (Buttons, Inputs, Badges, Chips, Switches)
       |
[Level 3: Entrees]     Composite Components (Top App Bars, Navigation Rails, Cards, Modals)
       |
[Level 4: Templates]   LAYOUT SCAFFOLD (Bars + Rails + Fluid Multi-Panes + Safety Insets)
       |
[Level 5: Pages]       Feature Screens (Dashboard, Student Roster, Gradebook, Settings)
       |
[Level 6: Cookbook]    Design System Governance (Guidelines, Semver Cadence, Contribution)
```

### Architectural Principles:
1. **Never skip layers**: Pages must always be constructed by assembling Entrees inside a Level 4 Layout Scaffold.
2. **Scaffold decoupling**: Layout Scaffold manages viewports, panes, and rails; it never dictates the domain business logic of content panes.
3. **Standby readiness**: Every future screen (portal, sub-dashboard, inspection view) must inherit this scaffold model.

---

## 9. 5-Breakpoint Adaptive Layout Matrix

| Breakpoint Tier | Width Range | Viewport Target | Columns | Margin | Gutter | Primary Layout Structure |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Compact** | `<600dp` | Mobile Handheld | 4 | 16dp | 16dp | 1-Pane Fullscreen + 80dp Bottom Nav + 56dp Top Bar |
| **Medium** | `600–839dp` | Tablet / Foldable | 8 | 24dp | 24dp | 1-Pane (dense) or Split Sheet + 80dp Collapsed Vertical Rail |
| **Expanded** | `840–1199dp` | Small Desktop / Tablet Landscape | 12 | 24dp | 24dp | 2-Pane Co-Planar (List-Detail) + 80dp Navigation Rail |
| **Large** | `1200–1599dp` | Desktop / Monitor | 12 | 32dp | 24dp | 2-3 Panes Co-Planar + 280dp Expanded Navigation Drawer |
| **Extra-Large** | `≥1600dp` | Ultra-Wide / Workstation | 12 | 32dp+ | 32dp | 3 Panes Co-Planar + Max 800px Centered Content Containers |

---

## 10. Production Scaffold Architecture Code Pattern (React 19 / Tailwind CSS)

Use this canonical scaffold pattern whenever designing new platform screens:

```tsx
export function PlatformScaffold({
  topBar,
  navigationRail,
  primaryPane,
  supportingPane,
}: {
  topBar?: React.ReactNode;
  navigationRail?: React.ReactNode;
  primaryPane: React.ReactNode;
  supportingPane?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FFFFFF] text-[#0A1A4A]">
      {/* System Top Safety Region */}
      <div className="h-[env(safe-area-inset-top,0px)] bg-white" />

      {/* Top App Bar Region */}
      {topBar && (
        <header className="sticky top-0 z-20 h-14 border-b border-[#CAD3F5] bg-white/95 px-4 backdrop-blur-md sm:h-16 sm:px-6">
          {topBar}
        </header>
      )}

      {/* Main Structural Frame: Rails + Panes */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Rail (Hidden on Compact, 80dp on Medium/Expanded, 280dp on Large) */}
        {navigationRail && (
          <aside className="hidden border-r border-[#CAD3F5] bg-[#FFFFFF] md:block md:w-20 lg:w-72 shrink-0">
            {navigationRail}
          </aside>
        )}

        {/* Panes Container */}
        <main className="flex flex-1 min-w-0 overflow-y-auto">
          {/* Primary Content Pane */}
          <section className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
            {primaryPane}
          </section>

          {/* Supporting Pane (Shown on Expanded & Large screens) */}
          {supportingPane && (
            <aside className="hidden w-80 border-l border-[#CAD3F5] bg-[#EFF5FF]/40 p-4 xl:block shrink-0">
              {supportingPane}
            </aside>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation (Shown only on Compact <md) */}
      <nav className="sticky bottom-0 z-20 h-16 border-t border-[#CAD3F5] bg-white md:hidden">
        {/* Mobile destinations */}
      </nav>

      {/* System Bottom Safety Region */}
      <div className="h-[env(safe-area-inset-bottom,0px)] bg-white" />
    </div>
  );
}
```
