# Keyline Two-Tone Standardized Icon Style Specification

**Category**: SNP-SMS Design Standards  
**Scope**: All icon components across Page, Document, API, Blueprint, and Navigation views  

---

## 1. Overview

The SNPI application enforces a unified, standardized **Keyline Two-Tone Icon Style** across all UI components, documentation hubs, blueprint galleries, and navigation panels. All icons originate from the centralized icon registry in [`components/icons/index.tsx`](file:///Users/Apple16/Desktop/SNPI/SNPI-Web/components/icons/index.tsx), backed by `@keyline-icons/react/two-tone`.

---

## 2. Design Tokens & Visual Specifications

| Property | Standard Value | Implementation |
|---|---|---|
| **Default Color** | `text-[#020617]` (`#020617` / `text-slate-950`) | Default stroke and fill color across all standard light surfaces. Black keyline stroke and 40% black accent layer. |
| **In the Blue Color** | `text-white` (`#FFFFFF`) | In solid blue surfaces (e.g. `#0056FF`, primary buttons, active blue highlights), icons MUST be pure white with 40% white fill accent. |
| **Dark Mode Color** | `text-white` (`#FFFFFF` / `text-slate-100`) | Automatically preserved in dark themes and obsidian backgrounds (`#020617`). |
| **Two-Tone Accent Layer** | `fill="currentColor" fill-opacity="0.4" stroke="none"` | Signature 40% opacity accent fill on secondary shape paths; eliminates solid opaque block fills. |
| **Primary Outline Stroke** | `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"` | Crisp 2px outlined keyline stroke across primary vector paths. |
| **Container Border Radius** | `rounded-[4px]` (`border-radius: 4px`) | Every background container or tile behind an icon strictly enforces 4px corner radius. Replaces legacy 2px radii. |
| **Container Background** | Clean Neutral / Ramp-Derived | Zero arbitrary candy colors. Containers strictly derive from the 11-step Color Ramps (Neutral 50-950, Brand 50-950). |
| **Size** | `size-6` (24x24 px) | Default size across all pages (`width={24} height={24}`, `size-6`). Component overrides (e.g. `size-3.5`, `size-4`, `size-5`) seamlessly supported via `cn()`. |
| **Background Surface** | `100% Transparent` | The icon SVG itself maintains `bg-transparent`, `background-color: transparent !important;`. Zero dropped blur shadows. |
| **Accessibility** | `aria-hidden="true" focusable="false"` | Standardized screen-reader and tab-navigation attributes on every vector element. |
| **Motionless Stability** | Zero Animations & Zero Hover Movement | Strictly stationary. Zero `hover:scale-*`, zero `hover:translate-*`, zero `hover:rotate-*`, zero `animate-spin`, and zero bounce. Icons remain 100% stable during user interactions. |

---

## 3. Surface Color Placement Matrix

1. **On Light / Neutral Canvas** (`#FFFFFF`, `#F8FAFC`, `#EFF5FF`):
   - Icon: **Black** (`#020617` / `text-slate-950`).
   - Container: `border-slate-200/90 bg-white rounded-[4px]`.
2. **In the Blue Canvas** (`#0056FF`, `bg-primary-500`, blue CTAs):
   - Icon: **Pure White** (`#FFFFFF` / `text-white`).
   - Accent Layer: `rgba(255, 255, 255, 0.4)`.
3. **On Dark Obsidian Canvas** (`#020617`, Slate-900 `#0F172A`):
   - Icon: **Pure White** (`#FFFFFF` / `text-white`).
   - Container: `border-white/15 bg-white/5 rounded-[4px]`.

---

## 4. Standardized Corner 4px Containers

For sidebar navigation rows, menus, and section headers across Component, API, and Blueprint views, icon containers follow standardized metrics strictly enforcing **corner 4px radius only** (`rounded-[4px]`, `borderRadius: '4px'`):

| Surface Context | Container Size | Corner Radius | Vector Icon Size | Palette Standard |
|---|---|---|---|---|
| **Sidebar Navigation Groups** | `size-8` (32x32px) | `rounded-[4px]` (4px) | `size-4` (16x16px), `stroke-[2]` | `border-slate-200/90 bg-white text-[#020617] shadow-2xs` |
| **Documentation Section Headers** | `size-9.5` (38x38px) | `rounded-[4px]` (4px) | `size-5` (20x20px), `stroke-[2]` | `border-slate-200/90 bg-white text-[#020617] shadow-2xs` |
| **Active / Blue Navigation Items** | `size-8` (32x32px) | `rounded-[4px]` (4px) | `size-4` (16x16px), `stroke-[2]` | `border-[#0056FF] bg-[#0056FF] text-white shadow-xs` |
| **Tier / Security Badges** | `size-7` (28x28px) | `rounded-[4px]` (4px) | `size-4` (16x16px), `stroke-[2]` | `border-slate-200 bg-slate-50 text-[#020617]` |
