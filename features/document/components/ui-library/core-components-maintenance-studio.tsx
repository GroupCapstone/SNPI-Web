'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CoreComponentsManual, CORE_COMPONENTS_SPECS } from './core-components-manual';
import { MaintenanceManual, MAINTENANCE_SPECS } from './maintenance-manual';
import {
  Layers,
  ShieldKey,
  Sliders,
  Check,
  Search,
  ChevronRight,
  Filter,
  Sparkles,
  Zap,
} from '@/components/icons';
import { cn } from '@/lib/utils';
import { WHILE_TAP_SCALE, MOTION_EASE_OUT } from '@/lib/motion';

export type StudioTab = 'components' | 'maintenance' | 'panoramic';

export function CoreComponentsMaintenanceStudio() {
  const [activeTab, setActiveTab] = React.useState<StudioTab>('components');
  const [searchFilter, setSearchFilter] = React.useState<string>('');

  // Calculate live invariant totals
  const totalComponentChecks = React.useMemo(
    () => CORE_COMPONENTS_SPECS.reduce((acc, s) => acc + s.totalChecks, 0),
    [],
  );
  const totalMaintenanceChecks = React.useMemo(
    () => MAINTENANCE_SPECS.reduce((acc, s) => acc + s.totalChecks, 0),
    [],
  );
  const grandTotalChecks = totalComponentChecks + totalMaintenanceChecks;

  // Synchronize view mode if user navigates via sidebar or URL anchor
  React.useEffect(() => {
    const syncAnchor = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('maint-') || hash === 'maintenance-manual-section') {
        setActiveTab((prev) => (prev === 'panoramic' ? 'panoramic' : 'maintenance'));
      } else if (hash.startsWith('comp-') || hash === 'core-components-section') {
        setActiveTab((prev) => (prev === 'panoramic' ? 'panoramic' : 'components'));
      }
    };

    syncAnchor();
    window.addEventListener('hashchange', syncAnchor);
    return () => window.removeEventListener('hashchange', syncAnchor);
  }, []);

  return (
    <div
      id="core-components-section"
      className="scroll-mt-24 space-y-8 rounded-3xl border border-[#CAD3F5] bg-white p-6 shadow-xs sm:p-8 lg:p-10"
    >
      {/* ============================================================= */}
      {/* 1. CREATIVE ARCHITECTURAL HERO BANNER                          */}
      {/* ============================================================= */}
      <div className="relative overflow-hidden rounded-2xl border border-[#CAD3F5] bg-gradient-to-br from-[#EFF5FF] via-white to-[#EFF5FF]/60 p-6 sm:p-8">
        {/* Subtle Decorative Technical Coordinate Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, #CAD3F5 1px, transparent 1px), linear-gradient(to bottom, #CAD3F5 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#CAD3F5]/60 pb-4">
            <div className="flex items-center gap-2">
              <span className="rounded-[2px] bg-[#0056FF] px-2.5 py-1 font-mono text-[10px] font-black tracking-widest text-white uppercase">
                PHASE 03 &amp; 04
              </span>
              <span className="rounded-[2px] border border-[#CAD3F5] bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-[#0056FF]">
                ENTERPRISE DESIGN ENGINE
              </span>
            </div>

            {/* Invariant Health Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 font-mono text-xs font-bold text-emerald-800">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>{grandTotalChecks} INVARIANTS ACTIVE</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[2px] bg-white shadow-2xs">
                  <Layers className="size-6 text-[#020617]" />
                </div>
                <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl lg:text-4xl">
                  Core Components &bull; Maintenance Studio
                </h2>
              </div>
              <p className="font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
                Dual-engine architectural system uniting 29 production UI primitives with 5
                operational governance pillars to ensure zero design debt, full accessibility, and
                continuous enterprise stability.
              </p>
            </div>

            {/* Quick Action Button for Full Invariant Tour */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('panoramic')}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#CAD3F5] bg-white px-4 py-2 font-sans text-xs font-bold text-[#0A1A4A] transition-all hover:bg-[#EFF5FF] active:scale-[0.97]"
              >
                <Sliders className="size-3.5 text-[#0056FF]" />
                <span>Panoramic View</span>
              </button>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* KINETIC TELEMETRY METRICS HUD                               */}
          {/* ----------------------------------------------------------- */}
          <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            <div className="rounded-xl border border-[#CAD3F5] bg-white p-3.5 shadow-2xs transition-all hover:border-[#0056FF]/50">
              <div className="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Atomic Primitives
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-sans text-2xl font-black text-[#0A1A4A]">29</span>
                <span className="font-mono text-[11px] font-bold text-[#0056FF]">6 Clusters</span>
              </div>
              <div className="mt-1 font-sans text-[11px] text-slate-500">
                Accordion through Tooltip
              </div>
            </div>

            <div className="rounded-xl border border-[#CAD3F5] bg-white p-3.5 shadow-2xs transition-all hover:border-[#0056FF]/50">
              <div className="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Component Invariants
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-sans text-2xl font-black text-[#0A1A4A]">
                  {totalComponentChecks}
                </span>
                <span className="font-mono text-[11px] font-bold text-emerald-600">
                  A11y &bull; Motion
                </span>
              </div>
              <div className="mt-1 font-sans text-[11px] text-slate-500">
                100% Verified Checkpoints
              </div>
            </div>

            <div className="rounded-xl border border-[#CAD3F5] bg-white p-3.5 shadow-2xs transition-all hover:border-[#0056FF]/50">
              <div className="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Maintenance Pillars
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-sans text-2xl font-black text-[#0A1A4A]">05</span>
                <span className="font-mono text-[11px] font-bold text-[#0056FF]">Governance</span>
              </div>
              <div className="mt-1 font-sans text-[11px] text-slate-500">
                Docs &bull; Libs &bull; QA &bull; Community &bull; RFC
              </div>
            </div>

            <div className="rounded-xl border border-[#CAD3F5] bg-white p-3.5 shadow-2xs transition-all hover:border-[#0056FF]/50">
              <div className="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Operational Rules
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-sans text-2xl font-black text-[#0A1A4A]">
                  {totalMaintenanceChecks}
                </span>
                <span className="font-mono text-[11px] font-bold text-emerald-600">
                  CI / CD Gate
                </span>
              </div>
              <div className="mt-1 font-sans text-[11px] text-slate-500">
                Monorepo Isolation Rules
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 2. CREATIVE THREE-WAY STUDIO SEGMENTED SWITCHER                */}
      {/* ============================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        {/* Segmented Pill Tabs with Motion Law 20 layoutId */}
        <div className="inline-flex rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] p-1 shadow-2xs">
          {(
            [
              {
                id: 'components',
                label: 'Core Components',
                badge: '29 Primitives',
                icon: Layers,
              },
              {
                id: 'maintenance',
                label: 'Maintenance Strategy',
                badge: '5 Pillars',
                icon: ShieldKey,
              },
              {
                id: 'panoramic',
                label: 'Panoramic Studio',
                badge: `${grandTotalChecks} Checks`,
                icon: Sliders,
              },
            ] as const
          ).map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                type="button"
                whileTap={{ scale: WHILE_TAP_SCALE }}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-sans text-xs font-bold transition-colors select-none',
                  isSelected ? 'text-white' : 'text-[#0A1A4A] hover:text-[#0056FF]',
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeStudioPill"
                    transition={{
                      type: 'spring',
                      damping: 30,
                      stiffness: 420,
                    }}
                    className="absolute inset-0 rounded-lg bg-[#0056FF] shadow-xs"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={cn('size-3.5', isSelected ? 'text-white' : 'text-[#020617]')} />
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      'py-0.2 rounded-[2px] px-1.5 font-mono text-[10px] font-bold',
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'border border-[#CAD3F5] bg-white text-slate-600',
                    )}
                  >
                    {tab.badge}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Quick View Stats */}
        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
          <span className="rounded-[2px] border border-[#CAD3F5] bg-white px-2.5 py-1 text-[11px] font-bold text-[#0056FF]">
            {activeTab === 'components'
              ? '29 Primitives · 166 Invariants'
              : activeTab === 'maintenance'
                ? '5 Pillars · 28 Rules'
                : '194 System Invariants'}
          </span>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 3. STUDIO WORKSPACE CANVAS                                     */}
      {/* ============================================================= */}
      <div className="space-y-12">
        {/* VIEW 1: CORE COMPONENTS ONLY */}
        {activeTab === 'components' && (
          <motion.div
            key="components-deck"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: MOTION_EASE_OUT }}
            className="space-y-6"
          >
            <CoreComponentsManual hideHeader={true} />
          </motion.div>
        )}

        {/* VIEW 2: MAINTENANCE STRATEGY ONLY */}
        {activeTab === 'maintenance' && (
          <motion.div
            key="maintenance-deck"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: MOTION_EASE_OUT }}
            className="space-y-6"
          >
            <div id="maintenance-manual-section" className="scroll-mt-24">
              <MaintenanceManual hideHeader={true} />
            </div>
          </motion.div>
        )}

        {/* VIEW 3: PANORAMIC PANELS (BOTH COEXISTING STACKED) */}
        {activeTab === 'panoramic' && (
          <motion.div
            key="panoramic-deck"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: MOTION_EASE_OUT }}
            className="space-y-12"
          >
            {/* Core Components Segment */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="rounded-[2px] bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
                  SUBSECTION 03.1
                </span>
                <h3 className="font-sans text-lg font-black text-[#0A1A4A]">
                  Core Components (29 Primitives)
                </h3>
              </div>
              <CoreComponentsManual hideHeader={true} />
            </div>

            {/* Maintenance Segment */}
            <div id="maintenance-manual-section" className="scroll-mt-24 space-y-4 pt-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="rounded-[2px] bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
                  SUBSECTION 03.2
                </span>
                <h3 className="font-sans text-lg font-black text-[#0A1A4A]">
                  Maintenance Strategy (5 Governance Pillars)
                </h3>
              </div>
              <MaintenanceManual hideHeader={true} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
