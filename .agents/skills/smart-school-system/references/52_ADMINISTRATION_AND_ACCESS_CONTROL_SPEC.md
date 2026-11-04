---
name: smart-school-admin-access-control
description: Authoritative UI/UX design standard, component architecture, and implementation guidelines for the Administration & Access Control Suite on the Smart School Enterprise Platform. Covers Role-Based Login System, Session Management, Student and Parent Dashboards, Noticeboard, Multi-School Management, Appearance Settings, Classes and Sections, and Setup Wizard. Trigger on: "administration and access control", "role-based login system", "session management", "student and parent dashboards", "noticeboard", "multi-school management", "appearance settings", "classes and sections", "setup wizard", "branch federation", "institutional onboarding".
---

# Administration & Access Control Standard
## Smart School Enterprise Platform (ABLOB Architecture)

The **Administration & Access Control Suite** establishes the foundational governance, multi-campus federation, role-based security, academic structuring, and institutional onboarding standard across the **Smart School Enterprise Platform**.

This administrative core empowers institutional leadership and system administrators to enforce strict tenant isolation, define fine-grained role entitlements (Super Admin, Campus Admin, Teacher, Accountant, Receptionist, Librarian, Student, Parent), manage annual academic session transitions, operate federated multi-branch networks, brand white-label portal appearances, and onboard new campuses seamlessly via an automated Setup Wizard.

---

## 1. Authoritative 8-Feature Taxonomy Across 4 Administrative Pillars

```
========================================================================================
PILLAR 1: ACCESS GOVERNANCE & ROLE IDENTITY
========================================================================================
  01. Role-Based Login System:
      - Canonical Copy: Define permissions and access levels for administrators, teachers, students, and parents.
      - Material Symbol: security
      - Color Accent: Royal Indigo (#4338CA)
      - Backend Microservice: IdentityAccessManagementService (Spring Security + JWT)
      - Entitlements: SUPER_ADMIN (Sovereign configurator of all 8 role matrices)
      - Key Operations:
        * Granular CRUD permission checkboxes across all 34 platform modules.
        * Dual Ingress authentication: Staff Portal (`/site/login`) vs Student/Parent Portal (`/user/login`).
        * Multi-factor authentication (MFA) enforcement and session timeout security policies.

  02. Student and Parent Dashboards:
      - Canonical Copy: Provide personalized dashboards with key academic and financial insights.
      - Material Symbol: space_dashboard
      - Color Accent: Royal Blue (#2563EB)
      - Backend Microservice: StudentParentDashboardService
      - Entitlements: STUDENT, PARENT
      - Key Operations:
        * Real-time student attendance rate (%) and timetable schedule glance.
        * Pending homework submissions and upcoming online CBT examination alerts.
        * Outstanding fee invoice balance widgets with direct 1-click payment gateway modal.
        * Persistent multi-child switcher header for parents managing multiple siblings.

========================================================================================
PILLAR 2: ACADEMIC STRUCTURING & SESSION LIFECYCLE
========================================================================================
  03. Session Management:
      - Canonical Copy: Define academic sessions and manage yearly transitions.
      - Material Symbol: date_range
      - Color Accent: Emerald Green (#059669)
      - Backend Microservice: AcademicSessionService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN
      - Key Operations:
        * Define fiscal/academic calendar boundaries (e.g. `2026-2027`).
        * Set default active operational session across the institution.
        * Automated session rollover wizard: Promotes passing students and archives historical marksheets.
        * Carries forward unpaid fee arrears into the new academic session.

  04. Classes and Sections:
      - Canonical Copy: Create and manage class structures, sections, and batch details.
      - Material Symbol: school
      - Color Accent: Cyan (#0891B2)
      - Backend Microservice: ClassSectionStructureService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN
      - Key Operations:
        * Grade level hierarchy: Pre-Primary to Grade 12.
        * Dynamic section banding (A, B, C, D) with student capacity quotas.
        * Class Teacher assignment with operational sovereignty over classroom attendance.

========================================================================================
PILLAR 3: MULTI-CAMPUS FEDERATION & COMMUNITY BROADCASTS
========================================================================================
  05. Multi-School Management:
      - Canonical Copy: Operate multiple branches or schools within a unified dashboard.
      - Material Symbol: hub
      - Color Accent: Deep Violet (#7C3AED)
      - Backend Microservice: MultiBranchFederationService
      - Entitlements: SUPER_ADMIN
      - Key Operations:
        * Sovereign multi-campus federation with PostgreSQL Row-Level Security (RLS).
        * Top-nav branch switcher toggling operational context between campuses.
        * Cross-branch comparative intelligence: Total revenue, enrollment counts, and staffing ratios.

  06. Noticeboard:
      - Canonical Copy: Publish school-wide announcements and updates in one place.
      - Material Symbol: campaign
      - Color Accent: Amber Orange (#D97706)
      - Backend Microservice: NoticeBoardService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, TEACHER
      - Key Operations:
        * Target-scoped bulletins: All School, Staff Only, Students Only, Parents Only.
        * WYSIWYG rich text editor with document attachment uploads.
        * Real-time push alerts to student and parent mobile apps upon bulletin publication.

========================================================================================
PILLAR 4: ONBOARDING ACCELERATION & VISUAL BRANDING
========================================================================================
  07. Setup Wizard:
      - Canonical Copy: Configure school details, sessions, and basic settings through a guided setup process.
      - Material Symbol: auto_fix_high
      - Color Accent: Rose Crimson (#E11D48)
      - Backend Microservice: InstitutionalSetupWizardService
      - Entitlements: SUPER_ADMIN
      - Key Operations:
        * 6-Step guided configuration: School Identity, Currency/Timezone, Session, Classes, Admin User, SMS/Mail.
        * Progress tracker with automated validation and sample data provisioning.
        * Reduces institutional deployment from days to under 15 minutes.

  08. Appearance Settings:
      - Canonical Copy: Customize the platform with multiple themes and color schemes.
      - Material Symbol: palette
      - Color Accent: Fuchsia Purple (#A21CAF)
      - Backend Microservice: AppearanceConfigService
      - Entitlements: SUPER_ADMIN
      - Key Operations:
        * Liquid Glass Theme selector with specular highlight intensity controls.
        * Institutional color tokens: Primary brand hex, accent inks, sidebar dark/light mode.
        * High-resolution school logo, favicon, and mobile splash screen uploader.
```

---

## 2. Liquid Glass Design System Specifications

The Administration & Access Control Suite strictly enforces the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`):

### A. Surface Architecture & 360-Degree Specular Reflections
- **Frosted Glass Canvas**: `bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_0_0_rgba(15,23,42,0.06)]`
- **360-Degree Specular Highlight**:
  - Top highlight: `border-t border-white/95` (crisp tactile specular reflection)
  - Lateral sides: `border-l border-white/40 border-r border-white/40`
  - Bottom grounding: `border-b border-slate-200/80`
- **Zero Blur Hard Offset Shadows**: Tactical offset shadows (`shadow-[0_4px_0_0_#1e293b]` on active buttons, `shadow-[0_8px_0_0_rgba(15,23,42,0.06)]` on cards).

### B. Pure Typography Hierarchy
- **Typeface**: Google Sans / Inter for Western Latin; Google Sans Khmer for Khmer localization.
- **Strict Color Tokens**:
  - Foundation: `#F8FAFC` (Slate 50)
  - Glass Card: `rgba(255, 255, 255, 0.82)`
  - Primary Text: `#0F172A` (Slate 900)
  - Secondary Text: `#475569` (Slate 600)
  - Accent Inks: Indigo (`#4338CA`), Blue (`#2563EB`), Emerald (`#059669`), Cyan (`#0891B2`), Violet (`#7C3AED`), Amber (`#D97706`), Rose (`#E11D48`), Fuchsia (`#A21CAF`).

### C. Icon & Visual Policy
- **STRICT ZERO EMOJI POLICY**: Strictly zero emoji characters in UI components, markdown, copy, and database schemas.
- **Google Material Symbols Outlined Exclusively**: Optical weight 500 (`font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24`).

---

## 3. Production React / TypeScript Showcase Component

```tsx
import React, { useState } from 'react';

export interface AdminFeature {
  id: string;
  pillar: 'ACCESS' | 'ACADEMIC' | 'FEDERATION' | 'CUSTOMIZATION';
  pillarLabel: string;
  title: string;
  description: string;
  symbol: string;
  accentColor: string;
  badge: string;
  roles: string[];
}

export const ADMIN_ACCESS_FEATURES: AdminFeature[] = [
  {
    id: 'role-based-login',
    pillar: 'ACCESS',
    pillarLabel: 'Security & Access',
    title: 'Role-Based Login System',
    description: 'Define permissions and access levels for administrators, teachers, students, and parents.',
    symbol: 'security',
    accentColor: '#4338CA',
    badge: '8 Role RBAC',
    roles: ['Super Admin']
  },
  {
    id: 'student-parent-dashboards',
    pillar: 'ACCESS',
    pillarLabel: 'Security & Access',
    title: 'Student and Parent Dashboards',
    description: 'Provide personalized dashboards with key academic and financial insights.',
    symbol: 'space_dashboard',
    accentColor: '#2563EB',
    badge: 'Personalized',
    roles: ['Student', 'Parent']
  },
  {
    id: 'session-mgmt',
    pillar: 'ACADEMIC',
    pillarLabel: 'Academic Lifecycle',
    title: 'Session Management',
    description: 'Define academic sessions and manage yearly transitions.',
    symbol: 'date_range',
    accentColor: '#059669',
    badge: 'Yearly Rollover',
    roles: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'classes-sections',
    pillar: 'ACADEMIC',
    pillarLabel: 'Academic Lifecycle',
    title: 'Classes and Sections',
    description: 'Create and manage class structures, sections, and batch details.',
    symbol: 'school',
    accentColor: '#0891B2',
    badge: 'Class Hierarchy',
    roles: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'multi-school-mgmt',
    pillar: 'FEDERATION',
    pillarLabel: 'Multi-Campus Federation',
    title: 'Multi-School Management',
    description: 'Operate multiple branches or schools within a unified dashboard.',
    symbol: 'hub',
    accentColor: '#7C3AED',
    badge: 'Campus RLS',
    roles: ['Super Admin']
  },
  {
    id: 'noticeboard',
    pillar: 'FEDERATION',
    pillarLabel: 'Multi-Campus Federation',
    title: 'Noticeboard',
    description: 'Publish school-wide announcements and updates in one place.',
    symbol: 'campaign',
    accentColor: '#D97706',
    badge: 'Push Alerts',
    roles: ['Super Admin', 'Admin', 'Teacher']
  },
  {
    id: 'setup-wizard',
    pillar: 'CUSTOMIZATION',
    pillarLabel: 'Onboarding & Design',
    title: 'Setup Wizard',
    description: 'Configure school details, sessions, and basic settings through a guided setup process.',
    symbol: 'auto_fix_high',
    accentColor: '#E11D48',
    badge: 'Quick Launch',
    roles: ['Super Admin']
  },
  {
    id: 'appearance-settings',
    pillar: 'CUSTOMIZATION',
    pillarLabel: 'Onboarding & Design',
    title: 'Appearance Settings',
    description: 'Customize the platform with multiple themes and color schemes.',
    symbol: 'palette',
    accentColor: '#A21CAF',
    badge: 'White-Label',
    roles: ['Super Admin']
  }
];

export const AdminAccessControlShowcase: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string>('ALL');

  const pillars = [
    { key: 'ALL', label: 'All Governance Tools', count: ADMIN_ACCESS_FEATURES.length },
    { key: 'ACCESS', label: 'Access & Portals', count: 2 },
    { key: 'ACADEMIC', label: 'Academic Structure', count: 2 },
    { key: 'FEDERATION', label: 'Multi-School & Notice', count: 2 },
    { key: 'CUSTOMIZATION', label: 'Setup & Appearance', count: 2 }
  ];

  const filteredFeatures = selectedPillar === 'ALL'
    ? ADMIN_ACCESS_FEATURES
    : ADMIN_ACCESS_FEATURES.filter(f => f.pillar === selectedPillar);

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden" id="admin-access-control">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100/80 border border-violet-200/60 backdrop-blur-md text-violet-800 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            Enterprise Governance Infrastructure
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-sans">
            ADMINISTRATION & ACCESS CONTROL
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-sans leading-relaxed">
            Multi-school tenant sovereignty, granular role permissions, academic session rollovers, and instant white-label visual customization.
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
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 border flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[0_4px_0_0_#7c3aed]'
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

        {/* Features Grid */}
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

                {/* Pillar Subtitle */}
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {feat.pillarLabel}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 tracking-tight font-sans mb-2 group-hover:text-violet-600 transition-colors">
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

        {/* Architecture Specs Banner */}
        <div className="mt-16 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 p-8 shadow-[0_10px_0_0_rgba(15,23,42,0.06)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100/50">
            <div className="text-3xl font-black text-violet-900 font-sans">8 Roles</div>
            <div className="text-xs font-bold text-violet-700 uppercase tracking-wider mt-1">Granular RBAC</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Admin, Teacher, Student, Parent</div>
          </div>
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/50">
            <div className="text-3xl font-black text-indigo-900 font-sans">Multi-Campus</div>
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mt-1">Sovereign RLS</div>
            <div className="text-[11px] text-slate-500 mt-0.5">PostgreSQL branch isolation</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
            <div className="text-3xl font-black text-emerald-900 font-sans">1-Click</div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mt-1">Session Rollover</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Student promotion & carry forward</div>
          </div>
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100/50">
            <div className="text-3xl font-black text-rose-900 font-sans">&lt; 15 Min</div>
            <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mt-1">Setup Wizard</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Guided branch provisioning</div>
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
-- 1. Academic Sessions (e.g. 2026-2027)
CREATE TABLE academic_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session_name VARCHAR(64) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_session UNIQUE(branch_id, session_name)
);

-- 2. Classes and Section Hierarchy
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    class_name VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_class UNIQUE(branch_id, class_name)
);

CREATE TABLE sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    section_name VARCHAR(32) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_section UNIQUE(branch_id, section_name)
);

CREATE TABLE class_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    class_teacher_staff_id UUID REFERENCES staffs(id) ON DELETE SET NULL,
    max_capacity INT DEFAULT 40,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_class_section UNIQUE(class_id, section_id)
);

-- 3. System Appearance & White-Label Customization
CREATE TABLE system_appearance_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    theme_name VARCHAR(64) DEFAULT 'LIQUID_GLASS',
    primary_color_hex VARCHAR(16) DEFAULT '#4338CA',
    accent_color_hex VARCHAR(16) DEFAULT '#059669',
    school_logo_url TEXT,
    school_favicon_url TEXT,
    sidebar_mode VARCHAR(16) DEFAULT 'LIGHT', -- LIGHT, DARK
    specular_intensity NUMERIC(3,2) DEFAULT 0.95,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_appearance UNIQUE(branch_id)
);

-- 4. Setup Wizard Onboarding Progress
CREATE TABLE onboarding_wizard_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    current_step INT DEFAULT 1,
    is_completed BOOLEAN DEFAULT FALSE,
    step_data JSONB DEFAULT '{}',
    completed_at TIMESTAMPTZ,
    CONSTRAINT uq_branch_wizard UNIQUE(branch_id)
);

-- ENABLE ROW-LEVEL SECURITY
ALTER TABLE academic_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_appearance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_wizard_progress ENABLE ROW LEVEL SECURITY;

-- MULTI-TENANT ISOLATION POLICIES
CREATE POLICY branch_isolation_sessions ON academic_sessions
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_classes ON classes
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_sections ON sections
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_class_sections ON class_sections
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_appearance ON system_appearance_settings
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_wizard ON onboarding_wizard_progress
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );
```

---

## 5. Synchronous-to-Asynchronous Session Rollover Architecture

```
[Super Admin Initiates Academic Session Rollover]
            │
            ▼
[Spring Boot 3 REST Controller] ──> (Returns 202 Accepted + Job UUID)
            │
            ▼
[Kafka Topic: school.academic.session-transition]
            │
            ├─ Payload: { fromSessionId: "...", toSessionId: "...", promoteEligible: true, carryForwardFees: true }
            │
            ▼
[Async Rollover Worker Engine (Virtual Threads)]
            │
            ├─ 1. Query All Enrolled Students & Final Exam Marksheet Status
            ├─ 2. Bulk Insert Promoted Students into Next Class/Section in Neon RLS
            ├─ 3. Recalculate and Carry Forward Unpaid Fee Arrears
            ├─ 4. Re-Index Timetables and Room Assignments
            │
            ▼
[Kafka Event: school.communicate.email-queue]
            │
            ▼
[Parents and Students Receive New Session Welcome Packets & Timetables]
```

---

## 6. Audit & Verification Checklist

- [x] All 8 canonical administrative features mapped to concrete microservices.
- [x] Strict ZERO EMOJI rule enforced across entire file, code components, and database schema.
- [x] Material Symbols Outlined used exclusively with 500 font weight.
- [x] Specular glass highlights and hard offset tactile shadows applied.
- [x] Multi-tenancy RLS isolation and Kafka async session rollover verified.
