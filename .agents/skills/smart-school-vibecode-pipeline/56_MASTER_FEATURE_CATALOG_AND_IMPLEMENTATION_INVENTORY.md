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

---

## 17. Microservices Operational Excellence & Well-Architected Suite

*Authoritative Reference: [`references/67_MICROSERVICES_OPERATIONAL_EXCELLENCE_AND_WELL_ARCHITECTED_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/67_MICROSERVICES_OPERATIONAL_EXCELLENCE_AND_WELL_ARCHITECTED_SPEC.md)*

| # | Operational Standard Name | Pillar Category | Technical Mandate & Architecture | Material Symbol |
|---|:---|:---|:---|:---|
| 203| **Service Ownership Tagging**| Ops Excellence | Owner, Team, ServiceCode tags on all K8s & cloud resources. | `badge` |
| 204| **On-Call Escalation Matrix**| Ops Excellence | 3-Tier escalation ladder (SRE -> Lead -> VP) via PagerDuty. | `support_agent` |
| 205| **Git-Managed Runbooks** | Ops Excellence | Machine-readable mitigation playbooks in `docs/runbooks/`. | `menu_book` |
| 206| **Canary Deployments** | Ops Excellence | ArgoCD progressive traffic shift (10% -> 100%) with auto-rollback. | `rocket_launch` |
| 207| **Golden Signals Telemetry** | Ops Excellence | Latency (p99), Traffic (RPS), Errors (5xx), Saturation dashboards. | `speed` |
| 208| **Kubernetes mTLS Mesh** | Security | Istio Service Mesh with STRICT mutual TLS between pods. | `vpn_lock` |
| 209| **NetworkPolicy Isolation** | Security | Default-deny ingress/egress rules per Kubernetes namespace. | `security` |
| 210| **Multi-AZ Node Anti-Affinity**| Reliability | Pods spread across >= 3 Availability Zones (`topologySpread`). | `hub` |
| 211| **Jittered Backoff Retries**| Reliability | Full jitter exponential backoff on all inter-service REST clients. | `sync` |
| 212| **Resilience4j Circuit Break**| Reliability | Automated circuit breaking on external payment & SMS gateways. | `power_settings_new`|
| 213| **RTO < 15m / RPO < 1m** | Reliability | Point-in-time recovery WAL archiving and weekly restore drills. | `restore` |
| 214| **Virtual Threads Engine** | Performance | Java 21 Project Loom non-blocking concurrency (10,000+ RPS/pod).| `bolt` |
| 215| **P99 Latency SLO Bounds** | Performance | p95 < 150ms / p99 < 300ms read queries; alerts on breach. | `timer` |
| 216| **FinOps Resource Tagging** | Cost Optimization | Cost allocation tags and chargeback showback dashboards. | `payments` |
| 217| **Serverless Auto-Scaling** | Cost Optimization | Neon compute auto-pause during non-school night hours. | `tune` |
| 218| **Cold Glacier Lifecycle** | Sustainability | Automated S3 lifecycle transition to Glacier after 180 days. | `archive` |
| 219| **Distroless Minimal Images**| Sustainability | Google Distroless container images reducing footprint to < 180MB. | `inventory_2` |
| 220| **Shared Multi-Tenant RLS** | Sustainability | Shared Postgres engine serving 500+ branches via RLS isolation. | `lan` |

---

## 18. Mobile Applications Ecosystem (24 Core Features)

*Authoritative Reference: [`references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md)*

| # | Feature Name | Target Mobile Persona | Description & Architecture | Material Symbol |
|---|:---|:---|:---|:---|
| 221| **Classwork & Homework** | Student / Parent | Daily classroom feed, homework due dates, camera sheet scanner. | `assignment` |
| 222| **Online Exam & CBT Practice** | Student / Parent | Timed CBT assessment, autosave to SQLite, instant answer feedback. | `quiz` |
| 223| **Assignment & Study Material** | Student / Parent | Offline-cached curriculum notes, audio clips, and worksheets. | `menu_book` |
| 224| **Scholarship & Fees Portal** | Student / Parent | Balance breakdown, e-challan generation, multi-gateway checkout. | `payments` |
| 225| **Student & Vehicle Tracking** | Student / Parent | Live GPS bus telemetry, ETA geofencing alerts, turnstile gate logs. | `directions_bus` |
| 226| **Syllabus & Achievements** | Student / Parent | Topic progress meters, digital medal showcase, event calendar. | `emoji_events` |
| 227| **Attendance & Messaging** | Student / Parent | Color-coded presence calendar, 08:30 absence alert, educator chat. | `fact_check` |
| 228| **Timetable, Library & Results** | Student / Parent | Daily period tracker, active book loans & fines, terminal marksheets. | `event_seat` |
| 229| **Hostel & Food Menu** | Student / Parent | Weekly rotational dietary menu, allergen tags, warden leave outpass. | `hotel` |
| 230| **Class Attendance & Messaging** | Teacher | 1-Tap roll-call, offline sync, section broadcast push notices. | `checklist` |
| 231| **Online Exam & Results Desk** | Teacher | Subjective marking rubric, batch score approval, result publish. | `rate_review` |
| 232| **Task & Event Management** | Teacher | Personal duty checklist, exam invigilation, committee reminders. | `task_alt` |
| 233| **Homework Uploading Desk** | Teacher | Whiteboard camera capture, scheduled publishing across sections. | `upload_file` |
| 234| **Question Paper Generator** | Teacher | Algorithmic paper compilation from question banks with keys. | `post_add` |
| 235| **Timetable & Campus Gallery** | Teacher | Personal schedule, free period alerts, direct photo activity uploader. | `collections` |
| 236| **Assign Syllabus & Notes** | Teacher | Milestone completion toggles, PDF document & video lecture distribution. | `library_books` |
| 237| **Lesson Plans & Circulars** | Teacher | Structured lesson templates, administrative circular acknowledgments. | `assignment_turned_in` |
| 238| **Location & Social Feeds** | Teacher | Geofenced campus clock-in verification, approved social post queue. | `share_location` |
| 239| **Stream-Wise Fee Telemetry** | Trustee / Principal | Real-time fee recovery, stream breakdown (Science/Arts), overdue aging. | `query_stats` |
| 240| **Faculty & Student Attendance** | Trustee / Principal | Campus presence gauges, 60-second telemetry updates, gender curves. | `donut_large` |
| 241| **Day-to-Day Staff Monitoring**| Trustee / Principal | Lecture delivery pacing, syllabus adherence index, grading turnaround.| `speed` |
| 242| **Task Allocation Telemetry** | Trustee / Principal | High-level delegation to Deans/HODs with overdue escalation flags. | `account_tree` |
| 243| **Executive Broadcast Desk** | Trustee / Principal | 1-Click emergency campus broadcast (Push + SMS + Email). | `campaign` |
| 244| **Sovereign Executive Chat** | Trustee / Principal | Direct priority message dispatch to any staff, parent, or student. | `forum` |

---

## 19. Multi-Institutional Classification (6 Archetypes & 33 Subtypes)

*Authoritative Reference: [`references/70_TARGET_ORGANISATIONS_AND_MULTI_INSTITUTION_CLASSIFICATION_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/70_TARGET_ORGANISATIONS_AND_MULTI_INSTITUTION_CLASSIFICATION_SPEC.md)*

| # | Institutional Category | Subtype Count | Target Subtypes & Specializations | Material Symbol |
|---|:---|:---:|:---|:---|
| 245| **Schools (K-12 & Specialized)**| 6 | Special Ed, Virtual/Online, Boarding, Montessori, Traditional Private, Professional. | `school` |
| 246| **Colleges (Undergraduate/Tech)**| 6 | Public/Private, Community, Vocational, Technical, Women's, Tribal Colleges. | `domain` |
| 247| **Government Educational Bodies**| 5 | Dept Higher Ed, Dept Primary Ed, Social Welfare, Technical Ed, Medical Ed. | `account_balance` |
| 248| **Universities (Higher Systems)** | 8 | Central, State, Deemed, Private, Medical, Law, Agricultural, Research Universities.| `psychology` |
| 249| **Specialized Training Institutes**| 5 | Specialized Institutes, Private Tech, Technical Schools, Coaching Classes, Tuition. | `science` |
| 250| **Distance Education Directorates**| 3 | Central Distance Universities, State Distance Directorates, Open Learning Deemed. | `distance` |

---

## 20. Real-Time Financial Telemetry & Campus Logistics Suite

*Authoritative Reference: [`references/71_FINANCIAL_ACCOUNTING_ANALYTICS_AND_ADVANCED_REPORTING_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/71_FINANCIAL_ACCOUNTING_ANALYTICS_AND_ADVANCED_REPORTING_SPEC.md)*

| # | Telemetry / Module Name | Domain | Architectural Purpose & Deliverable | Material Symbol |
|---|:---|:---|:---|:---|
| 251| **Fees Head-Wise Collection Bar**| Revenue BI | Stacked bar chart disaggregating Term, Activity, Exam, & Transit fees. | `bar_chart` |
| 252| **Fees Collection Timeline Bar** | Revenue BI | Historical collections timeline against calendar due-date milestones. | `timeline` |
| 253| **Subject-Wise Performance Bar** | Academic BI | Cross-subject marks comparison with class average reference lines. | `analytics` |
| 254| **Exam-Wise Performance Bar** | Academic BI | Longitudinal progress bars tracking trajectory across term examinations. | `leaderboard` |
| 255| **Fee Details Status Gauge** | Revenue BI | Donut gauge displaying collected percentage vs delinquent aging balance. | `pie_chart` |
| 256| **Presence / Leave Daily Pie** | Attendance BI | Campus-wide headcount split: Present, Approved Leave, Unexcused Absent. | `pie_chart_outline` |
| 257| **Gender Attendance Gauges** | Demographic BI | Dual gauges comparing Male vs Female daily presence parity. | `wc` |
| 258| **Triplicate E-Challan Engine** | Parent POS | Machine-readable barcode challans for commercial bank counter deposits. | `receipt_long` |
| 259| **Bank Wire Remittance Desk** | Cashier Desk | Parent slip upload desk with side-by-side zoom & 1-click verification. | `file_present` |
| 260| **Parent-Teacher Meeting (PTM)**| Operations | 10-minute conflict-free slot booking engine with virtual video links. | `handshake` |
| 261| **Authorized Student Pickup** | Campus Safety | Dynamic 15-minute OTP / QR pickup pass for authorized guardian release. | `badge` |
| 262| **Security RFID Turnstiles** | IoT Gateways | Anti-passback turnstile passes, UHF bus antennas, biometric logs. | `sensor_door` |
| 263| **Institutional Canteen RFID** | Auxiliary POS| Cashless student wallet with daily allowance caps & allergen warnings. | `restaurant` |

---

## 21. Enterprise 24 Stakeholder Benefit Metrics

*Authoritative Reference: [`references/72_ENTERPRISE_BENEFITS_STAKEHOLDER_MATRIX_AND_HRM_EXAM_BLUEPRINT.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/72_ENTERPRISE_BENEFITS_STAKEHOLDER_MATRIX_AND_HRM_EXAM_BLUEPRINT.md)*

| Stakeholder Pillar | 8 Codified Benefit Metrics | Quantifiable Target ROI |
|:---|:---|:---|
| **Management** | 1. Class/Stream Fees Status<br>2. 50% Admin & 70% Paper Reduction<br>3. Performance Analysis MIS<br>4. Multi-Language/Institute/Currency<br>5. Instant Daily Operations Updates<br>6. Unified Attendance Governance<br>7. Online Staff & Student Intake<br>8. Omnichannel SMS/Notice Broadcast | 50% lower administrative overhead; 70% reduction in paper; instant multi-campus governance. |
| **Teaching Faculty**| 1. Centralized Class Information<br>2. Automated Exam & Paper Generator<br>3. Computerized Marksheets/Grades<br>4. Structured Parent Dialogue<br>5. Dynamic Timetable & Free Periods<br>6. Pedagogical Student Analytics<br>7. Seamless Asset Distribution<br>8. Sub-45s Mobile/Web Attendance | 75% faster test compilation; zero report card calculation errors; under 45s roll-calls. |
| **Students & Parents**| 1. Transparent Classwork Feeds<br>2. Real-Time Computerized Marks<br>3. Attendance & Progress Curves<br>4. Direct Encrypted Teacher Chat<br>5. E-Challans & Online Fee Payment<br>6. Native Language Support (Khmer/EN)<br>7. Immediate Circular Notifications<br>8. Live GPS Bus & Turnstile Telemetry | Zero missed school bulletins; eliminate bank queue delays via e-challans; full transit safety. |

---

## 22. Integrated Academic Operations & Campus Lifecycle Suite

*Authoritative Reference: [`references/73_INTEGRATED_ACADEMIC_OPERATIONS_AND_CAMPUS_LIFECYCLE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/73_INTEGRATED_ACADEMIC_OPERATIONS_AND_CAMPUS_LIFECYCLE_SPEC.md)*
*Dedicated Skill: `smart-school-academic-operations-hub` [P-14]*

| # | Feature Name | Domain Group | Architectural Function & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 264| **Online Enrollment & Fee Payment**| Admissions POS | Multi-step applicant intake, dynamic fee breakdown, e-challans & wire verification. | `app_registration` |
| 265| **Course, Class & Section Partition**| Academics SIS | Course catalogs, grade levels, sections, cohort rosters, stream assignments. | `class` |
| 266| **Lesson Planning & Syllabus Progress**| Instruction | Pacing meters, multi-tier curriculum trees, learning objectives, board notes. | `auto_stories` |
| 267| **Timetable Planning & Collision Audit**| Scheduling | Automated zero-collision period scheduler, room allocations, substitute assignments.| `calendar_month` |
| 268| **Attendance & Student GPS Tracking**| Operations | Sub-45s classroom roll-call, RFID turnstiles, live GPS bus stream, 1km geofence. | `location_on` |
| 269| **Daily Homework & Classwork Desk** | Instruction | Whiteboard camera capture, multi-section broadcast, rubric grading desk. | `edit_note` |
| 270| **Assignments & Notes Study Vault** | Download Hub | Categorized lecture notes, worksheets, offline-cached student downloads. | `folder_special` |
| 271| **Dynamic Certificates & Marksheets** | Credentials | Token interpolation (`[name]`, `[roll_no]`), statutory TC clearance, batch PDF. | `workspace_premium`|
| 272| **Circulars & Emergency Broadcasts**| Communications | Noticeboard bulletins, mandatory read receipts, 1-click Push/SMS/Email blast. | `notifications_active`|
| 273| **Online & Offline Examination Engine**| Assessments | Seating charts, CBT exams with 15s autosave, anti-cheat lock, instant results. | `history_edu` |
| 274| **Question Paper Generator** | Assessments | Master item repository, Bloom's taxonomy tags, automated test & answer key compiler.| `quiz` |
| 275| **Department & Stream Governance** | Academic Admin| Department heads (HODs), stream specialization (Science/Arts), stream fee tracking. | `hub` |
| 276| **Student, Staff & Visitor ID Cards**| Perimeter Security| Multi-persona ID badge designer, dynamic QR/barcodes, CR80 horizontal/vertical PVC. | `badge` |

---

## 23. Enterprise School Types, CIS Accreditation & Global Ecosystem Suite

*Authoritative Reference: [`references/75_ENTERPRISE_SCHOOL_TYPES_CIS_ACCREDITATION_AND_ECOSYSTEM_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/75_ENTERPRISE_SCHOOL_TYPES_CIS_ACCREDITATION_AND_ECOSYSTEM_SPEC.md)*
*Dedicated Skill: `smart-school-enterprise-ecosystem-and-accreditation` [P-15]*

| # | Feature Name | Domain Group | Architectural Function & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 277| **Groups / Enterprise Multi-Branch Federation** | Enterprise Core | Multi-campus hierarchy, `X-Branch-ID` switching, group-wide fee clearinghouse, consolidated balance sheets. | `apartment` |
| 278| **Independent & Private K-12 Custom Suite** | Private K-12 | Bespoke fee schedules, alumni foundation portal, donor endowment tracking, custom domain branding. | `school` |
| 279| **Multi-Curriculum Academic SIS Engine** | International SIS | Simultaneous IB (PYP/MYP/DP criteria), Cambridge (A*-G/9-1), American (4.0 GPA/AP), & National curricula. | `auto_stories` |
| 280| **Virtual & Online K-12 Digital Campus** | Virtual School | 100% paperless onboarding, DRM/SCORM lesson delivery, asynchronous CBT with webcam proctoring lockouts. | `laptop_chromebook` |
| 281| **Embeddable Website Enrolment Widget** | Admissions Web | Lightweight `<school-enrolment-widget>` web component for WordPress, Webflow, and custom school sites. | `widgets` |
| 282| **CIS Child Safeguarding & Privacy Vault** | Compliance | Role-isolated encrypted pastoral notes, background check audit logs, GDPR/COPPA/FERPA DSAR export tools. | `shield` |
| 283| **Student Wellbeing & Pastoral Care Desk** | Pastoral Care | Emotional check-in tracking, counselor consultation records, clinic/infirmary visits, commendation ledger. | `favorite` |
| 284| **Omnichannel Institutional Messaging Desk**| Communications | Unified dispatch console for push notifications, DLT SMS, transactional email, & emergency circulars. | `mark_email_unread` |
| 285| **Developers Hub & OpenAPI Ecosystem** | Extensibility | Interactive OpenAPI/Swagger portal, developer API key governance, webhook delivery console, SDKs. | `code` |
| 286| **Identity SSO & Access Federation Portal**| Security Core | Enterprise SAML 2.0, OIDC, and OAuth2 identity bridge with Google Workspace and Microsoft Entra ID. | `vpn_key` |
| 287| **University Guidance & College Counseling**| Career & College | High school transcript packaging, predicted grades engine, recommendation letters, Common App/UCAS tracking. | `psychology_alt` |
| 288| **Enterprise Partner & Integrator Directory**| Ecosystem | Directory of verified third-party LMS, biometric hardware vendors, payment gateway adapters, and consultants.| `handshake` |
| 289| **Interactive Customer Help Guides Hub** | Customer Success| 15+ interactive step-by-step documentation guides, searchable knowledgebase, and support ticketing. | `menu_book` |
| 290| **Continuous Professional Webinars Hub** | Staff Training | Live training webinar scheduling, onboarding tracks for faculty/admin, and video walkthrough library. | `video_library` |

---

## 24. Genius Cloud AWS Infrastructure & Enterprise ERP Suite

*Authoritative Reference: [`references/76_GENIUS_CLOUD_AWS_INFRASTRUCTURE_AND_ENTERPRISE_ERP_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/76_GENIUS_CLOUD_AWS_INFRASTRUCTURE_AND_ENTERPRISE_ERP_SPEC.md)*
*Dedicated Skill: `smart-school-cloud-infrastructure-and-enterprise-erp` [P-16]*

| # | Feature Name | Domain Group | Architectural Function & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 291| **AWS 8-Tier Centralized Cloud Architecture** | Cloud Infrastructure | Multi-AZ ECS Fargate application/API servers, RDS PostgreSQL, S3, ALB, and CloudFront. | `cloud` |
| 292| **Automated Backup & Multi-AZ Disaster Recovery** | Business Continuity | Continuous WAL archiving, daily snapshots, cross-region cold standby (RPO < 5m, RTO < 15m). | `backup` |
| 293| **CloudFront CDN & Global SSL/TLS Edge Protection** | Network Security | 450+ PoPs, TLS 1.3 encryption, ACM automated certificates, and AWS WAF Layer-7 rules. | `lock` |
| 294| **Online Admission & Merit Approval Pipeline** | Admissions SIS | Intake form, document uploads, merit calculations, approval workflows, entrance tests. | `how_to_reg` |
| 295| **Student 360 & General Register (GR) Vault** | Student Records | Longitudinal dossiers, GR numbering, batch updates, student remarks, and alumni registry. | `folder_shared` |
| 296| **Academic Programme, Semester & Credit Management** | Academic Planning | Multi-tier programmes, semester calendars, theory/practical credits, and graduation audits. | `school` |
| 297| **Examination Scheduling, Weightage & Hall Tickets** | High-Stakes Exams | Online/offline exams, Bloom's question paper generator, exam groups, and admit cards. | `assignment_turned_in` |
| 298| **Biometric, RFID & Mobile Shift Attendance** | Presence Engine | Multi-shift support, ZKTeco TCP/IP biometric push, RFID turnstiles, geofenced mobile app. | `fingerprint` |
| 299| **Multi-Dimensional Punctuality Analytics Desk** | Attendance BI | 8 punctuality metrics: Present, Absent, Late-In, Late-Out, Early-In, Early-Out, Leave, Gender. | `schedule` |
| 300| **HRM Recruitment ATS, Appraisal & Payroll Scale** | Human Resources | Faculty ATS, 360 appraisals, credential vault, automated payroll, computerized pay slips. | `badge` |
| 301| **Finance Double-Entry, Budgeting & Multi-Currency** | Finance & Ledger | Chart of accounts, multi-tender cashier desk, department budgets, multi-currency spot rates. | `account_balance_wallet` |
| 302| **Barcode & Digital Library Catalog Management** | Campus Library | MARC-21 catalog, barcode/RFID issue-return, e-book vault, automated overdue fine rules. | `local_library` |
| 303| **Hostel Room Allocation, Curfew & Visitor Passes** | Campus Residence | Blocks, floors, room types, bed allocations, night curfew roll-calls, visitor photo passes. | `hotel` |
| 304| **Fleet GPS Telemetry & Transport Bank Reconciliation** | Fleet Logistics | Vehicle fleet, route stops, sub-5s live GPS tracking, transit fee bank feed reconciliation. | `directions_bus` |
| 305| **Canteen Point-of-Sale (POS) & Weekly Meal Engine** | Auxiliary POS | Touchscreen terminal, barcode/RFID badges, weekly meal plans, cashier shift balancing. | `point_of_sale` |
| 306| **Campus Health Clinic & Doctor Consultation Desk** | Campus Health | Doctor consultation logs, student health dossiers, allergy/chronic alerts, infirmary stays. | `medical_services` |
| 307| **Dynamic Timetable & Faculty Proxy Allocation** | Instruction Ops | Clash-free timetable generator, 1-click absent teacher proxy allocation with push alerts. | `event_seat` |
| 308| **Multi-Vendor Inventory, Purchasing & Asset Tracking** | Procurement | Capital asset QR tags, consumable store, multi-tier purchase orders, reorder alerts. | `inventory_2` |
| 309| **Multi-Tier Contract Management & Document Generator** | Legal & Contracts | Vendor contracts, faculty service agreements, lease terms, digital signatures, alerts. | `description` |
| 310| **42+ Role Dynamic Federation & Multi-Campus Ingress** | Identity & RBAC | 42+ roles across 5 tiers with "LOGIN WITH GROUP ADMIN AND INSTITUTE" context switching. | `manage_accounts` |

---

## 25. Genius Cloud Granular Submodules Suite

*Authoritative Reference: [`references/77_GENIUS_CLOUD_FINANCE_EXAMS_PAYROLL_AND_CAMPUS_OPERATIONS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/77_GENIUS_CLOUD_FINANCE_EXAMS_PAYROLL_AND_CAMPUS_OPERATIONS_SPEC.md)*
*Dedicated Skill: `smart-school-advanced-finance-exams-and-operations` [P-17]*

| # | Feature Name | Domain Group | Architectural Function & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 311| **Account, Bank, Cash & Tax Master Registry** | Finance Masters | Root chart of accounts, commercial bank routing, cash vaults, and tax slabs. | `account_balance` |
| 312| **Bank, Cash Transactions & Journal Voucher Desk** | Financial Accounting | Contra entries, fund transfers, petty cash, and double-entry balanced journal vouchers. | `receipt_long` |
| 313| **Fixed Asset Master, Depreciation & Asset Ledger** | Asset Accounting | Capital asset catalog, invoice linkage, useful life parameters, and depreciation schedules. | `apartment` |
| 314| **Statutory Books: Day Book, Cash Book, Bank Book & Journal Book** | Financial Reporting | Daily chronological logs, dual-column cash books, bank ledgers, and journal records. | `menu_book` |
| 315| **Double-Entry Financial Statements: Trial Balance, P&L & Balance Sheet** | Financial Reporting | Period-end trial balances, operating income statements, and institutional balance sheets. | `balance` |
| 316| **Automated Bank Reconciliation Engine** | Financial Ops | Bank statement parsing, automated transaction matching, and discrepancy adjustment. | `compare_arrows` |
| 317| **Granular Fee Masters: Advance Heads, Books & Late Fee Policy** | Fee Master | Fee categories, wing fee books, prepaid advance heads, and daily/percentage late fines. | `payments` |
| 318| **Fee Concession Profiles & Student-Wise Fee Structures** | Fee Policy | Sibling, merit, and need-based concession templates with individual student fee overrides. | `loyalty` |
| 319| **Fee Refund, Advance Receipt & Miscellaneous Collection Desk** | Fee Collections | Withdrawal fee refunds, prepaid term advance receipts, and ad-hoc campus fees. | `price_change` |
| 320| **Payroll Components, Professional Tax & Increments Engine** | Payroll Core | Earnings, deductions, state professional tax slabs, and annual salary increments. | `badge` |
| 321| **Employee Bonus Allocation & Generation Desk** | Compensation | Festival, performance, and annual bonus allocation with flat and percentage models. | `card_giftcard` |
| 322| **Category-Wise Salary Register & Outstanding Salary Summary** | Payroll BI | Departmental payroll registers, unpaid salary aging, and encrypted PDF payslips. | `summarize` |
| 323| **Library Book Binding, Lost Book & Return Management** | Library Ops | Damaged book bindery tracking, lost book replacement billing, and overdue fine rules. | `auto_stories` |
| 324| **Multi-Board CCE Settings: Scholastic & Co-Scholastic Frameworks** | Assessment Boards | Formative/summative settings, core subject rubrics, and life skills co-scholastic scales. | `grade` |
| 325| **ICSE Exam Categories, Weightage Assignment & Consolidated Reports** | Assessment Boards | Group I-III classifications, 80/20 external/internal weightages, and school marksheets. | `view_list` |
| 326| **Internal Assessment (IA) Groups & Marking Settings** | Assessment Boards | Practical lab assessments, project portfolios, oral viva voce, and cohort grading. | `assignment` |
| 327| **Front Desk Calls, Follow-Ups, Enquiries & Complaints Ledger** | Front Office | Inbound/outbound call logging, visitor inquiries, grievance tickets, and SLA timers. | `support_agent` |
| 328| **Student Late Arrival & Early Departure Gate Passes** | Campus Safety | Perimeter turnstile barcode/QR scans, late arrival slips, and guardian exit passes. | `door_sliding` |
| 329| **Store Masters, Purchase Orders, Request Orders & Supplier Billing** | Procurement | Store types, departmental requisitions, PO dispatch, and good receipt notes (GRN). | `store` |
| 330| **IT Help Desk, Language Translations & Platform Audit Activity** | Platform Admin | IT ticketing desk, multilingual translation dictionary editor, and user login logs. | `translate` |

---

## 26. Cambodia Localized SMS & EdTech Ecosystem Suite

*Authoritative Reference: [`references/78_CAMBODIA_EDTECH_ECOSYSTEM_AND_LOCALIZED_SMS_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/78_CAMBODIA_EDTECH_ECOSYSTEM_AND_LOCALIZED_SMS_SPEC.md)*
*Dedicated Skill: `smart-school-cambodia-localized-sms` [P-18]*

| # | Feature Name | Domain Group | Architectural Function & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 331| **Cambodia MoEYS Curriculum & Grade Level Alignment** | Academic SIS | Grade 1-12 MoEYS curriculum tree, learning standards, and national syllabus mapping. | `school` |
| 332| **KHR Riel & USD Dual-Currency Billing Engine** | Financial Core | Dual-currency student invoices, receipts, and NBC spot exchange rate synchronization. | `currency_exchange` |
| 333| **National Bakong KHQR & ABA PayWay Gateway Integration** | Payments POS | Dynamic NBC Bakong KHQR generation, ABA Mobile push, and Wing Bank agent codes. | `qr_code_2` |
| 334| **Bilingual Khmer/English Academic Transcript Generator** | Student Records | Dual-language transcripts, computerized grades, and conduct scores. | `history_edu` |
| 335| **Moul Font Diploma & Formal Certificate Canvas** | Credentials | Traditional Khmer Moul calligraphy headings for BacII and formal graduation certificates. | `workspace_premium` |
| 336| **School Student Management System (K-12 Intake to Alumni)** | School SIS | K-12 admissions, student 360 dossiers, promotions, and MoEYS census reporting. | `child_care` |
| 337| **College Student Management System (Semester & TVET Credits)** | College SIS | Credit-semester systems, vocational safety logs, and industry apprenticeship tracking. | `engineering` |
| 338| **Institute Student Management System (Modular Certification)** | Institute SIS | Fast-track modular courses, evening/weekend shifts, and corporate sponsor vouchers. | `card_membership` |
| 339| **University Student Management System (Faculty & CATS Audits)** | University SIS | Multi-faculty governance, CATS credit transfers, thesis defense, and degree audits. | `account_balance` |
| 340| **City Distributor Network & Regional Support Hubs (5 Cities)** | Ecosystem Support | Regional distributor desks in Phnom Penh, Siem Reap, Battambang, Sihanoukville, Kampong Cham. | `hub` |
| 341| **Multi-Campus Administrative Operations Desk** | Operations | Instant daily activity updates, administrative cost-reduction workflows, and multi-branch MIS. | `apartment` |
| 342| **Faculty Workload Optimization & Subject Allocation Desk** | Faculty Ops | Teaching period balances, subject mapping, and substitute teacher routing. | `people_alt` |
| 343| **Sub-45s Mobile & Web Classroom Attendance Roll-Call** | Presence Engine | Sub-45s roll-calls, offline mobile caching, absence SMS alerts, and punctuality meters. | `how_to_reg` |
| 344| **Parent-Teacher Online Collaboration & Direct Chat** | Engagement | Encrypted parent-teacher dialogue, instant circular notifications, and homework feeds. | `forum` |
| 345| **Conflict-Free Master Timetable & Class Schedule Matrix** | Scheduling | Automated period clash detection, room allocation, and Monday-Saturday timetable grids. | `calendar_view_week` |
| 346| **Integrated Campus Bus Transit, Library & Hostel Suite** | Campus Logistics | Live GPS bus tracking, RFID library circulation, and biometric hostel curfew gating. | `commute` |
| 347| **Automated Paperless Admissions Intake & Merit Routing** | Admissions Web | Multi-step online applicant intake, document uploads, and automated merit ranking. | `app_registration` |
| 348| **High-Stakes Assessment Engine & MoEYS Bell Curve Analytics** | Assessments | CBT tests with 15s autosave, paper generation, and MoEYS national exam analytics. | `quiz` |
| 349| **Statutory Payroll, National Social Security (NSSF) & Tax** | HR & Payroll | NSSF contributions, salary tax withholdings, computerized pay slips, and bonus desks. | `receipt` |
| 350| **Cross-Platform Responsive Liquid Glass Mobile Viewports** | Mobile UX | Responsive touch layouts, 360-degree specular highlights, and zero blur elevation shadows. | `devices` |

---

## 27. Cambodia EdTech Multi-Tier SMS & Campus Lifecycle Suite

*Authoritative Reference: [`references/79_CAMBODIA_EDTECH_MULTI_TIER_SMS_AND_CAMPUS_LIFECYCLE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/79_CAMBODIA_EDTECH_MULTI_TIER_SMS_AND_CAMPUS_LIFECYCLE_SPEC.md)*
*Dedicated Skill: `smart-school-cambodia-campus-lifecycle` [P-19]*

| # | Feature Name | Domain Group | Architectural Function & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 351| **Guest Student Admissions Intake & PIN Tracking Portal** | Admissions SIS | Unauthenticated multi-step applicant intake, auto PIN generator, document uploads. | `app_registration` |
| 352| **Student Task Management & Priority Milestone Matrix** | Academic Ops | Teacher task delegation, priority badges, submission deadlines, milestone tracking. | `task_alt` |
| 353| **Campus Cultural & Academic Event Planning Desk** | Campus Life | Festivals, sports days, competitions, drawing activities, and venue reservations. | `event` |
| 354| **Merit & Need-Based Scholarship Governance Engine** | Financial Aid | Tuition waivers, living stipends, academic threshold checks, and approval queues. | `workspace_premium` |
| 355| **Donor Fund Management & Academic Refund Clawbacks** | Financial Aid | External donor fund accounts, disbursement logs, and withdrawal refund clawbacks. | `volunteer_activism` |
| 356| **Class-Wise & Section-Wise Performance Analytics BI** | Academic BI | Granular student performance metrics, class comparative percentiles, progress curves. | `analytics` |
| 357| **Tri-Channel Encrypted Comms Hub (SMS, Email, Mobile Push)** | Communications | Teacher-student/parent encrypted messaging, circular alerts, homework notices. | `chat` |
| 358| **Transit Fleet Insurance, Fitness & Driver License Desk** | Fleet Logistics | Vehicle registry, insurance expiry tracking, fitness renewals, driver credentials. | `badge` |
| 359| **RFID Bus Ingress & Real-Time Student Geofencing** | Fleet Logistics | RFID tap sensor integration, sub-5s GPS tracking, route deviation emergency alerts. | `sensors` |
| 360| **Distance-Based Transit Fee Tariff Matrix** | Fleet Logistics | Staged geographical destination tariffs, student bus stop mapping, fee calculators. | `price_check` |
| 361| **Fleet Vehicle Seat Allocation & Validity Engine** | Fleet Logistics | Student/faculty seat assignment, contract start/end dates, vehicle capacity meters. | `airline_seat_recline_normal` |
| 362| **Library Universal Decimal Classification (UDC) Catalog** | Library Ops | Dewey/UDC book classification, barcode indexing, category management, language tags. | `collections_bookmark` |
| 363| **Hostel Residential Block, Room & Bed Inventory** | Hostel Ops | Multi-building hostel occupancy, room categories (single/shared), bed allocation. | `bed` |
| 364| **Hostel Dining, Caterer Contracts & Meal Coupons** | Hostel Ops | Residential dining schedules, caterer contracts, meal ticket validation, nutrition logs. | `restaurant` |
| 365| **Traditional Hall Examination & Seating Plan Desk** | Assessment Ops | Physical exam scheduling, hall capacity mapping, invigilator seating allocations. | `table_restaurant` |
| 366| **Secure Question Bank Repository & Difficulty Rubrics** | Assessment Ops | Question vault (MCQ, descriptive, essays, lab items), difficulty rating, solutions. | `lock` |
| 367| **Algorithmic Bloom's Taxonomy Question Paper Generator** | Assessment Ops | Balanced exam paper compiler matching Bloom's cognitive distribution in minutes. | `auto_awesome` |
| 368| **Supervisor & External Examiner Allocation Rota** | Assessment Ops | Examination supervisor assignments, examiner reports, subject specialty rosters. | `supervisor_account` |
| 369| **Class Designation & Graduation Honors Valedictorian Engine** | Assessment Ops | Automated class ranking, percentile assignments, honors designations, valedictorian honors. | `military_tech` |
| 370| **Employee Salary Components, HRA & Statutory Allowances** | HR & Payroll | Base salary master, housing allowances (HRA), academic rank scaling, conveyance. | `account_tree` |
| 371| **Deduction Registry, NSSF Withholding & Salary Tax Slabs** | HR & Payroll | Statutory Cambodian NSSF pension/healthcare withholdings and progressive salary tax. | `money_off` |
| 372| **Cryptographically Signed Bilingual PDF Payslip Dispatch** | HR & Payroll | Dynamic monthly/annual salary slips, designation stamps, staff portal delivery. | `picture_as_pdf` |
| 373| **Campus Health Clinic, Infirmary Visits & Medication Logs** | Campus Health | On-campus clinic encounter logs, doctor diagnosis, medication tracking, parent alerts. | `local_hospital` |
| 374| **Touchscreen Canteen Cashless POS & RFID Wallet Debits** | Auxiliary POS | Weekly cafeteria meal plans, RFID wallet debit, food inventory, cashier balancing. | `point_of_sale` |
| 375| **Parent-Teacher Meeting (PTM) Physical & Virtual Scheduler** | Collaboration | 1-click meeting slot reservations, in-person room allocations, virtual conference links. | `groups` |

---

## 28. Commercial Tiers, Feature Gating & Expanded Enterprise Modules Suite

*Authoritative Reference: [`references/81_COMMERCIAL_TIERS_FEATURE_GATING_AND_EXPANDED_ENTERPRISE_MODULES_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/81_COMMERCIAL_TIERS_FEATURE_GATING_AND_EXPANDED_ENTERPRISE_MODULES_SPEC.md)*
*Dedicated Skill: `smart-school-crm-distribution-and-commercial-tiers` [P-20]*

| # | Feature Name | Domain Group | Architectural Function & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 376| **9-Tier Commercial SaaS Subscription Hierarchy** | Commercial Core | Starter ($100) to Infinity ($50,000 Lifetime) tier structure and limits. | `payments` |
| 377| **Programmatic Feature Gating & Entitlement Interceptor** | Commercial Core | Redis-cached entitlement validation intercepting HTTP requests with HTTP 402. | `lock` |
| 378| **Multi-Tier Student Capacity & Branch Limiter Engine** | Tenant Ops | Enforces maximum student (250 to Unlimited) and branch (1 to Unlimited) quotas. | `group_add` |
| 379| **Custom Payment Gateway Multi-Tenant Routing** | Financial Ops | Tenant-specific gateway keys (Stripe, Razorpay, ABA PayWay, Bakong KHQR). | `credit_card` |
| 380| **Private Custom Domain & SSL ACM Auto-Provisioning** | Cloud Hosting | Custom CNAME/A record mapping with automated AWS ACM TLS certificates. | `domain` |
| 381| **Enterprise Full White-Labeling & Custom Branding Engine** | Branding Ops | Total UI de-branding, custom logo, favicons, custom themes, and domain masking. | `branding_watermark` |
| 382| **Paid Real-Time Vehicle GPS Telematics Module** | Fleet Logistics | Premium sub-5s GPS stream integration, real-time speedometers, geofence rings. | `directions_bus` |
| 383| **Paid Real-Time Student RFID Telematics Ingress** | Presence Engine | Premium turnstile and bus RFID card ingress with instant guardian push feeds. | `sensors` |
| 384| **Dedicated Enterprise Account Manager & SLA Support Desk** | Customer Success | High-tier priority ticketing, dedicated technical account manager, and phone hotline. | `support_agent` |
| 385| **Institutional Public Website CMS & Template Engine** | Marketing Web | Institutional website builder, news banners, staff bios, and admissions widgets. | `web` |
| 386| **Hosted Single-Tenant Cloud Solution Deployment Engine** | Infrastructure | Dedicated isolated AWS ECS/RDS infrastructure provisioned for Enterprise/Infinity. | `cloud_done` |
| 387| **Commercial Hourly Customization Request & Ticketing Desk** | Professional Services | $12/hr additional custom module and feature development request ticketing system. | `design_services` |
| 388| **CRM Inbound Student Lead Capture & Source Tracking** | Admissions CRM | Web forms, walk-in leads, phone inquiries, social campaigns, and UTM tags. | `lead_pencil` |
| 389| **Automated Counselor Lead Routing & Round-Robin Queue** | Admissions CRM | Lead assignment rules, counselor quotas, and automated SLA follow-up reminders. | `assignment_ind` |
| 390| **Prospective Parent Campus Tour & Appointment Scheduler** | Admissions CRM | Calendar slot booking for physical guided tours and admissions interviews. | `tour` |
| 391| **Multi-Stage Admissions Conversion Pipeline Telemetry** | Admissions CRM | Visual Kanban lead pipeline, conversion velocities, and channel attribution BI. | `filter_alt` |
| 392| **Curriculum Book Pack Bundling & Grade-Wise Sets** | Study Material | Grade-level curriculum book bundles, textbook sets, and digital reference kits. | `collections_bookmark` |
| 393| **School Uniform Sizing, Allotment & Kit Tracking** | Study Material | Uniform size charts, student allotments, formal/sports wear, and lab apparel. | `checkroom` |
| 394| **Point-of-Distribution (POD) Counter Barcode Issuance** | Study Material | Barcode scanner verification of fee clearance prior to material release. | `barcode_scanner` |
| 395| **Stationery Warehouse Stock Depletion & Reorder Alerts** | Study Material | Central stock ledger, minimum threshold reorder alerts, and vendor PO links. | `inventory_2` |
| 396| **Bilingual Campus Newsletter Authoring & Rich Editor** | Publications | Multi-column bilingual newsletter editor supporting English and Khmer text. | `newspaper` |
| 397| **Newsletter Multi-Stage Editorial Approval Workflow** | Publications | Column submissions, teacher in-charge review, and principal final authorization. | `approval` |
| 398| **Multi-Channel Newsletter Dispatch (Web, PDF, App, Push)** | Publications | 1-Click broadcast across web reader, PDF vault, parent app feed, and email digest. | `send` |
| 399| **Continuous S3 Database WAL Archiving & PITR Engine** | Database Ops | 5-minute RPO continuous WAL streaming and 35-day Point-in-Time Recovery. | `backup` |
| 400| **Enterprise Bulk Multi-Tenant Data Export (CSV & JSON)** | Compliance BI | Structured data package generator (ZIP of CSV/JSON) for regulatory audits. | `file_download` |

---

### Section 29: Master Navigation Slugs, Apps Suite & Predictive Risk Intelligence (Features 401 - 415)
*Spec Reference: [`references/82_NAVIGATION_SLUGS_APPS_SUITE_AND_PREDICTIVE_RISK_MATRIX_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/82_NAVIGATION_SLUGS_APPS_SUITE_AND_PREDICTIVE_RISK_MATRIX_SPEC.md)*

| # | Feature Name | Domain | Functional Concept & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 401| **Unified Role Dashboard Routing Engine (`/dashboard/{role}`)** | Core Routing | Persona-tailored dashboard views for Admin, Teacher, Student, and Parent with real-time KPI tiles and speed action buttons. | `dashboard` |
| 402| **Integrated WebRTC Voice & Video Calling Suite (`/apps/call`)** | Communication | Secure peer-to-peer and SFU video conferencing for virtual parent conferences, remote student consultations, and staff meetings. | `video_call` |
| 403| **Institutional Webmail Client & Domain Mailbox (`/apps/email`)** | Communication | Embedded webmail interface connected to school domain email accounts with WYSIWYG rich composer and roster auto-complete. | `mail` |
| 404| **Collaborative Task & To-Do Checklist Engine (`/apps/todo`)** | Productivity | Personal and assigned task tracker with priority triage (Low, Medium, High, Urgent), sub-item progress %, and deadline alerts. | `checklist` |
| 405| **Faculty & Administrative Rich-Text Notes Scratchpad (`/apps/notes`)** | Productivity | Cloud scratchpad for quick lesson notes, meeting minutes, student observation logs, and pinned sticky memos with auto-save. | `note_alt` |
| 406| **Multi-Tenant Cloud File Manager & Shared Document Vault (`/apps/file-manager`)** | Cloud Storage | Departmental folder hierarchies, role-based access permissions, inline file previews (PDF, media), and secure temporary links. | `folder_shared` |
| 407| **Legal Guardian & Authorized Pickup Management (`/people/guardians`)** | Campus Safety | Dedicated entity decoupling legal guardians and authorized pickup delegates from primary billing parents with photo/OTP release. | `shield_person` |
| 408| **Student Performance Risk Matrix & Early Warning Engine** | Academic BI | 2D scatter matrix mapping Attendance % vs Academic Average Score with 4-tier risk classification (Star Zone, Low, Medium, High). | `bubble_chart` |
| 409| **Active Academic & Behavioral Intervention Plan Workflow** | Student Welfare | Individualized remediation tracking for at-risk cohorts with assigned counselors, milestone targets, and parent sign-off. | `assignment_turned_in` |
| 410| **Class-Wise Cohort Capacity & Density Distribution Analytics** | Academic Ops | Structural enrollment breakdown across KG, Primary, Middle, Secondary, and Senior with section density and average class size metrics. | `bar_chart` |
| 411| **Faculty & Student Honors Excellence Spotlight Engine** | Recognition | Spotlight showcasing Star Teacher ratings, student pass rates, Top Student Olympiad honors, GPA rankings, and attendance streaks. | `military_tech` |
| 412| **Global Spotlight Command Ingress (`Cmd + K`) & Speed Actions** | Navigation | Keyboard-driven instant fuzzy search across students, staff, invoices, and circulars with one-click quick add actions. | `search` |
| 413| **Dynamic Layout Engine & View Customizer (`/layouts`)** | UI Customization | Runtime switching between boxed/fluid layouts, collapsible sidebars, and top/side navigation preferences with user persistence. | `view_quilt` |
| 414| **Real-Time Daily Executive Telemetry Tiles** | Executive BI | Today's Attendance %, New Admissions count, Fees Today cash collections ($), and Upcoming Exams countdown gauge. | `speed` |
| 415| **Academic Year & Multi-Campus Contextual Scope Filter** | Multi-Tenant Core | Universal academic year switcher (`AY 2025-26`) and multi-campus branch selector with synchronized data view hydration. | `filter_list` |

---

### Section 30: List/Grid Views, Role Dossiers & Multi-Faceted Filter Architecture (Features 416 - 425)
*Spec Reference: [`references/83_LIST_GRID_VIEWS_ROLE_DOSSIERS_AND_MULTI_FACETED_FILTER_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/83_LIST_GRID_VIEWS_ROLE_DOSSIERS_AND_MULTI_FACETED_FILTER_SPEC.md)*

| # | Feature Name | Domain | Functional Concept & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 416| **Universal List/Grid View Architecture & Density Toggles** | UI Architecture | Dynamic view switching between tabular data grids and visual glass cards across all master directories with compact/comfortable/relaxed density modes. | `grid_view` |
| 417| **Polymorphic Role-Based 360° Detail Dossier Engine** | Core SIS | Comprehensive multi-tab profile dossiers tailored to Students (8 tabs), Teachers (6 tabs), Parents/Guardians (4 tabs), and Staff (5 tabs). | `account_box` |
| 418| **Multi-Parametric Faceted Filter & Saved Query Engine** | Navigation & Search | Composable filter bar supporting multi-select taxonomy facets, date range presets, URL state sync, and 1-click user saved query presets. | `filter_alt` |
| 419| **Structured Class Routine & Period Sequencing Matrix** | Academic Ops | Granular daily bell schedules, period slot assignments, homeroom vs subject periods, and real-time teacher/room collision prevention. | `schedule` |
| 420| **Automated Event-Driven Deadline & Alert Dispatcher** | Communications | Chron and event dispatcher monitoring fee due dates (T-7, T-1), upcoming exams, library overdue fines, and circular dispatches. | `notifications_active` |
| 421| **Interactive Multi-Child Parent & Student Self-Service Portals** | Stakeholder Portals | Secure authenticated portals for real-time attendance calendars, digital fee clearinghouse, grade dossiers, and bus telematics. | `family_restroom` |
| 422| **Institutional HRMS Work History & Leave Ledger** | Human Resources | Full staff employment lifecycle, biometric time logs, multi-tier leave approval workflows, and monthly salary register generation. | `badge` |
| 423| **Dewey & UDC Digital Library Catalog & Barcode Circulation** | Facilities Ops | Digital library catalog, barcode book issue/return scanning, overdue fine ledgering, lost book reporting, and binding queues. | `local_library` |
| 424| **Comprehensive Academic, Presence & Revenue BI Reporting** | Business Intelligence | Automated generation of student report cards, faculty punctuality heatmaps, fee aging analysis, and MoEYS ministry rosters. | `analytics` |
| 425| **Universal Institutional Settings & Automated Policy Rules** | System Core | Centralized administrative configuration for academic sessions, grading scales, fee penalties, gate security hours, and audit logs. | `settings_suggest` |

---

### Section 31: Authentication, Lock Screen, Maintenance & System Utilities (Features 426 - 435)
*Spec Reference: [`references/84_AUTHENTICATION_LOCK_SCREEN_MAINTENANCE_AND_SYSTEM_UTILITIES_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/84_AUTHENTICATION_LOCK_SCREEN_MAINTENANCE_AND_SYSTEM_UTILITIES_SPEC.md)*

| # | Feature Name | Domain | Functional Concept & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 426| **Idle Session State Preservation & Lock Screen Engine (`/auth/lock-screen`)** | Session Security | Automated lock after 15 min inactivity preserving in-memory form drafts; unlocks via PIN, password, or WebAuthn biometrics. | `lock` |
| 427| **Self-Service Password Recovery & Token Dispatch (`/auth/forgot-password`)** | Identity Security | 15-minute cryptographically signed recovery tokens dispatched via SMS and institutional email with rate limiting. | `password` |
| 428| **Password Complexity Meter & Cyclic History Exclusion (`/auth/reset-password`)** | Identity Security | zxcvbn score >= 3 enforcement, rejection of last 5 historical passwords, and automated global session revocation. | `lock_reset` |
| 429| **Multi-Tenant Self-Service Onboarding & Registration (`/auth/signup`)** | Admissions & SIS | Multi-step prospective student/parent self-registration with phone/email OTP verification and duplicate ID prevention. | `person_add` |
| 430| **Scheduled Maintenance Interceptor & Live Telemetry (`/maintenance`)** | System Ops | Gateway middleware returning HTTP 503, displaying estimated duration, and auto-refreshing via health check polling. | `build` |
| 431| **Pre-Launch Feature Teaser & Precision Countdown Engine (`/coming-soon`)** | System Ops | Targeted module launch countdown timer with role waitlist subscription and instant availability push notifications. | `hourglass_top` |
| 432| **Intelligent Error 404 Route Discovery & Fuzzy Search (`/errors/404`)** | Navigation & Routing | Resilient not-found handler computing Levenshtein route suggestions, integrated search, and safe dashboard fallback. | `search_off` |
| 433| **Incident-Tracked Error 500 Diagnostic Handler (`/errors/500`)** | System Reliability | RFC 7807 compliant error handler with unique Correlation ID (`X-Correlation-ID`), 1-click retry, and automated IT ticketing. | `error` |
| 434| **Multi-Tenant Sign In & Brute-Force Rate Limiter (`/auth/signin`)** | Authentication | Subdomain/branch login resolution, 5-attempt account lockout for 15 min, conditional 2FA TOTP, and JWT rotation. | `login` |
| 435| **Device Fingerprinting & Concurrent Session Monitor** | Security Telemetry | Client device fingerprinting, active IP geolocation logging, and administrative multi-device session revocation. | `devices` |

---

### Section 32: Student Pocket Money, Facility Ticketing & RTL Dual-Theme Architecture (Features 436 - 445)
*Spec Reference: [`references/85_STUDENT_POCKET_MONEY_FACILITY_TICKETING_AND_RTL_THEME_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/85_STUDENT_POCKET_MONEY_FACILITY_TICKETING_AND_RTL_THEME_SPEC.md)*

| # | Feature Name | Domain | Functional Concept & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 436| **Student Campus & Hostel Pocket Money Wallet (`/hostel/pocket-money`)** | Campus Commerce | Cashless petty allowance wallet for boarding students with Bakong KHQR deposits, daily spending caps, and RFID tap-to-pay. | `account_balance_wallet` |
| 437| **Parent Allowance Top-Up & Spending Guardrails Portal** | Campus Commerce | Parent portal for wallet funding via KHQR/Card, daily transaction limits, category blocks, and low-balance alerts. | `savings` |
| 438| **Campus Facility Maintenance Trouble-Ticketing (`/facilities/maintenance-tickets`)** | Facility Ops | Multi-role infrastructure issue reporting (HVAC, electrical, plumbing) with building/room pinning, photo evidence, and SLA timers. | `home_repair_service` |
| 439| **Technician Work Order Dispatch & Photo Resolution Proof** | Facility Ops | Maintenance task routing to campus technicians, turnaround time tracking, and required photographic sign-off upon completion. | `engineering` |
| 440| **Bidirectional RTL / LTR Directional Mirroring Engine** | Internationalization | Native layout flipping for Arabic, Hebrew, and Persian scripts across sidebars, tables, breadcrumbs, and form controls. | `format_textdirection_r_to_l` |
| 441| **Dual-Theme Liquid Glass Architecture (Dark & Light Mode Switcher)** | UI Architecture | System-wide dark/light theme switcher preserving frosted white/slate canvas, 360-degree specular rims, and zero emoji standard. | `dark_mode` |
| 442| **Hostel Building Classification & Bed Allotment Matrix** | Logistics | Multi-tier hostel dorm management (Boys, Girls, Faculty), room occupancy capacity, and bed allotment registers. | `bed` |
| 443| **Night Curfew & Hostel Attendance Register Roll-Call** | Campus Safety | Evening residential roll-call, night curfew pass validation, gate turnstile sync, and unauthorized absence parent alerts. | `nightlight` |
| 444| **Library Book Replacement & Overdue Fine Invoicing** | Library Ops | Automated overdue fine assessment (`៛500` / `$0.12` daily) and lost book replacement invoice creation linked to student fee account. | `receipt_long` |
| 445| **Universal Multi-Platform Mobile Ingress & Deep-Linking Gateway** | Mobile Ecosystem | Standardized deep-linking (`smartschool://`), universal APNs/FCM push pipelines, and multi-tenant mobile onboarding via QR scan. | `phonelink` |

---

### Section 33: SIMS, EMIS & Multi-Stakeholder Mobile Architecture (Features 446 - 455)
*Spec Reference: [`references/86_SIMS_EMIS_AND_STAKEHOLDER_MOBILE_ECOSYSTEM_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/86_SIMS_EMIS_AND_STAKEHOLDER_MOBILE_ECOSYSTEM_SPEC.md)*

| # | Feature Name | Domain | Functional Concept & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 446| **Dynamic QR Profile Scan & Identity Verification Gateway (`/security/qr-scanner`)** | Campus Safety | High-speed cryptographic QR scanner for student/staff cards with dynamic TOTP/HMAC rotation, offline cache validation, and pickup matching. | `qr_code_scanner` |
| 447| **Contactless Wireless Presence & BLE / Wi-Fi Telemetry Ingress (`/attendance/wireless`)** | Attendance & IoT | Ambient automated roll-call capture using classroom BLE beacons and enterprise Wi-Fi AP association telemetry with RSSI proximity thresholds. | `wifi_tethering` |
| 448| **Macro-Level EMIS Statutory Census & Ministry Reporting Engine (`/reports/emis`)** | Regulatory BI | National MoEYS / UNESCO standardized education data aggregator computing GER/NER, Student-Teacher Ratios (STR), and infrastructure capacity metrics. | `hub` |
| 449| **Longitudinal Student Lifecycle Dossier & Academic History Archive** | Core SIMS | End-to-end longitudinal tracking of student academic trajectory from initial online inquiry, admission, stream selection, term marks, to graduation and alumni. | `timeline` |
| 450| **Collaborative Classroom Group Work & Team Project Workspaces (`/academics/group-projects`)** | Academic Ops | Dedicated collaborative student project workspaces featuring shared milestone boards, deliverable vaults, task assignments, and peer assessment rubrics. | `groups` |
| 451| **Digital Learning Resource Repository & Media Asset Bank (`/academics/learning-resources`)** | Curriculum & Media | Centralized, syllabus-tagged educational media vault hosting lecture video archives, interactive PDF reading packets, audio guides, and DRM view-only streaming. | `video_library` |
| 452| **Teacher Mobile Persona Gradebook & Offline Marks Ingress** | Mobile Faculty Ops | Native mobile gradebook allowing educators to enter formative/summative marks, competency rubrics, and anecdotal feedback offline with SQLite auto-sync. | `edit_note` |
| 453| **Student & Parent Mobile Multi-Subsystem Command Center** | Mobile Family Ops | Unified mobile launcher consolidating 12 core subsystems (Attendance, Timetable, Bus Telematics, Live Fees, Homework, Exams, PTM, Virtual Classroom) with sibling switch. | `smartphone` |
| 454| **Authorized Dismissal & Safe Student Pickup Verification Engine (`/security/student-pickup`)** | Campus Safety | End-of-day dismissal checkpoint validating parent/guardian QR pass against authorized pickup biometric photo records with gatekeeper instant approval. | `how_to_reg` |
| 455| **Automated Dropout Early-Warning & Intervention Tracking Matrix** | Student Success | Predictive analytics engine correlating chronic absenteeism, sudden grade drops, and fee defaults to generate at-risk alerts for guidance counselors and dean interventions. | `warning_amber` |

---

### Section 34: Class Notes Whiteboard Sync, Location Entry & Student Tracking (Features 456 - 465)
*Spec Reference: [`references/87_MOBILE_APP_CLASS_NOTES_SYNC_LOCATION_ENTRY_AND_STUDENT_TRACKING_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/87_MOBILE_APP_CLASS_NOTES_SYNC_LOCATION_ENTRY_AND_STUDENT_TRACKING_SPEC.md)*

| # | Feature Name | Domain | Functional Concept & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 456| **Whiteboard Camera Sync & Class Notes Perspective Ingress (`/academics/class-notes-sync`)** | Classroom Tech | Post-lecture whiteboard snapshot with auto quad-point planar un-skewing, specular glare removal, OCR indexing, and student stream publication. | `document_scanner` |
| 457| **Campus Location Entry & Zoned Checkpoint Telemetry (`/facilities/location-entries`)** | Facility Safety | Role-differentiated physical location check-ins across 9 campus zones (Labs, Library, Hostels, Canteen, Sports, Staff Lounge) with access rule validation. | `pin_drop` |
| 458| **Real-Time Zone Occupancy & Night Curfew Roll-Call Matrix (`/facilities/zone-occupancy`)** | Logistics | Live headcounts per zone, unauthorized area entry rejection, and automated residential curfew roll-call flagging missing boarders to warden consoles. | `meeting_room` |
| 459| **Interactive Touch/Stylus Homework Annotation Canvas (`/academics/homework-evaluations`)** | Academic Assessment | Native digital pen/stylus markup directly on student homework submissions with layered vector annotations (checkmarks, corrections, underlines). | `draw` |
| 460| **Evaluator Audio Memo Feedback & Rubric Scoring Engine** | Academic Assessment | Up to 60-second teacher voice feedback memo recording attached to homework problems alongside multi-criteria rubric evaluation scores. | `mic` |
| 461| **Dynamic Toggled Timetable & Runtime Schedule Switcher (`/academics/toggled-timetable`)** | Academic Ops | Single-tap switching between 6 schedule modes (Regular, Surprise Test, Compressed Half-Day, Exam Block, Rainy Day, Virtual Remote) with instant alert dispatch. | `swap_calls` |
| 462| **Automated Teacher Substitution & Proxy Workload Dispatch (`/academics/proxy-dispatch`)** | Faculty Ops | Conflict-free proxy teacher recommendation matching free periods with subject expertise and 1-tap mobile substitute dispatch upon sick leave. | `supervised_user_circle` |
| 463| **Holistic 360° Student Development Radar & Trajectory Tracker (`/students/tracking-trajectory`)** | Student Success | Longitudinal tracking combining cognitive GPA trends, behavioral conduct scores, punctuality indices, and co-curricular milestones into visual radar graphs. | `insights` |
| 464| **Multi-Channel In-App Chat Boxes with Office Hours Guardrails (`/apps/chat-boxes`)** | Communications | Role-bounded messaging channels (Parent-Teacher DMs, Class Broadcasts, Faculty Dept Rooms, Study Groups) with automated teacher quiet hours and keyword filtering. | `forum` |
| 465| **Multi-Child Delegated Account Customizer & Session Guard (`/profile/customizer`)** | Stakeholder Portals | Seamless sibling switcher for multi-child families, emergency contact updates, transportation preferences, and active device session management. | `manage_accounts` |

---

### Section 35: Google Material Design 3 Web Tokens & Component Architecture (Features 466 - 475)
*Spec Reference: [`references/88_GOOGLE_MATERIAL_DESIGN_3_WEB_AND_TOKEN_SYSTEM_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/88_GOOGLE_MATERIAL_DESIGN_3_WEB_AND_TOKEN_SYSTEM_SPEC.md)*

| # | Feature Name | Domain | Functional Concept & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 466| **Three-Tier Token Engine (Reference, System & Component Separation)** | Design Tokens | Multi-tier token inheritance pipeline decoupling reference literals, semantic system decisions, and element component tokens with CSS fallback chains. | `token` |
| 467| **Perceptual HCT Color Engine & Automated WCAG Contrast Matrix** | Color Science | CAM16 / CIELAB tone-based color space generating 5 tonal palettes (Primary, Secondary, Tertiary, Neutral, Neutral Variant) with deterministic contrast ratios. | `palette` |
| 468| **Six-Level Tonal Elevation & Surface Tint Layering Engine** | UI Elevation | Elevation levels 0 to 5 combining box shadows and dynamic primary surface tint overlays ensuring depth perception across light and dark modes. | `layers` |
| 469| **Fifteen-Scale Typographic Matrix & Variable Optical Tracking** | Typography | Standardized Display, Headline, Title, Body, and Label scales across Large, Medium, and Small variants with calibrated letter spacing and line heights. | `text_fields` |
| 470| **Seven-Scale Shape Corner Matrix & Bi-Directional Logical Radii** | Shape & RTL | Shape corner scale (0px to 9999px) with CSS logical border properties (`border-start-start-radius`) supporting automatic RTL script flipping. | `rounded_corner` |
| 471| **Sixteen-Duration Motion Choreography & Emphasized Easing Curves** | Motion System | Standardized transition durations (50ms to 1000ms) with Emphasized, Standard, and Legacy cubic-bezier deceleration and acceleration curves. | `animation` |
| 472| **Interaction State Layer Overlays & Dynamic Opacity Controls** | Interaction Design | Content-independent state overlay layers implementing calibrated opacities (Hover 8%, Focus 12%, Pressed 12%, Dragged 16%). | `touch_app` |
| 473| **Material Web Custom Elements Suite (`@material/web` Components)** | Web Components | Framework-agnostic Lit custom element components (Buttons, Dialogs, Menus, Select, Switch, Tabs, Text Fields) with Shadow DOM encapsulation. | `widgets` |
| 474| **High-Contrast Accessible Focus Ring & Radial Ink Ripple Engine** | Accessibility | Standalone `<md-focus-ring>` rendering WCAG-compliant visible focus states during keyboard traversal and `<md-ripple>` capturing pointer coordinates. | `center_focus_strong` |
| 475| **Adaptive Layout Breakpoints & Window Size Classification Matrix** | Responsive Layout | Window size classes (Compact <600dp, Medium 600-839dp, Expanded 840-1199dp, Large 1200-1599dp, Extra-Large >=1600dp) for fluid responsive views. | `aspect_ratio` |

---

### Section 36: Material Components Web Catalog, ESM Ingress & Component Architecture (Features 476 - 485)
*Spec Reference: [`references/89_MATERIAL_COMPONENTS_WEB_CATALOG_AND_DEVELOPER_GUIDE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/89_MATERIAL_COMPONENTS_WEB_CATALOG_AND_DEVELOPER_GUIDE_SPEC.md)*

| # | Feature Name | Domain | Functional Concept & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 476| **Interactive Component Showcase & Configurator Sandbox (`/design-system/catalog`)** | Component Catalog | Live web component demo sandbox with parameter controls (dense, disabled, icons, elevation), interactive state toggles, and live DOM tree inspector. | `developer_board` |
| 477| **Real-Time Code Snippet Generator & Token Exporter (`/design-system/snippet-generator`)** | Developer Tooling | Automated generation of copy-ready HTML custom element tags, TypeScript ESM imports, and CSS custom property token overrides based on active sandbox state. | `code` |
| 478| **Modern Lit Web Components & Custom Element Registry (`@material/web` Engine)** | Web Architecture | Framework-agnostic custom element registration pipeline with Shadow DOM encapsulation, ElementInternals form association, and adoptedStyleSheets CSS injection. | `extension` |
| 479| **Zero-Build Browser ESM Import Map & Prototyping Pipeline** | Developer Experience | Native browser `<script type="importmap">` resolution engine mapping `@material/web/*` modules with zero-transpilation instant prototyping support. | `bolt` |
| 480| **Enterprise Production Bundler & Tree-Shaking Optimizer** | Build & Tooling | Rollup / Vite / Webpack build configuration resolving bare module specifiers, pruning unused component variants, and producing optimized sub-50kB bundles. | `inventory_2` |
| 481| **Polymorphic Component Slot Anatomy & Multi-Slot Composition Engine** | UI Composition | Standardized slot architecture (`leading-icon`, `headline`, `supporting-text`, `trailing-icon`, `actions`) with bidirectional content projection. | `view_agenda` |
| 482| **Form-Associated Custom Element Validation & Lifecycle Interceptor** | Form Standards | Native HTML5 form validation participation (`checkValidity`, `reportValidity`, `setCustomValidity`) across custom text fields, selects, checkboxes, and switches. | `fact_check` |
| 483| **Event-Driven Dialog, Menu & Surface Transition State Machine** | Interaction Design | Micro-state orchestrator coordinating `opening`, `opened`, `closing`, `closed` transition events with trap-focus accessibility and backdrop dismissal. | `sync_alt` |
| 484| **High-Fidelity Multi-State Progress & Discrete Slider Engine** | Data Telemetry | Determinate and indeterminate `<md-linear-progress>` and `<md-circular-progress>` with dual-thumb discrete tick-mark `<md-slider>` controls. | `tune` |
| 485| **Interactive Chip Set & Contextual Tag Filtering Matrix (`/design-system/chips`)** | Navigation & Filter | Assist, filter, input, and suggestion chip collections with leading avatars, checkmark animations, trailing dismiss buttons, and keyboard navigation. | `label` |

---

### Section 37: Google Material Design 3 (M3) Component Architecture & Taxonomy (Features 486 - 495)
*Spec Reference: [`references/90_MATERIAL_DESIGN_3_COMPONENTS_SPECIFICATION_AND_TAXONOMY.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/90_MATERIAL_DESIGN_3_COMPONENTS_SPECIFICATION_AND_TAXONOMY.md)*

| # | Feature Name | Domain | Functional Concept & Capability | Material Symbol |
|---|:---|:---|:---|:---|
| 486| **Segmented Button Filter & Mode Selector (`/design-system/segmented-buttons`)** | Actions Subsystem | Single-select and multi-select pill containers with animated checkmarks, equal-width flex distribution, and icon prefixing. | `view_week` |
| 487| **Extended Floating Action Button & Scroll-Collapsing FAB (`/design-system/fab`)** | Actions Subsystem | Prominent action button with icon and label text, dynamically collapsing to an icon-only FAB during table/page scrolling. | `add_circle` |
| 488| **Adaptive Small Dot & Numeric Badge Telemetry Engine (`/design-system/badges`)** | Communication | 6dp unread dot indicator and 16dp pill counter badge (1 to 999+) with boundary-anchored offset alignment over icons and tabs. | `mark_chat_unread` |
| 489| **Rich Multi-Line Interactive Tooltip & Contextual Help Popover (`/design-system/tooltips`)** | Communication | Persistent information cards featuring title, rich body copy, action button links, and persistent dismissal triggers. | `help_outline` |
| 490| **Modal Bottom Sheet & Side Sheet Co-Planar Drawer (`/design-system/sheets`)** | Containment | Gesture-driven modal bottom sheet with drag-handle dismiss for mobile, dynamically promoting to a co-planar side sheet on tablet/desktop. | `vertical_split` |
| 491| **Horizontal Multi-Browse & Hero Carousel Gallery (`/design-system/carousel`)** | Containment | Touch-scrollable carousel container with edge clipping, snapping momentum, and dynamic item width scaling for campus announcements and media. | `view_carousel` |
| 492| **Search Bar with Expanding Full-Screen Search View Overlay (`/design-system/search`)** | Navigation | Docked pill search input expanding with fluid motion into a full-screen overlay with search history, instant suggestions, and filter chips. | `search` |
| 493| **Adaptive Navigation Bar to Navigation Rail Transition Engine (`/design-system/navigation`)** | Navigation | Responsive navigation orchestrator rendering a 3-5 item bottom Navigation Bar on mobile (<600dp) and auto-adapting to a compact Navigation Rail on tablets/desktop. | `navigation` |
| 494| **Collapsing Medium/Large Top App Bar with Scroll-Linked Typography (`/design-system/top-app-bar`)** | Navigation | Multi-variant header transforming large prominent headlines into compact center-aligned bars during scroll with elevation tinting. | `web_asset` |
| 495| **Dual-Mode Calendar Date Picker & Analog Clock Dial Time Picker (`/design-system/pickers`)** | Selection Subsystem | Docked/modal calendar date picker supporting date ranges, paired with interactive clock dial and dual-box digital time picker with AM/PM toggle. | `calendar_clock` |

















