# List/Grid Views, Role-Based Detail Dossiers & Multi-Faceted Filter Specification
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Strategic Authority

This specification establishes the authoritative architectural blueprint for the platform's universal **List/Grid View Engine**, **Role-Based 360° Detail Dossiers**, **Multi-Parametric Faceted Filter Engine**, **Class Routine & Period Sequencing Matrix**, and **Automated Event-Driven Alert Dispatcher**.

Rather than focusing on superficial aesthetic styling, this document codifies the operational concepts, data contracts, state machines, and functional behaviors required to provide a unified user experience across all directories, portals, and operational subsystems.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               ENTERPRISE UI PATTERN & DATA ACCESS ARCHITECTURE                         │
├───────────────────┬───────────────────────────────┬────────────────────────────────────┤
│ Pattern Layer     │ Operational Mechanism         │ Behavioral Deliverable             │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ VIEW TOGGLE       │ List vs Grid View Engine      │ High-density table vs visual cards │
│ DOSSIER LAYER     │ 360° Role-Based Detail Views  │ Student, Teacher, Parent, Staff    │
│ FILTER ENGINE     │ Multi-Parametric Facets       │ Cascading dropdowns & saved queries│
│ SCHEDULING        │ Class Routine & Period Matrix │ Zero-clash periods & bell schedules│
│ AUTOMATION        │ Event-Driven Alert Scheduler  │ Fee due dates, exams, library fines│
└───────────────────┴───────────────────────────────┴────────────────────────────────────┘
```

---

## 1. Universal List/Grid View Architecture & Density Toggles

### 1.1 Dual-Mode Rendering Engine
Every master data directory (Students, Teachers, Staff, Library Books, Fee Invoices, Store Inventory, Assets) provides an instant, client-side toggle between two distinct layout modes:
1. **List View (High-Density DataGrid)**:
   - Optimized for fast scanning, bulk selection, column sorting, and tabular comparison.
   - Fixed header with virtualized scrolling for datasets exceeding 10,000 rows.
   - Column visibility customizer allowing users to pin, hide, or reorder data fields.
2. **Grid View (Visual Glass Cards)**:
   - Optimized for visual identification, touch-friendly interactions, and mobile/tablet devices.
   - 3-column or 4-column responsive grid featuring portrait photos, status badges, key metrics, and direct action overflow menus.

### 1.2 View Density Controls
Users can adjust interface density to match their operational context:
- **Compact**: 32px row height, reduced padding, high data density for accountants and registrars.
- **Comfortable** (Default): 48px row height, balanced typography and badge spacing.
- **Relaxed**: 64px row height, touch-optimized for tablet and kiosk interfaces.

### 1.3 Mass Action Bar
When one or more records are selected (via checkbox in List view or card selection in Grid view), a floating action ribbon surfaces with context-sensitive bulk operations:
- `Export Selected (CSV/Excel/PDF)`
- `Print Student / Staff ID Cards`
- `Send Bulk Announcement (SMS/Email/Push)`
- `Batch Fee Invoice Generation`
- `Bulk Status Update (Active, Inactive, Promoted)`

---

## 2. Role-Based 360° Detail Dossier Engine

Detail views in educational management are inherently polymorphic. Rather than presenting a generic record view, the system renders a customized **360° Operational Dossier** tailored to the subject's archetype:

### 2.1 Student 360° Dossier (`/people/students/:id`)
Organized into 8 dedicated operational tabs:
1. **Overview & Demographics**: Student photo, personal details, blood group, admission number, national ID/passport, address.
2. **Academic Transcripts & Grades**: Longitudinal grade progression, semester GPA meters, report cards, and CBT exam history.
3. **Attendance & Telemetry**: Month-by-month presence calendar, late arrival slips, turnstile punch logs, and absence reasons.
4. **Fee Ledger & Payments**: Invoiced heads, e-challans, Bakong KHQR settlement receipts, concessions, and outstanding balance.
5. **Health & Clinic Log**: Emergency blood type, chronic allergies, medication administration records, and infirmary visits.
6. **Transit & Route Allocation**: Bus route number, designated pickup/drop stop, bus driver contact, and GPS telematics link.
7. **Guardians & Custody**: Biological parents, decoupled legal guardians, custody court directives, and authorized pickup OTP tokens.
8. **Document Vault**: Uploaded birth certificates, prior school transcripts, medical waivers, and disciplinary incident memos.

### 2.2 Teacher 360° Dossier (`/people/teachers/:id`)
Organized into 6 operational tabs:
1. **Faculty Profile**: Academic qualifications, certifications, employment tier, staff ID, and contact dossier.
2. **Subject Competencies & Workload**: Assigned courses, weekly teaching periods, and laboratory supervision quotas.
3. **Weekly Timetable Matrix**: Interactive grid showing current period assignments, room allocations, and free periods.
4. **Lesson Plan Progression**: Pacing meters for assigned subjects showing planned vs completed curriculum modules.
5. **Leaves & Biometric Attendance**: Leave balance (Casual, Sick, Annual), approved leaves, and biometric punch telemetry.
6. **Payroll & Compensation**: Salary component breakdown, tax withholding slabs, pay slips, and bonus allocations.

### 2.3 Parent & Legal Guardian 360° Dossier (`/people/parents/:id` & `/people/guardians/:id`)
Organized into 4 operational tabs:
1. **Guardian Identity & Legal Status**: Full name (Latin & Khmer), government ID, relationship classification, and custody documentation.
2. **Linked Children / Students**: Multi-child switcher displaying enrollment status, class, section, and attendance summary for each ward.
3. **Pickup Authorization**: Active pickup authorization card, facial biometrics hash, and dynamic 15-minute OTP generator.
4. **Billing & Communication History**: Settled invoices, pending balances, receipts, and SMS/Email communication logs.

### 2.4 Non-Teaching Staff 360° Dossier (`/people/staff/:id`)
Organized into 5 operational tabs:
1. **Employee Profile**: Department, job designation, reporting supervisor, and emergency contacts.
2. **Duty Schedule**: Shift timings, overtime logs, and facility assignment roster.
3. **Perimeter Gate Logs**: Security turnstile ingress/egress history.
4. **Asset & Equipment Allocation**: Custody of campus tools, keys, radios, or vehicle custody.
5. **Leave Requests & Payroll**: Leave approvals, monthly attendance, and salary slips.

---

## 3. Multi-Parametric Faceted Filter Engine

### 3.1 Composable Filter Facets
The filter engine provides a standardized, composable search bar across all modules:
- **Search Ingress**: Real-time debounced fuzzy search input (`⌘ K` or text field).
- **Taxonomy Dropdowns**: Cascading hierarchy (e.g. Branch -> Program -> Grade -> Class -> Section).
- **Date Range Presets**: Today, Yesterday, This Week, This Month, Current Term, Academic Year, Custom Range.
- **Status Pills**: Multi-select status chips (e.g. `Active`, `Probation`, `Suspended`, `Graduated`, `Paid`, `Unpaid`, `Overdue`).
- **Demographic Facets**: Gender, Boarding/Day Scholar, Transport Route, House/Cohort.

### 3.2 Saved Filter Presets & URL Synchronization
- **URL Synchronization**: All active filter parameters are reflected in the browser URL query string (e.g. `?grade=10&status=active&view=grid`), enabling bookmarking, sharing, and browser back/forward navigation.
- **Saved Queries**: Users can save frequently used filter combinations as named presets (e.g. "Unpaid Term 2 Fees - Grade 12" or "Students with Attendance < 75%").

---

## 4. Class Routine & Period Sequencing Matrix

### 4.1 Granular Bell Schedule & Routine Architecture
The Class Routine engine organizes daily instructional schedules into collision-free matrices:
- **Bell Schedule Archetypes**: Standard Weekday (8 periods), Friday/Assembly Schedule (6 periods), Exam Half-Day Schedule (3 blocks).
- **Period Classification**: Homeroom/Advisory, Core Academic, Laboratory/Practical, Physical Education, Recess, and Study Hall.
- **Workload Collision Engine**: Validates in real time that:
  - No teacher is scheduled for two classes in the same period.
  - No room or specialized laboratory is double-booked.
  - Weekly maximum teaching period thresholds for teachers are strictly observed.

### 4.2 Syllabus Pacing & Progress Meter Integration
- Each period in the class routine links directly to the teacher's **Lesson Plan**.
- Teachers can mark a topic as "Covered" or "Deferred" during attendance roll-call, automatically updating the administrative **Syllabus Progress Meter**.

---

## 5. Automated Event-Driven Alert Dispatcher

### 5.1 Real-Time Scheduling Engine
The platform incorporates an automated background cron and event dispatcher monitoring critical deadlines across the academic calendar:
1. **Fee Collection Alerts**:
   - T-7 Days: Friendly reminder SMS and push notification to parent mobile app.
   - T-1 Day: Urgent reminder with direct Bakong KHQR checkout link.
   - Overdue: Late fee warning and automated e-challan invoice recalculation.
2. **Examination Milestones**:
   - T-14 Days: Exam timetable and syllabus notification.
   - T-3 Days: Hall ticket release and seating arrangement alert.
3. **Library Overdue & Circulation Reminders**:
   - T-2 Days: Return due date reminder.
   - Overdue +1 Day: Daily overdue fine accrual alert (`៛500` or `$0.12` per day).
4. **Administrative Circulars & Campus Announcements**:
   - Instant multi-channel broadcast across SMS, WhatsApp, Webmail, and Parent App feeds.

---

## 6. Supporting Skills Cross-Reference Matrix

| Operational Capability | Spec Reference | Supporting Primary Skill |
|---|---|---|
| List/Grid Dual-View Engine | Spec 83 & Spec 64 | `smart-school-webapp-patterns` |
| Role-Based 360° Dossiers | Spec 83 & Spec 47 | `smart-school-student-lifecycle-features`, `smart-school-staff-hr` |
| Multi-Parametric Filter Bar | Spec 83 & Spec 62 | `smart-school-webapp-patterns`, `smart-school-powerful-tools` |
| Class Routine & Period Matrix | Spec 83 & Spec 73 | `smart-school-academic-operations-hub` |
| Automated Alert Dispatcher | Spec 83 & Spec 49 | `smart-school-attendance-communication`, `smart-school-backend-services` |
| Fees Management & Invoicing | Spec 83 & Spec 50 | `smart-school-fee-accounting` |
| Library Catalog & Circulation | Spec 83 & Spec 53 | `smart-school-facilities-operations` |
| Executive & Multi-Role Dashboards | Spec 83 & Spec 82 | `smart-school-system`, `smart-school-admin-access-control` |
