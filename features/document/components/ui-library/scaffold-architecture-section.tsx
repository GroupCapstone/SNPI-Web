'use client';

import * as React from 'react';
import {
  AppWindow,
  Columns3,
  Grid2x2,
  Maximize2,
  Minimize,
  Monitor,
  Smartphone,
  Tablet,
  Check,
  Copy,
  Layers,
  Sliders,
  Shield,
  Eye,
  Activity,
  Menu,
  Search,
  BookOpen,
} from '@/components/icons';
import { cn } from '@/lib/utils';

export type ScaffoldElementFocus = 'all' | 'bars' | 'rails' | 'panes' | 'safety';
export type ScaffoldBreakpoint = 'compact' | 'medium' | 'expanded' | 'large' | 'extra-large';

// 6-STAGE DESIGN SYSTEM PROGRESSION HIERARCHY (CULINARY / ATOMIC METAPHOR)
const HIERARCHY_STAGES = [
  {
    id: 'ingredients',
    title: 'Ingredients',
    subtitle: 'Tokens & Atoms',
    role: 'Color, Typography, Spacing, Elevation, Motion',
    active: false,
    renderIcon: () => (
      <span className="inline-block size-6 rounded-full bg-gradient-to-tr from-rose-500 to-red-500 shadow-xs" />
    ),
  },
  {
    id: 'recipes',
    title: 'Recipes',
    subtitle: 'UI Primitives',
    role: 'Buttons, Inputs, Badges, Chips, Switches',
    active: false,
    renderIcon: () => (
      <div className="flex items-center gap-1.5">
        <span className="size-4.5 rounded-full bg-gradient-to-tr from-rose-500 to-red-500" />
        <span className="size-4.5 rounded-full bg-gradient-to-tr from-rose-500 to-red-500" />
        <span className="size-4.5 rounded-full bg-gradient-to-tr from-rose-500 to-red-500" />
      </div>
    ),
  },
  {
    id: 'entrees',
    title: 'Entrees',
    subtitle: 'Components',
    role: 'App Bars, Nav Rails, Cards, Modals, Dialogs',
    active: false,
    renderIcon: () => (
      <div className="h-4 w-12 rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-xs" />
    ),
  },
  {
    id: 'templates',
    title: 'Templates',
    subtitle: 'Layout Scaffold',
    role: 'Top Bar + Rails + Fluid Panes + Safety Insets',
    active: true, // Current active level!
    renderIcon: () => (
      <div className="flex w-12 flex-col gap-1">
        <span className="h-2.5 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-xs" />
        <span className="h-2.5 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-xs" />
        <span className="h-2.5 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-xs" />
      </div>
    ),
  },
  {
    id: 'pages',
    title: 'Pages',
    subtitle: 'Complete Views',
    role: 'Dashboard, Student Roster, Gradebook, Settings',
    active: false,
    renderIcon: () => (
      <div className="size-9 rounded-xl bg-gradient-to-tr from-rose-500 to-red-500 shadow-xs" />
    ),
  },
  {
    id: 'cookbook',
    title: 'Cookbook',
    subtitle: 'Design System',
    role: 'System Guidelines, Token Governance & Rules',
    active: false,
    renderIcon: () => (
      <div className="relative size-9">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-rose-500 to-red-500 opacity-90 shadow-xs" />
        <div className="absolute right-0 bottom-0 size-6 rounded-lg bg-white/40 backdrop-blur-xs" />
        <div className="absolute right-0 bottom-0 size-3.5 rounded-md bg-white/70" />
      </div>
    ),
  },
];

export function ScaffoldArchitectureSection() {
  const [activeElement, setActiveElement] = React.useState<ScaffoldElementFocus>('all');
  const [activeBreakpoint, setActiveBreakpoint] = React.useState<ScaffoldBreakpoint>('expanded');
  const [showRulers, setShowRulers] = React.useState<boolean>(true);
  const [showSafetyInsets, setShowSafetyInsets] = React.useState<boolean>(true);
  const [showCallouts, setShowCallouts] = React.useState<boolean>(true);
  const [topBarVariant, setTopBarVariant] = React.useState<'small' | 'center' | 'medium' | 'large'>(
    'small',
  );
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

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
      {/* 1. 6-STAGE DESIGN SYSTEM PROGRESSION HIERARCHY                 */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <span className="font-sans text-xs font-bold tracking-wide text-[#020617] uppercase">
              Design System Architectural Hierarchy · From Ingredients to Cookbook
            </span>
            <div className="font-mono text-[10px] text-slate-500">
              M3 Progressive Modular Progression · Level 4 defines the Layout Scaffold Architecture
            </div>
          </div>
          <span className="rounded-md border border-[#0056FF] bg-[#EFF5FF] px-2.5 py-1 font-mono text-[11px] font-bold text-[#0056FF]">
            ACTIVE LEVEL: 4 · TEMPLATES (SCAFFOLD)
          </span>
        </div>

        {/* 6-Card Visual Progression Row */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {HIERARCHY_STAGES.map((stage, idx) => (
            <a
              key={stage.id}
              href="#layout-scaffold-architecture"
              onClick={(e) => e.preventDefault()}
              title={`View ${stage.title} Taxonomy & Invariants`}
              className={cn(
                'group relative flex cursor-pointer flex-col items-center justify-between rounded-xl border p-3.5 text-center transition-all',
                stage.active
                  ? 'border-[#0056FF] bg-[#EFF5FF]/60 shadow-xs ring-2 ring-[#0056FF]/20'
                  : 'border-[#CAD3F5] bg-[#F8FAFC]/50 hover:border-[#0056FF] hover:bg-white',
              )}
            >
              {stage.active && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0056FF] px-2 py-0.5 font-mono text-[9px] font-bold text-white shadow-2xs">
                  CURRENT SCOPE
                </span>
              )}

              {/* Icon Graphic */}
              <div className="my-2 flex h-12 items-center justify-center">{stage.renderIcon()}</div>

              {/* Title & Description */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-center gap-1 font-sans text-xs font-bold text-[#020617]">
                  <span className="font-mono text-[10px] text-slate-400">0{idx + 1}.</span>
                  <span>{stage.title}</span>
                </div>
                <div className="font-mono text-[10px] font-semibold text-[#0056FF]">
                  {stage.subtitle}
                </div>
                <div className="mt-1 line-clamp-2 text-[10px] text-slate-500">{stage.role}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. STREAMLINED CONTROLS BAR (PSYCHOLOGICAL COGNITIVE CHUNKING) */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-4 text-xs">
        {/* Row A: Viewport Device Switcher */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-[#020617]">Adaptive Device Viewport:</span>
            <span className="font-mono text-[10px] text-slate-500">
              Reflows Navigation Rails &amp; Multi-Panes
            </span>
          </div>

          <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#CAD3F5] bg-white p-1">
            {[
              { id: 'compact', label: 'Mobile', desc: '<600dp', icon: Smartphone },
              { id: 'medium', label: 'Tablet', desc: '600–839dp', icon: Tablet },
              { id: 'expanded', label: 'Desktop', desc: '840–1199dp', icon: Monitor },
              { id: 'large', label: 'Wide Screen', desc: '≥1200dp', icon: Maximize2 },
            ].map((bp) => {
              const Icon = bp.icon;
              const isSelected = activeBreakpoint === bp.id;
              return (
                <button
                  key={bp.id}
                  type="button"
                  onClick={() => setActiveBreakpoint(bp.id as ScaffoldBreakpoint)}
                  className={cn(
                    'flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-sans text-xs font-bold transition-all',
                    isSelected
                      ? 'bg-[#0056FF] text-white shadow-none'
                      : 'text-[#020617] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                  )}
                >
                  <Icon className="size-3.5" />
                  <span>{bp.label}</span>
                  <span
                    className={cn(
                      'font-mono text-[10px]',
                      isSelected ? 'text-white/80' : 'text-slate-400',
                    )}
                  >
                    ({bp.desc})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row B: Structural Focus & Auxiliary Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-200/80 pt-3">
          {/* Anatomy Focus Segment */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="mr-1 font-mono text-[10px] font-bold text-slate-500 uppercase">
              Highlight:
            </span>
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'bars', label: 'Top & Bottom Bars' },
              { id: 'rails', label: 'Navigation Rail' },
              { id: 'panes', label: 'Content Panes' },
              { id: 'safety', label: 'Safety Insets' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveElement(item.id as ScaffoldElementFocus)}
                className={cn(
                  'cursor-pointer rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold transition-all',
                  activeElement === item.id
                    ? 'bg-[#020617] text-white shadow-none'
                    : 'border border-[#CAD3F5] bg-white text-[#020617] hover:bg-[#EFF5FF]',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick Toggles */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowCallouts(!showCallouts)}
              className={cn(
                'flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 font-mono text-[10px] font-bold transition-all',
                showCallouts
                  ? 'border-[#0056FF] bg-[#EFF5FF] text-[#0056FF]'
                  : 'border-slate-200 bg-white text-slate-500',
              )}
            >
              <Activity className="size-3" />
              <span>{showCallouts ? 'Callouts: Visible' : 'Callouts: Hidden'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowRulers(!showRulers)}
              className={cn(
                'flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 font-mono text-[10px] font-bold transition-all',
                showRulers
                  ? 'border-[#0056FF] bg-[#EFF5FF] text-[#0056FF]'
                  : 'border-slate-200 bg-white text-slate-500',
              )}
            >
              <Eye className="size-3" />
              <span>{showRulers ? 'Rulers: On' : 'Rulers: Off'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSafetyInsets(!showSafetyInsets)}
              className={cn(
                'flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 font-mono text-[10px] font-bold transition-all',
                showSafetyInsets
                  ? 'border-[#0056FF] bg-[#EFF5FF] text-[#0056FF]'
                  : 'border-slate-200 bg-white text-slate-500',
              )}
            >
              <Shield className="size-3" />
              <span>{showSafetyInsets ? 'Insets: On' : 'Insets: Off'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. VISUAL SELF-EXPLAINING SCAFFOLD CANVAS                      */}
      {/* ------------------------------------------------------------- */}
      <div className="relative min-h-[520px] overflow-hidden rounded-2xl border-2 border-[#CAD3F5] bg-[#F8FAFC] p-4">
        {/* Optional Global Jetpack Compose Rulers Guidelines */}
        {showRulers && (
          <div className="pointer-events-none absolute inset-0 z-30">
            {/* Left Margin Ruler */}
            <div className="absolute top-0 bottom-0 left-6 border-l border-dashed border-red-400 opacity-60">
              <span className="absolute top-2 left-1 rounded bg-white/80 px-1 font-mono text-[9px] text-red-500">
                Margin Ruler (24dp)
              </span>
            </div>
            {/* Title Baseline Ruler */}
            <div className="absolute top-18 right-0 left-0 border-t border-dashed border-blue-400 opacity-60">
              <span className="absolute top-1 right-3 rounded bg-white/80 px-1 font-mono text-[9px] text-[#0056FF]">
                Title Baseline Ruler (56dp)
              </span>
            </div>
            {/* Split Anchor Ruler (Multi-pane mode) */}
            {activeBreakpoint !== 'compact' && (
              <div className="absolute top-0 bottom-0 left-[38%] border-l border-dashed border-emerald-400 opacity-60">
                <span className="absolute bottom-6 left-1 rounded bg-white/80 px-1 font-mono text-[9px] text-emerald-600">
                  Split Anchor Ruler (40% / 60%)
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#CAD3F5] bg-white shadow-sm">
          {/* REGION 01: SYSTEM SAFETY INSETS (STATUS BAR) */}
          {showSafetyInsets && (
            <div
              className={cn(
                'relative flex w-full items-center justify-between bg-slate-900 px-4 font-mono text-[10px] text-white transition-all',
                activeElement === 'safety'
                  ? 'bg-slate-950 py-2.5 ring-2 ring-amber-400'
                  : 'py-1 opacity-90',
              )}
            >
              <span>9:41 AM</span>
              <div className="flex h-3.5 w-24 items-center justify-center rounded-full bg-black/70 text-[8px] font-bold text-slate-300">
                CAMERA CUTOUT
              </div>
              <div className="flex items-center gap-2">
                {showCallouts && (
                  <span className="py-0.2 rounded bg-amber-400/20 px-1.5 font-mono text-[9px] font-bold text-amber-300">
                    [06] SAFETY REGION: env(safe-area-inset-top)
                  </span>
                )}
                <span>100% [5G]</span>
              </div>
            </div>
          )}

          {/* REGION 02: TOP APP BAR */}
          <div
            className={cn(
              'relative flex items-center justify-between border-b border-slate-200 bg-white px-4 transition-all',
              topBarVariant === 'small' && 'h-14',
              topBarVariant === 'center' && 'h-14 justify-center',
              topBarVariant === 'medium' && 'h-20 flex-col items-start justify-center py-2',
              topBarVariant === 'large' && 'h-28 flex-col items-start justify-end pb-3',
              activeElement === 'bars' ? 'bg-[#EFF5FF] ring-2 ring-[#0056FF]' : '',
            )}
          >
            <div className="flex w-full items-center gap-3">
              <button
                type="button"
                className="rounded-lg p-1 text-[#020617] hover:bg-slate-100"
                title="Navigation Menu"
              >
                <Menu className="size-5" />
              </button>
              <div className={cn('flex-1', topBarVariant === 'center' && 'text-center')}>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-sm font-bold text-[#020617]">
                    Academic Scaffold Hub
                  </span>
                  {showCallouts && (
                    <span className="rounded bg-[#0056FF]/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#0056FF]">
                      [01] TOP APP BAR · 56dp
                    </span>
                  )}
                </div>
                {(topBarVariant === 'medium' || topBarVariant === 'large') && (
                  <div className="font-sans text-xs text-slate-500">
                    Comprehensive student enrollment &amp; curriculum platform
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="rounded-lg p-1.5 text-[#0056FF] hover:bg-slate-100"
                  title="Search Catalog"
                >
                  <Search className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* REGION 03: CORE SCAFFOLD BODY (RAILS & PANES) */}
          <div className="flex min-h-[360px] flex-1 overflow-hidden">
            {/* LEADING NAVIGATION RAIL (Active on Medium+) */}
            {activeBreakpoint !== 'compact' && (
              <div
                className={cn(
                  'relative flex flex-col items-center border-r border-slate-200 bg-[#F8FAFC] px-2 py-3 transition-all',
                  activeBreakpoint === 'large' || activeBreakpoint === 'extra-large'
                    ? 'w-52 items-start px-3'
                    : 'w-20',
                  activeElement === 'rails' ? 'bg-[#EFF5FF] ring-2 ring-[#0056FF]' : '',
                )}
              >
                <div className="mb-2 flex w-full items-center justify-between">
                  <span className="font-mono text-[9px] font-bold text-slate-400 uppercase">
                    {activeBreakpoint === 'large' || activeBreakpoint === 'extra-large'
                      ? 'Nav Drawer'
                      : 'Rail (80dp)'}
                  </span>
                  {showCallouts && (
                    <span className="rounded bg-[#0056FF]/10 px-1 font-mono text-[8px] font-bold text-[#0056FF]">
                      [02]
                    </span>
                  )}
                </div>

                <div className="w-full space-y-2">
                  {[
                    { id: 'home', label: 'Home', active: true },
                    { id: 'students', label: 'Students', active: false },
                    { id: 'courses', label: 'Courses', active: false },
                    { id: 'settings', label: 'Settings', active: false },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={cn(
                        'flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-bold transition-all',
                        tab.active
                          ? 'bg-[#0056FF] text-white shadow-none'
                          : 'text-slate-700 hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                      )}
                    >
                      <AppWindow className="size-4 shrink-0" />
                      {(activeBreakpoint === 'large' || activeBreakpoint === 'extra-large') && (
                        <span>{tab.label}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PRIMARY CONTENT PANE */}
            <div
              className={cn(
                'relative flex-1 space-y-3 overflow-y-auto p-4 transition-all',
                activeElement === 'panes' ? 'bg-emerald-50/20 ring-2 ring-emerald-500' : 'bg-white',
              )}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                    PRIMARY PANE ({activeBreakpoint === 'compact' ? 'SINGLE PANE' : 'CO-PLANAR 1'})
                  </span>
                  {showCallouts && (
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-700">
                      [03] FLUID WORKSPACE
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-slate-400">Content Stream</span>
              </div>

              {/* Sample Content Cards */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {[
                  { title: 'CS401 Distributed Systems', code: 'SEC-A', enrolled: '42/45' },
                  { title: 'MATH302 Linear Algebra', code: 'SEC-B', enrolled: '38/40' },
                  { title: 'ENG201 Technical Writing', code: 'SEC-C', enrolled: '29/30' },
                  { title: 'PHY101 Applied Physics', code: 'SEC-D', enrolled: '50/50' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 p-3 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs font-bold text-[#020617]">
                        {item.title}
                      </span>
                      <span className="rounded border border-[#CAD3F5] bg-white px-1.5 py-0.5 font-mono text-[9px] text-[#0056FF]">
                        {item.code}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-500">
                      Capacity: {item.enrolled}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECONDARY SUPPORTING PANE (Active on Expanded+) */}
            {activeBreakpoint !== 'compact' && activeBreakpoint !== 'medium' && (
              <div
                className={cn(
                  'relative w-64 space-y-3 border-l border-slate-200 p-4 transition-all',
                  activeElement === 'panes'
                    ? 'bg-emerald-50/20 ring-2 ring-emerald-500'
                    : 'bg-[#F8FAFC]',
                )}
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-slate-600 uppercase">
                      SUPPORTING PANE
                    </span>
                    {showCallouts && (
                      <span className="rounded bg-purple-500/10 px-1 font-mono text-[8px] font-bold text-purple-700">
                        [04] 360dp
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 rounded-xl border border-[#CAD3F5] bg-white p-3 text-left">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                    Contextual Tools
                  </span>
                  <div className="space-y-1.5 text-xs text-[#020617]">
                    <div className="flex justify-between border-b border-slate-100 py-1">
                      <span>Room Assignment</span>
                      <span className="font-mono font-bold text-[#0056FF]">Lab 402</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-1">
                      <span>Faculty Lead</span>
                      <span className="font-mono font-bold text-[#0056FF]">Dr. S. Chen</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Live Telemetry</span>
                      <span className="font-mono font-bold text-emerald-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* REGION 05: BOTTOM NAVIGATION BAR (Compact Phone Only) */}
          {activeBreakpoint === 'compact' && (
            <div
              className={cn(
                'relative flex h-16 items-center justify-around border-t border-slate-200 bg-white px-2 transition-all',
                activeElement === 'bars' ? 'bg-[#EFF5FF] ring-2 ring-[#0056FF]' : '',
              )}
            >
              {showCallouts && (
                <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-[#0056FF] px-2 py-0.5 font-mono text-[8px] font-bold text-white shadow-2xs">
                  [05] BOTTOM NAV BAR · 80dp (Thumb Zone)
                </div>
              )}
              {['Home', 'Courses', 'Schedule', 'Profile'].map((item, i) => (
                <button
                  key={item}
                  type="button"
                  className={cn(
                    'flex flex-col items-center justify-center text-[10px] font-bold',
                    i === 0 ? 'text-[#0056FF]' : 'text-slate-500 hover:text-slate-900',
                  )}
                >
                  <AppWindow className="size-4" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}

          {/* REGION 06: BOTTOM SYSTEM SAFETY REGION (Home Bar) */}
          {showSafetyInsets && (
            <div
              className={cn(
                'relative flex w-full items-center justify-center bg-slate-900 py-1.5 text-white transition-all',
                activeElement === 'safety' ? 'bg-slate-950 py-2.5 ring-2 ring-amber-400' : '',
              )}
            >
              <div className="h-1 w-32 rounded-full bg-white/70" />
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. SCAFFOLD STRUCTURAL ANATOMY BREAKDOWN (DETAILED SPECS)     */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-3 text-xs md:grid-cols-4">
        <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-white p-3.5 text-left">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              1. Bars (Top &amp; Bottom)
            </span>
            <span className="font-mono text-[9px] text-slate-400">56–152dp</span>
          </div>
          <p className="text-slate-600">
            Frame perimeters. Top App Bar hosts view title, search and overflow menus; Bottom
            Navigation provides ergonomic 4-5 tab switching in compact handheld viewports.
          </p>
        </div>

        <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-white p-3.5 text-left">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              2. Rails (Navigation)
            </span>
            <span className="font-mono text-[9px] text-[#0056FF]">80–360dp</span>
          </div>
          <p className="text-slate-600">
            Perimeter space bordering panes. Accommodates 80dp vertical navigation rails on tablet,
            collapsible 240dp drawers on desktop, editing toolbars, and spatial panels.
          </p>
        </div>

        <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-white p-3.5 text-left">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase">
              3. Panes (Content)
            </span>
            <span className="font-mono text-[9px] text-emerald-600">1 to 3 Panes</span>
          </div>
          <p className="text-slate-600">
            Hold product primary content. Adapts from 1 pane (&lt;600dp) to 2 co-planar panes
            (840dp+) up to 3 fluid panes (&ge;1600dp) with Jetpack Compose scaffold alignment.
          </p>
        </div>

        <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-white p-3.5 text-left">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-amber-600 uppercase">
              4. Safety Region
            </span>
            <span className="font-mono text-[9px] text-amber-600">env(safe-area-*)</span>
          </div>
          <p className="text-slate-600">
            Protective bounds safeguarding layout against camera cutouts, dynamic islands, system
            gesture bars, and foldable physical hinges.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. JETPACK COMPOSE RULERS & SPACING TOKENS REFERENCE          */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3 rounded-xl border border-[#CAD3F5] bg-white p-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-sans font-bold tracking-wide text-[#020617] uppercase">
            Implementation Standards: Jetpack Compose Rulers &amp; Spacing Tokens
          </span>
          <span className="font-mono text-[10px] text-slate-500">
            M3 Standard Spacing Grid (8dp)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {[
            { token: 'spacing.1', val: '4dp', role: 'Micro spacing, icon gap' },
            { token: 'spacing.2', val: '8dp', role: 'Component internal padding' },
            { token: 'spacing.4', val: '16dp', role: 'Standard card & mobile margin' },
            { token: 'spacing.5', val: '24dp', role: 'Section gap & tablet margin' },
            { token: 'spacing.6', val: '32dp', role: 'Desktop canvas margin' },
            { token: 'spacing.8', val: '48dp', role: 'Touch target minimum' },
          ].map((sp) => (
            <div
              key={sp.token}
              className="rounded-lg border border-[#CAD3F5] bg-[#EFF5FF]/50 p-2 text-left"
            >
              <div className="font-mono text-[10px] font-bold text-[#0056FF]">{sp.token}</div>
              <div className="font-sans text-sm font-bold text-[#020617]">{sp.val}</div>
              <div className="line-clamp-1 font-mono text-[9px] text-slate-500">{sp.role}</div>
            </div>
          ))}
        </div>

        {/* Jetpack Compose Rulers Snippet */}
        <div className="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-3 text-left font-mono text-[11px] text-slate-100">
          <div className="text-slate-400">
            {'// Jetpack Compose: Defining Alignment Rulers across Panes'}
          </div>
          <div>val MarginRuler = Ruler(&quot;margin_ruler&quot;)</div>
          <div>val TitleBaselineRuler = Ruler(&quot;title_baseline&quot;)</div>
          <div>val SplitAnchorRuler = Ruler(&quot;split_anchor&quot;)</div>
        </div>
      </div>
    </div>
  );
}
