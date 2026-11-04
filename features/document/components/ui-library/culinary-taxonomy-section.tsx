'use client';

import * as React from 'react';
import {
  Layers,
  Sparkles,
  Check,
  Copy,
  ChevronRight,
  BookOpen,
  AppWindow,
  Monitor,
  Smartphone,
  Sliders,
  Shield,
  LayoutGrid,
} from '@/components/icons';
import { cn } from '@/lib/utils';

export interface CulinaryStage {
  id: 'ingredients' | 'recipes' | 'entrees' | 'templates' | 'pages' | 'cookbook';
  level: number;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  checklistMapping: string;
  checklistBadge: string;
  checklistBadgeColor: 'emerald' | 'blue' | 'slate';
  examples: string[];
  keyInvariants: string[];
  codeSample: string;
  renderIcon: (active: boolean) => React.ReactNode;
}

export const CULINARY_STAGES: CulinaryStage[] = [
  {
    id: 'ingredients',
    level: 1,
    title: 'Ingredients',
    subtitle: 'Tokens & Atoms',
    summary:
      'Pure, raw, irreducible building blocks. Cannot be broken down further without losing semantic meaning.',
    description:
      'Ingredients are the elementary constants of a design system. They encapsulate raw visual choices—color hexes, typographic scales, spacing units, elevation/z-indexes, motion curves, and standalone SVG glyphs. Ingredients possess zero business logic and zero composite markup.',
    checklistMapping:
      'Foundations (0/26 Checks: Color 0/4, Layout 0/4, Typography 0/5, Elevation 0/3, Motion 0/3, Iconography 0/7)',
    checklistBadge: '0/26 Foundations',
    checklistBadgeColor: 'blue',
    examples: [
      'Color Ramps: #0056FF (Brand Blue), #0A1A4A (Navy Deep), #CAD3F5 (Border)',
      'Typography: Google Sans 36px Bold, 14px Regular, font-mono line-heights',
      'Spacing Grid: 4px, 8px, 12px, 16px, 24px, 32px standard increments',
      'Elevation Tokens: shadow-2xs, shadow-xs, z-index 10-50 layers',
      'Motion Curves: cubic-bezier(0.16, 1, 0.3, 1), 150ms-300ms timings',
      'Iconography: 24px stroke-width 2.0 Material Symbols Outlined',
    ],
    keyInvariants: [
      'Irreducible: An ingredient cannot be decomposed into smaller design units.',
      'Stateless: Holds pure values (strings, numbers, vectors) with zero execution runtime.',
      'Single Source of Truth: Exported directly from Figma tokens or Tailwind configuration.',
    ],
    codeSample: `// Level 1: Ingredients (Design Tokens)
export const TOKENS = {
  colors: {
    brandBlue: '#0056FF',
    brandNavy: '#0A1A4A',
    borderSlate: '#CAD3F5',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
  radii: {
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
} as const;`,
    renderIcon: (active: boolean) => (
      <span
        className={cn(
          'inline-block size-6 rounded-full transition-transform',
          active ? 'scale-110 shadow-md ring-2 ring-rose-400' : 'shadow-2xs',
          'bg-gradient-to-tr from-rose-500 to-red-500',
        )}
      />
    ),
  },
  {
    id: 'recipes',
    level: 2,
    title: 'Recipes',
    subtitle: 'Atomic UI Primitives',
    summary: 'Single-purpose, reusable components created by combining fundamental ingredients.',
    description:
      'Recipes combine several ingredients (tokens, typography, SVG icon, padding, hover state) into an atomic, interactive component with a single operational responsibility. They do not handle backend domain state or page-level layout.',
    checklistMapping:
      'Core Components (Atoms: Button, Checkbox, Radio, Switch, Input, Badge, Avatar, Link, Divider, Tooltip)',
    checklistBadge: 'Core Components (Atoms)',
    checklistBadgeColor: 'blue',
    examples: [
      'Button: Default, Primary, Destructive, Subtle, Link variants with focus rings',
      'Text field: Single-line input with prefix icon, clear button, and error state',
      'Input radio: Single-select radio element with accessible label association',
      'Switch: Immediate binary toggle with keyboard focus and active tactile pop',
      'Badge: Pill metadata indicator (New, Updated, Coming, Completed)',
      'Avatar: Circular user representation with fallback initials and image status',
      'Tooltip: Accessible hover/focus helper tag with aria-describedby linkage',
    ],
    keyInvariants: [
      'Atomic: Serves exactly one interactive or visual responsibility.',
      'Framework Agnostic UI: Fully accessible via keyboard navigation, screen readers, and WCAG AA contrast.',
      'Zero Direct API Calls: Driven purely by props, callbacks, and controlled state.',
    ],
    codeSample: `// Level 2: Recipes (UI Primitives)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn('rounded-xl font-sans font-bold transition-all cursor-pointer', className)}
      {...props}
    >
      {children}
    </button>
  );
}`,
    renderIcon: (active: boolean) => (
      <div className={cn('flex items-center gap-1.5 transition-transform', active && 'scale-110')}>
        <span className="size-4.5 rounded-full bg-gradient-to-tr from-rose-500 to-red-500 shadow-2xs" />
        <span className="size-4.5 rounded-full bg-gradient-to-tr from-rose-500 to-red-500 shadow-2xs" />
        <span className="size-4.5 rounded-full bg-gradient-to-tr from-rose-500 to-red-500 shadow-2xs" />
      </div>
    ),
  },
  {
    id: 'entrees',
    level: 3,
    title: 'Entrees',
    subtitle: 'Compound Components & Organisms',
    summary:
      'Complex, multi-component structures that solve complete user workflows and interaction patterns.',
    description:
      'Entrees combine multiple recipes (buttons, inputs, dropdowns, badges, dividers) into a rich, self-contained organism. An entree satisfies an end-to-end interaction need, such as a filtered data table, navigation drawer, multi-step modal dialog, or toast stack.',
    checklistMapping:
      'Core Components (Organisms: Accordion, Modal, Toast, Dropdown, Calendar, Breadcrumbs, Pagination, Select, Text Area)',
    checklistBadge: 'Core Components (Organisms)',
    checklistBadgeColor: 'blue',
    examples: [
      'Data Table: Column sorting, row selection, bulk actions, and pagination',
      'Modal Dialog: Scrim overlay, escape key dismissal, focus trap, and header/footer slots',
      'Dropdown Menu: Floating anchored listbox with keyboard arrow navigation and search',
      'Navigation Bar / Rail: Horizontal and vertical adaptive navigation controllers',
      'Accordion: Collapsible disclosure panels with smooth CSS grid transition',
      'Toast Stack: Queued ephemeral notification overlay with auto-dismiss timer and undo CTA',
      'Search Filter Bar: Composed search input with chip filters, clear-all, and sort menu',
    ],
    keyInvariants: [
      'Self-Contained Orchestration: Manages internal composition of 2 or more atomic recipes.',
      'Focus & Accessibility Containment: Traps focus (modals) or manages roving tab indexes (menus).',
      'Slot Architecture: Provides clear header, body, footer, or action slots for customization.',
    ],
    codeSample: `// Level 3: Entrees (Compound Components)
export function DataTable<T>({ columns, data, onSelectRow }: DataTableProps<T>) {
  return (
    <div className="rounded-2xl border border-[#CAD3F5] bg-white overflow-hidden shadow-xs">
      <TableHead columns={columns} />
      <TableBody data={data} onSelectRow={onSelectRow} />
      <TablePagination totalItems={data.length} />
    </div>
  );
}`,
    renderIcon: (active: boolean) => (
      <div
        className={cn(
          'h-4 w-12 rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-2xs transition-transform',
          active && 'scale-110 shadow-md ring-2 ring-rose-400',
        )}
      />
    ),
  },
  {
    id: 'templates',
    level: 4,
    title: 'Templates',
    subtitle: 'Layout Scaffolds & Page Shells',
    summary:
      'Page-level structural wireframes that position entrees across adaptive viewports without production data.',
    description:
      'Templates define the architectural skeleton of user views. They establish how top app bars, navigation rails, drawers, content canvases, and safety insets arrange and reflow across compact, medium, expanded, and large breakpoints. Templates use mock placeholders or slot props rather than real API models.',
    checklistMapping:
      'Section 05: Material Design 3 Layout Scaffold Architecture (Compact, Medium, Expanded, Large, Extra Large)',
    checklistBadge: '05 Layout Scaffold',
    checklistBadgeColor: 'blue',
    examples: [
      'Dashboard Scaffold: Fixed top bar + collapsible side rail + fluid 12-column grid canvas',
      'Settings Master-Detail: Left navigation pane (320px) + right form configuration pane',
      'Split Screen View: 50/50 dual pane layout for side-by-side editing and previewing',
      'Full-Bleed Media Layout: Top hero section + constrained content article body (840px max)',
      'Modal Form Template: Centered floating card with fixed header, scrollable body, and sticky actions',
    ],
    keyInvariants: [
      'Content Agnostic: Accepts components via slots/children; contains no hardcoded domain records.',
      'Responsive Invariant: Smoothly transitions between navigation drawer (mobile) and navigation rail (desktop).',
      'Safe Insets: Respects system status bar, dynamic island, and desktop viewport boundaries.',
    ],
    codeSample: `// Level 4: Templates (Layout Scaffolds)
export function DashboardScaffold({ topBar, sidebar, children }: DashboardScaffoldProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC]">
      <aside className="hidden w-64 border-r border-[#CAD3F5] md:block">{sidebar}</aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="h-16 border-b border-[#CAD3F5] bg-white">{topBar}</header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}`,
    renderIcon: (active: boolean) => (
      <div className={cn('flex w-12 flex-col gap-1 transition-transform', active && 'scale-110')}>
        <span className="h-2.5 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-2xs" />
        <span className="h-2.5 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-2xs" />
        <span className="h-2.5 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-2xs" />
      </div>
    ),
  },
  {
    id: 'pages',
    level: 5,
    title: 'Pages',
    subtitle: 'Production Real-World Views',
    summary:
      'Concrete, fully instantiated screens with live backend data, real state, and localized copy.',
    description:
      'Pages inject real production models, user authentication, role-based permissions, API error handling, and business logic into templates. At this level, users complete their goals—enrolling in courses, viewing campus metrics, paying invoices, or managing student rosters.',
    checklistMapping:
      'Complete Production Screen Implementations across SNP-SMS Admin, Teacher, Student, and Parent Portals',
    checklistBadge: 'Concrete Views',
    checklistBadgeColor: 'emerald',
    examples: [
      'Campus Analytics Dashboard: Live metrics, enrollment trends, lab utilization, and latency stats',
      'Student Lifecycle Hub: Admissions verification, KYC record review, document uploads',
      'Tuition Billing & Checkout: KHQR dynamic payment generation, fee calculation, receipt print',
      'Attendance Management: Class barcode scan, attendance roster, absence approval workflows',
      'Examination & Gradebook: Marks entry, grade distribution curves, report card issuance',
    ],
    keyInvariants: [
      'Fully Instantiated: Bound to real API endpoints, database models, and server actions.',
      'Resilience & States: Handles initial load skeleton, empty state, error boundary, and optimistic updates.',
      'Role Aware: Restricts visibility and actions based on user permissions (RBAC).',
    ],
    codeSample: `// Level 5: Pages (Concrete Views)
export default async function CampusAnalyticsPage() {
  const data = await fetchCampusMetrics();
  
  return (
    <DashboardScaffold topBar={<CampusHeader />} sidebar={<CampusSidebar />}>
      <MetricSummaryCards metrics={data.summary} />
      <EnrollmentChart series={data.trends} />
      <ActiveStudentsTable students={data.recent} />
    </DashboardScaffold>
  );
}`,
    renderIcon: (active: boolean) => (
      <div
        className={cn(
          'size-9 rounded-xl bg-gradient-to-tr from-rose-500 to-red-500 shadow-2xs transition-transform',
          active && 'scale-110 shadow-md ring-2 ring-rose-400',
        )}
      />
    ),
  },
  {
    id: 'cookbook',
    level: 6,
    title: 'Cookbook',
    subtitle: 'The Complete Design System',
    summary:
      'The living master manual, token governance rules, and contribution workflows that bind all tiers.',
    description:
      'The Cookbook is the supreme governance layer of the design system. It contains brand principles, accessibility requirements, component anatomy, design tokens, contribution RFC guidelines, version release procedures, and maintenance SLAs. It ensures consistency across all product teams.',
    checklistMapping:
      'Complete 4-Phase System (Design Language 5/10, Foundations 0/26, Core Components 0/166, Maintenance 0/28)',
    checklistBadge: '230 Total Checks',
    checklistBadgeColor: 'emerald',
    examples: [
      'Brand Blueprint: Vision, Principles, Voice, Terminology, Assets (5/5 Completed)',
      'Design Guidelines: Accessibility (WCAG 2.1 AA), Writing, Microcopy, i18n (0/5)',
      'Foundations: 26 token checks for Color, Layout, Typography, Elevation, Motion, Icons (0/26)',
      'Core Components Manual: 166 checks across 29 primitives with interactive demos (0/166)',
      'Maintenance Manual: 28 checks across Documentation, Local libs, Team processes, Community, RFCs (0/28)',
      'Tier 1 Browser Matrix: Chrome 120+, Safari 17+, Edge 120+, Firefox 120+',
    ],
    keyInvariants: [
      'Comprehensive: Documents every ingredient, recipe, entree, template, and page guideline.',
      'Living Governance: Governed by semantic versioning, automated quality gates, and RFC proposals.',
      'Pair Programming Ready: Accessible to both designers (Figma tokens) and developers (React library).',
    ],
    codeSample: `// Level 6: Cookbook (Design System Governance)
export const DESIGN_SYSTEM_SPEC = {
  name: 'SNP-SMS Liquid Glass M3 Design System',
  version: 'v0.2.17',
  architecture: 'Ingredients -> Recipes -> Entrees -> Templates -> Pages -> Cookbook',
  verification: {
    designLanguage: '5/10 (Brand 5/5 Completed, Guidelines 0/5)',
    foundations: '0/26 Checks',
    coreComponents: '0/166 Checks (29 Primitives)',
    maintenance: '0/28 Checks (5 Pillars)',
  },
  sla: {
    p0Security: '2h SLA',
    p1Breaking: '24h SLA',
    p2Enhancement: '5d SLA',
  },
} as const;`,
    renderIcon: (active: boolean) => (
      <div className={cn('relative size-9 transition-transform', active && 'scale-110')}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-rose-500 to-red-500 opacity-90 shadow-2xs" />
        <div className="absolute right-0 bottom-0 size-6 rounded-lg bg-white/40 backdrop-blur-xs" />
        <div className="absolute right-0 bottom-0 size-3.5 rounded-md bg-white/70" />
      </div>
    ),
  },
];

export function CulinaryTaxonomySection() {
  const [selectedStageId, setSelectedStageId] = React.useState<CulinaryStage['id']>('templates');
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  const selectedStage = CULINARY_STAGES.find((s) => s.id === selectedStageId) || CULINARY_STAGES[3];

  const handleCopy = async (text: string, id: string) => {
    if (typeof window === 'undefined') return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedToken(id);
        setTimeout(() => setCopiedToken(null), 1800);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER                                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#CAD3F5] bg-gradient-to-br from-white via-[#F8FAFC] to-[#EFF5FF] p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#0056FF] text-white shadow-2xs">
              <Layers className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-wider text-[#0056FF] uppercase">
                  Component Taxonomy Architecture
                </span>
                <span className="rounded-md border border-rose-300 bg-rose-50 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-700">
                  6-Tier Culinary Model
                </span>
              </div>
              <h2 className="mt-0.5 font-sans text-xl font-black text-[#0A1A4A] sm:text-2xl">
                From Ingredients to the Master Cookbook
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded-lg border border-[#CAD3F5] bg-white px-2.5 py-1 text-slate-600">
              Metaphor: Brad Frost Atomic + Culinary Specialization
            </span>
          </div>
        </div>

        <p className="font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
          A design system scales reliably when components are categorized by granularity and
          dependency. By structuring elements from irreducible <strong>Ingredients</strong> (design
          tokens) through atomic <strong>Recipes</strong>, compound <strong>Entrees</strong>,
          structural <strong>Templates</strong>, and production <strong>Pages</strong>, all the way
          to the governing <strong>Cookbook</strong>, teams avoid tech debt, prevent circular
          dependencies, and maintain seamless velocity.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6-TIER INTERACTIVE PROGRESSION STRIP (MATCHES USER IMAGE 1)   */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="font-sans text-xs font-black tracking-wide text-[#0A1A4A] uppercase">
            Click Any Stage to Inspect Architecture &amp; Component Invariants
          </span>
          <span className="font-mono text-[11px] font-bold text-[#0056FF]">
            Selected: Tier 0{selectedStage.level} · {selectedStage.title.toUpperCase()}
          </span>
        </div>

        {/* 6-Column Card Row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CULINARY_STAGES.map((stage) => {
            const isSelected = selectedStageId === stage.id;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStageId(stage.id)}
                className={cn(
                  'group relative flex cursor-pointer flex-col items-center justify-between rounded-xl border p-3.5 text-center transition-all',
                  isSelected
                    ? 'border-[#0056FF] bg-[#EFF5FF]/80 shadow-xs ring-2 ring-[#0056FF]/30'
                    : 'border-[#CAD3F5] bg-[#F8FAFC]/60 hover:border-slate-300 hover:bg-white',
                )}
              >
                {/* Active Indicator Top Pill */}
                {isSelected && (
                  <span className="py-0.2 absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0056FF] px-2 font-mono text-[9px] font-bold text-white shadow-2xs">
                    ACTIVE
                  </span>
                )}

                {/* Visual Icon (Exact Red Vector Geometry from User Reference) */}
                <div className="my-2 flex h-12 items-center justify-center">
                  {stage.renderIcon(isSelected)}
                </div>

                {/* Label & Subtitle */}
                <div className="w-full space-y-0.5">
                  <div className="flex items-center justify-center gap-1 font-sans text-xs font-bold text-[#0A1A4A]">
                    <span className="font-mono text-[10px] text-slate-400">0{stage.level}.</span>
                    <span className={cn(isSelected && 'text-[#0056FF]')}>{stage.title}</span>
                  </div>
                  <div className="font-mono text-[10px] font-semibold text-[#0056FF]">
                    {stage.subtitle}
                  </div>
                  <span
                    className={cn(
                      'py-0.2 mt-1.5 inline-block rounded-md px-1.5 font-mono text-[9px] font-bold',
                      stage.checklistBadgeColor === 'emerald' &&
                        'border border-emerald-300 bg-emerald-50 text-emerald-700',
                      stage.checklistBadgeColor === 'blue' &&
                        'border border-[#0056FF]/30 bg-[#EFF5FF] text-[#0056FF]',
                      stage.checklistBadgeColor === 'slate' &&
                        'border border-slate-200 bg-slate-50 text-slate-600',
                    )}
                  >
                    {stage.checklistBadge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* DETAILED ACTIVE TIER BREAKDOWN VIEW                           */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left Column: Conceptual Definition & Rules (7 cols) */}
        <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-[#0056FF] font-mono text-xs font-bold text-white">
                0{selectedStage.level}
              </span>
              <div>
                <h3 className="font-sans text-base font-bold text-[#0A1A4A]">
                  Tier 0{selectedStage.level}: {selectedStage.title} ({selectedStage.subtitle})
                </h3>
                <span className="font-mono text-[10px] text-slate-500">
                  Architectural Granularity &amp; System Role
                </span>
              </div>
            </div>
            <span className="rounded-md border border-[#0056FF] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
              {selectedStage.checklistBadge}
            </span>
          </div>

          <p className="font-sans text-xs leading-relaxed text-slate-700 sm:text-sm">
            {selectedStage.description}
          </p>

          {/* Checklist Framework Integration */}
          <div className="rounded-xl border border-blue-200 bg-[#EFF5FF]/60 p-3">
            <span className="font-mono text-[10px] font-bold tracking-wide text-[#0056FF] uppercase">
              Checklist Framework Association:
            </span>
            <div className="mt-1 font-sans text-xs font-semibold text-[#0A1A4A]">
              {selectedStage.checklistMapping}
            </div>
          </div>

          {/* Key Invariants */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] font-bold tracking-wide text-[#0A1A4A] uppercase">
              Mandatory Architectural Invariants:
            </span>
            <div className="space-y-1.5">
              {selectedStage.keyInvariants.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-lg border border-slate-100 bg-[#F8FAFC] p-2 text-xs"
                >
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-mono text-[9px] font-bold text-emerald-800">
                    ✓
                  </span>
                  <span className="font-sans leading-snug text-slate-700">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-World Concrete Examples */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] font-bold tracking-wide text-[#0A1A4A] uppercase">
              Concrete Catalog Components in SNP-SMS:
            </span>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {selectedStage.examples.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-[#CAD3F5]/70 bg-white p-2 font-sans text-[11px] leading-snug text-slate-700 shadow-2xs"
                >
                  <span className="font-bold text-[#0A1A4A]">{item.split(':')[0]}:</span>{' '}
                  <span className="text-slate-600">{item.split(':')[1] || ''}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Code Implementation & Invariant Enforcement (5 cols) */}
        <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
              TypeScript / React Specification
            </span>
            <button
              type="button"
              onClick={() => handleCopy(selectedStage.codeSample, selectedStage.id)}
              className="flex cursor-pointer items-center gap-1 rounded-md border border-[#CAD3F5] bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600 hover:border-[#0056FF] hover:text-[#0056FF]"
            >
              {copiedToken === selectedStage.id ? (
                <>
                  <Check className="size-3 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0F172A] p-3 font-mono text-[11px] text-slate-100">
            <pre className="leading-relaxed whitespace-pre-wrap">{selectedStage.codeSample}</pre>
          </div>

          {/* Granularity Hierarchy Flow Table */}
          <div className="space-y-2 pt-2">
            <span className="font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Dependency Hierarchy Flow
            </span>
            <div className="divide-y divide-slate-100 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] text-xs">
              <div className="flex items-center justify-between p-2.5 font-mono text-[11px]">
                <span className="text-slate-500">Inputs:</span>
                <span className="font-bold text-[#0A1A4A]">
                  {selectedStage.level === 1
                    ? 'Raw Figma Design Tokens'
                    : `Tier 0${selectedStage.level - 1} (${CULINARY_STAGES[selectedStage.level - 2].title})`}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 font-mono text-[11px]">
                <span className="text-slate-500">Outputs:</span>
                <span className="font-bold text-[#0056FF]">
                  {selectedStage.level === 6
                    ? 'Production Design System'
                    : `Tier 0${selectedStage.level + 1} (${CULINARY_STAGES[selectedStage.level].title})`}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 font-mono text-[11px]">
                <span className="text-slate-500">Business Logic:</span>
                <span className="font-bold text-slate-700">
                  {selectedStage.level <= 3
                    ? 'Zero (Pure UI Presentation)'
                    : selectedStage.level === 4
                      ? 'Layout Reflow & Viewports'
                      : 'Live Domain Models & APIs'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
