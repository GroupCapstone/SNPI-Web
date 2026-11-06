'use client';

import * as React from 'react';
import { Copy, Check } from '@/components/icons';
import {
  AsteriskLogo,
  AsteriskVectorGlyph,
  AsteriskTricolorGlyph,
  SaveLogoButton,
  BrandMediaKitDownloadSuite,
} from './asterisk-logo';

export function BrandConceptBlueprint() {
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  const handleCopy = async (token: string, label: string) => {
    if (typeof window === 'undefined') return;
    let ok = false;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(token);
        ok = true;
      }
    } catch {
      // Fall through to fallback
    }

    if (!ok) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = token;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        ok = true;
      } catch (e) {
        console.error('Copy token failed:', e);
      }
    }

    if (ok) {
      setCopiedToken(label);
      setTimeout(() => setCopiedToken(null), 2000);
    }
  };

  return (
    <div className="space-y-10">
      {/* HEADER SECTION */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="font-sans text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
          Brand Colors
        </h2>
      </div>

      {/* BENTO GRID: PURE FLAT SOLID BRAND PALETTE (ZERO GRADIENTS, ZERO BLACK/GRAY) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* 01 Royal Blue (Tall Left Anchor: Spans 5 Columns & Both Rows) */}
        <div
          onClick={() => handleCopy('#0056FF', 'Royal Blue')}
          className="group relative flex min-h-[340px] cursor-pointer flex-col justify-between rounded-2xl bg-[#0056FF] p-6 text-white shadow-xs md:col-span-5 md:row-span-2"
          title="Click to copy HEX: #0056FF"
        >
          {/* Top: Massive Number & Copy Badge */}
          <div className="flex items-start justify-between">
            <span className="font-sans text-6xl font-black tracking-tighter select-none sm:text-7xl">
              01
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy('#0056FF', 'Royal Blue');
              }}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 font-mono text-xs font-semibold text-white backdrop-blur-xs transition-colors hover:bg-white/25"
            >
              {copiedToken === 'Royal Blue' ? (
                <>
                  <Check className="size-3 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3 text-white/80" />
                  <span>#0056FF</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom: Name & Hex Code */}
          <div className="space-y-0.5 pt-12">
            <h3 className="font-sans text-xl font-extrabold tracking-tight">Royal Blue</h3>
            <p className="font-mono text-xs font-semibold opacity-90">#0056FF</p>
          </div>
        </div>

        {/* Right 2x2 Grid of Solid Tokens (Spans 7 Columns) */}
        {/* 02 Azure Blue */}
        <div
          onClick={() => handleCopy('#2277FF', 'Azure Blue')}
          className="group relative flex min-h-[160px] cursor-pointer flex-col justify-between rounded-2xl bg-[#2277FF] p-5 text-white shadow-xs sm:col-span-6 md:col-span-3"
          title="Click to copy HEX: #2277FF"
        >
          <div className="flex items-start justify-between">
            <span className="font-sans text-4xl font-extrabold tracking-tighter select-none">
              02
            </span>
            <span className="font-mono text-xs font-bold opacity-90">
              {copiedToken === 'Azure Blue' ? 'Copied!' : '#2277FF'}
            </span>
          </div>
          <div className="space-y-0.5">
            <h4 className="font-sans text-base font-bold">Azure Blue</h4>
            <p className="font-mono text-[11px] opacity-80">Interactive Accent</p>
          </div>
        </div>

        {/* 03 Soft Lavender */}
        <div
          onClick={() => handleCopy('#E3E7FC', 'Soft Lavender')}
          className="group relative flex min-h-[160px] cursor-pointer flex-col justify-between rounded-2xl border border-[#CAD3F5] bg-[#E3E7FC] p-5 text-[#0A1A4A] shadow-xs sm:col-span-6 md:col-span-4"
          title="Click to copy HEX: #E3E7FC"
        >
          <div className="flex items-start justify-between">
            <span className="font-sans text-4xl font-extrabold tracking-tighter text-[#0A1A4A] select-none">
              03
            </span>
            <span className="font-mono text-xs font-bold text-[#0056FF]">
              {copiedToken === 'Soft Lavender' ? 'Copied!' : '#E3E7FC'}
            </span>
          </div>
          <div className="space-y-0.5">
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Soft Lavender</h4>
            <p className="font-mono text-[11px] text-[#0056FF]">Micro-Tint & Badges</p>
          </div>
        </div>

        {/* 04 White */}
        <div
          onClick={() => handleCopy('#FFFFFF', 'White')}
          className="group relative flex min-h-[160px] cursor-pointer flex-col justify-between rounded-2xl border-2 border-[#CAD3F5] bg-white p-5 text-[#0A1A4A] shadow-xs sm:col-span-6 md:col-span-3"
          title="Click to copy HEX: #FFFFFF"
        >
          <div className="flex items-start justify-between">
            <span className="font-sans text-4xl font-extrabold tracking-tighter text-[#0A1A4A] select-none">
              04
            </span>
            <span className="rounded-full border border-[#CAD3F5] bg-[#EFF5FF] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#0056FF]">
              {copiedToken === 'White' ? 'Copied!' : '#FFFFFF'}
            </span>
          </div>
          <div className="space-y-0.5">
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">White</h4>
            <p className="font-mono text-[11px] text-slate-500">Document Canvas Base</p>
          </div>
        </div>

        {/* 05 Ice Tint */}
        <div
          onClick={() => handleCopy('#EFF5FF', 'Ice Tint')}
          className="group relative flex min-h-[160px] cursor-pointer flex-col justify-between rounded-2xl border border-[#D0E1FD] bg-[#EFF5FF] p-5 text-[#0056FF] shadow-xs sm:col-span-6 md:col-span-4"
          title="Click to copy HEX: #EFF5FF"
        >
          <div className="flex items-start justify-between">
            <span className="font-sans text-4xl font-extrabold tracking-tighter text-[#0056FF] select-none">
              05
            </span>
            <span className="font-mono text-xs font-bold text-[#0056FF]">
              {copiedToken === 'Ice Tint' ? 'Copied!' : '#EFF5FF'}
            </span>
          </div>
          <div className="space-y-0.5">
            <h4 className="font-sans text-base font-bold text-[#0056FF]">Ice Tint</h4>
            <p className="font-mono text-[11px] text-slate-600">Subsurface Card Fill</p>
          </div>
        </div>
      </div>

      {/* SNPI OFFICIAL BRAND ASTERISK LOGO (3-SHAPE TRICOLOR REDESIGN) */}
      <div
        id="brand-logo-design"
        className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-xs sm:p-8"
      >
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
                Official Brand Identity
              </span>
              <span className="rounded-md bg-blue-100 px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                3 Canonical Editions
              </span>
            </div>
            <h3 className="font-sans text-xl font-extrabold text-slate-950 sm:text-2xl">
              Asterisk Logo Glyph (*) — Unified Bold Master Mark
            </h3>
            <p className="max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm">
              The official SNPI asterisk mark features unified wing geometry framing the iconic
              central negative space. Weighted with bold vector stroke expansion to command optical
              prominence over every surface canvas across three canonical editions:
            </p>
          </div>

          {/* Unified Media Kit & High-Res PNG Download Suite */}
          <BrandMediaKitDownloadSuite />
        </div>

        {/* 3 Canonical Editions Interactive Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Edition 01: Blue Brand Logo — #0056FF */}
          <div
            onClick={() => handleCopy('#0056FF', 'Blue Brand Edition')}
            className="group flex cursor-pointer items-center justify-between rounded-xl border border-blue-200 bg-[#EFF5FF] p-3.5 transition-colors hover:border-[#0056FF]"
            title="Click to copy HEX: #0056FF"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg border border-[#CAD3F5] bg-white shadow-2xs">
                <div className="size-6">
                  <AsteriskVectorGlyph color="#0056FF" strokeWidth={2.5} />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                  Edition 01 (Core Base)
                </div>
                <div className="font-sans text-xs font-extrabold text-[#0A1A4A]">
                  Blue Brand on Light
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-[#0056FF]">
              {copiedToken === 'Blue Brand Edition' ? 'Copied!' : '#0056FF'}
            </span>
          </div>

          {/* Edition 02: White Reversed Logo — #FFFFFF */}
          <div
            onClick={() => handleCopy('#FFFFFF', 'White Reversed Edition')}
            className="group flex cursor-pointer items-center justify-between rounded-xl border border-blue-600 bg-[#0056FF] p-3.5 text-white transition-colors hover:border-blue-400"
            title="Click to copy HEX: #FFFFFF"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg border border-white/25 bg-[#0056FF] shadow-2xs">
                <div className="size-6">
                  <AsteriskVectorGlyph color="#FFFFFF" strokeWidth={2.5} />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] font-bold text-blue-100 uppercase">
                  Edition 02 (Reversed)
                </div>
                <div className="font-sans text-xs font-extrabold text-white">
                  White on Blue / Dark
                </div>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-white">
              {copiedToken === 'White Reversed Edition' ? 'Copied!' : '#FFFFFF'}
            </span>
          </div>

          {/* Edition 03: Dark Monochromatic Logo — #020617 */}
          <div
            onClick={() => handleCopy('#020617', 'Dark Edition')}
            className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-300 bg-slate-100/70 p-3.5 transition-colors hover:border-slate-800"
            title="Click to copy HEX: #020617"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg border border-slate-300 bg-white shadow-2xs">
                <div className="size-6">
                  <AsteriskVectorGlyph color="#020617" strokeWidth={2.5} />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] font-bold text-slate-700 uppercase">
                  Edition 03 (Editorial)
                </div>
                <div className="font-sans text-xs font-extrabold text-[#020617]">Dark on White</div>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-slate-900">
              {copiedToken === 'Dark Edition' ? 'Copied!' : '#020617'}
            </span>
          </div>
        </div>

        {/* Hero Visual Display & Surface Variations (White, Black, Blue, Light) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Hero Card (Large Bold Display) */}
          <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-[#CAD3F5] bg-gradient-to-b from-white to-[#EFF5FF] p-8 text-center shadow-xs lg:col-span-5">
            <div className="relative flex size-44 items-center justify-center rounded-[2.5rem] border-2 border-[#CAD3F5] bg-white p-7 shadow-xl ring-4 shadow-[#0056FF]/10 ring-[#0056FF]/10">
              <AsteriskVectorGlyph
                color="#0056FF"
                strokeWidth={2.5}
                ariaLabel="SNPI Bold Asterisk Master Mark"
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-sans text-base font-black text-[#0A1A4A]">
                SNPI Bold Asterisk Master Mark
              </h4>
              <p className="font-mono text-xs text-slate-500">
                Unified Wing Geometry · Bold Stroke Prominence
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SaveLogoButton
                variant="blue"
                label="Save 1024px PNG"
                className="rounded-xl border-[#0048D9] bg-[#0056FF] px-4 py-2 font-sans text-xs font-bold text-white hover:bg-[#0048D9]"
              />
            </div>
          </div>

          {/* Surface Variations Grid (Right Column: 4 Canonical Canvas Environments) */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:col-span-7">
            {/* Tile 01: Blue Brand on Light White Canvas */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="flex size-14 shrink-0 items-center justify-center">
                  <AsteriskLogo size="lg" variant="blue" mode="light" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-sans text-xs font-bold text-slate-950">
                    Blue on White Canvas
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">
                    bg-[#FFFFFF] · Blue Mark #0056FF
                  </div>
                  <div className="font-mono text-[9px] text-[#0056FF]">
                    Primary Brand Standard · AAA Contrast
                  </div>
                </div>
              </div>
              <SaveLogoButton
                variant="blue"
                label="Save Blue on White PNG"
                className="mt-3 w-full justify-center py-1 text-[10px]"
              />
            </div>

            {/* Tile 02: White on Royal Blue Brand Canvas */}
            <div className="flex flex-col justify-between rounded-xl border border-[#0048D9] bg-[#0056FF] p-4 text-white shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="flex size-14 shrink-0 items-center justify-center">
                  <AsteriskLogo size="lg" variant="white" mode="light" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-sans text-xs font-bold text-white">White on Royal Blue</div>
                  <div className="font-mono text-[10px] text-blue-100">
                    bg-[#0056FF] · White Mark #FFFFFF
                  </div>
                  <div className="font-mono text-[9px] text-white/90">
                    High-Impact Hero Canvas · Reverse Base
                  </div>
                </div>
              </div>
              <SaveLogoButton
                variant="white"
                label="Save White on Blue PNG"
                className="mt-3 w-full justify-center border-white/25 bg-white/15 py-1 text-[10px] text-white hover:border-white/40 hover:bg-white/25"
              />
            </div>

            {/* Tile 03: White on Dark Obsidian Canvas */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#020617] p-4 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="flex size-14 shrink-0 items-center justify-center">
                  <AsteriskLogo size="lg" variant="dark" mode="dark" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-sans text-xs font-bold text-white">
                    White on Obsidian Black
                  </div>
                  <div className="font-mono text-[10px] text-slate-400">
                    bg-[#020617] · White Mark #FFFFFF
                  </div>
                  <div className="font-mono text-[9px] text-blue-300">
                    Dark Mode Canvas · 21:1 AAA Ratio
                  </div>
                </div>
              </div>
              <SaveLogoButton
                variant="dark"
                label="Save Dark PNG"
                className="mt-3 w-full justify-center border-white/20 bg-white/10 py-1 text-[10px] text-white hover:border-white/30 hover:bg-white/20"
              />
            </div>

            {/* Tile 04: Dark Monochromatic on White Canvas */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="flex size-14 shrink-0 items-center justify-center">
                  <AsteriskLogo size="lg" variant="dark" mode="light" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-sans text-xs font-bold text-slate-950">
                    Dark on White Canvas
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">
                    bg-[#FFFFFF] · Dark Mark #020617
                  </div>
                  <div className="font-mono text-[9px] text-slate-600">
                    Monochrome Print & Document Standard
                  </div>
                </div>
              </div>
              <SaveLogoButton
                variant="dark-on-light"
                label="Save Dark on Light PNG"
                className="mt-3 w-full justify-center py-1 text-[10px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
