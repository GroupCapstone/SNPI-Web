# Student Pocket Money, Facility Ticketing, RTL & Dual-Theme Architecture Specification
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Strategic Authority

This specification establishes the authoritative architectural blueprint for the **Student Campus & Hostel Pocket Money System**, the **Campus Facility Maintenance Trouble-Ticketing Engine**, the **Bidirectional RTL/LTR Internationalization Framework**, and the **Dual-Theme Liquid Glass Architecture (Dark & Light Modes)**, derived from the multi-platform Genius School Management and Mobile App architecture (`media_1789208937151.png`, `media_1789208946342.png`, `media_1789208962076.png`, and `media_1789208972426.png`).

In adherence to the principle of architectural synthesis:
1. **What to Merge**: Standard mobile app features and stakeholder benefits are unified with existing specifications (`references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md` and `references/72_ENTERPRISE_BENEFITS_STAKEHOLDER_MATRIX_AND_HRM_EXAM_BLUEPRINT.md`) without duplicating baseline functionality.
2. **What to Skip**: Superficial marketing text and generic framework claims are omitted to focus strictly on actionable backend logic, data contracts, and client states.
3. **What to Add**: Novel operational capabilities:
   - **Student Pocket Money Wallet (`/hostel/pocket-money`)**: Campus cashless allowance and expense management for residential/boarding students.
   - **Facility Maintenance Trouble-Ticketing (`/facilities/maintenance-tickets`)**: Campus inconvenience ticketing with photo proof and SLA turnaround tracking.
   - **Bidirectional RTL/LTR Layout Engine**: Native directional mirroring for Arabic and right-to-left scripts.
   - **Dual-Theme Liquid Glass Architecture**: Dark and Light frosted glass modes strictly enforcing zero emojis and zero neon gradients.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│             HOSTEL WALLET, FACILITY TICKETING & THEME ARCHITECTURE                     │
├───────────────────┬───────────────────────────────┬────────────────────────────────────┤
│ Subsystem Group   │ Route Slug / Component        │ Operational Capability             │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ CAMPUS COMMERCE   │ /hostel/pocket-money          │ Cashless Student Expense Wallet    │
│                   │ /hostel/pocket-money/topup    │ Parent Top-Up via Bakong KHQR/Card │
│                   │ /hostel/pocket-money/limits   │ Daily/Weekly Allowance Rules       │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ FACILITY OPS      │ /facilities/maintenance-tickets│ Inconvenience Trouble Tickets      │
│                   │ /facilities/technicians       │ Maintenance Work Order Assignment  │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ INTERNATIONALIZE  │ [dir="rtl"] Engine            │ Bi-directional RTL/LTR Mirroring   │
│ THEME ENGINE      │ [data-theme="dark|light"]     │ Dual-Theme Liquid Glass Switcher   │
└───────────────────┴───────────────────────────────┴────────────────────────────────────┘
```

---

## 1. Student Campus & Hostel Pocket Money System (`/hostel/pocket-money`)

### 1.1 Domain Concept & Purpose
In boarding schools, residential colleges, and full-time university campuses, students require day-to-day petty cash for laundry, canteen snacks, stationery, and personal hygiene items. Cash transactions on campus present theft, loss, and accountability risks.

The **Student Pocket Money System** provides a closed-loop cashless digital wallet linked directly to the student's institutional RFID/barcode badge.

### 1.2 Functional Capabilities
- **Parent Digital Deposit**: Parents can top up their child's wallet via Bakong KHQR, ABA PayWay, Wing, or credit card directly from the Parent Mobile App or Web Portal.
- **Dual-Currency Balances**: Balances stored and transacted in USD (`$`) and Cambodian Riel (`៛`).
- **Spending Guardrails**: Parents configure maximum daily spending limits (e.g. $5.00/day) and weekly allowance allowances.
- **Merchant Terminal Ingress**: Canteen POS, campus stationery store, uniform counters, and campus laundry checkouts accept tap-to-pay via student RFID badges with sub-second deduction.
- **Automated Low-Balance Alerts**: Automated push notification dispatched to parent when wallet balance drops below 20% of the weekly threshold.
- **Monthly Spending Statements**: Itemized transactions available for parent audit, detailing item, timestamp, terminal ID, and remaining balance.

### 1.3 Data Model
```sql
CREATE TABLE student_pocket_money_accounts (
    account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL UNIQUE,
    balance_usd NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    balance_khr NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    daily_spend_limit_usd NUMERIC(10,2) DEFAULT 10.00,
    daily_spent_today_usd NUMERIC(10,2) DEFAULT 0.00,
    is_frozen BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

CREATE TABLE pocket_money_transactions (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    account_id UUID NOT NULL REFERENCES student_pocket_money_accounts(account_id),
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('TOPUP', 'PURCHASE', 'REFUND', 'WITHDRAWAL')),
    amount_usd NUMERIC(10,2) NOT NULL,
    amount_khr NUMERIC(14,2) NOT NULL,
    terminal_type VARCHAR(40) NOT NULL, -- CANTEEN, STATIONERY, LAUNDRY, DISPENSARY
    reference_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
```

---

## 2. Campus Facility Maintenance Trouble-Ticketing (`/facilities/maintenance-tickets`)

### 2.1 Domain Concept & Purpose
Campus infrastructure requires rapid defect reporting and resolution to ensure safe learning environments. Students, teachers, and hostel wardens can raise trouble tickets for broken lights, leaking plumbing, faulty air conditioning, defective classroom projectors, or damaged hostel furniture.

### 2.2 Functional Capabilities
- **Multi-Role Inconvenience Reporting**: Accessible to all authenticated roles via mobile app and web portals.
- **Defect Categorization**: Electrical, Plumbing, HVAC, Audio/Visual Projector, Furniture, IT Hardware, Structural.
- **Location Pinning**: Specific binding to Campus Branch -> Building -> Floor -> Room / Classroom / Hostel Dormitory.
- **Photo Evidence Attachment**: Users upload photos of the defect to S3 file vault.
- **Technician Dispatch & SLA Tracking**: Automated routing to campus facility technicians with target resolution SLAs (Emergency: 4 hours, High: 12 hours, Normal: 48 hours).
- **Resolution Proof Sign-Off**: Technicians upload a photographic record of the repaired defect before marking the ticket as "Resolved".

### 2.3 Data Model
```sql
CREATE TABLE facility_maintenance_tickets (
    ticket_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    reporter_user_id UUID NOT NULL,
    assigned_technician_id UUID,
    category VARCHAR(50) NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'EMERGENCY')),
    building_name VARCHAR(100) NOT NULL,
    room_number VARCHAR(50) NOT NULL,
    issue_description TEXT NOT NULL,
    photo_evidence_s3_key TEXT,
    resolution_photo_s3_key TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
    sla_due_at TIMESTAMPTZ NOT NULL,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
```

---

## 3. Bidirectional RTL / LTR Internationalization Architecture

### 3.1 Directional Mirroring Engine
To support international school operations across Arabic, Hebrew, and Persian-speaking jurisdictions, the platform enforces native Right-To-Left (RTL) layout mirroring:
- **`dir="rtl"` Attribute**: Triggered dynamically when language code matches an RTL language (`ar`, `fa`, `he`).
- **Layout Mirroring Rules**:
  - Left navigation sidebar shifts to the right screen edge.
  - Page title and breadcrumb navigation align to the right; chevrons reverse direction (`chevron_left`).
  - Table columns display in reversed order.
  - Multi-column metric grids flip starting columns.
  - Form inputs align text to the right, with labels positioned above or right-aligned.
- **Number & Code Preservation**: Mathematical formulas, currency codes, telephone numbers, and system barcodes remain rendered in LTR formatting to prevent data corruption.

---

## 4. Dual-Theme Liquid Glass Architecture (Dark & Light Mode)

### 4.1 System Palette Enforcement
The platform strictly maintains its Liquid Glass Design DNA across both display modes with **Zero Emojis** and **Zero Neon Gradients**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│             DUAL-THEME LIQUID GLASS DESIGN SYSTEM TOKENS                               │
├───────────────────┬───────────────────────────────┬────────────────────────────────────┤
│ Token Layer       │ Light Theme Spec              │ Dark Theme Spec                    │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ Canvas Foundation │ #FFFFFF Pure White Base       │ #0F172A Deep Slate Foundation      │
│ Glass Surface     │ bg-white/80 backdrop-blur-xl  │ bg-slate-900/85 backdrop-blur-xl   │
│ Specular Top Rim  │ border-t border-white/95      │ border-t border-white/20           │
│ Perimeter Border  │ border border-white/60        │ border border-slate-700/60         │
│ Elevation Shadows │ shadow-[0_4px_0_0_rgba(...)]  │ shadow-[0_4px_0_0_rgba(0,0,0,0.6)] │
│ Primary Text      │ #0F172A Slate 900             │ #F8FAFC Slate 50                   │
│ Muted Body Text   │ #475569 Slate 600             │ #94A3B8 Slate 400                  │
│ Accent Highlight  │ #2563EB Royal Blue            │ #3B82F6 Bright Blue                │
└───────────────────┴───────────────────────────────┴────────────────────────────────────┘
```

### 4.2 Runtime Switching
- Evaluates `localStorage.getItem('theme')` or system `window.matchMedia('(prefers-color-scheme: dark)')`.
- Toggles `dark` class on root `<html>` element with zero page re-renders.

---

## 5. Supporting Skills Cross-Reference Matrix

| Operational Capability | Spec Reference | Supporting Primary Skill |
|---|---|---|
| Student Pocket Money Wallet | Spec 85 & Spec 50 | `smart-school-facilities-operations`, `smart-school-fee-accounting` |
| Facility Maintenance Ticketing | Spec 85 & Spec 53 | `smart-school-facilities-operations`, `smart-school-utilities-transport` |
| Bidirectional RTL/LTR Engine | Spec 85 & Spec 62 | `smart-school-webapp-patterns`, `smart-school-system` |
| Dual-Theme Liquid Glass (Dark/Light)| Spec 85 & Spec 62 | `smart-school-webapp-patterns`, `smart-school-system` |
| Mobile App Subsystems & Ingress | Spec 85 & Spec 69 | `smart-school-mobile-apps-ecosystem` |
