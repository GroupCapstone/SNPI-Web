# Super Admin Master Menu & Navigation Taxonomy Specification
## Smart School Enterprise Platform (Autonomous Vibecoding Pipeline Reference)

---

### Executive Overview & Purpose

This specification establishes the authoritative single-source-of-truth master menu directory and complete screen navigation hierarchy for the **Super Admin Portal** (`SUPER_ADMIN`) in the **Smart School Enterprise Platform**.

It documents the exact 32 left sidebar accordion menus, 180+ direct child sub-menus/slugs, 5 top header controls, 5-column Quick Links megamenu, and 14 General Setting sub-tabs.

- **Primary Role Token**: `SUPER_ADMIN`
- **Total Master Left Sidebar Accordions**: 32 Menus
- **Total Direct Child Slugs**: 180+ Screens
- **Total Layout Archetypes**: 7 Standardized Paradigms
- **Icon Standard**: Google Material Symbols exclusively. **STRICT ZERO EMOJI & ZERO UNICODE SYMBOL POLICY**.
- **Typography Standard**: Ubuntu (EN) / Google Sans (KM)

---

### 1. The Left Sidebar Navigation Accordion (32 Master Menus)

The left navigation rail maintains the active academic year badge (`Current Session: 2026-27`), the `Quick Links [grid_view]` drawer trigger, followed by 32 ordered vertical accordion menus:

#### 01. Front Office (`desk` / `support_agent`) — `/super-admin/front-office`
- **Admission Enquiry**: Search criteria (Enquiry Date, Source, Status), + Add modal with 12 fields, follow-up history.
- **Visitor Book**: In-place visitor pass form (Purpose, Meeting With, Name, ID Card, In/Out Time) + Visitor ledger.
- **Phone Call Log**: Call intake form (Incoming/Outgoing, Name, Phone, Next Follow-up, Duration) + Log ledger.
- **Postal Dispatch**: Outgoing dispatch form (To Title, Reference No, From Title, Address, File Dropzone) + Dispatch table.
- **Postal Receive**: Incoming package form (From Title, Reference No, To Title, Address, File Dropzone) + Receive table.
- **Complain**: Grievance registration form (Complain By, Source, Type, Assigned, Action Taken) + Complaints ledger.
- **Setup Front Office**: 4 Tabbed sub-masters: `Purpose`, `Complain Type`, `Source`, `Reference`.

#### 02. Student Information (`person_search` / `group`) — `/super-admin/student-info`
- **Student Details**: Dual criteria search (Class + Section vs. Keyword) with List/Details views and student profiles.
- **Student Admission**: 6-section registration wizard (Personal, Parent/Guardian, Sibling Link, Transport, Hostel, Fees).
- **Online Admission**: Self-service applicant review desk with dual status badges (*Form Status*, *Payment Status*).
- **Disabled Students**: Deactivated/suspended student archives with reason audit and reactivation.
- **Multi Class Student**: Dual-enrollment manager mapping a student across multiple grade cohorts.
- **Bulk Delete**: Criteria search with multi-select checkbox table and administrative soft-delete purge.
- **Student Categories**: Split 2-column demographic category master (*General*, *Special Needs*, *Scholarship*).
- **Student House**: Split 2-column house taxonomy (*Red House*, *Blue House*, *Green House*).
- **Disable Reason**: Split 2-column dictionary defining exit and suspension reasons.

#### 03. Fees Collection (`payments` / `request_quote`) — `/super-admin/fees`
- **Collect Fees**: Student cashier counter with fee group allocation, discount vouchers, and receipts.
- **Offline Bank Payments**: Wire deposit slip verification desk with *Pending* / *Approved* status badges.
- **Search Fees Payment**: Single-token Payment ID receipt lookup and payment ledger.
- **Search Due Fees**: Delinquent accounts aging matrix filtered by Class and Section.
- **Fees Master**: Split 2-column fee schedule builder with 4-way fine engine (*None*, *Percentage*, *Fix Amount*, *Cumulative*).
- **Quick Fees**: Single-screen high-velocity counter billing desk.
- **Fees Group**: Master billing categories (*Tuition Fees 2026-27*, *Transport Fees*, *Lab Fees*).
- **Fees Type**: Line-item fee codes (*Monthly Tuition*, *Admission Fee*, *Exam Fee*).
- **Fees Discount**: Financial aid vouchers with percentage or flat amount deduction rules.
- **Fees Carry Forward**: Session-to-session unpaid balance migration engine.
- **Fees Reminder**: Automated SMS/Email delinquency notification rules and grace period triggers.

#### 04. Online Course / LMS (`ondemand_video` / `play_lesson`) — `/super-admin/online-course`
- **Online Course**: 4-column card grid displaying video courses, price tags, progress meters, and enrollments.
- **Question Bank**: Multi-format question repository (Single Choice, Multiple Choice, True/False, Descriptive).
- **Offline Payment**: Cash desk verifying manual bank transfers for paid online courses.
- **Course Category**: Split 2-column subject taxonomy for curriculum tracks.
- **Certificate Template**: Drag-and-drop course completion credential designer.
- **Online Course Report**: Student course progress, lecture completion percentages, and quiz grades.
- **Setting**: Video streaming keys, AWS S3 / Google Drive storage credentials, and guest preview policies.

#### 05. Behaviour Records (`balance` / `gavel`) — `/super-admin/behaviour`
- **Assign Incident**: Conduct ledger allocating positive commendations or negative infraction points.
- **Incidents**: Master infraction and merit taxonomy with point weights and descriptions.
- **Reports**: 6-report behavioral hub (Student Leaderboard, Inter-House Cup, Class Demerit Distribution).
- **Setting**: Student commentary rebuttal switches and parent portal behavioral visibility toggles.

#### 06. Multi Branch (`hub` / `domain`) — `/super-admin/multi-branch`
- **Overview**: Multi-campus operational matrix with 1-click *Enter Branch Context* drilldown.
- **Report**: 5 cross-branch comparative analytics (Balance Sheet, Student Headcount, PTR Ratios, Exam Bell Curves).
- **Setting**: Campus provisioning wizard creating new PostgreSQL RLS partitions and issuing Dean credentials.

#### 07. Gmeet Live Classes (`video_camera_front`) — `/super-admin/gmeet`
- **Live Classes**: Scheduled Google Meet cohort classes with *Start Meet* launcher and *Awaited* / *Finished* badges.
- **Live Meeting**: Faculty internal video conference scheduler with participant rosters.
- **Live Classes Report**: Student Google Meet attendance audit logs calculating duration minutes.
- **Live Meeting Report**: Faculty video conference duration logs and attendance records.
- **Setting**: Google Cloud Console OAuth2 Client ID, Client Secret, and API authorization scopes.

#### 08. Zoom Live Classes (`videocam`) — `/super-admin/zoom`
- **Live Meeting**: Internal staff video conferences supporting embedded Web SDK or native app launch (`zoommtg://`).
- **Live Classes**: Cohort virtual classroom scheduler with multi-section targeting.
- **Live Classes Report**: Student Zoom attendance duration logs synced via Zoom Webhooks.
- **Live Meeting Report**: Faculty Zoom meeting attendance and participation reports.
- **Setting**: Zoom OAuth2 Server-to-Server Account ID, Client ID, Client Secret, and Teacher API credentials.

#### 09. Income (`attach_money` / `trending_up`) — `/super-admin/income`
- **Add Income**: Split 2-column revenue intake form (Head, Name, Invoice Number, Date, Amount, File Dropzone) + Ledger.
- **Search Income**: Dual-query revenue search (Period Selector vs. Keyword Query) with summary card.
- **Income Head**: Master Chart of Accounts (*Donation*, *Rent*, *Miscellaneous*, *Book Sale*, *Uniform Sale*).

#### 10. Expenses (`credit_card` / `trending_down`) — `/super-admin/expenses`
- **Add Expense**: Split 2-column expenditure disbursement form with voucher dropzone + Outflow ledger.
- **Search Expense**: Dual-query expenditure search with date range filtering and dynamic balance calculation.
- **Expense Head**: Master Chart of Accounts (*Stationery Purchase*, *Electricity Bill*, *Telephone Bill*, *Flower*).

#### 11. QR Code Attendance (`qr_code_scanner`) — `/super-admin/qr-attendance`
- **Attendance**: High-velocity IoT gate turnstile ingress supporting WebRTC optical camera and USB barcode scanner guns.
- **Setting**: Anti-passback timeout (5 minutes), camera orientation, and audio chime/buzzer frequency feedback.

#### 12. CBSE Examination (`description` / `assignment`) — `/super-admin/cbse-exam`
- **Exam**: Central Board standardized assessment management with 7-button control strip.
- **Exam Schedule**: Multi-room timetable scheduler with room allocation capacities.
- **Print Marksheet**: Batch marksheet generation criteria filter.
- **Template**: CBSE marksheet layout builder with co-scholastic observation slots.
- **Assign Observation**: Co-curricular behavioral and qualitative evaluation entry grid.
- **Admit Card**: Board hall ticket designer with candidate photos and signature boxes.
- **Reports**: Subject-wise and Term-wise grade analytics.
- **Setting**: 4-tab configuration engine (*Assessment*, *Term*, *Exam Category*, *Exam Grade*).

#### 13. Examinations (`menu_book` / `quiz`) — `/super-admin/examinations`
- **Exam Group**: Master exam groupings supporting 5 grading models (Pass/Fail, School Grade, CGPA, GPA 4.0/5.0).
- **Exam Schedule**: Subject timetable scheduler with minimum and maximum marks thresholds.
- **Exam Result**: 5-tier cascading search filter (`Exam Group`, `Exam`, `Session`, `Class`, `Section`) with mark publisher.
- **Design Admit Card**: Visual Admit Card designer with dynamic token chips and background uploader.
- **Print Admit Card**: Batch hall ticket PDF generator with criteria filters.
- **Design Marksheet**: Visual Marksheet layout builder with millimeter gridlines, signature blocks, and QR codes.
- **Print Marksheet**: Batch marksheet rendering desk with bulk PDF export.
- **Marks Grade**: Grading threshold matrix (Grade name, Percent From, Percent Upto, Grade Points).
- **Marks Division**: Academic division classification (*First Division*, *Second Division*, *Third Division*).

#### 14. Attendance (`event_available` / `calendar_today`) — `/super-admin/attendance`
- **Student Attendance**: Roll-call register with 5-choice status marking (*Present*, *Late*, *Absent*, *Half Day*, *Holiday*).
- **Approve Leave**: Student medical/casual leave approval desk with staff verification audit.
- **Attendance By Date**: Date-centric attendance matrix showing presence percentages across classes.

#### 15. Online Examinations / CBT (`wifi` / `laptop_chromebook`) — `/super-admin/online-exam`
- **Online Exam**: CBT exam scheduler with duration timers, auto-grading, randomized questions, and 7-action strip.
- **Question Bank**: Search-enabled question repository supporting Single Choice, Multiple Choice, True/False, Descriptive.

#### 16. Academics (`school`) — `/super-admin/academics`
- **Class Timetable**: Weekly Monday-Saturday period schedule matrix with teacher conflict collision detection.
- **Teachers Timetable**: Individual faculty workload schedule and free-period directory.
- **Assign Class Teacher**: Homeroom teacher assignments linking primary and assistant teachers to classes.
- **Promote Students**: End-of-session bulk student promotion register with Pass/Fail status handling.
- **Subject Group**: Academic tracks binding specific combinations of subjects to class sections.
- **Subjects**: Master course catalog defining Subject Name, Subject Type (*Theory* / *Practical*), and Subject Code.
- **Class**: Master grade level taxonomy (*Class 1* through *Class 12*).
- **Sections**: Grade section divisions (*Section A*, *Section B*, *Section C*).

#### 17. Annual Calendar (`calendar_month`) — `/super-admin/calendar`
- **Annual Calendar**: Interactive institutional calendar managing events, examinations, and holidays.
- **Holiday Type**: Split 2-column dictionary defining system and institutional holiday categories.

#### 18. Lesson Plan (`auto_stories` / `fact_check`) — `/super-admin/lesson-plan`
- **Copy Old Lessons**: Deep cloning engine migrating lesson curricula across academic sessions.
- **Manage Lesson Plan**: Weekly teacher lesson delivery schedule matrix.
- **Manage Syllabus Status**: Topic completion tracking tree with progress percentage meters.
- **Lesson**: Split 2-column lesson authoring desk with dynamic `+ Add More` row creation.
- **Topic**: Split 2-column topic unit authoring desk linked to parent lessons.

#### 19. Human Resource (`badge` / `supervisor_account`) — `/super-admin/human-resource`
- **Staff Directory**: 4-column visual faculty profile cards with role badges, qualifications, and status toggles.
- **Staff Attendance**: Daily workforce roll-call register supporting bulk marking and leave deduction.
- **Payroll**: Monthly staff compensation generator with earnings, deductions, tax withholdings, and payslips.
- **Approve Leave Request**: Faculty leave request clearance desk (*Approved*, *Pending*, *Disapproved*).
- **Apply Leave**: Personal staff leave application modal with file dropzone.
- **Leave Type**: Master quota rules for leave types (*Casual Leave: 15*, *Medical Leave: 10*, *Maternity Leave: 90*).
- **Teachers Rating**: Student and parent evaluation scores for teaching staff.
- **Department**: Split 2-column organizational departments (*Academic*, *Administration*, *Finance*, *Logistics*).
- **Designation**: Split 2-column institutional job titles (*Principal*, *Senior Teacher*, *Accountant*, *Librarian*).
- **Disabled Staff**: Archived former employees with exit reason documentation.

#### 20. Communicate (`campaign` / `bullhorn`) — `/super-admin/communicate`
- **Notice Board**: Institutional bulletin composer with audience targeting (Staff, Students, Parents) and web toggles.
- **Send Email**: 4-mode email campaign composer (*Group*, *Individual*, *Class*, *Today's Birthday*).
- **Send SMS**: DLT-compliant SMS gateway composer with character counter and recipient tokens.
- **Email / SMS Log**: Gateway transmission audit trail verifying delivery timestamps and recipient statuses.
- **Schedule Email SMS Log**: Scheduled broadcast queue with pending and cancelable dispatch triggers.
- **Login Credentials Send**: Automated student and parent portal login credential dispatch desk.
- **Email Template**: Reusable email templates with token interpolation (`[student_name]`, `[due_amount]`).
- **SMS Template**: Reusable SMS templates with character limit warnings.

#### 21. Download Center (`cloud_download` / `download`) — `/super-admin/download-center`
- **Upload / Share Content**: Digital asset repository with quota meter (`Total Documents: 40`, `Size: 2.93 MB`).
- **Content Share List**: Shared content access ledger with time-bounded expiration rules (`Valid Upto`).
- **Video Tutorial**: 6-column responsive video gallery with 16:9 thumbnails and streaming player.
- **Content Type**: Split 2-column asset classification master (*Syllabus*, *Assignment*, *Study Material*).

#### 22. Homework (`science` / `assignment_turned_in`) — `/super-admin/homework`
- **Add Homework**: Dual-tab assignment lifecycle manager (*Upcoming* vs. *Closed*) with evaluation modal.
- **Daily Assignment**: Daily classroom task inspection desk with student submission attachments.

#### 23. Library (`local_library` / `auto_stories`) — `/super-admin/library`
- **Book List**: Physical book inventory ledger with stock counts (`Qty` vs. `Available`), racks, and prices.
- **Issue - Return**: Member circulation desk handling check-outs, return clearances, and overdue fines.
- **Add Student**: Student library card enrollment desk with membership ID card generation.
- **Add Staff Member**: Faculty library membership register with 1-click enroll actions.

#### 24. Inventory (`inventory_2` / `package_2`) — `/super-admin/inventory`
- **Issue Item**: Equipment loan issuance desk with interactive tactile button `Click To Return`.
- **Item Stock**: Split 2-column stock intake form with purchase price, quantity, and invoice dropzone.
- **Item**: Master catalog displaying live `Available Quantity` counters across institutional assets.
- **Item Category**: Split 2-column asset taxonomy (*Electronics*, *Lab Equipment*, *Sports Goods*, *Stationery*).
- **Item Store**: Split 2-column warehouse and stockroom registry (*Main Store*, *Science Lab Store*).
- **Item Supplier**: Vendor and procurement contact directory.

#### 25. Student CV (`contact_page` / `badge`) — `/super-admin/student-cv`
- **Build CV**: Top criteria filter card with student portfolio generation desk (Generate, View, Print CV).
- **Download CV / Setting**: Section toggle matrix (Profile, Academic Progress, Attendance, Awards, Seal).

#### 26. Transport (`directions_bus`) — `/super-admin/transport`
- **Fees Master**: 12-month transit fee schedule with mass copy trigger (`Copy First Fees Detail For All Months`).
- **Pickup Point**: High-precision GPS geofencing manager (14 decimal places) with coordinate map viewers.
- **Routes**: Transit route directory (*Route 1 - Downtown*, *Route 2 - North Suburbs*).
- **Vehicles**: Commercial vehicle fleet registry (Vehicle No, Vehicle Model, Driver License, Capacity).
- **Assign Vehicle**: Vehicle-to-route assignment scheduler.
- **Route Pickup Point**: Route sequence ordering with transit distances and morning/evening pickup times.
- **Student Transport Fees**: Student transit billing counter with monthly fee collection and receipts.

#### 27. Hostel (`apartment` / `hotel`) — `/super-admin/hostel`
- **Hostel Rooms**: Split 2-column room inventory manager with bed count and periodic tariffs (`Cost Per Bed`).
- **Room Type**: Room classification taxonomy (*One Bed*, *Two Bed AC*, *Two Bed*, *One Bed AC*, *Combine Bed*).
- **Hostel**: Building facility registry with gender partitioning (*Boys Hostel*, *Girls Hostel*, *Combine*).

#### 28. Certificate (`workspace_premium` / `verified`) — `/super-admin/certificate`
- **Transfer Certificate**: Statutory School Leaving Transfer Certificate clearance engine.
- **Student Certificate**: Visual certificate layout builder with 20+ dynamic token chips (`[name]`, `[dob]`).
- **Generate Certificate**: Batch PDF certificate compilation and generation desk.
- **Student ID Card**: Student ID badge designer with barcode/QR code integration and layout toggles.
- **Generate ID Card**: Bulk student ID card PDF export tool.
- **Staff ID Card**: Faculty ID badge designer with department and employee code chips.
- **Generate Staff ID Card**: Bulk faculty ID card PDF export tool.

#### 29. Front CMS (`language` / `public`) — `/super-admin/front-cms`
- **Event**: Public school events calendar with start/end dates and venue mapping.
- **Gallery**: Multimedia photo album gallery manager with responsive photo grids.
- **News**: Editorial press release and newsletter publication engine.
- **Media Manager**: Centralized media storage bucket with local file upload or YouTube embed links.
- **Pages**: Custom website CMS page builder with safeguards on core pages (`Home`, `Contact us`, `404`).
- **Menus**: Dual-menu navigation builder (*Main Menu* vs. *Bottom Menu*) with nested drag-and-drop trees.
- **Banner Images**: Homepage carousel banner manager with slide ordering and caption text.

#### 30. Alumni (`diversity_3` / `groups`) — `/super-admin/alumni`
- **Manage Alumni**: Graduate directory tracking pass-out session cohorts and current professions.
- **Events**: Split-screen reunion event planner featuring an interactive monthly calendar grid and ledger.

#### 31. Reports (`analytics` / `query_stats`) — `/super-admin/reports`
- **Student Information Reports**: 13 reports (Class/Section, Guardian, Category, Admission, Sibling reports).
- **Finance Reports**: 15 reports (Balance Sheet, Daily Collection, Due Fees, Income vs Expense, Fee Receipts).
- **Attendance Reports**: 7 reports (Daily Attendance, Attendance By Date, Staff Attendance, Leave Summary).
- **Examinations Reports**: Assessment results, rank calculations, and marksheet generation logs.
- **Online Examinations Reports**: CBT test results, student attempt tracking, and score percentile ranks.
- **Lesson Plan Reports**: Teacher syllabus progress and lesson completion audits.
- **Human Resource Reports**: Payroll disbursement logs, staff directory listings, and evaluation ratings.
- **Homework Reports**: Class assignment submission percentages and evaluation logs.
- **Library Reports**: Book circulation history, book inventory status, and overdue fine ledgers.
- **Inventory Reports**: Stock replenishment history, asset issuance records, and supplier purchasing logs.
- **Transport Reports**: Route passenger manifests, vehicle capacity utilization, and transit fee collection.
- **Hostel Reports**: Bed occupancy reports, room allocation lists, and fee collection summaries.
- **Alumni Reports**: Graduate career directories and reunion attendance manifests.
- **User Log**: Security audit trail recording user IP addresses, browser agents, and login timestamps.
- **Audit Trail Report**: Entity mutation logs tracking every Add, Edit, and Delete action performed in the system.

#### 32. System Setting (`settings` / `tune`) — `/super-admin/system-setting`
- **General Setting**: 14 internal sub-menus (Logo, Login Background, Theme, Mobile App, Student/Guardian Panel, Fees, ID Auto Gen, Attendance Type, Google Drive, WhatsApp, Chat, Maintenance, Misc, Profile).
- **Session Setting**: 14 academic sessions matrix with active indicator.
- **Notification Setting**: Event-driven notification triggers (Admission, Fees, Exams, Absenteeism).
- **Whatsapp Messaging**: Meta Official WhatsApp Cloud API vs. Twilio credentials.
- **SMS Setting**: 12 international SMS gateways (Twilio, Clickatell, MSG91, Textlocal, etc.).
- **Email Setting**: SMTP, SendGrid, Amazon SES, and generic mail server credentials.
- **Payment Methods**: Payment gateways (Stripe, PayPal, ABA PayWay, Wing Bank, Cash).
- **Print Header Footer**: 6 document types letterhead layout designer.
- **Thermal Print**: 58mm / 80mm POS receipt printer configuration.
- **Front CMS Setting**: Website theme selection, SEO meta tags, and favicon upload.
- **Roles Permissions**: Granular RBAC matrix (34 modules x View/Add/Edit/Delete rights).
- **Backup Restore**: Disaster recovery database snapshot and restore engine.
- **Languages**: Multi-language dictionary manager with active language toggles.
- **Currency**: Multi-currency exchange rate matrix and default currency definition.
- **Addons**: 11 modular software add-ons activation switches.
- **Users**: Staff, student, and parent user account security administration.
- **Modules**: Global system feature toggle switches (Enable/Disable entire modules).
- **Custom Fields**: Dynamic user-defined field constructor for Students, Staff, and Inquiries.
- **Captcha Setting**: Google reCAPTCHA v2 / v3 and mathematical captcha settings.
- **System Fields**: Visibility and requirement toggles for standard system form fields.
- **Student Profile Update**: Self-service profile editing permission rules for students/parents.
- **Online Admission**: Public online enrollment terms, admission fee rules, and mandatory documents.
- **File Types**: Upload extension whitelist and maximum file size byte limits.
- **Sidebar Menu**: Drag-and-drop ordering and visibility manager for the left sidebar accordion.
- **System Update**: One-click OTA software version update engine (`Current: 7.2.0`).

---

### 2. The Top Header Navigation Controls

1. **Global Search Bar**: Auto-complete student search query box.
2. **Currency Switcher**: Active currency dropdown (`USD`, `KHR`, `EUR`, `GBP`).
3. **Multi-Branch Context Switcher**: Campus selector (Universal View vs. Specific Campus).
4. **Header Quick Action Glyphs**:
   - Calendar Modal: Term events and holiday schedules.
   - Task Checklist Drawer: Operational to-do task list.
   - Notification Feed Drawer: Real-time system alert feed.
   - WhatsApp Composer Modal: Parent and student communication.
5. **User Profile Dropdown Capsule**: My Profile, Change Password, Logout.

---

### 3. Quick Links Megamenu (5-Column Directory)

- **Column 1**: Academics, Alumni, Annual Calendar, Attendance, Behaviour Records, CBSE Examination.
- **Column 2**: Certificate, Communicate, Download Center, Examinations, Expenses, Fees Collection.
- **Column 3**: Front CMS, Front Office, Gmeet Live Classes, Homework, Hostel, Human Resource.
- **Column 4**: Income, Inventory, Lesson Plan, Library, Multi Branch, Online Course, Online Examinations, QR Code Attendance, Reports, Student CV.
- **Column 5**: Student Information, System Setting, Transport, Zoom Live Classes.
