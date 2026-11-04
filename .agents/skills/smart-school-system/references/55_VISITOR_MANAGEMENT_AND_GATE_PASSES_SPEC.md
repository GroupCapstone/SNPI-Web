---
name: smart-school-visitor-gate-passes
description: Authoritative UI/UX design standard, component architecture, and implementation guidelines for the Visitor Management & Student Gate Passes Suite on the Smart School Enterprise Platform. Covers Visitor Management, Student Details Association, Timing Records, and Staff Authorization. Trigger on: "visitor management", "gate passes", "student gate passes", "timing records", "authorized by", "campus security", "visitor pass issuance", "in-time out-time log", "student exit pass".
---

# Visitor Management & Student Gate Passes Standard
## Smart School Enterprise Platform (ABLOB Architecture)

The **Visitor Management & Student Gate Passes Suite** establishes the authoritative physical campus access security, visitor credential issuance, and student exit authorization standard across the **Smart School Enterprise Platform**.

This security engine safeguards the campus perimeter—logging all external visitors with government ID proofs, phone verifications, and student relation tracking, while enforcing strict, staff-authorized gate passes for students departing campus during operational school hours with real-time in/out timestamps and automated parent SMS alerts.

---

## 1. Authoritative 4-Pillar Feature Taxonomy

```
========================================================================================
PILLAR 1: EXTERNAL VISITOR IDENTITY & VERIFICATION
========================================================================================
  01. Visitor Management:
      - Canonical Copy: Track visitor name, mobile, and relation to students efficiently.
      - Material Symbol: badge
      - Color Accent: Royal Indigo (#4338CA)
      - Backend Microservice: VisitorManagementService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, RECEPTIONIST, SECURITY_GUARD
      - Key Operations:
        * Front-desk and security gate visitor registration: Name, Phone, ID Proof, Person Count.
        * Explicit student relation linkage (e.g., Parent, Sibling, Guardian, Vendor, Official).
        * Web-cam visitor photograph capture and instant thermal badge pass printing.
        * Blacklist screening and visitor departure out-time clocking.

========================================================================================
PILLAR 2: STUDENT ACADEMIC IDENTITY & COHORT LINKAGE
========================================================================================
  02. Student Details:
      - Canonical Copy: Associate gate passes with student, class, and section information.
      - Material Symbol: school
      - Color Accent: Cyan (#0891B2)
      - Backend Microservice: StudentGatePassService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, TEACHER, RECEPTIONIST
      - Key Operations:
        * Direct binding of exit pass to active Student Profile, Class, Section, and Roll Number.
        * Automatic retrieval of guardian contact numbers for emergency cross-verification.
        * Displays student photo, current classroom, and assigned class teacher.

========================================================================================
PILLAR 3: PERIMETER CHRONOMETRIC TELEMETRY & GATE LOGS
========================================================================================
  03. Timing Records:
      - Canonical Copy: Log in-time, out-time, and date for each gate pass entry.
      - Material Symbol: schedule
      - Color Accent: Royal Blue (#2563EB)
      - Backend Microservice: GatePassTelemetryService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, SECURITY_GUARD
      - Key Operations:
        * Automatic timestamping upon security gate scan: Date, Departure Out-Time, Return In-Time.
        * Barcode / QR code scanning at the physical security turnstile.
        * Overstay timer engine: Automatically triggers alert if student fails to return within pass window.
        * Immediate Kafka event `school.security.gate-exit` firing automated parent SMS notification.

========================================================================================
PILLAR 4: CHAIN-OF-CUSTODY & STAFF AUTHORIZATION
========================================================================================
  04. Authorized By:
      - Canonical Copy: Record the staff member responsible for authorizing each gate pass.
      - Material Symbol: verified_user
      - Color Accent: Emerald Green (#059669)
      - Backend Microservice: GatePassAuthorizationService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, CLASS_TEACHER, PRINCIPAL
      - Key Operations:
        * Mandatory cryptographic staff ID signature on every approved gate pass.
        * Coded departure reasons: Medical Infirmary, Family Emergency, Official School Representation.
        * Zero Unverified Exits: Security guards strictly blocked from opening gates without authorized token.
        * Full institutional audit ledger attributing every student exit to the authorizing faculty member.
```

---

## 2. Liquid Glass Design System Specifications

The Visitor Management & Gate Passes Suite strictly implements the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`):

### A. Surface Architecture & 360-Degree Specular Reflections
- **Frosted Glass Canvas**: `bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_0_0_rgba(15,23,42,0.06)]`
- **360-Degree Specular Highlight**:
  - Top highlight: `border-t border-white/95` (crisp tactile specular reflection)
  - Lateral sides: `border-l border-white/40 border-r border-white/40`
  - Bottom grounding: `border-b border-slate-200/80`
- **Tactile Hard Offset Shadows**: Zero artificial fuzzy blurs. Uses structural hard offset shadows (`shadow-[0_4px_0_0_#1e293b]` on buttons, `shadow-[0_8px_0_0_rgba(15,23,42,0.06)]` on cards).

### B. Pure Typography Hierarchy
- **Typeface**: Google Sans / Inter for Western Latin; Google Sans Khmer for Khmer localization.
- **Strict Color Tokens**:
  - Foundation: `#F8FAFC` (Slate 50)
  - Glass Card: `rgba(255, 255, 255, 0.82)`
  - Primary Text: `#0F172A` (Slate 900)
  - Secondary Text: `#475569` (Slate 600)
  - Accent Inks: Indigo (`#4338CA`), Cyan (`#0891B2`), Blue (`#2563EB`), Emerald (`#059669`).

### C. Icon & Visual Policy
- **STRICT ZERO EMOJI POLICY**: Strictly zero emoji characters in UI code, text labels, descriptions, and database tables.
- **Google Material Symbols Outlined Exclusively**: Optical weight 500 (`font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24`).

---

## 3. Production React / TypeScript Showcase Component

```tsx
import React, { useState } from 'react';

export interface SecurityFeature {
  id: string;
  pillar: 'VISITOR' | 'STUDENT' | 'TIMING' | 'AUTHORITY';
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

export const VISITOR_GATE_FEATURES: SecurityFeature[] = [
  {
    id: 'visitor-mgmt',
    pillar: 'VISITOR',
    pillarLabel: 'Perimeter Access',
    title: 'Visitor Management',
    description: 'Track visitor name, mobile, and relation to students efficiently.',
    symbol: 'badge',
    accentColor: '#4338CA',
    badge: 'Front Desk',
    statNumber: '100%',
    statLabel: 'ID Verified Visits',
    roles: ['Receptionist', 'Security Guard']
  },
  {
    id: 'student-details',
    pillar: 'STUDENT',
    pillarLabel: 'Student Identity',
    title: 'Student Details',
    description: 'Associate gate passes with student, class, and section information.',
    symbol: 'school',
    accentColor: '#0891B2',
    badge: 'Cohort Binding',
    statNumber: '< 1 Sec',
    statLabel: 'Profile Match',
    roles: ['Teacher', 'Campus Admin']
  },
  {
    id: 'timing-records',
    pillar: 'TIMING',
    pillarLabel: 'Chronometric Telemetry',
    title: 'Timing Records',
    description: 'Log in-time, out-time, and date for each gate pass entry.',
    symbol: 'schedule',
    accentColor: '#2563EB',
    badge: 'Gate Telemetry',
    statNumber: 'Real-Time',
    statLabel: 'Turnstile Sync',
    roles: ['Security Guard', 'Campus Admin']
  },
  {
    id: 'authorized-by',
    pillar: 'AUTHORITY',
    pillarLabel: 'Chain of Custody',
    title: 'Authorized By',
    description: 'Record the staff member responsible for authorizing each gate pass.',
    symbol: 'verified_user',
    accentColor: '#059669',
    badge: 'Staff Signature',
    statNumber: 'Zero',
    statLabel: 'Unverified Exits',
    roles: ['Class Teacher', 'Dean', 'Principal']
  }
];

export const VisitorGatePassesShowcase: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string>('ALL');

  const pillars = [
    { key: 'ALL', label: 'All Security Protocols' },
    { key: 'VISITOR', label: 'Visitor Access' },
    { key: 'STUDENT', label: 'Student Binding' },
    { key: 'TIMING', label: 'Gate Telemetry' },
    { key: 'AUTHORITY', label: 'Staff Authority' }
  ];

  const filteredFeatures = selectedPillar === 'ALL'
    ? VISITOR_GATE_FEATURES
    : VISITOR_GATE_FEATURES.filter(f => f.pillar === selectedPillar);

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden" id="visitor-gate-passes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200/60 backdrop-blur-md text-indigo-800 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span className="material-symbols-outlined text-sm">shield</span>
            Campus Perimeter Security Standard
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-sans">
            VISITOR MANAGEMENT & GATE PASSES
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-sans leading-relaxed">
            Perimeter visitor identification, student cohort linking, real-time gate turnstile telemetry, and staff-authorized chain of custody.
          </p>
        </div>

        {/* Tab Filters */}
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

        {/* Feature Cards Grid */}
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

              {/* Bottom Metrics & Roles */}
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

        {/* Security Infrastructure Strip */}
        <div className="mt-16 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 p-8 shadow-[0_10px_0_0_rgba(15,23,42,0.06)] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">qr_code</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Encrypted Pass Tokens</h4>
              <p className="text-xs text-slate-500 mt-1">
                Every gate pass generates a cryptographically signed QR code verified by security post hand scanners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">sms</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Instant Parent Exit SMS</h4>
              <p className="text-xs text-slate-500 mt-1">
                When a student scans out through the perimeter gate, parents receive an instant SMS timestamp.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">lock_person</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Dean Chain-of-Custody</h4>
              <p className="text-xs text-slate-500 mt-1">
                Zero gate departures permitted without digital approval from the Class Teacher, Dean, or Principal.
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
-- 1. Front Desk Visitor Logs
CREATE TABLE visitor_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    visitor_name VARCHAR(128) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    id_card_type VARCHAR(32), -- NATIONAL_ID, DRIVER_LICENSE, PASSPORT
    id_card_number VARCHAR(64),
    student_id UUID REFERENCES students(id) ON DELETE SET NULL,
    student_relation VARCHAR(64) NOT NULL, -- FATHER, MOTHER, GUARDIAN, RELATIVE, VENDOR, OFFICIAL
    visit_purpose VARCHAR(128) NOT NULL,
    person_count INT NOT NULL DEFAULT 1,
    visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
    in_time TIME NOT NULL,
    out_time TIME,
    photo_url TEXT,
    badge_pass_number VARCHAR(64),
    recorded_by UUID NOT NULL REFERENCES staffs(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Student Security Gate Passes (SM Gate Passes)
CREATE TABLE student_gate_passes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    pass_number VARCHAR(64) NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE RESTRICT,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE RESTRICT,
    reason VARCHAR(64) NOT NULL, -- MEDICAL, ILLNESS, FAMILY_EMERGENCY, OFFICIAL_SPORTS, EARLY_DISMISSAL
    authorized_by_staff_id UUID NOT NULL REFERENCES staffs(id) ON DELETE RESTRICT,
    pass_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expected_out_time TIME NOT NULL,
    expected_return_time TIME,
    actual_out_time TIME,
    actual_in_time TIME,
    status VARCHAR(16) DEFAULT 'AUTHORIZED', -- AUTHORIZED, DEPARTED, RETURNED, OVERSTAYED, CANCELLED
    verification_qr_code TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_gate_pass UNIQUE(branch_id, pass_number)
);

-- ENABLE ROW-LEVEL SECURITY
ALTER TABLE visitor_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_gate_passes ENABLE ROW LEVEL SECURITY;

-- MULTI-TENANT ISOLATION POLICIES
CREATE POLICY branch_isolation_visitors ON visitor_logs
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_gate_passes ON student_gate_passes
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );
```

---

## 5. Synchronous-to-Asynchronous Gate Security Pipeline

```
[Security Post Scans Gate Pass QR Code at Perimeter Exit]
            │
            ▼
[Spring Boot 3 Security REST Controller] ──> (Returns 200 OK + "Gate Open")
            │
            ▼
[Kafka Topic: school.security.gate-exit]
            │
            ├─ Payload: { passId: "...", studentId: "...", actualOutTime: "11:45:00", parentPhone: "+1..." }
            │
            ▼
[Async Security Dispatcher Engine]
            │
            ├─ 1. Updates student_gate_passes status to 'DEPARTED'
            ├─ 2. Dispatches automated SMS notification to parent: "Your ward has left campus via Main Gate"
            ├─ 3. Starts active countdown timer for expected return time
            │
            ▼
[If Overdue Return: Pushes alert to Security Guard & Dean Dashboard]
```

---

## 6. Audit & Verification Checklist

- [x] All 4 canonical security features mapped to concrete microservices.
- [x] Strict ZERO EMOJI rule enforced across entire file, code components, and database schema.
- [x] Material Symbols Outlined used exclusively with 500 font weight.
- [x] Specular glass highlights and hard offset tactile shadows applied.
- [x] Multi-tenancy RLS isolation and Kafka async gate exit pipeline verified.
