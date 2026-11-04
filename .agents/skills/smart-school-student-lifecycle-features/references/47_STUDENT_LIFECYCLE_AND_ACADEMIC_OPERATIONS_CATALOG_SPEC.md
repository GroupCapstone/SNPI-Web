---
name: smart-school-student-lifecycle-features
description: Authoritative UI/UX design standard, component architecture, and implementation guidelines for the complete 16-Feature Student Lifecycle, Academic Operations & Parent Engagement Catalog on the Smart School Enterprise Platform. Covers Homework Management, Lesson Management, Attendance, Events, Student Management, Student Documents Upload, Transfer Certificates, Student Leaves, Student Noticeboard, Guardian/Parent Portal, Birthday Tracker, Student ID Cards, Student Promotions, Fee & Payment History, Custom Certificates, and School Transfers. Trigger on: "student lifecycle", "academic operations catalog", "transfer certificates", "student documents upload", "student leaves", "birthday tracker", "student promotions", "custom certificates", "school transfers".
---

# Student Lifecycle & Academic Operations Catalog Standard
## Smart School Enterprise Platform (ABLOB Architecture)

The **Student Lifecycle & Academic Operations Catalog** establishes the definitive feature showcase and implementation standard for the 16 core student, pedagogical, and administrative workflows in the **Smart School Enterprise Platform**.

This catalog bridges prospective institution requirements on the **Public Front Site** (`PUBLIC_CMS`) with concrete backend microservices in **Spring Boot 3**, **PostgreSQL RLS**, and the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`).

---

## 1. Authoritative 16-Feature Taxonomy Across 4 Clusters

```
CLUSTER A: INSTRUCTIONAL DELIVERY & CLASSROOM OPERATIONS
  01. Homework Management:
      Description: Assign, collect, and evaluate homework submissions efficiently.
      Symbol: assignment
      Accent Color: Royal Blue (#2563EB)
      Backend Service: HomeworkService / S3 Attachment Vault

  02. Lesson Management:
      Description: Structure lessons and maintain progress tracking for each subject.
      Symbol: menu_book
      Accent Color: Teal / Mint (#0D9488)
      Backend Service: SyllabusService / TopicMilestoneRepository

  03. Attendance:
      Description: Mark daily attendance and generate reports for students and staff.
      Symbol: fact_check
      Accent Color: Amber Orange (#F59E0B)
      Backend Service: AttendanceRollService / QRBiometricSync

  04. Events:
      Description: Plan and share details of academic and cultural events with stakeholders.
      Symbol: event_available
      Accent Color: Rose Crimson (#E11D48)
      Backend Service: CalendarEventService / PushNotificationDispatcher

CLUSTER B: STUDENT RECORDS & DOCUMENT DOSSIERS
  05. Student Management:
      Description: Maintain comprehensive student records, including personal, academic, and attendance details.
      Symbol: badge
      Accent Color: Indigo Slate (#4338CA)
      Backend Service: StudentDossierService / AcademicProfileRepository

  06. Student Documents Upload:
      Description: Upload identity proofs, certificates, medical reports, and more securely.
      Symbol: upload_file
      Accent Color: Cyan (#0891B2)
      Backend Service: SecureDocumentVaultService (AES-256 Encrypted)

  07. Transfer Certificates:
      Description: Generate and print transfer certificates with a single click.
      Symbol: assignment_turned_in
      Accent Color: Emerald Green (#059669)
      Backend Service: CertificateGenerationService / PDFEngine

  08. Student Leaves:
      Description: Manage leave requests and approvals within the student portal.
      Symbol: event_busy
      Accent Color: Violet (#7C3AED)
      Backend Service: StudentLeaveWorkflowService / DeanApprovalWorkflow

CLUSTER C: COMMUNICATION & COMMUNITY ENGAGEMENT
  09. Student Noticeboard:
      Description: Share updates, circulars, and important announcements with students.
      Symbol: campaign
      Accent Color: Sky Blue (#0284C7)
      Backend Service: CircularBroadcastService / FeedRepository

  10. Guardian / Parent Portal:
      Description: Give parents access to monitor attendance, grades, feedback, and notifications.
      Symbol: family_restroom
      Accent Color: Deep Purple (#6B21A8)
      Backend Service: ParentPortalService / MultiChildSwitcherEngine

  11. Birthday Tracker:
      Description: Automatically track and display upcoming student birthdays.
      Symbol: cake
      Accent Color: Pink (#DB2777)
      Backend Service: BirthdayCronService / DailyCelebrationNotifier

  12. Student ID Cards:
      Description: Automatically generate personalized student identification cards.
      Symbol: contact_mail
      Accent Color: Slate Blue (#475569)
      Backend Service: IDCardTemplateEngine / BarcodeStamper

CLUSTER D: ADMINISTRATIVE LIFECYCLE & FINANCIAL COMPLIANCE
  13. Student Promotions:
      Description: Promote students to higher classes manually or through automation.
      Symbol: upgrade
      Accent Color: Lime Green (#65A30D)
      Backend Service: ClassPromotionService / AcademicSessionTransition

  14. Fee & Payment History:
      Description: Track student fee payments, pending balances, and generate fee reports.
      Symbol: payments
      Accent Color: Amber Gold (#D97706)
      Backend Service: FeeLedgerService / MultiGatewayReconciler

  15. Custom Certificates:
      Description: Design and issue academic or achievement certificates using editable templates.
      Symbol: workspace_premium
      Accent Color: Fuchsia (#C026D3)
      Backend Service: CertificateTemplateBuilder / DynamicFieldInjector

  16. School Transfers:
      Description: Handle inter-school or inter-branch transfers seamlessly.
      Symbol: sync_alt
      Accent Color: Dark Indigo (#1E1B4B)
      Backend Service: InterBranchTransferService / TenantMigrationEngine
```

---

## 2. Liquid Glass Design System Specifications

1. **Interactive Cluster Filtering**:
   - Filter pills: `All Features (16)`, `Instructional (4)`, `Student Records (4)`, `Communication (4)`, `Administrative (4)`.
   - Real-time client-side search bar with instant substring filtering on title, description, or cluster.
2. **Glass Card Elevation & Tactile Physics**:
   - Surface: `bg-white/80 backdrop-blur-xl border border-slate-200/80`.
   - Top Specular Rim: `border-t-white/90` with hard offset shadow (`shadow-[0_10px_25px_-5px_rgba(15,23,42,0.06)]`).
   - Micro-Interactions: Smooth hover lift (`hover:-translate-y-1.5`) and squircle icon pocket scale (`group-hover:scale-110`).
3. **Strict Zero Emoji Policy**: Exclusively uses Google Material Symbols Outlined. No unicode symbols or emojis under any circumstances.

---

## 3. Production React / Next.js Component Implementation

```tsx
import React, { useState } from 'react';

export type FeatureCluster = 'all' | 'instructional' | 'records' | 'community' | 'admin';

export interface CatalogFeature {
  id: string;
  cluster: 'instructional' | 'records' | 'community' | 'admin';
  clusterName: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  iconColor: string;
  hoverBorder: string;
}

export const CATALOG_FEATURES: CatalogFeature[] = [
  // Cluster A: Instructional Delivery
  {
    id: 'homework',
    cluster: 'instructional',
    clusterName: 'Instructional',
    title: 'Homework Management',
    description: 'Assign, collect, and evaluate homework submissions efficiently.',
    icon: 'assignment',
    badge: 'PEDAGOGY',
    iconColor: 'bg-blue-50 text-blue-600 border-blue-200',
    hoverBorder: 'hover:border-blue-500/50',
  },
  {
    id: 'lesson',
    cluster: 'instructional',
    clusterName: 'Instructional',
    title: 'Lesson Management',
    description: 'Structure lessons and maintain progress tracking for each subject.',
    icon: 'menu_book',
    badge: 'SYLLABUS',
    iconColor: 'bg-teal-50 text-teal-600 border-teal-200',
    hoverBorder: 'hover:border-teal-500/50',
  },
  {
    id: 'attendance',
    cluster: 'instructional',
    clusterName: 'Instructional',
    title: 'Attendance',
    description: 'Mark daily attendance and generate reports for students and staff.',
    icon: 'fact_check',
    badge: 'DAILY REGISTRY',
    iconColor: 'bg-amber-50 text-amber-600 border-amber-200',
    hoverBorder: 'hover:border-amber-500/50',
  },
  {
    id: 'events',
    cluster: 'instructional',
    clusterName: 'Instructional',
    title: 'Events',
    description: 'Plan and share details of academic and cultural events with stakeholders.',
    icon: 'event_available',
    badge: 'CALENDAR',
    iconColor: 'bg-rose-50 text-rose-600 border-rose-200',
    hoverBorder: 'hover:border-rose-500/50',
  },

  // Cluster B: Student Records & Documents
  {
    id: 'student-mgmt',
    cluster: 'records',
    clusterName: 'Student Records',
    title: 'Student Management',
    description: 'Maintain comprehensive student records, including personal, academic, and attendance details.',
    icon: 'badge',
    badge: 'DOSSIER',
    iconColor: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    hoverBorder: 'hover:border-indigo-500/50',
  },
  {
    id: 'student-docs',
    cluster: 'records',
    clusterName: 'Student Records',
    title: 'Student Documents Upload',
    description: 'Upload identity proofs, certificates, medical reports, and more securely.',
    icon: 'upload_file',
    badge: 'SECURE VAULT',
    iconColor: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    hoverBorder: 'hover:border-cyan-500/50',
  },
  {
    id: 'transfer-certs',
    cluster: 'records',
    clusterName: 'Student Records',
    title: 'Transfer Certificates',
    description: 'Generate and print transfer certificates with a single click.',
    icon: 'assignment_turned_in',
    badge: 'ONE-CLICK PDF',
    iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    hoverBorder: 'hover:border-emerald-500/50',
  },
  {
    id: 'student-leaves',
    cluster: 'records',
    clusterName: 'Student Records',
    title: 'Student Leaves',
    description: 'Manage leave requests and approvals within the student portal.',
    icon: 'event_busy',
    badge: 'APPROVALS',
    iconColor: 'bg-violet-50 text-violet-600 border-violet-200',
    hoverBorder: 'hover:border-violet-500/50',
  },

  // Cluster C: Communication & Community
  {
    id: 'noticeboard',
    cluster: 'community',
    clusterName: 'Communication',
    title: 'Student Noticeboard',
    description: 'Share updates, circulars, and important announcements with students.',
    icon: 'campaign',
    badge: 'BROADCAST',
    iconColor: 'bg-sky-50 text-sky-600 border-sky-200',
    hoverBorder: 'hover:border-sky-500/50',
  },
  {
    id: 'parent-portal',
    cluster: 'community',
    clusterName: 'Communication',
    title: 'Guardian / Parent Portal',
    description: 'Give parents access to monitor attendance, grades, feedback, and notifications.',
    icon: 'family_restroom',
    badge: 'MULTI-CHILD',
    iconColor: 'bg-purple-50 text-purple-600 border-purple-200',
    hoverBorder: 'hover:border-purple-500/50',
  },
  {
    id: 'birthday-tracker',
    cluster: 'community',
    clusterName: 'Communication',
    title: 'Birthday Tracker',
    description: 'Automatically track and display upcoming student birthdays.',
    icon: 'cake',
    badge: 'AUTOMATION',
    iconColor: 'bg-pink-50 text-pink-600 border-pink-200',
    hoverBorder: 'hover:border-pink-500/50',
  },
  {
    id: 'id-cards',
    cluster: 'community',
    clusterName: 'Communication',
    title: 'Student ID Cards',
    description: 'Automatically generate personalized student identification cards.',
    icon: 'contact_mail',
    badge: 'BARCODE PASS',
    iconColor: 'bg-slate-100 text-slate-700 border-slate-300',
    hoverBorder: 'hover:border-slate-500/50',
  },

  // Cluster D: Administrative & Compliance
  {
    id: 'student-promotions',
    cluster: 'admin',
    clusterName: 'Administrative',
    title: 'Student Promotions',
    description: 'Promote students to higher classes manually or through automation.',
    icon: 'upgrade',
    badge: 'ANNUAL ROLLOVER',
    iconColor: 'bg-lime-50 text-lime-700 border-lime-200',
    hoverBorder: 'hover:border-lime-500/50',
  },
  {
    id: 'fee-history',
    cluster: 'admin',
    clusterName: 'Administrative',
    title: 'Fee & Payment History',
    description: 'Track student fee payments, pending balances, and generate fee reports.',
    icon: 'payments',
    badge: 'FINANCIAL LEDGER',
    iconColor: 'bg-amber-50 text-amber-700 border-amber-200',
    hoverBorder: 'hover:border-amber-500/50',
  },
  {
    id: 'custom-certs',
    cluster: 'admin',
    clusterName: 'Administrative',
    title: 'Custom Certificates',
    description: 'Design and issue academic or achievement certificates using editable templates.',
    icon: 'workspace_premium',
    badge: 'TEMPLATE BUILDER',
    iconColor: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    hoverBorder: 'hover:border-fuchsia-500/50',
  },
  {
    id: 'school-transfers',
    cluster: 'admin',
    clusterName: 'Administrative',
    title: 'School Transfers',
    description: 'Handle inter-school or inter-branch transfers seamlessly.',
    icon: 'sync_alt',
    badge: 'MULTI-BRANCH',
    iconColor: 'bg-indigo-950/10 text-indigo-900 border-indigo-300',
    hoverBorder: 'hover:border-indigo-800/50',
  },
];

export const StudentLifecycleCatalog: React.FC = () => {
  const [activeCluster, setActiveCluster] = useState<FeatureCluster>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFeatures = CATALOG_FEATURES.filter((item) => {
    const matchesCluster = activeCluster === 'all' || item.cluster === activeCluster;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCluster && matchesSearch;
  });

  return (
    <section id="student-lifecycle-catalog" className="relative py-24 bg-white overflow-hidden">
      {/* Background Liquid Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-tr from-sky-50 via-indigo-50/40 to-emerald-50 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-100 text-slate-700 border border-slate-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Complete Student Lifecycle Suite
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 uppercase">
            End-to-End Academic & Student Operations
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            From admissions and daily attendance to grading, fee reconciliation, and annual promotions, manage every phase of the student journey effortlessly.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Cluster Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-100/80 backdrop-blur-md rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setActiveCluster('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCluster === 'all'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Features (16)
            </button>
            <button
              onClick={() => setActiveCluster('instructional')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCluster === 'instructional'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Instructional (4)
            </button>
            <button
              onClick={() => setActiveCluster('records')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCluster === 'records'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Records & Docs (4)
            </button>
            <button
              onClick={() => setActiveCluster('community')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCluster === 'community'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Community (4)
            </button>
            <button
              onClick={() => setActiveCluster('admin')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCluster === 'admin'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Administrative (4)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl select-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search features..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium placeholder-slate-400"
            />
          </div>
        </div>

        {/* 4-Column Liquid Glass Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatures.map((item) => (
            <div
              key={item.id}
              className={`group relative flex flex-col p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_35px_-10px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1.5 ${item.hoverBorder}`}
            >
              {/* Top Specular Rim */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

              {/* Icon & Badge Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${item.iconColor}`}>
                  <span className="material-symbols-outlined text-2xl select-none">
                    {item.icon}
                  </span>
                </div>
                <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {item.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed flex-grow">
                {item.description}
              </p>

              {/* Action Link */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-slate-900">
                <span>View Capability</span>
                <span className="material-symbols-outlined text-base transition-transform duration-200 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentLifecycleCatalog;
```

---

## 4. Architectural Verification & Compliance Checklist

- [x] **Zero Emoji Compliance**: 100% devoid of unicode emojis across all titles, descriptions, and code.
- [x] **Google Material Symbols Exclusively**: Uses standard symbols for all 16 features.
- [x] **Word-for-Word Copy Fidelity**: Exact matches for all 16 items provided by the user.
- [x] **Liquid Glass Design Standards**: Enforces backdrop blur, specular top reflection, 4-cluster filtering, and responsive 4-column layout.
