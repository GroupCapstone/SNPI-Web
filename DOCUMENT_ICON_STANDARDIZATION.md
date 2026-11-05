# Keyline Two-Tone Standardized Icon Style Specification

**Date**: November 6, 2026  
**Scope**: All icon components across Page, Document, API, Blueprint, and Navigation views

---

## 1. Overview

The SNPI application enforces a unified, standardized **Keyline Two-Tone Icon Style** across all UI components, documentation hubs, blueprint galleries, and navigation panels. All icons originate from the centralized icon registry in [`components/icons/index.tsx`](file:///Users/Apple16/Desktop/SNPI/SNPI-Web/components/icons/index.tsx), backed by `@keyline-icons/react/two-tone`.

---

## 2. Design Tokens & Visual Specifications

| Property | Standard Value | Implementation |
|---|---|---|
| **Color** | `text-slate-600` (`#475569`) | Default stroke and fill color. Callers may pass explicit utility classes (e.g. `text-white`, `text-[#0056FF]`, `text-emerald-600`) to match situational requirements. |
| **Dark Mode Color** | `text-slate-400` (`#94A3B8`) | Automatically preserved in dark mode when no explicit `text-*` override is supplied. |
| **Two-Tone Accent Layer** | `fill="currentColor" fill-opacity="0.4" stroke="none"` | Signature 40% opacity accent fill on secondary shape paths; eliminates solid opaque block fills. |
| **Primary Outline Stroke** | `stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"` | Crisp 2px outlined keyline stroke across primary vector paths. |
| **Size** | `size-6` (24x24 px) | Default size across all pages (`width={24} height={24}`, `size-6`). Component overrides (e.g. `size-3.5`, `size-4`, `size-5`) seamlessly supported via `cn()`. |
| **Background** | `100% Transparent` | Strictly transparent (`bg-transparent`, `background-color: transparent !important;`). Zero background fills, zero drop shadows, zero border radius, zero backdrop blur. |
| **Accessibility** | `aria-hidden="true" focusable="false"` | Standardized screen-reader and tab-navigation attributes on every vector element. |
| **Motionless Stability** | Zero Animations & Zero Hover Movement | Strictly stationary. Zero `hover:scale-*`, zero `hover:translate-*`, zero `hover:rotate-*`, zero `animate-spin`, and zero bounce. Icons remain 100% stable during user interactions. |

---

## 3. Architecture & Implementation

### A. Centralized Wrapper (`components/icons/index.tsx`)

Every icon primitive is wrapped by a lightweight Higher-Order Component (HOC) guaranteeing consistent classes, default sizing, and accessibility:

```tsx
function wrapIcon(Component: React.ComponentType<IconProps>, name: string): IconComponent {
  const IconWrapper = React.forwardRef<SVGSVGElement, IconProps>(function KeylineTwoToneIcon(
    { className, style, size = 24, ...props },
    ref,
  ) {
    const combinedClassName = cn(
      'keyline-two-tone-icon inline-block shrink-0 bg-transparent size-6 text-slate-600',
      className,
    );

    return (
      <Component
        ref={ref}
        aria-hidden="true"
        focusable="false"
        width={size}
        height={size}
        className={combinedClassName}
        style={{ backgroundColor: 'transparent', ...style }}
        {...props}
      />
    );
  });
  IconWrapper.displayName = name;
  return IconWrapper;
}
```

### B. Global CSS Engine Rules (`app/globals.css`)

```css
/* Keyline Two-Tone Icons - Standardized Icon Style Specification */
svg[class*='keyline'],
.keyline-two-tone-icon,
svg:where([data-slot='icon'], [class*='size-'], [class*='h-'][class*='w-']) {
  background-color: transparent !important;
  background-image: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-radius: 0 !important;
}

.keyline-two-tone-icon {
  background-color: transparent !important;
  fill: none;
  stroke: currentColor;
  transition: none !important;
  transform: none !important;
  animation: none !important;
}

/* Keyline Two-Tone: Preserve the 40% opacity accent fill path */
.keyline-two-tone-icon path[fill-opacity],
.keyline-two-tone-icon path[stroke='none'] {
  fill: currentColor !important;
  fill-opacity: 0.4 !important;
  stroke: none !important;
}

/* Primary outline stroke path */
.keyline-two-tone-icon path:not([stroke='none']):not([fill-opacity]) {
  fill: none !important;
  stroke: currentColor !important;
  stroke-width: 2 !important;
  stroke-linecap: round !important;
  stroke-linejoin: round !important;
}

/* Absolute Motionless & Hover Stability: Never move, bounce, scale, or translate icons */
.keyline-two-tone-icon,
.keyline-two-tone-icon *,
*:hover > .keyline-two-tone-icon,
*:hover .keyline-two-tone-icon,
.keyline-two-tone-icon:hover {
  transform: none !important;
  transition: none !important;
  animation: none !important;
}

/* Dark mode contrast preservation */
.dark .keyline-two-tone-icon:not([class*='text-']) {
  color: #94a3b8;
}
```

---

## 4. Official Web Logo, Dark Mode Obsidian Slate (#020617) & Brand Media Kit Suite

In alignment with the motionless icon and brand color policy:

- **Dark Mode Background**: Strictly standardized to Obsidian Slate (`#020617`) for all dark mode brand logo representations, replacing legacy navy values.
- **Export Formats & File Size**:
  - Pure vector SVG export (`downloadOriginalLogo()`)
  - High-resolution raster PNG export (`downloadLogoPng()`), generated via client-side canvas rasterization, strictly below 20MB (lossless 1024x1024, ~60KB to 250KB each).
- **Comprehensive Brand Media Kit (.ZIP)**:
  - Single-click packaging via `downloadBrandMediaKitZip()` delivering all 11 production assets:
    1. `01-snpi-logo-light-1024.png` (White canvas, Royal Blue asterisk)
    2. `02-snpi-logo-dark-1024.png` (Obsidian Slate `#020617`, White asterisk)
    3. `03-snpi-logo-royal-1024.png` (Royal Blue `#0056FF`, White asterisk)
    4. `04-snpi-logo-transparent-1024.png` (Transparent background)
    5. `05-snpi-avatar-circle-512.png` (Social profile circular avatar, Royal Blue)
    6. `06-snpi-avatar-dark-circle-512.png` (Social profile circular avatar, Obsidian Slate `#020617`)
    7. `07-snpi-avatar-squircle-512.png` (App squircle avatar, 512px)
    8. `08-snpi-web-favicon-192.png` (Web favicon standard)
    9. `09-snpi-web-app-icon-512.png` (PWA web app manifest standard)
    10. `10-snpi-brand-logo.svg` (Pure vector SVG)
    11. `README-BRAND-STANDARDS.txt` (Textual specs & guidelines)
- **UI Components**:
  - `<SaveLogoButton variant="light"|"dark"|"royal" />`: Single-click instant PNG download.
  - `<BrandMediaKitDownloadSuite />`: Complete action group featuring "Download Media Kit (.ZIP)", "Save PNG (1024px)", and "Save SVG".

---

## 5. Standardized Compact Squircle Icon Containers

For sidebar navigation rows, menus, and section headers, icon containers follow refined compact metrics to avoid bulky visual footprint:

| Context | Container Dimensions | Border Radius | Icon Sizing | Visual Style |
|---|---|---|---|---|
| **Sidebar Navigation Groups** | `size-8` (32x32px) | `rounded-lg` (8px) | `size-4` (16x16px), `stroke-[2]` | `border-slate-200/90 bg-white shadow-2xs` |
| **Dropdown / Navigation Panels** | `size-8` (32x32px) | `rounded-lg` (8px) | `size-4` (16x16px), `stroke-[2]` | `border-slate-200/90 bg-white shadow-2xs` |
| **Documentation Section Headers** | `size-9.5` (38x38px) | `rounded-xl` (12px) | `size-5` (20x20px), `stroke-[2]` | `border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF] shadow-2xs` |

