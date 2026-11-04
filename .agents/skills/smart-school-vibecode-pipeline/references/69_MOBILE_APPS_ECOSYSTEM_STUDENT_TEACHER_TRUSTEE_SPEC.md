---
name: smart-school-mobile-apps-ecosystem
description: Authoritative Architecture, Real-Time Ingress, UI/UX Standards, and Technical Specifications for the Smart School Mobile Applications Ecosystem across three core stakeholder roles - Student / Parent Mobile App (9 features), Teacher Mobile App (9 features), and Trustee / Principal Executive Mobile App (6 features). Enforces strict zero-emoji compliance, Liquid Glass design DNA, FCM/APNs push pipelines, offline synchronization, and biometrics authentication.
---

# Smart School Mobile Applications Ecosystem Specification
## Student / Parent, Teacher & Trustee / Principal Native Apps (ABLOB Architecture)

### Executive Architecture Overview

The **Smart School Mobile Applications Ecosystem** provides native cross-platform mobile experiences (iOS via Swift / SwiftUI, Android via Kotlin / Jetpack Compose, and cross-platform React Native / Flutter engines) connected seamlessly to the Spring Boot 3 Virtual Threads backend, Neon PostgreSQL multi-tenant database, and Kafka event topology.

The ecosystem is partitioned into three dedicated application personas, each tailored to distinct operational workflows:
1. **Student / Parent Mobile App**: Empowering continuous home-school collaboration, real-time student monitoring, fee settlement, academic schedules, and transit telemetry.
2. **Teacher Mobile App**: Streamlining classroom operations, roll-call attendance, assignment distribution, exam marking, lesson planning, and parent communications from mobile devices.
3. **Trustee / Principal Executive Mobile App**: Delivering real-time institutional intelligence, cross-campus fee recovery metrics, faculty/student attendance telemetry, task supervision, and emergency communication channels.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                     SMART SCHOOL MOBILE ECOSYSTEM TOPOLOGY                             │
├───────────────────────────┬───────────────────────────┬────────────────────────────────┤
│ STUDENT / PARENT APP      │ TEACHER MOBILE APP        │ TRUSTEE / PRINCIPAL APP        │
├───────────────────────────┼───────────────────────────┼────────────────────────────────┤
│ 1. Classwork / Homework   │ 1. Attendance & Messaging │ 1. Class/Stream Fees Status    │
│ 2. Online Exam & CBT      │ 2. Online Exam & Results  │ 2. Faculty/Student Attendance  │
│ 3. Assignment & Materials │ 3. Task & Event Mgmt      │ 3. Day-to-Day Staff Activity   │
│ 4. Fees Mgmt & E-Challan  │ 4. Homework Uploading     │ 4. Task Allocation Telemetry   │
│ 5. Student & Bus Tracking │ 5. Question Paper Gen     │ 5. Events, News & Circulars    │
│ 6. Syllabus & Achievements│ 6. Timetable & Gallery    │ 6. Executive Instant Messaging │
│ 7. Attendance & Messaging │ 7. Assign Syllabus & Notes│                                │
│ 8. Timetable, Library/Res │ 8. Lesson & Circulars     │                                │
│ 9. Hostel & Food Menu     │ 9. Location & Media Feeds │                                │
├───────────────────────────┴───────────────────────────┴────────────────────────────────┤
│ INGRESS & GATEWAY: AWS API Gateway / Istio Service Mesh (mTLS + RS256 Nimbus JWT)       │
│ REAL-TIME EVENT STREAM: Firebase Cloud Messaging (FCM) + Apple Push Notifications (APNs)│
│ TELEMETRY PROTOCOL: MQTT v5.0 / WebSockets (STOMP) for Bus GPS & Live Turnstile Passes  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Student / Parent Mobile App Architecture (9 Core Features)

### Feature 1.1: Classwork & Homework Hub
- **Description**: Real-time visibility into daily classroom instruction and homework tasks assigned by subject educators.
- **Data Payload**: Subject name, topic, detailed instructions, due date, maximum score, attached multimedia (PDF, JPG, MP4), and submission status (`Pending`, `Submitted`, `Evaluated`, `Late`).
- **Student Capabilities**:
  - Direct camera capture of written homework sheets with automatic document edge detection and perspective correction.
  - Multi-file attachment upload buffered to S3 object storage via presigned URLs.
  - Push notification alerts triggered at 17:00 local time if assignments remain pending for the next calendar day.
- **Parent Capabilities**:
  - Read-only audit of student submissions, teacher feedback comments, and completion timestamps.

### Feature 1.2: Online Exam & CBT Question Paper Generator
- **Description**: Mobile-optimized Computer-Based Testing (CBT) engine and self-evaluation practice suite.
- **Capabilities**:
  - Time-bounded assessments with anti-cheat screen lock and focus loss detection.
  - Interactive multi-format questions: Single Choice, Multiple Choice, True/False, and Short Descriptive with image upload.
  - Automated client-side autosave every 15 seconds to local SQLite storage to guard against erratic cellular connections.
  - Instant scoring and detailed answer explanations upon submission for formative assessments.

### Feature 1.3: Assignment & Study Material Vault
- **Description**: Categorized digital repository of lecture notes, curriculum guides, audio clips, and reference documents.
- **Capabilities**:
  - Offline caching allowing students to download textbook chapters, worksheets, and study notes for offline study.
  - Full-text search with instant filtering by subject, academic term, and chapter number.

### Feature 1.4: Scholarship & Online / Offline Fees Management
- **Description**: End-to-end fee accounting, concession status, digital payment, and e-challan generation.
- **Capabilities**:
  - Real-time balance breakdown: Tuition, Term, Laboratory, Transport, Hostel, and Extracurricular fees.
  - Scholarship concession visibility: Approved percentage/amount, sponsoring trust, and remaining deductible balance.
  - Multi-gateway integrated checkout supporting credit/debit cards, net banking, UPI, and local wallets (ABA PayWay, Wing Bank, Stripe, Razorpay).
  - 1-Click PDF E-Challan generation with automated QR/barcodes for counter deposit at designated commercial banks.
  - Offline bank deposit slip uploader allowing parents to photograph wire slips for administrative reconciliation.
  - Instant downloadable, cryptographically signed tax-compliant digital fee receipts.

### Feature 1.5: Student & Vehicle Tracking (Live Transit Telemetry)
- **Description**: Live GPS school bus tracking and geofenced student pickup/dropoff verification.
- **Capabilities**:
  - Interactive map view displaying real-time bus location, vehicle speed, estimated time of arrival (ETA), and route itinerary.
  - Automated geofence perimeter alerts notifying parents when the transit vehicle is within 1 km (5 minutes) of the student's designated pickup point.
  - Student boarding/deboarding RFID turnstile events logged in real time with timestamp, gate location, and security guard ID.

### Feature 1.6: Syllabus, Achievement & Events Timeline
- **Description**: Comprehensive tracking of academic curriculum completion and co-curricular accolades.
- **Capabilities**:
  - Interactive topic completion percentage bars per subject.
  - Digital Trophy Room showcasing sports medals, science fair citations, academic honors, and behavioral merit badges.
  - Campus Event Calendar with 1-click "Add to Google/Apple Calendar" integration.

### Feature 1.7: Attendance Telemetry & Direct Teacher Messaging
- **Description**: Daily presence transparency and encrypted two-way parent-teacher dialogue.
- **Capabilities**:
  - Color-coded calendar presence register: Present (Emerald Green), Absent (Crimson Red), Late (Amber Orange), Half-Day (Sky Blue), Holiday (Slate Gray).
  - Push notification dispatched at 08:30 if student is marked absent or fails to scan turnstile RFID tag.
  - In-app threaded messaging with class teachers and subject instructors with office-hours enforcement.

### Feature 1.8: Timetable, Library Circulation & Academic Results
- **Description**: Daily period schedule, library book circulation tracker, and formal report card downloads.
- **Capabilities**:
  - Daily dynamic timetable widget highlighting the currently active classroom period and teacher.
  - Library book loan status showing borrowed titles, issue dates, due dates, and accumulated overdue fines.
  - Formal terminal report cards with class rankings, GPA bell curves, teacher remarks, and digital crest.

### Feature 1.9: Hostel & Food Menu Boarding Management
- **Description**: Residential boarding services and weekly dietary nutrition tracking.
- **Capabilities**:
  - Weekly rotational dining menu: Breakfast, Lunch, High Tea, Dinner with allergen tags.
  - Hostel warden contact directory, room inventory details, and laundry scheduling.
  - Parent outpass / gate leave request workflow with warden approval verification.

---

## 2. Teacher Mobile App Architecture (9 Core Features)

### Feature 2.1: Classroom Attendance Roll-Call & Messaging
- **Description**: Rapid mobile presence marking and direct broadcast messaging to class sections.
- **Capabilities**:
  - Single-swipe bulk roll call: "Mark All Present" default with 1-tap toggling to Absent or Late.
  - Offline-first attendance caching with automatic background synchronization upon network reconnection.
  - Section-wide announcement composer with push notification and SMS fallback dispatch.

### Feature 2.2: Online Exam Grading & Result Publishing
- **Description**: Mobile evaluation desk for subjective exam answers and score moderation.
- **Capabilities**:
  - Split-screen interface displaying student submission alongside evaluation rubric and score input pads.
  - Batch result approval and 1-click publishing triggering parent notifications.

### Feature 2.3: Task & Event Management
- **Description**: Faculty administrative task delegation and school calendar coordination.
- **Capabilities**:
  - Personal task checklist with due dates, priority tags (`Urgent`, `High`, `Normal`), and status tracking.
  - Invigilation duties, playground monitoring, and committee meeting schedule reminders.

### Feature 2.4: Classwork & Homework Uploading Desk
- **Description**: Rapid authoring and multimedia assignment distribution from mobile cameras.
- **Capabilities**:
  - Multi-section distribution: Assign homework to multiple class sections with a single tap.
  - Direct camera capture of whiteboard notes, laboratory diagrams, or textbook exercises.
  - Scheduling engine: Author homework during planning periods and schedule automated publishing.

### Feature 2.5: Question Paper Generator
- **Description**: On-the-go test paper authoring from institutional question repositories.
- **Capabilities**:
  - Filter question repository by Subject, Grade, Chapter, Bloom's Taxonomy Level (Remember, Understand, Apply, Analyze), and Question Type.
  - Automatic test paper compilation with customizable marks distribution and answer key export.

### Feature 2.6: Timetable & Campus Image Gallery
- **Description**: Faculty personal teaching load schedule and institutional photo archive.
- **Capabilities**:
  - Weekly personal teaching schedule highlighting free periods and room assignments.
  - Secure photo upload desk allowing teachers to capture and upload classroom activities directly to the campus gallery.

### Feature 2.7: Assign Syllabus & Study Material Distribution
- **Description**: Curriculum tracking and study asset provisioning.
- **Capabilities**:
  - Mark syllabus milestones as `Completed` with lecture delivery dates.
  - Distribute supplementary PDF documents, web links, and video lecture embeds directly to class rosters.

### Feature 2.8: Lesson Plans, Circulars & Timetable
- **Description**: Structured pedagogical planning and institutional circular acknowledgments.
- **Capabilities**:
  - Daily lesson plan templates: Learning Objectives, Teaching Aids, Instructional Methodology, Assessment.
  - Official administrative circulars desk requiring mandatory read-acknowledgment signatures.

### Feature 2.9: Geo-Location & Social Media Coordination
- **Description**: Campus location services and coordinated social media event sharing.
- **Capabilities**:
  - Geo-fenced faculty clock-in verification confirming physical presence on campus.
  - One-tap authorized photo submission to school communications team for Facebook and social feeds.

---

## 3. Trustee / Principal Executive Mobile App (6 Oversight Features)

### Feature 3.1: Multi-Stream Fee Collection & Delinquency Telemetry
- **Description**: Executive real-time financial dashboard across all classes, sections, and academic streams (Science, Commerce, Arts).
- **Telemetry Visualizations**:
  - High-level KPI cards: Total Billed, Total Collected Today, Month-to-Date Collections, Total Delinquent / Outstanding.
  - Breakdown by Stream & Section: Tap any grade level to reveal collected percentages and overdue aging buckets (30, 60, 90+ days).
  - Real-time incoming fee transaction feed with student name, receipt number, and payment mode.

### Feature 3.2: Daily / Weekly / Monthly Attendance Telemetry
- **Description**: Cross-campus attendance intelligence for both faculty staff and student cohorts.
- **Telemetry Visualizations**:
  - Live morning attendance rate gauge updating every 60 seconds as roll-calls conclude.
  - Comparative trends: Weekly and monthly moving average attendance curves.
  - Disaggregated demographic metrics: Gender attendance comparison (Male vs. Female) and branch comparisons.

### Feature 3.3: Day-to-Day Teacher Activity & Performance Monitoring
- **Description**: Executive audit of instructional fidelity and classroom operational adherence.
- **Capabilities**:
  - Daily lecture completion rate: Percentage of scheduled periods successfully delivered on time.
  - Syllabus pacing index: Tracking whether curriculum milestones match academic calendar timelines.
  - Homework evaluation turnaround time metrics per department and teacher.

### Feature 3.4: Task Allocation & Committee Supervision
- **Description**: High-level delegation and oversight of institutional initiatives and campus operations.
- **Capabilities**:
  - Overview of all delegated administrative tasks across Vice-Principals, Deans, HODs, and facility teams.
  - Milestone progress bars with overdue red alert indicators.

### Feature 3.5: Executive Events, News & Circular Broadcast Desk
- **Description**: Sovereign authorization and broadcasting of institutional announcements.
- **Capabilities**:
  - 1-Click emergency campus broadcast dispatching simultaneous push notifications, SMS messages, and emails.
  - Review and approval of administrative circulars prior to public or parent distribution.

### Feature 3.6: Sovereign Executive Direct Messaging
- **Description**: Direct, confidential communication channels from the Trustee/Principal to any faculty member, student, or parent.
- **Capabilities**:
  - Priority badge delivery bypassing normal chat restrictions.
  - Read receipts and audit logging with strict encryption.

---

## 4. Mobile API Contract Specifications

### 4.1 Mobile Authentication & Biometrics Token Exchange
- **Route**: `POST /api/v1/mobile/auth/login`
- **Request Body**:
```json
{
  "username": "student2026@school.edu",
  "password": "SecurePassword123!",
  "deviceInfo": {
    "deviceId": "d8f3e2b1-5678-4321-abcd-ef0123456789",
    "platform": "IOS",
    "osVersion": "18.2",
    "appVersion": "3.4.0",
    "fcmToken": "fcm-device-registration-token-string"
  }
}
```
- **Response Payload (HTTP 200 OK)**:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJSUzI1NiIs...",
    "expiresIn": 86400,
    "userProfile": {
      "userId": "usr_9981",
      "role": "STUDENT",
      "firstName": "Sokha",
      "lastName": "Chan",
      "branchId": "br_siem_reap_01",
      "avatarUrl": "https://cdn.school.edu/avatars/sokha.webp",
      "associatedStudentIds": ["stu_1001"]
    }
  }
}
```

### 4.2 Real-Time Transit Bus Location Ingress (MQTT / WebSocket)
- **Topic**: `school/{branchId}/fleet/{vehicleId}/telemetry`
- **Payload Schema**:
```json
{
  "vehicleId": "bus_014",
  "routeId": "rt_morning_04",
  "latitude": 13.363328,
  "longitude": 103.856391,
  "speedKmh": 34.2,
  "heading": 182.5,
  "timestamp": "2026-09-12T08:14:22Z",
  "nextStopId": "stop_wat_bo_02",
  "etaSeconds": 180
}
```

### 4.3 Executive Financial Telemetry Summary
- **Route**: `GET /api/v1/mobile/executive/financial-summary`
- **Response Payload (HTTP 200 OK)**:
```json
{
  "success": true,
  "data": {
    "currency": "USD",
    "academicSession": "2026-27",
    "totalDemand": 450000.00,
    "totalCollected": 382500.00,
    "totalOutstanding": 67500.00,
    "collectionPercentage": 85.0,
    "todayCollection": 12450.00,
    "streamBreakdown": [
      { "stream": "Science", "demand": 200000.00, "collected": 176000.00, "pending": 24000.00 },
      { "stream": "Commerce", "demand": 150000.00, "collected": 125000.00, "pending": 25000.00 },
      { "stream": "Arts", "demand": 100000.00, "collected": 81500.00, "pending": 18500.00 }
    ]
  }
}
```

---

## 5. UI/UX Standards for Mobile Ecosystem

1. **Design DNA**: Strict Liquid Glass styling adapted for touch viewports:
   - Primary Cards: Frosted glass background `bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.06)]`.
   - Action Buttons: Tactile physical elevation with 48x48px minimum touch targets and haptic feedback on press (`UIImpactFeedbackGenerator`).
2. **Typography Hierarchy**:
   - English Labels & Data: Ubuntu (`font-sans`).
   - Khmer Localization: Google Sans Khmer (`font-khmer`) with proportional scaling.
   - Numerals & Codes: JetBrains Mono (`font-mono`).
3. **Zero Emoji Directive**: Absolute ban on emoji characters. All UI elements utilize Google Material Symbols Outlined exclusively.
4. **Offline Resiliency**:
   - Cache-first strategy for timetables, attendance history, homework instructions, and circulars using Room DB (Android) and CoreData/SwiftData (iOS).
   - Queue-and-replay worker pattern for offline roll-call submissions and student homework uploads.
