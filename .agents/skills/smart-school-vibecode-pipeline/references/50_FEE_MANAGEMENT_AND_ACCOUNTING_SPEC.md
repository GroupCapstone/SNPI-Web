---
name: smart-school-fee-accounting
description: Authoritative UI/UX design standard, component architecture, and implementation guidelines for the complete Fee Management & Institutional Accounting Suite on the Smart School Enterprise Platform. Covers Fee Management, Budget Planning, Fee Types, Auto Invoice Generation, Concessions, Collect Payments, Payment Gateways, Donations Management, Income & Expense Management, Discount Management, Payment History, and Accounts Dashboard. Trigger on: "fee management", "budget planning", "fee types", "auto invoice generation", "fee concessions", "collect payments", "payment gateways", "donations management", "income expense management", "discount management", "payment history", "accounts dashboard".
---

# Fee Management & Institutional Accounting Standard
## Smart School Enterprise Platform (ABLOB Architecture)

The **Fee Management & Institutional Accounting Suite** establishes the authoritative financial, billing, multi-gateway payment collection, budget planning, and general ledger accounting standard for the **Smart School Enterprise Platform**.

This comprehensive financial engine governs end-to-end institutional fiscal operations—from dynamic multi-category fee structures (Tuition, Transport, Hostel, Laboratory) and automated recurring invoice generation to POS counter collection, online gateway integrations (Stripe, PayPal, Razorpay), scholarship concession policies, philanthropic donation tracking, and real-time departmental budget-vs-actual intelligence.

---

## 1. Authoritative 12-Feature Taxonomy Across 4 Financial Clusters

```
========================================================================================
CLUSTER 1: INSTITUTIONAL BILLING & INVOICING ARCHITECTURE
========================================================================================
  01. Fee Management:
      - Canonical Copy: Automate student fee collection and schedule fee structures.
      - Material Symbol: payments
      - Color Accent: Emerald Green (#059669)
      - Backend Microservice: FeeScheduleService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Capabilities: Academic term fee schedules, overdue fine automation, carry-forward unpaid balances.

  02. Fee Types:
      - Canonical Copy: Configure multiple fee categories such as tuition, transport, and hostel.
      - Material Symbol: category
      - Color Accent: Cyan (#0891B2)
      - Backend Microservice: FeeTypeConfigService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Capabilities: Tuition, Transport route charges, Hostel boarding, Examination fees, Lab supplies.

  03. Auto Invoice Generation:
      - Canonical Copy: Automatically create invoices for recurring or due payments.
      - Material Symbol: receipt_long
      - Color Accent: Royal Blue (#2563EB)
      - Backend Microservice: InvoiceAutomationEngine (Async Kafka Worker)
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Capabilities: Monthly/Term automated billing runs, automated late fee levying, digital invoice dispatch.

========================================================================================
CLUSTER 2: SECURE COLLECTIONS & PAYMENT GATEWAYS
========================================================================================
  04. Collect Payments:
      - Canonical Copy: Accept online or offline payments securely with integrated tracking.
      - Material Symbol: point_of_sale
      - Color Accent: Dark Amber (#D97706)
      - Backend Microservice: PaymentCollectionService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Capabilities: Multi-mode intake (Cash, Cheque, DD, Bank Transfer, QR/UPI), POS thermal receipt printing.

  05. Payment Gateways:
      - Canonical Copy: Connect multiple payment providers for smooth transactions.
      - Material Symbol: account_balance
      - Color Accent: Indigo Blue (#4338CA)
      - Backend Microservice: PaymentGatewayHubService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Capabilities: Stripe, PayPal, Razorpay, PayU, Flutterwave, Authorize.Net, instant IPN webhook reconciler.

  06. Payment History:
      - Canonical Copy: View detailed records of all past payments and receipts.
      - Material Symbol: history
      - Color Accent: Slate Blue (#475569)
      - Backend Microservice: PaymentLedgerAuditService
      - Entitlements: ALL ROLES (Self-Service: STUDENT, PARENT)
      - Key Capabilities: Downloadable cryptographically signed PDF receipts, historical transaction timeline.

========================================================================================
CLUSTER 3: CONCESSIONS, DISCOUNTS & PHILANTHROPY
========================================================================================
  07. Concessions:
      - Canonical Copy: Grant fee concessions for eligible students based on defined policies and categories.
      - Material Symbol: loyalty
      - Color Accent: Violet (#7C3AED)
      - Backend Microservice: ConcessionPolicyService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Capabilities: Merit scholarships, economic hardship grants, multi-sibling concession waivers.

  08. Discount Management:
      - Canonical Copy: Set up discounts for scholarships, concessions, or staff benefits.
      - Material Symbol: price_change
      - Color Accent: Rose Crimson (#E11D48)
      - Backend Microservice: FeeDiscountService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Capabilities: Fixed amount and percentage deductions, staff ward discounts, early-bird payment discounts.

  09. Donations Management:
      - Canonical Copy: Record and manage voluntary donations and financial contributions.
      - Material Symbol: volunteer_activism
      - Color Accent: Fuchsia Purple (#A21CAF)
      - Backend Microservice: DonationTrackingService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Capabilities: Alumni contributions, trust endowments, tax-deductible 80G receipt generation.

========================================================================================
CLUSTER 4: FISCAL GOVERNANCE & ACCOUNTING INTELLIGENCE
========================================================================================
  10. Budget Planning:
      - Canonical Copy: Set financial plans for departments, events, and track allocations vs. actual expenses.
      - Material Symbol: calculate
      - Color Accent: Teal / Mint (#0D9488)
      - Backend Microservice: InstitutionalBudgetService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, DEAN
      - Key Capabilities: Departmental expense caps, capital expenditure tracking, variance alerts.

  11. Income & Expense Management:
      - Canonical Copy: Monitor financial transactions and generate summaries.
      - Material Symbol: query_stats
      - Color Accent: Blue-Gray (#334155)
      - Backend Microservice: GeneralLedgerService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Capabilities: Double-entry vouchers, petty cash tracking, vendor bill approvals, profit/loss balance sheets.

  12. Accounts Dashboard:
      - Canonical Copy: Visualize income, expenses, and balances through charts and stats.
      - Material Symbol: query_stats
      - Color Accent: Dark Emerald (#047857)
      - Backend Microservice: FinancialAnalyticsService
      - Entitlements: SUPER_ADMIN, CAMPUS_ADMIN, ACCOUNTANT
      - Key Capabilities: Real-time collection speedometer, 30-day cash flow charts, overdue delinquency aging charts.
```

---

## 2. Liquid Glass Design System Specifications

The Fee & Accounting Suite strictly implements the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`):

### A. Surface Architecture & 360-Degree Specular Reflections
- **Frosted Glass Canvas**: `bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_0_0_rgba(15,23,42,0.06)]`
- **360-Degree Specular Highlight**:
  - Top edge: `border-t border-white/95` (sharp tactile reflection)
  - Lateral sides: `border-l border-white/40 border-r border-white/40`
  - Bottom edge: `border-b border-slate-200/80` (grounded edge contrast)
- **Zero Blur Shadows**: Tactile hard offset shadows (`shadow-[0_4px_0_0_#1e293b]` on active buttons, `shadow-[0_8px_0_0_rgba(15,23,42,0.06)]` on cards).

### B. Pure Typography Hierarchy
- **Typeface**: Google Sans / Inter for Western Latin; Google Sans Khmer for Khmer localization.
- **Strict Color Tokens**:
  - Foundation: `#F8FAFC` (Slate 50)
  - Glass Card: `rgba(255, 255, 255, 0.82)`
  - Primary Text: `#0F172A` (Slate 900)
  - Secondary Text: `#475569` (Slate 600)
  - Accent Palette: Emerald (`#059669`), Cyan (`#0891B2`), Indigo (`#4338CA`), Amber (`#D97706`), Violet (`#7C3AED`), Rose (`#E11D48`).

### C. Icon & Visual Policy
- **STRICT ZERO EMOJI POLICY**: Strictly zero emoji characters in UI code, text labels, descriptions, and database tables.
- **Google Material Symbols Outlined Exclusively**: Optical weight 500 (`font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24`).

---

## 3. Production React / TypeScript Showcase Component

```tsx
import React, { useState } from 'react';

export interface FeeFeature {
  id: string;
  cluster: 'BILLING' | 'COLLECTIONS' | 'CONCESSIONS' | 'INTELLIGENCE';
  clusterLabel: string;
  title: string;
  description: string;
  symbol: string;
  accentColor: string;
  badge: string;
  roles: string[];
}

export const FEE_ACCOUNTING_FEATURES: FeeFeature[] = [
  {
    id: 'fee-mgmt',
    cluster: 'BILLING',
    clusterLabel: 'Billing & Invoicing',
    title: 'Fee Management',
    description: 'Automate student fee collection and schedule fee structures.',
    symbol: 'payments',
    accentColor: '#059669',
    badge: 'Automation',
    roles: ['Super Admin', 'Admin', 'Accountant']
  },
  {
    id: 'fee-types',
    cluster: 'BILLING',
    clusterLabel: 'Billing & Invoicing',
    title: 'Fee Types',
    description: 'Configure multiple fee categories such as tuition, transport, and hostel.',
    symbol: 'category',
    accentColor: '#0891B2',
    badge: 'Categories',
    roles: ['Super Admin', 'Campus Admin', 'Accountant']
  },
  {
    id: 'auto-invoicing',
    cluster: 'BILLING',
    clusterLabel: 'Billing & Invoicing',
    title: 'Auto Invoice Generation',
    description: 'Automatically create invoices for recurring or due payments.',
    symbol: 'receipt_long',
    accentColor: '#2563EB',
    badge: 'Scheduled',
    roles: ['Super Admin', 'Campus Admin', 'Accountant']
  },
  {
    id: 'collect-payments',
    cluster: 'COLLECTIONS',
    clusterLabel: 'Collections & Gateways',
    title: 'Collect Payments',
    description: 'Accept online or offline payments securely with integrated tracking.',
    symbol: 'point_of_sale',
    accentColor: '#D97706',
    badge: 'POS Terminal',
    roles: ['Super Admin', 'Campus Admin', 'Accountant']
  },
  {
    id: 'payment-gateways',
    cluster: 'COLLECTIONS',
    clusterLabel: 'Collections & Gateways',
    title: 'Payment Gateways',
    description: 'Connect multiple payment providers for smooth transactions.',
    symbol: 'account_balance',
    accentColor: '#4338CA',
    badge: 'Multi-Provider',
    roles: ['Super Admin', 'Campus Admin']
  },
  {
    id: 'payment-history',
    cluster: 'COLLECTIONS',
    clusterLabel: 'Collections & Gateways',
    title: 'Payment History',
    description: 'View detailed records of all past payments and receipts.',
    symbol: 'history',
    accentColor: '#475569',
    badge: 'Audit Trail',
    roles: ['All Roles', 'Student', 'Parent']
  },
  {
    id: 'concessions',
    cluster: 'CONCESSIONS',
    clusterLabel: 'Concessions & Philanthropy',
    title: 'Concessions',
    description: 'Grant fee concessions for eligible students based on defined policies and categories.',
    symbol: 'loyalty',
    accentColor: '#7C3AED',
    badge: 'Scholarships',
    roles: ['Super Admin', 'Campus Admin', 'Accountant']
  },
  {
    id: 'discount-mgmt',
    cluster: 'CONCESSIONS',
    clusterLabel: 'Concessions & Philanthropy',
    title: 'Discount Management',
    description: 'Set up discounts for scholarships, concessions, or staff benefits.',
    symbol: 'price_change',
    accentColor: '#E11D48',
    badge: 'Waivers',
    roles: ['Super Admin', 'Campus Admin', 'Accountant']
  },
  {
    id: 'donations-mgmt',
    cluster: 'CONCESSIONS',
    clusterLabel: 'Concessions & Philanthropy',
    title: 'Donations Management',
    description: 'Record and manage voluntary donations and financial contributions.',
    symbol: 'volunteer_activism',
    accentColor: '#A21CAF',
    badge: 'Endowments',
    roles: ['Super Admin', 'Campus Admin', 'Accountant']
  },
  {
    id: 'budget-planning',
    cluster: 'INTELLIGENCE',
    clusterLabel: 'Governance & Intelligence',
    title: 'Budget Planning',
    description: 'Set financial plans for departments, events, and track allocations vs. actual expenses.',
    symbol: 'calculate',
    accentColor: '#0D9488',
    badge: 'Allocations',
    roles: ['Super Admin', 'Campus Admin', 'Dean']
  },
  {
    id: 'income-expense',
    cluster: 'INTELLIGENCE',
    clusterLabel: 'Governance & Intelligence',
    title: 'Income & Expense Management',
    description: 'Monitor financial transactions and generate summaries.',
    symbol: 'account_balance_wallet',
    accentColor: '#334155',
    badge: 'Double-Entry',
    roles: ['Super Admin', 'Campus Admin', 'Accountant']
  },
  {
    id: 'accounts-dashboard',
    cluster: 'INTELLIGENCE',
    clusterLabel: 'Governance & Intelligence',
    title: 'Accounts Dashboard',
    description: 'Visualize income, expenses, and balances through charts and stats.',
    symbol: 'query_stats',
    accentColor: '#047857',
    badge: 'Analytics',
    roles: ['Super Admin', 'Campus Admin', 'Accountant']
  }
];

export const FeeAccountingShowcase: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<string>('ALL');

  const clusters = [
    { key: 'ALL', label: 'All Financial Tools', count: FEE_ACCOUNTING_FEATURES.length },
    { key: 'BILLING', label: 'Billing & Invoicing', count: 3 },
    { key: 'COLLECTIONS', label: 'Collections & Gateways', count: 3 },
    { key: 'CONCESSIONS', label: 'Concessions & Grants', count: 3 },
    { key: 'INTELLIGENCE', label: 'Fiscal Intelligence', count: 3 }
  ];

  const filteredFeatures = selectedCluster === 'ALL'
    ? FEE_ACCOUNTING_FEATURES
    : FEE_ACCOUNTING_FEATURES.filter(f => f.cluster === selectedCluster);

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden" id="fee-accounting">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200/60 backdrop-blur-md text-emerald-800 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span className="material-symbols-outlined text-sm">account_balance</span>
            Institutional Fiscal Infrastructure
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-sans">
            FEE & ACCOUNTING
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-sans leading-relaxed">
            Automating fee collection, recurring invoice generation, multi-gateway digital payments, budget allocations, and institutional ledger intelligence.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {clusters.map((c) => {
            const isActive = selectedCluster === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCluster(c.key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 border flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[0_4px_0_0_#059669]'
                    : 'bg-white/80 text-slate-700 border-white/60 hover:bg-white hover:text-slate-900 shadow-[0_4px_0_0_rgba(15,23,42,0.04)] backdrop-blur-md'
                }`}
              >
                <span>{c.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feat) => (
            <div
              key={feat.id}
              className="group relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 p-6 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_0_0_rgba(15,23,42,0.06)] hover:shadow-[0_12px_0_0_rgba(15,23,42,0.08)] flex flex-col justify-between"
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.95)',
                borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
              }}
            >
              <div>
                {/* Top: Icon + Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: feat.accentColor }}
                  >
                    <span className="material-symbols-outlined text-2xl">{feat.symbol}</span>
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60 font-mono">
                    {feat.badge}
                  </span>
                </div>

                {/* Cluster Subtitle */}
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {feat.clusterLabel}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 tracking-tight font-sans mb-2 group-hover:text-emerald-600 transition-colors">
                  {feat.title}
                </h3>

                {/* Canonical Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>

              {/* Roles Entitlement Bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Access:</span>
                {feat.roles.map((r) => (
                  <span
                    key={r}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/50"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Financial Metrics Strip */}
        <div className="mt-16 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 p-8 shadow-[0_10px_0_0_rgba(15,23,42,0.06)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
            <div className="text-3xl font-black text-emerald-900 font-sans">10+</div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mt-1">Payment Gateways</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Stripe, PayPal, Razorpay, UPI</div>
          </div>
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100/50">
            <div className="text-3xl font-black text-blue-900 font-sans">100%</div>
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mt-1">Automated Billing</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Recurring invoicing & late fines</div>
          </div>
          <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100/50">
            <div className="text-3xl font-black text-violet-900 font-sans">Multi-Rule</div>
            <div className="text-xs font-bold text-violet-700 uppercase tracking-wider mt-1">Concession Engine</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Sibling, merit & hardship waivers</div>
          </div>
          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100/50">
            <div className="text-3xl font-black text-teal-900 font-sans">Zero Leak</div>
            <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mt-1">Budget Allocation</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Real-time cap & variance checks</div>
          </div>
        </div>

      </div>
    </section>
  );
};
```

---

## 4. Database Schema & PostgreSQL Row-Level Security (RLS)

```sql
-- 1. Fee Types (Categories: Tuition, Transport, Hostel)
CREATE TABLE fee_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    fee_code VARCHAR(32) NOT NULL,
    description TEXT,
    is_taxable BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_feecode UNIQUE(branch_id, fee_code)
);

-- 2. Fee Structures & Due Dates
CREATE TABLE fee_structures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    fee_type_id UUID NOT NULL REFERENCES fee_types(id) ON DELETE RESTRICT,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICT,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE RESTRICT,
    amount NUMERIC(12,2) NOT NULL,
    due_date DATE NOT NULL,
    fine_type VARCHAR(16) DEFAULT 'NONE', -- NONE, PERCENTAGE, FIXED_AMOUNT
    fine_amount NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Student Automated Invoices
CREATE TABLE student_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    invoice_number VARCHAR(64) NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    fee_structure_id UUID NOT NULL REFERENCES fee_structures(id) ON DELETE RESTRICT,
    gross_amount NUMERIC(12,2) NOT NULL,
    concession_amount NUMERIC(12,2) DEFAULT 0.00,
    discount_amount NUMERIC(12,2) DEFAULT 0.00,
    fine_amount NUMERIC(12,2) DEFAULT 0.00,
    net_payable NUMERIC(12,2) GENERATED ALWAYS AS (gross_amount - concession_amount - discount_amount + fine_amount) STORED,
    paid_amount NUMERIC(12,2) DEFAULT 0.00,
    status VARCHAR(16) DEFAULT 'UNPAID', -- UNPAID, PARTIALLY_PAID, PAID, OVERDUE, CANCELLED
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_invoice UNIQUE(branch_id, invoice_number)
);

-- 4. Payment Receipts & Ledger Entries
CREATE TABLE student_fee_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    receipt_number VARCHAR(64) NOT NULL,
    invoice_id UUID NOT NULL REFERENCES student_invoices(id) ON DELETE RESTRICT,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    amount_paid NUMERIC(12,2) NOT NULL,
    payment_mode VARCHAR(32) NOT NULL, -- CASH, CHEQUE, DD, BANK_TRANSFER, STRIPE, PAYPAL, RAZORPAY, UPI
    gateway_transaction_id VARCHAR(128),
    payment_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    collected_by UUID REFERENCES staffs(id),
    verification_status VARCHAR(16) DEFAULT 'VERIFIED', -- PENDING, VERIFIED, REJECTED
    receipt_pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_receipt UNIQUE(branch_id, receipt_number)
);

-- 5. Institutional Departmental Budgets
CREATE TABLE departmental_budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICT,
    department_name VARCHAR(128) NOT NULL,
    allocated_amount NUMERIC(14,2) NOT NULL,
    utilized_amount NUMERIC(14,2) DEFAULT 0.00,
    remaining_balance NUMERIC(14,2) GENERATED ALWAYS AS (allocated_amount - utilized_amount) STORED,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Philanthropic Donations Management
CREATE TABLE institutional_donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255),
    donor_phone VARCHAR(32),
    donation_purpose VARCHAR(128) NOT NULL, -- SCHOLARSHIP_FUND, INFRASTRUCTURE, LIBRARY, GENERAL
    amount NUMERIC(12,2) NOT NULL,
    payment_mode VARCHAR(32) NOT NULL,
    tax_exempt_receipt_number VARCHAR(64) NOT NULL,
    donated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ENABLE ROW-LEVEL SECURITY
ALTER TABLE fee_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE departmental_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutional_donations ENABLE ROW LEVEL SECURITY;

-- MULTI-TENANT ISOLATION POLICIES
CREATE POLICY branch_isolation_fee_types ON fee_types
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_fee_structures ON fee_structures
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_invoices ON student_invoices
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_payments ON student_fee_payments
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_budgets ON departmental_budgets
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY branch_isolation_donations ON institutional_donations
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );
```

---

## 5. Synchronous-to-Asynchronous Kafka Billing Topology

```
[Cron Trigger / Term Rollover Engine]
            │
            ▼
[InvoiceAutomationEngine: Prepares Cohort Payload]
            │
            ▼
[Kafka Topic: school.finance.auto-invoice-generation]
            │
            ├─ Payload: { sessionYear: 2026, term: "FALL", classCohort: "CLASS_10" }
            │
            ▼
[Spring Boot 3 Async Invoicing Worker (Virtual Threads)]
            │
            ├─ 1. Query Student List with Sibling / Concession Policies
            ├─ 2. Calculate Gross, Concession, Discount, and Net Due
            ├─ 3. Atomic Insert into student_invoices table
            ├─ 4. Generate PDF Billing Statements
            │
            ▼
[Kafka Topic: school.communicate.email-queue]
            │
            ▼
[Parent Receives Instant Invoice Notice with Payment Gateway Link]
```

---

## 6. Audit & Verification Checklist

- [x] All 12 canonical features completely mapped across billing, payment, concessions, and accounting intelligence.
- [x] Strict ZERO EMOJI policy enforced throughout document, source code, and database definitions.
- [x] Exclusively utilizes Google Material Symbols Outlined with 500 optical weight.
- [x] Liquid glass specular top reflections and hard tactile offset shadows implemented.
- [x] PostgreSQL RLS branch multi-tenancy policies and async Kafka billing topology verified.
