'use client';

import * as React from 'react';
import Image from 'next/image';
import { Copy, Check } from '@/components/icons';
import { AsteriskLogo } from './asterisk-logo';

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

      {/* SNPI BRAND ASTERISK EMBLEM (SUCCESS EDITION) */}
      <div className="rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-xs sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h3 className="font-sans text-xl font-extrabold text-slate-950 sm:text-2xl">
              SNPI Standard Brand Asterisk Emblem
            </h3>
            <p className="text-xs text-slate-600 sm:text-sm">
              Standard squircle brand badge in Status Success (<code className="font-mono font-bold text-emerald-600">#10B981</code>) with centered Sora asterisk glyph.
            </p>
          </div>

          {/* Logo Visual Presentation */}
          <div className="flex flex-wrap items-center gap-4">
            {/* White Canvas Preview */}
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
              <div className="flex size-16 shrink-0 items-center justify-center">
                <AsteriskLogo size="lg" variant="standard" />
              </div>
              <div className="space-y-0.5">
                <div className="font-sans text-xs font-bold text-slate-950">White Canvas</div>
                <div className="font-mono text-[10px] text-slate-500">bg-[#FFFFFF] · Success Tile</div>
              </div>
            </div>

            {/* Soft Lavender Canvas Preview */}
            <div className="flex items-center gap-4 rounded-xl border border-[#CAD3F5] bg-[#E3E7FC] p-3.5 shadow-2xs">
              <div className="flex size-16 shrink-0 items-center justify-center">
                <AsteriskLogo size="lg" variant="standard" />
              </div>
              <div className="space-y-0.5">
                <div className="font-sans text-xs font-bold text-[#0A1A4A]">Lavender Canvas</div>
                <div className="font-mono text-[10px] text-[#0056FF]">bg-[#E3E7FC] · Success Tile</div>
              </div>
            </div>

            {/* Light Tint Canvas Preview */}
            <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 shadow-2xs">
              <div className="flex size-16 shrink-0 items-center justify-center">
                <AsteriskLogo size="lg" variant="tint" />
              </div>
              <div className="space-y-0.5">
                <div className="font-sans text-xs font-bold text-emerald-950">Emerald Tint Canvas</div>
                <div className="font-mono text-[10px] text-emerald-700">bg-[#ECFDF5] · Tint Tile</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
