---
name: smart-school-cambodia-localized-sms
description: Authoritative Specification for the Cambodia EdTech Ecosystem & Localized School Management System (SMS) across Schools, Colleges, Institutes, and Universities. Enforces the What, Why, Where & How architectural framework, MoEYS curriculum alignment, dual-currency KHR/USD billing, Bakong KHQR integration, Moul and Google Sans Khmer typography, and city distributor support networks across Phnom Penh, Siem Reap, Battambang, Sihanoukville, and Kampong Cham.
---

# Cambodia EdTech Ecosystem & Localized SMS Specification
## The "What, Why, Where & How" Architecture for Schools, Colleges, Institutes & Universities in Cambodia (ABLOB Architecture)

### Executive Architecture Overview

The **Smart School Enterprise Platform (GeniusEdu Cambodia Edition)** provides a sovereign, cloud-native educational Enterprise Resource Planning (ERP) suite tailored to the institutional, linguistic, and regulatory realities of the Kingdom of Cambodia.

This specification establishes the authoritative engineering definitions for:
1. **The Core Architectural Framework ("What, Why, Where & How")**: Structuring every module by what to have, why it exists, where it is placed, and how it works.
2. **The 4 Educational Institutional Tiers in Cambodia**:
   - **School SMS**: General K-12 education (Primary, Lower Secondary, Upper Secondary) aligned with the Ministry of Education, Youth and Sport (MoEYS).
   - **College SMS**: Undergraduate and Technical & Vocational Education and Training (TVET) institutions.
   - **Institute SMS**: Specialized language, technical, vocational, and professional training academies.
   - **University SMS**: Multi-faculty comprehensive universities with credit accumulation and research tracks.
3. **Cambodian City Distributor Support Network**: On-site technical consulting, administrator training, and localized support operations across Phnom Penh, Siem Reap, Battambang, Sihanoukville, and Kampong Cham.
4. **National Financial & Linguistic Localization**: Dual-currency billing in Cambodian Riel (KHR `៛`) and US Dollar (`$`), automated Bakong KHQR / ABA PayWay / Wing Bank settlement, and the Three-Font typographic standard (Ubuntu, Google Sans Khmer, Moul).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│             CAMBODIA EDTECH ECOSYSTEM: 4 INSTITUTIONAL TIERS                           │
├───────────────────────────┬───────────────────────────┬────────────────────────────────┤
│ 1. SCHOOL SMS (K-12)      │ 2. COLLEGE SMS (TVET)     │ 3. INSTITUTE SMS               │
├───────────────────────────┼───────────────────────────┼────────────────────────────────┤
│ • MoEYS 1-12 Curriculum   │ • Associate & Bachelor Deg│ • Specialized Certificates     │
│ • Bilingual Khmer/English │ • Credit-Semester Systems │ • Modular Fast-Track Programs  │
│ • Sub-45s Roll-Calls      │ • Class Schedule Matrix   │ • Corporate Sponsor Billing    │
│ • Moul Ministry Diplomas  │ • Faculty Teaching Loads  │ • Flexible Shift Timetables    │
├───────────────────────────┴───────────────────────────┴────────────────────────────────┤
│ 4. UNIVERSITY SMS (HIGHER EDUCATION SYSTEMS)                                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • Multi-Faculty Administration • Credit Accumulation & Transfer System (CATS)          │
│ • Thesis, Defense & Research Milestone Tracking • Degree Audit & Graduation Engine     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. CAMBODIAN LOCALIZATION & CITY DISTRIBUTOR SUPPORT NETWORK                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • Cities: Phnom Penh • Siem Reap • Battambang • Sihanoukville • Kampong Cham           │
│ • Payments: National Bakong KHQR • ABA PayWay • Wing Bank • Dual KHR/USD Pricing       │
│ • Typography: Moul (Formal Diplomas) • Google Sans Khmer (Modern UI) • Ubuntu (EN)     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. The "What, Why, Where & How" Module Architectural Blueprint

### 1.1 Academic Management
- **WHAT TO HAVE**:
  - Multi-tier course, subject, department, programme, and semester configuration catalogs.
  - Conflict-free Monday-to-Saturday period scheduling matrix with room and teacher allocations.
  - Syllabus completion tracking with visual teacher progress meters and lesson topic breakdown.
  - Academic calendar sync marking MoEYS national holidays (Pchum Ben, Khmer New Year, Water Festival).
- **WHY IT EXISTS**:
  - Eliminates classroom booking clashes, ensures full syllabus completion prior to national BacII examinations, and standardizes academic pacing across multi-campus networks.
- **WHERE IT IS PLACED**:
  - *Route*: `/academics/master-catalog`, `/academics/timetable-generator`, `/academics/syllabus-progress`.
  - *Layout Archetype*: Archetype B (Criteria Filter + Schedule Matrix) and Archetype C (Media Card Grid).
  - *Database Entities*: `academic_years`, `programmes`, `semesters`, `courses`, `syllabus_topics`.
- **HOW IT WORKS**:
  - When an academic year is initialized, the system clones course prerequisites. Administrators configure periods per day and room capacities. The scheduling engine runs an algorithmic collision check across teacher availability and room allocations, committing only zero-conflict timetables.

### 1.2 Student Management
- **WHAT TO HAVE**:
  - Student 360 dossiers from admission to graduation (demographics, family trees, health records).
  - General Register (GR) numbering with barcode / QR-embedded PVC student ID card generation.
  - Automated batch student promotion across academic sessions with holdover exceptions.
  - Student remarks ledger recording academic commendations and behavioral disciplinary notes.
  - Alumni association portal tracking graduate higher-education paths and career placements.
- **WHY IT EXISTS**:
  - Provides a single source of truth for student records, reduces administrative paper overhead by 70%, guarantees lifetime transcript traceability, and streamlines MoEYS census reporting.
- **WHERE IT IS PLACED**:
  - *Route*: `/students/profile/[id]`, `/students/promotion-desk`, `/students/id-card-builder`.
  - *Layout Archetype*: Archetype B (Select Criteria Card + Data Table) and Archetype E (Visual Canvas Builder).
  - *Database Entities*: `students`, `student_dossiers`, `general_registers`, `alumni_records`.
- **HOW IT WORKS**:
  - Applicant records approved in admissions automatically convert to active student profiles with unique GR numbers. Every attendance event, examination mark, and fee payment binds to the student UUID under PostgreSQL Row-Level Security (`branch_id`).

### 1.3 Transportation, Library & Hostel Management
- **WHAT TO HAVE**:
  - *Transportation*: Vehicle fleet master, driver licenses, geocoded route stops, and sub-5s live GPS tracking with 1km geofence parent push alerts.
  - *Library*: MARC-21 compliant book catalog, barcode/RFID issue-return desk, digital library e-books, and overdue fine management.
  - *Hostel*: Multi-building block/room allocation, gender-segregated dormitories, biometric curfew verification, and visitor gate pass logs.
- **WHY IT EXISTS**:
  - Ensures student transit safety, encourages reading culture through self-service OPAC catalogs, and provides secure residential boarding management for provincial students studying in city hubs.
- **WHERE IT IS PLACED**:
  - *Route*: `/logistics/transport-gps`, `/logistics/library-circulation`, `/logistics/hostel-dormitory`.
  - *Layout Archetype*: Archetype A (Split 2-Column Master-Detail) and Archetype G (Executive Telemetry Map).
  - *Database Entities*: `vehicles`, `transport_routes`, `library_books`, `hostel_rooms`, `gate_passes`.
- **HOW IT WORKS**:
  - Bus GPS telemetry streams via MQTT/WebSockets into the parent mobile app. Library circulation scans barcodes to debit student borrow allowances. Hostel gates utilize RFID turnstiles to log nightly curfew presence.

### 1.4 Examination Management
- **WHAT TO HAVE**:
  - Algorithmic Question Paper Generator pulling from Bloom's taxonomy item banks.
  - Dual-mode assessment engine: Online Computer-Based Testing (CBT) with 15s autosave and Offline Paper Exams.
  - Automated hall ticket / admit card generation with student photos and seat allocations.
  - Multi-curriculum gradebooks: MoEYS Cambodian grading (Grade A-F, Table of Excellence), Cambridge (A*-G), IB (1-7), and 4.0 GPA.
  - Formal transcript generation featuring Ministry Moul header fonts and bilingual layout.
- **WHY IT EXISTS**:
  - Eliminates human calculation errors in grade point averages, prevents test paper leakage, and ensures standardized assessment integrity.
- **WHERE IT IS PLACED**:
  - *Route*: `/exams/question-generator`, `/exams/cbt-engine`, `/exams/marksheet-canvas`.
  - *Layout Archetype*: Archetype D (Multi-Tab Blueprint Sliders) and Archetype E (Marksheet Canvas).
  - *Database Entities*: `exam_groups`, `question_bank`, `cbt_attempts`, `student_marks`, `transcripts`.
- **HOW IT WORKS**:
  - Teachers select question tags and difficulty ratios; the generator compiles test papers and answer keys in PDF. During CBT, answers autosave every 15s. Final marks post to student dossiers and trigger SMS grade alerts to parents.

### 1.5 Payroll & Finance Management
- **WHAT TO HAVE**:
  - Double-entry accounting kernel: Day Book, Cash Book, Bank Book, General Ledger, Trial Balance, P&L, Balance Sheet.
  - Dual-currency billing (KHR `៛` and USD `$`) with real-time National Bank of Cambodia (NBC) exchange rates.
  - Payment gateway checkouts integrating National Bakong KHQR, ABA PayWay, and Wing Bank.
  - Automated monthly payroll engine computing earnings, deductions, National Social Security Fund (NSSF) contributions, and salary tax withholdings.
- **WHY IT EXISTS**:
  - Complies with Cambodian statutory accounting standards (CAS), simplifies multi-currency cash collections, and automates tax and NSSF compliance for faculty and staff.
- **WHERE IT IS PLACED**:
  - *Route*: `/finance/general-ledger`, `/finance/fee-cashier`, `/finance/payroll-engine`.
  - *Layout Archetype*: Archetype A (Cashier Desk) and Archetype B (General Ledger Data Grid).
  - *Database Entities*: `chart_of_accounts`, `general_ledger_entries`, `fee_invoices`, `payroll_records`.
- **HOW IT WORKS**:
  - Invoices generate in dual currencies. Parents scan a dynamic Bakong KHQR code to settle instantly via mobile banking. The webhook updates invoice status, writes a double-entry journal voucher, and issues an e-receipt.

---

## 2. The 4 Cambodian Institutional Tiers

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│              INSTITUTIONAL SPECIALIZATION MATRIX ACROSS CAMBODIA                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 1: SCHOOL STUDENT MANAGEMENT SYSTEM (K-12 CAMBODIA)                               │
│ - Grade 1 to 12 MoEYS curriculum alignment alongside Cambridge / IB international tracks│
│ - Bilingual Khmer/English monthly progress cards with student conduct marks            │
│ - Triplicate fee challans and Bakong KHQR counter payment slips                        │
│ - High School Diploma (BacII) graduation candidacy tracking and certificate printing   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 2: COLLEGE STUDENT MANAGEMENT SYSTEM (UNDERGRADUATE & TVET)                       │
│ - Course offerings, credit semester modules, and technical workshop safety logs        │
│ - Class schedule collision detection and faculty teaching load balancing               │
│ - Vocational competency assessment rubrics aligned with National Quality Framework     │
│ - Internship and practical industry apprenticeship placement monitoring                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 3: INSTITUTE STUDENT MANAGEMENT SYSTEM (SPECIALIZED TRAINING)                     │
│ - Modular short courses (Language academies, IT certification, Corporate training)     │
│ - Flexible shift management (Morning, Afternoon, Evening, Weekend cohorts)             │
│ - Corporate sponsor invoicing and third-party tuition voucher clearinghouse            │
│ - Rapid certificate issuance with verifiable public QR validation URLs                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 4: UNIVERSITY STUDENT MANAGEMENT SYSTEM (HIGHER EDUCATION)                        │
│ - Multi-faculty governance (Faculty of Engineering, Business, Law, Science, Arts)      │
│ - Credit Accumulation & Transfer System (CATS) with GPA / CGPA computation             │
│ - Master & Doctoral thesis proposal, supervisor allocation, and defense scoring        │
│ - Comprehensive degree audit verifying graduation credit requirements                  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Cambodian City Distributor Network & Support Architecture

To ensure flawless operational execution and deep local knowledge transfer, the platform is backed by **dedicated physical distributor and technical support hubs** in Cambodia's 5 primary economic centers:

1. **Phnom Penh (National Headquarters & Central NOC)**:
   - Primary data center interconnect, ministry liaison desk, tier-3 engineering escalations, and national enterprise implementations.
2. **Siem Reap (Northern & Heritage Zone Hub)**:
   - Regional support center serving public and private schools, tourism institutes, and international academies across Siem Reap, Oddar Meanchey, and Preah Vihear.
3. **Battambang (Northwestern Agricultural & Academic Hub)**:
   - On-site deployment and training center supporting provincial universities, TVET agricultural colleges, and secondary schools.
4. **Sihanoukville (Coastal & Special Economic Zone Hub)**:
   - Maritime, logistics, and hospitality institute management support covering Preah Sihanouk, Koh Kong, and Kampot.
5. **Kampong Cham (Eastern Mekong Regional Hub)**:
   - Teacher training college support, district educational administration governance, and community school digitization.

### Distributor Responsibilities Codified:
- On-site administrator and teacher training in the Khmer language.
- Localized deployment assistance and hardware turnstile / biometric scanner configuration.
- Ongoing tier-1 and tier-2 help desk support with sub-1 hour response times.
- System customization assistance tailored to specific provincial educational guidelines.

---

## 4. Cambodian Localization Standards

### 4.1 Financial Localization
- **Dual-Currency Invoicing**: All student invoices, receipts, and cashier screens display amounts in both KHR (`៛`) and USD (`$`) using the configurable institutional or official NBC exchange rate (e.g., `1 USD = 4,050 KHR`).
- **Payment Gateway Adapters**:
  - `BakongKhqrGateway`: Generates National Bank of Cambodia standard KHQR strings for universal mobile banking apps.
  - `AbaPaywayGateway`: Deep integration with ABA Mobile push payments and credit card checkout.
  - `WingBankGateway`: Cash counter agent code generation and Wing mobile wallet payments.

### 4.2 Typographic & Linguistic Standards
- **Google Sans Khmer**: Mandated for all digital user interfaces, form labels, data grids, buttons, and navigation menus to ensure crisp legibility on high-DPI mobile screens.
- **Moul Font**: Mandated for official Ministry of Education certificate titles, diplomas, and institutional marksheet letterheads.
- **Zero Word Breakage**: Khmer text wrapping MUST utilize zero-width space (`\u200B`) segmentation or dictionary-based line breaking to prevent severed syllables.

---

## 5. Implementation Quality Gates & Compliance Checklist

- [x] **What, Why, Where & How Codified**: Full architectural blueprint documented for all 5 module clusters.
- [x] **4 Cambodian Institutional Tiers Specified**: School (K-12), College (TVET), Institute, University.
- [x] **City Distributor Network Mapped**: Phnom Penh, Siem Reap, Battambang, Sihanoukville, Kampong Cham.
- [x] **Dual-Currency Billing Enforced**: KHR Riel and USD dual pricing with spot exchange rate support.
- [x] **Cambodian Payment Gateways Defined**: Bakong KHQR, ABA PayWay, Wing Bank.
- [x] **Khmer Typographic Standard Enforced**: Google Sans Khmer for UI, Moul for diplomas, Ubuntu for English.
- [x] **Strict Zero Emoji Enforcement**: 100% compliant across all specifications, tables, and schemas.
- [x] **Google Material Symbols Standard**: Outlined weight 500 applied across all UI elements.
