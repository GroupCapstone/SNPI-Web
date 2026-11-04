---
name: smart-school-product-launch-readiness
description: Authoritative 20-Point Production Launch, Web Readiness, Security Hardening, SEO, and Performance Quality Gate Standard for the Smart School Enterprise Platform. Enforces strict zero-emoji compliance, Next.js 15 SSR optimization, Core Web Vitals, WCAG 2.2 AA accessibility, and enterprise privacy compliance. Trigger on: "launch checklist", "production readiness", "product launch", "web readiness", "pre-launch audit", "privacy policy", "terms and conditions", "seo checklist", "security hardening".
---

# Product Launch & Web Readiness Quality Gate Standard (20-Point Audit)
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Production Gate Mandate

Before any campus tenant, portal release, or the Public Front Site (`PUBLIC_CMS`) is deployed to production, it must successfully pass this **20-Point Production Launch & Web Readiness Quality Audit**. 

Every gate is formulated to enforce:
1. **Security & Data Sovereignty**: Zero client-side secret leakage, mandatory HTTPS/HSTS, and spam resistance.
2. **Legal & Institutional Compliance**: GDPR / FERPA compliant privacy policies, institutional terms, and cookie consent banners.
3. **Core Web Vitals & Performance**: Sub-2.5s LCP, modern AVIF/WebP image compression, and fluid 60 FPS mobile responsiveness.
4. **Liquid Glass Design Standards**: Zero emoji policy, Google Material Symbols Outlined (`wght: 500`), and Three-Font typography.

---

## 1. The 20-Point Production Launch Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   20-POINT PRODUCT LAUNCH & WEB READINESS AUDIT                        │
├───────────────────────────────┬────────────────────────────────────────────────────────┤
│ Quality Gate Category         │ Included Checklist Items                               │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 1. Legal, Privacy & Consent   │ 01. Privacy Policy Page                                │
│                               │ 02. Terms & Conditions Page                            │
│                               │ 05. Cookie Consent Banner                              │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 2. Security & Data Protection │ 03. Secrets Off the Frontend                           │
│                               │ 04. Force HTTPS & HSTS Headers                         │
│                               │ 18. Spam Protection & Bot Shield                       │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 3. SEO, Meta & Social Sharing │ 06. Meta Titles & Descriptions                         │
│                               │ 07. Branded Social Preview Images (OG)                 │
│                               │ 08. Multi-Resolution Favicon Suite                     │
│                               │ 09. Sitemap.xml & Robots.txt                           │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 4. Performance & Media        │ 10. Alt Text on All Media                              │
│                               │ 11. Image Compression (AVIF/WebP)                      │
│                               │ 12. Core Web Vitals & Load Speed                       │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 5. UX, Accessibility & Links  │ 13. WCAG 2.2 AA Color Contrast                         │
│                               │ 14. Mobile-Friendly Touch Targets                      │
│                               │ 15. Custom Liquid Glass 404 Page                       │
│                               │ 16. Fix Broken Links & Dead Ends                       │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 6. Forms, Analytics & Growth  │ 17. Client & Server Form Validation                    │
│                               │ 19. Privacy-Preserving Analytics Setup                 │
│                               │ 20. Singular Clear Call-To-Action (CTA)                │
└───────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 2. Detailed Technical Implementation of the 20 Gates

---

### Gate 01: Privacy Policy Page (`Privacy policy page`)
- **Route**: `/privacy-policy`
- **Icon**: `policy`
- **Specification**: Legally binding, localized privacy policy explaining data collection (Student biometric roll, national ID, academic marks, parent contact info) under FERPA and GDPR principles.
- **Key Sections**: Data Controller Identity (`src/config/brand.ts`), Purpose of Processing, Retention Periods, Third-Party Processors (Stripe, Twilio, AWS), and Guardian Data Rights.
- **Verification**: Ensure direct, non-authenticated link exists in the public footer and registration wizard.

---

### Gate 02: Terms & Conditions Page (`Terms & conditions page`)
- **Route**: `/terms-and-conditions`
- **Icon**: `gavel`
- **Specification**: Governs institutional platform usage, student honor codes, acceptable use of school computing resources, payment & refund policies for tuition fees, and suspension terms.
- **Verification**: Mandatory link present on Student Admission submission form and Fee Payment Checkout screens.

---

### Gate 03: Secrets Off the Frontend (`Secrets off the frontend`)
- **Icon**: `lock`
- **Specification**: Strict audit guaranteeing zero production credentials, JWT private signing keys, database connection strings, or third-party secret keys (e.g. `STRIPE_SECRET_KEY`, `KAFKA_PASSWORD`, `DATABASE_URL`) are bundled into client-side JavaScript.
- **Implementation**:
  - Only variables prefixed with `NEXT_PUBLIC_` are bundled to the browser.
  - Run automated build inspection: `grep -rn "sk_live_" .next/` returns 0 occurrences.
- **Verification**: Client bundle analyzer confirms zero private environment leakage.

---

### Gate 04: Force HTTPS & HSTS Headers (`Force HTTPS`)
- **Icon**: `https`
- **Specification**: All HTTP traffic must automatically redirect to HTTPS with modern TLS 1.3 cipher suites.
- **Security Headers (`next.config.js` / Spring Cloud Gateway)**:
  ```http
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(self), microphone=(), geolocation=()
  ```
- **Verification**: SSLLabs scan rating: `A+`.

---

### Gate 05: Cookie Consent Banner (`Cookie consent banner`)
- **Icon**: `cookie`
- **Specification**: Liquid Glass bottom-floating banner (`bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl rounded-2xl p-4 max-w-xl fixed bottom-6 left-6 z-50`).
- **Anatomy**: Clear explanation of essential cookies (JWT session) vs. analytics cookies. Options: `Accept Necessary`, `Customize`, `Accept All`. Stores consent timestamp in localStorage (`cookie_consent_v1`).
- **Verification**: Banner does not fire tracking scripts until explicit consent is recorded.

---

### Gate 06: Meta Titles & Descriptions (`Meta titles + descriptions`)
- **Icon**: `title`
- **Specification**: Dynamic, contextual OpenGraph meta titles and descriptions across every public page and portal view.
- **Implementation (Next.js 15 `Metadata` API)**:
  ```typescript
  export const metadata: Metadata = {
    title: {
      template: "%s | IDEAI SCHOOL",
      default: "IDEAI SCHOOL - Intelligent Digital Education Platform",
    },
    description: "Enterprise multi-role school management platform with real-time academic dossiers, biometric roll, and automated fee collections.",
  };
  ```
- **Verification**: Zero missing `<title>` or `<meta name="description">` tags on public routes.

---

### Gate 07: Branded Social Preview Images (`Social preview image`)
- **Icon**: `image`
- **Specification**: 1200x630px high-resolution OpenGraph image (`og:image`) featuring the institutional brand crest, platform tagline, and frosted glass motif.
- **Implementation**: Dynamic OG generation using `@vercel/og` or pre-rendered vector image at `public/images/og-preview.jpg`.
- **Verification**: Tested and validated via Facebook Open Graph Debugger and Twitter Card Validator.

---

### Gate 08: Multi-Resolution Favicon Suite (`Add a favicon`)
- **Icon**: `favorite_border`
- **Specification**: Complete favicon set generated from the Apple Mac minimalist geometric crest (`src/config/brand.ts`):
  - `favicon.ico` (32x32)
  - `icon.png` (192x192, 512x512 for PWA)
  - `apple-touch-icon.png` (180x180 squircle)
  - `manifest.webmanifest` (PWA application metadata)
- **Verification**: Browser tabs, macOS bookmarks, and mobile home screen shortcuts render sharp squircles.

---

### Gate 09: Sitemap.xml & Robots.txt (`Sitemap + robots. txt`)
- **Routes**: `/sitemap.xml`, `/robots.txt`
- **Icon**: `account_tree`
- **Specification**:
  - `robots.txt`: Disallows crawler indexing of private administrative and authenticated portals (`/admin/*`, `/teacher/*`, `/student/*`, `/api/*`), while indexing public marketing, curriculum, and admissions pages.
  - `sitemap.xml`: Auto-generated dynamic XML sitemap with correct `lastmod` and `changefreq`.
- **Verification**: Validated via Google Search Console sitemap validator.

---

### Gate 10: Alt Text on All Media (`Alt text on images`)
- **Icon**: `description`
- **Specification**: Every image, student passport photo, document scan, and institution logo must include a descriptive, accessible `alt` attribute.
- **Rule**: Decorative elements use `alt="" aria-hidden="true"`; content images use descriptive copy (e.g. `alt="Official emblem of Mount Carmel High School"`).
- **Verification**: Automated Axe accessibility scan reports zero `image-alt` violations.

---

### Gate 11: Image Compression & Modern Formats (`Compress your images`)
- **Icon**: `compress`
- **Specification**: All static assets and dynamic uploads are compressed and served in modern **AVIF** and **WebP** formats with responsive `srcset` breakpoints.
- **Implementation**: Handled via `next/image` with automated size optimization and lazy loading:
  ```tsx
  <Image src="/images/campus.jpg" alt="Main Campus Quad" width={800} height={450} quality={80} format={['avif', 'webp']} priority={false} />
  ```
- **Verification**: Zero uploaded assets exceeding 250KB in production payload delivery.

---

### Gate 12: Core Web Vitals & Page Load Speed (`Check page load speed`)
- **Icon**: `speed`
- **Performance Targets (Google Web Vitals Benchmark)**:
  - **Largest Contentful Paint (LCP)**: `< 2.0s` (Target: `1.2s`)
  - **Interaction to Next Paint (INP)**: `< 150ms` (Target: `50ms`)
  - **Cumulative Layout Shift (CLS)**: `< 0.05` (Target: `0.00`)
  - **First Contentful Paint (FCP)**: `< 1.0s`
- **Implementation**: Self-hosted fonts (`Ubuntu`, `Google Sans`), route prefetching, virtualized tables.
- **Verification**: Google Lighthouse performance score `>= 95/100`.

---

### Gate 13: WCAG 2.2 AA Color Contrast (`Fix color contrast`)
- **Icon**: `contrast`
- **Specification**: Strict compliance with WCAG 2.2 Level AA contrast requirements:
  - Normal text (`< 18px`): Minimum contrast ratio `4.5:1`.
  - Large text (`>= 18px` bold or `>= 24px`): Minimum contrast ratio `3.0:1`.
  - UI components and borders: Minimum contrast ratio `3.0:1`.
- **Enforcement**: Zero gray text lighter than `text-slate-600` on white glass canvases.

---

### Gate 14: Mobile-Friendly Touch Targets (`Make it mobile friendly`)
- **Icon**: `smartphone`
- **Specification**: All interactive buttons, icon buttons, dropdown triggers, and navigation links must provide a minimum tap target size of **44x44px**.
- **Implementation**: Responsive drawer menus for mobile viewports, sticky mobile bottom navigation bars for Student/Parent mobile web, and no horizontal layout overflow (`overflow-x-hidden`).

---

### Gate 15: Custom Liquid Glass 404 Page (`Custom 404 page`)
- **Route**: `app/not-found.tsx` (`404`)
- **Icon**: `error`
- **Specification**: Polished Liquid Glass error canvas (`bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-2xl text-center max-w-lg mx-auto`).
- **Anatomy**: Monospace `404` badge, clear message ("The requested academic resource could not be found"), and two primary recovery buttons: `Return to Dashboard` and `Contact Help Desk`.

---

### Gate 16: Fix Broken Links & Dead Ends (`Fix broken links`)
- **Icon**: `link_off`
- **Specification**: Full crawler audit across all internal navigation menus, footer links, syllabus download anchors, and breadcrumbs.
- **Rule**: Zero `href="#"` or unfinished placeholder links. Missing files fall back to safe error boundaries.
- **Verification**: Run automated link checker: `npx broken-link-checker` yields 0 dead links.

---

### Gate 17: Comprehensive Form Validation (`Form validation`)
- **Icon**: `check_circle`
- **Specification**: Dual-layer validation on all inputs:
  - **Client-Side**: Type-safe **Zod** schema with instant inline feedback, focus on first error, and red border cue (`border-rose-500`).
  - **Server-Side**: Jakarta Bean Validation (`@NotNull`, `@Size`, `@Pattern`) in Spring Boot microservices returning RFC 7807 compliant error envelopes.

---

### Gate 18: Spam Protection & Bot Shield (`Spam protection`)
- **Icon**: `shield`
- **Specification**: Invisible bot defense on public admission inquiries, front office contact forms, and password reset forms.
- **Implementation**: **Cloudflare Turnstile** (or hCaptcha) invisible verification challenge combined with Redis sliding-window IP rate limiting (10 req/minute). Zero user-punishing visual puzzles.

---

### Gate 19: Privacy-Preserving Analytics Setup (`Set upanalytics`)
- **Icon**: `analytics`
- **Specification**: Institutional analytics tracking pageviews, enrollment funnel drop-offs, and portal active sessions without collecting invasive personal identifiers or cookies.
- **Tooling**: Self-hosted **Plausible Analytics** or **PostHog** with full GDPR/FERPA compliance.
- **Rule**: Zero tracking of student identifiable health, biometric, or disciplinary data.

---

### Gate 20: Singular Clear Call-To-Action (`One clear call to action`)
- **Icon**: `ads_click`
- **Specification**: Every public landing view, admission portal page, and dashboard overview must feature **one primary, visually dominant Call-To-Action (CTA)**.
- **Visual Design**: High-contrast tactile sticker button in role accent color (`bg-[#8E24AA] shadow-[0_4px_0_0_#4A148C]`) that immediately guides the user's primary intent (e.g. `Apply for Online Admission` or `Collect Due Fees`).

---

## 3. Production Sign-Off & Verification Protocol

Before final release tagging, execute the automated pre-launch audit:

```bash
# 1. Inspect zero client secrets
npm run build && grep -rn "sk_live_" .next/

# 2. Verify TypeScript integrity
npm run typecheck

# 3. Audit accessibility compliance
npx axe-cli https://staging.ideaischool.edu

# 4. Check broken links
npx broken-link-checker https://staging.ideaischool.edu -ro

# 5. Execute Core Web Vitals Lighthouse audit
npx lighthouse https://staging.ideaischool.edu --output=json --view
```

- [x] All 20 Quality Gates codified with explicit technical architectures.
- [x] Zero Emoji Policy strictly maintained in code and user copy.
- [x] Three-Font standard and Google Material Symbols Outlined (`wght: 500`) applied throughout.
