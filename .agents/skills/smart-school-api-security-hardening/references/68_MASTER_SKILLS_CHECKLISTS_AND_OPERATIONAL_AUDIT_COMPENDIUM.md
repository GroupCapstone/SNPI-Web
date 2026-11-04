---
name: smart-school-skills-checklists-compendium
description: Grand Master Compendium of All Skill Checklists, Design Quality Gates, Operational Audits, and Production Standards for the Smart School Enterprise Platform. Unifies all 8 master checklist suites (Design System, UX Flows, Web App Screens, Product Launch, API Security, Well-Architected Microservices, REST Contracts, and Multi-Role RBAC) into a single authoritative audit reference.
---

# Master Skills Checklists & Operational Audit Compendium
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Compendium Authority

This document serves as the **Authoritative Grand Master Compendium** unifying every operational, architectural, security, and design checklist across the entire **Smart School Enterprise Platform**.

Every checklist item represents an inviolable quality gate that must be validated, certified, and maintained across all active portals, microservices, and front-site deployments.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                     GRAND MASTER SKILLS CHECKLIST COMPENDIUM                           │
├────────────────────────────────┬───────┬───────────────────────────────────────────────┤
│ Master Checklist Suite         │ Gates │ Canonical Source Specification                │
├────────────────────────────────┼───────┼───────────────────────────────────────────────┤
│ Suite 1: Design System & UI    │ 26    │ references/62_LIQUID_GLASS_DESIGN_SYSTEM...   │
│ Suite 2: UX Interaction Flows  │ 14    │ references/63_UX_FLOWS_AND_INTERACTION...     │
│ Suite 3: Web App Screen Patterns│ 32   │ references/64_WEB_APPLICATION_SCREEN_PAT...   │
│ Suite 4: Product Launch Quality│ 20    │ references/65_PRODUCT_LAUNCH_AND_WEB_READ...  │
│ Suite 5: API Security & Defense│ 23    │ references/66_API_SECURITY_AND_MICROSERV...   │
│ Suite 6: Well-Architected Ops  │ 18    │ references/67_MICROSERVICES_OPERATIONAL_EX... │
│ Suite 7: Multi-Role RBAC Matrix│ 8     │ references/43_MULTI_ROLE_ENTERPRISE_COMP...   │
│ Suite 8: Core Microservices & DB│ 7    │ references/59_CORE_MICROSERVICES_ARCHITEC...  │
├────────────────────────────────┼───────┼───────────────────────────────────────────────┤
│ TOTAL AUDIT QUALITY GATES      │ 148   │ Strict Zero-Emoji & Material Symbols Standard │
└────────────────────────────────┴───────┴───────────────────────────────────────────────┘
```

---

## Suite 1: Design System Foundations & 26 Master UI Components
*Authoritative Reference: [`references/62_LIQUID_GLASS_DESIGN_SYSTEM_AND_COMPONENT_INVENTORY_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/62_LIQUID_GLASS_DESIGN_SYSTEM_AND_COMPONENT_INVENTORY_SPEC.md)*

### Foundations Gates
- [x] **Typography Three-Font Standard**: English in Ubuntu (`font-ubuntu`), Khmer UI in Google Sans (`font-khmer`), Diplomas in Moul (`font-moul`), Codes in JetBrains Mono.
- [x] **Liquid Glass Surface Engine**: `bg-white/80 backdrop-blur-xl border border-white/60`.
- [x] **360-Degree Specular Top Rim**: `border-t border-white/95` on all glass containers.
- [x] **Hard Offset Elevation Shadows**: Zero blur (`shadow-[0_4px_0_0_...]`, `shadow-[0_8px_0_0_...]`).
- [x] **WCAG 2.2 AA Contrast Compliance**: Minimum 4.5:1 text contrast; minimum 3.0:1 UI components.
- [x] **Incremental Spacing & 12-Column Grid**: 4px/8px rhythm; fluid responsive breakpoints.

### 26 Components Inventory
- [x] **Drawer**: Right-sliding Liquid Glass sheet (`@radix-ui/react-dialog`) with blurred backdrop.
- [x] **Accordion**: Collapsible multi-tier panel (`@radix-ui/react-accordion`) with rotating chevron.
- [x] **Breadcrumb**: Hierarchical navigation path trail with `chevron_right` separators.
- [x] **Tabs**: Segmented capsule glass pill (`bg-slate-100/80`) and role-colored underline indicator.
- [x] **Stepper**: Multi-step wizard progress indicator showing completed, active, and pending states.
- [x] **Table**: Headless **TanStack Table v8** with row virtualization, column pinning, and sort glyphs.
- [x] **Card**: Standard frosted white container with hard offset shadow and specular highlight.
- [x] **Badge**: Rounded-full pill (`px-2.5 py-0.5 text-xs font-semibold`) in status/role colors.
- [x] **Avatar**: Modern macOS squircle (`rounded-2xl`) with initials fallback and active presence dot.
- [x] **Skeleton**: Shimmering pulse placeholder (`animate-pulse`) for async hydration.
- [x] **Carousel**: Responsive touch-enabled slide viewer with pagination indicator dots.
- [x] **Tooltip**: Accessible floating micro-copy popover (`@radix-ui/react-tooltip`) in dark slate.
- [x] **Button**: Tactile sticker button physics with hard bottom shadow and `active:translate-y-[2px]`.
- [x] **Input Field**: Frosted glass input with leading icon slot, clear button, and inline validation text.
- [x] **Searchbar**: Debounced search input (300ms) with clear trigger and `Cmd+K` shortcut hint badge.
- [x] **Checkbox**: Tactile rounded-md box with solid role-colored fill and white checkmark symbol.
- [x] **Radio**: Accessible circular radio ring (`@radix-ui/react-radio-group`) with solid inner dot.
- [x] **Toggle (Switch)**: Smooth sliding circular glass thumb on pill track for real-time toggles.
- [x] **Slider**: Horizontal range track (`@radix-ui/react-slider`) for thresholds and concessions.
- [x] **Date Picker**: Popover glass calendar supporting single date and academic date range picking.
- [x] **Modal (Dialog)**: Centered liquid glass dialog with focus trapping and keyboard Escape dismiss.
- [x] **Dropdown Menu**: Floating glass popover list (`@radix-ui/react-dropdown-menu`) for action triggers.
- [x] **Toast**: Floating notification viewport with role/status colored edge and auto-dismiss timer.
- [x] **Alert**: Contextual static callout box (`Info`, `Success`, `Warning`, `Danger`) with solid icon.
- [x] **Banner**: Persistent full-width top announcement ribbon for campus-wide alerts.
- [x] **Loading**: Circular indeterminate spinner (`animate-spin`) and horizontal progress bar.

---

## Suite 2: 14 Mission-Critical UX Interaction Flow Checklists
*Authoritative Reference: [`references/63_UX_FLOWS_AND_INTERACTION_DESIGN_CHECKLIST_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/63_UX_FLOWS_AND_INTERACTION_DESIGN_CHECKLIST_SPEC.md)*
*Skill: [`smart-school-ux-flow-checklists`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/.agents/skills/smart-school-ux-flow-checklists/SKILL.md)*

- [x] **Flow 01: Adding to Cart**: Flying badge micro-animation to header cart, auto-increment quantity, drawer preview, stock quota validation.
- [x] **Flow 02: Canceling Subscription**: Impact transparency modal, 2-step confirmation, reason feedback selector, retention alternative, red tactile danger button.
- [x] **Flow 03: Entering Promo Code**: Auto-capitalized uppercase mono input, instant discount breakdown, RFC 7807 error feedback, dynamic net recalculation.
- [x] **Flow 04: Deleting Account**: Irreversible data loss banner, explicit typing guard (`DELETE`), admin password re-auth, isolated transaction soft-purge.
- [x] **Flow 05: Submitting a Form**: Zod client validation, auto-scroll to first error, loading spinner lock, unsaved changes guard, idempotent `X-Request-ID`.
- [x] **Flow 06: Uploading Media**: Drag & drop zone, extension/size restriction filter, real-time progress bar, squircle image cropper, replace/delete triggers.
- [x] **Flow 07: Filtering Items**: Faceted dropdowns, active removable filter chips, 300ms debounce, empty state card, URL query parameter synchronization.
- [x] **Flow 08: Showing Input Error**: Red border ring (`border-rose-500`), inline warning symbol (`error_outline`), caption text, RFC 7807 mapping, ARIA attributes.
- [x] **Flow 09: Contacting Support**: Multi-channel contact card, category department routing, automated tracking ticket ID with SLA, emergency hotline pinning.
- [x] **Flow 10: Search Checklists...**: Universal `Cmd+K` / `Ctrl+K` spotlight palette, categorized results tree, keyboard arrow traversal, match term bolding.
- [x] **Flow 11: Verifying Account**: 6-digit PIN box array, clipboard paste distribution, 60s resend countdown timer, destination masking, auto-submit.
- [x] **Flow 12: Saving Changes**: Deep equality dirty state detection, floating bottom sticky action bar, unsaved badge, discard/save triggers, confirmation toast.
- [x] **Flow 13: Resetting Password**: Enumeration-safe request copy, live 4-criterion entropy meter, confirmation matching, remote session revocation.
- [x] **Flow 14: Making a Card Payment**: Summary ledger card, PCI-DSS compliant iframe, 3D Secure modal, transaction lock, thermal receipt print & PDF download.

---

## Suite 3: 32 Core Web Application Screen Patterns Checklist
*Authoritative Reference: [`references/64_WEB_APPLICATION_SCREEN_PATTERNS_AND_CHECKLIST_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/64_WEB_APPLICATION_SCREEN_PATTERNS_AND_CHECKLIST_SPEC.md)*
*Skill: [`smart-school-webapp-patterns`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/.agents/skills/smart-school-webapp-patterns/SKILL.md)*

### Identity, Access & Auth (6)
- [x] **Login**: Brutalist glass card, multi-branch campus selector, username/password, remember me, SSO trigger.
- [x] **2FA**: 6-digit TOTP array, SMS OTP fallback, emergency recovery key dialog.
- [x] **Account**: Personal demographics, squircle avatar upload, password renewal, active sessions manager.
- [x] **Onboarding**: 4-Stage setup wizard, 1-click demo data seeder, video walkthrough.
- [x] **Dashboard**: 12-Column KPI grid, Recharts SVG trends, quick-action bar, real-time activity feed.
- [x] **Command Palette Search**: Global `Cmd+K` spotlight search, grouped navigation, shortcuts hint.

### Administration & Governance (6)
- [x] **Admin Panel**: District administration cockpit, campus federation switch, RLS bypass switch, session rollover.
- [x] **User Management**: 8-Role directory, permission editor modal, user status pills, impersonation action.
- [x] **API Keys**: Masked secret keys, permission scopes (`READ_STUDENTS`, `WRITE_FEES`), Kafka webhook subscriptions.
- [x] **Audit Log**: Tamper-evident admin ledger, actor metadata, client IP, side-by-side JSON before/after diff.
- [x] **Version History**: Revision tree, author squircle avatar, 1-click rollback trigger with warning.
- [x] **Maintenance**: Full-canvas downtime screen, countdown timer, emergency administrator bypass key.

### Data Grids & Complex Operations (7)
- [x] **Data Table**: Headless TanStack Table, column pinning, sorting glyphs, bulk selection, CSV export.
- [x] **Single Item Detail**: 360-Degree student/staff dossier, academic, fees, attendance, and documents tabs.
- [x] **Search Results**: Left facet filter sidebar, right result items, keyword term highlights, pagination.
- [x] **Empty State**: Frosted glass card, clean vector glyph, clear guidance copy, primary CTA button.
- [x] **Timeline / Gantt View**: Horizontal term schedule, exam timetables, collision detection.
- [x] **Kanban Board**: Incident tracking and maintenance tickets with draggable Liquid Glass cards.
- [x] **Multi-Step Form**: Complex student admission wizard with top visual stepper and draft autosave bar.

### Commerce, Billing & Business Intelligence (5)
- [x] **Pricing**: Tuition package tiers, annual/termly billing toggle, line-item fee grid.
- [x] **Checkout**: POS cashier, online gateway iframe, promo code injector, thermal receipt trigger.
- [x] **Billing**: Student fee statement, overdue balance, payment history, PDF receipt download ledger.
- [x] **Report View**: High-throughput BI report generator with multi-parameter exports (`Copy`, `Excel`, `CSV`, `PDF`, `Print`).
- [x] **Analytics**: Student retention curves, fee collection velocity, weekday attendance heatmaps.

### Collaboration & System Preferences (8)
- [x] **Settings**: School profile, brand config (`brand.ts`), gateways, sticky save bar.
- [x] **Notification Settings**: Event-channel toggle matrix (Push, SMS, Email, WhatsApp), quiet hours scheduler.
- [x] **Notifications Feed**: Header drawer with unread counter pill, categorized alert stream.
- [x] **Chat**: 3-Pane real-time messaging hub, class channels, file attachments vault.
- [x] **Comments**: Nested discussion stream on homework submissions and staff behavioral notes.
- [x] **Public Profile**: Verified student graduation badge and teacher public credentials with anti-tamper QR verification.
- [x] **Integrations**: Connectors for Google Meet, Zoom, Stripe, DLT SMS, and Biometric turnstile relays.
- [x] **Help Center**: Searchable knowledgebase, categorized FAQ accordions, ticket submission CTA.

---

## Suite 4: 20-Point Product Launch & Web Readiness Quality Audit
*Authoritative Reference: [`references/65_PRODUCT_LAUNCH_AND_WEB_READINESS_CHECKLIST_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/65_PRODUCT_LAUNCH_AND_WEB_READINESS_CHECKLIST_SPEC.md)*
*Skill: [`smart-school-product-launch-readiness`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/.agents/skills/smart-school-product-launch-readiness/SKILL.md)*

- [x] **01. Privacy policy page**: FERPA/GDPR compliance, data retention, third-party processor disclosures.
- [x] **02. Terms & conditions page**: Platform usage rules, student honor code, tuition fee refund policy.
- [x] **03. Secrets off frontend**: Verification that zero private signing keys or `sk_live_` tokens exist in client bundle.
- [x] **04. Force HTTPS**: TLS 1.3, Strict-Transport-Security (HSTS), security headers (`nosniff`, `SAMEORIGIN`).
- [x] **05. Cookie consent banner**: Liquid Glass floating consent card distinguishing essential vs. analytics cookies.
- [x] **06. Meta titles + descriptions**: Next.js 15 dynamic metadata API for all public views.
- [x] **07. Social preview image**: 1200x630px branded OpenGraph social share card with school crest.
- [x] **08. Add a favicon**: Multi-resolution favicon set (16x16, 32x32, 180x180 squircle `apple-touch-icon.png`).
- [x] **09. Sitemap + robots. txt**: Dynamic XML sitemap, crawl disallow on authenticated `/admin/*` portals.
- [x] **10. Alt text on images**: Descriptive `alt` copy on all student photos and campus media assets.
- [x] **11. Compress your images**: Modern AVIF/WebP image compression, responsive `next/image` breakpoints (max 250KB).
- [x] **12. Check page load speed**: Core Web Vitals targets: LCP < 2.0s, INP < 150ms, CLS < 0.05, Lighthouse >= 95.
- [x] **13. Fix color contrast**: WCAG 2.2 AA compliance: >= 4.5:1 text contrast on white glass canvas.
- [x] **14. Make it mobile friendly**: 44x44px touch targets, mobile drawers, zero horizontal overflow.
- [x] **15. Custom 404 page**: Polished Liquid Glass error canvas with dashboard recovery links.
- [x] **16. Fix broken links**: Automated crawler link audit; zero dead `href="#"` anchors.
- [x] **17. Form validation**: Dual-layer Zod client schema and Jakarta Spring Boot validation.
- [x] **18. Spam protection**: Cloudflare Turnstile invisible bot challenge, Redis sliding-window rate limit.
- [x] **19. Set upanalytics**: Privacy-preserving self-hosted analytics (Plausible / PostHog).
- [x] **20. One clear call to action**: High-contrast tactile primary CTA button on every landing view.

---

## Suite 5: Enterprise API Security & Microservices Hardening Checklist
*Authoritative Reference: [`references/66_API_SECURITY_AND_MICROSERVICES_HARDENING_CHECKLIST_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/66_API_SECURITY_AND_MICROSERVICES_HARDENING_CHECKLIST_SPEC.md)*
*Skill: [`smart-school-api-security-hardening`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/.agents/skills/smart-school-api-security-hardening/SKILL.md)*

- [x] **RS256 JWT Authentication**: Disallow Basic Auth; asymmetric Nimbus RS256 JWT bearer tokens.
- [x] **Argon2id Password Storage**: Argon2id / BCrypt cost 12; zero plain-text passwords or weak hashes.
- [x] **Login Jail & Lockout**: Redis sliding-window account jail (5 failures = 15 min lock).
- [x] **Data-at-Rest Encryption**: AES-256 GCM encryption on all student PII, salaries, and bank info.
- [x] **Sliding Window Rate Limit**: Redis-backed 60 req/min public, 300 req/min authenticated endpoints.
- [x] **TLS 1.3 & HSTS Preload**: Strict-Transport-Security preload, modern TLS 1.3 ciphers, SNI matching.
- [x] **Private VPC Safelisting**: Internal microservice APIs restricted to private subnets & mTLS.
- [x] **OAuth2 PKCE & Redirect Lock**: Authorization Code with PKCE, exact redirect_uri whitelist, state hash.
- [x] **HTTP Method Strictness**: Strict method binding; 405 Method Not Allowed on illegal verbs.
- [x] **Content Negotiation**: Enforces Accept and Content-Type: application/json; 406/415 errors.
- [x] **Zero Credentials in URLs**: Secrets in Authorization header only; zero tokens in query params.
- [x] **Indirect Object References**: Indirect /me routes; BOLA verification of resource ownership.
- [x] **UUID v4/v7 Primary Keys**: Zero auto-increment IDs to prevent student cohort enumeration.
- [x] **XXE & Bomb Defense**: Disallow external DTDs and recursive YAML/XML entity expansions.
- [x] **Directive 02 Async Queues**: Asynchronous Kafka workers for heavy batch tasks (202 Accepted).
- [x] **Production Debug Off**: Disables Spring DevTools, root logging level set to WARN.
- [x] **Security Response Headers**: X-Content-Type-Options, X-Frame-Options: DENY, Content-Security-Policy.
- [x] **Header Fingerprint Stripping**: Remove Server, X-Powered-By, and framework version disclosure headers.
- [x] **RFC 7807 Error Sanitization**: Client-safe problem details with zero stack traces or internal leaks.
- [x] **CI/CD SAST & DAST Gates**: SonarQube quality gate, Trivy CVE scanning, OWASP ZAP dynamic audit.
- [x] **Sensitive Log Scrubbing**: Regex masking filters stripping tokens, credit cards, and passwords.
- [x] **Mutual TLS (mTLS)**: Encrypted and authenticated inter-service mesh communication via Istio.
- [x] **Secrets Rotation & Vault**: HashiCorp Vault / KMS secret injection; pre-commit TruffleHog hooks.

---

## Suite 6: Microservices Operational Excellence & Well-Architected Checklist
*Authoritative Reference: [`references/67_MICROSERVICES_OPERATIONAL_EXCELLENCE_AND_WELL_ARCHITECTED_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/67_MICROSERVICES_OPERATIONAL_EXCELLENCE_AND_WELL_ARCHITECTED_SPEC.md)*
*Skill: [`smart-school-microservices-operational-excellence`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/.agents/skills/smart-school-microservices-operational-excellence/SKILL.md)*

- [x] **Service Ownership Tagging**: Owner, Team, ServiceCode tags on all K8s & cloud resources.
- [x] **On-Call Escalation Matrix**: 3-Tier escalation ladder (SRE -> Lead -> VP) via PagerDuty.
- [x] **Git-Managed Runbooks**: Machine-readable mitigation playbooks in `docs/runbooks/`.
- [x] **Canary Deployments**: ArgoCD progressive traffic shift (10% -> 100%) with auto-rollback.
- [x] **Golden Signals Telemetry**: Latency (p99), Traffic (RPS), Errors (5xx), Saturation dashboards.
- [x] **Kubernetes mTLS Mesh**: Istio Service Mesh with STRICT mutual TLS between pods.
- [x] **NetworkPolicy Isolation**: Default-deny ingress/egress rules per Kubernetes namespace.
- [x] **Multi-AZ Node Anti-Affinity**: Pods spread across >= 3 Availability Zones (`topologySpread`).
- [x] **Jittered Backoff Retries**: Full jitter exponential backoff on all inter-service REST clients.
- [x] **Resilience4j Circuit Break**: Automated circuit breaking on external payment & SMS gateways.
- [x] **RTO < 15m / RPO < 1m**: Point-in-time recovery WAL archiving and weekly restore drills.
- [x] **Virtual Threads Engine**: Java 21 Project Loom non-blocking concurrency (10,000+ RPS/pod).
- [x] **P99 Latency SLO Bounds**: p95 < 150ms / p99 < 300ms read queries; alerts on breach.
- [x] **FinOps Resource Tagging**: Cost allocation tags and chargeback showback dashboards.
- [x] **Serverless Auto-Scaling**: Neon compute auto-pause during non-school night hours.
- [x] **Cold Glacier Lifecycle**: Automated S3 lifecycle transition to Glacier after 180 days.
- [x] **Distroless Minimal Images**: Google Distroless container images reducing footprint to < 180MB.
- [x] **Shared Multi-Tenant RLS**: Shared Postgres engine serving 500+ branches via RLS isolation.

---

## Suite 7: Multi-Role RBAC & Access Control Matrix Checklist
*Authoritative Reference: [`references/43_MULTI_ROLE_ENTERPRISE_COMPARISON_AND_RBAC_MATRIX_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/43_MULTI_ROLE_ENTERPRISE_COMPARISON_AND_RBAC_MATRIX_SPEC.md)*
*Skill: [`smart-school-admin-access-control`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/.agents/skills/smart-school-admin-access-control/SKILL.md)*

- [x] **Super Admin (`SUPER_ADMIN`)**: Unrestricted global bypass (`app.bypass_rls = true`), all 34 modules, multi-branch provisioning, system settings.
- [x] **Campus Admin / Dean (`ADMIN`)**: Full campus-scoped authority (`app.current_branch_id = ?`), academic administration, fee structures, examinations.
- [x] **Teacher (`TEACHER`)**: Classroom roll-call, lesson planning, marks entry, homework assignment, student behavioral logs.
- [x] **Accountant (`ACCOUNTANT`)**: Fee counter collection, auto-invoicing, concession waivers, expenses, general ledger accounting.
- [x] **Receptionist (`RECEPTIONIST`)**: Front office, visitor pass generation, gate pass authorization, phone call logs, postal tracking.
- [x] **Librarian (`LIBRARIAN`)**: Book accession catalog, member issuance/returns, overdue fine calculation, inventory auditing.
- [x] **Student (`STUDENT`)**: Read-only academic dossier, homework submissions, admit card downloads, fee statements, online exams.
- [x] **Parent (`PARENT`)**: Multi-ward switcher, fee installment payments, daily attendance alerts, direct teacher communication.

---

## Suite 8: Core Microservices Cluster & Persistence Checklist
*Authoritative Reference: [`references/59_CORE_MICROSERVICES_ARCHITECTURE_AND_PERSISTENCE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/59_CORE_MICROSERVICES_ARCHITECTURE_AND_PERSISTENCE_SPEC.md)*
*Skill: [`smart-school-backend-services`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/.agents/skills/smart-school-backend-services/SKILL.md)*

- [x] **1. auth-tenant-service (:8081)**: Identity, token issuance, multi-branch federation, RBAC entitlements.
- [x] **2. academic-core-service (:8082)**: Classes, sections, subjects, classrooms, student 360 dossiers.
- [x] **3. attendance-msg-service (:8083)**: Daily roll-call, biometric QR ingest, DLT SMS, transactional email.
- [x] **4. finance-ledger-service (:8084)**: Fee schedules, concessions, POS cashier, invoice ledger, gateways.
- [x] **5. assessment-exam-service (:8085)**: 5 Grading models, exam timetables, admit cards, bulk marksheets.
- [x] **6. workforce-hr-service (:8086)**: Staff directory, biometric roll, automated payroll, leave approvals.
- [x] **7. operations-hub-service (:8087)**: Transport fleet, GPS routes, hostel dorms, library, gate passes.

---

## 3. Grand Verification Protocol & Conformance Sign-Off

- [x] **Zero Emoji Enforcement**: Certified 100% compliant across all 148 checklist items and documentation.
- [x] **Three-Font System**: Ubuntu (English), Google Sans (Khmer UI), Moul (Diplomas).
- [x] **Google Material Symbols Outlined**: Uniform optical weight `500` applied.
- [x] **Multi-Tenant Isolation**: PostgreSQL kernel RLS enforced across all 7 microservices.
