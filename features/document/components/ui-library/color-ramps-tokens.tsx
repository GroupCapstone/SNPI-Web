'use client';

import * as React from 'react';
import {
  Check,
  Copy,
  ChevronDown,
  ChevronRight,
} from '@/components/icons';
import { cn } from '@/lib/utils';
import { GithubAppearanceColorRoles } from './github-appearance-color-roles';

// ---------------------------------------------------------------------------
// 1. Color Ramp Definitions (11 calibrated steps: 50 -> 950)
// ---------------------------------------------------------------------------
export interface ColorRampStep {
  step: string;
  hex: string;
  isBase?: boolean;
  contrastWhite: string;
  contrastBlack: string;
}

export interface ColorRampGroup {
  id: string;
  label: string;
  category: 'brand' | 'accents' | 'neutral' | 'status';
  steps: ColorRampStep[];
}

export const COLOR_RAMPS: ColorRampGroup[] = [
  // BRAND
  {
    id: 'primary',
    label: 'primary',
    category: 'brand',
    steps: [
      { step: '50', hex: '#EFF5FF', contrastWhite: '1.1:1', contrastBlack: '19.2:1' },
      { step: '100', hex: '#DBEAFE', contrastWhite: '1.3:1', contrastBlack: '16.5:1' },
      { step: '200', hex: '#BFDBFE', contrastWhite: '1.7:1', contrastBlack: '12.8:1' },
      { step: '300', hex: '#93C5FD', contrastWhite: '2.4:1', contrastBlack: '9.1:1' },
      { step: '400', hex: '#60A5FA', contrastWhite: '3.3:1', contrastBlack: '6.4:1' },
      { step: '500', hex: '#0056FF', isBase: true, contrastWhite: '4.7:1', contrastBlack: '4.5:1' },
      { step: '600', hex: '#0048D9', contrastWhite: '5.6:1', contrastBlack: '3.7:1' },
      { step: '700', hex: '#0038B3', contrastWhite: '7.4:1', contrastBlack: '2.8:1' },
      { step: '800', hex: '#002A8C', contrastWhite: '9.8:1', contrastBlack: '2.1:1' },
      { step: '900', hex: '#0A1A4A', contrastWhite: '16.5:1', contrastBlack: '1.3:1' },
      { step: '950', hex: '#050E28', contrastWhite: '18.9:1', contrastBlack: '1.1:1' },
    ],
  },
  // ACCENTS
  {
    id: 'accent',
    label: 'accent',
    category: 'accents',
    steps: [
      { step: '50', hex: '#FFFBEB', contrastWhite: '1.1:1', contrastBlack: '19.8:1' },
      { step: '100', hex: '#FEF3C7', contrastWhite: '1.2:1', contrastBlack: '17.4:1' },
      { step: '200', hex: '#FDE68A', contrastWhite: '1.4:1', contrastBlack: '14.9:1' },
      { step: '300', hex: '#FCD34D', contrastWhite: '1.8:1', contrastBlack: '11.8:1' },
      { step: '400', hex: '#FBBF24', contrastWhite: '2.2:1', contrastBlack: '9.5:1' },
      { step: '500', hex: '#D97706', isBase: true, contrastWhite: '3.6:1', contrastBlack: '5.8:1' },
      { step: '600', hex: '#B45309', contrastWhite: '5.1:1', contrastBlack: '4.1:1' },
      { step: '700', hex: '#92400E', contrastWhite: '7.2:1', contrastBlack: '2.9:1' },
      { step: '800', hex: '#78350F', contrastWhite: '9.4:1', contrastBlack: '2.2:1' },
      { step: '900', hex: '#451A03', contrastWhite: '14.8:1', contrastBlack: '1.4:1' },
      { step: '950', hex: '#280E02', contrastWhite: '18.2:1', contrastBlack: '1.1:1' },
    ],
  },
  {
    id: 'accent-2',
    label: 'accent-2',
    category: 'accents',
    steps: [
      { step: '50', hex: '#F0F9FF', contrastWhite: '1.1:1', contrastBlack: '19.5:1' },
      { step: '100', hex: '#E0F2FE', contrastWhite: '1.3:1', contrastBlack: '16.8:1' },
      { step: '200', hex: '#BAE6FD', contrastWhite: '1.6:1', contrastBlack: '13.2:1' },
      { step: '300', hex: '#7DD3FC', contrastWhite: '2.1:1', contrastBlack: '9.8:1' },
      { step: '400', hex: '#38BDF8', contrastWhite: '2.8:1', contrastBlack: '7.5:1' },
      { step: '500', hex: '#2277FF', isBase: true, contrastWhite: '3.2:1', contrastBlack: '6.5:1' },
      { step: '600', hex: '#0284C7', contrastWhite: '4.8:1', contrastBlack: '4.3:1' },
      { step: '700', hex: '#0369A1', contrastWhite: '6.5:1', contrastBlack: '3.2:1' },
      { step: '800', hex: '#075985', contrastWhite: '8.8:1', contrastBlack: '2.4:1' },
      { step: '900', hex: '#0C4A6E', contrastWhite: '12.4:1', contrastBlack: '1.7:1' },
      { step: '950', hex: '#082F49', contrastWhite: '16.1:1', contrastBlack: '1.3:1' },
    ],
  },
  // NEUTRAL
  {
    id: 'neutral',
    label: 'neutral',
    category: 'neutral',
    steps: [
      { step: '50', hex: '#F8FAFC', contrastWhite: '1.1:1', contrastBlack: '19.4:1' },
      { step: '100', hex: '#F1F5F9', contrastWhite: '1.2:1', contrastBlack: '17.8:1' },
      { step: '200', hex: '#E2E8F0', contrastWhite: '1.4:1', contrastBlack: '15.1:1' },
      { step: '300', hex: '#CBD5E1', contrastWhite: '1.9:1', contrastBlack: '11.2:1' },
      { step: '400', hex: '#94A3B8', contrastWhite: '3.1:1', contrastBlack: '6.8:1' },
      { step: '500', hex: '#64748B', isBase: true, contrastWhite: '4.6:1', contrastBlack: '4.5:1' },
      { step: '600', hex: '#475569', contrastWhite: '7.1:1', contrastBlack: '2.9:1' },
      { step: '700', hex: '#334155', contrastWhite: '10.2:1', contrastBlack: '2.1:1' },
      { step: '800', hex: '#1E293B', contrastWhite: '14.5:1', contrastBlack: '1.4:1' },
      { step: '900', hex: '#0F172A', contrastWhite: '17.8:1', contrastBlack: '1.2:1' },
      { step: '950', hex: '#0A1A4A', contrastWhite: '16.5:1', contrastBlack: '1.3:1' },
    ],
  },
  // STATUS
  {
    id: 'success',
    label: 'success',
    category: 'status',
    steps: [
      { step: '50', hex: '#ECFDF5', contrastWhite: '1.1:1', contrastBlack: '19.5:1' },
      { step: '100', hex: '#D1FAE5', contrastWhite: '1.3:1', contrastBlack: '16.9:1' },
      { step: '200', hex: '#A7F3D0', contrastWhite: '1.6:1', contrastBlack: '13.5:1' },
      { step: '300', hex: '#6EE7B7', contrastWhite: '2.2:1', contrastBlack: '9.6:1' },
      { step: '400', hex: '#34D399', contrastWhite: '2.9:1', contrastBlack: '7.2:1' },
      { step: '500', hex: '#10B981', isBase: true, contrastWhite: '4.8:1', contrastBlack: '4.4:1' },
      { step: '600', hex: '#059669', contrastWhite: '6.2:1', contrastBlack: '3.4:1' },
      { step: '700', hex: '#047857', contrastWhite: '8.3:1', contrastBlack: '2.5:1' },
      { step: '800', hex: '#065F46', contrastWhite: '11.1:1', contrastBlack: '1.9:1' },
      { step: '900', hex: '#064E3B', contrastWhite: '13.9:1', contrastBlack: '1.5:1' },
      { step: '950', hex: '#022C22', contrastWhite: '18.4:1', contrastBlack: '1.1:1' },
    ],
  },
  {
    id: 'warning',
    label: 'warning',
    category: 'status',
    steps: [
      { step: '50', hex: '#FFFBEB', contrastWhite: '1.1:1', contrastBlack: '19.8:1' },
      { step: '100', hex: '#FEF3C7', contrastWhite: '1.2:1', contrastBlack: '17.4:1' },
      { step: '200', hex: '#FDE68A', contrastWhite: '1.4:1', contrastBlack: '14.9:1' },
      { step: '300', hex: '#FCD34D', contrastWhite: '1.8:1', contrastBlack: '11.8:1' },
      { step: '400', hex: '#FBBF24', contrastWhite: '2.2:1', contrastBlack: '9.5:1' },
      { step: '500', hex: '#F59E0B', isBase: true, contrastWhite: '3.5:1', contrastBlack: '6.0:1' },
      { step: '600', hex: '#D97706', contrastWhite: '4.9:1', contrastBlack: '4.3:1' },
      { step: '700', hex: '#B45309', contrastWhite: '6.8:1', contrastBlack: '3.1:1' },
      { step: '800', hex: '#92400E', contrastWhite: '9.2:1', contrastBlack: '2.3:1' },
      { step: '900', hex: '#78350F', contrastWhite: '12.1:1', contrastBlack: '1.7:1' },
      { step: '950', hex: '#451A03', contrastWhite: '16.8:1', contrastBlack: '1.2:1' },
    ],
  },
  {
    id: 'error',
    label: 'error',
    category: 'status',
    steps: [
      { step: '50', hex: '#FEF2F2', contrastWhite: '1.1:1', contrastBlack: '19.6:1' },
      { step: '100', hex: '#FEE2E2', contrastWhite: '1.3:1', contrastBlack: '16.7:1' },
      { step: '200', hex: '#FECACA', contrastWhite: '1.6:1', contrastBlack: '13.3:1' },
      { step: '300', hex: '#FCA5A5', contrastWhite: '2.3:1', contrastBlack: '9.2:1' },
      { step: '400', hex: '#F87171', contrastWhite: '3.2:1', contrastBlack: '6.6:1' },
      { step: '500', hex: '#EF4444', isBase: true, contrastWhite: '4.6:1', contrastBlack: '4.6:1' },
      { step: '600', hex: '#DC2626', contrastWhite: '5.9:1', contrastBlack: '3.5:1' },
      { step: '700', hex: '#B91C1C', contrastWhite: '8.1:1', contrastBlack: '2.6:1' },
      { step: '800', hex: '#991B1B', contrastWhite: '10.8:1', contrastBlack: '1.9:1' },
      { step: '900', hex: '#7F1D1D', contrastWhite: '13.5:1', contrastBlack: '1.5:1' },
      { step: '950', hex: '#450A0A', contrastWhite: '18.1:1', contrastBlack: '1.1:1' },
    ],
  },
  {
    id: 'info',
    label: 'info',
    category: 'status',
    steps: [
      { step: '50', hex: '#F0F9FF', contrastWhite: '1.1:1', contrastBlack: '19.5:1' },
      { step: '100', hex: '#E0F2FE', contrastWhite: '1.3:1', contrastBlack: '16.8:1' },
      { step: '200', hex: '#BAE6FD', contrastWhite: '1.6:1', contrastBlack: '13.2:1' },
      { step: '300', hex: '#7DD3FC', contrastWhite: '2.1:1', contrastBlack: '9.8:1' },
      { step: '400', hex: '#38BDF8', contrastWhite: '2.8:1', contrastBlack: '7.5:1' },
      { step: '500', hex: '#0284C7', isBase: true, contrastWhite: '4.5:1', contrastBlack: '4.7:1' },
      { step: '600', hex: '#0369A1', contrastWhite: '6.1:1', contrastBlack: '3.4:1' },
      { step: '700', hex: '#075985', contrastWhite: '8.4:1', contrastBlack: '2.5:1' },
      { step: '800', hex: '#0C4A6E', contrastWhite: '11.8:1', contrastBlack: '1.8:1' },
      { step: '900', hex: '#082F49', contrastWhite: '15.4:1', contrastBlack: '1.4:1' },
      { step: '950', hex: '#041C2D', contrastWhite: '18.7:1', contrastBlack: '1.1:1' },
    ],
  },
];

// ---------------------------------------------------------------------------
// 2. Semantic Tokens Table Data with Ramp Step Aliases
// ---------------------------------------------------------------------------
export interface SemanticTokenRow {
  token: string;
  exampleType: 'surface' | 'button' | 'text' | 'border' | 'badge';
  lightHex: string;
  darkHex: string;
  lightRamp: string;
  darkRamp: string;
  contrastRatio: string;
  contrastGrade: 'AAA' | 'AA' | 'UI';
  appliedTo: string;
}

export const SEMANTIC_TOKENS: SemanticTokenRow[] = [
  {
    token: 'bg-canvas',
    exampleType: 'surface',
    lightHex: '#FFFFFF',
    darkHex: '#0A1A4A',
    lightRamp: 'neutral-50',
    darkRamp: 'primary-900',
    contrastRatio: '16.5:1',
    contrastGrade: 'AAA',
    appliedTo: 'Document Root',
  },
  {
    token: 'bg-subsurface',
    exampleType: 'surface',
    lightHex: '#EFF5FF',
    darkHex: '#0F225A',
    lightRamp: 'primary-50',
    darkRamp: 'primary-950',
    contrastRatio: '15.2:1',
    contrastGrade: 'AAA',
    appliedTo: 'Card Containers',
  },
  {
    token: 'bg-elevated',
    exampleType: 'surface',
    lightHex: '#E3E7FC',
    darkHex: '#1A2F6E',
    lightRamp: 'primary-100',
    darkRamp: 'primary-800',
    contrastRatio: '12.8:1',
    contrastGrade: 'AAA',
    appliedTo: 'Pills & Badges',
  },
  {
    token: 'color-primary',
    exampleType: 'button',
    lightHex: '#0056FF',
    darkHex: '#2277FF',
    lightRamp: 'primary-500',
    darkRamp: 'accent-2-500',
    contrastRatio: '4.7:1',
    contrastGrade: 'AA',
    appliedTo: 'Core Actions',
  },
  {
    token: 'color-hover',
    exampleType: 'button',
    lightHex: '#2277FF',
    darkHex: '#4D94FF',
    lightRamp: 'accent-2-500',
    darkRamp: 'primary-400',
    contrastRatio: '3.2:1',
    contrastGrade: 'UI',
    appliedTo: 'Hover States',
  },
  {
    token: 'text-primary',
    exampleType: 'text',
    lightHex: '#0A1A4A',
    darkHex: '#FFFFFF',
    lightRamp: 'primary-900',
    darkRamp: 'neutral-50',
    contrastRatio: '16.5:1',
    contrastGrade: 'AAA',
    appliedTo: 'Headings & Body',
  },
  {
    token: 'text-secondary',
    exampleType: 'text',
    lightHex: '#475569',
    darkHex: '#94A3B8',
    lightRamp: 'neutral-600',
    darkRamp: 'neutral-400',
    contrastRatio: '7.2:1',
    contrastGrade: 'AAA',
    appliedTo: 'Subtitles & Labels',
  },
  {
    token: 'border-subtle',
    exampleType: 'border',
    lightHex: '#CAD3F5',
    darkHex: '#2A3F7E',
    lightRamp: 'primary-200',
    darkRamp: 'primary-800',
    contrastRatio: '3.1:1',
    contrastGrade: 'UI',
    appliedTo: 'Card Dividers',
  },
  {
    token: 'status-success',
    exampleType: 'badge',
    lightHex: '#10B981',
    darkHex: '#34D399',
    lightRamp: 'success-500',
    darkRamp: 'success-400',
    contrastRatio: '4.8:1',
    contrastGrade: 'AA',
    appliedTo: 'Passing Checks',
  },
  {
    token: 'status-error',
    exampleType: 'badge',
    lightHex: '#EF4444',
    darkHex: '#F87171',
    lightRamp: 'error-500',
    darkRamp: 'error-400',
    contrastRatio: '4.6:1',
    contrastGrade: 'AA',
    appliedTo: 'Failed Validations',
  },
  {
    token: 'status-warning',
    exampleType: 'badge',
    lightHex: '#F59E0B',
    darkHex: '#FBBF24',
    lightRamp: 'warning-500',
    darkRamp: 'warning-400',
    contrastRatio: '3.5:1',
    contrastGrade: 'UI',
    appliedTo: 'Attention Triggers',
  },
];

export function ColorRampsTokens() {
  const [copiedHex, setCopiedHex] = React.useState<string | null>(null);

  // Default interactive states matching user specifications:
  // [ HEX | CSS ]: HEX active
  const [formatMode, setFormatMode] = React.useState<'HEX' | 'CSS'>('HEX');
  // [ CONTRAST | AA | AAA ]: AAA active by default
  const [contrastMode, setContrastMode] = React.useState<'CONTRAST' | 'AA' | 'AAA'>('AAA');
  // [ RAM | RAMP ]: RAMP active by default
  const [tokenViewMode, setTokenViewMode] = React.useState<'RAM' | 'RAMP'>('RAMP');

  // Filter States
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [agentDrawerOpen, setAgentDrawerOpen] = React.useState<boolean>(false);
  const [copiedPalette, setCopiedPalette] = React.useState<boolean>(false);







  const handleCopy = async (text: string, label: string) => {
    if (typeof window === 'undefined') return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedHex(label);
        setTimeout(() => setCopiedHex(null), 1800);
      }
    } catch {
      // Fallback
    }
  };

  const handleCopyPaletteJson = async () => {
    if (typeof window === 'undefined') return;
    const agentPalette = {
      system: 'SNPI-SMS Color Ramps & Semantic Tokens',
      specVersion: '2.0',
      derivation: '50-950 Tailwind Standard',
      activeFormat: formatMode,
      activeContrastStandard: contrastMode,
      activeTokenMapping: tokenViewMode,
      ramps: COLOR_RAMPS.reduce<Record<string, Record<string, string>>>((acc, ramp) => {
        acc[ramp.id] = ramp.steps.reduce<Record<string, string>>((sAcc, s) => {
          sAcc[s.step] = s.hex;
          return sAcc;
        }, {});
        return acc;
      }, {}),
      semantic: SEMANTIC_TOKENS.reduce<
        Record<
          string,
          { light: string; dark: string; lightRamp: string; darkRamp: string; contrast: string }
        >
      >((acc, token) => {
        acc[token.token] = {
          light: token.lightHex,
          dark: token.darkHex,
          lightRamp: token.lightRamp,
          darkRamp: token.darkRamp,
          contrast: token.contrastRatio,
        };
        return acc;
      }, {}),
    };

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(JSON.stringify(agentPalette, null, 2));
        setCopiedPalette(true);
        setTimeout(() => setCopiedPalette(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const filteredRamps = React.useMemo(() => {
    if (activeCategory === 'all') return COLOR_RAMPS;
    return COLOR_RAMPS.filter((ramp) => ramp.category === activeCategory);
  }, [activeCategory]);

  // Helper renderer for a single ramp row
  const renderRampRow = (ramp: ColorRampGroup) => (
    <div key={ramp.id} className="space-y-1.5">
      <div className="flex items-center gap-1.5 font-mono text-xs text-slate-700">
        <span className="font-bold">{ramp.label}</span>
        <Check className="size-3.5 text-[#0056FF]" />
      </div>
      <div className="grid grid-cols-11 gap-1">
        {ramp.steps.map((step) => {
          const isDark = parseInt(step.step, 10) >= 500;
          const copyValue = formatMode === 'CSS' ? `var(--${ramp.id}-${step.step})` : step.hex;

          const numContrast = parseFloat(step.contrastWhite);
          const isPassing =
            contrastMode === 'AA'
              ? numContrast >= 4.5
              : contrastMode === 'AAA'
                ? numContrast >= 7.0
                : true;

          const badgeText =
            contrastMode === 'CONTRAST'
              ? step.contrastWhite
              : contrastMode === 'AA'
                ? numContrast >= 4.5
                  ? 'AA'
                  : step.contrastWhite
                : numContrast >= 7.0
                  ? 'AAA'
                  : step.contrastWhite;

          return (
            <button
              key={step.step}
              type="button"
              onClick={() => handleCopy(copyValue, `${ramp.id}-${step.step}`)}
              style={{ backgroundColor: step.hex }}
              title={`Click to copy: ${copyValue} (Step ${step.step})`}
              className={cn(
                'group relative flex h-14 flex-col justify-between rounded-md p-1.5 text-left transition-transform active:scale-95',
                isDark ? 'text-white' : 'text-slate-900',
                step.step === '50' && 'border border-[#CAD3F5]',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold">{step.step}</span>
                {step.isBase && (
                  <span className="py-0.2 rounded-[3px] border border-white/60 bg-white/20 px-1 font-mono text-[8px] font-black tracking-wider uppercase">
                    BASE
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'font-mono text-[8px] font-bold',
                    isPassing ? 'opacity-90' : 'opacity-40',
                  )}
                >
                  {badgeText}
                </span>
                <span className="truncate font-mono text-[8px] opacity-0 transition-opacity group-hover:opacity-100">
                  {copiedHex === `${ramp.id}-${step.step}`
                    ? 'Copied'
                    : formatMode === 'CSS'
                      ? 'CSS'
                      : step.hex}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------- */}
      {/* TOOLBAR CONTROLS: CATEGORIES & BUTTONS                        */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-3 text-xs">
        {/* Category Filters */}
        <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#CAD3F5] bg-white p-1">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={cn(
              'rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all',
              activeCategory === 'all'
                ? 'bg-[#0056FF] text-white shadow-none'
                : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
            )}
          >
            ALL
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('brand')}
            className={cn(
              'rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all',
              activeCategory === 'brand'
                ? 'bg-[#0056FF] text-white shadow-none'
                : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
            )}
          >
            BRAND
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('accents')}
            className={cn(
              'rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all',
              activeCategory === 'accents'
                ? 'bg-[#0056FF] text-white shadow-none'
                : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
            )}
          >
            ACCENT
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('neutral')}
            className={cn(
              'rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all',
              activeCategory === 'neutral'
                ? 'bg-[#0056FF] text-white shadow-none'
                : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
            )}
          >
            NEUTRAL
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('status')}
            className={cn(
              'rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all',
              activeCategory === 'status'
                ? 'bg-[#0056FF] text-white shadow-none'
                : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
            )}
          >
            STATUS
          </button>
        </div>

        {/* Technical Controls: [ HEX | CSS ] and [ CONTRAST | AA | AAA ] */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Format Selector: [ HEX | CSS ] */}
          <div className="inline-flex items-center gap-1 rounded-xl border border-[#CAD3F5] bg-white p-1">
            <button
              type="button"
              onClick={() => setFormatMode('HEX')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 font-sans text-xs font-bold transition-all',
                formatMode === 'HEX'
                  ? 'bg-[#0056FF] text-white shadow-none'
                  : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
              )}
            >
              HEX
            </button>
            <button
              type="button"
              onClick={() => setFormatMode('CSS')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 font-sans text-xs font-bold transition-all',
                formatMode === 'CSS'
                  ? 'bg-[#0056FF] text-white shadow-none'
                  : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
              )}
            >
              CSS
            </button>
          </div>

          {/* Contrast Mode Selector: [ CONTRAST | AA | AAA ] */}
          <div className="inline-flex items-center gap-1 rounded-xl border border-[#CAD3F5] bg-white p-1">
            <button
              type="button"
              onClick={() => setContrastMode('CONTRAST')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 font-sans text-xs font-bold transition-all',
                contrastMode === 'CONTRAST'
                  ? 'bg-[#0056FF] text-white shadow-none'
                  : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
              )}
            >
              CONTRAST
            </button>
            <button
              type="button"
              onClick={() => setContrastMode('AA')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 font-sans text-xs font-bold transition-all',
                contrastMode === 'AA'
                  ? 'bg-[#0056FF] text-white shadow-none'
                  : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
              )}
            >
              AA
            </button>
            <button
              type="button"
              onClick={() => setContrastMode('AAA')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 font-sans text-xs font-bold transition-all',
                contrastMode === 'AAA'
                  ? 'bg-[#0056FF] text-white shadow-none'
                  : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
              )}
            >
              AAA
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COLOR RAMPS GROUPS (BRAND, ACCENTS, NEUTRAL, STATUS)          */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-7">
        {/* Brand Group */}
        {(activeCategory === 'all' || activeCategory === 'brand') && (
          <div className="space-y-3">
            <h3 className="font-sans text-base font-bold text-slate-950">Brand</h3>
            {filteredRamps.filter((r) => r.category === 'brand').map((ramp) => renderRampRow(ramp))}
          </div>
        )}

        {/* Accents Group */}
        {(activeCategory === 'all' || activeCategory === 'accents') && (
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <h3 className="font-sans text-base font-bold text-slate-950">Accents</h3>
              <Check className="size-3.5 text-[#0056FF]" />
            </div>
            {filteredRamps
              .filter((r) => r.category === 'accents')
              .map((ramp) => renderRampRow(ramp))}
          </div>
        )}

        {/* Neutral Group */}
        {(activeCategory === 'all' || activeCategory === 'neutral') && (
          <div className="space-y-3">
            <h3 className="font-sans text-base font-bold text-slate-950">Neutral</h3>
            {filteredRamps
              .filter((r) => r.category === 'neutral')
              .map((ramp) => renderRampRow(ramp))}
          </div>
        )}

        {/* Status Group */}
        {(activeCategory === 'all' || activeCategory === 'status') && (
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <h3 className="font-sans text-base font-bold text-slate-950">Status</h3>
              <Check className="size-3.5 text-[#0056FF]" />
            </div>
            {filteredRamps
              .filter((r) => r.category === 'status')
              .map((ramp) => renderRampRow(ramp))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SEMANTIC TOKENS TABLE                                         */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4 border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-sans text-xl font-black text-[#0A1A4A]">Semantic tokens</h3>

          {/* [ RAM | RAMP ] Button Group */}
          <div className="inline-flex items-center gap-1 rounded-xl border border-[#CAD3F5] bg-white p-1">
            <button
              type="button"
              onClick={() => setTokenViewMode('RAM')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 font-sans text-xs font-bold transition-all',
                tokenViewMode === 'RAM'
                  ? 'bg-[#0056FF] text-white shadow-none'
                  : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
              )}
            >
              RAM
            </button>
            <button
              type="button"
              onClick={() => setTokenViewMode('RAMP')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 font-sans text-xs font-bold transition-all',
                tokenViewMode === 'RAMP'
                  ? 'bg-[#0056FF] text-white shadow-none'
                  : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
              )}
            >
              RAMP
            </button>
          </div>
        </div>

        {/* Semantic Tokens Specification Table */}
        <div className="overflow-x-auto rounded-xl border border-[#CAD3F5] bg-white">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#CAD3F5] bg-[#F8FAFC] text-[10px] font-bold text-slate-500 uppercase">
                <th className="px-4 py-2.5">TOKEN</th>
                <th className="px-4 py-2.5">EXAMPLE</th>
                <th className="px-4 py-2.5">LIGHT</th>
                <th className="px-4 py-2.5">DARK</th>
                <th className="px-4 py-2.5">
                  {contrastMode === 'CONTRAST' ? 'CONTRAST' : contrastMode === 'AA' ? 'AA' : 'AAA'}
                </th>
                <th className="px-4 py-2.5 text-right">EXPORT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {SEMANTIC_TOKENS.map((token) => {
                const lightVal =
                  tokenViewMode === 'RAMP'
                    ? token.lightRamp
                    : formatMode === 'CSS'
                      ? `var(--${token.token})`
                      : token.lightHex;

                const darkVal =
                  tokenViewMode === 'RAMP'
                    ? token.darkRamp
                    : formatMode === 'CSS'
                      ? `var(--${token.token}-dark)`
                      : token.darkHex;

                const exportPayload =
                  tokenViewMode === 'RAMP'
                    ? `--${token.token}: var(--${token.lightRamp});`
                    : `--${token.token}: ${token.lightHex};`;

                return (
                  <tr key={token.token} className="transition-colors hover:bg-[#EFF5FF]/40">
                    {/* TOKEN */}
                    <td className="px-4 py-3 font-mono font-bold text-[#0056FF]">{token.token}</td>

                    {/* EXAMPLE */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="size-4 shrink-0 rounded-[3px] border border-[#CAD3F5]"
                          style={{ backgroundColor: token.lightHex }}
                        />
                        <span className="font-sans text-xs text-slate-700">{token.appliedTo}</span>
                      </div>
                    </td>

                    {/* LIGHT */}
                    <td className="px-4 py-3 font-mono text-xs font-bold text-slate-900">
                      {lightVal}
                    </td>

                    {/* DARK */}
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{darkVal}</td>

                    {/* CONTRAST / AA / AAA */}
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#0A1A4A]">
                      <span
                        className={cn(
                          'rounded-[3px] px-1.5 py-0.5 text-[10px] font-bold',
                          token.contrastGrade === 'AAA'
                            ? 'border border-[#CAD3F5] bg-[#E3E7FC] text-[#0056FF]'
                            : 'border border-[#D0E1FD] bg-[#EFF5FF] text-blue-700',
                        )}
                      >
                        {contrastMode === 'CONTRAST'
                          ? token.contrastRatio
                          : `${token.contrastRatio} ${token.contrastGrade}`}
                      </span>
                    </td>

                    {/* EXPORT */}
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopy(exportPayload, token.token)}
                        title={`Copy ${exportPayload}`}
                        className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF]"
                      >
                        {copiedHex === token.token ? (
                          <Check className="size-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* GITHUB APPEARANCE PREFERENCES & 26 COLOR ROLES ARCHITECTURE    */}
      {/* ------------------------------------------------------------- */}
      <GithubAppearanceColorRoles />

      {/* ------------------------------------------------------------- */}
      {/* MACHINE-READABLE PALETTE (FOR AGENTS) ACCORDION               */}
      {/* ------------------------------------------------------------- */}
      <div className="overflow-hidden rounded-xl border border-[#CAD3F5] bg-white">
        <button
          type="button"
          onClick={() => setAgentDrawerOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-5 py-3.5 text-left font-sans text-sm font-bold text-slate-900 transition-colors hover:bg-[#F8FAFC]"
        >
          <div className="flex items-center gap-2">
            {agentDrawerOpen ? (
              <ChevronDown className="size-4 text-[#0056FF]" />
            ) : (
              <ChevronRight className="size-4 text-[#0056FF]" />
            )}
            <span>Machine-readable palette (for agents)</span>
          </div>
          <span className="font-mono text-xs text-slate-400">JSON &middot; Agent Ready</span>
        </button>

        {agentDrawerOpen && (
          <div className="space-y-3 border-t border-[#CAD3F5] bg-[#F8FAFC] p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-slate-500">
                Machine format ready for system prompts, LLM tool schemas, and agent context
              </span>
              <button
                type="button"
                onClick={handleCopyPaletteJson}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#0056FF] bg-[#0056FF] px-3 py-1 font-mono text-xs font-bold text-white transition-opacity hover:opacity-90 active:scale-95"
              >
                {copiedPalette ? (
                  <>
                    <Check className="size-3 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3 text-white" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            <pre className="overflow-x-auto rounded-lg border border-[#CAD3F5] bg-white p-4 font-mono text-xs leading-relaxed text-[#0A1A4A]">
              {JSON.stringify(
                {
                  $schema: 'https://snpi.edu.kh/schemas/color-palette-v2.json',
                  brand: {
                    primary: {
                      base: '#0056FF',
                      steps: COLOR_RAMPS.find((r) => r.id === 'primary')?.steps.map((s) => ({
                        step: s.step,
                        hex: s.hex,
                        contrast: s.contrastWhite,
                      })),
                    },
                  },
                  accents: {
                    accent: '#D97706',
                    accent2: '#2277FF',
                  },
                  neutral: {
                    canvas: '#FFFFFF',
                    subsurface: '#EFF5FF',
                    border: '#CAD3F5',
                    text: '#0A1A4A',
                  },
                  status: {
                    success: '#10B981',
                    warning: '#F59E0B',
                    error: '#EF4444',
                    info: '#0284C7',
                  },
                },
                null,
                2,
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
