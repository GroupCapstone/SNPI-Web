'use client';

import * as React from 'react';
import {
  ShieldKey,
  Sliders,
  Accessibility,
  BookOpen,
  AppWindow,
  Check,
  Copy,
  Search,
  Sparkles,
  Layers,
  Activity,
  Globe,
  PenLine,
  Columns3,
  Maximize2,
  ChevronRight,
  Eye,
  Zap,
} from '@/components/icons';
import { cn } from '@/lib/utils';

export function DesignLanguageManual() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<'brand' | 'guidelines' | 'foundations'>('brand');

  const handleCopy = async (text: string, id: string) => {
    if (typeof window === 'undefined') return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1800);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-12">
      {/* ------------------------------------------------------------- */}
      {/* 0. DESIGN LANGUAGE PHILOSOPHY & MANIFESTO BANNER               */}
      {/* ------------------------------------------------------------- */}
      <div className="relative space-y-4 overflow-hidden rounded-3xl border border-[#CAD3F5] bg-gradient-to-br from-[#EFF5FF] via-white to-[#F8FAFC] p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#0056FF]/30 bg-[#0056FF]/10 px-3 py-1 font-mono text-[11px] font-bold text-[#0056FF]">
            <Sparkles className="size-3.5" />
            <span>DESIGN LANGUAGE MANUAL &middot; PHASE 1 OF 4</span>
          </div>

          <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
            Design Language (5/10 Checks)
          </h2>

          <p className="font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
            &ldquo;Like any language, a design language is a methodical way of communicating with
            your audience through your approach to product design. It&apos;s the cornerstone of
            consistent customer experiences.&rdquo;
          </p>
        </div>

        {/* Phase 1 Metrics: Brand (5/5) & Guidelines (0/5) */}
        <div className="grid max-w-xl grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-300 bg-white p-3.5 shadow-2xs">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-sans font-bold text-[#0A1A4A]">Brand Invariants</span>
              <span className="py-0.2 rounded-md border border-emerald-300 bg-emerald-50 px-1.5 text-[10px] font-bold text-emerald-700">
                5/5 Completed
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }} />
            </div>
            <span className="mt-1.5 block text-[10px] text-slate-500">
              Vision, Principles, Tone of Voice, Terminology, Assets
            </span>
          </div>

          <div className="rounded-2xl border border-[#CAD3F5] bg-white p-3.5 shadow-2xs">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-sans font-bold text-[#0A1A4A]">Design Guidelines</span>
              <span className="py-0.2 rounded-md border border-blue-200 bg-[#EFF5FF] px-1.5 text-[10px] font-bold text-[#0056FF]">
                0/5 Queued
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#0056FF]" style={{ width: '0%' }} />
            </div>
            <span className="mt-1.5 block text-[10px] text-slate-500">
              Accessibility, Writing, Microcopy, Lexicon, i18n
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. BRAND (COMPLETED)                                           */}
      {/* ------------------------------------------------------------- */}
      <section id="brand-group" className="scroll-mt-24 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Check className="size-4 stroke-[3]" />
              </span>
              <h3 className="font-sans text-xl font-black tracking-tight text-[#0A1A4A] sm:text-2xl">
                Brand
              </h3>
              <span className="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-700">
                Completed
              </span>
            </div>
            <p className="max-w-3xl font-sans text-xs text-slate-600 sm:text-sm">
              Brand drives every single decision you make when building new products or features. A
              good brand is much more than a name and a logo. It&apos;s the values that define your
              unique identity and what makes you stand out from others.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Vision */}
          <div
            id="brand-vision"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                B1 · Vision
              </span>
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                Active
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Institutional Vision</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Why you exist, what your values are, and how they&apos;ll help guide the future of
              your product.
            </p>
            <div className="rounded-lg border border-slate-100 bg-[#F8FAFC] p-2.5 font-sans text-xs text-slate-700">
              Modernizing educational management in Cambodia through cloud-native, high-density,
              bilingual institutional software.
            </div>
          </div>

          {/* Design Principles */}
          <div
            id="brand-principles"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                B2 · Principles
              </span>
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                5 Tenets
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Design Principles</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              The considerations that guide the basis of your practice. They outline how you
              approach design philosophically and help with everyday decisions.
            </p>
            <ul className="space-y-1 font-mono text-[11px] text-[#0A1A4A]">
              <li>&bull; Purposeful Speed &amp; High Density</li>
              <li>&bull; Zero-Emoji Enterprise Sobriety</li>
              <li>&bull; Liquid Glass Elevation &amp; Hierarchy</li>
              <li>&bull; Dual-Language Equity (KH &amp; EN)</li>
            </ul>
          </div>

          {/* Tone of Voice */}
          <div
            id="brand-tone-of-voice"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                B3 · Voice
              </span>
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                3 Pillars
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Tone of Voice</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              A clear tone of voice defines how you speak to your audience at every moment of their
              journey, helping them get wherever they want to go.
            </p>
            <div className="space-y-1 font-sans text-xs">
              <div className="font-bold text-[#0056FF]">1. Authoritative yet Empathetic</div>
              <div className="font-bold text-[#0056FF]">2. Action-Oriented &amp; Direct</div>
              <div className="font-bold text-[#0056FF]">3. Transparent &amp; Accountable</div>
            </div>
          </div>

          {/* Terminology */}
          <div
            id="brand-terminology"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                B4 · Terms
              </span>
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                Standard
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">System Terminology</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Create the standard terms and phrases that need to be kept the same throughout the
              user experience, speeding up the design process and unifying your voice.
            </p>
            <div className="font-mono text-[11px] text-slate-600">
              ORG_BRANCH &middot; ACA_YEAR &middot; SEC_RBAC &middot; FIN_INVOICE
            </div>
          </div>

          {/* Brand Assets */}
          <div
            id="brand-assets"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left sm:col-span-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                B5 · Assets
              </span>
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                Unified
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Brand Assets</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Using a consistent set of brand assets aligns the user experience across your product
              and marketing campaigns. These assets include your logo, fonts, icons, illustrations,
              etc.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
              <span className="rounded border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-1 font-bold text-[#0056FF]">
                Kantumruy Pro
              </span>
              <span className="rounded border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-1 font-bold text-[#0056FF]">
                Google Sans
              </span>
              <span className="rounded border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-1 font-bold text-[#0056FF]">
                Outlined 24dp Vectors
              </span>
              <span className="rounded border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-1 font-bold text-[#0056FF]">
                Primary Blue #0056FF
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. GUIDELINES (0/5)                                            */}
      {/* ------------------------------------------------------------- */}
      <section id="guidelines-group" className="scroll-mt-24 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-[#EFF5FF] text-[#0056FF]">
                <Sliders className="size-4" />
              </span>
              <h3 className="font-sans text-xl font-black tracking-tight text-[#0A1A4A] sm:text-2xl">
                Guidelines
              </h3>
              <span className="rounded-md border border-[#0056FF] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[11px] font-bold text-[#0056FF]">
                0/5 Guidelines
              </span>
            </div>
            <p className="max-w-3xl font-sans text-xs text-slate-600 sm:text-sm">
              Understanding how to approach common UX patterns will allow your organization to
              establish a consistent approach and user experience on any platform.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Accessibility */}
          <div
            id="guidelines-accessibility"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                G1 · Accessibility
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                0/1
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Accessibility</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Guidelines for how you approach accessibility and how you leverage color, hierarchy,
              and assistive technologies to help your users.
            </p>
            <div className="font-mono text-[11px] text-slate-600">
              WCAG 2.1 AA &middot; Contrast &ge; 4.5:1 &middot; W3C Landmarks
            </div>
          </div>

          {/* Writing guidelines */}
          <div
            id="guidelines-writing"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                G2 · Writing
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                0/1
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Writing Guidelines</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Every consistent experience needs watertight writing. Laying down the foundations for
              your house style early keeps everything in line with consistent grammar, style
              choices, and action-oriented language to help your design.
            </p>
            <div className="font-mono text-[11px] text-slate-600">
              Action verbs first &middot; Plain language &middot; &le; 140 chars
            </div>
          </div>

          {/* Microcopy guidelines */}
          <div
            id="guidelines-microcopy"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                G3 · Microcopy
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                0/1
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Microcopy Guidelines</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              The standard way to write for the components in your design system. These take
              platform conventions and best practices for writing all into consideration.
            </p>
            <div className="font-mono text-[11px] text-slate-600">
              Button labels &middot; Inline errors &middot; Empty states &middot; Toast alerts
            </div>
          </div>

          {/* Terminology */}
          <div
            id="guidelines-terminology"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                G4 · Lexicon
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                0/1
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Terminology</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Create the standard terms and phrases that need to be kept the same throughout the
              user experience, speeding up the design process and unifying your voice.
            </p>
            <div className="font-mono text-[11px] text-slate-600">
              107 Material Terms &middot; HCT Color Science &middot; Tokens
            </div>
          </div>

          {/* Internationalisation */}
          <div
            id="guidelines-i18n"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left sm:col-span-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                G5 · i18n
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                0/1
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">
              Internationalisation (Khmer &amp; English)
            </h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Define standards for handling content translated into various languages supported by
              the product. It includes handling translation edge cases and content
              bi-directionality.
            </p>
            <div className="font-mono text-[11px] text-slate-600">
              Khmer Unicode normalization &middot; Lek To (ៗ) double word TTS &middot; Dynamic card
              padding
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. FOUNDATIONS                                                 */}
      {/* ------------------------------------------------------------- */}
      <section id="foundations-group" className="scroll-mt-24 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-[#EFF5FF] text-[#0056FF]">
                <Layers className="size-4" />
              </span>
              <h3 className="font-sans text-xl font-black tracking-tight text-[#0A1A4A] sm:text-2xl">
                Foundations
              </h3>
              <span className="rounded-md border border-[#CAD3F5] bg-[#F8FAFC] px-2 py-0.5 font-mono text-[11px] font-bold text-slate-700">
                Design Assets &amp; Tokens
              </span>
            </div>
            <p className="max-w-3xl font-sans text-xs text-slate-600 sm:text-sm">
              Design assets and tokens that store values for the base layer of your design system,
              like color and typography. They&apos;re used in components, so changes on this level
              will resonate throughout the whole system.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Color 0/4 */}
          <div
            id="foundations-color"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                F1 · Color
              </span>
              <span className="rounded bg-[#EFF5FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                0/4
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Color Tokens</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Not only an efficient way to showcase your brand but also an efficient way to
              communicate with your users. Color palettes created with purpose over aesthetics in
              mind add meaning to your interface.
            </p>
            <ul className="space-y-1 font-mono text-[11px] text-slate-600">
              <li>
                &bull; <strong className="text-[#0A1A4A]">Accessibility:</strong> AA standard
                contrast (&ge;4.5:1)
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Semantic colors:</strong> Disabled,
                backgrounds, actions
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Dark mode:</strong> Tone 98 light / Tone 6
                dark
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Guidelines:</strong> Purpose over
                aesthetics
              </li>
            </ul>
          </div>

          {/* Layout 0/4 */}
          <div
            id="foundations-layout"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                F2 · Layout
              </span>
              <span className="rounded bg-[#EFF5FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                0/4
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Layout &amp; Grid</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              A well-thought-out layout goes a long way. Consistent use of a grid and spacing makes
              it easier for your users to scan the user interface and grasp the content.
            </p>
            <ul className="space-y-1 font-mono text-[11px] text-slate-600">
              <li>
                &bull; <strong className="text-[#0A1A4A]">Units:</strong> 4, 8, 12, 16 4-point
                increments
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Grid:</strong> Mobile, tablet, desktop
                columns
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Breakpoints:</strong> Compact, Medium,
                Expanded, Large
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Spacing:</strong> Independent rhythm
                methods
              </li>
            </ul>
          </div>

          {/* Typography 0/5 */}
          <div
            id="foundations-typography"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                F3 · Typography
              </span>
              <span className="rounded bg-[#EFF5FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                0/5
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Typography Scale</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Typography is one of the main ways you surface content in products. A clear hierarchy
              and contrasting styles in your typography scale make things easier to read.
            </p>
            <ul className="space-y-1 font-mono text-[11px] text-slate-600">
              <li>
                &bull; <strong className="text-[#0A1A4A]">Responsiveness:</strong> Adapts to
                viewport size
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Grid relation:</strong> Matches 8dp grid
                &amp; leading
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Readability:</strong> Tracking, leading,
                measure
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Performance:</strong> Fast loading &amp;
                system fallbacks
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Guidelines:</strong> Pairings and scale
                rules
              </li>
            </ul>
          </div>

          {/* Elevation 0/3 */}
          <div
            id="foundations-elevation"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                F4 · Elevation
              </span>
              <span className="rounded bg-[#EFF5FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                0/3
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">
              Elevation &amp; Z-Index
            </h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Elevation controls the relative distance between two surfaces along the z-axis. In
              light mode via shadow, in dark mode via surface container background color.
            </p>
            <ul className="space-y-1 font-mono text-[11px] text-slate-600">
              <li>
                &bull; <strong className="text-[#0A1A4A]">Shadows:</strong> 3 to 4 elevation levels
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Background colors:</strong> Linked surface
                tones
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Z-index:</strong> Priority rendering scale
              </li>
            </ul>
          </div>

          {/* Motion 0/3 */}
          <div
            id="foundations-motion"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                F5 · Motion
              </span>
              <span className="rounded bg-[#EFF5FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                0/3
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Motion &amp; Physics</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Shared motion values provide a more coherent user experience and better alignment with
              the brand.
            </p>
            <ul className="space-y-1 font-mono text-[11px] text-slate-600">
              <li>
                &bull; <strong className="text-[#0A1A4A]">Easing:</strong> Standard, accelerated,
                decelerated
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Duration:</strong> Micro (150ms),
                Component (250ms)
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Accessibility:</strong> Honors
                prefers-reduced-motion
              </li>
            </ul>
          </div>

          {/* Iconography 0/7 */}
          <div
            id="foundations-iconography"
            className="scroll-mt-24 space-y-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                F6 · Iconography
              </span>
              <span className="rounded bg-[#EFF5FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                0/7
              </span>
            </div>
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Iconography System</h4>
            <p className="font-sans text-xs leading-relaxed text-slate-600">
              Icons are symbols that represent functionality or content, understood at a glance when
              used meaningfully and consistently.
            </p>
            <ul className="space-y-1 font-mono text-[11px] text-slate-600">
              <li>
                &bull; <strong className="text-[#0A1A4A]">Accessibility:</strong> Default aria-label
                / hidden
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Style:</strong> Consistent 24dp outlined
                stroke
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Naming:</strong> Purpose-based
                (&apos;play&apos;, not &apos;triangle&apos;)
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Grid relation:</strong> 24x24dp bounding
                box on grid
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Keywords:</strong> Discoverability tagging
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Reserved icons:</strong> Common system
                actions
              </li>
              <li>
                &bull; <strong className="text-[#0A1A4A]">Guidelines:</strong> When &amp; how to use
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
