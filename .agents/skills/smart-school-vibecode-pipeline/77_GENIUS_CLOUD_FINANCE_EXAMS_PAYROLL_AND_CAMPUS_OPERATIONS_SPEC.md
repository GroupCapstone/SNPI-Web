---
name: smart-school-advanced-finance-exams-and-operations
description: Authoritative Specification for Genius Cloud Granular Submodules across Advanced Finance (Day Book, Cash/Bank Books, General Ledger, Fixed Assets, Bank Reconciliation), Multi-Board Examination Engine (CCE, ICSE, IA Weightages, Bloom Paper Generator), Payroll & Bonus Lifecycle, Fee Refund/Advance/Concessions, Front Desk Late/Early Departure, and Store Procurement.
---

# Genius Cloud Granular Submodules Specification
## Advanced Finance, Multi-Board Examinations (CCE/ICSE/IA), Payroll & Campus Operations (ABLOB Architecture)

### Executive Architecture Overview

The **Smart School Enterprise Platform (Genius Cloud Granular Submodules)** provides institutional depth and domain specialization across financial accounting, multi-curriculum evaluation boards, workforce compensation, campus perimeter gating, and store procurement.

This specification establishes the authoritative engineering definitions for:
1. **Advanced Finance & Double-Entry Books**: Account Master, Bank/Cash/Tax Masters, Bank & Cash Transactions, Journal Vouchers, Fixed Asset Registry with depreciation schedules, and Statutory Accounting Reports (Day Book, Journal Book, Bank Book, Cash Book, General Ledger, Trial Balance, Profit & Loss, Balance Sheet, Bank Reconciliation).
2. **Event & Task Management**: Event Types, Master Event Scheduling, and Institutional Task Allocation & Tracking.
3. **Payroll & Incentive Lifecycle**: Payroll Settings, Salary Components (Earnings, Deductions), Professional Tax, Assign/Generate Salary, Salary Increments, Weekly & Festival Holidays, Bonus Allocation & Generation, Category-Wise Salary Registers, Outstanding Salary Summaries, and Payslip PDF generation.
4. **Library Maintenance Operations**: Book Categories, Search Catalog, Book Issue, Book Return, Lost Book settlements, and Book Binding lifecycles.
5. **Granular Fee Masters & Recovery**: Fee Categories, SubCategories, Receipt Headers, Fee Books, Advance Fee Heads, Concession Profiles, Late Fee Policies, Class/Student Fee Structures, Fee Refunds, Miscellaneous Collections, Advance Fee Receipts, and Deleted Receipt Audit Logs.
6. **Help Desk & Platform Administration**: IT Help Desk ticketing, System Language Translation Management, Dynamic Module Backups, and User Login Activity Telemetry.
7. **Front Desk & Security Gate Management**: Calls & Follow-Ups, Complaints, Admission Enquiries, Student Late Arrival & Early Departure Gate Passes, and Visitor Listings & Badges.
8. **Multi-Board Examinations (CCE, ICSE & Internal Assessments)**: Online Question Generators, Item Bank Import, Algorithmic Paper Generator, CBSE/CCE Scholastic & Co-Scholastic Settings, ICSE Exam Categories, Weightage Assignment, Consolidated Marksheets, and Internal Assessment (IA) Groups.
9. **Asset & Inventory Procurement**: Store Categories & Types, Store List, Item Categories, Supplier Directory, Purchase Orders, Request Orders, Billing, and Invoice Reports.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               GENIUS CLOUD GRANULAR SUBMODULE ARCHITECTURE                             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. ADVANCED FINANCE & GL    │ 2. MULTI-BOARD EXAMS     │ 3. PAYROLL & INCENTIVES       │
│ • Account, Bank, Cash, Tax  │ • Question Bank Import   │ • Salary Components & Tax     │
│ • Journal Vouchers & Assets │ • Bloom's Paper Generator│ • Increments & Bonus Desk     │
│ • Day Book, Cash/Bank Books │ • CCE Scholastic/Co-Sch  │ • Category Salary Registers   │
│ • GL, Trial Balance, P&L    │ • ICSE Weightages & Cons │ • Outstanding Salary Summary  │
│ • Bank Reconciliation Engine│ • Internal Assessment(IA)│ • Payslip PDF Generation      │
├─────────────────────────────┼──────────────────────────┼───────────────────────────────┤
│ 4. GRANULAR FEE RECOVERY    │ 5. CAMPUS SAFETY & DESK  │ 6. STORE & PROCUREMENT        │
│ • Advance Fee Heads & Books │ • Calls & Follow-Up Logs │ • Store Types & Categories    │
│ • Concession Profiles & Late│ • Enquiry & Complaints   │ • Supplier Directory & Types  │
│ • Refunds & Misc Collections│ • Late-In / Early-Out    │ • Purchase & Request Orders   │
│ • Deleted Receipt Auditing  │ • Visitor Gate Passes    │ • Inventory Billing & Invoices│
├─────────────────────────────┴──────────────────────────┴───────────────────────────────┤
│ 7. AUXILIARY SERVICES & PLATFORM GOVERNANCE                                            │
│ Library Binding & Lost Books • Event & Task Management • IT Help Desk • Translations   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Advanced Finance Management & Statutory Accounting Books

### 1.1 Account Masters
- **Account Master**: Chart of Accounts defining root asset, liability, equity, income, and expense head codes.
- **Bank Master**: Commercial bank profile records, account numbers, branch IFSC/routing codes, and electronic clearing details.
- **Cash Master**: Multiple petty cash accounts, campus cashier drawers, and head cashier vault ledgers.
- **Tax Master**: GST, VAT, and local municipal sales tax slabs with input/output tax accounts.

### 1.2 Transactions & Journal Vouchers
- **Bank Transactions**: Direct deposits, contra entries, electronic fund transfers (NEFT/RTGS/ACH), and debit card sweeps.
- **Cash Transactions**: Daily cash payments, receipts, and cashier balance handovers.
- **Journal Voucher (JV)**: Multi-line double-entry adjustment vouchers enforcing debit-credit equality (`SUM(debit) == SUM(credit)`) prior to commit.
- **Fixed Asset Master & Assets Registry**: Capital expenditure register with asset tagging, purchase invoice linkage, useful life parameters, and straight-line/written-down depreciation calculation schedules.

### 1.3 Statutory Accounts Reports
- **Day Book**: Chronological audit trail of all transactions occurring within any selected calendar date.
- **Journal Book**: Formatted journal entry records with transaction narrations and voucher IDs.
- **Cash Book**: Dual-column cash ledger tracking cash inflows, cash outflows, and opening/closing cash drawer balances.
- **Bank Book**: Individual bank account ledgers detailing check clearings, online receipts, and wire disbursements.
- **General Ledger (GL)**: Comprehensive account-by-account transaction drill-down with running balances.
- **Trial Balance**: Period-end listing of all ledger account balances verifying mathematical accuracy.
- **Profit and Loss Statement (P&L)**: Periodic institutional operating statement disaggregating tuition revenue, grants, auxiliary sales against payroll, operational expenses, and depreciation.
- **Balance Sheet**: Point-in-time institutional financial position detailing Assets, Liabilities, and Reserves.
- **Bank Reconciliation**: Side-by-side bank statement upload against internal bank ledger with auto-matching on date, check number, and amount.

---

## 2. Granular Fee Management & Revenue Recovery

### 2.1 Fee Masters
- **Fee Category & SubCategory**: Multi-tier categorization (Academic Tuition, Lab Fees, Transport, Hostel, Co-Curricular).
- **Fee Receipt Header**: Configurable printable header with institution crest, affiliation codes, and tax registration details.
- **Fee Book**: Dedicated receipt series books for distinct campus wings (e.g., Primary School Book, Senior High Book).
- **Fee Head & Students Advance Fee Head**: Specific billing heads alongside advance deposit holding accounts for prepaid tuition.
- **Fee Concession Profile**: Pre-configured discount templates (Sibling Concession, Merit Scholarship, Staff Ward, Need-Based Aid).
- **Late Fee Policy**: Configurable grace periods and calculation models (Fixed Daily Fine, Percentage Surcharge, Slab-Based Penalties).
- **Class & Student-Wise Fee Structures**: Standardized grade-level fee schedules alongside bespoke individual student override fee schedules.

### 2.2 Fee Collections, Refunds & Auditing
- **Fee Payment & Bulk Fee Receipts**: Cashier counter checkout supporting split tender (Cash, Card, Bank Slip) with batch receipt printing.
- **Fee Refund**: Formal withdrawal refund processing with caution money deduction and journal voucher posting.
- **Miscellaneous Fee Collection**: Ad-hoc counter collections (Duplicate ID card, Prospectus, Uniform, Late Library).
- **Advance Fee Receipt**: Issuance of official receipts for future academic term advance deposits.
- **Additional Fee Instructions & Collection**: Supplementary charges (Field trips, Olympiad exams, Cambridge exam fees).
- **Deleted Advance Fee Receipt Audit**: Immutable forensic audit log recording any voided or deleted receipts with user ID, timestamp, and mandatory cancellation justification.
- **Analytical Fee Reports**: Category-Wise, Fee Head-Wise, Book-Wise, Date-Wise, Year-Wise, and Outstanding Defaulters Summaries.

---

## 3. Payroll Management & Faculty Incentive Suite

### 3.1 Payroll Masters & Salary Structuring
- **Payroll Settings**: Monthly payroll cycle parameters, working days calculation rules, and rounding rules.
- **Salary Components**: Configurable Earnings (Basic Pay, HRA, DA, TA, Special Allowance) and Deductions (Provident Fund, ESI, TDS, Loan Repayment).
- **Professional Tax**: State-specific professional tax slab configurations based on gross monthly earnings.
- **Assign Salary & Salary Increment**: Employee salary structure allocation with historical annual increment logs and effective dates.
- **Holiday Governance**: Week Holidays (Weekly offs) and Festival Holidays with holiday-pay entitlement rules.

### 3.2 Bonus & Compensation Generation
- **Assign & Generate Bonus**: Performance, Festival, or Annual bonus schemes with flat or percentage-based distribution.
- **Generate Salary & Payslip Engine**: Automated batch payroll computation executing virtual threads for 1,000+ staff within 3 seconds, producing encrypted PDF payslips.
- **Payroll Reports**: Category-Wise Salary, Outstanding Salary, Outstanding Summary, Overall Salary, and Statutory Salary Registers.

---

## 4. Multi-Board Examination Engine (CCE, ICSE & Internal Assessments)

### 4.1 Online Question Generator & Item Bank
- **Question Repository**: Multi-format question bank (MCQ, Short Answer, Descriptive, Numerical, True/False) with difficulty ratings and topic tags.
- **Import Questions**: CSV and Excel bulk question item importer with mathematical LaTeX and diagram upload support.
- **Question Paper Generator**: Algorithmic paper compiler assembling balanced exam papers based on Bloom's taxonomy blueprints and section marks.

### 4.2 CCE (Continuous and Comprehensive Evaluation) Architecture
- **CCE Basic Settings**: Formative Assessment (FA1, FA2, FA3, FA4) and Summative Assessment (SA1, SA2) parameters.
- **Scholastic Settings**: Core subject grading scales, weightages, and conversion formulas.
- **Co-Scholastic Settings**: Life Skills, Work Education, Visual & Performing Arts, Attitudes & Values rubrics (A, B, C descriptive indicators).
- **CCE Reports**: Term-wise CCE report cards combining scholastic achievement with co-scholastic holistic profiles.

### 4.3 ICSE (Indian Certificate of Secondary Education) Architecture
- **ICSE Exam Categories & Weightages**: Standardized ICSE subject groups (Group I Compulsory, Group II Optional, Group III Skill).
- **Assign Weightages**: External Board exam percentage vs. Internal school coursework percentage (e.g., 80% Theory / 20% Practical).
- **ICSE Reporting Hub**: ICSE Student-Wise Reports, ICSE Subject-Wise Reports, and ICSE Consolidated School Marksheets.

### 4.4 Internal Assessment (IA) Engine
- **IA Settings & Groups**: Practical lab assessments, project portfolios, oral viva voce, and continuous classroom observation rubrics.
- **Assign IA Groups**: Mapping faculty assessors to student cohorts for periodic internal assessment grading.

---

## 5. Front Desk, Security Gate & Visitor Gating

### 5.1 Front Desk Master Operations
- **Calls & Follow-Ups Desk**: Inbound and outbound phone call logs, inquiry tracking, follow-up scheduling, and reminder alerts.
- **Complaint Management**: Formal grievance registration, ticket assignment to campus staff, status tracking, and resolution notes.
- **Admission Enquiries**: Prospective student walk-in and phone inquiry logs with conversion status tracking.
- **Front Desk Reports**: Calls Follow-Up Reports, Enquiry Conversion Reports, Complaint SLA Reports, and Arrival-Departure Logs.

### 5.2 Security Gate Management & Student Movement Tracking
- **Student Late Arrival Passes**: Automated barcode/QR scan at perimeter gate logging late arrival minutes, issuing temporary admission slips, and sending push notifications to parents.
- **Student Early Departure Passes**: Pre-authorized guardian exit pass verification matching student biometric/photo with authorized guardian ID before releasing student through gate turnstiles.
- **Visitor Listing & Reports**: Digital visitor book capturing photo, national ID, visiting purpose, host staff approval, and check-out timestamp.

---

## 6. Asset & Inventory Procurement Suite

### 6.1 Store Masters
- **Store Category & Type**: Academic Stores, Science Labs, IT Hardware, Sports Depot, Campus Maintenance.
- **Store Item Catalog**: Master catalog with SKU barcodes, unit of measurement (Pcs, Box, Kg, Liter), and minimum reorder points.
- **Supplier Directory & Types**: Authorized vendor profiles, GST/tax IDs, bank remittance instructions, and vendor rating scores.

### 6.2 Purchase Orders & Inventory Billing
- **Request Order (Requisition)**: Departmental staff stock requisitions subject to HOD and Dean approval.
- **Purchase Order (PO)**: Automated PO generation dispatched to suppliers with payment terms and expected delivery dates.
- **Billing & Good Receipt Notes (GRN)**: Incoming shipment verification against PO, stock quantity replenishment, and invoice matching.
- **Inventory Reports**: Item-Wise Stock Balance Reports, Consumption Trends, and Vendor Invoice Reports.

---

## 7. Auxiliary Library & Platform Administration

### 7.1 Library Maintenance
- **Book Return & Overdue Fines**: Automated circulation desk calculating overdue penalties with grace period logic.
- **Book Lost Management**: Lost book damage penalty assessment, student account charging, and catalog write-off.
- **Book Binding Lifecycle**: Tracking damaged books sent to external bindery, repair costs, and inventory return.

### 7.2 Event & Task Management
- **Event Scheduling**: Campus calendar event manager with venue booking and role-based audience invitations.
- **Task Management**: Administrative task delegation with priority levels (Low, Medium, High, Urgent), due dates, and progress tracking.

### 7.3 Help Desk & System Governance
- **IT Help Desk**: Internal ticketing system for staff hardware, network, and software support requests.
- **Manage Language Translations**: Centralized localization dictionary editor managing UI strings across English, Khmer, and regional languages.
- **Modules Backup**: Scheduled and manual single-module data dumps and database schema exports.
- **Login Activity Audit**: Security audit log capturing IP addresses, browser user agents, timestamps, and failed login attempts.

---

## 8. Implementation Quality Gates & Compliance Checklist

- [x] **Double-Entry Financial Books Codified**: Day Book, Cash Book, Bank Book, GL, Trial Balance, P&L, Balance Sheet.
- [x] **Granular Fee Masters & Auditing Specified**: Advance heads, concession profiles, late fee policies, and deleted receipt logs.
- [x] **Payroll & Bonus Lifecycle Defined**: Salary components, professional tax, increments, bonuses, and salary registers.
- [x] **Multi-Board Examinations Codified**: CCE scholastic/co-scholastic, ICSE weightages, and IA groups.
- [x] **Perimeter Safety & Gate Passes Specified**: Student late arrival and early departure gate logging.
- [x] **Store Procurement Specified**: Store types, requisitions, purchase orders, supplier billing, and stock reports.
- [x] **Strict Zero Emoji Enforcement**: 100% compliant across all specifications, tables, and schemas.
- [x] **Google Material Symbols Standard**: Outlined weight 500 utilized across all UI representations.
