'use client';

/**
 * Page Heroes: one creative interactive hero per documentation page.
 * - LibraryHero (COMPONENT): one interactive user profile card. Drag it, tilt it with the mouse, play with its live controls.
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

export function LibraryHero() {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef<{ dx: number; dy: number } | null>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });
  const [dragging, setDragging] = React.useState(false);
  const [following, setFollowing] = React.useState(false);
  const [autoSync, setAutoSync] = React.useState(true);
  const [volume, setVolume] = React.useState(64);
  const [interests, setInterests] = React.useState<string[]>(['Design', 'Code']);

  const toggleInterest = (label: string) =>
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );

  const handleStageMove = (e: React.PointerEvent) => {
    const stage = stageRef.current;
    if (!stage) return;
    if (dragRef.current) {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left - dragRef.current.dx;
      const y = e.clientY - rect.top - dragRef.current.dy;
      setPos({
        x: Math.max(-160, Math.min(160, x)),
        y: Math.max(-70, Math.min(70, y)),
      });
      return;
    }
    const rect = stage.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: Math.round(-py * 8), ry: Math.round(px * 10) });
  };

  return (
    <section className="space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-xs sm:p-8">
      <div className="space-y-2">
        <h1 className="font-sans text-3xl font-black tracking-tight text-[#020617] sm:text-4xl">
          Component Library
        </h1>
        <p className="max-w-2xl font-sans text-sm font-medium text-[#334155]">
          One profile. Every control on it is live. Drag it, tilt it, play with it.
        </p>
      </div>

      <div
        ref={stageRef}
        onPointerMove={handleStageMove}
        onPointerLeave={() => {
          setTilt({ rx: 0, ry: 0 });
          dragRef.current = null;
          setDragging(false);
        }}
        className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] p-6"
        style={{ perspective: '900px' }}
      >
        <div
          className="w-full max-w-72 rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-sm"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: dragging ? 'none' : 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            className="flex cursor-grab touch-none flex-col items-center gap-2 select-none active:cursor-grabbing"
            onPointerDown={(e) => {
              const stage = stageRef.current;
              if (!stage) return;
              const rect = stage.getBoundingClientRect();
              dragRef.current = {
                dx: e.clientX - rect.left - pos.x,
                dy: e.clientY - rect.top - pos.y,
              };
              setDragging(true);
            }}
            onPointerUp={() => {
              dragRef.current = null;
              setDragging(false);
            }}
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-[#0056FF] font-sans text-lg font-black text-white">
              SD
            </span>
            <span className="font-sans text-lg font-black text-[#020617]">Sok Dara</span>
            <span className="font-sans text-xs font-medium text-[#334155]">
              Student · Software Engineering
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setFollowing((f) => !f)}
              className={cn(
                'inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[4px] px-4 font-sans text-sm font-bold transition-all active:scale-[0.97]',
                following
                  ? 'border border-[#CAD3F5] bg-white text-[#0056FF]'
                  : 'bg-[#0056FF] text-white hover:bg-[#2277FF]',
              )}
            >
              {following && <Check className="size-4" />}
              {following ? 'Following' : 'Follow'}
            </button>
            <button
              type="button"
              title="Send message"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-[4px] border border-[#CAD3F5] bg-white text-[#020617] transition-colors hover:bg-[#EFF5FF]"
            >
              <Send className="size-5" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-sans text-xs font-bold text-[#020617]">
                <Bell className="size-4" /> Auto sync
              </span>
              <LibrarySwitch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
            <div>
              <label
                htmlFor="hero-alert-volume"
                className="mb-2 flex items-center gap-2 font-sans text-xs font-bold text-[#020617]"
              >
                <Zap className="size-4" /> Alert volume
              </label>
              <input
                id="hero-alert-volume"
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Alert volume"
                className="h-11 w-full cursor-pointer accent-[#0056FF]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['Design', 'Code', 'Music'].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleInterest(label)}
                  className={cn(
                    'min-h-11 rounded-[4px] px-4 font-sans text-xs font-bold transition-all active:scale-[0.97]',
                    interests.includes(label)
                      ? 'bg-[#0056FF] text-white'
                      : 'border border-[#CAD3F5] bg-white text-[#020617] hover:bg-[#EFF5FF]',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setPos({ x: 0, y: 0 });
            setTilt({ rx: 0, ry: 0 });
          }}
          className="absolute right-4 bottom-4 inline-flex min-h-11 items-center gap-2 rounded-[4px] bg-white px-4 font-sans text-xs font-bold text-[#0056FF] transition-colors hover:bg-[#E3E7FC]"
        >
          <RefreshCw className="size-4" /> Reset position
        </button>
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
