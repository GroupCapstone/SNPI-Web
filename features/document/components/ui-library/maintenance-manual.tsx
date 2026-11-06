'use client';

import * as React from 'react';
import {
  FileText,
  Check,
  Copy,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Layers,
  Activity,
  Sliders,
  AlertTriangle,
  Info,
  CheckCircle2,
  Users,
  Calendar,
  ExternalLink,
  Filter,
  BookOpen,
  AppWindow,
  ShieldKey,
  Globe,
  PenLine,
} from '@/components/icons';
import { cn } from '@/lib/utils';

export interface MaintenanceChecklistItem {
  id: string;
  label: string;
  description: string;
}

export interface MaintenanceSectionSpec {
  id: string;
  name: string;
  badge: string;
  description: string;
  totalChecks: number;
  items: MaintenanceChecklistItem[];
}

export const MAINTENANCE_SPECS: MaintenanceSectionSpec[] = [
  {
    id: 'maint-documentation',
    name: 'Documentation',
    badge: '0/10',
    description:
      'Documentation resources are a core part of any design system as it saves time and effort for the team and everyone using the design system. It allows people to learn the ropes and find answers to the most commonly asked questions without contacting the team.',
    totalChecks: 10,
    items: [
      {
        id: 'doc-principles',
        label: 'Design system principles',
        description:
          'List your core principles when building a design system to let designers and developers know your values and which are the main factors for the decision-making in your team.',
      },
      {
        id: 'doc-started',
        label: 'Getting started',
        description:
          'Guide others through the first steps of setting up and using your design system, which can help them build their first feature or product without contacting you directly.',
      },
      {
        id: 'doc-design-practices',
        label: 'Design best practices',
        description:
          'Share tips on how to design products using the design system in a scalable way, avoid common pitfalls and use your design tool to its max potential.',
      },
      {
        id: 'doc-dev-practices',
        label: 'Development best practices',
        description:
          'Share tips on developing products using the design system, the recommended technical dependencies, and avoiding common pitfalls.',
      },
      {
        id: 'doc-anatomy',
        label: 'Component anatomy',
        description:
          "Provide an overview of the components' design anatomy to help everyone understand the limitations of the component layout and which parts of it are customizable.",
      },
      {
        id: 'doc-properties',
        label: 'Component properties',
        description:
          'Document properties your components support in both design and code. We recommend aligning most of them across platforms for a smoother design handoff process.',
      },
      {
        id: 'doc-composition',
        label: 'Component composition examples',
        description:
          'When building low-level components supporting slots for inserting other content - provide examples of how to use them to create more advanced compositions.',
      },
      {
        id: 'doc-sandbox',
        label: 'Sandbox product example',
        description:
          "If you don't have a way to test your components in the product yourself, you can build a simple application that simulates actual product layouts to test how your components behave in the wild and try out new design system features before releasing them.",
      },
      {
        id: 'doc-browser-os',
        label: 'Browser / OS support',
        description:
          'Define the level of support you provide for various operating systems and browsers, and make sure you align with the product on this topic.',
      },
      {
        id: 'doc-release',
        label: 'Release cycle',
        description:
          'Establish and document a predictable release cycle for the major versions that include breaking changes. This way, product teams can plan the migrations on their side.',
      },
    ],
  },
  {
    id: 'maint-local-libraries',
    name: 'Local libraries',
    badge: '0/4',
    description:
      "The scope of the design system is usually to build the core repeating patterns to increase the velocity of product teams. That means you won't implement all UI elements yourself. Product teams will still build local components using the design system to solve their specific scenarios.",
    totalChecks: 4,
    items: [
      {
        id: 'loc-when',
        label: 'When to build',
        description:
          'Share your expectations on when product teams should build custom components instead of requesting a new feature in the design system or using an existing component.',
      },
      {
        id: 'loc-horiz-vert',
        label: 'Horizontal and vertical libraries',
        description:
          'Outline the difference between the horizontal libraries used across multiple products and vertical libraries only used by the team building it.',
      },
      {
        id: 'loc-expectations',
        label: 'Library expectations',
        description:
          'Document the minimum set of requirements for shipping a local library. Describe your expectations on the library quality, documentation, and maintenance.',
      },
      {
        id: 'loc-release-sync',
        label: 'Release cycle alignment',
        description:
          'Ensure that local libraries are in sync with the design system release cycle. They should support your newly published major releases of the system to avoid blocking the product from updating.',
      },
    ],
  },
  {
    id: 'maint-team-processes',
    name: 'Team processes',
    badge: '0/6',
    description:
      'All teams that have successfully scaled their design system did this by establishing robust processes for working with their stakeholders and the community. As you keep developing the system, they will save you endless hours and let you avoid answering the same questions repeatedly.',
    totalChecks: 6,
    items: [
      {
        id: 'proc-decision-log',
        label: 'Decision-making log',
        description:
          "For the topics you have to handle repeatedly - make logs on how you make those decisions. You won't miss any contextual requirements and will avoid having additional alignment meetings.",
      },
      {
        id: 'proc-roadmap',
        label: 'Roadmap',
        description:
          'Try planning your long-term work and allocating only a part of your time for community support. This will help you evolve the system over time instead of only focusing on smaller bug fixes and feature requests.',
      },
      {
        id: 'proc-stakeholder',
        label: 'Stakeholder mapping',
        description:
          "List out the main stakeholders across all products you're supporting. Those could be people working in the development and design but also don't miss the people leadership who can help you grow the adoption.",
      },
      {
        id: 'proc-analytics',
        label: 'Analytics',
        description:
          'Define a way to track the usage and the value of the libraries and tooling you provide. You can start with easy-to-set-up metrics, like analytics for your documentation website, feedback surveys, or components usage analytics in your design tool.',
      },
      {
        id: 'proc-shifts',
        label: 'Ongoing support "shifts"',
        description:
          'If multiple people work on the same platform, distribute and plan the community support work for them. That will let team members focus on the planned work instead of being distracted by the requests and questions.',
      },
      {
        id: 'proc-sla',
        label: 'SLA',
        description:
          'Define the timelines for how long it takes you to handle incoming requests and bug reports to help product teams understand if they should wait for your release or find a temporary workaround.',
      },
    ],
  },
  {
    id: 'maint-community-support',
    name: 'Community support',
    badge: '0/4',
    description:
      "It's crucial to help product designers and developers get more productive with the design system, fix the bugs they find in the products, and address their needs. To make sure you get that feedback - your goal is to make it easy and safe for everyone to share their findings.",
    totalChecks: 4,
    items: [
      {
        id: 'com-channels',
        label: 'Support channels',
        description:
          "Create support channels in the tools you use for communication. It's a good idea to separate them by the platform to make it comfortable for everyone to share platform-specific details of their issues.",
      },
      {
        id: 'com-templates',
        label: 'Templates',
        description:
          'Prepare templates for creating feature requests and bug reports. Use them to ask for reproduction links, design proposals, and other contextual information you need to make decisions instead of manually looking for that information.',
      },
      {
        id: 'com-updates',
        label: 'Regular updates',
        description:
          "You're risking the adoption of the new features if you're only focusing on the implementation but never talking about it with the community. Defining a cadence for your updates helps build a habit for product teams to come and check what's new in the system and how they can leverage it.",
      },
      {
        id: 'com-open-hours',
        label: 'Open hours',
        description:
          "There will be questions that can't be resolved in a single ticket or chat. Keep a few bookable calendar slots for other teams to receive a consultation or discuss their feature implementation with your team.",
      },
    ],
  },
  {
    id: 'maint-contribution',
    name: 'Contribution',
    badge: '0/4',
    description:
      'Building design systems is a team game. Make sure to include product teams in the journey, help them contribute to the system and let them advocate for it across the company.',
    totalChecks: 4,
    items: [
      {
        id: 'con-house-rules',
        label: 'House rules for the system',
        description:
          'Explain how your design and development process works to the product teams. Design system teams usually move slower than product teams since there is more responsibility on making scalable decisions in the components affecting the whole product.',
      },
      {
        id: 'con-guidelines',
        label: 'Contribution guidelines',
        description:
          'Explain what contributors need to set up to prepare their design and development environment for adding and testing new features.',
      },
      {
        id: 'con-proposal',
        label: 'Feature proposal template',
        description:
          "Prepare a standard template for initiating the work on a new feature. This template should ensure that proposed changes will be applied across all platforms and won't break the existing component usage in the product.",
      },
      {
        id: 'con-engagement',
        label: 'Engagement',
        description:
          "Make sure to highlight and reward contributors' work when making announcements about the new features and help them get support from their managers when they contribute.",
      },
    ],
  },
];

export function MaintenanceManual({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = React.useState<string>('maint-documentation');
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  const toggleCheck = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const totalPossibleChecks = MAINTENANCE_SPECS.reduce((acc, s) => acc + s.totalChecks, 0);
  const currentCheckedCount = Object.values(checkedItems).filter(Boolean).length;

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
    <div id="maintenance-manual" className="space-y-8">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER & STRATEGY MANIFESTO BANNER                         */}
      {/* ------------------------------------------------------------- */}
      {!hideHeader ? (
        <div className="space-y-4 rounded-3xl border border-[#CAD3F5] bg-gradient-to-br from-[#EFF5FF] via-white to-[#F8FAFC] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#0056FF]/30 bg-[#0056FF]/10 px-3 py-1 font-mono text-[11px] font-bold text-[#0056FF]">
                <Sparkles className="size-3.5" />
                <span>DESIGN SYSTEM LIFECYCLE &amp; GOVERNANCE</span>
              </div>
              <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
                Maintenance Strategy Manual
              </h2>
              <p className="max-w-3xl font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
                &ldquo;Design systems are no different than any other project your team might take
                on. In order to successfully build and maintain one, you need a clear strategy
                that&apos;s well executed daily, and you&apos;ll need to create opportunities for
                your colleagues to give feedback to help shape your design system together.&rdquo;
              </p>
            </div>

            <div className="flex flex-col items-end gap-1.5 font-mono text-xs">
              <span className="rounded-lg border border-[#CAD3F5] bg-white px-3 py-1.5 font-bold text-[#0056FF]">
                MAINTENANCE AUDIT: {currentCheckedCount} of {totalPossibleChecks} Checks
              </span>
              <span className="text-[10px] text-slate-500">
                5 Core Pillars &middot; 28 Operational Invariants
              </span>
            </div>
          </div>

          {/* Pillar Switcher Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            {MAINTENANCE_SPECS.map((spec) => {
              const isActive = activeTab === spec.id;
              const completedCount = spec.items.filter((i) => checkedItems[i.id]).length;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(spec.id);
                    const el = document.getElementById(spec.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 font-sans text-xs font-bold transition-all',
                    isActive
                      ? 'border-[#0056FF] bg-[#0056FF] text-white shadow-xs'
                      : 'border-[#CAD3F5] bg-white text-[#0A1A4A] hover:border-[#0056FF]/40 hover:bg-[#EFF5FF]',
                  )}
                >
                  <span>{spec.name}</span>
                  <span
                    className={cn(
                      'py-0.2 rounded-md px-1.5 font-mono text-[10px] font-bold',
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600',
                    )}
                  >
                    {completedCount}/{spec.totalChecks}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* COMPACT PILLAR SWITCHER FOR STUDIO MODE */
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#CAD3F5] bg-[#EFF5FF]/60 p-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-600 uppercase">
              <Filter className="size-3.5 text-[#0056FF]" />
              Strategic Pillar:
            </span>
            {MAINTENANCE_SPECS.map((spec) => {
              const isActive = activeTab === spec.id;
              const completedCount = spec.items.filter((i) => checkedItems[i.id]).length;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(spec.id);
                    const el = document.getElementById(spec.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 font-sans text-xs font-bold transition-all active:scale-[0.97]',
                    isActive
                      ? 'border-[#0056FF] bg-[#0056FF] text-white shadow-xs'
                      : 'border-[#CAD3F5] bg-white text-[#0A1A4A] hover:bg-[#EFF5FF]',
                  )}
                >
                  <span>{spec.name}</span>
                  <span
                    className={cn(
                      'py-0.2 rounded-[2px] px-1.5 font-mono text-[10px] font-bold',
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600',
                    )}
                  >
                    {completedCount}/{spec.totalChecks}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#CAD3F5] bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#0056FF]">
            <span>
              {currentCheckedCount} of {totalPossibleChecks} Verified
            </span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. PILLARS & OPERATIONAL CHECKLIST SECTIONS                    */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-8">
        {MAINTENANCE_SPECS.map((spec, specIdx) => {
          const completedChecks = spec.items.filter((i) => checkedItems[i.id]).length;
          const isAllChecked = completedChecks === spec.totalChecks;

          return (
            <section
              key={spec.id}
              id={spec.id}
              className="scroll-mt-24 space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 sm:p-6"
            >
              {/* Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-6 items-center justify-center rounded-lg bg-[#EFF5FF] font-mono text-xs font-bold text-[#0056FF]">
                      M{specIdx + 1}
                    </span>
                    <h3 className="font-sans text-lg font-black tracking-tight text-[#0A1A4A] sm:text-xl">
                      {spec.name}
                    </h3>
                    <span
                      className={cn(
                        'rounded-md px-2 py-0.5 font-mono text-[11px] font-bold',
                        isAllChecked
                          ? 'border border-emerald-300 bg-emerald-50 text-emerald-700'
                          : 'border border-[#CAD3F5] bg-slate-50 text-slate-600',
                      )}
                    >
                      {completedChecks} / {spec.totalChecks} Verified
                    </span>
                  </div>
                  <p className="max-w-3xl font-sans text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {spec.description}
                  </p>
                </div>
              </div>

              {/* Checklist Grid */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {spec.items.map((item, itemIdx) => {
                  const isChecked = Boolean(checkedItems[item.id]);

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={cn(
                        'group flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all',
                        isChecked
                          ? 'border-emerald-300 bg-emerald-50/30'
                          : 'border-slate-200 bg-[#F8FAFC]/50 hover:border-[#CAD3F5] hover:bg-white',
                      )}
                    >
                      <button
                        type="button"
                        aria-label={`Toggle check for ${item.label}`}
                        className={cn(
                          'mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-md border transition-colors',
                          isChecked
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300 bg-white group-hover:border-[#0056FF]',
                        )}
                      >
                        {isChecked && <Check className="size-3 stroke-[3]" />}
                      </button>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={cn(
                              'font-sans text-xs font-bold transition-colors',
                              isChecked
                                ? 'text-emerald-900 line-through opacity-80'
                                : 'text-[#0A1A4A]',
                            )}
                          >
                            {itemIdx + 1}. {item.label}
                          </span>
                          <span className="font-mono text-[9px] text-slate-400">
                            {isChecked ? 'Pass' : 'Req'}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] leading-relaxed text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Embedded Operational Tool / Practical Artifact */}
              <div className="mt-4 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-xs">
                {spec.id === 'maint-documentation' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#0056FF] uppercase">
                        Browser &amp; OS Tier matrix &middot; Target Support Baseline
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        Release Cycle: Monthly Stable / Quarterly Major
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-sans text-slate-700 sm:grid-cols-4">
                      <div className="rounded-lg border border-slate-200 bg-white p-2">
                        <span className="block font-bold text-[#0A1A4A]">Tier 1 Browsers</span>
                        <span className="block text-[11px] text-slate-500">
                          Chrome &ge;118, Safari &ge;16.4, Firefox &ge;120
                        </span>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-2">
                        <span className="block font-bold text-[#0A1A4A]">Mobile Web</span>
                        <span className="block text-[11px] text-slate-500">
                          iOS Safari &ge;16, Android Chrome 12+
                        </span>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-2">
                        <span className="block font-bold text-[#0A1A4A]">Desktop OS</span>
                        <span className="block text-[11px] text-slate-500">
                          macOS &ge;13 Ventura, Windows &ge;10, Linux x64
                        </span>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-2">
                        <span className="block font-bold text-[#0A1A4A]">Reduced Motion</span>
                        <span className="block text-[11px] text-slate-500">
                          prefers-reduced-motion: reduce 100% honored
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {spec.id === 'maint-local-libraries' && (
                  <div className="space-y-2">
                    <span className="block font-mono text-[11px] font-bold text-[#0056FF] uppercase">
                      Architecture Paradigm: Horizontal vs. Vertical Libraries
                    </span>
                    <div className="grid grid-cols-1 gap-2.5 font-sans sm:grid-cols-2">
                      <div className="space-y-1 rounded-lg border border-blue-200 bg-blue-50/40 p-2.5">
                        <span className="block font-bold text-blue-900">
                          Horizontal Libraries (Shared System)
                        </span>
                        <p className="text-[11px] leading-relaxed text-blue-800">
                          Core repeating primitives (Button, Input, Modal, Table). Managed by design
                          system core team; tested across all institutional products; strict zero
                          breaking changes policy.
                        </p>
                      </div>
                      <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-2.5">
                        <span className="block font-bold text-[#0A1A4A]">
                          Vertical Libraries (Domain Local)
                        </span>
                        <p className="text-[11px] leading-relaxed text-slate-600">
                          Specialized domain workflows (e.g. Bakong KHQR POS scanner, Gradebook
                          Rollover wizard). Authored and maintained by product feature pods;
                          inherits tokens from horizontal core.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {spec.id === 'maint-team-processes' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#0056FF] uppercase">
                        Design System Service Level Agreement (SLA) Matrix
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        On-Call Shift Rotation: Active
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                      <div className="rounded-lg border border-red-200 bg-red-50 p-2">
                        <span className="block font-bold text-red-700">P0 · Blocking Bug</span>
                        <span className="text-[10px] text-red-900">
                          &le; 4 Hours Triage / Hotfix
                        </span>
                      </div>
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-2">
                        <span className="block font-bold text-amber-700">
                          P1 · Component Defect
                        </span>
                        <span className="text-[10px] text-amber-900">&le; 24 Hours Resolution</span>
                      </div>
                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-2">
                        <span className="block font-bold text-blue-700">P2 · Feature Proposal</span>
                        <span className="text-[10px] text-blue-900">
                          &le; 3 Days Architecture Review
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {spec.id === 'maint-community-support' && (
                  <div className="space-y-2">
                    <span className="block font-mono text-[11px] font-bold text-[#0056FF] uppercase">
                      Weekly Community Cadence &middot; Open Consultation Schedule
                    </span>
                    <div className="flex flex-wrap items-center gap-3 font-sans text-xs text-slate-700">
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5">
                        <Calendar className="size-3.5 text-[#0056FF]" />
                        <span>
                          <strong>Tuesdays 14:00 - 15:30</strong>: Architecture Open Office Hours
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5">
                        <Users className="size-3.5 text-emerald-600" />
                        <span>
                          <strong>Fridays 16:00</strong>: Bi-weekly System Release Showcase &amp;
                          Demo
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {spec.id === 'maint-contribution' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#0056FF] uppercase">
                        Feature Proposal Standard Template (RFC)
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            `# Feature Proposal: [Component Name]\n- Product Need & Impact:\n- Accessibility & Keyboard Mapping:\n- Visual Anatomy & Token Tokens:\n- Multi-Platform Parity Plan:`,
                            'rfc-copy',
                          )
                        }
                        className="flex cursor-pointer items-center gap-1 font-mono text-[10px] font-bold text-[#0056FF] hover:underline"
                      >
                        <Copy className="size-3" />
                        <span>
                          {copiedToken === 'rfc-copy'
                            ? 'Copied RFC Template!'
                            : 'Copy RFC Markdown'}
                        </span>
                      </button>
                    </div>
                    <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-2.5 font-mono text-[10px] text-slate-600">
                      {`1. Product Need: Identify at least 2 distinct user workflows requiring this primitive
2. Accessibility Invariant: Screen reader role, keyboard traversal (Tab, Arrows, Space, Esc)
3. Token Compliance: 100% adherence to SNPI Royal Blue (#0056FF) and Slate ramps
4. Multi-Device Reflow: Responsive verification across mobile (320px) to expanded desktop`}
                    </pre>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
