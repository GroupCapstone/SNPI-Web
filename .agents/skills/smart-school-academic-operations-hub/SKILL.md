---
name: smart-school-academic-operations-hub
description: Authoritative Specification for the Smart School Integrated Academic Operations, Enrollment & Campus Lifecycle Architecture across 13 core operational domains - Online Enrollment & Fee Payment, Course/Class/Section, Lesson/Syllabus Planning, Timetable Planning, Attendance & Student Tracking, Daily Homework & Classwork, Assignments & Notes, Dynamic Certificates, Administrative Circulars, Online/Offline Exam, Question Paper Generator, Department & Stream, and Student/Staff/Visitor ID Cards. Includes future implementation roadmaps, phased rollout matrices, and architectural decision records. Trigger whenever developing, generating, refactoring, or discussing integrated academic operations or exam workflows.
---

# Smart School Academic Operations Hub
## Integrated Academic Operations, Enrollment & Assessment Architecture (ABLOB Architecture)

### Sovereign Declaration of Primary Skill Status
By institutional architectural directive, the **smart-school-academic-operations-hub** skill is ratified as a **PRIMARY TIER-1 CAPABILITY** of the Smart School Enterprise Platform.

This skill unites pedagogical administration, instructional delivery, examination and assessment engines, fee payment ingress, and campus transit telemetry into a single, cohesive operational architecture.

---

## 1. Master 13 Operational Domains

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               INTEGRATED ACADEMIC OPERATIONS & CAMPUS LIFECYCLE TOPOLOGY               │
├───────────────────────────┬───────────────────────────┬────────────────────────────────┤
│ 1. ADMISSION & STRUCTURE  │ 2. INSTRUCTION & PROGRESS │ 3. ASSESSMENT & CREDENTIALS    │
├───────────────────────────┼───────────────────────────┼────────────────────────────────┤
│ - Online Enrollment & Pay │ - Lesson & Syllabus Plans │ - Online & Offline CBT Exams   │
│ - Course, Class & Section │ - Clash-Free Timetables   │ - Question Paper Generator     │
│ - Department & Streams    │ - Homework & Classwork    │ - Dynamic Certificates & Mark  │
│ - Student/Staff ID Cards  │ - Assignments & Notes     │ - Administrative Circulars     │
├───────────────────────────┴───────────────────────────┴────────────────────────────────┤
│ 4. DAILY PRESENCE & TELEMETRY                                                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ - Sub-45s Classroom Attendance Roll-Call & In-App Absence Alerts                       │
│ - Biometric Turnstiles & Real-Time GPS Student Transit Telemetry (1km Geofenced Alerts)│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ BACKEND PLATFORM: Java 21 Virtual Threads, Neon PostgreSQL RLS, Kafka Canonical Events │
│ CLIENT PLATFORMS: Liquid Glass Web Portals (Admin/Teacher/Student) & Native Mobile Apps │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Inviolable Directives for Agents

1. **Directive A-01 (Async Enrollment & PDF Ingress)**: Online admissions intake, mass report card PDF rendering, and bulk question paper generation MUST execute asynchronously via Kafka workers, returning `HTTP 202 Accepted` with a `trackingId`.
2. **Directive A-02 (Sub-45-Second Classroom Attendance)**: The roll-call interface MUST default to "All Present" and allow single-tap toggling to Absent or Late, completing section submission within 45 seconds.
3. **Directive A-03 (15-Second CBT Autosave)**: Computer-Based Testing (CBT) modules MUST persist answers to local storage every 15 seconds to prevent student data loss during network dropouts.
4. **Directive A-04 (1km Geofenced Transit Alerts)**: Real-time bus GPS telemetry MUST evaluate student pickup point geofences and dispatch high-priority alerts when within 1 km (5 minutes ETA).
5. **Directive A-05 (Zero Clash Timetable Validation)**: The timetable scheduling engine MUST reject any period allocation that double-books an instructor, classroom, or class section.
6. **Directive A-06 (Strict Zero Emoji Directive)**: Zero emojis across all academic forms, report cards, ID badges, notifications, and code comments. Use Google Material Symbols Outlined exclusively.
7. **Directive A-07 (Statutory TC Verification Clearance)**: School Leaving Transfer Certificates (TCs) MUST verify zero outstanding fees, zero library book loans, and conduct clearance prior to certificate locking.

---

## 3. Phased Implementation Roadmap Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PHASED IMPLEMENTATION ROADMAP MATRIX                            │
├───────────────────────┬───────────────────────────────┬────────────────────────────────┤
│ PHASE 1: FOUNDATIONS  │ PHASE 2: ADVANCED INSTRUCTION │ PHASE 3: ENTERPRISE AUTOMATION │
│ (Target: Weeks 1 - 4) │ (Target: Weeks 5 - 8)         │ (Target: Weeks 9 - 12)         │
├───────────────────────┼───────────────────────────────┼────────────────────────────────┤
│ - Course, Class, Sec  │ - Lesson & Syllabus Trees     │ - Algorithmic Paper Generator  │
│ - Department & Streams│ - Daily Homework & Classwork  │ - Online CBT Exam Engine       │
│ - Sub-45s Attendance  │ - Assignments & Notes Vault   │ - GPS Bus Live Transit Stream  │
│ - Student/Staff ID Card- Clash-Free Timetables        │ - E-Challans & Bank Slip POS   │
│ - Noticeboard Circular│ - Dynamic Marksheets & TCs    │ - Biometric Gate Turnstiles    │
└───────────────────────┴───────────────────────────────┴────────────────────────────────┘
```

---

## 4. Reference Blueprints
For exhaustive technical schemas, REST contracts, and architectural workflows, agents MUST consult:
- **Spec 73**: [`references/73_INTEGRATED_ACADEMIC_OPERATIONS_AND_CAMPUS_LIFECYCLE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/73_INTEGRATED_ACADEMIC_OPERATIONS_AND_CAMPUS_LIFECYCLE_SPEC.md)
- **Spec 69**: [`references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md)
- **Spec 71**: [`references/71_FINANCIAL_ACCOUNTING_ANALYTICS_AND_ADVANCED_REPORTING_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/71_FINANCIAL_ACCOUNTING_ANALYTICS_AND_ADVANCED_REPORTING_SPEC.md)
- **Spec 72**: [`references/72_ENTERPRISE_BENEFITS_STAKEHOLDER_MATRIX_AND_HRM_EXAM_BLUEPRINT.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/72_ENTERPRISE_BENEFITS_STAKEHOLDER_MATRIX_AND_HRM_EXAM_BLUEPRINT.md)
