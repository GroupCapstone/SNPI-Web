# Super Admin Sidebar & Quick Links Navigation Architecture
## Smart School Enterprise Platform (Universal Navigation Taxonomy)

---

### Overview & Governance

This document records the **complete, authoritative navigation taxonomy, sidebar hierarchy, and quick-link structure** for the **Super Admin Portal** of the Smart School Enterprise Platform.

- **Primary Role**: `SUPER_ADMIN`
- **Scope**: Universal Multi-Campus & Multi-Tenant
- **UI Architecture**: Liquid Glass Collapsible Sidebar & Header Quick-Launch Drawer
- **Font & Icon Standard**: Ubuntu (EN) / Google Sans (KM), Google Material Symbols exclusively, **STRICT ZERO EMOJI POLICY**.

---

### Master Navigation Taxonomy (34 Core Modules)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                    SUPER ADMIN ENTERPRISE NAVIGATION TAXONOMY                        │
├──────────────────────┬──────────────────────┬─────────────────┬──────────────────────┤
│ 1. ACADEMIC ENGINE   │ 2. STUDENT LIFECYCLE │ 3. FINANCE & POS│ 4. OPERATIONS & HR   │
│  • Academics         │  • Student Info      │  • Fees Collect │  • Human Resource    │
│  • Lesson Plan       │  • Student CV        │  • Income       │  • Attendance        │
│  • Homework          │  • Behaviour Records │  • Expenses     │  • QR Attendance     │
│  • Examinations      │  • Alumni            │  • Thermal Print│  • Annual Calendar   │
│  • CBSE Examination  │                      │                 │                      │
│  • Online Exams      │                      │                 │                      │
├──────────────────────┼──────────────────────┼─────────────────┼──────────────────────┤
│ 5. LOGISTICS & SITES │ 6. COMMUNICATIONS    │ 7. E-LEARNING   │ 8. SYSTEM & MULTI    │
│  • Front Office      │  • Communicate       │  • Online Course│  • Multi Branch      │
│  • Library           │  • Whatsapp Messaging│  • Zoom Live    │  • Reports (15 Areas)│
│  • Inventory         │  • Download Center   │  • Gmeet Live   │  • System Setting    │
│  • Transport         │  • Front CMS         │                 │  • Certificate       │
│  • Hostel            │                      │                 │                      │
└──────────────────────┴──────────────────────┴─────────────────┴──────────────────────┘
```

---

### Domain 1: Academic Engine & Curriculum Management

#### 1. Academics
- **Class Timetable**: Master scheduling matrix across periods and campus rooms.
- **Teachers Timetable**: Teacher allocation and weekly lecture loads.
- **Assign Class Teacher**: Homeroom/Section head teacher assignment.
- **Promote Students**: End-of-year batch academic promotion and grade progression.
- **Subject Group**: Curricular subject combinations (Science, Arts, Commerce).
- **Subjects**: Core and elective subject catalog with theory/practical credits.
- **Class**: Institutional grade levels (e.g., Nursery to Grade 12).
- **Sections**: Academic cohorts (Section A, B, C) per class.

#### 2. Lesson Plan
- **Copy Old Lessons**: Historical syllabus and lecture plan duplication.
- **Manage Lesson Plan**: Weekly unit planning and learning objectives.
- **Manage Syllabus Status**: Completed vs. pending syllabus tracking percentage.
- **Lesson**: Discrete lesson catalog per subject.
- **Topic**: Sub-topics, unit breakdown, and teaching materials.

#### 3. Homework
- **Add Homework**: Teacher assignment creation with attachments and deadlines.
- **Daily Assignment**: Daily classroom tasks, submission monitoring, and review notes.

#### 4. Examinations
- **Exam Group**: Term, Midterm, and Semester exam clustering.
- **Exam Schedule**: Dates, time slots, exam halls, and invigilator rosters.
- **Exam Result**: Marks consolidation, moderation, and grade publication.
- **Design Admit Card**: Layout builder for hall tickets with QR/Barcode and photo.
- **Print Admit Card**: Batch generation and PDF export of student hall tickets.
- **Design Marksheet**: Certificate/Transcript template designer.
- **Print Marksheet**: Batch report card printing and digital publishing.
- **Marks Grade**: GPA grading bands (A+, A, B, C, D, F) and percentage scales.
- **Marks Division**: Class division cutoffs (Distinction, First, Second, Pass).

#### 5. CBSE Examination
- **Exam**: National/State board standardized exam registration.
- **Exam Schedule**: CBSE board examination scheduling.
- **Print Marksheet**: Official board marksheet generation.
- **Template**: Standard board report layouts.
- **Assign Observation**: Co-scholastic observation and discipline grading.
- **Admit Card**: Board admit card issuance.
- **Reports**: Board performance analytics.
- **Setting**: CBSE grading criteria and weightings.

#### 6. Online Examinations
- **Online Exam**: CBT (Computer-Based Testing) exam creation and timing rules.
- **Question Bank**: Categorized question repository (MCQ, True/False, Fill-in, Descriptive).

---

### Domain 2: Student Lifecycle & Records Management

#### 7. Student Information
- **Student Details**: Master student profile (Bio, Medical, Guardian, RFID/QR, Documents).
- **Student Admission**: Formal enrollment workflow and roll number assignment.
- **Online Admission**: Public portal applicant queue and approval desk.
- **Disabled Students**: Deactivated / suspended student archives.
- **Multi Class Student**: Dual-enrolled or extracurricular cohort students.
- **Bulk Delete**: Administrative purge tool with high-security audit confirmation.
- **Student Categories**: Demographic categories (General, Scholarship, International).
- **Student House**: Inter-house team affiliation (Red, Blue, Green, Gold).
- **Disable Reason**: Audit taxonomy for student withdrawal or dismissal.

#### 8. Student CV
- **Build CV**: Academic and extracurricular portfolio generator.
- **Download CV**: Formatted PDF export of student resume for college applications.

#### 9. Behaviour Records
- **Assign Incident**: Log positive accomplishments or disciplinary infractions.
- **Incidents**: Master incident classification index.
- **Reports**: Student conduct trends, repeat offender analysis, house point balance.
- **Setting**: Point scales, severity tiers, and automatic parent alert triggers.

#### 10. Alumni
- **Manage Alumni**: Graduated cohort directory with career/university tracking.
- **Events**: Alumni reunions, fundraising dinners, and career fairs.

---

### Domain 3: Operations, Attendance & IoT Tracking

#### 11. Attendance
- **Student Attendance**: Classroom morning and afternoon roll call sheets.
- **Approve Leave**: Student absence request approval and medical notes.
- **Attendance By Date**: Cross-sectional campus headcount audit by calendar day.

#### 12. QR Code Attendance
- **Attendance**: High-speed QR scanner camera / tablet terminal ingress.
- **Setting**: QR rotation interval, dynamic encryption token, device binding.

#### 13. Annual Calendar
- **Annual Calendar**: Institutional master calendar with academic/event overlays.
- **Holiday Type**: Holiday classifications (National, Religious, School Recess).

---

### Domain 4: Finance, Fee Collection & Accounting

#### 14. Fees Collection
- **Collect Fees**: Student fee counter POS (Cash, Card, Bank Transfer, QR).
- **Offline Bank Payments**: Bank slip verification and approval workflow.
- **Search Fees Payment**: Transaction search by receipt number, student ID, or date.
- **Search Due Fees**: Overdue student tuition lists with aging filters.
- **Fees Master**: Term fee schedules linked to classes and academic sessions.
- **Quick Fees**: 1-click counter collection for standard fee heads.
- **Fees Group**: Combined billing packages (e.g., Tuition + Lab + Transport).
- **Fees Type**: Discrete charge heads (Admission, Tuition, Science Lab, Library).
- **Fees Discount**: Sibling discounts, merit scholarships, staff child waivers.
- **Fees Carry Forward**: Unpaid balance migration into subsequent academic year.
- **Fees Reminder**: Automated SMS/Email/WhatsApp overdue fee notifications.

#### 15. Income
- **Add Income**: Miscellaneous institutional revenue recording.
- **Search Income**: Filter revenue by head, date, campus, and receipt ID.
- **Income Head**: Categories (Canteen rental, Venue hire, Donations, Uniforms).

#### 16. Expenses
- **Add Expense**: Operational expenditure vouchers (Vendor invoices, Utilities).
- **Search Expense**: Filter expenses by category, date range, or approval status.
- **Expense Head**: Budget accounts (Electricity, Campus Maintenance, Salaries).

#### 17. Thermal Print
- **Thermal Print**: POS thermal receipt layout configuration (58mm / 80mm ESC/POS).

---

### Domain 5: Human Resources & Staff Administration

#### 18. Human Resource
- **Staff Directory**: Master personnel files (Deans, Teachers, Accountants, Drivers).
- **Staff Attendance**: Daily biometric / card punch logs for school employees.
- **Approve Leave Request**: Faculty and staff leave approval queue.
- **Apply Leave**: Staff personal leave application portal.
- **Leave Type**: Paid, Sick, Maternity, Casual leave quotas.
- **Teachers Rating**: Student/Parent feedback scores and pedagogical evaluation.
- **Department**: Organizational units (Mathematics, Administration, Transport).
- **Designation**: Job titles (Principal, Senior Lecturer, Junior Accountant).
- **Disabled Staff**: Inactive / resigned staff historical repository.

---

### Domain 6: Campus Services, Facility & Logistics

#### 19. Front Office
- **Admission Enquiry**: Prospect inquiries, lead stage pipeline, follow-up dates.
- **Visitor Book**: Digital visitor registration, badge printing, host notification.
- **Phone Call Log**: Inbound and outbound institutional call logs.
- **Postal Dispatch**: Outgoing courier packages and tracking numbers.
- **Postal Receive**: Incoming registered mail and recipient staff delivery.
- **Complain**: Formal student/parent grievance logging and resolution tracking.
- **Setup Front Office**: Visitor purposes, complaint types, enquiry sources.

#### 20. Library
- **Book List**: Master book catalog (ISBN, Dewey Decimal, Rack, Copies).
- **Issue - Return**: Circulation desk for checking out and returning media.
- **Add Student**: Assign library membership cards to students.
- **Add Staff Member**: Assign library privileges to faculty.

#### 21. Inventory
- **Issue Item**: Internal equipment issue to departments or faculty.
- **Add Item Stock**: Inbound warehouse inventory receipt and batch tracking.
- **Add Item**: Master goods catalog (Lab apparatus, stationery, furniture).
- **Item Category**: Inventory classifications.
- **Item Store**: Physical storerooms and warehouse locations.
- **Item Supplier**: Vendor contracts, phone numbers, and procurement terms.

#### 22. Transport
- **Fees Master**: Transportation pricing zones.
- **Pickup Point**: Bus stops and scheduled arrival/departure times.
- **Routes**: Fleet travel itineraries and bus lines.
- **Vehicles**: Bus inventory (License plate, capacity, insurance, GPS device ID).
- **Assign Vehicle**: Assign drivers and vehicles to specific routes.
- **Route Pickup Point**: Sequence mapping of stops along a bus route.
- **Student Transport Fees**: Student transport subscription billing.

#### 23. Hostel
- **Hostel Rooms**: Room inventory, bed count, and current occupancy.
- **Room Type**: Single, Double, Dormitory classifications with amenities.
- **Hostel**: Dormitory buildings (Boys Hostel, Girls Hostel).

---

### Domain 7: Communications, Messaging & Content Delivery

#### 24. Communicate
- **Notice Board**: Campus-wide public bulletin announcements.
- **Send Email**: Batch email composer with variable tags.
- **Send SMS**: Batch SMS gateway dispatcher.
- **Email / SMS Log**: Delivery status audit trail (Sent, Delivered, Failed).
- **Schedule Email SMS Log**: Upcoming queue of scheduled broadcasts.
- **Login Credentials Send**: Automated delivery of portal credentials to parents/students.
- **Email Template**: Reusable HTML email designs.
- **SMS Template**: Standardized carrier-compliant SMS text formats.

#### 25. Whatsapp Messaging
- **Whatsapp Messaging**: Direct WhatsApp Business API messaging and templates.

#### 26. Download Center
- **Upload/Share Content**: Academic resources, syllabi, and assignment PDFs.
- **Content Share List**: Publicly shared links and download permissions.
- **Video Tutorial**: Educational video links and lesson archives.
- **Content Type**: Media categories (Assignments, Study Material, Past Papers).

#### 27. Front CMS (Public School Website)
- **Event**: School calendar public announcements.
- **Gallery**: Photo albums and campus media.
- **News**: Press releases and institutional news.
- **Media Manager**: Digital Asset Management (DAM) for images, videos, banners.
- **Pages**: Static web page builder (About Us, Admissions, Facilities).
- **Menus**: Public website header and footer navigation menus.
- **Banner Images**: Hero slider banners on public home page.

---

### Domain 8: Virtual Classrooms & Online Courses

#### 28. Gmeet Live Classes
- **Live Classes**: Google Meet integration for scheduled online classrooms.
- **Live Meeting**: Staff and parent virtual conference scheduling.
- **Live Classes Report**: Student join times and attendance duration logs.
- **Live Meeting Report**: Meeting duration and participant audit.
- **Setting**: Google Workspace OAuth credentials and API keys.

#### 29. Zoom Live Classes
- **Live Meeting**: Zoom staff and administrative video calls.
- **Live Classes**: Zoom scheduled curriculum sessions.
- **Live Classes Report**: Student attendance and engagement analytics.
- **Live Meeting Report**: Meeting summary.
- **Setting**: Zoom JWT / OAuth credentials.

#### 30. Online Course (E-Learning LMS)
- **Online Course**: Self-paced video courses, modules, and lessons.
- **Question Bank**: Course-specific quizzes and knowledge checks.
- **Offline Payment**: Manual student course enrollment approvals.
- **Course Category**: Subject areas (STEM, Languages, Arts).
- **Certificate Template**: Automated certificate of completion builder.
- **Online Course Report**: Course progress, quiz scores, and drop-off rate.
- **Setting**: E-learning video hosting and DRM playback controls.

---

### Domain 9: Enterprise Governance, Multi-Branch & Reports

#### 31. Multi Branch
- **Overview**: High-level cross-campus KPIs and real-time status matrix.
- **Report**: Consolidated multi-campus operational and financial comparisons.
- **Setting**: Campus branch provisioning, geographic tags, and Dean assignment.

#### 32. Certificate
- **Transfer Certificate (TC)**: Student school-leaving legal certificates.
- **Student Certificate**: Bonafide, Character, and Achievement certificates.
- **Generate Certificate**: Batch certificate PDF printing with digital seal.
- **Student ID Card**: Student badge template designer with RFID/Barcode.
- **Generate ID Card**: Batch printing of student photo ID cards.
- **Staff ID Card**: Faculty security badge designer.
- **Generate Staff ID Card**: Batch employee ID printing.

#### 33. Reports (15 Enterprise Audit Areas)
- **Student Information**: Enrollment trends, demographic breakdowns.
- **Finance**: Balance sheet, fee collection vs. due, income vs. expense.
- **Attendance**: Daily, monthly, and annual attendance ratios.
- **Examinations**: Grade distribution bell curves, class rank lists.
- **Online Examinations**: CBT attempt rates and question item difficulty analysis.
- **Lesson Plan**: Syllabus completion and curriculum velocity.
- **Human Resource**: Staff payroll summary, leave balances, teacher ratings.
- **Homework**: Homework assignment frequency and student evaluation logs.
- **Library**: Circulation volume, overdue books, and fine recovery.
- **Inventory**: Stock depletion rates, asset valuation, supplier orders.
- **Transport**: Route capacity utilization and fuel expenses.
- **Hostel**: Room vacancy rates and boarding fee collections.
- **Alumni**: Alumni network engagement and career placements.
- **User Log**: Authentication history, IP addresses, and failed logins.
- **Audit Trail Report**: Detailed immutable log of every insert, update, and delete.

#### 34. System Setting (Platform Configuration)
- **General Setting**: School name, address, timezone, session start month.
- **Session Setting**: Active academic year (e.g., `2026-2027`).
- **Notification Setting**: Push, SMS, and email notification channel toggles.
- **Whatsapp Messaging**: WhatsApp API vendor keys and webhook secrets.
- **SMS Setting**: Twilio / Telecom carrier SMS gateway credentials.
- **Email Setting**: SMTP / AWS SES / SendGrid mail server parameters.
- **Payment Methods**: Gateway credentials (ABA PayWay, Wing, Stripe, PayPal).
- **Print Header Footer**: Official letterhead and report margins.
- **Thermal Print**: Thermal printer baud rate and ESC/POS codes.
- **Front CMS Setting**: Public website theme toggles and SEO meta tags.
- **Roles Permissions**: Granular RBAC privilege assignment per screen/action.
- **Backup Restore**: Database snapshot download and disaster recovery.
- **Languages**: Multilingual localization (English, Khmer, etc.).
- **Currency**: Base currency (USD `$`) and secondary exchange rates.
- **Addons**: Modular feature plugin activation.
- **Modules**: System-wide module toggles (enable/disable Hostel, Transport, etc.).
- **Custom Fields**: User-defined metadata fields for Students and Staff.
- **Captcha Setting**: reCAPTCHA v3 bot protection on public forms.
- **System Fields**: Standard field visibility and mandatory rules.
- **Student Profile Update**: Parent self-service student update permissions.
- **Online Admission**: Public application form fields and admission fees.
- **File Types**: Whitelist of permitted upload extensions (PDF, JPG, PNG).
- **Sidebar Menu**: Dynamic sidebar ordering and icon assignment.
- **System Update**: One-click platform OTA update and migration manager.
