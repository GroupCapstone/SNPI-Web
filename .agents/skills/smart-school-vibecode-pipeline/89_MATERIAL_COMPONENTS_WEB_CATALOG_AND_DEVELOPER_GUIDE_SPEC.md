# Material Components Web (MDC Web & Material Web M3) Catalog & Developer Guide Specification
## Authoritative Architecture for Component Showcases, ESM Ingress, Slot Anatomy & Developer Tooling

### Executive Overview & Strategic Synthesis

This specification establishes the authoritative, production-grade architectural guide for the **Material Components Web Catalog and Developer Tooling System**, synthesized directly from Google's official design system repositories:
1. **Material Components Web Catalog (`material-components.github.io/material-components-web-catalog`)**: The interactive demonstration environment showcasing component variants, dense/disabled states, layout grids, elevation stacking, and live configurator controls.
2. **Material Web M3 Core (`material-components/material-web`)**: The modern, standards-based Web Components library built on Lit, custom elements, Shadow DOM, and CSS custom property token bindings.
3. **Material Web Quick Start Guide (`material-web/docs/quick-start.md`)**: The official developer onboarding protocols encompassing zero-build CDN import maps, modern production bundler setups (Rollup, Vite, Webpack), and adopted style sheet token hydration.

In accordance with the principle of "stealing concept ideas like an artist", this specification extracts the core design mechanics, component hierarchy, slot projection patterns, form-associated custom element standards, and event telemetry from Google's design system and seamlessly incorporates them into the Smart School Enterprise Platform.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   MATERIAL WEB ARCHITECTURE: DUAL IMPLEMENTATION MATRIX                          │
├─────────────────────────┬──────────────────────────────────┬─────────────────────────────────────┤
│ Architectural Dimension │ Legacy MDC Web (Catalog Core)    │ Modern Material Web (M3 Lit)        │
├─────────────────────────┼──────────────────────────────────┼─────────────────────────────────────┤
│ Technology Stack        │ Vanilla JS + Sass (BEM Classes)  │ Lit Web Components + Shadow DOM     │
│ Element Declaration     │ `<button class="mdc-button">`    │ `<md-filled-button>`                │
│ State Management        │ Foundation / Adapter Classes     │ Lit Reactive Properties (`@property`)│
│ Style Encapsulation     │ Global CSS specificity           │ Shadow Root + Adopted Style Sheets  │
│ Token Binding           │ Sass Mixins (`@include theme`)   │ CSS Custom Properties (`var(--md)`) │
│ Form Participation      │ Synthetic hidden input wrapper   │ Native `ElementInternals` API       │
│ Distribution Model      │ UMD / CommonJS / SCSS source     │ Pure ESM (`@material/web/*.js`)     │
└─────────────────────────┴──────────────────────────────────┴─────────────────────────────────────┘
```

---

## 1. Interactive Component Catalog Architecture

### 1.1 Catalog Hierarchy & Responsive Showcase Grid
The Material Components Web Catalog establishes a structured showcase hierarchy designed for rapid visual exploration, accessibility verification, and interactive prototyping:

- **Top App Bar / Navigation Header**: Displays platform brand identity, active category breadcrumb, theme mode switcher (Light, Dark, High Contrast), and repository/documentation hyperlinks.
- **Component Navigation Drawer / Sidebar Rail**: Categorized index of all available UI primitives:
  - *Action*: Buttons (Filled, Outlined, Text, Elevated, Tonal), Floating Action Buttons (FAB, Extended FAB), Icon Buttons.
  - *Selection*: Checkboxes, Radio Buttons, Switches, Sliders (Continuous, Discrete, Range).
  - *Communication*: Badges, Progress Indicators (Linear, Circular), Snackbars.
  - *Containment*: Cards (Elevated, Outlined, Filled), Dialogs (Alert, Confirm, Fullscreen), Dividers, Lists (Single-line, Two-line, Three-line).
  - *Navigation*: Navigation Bar, Navigation Drawer, Navigation Rail, Tabs (Primary, Secondary).
  - *Text Inputs*: Text Fields (Filled, Outlined, Multiline Text Area), Select (Filled, Outlined).
- **Responsive 12-Column Grid Layout**:
  - Desktop (>= 840dp): 12 columns, 24px margin, 24px gutter.
  - Tablet (600dp - 839dp): 8 columns, 16px margin, 16px gutter.
  - Mobile (< 600dp): 4 columns, 16px margin, 16px gutter.

### 1.2 Interactive Configurator Panel (Playground Matrix)
Every component in the catalog features a live playground control panel allowing developers to toggle runtime attributes and inspect DOM transformations:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             COMPONENT PLAYGROUND INSPECTOR STAGE                                 │
├────────────────────────────────────────────────┬─────────────────────────────────────────────────┤
│ LIVE PREVIEW STAGE                             │ INTERACTIVE CONFIGURATOR CONTROLS               │
│                                                │                                                 │
│   ┌────────────────────────────────────────┐   │ [x] Disabled State (`disabled`)                 │
│   │                                        │   │ [ ] Soft Tonal Style (`tonal`)                  │
│   │   [icon: add]   Admit New Student      │   │ [x] Leading Icon (`has-icon`)                   │
│   │                                        │   │ [ ] Trailing Icon (`trailing-icon`)             │
│   └────────────────────────────────────────┘   │ [ ] Dense Sizing (`dense` / compact)            │
│                                                │ Elevation Level: [Level 0 | Level 1 | Level 2]  │
├────────────────────────────────────────────────┴─────────────────────────────────────────────────┤
│ GENERATED CODE SNIPPET (HTML & ESM IMPORT)                                                       │
│ <md-filled-button has-icon><svg slot="icon">...</svg>Admit New Student</md-filled-button>         │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Developer Quick Start & Ingress Protocols

### 2.1 Zero-Build Browser Prototyping via ESM Import Maps
For rapid prototyping and educational sandboxes without a node compilation step, modern browsers natively resolve bare module specifiers through standard W3C `<script type="importmap">`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Material Web Prototyping Sandbox</title>

  <!-- Typography: Roboto & Google Material Symbols Outlined -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">

  <!-- Native Browser Import Map -->
  <script type="importmap">
    {
      "imports": {
        "@material/web/": "https://esm.run/@material/web/",
        "lit": "https://esm.run/lit"
      }
    }
  </script>

  <!-- Module Script Ingress & Adopted Style Sheet Token Hydration -->
  <script type="module">
    import '@material/web/all.js';
    import {styles as typescaleStyles} from '@material/web/typography/md-typescale-styles.js';

    // Hydrate typescale classes globally onto document root
    if (document.adoptedStyleSheets) {
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, typescaleStyles.styleSheet];
    }
  </script>

  <style>
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 32px;
      background-color: var(--md-sys-color-surface, #F8FAFC);
      color: var(--md-sys-color-on-surface, #0F172A);
    }
    .demo-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 480px;
    }
  </style>
</head>
<body>
  <h1 class="md-typescale-headline-medium">Smart School Admission Ingress</h1>

  <div class="demo-container">
    <md-outlined-text-field
      label="Student Full Name"
      supporting-text="Official legal name per birth certificate"
      required>
    </md-outlined-text-field>

    <md-outlined-select label="Target Academic Grade">
      <md-select-option value="grade-10" selectedHeadline="Grade 10">Grade 10</md-select-option>
      <md-select-option value="grade-11" selectedHeadline="Grade 11">Grade 11</md-select-option>
      <md-select-option value="grade-12" selectedHeadline="Grade 12">Grade 12</md-select-option>
    </md-outlined-select>

    <label style="display: flex; align-items: center; gap: 8px;">
      <md-checkbox checked></md-checkbox>
      <span class="md-typescale-body-medium">Agree to institutional policies</span>
    </label>

    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <md-text-button type="button">Cancel</md-text-button>
      <md-filled-button type="submit">Submit Registration</md-filled-button>
    </div>
  </div>
</body>
</html>
```

### 2.2 Modern Production Bundler Ingress (Rollup, Vite, Webpack)
In enterprise production applications, `@material/web` is installed via NPM and compiled through modern bundlers to ensure tree-shaking and sub-50kB output bundles:

```bash
# Production Package Installation
npm install @material/web lit
```

#### A. Rollup Configuration (`rollup.config.mjs`)
```javascript
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import summary from 'rollup-plugin-summary';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      // Ensures Lit and Material Web bare specifiers are correctly resolved from node_modules
      exportConditions: ['production'],
    }),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
    }),
    summary(),
  ],
};
```

#### B. Vite Modern ESM Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'material-core': ['@material/web/button/filled-button.js', '@material/web/textfield/outlined-text-field.js'],
          'material-dialog': ['@material/web/dialog/dialog.js'],
        },
      },
    },
  },
});
```

---

## 3. Comprehensive Component Slot Anatomy & Composition

Material Web components use standard Shadow DOM `<slot>` projections. This allows arbitrary markup, SVG icons, and typography to be projected into designated internal component compartments while maintaining encapsulation.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                         MATERIAL WEB COMPONENT SLOT ANATOMY MATRIX                               │
├─────────────────────────┬───────────────────────────────┬────────────────────────────────────────┤
│ Component Name          │ Available Slot Names          │ Functional Projection & Purpose        │
├─────────────────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ `<md-filled-button>`    │ `icon` (or leading icon)      │ Optical graphic prefixing label        │
│ `<md-outlined-button>`  │ `trailing-icon`               │ Contextual chevron or action arrow     │
│                         │ `(default)`                   │ Primary button text label content      │
├─────────────────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ `<md-filled-text-field>`│ `leading-icon`                │ Input category icon (e.g. search)      │
│ `<md-outlined-text-field>`│ `trailing-icon`             │ Clear button, eye toggle, status icon  │
│                         │ `prefix-text`                 │ Currency symbol (`$`, `៛`) or protocol  │
│                         │ `suffix-text`                 │ Unit suffix (`kg`, `m`, `hrs`)         │
├─────────────────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ `<md-dialog>`           │ `icon`                        │ Dialog header illustration or icon     │
│                         │ `headline`                    │ Primary modal title                    │
│                         │ `content`                     │ Main dialog body container             │
│                         │ `actions`                     │ Bottom button strip (Cancel, Confirm)  │
├─────────────────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ `<md-list-item>`        │ `start`                       │ Avatar, checkbox, radio, leading icon  │
│                         │ `headline`                    │ Primary list item title string         │
│                         │ `supporting-text`             │ Secondary subtitle or descriptive text │
│                         │ `end`                         │ Trailing metadata, badge, timestamp    │
│                         │ `trailing-supporting-text`    │ Trailing informational caption         │
├─────────────────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ `<md-primary-tab>`      │ `icon`                        │ Tab header graphical icon              │
│                         │ `(default)`                   │ Tab text title                         │
└─────────────────────────┴───────────────────────────────┴────────────────────────────────────────┘
```

### 3.1 Button Slot Composition Example
```html
<md-filled-button>
  <span slot="icon" class="material-symbols-outlined">person_add</span>
  Enroll Student
  <span slot="trailing-icon" class="material-symbols-outlined">arrow_forward</span>
</md-filled-button>
```

### 3.2 Form Text Field Slot Composition Example
```html
<md-outlined-text-field
  label="Monthly Tuition Fee"
  supporting-text="Enter standard fee before scholarship discount">
  <span slot="leading-icon" class="material-symbols-outlined">payments</span>
  <span slot="prefix-text">$</span>
  <span slot="suffix-text">USD</span>
</md-outlined-text-field>
```

### 3.3 Modal Dialog Slot Composition Example
```html
<md-dialog id="delete-record-dialog">
  <span slot="icon" class="material-symbols-outlined" style="color: var(--md-sys-color-error);">warning</span>
  <span slot="headline">Confirm Student Dismissal</span>
  <div slot="content">
    <p>Are you sure you want to officially archive the academic record for student ID #STU-9921? This operation will revoke portal credentials.</p>
  </div>
  <div slot="actions">
    <md-text-button value="cancel">Cancel</md-text-button>
    <md-filled-button value="confirm" style="--md-filled-button-container-color: var(--md-sys-color-error);">Confirm Revocation</md-filled-button>
  </div>
</md-dialog>
```

---

## 4. Form-Associated Custom Elements & Native HTML5 Form Interoperability

Modern Material Web components implement the standard W3C `ElementInternals` interface, allowing custom elements to seamlessly integrate with native HTML `<form>` submission, serialization, and validity checking without wrapper hidden inputs.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   NATIVE FORM INTEGRATION VIA ELEMENTINTERNALS API                               │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│   <form id="admission-form">                                                                     │
│     │                                                                                            │
│     ├── <md-outlined-text-field name="email" required> ──► ElementInternals.setFormValue()       │
│     │                                                 ──► ElementInternals.setValidity()         │
│     ├── <md-checkbox name="hostel" value="yes">       ──► Serialized in FormData on submit       │
│     │                                                                                            │
│     └── <md-filled-button type="submit">Submit</md-filled-button>                                │
│                                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Form Association Capabilities
1. **Form Value Synchronization**: Elements automatically update `FormData` entries during `form.submit()`.
2. **Form Reset Participation**: When `<button type="reset">` is clicked, custom elements restore their initial `defaultValue` or `defaultChecked` state.
3. **Constraint Validation API**:
   - `element.checkValidity()`: Returns boolean indicating compliance with validation rules.
   - `element.reportValidity()`: Triggers native validation tooltip and visual error state.
   - `element.setCustomValidity(message)`: Injects custom business logic validation errors.
   - `element.validity`: Returns standard `ValidityState` object (`valueMissing`, `typeMismatch`, `patternMismatch`, `rangeUnderflow`, etc.).

---

## 5. Event Lifecycle & Micro-State Management

Material Web components dispatch standard DOM events supplemented by specialized custom lifecycle events:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                     COMPONENT EVENT LIFECYCLE CHOREOGRAPHY                                       │
├─────────────────────────┬───────────────────┬────────────────────────────────────────────────────┤
│ Component Subsystem     │ Event Name        │ Trigger Conditions & Payload Data                  │
├─────────────────────────┼───────────────────┼────────────────────────────────────────────────────┤
│ Dialog (`<md-dialog>`)  │ `open`            │ Triggered immediately when dialog begins opening   │
│                         │ `opened`          │ Triggered after entrance transition completes      │
│                         │ `close`           │ Triggered immediately when closing starts          │
│                         │ `closed`          │ Triggered after exit animation finishes            │
├─────────────────────────┼───────────────────┼────────────────────────────────────────────────────┤
│ Menu (`<md-menu>`)      │ `opening`         │ Dispatched when anchor popover begins opening      │
│                         │ `opened`          │ Dispatched when menu items become focusable        │
│                         │ `closing`         │ Dispatched when dismiss animation commences        │
│                         │ `closed`          │ Dispatched when menu is fully hidden               │
├─────────────────────────┼───────────────────┼────────────────────────────────────────────────────┤
│ Selection Controls      │ `input`           │ Dispatched continuously during slider drag         │
│ (Checkbox, Radio,       │ `change`          │ Dispatched when user commits a state change        │
│ Switch, Slider, Select) │                   │ (e.g. checkbox toggled, select option picked)      │
├─────────────────────────┼───────────────────┼────────────────────────────────────────────────────┤
│ Tabs (`<md-tabs>`)      │ `change`          │ Dispatched when active tab index changes           │
└─────────────────────────┴───────────────────┴────────────────────────────────────────────────────┘
```

### 5.1 Programmatic Dialog Controller Example
```typescript
const dialog = document.querySelector<MdDialog>('#delete-record-dialog')!;

dialog.addEventListener('close', (event: Event) => {
  const returnVal = dialog.returnValue;
  if (returnVal === 'confirm') {
    executeStudentRevocation();
  } else {
    console.log('Revocation aborted by operator.');
  }
});

// Trigger opening
dialog.show();
```

---

## 6. Token Overrides & CSS Variable Customization Matrix

Material Web components expose granular CSS custom property hooks for direct, zero-runtime visual tuning without breaking Shadow DOM boundaries:

```css
/* Granular Scoped Overrides on an Outlined Text Field */
md-outlined-text-field.custom-academic-input {
  /* Shape Tokens */
  --md-outlined-text-field-container-shape: 12px;

  /* Color Tokens */
  --md-outlined-text-field-outline-color: #CBD5E1;
  --md-outlined-text-field-focus-outline-color: #2563EB;
  --md-outlined-text-field-label-text-color: #64748B;
  --md-outlined-text-field-focus-label-text-color: #2563EB;

  /* Typography Tokens */
  --md-outlined-text-field-label-text-font: 'Roboto', sans-serif;
  --md-outlined-text-field-label-text-size: 14px;
}

/* Scoped Overrides on Filled Buttons */
md-filled-button.danger-action {
  --md-filled-button-container-color: #DC2626;
  --md-filled-button-label-text-color: #FFFFFF;
  --md-filled-button-hover-state-layer-color: #FFFFFF;
  --md-filled-button-container-shape: 9999px;
}
```

---

## 7. Migration Bridge: Legacy MDC Web to Modern Material Web M3

For teams modernizing existing applications, the following bridge maps legacy MDC Web BEM classes to modern Material Web custom elements:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                     MIGRATION BRIDGE: MDC WEB (BEM) TO MATERIAL WEB (M3)                         │
├─────────────────────────────────────────┬────────────────────────────────────────────────────────┤
│ Legacy MDC Web Syntax (BEM / Sass)      │ Modern Material Web M3 Web Component                   │
├─────────────────────────────────────────┼────────────────────────────────────────────────────────┤
│ `<button class="mdc-button mdc-button--raised">` │ `<md-filled-button>`                          │
│ `<button class="mdc-button mdc-button--outlined">` │ `<md-outlined-button>`                      │
│ `<div class="mdc-checkbox">`            │ `<md-checkbox>`                                        │
│ `<div class="mdc-text-field mdc-text-field--outlined">` │ `<md-outlined-text-field>`             │
│ `<div class="mdc-select mdc-select--outlined">` │ `<md-outlined-select>`                         │
│ `<div class="mdc-dialog">`              │ `<md-dialog>`                                          │
│ `<div class="mdc-tab-bar">`             │ `<md-tabs>`                                            │
│ `<div class="mdc-switch">`              │ `<md-switch>`                                          │
│ `<div class="mdc-linear-progress">`     │ `<md-linear-progress>`                                 │
│ `<div class="mdc-circular-progress">`   │ `<md-circular-progress>`                               │
└─────────────────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 8. Inviolable Platform Standards Compliance

1. **Strict Zero-Emoji Directive**: No emojis or Unicode pictographs in templates, styles, or code comments.
2. **Iconography Standard**: Standardized exclusively on Google Material Symbols Outlined (`wght 500`).
3. **Three-Font Typographic Standard**:
   - English: Ubuntu / Roboto (`font-family: 'Roboto', 'Ubuntu', sans-serif`).
   - Khmer UI: Google Sans Khmer with zero-width space `\u200B` word boundary separators.
   - Formal Diplomas: Moul.
