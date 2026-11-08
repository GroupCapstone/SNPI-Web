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
  Mail,
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
        className={`shrink-0 font-sans text-[9px] font-bold tracking-widest uppercase ${light ? 'text-white/50' : 'text-[#334155]/70'}`}
      >
        {label}
      </span>
      <span
        className={`text-right font-sans text-[11px] font-bold whitespace-nowrap ${light ? 'text-white' : 'text-[#020617]'}`}
      >
        {value}
      </span>
    </div>
  );
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl shadow-md ring-1 ring-[#CAD3F5]">
        {children}
      </div>
    </div>
  );
}

function FollowBlock({
  followers,
  following,
  label = 'Follow',
  countWord = 'Followers',
}: {
  followers: number;
  following?: number;
  label?: string;
  countWord?: string;
}) {
  const [followed, setFollowed] = React.useState(false);
  return (
    <div className="flex flex-nowrap items-center gap-3">
      <button
        type="button"
        onClick={() => setFollowed((f) => !f)}
        className={cn(
          'inline-flex h-11 w-[128px] shrink-0 items-center justify-center gap-2 rounded-[4px] px-3 font-sans text-sm font-bold whitespace-nowrap transition-all active:scale-[0.97]',
          followed
            ? 'border border-[#CAD3F5] bg-white text-[#0056FF]'
            : 'bg-[#0056FF] text-white hover:bg-[#2277FF]',
        )}
      >
        {followed && <Check className="size-4 shrink-0" />}
        {followed ? 'Following' : label}
      </button>
      <span className="font-sans text-xs font-bold whitespace-nowrap text-[#020617]">
        {followers + (followed ? 1 : 0)}{' '}
        <span className="font-medium text-[#334155]">{countWord}</span>
        {following !== undefined && (
          <>
            {' · '}
            {following} <span className="font-medium text-[#334155]">Following</span>
          </>
        )}
      </span>
    </div>
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

function HeroCrest() {
  return (
    <div className="flex justify-center" aria-hidden="true">
      <svg viewBox="0 0 200 120" className="h-36 w-auto sm:h-44" role="presentation">
        <defs>
          <pattern id="heroDots" width="4.2" height="4.2" patternUnits="userSpaceOnUse">
            <circle cx="2.1" cy="2.1" r="1.05" fill="#2277FF" />
          </pattern>
        </defs>
        <g opacity="0.55">
          <ellipse
            cx="109.8"
            cy="14.0"
            rx="6.4"
            ry="2.6"
            transform="rotate(12 109.8 14.0)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="118.8"
            cy="16.9"
            rx="6.4"
            ry="2.6"
            transform="rotate(24 118.8 16.9)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="127.1"
            cy="21.6"
            rx="6.4"
            ry="2.6"
            transform="rotate(35 127.1 21.6)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="134.2"
            cy="27.8"
            rx="6.4"
            ry="2.6"
            transform="rotate(47 134.2 27.8)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="140.0"
            cy="35.3"
            rx="6.4"
            ry="2.6"
            transform="rotate(58 140.0 35.3)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="144.1"
            cy="43.9"
            rx="6.4"
            ry="2.6"
            transform="rotate(70 144.1 43.9)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="146.5"
            cy="53.1"
            rx="6.4"
            ry="2.6"
            transform="rotate(82 146.5 53.1)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="146.9"
            cy="62.5"
            rx="6.4"
            ry="2.6"
            transform="rotate(93 146.9 62.5)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="145.5"
            cy="71.9"
            rx="6.4"
            ry="2.6"
            transform="rotate(105 145.5 71.9)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="142.1"
            cy="80.8"
            rx="6.4"
            ry="2.6"
            transform="rotate(116 142.1 80.8)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="137.1"
            cy="88.8"
            rx="6.4"
            ry="2.6"
            transform="rotate(128 137.1 88.8)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="130.6"
            cy="95.7"
            rx="6.4"
            ry="2.6"
            transform="rotate(139 130.6 95.7)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="122.8"
            cy="101.1"
            rx="6.4"
            ry="2.6"
            transform="rotate(151 122.8 101.1)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="114.0"
            cy="104.9"
            rx="6.4"
            ry="2.6"
            transform="rotate(163 114.0 104.9)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="104.7"
            cy="106.8"
            rx="6.4"
            ry="2.6"
            transform="rotate(174 104.7 106.8)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="95.3"
            cy="106.8"
            rx="6.4"
            ry="2.6"
            transform="rotate(186 95.3 106.8)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="86.0"
            cy="104.9"
            rx="6.4"
            ry="2.6"
            transform="rotate(197 86.0 104.9)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="77.2"
            cy="101.1"
            rx="6.4"
            ry="2.6"
            transform="rotate(209 77.2 101.1)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="69.4"
            cy="95.7"
            rx="6.4"
            ry="2.6"
            transform="rotate(221 69.4 95.7)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="62.9"
            cy="88.8"
            rx="6.4"
            ry="2.6"
            transform="rotate(232 62.9 88.8)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="57.9"
            cy="80.8"
            rx="6.4"
            ry="2.6"
            transform="rotate(244 57.9 80.8)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="54.5"
            cy="71.9"
            rx="6.4"
            ry="2.6"
            transform="rotate(255 54.5 71.9)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="53.1"
            cy="62.5"
            rx="6.4"
            ry="2.6"
            transform="rotate(267 53.1 62.5)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="53.5"
            cy="53.1"
            rx="6.4"
            ry="2.6"
            transform="rotate(278 53.5 53.1)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="55.9"
            cy="43.9"
            rx="6.4"
            ry="2.6"
            transform="rotate(290 55.9 43.9)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="60.0"
            cy="35.3"
            rx="6.4"
            ry="2.6"
            transform="rotate(302 60.0 35.3)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="65.8"
            cy="27.8"
            rx="6.4"
            ry="2.6"
            transform="rotate(313 65.8 27.8)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="72.9"
            cy="21.6"
            rx="6.4"
            ry="2.6"
            transform="rotate(325 72.9 21.6)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="81.2"
            cy="16.9"
            rx="6.4"
            ry="2.6"
            transform="rotate(336 81.2 16.9)"
            fill="url(#heroDots)"
          />
          <ellipse
            cx="90.2"
            cy="14.0"
            rx="6.4"
            ry="2.6"
            transform="rotate(348 90.2 14.0)"
            fill="url(#heroDots)"
          />
          <path d="M92 104 L100 110 L108 104 L104 116 H96 Z" fill="url(#heroDots)" />
          <path
            d="M100 22 L126 31 V56 C126 76 114 88 100 94 C86 88 74 76 74 56 V31 Z"
            fill="url(#heroDots)"
          />
          <path
            d="M100 29 L119 36 V56 C119 72 110 82 100 87 C90 82 81 72 81 56 V36 Z"
            fill="none"
            stroke="#EFF5FF"
            strokeWidth="2"
          />
          <rect
            x="86"
            y="42"
            width="28"
            height="28"
            fill="none"
            stroke="#EFF5FF"
            strokeWidth="2.5"
          />
          <rect x="91" y="47" width="18" height="18" fill="none" stroke="#EFF5FF" strokeWidth="2" />
          <path
            d="M107 51 H93 L107 62 H93"
            fill="none"
            stroke="#EFF5FF"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function LibraryHero() {
  return (
    <section className="space-y-8 overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white p-4 shadow-xs sm:p-8">
      <h1 className="font-sans text-3xl font-black tracking-tight text-[#020617] sm:text-4xl">
        Component Library
      </h1>
      <HeroCrest />

      <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* EMPLOYEE ID */}
        <div className="w-full max-w-[430px] min-w-0 justify-self-center">
          <TiltCard className="overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white shadow-md">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="flex h-24 items-start justify-between bg-[#0056FF] px-5 pt-4">
                <span className="font-sans text-lg font-black tracking-wide text-white">SNPI</span>
                <span className="font-sans text-[10px] font-bold tracking-widest text-white/80 uppercase">
                  Employee ID
                </span>
              </div>
              <div className="px-5 pb-5">
                <div className="-mt-12 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://avatars.githubusercontent.com/u/70220432?v=4"
                    alt="Employee profile photo"
                    className="size-24 rounded-full border-4 border-white object-cover shadow-md ring-1 ring-[#CAD3F5]"
                  />
                </div>
                <p className="mt-3 text-center font-sans text-lg font-black tracking-wide text-[#020617]">
                  SHILIAIWEI
                </p>
                <p className="text-center font-sans text-xs font-semibold text-[#334155]">
                  Senior Software Engineer, GroupCapstone
                </p>
                <p className="mt-0.5 flex items-center justify-center gap-1 text-center font-sans text-xs font-medium text-[#334155]">
                  <MapPin className="size-3.5 text-[#0056FF]" /> Phnom Penh
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <IconBtn label="Website">
                    <Globe className="size-5" />
                  </IconBtn>
                  <IconBtn label="Telegram">
                    <Send className="size-5" />
                  </IconBtn>
                  <IconBtn label="Email">
                    <Mail className="size-5" />
                  </IconBtn>
                  <IconBtn label="Share profile">
                    <Share2 className="size-5" />
                  </IconBtn>
                </div>
                <p className="mt-3 text-center font-sans text-xs text-[#334155]">
                  Building the SNPI school system with the GroupCapstone team.
                </p>
                <div className="mt-4 space-y-1.5">
                  <InfoRow label="Title" value="Senior Software Engineer" />
                  <InfoRow label="Department" value="Software Engineering" />
                  <InfoRow label="ID No" value="EMP-2026-001" />
                  <InfoRow label="Access level" value="All Areas" />
                  <InfoRow label="Office" value="HQ Building A" />
                  <InfoRow label="Work type" value="Full-time" />
                  <InfoRow label="Valid" value="01/2026 to 12/2028" />
                </div>
                <div className="mt-4 flex justify-center">
                  <QrGrid rows={QR_EMP} size="w-24" />
                </div>
                <FollowBlock followers={312} following={86} />
                <div className="mt-3 flex items-center justify-center gap-2">
                  <IconBtn label="Call">
                    <Phone className="size-5" />
                  </IconBtn>
                  <IconBtn label="Send message">
                    <Send className="size-5" />
                  </IconBtn>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* STUDENT ID */}
        <div className="mx-auto w-full max-w-[430px] min-w-0">
          <TiltCard className="overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white shadow-md">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between bg-[#0056FF] px-5 py-3">
                <span className="font-sans text-[13px] font-black tracking-wide text-white">
                  SNPI INTERNATIONAL SCHOOL
                </span>
                <span className="flex items-center gap-1.5 font-sans text-[9px] font-bold tracking-widest text-white/80 uppercase">
                  <span className="inline-block size-4 rounded-[3px] border-2 border-white/70" />
                  Student ID
                </span>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://avatars.githubusercontent.com/u/233213854?v=4"
                    alt="Student photo"
                    className="size-20 shrink-0 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-sans text-lg font-black text-[#020617] uppercase">
                      Sok Dara
                    </p>
                    <p className="font-mono text-[11px] font-bold text-[#0056FF]">STU-2026-0891</p>
                    <p className="mt-1 font-sans text-xs font-semibold text-[#334155]">
                      Software Engineering
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                  <InfoRow label="Batch" value="2026" />
                  <InfoRow label="Born" value="14 Mar 2004" />
                  <InfoRow label="Blood" value="O+" />
                  <InfoRow label="Campus" value="Phnom Penh" />
                  <InfoRow label="Status" value="Active student" />
                  <InfoRow label="Library access" value="Enabled" />
                  <InfoRow label="Issued" value="01 Sep 2026" />
                  <InfoRow label="Expires" value="31 Aug 2030" />
                </div>
                <div className="mt-4 border-t border-[#CAD3F5] pt-4">
                  <FollowBlock followers={128} following={64} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <IconBtn label="Class schedule">
                      <Calendar className="size-5" />
                    </IconBtn>
                    <IconBtn label="Send message">
                      <Send className="size-5" />
                    </IconBtn>
                  </div>
                  <div className="w-14 shrink-0">
                    <QrGrid rows={QR_STU} size="w-14" />
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* EVENT PASS */}
        <div className="mx-auto w-full max-w-[320px] min-w-0">
          <TiltCard>
            <div className="rounded-2xl border border-white/60 bg-white/95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] ring-1 ring-[#CAD3F5] backdrop-blur-xl">
              <div className="rounded-t-2xl bg-[#2277FF] px-5 py-4">
                <div className="mx-auto mb-3 h-2 w-16 rounded-full border border-white/40" />
                <span className="inline-block rounded-[4px] bg-white px-2 py-1 font-sans text-[10px] font-black tracking-widest text-[#2277FF] uppercase">
                  All-Access Pass
                </span>
                <p className="mt-2 font-sans text-2xl font-black text-white">SNPI Tech Day</p>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 rounded-[4px] bg-[#EFF5FF] px-3 py-2 text-center">
                    <p className="font-sans text-xl font-black text-[#0056FF]">20</p>
                    <p className="font-sans text-[9px] font-bold tracking-widest text-[#334155] uppercase">
                      Nov 2026
                    </p>
                  </div>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <InfoRow label="Time" value="8:00 AM to 5:00 PM" />
                    <InfoRow label="Check-in" value="From 7:30 AM" />
                    <InfoRow label="Venue" value="SNPI Hall, Phnom Penh" />
                  </div>
                </div>
                <div className="mt-4 space-y-2 border-t border-[#CAD3F5] pt-4">
                  <InfoRow label="Gate" value="A" />
                  <InfoRow label="Ticket No" value="EVT-2026-1120" />
                  <InfoRow label="Organizer" value="GroupCapstone" />
                  <InfoRow label="Price" value="$10" />
                </div>
                <div className="mt-4 flex flex-nowrap items-center gap-3 border-t border-dashed border-[#CAD3F5] pt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://avatars.githubusercontent.com/u/216975960?v=4"
                    alt="Kimheng Ly profile photo"
                    className="size-11 shrink-0 rounded-full border border-[#CAD3F5]"
                  />
                  <div className="min-w-0">
                    <p className="font-sans text-[9px] font-bold tracking-widest text-[#334155]/70 uppercase">
                      Attendee
                    </p>
                    <p className="font-sans text-sm font-bold whitespace-nowrap text-[#020617]">
                      Kimheng Ly
                    </p>
                  </div>
                </div>
                <div className="mx-auto mt-4 w-28">
                  <QrGrid rows={QR_EVT} size="w-24" />
                </div>
                <p className="mt-2 text-center font-sans text-[9px] font-bold tracking-widest text-[#334155] uppercase">
                  Admit one · Scan at gate
                </p>
                <div className="mt-4 border-t border-[#CAD3F5] pt-4">
                  <FollowBlock followers={542} label="Join" countWord="Going" />
                </div>
                <div className="mt-3 flex flex-nowrap gap-2">
                  <IconBtn label="Event location">
                    <MapPin className="size-5" />
                  </IconBtn>
                  <IconBtn label="Share event">
                    <Share2 className="size-5" />
                  </IconBtn>
                </div>
              </div>
            </div>
          </TiltCard>
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
