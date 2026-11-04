---
name: smart-school-staff-hr
description: Authoritative UI/UX design standard, component architecture, and implementation guidelines for the Staff & Human Resources Suite on the Smart School Enterprise Platform. Covers Staff ID Cards, Staff Payroll, Staff Attendance, and Staff Leaves. Trigger on: "staff and human resources", "staff id cards", "staff payroll", "staff attendance", "staff leaves", "workforce management", "payslip generation", "staff leave applications", "biometric staff attendance".
---

# Staff & Human Resources Standard
## Smart School Enterprise Platform (ABLOB Architecture)

The **Staff & Human Resources Suite** establishes the authoritative workforce governance, identity issuance, biometric attendance, automated payroll computation, and faculty leave management standard across the **Smart School Enterprise Platform**.

This suite powers the institutional employee lifecycle—from issuing cryptographic, role-coded professional identification badges and recording biometric/manual daily roll-call to calculating multi-tier allowances and statutory deductions, generating automated monthly payslips, and executing transparent Dean/Super Admin leave approval workflows.

---

## 1. Authoritative 4-Pillar Feature Taxonomy

```
========================================================================================
PILLAR 1: WORKFORCE IDENTITY & CREDENTIAL ISSUANCE
========================================================================================
  01. Staff ID Cards:
      - Canonical Copy: Generate professional identification cards for all school staff.
      - Material Symbol: badge
      - Color Accent: Royal Indigo (#4338CA)
      - Backend Microservice: StaffIDCardService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN
      - Key Operations:
        * Dynamic HTML/CSS ID card template designer with configurable backgrounds and header colors.
        * Role-coded visual badges (Faculty Blue, Admin Purple, Operations Slate).
        * Automatic barcode and QR code generation encoding Staff ID and verification tokens.
        * High-throughput collated vector PDF printing for entire departments at once.

========================================================================================
PILLAR 2: COMPENSATION & AUTOMATED PAYROLL ENGINE
========================================================================================
  02. Staff Payroll:
      - Canonical Copy: Manage staff salaries, deductions, and generate payslips automatically.
      - Material Symbol: payments
      - Color Accent: Emerald Green (#059669)
      - Backend Microservice: StaffPayrollService (Async Kafka Worker)
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Operations:
        * Earnings structure: Basic Pay, Dearness Allowance (DA), House Rent Allowance (HRA), Special Allowances.
        * Deductions structure: Employee Provident Fund (EPF), Tax Deducted at Source (TDS), Unpaid Leave LOP.
        * 1-Click bulk monthly payroll generation across departments (Teaching, Admin, Support).
        * Tamper-evident digital payslip PDF generation with instant employee portal self-service download.

========================================================================================
PILLAR 3: PRESENCE, ROSTER & BIOMETRIC ATTENDANCE
========================================================================================
  03. Staff Attendance:
      - Canonical Copy: Track daily attendance using manual or automated systems.
      - Material Symbol: how_to_reg
      - Color Accent: Royal Blue (#2563EB)
      - Backend Microservice: StaffAttendanceService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN
      - Key Operations:
        * Daily roll-call register with multi-status options: Present, Late, Absent, Half Day, Holiday.
        * Biometric device integration (Fingerprint, Facial Recognition, RFID access turnstiles).
        * Automated late-entry hour calculations integrated directly into the payroll deductions engine.
        * Departmental attendance heatmaps and longitudinal monthly presence compliance reports.

========================================================================================
PILLAR 4: FACULTY & STAFF LEAVE GOVERNANCE
========================================================================================
  04. Staff Leaves:
      - Canonical Copy: Process and approve staff leave applications easily.
      - Material Symbol: event_busy
      - Color Accent: Amber Orange (#D97706)
      - Backend Microservice: StaffLeaveWorkflowService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN (Self-Service: ALL STAFF)
      - Key Operations:
        * Category quotas: Casual Leave (CL), Sick Leave (SL), Maternity/Paternity Leave, Earned Leave (EL).
        * Staff self-service portal: Apply leave, upload doctor note/attachment, track live status.
        * Dean / Super Admin approval queue: View leave balance history, approve, or reject with audit remarks.
        * Real-time automated timetable substitute teacher reallocation upon leave approval.
```

---

## 2. Liquid Glass Design System Specifications

The Staff & Human Resources Suite strictly adheres to the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`):

### A. Surface Architecture & 360-Degree Specular Highlights
- **Frosted Glass Canvas**: `bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_0_0_rgba(15,23,42,0.06)]`
- **360-Degree Specular Highlight**:
  - Top edge: `border-t border-white/95` (crisp tactile reflection)
  - Lateral sides: `border-l border-white/40 border-r border-white/40`
  - Bottom edge: `border-b border-slate-200/80` (grounded edge contrast)
- **Tactile Hard Offset Shadows**: Zero artificial fuzzy blurs. Uses crisp structural offset shadows (`shadow-[0_4px_0_0_#1e293b]` on buttons, `shadow-[0_8px_0_0_rgba(15,23,42,0.06)]` on cards).

### B. Pure Typography Hierarchy
- **Typeface**: Google Sans / Inter for Western Latin; Google Sans Khmer for Khmer localization.
- **Strict Color Tokens**:
  - Foundation: `#F8FAFC` (Slate 50)
  - Glass Card: `rgba(255, 255, 255, 0.82)`
  - Primary Text: `#0F172A` (Slate 900)
  - Secondary Text: `#475569` (Slate 600)
  - Accent Inks: Indigo (`#4338CA`), Emerald (`#059669`), Blue (`#2563EB`), Amber (`#D97706`).

### C. Icon & Visual Policy
- **STRICT ZERO EMOJI POLICY**: Zero emoji characters in UI code, text labels, descriptions, and database tables.
- **Google Material Symbols Outlined Exclusively**: Optical weight 500 (`font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24`).

---

## 3. Production React / TypeScript Showcase Component

```tsx
import React, { useState } from 'react';

export interface HRFeature {
  id: string;
  pillar: 'IDENTITY' | 'PAYROLL' | 'ATTENDANCE' | 'LEAVE';
  pillarLabel: string;
  title: string;
  description: string;
  symbol: string;
  accentColor: string;
  badge: string;
  statNumber: string;
  statLabel: string;
  roles: string[];
}

export const STAFF_HR_FEATURES: HRFeature[] = [
  {
    id: 'staff-id-cards',
    pillar: 'IDENTITY',
    pillarLabel: 'Identity & Access',
    title: 'Staff ID Cards',
    description: 'Generate professional identification cards for all school staff.',
    symbol: 'badge',
    accentColor: '#4338CA',
    badge: 'Credential Engine',
    statNumber: '100%',
    statLabel: 'Vector PDF Accuracy',
    roles: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'staff-payroll',
    pillar: 'PAYROLL',
    pillarLabel: 'Compensation & Payroll',
    title: 'Staff Payroll',
    description: 'Manage staff salaries, deductions, and generate payslips automatically.',
    symbol: 'payments',
    accentColor: '#059669',
    badge: 'Automated Slips',
    statNumber: '< 5 Sec',
    statLabel: 'Batch Computation',
    roles: ['Super Admin', 'Admin', 'Accountant']
  },
  {
    id: 'staff-attendance',
    pillar: 'ATTENDANCE',
    pillarLabel: 'Roster & Presence',
    title: 'Staff Attendance',
    description: 'Track daily attendance using manual or automated systems.',
    symbol: 'how_to_reg',
    accentColor: '#2563EB',
    badge: 'Biometric Sync',
    statNumber: '99.8%',
    statLabel: 'Uptime Precision',
    roles: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'staff-leaves',
    pillar: 'LEAVE',
    pillarLabel: 'Workflow & Quotas',
    title: 'Staff Leaves',
    description: 'Process and approve staff leave applications easily.',
    symbol: 'event_busy',
    accentColor: '#D97706',
    badge: 'Multi-Level Approval',
    statNumber: '2-Click',
    statLabel: 'Dean Approval Flow',
    roles: ['All Roles', 'Dean', 'Teacher']
  }
];

export const StaffHumanResourcesShowcase: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string>('ALL');

  const pillars = [
    { key: 'ALL', label: 'All HR Capabilities' },
    { key: 'IDENTITY', label: 'ID Cards & Access' },
    { key: 'PAYROLL', label: 'Automated Payroll' },
    { key: 'ATTENDANCE', label: 'Staff Attendance' },
    { key: 'LEAVE', label: 'Leave Governance' }
  ];

  const filteredFeatures = selectedPillar === 'ALL'
    ? STAFF_HR_FEATURES
    : STAFF_HR_FEATURES.filter(f => f.pillar === selectedPillar);

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden" id="staff-human-resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200/60 backdrop-blur-md text-indigo-800 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span className="material-symbols-outlined text-sm">badge</span>
            Workforce Governance Framework
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-sans">
            STAFF & HUMAN RESOURCES
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-sans leading-relaxed">
            Professional staff identity issuance, automated multi-tier payroll calculations, biometric daily attendance tracking, and transparent leave approval workflows.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {pillars.map((p) => {
            const isActive = selectedPillar === p.key;
            return (
              <button
                key={p.key}
                onClick={() => setSelectedPillar(p.key)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[0_4px_0_0_#4338ca]'
                    : 'bg-white/80 text-slate-700 border-white/60 hover:bg-white hover:text-slate-900 shadow-[0_4px_0_0_rgba(15,23,42,0.04)] backdrop-blur-md'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatures.map((feat) => (
            <div
              key={feat.id}
              className="group relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 p-6 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_0_0_rgba(15,23,42,0.06)] hover:shadow-[0_12px_0_0_rgba(15,23,42,0.08)] flex flex-col justify-between"
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.95)',
                borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
              }}
            >
              <div>
                {/* Topbar: Icon + Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: feat.accentColor }}
                  >
                    <span className="material-symbols-outlined text-2xl">{feat.symbol}</span>
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60 font-mono">
                    {feat.badge}
                  </span>
                </div>

                {/* Subtitle */}
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {feat.pillarLabel}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 tracking-tight font-sans mb-2 group-hover:text-indigo-600 transition-colors">
                  {feat.title}
                </h3>

                {/* Canonical Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>

              {/* Bottom Metrics & Access Roles */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-slate-400 font-medium">{feat.statLabel}</span>
                  <span className="text-lg font-black font-mono" style={{ color: feat.accentColor }}>
                    {feat.statNumber}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  {feat.roles.map((role) => (
                    <span
                      key={role}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/50"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Capability Banner */}
        <div className="mt-16 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 p-8 shadow-[0_10px_0_0_rgba(15,23,42,0.06)] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">qr_code_scanner</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Cryptographic Identity Stamping</h4>
              <p className="text-xs text-slate-500 mt-1">
                Every staff ID card features an encrypted QR code for campus security checkpoints and turnstiles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">receipt</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Statutory Tax & Deduction Automation</h4>
              <p className="text-xs text-slate-500 mt-1">
                Integrated EPF, TDS, and attendance-linked loss of pay (LOP) calculations computed automatically.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">sync_alt</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Automated Substitute Teacher Routing</h4>
              <p className="text-xs text-slate-500 mt-1">
                Approved faculty leaves automatically trigger timetable clash alerts and substitute recommendations.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
```

---

## 4. Database Schema & PostgreSQL Row-Level Security (RLS)

```sql
-- 1. Staff ID Card Templates
CREATE TABLE staff_id_card_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    template_name VARCHAR(128) NOT NULL,
    header_color VARCHAR(16) NOT NULL DEFAULT '#4338CA',
    background_image_url TEXT,
    show_barcode BOOLEAN DEFAULT TRUE,
    show_qr_code BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Staff Payroll Calculation Ledgers
CREATE TABLE staff_payrolls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staffs(id) ON DELETE RESTRICT,
    payslip_number VARCHAR(64) NOT NULL,
    payroll_month INT NOT NULL CHECK (payroll_month BETWEEN 1 AND 12),
    payroll_year INT NOT NULL,
    basic_salary NUMERIC(12,2) NOT NULL,
    total_earnings NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    total_deductions NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    net_salary NUMERIC(12,2) GENERATED ALWAYS AS (basic_salary + total_earnings - total_deductions) STORED,
    payment_status VARCHAR(16) DEFAULT 'GENERATED', -- GENERATED, PAID, CANCELLED
    payment_mode VARCHAR(32), -- CASH, CHEQUE, BANK_TRANSFER, DIRECT_DEPOSIT
    payment_date DATE,
    payslip_pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_staff_month_payroll UNIQUE(staff_id, payroll_month, payroll_year)
);

-- 3. Daily Staff Attendance
CREATE TABLE staff_attendances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staffs(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    status VARCHAR(16) NOT NULL, -- PRESENT, LATE, ABSENT, HALF_DAY, HOLIDAY
    clock_in_time TIME,
    clock_out_time TIME,
    biometric_device_id VARCHAR(64),
    recorded_by UUID REFERENCES staffs(id),
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_staff_attendance_day UNIQUE(staff_id, attendance_date)
);

-- 4. Staff Leave Applications & Quotas
CREATE TABLE staff_leave_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staffs(id) ON DELETE CASCADE,
    leave_type VARCHAR(32) NOT NULL, -- CASUAL, SICK, MATERNITY, PATERNITY, EARNED
    apply_date DATE NOT NULL DEFAULT CURRENT_DATE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days NUMERIC(4,2) NOT NULL,
    reason TEXT NOT NULL,
    attachment_url TEXT,
    status VARCHAR(16) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    approved_by UUID REFERENCES staffs(id),
    decision_remarks TEXT,
    decision_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ENABLE ROW-LEVEL SECURITY
ALTER TABLE staff_id_card_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_payrolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_leave_applications ENABLE ROW LEVEL SECURITY;

-- MULTI-TENANT ISOLATION POLICIES
CREATE POLICY branch_isolation_id_templates ON staff_id_card_templates
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_payrolls ON staff_payrolls
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_staff_attendances ON staff_attendances
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_leave_applications ON staff_leave_applications
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );
```

---

## 5. Synchronous-to-Asynchronous Kafka Architecture

```
[Super Admin / Dean: "Generate Monthly Payroll Batch"]
            │
            ▼
[Spring Boot 3 REST Controller] ──> (Returns 202 Accepted + Job UUID)
            │
            ▼
[Kafka Topic: school.finance.payroll-batch-trigger]
            │
            ├─ Payload: { branchId: "...", month: 9, year: 2026, initiatedBy: "..." }
            │
            ▼
[Async Payroll Worker (Virtual Threads)]
            │
            ├─ 1. Query All Active Staff via Neon RLS
            ├─ 2. Calculate Gross Pay, Allowances, and LOP Deductions from staff_attendances
            ├─ 3. Atomic Insert into staff_payrolls table
            ├─ 4. Render OpenPDF / iText Payslip Vectors
            ├─ 5. Upload Encrypted PDF Stream to S3 Secure Document Vault
            │
            ▼
[Kafka Event: school.communicate.email-queue]
            │
            ▼
[Staff Members Receive Email Notification with Downloadable Payslip PDF]
```

---

## 6. Audit & Verification Checklist

- [x] All 4 canonical workforce features mapped to concrete microservices.
- [x] Strict ZERO EMOJI rule enforced across entire file, code components, and database schema.
- [x] Material Symbols Outlined used exclusively with 500 font weight.
- [x] Specular glass highlights and hard offset tactile shadows applied.
- [x] Multi-tenancy RLS isolation and Kafka async bridge verified.
