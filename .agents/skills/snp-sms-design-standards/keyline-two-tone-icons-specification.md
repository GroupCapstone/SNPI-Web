# Keyline Two-Tone Icons Specification & Motionless Stability Standard

**Category**: SNP-SMS Design Standards  
**Scope**: All UI components, document menus, blueprint galleries, and dashboard icons  
**Enforcement**: Centralized Icon Wrapper (`components/icons/index.tsx`) & Global CSS Engine (`app/globals.css`)  

---

## 1. Specification Overview

The Keyline Two-Tone Icon style delivers a crisp, consistent visual language across all platforms in SNP-SMS. All icons are rendered via the centralized icon registry in `components/icons/index.tsx` backed by `@keyline-icons/react/two-tone`.

### Canonical SVG Representation
```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="24"
  height="24"
  aria-hidden="true"
  focusable="false"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="keyline-two-tone-icon inline-block shrink-0 bg-transparent size-6 text-[#020617] dark:text-white"
  style="background-color: transparent;"
>
  <!-- Two-tone accent path with 40% fill opacity -->
  <path d="..." fill="currentColor" fill-opacity="0.4" stroke="none" />
  <!-- Primary outlined keyline path -->
  <path d="..." />
</svg>
```

---

## 2. Invariant Design Rules

1. **Stroke Standard**: All primary vector lines must adhere to `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`.
2. **Two-Tone Fill Standard**: The secondary accent layer uses `fill="currentColor" fill-opacity="0.4" stroke="none"`. Never overwrite or strip this fill. It creates the signature two-tone depth.
3. **Zero Arbitrary Color on Icons**: Icons must NEVER use random colored strokes or fills (no arbitrary yellow, purple, orange, or green icon lines).
4. **Universal Default Black / Dark Fill Rule**:
   - **Universal Default Black / Dark**: ALL icons across every component, card, button, header, and screen strictly default to **Black or Dark Obsidian** (`#020617` / `text-[#020617]` / `text-slate-950`) fill and stroke. The two-tone accent path produces a crisp 40% black accent layer (`fill-opacity="0.4"`).
   - **Zero Unprompted Colored Inversion**: Never force icons into green (`#10B981`) or other hues across general cards or containers. Colors are strictly reserved for explicit semantic statuses (e.g. positive success badge, error alert, active tab pill) when explicitly designated.
   - **In Blue Surfaces** (Solid Royal Blue `#0056FF`, Primary-500, blue buttons, active blue highlights): Icon color MUST be **Pure White** (`#FFFFFF` / `text-white`) with 40% white fill opacity for optimal WCAG AAA contrast. Never use dark black icons on dark blue surfaces.
   - **On Dark Obsidian Canvas** (Obsidian Slate `#020617`, Slate-900 `#0F172A`, Dark mode canvas): Icon color is **Pure White** (`#FFFFFF` / `text-white`).
5. **Icon Size Proportionality to Title**:
   - Icon sizes must match or scale proportionally to their adjacent text title (1:1 visual ratio). Avoid oversized icons (e.g. `size-4` / 16px for `text-xs`/`text-sm` titles, `size-4.5` / 18px for `text-base`, `size-5` / 20px for `text-lg`/`text-xl`).
6. **Prohibition of Icons on Normal Text or Descriptions (ABSOLUTE RULE)**:
   - **NEVER use icons with normal text or paragraph descriptions**.
   - Icons are strictly reserved for titles, section headers, actions, buttons, and card/block feature indicators. Never prefix or embed icons inside `<p>` paragraphs or descriptive body copy.
7. **Single-Color Container Background (Zero Multi-Color Shapes Behind Icons)**:
   - Do NOT add shapes or multiple colors behind the background of icons.
   - Made strictly of a **single color only**: clean white (`bg-white`) or transparent with subtle 1px border (`border-slate-200/90`), keeping the icon container sleek, flat, and unobtrusive.
8. **Universal 4px Border Radius Consistency (`rounded-[4px]`)**:
   - ALL icon containers, background tiles, and borders behind icons strictly enforce **4px corner radius** (`rounded-[4px]`, `borderRadius: '4px'`, `style={{ borderRadius: '4px' }}`).
   - Replaces all legacy 2px radii. Full consistency across all Component, API, Blueprint, and Navigation views.
9. **Menu List & Sidebar Tap-to-Drop Standard (Zero Auto-Drop)**:
   - Sidebar lists and navigation menus must NEVER auto-drop or auto-expand on load or hover.
   - Lists must remain collapsed by default until the user explicitly selects or taps to drop down the submenu list.
10. **Motionless & Hover Stability (ABSOLUTE MANDATE)**:
    - **Zero Hover Movement**: Icons must NEVER scale (`hover:scale-*`, `group-hover:scale-*`), translate (`hover:translate-*`, `group-hover:translate-*`), rotate (`hover:rotate-*`), or shake on hover.
    - **Zero Animation Events**: Icons must NEVER spin (`animate-spin`), bounce (`animate-bounce`), or pulse (`animate-pulse`) unless explicitly requested as a temporary skeleton loader.
    - **Engine Guardrail**: `.keyline-two-tone-icon` strictly enforces `transform: none !important; transition: none !important; animation: none !important;` globally.

---

## 3. Surface Color Placement Matrix

| Surface / Placement | Background Token | Icon Color | Accent Layer (40% Opacity) | Container Border | Radius |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **With Text Title / Heading** | `#FFFFFF` (White) / `#F8FAFC` (Neutral-50) | **Black** (`#020617` / `text-slate-950`) | `rgba(2, 6, 23, 0.4)` | `#E2E8F0` / `#CAD3F5` | `rounded-[4px]` |
| **Within Cards, Blocks & Shapes** | `#FFFFFF` (White) / `#EFF5FF` (Ice Tint) | **Emerald Green** (`#10B981`) | `rgba(16, 185, 129, 0.4)` | `#CAD3F5` / `#E2E8F0` | `rounded-[4px]` |
| **In the Blue Surfaces** | `#0056FF` (Royal Blue) / `bg-primary-500` | **White** (`#FFFFFF` / `text-white`) | `rgba(255, 255, 255, 0.4)` | `#0048D9` / Transparent | `rounded-[4px]` |
| **Dark Obsidian Canvas** | `#020617` (Obsidian Slate) / Dark Mode | **White** (`#FFFFFF` / `text-white`) | `rgba(255, 255, 255, 0.4)` | `rgba(255, 255, 255, 0.15)` | `rounded-[4px]` |
| **Solid Status Fill** | Solid Red, Green, or Amber | **White** (`#FFFFFF` / `text-white`) | `rgba(255, 255, 255, 0.4)` | Transparent | `rounded-[4px]` |

---

## 4. Mandatory Zero-Border & Borderless Icon Presentation Standard

To guarantee a clean, modern, and uncluttered interface across all Component, API, and Blueprint pages:

- **Strict Zero-Border Enforcement**: Under no circumstances should icons be enclosed in bordered boxes, bordered squares, bordered chips, or bordered squircle wrappers (`border border-slate-200`, `border-[#CAD3F5]`, `border`).
- **Borderless Presentation**: All sidebar navigation trees, section headers, menus, dropdowns, and cards render icons directly and borderlessly alongside titles and labels.
- **Icon Sizing & Proportionality**:
  - **Sidebar Nav Items**: `size-4.5` (18x18px) `stroke-[2] text-[#020617]`.
  - **Section Headers**: `size-6` (24x24px) `stroke-[2] text-[#020617]`.
  - **Option Items & Small Labels**: `size-4` (16x16px) `stroke-[2] text-[#020617]`.
- **Motionless Stability**: Zero animations, zero hover jumps, zero scaling. Icons remain 100% stationary.
