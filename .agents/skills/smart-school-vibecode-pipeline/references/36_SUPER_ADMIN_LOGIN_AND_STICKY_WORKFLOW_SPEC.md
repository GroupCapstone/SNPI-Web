# Super Admin Login Sequence, First-View Landing & Sticky Agent Workflow
## Smart School Enterprise Platform (Autonomous Vibecoding Pipeline Specification)

---

### Executive Overview & Purpose

This specification governs the foundational entry point, first-view visual landscape, core sovereign capabilities, and sticky agent execution workflow for the **Super Admin** role (`SUPER_ADMIN`) in the **Smart School Enterprise Platform**.

Whenever an autonomous AI agent develops, extends, refactors, or audits features for the Super Admin, the agent MUST adhere to this sticky workflow and architectural model.

- **Primary Role Token**: `SUPER_ADMIN`
- **Sovereignty Level**: Universal Platform Scope (Cross-tenant, Cross-campus, Global Bypass)
- **Database Context**: `app.bypass_rls = true` (or explicit branch targeting via `SET LOCAL app.current_branch_id = ?`)
- **Visual Theme Accent**: `#8E24AA` (Royal Amethyst Purple)
- **Typography**: Ubuntu (English) / Google Sans (Khmer)
- **Icon Standard**: Google Material Symbols exclusively. **STRICT ZERO EMOJI & ZERO UNICODE SYMBOL POLICY**.

---

### 1. Super Admin Authentication & Login Ingress Sequence

When the Super Admin authenticates into the platform, the system advances through the following deterministic handshake:

```
[ STEP 1: CREDENTIAL INGRESS ]
  POST /api/v1/auth/login
  Body: { "username": "admin@smart-school.com", "password": "...", "tenantId": "root" }
  │
  ▼
[ STEP 2: MULTI-TENANT TOKEN MINTING ]
  Returns HTTP 200 OK + Bearer JWT containing:
  - sub: super-admin-uuid
  - role: "SUPER_ADMIN"
  - permissions: ["*"] (Global Wildcard Authority)
  - bypass_rls: true
  - default_session_id: "2026-27"
  - active_branch_id: null (Universal Scope)
  │
  ▼
[ STEP 3: PLATFORM CONTEXT INITIALIZATION ]
  Client establishes sticky session store:
  - LocalStorage / Cookie: Authorization Bearer Token
  - Sticky Session Header: X-Session-ID = "2026-27"
  - Sticky Currency Context: X-Currency = "USD"
  │
  ▼
[ STEP 4: INITIAL REDIRECT & FIRST-VIEW DISPATCH ]
  Browser / SPA client redirects immediately to:
  GET /admin/dashboard (Super Admin Command Center)
```

---

### 2. First-View Landing Architecture (What the Super Admin Sees Upon Login)

Upon successful login redirect to `/admin/dashboard`, the Super Admin is presented with a 4-tier visual control plane derived from production ground-truth screens (`media_1789160127957.png` and `media_1789160136733.png`):

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [TOP STICKY HEADER] SMART SCHOOL | Mount Carmel School | [Search Student Name] | USD | US | [switch] | [icons] | Admin │
├────────────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────┤
│ [LEFT STICKY SIDEBAR]  │ [TIER 1: 6 DAILY OPERATIONAL KPI CARDS] (3x2 Grid)                                            │
│                        │  ├─ Fees Awaiting Payment [2/7] (Light Blue)  │ ├─ Staff Approved Leave [1/3] (Cyan)          │
│ • Session: 2026-27     │  ├─ Converted Leads [1/8] (Red)               │ ├─ Staff Present Today [0/9] (Gray)           │
│ • Quick Links [grid]   │  ├─ Student Approved Leave [3/10] (Dark Blue) │ └─ Student Present Today [37/89] (Amber)      │
│                        ├───────────────────────────────────────────────┴───────────────────────────────────────────────┤
│ 32 Accordion Menus:    │ [TIER 2: MONTHLY ANALYTICAL CHARTS & GAUGES] (4 Tiles)                                        │
│ 1. Front Office        │  ├─ Grouped Bar: Fees Collection & Expenses For September 2026 (Green/Red daily bars)         │
│ 2. Student Information │  ├─ Half-Donut Gauge: Income - September 2026 (Donation, Rent, Misc)                          │
│ 3. Fees Collection     │  ├─ Spline Curve: Fees Collection & Expenses For Session 2026-27 (Apr-Mar monthly trend)      │
│ 4. Online Course       │  └─ Half-Donut Gauge: Expense - September 2026 (Stationery, Phone, Misc, Flower)              │
│ 5. Behaviour Records   ├───────────────────────────────────────────────────────────────────────────────────────────────┤
│ 6. Multi Branch        │ [TIER 3: 4 OPERATIONAL PROGRESS OVERVIEWS] (4 Cards with Multi-Colored Progress Bars)         │
│ 7. Gmeet Live Classes  │  ├─ Fees Overview: 3 Unpaid (42.86%), 2 Partial (28.57%), 2 Paid (28.57%)                    │
│ 8. Zoom Live Classes   │  ├─ Enquiry Overview: 6 Active (75%), 1 Won (12.5%), 1 Passive (12.5%), 0 Lost/Dead (0%)      │
│ ...                    │  ├─ Library Overview: 10 Due For Return, 3 Returned, Issued/Available                        │
│ 31. Reports            │  └─ Student Today Attendance: 21 Present (23.6%), 5 Late, 6 Absent, 11 Half Day               │
│ 32. System Setting     ├───────────────────────────────────────────────────────────────────────────────────────────────┤
│                        │ [TIER 4: 10 INSTITUTIONAL HEADCOUNT & FINANCE COUNTER CARDS]                                  │
│                        │  ├─ Monthly Fees: $6,205.00 │ ├─ Monthly Expenses: $2,750.00 │ ├─ Student Count: 89/88        │
│                        │  ├─ Admin: 1 │ ├─ Teacher: 4 │ ├─ Accountant: 1 │ ├─ Librarian: 1 │ ├─ Receptionist: 1       │
└────────────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Detailed Element Breakdown of the First View:

1. **Top Sticky Navigation Bar (`z-index: 50`, fixed height `60px`, full width)**:
   - **School Brand Crest**: Logo badge + School Name (`Mount Carmel School`).
   - **Global Student Search Omnibox**: Auto-complete search input querying across all branches.
   - **Active Currency Switcher**: Dropdown selector (`USD`, `KHR`, `EUR`) persisting display exchange rates.
   - **Country / Locale Flag**: Current localization indicator (`US`).
   - **Branch / Campus Switcher**: Dropdown allowing Super Admin to switch between universal view and specific campus context.
   - **Quick Action Glyphs**:
     - Calendar trigger: Quick date-picker and holiday events.
     - Task checklist: Operational pending task drawer.
     - Notification Bell: Live alert drawer with unread counter (`0`).
     - WhatsApp Messaging: Quick launcher for parent/student messaging.
   - **User Profile Capsule**: Avatar image, user name (`Admin User`), role badge (`SUPER_ADMIN`), and dropdown menu (My Profile, Change Password, Logout).

2. **Left Sticky Sidebar Navigation (`z-index: 40`, width `260px` expanded / `72px` mini-rail)**:
   - **Sticky Top Controls**:
     - `Current Session: 2026-27`: Tactile pill badge displaying the active academic year.
     - `Quick Links [grid_view]`: Action button triggering the full-screen 5-column Megamenu Drawer.
   - **32 Ordered Accordion Menus**: Complete taxonomy from `Front Office` down to `System Setting`.

3. **Tier 1: Daily Operational KPI Strip (6 Cards)**:
   - Real-time pulse metrics with colored progress bars (Fees Awaiting Payment, Staff Approved Leave, Student Approved Leave, Converted Leads, Staff Present Today, Student Present Today).

4. **Tier 2: Monthly Financial & Academic Analytical Charts (4 Tiles)**:
   - Dual-color grouped bar chart for daily revenue vs expenses.
   - Revenue category donut gauge.
   - Session-wide spline curve tracking monthly financial trajectory.
   - Expenditure category donut gauge.

5. **Tier 3: Operational Multi-Bar Progress Overviews (4 Cards)**:
   - Stacked multi-segmented percentage progress bars for Fees delinquency, Lead funnel conversion, Library circulation, and Student daily roll-call attendance.

6. **Tier 4: Tactical Headcount & Finance Counter Cards (10 Cards)**:
   - Financial ledger balances paired with exact live staff and student headcount tallies across all institutional designations.

---

### 3. The 7 Core Sovereign Capabilities of the Super Admin

The Super Admin is the only actor in the system with sovereignty across these 7 Core Domains:

| Core Pillar | Technical Responsibility | Database & Security Authority |
| :--- | :--- | :--- |
| **1. Multi-Branch Federation** | Provision new campuses, allocate campus codes, assign Deans. | Creates PostgreSQL RLS tenant partitions; dispatches `school.platform.branch-provisioned` Kafka events. |
| **2. Global RLS Bypass** | Cross-campus audits, universal student searches, centralized finance. | Executes with `app.bypass_rls = true` across all operational tables. |
| **3. Academic Session Master** | Create, activate, and lock academic sessions (`2026-27`). | Controls system-wide session context; locks historical student grade records. |
| **4. Central Financial Clearinghouse** | Define master fee groups, discounts, multi-channel payment gateways. | Manages payment credentials (Stripe, PayPal, ABA PayWay, Wing Bank). |
| **5. Platform Governance & OTA** | Configure all 25 System Setting sub-masters, trigger OTA updates. | Full write authority over `system_settings`, backup/restore database engine. |
| **6. Institutional RBAC Engine** | Govern role definitions and action permissions across all 34 modules. | Assigns View/Add/Edit/Delete rights to Admin, Teacher, Accountant, etc. |
| **7. Security & Telemetry Control** | Monitor Kafka throughput, DLQ queues, serverless pool latency. | Controls Emergency Campus Lockdown and network broadcast triggers. |

---

### 4. The Sticky UI Shell Architecture

The Super Admin interface relies on a "Sticky UI Shell" architecture to guarantee persistent context and zero navigation friction:

```
┌────────────────────────────────────────────────────────────────────────┐
│ STICKY SHELL LAYER 1: Top Navigation Bar (fixed, top: 0, z-index: 50)  │
├──────────────────────┬─────────────────────────────────────────────────┤
│ STICKY SHELL LAYER 2 │ MAIN CONTENT VIEWPORT                           │
│ Left Sidebar Rail    │ (overflow-y: auto, height: calc(100vh - 60px))  │
│ (fixed, left: 0,     │                                                 │
│  top: 60px,          │ Holds whatever module screen is active:         │
│  z-index: 40)        │ - Dashboard                                     │
│                      │ - Split 2-Column Form/Table                     │
│ Holds:               │ - Filter Criteria Card + Data Grid              │
│ - Session Pill       │ - Visual Canvas Designer                        │
│ - Quick Links Button │ - Multi-Tab Settings Panel                      │
│ - 32-Item Accordion  │                                                 │
└──────────────────────┴─────────────────────────────────────────────────┘
```

#### Persistent Context Variables Maintained in the Sticky Shell:
1. `session_context`: Current academic year (`2026-27`). Changes propagate across all sub-queries.
2. `branch_context`: `null` (Universal View) OR specific `branch_id` (Filtered Campus View).
3. `currency_context`: Display currency (`USD`, `KHR`, `EUR`) and real-time exchange rates.
4. `sidebar_state`: Persisted in `localStorage` (`expanded` = 260px vs `mini-rail` = 72px).

---

### 5. The 5-Stage Sticky Skill Agent Execution Workflow for Super Admin

Whenever an autonomous agent receives an instruction to build, modify, or verify a Super Admin feature, the agent MUST follow this 5-stage sticky workflow:

```
[ STAGE 1: SOVEREIGNTY & ROLE VERIFICATION ]
  │ Verify that the actor is 'SUPER_ADMIN'.
  │ Confirm whether this action is Universal (cross-campus) or Branch-Targeted.
  ▼
[ STAGE 2: STICKY CONTEXT PROPAGATION ]
  │ Ensure 'app.bypass_rls = true' is injected if universal, OR
  │ Propagate 'X-Branch-ID: <branch-uuid>' if operating within a targeted branch.
  │ Validate that 'X-Session-ID' corresponds to the active session ('2026-27').
  ▼
[ STAGE 3: UI ARCHETYPE & PLACEMENT ASSIGNMENT ]
  │ Map the requested screen to one of the 7 standardized Layout Archetypes:
  │ - Split Two-Column (Archetype A) for rapid front-desk entry.
  │ - Criteria Card + Table (Archetype B) for reports/rosters.
  │ - Multi-Tab Config (Archetype D) for system settings.
  │ - Canvas Designer (Archetype E) for credentials/marksheets.
  │ Ensure components are placed into 'src/components/ui/'.
  ▼
[ STAGE 4: HIGH-THROUGHPUT ASYNCHRONY & KAFKA ENVELOPE ]
  │ Is this an intensive operation (mass promotion, batch SMS, fee settlement)?
  │ If YES -> Return HTTP 202 Accepted + wrap in 'EventEnvelope<T>' with partition key.
  │ If NO  -> Direct transactional CRUD with RLS bypass logging.
  ▼
[ STAGE 5: DUAL-CHECK AUDIT & HARNESS TEST ]
  │ 1. Verify zero emojis and zero Unicode symbols.
  │ 2. Verify Postman cURL command with Bearer token and Super Admin claims.
  │ 3. Verify clean ThreadLocal cleanup in virtual thread pools.
```

---

### 6. Summary of Output Deliverables for Super Admin Workflows

When an agent finishes scaffolding or refactoring a Super Admin module, the agent MUST produce:
1. **REST API Contract**: Endpoint path, HTTP method, required headers (`Authorization`, `X-Session-ID`, optional `X-Branch-ID`), request body schema, and HTTP response structure.
2. **PostgreSQL Schema / Migration**: Table definitions with column types, primary/foreign keys, indices, and RLS bypass policies.
3. **Canonical Kafka Event Envelope**: If asynchronous, the exact JSON event structure adhering to `EventEnvelope<T>`.
4. **UI Layout Specification**: Archetype classification, visual positioning zones, and reusable component references matching [`ui_extractions/00_MASTER_UI_COMPONENT_CATALOG_AND_PANEL_SUMMARY.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/ui_extractions/00_MASTER_UI_COMPONENT_CATALOG_AND_PANEL_SUMMARY.md).
