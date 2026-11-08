'use client';

/**
 * Page Heroes: one creative interactive hero per documentation page.
 * - LibraryHero (COMPONENT): three SNPI profile ID cards in one row (Business, Student, Event), liquid glass style, real avatar photos, follow buttons with live follower counts, mouse tilt with shine.
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
  Phone,
  Share2,
  Calendar,
  MapPin,
  Sparkles,
  Terminal,
  Zap,
} from '@/components/icons';
import { cn } from '@/lib/utils';
import { LibrarySwitch } from './switch';

// ==========================================
// COMPONENT PAGE HERO
// ==========================================

const KH_BLUE = '#032EA1';
const KH_RED = '#E00025';

const QR_MINI = [
  [1, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 0],
  [1, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 1, 0, 1, 0],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1],
];

function TiltCard({ rotate, children }: { rotate: string; children: React.ReactNode }) {
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });
  const [shine, setShine] = React.useState({ x: 50, y: 50 });
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: Math.round((0.5 - py) * 8), ry: Math.round((px - 0.5) * 10) });
    setShine({ x: Math.round(px * 100), y: Math.round(py * 100) });
  };
  return (
    <div className={rotate} style={{ perspective: '900px' }}>
      <div
        onPointerMove={handleMove}
        onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
        className="relative h-full overflow-hidden rounded-2xl border border-white/50 bg-white shadow-lg ring-1 ring-[#CAD3F5] backdrop-blur-xl transition-transform duration-200"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <div
          className="pointer-events-none absolute z-10 size-24 rounded-full bg-white/25 blur-2xl"
          style={{ left: `${shine.x}%`, top: `${shine.y}%`, transform: 'translate(-50%, -50%)' }}
        />
        {children}
      </div>
    </div>
  );
}

function FollowBtn({ label = 'Follow' }: { label?: string }) {
  const [followed, setFollowed] = React.useState(false);
  return (
    <button
      type="button"
      onClick={() => setFollowed((f) => !f)}
      className={cn(
        'inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[4px] px-4 font-sans text-sm font-bold transition-all active:scale-[0.97]',
        followed ? 'border border-[#CAD3F5] bg-white text-[#0056FF]' : 'text-white',
      )}
      style={followed ? undefined : { backgroundColor: KH_BLUE }}
    >
      {followed && <Check className="size-4" />}
      {followed ? 'Following' : label}
    </button>
  );
}

function IconBtn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-[4px] border border-[#CAD3F5] bg-white text-[#020617] transition-colors hover:bg-[#EFF5FF]"
    >
      {children}
    </button>
  );
}

function Stats({ followers, following }: { followers: number; following: number }) {
  return (
    <div className="flex gap-4">
      <span className="font-sans text-xs font-bold text-[#020617]">
        {followers} <span className="font-medium text-[#334155]">Followers</span>
      </span>
      <span className="font-sans text-xs font-bold text-[#020617]">
        {following} <span className="font-medium text-[#334155]">Following</span>
      </span>
    </div>
  );
}

export function LibraryHero() {
  return (
    <section className="space-y-8 rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-xs sm:p-8">
      <h1 className="font-sans text-3xl font-black tracking-tight text-[#020617] sm:text-4xl">
        Component Library
      </h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* BUSINESS: horizontal badge */}
        <TiltCard rotate="-rotate-2">
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ backgroundColor: KH_BLUE }}
          >
            <span className="font-sans text-sm font-black tracking-wider text-white">SNPI</span>
            <span className="font-sans text-[10px] font-bold tracking-widest text-white/85 uppercase">
              Business
            </span>
          </div>
          <div className="h-1" style={{ backgroundColor: KH_RED }} />
          <div className="p-5">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://avatars.githubusercontent.com/u/70220432?v=4"
                alt="shiliaiwei profile photo"
                className="size-24 shrink-0 rounded-[4px] border border-[#CAD3F5]"
              />
              <div className="min-w-0">
                <p className="font-sans text-lg font-black text-[#020617]">shiliaiwei</p>
                <p className="font-sans text-xs font-medium text-[#334155]">
                  Senior Software Engineer
                </p>
                <p className="font-sans text-xs font-medium text-[#334155]">GroupCapstone</p>
                <p className="mt-1 font-mono text-[11px] font-bold text-[#0056FF]">
                  ID EMP-2026-001
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Stats followers={312} following={86} />
            </div>
            <div className="mt-4 flex gap-2">
              <FollowBtn />
              <IconBtn label="Call">
                <Phone className="size-5" />
              </IconBtn>
              <IconBtn label="Send message">
                <Send className="size-5" />
              </IconBtn>
              <IconBtn label="Share profile">
                <Share2 className="size-5" />
              </IconBtn>
            </div>
          </div>
        </TiltCard>

        {/* STUDENT: vertical card, red band */}
        <TiltCard rotate="rotate-1">
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ backgroundColor: KH_RED }}
          >
            <span className="font-sans text-sm font-black tracking-wider text-white">SNPI</span>
            <span className="font-sans text-[10px] font-bold tracking-widest text-white/85 uppercase">
              Student
            </span>
          </div>
          <div className="h-1" style={{ backgroundColor: KH_BLUE }} />
          <div className="flex flex-col items-center p-5 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://avatars.githubusercontent.com/u/233213854?v=4"
              alt="Sok Dara profile photo"
              className="size-24 rounded-full border-2"
              style={{ borderColor: KH_RED }}
            />
            <p className="mt-3 font-sans text-lg font-black text-[#020617]">Sok Dara</p>
            <p className="font-sans text-xs font-medium text-[#334155]">Software Engineering</p>
            <p className="font-mono text-[11px] font-bold text-[#0056FF]">STU-2026-0891</p>
            <div className="mt-3 w-full space-y-1 text-left">
              <div className="flex justify-between font-sans text-xs">
                <span className="font-medium text-[#334155]">Campus</span>
                <span className="font-bold text-[#020617]">Phnom Penh</span>
              </div>
              <div className="flex justify-between font-sans text-xs">
                <span className="font-medium text-[#334155]">Study progress</span>
                <span className="font-bold text-[#020617]">86%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#EFF5FF]">
                <div
                  className="h-full rounded-full"
                  style={{ width: '86%', backgroundColor: KH_RED }}
                />
              </div>
            </div>
            <div className="mt-4">
              <Stats followers={128} following={64} />
            </div>
            <div className="mt-4 flex w-full gap-2">
              <FollowBtn />
              <IconBtn label="Class schedule">
                <Calendar className="size-5" />
              </IconBtn>
              <IconBtn label="Send message">
                <Send className="size-5" />
              </IconBtn>
            </div>
          </div>
        </TiltCard>

        {/* EVENT: ticket with stub */}
        <TiltCard rotate="-rotate-1">
          <div className="flex h-full">
            <div className="min-w-0 flex-1 p-5" style={{ backgroundColor: '#020617' }}>
              <span
                className="inline-block rounded-[4px] px-2 py-1 font-sans text-[10px] font-black tracking-widest text-white uppercase"
                style={{ backgroundColor: KH_RED }}
              >
                Event
              </span>
              <p className="mt-3 font-sans text-xl font-black text-white">SNPI Tech Day</p>
              <p className="font-sans text-xs font-medium text-white/70">Nov 20, 2026 · 8:00 AM</p>
              <p className="font-sans text-xs font-medium text-white/70">SNPI Hall, Phnom Penh</p>
              <div className="mt-3 flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://avatars.githubusercontent.com/u/216975960?v=4"
                  alt="Kimheng Ly profile photo"
                  className="size-8 rounded-full border border-white/40"
                />
                <span className="font-sans text-xs font-medium text-white/85">Host Kimheng Ly</span>
              </div>
              <p className="mt-3 font-sans text-xs font-bold text-white">
                542 <span className="font-medium text-white/70">Going</span>
              </p>
              <div className="mt-4 flex gap-2">
                <FollowBtn label="Join" />
                <span className="[&_button]:border-white/30 [&_button]:bg-transparent [&_button]:text-white [&_button]:hover:bg-white/10">
                  <IconBtn label="Event location">
                    <MapPin className="size-5" />
                  </IconBtn>
                </span>
                <span className="[&_button]:border-white/30 [&_button]:bg-transparent [&_button]:text-white [&_button]:hover:bg-white/10">
                  <IconBtn label="Share event">
                    <Share2 className="size-5" />
                  </IconBtn>
                </span>
              </div>
            </div>
            <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-2 border-l-2 border-dashed border-[#CAD3F5] bg-white p-3">
              <div className="grid grid-cols-7 gap-px" aria-hidden="true">
                {QR_MINI.flatMap((row, y) =>
                  row.map((cell, x) => (
                    <span
                      key={`${x}-${y}`}
                      className={cell ? 'size-2 bg-[#020617]' : 'size-2 bg-white'}
                    />
                  )),
                )}
              </div>
              <span className="font-sans text-[10px] font-black tracking-widest text-[#020617] uppercase">
                Admit one
              </span>
              <span className="font-sans text-sm font-black" style={{ color: KH_RED }}>
                $10
              </span>
            </div>
          </div>
        </TiltCard>
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
