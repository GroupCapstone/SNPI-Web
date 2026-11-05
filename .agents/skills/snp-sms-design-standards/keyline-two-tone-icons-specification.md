# Keyline Two-Tone Icons Specification & Motionless Stability Standard

**Category**: SNP-SMS Design Standards  
**Scope**: All UI components, document menus, blueprint galleries, and dashboard icons  
**Enforcement**: Centralized Icon Wrapper & Global CSS Engine Rules  

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
  class="keyline-two-tone-icon inline-block shrink-0 bg-transparent size-6 text-slate-600"
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
2. **Two-Tone Fill Standard**: The secondary background accent layer uses `fill="currentColor" fill-opacity="0.4" stroke="none"`. Never overwrite or strip this fill.
3. **Transparent Canvas**: Icons maintain `background-color: transparent !important;`, `box-shadow: none !important;`, and `backdrop-filter: none !important;`.
4. **Universal Default Size**: The standard icon size across all document and navigation pages is `size-6` (`24x24 px`). Contextual overrides (`size-3.5`, `size-4`, `size-5`, `size-8`) are passed cleanly via utility classes merged via `cn()`.
5. **Default Color Tone**: `text-slate-600` (`#475569`) on light surfaces, gracefully adapting to `text-slate-400` (`#94A3B8`) in dark themes. Explicit color classes (`text-[#0056FF]`, `text-white`, `text-emerald-600`) override default palette when semantically required.
6. **Motionless & Hover Stability (ABSOLUTE MANDATE)**:
   - **Zero Hover Movement**: Icons must NEVER scale (`hover:scale-*`, `group-hover:scale-*`), translate (`hover:translate-*`, `group-hover:translate-*`), rotate (`hover:rotate-*`), or shake on hover.
   - **Zero Animation Events**: Icons must NEVER spin (`animate-spin`), bounce (`animate-bounce`), or pulse (`animate-pulse`) unless explicitly requested as a temporary skeleton loader.
   - **Engine Guardrail**: `.keyline-two-tone-icon` strictly enforces `transform: none !important; transition: none !important; animation: none !important;` globally.

---

## 3. Web Logo Standalone Export, Obsidian Slate (#020617) & Brand Media Kit Standard

The official SNPI brand logo offers a dedicated export suite and strict color definitions:
- **Dark Mode Background**: Strictly `#020617` (Obsidian Slate) for all dark mode brand logo representations.
- **Save PNG (<20MB)**: Pure client-side Canvas rasterization to lossless 1024x1024 PNG (~60KB - 250KB each, strictly under 20MB limit).
- **Save SVG**: Original vector mark download via `downloadOriginalLogo()`.
- **Download Media Kit (.ZIP)**: Complete production bundle (`downloadBrandMediaKitZip()`) delivering all 11 assets:
  - 1024x1024 PNGs (Light, Dark `#020617`, Royal, Transparent)
  - 512x512 Profile Avatars (Circle Royal, Circle Dark `#020617`, Squircle)
  - Web Favicons (192px, 512px)
  - Scalable Vector SVG
  - `README-BRAND-STANDARDS.txt`

---

## 4. Compact Squircle Icon Containers

To ensure sleek, uncrowded sidebar menus and headers, squircle containers behind icons follow standardized compact metrics:
- **Sidebar Nav Groups & Mega Menus**: `size-8` (32x32px), `rounded-lg` (8px radius), with `size-4` (16x16px) icon `stroke-[2]`, `gap-2.5`.
- **Documentation Section Headers**: `size-9.5` (38x38px), `rounded-xl` (12px radius), with `size-5` (20x20px) icon `stroke-[2]`, `border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF]`.

