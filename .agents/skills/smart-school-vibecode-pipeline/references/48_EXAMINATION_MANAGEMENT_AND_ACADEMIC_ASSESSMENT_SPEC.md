---
name: smart-school-examination-assessment
description: Authoritative UI/UX design standard, component architecture, and implementation guidelines for the complete Examination Management & Academic Assessment Suite on the Smart School Enterprise Platform. Covers Examination Management, Admit Card Printing, Bulk Result Printing, Exam Groups, Exam Timetable, E-Result Printing, Exam Results, Bulk Admit Card Printing, Academic Multi Groups, Staff Admit Cards, and Academic Reports. Trigger on: "examination management", "admit card printing", "bulk result printing", "exam groups", "exam timetable", "e-result printing", "exam results", "bulk admit card", "academic multi groups", "staff admit cards", "academic reports".
---

# Examination Management & Academic Assessment Standard
## Smart School Enterprise Platform (ABLOB Architecture)

The **Examination Management & Academic Assessment Suite** establishes the authoritative operational, evaluation, and publishing standard for institutional assessments across the **Smart School Enterprise Platform**.

This suite powers high-stakes academic evaluations across all institutional tiers—from initial term exam group configuration and multi-room timetabling to mass cryptographic admit card issuance, multi-component mark evaluation (Theory, Practical, Viva, Continuous Assessment), automated grading rollups, high-throughput bulk PDF generation, and cross-session academic analytics.

---

## 1. Authoritative 11-Feature Taxonomy Across 4 Assessment Pillars

The examination suite organizes the 11 mission-critical examination capabilities into 4 functional pillars:

```
========================================================================================
PILLAR 1: EXAM GOVERNANCE & MULTI-GROUP ARCHITECTURE
========================================================================================
  01. Examination Management:
      - Canonical Copy: Create and manage exams for all classes and academic sessions.
      - Material Symbol: assignment_add
      - Color Accent: Royal Indigo (#4338CA)
      - Backend Microservice: ExaminationService
      - Entitlement: SUPER_ADMIN, CAMPUS_ADMIN
      - Kafka Event: school.assessment.exam-created

  02. Exam Groups:
      - Canonical Copy: Categorize exams into terms, units, or custom groups for easy reporting.
      - Material Symbol: folder_shared
      - Color Accent: Deep Violet (#7C3AED)
      - Backend Microservice: ExamGroupService
      - Entitlement: SUPER_ADMIN, CAMPUS_ADMIN
      - Grading Models: Pass/Fail, School Letter Grade, College CGPA (10.0), GPA (4.0/5.0), Average Passing

  03. Academic Multi Groups:
      - Canonical Copy: Organize exams, subjects, and students into multiple academic groups.
      - Material Symbol: hub
      - Color Accent: Indigo Blue (#6366F1)
      - Backend Microservice: AcademicCohortService
      - Entitlement: SUPER_ADMIN, CAMPUS_ADMIN
      - Purpose: Cross-stream cohorts (Science, Arts, Commerce), multi-departmental evaluation bands

========================================================================================
PILLAR 2: SCHEDULING, LOGISTICS & HALL PASSES
========================================================================================
  04. Exam Timetable:
      - Canonical Copy: Plan and publish detailed exam schedules by class and subject.
      - Material Symbol: calendar_month
      - Color Accent: Royal Blue (#2563EB)
      - Backend Microservice: ExamTimetableService
      - Entitlement: SUPER_ADMIN, CAMPUS_ADMIN, TEACHER (Read-Only: STUDENT, PARENT)
      - Attributes: Exam Date, Start Time, End Time, Room Allocations, Max Marks, Passing Marks

  05. Admit Card Printing:
      - Canonical Copy: Generate and print admit cards for all students at once.
      - Material Symbol: badge
      - Color Accent: Cyan (#0891B2)
      - Backend Microservice: AdmitCardService
      - Entitlement: SUPER_ADMIN, CAMPUS_ADMIN
      - Output: Hall tickets with student photo, barcode/QR roll number, exam schedule, instructions

  06. Bulk Admit Card Printing:
      - Canonical Copy: Generate and print admit cards for all students simultaneously.
      - Material Symbol: contact_page
      - Color Accent: Rose Crimson (#E11D48)
      - Backend Microservice: BulkPDFEngineService (Async Kafka Worker)
      - Entitlement: SUPER_ADMIN, CAMPUS_ADMIN
      - Throughput: Up to 5,000 admit cards compiled into a single collated PDF stream

  07. Staff Admit Cards / Duty Passes:
      - Canonical Copy: Issue examination cards or authorization passes for staff.
      - Material Symbol: verified_user
      - Color Accent: Slate Blue (#475569)
      - Backend Microservice: StaffDutyPassService
      - Entitlement: SUPER_ADMIN, CAMPUS_ADMIN
      - Purpose: Invigilator room badges, flying squad credentials, chief superintendent duty passes

========================================================================================
PILLAR 3: MARKS EVALUATION & RESULT PUBLICATION
========================================================================================
  08. Exam Results:
      - Canonical Copy: Record, compute, and publish student results with grades and remarks.
      - Material Symbol: fact_check
      - Color Accent: Amber Gold (#D97706)
      - Backend Microservice: MarksEvaluationService
      - Entitlement: SUPER_ADMIN, CAMPUS_ADMIN, TEACHER
      - Components: Theory, Practical, Viva, Internal Assessment, Negative Marking, Division

  09. Bulk Result Printing:
      - Canonical Copy: Print result sheets and mark sheets for multiple students at once.
      - Material Symbol: print
      - Color Accent: Emerald Green (#059669)
      - Backend Microservice: MarksheetPrintService
      - Entitlement: SUPER_ADMIN, CAMPUS_ADMIN
      - Formats: Tabulation Ledger, Student Marksheet Card, Combined Transcript

  10. E-Result Printing / Digital Marksheet:
      - Canonical Copy: Print result sheets and mark sheets in bulk efficiently.
      - Material Symbol: description
      - Color Accent: Teal / Mint (#0D9488)
      - Backend Microservice: EResultPortalService
      - Entitlement: ALL ROLES (Self-Service: STUDENT, PARENT)
      - Security: SHA-256 digital signature stamp, tamper-evident verification QR code

========================================================================================
PILLAR 4: INSTITUTIONAL INTELLIGENCE & PERFORMANCE ANALYTICS
========================================================================================
  11. Academic Reports:
      - Canonical Copy: Generate analytical reports on academic performance and progress.
      - Material Symbol: analytics
      - Color Accent: Fuchsia Purple (#A21CAF)
      - Backend Microservice: AssessmentAnalyticsService
      - Entitlement: SUPER_ADMIN, CAMPUS_ADMIN, TEACHER
      - Dimensions: Class Pass Rate, Subject Difficulty Index, Historical Trend, Outlier Detection
```

---

## 2. Liquid Glass Design System Specifications

The Examination & Assessment Suite strictly follows the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`):

### A. Surface Architecture
- **Frosted Glass Canvas**: `bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_0_0_rgba(15,23,42,0.06)]`
- **360-Degree Specular Highlight**:
  - Top highlight: `border-t border-white/90`
  - Subtle side reflections: `border-l border-white/40 border-r border-white/40`
  - Crisp bottom grounding: `border-b border-slate-200/60`
- **Zero Blur Shadows**: Tactile hard offset shadows (`shadow-[0_4px_0_0_#1e293b]` for active items, `shadow-[0_8px_0_0_rgba(15,23,42,0.06)]` for cards).

### B. Pure Typography Hierarchy
- **Font Family**: Google Sans / Inter for all Western text, Google Sans Khmer for Khmer localization.
- **Strict Color Tokens**:
  - Canvas: `#F8FAFC` (Slate 50)
  - Card Fill: `rgba(255, 255, 255, 0.82)`
  - Primary Text: `#0F172A` (Slate 900)
  - Secondary Text: `#475569` (Slate 600)
  - Accent Inks: `#4338CA` (Indigo), `#059669` (Emerald), `#2563EB` (Blue), `#D97706` (Amber), `#E11D48` (Rose)

### C. Icon & Visual Policy
- **ZERO EMOJI POLICY**: Strictly zero emoji characters under any circumstances in UI, documentation, and source code.
- **Google Material Symbols Outlined Only**: All icons use standard `material-symbols-outlined` with `font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24`.

---

## 3. Production React / TypeScript Showcase Component

```tsx
import React, { useState } from 'react';

export interface AssessmentFeature {
  id: string;
  pillar: 'GOVERNANCE' | 'LOGISTICS' | 'EVALUATION' | 'ANALYTICS';
  pillarLabel: string;
  title: string;
  description: string;
  symbol: string;
  accentColor: string;
  badge: string;
  entitlements: string[];
}

export const ASSESSMENT_FEATURES: AssessmentFeature[] = [
  {
    id: 'exam-mgmt',
    pillar: 'GOVERNANCE',
    pillarLabel: 'Exam Governance & Structure',
    title: 'Examination Management',
    description: 'Create and manage exams for all classes and academic sessions.',
    symbol: 'assignment_add',
    accentColor: '#4338CA',
    badge: 'Core Engine',
    entitlements: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'exam-groups',
    pillar: 'GOVERNANCE',
    pillarLabel: 'Exam Governance & Structure',
    title: 'Exam Groups',
    description: 'Categorize exams into terms, units, or custom groups for easy reporting.',
    symbol: 'folder_shared',
    accentColor: '#7C3AED',
    badge: 'Classification',
    entitlements: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'academic-multi-groups',
    pillar: 'GOVERNANCE',
    pillarLabel: 'Exam Governance & Structure',
    title: 'Academic Multi Groups',
    description: 'Organize exams, subjects, and students into multiple academic groups.',
    symbol: 'hub',
    accentColor: '#6366F1',
    badge: 'Cohorts',
    entitlements: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'exam-timetable',
    pillar: 'LOGISTICS',
    pillarLabel: 'Scheduling & Hall Passes',
    title: 'Exam Timetable',
    description: 'Plan and publish detailed exam schedules by class and subject.',
    symbol: 'calendar_month',
    accentColor: '#2563EB',
    badge: 'Scheduling',
    entitlements: ['Super Admin', 'Admin', 'Teacher', 'Student']
  },
  {
    id: 'admit-card-printing',
    pillar: 'LOGISTICS',
    pillarLabel: 'Scheduling & Hall Passes',
    title: 'Admit Card Printing',
    description: 'Generate and print admit cards for all students at once.',
    symbol: 'badge',
    accentColor: '#0891B2',
    badge: 'Hall Tickets',
    entitlements: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'bulk-admit-card',
    pillar: 'LOGISTICS',
    pillarLabel: 'Scheduling & Hall Passes',
    title: 'Bulk Admit Card Printing',
    description: 'Generate and print admit cards for all students simultaneously.',
    symbol: 'contact_page',
    accentColor: '#E11D48',
    badge: 'Async Batch',
    entitlements: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'staff-admit-cards',
    pillar: 'LOGISTICS',
    pillarLabel: 'Scheduling & Hall Passes',
    title: 'Staff Admit Cards',
    description: 'Issue examination cards or authorization passes for staff.',
    symbol: 'verified_user',
    accentColor: '#475569',
    badge: 'Invigilators',
    entitlements: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'exam-results',
    pillar: 'EVALUATION',
    pillarLabel: 'Evaluation & Publishing',
    title: 'Exam Results',
    description: 'Record, compute, and publish student results with grades and remarks.',
    symbol: 'fact_check',
    accentColor: '#D97706',
    badge: 'Grading',
    entitlements: ['Super Admin', 'Admin', 'Teacher']
  },
  {
    id: 'bulk-result-printing',
    pillar: 'EVALUATION',
    pillarLabel: 'Evaluation & Publishing',
    title: 'Bulk Result Printing',
    description: 'Print result sheets and mark sheets for multiple students at once.',
    symbol: 'print',
    accentColor: '#059669',
    badge: 'Batch Transcripts',
    entitlements: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'e-result-printing',
    pillar: 'EVALUATION',
    pillarLabel: 'Evaluation & Publishing',
    title: 'E-Result Printing',
    description: 'Print result sheets and mark sheets in bulk efficiently.',
    symbol: 'description',
    accentColor: '#0D9488',
    badge: 'Self-Service',
    entitlements: ['All Roles', 'Student', 'Parent']
  },
  {
    id: 'academic-reports',
    pillar: 'ANALYTICS',
    pillarLabel: 'Institutional Intelligence',
    title: 'Academic Reports',
    description: 'Generate analytical reports on academic performance and progress.',
    symbol: 'analytics',
    accentColor: '#A21CAF',
    badge: 'BI Analytics',
    entitlements: ['Super Admin', 'Campus Admin', 'Dean']
  }
];

export const ExaminationAssessmentShowcase: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string>('ALL');

  const pillars = [
    { key: 'ALL', label: 'All Capabilities', count: ASSESSMENT_FEATURES.length },
    { key: 'GOVERNANCE', label: 'Governance & Structure', count: 3 },
    { key: 'LOGISTICS', label: 'Scheduling & Hall Passes', count: 4 },
    { key: 'EVALUATION', label: 'Evaluation & Publishing', count: 3 },
    { key: 'ANALYTICS', label: 'Performance Analytics', count: 1 }
  ];

  const filteredFeatures = selectedPillar === 'ALL'
    ? ASSESSMENT_FEATURES
    : ASSESSMENT_FEATURES.filter(f => f.pillar === selectedPillar);

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden" id="examination-assessment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200/60 backdrop-blur-md text-indigo-800 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
            Institutional Assessment Framework
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-sans">
            EXAMINATION & ASSESSMENT
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-sans leading-relaxed">
            Enterprise examination governance, automated hall pass generation, multi-tier marks computation, and instant verifiable transcript publishing.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {pillars.map((p) => {
            const isActive = selectedPillar === p.key;
            return (
              <button
                key={p.key}
                onClick={() => setSelectedPillar(p.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 border flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[0_4px_0_0_#4338ca]'
                    : 'bg-white/80 text-slate-700 border-white/60 hover:bg-white hover:text-slate-900 shadow-[0_4px_0_0_rgba(15,23,42,0.04)] backdrop-blur-md'
                }`}
              >
                <span>{p.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {p.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {/* Card Topline: Icon + Badge */}
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

                {/* Subtitle / Pillar Category */}
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

              {/* Entitlement Tags */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Access:</span>
                {feat.entitlements.map((role) => (
                  <span
                    key={role}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/50"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Architecture Metrics Banner */}
        <div className="mt-16 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 p-8 shadow-[0_10px_0_0_rgba(15,23,42,0.06)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/50">
            <div className="text-3xl font-black text-indigo-900 font-sans">5+</div>
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mt-1">Grading Systems</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Letter, CGPA, GPA, CBSE, Pass/Fail</div>
          </div>
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100/50">
            <div className="text-3xl font-black text-blue-900 font-sans">100%</div>
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mt-1">Bulk Collated PDF</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Instant admit cards & marksheets</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
            <div className="text-3xl font-black text-emerald-900 font-sans">SHA-256</div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mt-1">Tamper Verification</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Scannable QR grade authentication</div>
          </div>
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100/50">
            <div className="text-3xl font-black text-rose-900 font-sans">Multi-Room</div>
            <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mt-1">Invigilator Passes</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Staff badges & supervisor logs</div>
          </div>
        </div>

      </div>
    </section>
  );
};

---

## 4. Database Schema & PostgreSQL Row-Level Security (RLS)

All examination tables are protected by branch-level multi-tenancy:

```sql
-- 1. Examination Groups
CREATE TABLE exam_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    exam_type VARCHAR(64) NOT NULL, -- GENERAL_PASS_FAIL, SCHOOL_LETTER, COLLEGE_CGPA, GPA_SCALE, AVERAGE_PASSING
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Master Exams
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    exam_group_id UUID NOT NULL REFERENCES exam_groups(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    publish_status VARCHAR(32) DEFAULT 'DRAFT', -- DRAFT, SCHEDULED, IN_PROGRESS, CONCLUDED, PUBLISHED
    results_published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Exam Timetable Schedules
CREATE TABLE exam_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE RESTRICT,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE RESTRICT,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE RESTRICT,
    room_id UUID REFERENCES classroom_rooms(id) ON DELETE SET NULL,
    exam_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_minutes INT GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_time - start_time))/60) STORED,
    max_marks NUMERIC(6,2) NOT NULL DEFAULT 100.00,
    passing_marks NUMERIC(6,2) NOT NULL DEFAULT 40.00,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Student Marks & Evaluation
CREATE TABLE student_exam_marks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    exam_schedule_id UUID NOT NULL REFERENCES exam_schedules(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    theory_marks NUMERIC(6,2) DEFAULT 0.00,
    practical_marks NUMERIC(6,2) DEFAULT 0.00,
    viva_marks NUMERIC(6,2) DEFAULT 0.00,
    continuous_eval_marks NUMERIC(6,2) DEFAULT 0.00,
    total_marks_obtained NUMERIC(6,2) GENERATED ALWAYS AS (theory_marks + practical_marks + viva_marks + continuous_eval_marks) STORED,
    is_absent BOOLEAN DEFAULT FALSE,
    grade VARCHAR(16),
    grade_point NUMERIC(4,2),
    remarks TEXT,
    evaluator_staff_id UUID REFERENCES staffs(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_exam UNIQUE(exam_schedule_id, student_id)
);

-- 5. Admit Cards & Hall Ticket Issuance
CREATE TABLE exam_admit_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    roll_number VARCHAR(64) NOT NULL,
    verification_hash VARCHAR(128) NOT NULL,
    qr_code_payload TEXT NOT NULL,
    is_printed BOOLEAN DEFAULT FALSE,
    issued_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_admit_card UNIQUE(exam_id, student_id)
);

-- 6. Staff Duty Passes & Invigilation
CREATE TABLE exam_staff_passes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staffs(id) ON DELETE CASCADE,
    duty_role VARCHAR(64) NOT NULL, -- CHIEF_SUPERINTENDENT, ROOM_INVIGILATOR, SQUAD_INSPECTOR
    assigned_room_id UUID REFERENCES classroom_rooms(id),
    issued_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ENABLE ROW-LEVEL SECURITY
ALTER TABLE exam_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_exam_marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_admit_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_staff_passes ENABLE ROW LEVEL SECURITY;

-- CREATE RLS POLICY FOR TENANT ISOLATION
CREATE POLICY branch_isolation_exam_groups ON exam_groups
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_exams ON exams
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_exam_schedules ON exam_schedules
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_exam_marks ON student_exam_marks
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_admit_cards ON exam_admit_cards
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_staff_passes ON exam_staff_passes
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );
```

---

## 5. Synchronous-to-Asynchronous Kafka Pipeline

High-throughput actions such as bulk admit card compilation, marksheet rendering, and final grade publishing run asynchronously via Kafka:

```
[Web Admin / Dean Request]
            │
            ▼
[Spring Boot 3 REST Endpoint] ──> (Returns 202 Accepted + Job UUID)
            │
            ▼
[Kafka Topic: school.assessment.bulk-generation]
            │
            ├─ Payload: { jobId, examId, classId, templateId, jobType: "ADMIT_CARD_BULK" }
            │
            ▼
[Async Worker Engine / Virtual Threads]
            │
            ├─ 1. Query Batch Student Cohort via Neon RLS
            ├─ 2. Compile Cryptographic SHA-256 Hashes & QR Codes
            ├─ 3. Stream Render OpenPDF / iText Vector Marksheets
            ├─ 4. Upload Single Bundled PDF Stream to S3 Secure Vault
            │
            ▼
[WebSocket Event: /topic/assessment-jobs/{jobId}]
            │
            ▼
[Browser Toast: "Admit Cards Ready for Download (PDF)"]
```

---

## 6. Audit & Verification Checklist

- [x] All 11 capabilities accurately mapped to institutional workflows.
- [x] Strict ZERO EMOJI rule enforced across markdown, component code, and database schema.
- [x] Google Material Symbols Outlined exclusively utilized with 500 optical weight.
- [x] Tactile hard offset shadows and 360-degree specular highlights implemented.
- [x] Multi-tenancy protected with PostgreSQL RLS policies and Spring Boot 3 virtual threads.
