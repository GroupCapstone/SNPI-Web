# Master Feature Catalog & Implementation Inventory
## Smart School Enterprise Platform (Universal Institutional Registry)

This document represents the definitive, exhaustive audit of all **87 features** provided across all 11 functional domains. Every feature is cross-referenced with its canonical copy, design tokens, microservice architecture, database entity, and discussion framework for implementation decisions (Keep, Cut, Add, or Refactor).

---

## Executive Summary of the 11 Architectural Domains

| Domain # | Domain Name | Spec File | Features Count | Core Focus |
|:---|:---|:---|:---:|:---|
| **01** | **Why Choose Us** | [`45_PUBLIC_FRONT_SITE_WHY_CHOOSE_US_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/45_PUBLIC_FRONT_SITE_WHY_CHOOSE_US_SPEC.md) | 3 | Value proposition, mobile app, top-tier security. |
| **02** | **Powerful Tools** | [`46_PUBLIC_FRONT_SITE_POWERFUL_TOOLS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/46_PUBLIC_FRONT_SITE_POWERFUL_TOOLS_SPEC.md) | 9 | 5 Role suites + 4 foundational academic modules. |
| **03** | **Student Lifecycle** | [`47_STUDENT_LIFECYCLE_AND_ACADEMIC_OPERATIONS_CATALOG_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/47_STUDENT_LIFECYCLE_AND_ACADEMIC_OPERATIONS_CATALOG_SPEC.md) | 16 | Complete student journey from admission to promotion. |
| **04** | **Examination & Assessment** | [`48_EXAMINATION_MANAGEMENT_AND_ACADEMIC_ASSESSMENT_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/48_EXAMINATION_MANAGEMENT_AND_ACADEMIC_ASSESSMENT_SPEC.md) | 11 | Timetables, admit cards, bulk marksheets, 5 grading systems. |
| **05** | **Attendance & Communication** | [`49_ATTENDANCE_AND_COMMUNICATION_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/49_ATTENDANCE_AND_COMMUNICATION_SPEC.md) | 4 | Daily roll-call, real-time push, DLT SMS, rich email. |
| **06** | **Fee Management & Accounting** | [`50_FEE_MANAGEMENT_AND_ACCOUNTING_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/50_FEE_MANAGEMENT_AND_ACCOUNTING_SPEC.md) | 12 | Invoicing, gateways, concessions, budget, ledger. |
| **07** | **Staff & Human Resources** | [`51_STAFF_AND_HUMAN_RESOURCES_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/51_STAFF_AND_HUMAN_RESOURCES_SPEC.md) | 4 | Staff ID cards, automated payroll, biometric roll, leaves. |
| **08** | **Administration & Access Control** | [`52_ADMINISTRATION_AND_ACCESS_CONTROL_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/52_ADMINISTRATION_AND_ACCESS_CONTROL_SPEC.md) | 8 | 8-Role RBAC, sessions, multi-school, setup wizard. |
| **09** | **Facilities & Operations** | [`53_FACILITIES_AND_OPERATIONS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/53_FACILITIES_AND_OPERATIONS_SPEC.md) | 8 | Library, transport fleet, student/staff hostels, tickets. |
| **10** | **System Utilities & Transport** | [`54_SYSTEM_UTILITIES_AND_TRANSPORT_OPERATIONS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/54_SYSTEM_UTILITIES_AND_TRANSPORT_OPERATIONS_SPEC.md) | 8 | Inquiries, transit roster, fares, audit logs, demo seeds. |
| **11** | **Visitor Management & Gate Passes** | [`55_VISITOR_MANAGEMENT_AND_GATE_PASSES_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/55_VISITOR_MANAGEMENT_AND_GATE_PASSES_SPEC.md) | 4 | Visitor logs, student exit binding, timing telemetry. |
| **TOTAL** | **11 Functional Domains** | **Specs 45 to 55** | **87** | **Universal Institutional Operational Coverage** |

---

## Comprehensive 87-Feature Inventory Matrix

### Domain 01: Why Choose Us (Value Proposition Suite)
*Spec Reference: [`references/45_PUBLIC_FRONT_SITE_WHY_CHOOSE_US_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/45_PUBLIC_FRONT_SITE_WHY_CHOOSE_US_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 01 | **Mobile App Integration** | Access everything on the go with our intuitive mobile interface. | `smartphone` | `#2563EB` | `MobileGatewayService` | **Keep (Core)**: React Native / Flutter API endpoints. |
| 02 | **Secure & Reliable** | Built with top-tier security protocols to protect your data. | `security` | `#059669` | `SecurityComplianceService` | **Keep (Core)**: AES-256 vault & PostgreSQL RLS. |
| 03 | **All-in-One Solution** | Manage students, staff, fees, exams, and more- effortlessly. | `all_inclusive` | `#4338CA` | `PlatformKernelService` | **Keep (Core)**: Unified single-sign-on suite. |

---

### Domain 02: Powerful Tools (Role-Based Governance & Core Academics)
*Spec Reference: [`references/46_PUBLIC_FRONT_SITE_POWERFUL_TOOLS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/46_PUBLIC_FRONT_SITE_POWERFUL_TOOLS_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 04 | **Super Admin** | Access all features and manage schools, users, settings, permissions, and system operations. | `admin_panel_settings` | `#4338CA` | `SuperAdminGovernanceService` | **Keep (Core)**: Root multi-school administration. |
| 05 | **Admin** | Manage daily school operations, users, academic activities, settings, and reports. | `shield_person` | `#0891B2` | `CampusDeanService` | **Keep (Core)**: Single campus sovereign Dean portal. |
| 06 | **Teacher** | Manage students, attendance, homework, lessons, examinations, and academic activities. | `school` | `#059669` | `FacultyClassroomService` | **Keep (Core)**: Teacher classroom workspace. |
| 07 | **Accountant** | Track student fees, invoices, income, expenses, and financial reports in one place. | `payments` | `#D97706` | `FinancialLedgerService` | **Keep (Core)**: POS cashier & fee desk. |
| 08 | **Custom Role** | Create custom user roles and assign permissions according to your institution's requirements. | `tune` | `#7C3AED` | `CustomRoleBuilderService` | **Keep (Core)**: Granular permission matrix generator. |
| 09 | **Homework Management** | Assign, collect, and evaluate homework submissions efficiently. | `assignment` | `#2563EB` | `HomeworkWorkflowService` | **Keep (Core)**: S3 uploads & evaluation rubrics. |
| 10 | **Lesson Management** | Structure lessons and maintain progress tracking for each subject. | `menu_book` | `#0D9488` | `SyllabusProgressService` | **Keep (Core)**: Topic-level completion trackers. |
| 11 | **Attendance** | Mark daily attendance and generate reports for students and staff. | `fact_check` | `#F59E0B` | `AttendanceRollService` | **Keep (Core)**: 1-click batch roll-call. |
| 12 | **Events** | Plan and share details of academic and cultural events with stakeholders. | `event_available` | `#E11D48` | `CalendarEventService` | **Keep (Core)**: Push-notified school calendar. |

---

### Domain 03: Student Lifecycle & Academic Operations Catalog
*Spec Reference: [`references/47_STUDENT_LIFECYCLE_AND_ACADEMIC_OPERATIONS_CATALOG_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/47_STUDENT_LIFECYCLE_AND_ACADEMIC_OPERATIONS_CATALOG_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 13 | **Student Management** | Maintain comprehensive student records, including personal, academic, and attendance details. | `badge` | `#4338CA` | `StudentDossierService` | **Keep (Core)**: 360-degree student master profile. |
| 14 | **Student Documents Upload**| Upload identity proofs, certificates, medical reports, and more securely. | `upload_file` | `#0891B2` | `SecureDocumentVaultService` | **Keep (Core)**: Encrypted document store. |
| 15 | **Transfer Certificates** | Generate and print transfer certificates with a single click. | `assignment_turned_in` | `#059669` | `TransferCertificateEngine` | **Keep (Core)**: 1-click PDF TC with verification QR. |
| 16 | **Student Leaves** | Manage leave requests and approvals within the student portal. | `event_busy` | `#7C3AED` | `StudentLeaveWorkflowService` | **Keep (Core)**: Student self-service & Dean approval. |
| 17 | **Student Noticeboard** | Share updates, circulars, and important announcements with students. | `campaign` | `#0284C7` | `CircularBroadcastService` | **Keep (Core)**: Target-scoped notice board. |
| 18 | **Guardian / Parent Portal**| Give parents access to monitor attendance, grades, feedback, and notifications. | `family_restroom` | `#6B21A8` | `ParentPortalService` | **Keep (Core)**: Multi-child sibling switcher portal. |
| 19 | **Birthday Tracker** | Automatically track and display upcoming student birthdays. | `cake` | `#DB2777` | `BirthdayCronService` | **Keep (Discussion)**: Delight feature, daily automated feed. |
| 20 | **Student ID Cards** | Automatically generate personalized student identification cards. | `contact_mail` | `#475569` | `StudentIDCardEngine` | **Keep (Core)**: Dynamic barcode/QR student cards. |
| 21 | **Student Promotions** | Promote students to higher classes manually or through automation. | `upgrade` | `#65A30D` | `ClassPromotionService` | **Keep (Core)**: End-of-year rollover with marks pass-gate. |
| 22 | **Fee & Payment History** | Track student fee payments, pending balances, and generate fee reports. | `payments` | `#047857` | `StudentLedgerAuditService` | **Keep (Core)**: Verifiable receipt history. |
| 23 | **Custom Certificates** | Design and issue academic or achievement certificates using editable templates. | `card_membership` | `#A21CAF` | `CertificateDesignEngine` | **Keep (Core)**: WYSIWYG certificate layout builder. |
| 24 | **School Transfers** | Handle inter-school or inter-branch transfers seamlessly. | `swap_horiz` | `#334155` | `InterBranchTransferService` | **Keep (Core)**: Cross-branch record migration without data loss. |

---

### Domain 04: Examination Management & Academic Assessment
*Spec Reference: [`references/48_EXAMINATION_MANAGEMENT_AND_ACADEMIC_ASSESSMENT_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/48_EXAMINATION_MANAGEMENT_AND_ACADEMIC_ASSESSMENT_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 25 | **Examination Management** | Create and manage exams for all classes and academic sessions. | `assignment_add` | `#4338CA` | `ExaminationMasterService` | **Keep (Core)**: Multi-session exam engine. |
| 26 | **Admit Card Printing** | Generate and print admit cards for all students at once. | `badge` | `#0891B2` | `AdmitCardService` | **Keep (Core)**: Candidate hall tickets with photo. |
| 27 | **Bulk Result Printing** | Print result sheets and mark sheets for multiple students at once. | `print` | `#059669` | `MarksheetBatchPrintService`| **Keep (Core)**: Multi-student report card batching. |
| 28 | **Exam Groups** | Categorize exams into terms, units, or custom groups for easy reporting. | `folder_shared` | `#7C3AED` | `ExamGroupService` | **Keep (Core)**: Supports 5 institutional grading models. |
| 29 | **Exam Timetable** | Plan and publish detailed exam schedules by class and subject. | `calendar_month` | `#2563EB` | `ExamTimetableService` | **Keep (Core)**: Room & date-clash prevention. |
| 30 | **E-Result Printing** | Print result sheets and mark sheets in bulk efficiently. | `description` | `#0D9488` | `EResultPortalService` | **Keep (Core)**: Self-service digital marksheets with QR verification. |
| 31 | **Exam Results** | Record, compute, and publish student results with grades and remarks. | `fact_check` | `#D97706` | `MarksEvaluationService` | **Keep (Core)**: Theory, practical, and viva marks entry. |
| 32 | **Bulk Admit Card Printing**| Generate and print admit cards for all students simultaneously. | `contact_page` | `#E11D48` | `BulkPDFEngineService` | **Keep (Core)**: High-throughput async Kafka PDF worker. |
| 33 | **Academic Multi Groups** | Organize exams, subjects, and students into multiple academic groups. | `hub` | `#6366F1` | `AcademicCohortService` | **Keep (Core)**: Cross-stream cohort banding (Science, Arts, Commerce). |
| 34 | **Staff Admit Cards** | Issue examination cards or authorization passes for staff. | `verified_user` | `#475569` | `StaffDutyPassService` | **Keep (Core)**: Invigilator room badges & superintendent passes. |
| 35 | **Academic Reports** | Generate analytical reports on academic performance and progress. | `analytics` | `#A21CAF` | `AssessmentAnalyticsService`| **Keep (Core)**: Class pass rates, outlier alerts, subject difficulty charts. |

---

### Domain 05: Attendance & Communication
*Spec Reference: [`references/49_ATTENDANCE_AND_COMMUNICATION_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/49_ATTENDANCE_AND_COMMUNICATION_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 36 | **Attendance Management** | Record and track daily student attendance digitally. | `how_to_reg` | `#059669` | `StudentAttendanceService` | **Keep (Core)**: High-speed roll register & biometric QR sync. |
| 37 | **Notifications** | Deliver instant alerts and announcements across the system. | `campaign` | `#4338CA` | `NotificationBroadcastService`| **Keep (Core)**: STOMP/WebSocket real-time bell dropdown alerts. |
| 38 | **SMS Notifications** | Send text message updates to parents, staff, and students. | `sms` | `#D97706` | `SmsDispatchService` | **Keep (Core)**: DLT regulatory templates & morning absence alerts. |
| 39 | **Email Notifications** | Send automated or manual emails for important events and updates. | `mail` | `#2563EB` | `EmailDispatchService` | **Keep (Core)**: Asynchronous AWS SES / SMTP batch engine. |

---

### Domain 06: Fee Management & Institutional Accounting
*Spec Reference: [`references/50_FEE_MANAGEMENT_AND_ACCOUNTING_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/50_FEE_MANAGEMENT_AND_ACCOUNTING_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 40 | **Fee Management** | Automate student fee collection and schedule fee structures. | `payments` | `#059669` | `FeeScheduleService` | **Keep (Core)**: Term fee calendars & automated late fines. |
| 41 | **Budget Planning** | Set financial plans for departments, events, and track allocations vs. actual expenses. | `calculate` | `#0D9488` | `InstitutionalBudgetService`| **Keep (Core)**: Departmental expenditure caps & variance alerts. |
| 42 | **Fee Types** | Configure multiple fee categories such as tuition, transport, and hostel. | `category` | `#0891B2` | `FeeTypeConfigService` | **Keep (Core)**: Category taxonomy (Tuition, Bus, Hostel, Exam). |
| 43 | **Auto Invoice Generation**| Automatically create invoices for recurring or due payments. | `receipt_long` | `#2563EB` | `InvoiceAutomationEngine` | **Keep (Core)**: Async Kafka scheduled mass invoicing. |
| 44 | **Concessions** | Grant fee concessions for eligible students based on defined policies and categories. | `loyalty` | `#7C3AED` | `ConcessionPolicyService` | **Keep (Core)**: Merit, sibling, and economic hardship waivers. |
| 45 | **Collect Payments** | Accept online or offline payments securely with integrated tracking. | `point_of_sale` | `#D97706` | `PaymentCollectionService` | **Keep (Core)**: POS cash counter & bank wire reconciler. |
| 46 | **Payment Gateways** | Connect multiple payment providers for smooth transactions. | `account_balance` | `#4338CA` | `PaymentGatewayHubService` | **Keep (Core)**: Stripe, PayPal, Razorpay IPN webhooks. |
| 47 | **Donations Management** | Record and manage voluntary donations and financial contributions. | `volunteer_activism` | `#A21CAF` | `DonationTrackingService` | **Keep (Discussion)**: Philanthropic grants & 80G tax receipts. |
| 48 | **Income & Expense Management**| Monitor financial transactions and generate summaries. | `account_balance_wallet`| `#334155`| `GeneralLedgerService` | **Keep (Core)**: Double-entry vouchers & petty cash. |
| 49 | **Discount Management** | Set up discounts for scholarships, concessions, or staff benefits. | `price_change` | `#E11D48` | `FeeDiscountService` | **Keep (Core)**: Fixed & percentage deductions. |
| 50 | **Payment History** | View detailed records of all past payments and receipts. | `history` | `#475569` | `PaymentLedgerAuditService`| **Keep (Core)**: Verifiable receipt PDF downloads. |
| 51 | **Accounts Dashboard** | Visualize income, expenses, and balances through charts and stats. | `query_stats` | `#047857` | `FinancialAnalyticsService`| **Keep (Core)**: Real-time collection speedometers & aging reports. |

---

### Domain 07: Staff & Human Resources
*Spec Reference: [`references/51_STAFF_AND_HUMAN_RESOURCES_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/51_STAFF_AND_HUMAN_RESOURCES_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 52 | **Staff ID Cards** | Generate professional identification cards for all school staff. | `badge` | `#4338CA` | `StaffIDCardService` | **Keep (Core)**: Role-coded employee identification cards. |
| 53 | **Staff Payroll** | Manage staff salaries, deductions, and generate payslips automatically. | `payments` | `#059669` | `StaffPayrollService` | **Keep (Core)**: Automated basic/allowances and EPF/TDS deductions. |
| 54 | **Staff Attendance** | Track daily attendance using manual or automated systems. | `how_to_reg` | `#2563EB` | `StaffAttendanceService` | **Keep (Core)**: Biometric turnstile integration & late-entry logging. |
| 55 | **Staff Leaves** | Process and approve staff leave applications easily. | `event_busy` | `#D97706` | `StaffLeaveWorkflowService`| **Keep (Core)**: Quota management (CL, SL) & substitute routing. |

---

### Domain 08: Administration & Access Control
*Spec Reference: [`references/52_ADMINISTRATION_AND_ACCESS_CONTROL_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/52_ADMINISTRATION_AND_ACCESS_CONTROL_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 56 | **Role-Based Login System** | Define permissions and access levels for administrators, teachers, students, and parents. | `security` | `#4338CA` | `IdentityAccessManagementService`| **Keep (Core)**: 8-role fine-grained RBAC matrix. |
| 57 | **Session Management** | Define academic sessions and manage yearly transitions. | `date_range` | `#059669` | `AcademicSessionService` | **Keep (Core)**: Academic year boundaries & promotion rollover. |
| 58 | **Student and Parent Dashboards**| Provide personalized dashboards with key academic and financial insights. | `space_dashboard` | `#2563EB` | `StudentParentDashboardService`| **Keep (Core)**: Personalized widgets & sibling toggles. |
| 59 | **Noticeboard** | Publish school-wide announcements and updates in one place. | `campaign` | `#D97706` | `NoticeBoardService` | **Keep (Core)**: Campus-wide broadcast feed. |
| 60 | **Multi-School Management** | Operate multiple branches or schools within a unified dashboard. | `hub` | `#7C3AED` | `MultiBranchFederationService`| **Keep (Core)**: Multi-tenant PostgreSQL RLS federation. |
| 61 | **Appearance Settings** | Customize the platform with multiple themes and color schemes. | `palette` | `#A21CAF` | `AppearanceConfigService` | **Keep (Core)**: White-label logos, colors, and Liquid Glass controls. |
| 62 | **Classes and Sections** | Create and manage class structures, sections, and batch details. | `school` | `#0891B2` | `ClassSectionStructureService`| **Keep (Core)**: Pre-K to Grade 12 hierarchy & capacity limits. |
| 63 | **Setup Wizard** | Configure school details, sessions, and basic settings through a guided setup process. | `auto_fix_high` | `#E11D48` | `InstitutionalSetupWizardService`| **Keep (Core)**: 6-step guided onboarding under 15 minutes. |

---

### Domain 09: Facilities & Operations
*Spec Reference: [`references/53_FACILITIES_AND_OPERATIONS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/53_FACILITIES_AND_OPERATIONS_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 64 | **Library Management** | Track books, issue records, and member activity efficiently. | `local_library` | `#059669` | `LibraryCirculationService`| **Keep (Core)**: Accession registry & circulation checkout. |
| 65 | **Activities Management** | Schedule and monitor extracurricular and co-curricular activities. | `celebration` | `#7C3AED` | `ExtracurricularActivityService`| **Keep (Core)**: Clubs, sports tournaments, and badge awards. |
| 66 | **Library Cards** | Create and assign library cards to students and staff. | `card_membership` | `#0891B2` | `LibraryCardIssuanceService`| **Keep (Core)**: Barcode membership cards with borrowing limits. |
| 67 | **Transport Management** | Manage routes, drivers, and vehicle assignments for student transport. | `directions_bus` | `#2563EB` | `FleetLogisticsService` | **Keep (Core)**: Fleet vehicles, driver credentials, and GPS route stops. |
| 68 | **Tickets Management** | Create and resolve internal support or maintenance tickets. | `confirmation_number` | `#D97706` | `MaintenanceTicketingService`| **Keep (Core)**: Helpdesk ticketing (IT, electrical, plumbing) with SLAs. |
| 69 | **Staff Hostel Management** | Handle staff housing, allocations, and related services. | `apartment` | `#4338CA` | `StaffHousingService` | **Keep (Discussion)**: Faculty quarters allocation & utility billing. |
| 70 | **Hostel Management** | Handle hostel rooms, allocations, and occupancy details. | `hotel` | `#E11D48` | `StudentBoardingService` | **Keep (Core)**: Student dormitories, bed allocation, curfew tracking. |
| 71 | **Rooms** | Organize rooms, track availability, and monitor occupancy levels. | `door_front` | `#475569` | `CampusRoomRegistryService`| **Keep (Core)**: Unified space registry & conflict-free timetables. |

---

### Domain 10: System Utilities & Student Transport Operations
*Spec Reference: [`references/54_SYSTEM_UTILITIES_AND_TRANSPORT_OPERATIONS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/54_SYSTEM_UTILITIES_AND_TRANSPORT_OPERATIONS_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 72 | **Inquiry Form** | Capture admission or general inquiries from the website or admin panel. | `contact_support` | `#4338CA` | `AdmissionInquiryService` | **Keep (Core)**: Web & front-desk admission lead capture. |
| 73 | **Student Details** | Track student name, enrollment number, and class/section for transport. | `person_pin` | `#0891B2` | `StudentTransitRosterService`| **Keep (Core)**: Transit student directory & parent emergency card. |
| 74 | **Route / Vehicle Assignment**| Assign and manage routes and vehicles for each student efficiently. | `directions_bus` | `#2563EB` | `StudentRouteAllocationService`| **Keep (Core)**: Bus seat assignment with vehicle capacity guards. |
| 75 | **Fare Management** | Keep track of monthly fares, payments made, unpaid amounts, and pending invoices. | `payments` | `#059669` | `TransitFareAccountingService`| **Keep (Core)**: Distance-based monthly fare schedules and ledgers. |
| 76 | **Operational Actions** | Perform actions like generating invoices, marking payments, or editing transport info. | `pending_actions` | `#D97706` | `TransitActionDispatchService`| **Keep (Core)**: 1-click route billing, POS cash collection, route change. |
| 77 | **Logs Management** | Maintain detailed activity logs for system events and user actions. | `list_alt` | `#475569` | `AuditLogEngineService` | **Keep (Core)**: Immutable audit trails of mutations & exports. |
| 78 | **Data Reset** | Wipe all operational data safely to start fresh when needed. | `delete_forever` | `#E11D48` | `DisasterDataResetService` | **Keep (Core)**: 2-person authorization root reset with pre-backup. |
| 79 | **One-Click Demo Data** | Instantly populate the system with sample demo data for testing. | `science` | `#A21CAF` | `DemoDataSeederService` | **Keep (Core)**: Instant sandbox generation (50+ students, staff, ledgers). |

---

### Domain 11: Visitor Management & Student Gate Passes
*Spec Reference: [`references/55_VISITOR_MANAGEMENT_AND_GATE_PASSES_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/55_VISITOR_MANAGEMENT_AND_GATE_PASSES_SPEC.md)*

| # | Feature Name | Canonical User Text | Material Symbol | Accent Color | Microservice | Implementation Recommendation |
|---|:---|:---|:---|:---|:---|:---|
| 80 | **Visitor Management** | Track visitor name, mobile, and relation to students efficiently. | `badge` | `#4338CA` | `VisitorManagementService` | **Keep (Core)**: Visitor book intake, photo capture, thermal badge pass. |
| 81 | **Student Details** | Associate gate passes with student, class, and section information. | `school` | `#0891B2` | `StudentGatePassService` | **Keep (Core)**: Binds gate exit pass to student profile & guardian phone. |
| 82 | **Timing Records** | Log in-time, out-time, and date for each gate pass entry. | `schedule` | `#2563EB` | `GatePassTelemetryService` | **Keep (Core)**: Security turnstile timestamping & overstay alerts. |
| 83 | **Authorized By** | Record the staff member responsible for authorizing each gate pass. | `verified_user` | `#059669` | `GatePassAuthorizationService`| **Keep (Core)**: Cryptographic staff signature & exit reason code. |

---

## Discussion Framework: What to Keep, Cut, Add, or Implement

To guide our architectural discussion on what to implement first, what to keep, what could be optional, and what additions can elevate the system, the 87 features are categorized below:

### Category A: Core Mandatory Baseline (Must Implement First)
*These represent the non-negotiable operational spine of the Smart School Enterprise Platform:*
1. **Multi-Role RBAC & Multi-School Federation**: 8-role security matrix, Neon PostgreSQL RLS, and Branch Switcher.
2. **Student & Faculty Lifecycle**: Student management, documents upload, promotions, teacher classroom register, staff payroll, biometric attendance.
3. **Billing, Invoicing & Gateway Collections**: Auto-invoicing, concessions, Stripe/PayPal/Razorpay integration, POS cashier receipts.
4. **Examination Engine**: 5 grading systems, exam timetables, bulk marksheet printing, admit cards.
5. **Presence & Omnichannel Notifications**: Daily attendance register, DLT-compliant SMS alerts, asynchronous transactional email.

### Category B: High-Value Operational Suites (Keep & Implement)
*These differentiate the system and deliver complete operational autonomy:*
1. **Student Transit & Fleet Logistics (`SM Transport`)**: Route/vehicle assignments, bus seat capacity guards, distance monthly fare billing.
2. **Campus Perimeter Security (`SM Gate Passes` & Visitors)**: Visitor badge passes with student relation tracking, staff-authorized gate passes with parent exit SMS alerts.
3. **Facility & Resource Management**: Library media circulation desk, hostel boarding allocations, campus room registry, maintenance ticketing.
4. **Platform Utilities**: Immutable security audit logs, 1-click demo data seeding for sales demonstrations, guided setup onboarding wizard.

### Category C: Potential Candidates for Review / Phased Rollout (To Discuss)
*These features can be examined to decide if they should be in Phase 1 or deferred to Phase 2:*
1. **Donations Management (#47)**: Voluntary endowments and 80G tax receipts are vital for trust/private institutions, but optional for standard commercial schools.
2. **Staff Hostel Management (#69)**: Only needed for residential boarding schools offering faculty housing on campus; can be merged with general Room Inventory.
3. **Birthday Tracker (#19)**: A lightweight community delight feature; could be an automated cron card rather than a full dedicated admin module.
4. **Data Reset Engine (#78)**: High-risk administrative capability; strictly restricted to Super Admin root credentials with pre-reset cryptographic snapshot protection.

### Category D: Strategic Value-Add Capabilities (Suggested Additions)
*Recommended enhancements to discuss implementing alongside the catalog:*
1. **Offline Mode & Progressive Web App (PWA) Sync**: Cache daily attendance and cafeteria/POS fee collection when campus internet is intermittent.
2. **WhatsApp Business Cloud API**: Automated broadcast of fee receipts, student absence alerts, and exam marks directly to parents' WhatsApp.
3. **Dynamic QR Code Turnstile Scanner Mobile App**: Dedicated low-cost Android app for campus security guards to scan gate pass and visitor pass QR codes.

---

## 12. Design System Foundations & 26 Master UI Components

*Authoritative Reference: [`references/62_LIQUID_GLASS_DESIGN_SYSTEM_AND_COMPONENT_INVENTORY_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/62_LIQUID_GLASS_DESIGN_SYSTEM_AND_COMPONENT_INVENTORY_SPEC.md)*

| # | Component Name | Functional Role & Architecture | Material Symbol | Accent Token | Primitive Engine |
|---|:---|:---|:---|:---|:---|
| 88 | **Drawer** | Right-sliding Liquid Glass sheet for checkout and details peek. | `side_navigation` | `#8E24AA` | `@radix-ui/react-dialog` |
| 89 | **Accordion** | Collapsible section container for settings and FAQs. | `expand_more` | `#0288D1` | `@radix-ui/react-accordion` |
| 90 | **Breadcrumb** | Hierarchical route navigation path trail. | `chevron_right` | `#64748B` | Headless Navigation |
| 91 | **Tabs** | Segmented glass pill and underline category selector. | `tab` | `#2563EB` | `@radix-ui/react-tabs` |
| 92 | **Stepper** | Multi-stage workflow and admissions wizard indicator. | `linear_scale` | `#8E24AA` | Headless Progress |
| 93 | **Table** | High-throughput virtualized data grid for rosters & ledgers. | `table_chart` | `#0288D1` | `@tanstack/react-table` |
| 94 | **Card** | Primary Liquid Glass container with 360-degree specular rim. | `dashboard` | `#FFFFFF` | Liquid Glass CSS |
| 95 | **Badge** | Rounded pill status indicator for presence and finance. | `label` | Multi-Color | Headless Pill |
| 96 | **Avatar** | Squircle user profile element with active presence dot. | `account_circle` | `#8E24AA` | Squircle Geometry |
| 97 | **Skeleton** | Shimmering pulse placeholder during asynchronous fetch. | `hourglass_empty` | `#CBD5E1` | CSS Shimmer |
| 98 | **Carousel** | Responsive touch-enabled slide viewer for events and media. | `view_carousel` | `#0288D1` | Touch Slider |
| 99 | **Tooltip** | Accessible hover micro-copy popover. | `tooltip` | `#0F172A` | `@radix-ui/react-tooltip` |
| 100| **Button** | Tactile sticker button with zero-blur offset shadow physics. | `smart_button` | Multi-Role | Tactile Button Physics |
| 101| **Input Field** | Frosted glass input with leading icon slot and validation text. | `edit` | `#0288D1` | React Hook Form + Zod |
| 102| **Searchbar** | Debounced search input with clear trigger and shortcut badge. | `search` | `#2563EB` | Debounced Input |
| 103| **Checkbox** | Tactile rounded-md box with solid role fill and checkmark. | `check_box` | `#8E24AA` | `@radix-ui/react-checkbox` |
| 104| **Radio** | Accessible circular radio ring for mutually exclusive options. | `radio_button_checked` | `#8E24AA` | `@radix-ui/react-radio-group` |
| 105| **Toggle** | Smooth sliding glass thumb switch for real-time toggles. | `toggle_on` | `#10B981` | `@radix-ui/react-switch` |
| 106| **Slider** | Horizontal range track for thresholds and concessions. | `tune` | `#2563EB` | `@radix-ui/react-slider` |
| 107| **Date Picker** | Glass popover calendar with presets and academic range pick. | `calendar_today` | `#0288D1` | Headless Calendar |
| 108| **Modal** | Centered frosted glass dialog with keyboard trap and focus lock. | `web_asset` | `#8E24AA` | `@radix-ui/react-dialog` |
| 109| **Dropdown Menu** | Floating action menu popover with keyboard arrow support. | `more_vert` | `#64748B` | `@radix-ui/react-dropdown-menu` |
| 110| **Toast** | Floating notification toast with role/status colored edge. | `notifications` | Multi-Color | Toast Viewport |
| 111| **Alert** | Contextual static callout box with solid Material Symbol. | `info` | Multi-Status | Alert Callout |
| 112| **Banner** | Full-width top viewport announcement ribbon. | `campaign` | `#EF4444` | Full-Width Ribbon |
| 113| **Loading** | Indeterminate circular spinner and progress bar. | `progress_activity`| `#8E24AA` | SVG CSS Spinner |

---

## 13. 14 Mission-Critical UX Interaction Flow Checklists

*Authoritative Reference: [`references/63_UX_FLOWS_AND_INTERACTION_DESIGN_CHECKLIST_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/63_UX_FLOWS_AND_INTERACTION_DESIGN_CHECKLIST_SPEC.md)*

| # | Flow Name | Primary Action & Visual Physics | Material Symbol | Security & Backend Guard |
|---|:---|:---|:---|:---|
| 114| **Adding to cart** | Flying badge micro-animation to header cart; quantity increment. | `shopping_cart` | Stock quota validation; local storage sync. |
| 115| **Canceling subscription**| 2-Step confirmation modal; reason selector; retention alternative. | `cancel` | Soft cancel; audit receipt dispatch. |
| 116| **Entering promo code** | Uppercase mono input; live discount breakdown; error handling. | `local_offer` | Server voucher validation; concession ledger link. |
| 117| **Deleting account** | Explicit typing guard (`DELETE`); admin password prompt. | `delete_forever`| Cascading soft purge; isolated RLS transaction. |
| 118| **Submitting a form** | Zod schema validation; scroll to first error; loading button. | `send` | Idempotent `X-Request-ID` header check. |
| 119| **Uploading media** | Drag & drop dashed zone; progress bar; squircle cropper. | `cloud_upload` | Client mime-type/size check; S3 presigned upload. |
| 120| **Filtering items** | Faceted dropdowns; removable filter chips; 300ms debounce. | `filter_list` | URL query parameter synchronization. |
| 121| **Showing input error** | Red ring; right warning symbol; error caption; ARIA link. | `error_outline` | RFC 7807 problem details field mapping. |
| 122| **Contacting support** | Multi-channel contact card; category routing; auto-ticket SLA. | `support_agent`| Helpdesk ticket ingest; email webhook dispatch. |
| 123| **Search checklists...**| Spotlight command palette (`Cmd+K`); categorized result tree. | `search` | Debounced fuzzy index query; keyboard traversal. |
| 124| **Verifying account** | 6-Segment PIN box; paste distribution; 60s resend timer. | `verified` | Rate-limited Redis sliding window; OTP verification. |
| 125| **Saving changes** | Deep equality dirty state; floating bottom sticky action bar. | `save` | Atomic PUT/PATCH mutation; cache invalidation. |
| 126| **Resetting password** | Enumeration-safe dispatch; live 4-criterion entropy meter. | `lock_reset` | One-time token hash; remote session revocation. |
| 127| **Making a card payment**| PCI-DSS iframe embedding; 3D Secure modal; thermal receipt. | `credit_card` | Stripe/Razorpay webhook; idempotent receipt generation. |

---

## 14. 32 Core Web Application Screen Patterns & Checklist Standard

*Authoritative Reference: [`references/64_WEB_APPLICATION_SCREEN_PATTERNS_AND_CHECKLIST_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/64_WEB_APPLICATION_SCREEN_PATTERNS_AND_CHECKLIST_SPEC.md)*

| # | Screen Pattern Name | Screen Category | Primary Scope & Architectural Checklist | Material Symbol |
|---|:---|:---|:---|:---|
| 128| **Login** | Identity & Access | Multi-branch picker, username/password, remember me, SSO trigger. | `login` |
| 129| **2FA** | Identity & Access | 6-digit TOTP array, SMS OTP fallback, emergency recovery key. | `security` |
| 130| **Account** | Identity & Access | Profile demographics, squircle avatar, active browser sessions. | `account_circle` |
| 131| **Onboarding** | Identity & Access | 4-Stage setup wizard, 1-click demo seeder, video walkthrough. | `rocket_launch` |
| 132| **Dashboard** | Identity & Access | 12-Column KPI grid, Recharts trends, quick action bar, live feed. | `dashboard` |
| 133| **Command Palette Search**| Identity & Access | Global `Cmd+K` spotlight search, grouped navigation, shortcuts. | `search` |
| 134| **Admin Panel** | Administration | Campus federation switcher, RLS bypass switch, session rollover. | `admin_panel_settings` |
| 135| **User Management** | Administration | 8-Role directory, permission editor modal, user impersonation. | `manage_accounts` |
| 136| **API Keys** | Administration | Token generation, permission scopes, Kafka webhook subscriptions. | `key` |
| 137| **Audit Log** | Administration | Tamper-evident admin ledger, actor metadata, JSON before/after diff. | `history` |
| 138| **Version History** | Administration | Revision tree, squircle author avatar, 1-click rollback trigger. | `update` |
| 139| **Maintenance** | Administration | Full-canvas downtime screen, countdown timer, emergency admin key. | `construction` |
| 140| **Data Table** | Data Operations | Headless TanStack Table, column pinning, bulk actions, CSV export. | `table_view` |
| 141| **Single Item Detail** | Data Operations | 360-Degree student/staff dossier, academic, fees, and docs tabs. | `assignment_ind` |
| 142| **Search Results** | Data Operations | Left facet filter sidebar, right result items, keyword highlights. | `travel_explore` |
| 143| **Empty State** | Data Operations | Frosted glass card, clean vector glyph, clear guidance copy, CTA. | `inbox` |
| 144| **Timeline / Gantt View** | Data Operations | Horizontal term schedule, exam timetables, collision detection. | `view_timeline` |
| 145| **Kanban Board** | Data Operations | Incident tracking and maintenance tickets with draggable cards. | `view_kanban` |
| 146| **Multi-Step Form** | Data Operations | Complex student admission wizard with top visual stepper & drafts. | `dynamic_form` |
| 147| **Pricing** | Commerce & Billing | Tuition package tiers, annual/termly toggle, line-item fee grid. | `payments` |
| 148| **Checkout** | Commerce & Billing | POS cashier, online gateway iframe, promo code injector, receipt. | `shopping_bag` |
| 149| **Billing** | Commerce & Billing | Student fee statement, overdue balance, receipt download ledger. | `receipt_long` |
| 150| **Report View** | Commerce & Billing | High-throughput BI report generator with multi-parameter exports. | `summarize` |
| 151| **Analytics** | Commerce & Billing | Student retention curves, fee collection velocity, attendance heatmap. | `insights` |
| 152| **Settings** | Collaboration | School profile, brand config (`brand.ts`), gateways, sticky save bar. | `settings` |
| 153| **Notification Settings**| Collaboration | Event-channel toggle matrix (Push, SMS, Email, WhatsApp), quiet hours. | `tune` |
| 154| **Notifications Feed** | Collaboration | Header drawer with unread counter pill, categorized alert stream. | `notifications` |
| 155| **Chat** | Collaboration | 3-Pane real-time messaging hub, class channels, file attachments. | `forum` |
| 156| **Comments** | Collaboration | Nested discussion stream on homework submissions and staff notes. | `comment` |
| 157| **Public Profile** | Collaboration | Verified student graduation badge and teacher public credentials. | `badge` |
| 158| **Integrations** | Collaboration | Connectors for Google Meet, Zoom, Stripe, DLT SMS, Biometric relays. | `integration_instructions` |
| 159| **Help Center** | Collaboration | Searchable knowledgebase, categorized FAQ accordions, ticket CTA. | `help_center` |

---

## 15. 20-Point Product Launch & Web Readiness Quality Gate Suite

*Authoritative Reference: [`references/65_PRODUCT_LAUNCH_AND_WEB_READINESS_CHECKLIST_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/65_PRODUCT_LAUNCH_AND_WEB_READINESS_CHECKLIST_SPEC.md)*

| # | Quality Gate Name | Gate Category | Technical Mandate & Architecture | Material Symbol |
|---|:---|:---|:---|:---|
| 160| **Privacy policy page** | Legal & Privacy | FERPA/GDPR compliance, data retention, third-party disclosures. | `policy` |
| 161| **Terms & conditions page**| Legal & Privacy | Platform rules, student honor code, tuition refund policies. | `gavel` |
| 162| **Secrets off frontend** | Security | Zero private API/JWT secrets in client bundles; build audit. | `lock` |
| 163| **Force HTTPS** | Security | Modern TLS 1.3, Strict-Transport-Security (HSTS), security headers. | `https` |
| 164| **Cookie consent banner** | Legal & Privacy | Liquid Glass floating consent card, granular cookie categories. | `cookie` |
| 165| **Meta titles + descriptions**| SEO & Sharing | Next.js 15 dynamic metadata API for all public views. | `title` |
| 166| **Social preview image** | SEO & Sharing | 1200x630px branded OpenGraph social share card with crest. | `image` |
| 167| **Add a favicon** | Branding & UI | Multi-resolution favicon set (16x16, 32x32, 180x180 squircle). | `favorite_border`|
| 168| **Sitemap + robots. txt** | SEO & Crawling | Dynamic XML sitemap, crawl disallow on `/admin/*` portals. | `account_tree` |
| 169| **Alt text on images** | Accessibility | Descriptive `alt` copy on all student photos and media assets. | `description` |
| 170| **Compress your images** | Performance | Modern AVIF/WebP image compression, responsive `next/image`. | `compress` |
| 171| **Check page load speed** | Performance | Core Web Vitals targets: LCP < 2.0s, INP < 150ms, Lighthouse >= 95. | `speed` |
| 172| **Fix color contrast** | Accessibility | WCAG 2.2 AA compliance: >= 4.5:1 text contrast on glass canvas. | `contrast` |
| 173| **Make it mobile friendly**| Mobile & UX | 44x44px touch targets, mobile drawers, zero horizontal scroll. | `smartphone` |
| 174| **Custom 404 page** | Resilience | Polished Liquid Glass error canvas with dashboard recovery links. | `error` |
| 175| **Fix broken links** | Resilience | Automated crawler link audit; zero dead `href="#"` anchors. | `link_off` |
| 176| **Form validation** | Data Quality | Dual-layer Zod client schema and Jakarta Spring Boot validation. | `check_circle` |
| 177| **Spam protection** | Security | Cloudflare Turnstile invisible bot challenge, Redis rate limit. | `shield` |
| 178| **Set upanalytics** | Governance | Privacy-preserving self-hosted analytics (Plausible / PostHog). | `analytics` |
| 179| **One clear call to action**| UX Conversion | High-contrast tactile primary CTA button on every landing view. | `ads_click` |

---

## 16. Enterprise API Security & Microservices Hardening Suite

*Authoritative Reference: [`references/66_API_SECURITY_AND_MICROSERVICES_HARDENING_CHECKLIST_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/66_API_SECURITY_AND_MICROSERVICES_HARDENING_CHECKLIST_SPEC.md)*

| # | Security Defense Name | Domain Category | Technical Mandate & Architecture | Material Symbol |
|---|:---|:---|:---|:---|
| 180| **RS256 JWT Authentication**| Authentication | Disallow Basic Auth; Asymmetric Nimbus RS256 JWT bearer tokens. | `verified_user` |
| 181| **Argon2id Password Storage**| Authentication | Argon2id / BCrypt cost 12; zero plain-text passwords or weak hashes. | `password` |
| 182| **Login Jail & Lockout** | Authentication | Redis sliding-window account jail (5 failures = 15 min lock). | `lock_clock` |
| 183| **Data-at-Rest Encryption** | Security | AES-256 GCM encryption on all student PII, salaries, and bank info. | `enhanced_encryption`|
| 184| **Sliding Window Rate Limit** | Access Control | Redis-backed 60 req/min public, 300 req/min authenticated endpoints. | `speed` |
| 185| **TLS 1.3 & HSTS Preload** | Network Security | Strict-Transport-Security preload, modern TLS 1.3 ciphers, SNI. | `https` |
| 186| **Private VPC Safelisting** | Network Security | Internal microservice APIs restricted to private subnets & mTLS. | `lan` |
| 187| **OAuth2 PKCE & Redirect Lock**| Authorization | Authorization Code with PKCE, exact redirect_uri whitelist, state hash. | `key` |
| 188| **HTTP Method Strictness** | Input Handling | Strict method binding; 405 Method Not Allowed on illegal verb. | `http` |
| 189| **Content Negotiation** | Input Handling | Enforces Accept and Content-Type: application/json; 406/415 errors. | `rule` |
| 190| **Zero Credentials in URLs** | Input Handling | Secrets in Authorization header only; zero tokens in query params. | `link_off` |
| 191| **Indirect Object References**| Processing | Indirect /me routes; BOLA verification of resource ownership. | `account_circle` |
| 192| **UUID v4/v7 Primary Keys** | Processing | Zero auto-increment IDs to prevent student cohort enumeration. | `fingerprint` |
| 193| **XXE & Bomb Defense** | Processing | Disallow external DTDs and recursive YAML/XML entity expansions. | `security` |
| 194| **Directive 02 Async Queues** | Processing | Asynchronous Kafka workers for heavy batch tasks (202 Accepted). | `queue` |
| 195| **Production Debug Off** | Processing | Disables Spring DevTools, root logging level set to WARN. | `visibility_off` |
| 196| **Security Response Headers** | Output Defense | X-Content-Type-Options, X-Frame-Options: DENY, Content-Security-Policy. | `shield` |
| 197| **Header Fingerprint Stripping**| Output Defense | Remove Server, X-Powered-By, and framework version disclosure headers. | `hide_source` |
| 198| **RFC 7807 Error Sanitization**| Output Defense | Client-safe problem details with zero stack traces or internal leaks. | `error_outline` |
| 199| **CI/CD SAST & DAST Gates** | Pipeline Defense | SonarQube quality gate, Trivy CVE scanning, OWASP ZAP dynamic audit. | `policy` |
| 200| **Sensitive Log Scrubbing** | Observability | Regex masking filters stripping tokens, credit cards, and passwords. | `subtitles_off` |
| 201| **Mutual TLS (mTLS)** | Zero Trust | Encrypted and authenticated inter-service mesh communication. | `vpn_lock` |
| 202| **Secrets Rotation & Vault** | Zero Trust | HashiCorp Vault / KMS secret injection; pre-commit TruffleHog hooks. | `vpn_key` |
