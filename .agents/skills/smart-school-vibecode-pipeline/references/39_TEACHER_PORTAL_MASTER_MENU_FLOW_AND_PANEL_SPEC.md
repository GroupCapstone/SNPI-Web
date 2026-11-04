# Teacher Portal Master Menu Flow & Panel Specification
## Smart School Enterprise Platform (Autonomous Vibecoding Pipeline Reference)

---

### Executive Overview & Role Authority

This specification establishes the authoritative single-source-of-truth master menu taxonomy, interaction flow, and architectural boundaries for the **Teacher Portal** (`TEACHER`) in the **Smart School Enterprise Platform**.

The **Teacher** role is an instructional and academic delivery persona. Unlike the Super Admin (global RLS bypass) and Campus Admin (branch-wide operations), the Teacher is **academically partitioned**:
- **Security & RLS Scope**: Scoped to the teacher's branch (`app.current_branch_id = ?`) AND restricted to the teacher's assigned subjects, classes, sections, and personal records (`app.current_staff_id = ?`).
- **Primary Role Token**: `TEACHER`
- **Brand Theme Accent**: Royal Cobalt Blue (`#2563EB`)
- **Total Master Navigation Accordions Visible**: **19 Modules** (out of 34 total platform modules)
- **Total Operational Submenus**: **78 Submenus**
- **Completely Omitted Modules (15 Restricted Modules)**: Front Office, Fees Collection, Quick Fees, Income, Expenses, Library, Inventory, Transport, Hostel, Front CMS, Alumni, Annual Calendar, Student CV, Thermal Print, Whatsapp Messaging.

---

### 1. Teacher Permitted vs. Restricted Modules Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                TEACHER PORTAL TAXONOMY AT A GLANCE                              │
├────────────────────────────────────────────────┬────────────────────────────────────────────────┤
│ 19 PERMITTED OPERATIONAL MODULES               │ 15 STRICTLY RESTRICTED MODULES (OMITTED)       │
├────────────────────────────────────────────────┼────────────────────────────────────────────────┤
│ 01. Academics (7 submenus)                     │ 01. Front Office (Reception & Grievances)      │
│ 02. Attendance (3 submenus)                    │ 02. Fees Collection (Tuition & Invoicing)      │
│ 03. Behaviour Records (4 submenus)             │ 03. Quick Fees (Counter POS Desk)              │
│ 04. CBSE Examination (7 submenus)              │ 04. Income (Revenue Ledgers)                   │
│ 05. Certificate (2 submenus - Staff ID Only)   │ 05. Expenses (Expenditure Disbursements)       │
│ 06. Communicate (4 submenus - Notice/Email/SMS)│ 06. Library (Book Loans & Circulation)         │
│ 07. Download Center (4 submenus)               │ 07. Inventory (Asset Loans & Warehouse Depot)  │
│ 08. Examinations (7 submenus)                  │ 08. Transport (Fleet Routing & Transit Fares)  │
│ 09. Gmeet Live Classes (5 submenus)            │ 09. Hostel (Boarding Rooms & Tariffs)          │
│ 10. Homework (2 submenus)                      │ 10. Front CMS (Public Website CMS & Banners)   │
│ 11. Human Resource (2 submenus - Self Directory│ 11. Alumni (Graduate Network & Reunions)       │
│     & Apply Leave)                             │ 12. Annual Calendar (Master Event Management)  │
│ 12. Lesson Plan (4 submenus)                   │ 13. Student CV (Formal Placement Generator)    │
│ 13. Multi Branch (1 submenu - Read-Only Overvw)│ 14. Thermal Print (POS Hardware Ingress)       │
│ 14. Online Course (3 submenus - Author LMS)    │ 15. Whatsapp Messaging (API Gateway Settings)  │
│ 15. Online Examinations (2 submenus - CBT)     │                                                │
│ 16. Reports (9 instructional BI reports)       │                                                │
│ 17. Student Information (8 submenus)           │                                                │
│ 18. System Setting (1 limited profile setting) │                                                │
│ 19. Zoom Live Classes (5 submenus)             │                                                │
└────────────────────────────────────────────────┴────────────────────────────────────────────────┘
```

---

### 2. Teacher Left Navigation Rail & Sequence (19 Accordions)

The teacher's left sidebar displays `Current Session: 2026-27`, `Quick Links [grid_view]`, followed by 19 vertical accordion items:

1. **Student Information** (`school`)
2. **Online Course** (`video_library`)
3. **Behaviour Records** (`psychology`)
4. **Multi Branch** (`hub`)
5. **Gmeet Live Classes** (`videocam`)
6. **Zoom Live Classes** (`video_camera_front`)
7. **CBSE Examination** (`fact_check`)
8. **Examinations** (`assignment_turned_in`)
9. **Attendance** (`co_present`)
10. **Online Examinations** (`laptop_chromebook`)
11. **Academics** (`menu_book`)
12. **Lesson Plan** (`auto_stories`)
13. **Human Resource** (`badge`)
14. **Communicate** (`campaign`)
15. **Download Center** (`download`)
16. **Homework** (`assignment`)
17. **Certificate** (`workspace_premium`)
18. **Reports** (`analytics`)
19. **System Setting** (`settings`)

---

### 3. Step-by-Step Teacher Module Flow List (19 Permitted Modules)

---

#### Flow 01: Academics (`menu_book`) — 7 Submenus
*Note: `Promote Students` is excluded; promotion is reserved for Admin/Super Admin.*
- **Submenu 01: Class Timetable** (`/teacher/academics/class-timetable`): Select Class & Section -> View period schedules.
- **Submenu 02: Teachers Timetable** (`/teacher/academics/teachers-timetable`): View own assigned weekly teaching schedule.
- **Submenu 03: Assign Class Teacher** (`/teacher/academics/assign-class-teacher`): View homeroom advisor assignments.
- **Submenu 04: Subject Group** (`/teacher/academics/subject-group`): Inspect curriculum subject bundles.
- **Submenu 05: Subjects** (`/teacher/academics/subjects`): View assigned curriculum subject details.
- **Submenu 06: Class** (`/teacher/academics/class`): View grades roster.
- **Submenu 07: Sections** (`/teacher/academics/sections`): View active grade divisions.

---

#### Flow 02: Attendance (`co_present`) — 3 Submenus
- **Submenu 01: Student Attendance** (`/teacher/attendance/student-attendance`):
  - *Flow Step 1*: Select `Class *`, `Section *`, and `Attendance Date *` (pre-filled with today's date).
  - *Flow Step 2*: Mark student presence: `Present`, `Late`, `Absent`, `Half Day`, `Holiday`.
  - *Flow Step 3*: Quick-action buttons: `Set All Present`, `Mark As Holiday` -> Click `Save Attendance`.
- **Submenu 02: Approve Leave** (`/teacher/attendance/approve-leave`): Review and endorse student absence notes.
- **Submenu 03: Attendance By Date** (`/teacher/attendance/attendance-by-date`): Class monthly presence tracking.

---

#### Flow 03: Behaviour Records (`psychology`) — 4 Submenus
- **Submenu 01: Assign Incident** (`/teacher/behaviour/assign-incident`):
  - *Flow Step 1*: Select Class and Section -> Click `Search`.
  - *Flow Step 2*: View student list (Student Name, Admission No, Class, Gender, Phone, Total Points, Action).
  - *Flow Step 3*: Assign merits (+) or demerits (-) with behavioral commentary.
- **Submenu 02: Incidents** (`/teacher/behaviour/incidents`): View master infractions and merit weights.
- **Submenu 03: Reports** (`/teacher/behaviour/reports`): View student behavioral point standings and rankings.
- **Submenu 04: Setting** (`/teacher/behaviour/setting`): View conduct evaluation parameters.

---

#### Flow 04: CBSE Examination (`fact_check`) — 7 Submenus
- **Submenu 01: Exam** (`/teacher/cbse-exam/exam-list`): View scheduled CBSE assessments (Exam Name, Class, Term, Subjects Included, Exam Published, Published Result). Control strip: Class Roster, Timetable, Marks Entry.
- **Submenu 02: Exam Schedule** (`/teacher/cbse-exam/schedule`): Inspect exam room allocations and time slots.
- **Submenu 03: Print Marksheet** (`/teacher/cbse-exam/print-marksheet`): Print report cards for assigned classes.
- **Submenu 04: Template** (`/teacher/cbse-exam/template`): Preview report card layout schemas.
- **Submenu 05: Assign Observation** (`/teacher/cbse-exam/assign-observation`): Enter co-scholastic skill ratings.
- **Submenu 06: Reports** (`/teacher/cbse-exam/reports`): Subject-wise student performance analytics.
- **Submenu 07: Setting** (`/teacher/cbse-exam/setting`): View CBSE assessment criteria.

---

#### Flow 05: Certificate (`workspace_premium`) — 2 Submenus (Personal Staff Credentials)
*Note: Transfer Certificate, Student Certificate, and Student ID Card generators are excluded; teachers only access staff credentials.*
- **Submenu 01: Staff ID Card** (`/teacher/certificate/staff-id-card`): View institutional faculty identification card.
- **Submenu 02: Generate Staff ID Card** (`/teacher/certificate/generate-staff-id-card`): Download/print faculty identity badge.

---

#### Flow 06: Communicate (`campaign`) — 4 Submenus
*Note: Bulk credential sending and template authoring are excluded.*
- **Submenu 01: Notice Board** (`/teacher/communicate/notice-board`): Read campus bulletins and announcements.
- **Submenu 02: Send Email** (`/teacher/communicate/send-email`): Dispatch course emails to students in assigned classes.
- **Submenu 03: Send SMS** (`/teacher/communicate/send-sms`): Broadcast urgent SMS updates to student parents.
- **Submenu 04: Email / SMS Log** (`/teacher/communicate/email-sms-log`): Review dispatch delivery status logs.

---

#### Flow 07: Download Center (`download`) — 4 Submenus
- **Submenu 01: Upload/Share Content** (`/teacher/download-center/upload-content`): Upload learning materials, lecture notes, and syllabus PDFs for students.
- **Submenu 02: Content Share List** (`/teacher/download-center/share-list`): Audit shared study resources.
- **Submenu 03: Video Tutorial** (`/teacher/download-center/video-tutorial`): Publish recorded video lectures.
- **Submenu 04: Content Type** (`/teacher/download-center/content-type`): View resource categorization tags.

---

#### Flow 08: Examinations (`assignment_turned_in`) — 7 Submenus
*Note: Exam Schedule and Marks Division setup are excluded.*
- **Submenu 01: Exam Group** (`/teacher/examinations/exam-group`): Inspect grading frameworks (Pass/Fail, Letter Grades, CGPA, GPA).
- **Submenu 02: Exam Result** (`/teacher/examinations/exam-result`): Enter student marks and verify GPA calculations.
- **Submenu 03: Design Admit Card** (`/teacher/examinations/design-admit-card`): Preview hall ticket templates.
- **Submenu 04: Print Admit Card** (`/teacher/examinations/print-admit-card`): Print admit cards for assigned class cohorts.
- **Submenu 05: Design Marksheet** (`/teacher/examinations/design-marksheet`): Preview marksheet designs.
- **Submenu 06: Print Marksheet** (`/teacher/examinations/print-marksheet`): Batch generate marksheet transcripts.
- **Submenu 07: Marks Grade** (`/teacher/examinations/marks-grade`): View academic grade boundaries (`A+`, `A`, `B`, `C`, `F`).

---

#### Flow 09: Gmeet Live Classes (`videocam`) — 5 Submenus
- **Submenu 01: Live Classes** (`/teacher/gmeet/live-classes`):
  - *Flow Step 1*: Click `+ Add` to schedule lecture for assigned Class and Section.
  - *Flow Step 2*: Click green `Start` button to launch Google Meet session; status updates from `Awaited` to `Finished`.
- **Submenu 02: Live Meeting** (`/teacher/gmeet/live-meeting`): Join faculty staff meetings.
- **Submenu 03: Live Classes Report** (`/teacher/gmeet/classes-report`): Inspect student live class attendance minutes.
- **Submenu 04: Live Meeting Report** (`/teacher/gmeet/meeting-report`): View faculty meeting duration logs.
- **Submenu 05: Setting** (`/teacher/gmeet/setting`): View Google Meet integration credentials.

---

#### Flow 10: Homework (`assignment`) — 2 Submenus
- **Submenu 01: Add Homework** (`/teacher/homework/add-homework`):
  - *Flow Step 1*: Filter by Class, Section, Subject Group, Subject.
  - *Flow Step 2*: Click `+ Add` to author homework: Title, Submission Date, Max Marks, Document Attachment, Description.
  - *Flow Step 3*: Switch between `Upcoming Homework` and `Closed Homework` tabs.
  - *Flow Step 4*: Evaluate modal: Review student digital submissions, enter marks, write feedback.
- **Submenu 02: Daily Assignment** (`/teacher/homework/daily-assignment`): Track daily micro-tasks and homework logs.

---

#### Flow 11: Human Resource (`badge`) — 2 Submenus (Self-Service HR)
*Note: Payroll, staff roll calls, and organization setup are excluded.*
- **Submenu 01: Staff Directory** (`/teacher/human-resource/staff-directory`): View peer faculty directory with phone and room contacts.
- **Submenu 02: Apply Leave** (`/teacher/human-resource/apply-leave`): Submit leave requests (`Casual Leave`, `Medical Leave`) with reason notes and file attachments.

---

#### Flow 12: Lesson Plan (`auto_stories`) — 4 Submenus
*Note: `Copy Old Lessons` is excluded.*
- **Submenu 01: Manage Lesson Plan** (`/teacher/lesson-plan/manage-lesson-plan`): Build weekly Monday–Saturday lesson delivery plans.
- **Submenu 02: Manage Syllabus Status** (`/teacher/lesson-plan/syllabus-status`): Mark curriculum topics as complete and track syllabus coverage progress bars.
- **Submenu 03: Lesson** (`/teacher/lesson-plan/lesson`): Author lesson units mapped to subjects.
- **Submenu 04: Topic** (`/teacher/lesson-plan/topic`): Create sub-topics under each lesson unit.

---

#### Flow 13: Multi Branch (`hub`) — 1 Submenu (Read-Only Overview)
*Note: Report and Setting are excluded.*
- **Submenu 01: Overview** (`/teacher/multi-branch/overview`): Read-only view of network campus overview statistics.

---

#### Flow 14: Online Course / LMS (`video_library`) — 3 Submenus (Teacher Course Creator)
*Note: Question Bank, Offline Payment, and Setting are excluded.*
- **Submenu 01: Online Course** (`/teacher/online-course/course-list`):
  - *Flow Step 1*: 4-Column visual card grid displaying authored courses (e.g. *Hindi Language Course*, *Environmental Science*, *Physics - Energy Course*, *The Life of Plants*).
  - *Flow Step 2*: Click `+ Add Course` -> Define title, description, class, price (or Free), upload lecture videos.
  - *Flow Step 3*: Actions on cards: Purple `Manage` (edit lessons/quizzes) and Green `Preview` (student view).
- **Submenu 02: Course Category** (`/teacher/online-course/course-category`): View course taxonomy tracks (`Lifestyle course`, `UPGRADE SKILL`, `Personal Development`).
- **Submenu 03: Online Course Report** (`/teacher/online-course/course-report`): Inspect student video progress, quiz attempts, and course completion rates.

---

#### Flow 15: Online Examinations (`laptop_chromebook`) — 2 Submenus
- **Submenu 01: Online Exam** (`/teacher/online-exam/exam-list`):
  - *Flow Step 1*: Click `+ Add Exam` -> Set title, date range, duration, passing percentage.
  - *Flow Step 2*: Tab navigation: `Upcoming Exams` vs. `Closed Exams`.
  - *Flow Step 3*: Action buttons: Print, Assign Students, View Info, Edit, View Exam Report, Evaluate Submissions, Delete.
- **Submenu 02: Question Bank** (`/teacher/online-exam/question-bank`): Create CBT exam questions (Single Choice, Multiple Choice, True/False, Descriptive).

---

#### Flow 16: Reports (`analytics`) — 9 Permitted Reports
*Note: Finance, HR Payroll, Library, Inventory, User Log, and Audit Trail reports are completely excluded.*
- **Submenu 01: Student Information** (`/teacher/reports/student-information`): Student lists, gender ratio, admission reports.
- **Submenu 02: Attendance** (`/teacher/reports/attendance`): Student daily and monthly attendance reports.
- **Submenu 03: Examinations** (`/teacher/reports/examinations`): Exam rank reports and subject marks distribution.
- **Submenu 04: Online Examinations** (`/teacher/reports/online-examinations`): CBT exam attempts and score rankings.
- **Submenu 05: Lesson Plan** (`/teacher/reports/lesson-plan`): Syllabus completion audit reports.
- **Submenu 06: Homework** (`/teacher/reports/homework`): Homework submission and grading percentage reports.
- **Submenu 07: Transport** (`/teacher/reports/transport`): Student route and bus allocation lists.
- **Submenu 08: Hostel** (`/teacher/reports/hostel`): Student room allocation rosters.
- **Submenu 09: Alumni** (`/teacher/reports/alumni`): Past graduate directories.

---

#### Flow 17: Student Information (`school`) — 8 Submenus
*Note: `Online Admission` is excluded; student intake verification is an administrative role.*
- **Submenu 01: Student Details** (`/teacher/student-info/student-details`):
  - *Flow Step 1*: Filter by `Class *` and `Section` or query `Search By Keyword`.
  - *Flow Step 2*: View student dossier: Profile photo, parent contacts, attendance percentage, health records.
- **Submenu 02: Student Admission** (`/teacher/student-info/student-admission`): View student admission records.
- **Submenu 03: Disabled Students** (`/teacher/student-info/disabled-students`): View inactive student accounts.
- **Submenu 04: Multi Class Student** (`/teacher/student-info/multi-class-student`): Multi-cohort student mapping.
- **Submenu 05: Bulk Delete** (`/teacher/student-info/bulk-delete`): Batch removal (subject to admin approval).
- **Submenu 06: Student Categories** (`/teacher/student-info/student-categories`): View student demographics.
- **Submenu 07: Student House** (`/teacher/student-info/student-house`): View school house assignments.
- **Submenu 08: Disable Reason** (`/teacher/student-info/disable-reason`): View status dictionaries.

---

#### Flow 18: System Setting (`settings`) — 1 Submenu
- **Submenu 01: System Setting** (`/teacher/system-setting`): Personal teacher profile, password reset, and notification preferences.

---

#### Flow 19: Zoom Live Classes (`video_camera_front`) — 5 Submenus
- **Submenu 01: Live Meeting** (`/teacher/zoom/live-meeting`): Join faculty Zoom conferences.
- **Submenu 02: Live Classes** (`/teacher/zoom/live-classes`): Launch scheduled Zoom virtual lectures.
- **Submenu 03: Live Classes Report** (`/teacher/zoom/classes-report`): Inspect student Zoom participation duration.
- **Submenu 04: Live Meeting Report** (`/teacher/zoom/meeting-report`): View teacher meeting duration records.
- **Submenu 05: Setting** (`/teacher/zoom/setting`): Configure teacher Zoom API credentials.

---

### 4. Comparison Summary: Super Admin vs. Admin vs. Teacher

| Architectural Dimension | Super Admin (`SUPER_ADMIN`) | Campus Admin (`ADMIN`) | Teacher (`TEACHER`) |
| :--- | :--- | :--- | :--- |
| **Visible Modules** | **34 Modules** | **34 Modules** | **19 Modules** (15 Omitted) |
| **Total Submenu Screens** | **182 Screens** | **182 Screens** | **78 Screens** |
| **RLS Scope** | Universal Bypass (`app.bypass_rls = true`) | Branch-Scoped (`app.current_branch_id = ?`) | Branch + Assigned Class/Staff Scope |
| **Brand Accent Token** | Royal Purple (`#8E24AA`) | Cerulean Blue (`#0288D1`) | Academic Cobalt (`#2563EB`) |
| **Financial Operations** | Global Clearinghouse & Gateways | Campus Fee Invoicing & Receipts | **ZERO Access** (No Fees, No Income, No Expense) |
| **Logistics Management** | Global Fleet, Hostels & Warehouse | Campus Depot, Bus Routes, Rooms | **Read-Only Rosters** |
| **Curriculum & Grading** | Framework Definition | Exam Publishing & Transcripts | Mark Entry, Homework, CBT, Attendance |
| **Public CMS & Media** | Site Layout, Themes & Pages | News Releases & Event Media | **ZERO Access** |

---

### 5. Detailed UI Wireframe & Criteria Field Specifications (From 15 Verified Teacher Screens)

#### 5.1 Gmeet Live Classes -> Live Classes (`media_1789166815602.png`)
- **Route**: `/teacher/gmeet-live-classes/live-classes`
- **Zone 1: Weekly Timetable Strip**:
  - Horizontal 7-column layout (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday).
  - Monday: `Subject: Hindi (230)`, `Class: Class 1(A)`, `8:45 AM - 9:30 AM`, `Room No.: 100`.
  - Tuesday: `Subject: Hindi (230)`, `Class: Class 1(A)`, `08:35 AM - 09:05 AM`, `Room No.: 12`.
  - Wednesday (Dual slots): `Subject: English (210)`, `Class: Class 2(A)`, `8:30 AM - 09:00 AM`, `Room No.: 100` AND `Subject: Hindi (230)`, `Class: Class 1(A)`, `08:35 AM - 09:05 AM`, `Room No.: 12`.
  - Thursday: `Subject: Hindi (230)`, `Class: Class 1(A)`, `08:35 AM - 09:05 AM`, `Room No.: 12`.
  - Friday: `Subject: Hindi (230)`, `Class: Class 1(A)`, `8:00 AM - 08:30 AM`, `Room No.: 12`.
  - Saturday & Sunday: `Not Scheduled` neutral cards.
- **Zone 2: Scheduled Live Class Table**:
  - Header: `Scheduled Live Class` + Purple `+ Add` button.
  - Controls: Search input, Page size dropdown (`50`), Export icons (Copy, CSV, Excel, PDF, Print, Column Visibility).
  - Columns: `Class Title` | `Description` | `Date Time` | `Class Duration (Minutes)` | `Created By` | `Class` (Section Checkbox List) | `Status` (`Awaited` dropdown) | `Action` (Emerald `Start` button with camera icon).

#### 5.2 Zoom Live Classes -> Live Meeting (`media_1789166824919.png`)
- **Route**: `/teacher/zoom-live-classes/live-meeting` (`admin/conference/meeting`)
- **Header**: `Live Meeting` + Action Buttons: `+ Add` (Purple) & `+ Add Credential` (Purple).
- **Controls**: Search input, Page size dropdown (`50`), Export icons (Copy, CSV, Excel, PDF, Print, Columns).
- **Columns**: `Meeting Title` | `Description` | `Date Time` | `Meeting Duration (Minutes)` | `Api Used` (`Self`) | `Created By` | `Status` (`Awaited` orange badge) | `Action` (Purple Camera launch button).

#### 5.3 CBSE Examination -> Exam (`media_1789166835549.png`)
- **Route**: `/teacher/cbse-exam/exam`
- **Header**: `Exam List` + Purple `+ Add` button.
- **Columns**: `Exam Name` | `Class (Sections)` | `Term` | `Subjects Included` | `Exam Published` (Checkbox checked icon) | `Published Result` (Checkbox checked icon) | `Category Name` (`Internal Assessment`, `Main Subjects`) | `Description` | `Created At` | `Action`.
- **Action Strip (7 Buttons)**:
  1. Link Exam
  2. Register Students
  3. Schedule Timetable Calendar
  4. Publish Result Notification
  5. Edit Pencil
  6. Marks Entry Roster
  7. Delete Cross

#### 5.4 Examinations -> Exam Group (`media_1789166846181.png`)
- **Route**: `/teacher/examinations/exam-group`
- **Split 2-Column Layout**:
  - **Left Card (`Add Exam Group`)**:
    - `Name *`: Single-line text input.
    - `Exam Type *`: Select dropdown (`General Purpose (Pass/Fail)`, `School Based Grading System`, `College Based Grading System`, `GPA Grading System`, `Average Passing`).
    - `Description`: Multi-line textarea.
    - Purple `Save` button at bottom right.
  - **Right Card (`Exam Group List`)**:
    - Search input, Page size (`50`), Export icons.
    - Columns: `Name` | `No Of Exams` | `Exam Type` | `Action` (`+` Add Exam button, Pencil Edit button, Purple `x` Delete button).
    - Status footer: `Showing 1 to 5 of 5 entries`.

#### 5.5 Attendance -> Student Attendance (`media_1789166855207.png`)
- **Route**: `/teacher/attendance/student-attendance`
- **Criteria Card**:
  - `Class *`: Dropdown (`Select`).
  - `Section *`: Dropdown (`Select`).
  - `Attendance Date *`: Date picker pre-populated with current date (`09/12/2026`).
  - Purple `Search [search]` button at bottom right.

#### 5.6 Online Examinations -> Online Exam (`media_1789166866826.png`)
- **Route**: `/teacher/online-exam/online-exam-list`
- **Header**: `Online Exam List` + Purple `+ Add Exam` button.
- **Tabs**: `Upcoming Exams` (Active) vs. `Closed Exams`.
- **Columns**: `Exam` | `Quiz` (Checkbox checked icon) | `Questions` (Count + Descriptive count e.g. `16 (Descriptive:6)`) | `Attempt` (e.g. `5`) | `Exam From` | `Exam To` | `Duration` (`01:00:00`) | `Exam Published` (Checkbox checked icon) | `Result Published` (Info icon) | `Description` | `Action`.
- **Action Strip (7 Buttons)**: Assign Students, Tags/Keywords, Exam Details Info, Edit Pencil, Clone/Copy Exam, Results Overview, Delete Cross.

#### 5.7 Academics -> Class Timetable (`media_1789166875913.png`)
- **Route**: `/teacher/academics/class-timetable`
- **Card Header**: `Select Criteria` + Purple `+ Add` button at top right.
- **Criteria Form**:
  - `Class *`: Dropdown (`Select`).
  - `Section *`: Dropdown (`Select`).
  - Purple `Search [search]` button at bottom right.

#### 5.8 Lesson Plan -> Manage Lesson Plan (`media_1789166887071.png`)
- **Route**: `/teacher/lesson-plan/manage-lesson-plan`
- **Header**: `Manage Lesson Plan` with Date Range Navigator (`< 09/07/2026 To 09/13/2026 >`).
- **7-Day Timetable Grid**:
  - Monday `09/07/2026` to Sunday `09/13/2026` columns.
  - Active lesson card shows:
    - 3 Action icons at top right: View Syllabus Details (`list`), Edit (`edit`), Delete (`close`).
    - Subject name (e.g. `Subject: Hindi (230)`).
    - Class and Section with time (e.g. `Class: Class 1(A) 8:45 AM - 9:30 AM`).
    - Room allocation (e.g. `Room No.: 100`).
  - Weekend slots (Saturday & Sunday) show red alert badges: `(x) Not Scheduled`.

#### 5.9 Human Resource -> Staff Directory (`media_1789166897027.png`)
- **Route**: `/teacher/human-resource/staff-directory`
- **Criteria Card**:
  - `Role *`: Dropdown (`Select`) + Purple `Search [search]` button.
  - `Search By Keyword`: Text input ("Search By Staff ID, Name, Role etc...") + Purple `Search [search]` button.
- **View Toggle**: `Card View` (Active) vs. `List View`.
- **Card View Grid (4 Columns x 2 Rows)**:
  - Faculty Cards show photo, Name, Staff ID, Phone, Location/Department, and Role badges.
  - Example Faculty: `Jason Shariton (90006)` (Logged-in teacher, Ground Floor Academic, `Teacher` & `Faculty` badges), `Shivam Verma (9002)`, `William Abbot (9003)`, `James Deckar (9004)`, `Brandon Heart (9005)`, `Maria Ford (9005)`, `Nishant Khare (1002)`, `Aman Verma (654)`.

#### 5.10 Communicate -> Notice Board (`media_1789166907438.png`)
- **Route**: `/teacher/communicate/notice-board`
- **Header**: `Notice Board` + Two Action Buttons: `+ Post New Message` (Purple) & `Delete Notice Board` (Purple).
- **Notice List**: Linear list of published announcements with envelope icons (e.g. Fee Submission Reminder, Notice for new Book collection, Online Learning Notice, Extra class for Std - X to XII, Student Health Check-up, PTM, Staff Meeting, School Holiday Notice).

#### 5.11 Download Center -> Upload/Share Content (`media_1789166921069.png`)
- **Route**: `/teacher/download-center/content-list`
- **Header**: `Content List` + Purple `Upload` button (with cloud icon).
- **Controls**: Search input with purple button + List/Grid view switchers.
- **Empty State**: Blue banner `No Record Found` + Pagination controls (`< Previous Next >`).
- **Right Summary Widget**: Cloud document storage counter (`Total Documents: 0`, `Size: 0 bytes`).

#### 5.12 Homework -> Add Homework (`media_1789166930548.png`)
- **Route**: `/teacher/homework/homework-list`
- **Criteria Card**:
  - `Class *`: Dropdown (`Select`).
  - `Section`: Dropdown (`Select`).
  - `Subject Group`: Dropdown (`Select`).
  - `Subject`: Dropdown (`Select`).
  - Purple `Search [search]` button at bottom right.
- **Homework List Card**:
  - Header: `Homework List` + Purple `+ Add` button.
  - Tabs: `Upcoming Homework` (Active) vs. `Closed Homework`.
  - Columns: `Class` | `Section` | `Subject Group` | `Subject` | `Homework Date` | `Submission Date` | `Evaluation Date` | `Created By` | `Action`.
  - Empty State: Document folder illustration + `No data available in table` + `+ Add new record or search with different criteria.` (`Showing 0 to 0 of 0 entries`).

#### 5.13 Certificate -> Staff ID Card (`media_1789166944374.png`)
- **Route**: `/teacher/certificate/staff-id-card`
- **Card Builder Form**:
  - Top Input: School / Template Header Name.
  - `Address / Phone / Email *`: Multi-line textarea.
  - `ID Card Title *`: Text input.
  - `Header Color`: Color picker input.
  - **12 Individual Feature Toggles (Switch Inputs)**:
    1. `Staff Name` toggle
    2. `Staff ID` toggle
    3. `Designation` toggle
    4. `Department` toggle
    5. `Father Name` toggle
    6. `Mother Name` toggle
    7. `Date Of Joining` toggle
    8. `Current Address` toggle
    9. `Phone` toggle
    10. `Date Of Birth` toggle
    11. `Design Type` toggle
    12. `Barcode / QR Code` toggle
  - Purple `Save` button at bottom right.

#### 5.14 Reports -> Student Information Report (`media_1789166967172.png` & `media_1789166985789.png`)
- **Route**: `/teacher/reports/student-information`
- **Header**: `Student Information Report`
- **3-Column Catalog Grid**:
  - **Column 1**:
    - `Student Report`
    - `Student Login Credential`
    - `Admission Report`
  - **Column 2**:
    - `Guardian Report`
    - `Parent Login Credential`
    - `Sibling Report`
  - **Column 3**:
    - `Student History`
    - `Class Subject Report`
    - `Student Profile`

#### 5.15 System Setting Footer Navigation (`media_1789166985789.png`)
- **Route**: `/teacher/system-setting`
- **Sidebar Footer**: Left navigation scroll reveals bottom accordion `System Setting` for teacher self-service profile and preference adjustments.

