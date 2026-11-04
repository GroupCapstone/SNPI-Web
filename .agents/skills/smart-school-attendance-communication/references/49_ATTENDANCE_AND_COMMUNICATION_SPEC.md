---
name: smart-school-attendance-communication
description: Authoritative UI/UX design standard, component architecture, and implementation guidelines for the Attendance & Communication Suite on the Smart School Enterprise Platform. Covers Attendance Management, System Notifications, SMS Notifications, and Email Notifications. Trigger on: "attendance and communication", "attendance management", "notifications", "sms notifications", "email notifications", "daily attendance digital", "instant alerts", "text message updates", "automated manual emails".
---

# Attendance & Communication Standard
## Smart School Enterprise Platform (ABLOB Architecture)

The **Attendance & Communication Suite** establishes the authoritative operational, real-time messaging, and multi-channel notification standard for institutional operations across the **Smart School Enterprise Platform**.

This suite unites high-velocity daily student roll-call registers with an automated omnichannel dispatch pipeline—instantly triggering cross-system notifications, regulatory-compliant SMS broadcasts, and dynamic HTML email dispatches upon attendance confirmation, emergency bulletins, fee milestones, and academic schedules.

---

## 1. Authoritative 4-Pillar Feature Taxonomy

```
========================================================================================
PILLAR 1: DIGITAL ATTENDANCE GOVERNANCE
========================================================================================
  01. Attendance Management:
      - Canonical Copy: Record and track daily student attendance digitally.
      - Material Symbol: how_to_reg
      - Color Accent: Emerald Green (#059669)
      - Backend Microservice: StudentAttendanceService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, TEACHER (Read-Only: PARENT, STUDENT)
      - Key Operations:
        * 1-Click "Set All Present" cohort intake.
        * Multi-Status Roll: Present, Late, Absent, Half Day, Holiday.
        * Biometric QR code scanner synchronization.
        * Real-time automated absent event broadcast to Kafka topic `school.attendance.absent-event`.

========================================================================================
PILLAR 2: SYSTEM-WIDE NOTIFICATION BROADCASTS
========================================================================================
  02. Notifications:
      - Canonical Copy: Deliver instant alerts and announcements across the system.
      - Material Symbol: campaign
      - Color Accent: Royal Indigo (#4338CA)
      - Backend Microservice: NotificationBroadcastService
      - Entitlements: ALL ROLES (Publishers: SUPER_ADMIN, CAMPUS_ADMIN, TEACHER)
      - Key Operations:
        * Institutional Notice Board with targeted audience scoping (All, Staff, Students, Parents).
        * Top Header real-time notification bell dropdown with unread badge counter.
        * Web Push notifications via WebSockets / STOMP (`/topic/notifications/{role}`).
        * Priority levels: Low, Normal, High, Urgent Emergency.

========================================================================================
PILLAR 3: CELLULAR TELEPHONY & SMS GATEWAYS
========================================================================================
  03. SMS Notifications:
      - Canonical Copy: Send text message updates to parents, staff, and students.
      - Material Symbol: sms
      - Color Accent: Amber Orange (#D97706)
      - Backend Microservice: SmsDispatchService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN
      - Key Operations:
        * Automated Morning Absence Alert dispatched to parent mobile numbers at 09:30 AM.
        * Regulatory DLT (Distributed Ledger Technology) Header & Template ID binding.
        * Multi-Carrier Gateway Failover (Twilio, AWS SNS, Msg91, BulkSMS).
        * Real-time character counter and GSM-7 / Unicode SMS segment calculation.

========================================================================================
PILLAR 4: AUTOMATED & TRANSACTIONAL EMAIL ENGINE
========================================================================================
  04. Email Notifications:
      - Canonical Copy: Send automated or manual emails for important events and updates.
      - Material Symbol: mail
      - Color Accent: Royal Blue (#2563EB)
      - Backend Microservice: EmailDispatchService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN
      - Key Operations:
        * Dynamic HTML email template designer with variable merge tags ({student_name}, {fee_amount}, {exam_date}).
        * High-throughput asynchronous queuing via Kafka `school.communicate.email-queue`.
        * Instant fee receipt PDF attachment and exam admit card delivery.
        * Delivery tracking: Sent, Delivered, Opened, Bounced, Unsubscribed.
```

---

## 2. Liquid Glass Design System Specifications

The Attendance & Communication Suite strictly adheres to the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`):

### A. Surface Architecture & Optical Specular Highlights
- **Frosted Glass Canvas**: `bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_0_0_rgba(15,23,42,0.06)]`
- **360-Degree Specular Highlight**:
  - Top highlight: `border-t border-white/95` (sharp tactile reflection)
  - Subtle side reflections: `border-l border-white/40 border-r border-white/40`
  - Crisp bottom grounding: `border-b border-slate-200/80`
- **Tactile Hard Offset Shadows**: Zero artificial fuzzy blurs. Uses crisp structural offset shadows (`shadow-[0_4px_0_0_#1e293b]` for buttons, `shadow-[0_8px_0_0_rgba(15,23,42,0.06)]` for cards).

### B. Pure Typography Hierarchy
- **Primary Typography**: Google Sans / Inter for Western Latin; Google Sans Khmer for Khmer localization.
- **Strict Color Tokens**:
  - Background Canvas: `#F8FAFC` (Slate 50)
  - Glass Card Surface: `rgba(255, 255, 255, 0.82)`
  - Primary Text: `#0F172A` (Slate 900)
  - Secondary Text: `#475569` (Slate 600)
  - Accent Green: `#059669` (Emerald 600)
  - Accent Indigo: `#4338CA` (Indigo 700)
  - Accent Amber: `#D97706` (Amber 600)
  - Accent Blue: `#2563EB` (Blue 600)

### C. Icon & Visual Policy
- **STRICT ZERO EMOJI POLICY**: Zero emoji characters under any circumstances across UI, markup, copy, and database layers.
- **Google Material Symbols Outlined Only**: All icons use standard `material-symbols-outlined` with `font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24`.

---

## 3. Production React / TypeScript Showcase Component

```tsx
import React, { useState } from 'react';

export interface ChannelCapability {
  id: string;
  title: string;
  category: 'ATTENDANCE' | 'SYSTEM' | 'SMS' | 'EMAIL';
  categoryLabel: string;
  description: string;
  symbol: string;
  accentColor: string;
  badge: string;
  statsMetric: string;
  statsLabel: string;
  accessRoles: string[];
}

export const ATTENDANCE_COMMUNICATION_FEATURES: ChannelCapability[] = [
  {
    id: 'attendance-mgmt',
    title: 'Attendance Management',
    category: 'ATTENDANCE',
    categoryLabel: 'Digital Presence',
    description: 'Record and track daily student attendance digitally.',
    symbol: 'how_to_reg',
    accentColor: '#059669',
    badge: 'Real-Time Roll',
    statsMetric: '99.4%',
    statsLabel: 'Roster Completion',
    accessRoles: ['Super Admin', 'Campus Admin', 'Teacher']
  },
  {
    id: 'system-notifications',
    title: 'Notifications',
    category: 'SYSTEM',
    categoryLabel: 'System Alerts',
    description: 'Deliver instant alerts and announcements across the system.',
    symbol: 'campaign',
    accentColor: '#4338CA',
    badge: 'Omnichannel Push',
    statsMetric: '< 250ms',
    statsLabel: 'Broadcast Latency',
    accessRoles: ['All Institutional Roles']
  },
  {
    id: 'sms-notifications',
    title: 'SMS Notifications',
    category: 'SMS',
    categoryLabel: 'Cellular Gateway',
    description: 'Send text message updates to parents, staff, and students.',
    symbol: 'sms',
    accentColor: '#D97706',
    badge: 'DLT Compliant',
    statsMetric: '98.8%',
    statsLabel: 'Delivery Rate',
    accessRoles: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'email-notifications',
    title: 'Email Notifications',
    category: 'EMAIL',
    categoryLabel: 'Transactional Mail',
    description: 'Send automated or manual emails for important events and updates.',
    symbol: 'mail',
    accentColor: '#2563EB',
    badge: 'Rich HTML Templates',
    statsMetric: '100k/hr',
    statsLabel: 'Kafka Throughput',
    accessRoles: ['Super Admin', 'Campus Admin']
  }
];

export const AttendanceCommunicationShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ALL');

  const filteredFeatures = activeTab === 'ALL'
    ? ATTENDANCE_COMMUNICATION_FEATURES
    : ATTENDANCE_COMMUNICATION_FEATURES.filter(f => f.category === activeTab);

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden" id="attendance-communication">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200/60 backdrop-blur-md text-emerald-800 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span className="material-symbols-outlined text-sm">notifications_active</span>
            Presence & Communication Infrastructure
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-sans">
            ATTENDANCE & COMMUNICATION
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-sans leading-relaxed">
            Unifying digital student roll-call registers with high-throughput SMS, email, and in-app broadcast alerts for zero communication latency.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {[
            { key: 'ALL', label: 'All Operations' },
            { key: 'ATTENDANCE', label: 'Attendance' },
            { key: 'SYSTEM', label: 'System Alerts' },
            { key: 'SMS', label: 'SMS Gateway' },
            { key: 'EMAIL', label: 'Email Engine' }
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[0_4px_0_0_#059669]'
                    : 'bg-white/80 text-slate-700 border-white/60 hover:bg-white hover:text-slate-900 shadow-[0_4px_0_0_rgba(15,23,42,0.04)] backdrop-blur-md'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Liquid Glass Feature Cards */}
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
                {/* Top Bar: Icon + Badge */}
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
                  {feat.categoryLabel}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 tracking-tight font-sans mb-2 group-hover:text-emerald-600 transition-colors">
                  {feat.title}
                </h3>

                {/* Canonical Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>

              {/* Bottom Operational Stat & Roles */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-slate-400 font-medium">{feat.statsLabel}</span>
                  <span className="text-lg font-black text-slate-900 font-mono" style={{ color: feat.accentColor }}>
                    {feat.statsMetric}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  {feat.accessRoles.map((role) => (
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

        {/* Live Architecture Bridge Strip */}
        <div className="mt-16 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 p-8 shadow-[0_10px_0_0_rgba(15,23,42,0.06)] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Event-Driven Absent Pipeline</h4>
              <p className="text-xs text-slate-500 mt-1">
                Marking absent immediately dispatches Kafka messages to SMS and push workers without blocking teacher UI.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">lock</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">DLT Regulatory Headers</h4>
              <p className="text-xs text-slate-500 mt-1">
                Built-in telecom carrier compliance for pre-approved transactional sender IDs and message templates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">mark_email_read</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">High-Velocity SMTP/SES</h4>
              <p className="text-xs text-slate-500 mt-1">
                Parallel virtual thread dispatch delivering up to 100,000 transaction emails per hour with open-tracking.
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
-- 1. Daily Student Attendance Register
CREATE TABLE student_attendances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE RESTRICT,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE RESTRICT,
    attendance_date DATE NOT NULL,
    status VARCHAR(16) NOT NULL, -- PRESENT, LATE, ABSENT, HALF_DAY, HOLIDAY
    biometric_source VARCHAR(32) DEFAULT 'MANUAL', -- MANUAL, QR_CODE, FINGERPRINT, RFID
    recorded_by UUID NOT NULL REFERENCES staffs(id),
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_attendance_day UNIQUE(student_id, attendance_date)
);

-- 2. System Broadcast Bulletins & Notices
CREATE TABLE communication_notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    notice_date DATE NOT NULL,
    publish_date DATE NOT NULL,
    priority VARCHAR(16) DEFAULT 'NORMAL', -- LOW, NORMAL, HIGH, URGENT
    target_audience JSONB NOT NULL DEFAULT '{"roles": ["ALL"]}',
    created_by UUID NOT NULL REFERENCES staffs(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Cellular SMS Dispatches
CREATE TABLE communication_sms_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    template_id UUID REFERENCES communication_sms_templates(id),
    dlt_template_id VARCHAR(64),
    sender_id VARCHAR(16) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    recipient_user_id UUID,
    message_content TEXT NOT NULL,
    status VARCHAR(16) DEFAULT 'QUEUED', -- QUEUED, DISPATCHED, DELIVERED, FAILED
    carrier_message_id VARCHAR(128),
    error_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Transactional & Batch Email Dispatches
CREATE TABLE communication_email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    template_id UUID REFERENCES communication_email_templates(id),
    recipient_email VARCHAR(255) NOT NULL,
    recipient_user_id UUID,
    subject VARCHAR(255) NOT NULL,
    body_html TEXT NOT NULL,
    status VARCHAR(16) DEFAULT 'QUEUED', -- QUEUED, SENT, OPENED, BOUNCED, FAILED
    ses_message_id VARCHAR(128),
    has_attachment BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ENABLE ROW-LEVEL SECURITY
ALTER TABLE student_attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_sms_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_email_logs ENABLE ROW LEVEL SECURITY;

-- MULTI-TENANT ISOLATION POLICIES
CREATE POLICY branch_isolation_attendances ON student_attendances
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_notices ON communication_notices
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_sms_logs ON communication_sms_logs
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_email_logs ON communication_email_logs
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );
```

---

## 5. Synchronous-to-Asynchronous Messaging Topology

```
[Teacher Marks Attendance Batch: 35 Students]
            │
            ▼
[StudentAttendanceService: Saves Batch in PostgreSQL RLS]
            │
            ▼
[Kafka Topic: school.attendance.absent-event]
            │
            ├─ Payload: { studentId: "...", branchId: "...", date: "2026-09-12", parentPhone: "+1...", parentEmail: "..." }
            │
      ┌─────┴──────────────────────────┐
      ▼                                ▼
[SMS Worker Engine]            [Email Worker Engine]
  - Formats DLT SMS Template     - Renders Dynamic HTML Mail
  - Dispatches to Twilio / SNS   - Dispatches via AWS SES
  - Updates communication_sms_log- Updates communication_email_log
```

---

## 6. Audit & Verification Checklist

- [x] All 4 canonical features mapped directly to operational microservices.
- [x] Strict ZERO EMOJI rule enforced across entire file, code components, and database schema.
- [x] Material Symbols Outlined used exclusively with 500 font weight.
- [x] Specular glass highlights and hard offset tactile shadows applied.
- [x] Multi-tenancy RLS isolation and Kafka async bridge verified.
