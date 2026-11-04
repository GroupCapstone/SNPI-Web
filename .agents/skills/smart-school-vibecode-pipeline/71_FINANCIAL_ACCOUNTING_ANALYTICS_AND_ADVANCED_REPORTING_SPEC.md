---
name: smart-school-financial-accounting-analytics
description: Authoritative Specification for the Smart School Enterprise Financial Accounting, Visual Analytics, Advanced Reporting, and Campus Operations Suite. Ingests all visual telemetry charts (Fees Head-Wise, Collection Details, Subject-Wise, Exam-Wise, Fee Details Gauge, Daily Presence/Leave, Gender-Disaggregated Attendance), Self-Service Challan & Bank Remittance, Master Ledgers (P&L, Trial Balance, Balance Sheet), and Advanced Modules (PTM, Student Pickup, Security Gate Turnstiles).
---

# Financial Accounting, Visual Analytics & Operations Architecture
## Advanced Reporting, Challan Settlement & Campus Logistics (ABLOB Architecture)

### Executive Architecture Overview

The **Smart School Financial Accounting & Analytics Engine** powers institutional fiscal governance, real-time visual telemetry, parent fee self-service, and advanced campus logistics across single and federated multi-campus school systems.

The architecture directly unifies real-time transactional ledgers with automated business intelligence (BI) aggregation pipelines, enabling executive leadership and bursars to monitor cash flow, delinquency aging, academic grade distributions, and demographic attendance rates instantaneously.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   FINANCIAL TELEMETRY & VISUAL ANALYTICS SUITE                         │
├────────────────────────────────┬───────────────────────────────┬───────────────────────┤
│ 1. REVENUE & COLLECTIONS       │ 2. ACADEMIC EVALUATION        │ 3. DEMOGRAPHIC PRESENCE│
├────────────────────────────────┼───────────────────────────────┼───────────────────────┤
│ - Fees Head-Wise Stacked Bar   │ - Subject-Wise Performance Bar│ - Present / Leave Pie │
│ - Fees Collection Timeline Bar │ - Exam-Wise Comparison Bar    │ - Female Attendance   │
│ - Fee Details Gauge (Donut)    │                               │ - Male Attendance     │
├────────────────────────────────┴───────────────────────────────┴───────────────────────┤
│ PARENT SELF-SERVICE DESK: Online Checkout, E-Challan Printing, Bank Remittance Slips   │
│ STATUTORY GENERAL LEDGER: Journal Vouchers, Account & Tax Master, P&L, Trial Balance  │
│ ADVANCED CAMPUS LOGISTICS: PTM Management, Student Pickup, Gate Turnstiles, Canteen   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Real-Time Visual Analytics & Telemetry Charts

### Chart 01: Fees Head-Wise Collection (Stacked Bar Chart)
- **Visual Presentation**: Multi-colored stacked bar chart categorized by student name / cohort along the X-axis and monetary amount along the Y-axis.
- **Head Classifications**:
  - `Term Fees` (Primary Blue: `#2563EB`)
  - `Activity Fees` (Emerald Green: `#059669`)
  - `Exam Fees` (Amber Orange: `#D97706`)
  - `Transport / Hostel Fees` (Amethyst Purple: `#7C3AED`)
- **Telemetry Query**:
  ```sql
  SELECT s.student_name, fh.head_name, SUM(fp.amount_paid) as total_amount
  FROM fee_payments fp
  JOIN fee_heads fh ON fp.fee_head_id = fh.id
  JOIN students s ON fp.student_id = s.id
  WHERE fp.branch_id = current_setting('app.current_branch_id')
    AND fp.academic_session = '2026-27'
  GROUP BY s.student_name, fh.head_name
  ORDER BY s.student_name;
  ```

### Chart 02: Fees Collection Details (Timeline Bar Chart)
- **Visual Presentation**: Chronological histogram tracking collections across rolling calendar dates (e.g., `01-Aug-2026`, `15-Sep-2026`, `05-Oct-2026`, `28-Nov-2026`, `15-Jan-2027`).
- **Telemetry Indicators**: Daily collection volume, payment mode distribution (Online Gateway, Bank Wire, POS Cash, Cheque), and variance against expected due dates.

### Chart 03: Subject-Wise Performance Report (Bar Chart)
- **Visual Presentation**: Comparative vertical bars comparing student marks obtained across curriculum subjects (Mathematics, Computer Science, Physics, Chemistry, Biology, Social Studies).
- **Benchmarking**: Dynamic benchmark threshold lines indicating Class Average, Section Median, and Passing Cutoff.

### Chart 04: Exam-Wise Performance Report (Bar Chart)
- **Visual Presentation**: Progress bars tracking a student's or cohort's academic trajectory across sequential examination terms (Unit Test 1, Mid-Term Exam, Quarterly Assessment, Annual Final Board Exam).

### Chart 05: Fee Details Status Gauge (Donut / Pie Chart)
- **Visual Presentation**: High-contrast circular status distribution:
  - `Fee Collected` (Primary Blue: `#2563EB`) - Displays settled percentage and currency total.
  - `Pending / Delinquent` (Crimson Pink: `#E11D48`) - Displays outstanding balance and aging risk.

### Chart 06: Daily Presence / Leave Breakdown (Pie Chart)
- **Visual Presentation**: Daily campus headcount split:
  - `Present` (Emerald Green: `#10B981`)
  - `Approved Leave` (Crimson Rose: `#F43F5E`)
  - `Unexcused Absent` (Slate Charcoal: `#334155`)

### Chart 07 & 08: Gender-Disaggregated Student Attendance (Dual Gauges)
- **Visual Presentation**: Twin demographic gauges evaluating attendance parity:
  - `Student Attendance Female`: Present (Sienna Orange: `#EA580C`) vs. Absent (Slate Gray: `#94A3B8`).
  - `Student Attendance Male`: Present (Sky Blue: `#0284C7`) vs. Absent (Slate Charcoal: `#1E293B`).
- **Analytical Value**: Assisting institutional compliance with national gender equity mandates and targeted welfare outreach.

---

## 2. Parent Self-Service & Fee Settlement Workflow

### 2.1 Online Fee Payment & Payment Gateway Hub
- **Integration**: Zero-friction checkout supporting credit cards, debit cards, local instant bank transfers (Bakong / KHQR in Cambodia, UPI in India, PromptPay in Thailand), and global gateways (Stripe, PayPal).
- **Automated Settlement**: Immediate cryptographic issuance of digital tax invoices, ledger entries, and SMS receipt confirmations.

### 2.2 Online Challan Generation & Bank Remittance Desk
- **E-Challan Specification**:
  - Triplicate format: `Student Copy`, `School Copy`, and `Bank Remittance Copy`.
  - Machine-readable dynamic QR Code and Code-128 Barcode encoding the unique Challan Reference ID (`CHL-2026-XXXXX`), student admission number, branch ID, and payable amount.
  - Designated clearing banks: Automatic routing to school's contracted depository accounts (e.g., ABA Bank, Canadia Bank, ACLEDA, State Bank).
- **Offline Bank Remittance Verification**:
  - Parents photograph and upload deposit counter slips with bank transaction sequence numbers.
  - Bursar / Accountant verification queue: Visual inspection desk with side-by-side slip zoom and 1-click `Approve & Issue Receipt` or `Reject with Reason`.

### 2.3 Fee Concessions & Scholarship Allocation Engine
- **Concession Matrix**: Merit scholarships, sibling discounts (15% for 2nd sibling, 25% for 3rd), staff child waivers (50%), and social welfare subsidies.
- **Audit Safeguards**: Concessions require documented trustee/principal approval records before applying automatically to fee invoices.

---

## 3. Statutory Accounting & General Ledger

The system incorporates a complete double-entry accounting engine fully compliant with international GAAP and IFRS standards:
1. **Account & Tax Master**:
   - Multi-tier Chart of Accounts (Assets, Liabilities, Equity, Revenue, Expenses).
   - Configurable tax rules (VAT, GST, Service Tax) with automatic tax invoice breakdown.
2. **Expense & Journal Vouchers**:
   - Dual debit/credit balance validation with supporting receipt attachment uploads.
   - Petty cash registers and recurring operational disbursements (utilities, stationery, building maintenance).
3. **Statutory Financial Reports**:
   - **Profit & Loss Statement (P&L)**: Consolidated revenue versus operational overheads.
   - **Balance Sheet**: Current/fixed institutional assets versus long-term liabilities and reserve funds.
   - **Trial Balance**: Instant verification that total debits equal total credits across all account heads.

---

## 4. Advanced Campus Operations & Logistics Modules

### Module 4.1: Parent-Teacher Meeting (PTM) Scheduler
- **Capabilities**:
  - Slot-based time reservation engine (10-minute intervals) preventing scheduling conflicts between parents with multiple children.
  - Synchronous video link provisioning for virtual PTMs or classroom room assignment maps for physical on-campus conferences.
  - Teacher outcome documentation: Private developmental notes and action items signed digitally by parents.

### Module 4.2: Authorized Student Pickup & Gate Pass Verification
- **Capabilities**:
  - Authorized Guardian Directory: Photo identity profiles of approved guardians and drivers permitted to collect the student.
  - Dynamic Daily Pickup OTP / QR Pass: Parents generate a time-limited (15-minute) digital pass on their mobile app; security guards scan the pass at the perimeter turnstile to release the child.
  - Emergency pickup delegate workflow: Parents authorize a third-party with instant biometric verification.

### Module 4.3: Security Gate & RFID Turnstile Management
- **Capabilities**:
  - Integration with optical barcode scanners, UHF RFID turnstiles, and biometric facial recognition gates.
  - Automated anti-passback logic preventing reuse of access credentials within 5 minutes.
  - Security incident logs and automated visitor pass badge printing with host staff notification.

### Module 4.4: Institutional Canteen & Meal Plan Management
- **Capabilities**:
  - Cashless student RFID wallet: Parents pre-load digital canteen funds with daily spending limits.
  - Dietary restriction filters: System blocks purchase of flagged allergen items (peanuts, gluten, shellfish).
  - Daily nutritional reporting accessible via the Parent Mobile App.
