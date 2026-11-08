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

const QR_EMP: string[] = [
  '111111101110010101100110101111111',
  '100000101100011001110000101000001',
  '101110101100111100110111001011101',
  '101110100110001110110000101011101',
  '101110101111000110110000101011101',
  '100000100111010111001001001000001',
  '111111101010101010101010101111111',
  '000000000101010110110010000000000',
  '100111111010101001010010010010111',
  '110111011100011101110001111111000',
  '001101110101010110001111111001011',
  '110100010001010010100000101100110',
  '011000111010110001001001101100110',
  '100111001001111001100001000101011',
  '001110111001110100111110110001000',
  '001001011101101010000011101101110',
  '100111101001000100001001001100001',
  '111001001011000101111100101111101',
  '011111111011110101110001101011101',
  '000010010110111010001000111101110',
  '110110101101001110110000000100101',
  '101101000101011000010011010110111',
  '100110100101111001101101010011011',
  '101110011001110101011011110011110',
  '110101111001111010000011111111001',
  '000000001111010111100011100010010',
  '111111101011011101010001101011100',
  '100000101101010101100000100011111',
  '101110101011111111011011111110011',
  '101110101100100010111011000011111',
  '101110100001101101110111100011111',
  '100000100001100000011010001001111',
  '111111101011100101001001101001100',
];

const QR_STU: string[] = [
  '111111101111110011111101101111111',
  '100000101110010010100101001000001',
  '101110100000000111001011101011101',
  '101110101000001110011010001011101',
  '101110100110011000001100101011101',
  '100000100101101001011000101000001',
  '111111101010101010101010101111111',
  '000000001000100001101011100000000',
  '101101110100101001010110101001011',
  '011100010110100110111011110001001',
  '110110100100101001000001010001111',
  '101101001010011000100001011111001',
  '001001101101000000100010110111110',
  '101100001101110011100000100101001',
  '111100110011001110000010100111000',
  '010110011110010010111100010001111',
  '111101111011100111110101101100101',
  '010010011110011101011101011110001',
  '011011110010000111000010110010110',
  '111001010000011000000001010000001',
  '001100111010000000101100000010000',
  '110001001000101100100001001000110',
  '001100101000000011100001010001111',
  '011010010111110010010011100011010',
  '100100101111101101001001111110000',
  '000000001011001111010010100011110',
  '111111101101110010011101101011000',
  '100000101110100000000110100011101',
  '101110100101101001001001111110111',
  '101110101010111000111110110111001',
  '101110101101000000110100111001100',
  '100000100101010111110011100001001',
  '111111101000100101101111000100100',
];

const QR_EVT: string[] = [
  '11111110111001001110101111111',
  '10000010110100101100101000001',
  '10111010010011100011001011101',
  '10111010101011100110101011101',
  '10111010010110011100001011101',
  '10000010001001101001001000001',
  '11111110101010101010101111111',
  '00000000111110101101000000000',
  '10110111001110001010001001011',
  '10100001001100001000101010110',
  '01011011101100101110010111110',
  '00111000010011001000000000001',
  '10010110001000110100110101110',
  '01011101000101101100001101010',
  '01100011010110101011010001011',
  '10001101101000111000100011011',
  '11010011100111011011000010111',
  '01110001011110010000110000001',
  '10100111110001111110010001000',
  '00101100011010100110110101111',
  '01010011111000110111111110001',
  '00000000101000001111100011000',
  '11111110111000001101101010010',
  '10000010111101101001100010000',
  '10111010000000010110111111011',
  '10111010100000111100000011101',
  '10111010100100101001010001001',
  '10000010001011111011110110010',
  '11111110110011000110110010010',
];

function QrGrid({
  rows,
  dark = '#020617',
  size = 'w-full',
}: {
  rows: string[];
  dark?: string;
  size?: string;
}) {
  const n = rows.length;
  return (
    <div
      className={`grid aspect-square ${size}`}
      style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        row
          .split('')
          .map((cell, x) => (
            <span
              key={`${x}-${y}`}
              style={{ backgroundColor: cell === '1' ? dark : 'transparent' }}
            />
          )),
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  light = false,
}: {
  label: string;
  value: string;
  light?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span
        className={`font-sans text-[9px] font-bold tracking-widest uppercase ${light ? 'text-white/50' : 'text-[#334155]/70'}`}
      >
        {label}
      </span>
      <span
        className={`text-right font-sans text-[11px] font-bold ${light ? 'text-white' : 'text-[#020617]'}`}
      >
        {value}
      </span>
    </div>
  );
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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
    <div style={{ perspective: '900px' }} className={className}>
      <div
        onPointerMove={handleMove}
        onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
        className="relative overflow-hidden shadow-xl ring-1 ring-[#CAD3F5] transition-transform duration-200"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <div
          className="pointer-events-none absolute z-10 size-24 rounded-full bg-white/20 blur-2xl"
          style={{ left: `${shine.x}%`, top: `${shine.y}%`, transform: 'translate(-50%, -50%)' }}
        />
        {children}
      </div>
    </div>
  );
}

function FollowBtn({ dark = false, label = 'Follow' }: { dark?: boolean; label?: string }) {
  const [followed, setFollowed] = React.useState(false);
  return (
    <button
      type="button"
      onClick={() => setFollowed((f) => !f)}
      className={cn(
        'inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[4px] px-4 font-sans text-sm font-bold transition-all active:scale-[0.97]',
        followed
          ? dark
            ? 'border border-white/40 bg-transparent text-white'
            : 'border border-[#CAD3F5] bg-white text-[#0056FF]'
          : dark
            ? 'bg-white text-[#020617]'
            : 'bg-[#0056FF] text-white hover:bg-[#2277FF]',
      )}
    >
      {followed && <Check className="size-4" />}
      {followed ? 'Following' : label}
    </button>
  );
}

function IconBtn({
  label,
  dark = false,
  children,
}: {
  label: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      className={cn(
        'inline-flex size-11 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
        dark
          ? 'border-white/30 bg-transparent text-white hover:bg-white/10'
          : 'border-[#CAD3F5] bg-white text-[#020617] hover:bg-[#EFF5FF]',
      )}
    >
      {children}
    </button>
  );
}

export function LibraryHero() {
  return (
    <section className="space-y-8 rounded-2xl border border-[#CAD3F5] bg-[#EFF5FF]/60 p-6 shadow-xs sm:p-8">
      <h1 className="font-sans text-3xl font-black tracking-tight text-[#020617] sm:text-4xl">
        Component Library
      </h1>

      <div className="grid items-center gap-8 lg:grid-cols-3">
        {/* EMPLOYEE BADGE: portrait 54 x 86 mm, black */}
        <div className="mx-auto w-full max-w-[300px] -rotate-2">
          <TiltCard>
            <div className="bg-[#020617] p-5">
              <div className="mx-auto h-2 w-16 rounded-full border border-white/40" />
              <div className="mt-4 flex items-start justify-between">
                <span className="font-sans text-base font-black tracking-wider text-white">
                  SNPI
                </span>
                <span className="font-sans text-[9px] font-bold tracking-widest text-white/60 uppercase">
                  Employee ID
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://avatars.githubusercontent.com/u/70220432?v=4"
                alt="shiliaiwei profile photo"
                className="mt-4 aspect-square w-full rounded-[4px] object-cover"
              />
              <p className="mt-4 font-sans text-lg font-black tracking-wide text-white uppercase">
                Shiliaiwei
              </p>
              <p className="font-sans text-[11px] font-medium text-white/60">@shiliaiwei</p>
              <div className="mt-4 space-y-2 border-t border-white/15 pt-4">
                <InfoRow light label="Title" value="Senior Software Engineer" />
                <InfoRow light label="Department" value="Software Engineering" />
                <InfoRow light label="ID No" value="EMP-2026-001" />
                <InfoRow light label="Access" value="All Areas" />
                <InfoRow light label="Valid" value="01/2026 to 12/2028" />
              </div>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div className="w-20 rounded-[4px] bg-white p-1">
                  <QrGrid rows={QR_EMP} />
                </div>
                <div className="text-right">
                  <p className="font-sans text-xs font-bold text-white">312 Followers</p>
                  <p className="font-sans text-xs font-medium text-white/60">86 Following</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <FollowBtn dark />
                <IconBtn dark label="Call">
                  <Phone className="size-5" />
                </IconBtn>
                <IconBtn dark label="Send message">
                  <Send className="size-5" />
                </IconBtn>
                <IconBtn dark label="Share profile">
                  <Share2 className="size-5" />
                </IconBtn>
              </div>
            </div>
          </TiltCard>
          <p className="mt-3 text-center font-mono text-[10px] font-bold text-[#334155]">
            BADGE 54 x 86 MM
          </p>
        </div>

        {/* STUDENT ID: landscape credit card 86 x 54 mm, brand blue */}
        <div className="mx-auto w-full max-w-[430px] rotate-1">
          <TiltCard>
            <div className="bg-white">
              <div className="flex items-center justify-between bg-[#0056FF] px-5 py-3">
                <span className="font-sans text-sm font-black tracking-wider text-white">
                  SNPI INTERNATIONAL SCHOOL
                </span>
                <span className="font-sans text-[9px] font-bold tracking-widest text-white/85 uppercase">
                  Student ID Card
                </span>
              </div>
              <div className="flex gap-4 p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://avatars.githubusercontent.com/u/233213854?v=4"
                  alt="Sok Dara profile photo"
                  className="aspect-[3/4] w-24 shrink-0 rounded-[4px] border border-[#CAD3F5] object-cover"
                />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="font-sans text-base font-black text-[#020617] uppercase">
                    Sok Dara
                  </p>
                  <InfoRow label="Student ID" value="STU-2026-0891" />
                  <InfoRow label="Program" value="Software Engineering" />
                  <InfoRow label="Batch" value="2026" />
                  <InfoRow label="Date of birth" value="14 Mar 2004" />
                  <InfoRow label="Blood group" value="O+" />
                  <InfoRow label="Campus" value="Phnom Penh" />
                  <InfoRow label="Issued" value="01 Sep 2026" />
                  <InfoRow label="Expires" value="31 Aug 2030" />
                </div>
                <div className="w-16 shrink-0 self-end">
                  <QrGrid rows={QR_STU} />
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-[#CAD3F5] px-5 py-4">
                <FollowBtn />
                <IconBtn label="Class schedule">
                  <Calendar className="size-5" />
                </IconBtn>
                <IconBtn label="Send message">
                  <Send className="size-5" />
                </IconBtn>
                <span className="ml-auto font-sans text-xs font-bold text-[#020617]">
                  128 <span className="font-medium text-[#334155]">Followers</span>
                </span>
              </div>
            </div>
          </TiltCard>
          <p className="mt-3 text-center font-mono text-[10px] font-bold text-[#334155]">
            CARD 86 x 54 MM
          </p>
        </div>

        {/* EVENT PASS: portrait 70 x 120 mm, white and blue */}
        <div className="mx-auto w-full max-w-[320px] -rotate-1">
          <TiltCard>
            <div className="bg-white p-5">
              <div className="mx-auto h-2 w-16 rounded-full border border-[#CAD3F5]" />
              <span className="mt-4 inline-block rounded-[4px] bg-[#032EA1] px-2 py-1 font-sans text-[10px] font-black tracking-widest text-white uppercase">
                All-Access Pass
              </span>
              <p className="mt-3 font-sans text-2xl font-black text-[#020617]">SNPI Tech Day</p>
              <div className="mt-3 space-y-2">
                <InfoRow label="Date" value="20 Nov 2026" />
                <InfoRow label="Time" value="8:00 AM to 5:00 PM" />
                <InfoRow label="Venue" value="SNPI Hall, Phnom Penh" />
                <InfoRow label="Gate" value="A" />
                <InfoRow label="Ticket No" value="EVT-2026-1120" />
                <InfoRow label="Price" value="$10" />
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-[#CAD3F5] pt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://avatars.githubusercontent.com/u/216975960?v=4"
                  alt="Kimheng Ly profile photo"
                  className="size-11 rounded-full border border-[#CAD3F5]"
                />
                <div>
                  <p className="font-sans text-[9px] font-bold tracking-widest text-[#334155]/70 uppercase">
                    Attendee
                  </p>
                  <p className="font-sans text-sm font-bold text-[#020617]">Kimheng Ly</p>
                </div>
                <span className="ml-auto font-sans text-xs font-bold text-[#020617]">
                  542 <span className="font-medium text-[#334155]">Going</span>
                </span>
              </div>
              <div className="mx-auto mt-4 w-28">
                <QrGrid rows={QR_EVT} />
              </div>
              <div className="mt-4 flex gap-2">
                <FollowBtn label="Join" />
                <IconBtn label="Event location">
                  <MapPin className="size-5" />
                </IconBtn>
                <IconBtn label="Share event">
                  <Share2 className="size-5" />
                </IconBtn>
              </div>
            </div>
          </TiltCard>
          <p className="mt-3 text-center font-mono text-[10px] font-bold text-[#334155]">
            PASS 70 x 120 MM
          </p>
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
