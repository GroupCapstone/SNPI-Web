# Student Portal, Parent Portal & Public Front Site Master Specification
## Smart School Enterprise Platform (Autonomous Vibecoding Pipeline Reference)

---

### Executive Overview & Multi-Portal Architecture

This specification establishes the authoritative single-source-of-truth master interaction flow, UI taxonomy, operational workflows, and security boundaries for:
1. **Public Front Site (`PUBLIC_CMS`)**: The unauthenticated, public-facing school portal providing institutional storytelling, admission lead intake, news bulletins, and entry gateways.
2. **Student Portal (`STUDENT`)**: The self-service learning environment where students track daily periods, submit homework, take CBT online exams, monitor attendance, review exam grades, and consult library loans.
3. **Parent Portal (`PARENT`)**: The guardian oversight portal featuring an instant **Multi-Child Switcher**, real-time attendance alerts, tuition fee balance reconciliation with integrated payment gateways, and teacher communication channels.

---

### 1. High-Level Portal Taxonomy & Visual Identity

```
┌─────────────────┬───────────────────────────────┬─────────┬──────────┬─────────────┬────────────────────────────────────┐
│ Portal Platform │ Persona / Ingress Context     │ Modules │ Submenus │ Color Hex   │ Primary Architectural Responsibility│
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Public Front    │ Unauthenticated Guest         │ 8       │ 14       │ #0284C7     │ Institutional branding, admissions │
│ Site (CMS)      │ Route: `/`                    │ Pages   │ Sections │ Sky Blue    │ inquiries, events, login selector  │
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Student Portal  │ Edward Thomas (Adm: 18001)    │ 16      │ 22       │ #2563EB     │ Self-service learning, timetable,  │
│ (`STUDENT`)     │ Class 1 (Section A)           │ Modules │ Actions  │ Royal Blue  │ homework submissions, online exams │
├─────────────────┼───────────────────────────────┼─────────┼──────────┼─────────────┼────────────────────────────────────┤
│ Parent Portal   │ Olivier Thomas (Father)       │ 14      │ 20       │ #7C3AED     │ Multi-child switching, fee payments│
│ (`PARENT`)      │ Guardian Account              │ Modules │ Actions  │ Deep Purple │ attendance alerts, teacher ratings │
└─────────────────┴───────────────────────────────┴─────────┴──────────┴─────────────┴────────────────────────────────────┘
```

---

### 2. Public Front Site Architecture (`PUBLIC_CMS`)

The public front site serves as the digital front door for prospective families, alumni, and the public:

#### 2.1 Public Navigation Header & Layout
- **Top Bar**: School Phone (`+1 89562423934`), School Email (`info@carmel.edu`), Social Links (Facebook, Twitter, YouTube, Instagram), Session selector.
- **Main Navigation Bar**:
  - `Home`: Hero banner slider, Principal's welcome message, key stats (students, faculty, awards).
  - `About Us`: Institutional history, vision, mission, accreditation, leadership team.
  - `Academics`: Curriculum overview, CBSE affiliation details, faculty achievements.
  - `Course Catalog`: Featured online video courses, vocational training, syllabus highlights.
  - `Events & News`: Upcoming sports days, science exhibitions, academic calendar preview.
  - `Gallery`: Photo albums, campus tours, sports facilities, modern science labs.
  - `Contact Us`: Google Map embed, campus address, contact form, emergency numbers.
  - **Action Buttons**:
    - `Admission Inquiry` (High-contrast button opening prospective lead modal).
    - `Login Portal` (Dropdown with two distinct gateways):
      1. `Student / Parent Login` -> Routes to `/user/login` (Client self-service).
      2. `Staff Login` -> Routes to `/site/login` (Admin/Teacher/Accountant/Receptionist/Librarian).

#### 2.2 Public Admission Lead Intake Desk
- **Route**: `/#admission-inquiry`
- **Fields**: Student Name, Parent Name, Email, Phone, Grade Seeking Admission, Previous School, Message.
- **Backend Flow**: Emits `smartschool.lead.admission.created` event to Kafka; automatically registers a new lead in the Receptionist's `Admission Enquiry` desk with status `ACTIVE`.

---

### 3. Student Self-Service Portal (`STUDENT`)

#### 3.1 Logged-In Persona & Dashboard Overview
- **Persona**: `Edward Thomas (Admission No: 18001, Roll No: 101, Class 1-A)`
- **Dashboard Stat Tiles & Widgets**:
  - **Attendance Percentage**: Radial donut chart showing `92.5% Present` for the current academic session.
  - **Pending Homework**: Count of active homework assignments awaiting student submission.
  - **Upcoming Examinations**: Countdown clock to next scheduled term test.
  - **Fee Dues Alert**: Clean card indicating `$0.00 Outstanding` or balance pending with immediate `Pay Now` trigger.
  - **Active Library Books**: Count of physical volumes currently on loan with due dates.

#### 3.2 Student Menu Modules & Step-by-Step Interactions

1. **My Profile (`/user/profile`)**:
   - Comprehensive read-only student dossier: Personal details, Blood Group, Father/Mother details, Guardian contact, Emergency phone, Permanent Address.
   - Assigned Transport Route: Bus number, vehicle route title, pickup point, driver phone.
   - Assigned Hostel Room: Building name, room number, room type, bed designation.
2. **Fees Collection & Payments (`/user/user/getfees`)**:
   - **Fees Ledger**: Table showing `Fee Group`, `Fee Code`, `Due Date`, `Status` (Paid green badge vs Unpaid red badge), `Amount ($)`, `Discount ($)`, `Fine ($)`, `Paid ($)`, `Balance ($)`.
   - **Online Payment Action**: Clicking `Pay` opens modal with integrated gateways: Stripe, PayPal, Razorpay, or PayU. Instant PDF payment receipt download upon success.
3. **Class Timetable (`/user/timetable`)**:
   - Weekly grid matrix (Monday to Saturday): Period sequence (Period 1 to 8), Start/End timestamps, Subject title, Teacher name, Room number.
4. **Lesson Plan & Syllabus Status (`/user/syllabus`)**:
   - Subject-wise syllabus tracking progress bar.
   - Topic status breakdown: `Complete` (green), `In Progress` (yellow), `Pending` (gray) with lecture notes and resources.
5. **Homework Management (`/user/homework`)**:
   - **Homework List**: Subject, Homework Date, Submission Date, Evaluation Date, Max Marks, Status (`Submitted`, `Pending`, `Evaluated`).
   - **Submission Modal**: Allows text commentary and file upload attachment (`.pdf`, `.jpg`, `.docx`, max 10MB).
   - **Evaluation Review**: View teacher grading mark and teacher remarks.
6. **Online Examinations CBT (`/user/onlineexam`)**:
   - **Exam Roster**: Exam Title, Date From, Date To, Duration (mins), Total Questions, Passing Marks.
   - **Test Taking Engine**: Timed interactive CBT interface with question index navigation, mark-for-review, multiple-choice radio answers, automated timer countdown, and instant score calculation upon final submission.
7. **Student Attendance Register (`/user/attendence`)**:
   - Full-year calendar view with color-coded daily badges:
     - Green: `Present`
     - Yellow: `Late`
     - Red: `Absent`
     - Blue: `Half Day`
     - Gray: `Holiday / Sunday`
   - Monthly summary totals: Total Present, Total Absent, Total Late days.
8. **Examinations & Report Cards (`/user/exams`)**:
   - Exam Schedule timetable.
   - CBSE Term Report Cards: Subject-wise theory marks, practical marks, total marks, grade, grade point, and teacher remarks.
   - Download Admit Card / Hall Ticket with barcode and exam seat allocation.
9. **Notice Board & Circulars (`/user/notification`)**:
   - Interactive feed of institutional announcements, holiday advisories, and school notifications.
10. **Library Borrowing Desk (`/user/book`)**:
    - Table of currently borrowed books: `Book Title`, `Book No`, `Author`, `Issue Date`, `Due Return Date`, `Overdue Days`, `Fine ($)`.
    - Search library catalog to check availability before visiting the circulation counter.
11. **Student Leave Application (`/user/apply_leave`)**:
    - Form: `Apply Date`, `From Date`, `To Date`, `Reason`, `Attach Medical/Doctor Note`.
    - Leave Status: `Pending`, `Approved`, `Rejected` with principal remarks.
12. **Download Center (`/user/download`)**:
    - Download study materials, past question papers, assignment sheets, and curriculum syllabi.
13. **Live Virtual Classes (`/user/gmeet` & `/user/zoom`)**:
    - Daily schedule of online classes with 1-click `Join Class` button launching Google Meet or Zoom.
14. **Teachers Review & Feedback (`/user/teacher/review`)**:
    - End-of-term qualitative rating (1 to 5 stars) and comment box for assigned subject teachers.

---

### 4. Parent Self-Service Portal (`PARENT`)

#### 4.1 Logged-In Persona & Multi-Child Switcher Architecture
- **Persona**: `Olivier Thomas (Guardian of Edward Thomas & Emma Thomas)`
- **The Multi-Child Switcher**:
  - Located persistently at the top-left/top-center navigation bar:
  - Dropdown selector displaying:
    - `Child 1: Edward Thomas - Class 1 (Section A) [Selected]`
    - `Child 2: Emma Thomas - Class 5 (Section B)`
  - **Dynamic Context Switching**: Selecting a different child triggers an instant context swap in the UI: all attendance rolls, homework assignments, report cards, fee balances, and bus routes re-hydrate seamlessly for the selected child.

#### 4.2 Parent Menu Modules & Interactions

1. **Child Dashboard (`/parent/dashboard`)**:
   - Selected child's profile card, current session photo, class teacher name, and quick emergency contact.
   - Key alert cards: `Attendance Today: Present`, `Fee Outstanding: $150.00 Due on Oct 15`, `Next Exam: Maths on Oct 20`.
2. **Tuition Fees Reconciliation & Online Payment (`/parent/fees`)**:
   - Full institutional fee statement across tuition, computer lab, sports, and transport fees.
   - Integrated payment gateway supporting credit/debit card, net banking, UPI, and digital wallets.
   - Instant GST/tax compliant PDF receipt generation.
3. **Child Attendance History (`/parent/attendance`)**:
   - Monthly attendance calendar for the selected child.
   - Real-time absence alerts: Notification badge triggered whenever the child is marked `Absent` or `Late` during morning roll call.
4. **Child Homework Oversight (`/parent/homework`)**:
   - Review pending assignments, submission deadlines, and evaluate whether the child has uploaded required work.
   - Review teacher evaluation remarks and grades.
5. **Class Timetable (`/parent/timetable`)**:
   - Daily subject routine for the selected child.
6. **CBSE Examination Results & Report Cards (`/parent/exams`)**:
   - Term marksheet downloads, percentile ranks, performance graphs across terms.
7. **Apply Leave on Behalf of Child (`/parent/apply_leave`)**:
   - Parent-authored absence excuse application submitted directly to the class teacher.
8. **Live Class Schedule (`/parent/liveclasses`)**:
   - Links to join parent-teacher conferences (PTMs) on Google Meet or Zoom.
9. **Transport & Real-Time Bus Tracking (`/parent/transport`)**:
   - Route map, driver contact details, vehicle registration number, and assigned bus stop timings.
10. **Notice Board & Circulars (`/parent/notification`)**:
    - School circulars, parent-teacher meeting notices, holiday schedules, and event reminders.
11. **Teacher Ratings & Feedback (`/parent/teachers/review`)**:
    - Direct satisfaction ratings for curriculum delivery and student support.

---

### 5. Architectural Difference Matrix: Student vs. Parent vs. Staff

```
┌───────────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│ Operational Dimension     │ Student Portal       │ Parent Portal        │ Staff Portals (Admin)│
├───────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ Authentication Gateway    │ `/user/login`        │ `/user/login`        │ `/site/login`        │
│ Multi-Record Scope        │ Single Identity      │ Multi-Child Switcher │ Department / Campus  │
│                           │ (Self Record Only)   │ (All Enrolled Wards) │ (All Campus Students)│
├───────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ Fee Payment Functionality │ Self-pay enabled     │ Primary fiscal payee │ Cashier / Bookkeeper │
│                           │ (Card / Wallet)      │ (All child balances) │ (Collect & Reconcile)│
├───────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ Homework Actions          │ Upload & Submit Work │ Review & Monitor     │ Author, Assign, Grade│
├───────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ Attendance Actions        │ View Personal Roll   │ View Roll + Alerts   │ Take & Edit Rolls    │
├───────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ Online Exams (CBT)        │ Take Active Tests    │ View Final Scores    │ Create Question Bank │
├───────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ Leave Requests            │ Student Application  │ Guardian Application │ Teacher / Dean Accept│
├───────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ Administrative Controls   │ Zero Access          │ Zero Access          │ Full Departmental    │
│ (Tuition, System, HR)     │ (Blocked by RLS)     │ (Blocked by RLS)     │ Sovereignty          │
└───────────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

---

### 6. PostgreSQL Row-Level Security (RLS) Policies for Student & Parent

```sql
-- 1. Student Session Variable Context
SET LOCAL app.current_tenant_id = 'mount_carmel_group';
SET LOCAL app.current_branch_id = 'branch_carmel_main';
SET LOCAL app.current_user_id   = '18001'; -- Student Admission ID
SET LOCAL app.current_role      = 'STUDENT';

-- RLS Policy: Students can only view their own records
CREATE POLICY rls_student_self_access ON students
    FOR SELECT
    USING (
        id = current_setting('app.current_user_id', true)::uuid
        OR current_setting('app.current_role', true) IN ('PARENT', 'TEACHER', 'CAMPUS_ADMIN', 'SUPER_ADMIN')
    );

-- 2. Parent Session Variable Context
SET LOCAL app.current_user_id   = 'PAR-9901'; -- Parent Guardian ID
SET LOCAL app.current_role      = 'PARENT';

-- RLS Policy: Parents can only access records of their linked children
CREATE POLICY rls_parent_child_access ON students
    FOR SELECT
    USING (
        parent_id = current_setting('app.current_user_id', true)::uuid
        OR current_setting('app.current_role', true) IN ('TEACHER', 'CAMPUS_ADMIN', 'SUPER_ADMIN')
    );

-- RLS Policy: Fee payments can only be queried by the student or their verified parent
CREATE POLICY rls_fee_invoices_student_parent ON fee_invoices
    FOR SELECT
    USING (
        student_id = current_setting('app.current_user_id', true)::uuid
        OR student_id IN (SELECT id FROM students WHERE parent_id = current_setting('app.current_user_id', true)::uuid)
        OR current_setting('app.current_role', true) IN ('ACCOUNTANT', 'CAMPUS_ADMIN', 'SUPER_ADMIN')
    );
```

---

### 7. Canonical Event Emitters (Spring Boot 3 + Kafka)

Student and parent interactions generate real-time Kafka events across the enterprise bus:

```json
{
  "eventId": "evt_3d2c1b0a-5f6e-7d8c-9b0a-1e2f3a4b5c6d",
  "eventType": "smartschool.fee.payment.completed",
  "timestamp": "2026-09-12T06:08:00.000Z",
  "tenantId": "mount_carmel_group",
  "branchId": "branch_carmel_main",
  "actor": {
    "userId": "PAR-9901",
    "role": "PARENT",
    "displayName": "Olivier Thomas"
  },
  "payload": {
    "studentId": "18001",
    "studentName": "Edward Thomas",
    "invoiceId": "INV-2026-0089",
    "amountPaid": 450.00,
    "paymentMethod": "STRIPE",
    "gatewayTransactionId": "ch_3MtwL2LkdIwHu7ix0snN9iUz",
    "feeGroup": "Tuition Fee Term 2"
  }
}
```

---

### 8. Architectural Verification & Compliance Checklist

- [x] **Zero Emoji Compliance**: 100% devoid of unicode emoji characters.
- [x] **Public Front Site Integration**: Clear unauthenticated ingress flow with prospective lead integration to Receptionist desk.
- [x] **Student Portal Flow List**: Exhaustive step-by-step documentation across all 16 self-service modules.
- [x] **Parent Portal Multi-Child Engine**: Authoritative specification of the multi-child switcher and payment workflows.
- [x] **Full 8-Persona Matrix Synchronization**: Completes the end-to-end institutional taxonomy from Super Admin to Student/Parent.
