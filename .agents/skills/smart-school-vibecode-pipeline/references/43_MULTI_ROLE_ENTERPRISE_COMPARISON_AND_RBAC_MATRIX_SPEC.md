# Enterprise Multi-Role Architecture & RBAC Entitlement Matrix Specification
## Smart School Enterprise Platform (Autonomous Vibecoding Pipeline Reference)

---

### Executive Overview & Architectural Foundation

This specification establishes the authoritative cross-role comparison, security boundaries, Row-Level Security (RLS) isolation, and Role-Based Access Control (RBAC) matrix across all institutional personas in the **Smart School Enterprise Platform**.

The platform is designed around a multi-tenant, branch-sovereign enterprise hierarchy where:
1. **Super Admin** governs global multi-tenant settings, database maintenance, system backups, and global branch provisioning.
2. **Admin (Campus Dean / Principal)** holds operational sovereignty over an individual campus branch, strictly isolated by PostgreSQL Row-Level Security (`SET LOCAL app.current_branch_id = ?`).
3. **Teacher** drives instructional pedagogy, attendance taking, continuous assessment, exam mark entry, homework evaluation, and syllabus delivery.
4. **Accountant** controls fiscal solvency, cashier counters, tuition fee allocations, bank slip verifications, income/expense ledgers, and staff payroll disbursement.
5. **Receptionist** operates as the front desk ambassador, managing admission prospect pipelines, issuing visitor passes, logging phone calls, recording postal dispatch/receive, and logging complaints.
6. **Librarian** manages the physical book accession catalog, circulation desk lending and return workflows, overdue fine enforcement, and student/staff library card issuance.
7. **Student & Parent** consume self-service schedules, daily attendance records, exam grade cards, fee balance ledgers with online payment gateways, lesson plans, and broadcast bulletins.

---

### 1. Master Role Persona & Entitlement Taxonomy

```
┌─────────────────┬───────────────────────────────┬─────────┬──────────┬─────────────┬────────────────────────────────────┐
│ Portal Role     │ Persona Sample                │ Modules │ Submenus │ Color Hex   │ Primary Architectural Responsibility│
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Super Admin     │ Joe Black (Root ID: 1)        │ 34      │ 182      │ #4338CA     │ Global root sovereignty, tenancy,  │
│                 │                               │         │          │ Deep Indigo │ database backups, system settings  │
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Campus Admin    │ Joe Black (Staff ID: 9000)    │ 34      │ 182      │ #1E293B     │ Branch-level operational control,  │
│ (Dean/Principal)│ Ground Floor, Dean Office     │         │          │ Slate Black │ teacher supervision, RLS isolation │
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Teacher         │ Jason Shariton (Staff: 90006) │ 19      │ 78       │ #059669     │ Instructional delivery, attendance,│
│                 │ Ground Floor, Academic Dept   │         │          │ Emerald     │ homework grading, exam mark entry  │
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Accountant      │ James Deckar (Staff: 9004)    │ 16      │ 66       │ #D97706     │ Fee cashier, invoice collection,   │
│                 │ Ground Floor, Finance Dept    │         │          │ Amber Gold  │ payroll runs, expense/income audit │
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Receptionist    │ Maria Ford (Staff: 9005)      │ 11      │ 30       │ #0D9488     │ Front office inquiries, visitor    │
│                 │ Ground Floor, Reception Desk  │         │          │ Teal / Cyan │ passes, phone logs, complaints     │
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Librarian       │ Brandon Heart (Staff: 9005)   │ 10      │ 27       │ #6366F1     │ Book cataloging, circulation loans,│
│                 │ 2nd Floor, Main Library       │         │          │ Violet Blue │ overdue fine collection, members   │
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Student         │ Edward Thomas (Adm: 18001)    │ 8       │ 18       │ #2563EB     │ Self-service timetable, homework,  │
│                 │ Class 1 (Section A)           │         │          │ Royal Blue  │ syllabus, attendance, grade card   │
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Parent /        │ Olivier Thomas (Father)       │ 8       │ 18       │ #7C3AED     │ Multi-child overview, tuition fees │
│ Guardian        │ Guardian Account              │         │          │ Deep Purple │ payment, teacher chat, report cards│
└─────────────────┴───────────────────────────────┴─────────┴──────────┴─────────────┴────────────────────────────────────┘
```

---

### 2. Complete 34-Module Entitlement & Access Heatmap

Legend:
- `FULL`: Complete Read, Create, Edit, Delete, Export, and Approve authority.
- `DEPT`: Departmental Read/Write authority restricted to specific operational workflows.
- `READ`: Read-Only search, view, and print access.
- `SELF`: Scoped exclusively to own assigned records, children, or self profile.
- `NONE`: Module completely omitted from navigation and rejected by API filters.

```
┌────┬─────────────────────────────┬─────────────┬─────────────┬─────────┬────────────┬──────────────┬───────────┬──────────────┐
│ #  │ Platform Module             │ Super Admin │ Campus Admin│ Teacher │ Accountant │ Receptionist │ Librarian │ Student/Guard│
├────┼─────────────────────────────┼─────────────┼─────────────┼─────────┼────────────┼──────────────┼───────────┼──────────────┤
│ 01 │ Front Office                │ FULL        │ FULL        │ NONE    │ NONE       │ FULL (7 sub) │ NONE      │ NONE         │
│ 02 │ Student Information         │ FULL        │ FULL        │ DEPT    │ READ       │ READ (1 sub) │ NONE      │ SELF         │
│ 03 │ Fees Collection             │ FULL        │ FULL        │ NONE    │ FULL (9 sub│ NONE         │ NONE      │ SELF (Pay)   │
│ 04 │ Quick Fees                  │ FULL        │ FULL        │ NONE    │ FULL       │ NONE         │ NONE      │ NONE         │
│ 05 │ Income                      │ FULL        │ FULL        │ NONE    │ FULL (3 sub│ NONE         │ NONE      │ NONE         │
│ 06 │ Expenses                    │ FULL        │ FULL        │ NONE    │ FULL (3 sub│ NONE         │ NONE      │ NONE         │
│ 07 │ Attendance (Student/Staff)  │ FULL        │ FULL        │ FULL    │ READ (Staff│ NONE         │ NONE      │ SELF         │
│ 08 │ Examinations (CBSE/State)   │ FULL        │ FULL        │ FULL    │ NONE       │ READ (Sched) │ READ(Sched│ SELF         │
│ 09 │ Online Examinations (CBT)   │ FULL        │ FULL        │ FULL    │ NONE       │ NONE         │ NONE      │ SELF (Take)  │
│ 10 │ Lesson Plan                 │ FULL        │ FULL        │ FULL    │ NONE       │ NONE         │ NONE      │ READ         │
│ 11 │ Academics                   │ FULL        │ FULL        │ READ    │ NONE       │ READ (6 sub) │ NONE      │ READ         │
│ 12 │ Human Resource (Payroll/Dir)│ FULL        │ FULL        │ SELF    │ FULL (Pay) │ READ (Dir)   │ READ (Dir)│ NONE         │
│ 13 │ Communicate (Notice/SMS/Mail│ FULL        │ FULL        │ DEPT    │ DEPT       │ FULL (4 sub) │ DEPT      │ READ         │
│ 14 │ Download Center             │ FULL        │ FULL        │ FULL    │ READ       │ NONE         │ NONE      │ READ         │
│ 15 │ Homework                    │ FULL        │ FULL        │ FULL    │ NONE       │ NONE         │ NONE      │ SELF (Submit)│
│ 16 │ Library                     │ FULL        │ FULL        │ READ    │ NONE       │ NONE         │ FULL(4 sub│ SELF (Borrow)│
│ 17 │ Inventory                   │ FULL        │ FULL        │ NONE    │ FULL (6 sub│ NONE         │ NONE      │ NONE         │
│ 18 │ Transport                   │ FULL        │ FULL        │ NONE    │ FULL (3 sub│ NONE         │ NONE      │ SELF (Route) │
│ 19 │ Hostel                      │ FULL        │ FULL        │ NONE    │ FULL (3 sub│ NONE         │ NONE      │ SELF (Room)  │
│ 20 │ Certificate                 │ FULL        │ FULL        │ NONE    │ READ (Staff│ READ (Staff) │ NONE      │ SELF (Claim) │
│ 21 │ Front CMS                   │ FULL        │ FULL        │ NONE    │ NONE       │ NONE         │ NONE      │ NONE         │
│ 22 │ Alumni                      │ FULL        │ FULL        │ NONE    │ READ       │ NONE         │ NONE      │ SELF (Join)  │
│ 23 │ Reports                     │ FULL (All)  │ FULL (All)  │ DEPT    │ FULL (Fin) │ NONE         │ FULL(Lib) │ NONE         │
│ 24 │ Multi Branch                │ FULL        │ NONE        │ NONE    │ NONE       │ NONE         │ NONE      │ NONE         │
│ 25 │ Annual Calendar             │ FULL        │ FULL        │ READ    │ READ       │ NONE         │ NONE      │ READ         │
│ 26 │ Student CV                  │ FULL        │ FULL        │ DEPT    │ NONE       │ NONE         │ NONE      │ SELF         │
│ 27 │ Thermal Print               │ FULL        │ FULL        │ NONE    │ FULL       │ NONE         │ NONE      │ NONE         │
│ 28 │ Whatsapp Messaging          │ FULL        │ FULL        │ NONE    │ NONE       │ NONE         │ NONE      │ NONE         │
│ 29 │ Online Course               │ FULL        │ FULL        │ FULL    │ READ (Bill)│ READ (2 sub) │ READ(2 sub│ SELF (Watch) │
│ 30 │ Behaviour Records           │ FULL        │ FULL        │ FULL    │ READ       │ NONE         │ FULL(4 sub│ SELF (Points)│
│ 31 │ CBSE Examination            │ FULL        │ FULL        │ FULL    │ READ       │ READ (1 sub) │ READ(3 sub│ SELF (Marks) │
│ 32 │ Gmeet Live Classes          │ FULL        │ FULL        │ FULL    │ READ       │ READ (3 sub) │ READ(3 sub│ SELF (Join)  │
│ 33 │ Zoom Live Classes           │ FULL        │ FULL        │ FULL    │ READ       │ READ (4 sub) │ READ(4 sub│ SELF (Join)  │
│ 34 │ System Setting              │ FULL (18)   │ DEPT (Branch│ NONE    │ READ (Print│ SELF (Prof)  │ SELF(Prof)│ SELF (Pass)  │
└────┴─────────────────────────────┴─────────────┴─────────────┴─────────┴────────────┴──────────────┴───────────┴──────────────┘
```

---

### 3. Detailed Functional Domain Comparison

#### Domain A: Governance & Branch Sovereignty (Super Admin vs. Campus Admin)
- **Super Admin (`ROOT`)**:
  - Global Multi-Branch orchestrator (`/admin/multibranch`).
  - System-wide automated database backups and SQL restore points (`/admin/backup`).
  - Third-party payment gateway keys (Stripe, PayPal, Razorpay, PayU).
  - Multi-branch fiscal rollups and institution-wide KPI benchmarking.
- **Admin (Campus Dean / Principal) (`CAMPUS_ADMIN`)**:
  - Full operational authority restricted strictly to own assigned campus branch (`app.current_branch_id = ?`).
  - Approves daily teacher attendance, leaves, and substitute teaching allocations.
  - Oversees student disciplinary hearings, suspensions, and behaviour merit points.
  - Dispatches emergency campus-wide SMS/Email broadcasts (weather emergencies, lockdown, events).
  - *Constraint*: Cannot view or mutate records belonging to sister campuses or alter platform-level payment credentials.

#### Domain B: Academics, Pedagogy & Grading (Teacher vs. Admin vs. Student/Parent)
- **Teacher (`TEACHER`)**:
  - Daily classroom attendance taking with multiple attendance states: `Present`, `Late`, `Absent`, `Half Day`.
  - Authoring and assignment of daily homework assignments with file upload attachments.
  - Evaluation of submitted student homework with grading feedback and revision requests.
  - Entry and verification of examination marks, practical scores, and term grade curves.
  - Curriculum delivery tracking through the Lesson Plan module (syllabi milestones, topics covered).
- **Admin (Dean)**:
  - Audits teacher lesson plan velocity, missing marks rosters, and grade publishing approvals.
  - Publishes final CBSE report cards and official transcripts.
- **Student & Parent**:
  - View published marks, term percentages, teacher remarks, homework submission deadlines, and lesson plan progress.

#### Domain C: Fiscal Operations, Cashier POS & Payroll (Accountant vs. Admin vs. Student/Parent)
- **Accountant (`ACCOUNTANT`)**:
  - Physical counter fee collections (`/admin/fees/collect`).
  - Barcode POS fast invoice processing (`Quick Fees`).
  - Manual verification of parent offline bank transfer deposit slips.
  - Institutional ledger bookkeeping: recording income receipts, expense vouchers, and vendor invoices.
  - Monthly campus payroll execution: staff salary calculation, tax deductions, and payslip generation.
  - Procurement and stock distribution of inventory items, uniforms, and sports gear.
- **Campus Admin**:
  - Approves procurement requisitions above campus expenditure thresholds.
  - Reviews daily fiscal collection summaries.
- **Parent & Student**:
  - Real-time visibility into outstanding balance invoices, fee structures, discounts awarded, and instant online card checkout.

#### Domain D: Front Desk, Inquiries & Visitor Passes (Receptionist vs. Admin)
- **Receptionist (`RECEPTIONIST`)**:
  - First-line intake of prospective student leads (`Admission Enquiry`).
  - Lead qualification and follow-up logging across 5 conversion stages: `Active`, `Won`, `Passive`, `Lost`, `Dead`.
  - Verification of campus visitors and issuance of photo visitor badges (`Visitor Book`).
  - Centralized phone call switchboard logging (inbound/outbound calls, durations, follow-up alarms).
  - Outgoing postal dispatch courier logging and incoming mail distribution (`Postal Dispatch` / `Postal Receive`).
  - Initial grievance intake and assignment to administrative heads (`Complain Desk`).
- **Campus Admin**:
  - Receives escalated complaints, reviews admission conversion metrics, and audits visitor traffic logs.

#### Domain E: Library Curation, Circulation & Fines (Librarian vs. Student/Staff)
- **Librarian (`LIBRARIAN`)**:
  - Accessioning books into the master repository with ISBN, publisher, author, subject, and physical shelf rack coordinates.
  - Barcode circulation desk: issuing books to enrolled student and staff members, check-in returns, and processing loan renewals.
  - Enforcing overdue loan policies and collecting daily delinquency penalty fines.
  - Issuing and revoking library borrower membership cards.
  - Conducting physical stock reconciliation audits via the 4 Library BI Reports (`Issue`, `Due`, `Inventory`, `Issue Return`).
- **Student & Staff**:
  - Search catalog availability, reserve volumes, view active loan return deadlines, and review accrued overdue fines.

#### Domain F: Self-Service Portals (Student & Parent)
- **Student Portal**:
  - Personal daily period timetable, room numbers, and subject teachers.
  - Homework assignments download, draft submission, and grading feedback.
  - CBT Online Examinations with randomized question banks, timed countdowns, and instant scorecards.
  - Digital course video lessons, discussion forums, and quizzes.
- **Parent Portal**:
  - Unified multi-child switcher: seamlessly toggle between children enrolled in different grades.
  - Real-time attendance notifications (instant SMS/Email upon absence or late marking).
  - Integrated payment gateway for tuition fee installments, transport fees, and exam dues.
  - Direct communication line with assigned class teachers and school administration.

---

### 4. PostgreSQL Row-Level Security (RLS) Architecture

To enforce branch sovereignty and absolute zero-leak data privacy across tenants, all database interactions in the backend microservices execute within a constrained transactional RLS session context:

```sql
-- Branch Isolation Context (Executed on connection checkout from HikariCP)
SET LOCAL app.current_tenant_id = 'carmel_group';
SET LOCAL app.current_branch_id = 'branch_mount_carmel_main';
SET LOCAL app.current_user_id   = '9005';
SET LOCAL app.current_role      = 'RECEPTIONIST';

-- Core RLS Policy on Student Dossiers
CREATE POLICY branch_isolation_students ON students
    FOR ALL
    USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.current_role', true) = 'SUPER_ADMIN'
    );

-- Core RLS Policy on Financial Transactions
CREATE POLICY branch_isolation_fee_collections ON fee_collections
    FOR ALL
    USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        AND current_setting('app.current_role', true) IN ('ACCOUNTANT', 'CAMPUS_ADMIN', 'SUPER_ADMIN')
    );

-- Core RLS Policy on Front Office Operations
CREATE POLICY branch_isolation_enquiries ON front_office_enquiries
    FOR ALL
    USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        AND current_setting('app.current_role', true) IN ('RECEPTIONIST', 'CAMPUS_ADMIN', 'SUPER_ADMIN')
    );

-- Core RLS Policy on Library Operations
CREATE POLICY branch_isolation_books ON library_books
    FOR ALL
    USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        AND current_setting('app.current_role', true) IN ('LIBRARIAN', 'CAMPUS_ADMIN', 'SUPER_ADMIN')
    );
```

---

### 5. Spring Boot 3 Virtual Threads & Kafka Event Envelope Integration

All state mutations performed across any role portal emit a canonical cloud event to Kafka for decoupled asynchronous processing, audit logging, and notifications:

```json
{
  "eventId": "evt_8f3a1b2c-9d4e-4f5a-8b1c-7e6d5a4b3c2d",
  "eventType": "smartschool.library.book.issued",
  "timestamp": "2026-09-12T06:05:00.000Z",
  "tenantId": "carmel_group",
  "branchId": "branch_mount_carmel_main",
  "actor": {
    "userId": "9005",
    "role": "LIBRARIAN",
    "displayName": "Brandon Heart"
  },
  "payload": {
    "bookId": "101",
    "bookTitle": "The Tale of Farmers",
    "memberId": "LIB-STU-18001",
    "borrowerId": "18001",
    "borrowerType": "STUDENT",
    "dueDate": "2026-09-26T17:00:00.000Z"
  }
}
```

---

### 6. Architectural Verification & Compliance Checklist

- [x] **Zero Emoji Compliance**: 100% devoid of unicode emoji characters.
- [x] **Full 7-Role Comparison**: Covers Super Admin, Campus Admin, Teacher, Accountant, Receptionist, Librarian, and Student/Parent.
- [x] **Exhaustive 34-Module Heatmap**: Accurately maps permissions across all platform modules.
- [x] **PostgreSQL RLS Directives**: Formally defines session variable isolation (`SET LOCAL app.current_branch_id`).
- [x] **Cross-Portal Synchrony**: Integrates specifications 37, 38, 39, 40, 41, and 42.
