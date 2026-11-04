---
name: smart-school-powerful-tools
description: Authoritative UI/UX design standard, component architecture, and implementation guidelines for the "POWERFUL TOOLS FOR EFFICIENT SCHOOL MANAGEMENT" showcase section on the Smart School Public Front Site. Covers both the Role-Based Governance Suite (Super Admin, Admin, Teacher, Accountant, Custom Role) and the Core Academic Operations Suite (Homework Management, Lesson Management, Attendance, Events). Trigger on: "powerful tools", "efficient school management", "role-based tools", "custom role", "homework management", "lesson management", "attendance events", "front site tools".
---

# Powerful Tools for Efficient School Management: Showcase Standard
## Smart School Enterprise Platform (ABLOB Architecture)

The **"Powerful Tools for Efficient School Management"** showcase is the central capabilities and functional catalog rendered on the **Smart School Public Front Site** (`PUBLIC_CMS`). It visually demonstrates to prospective institutions how role-based permissions and dedicated operational modules eliminate friction, accelerate communication, and automate daily campus workflows.

This skill mandates strict adherence to the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`), **Google Material Symbols**, zero emoji enforcement, and production-grade React / Tailwind CSS implementation.

---

## 1. Authoritative Copy & Structure Guidelines

The section consists of two integrated operational tiers:

```
Section Anchor: #powerful-tools
Section Badge: ENTERPRISE CAPABILITIES
Section Headline (H2): POWERFUL TOOLS FOR EFFICIENT SCHOOL MANAGEMENT
Section Sub-Headline (P): Discover role-based tools that help schools streamline operations, improve communication, and manage academic and administrative tasks efficiently.

TIER 1: ROLE-BASED GOVERNANCE SUITE (5 Roles)
  01. Super Admin:
      Description: Access all features and manage schools, users, settings, permissions, and system operations.
      Symbol: admin_panel_settings
      Color Accent: Deep Indigo / Violet (#4338CA / #8E24AA)
      Role Token: SUPER_ADMIN

  02. Admin:
      Description: Manage daily school operations, users, academic activities, settings, and reports.
      Symbol: shield_person
      Color Accent: Slate Blue / Cyan (#0288D1 / #1E293B)
      Role Token: CAMPUS_ADMIN

  03. Teacher:
      Description: Manage students, attendance, homework, lessons, examinations, and academic activities.
      Symbol: school
      Color Accent: Emerald Green (#059669 / #10B981)
      Role Token: TEACHER

  04. Accountant:
      Description: Track student fees, invoices, income, expenses, and financial reports in one place.
      Symbol: payments
      Color Accent: Amber Gold (#D97706 / #FF9800)
      Role Token: ACCOUNTANT

  05. Custom Role:
      Description: Create custom user roles and assign permissions according to your institution's requirements.
      Symbol: tune
      Color Accent: Royal Purple (#7C3AED / #9333EA)
      Role Token: CUSTOM_ROLE_BUILDER

TIER 2: CORE ACADEMIC & OPERATIONAL TOOLS (4 Modules)
  01. Homework Management:
      Description: Assign, collect, and evaluate homework submissions efficiently.
      Symbol: assignment
      Color Accent: Royal Blue (#2563EB)

  02. Lesson Management:
      Description: Structure lessons and maintain progress tracking for each subject.
      Symbol: menu_book
      Color Accent: Teal / Mint (#0D9488)

  03. Attendance:
      Description: Mark daily attendance and generate reports for students and staff.
      Symbol: fact_check
      Color Accent: Amber Orange (#F59E0B)

  04. Events:
      Description: Plan and share details of academic and cultural events with stakeholders.
      Symbol: event_available
      Color Accent: Rose Crimson (#E11D48)
```

---

## 2. Liquid Glass Design System Specifications

### 2.1 Tabbed / Segmented Controller
- **Dual-View Switcher**: A segmented Liquid Glass pill controller at the top of the cards allowing users to view:
  - `Role-Based Governance (5 Roles)`
  - `Academic & Operational Tools (4 Modules)`
  - `Unified View (All 9 Tools)`
- **Pill Container**: `bg-slate-100/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 inline-flex`.
- **Active Pill**: `bg-white shadow-sm text-slate-900 font-bold border border-slate-200/60`.

### 2.2 Glass Card Elevation & Tactile Physics
- **Card Background**: `bg-white/80 backdrop-blur-xl`.
- **Border**: `1px solid rgba(226, 232, 240, 0.8)` with top specular edge highlight (`border-t-white/90`).
- **Shadow**: `box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.03)`.
- **Hover Micro-Physics**: Smooth `-translate-y-1.5` lift with specular sheen sweep.
- **Icon Pocket**: Squircle container (`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`).

---

## 3. Production React / Next.js Component Implementation

```tsx
import React, { useState } from 'react';

interface ToolItem {
  id: string;
  category: 'role' | 'feature';
  title: string;
  description: string;
  icon: string;
  badge: string;
  colorClass: string;
  borderHoverClass: string;
}

const TOOLS: ToolItem[] = [
  // Tier 1: Role-Based Governance
  {
    id: 'super-admin',
    category: 'role',
    title: 'Super Admin',
    description: 'Access all features and manage schools, users, settings, permissions, and system operations.',
    icon: 'admin_panel_settings',
    badge: 'ROOT GOVERNANCE',
    colorClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    borderHoverClass: 'hover:border-indigo-500/50',
  },
  {
    id: 'admin',
    category: 'role',
    title: 'Admin',
    description: 'Manage daily school operations, users, academic activities, settings, and reports.',
    icon: 'shield_person',
    badge: 'CAMPUS SOVEREIGNTY',
    colorClass: 'bg-sky-50 text-sky-700 border-sky-200',
    borderHoverClass: 'hover:border-sky-500/50',
  },
  {
    id: 'teacher',
    category: 'role',
    title: 'Teacher',
    description: 'Manage students, attendance, homework, lessons, examinations, and academic activities.',
    icon: 'school',
    badge: 'INSTRUCTIONAL HUB',
    colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderHoverClass: 'hover:border-emerald-500/50',
  },
  {
    id: 'accountant',
    category: 'role',
    title: 'Accountant',
    description: 'Track student fees, invoices, income, expenses, and financial reports in one place.',
    icon: 'payments',
    badge: 'FISCAL CASHIER',
    colorClass: 'bg-amber-50 text-amber-700 border-amber-200',
    borderHoverClass: 'hover:border-amber-500/50',
  },
  {
    id: 'custom-role',
    category: 'role',
    title: 'Custom Role',
    description: "Create custom user roles and assign permissions according to your institution's requirements.",
    icon: 'tune',
    badge: 'GRANULAR RBAC',
    colorClass: 'bg-purple-50 text-purple-700 border-purple-200',
    borderHoverClass: 'hover:border-purple-500/50',
  },

  // Tier 2: Academic & Operational Tools
  {
    id: 'homework',
    category: 'feature',
    title: 'Homework Management',
    description: 'Assign, collect, and evaluate homework submissions efficiently.',
    icon: 'assignment',
    badge: 'PEDAGOGY SUITE',
    colorClass: 'bg-blue-50 text-blue-700 border-blue-200',
    borderHoverClass: 'hover:border-blue-500/50',
  },
  {
    id: 'lesson',
    category: 'feature',
    title: 'Lesson Management',
    description: 'Structure lessons and maintain progress tracking for each subject.',
    icon: 'menu_book',
    badge: 'SYLLABUS TRACKER',
    colorClass: 'bg-teal-50 text-teal-700 border-teal-200',
    borderHoverClass: 'hover:border-teal-500/50',
  },
  {
    id: 'attendance',
    category: 'feature',
    title: 'Attendance',
    description: 'Mark daily attendance and generate reports for students and staff.',
    icon: 'fact_check',
    badge: 'DAILY REGISTRY',
    colorClass: 'bg-orange-50 text-orange-700 border-orange-200',
    borderHoverClass: 'hover:border-orange-500/50',
  },
  {
    id: 'events',
    category: 'feature',
    title: 'Events',
    description: 'Plan and share details of academic and cultural events with stakeholders.',
    icon: 'event_available',
    badge: 'CAMPUS CALENDAR',
    colorClass: 'bg-rose-50 text-rose-700 border-rose-200',
    borderHoverClass: 'hover:border-rose-500/50',
  },
];

export const PowerfulToolsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'role' | 'feature'>('all');

  const filteredTools = TOOLS.filter((t) => filter === 'all' || t.category === filter);

  return (
    <section id="powerful-tools" className="relative py-24 bg-slate-50/50 overflow-hidden">
      {/* Subtle Liquid Glass Ambient Mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-indigo-100/30 via-sky-100/20 to-emerald-100/30 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-200/80 text-slate-700 border border-slate-300/60 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            Enterprise Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 uppercase">
            Powerful Tools for Efficient School Management
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            Discover role-based tools that help schools streamline operations, improve communication, and manage academic and administrative tasks efficiently.
          </p>
        </div>

        {/* Liquid Glass Segmented View Filter */}
        <div className="flex justify-center mb-14">
          <div className="bg-slate-200/60 backdrop-blur-md p-1 rounded-2xl border border-slate-300/60 inline-flex shadow-inner">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Tools (9)
            </button>
            <button
              onClick={() => setFilter('role')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all ${
                filter === 'role'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Role Portals (5)
            </button>
            <button
              onClick={() => setFilter('feature')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all ${
                filter === 'feature'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academic Modules (4)
            </button>
          </div>
        </div>

        {/* Liquid Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className={`group relative flex flex-col p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_35px_-10px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1.5 ${tool.borderHoverClass}`}
            >
              {/* Top Specular Rim */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

              {/* Header row: Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${tool.colorClass}`}>
                  <span className="material-symbols-outlined text-3xl select-none">
                    {tool.icon}
                  </span>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {tool.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2.5">
                {tool.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                {tool.description}
              </p>

              {/* Footer Indicator */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-slate-900">
                <span>View Documentation</span>
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

export default PowerfulToolsSection;
```

---

## 4. Backend Microservices & Architectural Realization

1. **Role Portals Architecture**:
   - **Super Admin**: Connects to `TenantManagementService` and `SystemBackupService` with global root bypass permissions.
   - **Admin**: Governed by `BranchScopeService` with strict RLS (`SET LOCAL app.current_branch_id = ?`).
   - **Teacher**: Scoped to `ClassroomPedagogyService` for period attendance taking, homework grading, and marks entry.
   - **Accountant**: Bounded by `FiscalLedgerService` for POS counter collections, fees invoicing, and payroll runs.
   - **Custom Role**: Managed by dynamic RBAC engine (`SecurityPermissionRepository`) that stores arbitrary role definitions and bitmask permissions.
2. **Academic Operations Architecture**:
   - **Homework Management**: Backed by `HomeworkService` with multi-part S3/MinIO attachment storage and evaluation status state machines.
   - **Lesson Management**: Integrated with `SyllabusService` tracking topic milestones, lesson progress percentages, and lecture note resources.
   - **Attendance**: Driven by `AttendanceRollService` supporting dual daily rolls (morning/afternoon) and biometric QR code synchronization.
   - **Events**: Powered by `CalendarEventService` emitting notification events to student and parent mobile devices.

---

## 5. Architectural Verification & Compliance Checklist

- [x] **Strict Zero Emoji Policy**: 100% devoid of unicode emojis.
- [x] **Google Material Symbols Only**: Uses `admin_panel_settings`, `shield_person`, `school`, `payments`, `tune`, `assignment`, `menu_book`, `fact_check`, `event_available`.
- [x] **Exact Copy Match**: Matches headline, subheadline, 5 role descriptions, and 4 feature descriptions word-for-word.
- [x] **Liquid Glass Aesthetics**: Enforces frosted glass cards, top specular highlight, segmented filter controller, and hover lift physics.
