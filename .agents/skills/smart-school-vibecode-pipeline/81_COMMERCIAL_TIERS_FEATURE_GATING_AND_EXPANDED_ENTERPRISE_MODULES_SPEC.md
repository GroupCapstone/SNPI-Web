# Commercial Subscription Tiers, Feature Gating & Expanded Enterprise Modules Specification

- **Module Reference**: `Module 81`
- **Specification ID**: `SPEC-81`
- **Architectural Status**: `RATIFIED / TIER-1 COMMERCIAL ARCHITECTURE`
- **Dedicated Primary Skill**: `smart-school-crm-distribution-and-commercial-tiers` (`[P-20]`)
- **Visual Identity Standard**: Liquid Glass UI, White Canvas Foundation, 360-Degree Specular Top Rim (`border-t border-white/95`), Hard Offset Shadows.
- **Typographic Triad**: Ubuntu (English), Google Sans Khmer (Khmer UI with `\u200B` zero-word-breakage), Moul (Formal diplomas & Ministry certificates).
- **Iconography Standard**: Google Material Symbols Outlined (`wght 500` only, ZERO EMOJI).

---

## 1. Executive Commercial Architecture Overview

This specification establishes the authoritative **Commercial SaaS Licensing**, **Feature-Gated Entitlement Engine**, and **Expanded Enterprise Modules Architecture** for the Smart School Enterprise Platform.

It formalizes:
1. **The 9 Commercial Subscription Tiers**: Starter ($100/mo), Bronze ($150/mo), Silver ($250/mo), Gold ($500/mo), Diamond ($1,000/mo), Platinum ($2,000/mo), Platinum+ ($4,000/mo), Enterprise ($6,000/mo), and Infinity ($50,000 Lifetime).
2. **The 38 Commercial Feature Gating Entitlements**: Programmatic entitlement boundary enforcement across student caps, branch limits, white-labeling, custom domains, and dedicated account management.
3. **Four Expanded Enterprise Domains**:
   - **CRM Management System**: Comprehensive prospective student inquiry desk, counselor allocation, follow-up call tracking, and admission conversion pipelines.
   - **Stationery & Study Material Distribution**: Curriculum book pack bundles, uniform kit sizing, consumable inventory tracking, and student distribution counter receipts.
   - **Newsletter & Institutional Publications Desk**: Multi-language campus periodicals, editorial approval queues, subscriber lists, and reading analytics.
   - **Database Management Services & Multi-Tenant Data Vault**: Continuous multi-tenant WAL archiving, point-in-time recovery (PITR), schema migration health, and secure bulk data export.
4. **The Complete 34-Module Institutional Registry**: Complete alignment across all 34 core campus modules with standardized Layout Archetypes and Google Material Symbols Outlined.

---

## 2. The 9-Tier Commercial SaaS Subscription Matrix

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                           COMMERCIAL SAAS SUBSCRIPTION TIERS & ENTITLEMENT MATRIX                                                                │
├──────────────────────────────┬──────────┬──────────┬──────────┬──────────┬───────────┬───────────┬──────────────┬──────────────┬─────────────────────────────┤
│ Feature / Capability         │ Starter  │ Bronze   │ Silver   │ Gold     │ Diamond   │ Platinum  │ Platinum +   │ Enterprise   │ Infinity (Lifetime)         │
├──────────────────────────────┼──────────┼──────────┼──────────┼──────────┼───────────┼───────────┼──────────────┼──────────────┼─────────────────────────────┤
│ Monthly / Lifetime Pricing   │ $100 /mo │ $150 /mo │ $250 /mo │ $500 /mo │ $1,000 /mo│ $2,000 /mo│ $4,000 /mo   │ $6,000 /mo   │ $50,000 Lifetime            │
│ One-Time Setup Fee           │ $250     │ $250     │ $250     │ $500     │ $500      │ $500      │ $500         │ $500         │ $1,000                      │
│ Number of Institutions/Branch│ 1 Branch │ 1 Branch │ 1 Branch │ 5 Branches│ 10 Branch │ 15 Branch │ 25 Branches  │ 50 Branches  │ Unlimited Branches          │
│ Maximum Student Capacity     │ 250      │ 500      │ 1,000    │ 2,000    │ 4,000     │ 10,000    │ 25,000       │ 50,000+      │ Unlimited Students          │
│ Free Subscription Period     │ 7 Days   │ 7 Days   │ 7 Days   │ 7 Days   │ 7 Days    │ 7 Days    │ 7 Days       │ 7 Days       │ 7 Days                      │
│ Technical Support Channels   │ Email/Chat│ Email/Chat│ Email/Chat│ Email/Chat│ Email/Chat│ Email/Chat│ Email/Chat/Call│ Email/Chat/Call│ 24/7 Dedicated VIP Support  │
├──────────────────────────────┴──────────┴──────────┴──────────┴──────────┴───────────┴───────────┴──────────────┴──────────────┴─────────────────────────────┤
│ CORE FEATURE ENTITLEMENTS:                                                                                                                                       │
│ • Fee Collection & Reports   │ Included │ Included │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Timetable Management       │ Included │ Included │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Academic Management        │ Included │ Included │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • ID Card Printing           │ Locked   │ Included │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Reports Gen & Download     │ Locked   │ Included │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • CSV Upload & Download      │ Locked   │ Included │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Certificate Generation     │ Locked   │ Included │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
├──────────────────────────────┼──────────┼──────────┼──────────┼──────────┼───────────┼───────────┼──────────────┼──────────────┼─────────────────────────────┤
│ ADVANCED INSTITUTIONAL SUITE:                                                                                                                                    │
│ • Mobile Application         │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Own Branded Mobile App     │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Custom Payment Gateway     │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Finance Management & GL    │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Virtual Classroom          │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • HRM & Payroll Engine       │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • CRM Management System      │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Hostel Management          │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Canteen Management & POS   │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Front Desk & Security Gate │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • SMS & WhatsApp Gateway     │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Student-Wise Fee Structure │ Locked   │ Locked   │ Included │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
├──────────────────────────────┼──────────┼──────────┼──────────┼──────────┼───────────┼───────────┼──────────────┼──────────────┼─────────────────────────────┤
│ ENTERPRISE & INFRASTRUCTURE: │          │          │          │          │           │           │              │              │                             │
│ • Online Admission Portal    │ Locked   │ Locked   │ Locked   │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Online Enrollment API + Pay│ Locked   │ Locked   │ Locked   │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Student Tracking (Paid RFID│ Locked   │ Locked   │ Locked   │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Bulk Data Downloading      │ Locked   │ Locked   │ Locked   │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Dedicated Accounts Manager │ Locked   │ Locked   │ Locked   │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Campus Health Management   │ Locked   │ Locked   │ Locked   │ Included │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Private Domain & Cloud Host│ Locked   │ Locked   │ Locked   │ Locked   │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Full White-Labeling        │ Locked   │ Locked   │ Locked   │ Locked   │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Vehicle GPS Tracking (Paid)│ Locked   │ Locked   │ Locked   │ Locked   │ Included  │ Included  │ Included     │ Included     │ Included                    │
│ • Institution Website + CMS  │ Locked   │ Locked   │ Locked   │ Locked   │ Locked    │ Included  │ Included     │ Included     │ Included                    │
│ • Dedicated Cloud Host Server│ Locked   │ Locked   │ Locked   │ Locked   │ Locked    │ Locked    │ Locked       │ Included     │ Included                    │
├──────────────────────────────┼──────────┼──────────┼──────────┼──────────┼───────────┼───────────┼──────────────┼──────────────┼─────────────────────────────┤
│ CUSTOMIZATION CREDITS & SLA: │          │          │          │          │           │           │              │              │                             │
│ • Included Customizations    │ None     │ None     │ None     │ 3 Min/1Maj│ 5 Min/3Maj│10 Min/3Maj│ 15 Min/5 Maj │ 20 Min/7 Maj │ 50 Minor, 25 Major          │
│ • Additional Customization   │ N/A      │ N/A      │ N/A      │ $12 / hr │ $12 / hr  │ $12 / hr  │ $12 / hr     │ $12 / hr     │ $12 / hr (Priority Queue)   │
└──────────────────────────────┴──────────┴──────────┴──────────┴──────────┴───────────┴───────────┴──────────────┴──────────────┴─────────────────────────────┘
```

---

## 3. Programmatic Feature Gating & Entitlement Engine

### 3.1 Architectural Gate Interceptor
Every incoming request is filtered by the `TenantEntitlementInterceptor`:
1. Inspects the active `tenant_id` from the JWT token or domain hostname.
2. Evaluates the active subscription plan and cached feature entitlements in Redis (`TTL = 300s`).
3. If an endpoint requires an entitlement not included in the tenant's active tier (e.g. `FEATURE_VIRTUAL_CLASSROOM` on Starter), the interceptor halts execution and returns `HTTP 402 Payment Required` with an upgrade CTA:
```json
{
  "type": "https://api.smartschool.edu/errors/feature-gated",
  "title": "Feature Not Included In Active Subscription",
  "status": 402,
  "detail": "Virtual Classroom requires Silver Tier or above. Your current tier is Starter.",
  "requiredTier": "SILVER",
  "currentTier": "STARTER",
  "upgradeUrl": "/billing/plans?upgrade=SILVER"
}
```

### 3.2 Student Capacity & Branch Limiter
- **Ingress Check**: Whenever a new student is enrolled or a new branch is provisioned, the persistence layer checks `current_count < max_capacity`.
- **Soft Warning**: At 90% capacity, executive dashboard displays an orange warning badge.
- **Hard Stop**: At 100% capacity, further enrollments return `HTTP 403 Forbidden` with reason `STUDENT_QUOTA_EXCEEDED`.

---

## 4. Deep Dive into the 4 Expanded Enterprise Domains

### 4.1 CRM Management System (`/crm/leads`)
- **Architectural Role**: Manages prospective student inquiries from initial lead capture to confirmed enrollment.
- **Key Capabilities**:
  - *Lead Ingestion*: Inbound web inquiries, walk-in front desk forms, phone inquiries, social media campaigns.
  - *Counselor Assignment*: Automated round-robin or departmental routing assigning leads to admissions officers.
  - *Follow-Up Activity Logs*: Scheduled phone calls, campus tour appointments, email sequences, and SMS reminders.
  - *Conversion Funnel Stages*: `NEW_LEAD` -> `CONTACTED` -> `CAMPUS_VISIT_SCHEDULED` -> `APPLICATION_SUBMITTED` -> `ENROLLED` -> `LOST`.
  - *Conversion BI*: Measures counselor conversion efficiency, channel ROI, and inquiry-to-enrollment velocity.

### 4.2 Stationery & Study Material Distribution Software (`/inventory/stationery-distribution`)
- **Architectural Role**: Streamlines the issuance of physical academic bundles, books, uniforms, and stationery kits to enrolled students.
- **Key Capabilities**:
  - *Curriculum Book Packs*: Grade-specific bundles grouping required textbooks, workbooks, and exercise notebooks.
  - *Uniform Kit Allotments*: Sizing masters (XS to 3XL), mandatory formal uniform sets, sports attire, and laboratory coats.
  - *Distribution Counter Point-of-Distribution (POD)*: Barcode scanner verification of student ID cards; checks fee payment clearance before releasing bundles.
  - *Stock Inventory & Reorder Telemetry*: Real-time depletion tracking with automated vendor reorder triggers when warehouse stock reaches safety buffers.
  - *Fee Invoicing Integration*: Automatically posts material kit charges to student billing accounts with itemized invoice lines.

### 4.3 Newsletter & Institutional Publications Desk (`/communication/newsletters`)
- **Architectural Role**: Coordinates the authoring, editorial review, and multi-channel publication of official school newsletters, annual magazines, and academic journals.
- **Key Capabilities**:
  - *Bilingual Edition Authoring*: Dual-language layout supporting English (`Ubuntu`) and Khmer (`Google Sans Khmer`).
  - *Editorial Workflow*: Column submission by student editors -> Teacher in-charge review -> Principal final sign-off.
  - *Dynamic Distribution Channels*: Responsive web reader, downloadable PDF with vector graphics, push notifications to Parent/Student Mobile Apps, and email digests.
  - *Reader Engagement BI*: Tracks open rates, reading duration, article popularity scores, and feedback comments.

### 4.4 Database Management Services & Multi-Tenant Data Vault (`/admin/database-services`)
- **Architectural Role**: Enterprise data resilience, continuous protection, and compliance reporting for institutional databases.
- **Key Capabilities**:
  - *Automated Continuous Backup*: Continuous Write-Ahead Log (WAL) archiving to encrypted AWS S3 vaults with 5-minute RPO.
  - *Point-in-Time Recovery (PITR)*: 1-click restoration allowing rollback to any precise minute within the last 35 days.
  - *Schema Migration Health*: Automated Flyway migration verification with pre-execution safety audits preventing destructive table drops.
  - *Tenant Data Export*: Compliant, structured data extraction (ZIP containing CSV and JSON schemas) for school transfers or external audits.
  - *Read Replica Routing*: Directs high-volume analytical queries (exam marksheets, longitudinal reports) to Aurora read replicas, preserving transactional master throughput.

---

## 5. The Complete 34-Module Institutional Registry

| # | Module Name | Domain Scope | Primary Layout Archetype | Material Symbol |
|---|:---|:---|:---:|:---|
| 01| **School Management System** | Core Platform Administration | `Archetype G` (Dashboard) | `apartment` |
| 02| **Question Paper Generator** | Assessment Compilation | `Archetype B` (Top Filter Table) | `auto_awesome` |
| 03| **Online Admission / Enrollment**| Admissions & Guest Intake | `Archetype B` (Criteria Form) | `app_registration` |
| 04| **Fees Management** | Billing, Clearinghouse & Invoicing| `Archetype B` (Top Filter Table) | `payments` |
| 05| **Student Management** | Longitudinal 360 Dossiers | `Archetype B` (Criteria Table) | `school` |
| 06| **Scholarship Programmes** | Donor Grants & Waivers | `Archetype B` (Criteria Table) | `workspace_premium` |
| 07| **Dashboard Management** | Role-Centric Executive Cockpit | `Archetype G` (Dashboard) | `dashboard` |
| 08| **Newsletter & Publications** | Campus Periodicals & Media | `Archetype C` (Media Card Grid) | `newspaper` |
| 09| **Learning Management (LMS)** | Online Courses & Video Tracks | `Archetype C` (Media Card Grid) | `video_library` |
| 10| **Inventory & Asset Management**| Capital Assets & Consumables | `Archetype A` (Split 2-Column) | `inventory_2` |
| 11| **Database Management Services** | Backup, DR & Data Export | `Archetype D` (Multi-Tab Admin) | `database` |
| 12| **School Mobile Applications** | Cross-Platform Client Apps | Native Mobile Viewport | `smartphone` |
| 13| **Academic Management** | Departments, Streams & Batches | `Archetype A` (Split 2-Column) | `menu_book` |
| 14| **Attendance Management** | Sub-45s Roll-Calls & Biometrics| `Archetype B` (Criteria Table) | `how_to_reg` |
| 15| **Time-Table Management** | Collision-Free Period Grids | `Archetype B` (Criteria Table) | `calendar_view_week`|
| 16| **Exam Management** | Multi-Board Exams & Hall Seatings| `Archetype D` (Multi-Tab Form) | `quiz` |
| 17| **Employee Management** | Staff Directory & Credentials | `Archetype B` (Criteria Table) | `badge` |
| 18| **SMS & Notifications Hub** | Omnichannel Emergency Broadcasts | `Archetype B` (Criteria Table) | `notifications_active`|
| 19| **Virtual Classroom** | WebRTC Live Audio/Video Rooms | `Archetype G` (Live Canvas) | `cast_for_education`|
| 20| **Health Management** | Infirmary Clinic & Medical Records| `Archetype B` (Criteria Table) | `local_hospital` |
| 21| **ID Card Management System** | CR80 PVC Dynamic Template Canvas| `Archetype E` (Visual Designer) | `contact_mail` |
| 22| **Stationery & Study Material** | Book Packs, Uniforms & Kits | `Archetype A` (Split 2-Column) | `local_mall` |
| 23| **Library Management System** | UDC Classification & Circulation | `Archetype B` (Criteria Table) | `local_library` |
| 24| **Payroll Management** | NSSF Withholding & Payslips | `Archetype C` (Grid / Table) | `receipt_long` |
| 25| **Finance Management** | Double-Entry Books & General Ledger| `Archetype B` (Criteria Table) | `account_balance` |
| 26| **Transport Management** | Fleet Vehicles & Route Fares | `Archetype B` (Criteria Table) | `directions_bus` |
| 27| **Student & Vehicle Tracking** | Real-Time GPS & RFID Telematics | `Archetype G` (Live Map View) | `sensors` |
| 28| **Hostel Management** | Residential Blocks & Bed Occupancy| `Archetype D` (Multi-Tab Form) | `hotel` |
| 29| **Security Gate / Front Desk** | Turnstile Passes & Visitor Logs | `Archetype B` (Criteria Table) | `door_sliding` |
| 30| **Canteen Management** | Cashless RFID POS & Meal Plans | `Archetype B` (Criteria Table) | `point_of_sale` |
| 31| **Parent Teacher Meeting (PTM)** | In-Person & Virtual Appointments | `Archetype D` (Multi-Tab Form) | `groups` |
| 32| **Event & Task Management** | Campus Calendar & Milestone Desk | `Archetype B` (Criteria Table) | `event` |
| 33| **Student Information (SIS)** | Student General Register (GR) | `Archetype B` (Criteria Table) | `folder_shared` |
| 34| **CRM Management System** | Admissions Lead Pipeline & Tours | `Archetype B` (Top Filter Table) | `lead_pencil` |

---

## 6. PostgreSQL Database Schema (DDL) with Row-Level Security

```sql
-- Schema Extension for Module 81: Commercial Tiers & Expanded Modules

-- 1. Commercial Subscription Plans & Entitlements
CREATE TABLE IF NOT EXISTS commercial_plans (
    id VARCHAR(32) PRIMARY KEY, -- 'STARTER', 'BRONZE', 'SILVER', 'GOLD', 'DIAMOND', 'PLATINUM', 'PLATINUM_PLUS', 'ENTERPRISE', 'INFINITY'
    title VARCHAR(64) NOT NULL,
    monthly_price_usd NUMERIC(10,2) NOT NULL,
    setup_fee_usd NUMERIC(10,2) NOT NULL,
    max_branches INT NOT NULL,
    max_students INT NOT NULL,
    has_mobile_app BOOLEAN NOT NULL DEFAULT false,
    has_branded_app BOOLEAN NOT NULL DEFAULT false,
    has_private_domain BOOLEAN NOT NULL DEFAULT false,
    has_white_label BOOLEAN NOT NULL DEFAULT false,
    has_vehicle_tracking BOOLEAN NOT NULL DEFAULT false,
    has_student_tracking BOOLEAN NOT NULL DEFAULT false,
    has_cms_website BOOLEAN NOT NULL DEFAULT false,
    has_own_cloud_server BOOLEAN NOT NULL DEFAULT false,
    minor_customizations_included INT NOT NULL DEFAULT 0,
    major_customizations_included INT NOT NULL DEFAULT 0,
    hourly_customization_rate_usd NUMERIC(6,2) DEFAULT 12.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tenant Subscriptions
CREATE TABLE IF NOT EXISTS tenant_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL UNIQUE,
    plan_id VARCHAR(32) NOT NULL REFERENCES commercial_plans(id),
    status VARCHAR(32) NOT NULL DEFAULT 'TRIAL' CHECK (status IN ('TRIAL', 'ACTIVE', 'PAST_DUE', 'CANCELLED')),
    trial_ends_at TIMESTAMPTZ,
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    current_student_count INT NOT NULL DEFAULT 0,
    current_branch_count INT NOT NULL DEFAULT 1,
    is_auto_renew BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CRM Leads & Follow-Up Activities
CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    guardian_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(64) NOT NULL,
    email VARCHAR(255),
    target_grade VARCHAR(32) NOT NULL,
    source VARCHAR(64) NOT NULL, -- 'WEB_INQUIRY', 'WALK_IN', 'PHONE', 'SOCIAL'
    assigned_counselor_id UUID,
    stage VARCHAR(32) NOT NULL DEFAULT 'NEW_LEAD' CHECK (stage IN ('NEW_LEAD', 'CONTACTED', 'CAMPUS_TOUR', 'APPLIED', 'ENROLLED', 'LOST')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Stationery & Study Material Inventory
CREATE TABLE IF NOT EXISTS stationery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    item_code VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL CHECK (category IN ('BOOK_PACK', 'UNIFORM', 'STATIONERY_KIT', 'LAB_COAT')),
    grade_level VARCHAR(32),
    stock_quantity INT NOT NULL DEFAULT 0,
    reorder_threshold INT NOT NULL DEFAULT 15,
    unit_price_usd NUMERIC(8,2) NOT NULL DEFAULT 0.00,
    unit_price_khr NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Stationery Student Distributions
CREATE TABLE IF NOT EXISTS stationery_distributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    student_id UUID NOT NULL,
    item_id UUID NOT NULL REFERENCES stationery_items(id) ON DELETE RESTRICT,
    quantity_issued INT NOT NULL DEFAULT 1,
    issued_by_staff_id UUID NOT NULL,
    fee_invoiced BOOLEAN NOT NULL DEFAULT true,
    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Campus Newsletter Editions
CREATE TABLE IF NOT EXISTS newsletter_editions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    issue_number VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    published_date DATE NOT NULL,
    pdf_vault_url TEXT,
    web_article_content TEXT,
    editorial_approved_by UUID,
    status VARCHAR(32) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PENDING_APPROVAL', 'PUBLISHED', 'ARCHIVED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row-Level Security Policies
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE stationery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stationery_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_editions ENABLE ROW LEVEL SECURITY;

CREATE POLICY branch_isolation_crm ON crm_leads
    FOR ALL USING (branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::UUID);

CREATE POLICY branch_isolation_stationery ON stationery_items
    FOR ALL USING (branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::UUID);

CREATE POLICY branch_isolation_distributions ON stationery_distributions
    FOR ALL USING (branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::UUID);

CREATE POLICY branch_isolation_newsletters ON newsletter_editions
    FOR ALL USING (branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::UUID);
```

---

## 7. Spring Boot 3 REST API Contracts & Kafka Topologies

### 7.1 Commercial Endpoints
- `GET /api/v1/commercial/plans`: Returns all 9 pricing tiers with feature entitlement matrices and pricing.
- `POST /api/v1/commercial/subscribe`: Subscribes a tenant to a commercial tier, setting up trial period or gateway invoicing.
- `GET /api/v1/commercial/entitlements/verify?feature={name}`: Verifies whether the tenant's tier includes the requested capability.

### 7.2 Domain Subsystem Endpoints
- `POST /api/v1/crm/leads`: Creates a prospective student lead and assigns counselor. Emits `campus.crm.lead-created`.
- `PUT /api/v1/crm/leads/{id}/stage`: Transitions lead stage (e.g. to `ENROLLED`). Emits `campus.crm.lead-converted`.
- `POST /api/v1/stationery/distribute`: Verifies fee clearance and records material kit distribution. Emits `campus.stationery.issued`.
- `POST /api/v1/newsletters/publish`: Submits newsletter for distribution across parent apps and email lists. Emits `campus.newsletter.published`.
- `POST /api/v1/database/trigger-backup`: Initiates immediate manual snapshot to S3 cold vault. Emits `infra.db.backup-initiated`.

---

## 8. Architectural Enforcement & Design Directives

1. **Strict Zero-Emoji Rule**: All UI controls, badges, and documentation MUST use Google Material Symbols Outlined (`wght 500`). Zero emojis permitted.
2. **Three-Font System**:
   - English documentation & numbers: `font-ubuntu`.
   - Khmer user interfaces: `font-khmer` with zero-width spaces (`\u200B`) between word tokens.
   - Ceremonial headings: `font-moul`.
3. **Liquid Glass UI Standard**: Frosted glass cards (`bg-white/80 backdrop-blur-xl border border-white/60`), 360-degree specular top rim (`border-t border-white/95`), and tactile solid button physics.
