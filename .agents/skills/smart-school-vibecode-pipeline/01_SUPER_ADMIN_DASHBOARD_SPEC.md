# Super Admin Dashboard Architecture & Implementation Specification
## Smart School Enterprise Platform (SMS / LMS / SIS / Control Center)

---

### Executive Overview & Scope

The **Super Admin Dashboard** is the sovereign mission-control center of the **Smart School Enterprise Platform**. Unlike branch-scoped portals (e.g., Campus Dean, Accountant, Teacher), the Super Admin operates at the **Universal Platform Level**, holding cross-tenant, cross-branch visibility and authority.

- **Primary Role Token**: `SUPER_ADMIN`
- **Brand Accent Token**: `#8E24AA` (Royal Amethyst Purple)
- **Database Context**: Session variable `app.bypass_rls = true`
- **Font Standards**:
  - English: **Ubuntu** (`font-ubuntu` / `var(--font-ubuntu)`)
  - Khmer: **Google Sans** (`font-khmer` / `var(--font-google-sans)`) with line-height `1.45`-`1.50`
- **Icon Standard**: Google Material Symbols exclusively (`fill={false}`, `weight={400}`). **STRICT ZERO EMOJI POLICY**.
- **Surface Design**: Liquid Glass Design System (`liquid-glass-design-system` / `srievi-liquid-glass-standards`) with 360-degree specular highlights, solid colors only, zero gradients.

---

### 1. The 6 Sovereign Dashboard Modules (What to Build)

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                           SUPER ADMIN COMMAND CENTER                              │
├───────────────────────────────────────────────────────────────────────────────────┤
│ [1. GLOBAL KPI METRIC STRIP]                                                      │
│  ├─ Total Enrolled Students (All Campuses)                                        │
│  ├─ Active Campus Branches & Operational Status                                   │
│  ├─ Gross Fee Collection & Realization Efficiency (%)                             │
│  ├─ Today's Live Attendance & Arrival Velocity                                    │
│  └─ Cloud Infrastructure Health (Kafka / Neon / DLQ alerts)                       │
├─────────────────────────────────────┬─────────────────────────────────────────────┤
│ [2. MULTI-CAMPUS MATRIX & SWITCHER] │ [3. REAL-TIME GATE & ATTENDANCE TELEMETRY]  │
│  ├─ Branch cards (HQ, Siem Reap...) │  ├─ Live IoT turnstile/RFID event stream    │
│  ├─ Per-campus student/staff counts │  ├─ Morning arrival bell-curve (07:00-08:30)│
│  ├─ 1-Click branch context drilldown│  └─ Late/Absent anomaly flags               │
├─────────────────────────────────────┼─────────────────────────────────────────────┤
│ [4. CROSS-CAMPUS FINANCIAL HUB]     │ [5. PERSONNEL & ACADEMIC GOVERNANCE]        │
│  ├─ Invoiced vs Collected vs Due    │  ├─ Campus Deans & Staff headcount rosters  │
│  ├─ Gateway settlements (ABA/Wing)  │  ├─ Pupil-to-Teacher Ratio (PTR) per campus │
│  └─ Saga reconciliation & disputes  │  └─ Term examination grade publication log  │
├─────────────────────────────────────┴─────────────────────────────────────────────┤
│ [6. INFRASTRUCTURE TELEMETRY & SECURITY CONTROL CENTER]                           │
│  ├─ Kafka Cluster Throughput & Consumer Lag                                       │
│  ├─ Poison-Pill DLQ (Dead Letter Queue) Ingestion Monitor                         │
│  ├─ Neon Serverless Connection Pool Utilization & Query Latency                   │
│  └─ Emergency Red Button: Campus Freeze & School Network Broadcast                │
└───────────────────────────────────────────────────────────────────────────────────┘
---

### 1.1. Real-World Production Dashboard Screen Layout & Visual Architecture
*(Derived from Ground-Truth Production Captures: `media_1789160127957.png` and `media_1789160136733.png`)*

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [TOP HEADER] SMART SCHOOL | Mount Carmel School | [Search By Student Name] | USD | US | [switch] | [calendar] | [checklist] | [bell](0) | [whatsapp] | User   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [6 DAILY OPERATIONAL KPI CARDS] (3x2 Grid)                                                                             │
│  ├─ Fees Awaiting Payment [2/7] (Light Blue Progress Bar)  │ ├─ Staff Approved Leave [1/3] (Cyan Progress Bar)         │
│  ├─ Converted Leads [1/8] (Red Progress Bar)               │ ├─ Staff Present Today [0/9] (Gray Progress Bar)          │
│  ├─ Student Approved Leave [3/10] (Dark Blue Progress Bar) │ └─ Student Present Today [37/89] (Amber Progress Bar)     │
├────────────────────────────────────────────────────────────┬───────────────────────────────────────────────────────────┤
│ [MONTHLY DAILY BAR CHART]                                  │ [INCOME GAUGE DONUT]                                      │
│  Fees Collection & Expenses For September 2026             │  Income - September 2026                                  │
│  (Dual Bar: Green=Fees, Red=Expenses by Day 01-30)         │  (Donation [Green], Rent [Amber], Misc [Cyan])            │
├────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────┤
│ [ACADEMIC SESSION SPLINE CHART]                            │ [EXPENSE GAUGE DONUT]                                     │
│  Fees Collection & Expenses For Session 2026-27            │  Expense - September 2026                                 │
│  (Spline Curve: Green=Fees, Red=Expenses across Apr-Mar)   │  (Stationery, Phone, Misc, Flower)                        │
├────────────────────────────────────────────────────────────┴───────────────────────────────────────────────────────────┤
│ [4 OPERATIONAL STATUS OVERVIEWS] (4-Column Multi-Bar Progress Indicators)                                             │
│  ├─ Fees Overview: 3 UNPAID (42.86%), 2 PARTIAL (28.57%), 2 PAID (28.57%)                                              │
│  ├─ Enquiry Overview: 6 ACTIVE (75%), 1 WON (12.5%), 1 PASSIVE (12.5%), 0 LOST (0%), 0 DEAD (0%)                       │
│  ├─ Library Overview: 10 DUE FOR RETURN, 3 RETURNED, ISSUED OUT OF (0%), AVAILABLE OUT OF (0%)                         │
│  └─ Student Today Attendance: 21 PRESENT (23.6%), 5 LATE (5.62%), 6 ABSENT (6.74%), 11 HALF DAY (12.36%)               │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [INSTITUTIONAL FINANCIAL & STAFF COUNTER CARDS] (10 Tactical Metric Cards)                                             │
│  ├─ Monthly Fees Collection: $6,205.00                      │ ├─ Monthly Expenses: $2,750.00                           │
│  ├─ Student: 89                                             │ ├─ Student Head Count: 88                                │
│  ├─ Admin: 1                                                │ ├─ Teacher: 4                                            │
│  ├─ Accountant: 1                                           │ ├─ Librarian: 1                                          │
│  ├─ Receptionist: 1                                         │ └─ Super Admin: 1                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Module 1: Global Multi-Campus KPI Strip (5 Executive Cards)

1. **Total Student Enrollment**:
   - Total active students aggregated across all operational branches.
   - Indicator: Week-over-week enrollment variance (`+2.4%`).
   - Action: 1-click drilldown to Cross-Campus Admissions Pipeline.
2. **Operational Campus Network**:
   - Number of active, provisioned, and suspended campuses (e.g., `5 Active / 0 Suspended`).
   - Action: "Provision New Campus" button (triggers modal + Saga event).
3. **Gross Financial Realization**:
   - Total term fees billed vs. collected (e.g., `$4,820,500 / $5,200,000` — `92.7%`).
   - Action: View Cross-Campus Unsettled Invoices.
4. **Live Real-Time Headcount**:
   - Today's physical campus arrivals (Present, Late, Absent, On-Leave).
   - Arrival velocity gauge (scans/minute during 07:00-08:30 AM peak).
5. **Infrastructure & Reliability Status**:
   - Kafka broker connectivity, Neon DB connection pool health, and DLQ message count (`0 Alerts`).

---

### Module 2: Interactive Campus Switcher & Health Matrix

- **Card Grid Layout**: One liquid glass card per physical campus.
- **Card Data Points**:
  - Campus Name & Code (e.g., `Phnom Penh Central Campus [PPH-01]`)
  - Campus Dean / Principal Name & Direct Hotline
  - Total Enrolled Students & Total Faculty/Staff
  - Today's Attendance Percentage (Live)
  - Fee Collection Percentage & Outstanding Balance
  - Operational Status Badge: `HEALTHY` (Green), `DEGRADED` (Orange), `LOCKED` (Red)
- **Direct Actions**:
  - **"Enter Campus Context"**: Instantly sets session `X-Branch-ID` and opens Dean view.
  - **"Campus Lockdown"**: Emergency lock halting gate ingress and finance operations.

---

### Module 3: Live Gate Rush & Attendance Telemetry Feed

- **High-Velocity Stream**: Displays real-time student and staff check-ins pushed via WebSockets (bridged from Kafka topic `school.attendance.raw-scans`).
- **Telemetry Card Fields**:
  - Timestamp (`HH:mm:ss.SSS`)
  - Student Name & ID (`STU-2026-001`)
  - Branch Code (`PPH-01`)
  - Turnstile Gate Hardware ID (`TURNSTILE_EAST_02`)
  - Verification Method: `RFID_MIFARE`, `QR_DYNAMIC`, `FACIAL_BIOMETRIC`
  - Status Flag: `ON_TIME` (Green), `LATE` (Yellow), `UNAUTHORIZED_GATE` (Red)
- **Analytics Visualization**:
  - 24-Hour arrival distribution bell curve.
  - Peak minute arrival tracker (target: < 15ms per hardware scan response).

---

### Module 4: Cross-Campus Financial Revenue & Fee Recovery Ledger

- **Consolidated Ledger Breakdown**:
  - Total Billed vs. Paid vs. Outstanding Balance.
  - Cash/Counter Receipts vs. Online Payment Gateway (ABA PayWay, Wing, Stripe, ACLEDA).
- **Saga Transaction Reconciler**:
  - Displays any pending or disputed transactions caught in the distributed payment Saga.
  - Quick action: "Trigger Manual Ledger Rebalance" or "Issue Compensating Refund".
- **Aging Analysis**: Categorizes overdue fees into `30 Days`, `60 Days`, `90+ Days`.

---

### Module 5: Personnel & Academic Governance Hub

- **Executive Roster**:
  - Listing of all Campus Deans, Lead Accountants, Head Instructors, and Chief Librarians.
  - Security audit badge: 2FA status, last login timestamp, session IP address.
- **Academic Standard Metrics**:
  - Cross-branch GPA / Academic Performance Index comparison.
  - Term grade submission progress bar (e.g., `Phnom Penh: 98% Submitted`, `Siem Reap: 74% Pending`).
  - Emergency action: "Unlock Term Grade Submission Window" (with audit reason).

---

### Module 6: Infrastructure Health, DLQ Poison-Pill Monitor & Security Center

- **Event Backbone Health**:
  - Active Kafka topics (`raw-scans`, `grades`, `payments`, `sms-outbound`).
  - Consumer lag metrics per consumer group (`attendance-sync-worker`, `finance-ledger-worker`).
- **Dead-Letter Queue (DLQ) Inspector**:
  - Real-time counter for `school.attendance.raw-scans.dlq`.
  - Inspector table displaying `poisonPillId`, `failingPayload`, `exceptionClass`, and `failureTimestamp`.
  - Actions: "Replay Message to Main Topic", "Discard Poison Pill".
- **Database Connection Pool**:
  - Neon PostgreSQL active pool size, idle count, and query latency (P95 < 25ms).
- **The Red Button (System Lockdown)**:
  - Global emergency broadcast system sending instant SMS & Push to all enrolled families.
  - Universal maintenance freeze switch.

---

### 2. Backend REST API Specification

#### 2.1 Get Super Admin Global Dashboard Metrics
- **Endpoint**: `GET /api/v1/super-admin/dashboard/summary`
- **Security**: `@PreAuthorize("hasRole('SUPER_ADMIN')")`
- **Headers**:
  - `Authorization: Bearer <SUPER_ADMIN_JWT>`
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "data": {
    "timestamp": "2026-09-12T07:30:00.000Z",
    "students": {
      "totalEnrolled": 5840,
      "growthRate": 2.4
    },
    "branches": {
      "totalActive": 5,
      "totalSuspended": 0
    },
    "financials": {
      "totalBilledUsd": 5200000.00,
      "totalCollectedUsd": 4820500.00,
      "realizationRate": 92.70,
      "unsettledDisputesCount": 0
    },
    "todayAttendance": {
      "overallPresentPercentage": 94.85,
      "totalScannedToday": 5539,
      "lateCount": 182,
      "absentCount": 119
    },
    "systemHealth": {
      "kafkaStatus": "UP",
      "neonDbPoolStatus": "HEALTHY",
      "dlqPoisonPillCount": 0,
      "averageGatewayLatencyMs": 14.2
    }
  }
}
```

#### 2.2 Get Multi-Campus Operational Matrix
- **Endpoint**: `GET /api/v1/super-admin/branches/matrix`
- **Security**: `@PreAuthorize("hasRole('SUPER_ADMIN')")`
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "data": [
    {
      "branchId": "brn_phnom_penh_01",
      "branchCode": "PPH-01",
      "name": "Phnom Penh Central Campus",
      "deanName": "Dr. Chanrithy Seng",
      "deanEmail": "dean.pph@school.edu",
      "studentCount": 2450,
      "staffCount": 142,
      "todayAttendancePercentage": 96.1,
      "feeCollectedPercentage": 94.2,
      "operationalStatus": "HEALTHY"
    },
    {
      "branchId": "brn_siem_reap_02",
      "branchCode": "SRP-02",
      "name": "Siem Reap Heritage Campus",
      "deanName": "Mrs. Bopha Tep",
      "deanEmail": "dean.srp@school.edu",
      "studentCount": 1380,
      "staffCount": 86,
      "todayAttendancePercentage": 93.4,
      "feeCollectedPercentage": 90.8,
      "operationalStatus": "HEALTHY"
    }
  ]
}
```

#### 2.3 Inspect Dead-Letter Queue (DLQ) Poison Pills
- **Endpoint**: `GET /api/v1/super-admin/infrastructure/dlq/messages`
- **Security**: `@PreAuthorize("hasRole('SUPER_ADMIN')")`
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "data": {
    "topic": "school.attendance.raw-scans.dlq",
    "totalDeadLetters": 0,
    "messages": []
  }
}
```

#### 2.4 Emergency Campus Lockdown / Freeze
- **Endpoint**: `POST /api/v1/super-admin/branches/{branchId}/emergency-lock`
- **Security**: `@PreAuthorize("hasRole('SUPER_ADMIN')")`
- **Request Body**:
```json
{
  "lockReason": "Severe weather alert / local civil advisory",
  "haltGateScans": true,
  "haltFeeCheckouts": true,
  "broadcastNotice": "All classes suspended for the afternoon session."
}
```
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Emergency lock executed. Event published to school.platform.emergency-lockdown."
}
```

---

### 3. PostgreSQL Database & Row-Level Security (RLS) Directives

#### 3.1 Super Admin Bypass Policy
When a Super Admin initiates a transaction, the Spring Boot application sets:
```sql
SET LOCAL app.bypass_rls = 'true';
```
This enables analytical aggregate queries across all branches without violating multi-tenant isolation rules for other staff roles:

```sql
-- Super Admin Cross-Campus Summary View
CREATE OR REPLACE VIEW v_super_admin_campus_summary AS
SELECT 
    b.id AS branch_id,
    b.code AS branch_code,
    b.name AS branch_name,
    COUNT(DISTINCT s.id) AS total_students,
    COALESCE(SUM(i.total_amount), 0) AS total_invoiced,
    COALESCE(SUM(i.paid_amount), 0) AS total_collected
FROM branches b
LEFT JOIN students s ON s.branch_id = b.id AND s.status = 'ACTIVE'
LEFT JOIN invoices i ON i.branch_id = b.id
GROUP BY b.id, b.code, b.name;
```

---

### 4. Canonical Kafka Event Envelopes for Super Admin Operations

Every management event generated from the Super Admin dashboard adheres to `EventEnvelope<T>`:

#### 4.1 Topic: `school.platform.emergency-lockdown`
- **Partition Key**: `{branchId}`
- **Payload Schema**:
```json
{
  "metadata": {
    "eventId": "e9b21f30-8a42-4f12-b219-c0291941ff01",
    "eventType": "school.platform.emergency.lockdown.triggered",
    "aggregateType": "CAMPUS_BRANCH",
    "aggregateId": "brn_phnom_penh_01",
    "tenantId": "ten_ideai_hq",
    "branchId": "brn_phnom_penh_01",
    "timestamp": 1789123800000,
    "correlationId": "sec-alert-991",
    "version": "1.0.0"
  },
  "payload": {
    "initiatedBy": "usr_super_admin_01",
    "branchId": "brn_phnom_penh_01",
    "haltGateScans": true,
    "haltFeeCheckouts": true,
    "reason": "Severe weather alert"
  }
}
```

---

### 5. Automated Postman Verification cURL

```bash
# 1. Fetch Global Summary (Super Admin)
curl -X GET "http://localhost:8080/api/v1/super-admin/dashboard/summary" \
     -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsIn..." \
     -H "X-Tenant-ID: ten_ideai_hq" \
     -H "Content-Type: application/json"

# 2. Query Multi-Campus Matrix
curl -X GET "http://localhost:8080/api/v1/super-admin/branches/matrix" \
     -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsIn..." \
     -H "X-Tenant-ID: ten_ideai_hq"

# 3. Trigger Emergency Campus Freeze
curl -X POST "http://localhost:8080/api/v1/super-admin/branches/brn_phnom_penh_01/emergency-lock" \
     -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsIn..." \
     -H "X-Tenant-ID: ten_ideai_hq" \
     -H "Content-Type: application/json" \
     -d '{
       "lockReason": "Scheduled system network maintenance",
       "haltGateScans": false,
       "haltFeeCheckouts": true,
       "broadcastNotice": "Finance portal offline for 30 minutes."
     }'
```
