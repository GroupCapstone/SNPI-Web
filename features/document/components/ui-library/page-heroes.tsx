'use client';

/**
 * Page Heroes: one creative interactive hero per documentation page.
 * - LibraryHero (COMPONENT): live mini playground + scrolling component marquee.
 * - ApiHero (API): simulated request runner with real interaction states.
 * - BlueprintHero (BLUEPRINT): interactive brand token color lab.
 * All follow the Royal Blue brand system: flat surfaces, #CAD3F5 keylines,
 * 4px control radius, >=44px touch targets, zero gradients, zero dots.
 */

import * as React from 'react';
import {
  Bell,
  Check,
  ChevronDown,
  Copy,
  Globe,
  Lock,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from '@/components/icons';
import { cn } from '@/lib/utils';
import { LibrarySwitch } from './switch';

// ==========================================
// COMPONENT PAGE HERO
// ==========================================

const MARQUEE_COMPONENTS = [
  'App bars',
  'Tabs',
  'Buttons',
  'Dialogs',
  'Cards',
  'Sliders',
  'Menus',
  'Badges',
  'Search',
  'Snackbar',
  'Carousel',
  'Tooltips',
  'Date pickers',
  'Navigation rail',
  'Bottom sheets',
  'Checkboxes',
];

const CHART_SETS: Record<string, { label: string; bars: number[]; total: string }> = {
  Overview: {
    label: 'Active students this week',
    bars: [42, 58, 50, 72, 66, 88, 79],
    total: '1,284 students',
  },
  Attendance: {
    label: 'Daily attendance rate',
    bars: [88, 92, 85, 95, 90, 78, 93],
    total: '91% average',
  },
  Finance: {
    label: 'Fee collection progress',
    bars: [30, 44, 52, 61, 70, 82, 96],
    total: '$48,250 collected',
  },
};

export function LibraryHero() {
  const [segment, setSegment] = React.useState<keyof typeof CHART_SETS>('Overview');
  const [autoSync, setAutoSync] = React.useState(true);
  const [volume, setVolume] = React.useState(64);
  const [enrolled, setEnrolled] = React.useState(0);
  const chart = CHART_SETS[segment];

  const scrollToFeed = () => {
    const el = document.querySelector('[id^="comp-"]');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-xs sm:p-8">
      <style>{`
        @keyframes library-hero-drift {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .library-hero-marquee {
          animation: library-hero-drift 36s linear infinite;
        }
        .library-hero-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="space-y-3">
        <span className="inline-flex min-h-8 items-center gap-2 rounded-[4px] bg-[#EFF5FF] px-3 font-mono text-[10px] font-bold tracking-wider text-[#0056FF] uppercase">
          <Sparkles className="size-4" /> SNPI Design System · Live Library
        </span>
        <h1 className="font-sans text-3xl font-black tracking-tight text-[#0A1A4A] sm:text-4xl">
          Components that feel alive.
        </h1>
        <p className="max-w-2xl font-sans text-sm leading-relaxed font-medium text-[#334155]">
          Every component below is a working demo, not a picture. Touch the controls, open the
          menus, run the states. Built on one Royal Blue brand system, responsive from a small phone
          to a wide monitor.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            ['71', 'components live'],
            ['6', 'families'],
            ['50', 'activated this release'],
            ['44px', 'touch standard'],
          ].map(([value, label]) => (
            <span
              key={label}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-[4px] border border-[#CAD3F5] bg-white px-3 font-sans text-xs font-bold text-[#0A1A4A]"
            >
              <span className="font-mono text-[#0056FF]">{value}</span> {label}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive playground */}
      <div className="grid gap-5 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/50 p-4 sm:p-5 lg:grid-cols-[1fr_290px]">
        <div className="min-w-0">
          <div
            className="flex max-w-full gap-1 overflow-x-auto rounded-[4px] bg-white p-1"
            role="tablist"
            aria-label="Playground data sets"
          >
            {(Object.keys(CHART_SETS) as (keyof typeof CHART_SETS)[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={segment === key}
                onClick={() => setSegment(key)}
                className={cn(
                  'min-h-11 shrink-0 rounded-[4px] px-4 font-sans text-xs font-bold whitespace-nowrap transition-colors',
                  segment === key ? 'bg-[#0056FF] text-white' : 'text-[#0A1A4A] hover:bg-[#EFF5FF]',
                )}
              >
                {key}
              </button>
            ))}
          </div>
          <div className="mt-5 flex h-36 items-end gap-2 sm:gap-3" aria-hidden="true">
            {chart.bars.map((h, i) => (
              <div
                key={`${segment}-${i}`}
                className="flex h-full min-w-0 flex-1 flex-col items-center gap-2"
              >
                <div className="flex w-full flex-1 items-end justify-center">
                  <div
                    className={cn(
                      'w-full max-w-10 rounded-t-[4px] transition-all duration-500',
                      i === chart.bars.length - 1 ? 'bg-[#2277FF]' : 'bg-[#0056FF]',
                    )}
                    style={{ height: `${h}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] font-bold text-[#334155]">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 font-sans text-xs font-medium text-[#334155]">
            {chart.label}: <span className="font-bold text-[#0A1A4A]">{chart.total}</span>
          </p>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-4 rounded-xl border border-[#CAD3F5] bg-white p-4">
          <div className="flex min-h-11 items-center justify-between gap-3">
            <span className="flex items-center gap-2 font-sans text-xs font-bold text-[#0A1A4A]">
              <RefreshCw className="size-4.5 shrink-0" /> Auto sync
            </span>
            <LibrarySwitch checked={autoSync} onCheckedChange={setAutoSync} />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between font-sans text-xs font-bold text-[#0A1A4A]">
              <span className="flex items-center gap-2">
                <Bell className="size-4.5 shrink-0" /> Alert volume
              </span>
              <span className="font-mono text-[#0056FF]">{volume}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Alert volume"
              className="h-11 w-full cursor-pointer accent-[#0056FF]"
            />
          </div>
          <button
            type="button"
            onClick={() => setEnrolled((n) => n + 1)}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[4px] bg-[#0056FF] px-4 font-sans text-sm font-bold text-white transition-all hover:bg-[#2277FF] active:scale-[0.97]"
          >
            <Zap className="size-4.5" /> Enroll student
            {enrolled > 0 && (
              <span className="rounded-[4px] bg-white px-1.5 font-mono text-[10px] font-bold text-[#0056FF]">
                {enrolled}
              </span>
            )}
          </button>
          <p className="text-center font-sans text-[11px] font-medium text-[#334155]">
            Real controls from this library. Try them.
          </p>
        </div>
      </div>

      {/* Scrolling component marquee */}
      <div className="overflow-hidden" aria-hidden="true">
        <div className="library-hero-marquee flex w-max gap-2">
          {[...MARQUEE_COMPONENTS, ...MARQUEE_COMPONENTS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex min-h-9 shrink-0 items-center rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF]/60 px-3 font-mono text-[11px] font-bold whitespace-nowrap text-[#0A1A4A]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={scrollToFeed}
          className="inline-flex min-h-11 items-center gap-2 rounded-[4px] px-4 font-sans text-xs font-bold text-[#0056FF] transition-colors hover:bg-[#EFF5FF]"
        >
          Scroll to explore the library
          <ChevronDown className="size-4.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

// ==========================================
// API PAGE HERO
// ==========================================

const API_ENDPOINTS = [
  {
    method: 'GET',
    path: '/health',
    latency: 42,
    body: '{\n  "status": "ok",\n  "service": "snpi-api",\n  "version": "1.1.0"\n}',
  },
  {
    method: 'GET',
    path: '/students/STU-2026-0891',
    latency: 96,
    body: '{\n  "code": "STU-2026-0891",\n  "name": "Dara Sok",\n  "campus": "Phnom Penh Innovation Hub",\n  "status": "active"\n}',
  },
  {
    method: 'POST',
    path: '/auth/login',
    latency: 128,
    body: '{\n  "tokenType": "Bearer",\n  "expiresIn": 3600,\n  "role": "registrar"\n}',
  },
];

export function ApiHero() {
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<'idle' | 'sending' | 'done'>('idle');
  const [copied, setCopied] = React.useState(false);
  const endpoint = API_ENDPOINTS[index];

  const send = () => {
    if (phase === 'sending') return;
    setPhase('sending');
    window.setTimeout(() => setPhase('done'), 650);
  };

  const copyBase = async () => {
    try {
      await navigator.clipboard.writeText('https://api.snpi.edu.kh/v1');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <span className="inline-flex min-h-8 items-center gap-2 rounded-[4px] bg-[#EFF5FF] px-3 font-mono text-[10px] font-bold tracking-wider text-[#0056FF] uppercase">
          <Terminal className="size-4" /> SNPI Open API · Version 1.1.0
        </span>
        <h1 className="text-3xl font-black tracking-tight text-[#0A1A4A] sm:text-4xl">
          API Documentation
        </h1>
        <p className="max-w-2xl font-sans text-sm leading-relaxed font-medium text-[#334155]">
          One REST gateway for the whole school system. Pick an endpoint and run it right here, the
          same routes, methods and response shapes the production API returns.
        </p>
      </div>

      {/* Interactive request runner */}
      <div className="rounded-xl border border-[#CAD3F5] bg-white p-4 shadow-xs sm:p-5">
        <div className="flex flex-wrap gap-2">
          {API_ENDPOINTS.map((ep, i) => (
            <button
              key={ep.path}
              type="button"
              onClick={() => {
                setIndex(i);
                setPhase('idle');
              }}
              className={cn(
                'inline-flex min-h-11 items-center gap-2 rounded-[4px] border px-3 font-mono text-xs font-bold transition-colors',
                i === index
                  ? 'border-[#0056FF] bg-[#EFF5FF] text-[#0A1A4A]'
                  : 'border-[#CAD3F5] bg-white text-[#334155] hover:border-[#0056FF]',
              )}
            >
              <span className={ep.method === 'GET' ? 'text-emerald-600' : 'text-[#0056FF]'}>
                {ep.method}
              </span>
              <span className="break-all">{ep.path}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 rounded-[4px] bg-[#EFF5FF] px-3.5 font-mono text-xs font-bold text-[#0A1A4A]">
            <Globe className="size-4.5 shrink-0 text-[#0056FF]" />
            <span className="min-w-0 break-all">
              {endpoint.method} api.snpi.edu.kh/v1{endpoint.path}
            </span>
          </div>
          <button
            type="button"
            onClick={send}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#0056FF] px-5 font-sans text-sm font-bold text-white transition-all hover:bg-[#2277FF] active:scale-[0.97]"
          >
            <Send className="size-4.5" /> {phase === 'sending' ? 'Sending' : 'Send request'}
          </button>
        </div>

        <div className="mt-4 rounded-[4px] bg-[#EFF5FF]/70 p-4">
          {phase === 'idle' && (
            <p className="font-mono text-xs font-medium text-[#334155]">
              Response will appear here. Press Send request.
            </p>
          )}
          {phase === 'sending' && (
            <p className="font-mono text-xs font-bold text-[#0056FF]">
              Contacting gateway over TLS 1.3 ...
            </p>
          )}
          {phase === 'done' && (
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold text-emerald-600">
                200 OK · {endpoint.latency} ms · application/json
              </p>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed font-medium whitespace-pre text-[#0A1A4A]">
                {endpoint.body}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copyBase}
            className="inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-[#CAD3F5] bg-white px-3 font-mono text-xs font-bold text-[#0A1A4A] transition-colors hover:border-[#0056FF]"
          >
            {copied ? (
              <Check className="size-4.5 text-emerald-600" />
            ) : (
              <Copy className="size-4.5" />
            )}
            {copied ? 'Copied' : 'api.snpi.edu.kh/v1'}
          </button>
          <span className="inline-flex min-h-11 items-center gap-2 px-2 font-sans text-xs font-bold text-[#334155]">
            <Lock className="size-4.5 shrink-0" /> Bearer token auth
          </span>
          <span className="inline-flex min-h-11 items-center gap-2 px-2 font-sans text-xs font-bold text-[#334155]">
            <ShieldCheck className="size-4.5 shrink-0" /> TLS 1.3 encrypted
          </span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// BLUEPRINT PAGE HERO
// ==========================================

const BRAND_TOKENS = [
  { name: 'Royal Blue', hex: '#0056FF', role: 'Primary action color', dark: true },
  { name: 'Azure', hex: '#2277FF', role: 'Hover states and links', dark: true },
  { name: 'Soft Lavender', hex: '#E3E7FC', role: 'Selected surfaces and fills', dark: false },
  { name: 'Ice Tint', hex: '#EFF5FF', role: 'Panel and stage backgrounds', dark: false },
  { name: 'Deep Navy', hex: '#0A1A4A', role: 'Typography and headlines', dark: true },
];

export function BlueprintHero() {
  const [selected, setSelected] = React.useState(0);
  const token = BRAND_TOKENS[selected];

  return (
    <div className="space-y-5">
      <p className="max-w-2xl font-sans text-sm leading-relaxed font-medium text-[#334155]">
        Five tokens carry the whole brand. Tap a token to preview how it behaves on real surfaces,
        then copy the system into your own work.
      </p>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {BRAND_TOKENS.map((t, i) => (
          <button
            key={t.hex}
            type="button"
            onClick={() => setSelected(i)}
            aria-pressed={i === selected}
            className={cn(
              'flex min-h-24 flex-col items-start justify-between rounded-xl p-3 text-left transition-transform active:scale-[0.98]',
              i === selected && 'ring-2 ring-[#0A1A4A] ring-offset-2',
            )}
            style={{ backgroundColor: t.hex }}
          >
            <span
              className={cn(
                'font-mono text-[10px] font-bold',
                t.dark ? 'text-white/85' : 'text-[#0A1A4A]/70',
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>
              <span
                className={cn(
                  'block font-sans text-xs leading-tight font-extrabold',
                  t.dark ? 'text-white' : 'text-[#0A1A4A]',
                )}
              >
                {t.name}
              </span>
              <span
                className={cn(
                  'block font-mono text-[10px] font-bold',
                  t.dark ? 'text-white/85' : 'text-[#0A1A4A]/70',
                )}
              >
                {t.hex}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div
        className="rounded-xl border border-[#CAD3F5] p-4 transition-colors duration-300 sm:p-5"
        style={{ backgroundColor: token.hex === '#0A1A4A' ? '#EFF5FF' : token.hex }}
      >
        <div className="rounded-xl border border-[#CAD3F5] bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-sans text-base font-extrabold text-[#0A1A4A]">
                {token.name} in action
              </p>
              <p className="mt-1 font-sans text-xs font-medium text-[#334155]">{token.role}</p>
            </div>
            <span className="shrink-0 rounded-[4px] bg-[#EFF5FF] px-2.5 py-1 font-mono text-[11px] font-bold whitespace-nowrap text-[#0056FF]">
              {token.hex}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <span
              className="inline-flex min-h-11 items-center rounded-[4px] px-4 font-sans text-sm font-bold text-white"
              style={{ backgroundColor: token.dark ? token.hex : '#0056FF' }}
            >
              Primary action
            </span>
            <span
              className="inline-flex min-h-11 items-center rounded-[4px] border-2 px-4 font-sans text-sm font-bold text-[#0A1A4A]"
              style={{ borderColor: token.dark ? token.hex : '#CAD3F5' }}
            >
              Outlined action
            </span>
            <span
              className="inline-flex min-h-11 items-center px-2 font-sans text-sm font-extrabold"
              style={{ color: token.dark ? token.hex : '#0A1A4A' }}
            >
              Sample headline text
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
