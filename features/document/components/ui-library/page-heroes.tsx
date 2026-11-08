'use client';

/**
 * Page Heroes: one creative interactive hero per documentation page.
 * - LibraryHero (COMPONENT): one realistic SNPI student ID card, liquid glass brand style, front and back with QR code, mouse tilt with shine, flip button, plus promotion and merchandise cards.
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
  Download,
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

const QR_PATTERN = [
  1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1,
  0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0,
  0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1,
  0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
  0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0,
  0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1,
  0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1,
  1, 0, 1, 0, 1, 1, 1,
];

function QrCode({ className }: { className?: string }) {
  return (
    <div
      className={cn('grid shrink-0 grid-cols-[repeat(21,1fr)] gap-0 bg-white p-1', className)}
      aria-hidden="true"
    >
      {QR_PATTERN.slice(0, 441).map((bit, i) => (
        <span key={i} className={bit ? 'bg-[#020617]' : 'bg-white'} style={{ aspectRatio: '1' }} />
      ))}
    </div>
  );
}

export function LibraryHero() {
  const [flipped, setFlipped] = React.useState(false);
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });
  const [shine, setShine] = React.useState({ x: 50, y: 50 });
  const [following, setFollowing] = React.useState(false);
  const [applied, setApplied] = React.useState(false);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: Math.round((0.5 - py) * 14), ry: Math.round((px - 0.5) * 18) });
    setShine({ x: Math.round(px * 100), y: Math.round(py * 100) });
  };

  return (
    <section className="space-y-8 rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-xs sm:p-8">
      <h1 className="font-sans text-3xl font-black tracking-tight text-[#020617] sm:text-4xl">
        Component Library
      </h1>

      <div className="flex flex-col items-center gap-6">
        <div
          className="w-full max-w-[420px]"
          style={{ perspective: '1200px' }}
          onPointerMove={handleMove}
          onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
        >
          <div
            className="relative aspect-[1.586] w-full transition-transform duration-300"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry + (flipped ? 180 : 0)}deg)`,
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl border border-white/50 bg-[#0056FF]/95 p-5 shadow-lg ring-1 ring-white/30 backdrop-blur-xl"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-white/10" />
              <div className="pointer-events-none absolute -bottom-14 -left-8 size-40 rounded-full bg-[#2277FF]/40" />
              <div
                className="pointer-events-none absolute size-28 rounded-full bg-white/25 blur-2xl"
                style={{
                  left: `${shine.x}%`,
                  top: `${shine.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <div className="relative flex items-center justify-between">
                <span className="font-sans text-base font-black tracking-wider text-white">
                  SNPI
                </span>
                <span className="font-sans text-[10px] font-bold tracking-widest text-white/80 uppercase">
                  Student Card
                </span>
              </div>
              <div className="relative mt-4 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://avatars.githubusercontent.com/u/70220432?v=4"
                  alt="shiliaiwei profile photo"
                  className="size-16 rounded-[4px] border-2 border-white/60"
                />
                <div className="min-w-0">
                  <p className="truncate font-sans text-lg font-black text-white">shiliaiwei</p>
                  <p className="font-sans text-xs font-medium text-white/80">@shiliaiwei</p>
                  <p className="font-sans text-xs font-medium text-white/80">
                    Senior Software Engineer
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {['React', 'TypeScript', 'Node.js'].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-[4px] bg-white/15 px-2 py-0.5 font-sans text-[10px] font-bold text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <QrCode className="ml-auto w-14 rounded-[4px]" />
              </div>
              <div className="relative mt-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-sans text-[10px] font-bold text-white/80">
                    Profile strength
                  </span>
                  <span className="font-sans text-[10px] font-bold text-white">86%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full border border-white/40 bg-white/20">
                  <div className="h-full w-[86%] rounded-full bg-white" />
                </div>
              </div>
              <div className="relative mt-3 flex items-end justify-between">
                <div className="flex gap-4">
                  <span className="font-sans text-xs font-bold text-white">
                    312 <span className="font-medium text-white/80">Followers</span>
                  </span>
                  <span className="font-sans text-xs font-bold text-white">
                    86 <span className="font-medium text-white/80">Following</span>
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold text-white/80">STU-2026-0891</span>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-lg ring-1 ring-[#CAD3F5] backdrop-blur-xl"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="h-10 bg-[#020617]" />
              <div className="flex items-center gap-4 p-5">
                <QrCode className="w-24 rounded-[4px] border border-[#CAD3F5]" />
                <div className="min-w-0 space-y-2">
                  <p className="font-sans text-sm font-black text-[#020617]">shiliaiwei</p>
                  <p className="font-mono text-xs font-bold text-[#334155]">5399 2026 0891 0042</p>
                  <p className="font-sans text-xs font-medium text-[#334155]">
                    SNPI International School
                  </p>
                  <p className="font-sans text-xs font-medium text-[#334155]">Valid thru 12/28</p>
                  <p className="font-sans text-xs font-bold text-[#020617]">
                    React · TypeScript · Node.js · MongoDB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="inline-flex min-h-11 items-center gap-2 rounded-[4px] bg-[#0056FF] px-6 font-sans text-sm font-bold text-white transition-all hover:bg-[#2277FF] active:scale-[0.97]"
          >
            <RefreshCw className="size-4" /> Flip card
          </button>
          <button
            type="button"
            title="Download CV"
            className="inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-[#CAD3F5] bg-white px-6 font-sans text-sm font-bold text-[#020617] transition-all hover:bg-[#EFF5FF] active:scale-[0.97]"
          >
            <Download className="size-4" /> CV
          </button>
          <button
            type="button"
            onClick={() => setFollowing((f) => !f)}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 rounded-[4px] px-6 font-sans text-sm font-bold transition-all active:scale-[0.97]',
              following
                ? 'border border-[#CAD3F5] bg-white text-[#0056FF]'
                : 'border border-[#CAD3F5] bg-white text-[#020617] hover:bg-[#EFF5FF]',
            )}
          >
            {following && <Check className="size-4" />}
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        <div className="grid w-full gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#CAD3F5] bg-[#EFF5FF] p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-sans text-xs font-black tracking-wider text-[#0056FF] uppercase">
                Promotion
              </span>
              <Zap className="size-5 text-[#020617]" />
            </div>
            <p className="mt-3 font-sans text-2xl font-black text-[#020617]">20% off tuition</p>
            <button
              type="button"
              onClick={() => setApplied((a) => !a)}
              className={cn(
                'mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[4px] px-4 font-sans text-sm font-bold transition-all active:scale-[0.97]',
                applied
                  ? 'border border-[#CAD3F5] bg-white text-[#0056FF]'
                  : 'bg-[#0056FF] text-white hover:bg-[#2277FF]',
              )}
            >
              {applied && <Check className="size-4" />}
              {applied ? 'Applied' : 'Apply'}
            </button>
          </div>
          <div className="rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-sans text-xs font-black tracking-wider text-[#0056FF] uppercase">
                Merchandise
              </span>
              <Sparkles className="size-5 text-[#020617]" />
            </div>
            <p className="mt-3 font-sans text-2xl font-black text-[#020617]">SNPI Hoodie</p>
            <p className="mt-1 font-sans text-xs font-medium text-[#334155]">Student store · $25</p>
            <button
              type="button"
              title="Open the student store"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-[4px] border border-[#CAD3F5] bg-white px-4 font-sans text-sm font-bold text-[#020617] transition-all hover:bg-[#EFF5FF] active:scale-[0.97]"
            >
              View item
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const API_ENDPOINTS: { method: string; path: string; latency: number; body: string }[] = [
  {
    method: 'GET',
    path: '/health',
    latency: 42,
    body: '{\n  "status": "ok",\n  "service": "snpi-api",\n  "uptime": "99.99%"\n}',
  },
  {
    method: 'GET',
    path: '/students/STU-2026-0891',
    latency: 87,
    body: '{\n  "id": "STU-2026-0891",\n  "name": "Sok Dara",\n  "program": "Software Engineering",\n  "status": "active"\n}',
  },
  {
    method: 'POST',
    path: '/auth/login',
    latency: 120,
    body: '{\n  "token": "<JWT_ACCESS_TOKEN_SAMPLE>",\n  "expiresIn": 3600\n}',
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
        <h1 className="text-3xl font-black tracking-tight text-[#020617] sm:text-4xl">
          API Documentation
        </h1>
        <p className="max-w-2xl font-sans text-sm leading-relaxed font-medium text-[#334155]">
          Pick an endpoint and run it here.
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
                  ? 'border-[#0056FF] bg-[#EFF5FF] text-[#020617]'
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
          <div className="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-[4px] bg-[#EFF5FF] px-4 font-mono text-xs font-bold text-[#020617]">
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
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed font-medium whitespace-pre text-[#020617]">
                {endpoint.body}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copyBase}
            className="inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-[#CAD3F5] bg-white px-3 font-mono text-xs font-bold text-[#020617] transition-colors hover:border-[#0056FF]"
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
  { name: 'Deep Navy', hex: '#020617', role: 'Typography and headlines', dark: true },
];

export function BlueprintHero() {
  const [selected, setSelected] = React.useState(0);
  const token = BRAND_TOKENS[selected];

  return (
    <div className="space-y-5">
      <p className="max-w-2xl font-sans text-sm leading-relaxed font-medium text-[#334155]">
        Tap a token to preview it.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {BRAND_TOKENS.map((t, i) => (
          <button
            key={t.hex}
            type="button"
            onClick={() => setSelected(i)}
            aria-pressed={i === selected}
            className={cn(
              'flex min-h-24 flex-col items-start justify-between rounded-xl p-3 text-left transition-transform active:scale-[0.98]',
              i === selected && 'ring-2 ring-[#020617] ring-offset-2',
            )}
            style={{ backgroundColor: t.hex }}
          >
            <span
              className={cn(
                'font-mono text-[10px] font-bold',
                t.dark ? 'text-white/85' : 'text-[#020617]/70',
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>
              <span
                className={cn(
                  'block font-sans text-xs leading-tight font-extrabold',
                  t.dark ? 'text-white' : 'text-[#020617]',
                )}
              >
                {t.name}
              </span>
              <span
                className={cn(
                  'block font-mono text-[10px] font-bold',
                  t.dark ? 'text-white/85' : 'text-[#020617]/70',
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
        style={{ backgroundColor: token.hex === '#020617' ? '#EFF5FF' : token.hex }}
      >
        <div className="rounded-xl border border-[#CAD3F5] bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-sans text-base font-extrabold text-[#020617]">
                {token.name} in action
              </p>
              <p className="mt-1 font-sans text-xs font-medium text-[#334155]">{token.role}</p>
            </div>
            <span className="shrink-0 rounded-[4px] bg-[#EFF5FF] px-3 py-1 font-mono text-[11px] font-bold whitespace-nowrap text-[#0056FF]">
              {token.hex}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <span
              className="inline-flex min-h-11 items-center rounded-[4px] px-4 font-sans text-sm font-bold text-white"
              style={{ backgroundColor: token.dark ? token.hex : '#0056FF' }}
            >
              Primary action
            </span>
            <span
              className="inline-flex min-h-11 items-center rounded-[4px] border-2 px-4 font-sans text-sm font-bold text-[#020617]"
              style={{ borderColor: token.dark ? token.hex : '#CAD3F5' }}
            >
              Outlined action
            </span>
            <span
              className="inline-flex min-h-11 items-center px-2 font-sans text-sm font-extrabold"
              style={{ color: token.dark ? token.hex : '#020617' }}
            >
              Sample headline text
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
