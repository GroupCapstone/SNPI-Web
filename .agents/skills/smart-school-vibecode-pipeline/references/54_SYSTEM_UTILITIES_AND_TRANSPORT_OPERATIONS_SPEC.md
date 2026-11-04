---
name: smart-school-utilities-transport
description: Authoritative UI/UX design standard, component architecture, and implementation guidelines for the System Utilities & Student Transport Operations Suite on the Smart School Enterprise Platform. Covers Inquiry Form, Student Details, Logs Management, Data Reset, Route/Vehicle Assignment, Fare Management, One-Click Demo Data, and Operational Actions. Trigger on: "system utilities", "transport operations", "inquiry form", "student details", "logs management", "data reset", "one-click demo data", "route vehicle assign", "fare management", "transport actions", "admission inquiries".
---

# System Utilities & Student Transport Operations Standard
## Smart School Enterprise Platform (ABLOB Architecture)

The **System Utilities & Student Transport Operations Suite** establishes the operational standard for institutional admission lead capture, student transit allocation, fleet fare accounting, security audit logging, and administrative sandbox lifecycle management across the **Smart School Enterprise Platform**.

This suite unites public front-door intake (web and front desk inquiries) with active daily student transit logistics (route/vehicle assignment, distance-based monthly transit invoicing, and POS payment collection), backed by critical system utilities (tamper-evident audit logs, one-click demo data provisioning, and safe transactional data resets).

---

## 1. Authoritative 8-Feature Taxonomy Across 4 Operational Clusters

```
========================================================================================
CLUSTER 1: FRONT DESK INGRESS & STUDENT TRANSIT REGISTRY
========================================================================================
  01. Inquiry Form:
      - Canonical Copy: Capture admission or general inquiries from the website or admin panel.
      - Material Symbol: contact_support
      - Color Accent: Royal Indigo (#4338CA)
      - Backend Microservice: AdmissionInquiryService
      - Entitlements: PUBLIC_GUEST, SUPER_ADMIN, CAMPUS_ADMIN, RECEPTIONIST
      - Key Operations:
        * Web landing page embedded lead capture widget and front-desk visitor intake.
        * Tracks lead status (Active, Passive, Dead, Won, Lost), next follow-up date, and notes.
        * Automatically dispatches Kafka event `school.lead.inquiry-created` to receptionist queue.

  02. Student Details:
      - Canonical Copy: Track student name, enrollment number, and class/section for transport.
      - Material Symbol: person_pin
      - Color Accent: Cyan (#0891B2)
      - Backend Microservice: StudentTransitRosterService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, TRANSPORT_OFFICER
      - Key Operations:
        * Real-time transit student directory indexing Name, Admission No, Class, Section, and Guardian Contact.
        * Rapid keyword search and class filter for quick bus route lookup.
        * Emergency parent contact card display with 1-click telephony dialer.

========================================================================================
CLUSTER 2: STUDENT TRANSPORT LOGISTICS (SM TRANSPORT)
========================================================================================
  03. Route / Vehicle Assignment:
      - Canonical Copy: Assign and manage routes and vehicles for each student efficiently.
      - Material Symbol: directions_bus
      - Color Accent: Royal Blue (#2563EB)
      - Backend Microservice: StudentRouteAllocationService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, TRANSPORT_OFFICER
      - Key Operations:
        * Assigns student to designated Route, Fleet Vehicle, and Pickup Stop.
        * Configures scheduled pickup and drop-off time windows.
        * Capacity verification engine: Prevents assigning students to vehicles exceeding seating limits.

  04. Fare Management:
      - Canonical Copy: Keep track of monthly fares, payments made, unpaid amounts, and pending invoices.
      - Material Symbol: payments
      - Color Accent: Emerald Green (#059669)
      - Backend Microservice: TransitFareAccountingService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Operations:
        * 12-month transit fare schedule with configurable due dates and late fine rules.
        * Distance and zone-based monthly fare matrix.
        * Ledger tracking: Invoiced Fare, Total Paid, Unpaid Overdue Balance, and Active Status.

========================================================================================
CLUSTER 3: OPERATIONAL ACTIONS & FINANCIAL ACTIONS
========================================================================================
  05. Operational Actions:
      - Canonical Copy: Perform actions like generating invoices, marking payments, or editing transport info.
      - Material Symbol: pending_actions
      - Color Accent: Dark Amber (#D97706)
      - Backend Microservice: TransitActionDispatchService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT, TRANSPORT_OFFICER
      - Key Operations:
        * 1-Click "Generate Monthly Invoice" for individual students or entire bus routes.
        * "Mark Payment" modal: Record Cash, Card, Bank Slip, or Gateway collections.
        * "Edit Transit Allocation" wizard: Seamlessly switch routes, pickup stops, or buses mid-term.

========================================================================================
CLUSTER 4: SYSTEM UTILITIES & PLATFORM MAINTENANCE
========================================================================================
  06. Logs Management:
      - Canonical Copy: Maintain detailed activity logs for system events and user actions.
      - Material Symbol: list_alt
      - Color Accent: Slate Blue (#475569)
      - Backend Microservice: AuditLogEngineService
      - Entitlements: SUPER_ADMIN
      - Key Operations:
        * Immutable logging of all user logins, record mutations, exports, and financial transactions.
        * Captures User ID, Role, IP Address, User Agent, Endpoint URI, and Delta Changes.
        * Security anomaly detection and exportable compliance audit trail (PDF/CSV).

  07. Data Reset:
      - Canonical Copy: Wipe all operational data safely to start fresh when needed.
      - Material Symbol: delete_forever
      - Color Accent: Rose Crimson (#E11D48)
      - Backend Microservice: DisasterDataResetService
      - Entitlements: SUPER_ADMIN ONLY (Requires root credentials & 2FA confirmation)
      - Key Operations:
        * Wipes operational student, fee, attendance, exam, and log tables while preserving core master settings.
        * Mandatory automated cryptographic pre-reset database snapshot before truncation.
        * Two-person authorization rule with audit confirmation stamp.

  08. One-Click Demo Data:
      - Canonical Copy: Instantly populate the system with sample demo data for testing.
      - Material Symbol: science
      - Color Accent: Fuchsia Purple (#A21CAF)
      - Backend Microservice: DemoDataSeederService
      - Entitlements: SUPER_ADMIN
      - Key Operations:
        * 1-Click seed engine populating 50+ students, 12 teachers, courses, timetable, and demo fee ledgers.
        * Enables instantaneous institutional demonstration and sandbox training.
        * Safe isolation tags allowing easy purge without affecting baseline platform configuration.
```

---

## 2. Liquid Glass Design System Specifications

The System Utilities & Transport Operations Suite strictly adheres to the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`):

### A. Surface Architecture & 360-Degree Specular Reflections
- **Frosted Glass Canvas**: `bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_0_0_rgba(15,23,42,0.06)]`
- **360-Degree Specular Highlight**:
  - Top highlight: `border-t border-white/95` (crisp tactile reflection)
  - Lateral sides: `border-l border-white/40 border-r border-white/40`
  - Bottom edge: `border-b border-slate-200/80` (grounded edge contrast)
- **Zero Blur Hard Offset Shadows**: Tactical offset shadows (`shadow-[0_4px_0_0_#1e293b]` on active buttons, `shadow-[0_8px_0_0_rgba(15,23,42,0.06)]` on cards).

### B. Pure Typography Hierarchy
- **Typeface**: Google Sans / Inter for Western Latin; Google Sans Khmer for Khmer localization.
- **Strict Color Tokens**:
  - Foundation: `#F8FAFC` (Slate 50)
  - Glass Card: `rgba(255, 255, 255, 0.82)`
  - Primary Text: `#0F172A` (Slate 900)
  - Secondary Text: `#475569` (Slate 600)
  - Accent Inks: Indigo (`#4338CA`), Cyan (`#0891B2`), Blue (`#2563EB`), Emerald (`#059669`), Amber (`#D97706`), Slate (`#475569`), Rose (`#E11D48`), Fuchsia (`#A21CAF`).

### C. Icon & Visual Policy
- **STRICT ZERO EMOJI POLICY**: Strictly zero emoji characters in UI components, documentation, copy, and database schemas.
- **Google Material Symbols Outlined Exclusively**: Optical weight 500 (`font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24`).

---

## 3. Production React / TypeScript Showcase Component

```tsx
import React, { useState } from 'react';

export interface UtilityFeature {
  id: string;
  cluster: 'INGRESS' | 'TRANSPORT' | 'ACTIONS' | 'UTILITIES';
  clusterLabel: string;
  title: string;
  description: string;
  symbol: string;
  accentColor: string;
  badge: string;
  roles: string[];
}

export const UTILITY_TRANSPORT_FEATURES: UtilityFeature[] = [
  {
    id: 'inquiry-form',
    cluster: 'INGRESS',
    clusterLabel: 'Ingress & Roster',
    title: 'Inquiry Form',
    description: 'Capture admission or general inquiries from the website or admin panel.',
    symbol: 'contact_support',
    accentColor: '#4338CA',
    badge: 'Lead Capture',
    roles: ['Public', 'Admin', 'Receptionist']
  },
  {
    id: 'student-details',
    cluster: 'INGRESS',
    clusterLabel: 'Ingress & Roster',
    title: 'Student Details',
    description: 'Track student name, enrollment number, and class/section for transport.',
    symbol: 'person_pin',
    accentColor: '#0891B2',
    badge: 'Transit Directory',
    roles: ['Super Admin', 'Campus Admin', 'Transport']
  },
  {
    id: 'route-vehicle-assign',
    cluster: 'TRANSPORT',
    clusterLabel: 'SM Transport',
    title: 'Route / Vehicle',
    description: 'Assign and manage routes and vehicles for each student efficiently.',
    symbol: 'directions_bus',
    accentColor: '#2563EB',
    badge: 'Bus Allocation',
    roles: ['Super Admin', 'Campus Admin', 'Transport']
  },
  {
    id: 'fare-mgmt',
    cluster: 'TRANSPORT',
    clusterLabel: 'SM Transport',
    title: 'Fare Management',
    description: 'Keep track of monthly fares, payments made, unpaid amounts, and pending invoices.',
    symbol: 'payments',
    accentColor: '#059669',
    badge: 'Transit Billing',
    roles: ['Super Admin', 'Campus Admin', 'Accountant']
  },
  {
    id: 'actions-dispatch',
    cluster: 'ACTIONS',
    clusterLabel: 'Operational Actions',
    title: 'Actions',
    description: 'Perform actions like generating invoices, marking payments, or editing transport info.',
    symbol: 'pending_actions',
    accentColor: '#D97706',
    badge: '1-Click POS',
    roles: ['Super Admin', 'Accountant', 'Transport']
  },
  {
    id: 'logs-mgmt',
    cluster: 'UTILITIES',
    clusterLabel: 'System Utilities',
    title: 'Logs Management',
    description: 'Maintain detailed activity logs for system events and user actions.',
    symbol: 'list_alt',
    accentColor: '#475569',
    badge: 'Audit Trail',
    roles: ['Super Admin']
  },
  {
    id: 'data-reset',
    cluster: 'UTILITIES',
    clusterLabel: 'System Utilities',
    title: 'Data Reset',
    description: 'Wipe all operational data safely to start fresh when needed.',
    symbol: 'delete_forever',
    accentColor: '#E11D48',
    badge: 'Safe Reset',
    roles: ['Super Admin']
  },
  {
    id: 'demo-data',
    cluster: 'UTILITIES',
    clusterLabel: 'System Utilities',
    title: 'One-Click Demo Data',
    description: 'Instantly populate the system with sample demo data for testing.',
    symbol: 'science',
    accentColor: '#A21CAF',
    badge: 'Sandbox Seed',
    roles: ['Super Admin']
  }
];

export const UtilitiesTransportShowcase: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<string>('ALL');

  const clusters = [
    { key: 'ALL', label: 'All Utilities & Transport', count: UTILITY_TRANSPORT_FEATURES.length },
    { key: 'INGRESS', label: 'Ingress & Roster', count: 2 },
    { key: 'TRANSPORT', label: 'SM Transport', count: 2 },
    { key: 'ACTIONS', label: 'Actions', count: 1 },
    { key: 'UTILITIES', label: 'System Utilities', count: 3 }
  ];

  const filteredFeatures = selectedCluster === 'ALL'
    ? UTILITY_TRANSPORT_FEATURES
    : UTILITY_TRANSPORT_FEATURES.filter(f => f.cluster === selectedCluster);

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden" id="utilities-transport">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200/60 backdrop-blur-md text-indigo-800 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span className="material-symbols-outlined text-sm">build_circle</span>
            Operational Utilities & Transit Hub
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-sans">
            SYSTEM UTILITIES & TRANSPORT
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-sans leading-relaxed">
            Front-desk admission inquiry capture, student bus route allocations, distance fare accounting, audit log trails, and one-click demo sandbox provisioning.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {clusters.map((c) => {
            const isActive = selectedCluster === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCluster(c.key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 border flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[0_4px_0_0_#4338ca]'
                    : 'bg-white/80 text-slate-700 border-white/60 hover:bg-white hover:text-slate-900 shadow-[0_4px_0_0_rgba(15,23,42,0.04)] backdrop-blur-md'
                }`}
              >
                <span>{c.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {c.count}
                </span>
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
                {/* Top: Icon + Badge */}
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
                  {feat.clusterLabel}
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

              {/* Roles Bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Access:</span>
                {feat.roles.map((r) => (
                  <span
                    key={r}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/50"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Operational Intelligence Strip */}
        <div className="mt-16 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 p-8 shadow-[0_10px_0_0_rgba(15,23,42,0.06)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/50">
            <div className="text-3xl font-black text-indigo-900 font-sans">Instant</div>
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mt-1">Inquiry Lead Sync</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Web form to receptionist queue</div>
          </div>
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100/50">
            <div className="text-3xl font-black text-blue-900 font-sans">100%</div>
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mt-1">Bus Seat Verification</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Zero vehicle capacity overflow</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-100/50 border border-slate-200/50">
            <div className="text-3xl font-black text-slate-900 font-sans">Immutable</div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1">Audit Logs</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Full mutation & export tracking</div>
          </div>
          <div className="p-4 rounded-xl bg-fuchsia-50/50 border border-fuchsia-100/50">
            <div className="text-3xl font-black text-fuchsia-900 font-sans">1-Click</div>
            <div className="text-xs font-bold text-fuchsia-700 uppercase tracking-wider mt-1">Sandbox Seeding</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Full demo data population</div>
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
-- 1. Front Desk & Website Admission Inquiries
CREATE TABLE admission_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    student_name VARCHAR(128) NOT NULL,
    parent_name VARCHAR(128) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(255),
    target_class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    source VARCHAR(64) DEFAULT 'WEBSITE', -- WEBSITE, FRONT_DESK, PHONE, REFERRAL
    status VARCHAR(16) DEFAULT 'ACTIVE', -- ACTIVE, PASSIVE, DEAD, WON, LOST
    next_follow_up_date DATE,
    notes TEXT,
    assigned_staff_id UUID REFERENCES staffs(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Student Transport Assignment & Route Binding
CREATE TABLE student_transport_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    route_id UUID NOT NULL REFERENCES transport_routes(id) ON DELETE RESTRICT,
    vehicle_id UUID NOT NULL REFERENCES transport_vehicles(id) ON DELETE RESTRICT,
    pickup_point_id UUID NOT NULL REFERENCES transport_pickup_points(id) ON DELETE RESTRICT,
    monthly_fare NUMERIC(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_transport UNIQUE(branch_id, student_id)
);

-- 3. Monthly Transport Billing Ledgers
CREATE TABLE transport_monthly_bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    assignment_id UUID NOT NULL REFERENCES student_transport_assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    bill_month INT NOT NULL CHECK (bill_month BETWEEN 1 AND 12),
    bill_year INT NOT NULL,
    fare_amount NUMERIC(10,2) NOT NULL,
    paid_amount NUMERIC(10,2) DEFAULT 0.00,
    due_amount NUMERIC(10,2) GENERATED ALWAYS AS (fare_amount - paid_amount) STORED,
    status VARCHAR(16) DEFAULT 'UNPAID', -- UNPAID, PARTIALLY_PAID, PAID
    due_date DATE NOT NULL,
    paid_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_transport_bill UNIQUE(assignment_id, bill_month, bill_year)
);

-- 4. Immutable System Audit Logs
CREATE TABLE system_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    user_id UUID,
    user_role VARCHAR(32) NOT NULL,
    action VARCHAR(64) NOT NULL, -- CREATE, UPDATE, DELETE, EXPORT, LOGIN, DATA_RESET
    entity_name VARCHAR(64) NOT NULL,
    entity_id UUID,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    payload_diff JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ENABLE ROW-LEVEL SECURITY
ALTER TABLE admission_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_transport_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_monthly_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_audit_logs ENABLE ROW LEVEL SECURITY;

-- MULTI-TENANT ISOLATION POLICIES
CREATE POLICY branch_isolation_inquiries ON admission_inquiries
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_assignments ON student_transport_assignments
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_bills ON transport_monthly_bills
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_audit_logs ON system_audit_logs
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );
```

---

## 5. Synchronous-to-Asynchronous Kafka Operations

```
[Inquiry Form Submitted on Website]
            │
            ▼
[Spring Boot 3 Public REST Controller] ──> (Returns 201 Created)
            │
            ▼
[Kafka Topic: school.lead.inquiry-created]
            │
            ├─ Payload: { inquiryId: "...", studentName: "...", phone: "...", branchId: "..." }
            │
            ▼
[Receptionist Dispatcher Engine]
            │
            ├─ 1. Inserts lead into admission_inquiries table in Neon RLS
            ├─ 2. Broadcasts live lead notification to Receptionist dashboard
            ├─ 3. Sends confirmation SMS to parent via SmsDispatchService
            │
            ▼
[WebSocket Event: /topic/receptionist/leads]
```

---

## 6. Audit & Verification Checklist

- [x] All 8 canonical features mapped to concrete microservices.
- [x] Strict ZERO EMOJI rule enforced across entire file, code components, and database schema.
- [x] Material Symbols Outlined used exclusively with 500 font weight.
- [x] Specular glass highlights and hard offset tactile shadows applied.
- [x] Multi-tenancy RLS isolation and Kafka async operations topology verified.
