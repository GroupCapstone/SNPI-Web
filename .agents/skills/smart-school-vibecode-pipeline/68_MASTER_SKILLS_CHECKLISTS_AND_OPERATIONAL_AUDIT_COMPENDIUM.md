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
│ Suite 9: Mobile Apps Ecosystem │ 12    │ references/69_MOBILE_APPS_ECOSYSTEM_STUDEN... │
│ Suite 10: Multi-Institutional  │ 8     │ references/70_TARGET_ORGANISATIONS_AND_MUL... │
│ Suite 11: Academic Operations  │ 13    │ references/73_INTEGRATED_ACADEMIC_OPERATIO... │
│ Suite 12: Flow Alignment & Read│ 10    │ references/74_MASTER_FLOW_ALIGNMENT_AND_DE... │
│ Suite 13: Enterprise Ecosystem │ 10    │ references/75_ENTERPRISE_SCHOOL_TYPES_CIS...  │
│ Suite 14: Genius Cloud & Infra │ 10    │ references/76_GENIUS_CLOUD_AWS_INFRA...       │
│ Suite 15: Granular Submodules  │ 10    │ references/77_GENIUS_CLOUD_FINANCE...         │
│ Suite 16: Cambodia Localized SMS│ 10   │ references/78_CAMBODIA_EDTECH_ECOSYSTEM...    │
│ Suite 17: Campus Lifecycle Ops │ 10    │ references/79_CAMBODIA_EDTECH_MULTI_TIER...   │
│ Suite 18: Commercial Tiers & Mod│ 10    │ references/81_COMMERCIAL_TIERS_FEATURE...     │
│ Suite 19: Navigation Slugs & Apps│ 10   │ references/82_NAVIGATION_SLUGS_APPS_SUITE...  │
│ Suite 20: List/Grid & Dossiers │ 10    │ references/83_LIST_GRID_VIEWS_ROLE_DOSSI...   │
│ Suite 21: Auth, Lock & Utility │ 10    │ references/84_AUTHENTICATION_LOCK_SC...       │
│ Suite 22: Pocket Money & RTL   │ 10    │ references/85_STUDENT_POCKET_MONEY_...       │
│ Suite 23: SIMS, EMIS & Mobile  │ 10    │ references/86_SIMS_EMIS_AND_STAKE...          │
│ Suite 24: Class Notes & Zones  │ 10    │ references/87_MOBILE_APP_CLASS_NO...          │
│ Suite 25: Material Design 3 Web│ 10    │ references/88_GOOGLE_MATERIAL_DES...          │
├────────────────────────────────┼───────┼───────────────────────────────────────────────┤
│ TOTAL AUDIT QUALITY GATES      │ 321   │ Strict Zero-Emoji & Material Symbols Standard │
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

## Suite 9: Mobile Applications Ecosystem Checklist (12 Gates)
*Authoritative Reference: [`references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md)*
*Skill: `smart-school-mobile-apps-ecosystem`*

- [x] **Biometric Auth & Token Exchange**: FaceID/TouchID biometrics, RS256 Nimbus JWT exchange, device fingerprint registration.
- [x] **FCM & APNs Push Pipeline**: Real-time push delivery for urgent morning absences, emergency circulars, and fee invoices.
- [x] **Offline-First Cache Engine**: Local SQLite/Room/SwiftData persistence with background queue-and-replay sync on reconnect.
- [x] **Homework Mobile Scanner**: Camera sheet capture with edge detection, perspective transform, and presigned S3 uploads.
- [x] **Mobile CBT Practice Engine**: Autosave to local storage every 15s, anti-cheat screen lock, instant formative answer feedback.
- [x] **Live GPS Bus Telemetry**: MQTT v5.0 / WebSocket telemetry feed, 1km geofenced parent arrival alerts, RFID turnstile logs.
- [x] **Triplicate E-Challan Generator**: Barcode/QR challan generation, bank deposit counter slip camera upload, cashier audit desk.
- [x] **Teacher 1-Tap Classroom Roll-Call**: Single-swipe bulk roll call completed in under 45 seconds with offline support.
- [x] **Algorithmic Paper Generator**: Bloom's taxonomy filtering, automatic marks weighting, and exportable marking schemes.
- [x] **Trustee Financial Recovery Matrix**: Stream-wise collection percentages (Science/Commerce/Arts) and overdue aging telemetry.
- [x] **Trustee Morning Attendance Gauge**: 60-second campus presence telemetry, gender disaggregation curves, faculty vs student.
- [x] **1-Click Sovereign Broadcast Desk**: High-priority emergency broadcast simultaneously dispatching Push, SMS, and Email.

---

## Suite 10: Multi-Institutional Tenant Compatibility Checklist (8 Gates)
*Authoritative Reference: [`references/70_TARGET_ORGANISATIONS_AND_MULTI_INSTITUTION_CLASSIFICATION_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/70_TARGET_ORGANISATIONS_AND_MULTI_INSTITUTION_CLASSIFICATION_SPEC.md)*
*Skill: `smart-school-multi-institutional-classification`*

- [x] **6-Archetype Configuration Engine**: Dynamic adaptation across Schools, Colleges, Govt Bodies, Universities, Institutes, Distance Ed.
- [x] **33-Subtype Policy Adaptation**: Specialized workflows for IEPs, Boarding Hostels, Clinical Rotations, and Law Moot Courts.
- [x] **AWS Multi-Tenant Cloud Topology**: Multi-AZ RDS Aurora PostgreSQL, VPC Peering, ECS/EKS Fargate, CloudFront edge delivery.
- [x] **Multi-Currency & Tax Exemption**: Dual-currency support (USD + KHR/THB/INR), automated educational VAT/GST exemptions.
- [x] **Multi-Campus Sovereign Federation**: Super Admin cross-campus switcher with strict PostgreSQL Row-Level Security isolation.
- [x] **Distance Education High-Volume Scale**: Massive 100,000+ student enrollment handling, regional exam center mapping, postal book tracking.
- [x] **Micro-Batch Modular Tuition Billing**: Flexible punch-card hourly tuition fees, tutor revenue splits, coaching test-series tiers.
- [x] **Govt Direct-Benefit Transfer (DBT)**: State welfare subsidy reconciliations, mid-day meal inventory, and civil service staff rosters.

---

## Suite 11: Integrated Academic Operations Quality Gates (13 Gates)
*Authoritative Reference: [`references/73_INTEGRATED_ACADEMIC_OPERATIONS_AND_CAMPUS_LIFECYCLE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/73_INTEGRATED_ACADEMIC_OPERATIONS_AND_CAMPUS_LIFECYCLE_SPEC.md)*
*Skill: `smart-school-academic-operations-hub`*

- [x] **Online Enrollment Intake Desk**: Multi-step applicant intake wizard, S3 document vault, and dynamic fee calculation.
- [x] **Course, Class & Section Engine**: Course catalogs, grade levels, sections, cohort rosters, stream assignments.
- [x] **Lesson & Syllabus Progress**: Pacing meters, multi-tier curriculum trees, learning objectives, board notes.
- [x] **Clash-Free Timetable Scheduler**: Algorithmic collision detection, room allocations, substitute assignments.
- [x] **Sub-45s Attendance Roll-Call**: Single-swipe classroom roll-call, offline sync, absence alerts.
- [x] **Live GPS Bus Telemetry**: Real-time MQTT/WebSocket coordinates, 1km geofenced parent alerts.
- [x] **Daily Homework Evaluation**: Whiteboard camera scanner, multi-section broadcast, rubric scoring desk.
- [x] **Assignments & Notes Vault**: Categorized study material download hub, offline-cached student downloads.
- [x] **Dynamic Certificates & TCs**: Token interpolation (`[name]`, `[roll_no]`), statutory TC clearance, batch PDF.
- [x] **Circulars & Emergency Blast**: Role-targeted bulletins, mandatory read receipts, 1-click Push/SMS/Email blast.
- [x] **Online CBT & Manual Exam Engine**: Timetable planning, CBT with 15s autosave, anti-cheat lock, instant results.
- [x] **Algorithmic Paper Generator**: Question bank tags, Bloom's taxonomy weights, auto test & answer key compiler.
- [x] **Multi-Persona ID Card Generator**: Student/Staff badges, Visitor passes, dynamic QR/barcodes, PVC print templates.

---

## Suite 12: Master Flow Alignment & Design-Readiness Quality Gates (10 Gates)
*Authoritative Reference: [`references/74_MASTER_FLOW_ALIGNMENT_AND_DESIGN_READINESS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/74_MASTER_FLOW_ALIGNMENT_AND_DESIGN_READINESS_SPEC.md)*

- [x] **Step 01 Foundation & Onboarding Readiness**: Branches, sessions, RBAC, classes, streams mapped to Archetypes A, D, G with full Postgres RLS isolation.
- [x] **Step 02 Admissions & Intake Readiness**: 6-section stepper, encrypted S3 vault, PVC ID badge designer mapped to Archetypes B, E.
- [x] **Step 03 Financial Clearinghouse Readiness**: 4-way fine engine, triplicate e-challan, wire verification desk mapped to Archetypes A, B.
- [x] **Step 04 Academic Logistics Readiness**: 4-col LMS card grid, clash-free Monday-Saturday period matrix mapped to Archetypes B, C.
- [x] **Step 05 Presence & Transit Telemetry Readiness**: Sub-45s roll-call, 1km geofenced bus alert, anti-passback turnstiles mapped to Archetypes B, G.
- [x] **Step 06 Instructional Delivery Readiness**: Lesson trees, pacing meters, camera whiteboard scanner, notes vault mapped to Archetypes B, C.
- [x] **Step 07 High-Stakes Assessments Readiness**: Question bank tags, algorithmic paper compiler, 15s CBT autosave, marksheet canvas mapped to Archetypes B, D, E.
- [x] **Step 08 Auxiliary Campus Logistics Readiness**: Library circulation, transport fleet, hostel menus, canteen RFID mapped to Archetypes A, B.
- [x] **Step 09 Credentials & Alumni Readiness**: Noticeboard bulletins, TC statutory clearance, dynamic merit diplomas mapped to Archetypes B, E.
- [x] **Step 10 Mobile Apps & Executive Telemetry Readiness**: Native viewports, offline cache, executive recovery gauges, AWS multi-AZ topology.

---

## Suite 13: Enterprise Ecosystem, CIS Accreditation & Partner Quality Gates (10 Gates)
*Authoritative Reference: [`references/75_ENTERPRISE_SCHOOL_TYPES_CIS_ACCREDITATION_AND_ECOSYSTEM_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/75_ENTERPRISE_SCHOOL_TYPES_CIS_ACCREDITATION_AND_ECOSYSTEM_SPEC.md)*
*Skill: `smart-school-enterprise-ecosystem-and-accreditation`*

- [x] **4 School Types Architecture**: Multi-branch Groups/Enterprise, Independent Private K-12, International Multi-Curriculum, Virtual/Online K-12.
- [x] **5 Core Departmental Hubs**: Administration (Dept 503), Academics, Human Resources, Finance, and Teaching.
- [x] **Multi-Curriculum SIS Engine**: Simultaneous support for IB (PYP/MYP/DP criteria), Cambridge (A*-G/9-1), American (4.0 GPA/AP), and National frameworks.
- [x] **Embeddable Enrolment Widget**: Self-contained `<school-enrolment-widget>` web component for WordPress, Webflow, and custom school websites.
- [x] **CIS Accreditation & Child Safeguarding**: Role-isolated encrypted pastoral notes, staff background checks, and immutable tamper-evident audit trails.
- [x] **Student Pastoral Care & Wellbeing Desk**: Daily emotional check-ins, counselor consultation records, infirmary logs, and commendation tracking.
- [x] **Omnichannel Communications Desk**: Unified console for push notifications, DLT-compliant SMS, transactional emails, and emergency bulletins.
- [x] **Developers Hub & OpenAPI 3.0 Ecosystem**: Interactive Swagger/OpenAPI documentation, developer API key governance, webhook delivery console, and client SDKs.
- [x] **Identity SSO & Access Federation**: SAML 2.0, OpenID Connect (OIDC), and OAuth2 bridge with Google Workspace and Microsoft Entra ID.
- [x] **University Guidance & Customer Success**: College counseling portal (Common App, UCAS), 15+ interactive help guides, and continuous staff webinars.

---

## Suite 14: Genius Cloud AWS Infrastructure & Enterprise ERP Quality Gates (10 Gates)
*Authoritative Reference: [`references/76_GENIUS_CLOUD_AWS_INFRASTRUCTURE_AND_ENTERPRISE_ERP_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/76_GENIUS_CLOUD_AWS_INFRASTRUCTURE_AND_ENTERPRISE_ERP_SPEC.md)*
*Skill: `smart-school-cloud-infrastructure-and-enterprise-erp`*

- [x] **AWS 8-Tier Infrastructure Availability**: Multi-AZ Fargate App/API, RDS PostgreSQL RLS, S3 Vault, Automated Backup, ALB, and CloudFront CDN.
- [x] **Disaster Recovery & SLA Objectives**: RPO < 5 minutes, RTO < 15 minutes, 99.95% uptime SLA, and cross-region cold standby support.
- [x] **14 Core ERP Modules Architecture**: Complete functional partitioning across Admissions, SIS, Academics, Exams, Attendance, HRM, Finance, Library, Hostel, Transport, Messaging, Inventory, Events, and Canteen/Health.
- [x] **Expanded 42+ Dynamic Role Matrix**: Tier 1-5 RBAC governance with "LOGIN WITH GROUP ADMIN AND INSTITUTE" multi-campus context switching.
- [x] **General Register (GR) Student Lifecycle**: Longitudinal student dossier, GR numbering, bulk updates, student remarks, and alumni tracking.
- [x] **Dynamic Timetable & Faculty Proxy Scheduling**: Algorithmic clash-free schedule generator with 1-click absent teacher proxy allocation and push alerts.
- [x] **Canteen POS & Weekly Meal Engine**: Touchscreen register, student RFID badge billing, weekly nutritional meal calendars, and shift drawer balancing.
- [x] **Multi-Directional Punctuality Telemetry**: Real-time tracking across 8 metrics (Present, Absent, Late-In, Late-Out, Early-In, Early-Out, Leave, Gender Parity).
- [x] **Fleet GPS Telemetry & Bank Reconciliation**: Live sub-5s WebSocket bus stream, 1km geofences, and automated transit fee bank statement matching.
- [x] **Multi-Tier Contract & Procurement Governance**: Template-driven contract generator, digital signature blocks, vendor asset tagging, and reorder alerts.

---

## Suite 15: Genius Cloud Granular Submodules Quality Gates (10 Gates)
*Authoritative Reference: [`references/77_GENIUS_CLOUD_FINANCE_EXAMS_PAYROLL_AND_CAMPUS_OPERATIONS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/77_GENIUS_CLOUD_FINANCE_EXAMS_PAYROLL_AND_CAMPUS_OPERATIONS_SPEC.md)*
*Skill: `smart-school-advanced-finance-exams-and-operations`*

- [x] **Double-Entry General Ledger Balance**: Automatic mathematical equality (`debit == credit`) enforced across all Journal, Cash, and Bank vouchers.
- [x] **Statutory Financial Books Integrity**: Day Book, Cash Book, Bank Book, and GL ledger generation with automated Bank Reconciliation.
- [x] **Fixed Asset Registry & Depreciation**: Comprehensive capital asset tagging with automated straight-line and WDV depreciation schedules.
- [x] **Advance Fee Heads & Concession Profiles**: Management of advance tuition holding accounts, sibling/scholarship discounts, and late fee policies.
- [x] **Deleted Receipt Forensic Auditing**: Immutable audit trail logging user, timestamp, and mandatory justification on any voided fee receipt.
- [x] **Payroll Salary Components & Professional Tax**: Deterministic gross-to-net payroll engine computing state PTax slabs, increments, and festival bonuses.
- [x] **Multi-Board Examination Weightages**: Support for CBSE/CCE (Scholastic & Co-Scholastic indicators) and ICSE (Group I-III 80/20 weightages).
- [x] **Algorithmic Question Paper Generation**: Automated test paper compilation from tagged question banks matching Bloom's taxonomy distributions.
- [x] **Perimeter Gate Late/Early Departure Passes**: Timestamped turnstile gate passes with automated SMS/push alerts for late arrival and authorized early release.
- [x] **Store Procurement & Purchase Orders**: Multi-tier store categorization, departmental requisitions, supplier PO dispatch, and invoice matching.

---

## Suite 16: Cambodia Localized SMS Quality Gates (10 Gates)
*Authoritative Reference: [`references/78_CAMBODIA_EDTECH_ECOSYSTEM_AND_LOCALIZED_SMS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/78_CAMBODIA_EDTECH_ECOSYSTEM_AND_LOCALIZED_SMS_SPEC.md)*
*Skill: `smart-school-cambodia-localized-sms`*

- [x] **Four Cambodian Institutional Tiers**: Full operational support for School (K-12 MoEYS), College (TVET/Undergraduate), Institute (Specialized/Professional), and University (CATS credits).
- [x] **Five-City Distributor Support Network**: Local deployment, SLA compliance, on-site hardware support, and in-person training hubs in Phnom Penh, Siem Reap, Battambang, Sihanoukville, and Kampong Cham.
- [x] **Dual-Currency Accounting Engine**: Seamless multi-currency transactions supporting KHR Riel (`៛`) and USD (`$`) with NBC daily exchange rate synchronization.
- [x] **National Bank of Cambodia Bakong KHQR**: Native EMVCo-compliant QR generation and instant webhook payment settlement with zero transaction fees.
- [x] **Three-Font System Enforcement**: Complete typographic pipeline with Ubuntu (English), Google Sans Khmer (`\u200B` zero word-breakage), and Moul (formal diplomas).
- [x] **MoEYS Ministry Academic Reporting**: Automated generation of official government monthly attendance, grade distributions, and student registration rosters.
- [x] **Sub-45-Second Mobile Roll-Call**: Optimized multi-device responsive attendance grid enabling complete classroom roll-call in under 45 seconds.
- [x] **Multi-Platform Library & Asset Tracking**: Barcode scanning, automated circulation rules, fine ledgering in dual currency, and asset depreciation.
- [x] **Hostel & Fleet Logistics Operations**: Room allocation management, dining hall check-ins, transit route telematics, and perimeter gate integration.
- [x] **Strict Zero-Emoji & Material Symbols Compliance**: 100% adherence to Google Material Symbols Outlined (`wght 500`) with zero emoji characters across all modules.

---

## Suite 17: Cambodia Multi-Tier Campus Lifecycle Quality Gates (10 Gates)
*Authoritative Reference: [`references/79_CAMBODIA_EDTECH_MULTI_TIER_SMS_AND_CAMPUS_LIFECYCLE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/79_CAMBODIA_EDTECH_MULTI_TIER_SMS_AND_CAMPUS_LIFECYCLE_SPEC.md)*
*Skill: `smart-school-cambodia-campus-lifecycle` [P-19]*

- [x] **45-Card Operational Tab Completeness**: Full implementation and route binding across all 45 operational cards (5 tabs x 9 cards).
- [x] **Unauthenticated Guest Student Portal**: Automated tracking PIN generation, credential document uploads, and asynchronous merit review queue.
- [x] **Scholarship & Donor Fund Governance**: Separation of institutional waivers and external donor funds, with automated clawback upon academic withdrawal.
- [x] **Anti-Proxy Biometric Turnstiles**: TCP/IP push ingress for facial/fingerprint verification, broadcasting real-time ingress events to parents.
- [x] **Constraint-Satisfaction Timetable Engine**: Automated room, faculty, and laboratory equipment conflict resolution across multi-campus campuses.
- [x] **Bloom's Cognitive Question Paper Compiler**: Algorithmic test paper generation matching Remembering, Understanding, Applying, Analyzing, and Creating quotas.
- [x] **NSSF & Cambodian Salary Tax Withholding**: Automated compliance with Cambodian National Social Security Fund and progressive salary tax rules.
- [x] **Cashless Canteen POS & RFID Wallet**: Sub-second cafeteria badge debiting, weekly meal plan subscriptions, and cashier drawer balancing.
- [x] **Physical & Virtual PTM Conferencing**: Automated slot reservations preventing teacher double-booking, with integrated WebRTC meeting links.
- [x] **On-Campus Infirmary & Clinic Dossiers**: Student medical encounter logs, prescription tracking, allergy emergency tags, and parent notifications.

---

## Suite 18: Commercial Tiers & Expanded Campus Modules Quality Gates (10 Gates)
*Authoritative Reference: [`references/81_COMMERCIAL_TIERS_FEATURE_GATING_AND_EXPANDED_ENTERPRISE_MODULES_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/81_COMMERCIAL_TIERS_FEATURE_GATING_AND_EXPANDED_ENTERPRISE_MODULES_SPEC.md)*
*Skill: `smart-school-crm-distribution-and-commercial-tiers` [P-20]*

- [x] **TenantEntitlementInterceptor Enforcement**: Hard server-side enforcement returning HTTP 402 Payment Required on features locked for the tenant's commercial tier.
- [x] **Student Quota Hard Stop**: Automated checking on student admissions, raising soft warning at 90% and returning HTTP 403 Forbidden (`STUDENT_QUOTA_EXCEEDED`) upon reaching the tier limit.
- [x] **Multi-Branch Multi-Tenant Isolation**: Hard branch limit enforcement according to subscription tier (1 branch for Starter, 3 for Pro, up to unlimited for Infinity).
- [x] **CRM Inbound Lead Pipeline & Conversion Funnel**: Multi-stage pipeline (Inquiry -> Tour -> Application -> Accepted -> Enrolled) with automated counselor round-robin assignment.
- [x] **Stationery & Study Material Barcode Clearance**: Student fee clearance verification before releasing curriculum book packs or uniforms at the dispensary counter.
- [x] **Uniform Sizing & Replenishment Thresholds**: Automated reorder level warnings and size variant inventory reconciliation across student cohorts.
- [x] **Multilingual Campus Newsletters**: Multi-column responsive layout engine supporting Khmer and English, with editorial approval and multi-channel dispatch (email, mobile push, web).
- [x] **Continuous WAL Archiving & PITR**: Point-in-Time Recovery up to 35 days with RPO < 5 minutes for database management services.
- [x] **Bulk Tenant Data Vault Export**: Encrypted on-demand export of tenant schemas and documents into a downloadable ZIP archive containing CSV/JSON files.
- [x] **White-Labeling & Custom Domain Routing**: Custom SSL certificate provisioning, CNAME binding, and tenant-branded CSS theme injection for higher tiers.

---

## Suite 19: Navigation Slugs, Apps Suite & Predictive Risk Intelligence Quality Gates (10 Gates)
*Authoritative Reference: [`references/82_NAVIGATION_SLUGS_APPS_SUITE_AND_PREDICTIVE_RISK_MATRIX_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/82_NAVIGATION_SLUGS_APPS_SUITE_AND_PREDICTIVE_RISK_MATRIX_SPEC.md)*

- [x] **Multi-Role Dashboard Slug Routing (`/dashboard/{role}`)**: Verification of distinct routes (`/dashboard/admin`, `/dashboard/teacher`, `/dashboard/student`, `/dashboard/parent`) with role-specific KPI telemetry and context switcher.
- [x] **WebRTC Voice & Video Conferencing Engine (`/apps/call`)**: Sub-second call initiation, peer-to-peer/SFU audio-video pipelines, participant roster, screen share, and session recording hooks.
- [x] **Institutional Webmail Client (`/apps/email`)**: Integration with school domain IMAP/SMTP/OAuth, threaded email viewer, rich-text composer, and attachment linking to cloud storage.
- [x] **Task & To-Do Checklist Engine (`/apps/todo`)**: Task priority classification (`LOW`, `MEDIUM`, `HIGH`, `URGENT`), assignment delegation, checklist progress percentage, and automated deadline reminders.
- [x] **Rich-Text Notes Scratchpad (`/apps/notes`)**: Real-time cloud note editing with markdown/WYSIWYG support, color categorization, sticky pins, and student/department tagging.
- [x] **Cloud File Manager & Document Vault (`/apps/file-manager`)**: Multi-tenant folder hierarchies, role-based access control (RBAC), inline previews for PDFs/images/video, and temporary secure link sharing.
- [x] **Legal Guardian Entity Decoupling (`/people/guardians`)**: Separation of legal guardians and emergency contacts from primary billing parents, complete with custody legal documents, photo verification, and 15-minute OTP pickup codes.
- [x] **Student Performance Risk Matrix (2D Scatter)**: Cross-referencing longitudinal attendance rate against cumulative academic score, categorizing students into Star Zone, Low Risk, Medium Risk, and High Risk tiers.
- [x] **Active Academic Intervention Plan Engine**: Automated workflow for students falling into the High Risk quadrant, assigning counselors, remedial targets, progress reviews, and parent sign-offs.
- [x] **Global Spotlight Command Ingress (`Cmd + K`) & Speed Actions**: Keyboard-driven modal search indexed across students, staff, invoices, and circulars, paired with speed action triggers (`+ New Admission`, `Collect Fees`, `Report`).

---

## Suite 20: List/Grid Views, Role Dossiers & Composable Filters Quality Gates (10 Gates)
*Authoritative Reference: [`references/83_LIST_GRID_VIEWS_ROLE_DOSSIERS_AND_MULTI_FACETED_FILTER_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/83_LIST_GRID_VIEWS_ROLE_DOSSIERS_AND_MULTI_FACETED_FILTER_SPEC.md)*

- [x] **Universal List/Grid Dual-View Engine**: Runtime switching between high-density tabular DataGrid and visual glass cards across all master directories with persisted user preference.
- [x] **View Density Mode Controls**: User-selectable display density (Compact 32px, Comfortable 48px, Relaxed 64px) with responsive typography and badge adjustments.
- [x] **Contextual Mass Action Bar**: Floating bulk operational toolbar (Export CSV/Excel/PDF, Bulk ID Print, Batch Invoicing, Mass Status Update) triggered upon multi-record selection.
- [x] **Polymorphic Student 360° Dossier**: Comprehensive 8-tab operational view (Demographics, Transcripts, Attendance Timeline, Fee Ledger, Clinic Log, Bus Telemetry, Custody/Guardians, Documents).
- [x] **Polymorphic Teacher 360° Dossier**: Comprehensive 6-tab operational view (Faculty Profile, Subject Workload, Timetable Matrix, Lesson Pacing Meters, Leaves/Biometrics, Payroll).
- [x] **Polymorphic Parent/Guardian 360° Dossier**: Multi-child switcher, legal custody documentation, dynamic 15-minute OTP pickup generator, and fee ledger status.
- [x] **Multi-Parametric Faceted Filter Engine**: Composable filter bar with cascading dropdowns, date-range presets, status pills, and instant debounced search.
- [x] **URL State Parameter Synchronization**: Bi-directional reflection of all active filter parameters and view modes in the browser URL query string.
- [x] **Collision-Free Class Routine Engine**: Granular daily bell schedules, period slot assignments, and automated validation preventing teacher, room, or lab double-booking.
- [x] **Automated Event-Driven Alert Dispatcher**: Background chron and event dispatcher managing fee due dates (T-7, T-1), upcoming exams, library overdue fines, and circular dispatches.

---

## Suite 21: Authentication, Lock Screen & System Utilities Quality Gates (10 Gates)
*Authoritative Reference: [`references/84_AUTHENTICATION_LOCK_SCREEN_MAINTENANCE_AND_SYSTEM_UTILITIES_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/84_AUTHENTICATION_LOCK_SCREEN_MAINTENANCE_AND_SYSTEM_UTILITIES_SPEC.md)*

- [x] **Multi-Tenant Ingress & Rate-Limiting**: Resolution by subdomain/branch, 5-consecutive failed attempt brute-force lockout for 15 minutes, and conditional 2FA TOTP prompt.
- [x] **Self-Service Multi-Step Onboarding (`/auth/signup`)**: Automated phone/email OTP verification, real-time national ID duplicate prevention, and branch assignment.
- [x] **Cryptographic Password Recovery (`/auth/forgot-password`)**: Single-use HMAC-SHA256 reset token with strict 15-minute TTL, rate-limited to 3 requests per hour.
- [x] **Password Complexity & History Exclusion (`/auth/reset-password`)**: Enforcing zxcvbn score >= 3, blocking the user's previous 5 password hashes, and revoking all active sessions.
- [x] **Idle Session Lock Screen Engine (`/auth/lock-screen`)**: Automated 15-minute idle lock, encrypting current form state into sessionStorage, and restoring active tabs upon PIN/biometric unlock.
- [x] **Hard Session Expiration Timeout**: Complete session termination and redirect to `/auth/signin` after 4 continuous hours of lock-screen state.
- [x] **Scheduled Maintenance Interceptor (`/maintenance`)**: Gateway middleware returning HTTP 503 Service Unavailable, displaying live countdown ETA, and auto-reloading via health check polling.
- [x] **Pre-Launch Feature Teaser & Countdown (`/coming-soon`)**: Precision release countdown timer with role-based feature waitlist subscription and push notification trigger.
- [x] **Intelligent Error 404 Route Prediction (`/errors/404`)**: Levenshtein distance calculation suggesting valid route destinations, search bar, and fallback button to dashboard.
- [x] **Incident-Tracked Error 500 Diagnostics (`/errors/500`)**: RFC 7807 compliant problem details, unique `X-Correlation-ID` tracking, 1-click retry, and automated IT helpdesk ticketing.

---

## Suite 22: Student Pocket Money, Facility Ticketing & RTL Dual-Theme Quality Gates (10 Gates)
*Authoritative Reference: [`references/85_STUDENT_POCKET_MONEY_FACILITY_TICKETING_AND_RTL_THEME_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/85_STUDENT_POCKET_MONEY_FACILITY_TICKETING_AND_RTL_THEME_SPEC.md)*

- [x] **Student Cashless Pocket Money Wallet (`/hostel/pocket-money`)**: Closed-loop digital wallet linked to student RFID/barcode card with dual-currency (USD/KHR) balance management.
- [x] **Parent Allowance Top-Up & Spending Limits**: Parent portal funding via Bakong KHQR/Card, daily transaction caps, category restrictions, and sub-20% low-balance alerts.
- [x] **Merchant Terminal Tap-to-Pay POS**: Sub-second debiting at canteen, stationery store, uniform dispensary, and campus laundry checkouts.
- [x] **Campus Facility Maintenance Trouble-Ticketing (`/facilities/maintenance-tickets`)**: Multi-role infrastructure issue reporting (HVAC, plumbing, electrical) with building/room location pinning.
- [x] **Photo Evidence & Work Order Dispatch**: S3 photo attachment for defect proof, automated technician assignment, and SLA turnaround timer.
- [x] **Resolution Photographic Sign-Off**: Mandatory upload of post-repair photo proof by assigned technician prior to ticket closure.
- [x] **Native Bidirectional RTL Layout Engine**: Dynamic `dir="rtl"` layout mirroring for Arabic, Hebrew, and Persian scripts across navigation, breadcrumbs, tables, and forms.
- [x] **Numerical & Code LTR Preservation**: Guaranteeing that math equations, phone numbers, currency codes, and barcodes remain formatted LTR in RTL mode.
- [x] **Dual-Theme Liquid Glass Palette (Dark & Light)**: Zero emoji, zero neon gradients, strict enforcement of frosted white/slate canvas with 360-degree specular rims across both display modes.
- [x] **Cross-Platform Universal Mobile Ingress**: Deep-linking pipeline (`smartschool://`), universal APNs/FCM push dispatch, and multi-tenant QR onboarding across native iOS and Android clients.

---

## Suite 23: SIMS, EMIS, QR Identity & Multi-Stakeholder Mobile Quality Gates (10 Gates)
*Authoritative Reference: [`references/86_SIMS_EMIS_AND_STAKEHOLDER_MOBILE_ECOSYSTEM_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/86_SIMS_EMIS_AND_STAKEHOLDER_MOBILE_ECOSYSTEM_SPEC.md)*

- [x] **Dynamic QR Profile Scan & Verification Gateway (`/security/qr-scanner`)**: Cryptographic TOTP/HMAC rotation every 30 seconds with sub-250ms optical scan latency and local SQLite offline cache fallback.
- [x] **Authorized Dismissal & Safe Student Pickup Verification (`/security/student-pickup`)**: Biometric/photo match of picking guardian, legal custody restriction alerts, classroom WebSocket callout, and instant parent departure push alerts.
- [x] **Ambient Wireless Presence Ingress (`/attendance/wireless`)**: Classroom BLE beacon signal RSSI proximity capture (threshold > -72 dBm) with 10-minute continuous dwell validation.
- [x] **Enterprise Wi-Fi AP Association Telemetry**: Automated roll-call correlation with 802.1X RADIUS syslog streams and dual-device proxy spoofing detection.
- [x] **Statutory EMIS Census & Ministry Aggregator (`/reports/emis`)**: UNESCO / MoEYS educational indicator engine computing GER, NER, STR, SCR, and standardized XML/CSV census exports.
- [x] **Longitudinal Student Lifecycle Dossier**: Unbroken historical tracing from inquiry, admission, stream allocation, term marksheets, health encounters, to graduation and alumni tracking.
- [x] **Automated Dropout Early-Warning Matrix (`/students/dropout-prevention`)**: Multi-variable heuristics correlating attendance < 80%, GPA drops > 15%, fee defaults, and behavioral incidents triggering Active Intervention Plans.
- [x] **Classroom Collaboration & Group Project Workspaces (`/academics/group-projects`)**: Multi-role team formation, sequential milestone trackers, deliverable document vault, and dual-layer collective/individual rubric grading.
- [x] **Centralized Digital Learning Resource Repository (`/academics/learning-resources`)**: Syllabus-tagged lecture video HLS streaming, DRM reading packets with print-disable flags, and video completion % telemetry.
- [x] **Stakeholder Persona Mobile Routing & Deep Linking**: Standardized deep link matrix (`smartschool://`) routing 12 student/parent subsystems and 10 teacher faculty subsystems with offline SQLite sync.

---

## Suite 24: Class Notes Whiteboard Sync, Location Entry & Student Tracking Quality Gates (10 Gates)
*Authoritative Reference: [`references/87_MOBILE_APP_CLASS_NOTES_SYNC_LOCATION_ENTRY_AND_STUDENT_TRACKING_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/87_MOBILE_APP_CLASS_NOTES_SYNC_LOCATION_ENTRY_AND_STUDENT_TRACKING_SPEC.md)*

- [x] **Classroom Whiteboard Camera Sync (`/academics/class-notes-sync`)**: Mobile camera capture with quad-point perspective transformation, contrast binarization, and lesson-topic indexing.
- [x] **Full-Text OCR Lecture Keyword Search**: Automated optical character recognition extracting board text into searchable PostgreSQL indexes.
- [x] **Campus Zoned Location Checkpoints (`/facilities/location-entries`)**: Role-differentiated physical location check-ins across 9 campus zones with access validation rules.
- [x] **Real-Time Zone Occupancy & Night Curfew Roll-Call**: Live headcount tracking per zone and automated curfew roll-call for residential student dormitories.
- [x] **Touch/Stylus Homework Annotation Canvas (`/academics/homework-evaluations`)**: Native digital pen/stylus markup overlay on student image and PDF submissions.
- [x] **Evaluator Voice Memo Feedback**: Web Audio recording up to 60 seconds of teacher voice feedback linked to homework submissions.
- [x] **Dynamic Toggled Timetable Switcher (`/academics/toggled-timetable`)**: Single-tap switching between 6 schedule modes (Regular, Surprise Test, Half-Day, Exam Block, Rainy Day, Virtual).
- [x] **Automated Teacher Substitution (Proxy Dispatch)**: Algorithmic substitute matching based on subject relevance and free period workload balance.
- [x] **Holistic 360° Student Development Radar (`/students/tracking-trajectory`)**: Longitudinal tracking combining cognitive GPA, behavioral conduct, and co-curricular achievements.
- [x] **Multi-Channel In-App Chat Boxes (`/apps/chat-boxes`)**: Dedicated messaging channels with teacher quiet hours, broadcast announcements, and student moderation.

---

## Suite 25: Google Material Design 3 Web & Design Token Quality Gates (10 Gates)
*Authoritative Reference: [`references/88_GOOGLE_MATERIAL_DESIGN_3_WEB_AND_TOKEN_SYSTEM_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/88_GOOGLE_MATERIAL_DESIGN_3_WEB_AND_TOKEN_SYSTEM_SPEC.md)*

- [x] **Three-Tier Token Architecture Enforcement**: Strict decoupling of reference literals (`--md-ref-*`), semantic system roles (`--md-sys-*`), and component properties (`--md-<comp>-*`).
- [x] **Perceptual HCT Color Science & Contrast**: Tone difference delta >= 50 for WCAG AA (4.5:1) compliance and delta >= 40 for large text (3.0:1) across all 30+ semantic color roles.
- [x] **Six-Level Tonal Surface Elevation**: Level 0 to 5 elevation mapping combining subtle shadows and dynamic primary surface tint overlays for light and dark themes.
- [x] **Fifteen-Scale Typographic Matrix**: Full fidelity across Display, Headline, Title, Body, and Label roles with standardized rem sizes, line heights, and tracking.
- [x] **Seven-Scale Corner Radii & Bi-Directional RTL**: Logical shape properties (`border-start-start-radius`) supporting automatic mirroring in Arabic and RTL scripts.
- [x] **Sixteen-Duration Motion System & Curves**: Quantized transition durations (50ms to 1000ms) with Emphasized and Standard cubic-bezier acceleration/deceleration curves.
- [x] **Content-Independent State Layer Opacities**: Interaction overlay opacities calibrated to Hover (8%), Focus (12%), Pressed (12%), and Dragged (16%).
- [x] **Material Web Lit Custom Elements Suite**: Web components (`<md-filled-button>`, `<md-dialog>`, `<md-checkbox>`, `<md-switch>`, `<md-tabs>`) with Shadow DOM encapsulation.
- [x] **Accessible Focus Ring & Ink Ripple**: Standalone `<md-focus-ring>` activating exclusively on keyboard `:focus-visible` and `<md-ripple>` tracking touch/pointer coordinates.
- [x] **Adaptive Window Size Classes**: Fluid responsive layouts dynamically conforming to Compact (<600dp), Medium (600-839dp), Expanded (840-1199dp), Large (1200-1599dp), and Extra-Large (>=1600dp).

---

## Suite 26: Material Components Web Catalog, ESM Ingress & Component Quality Gates (10 Gates)
*Authoritative Reference: [`references/89_MATERIAL_COMPONENTS_WEB_CATALOG_AND_DEVELOPER_GUIDE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/89_MATERIAL_COMPONENTS_WEB_CATALOG_AND_DEVELOPER_GUIDE_SPEC.md)*

- [x] **Interactive Component Showcase Sandbox (`/design-system/catalog`)**: Live parameter toggling, state mutations, and real-time DOM preview.
- [x] **Live Code Snippet & Token Generator**: Instant copy-paste generation of HTML markup, ESM imports, and CSS token overrides.
- [x] **Lit Custom Element Registration & Shadow DOM Encapsulation**: Strict isolation of component internals with CSS custom property penetration.
- [x] **Zero-Build Import Map Integration**: Native browser `<script type="importmap">` resolving `@material/web/` without node build step.
- [x] **Production Bundler Tree-Shaking & Sub-50kB Chunk Optimization**: Rollup/Vite bare-specifier resolution producing lean production artifacts.
- [x] **Polymorphic Slot Projection**: Multi-slot support (`leading-icon`, `headline`, `supporting-text`, `trailing-icon`, `actions`) across all catalog elements.
- [x] **Form-Associated Custom Element Internals (`ElementInternals`)**: Native form submit, reset, validation constraint API compatibility.
- [x] **Accessible Event Lifecycle Handshake**: Predictable event dispatching (`opening`, `opened`, `closing`, `closed`, `change`, `input`) with keyboard focus management.
- [x] **Visual Feedback Indicators & Discrete Slider Precision**: Four-color circular/linear progress bars and tick-marked dual-thumb sliders.
- [x] **Assist, Filter, Input & Suggestion Chip Sets**: Multi-select filtering, input tokenization, leading icons, and trailing removal actions.

---

## Suite 27: Google Material Design 3 (M3) Component Architecture Quality Gates (10 Gates)
*Authoritative Reference: [`references/90_MATERIAL_DESIGN_3_COMPONENTS_SPECIFICATION_AND_TAXONOMY.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/90_MATERIAL_DESIGN_3_COMPONENTS_SPECIFICATION_AND_TAXONOMY.md)*

- [x] **Segmented Button Single/Multi-Select Engine (`/design-system/segmented-buttons`)**: Pill container with animated checkmarks, equal-width flex distribution, and outer corner rounding.
- [x] **Extended FAB Scroll Collapse Automation (`/design-system/fab`)**: Dynamically collapsing from icon+label 56dp container into 56dp icon-only FAB on list scrolling.
- [x] **Adaptive Small Dot & Large Numeric Badge Telemetry (`/design-system/badges`)**: 6dp unread dot indicator and 16dp pill counter badge (1 to 999+) with offset positioning.
- [x] **Rich Multi-Line Interactive Tooltip System (`/design-system/tooltips`)**: Persistent information cards featuring headline, body copy, and interactive action buttons.
- [x] **Modal Bottom Sheet to Co-Planar Side Sheet Adaptation (`/design-system/sheets`)**: Gesture-driven bottom sheet with drag handle on mobile reflowing to 360-400dp side sheet on tablet/desktop.
- [x] **Horizontal Multi-Browse & Hero Carousel Dynamics (`/design-system/carousel`)**: CSS scroll-snap carousel with edge peek clipping and dynamic item width scaling.
- [x] **Search Bar to Full-Screen Search View Ingress (`/design-system/search`)**: Pill search bar expanding via Emphasized motion into a full-screen overlay with search history and filter chips.
- [x] **Adaptive Navigation Bar to Navigation Rail Transformation (`/design-system/navigation`)**: 3-5 destination bottom bar on mobile (<600dp) reflowing into an 80dp compact Navigation Rail on tablets/desktop.
- [x] **Scroll-Linked Collapsible Top App Bar Hierarchy (`/design-system/top-app-bar`)**: Large 152dp and Medium 112dp headers collapsing into 64dp compact bars during vertical scroll with surface tinting.
- [x] **Dual-Mode Calendar Date Picker & Clock Dial Time Picker (`/design-system/pickers`)**: Date range selection band, pencil input mode toggle, circular 12/24h analog clock dial, and dual-box digital time inputs.

---

## 3. Grand Verification Protocol & Conformance Sign-Off

- [x] **Zero Emoji Enforcement**: Certified 100% compliant across all 341 checklist items and documentation.
- [x] **Three-Font System**: Ubuntu (English), Google Sans (Khmer UI), Moul (Diplomas).
- [x] **Google Material Symbols Outlined**: Uniform optical weight `500` applied.
- [x] **Multi-Tenant Isolation**: PostgreSQL kernel RLS enforced across all 7 microservices and 33 institutional subtypes.





