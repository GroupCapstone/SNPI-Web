---
name: smart-school-webapp-patterns
description: Authoritative Screen Patterns, Architectural Layouts, and Design Checklists for all 32 Core Web Application Screens in the Smart School Enterprise Platform. Enforces strict Liquid Glass UI standards, Zero Emoji policy, Google Material Symbols Outlined (wght 500), and robust backend security across Admin, Dashboards, Commerce, Collaboration, and Identity patterns.
---

# Web Application Screen Patterns & Design Checklist Standard
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Architectural Scope

This specification establishes the authoritative **Screen Patterns, Layout Architectures, and Design Quality Checklists** across all thirty-two (32) core enterprise web application screens in the Smart School ecosystem.

Every pattern is calibrated to the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`) and strictly enforces:
- **Strict Zero-Emoji Policy**: Pure typographic hierarchy and solid Google Material Symbols Outlined (`wght: 500`).
- **Tactile Brutalist-Glass Physics**: Frosted glass containers (`backdrop-blur-xl`), 360-degree specular highlights (`border-t-white/95`), and hard offset elevation shadows (`shadow-[0_8px_0_0_rgba(15,23,42,0.06)]`).
- **Three-Font Standard**: English in **Ubuntu**, Khmer UI in **Google Sans**, and Ceremonial Khmer in **Moul**.
- **PostgreSQL Row-Level Security (RLS)**: Enforces tenant isolation across all screens using `branch_id = current_setting('app.current_branch_id')`.

---

## 1. Master Web App Patterns Taxonomy (32 Core Patterns)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        32 CORE WEB APP SCREEN PATTERNS                                 │
├────────────────────────────────┬───────────────────────────────────────────────────────┤
│ Domain Category                │ Pattern Checklist & Functional Scope                  │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 1. Identity, Access & Auth     │ • Login: Brutalist glass card, multi-branch selector  │
│                                │ • 2FA: TOTP authenticator, SMS backup, recovery keys  │
│                                │ • Account: Personal profile, avatar, connected devices│
│                                │ • Onboarding: Setup wizard, demo seeder, checklist    │
│                                │ • Dashboard: Role executive KPI grid, charts, feed    │
│                                │ • Search (Cmd+K): Spotlight command palette, shortcuts│
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 2. Administration & Governance │ • Admin Panel: District switches, RLS bypass control  │
│                                │ • User Management: 8-Role directory, invite modals    │
│                                │ • API Keys: Webhook & REST tokens, scopes, revocation │
│                                │ • Audit Log: Tamper-evident admin ledger, before/after│
│                                │ • Version History: Document/marksheet rollback & diff │
│                                │ • Maintenance: Scheduled downtime, read-only banner   │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 3. Data Grids & Complex Views  │ • Data Table: Virtualized grid, pinning, bulk actions │
│                                │ • Single Item Detail: 360-degree student/staff dossier│
│                                │ • Search Results: Faceted filters sidebar, highlights │
│                                │ • Empty State: Frosted card, illustration, action CTA │
│                                │ • Timeline / Gantt: Exam timetables, term schedules   │
│                                │ • Kanban Board: Incident tracking, maintenance tickets│
│                                │ • Multi-Step Form: Wizard stepper, autosave draft bar │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 4. Commerce & Analytics        │ • Pricing: Tuition packages, fee schedule matrix      │
│                                │ • Checkout: POS cashier & online gateway iframe       │
│                                │ • Billing: Invoices, payment ledgers, tax receipts    │
│                                │ • Report View: Tabular BI report generator, exports   │
│                                │ • Analytics: Retention graphs, fee velocity, heatmaps │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 5. Collaboration & Preferences │ • Settings: Campus configuration, academic year, brand│
│                                │ • Notification Settings: Email/SMS toggles, quiet hrs │
│                                │ • Notifications Feed: Header drawer, unread badges    │
│                                │ • Chat: Real-time messaging, channels, attachments   │
│                                │ • Comments: Threaded homework reviews, staff remarks  │
│                                │ • Public Profile: Verified credentials, certificates  │
│                                │ • Integrations: GMeet, Zoom, Stripe, Biometric relays │
│                                │ • Help Center: Searchable knowledgebase, FAQ accordion│
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

---

## 2. Category-by-Category Pattern Specifications

---

### Category 1: Identity, Access & Navigation

#### Pattern 01: Login (`Login`)
- **Visual Design**: Centered Liquid Glass card (`max-w-md w-full bg-white/85 backdrop-blur-2xl border border-white/70 shadow-2xl p-8 rounded-3xl`).
- **Anatomy**:
  - School Crest / Logo placeholder (`src/config/brand.ts`).
  - Institutional Branch Selector dropdown (Multi-branch campus selection).
  - Username / Email field with `person` symbol.
  - Password field with show/hide toggle (`visibility` / `visibility_off`).
  - Remember Me checkbox (`@radix-ui/react-checkbox`) and `Forgot Password?` link.
  - Solid purple submit CTA: `Sign In to Portal` (`login` icon).
  - Footer with Institutional Support contact and encrypted TLS 1.3 badge.

#### Pattern 02: Two-Factor Authentication (`2FA`)
- **Visual Design**: Compact Liquid Glass security modal.
- **Anatomy**:
  - Primary Method: 6-digit TOTP input array for Google Authenticator / Microsoft Authenticator.
  - Fallback Link: "Verify via SMS OTP" or "Use Backup Recovery Code".
  - Emergency Recovery Dialog: Modal to enter 16-character alphanumeric recovery key.
  - Security Disclaimer: "Never share your 2FA code with school staff or administrators."

#### Pattern 03: Account Profile (`Account`)
- **Visual Design**: 2-Column responsive Liquid Glass layout.
- **Anatomy**:
  - Left Panel: Squircle avatar (`rounded-2xl`) with upload trigger (`photo_camera`), active role badge, and password change trigger.
  - Right Panel: Editable personal information (Full Name, Contact Email, Phone Number, Residential Address, National ID).
  - Active Sessions Ledger: Lists currently active browser logins with device type, IP address, location, and `Revoke Session` trigger (`logout`).

#### Pattern 04: Onboarding & Setup Wizard (`Onboarding`)
- **Visual Design**: Multi-stage guided modal or dedicated full-canvas walkthrough.
- **Anatomy**:
  - Progress Stepper: 1. Institutional Profile -> 2. Classes & Sections -> 3. Grading Model -> 4. Demo Data Seeding.
  - 1-Click Demo Data Button: Seeds 50 students, 10 staff, and sample fees for rapid testing.
  - Welcome Banner with video tour or step-by-step documentation link.

#### Pattern 05: Executive Dashboard (`Dashboard`)
- **Visual Design**: High-density 12-column Liquid Glass grid.
- **Anatomy**:
  - Top Metrics Row: 4 Metric Cards with hard shadows: Total Students, Staff Attendance %, Monthly Fee Collection, Active Alerts.
  - Main Visual Charts: Recharts SVG graphs for Weekly Attendance Trends and Income vs. Expense.
  - Quick Actions Bar: Direct shortcuts (`+ Add Student`, `Collect Fees`, `Take Attendance`, `Issue Book`).
  - Real-Time Activity Feed: Recent admissions, visitor check-ins, and fee receipts.

#### Pattern 06: Universal Spotlight Search (`Search checklists...`)
- **Visual Design**: Centered floating command palette (`Cmd+K` / `Ctrl+K`) overlaying blurred backdrop.
- **Anatomy**:
  - Search input with live debounced filtering.
  - Grouped results: `Modules (34)`, `Students (5,000+)`, `Staff Directory`, `System Settings`.
  - Keyboard hint tags (`Tab` to select, `Enter` to open, `Esc` to close).

---

### Category 2: Administration, Governance & Security

#### Pattern 07: Admin Panel (`Admin Panel`)
- **Visual Design**: Full-width administration cockpit reserved for `SUPER_ADMIN` and `CAMPUS_ADMIN`.
- **Anatomy**:
  - Branch Switcher & Multi-Campus Federation Selector.
  - RLS Security Status Indicator (`app.bypass_rls` toggle with confirmation lock).
  - Academic Session Rollover Launcher (`2025-26` -> `2026-27`).
  - System Health telemetry (Database latency, Redis cache hit ratio, Kafka lag).

#### Pattern 08: User Management (`User Management`)
- **Visual Design**: Enterprise data table with 8-role segmented filter pills.
- **Anatomy**:
  - Role Tabs: `All`, `Admins`, `Teachers`, `Accountants`, `Librarians`, `Students`, `Parents`.
  - User Status Indicators: `ACTIVE` (Emerald), `SUSPENDED` (Amber), `DISABLED` (Rose).
  - Action Suite: Edit Permissions, Reset Password Link, Deactivate Account, Impersonate User.

#### Pattern 09: API Keys & Webhooks (`API Keys`)
- **Visual Design**: Developer portal card within System Settings.
- **Anatomy**:
  - Active Keys Ledger: Token Name, Masked Key (`sk_live_...9a8f`), Permissions Scope, Created Date, Last Used.
  - `+ Generate New Key` Modal: Scope selection (`READ_STUDENTS`, `WRITE_FEES`), expiration timer.
  - Webhook Subscriptions: Endpoint URL configuration for Kafka CloudEvents.

#### Pattern 10: Audit Log (`Audit Log`)
- **Visual Design**: Tamper-evident immutable ledger table.
- **Anatomy**:
  - Timestamp, Actor ID, Role, Client IP Address, Action Type (`INSERT`, `UPDATE`, `DELETE`).
  - Entity Affected (`students/18001`, `fee_master/902`).
  - Visual JSON Diff Viewer: Side-by-side Before and After payload inspector.

#### Pattern 11: Version History (`Version History`)
- **Visual Design**: Drawer or modal displaying chronologically sorted revision tree.
- **Anatomy**:
  - Revision list with author squircle avatar, timestamp, and summary note.
  - `Rollback to this Version` button with destructive confirmation warning.

#### Pattern 12: Maintenance Mode (`Maintenance`)
- **Visual Design**: Full-canvas centered Liquid Glass downtime screen.
- **Anatomy**:
  - Hardware maintenance illustration with `construction` symbol.
  - Downtime Announcement: "Database maintenance in progress. Expected return: 02:00 AM."
  - Emergency Admin Bypass login trigger.

---

### Category 3: Data Grids & Complex Operations

#### Pattern 13: Enterprise Data Table (`Data Table`)
- **Visual Design**: Headless **TanStack Table v8** in frosted white card.
- **Anatomy**:
  - Sticky glass header, column sorting glyphs, column reordering, column visibility dropdown.
  - Row selection checkboxes with floating bulk action bar (`Export Selected`, `Bulk Delete`).
  - Virtualized row scrolling supporting 5,000+ records at 60 FPS.

#### Pattern 14: Single Item Detail Dossier (`Single Item Detail`)
- **Visual Design**: 360-degree comprehensive entity profile (e.g. Student 360 Dossier).
- **Anatomy**:
  - Header Banner: Squircle photo, Full Name, Admission No, Class/Section, Status Badge.
  - Tabbed Subsystems: `Profile & Demographics`, `Academic History`, `Fee Ledger`, `Attendance Record`, `Exam Marksheets`, `Uploaded Documents Vault`.

#### Pattern 15: Search Results Page (`Search Results`)
- **Visual Design**: Left facet filter sidebar + Right results ledger.
- **Anatomy**:
  - Search query summary: "Found 48 results for 'Mathematics Class 1'".
  - Sidebar filters: Subject, Grade Level, Price Range, Availability.
  - Highlighted search query terms in titles and descriptions.

#### Pattern 16: Empty State (`Empty State`)
- **Visual Design**: Centered Liquid Glass card for zero-data views.
- **Anatomy**:
  - Clean vector graphic / Material Symbol (`inbox`, `folder_off`, `search_off`).
  - Clear heading: "No Books Added to Library Yet".
  - Actionable guidance copy: "Begin by accessioning your first title or importing via CSV."
  - Primary CTA button: `+ Add Book`.

#### Pattern 17: Timeline & Gantt View (`Timeline / Gantt View`)
- **Visual Design**: Horizontal scrolling calendar timeline.
- **Anatomy**:
  - Academic Term Timeline, Examination Timetable, and Lesson Syllabus Planner.
  - Drag-and-drop schedule blocks with conflict collision detection.

#### Pattern 18: Kanban Board (`Kanban board`)
- **Visual Design**: Multi-column board for Student Behavior Incidents, Maintenance Support Tickets, and Task Tracking.
- **Anatomy**:
  - Columns: `Reported`, `Under Investigation`, `Disciplinary Action`, `Resolved`.
  - Draggable Liquid Glass ticket cards with priority pills and assigned faculty avatars.

#### Pattern 19: Multi-Step Form Wizard (`Multi-step form`)
- **Visual Design**: Card with top visual Stepper for complex admissions.
- **Anatomy**:
  - Sticky bottom action bar: `Previous Step`, `Save as Draft`, `Next Step`.
  - Automated client validation per step before advancement is allowed.

---

### Category 4: Commerce, Billing & Business Intelligence

#### Pattern 20: Pricing & Fee Structure (`Pricing`)
- **Visual Design**: Multi-tier comparison matrix for School Fees & Tuition Packages.
- **Anatomy**:
  - Tier Cards (e.g. `Primary Wing`, `Middle Wing`, `Senior Secondary`).
  - Line-item breakdown of Tuition, Lab Fees, Library, and Sports.
  - Annual vs. Termly billing toggle.

#### Pattern 21: Checkout Desk (`Checkout`)
- **Visual Design**: POS Cashier & Online Payment Gateway Ingress.
- **Anatomy**:
  - Left: Invoice fee items ledger with promo code injector.
  - Right: Payment Method selector (`Cash Counter`, `Credit/Debit Card`, `Bank Transfer`).
  - Thermal Receipt generation trigger.

#### Pattern 22: Billing & Ledger Management (`Billing`)
- **Visual Design**: Comprehensive student fee account ledger.
- **Anatomy**:
  - Outstanding dues summary, payment history table, receipt download links, and concession badges.

#### Pattern 23: Report View & BI Exporter (`Report View`)
- **Visual Design**: High-throughput reporting engine across all 34 modules.
- **Anatomy**:
  - Filter criteria box (Date range, Class, Section, Gender).
  - Export toolbar: `Copy`, `Excel`, `CSV`, `PDF`, `Print`.

#### Pattern 24: Analytics & Insights Dashboard (`Analytics`)
- **Visual Design**: Visual Business Intelligence dashboard.
- **Anatomy**:
  - Student Retention graphs, Fee Collection Velocity, Attendance Heatmap by weekday, and Examination Grade Bell Curves.

---

### Category 5: Collaboration, Communications & Preferences

#### Pattern 25: Settings (`Settings`)
- **Visual Design**: Vertical tabbed navigation layout.
- **Anatomy**:
  - Tabs: `General School Profile`, `Session Rollover`, `Branding & Logo`, `SMS/Email Gateways`, `Payment Credentials`.
  - Sticky `Save Changes` bar upon form alteration.

#### Pattern 26: Notification Settings (`Notification Settings`)
- **Visual Design**: Granular matrix of toggle switches.
- **Anatomy**:
  - Notification channels (In-App Push, SMS, Email, WhatsApp) mapped across event types (Absence, Fee Due, Exam Marksheet Published, Emergency).
  - Quiet Hours scheduler to prevent night-time alerts.

#### Pattern 27: Notifications Feed (`Notifications Feed`)
- **Visual Design**: Sliding right-hand drawer or header dropdown.
- **Anatomy**:
  - Unread badge counter (`notifications`).
  - Tabs: `All`, `Academic`, `Finance`, `System`.
  - `Mark All as Read` action trigger.

#### Pattern 28: Chat & Direct Messaging (`Chat`)
- **Visual Design**: 3-Pane messaging application.
- **Anatomy**:
  - Left: Channel & Conversation roster (Class Teachers, Parent Groups, Staff Room).
  - Middle: Message thread with timestamped bubbles, file attachments, and active typing indicator.
  - Right: Participant details and shared document vault.

#### Pattern 29: Threaded Comments (`Comments`)
- **Visual Design**: Nested comment stream on homework submissions and staff observations.
- **Anatomy**:
  - Author avatar, time ago (`2h ago`), rich markdown text, reply trigger, and moderation delete action.

#### Pattern 30: Public Profile (`Public Profile`)
- **Visual Design**: Public Front Site verified credentials page.
- **Anatomy**:
  - Student Digital Certificate with QR code verification link to ensure authenticity without database exposure.

#### Pattern 31: Third-Party Integrations (`Integrations`)
- **Visual Design**: Card grid of external connectors.
- **Anatomy**:
  - Connectors: `Google Meet`, `Zoom Live Classes`, `Stripe Payment Gateway`, `DLT Cellular SMS`, `Biometric Turnstiles`.
  - Connection status toggle and API credential modal.

#### Pattern 32: Help Center & Knowledge Base (`Help Center`)
- **Visual Design**: Search-driven documentation portal.
- **Anatomy**:
  - Top search input: "How can we help you today?".
  - Categorized FAQ accordions (`Admissions`, `Fees & Payments`, `Exams & Results`).
  - `Submit Support Ticket` CTA button.

---

## 3. Production Verification & Architectural Sign-Off

- [x] All 32 screen patterns codified with exact layout structures and Liquid Glass styling tokens.
- [x] Strict Zero-Emoji Policy enforced across all screens, empty states, and alerts.
- [x] Google Material Symbols Outlined (`wght: 500`) bound to all navigation triggers and cards.
- [x] PostgreSQL RLS multi-tenant isolation enforced on all entity queries and data tables.
