'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { RotateCw, ChevronRight } from '@/components/icons';

export type StatusCode = 404 | 403 | 500 | 503 | 401;
export type StatusMode = 'radar' | 'barcode' | 'noise' | 'gravity';

export interface StatusMeta {
  code: StatusCode;
  title: string;
  tagline: string;
  description: string;
  remediation: string;
  badge: string;
}

export const STATUS_DIRECTORY: Record<StatusCode, StatusMeta> = {
  404: {
    code: 404,
    title: 'Page Coordinates Not Found',
    tagline: 'Resource not located in SNPI-SMS routing directory',
    description:
      'The requested URL does not match any route in the distributed SNPI-SMS campus directory.',
    remediation: 'Verify the route URL or navigate back to the developer document portal.',
    badge: 'HTTP 404 · NOT FOUND',
  },
  403: {
    code: 403,
    title: 'Cryptographic Access Forbidden',
    tagline: 'Missing required RBAC permission tokens',
    description:
      'Your authenticated security context lacks the implied RBAC scopes required to read this resource.',
    remediation: 'Contact your campus branch administrator to escalate institutional role scopes.',
    badge: 'HTTP 403 · FORBIDDEN',
  },
  500: {
    code: 500,
    title: 'Cluster Exception Fault',
    tagline: 'Internal server deadlock or transaction abort',
    description:
      'The backend service encountered an unhandled exception or MongoDB replica set session timeout.',
    remediation: 'Our cluster monitor has logged this incident. Please retry in a few moments.',
    badge: 'HTTP 500 · SERVER ERROR',
  },
  503: {
    code: 503,
    title: 'Node Maintenance In Progress',
    tagline: 'Service temporarily suspended for cluster upgrade',
    description:
      'High-availability failover and scheduled database migrations are currently being executed.',
    remediation: 'Scheduled completion in < 5 minutes. Check system health at /apis.',
    badge: 'HTTP 503 · UNAVAILABLE',
  },
  401: {
    code: 401,
    title: 'Authentication Challenge Required',
    tagline: 'Invalid session signature or token expired',
    description:
      'This API gateway endpoint requires a valid constant-time HMAC bearer authorization header.',
    remediation: 'Sign in through the SNPI-SMS identity gateway to refresh your session keys.',
    badge: 'HTTP 401 · UNAUTHORIZED',
  },
};

export interface StatusPage404Props {
  /** Visual presentation mode archetype. Default: 'radar' */
  mode?: StatusMode;
  /** HTTP Status Code. Default: 404 */
  statusCode?: StatusCode;
  /** Custom heading title override */
  title?: string;
  /** Custom description override */
  description?: string;
  /** Primary action button link href. Default: '/document/design-system' */
  homeHref?: string;
  /** Demo mode: when set, the primary action renders as a button and never navigates */
  onHomeClick?: () => void;
  /** Primary action button label. Default: 'Return to Dashboard' */
  homeLabel?: string;
  /** Secondary retry action callback for error boundaries */
  onReset?: () => void;
  /** Secondary retry action label. Default: 'Try Again' */
  resetLabel?: string;
  /** Container className */
  className?: string;
  /** Allow inline mode switching. Default: false */
  showControls?: boolean;
}

// Renders the primary action as a plain button in demo mode so a tap
// inside a documentation stage never navigates away from the section.
function StatusHomeAction({
  onHomeClick,
  homeHref,
  className,
  children,
}: {
  onHomeClick?: () => void;
  homeHref: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (onHomeClick) {
    return (
      <button type="button" onClick={onHomeClick} className={className}>
        {children}
      </button>
    );
  }
  return (
    <Link href={homeHref} className={className}>
      {children}
    </Link>
  );
}

export function StatusPage404({
  mode: initialMode = 'radar',
  statusCode: initialCode = 404,
  title: customTitle,
  description: customDesc,
  homeHref = '/document/design-system',
  homeLabel,
  onHomeClick,
  onReset,
  resetLabel,
  className,
  showControls = false,
}: StatusPage404Props) {
  const [activeMode, setActiveMode] = React.useState<StatusMode>(initialMode);
  const [activeCode, setActiveCode] = React.useState<StatusCode>(initialCode);

  // Gravity mode interactive tumbling state
  const [gravityTumbled, setGravityTumbled] = React.useState(true);

  // Sync prop changes
  React.useEffect(() => {
    setActiveMode(initialMode);
  }, [initialMode]);

  React.useEffect(() => {
    setActiveCode(initialCode);
  }, [initialCode]);

  const meta = STATUS_DIRECTORY[activeCode] || STATUS_DIRECTORY[404];
  const resolvedTitle = customTitle || meta.title;
  const resolvedDesc = customDesc || meta.description;
  const resolvedHomeLabel = homeLabel;

  return (
    <div
      data-slot="status-page-404"
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white shadow-xs',
        className,
      )}
    >
      {/* OPTIONAL INLINE CONTROLS BAR */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#CAD3F5]/60 bg-[#EFF5FF] p-3.5">
          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 font-mono text-[10px] font-bold text-slate-400 uppercase">
              Design Archetype:
            </span>
            {(
              [
                { id: 'radar', label: '01 Radar Explorer' },
                { id: 'barcode', label: '02 Barcode Ledger' },
                { id: 'noise', label: '03 CRT Phosphor' },
                { id: 'gravity', label: '04 Gravity Blocks' },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMode(m.id)}
                className={cn(
                  'cursor-pointer rounded-[2px] border px-2.5 py-1 font-sans text-xs font-bold transition-all select-none',
                  activeMode === m.id
                    ? 'border-[#0056FF] bg-[#0056FF] text-white shadow-none'
                    : 'border-[#CAD3F5] bg-white text-[#020617] hover:bg-[#EFF5FF]',
                )}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Status Code Switcher */}
          <div className="flex items-center gap-1">
            <span className="mr-1 font-mono text-[10px] font-bold text-slate-400 uppercase">
              Code:
            </span>
            {([404, 403, 500, 503, 401] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setActiveCode(code)}
                className={cn(
                  'cursor-pointer rounded-[2px] border px-2 py-0.5 font-mono text-[11px] font-bold transition-all select-none',
                  activeCode === code
                    ? 'border-[#0056FF] bg-[#0056FF] text-white'
                    : 'border-[#CAD3F5] bg-white text-[#020617] hover:bg-[#EFF5FF]',
                )}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RENDER ACTIVE VISUAL MODE */}
      <div className="relative min-h-[440px] w-full bg-white">
        {/* ========================================================= */}
        {/* MODE 1: RADAR SPATIAL EXPLORER                           */}
        {/* ========================================================= */}
        {activeMode === 'radar' && (
          <div className="relative flex flex-col items-center justify-center bg-white p-8 text-center sm:p-12">
            {/* Top Navigation & Recovery Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {onReset && (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#CAD3F5] bg-[#EFF5FF] px-5 py-2.5 font-sans text-xs font-bold text-[#0056FF] transition-all hover:bg-[#E3E7FC] active:scale-[0.97]"
                >
                  <RotateCw className="size-3.5" />
                  <span>{resetLabel || 'Try Again'}</span>
                </button>
              )}
              {resolvedHomeLabel && (
                <StatusHomeAction
                  onHomeClick={onHomeClick}
                  homeHref={homeHref}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0056FF] px-6 py-2.5 font-sans text-xs font-bold text-white transition-all hover:bg-[#2277FF] active:scale-[0.97]"
                >
                  <span>{resolvedHomeLabel}</span>
                  <ChevronRight className="size-3.5 stroke-[2.5]" />
                </StatusHomeAction>
              )}
            </div>

            {/* Radar Canvas with Floating Extruded Status Digits */}
            <div className="relative mt-6 flex size-64 items-center justify-center sm:size-72">
              {/* Concentric Radar Rings */}
              <svg className="absolute inset-0 size-full" viewBox="0 0 280 280">
                <circle cx="140" cy="140" r="130" fill="none" stroke="#E3E7FC" strokeWidth="1.5" />
                <circle
                  cx="140"
                  cy="140"
                  r="95"
                  fill="none"
                  stroke="#E3E7FC"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle cx="140" cy="140" r="60" fill="none" stroke="#E3E7FC" strokeWidth="1.5" />
                <circle cx="140" cy="140" r="4" fill="#0056FF" />

                {/* Radar Crosshairs */}
                <line
                  x1="140"
                  y1="10"
                  x2="140"
                  y2="270"
                  stroke="#E3E7FC"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line
                  x1="10"
                  y1="140"
                  x2="270"
                  y2="140"
                  stroke="#E3E7FC"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />

                {/* Rotating Radar Sweep Beam */}
                <g className="origin-center animate-[spin_4s_linear_infinite]">
                  <defs>
                    <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0056FF" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#0056FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 140 140 L 270 140 A 130 130 0 0 1 140 270 Z" fill="url(#radarSweep)" />
                  <line x1="140" y1="140" x2="270" y2="140" stroke="#0056FF" strokeWidth="2" />
                </g>
              </svg>

              {/* Floating Extruded Status Digits */}
              <div className="relative z-10 flex items-center justify-center gap-1 select-none">
                <span className="inline-block -rotate-12 font-sans text-7xl font-black text-[#0056FF] drop-shadow-[0_4px_12px_rgba(0,86,255,0.25)] sm:text-8xl">
                  {String(activeCode)[0]}
                </span>
                <span className="inline-block rotate-3 font-sans text-8xl font-black text-[#2277FF] drop-shadow-[0_4px_12px_rgba(34,119,255,0.25)] sm:text-9xl">
                  {String(activeCode)[1]}
                </span>
                <span className="inline-block rotate-12 font-sans text-7xl font-black text-[#0056FF] drop-shadow-[0_4px_12px_rgba(0,86,255,0.25)] sm:text-8xl">
                  {String(activeCode)[2]}
                </span>
              </div>
            </div>

            {/* Title & Telemetry Description */}
            <div className="mt-6 max-w-lg space-y-2">
              <span className="rounded-[2px] border border-[#CAD3F5] bg-[#E3E7FC] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#0056FF]">
                {meta.badge}
              </span>
              <h2 className="font-sans text-2xl font-black tracking-tight text-[#020617] sm:text-3xl">
                {resolvedTitle}
              </h2>
              {resolvedDesc ? (
                <p className="font-sans text-xs text-slate-600 sm:text-sm">{resolvedDesc}</p>
              ) : null}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 2: BRUTALIST BARCODE LEDGER                         */}
        {/* ========================================================= */}
        {activeMode === 'barcode' && (
          <div className="relative flex flex-col items-center justify-center bg-white p-10 text-center text-[#020617] sm:p-16">
            {/* Subtle Right Border Divider Line */}
            <div className="absolute top-0 right-10 bottom-0 w-[1px] bg-[#0056FF]/30 sm:right-16" />

            {/* Cryptographic High-Density Barcode Graphic */}
            <div className="flex flex-col items-center space-y-3">
              <svg viewBox="0 0 240 70" className="h-16 w-56 fill-[#020617]" aria-hidden="true">
                {[
                  4, 12, 16, 22, 28, 38, 44, 48, 56, 68, 74, 82, 90, 96, 104, 112, 120, 130, 136,
                  144, 154, 160, 168, 178, 186, 194, 202, 210, 218, 226, 234,
                ].map((x, i) => (
                  <rect
                    key={i}
                    x={x}
                    y={0}
                    width={i % 3 === 0 ? 5 : i % 2 === 0 ? 3 : 1.5}
                    height={68}
                  />
                ))}
              </svg>
              <span className="font-mono text-xs font-bold tracking-[0.35em] text-[#020617] uppercase">
                ERROR · {activeCode}
              </span>
            </div>

            {/* Editorial Heading */}
            <div className="mt-8 space-y-2">
              <h2 className="font-sans text-3xl font-black tracking-tight text-[#020617] sm:text-4xl">
                {resolvedTitle}
              </h2>
              <p className="font-mono text-xs text-slate-500">{meta.tagline}</p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {onReset && (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#CAD3F5] bg-[#EFF5FF] px-5 py-2.5 font-sans text-xs font-bold text-[#0056FF] uppercase transition-all hover:bg-[#E3E7FC] active:scale-[0.97]"
                >
                  <RotateCw className="size-3.5" />
                  <span>{resetLabel || 'Try Again'}</span>
                </button>
              )}
              {resolvedHomeLabel && (
                <StatusHomeAction
                  onHomeClick={onHomeClick}
                  homeHref={homeHref}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0056FF] px-6 py-2.5 font-sans text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-[#2277FF] active:scale-[0.97]"
                >
                  <span>{resolvedHomeLabel}</span>
                </StatusHomeAction>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 3: CRT PHOSPHOR NOISE                               */}
        {/* ========================================================= */}
        {activeMode === 'noise' && (
          <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#EFF5FF]/60 p-10 text-center text-[#020617] sm:p-16">
            {/* Subtle Coordinate Grid Canvas */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #CAD3F5 1px, transparent 1px), linear-gradient(to bottom, #CAD3F5 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Content */}
            <div className="relative z-10 space-y-3">
              <span className="rounded-[2px] border border-[#CAD3F5] bg-[#E3E7FC] px-2.5 py-0.5 font-mono text-xs font-bold tracking-widest text-[#0056FF] uppercase">
                ERROR {activeCode}
              </span>

              {/* Heading */}
              <h2 className="relative font-sans text-3xl font-black tracking-tight text-[#020617] sm:text-5xl">
                {resolvedTitle}
              </h2>

              {resolvedDesc ? (
                <p className="mx-auto max-w-md font-sans text-xs text-slate-600 sm:text-sm">
                  {resolvedDesc}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-5">
                {onReset && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#CAD3F5] bg-[#EFF5FF] px-5 py-2.5 font-sans text-xs font-bold text-[#0056FF] transition-all hover:bg-[#E3E7FC] active:scale-[0.97]"
                  >
                    <RotateCw className="size-3.5" />
                    <span>{resetLabel || 'Try Again'}</span>
                  </button>
                )}
                {resolvedHomeLabel && (
                  <StatusHomeAction
                    onHomeClick={onHomeClick}
                    homeHref={homeHref}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0056FF] px-6 py-2.5 font-sans text-xs font-bold text-white transition-all hover:bg-[#2277FF] active:scale-[0.97]"
                  >
                    <span>{resolvedHomeLabel}</span>
                  </StatusHomeAction>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 4: GRAVITY KINETIC BLOCKS                           */}
        {/* ========================================================= */}
        {activeMode === 'gravity' && (
          <div className="relative flex flex-col items-center justify-between overflow-hidden bg-white p-8 text-center sm:p-12">
            {/* Top Text & Controls */}
            <div className="space-y-3">
              <h2 className="font-sans text-2xl font-black tracking-tight text-[#020617] sm:text-3xl">
                {resolvedTitle}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {onReset && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#CAD3F5] bg-[#EFF5FF] px-4 py-2 font-sans text-xs font-bold text-[#0056FF] hover:bg-[#E3E7FC] active:scale-[0.97]"
                  >
                    <RotateCw className="size-3.5" />
                    <span>{resetLabel || 'Try Again'}</span>
                  </button>
                )}

                {resolvedHomeLabel && (
                  <StatusHomeAction
                    onHomeClick={onHomeClick}
                    homeHref={homeHref}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0056FF] px-6 py-2 font-sans text-xs font-bold text-white transition-all hover:bg-[#2277FF] active:scale-[0.97]"
                  >
                    <span>{resolvedHomeLabel}</span>
                  </StatusHomeAction>
                )}

                <button
                  type="button"
                  onClick={() => setGravityTumbled(!gravityTumbled)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#CAD3F5] bg-[#EFF5FF] px-4 py-2 font-sans text-xs font-bold text-[#0056FF] hover:bg-[#E3E7FC] active:scale-[0.97]"
                >
                  <RotateCw className="size-3.5" />
                  <span>{gravityTumbled ? 'Align Modules' : 'Tumble Modules'}</span>
                </button>
              </div>
            </div>

            {/* Kinetic Tumbled Brand Cards */}
            <div className="relative mt-8 flex h-60 w-full max-w-2xl items-end justify-center gap-3 overflow-visible pb-2 select-none">
              {/* Card 1: Vector Bézier Curve Card (Soft Lavender) */}
              <motion.div
                animate={
                  gravityTumbled
                    ? {
                        y: 0,
                        rotate: -6,
                        transition: { type: 'spring', stiffness: 260, damping: 20 },
                      }
                    : {
                        y: -30,
                        rotate: 0,
                        transition: { type: 'spring', stiffness: 260, damping: 20 },
                      }
                }
                className="flex h-44 w-32 shrink-0 flex-col justify-between rounded-xl border border-[#CAD3F5] bg-[#E3E7FC] p-3 text-[#0056FF] shadow-xs"
              >
                <span className="font-mono text-[9px] font-bold">BÉZIER</span>
                <svg viewBox="0 0 100 80" className="h-16 w-full stroke-current" fill="none">
                  <path d="M 10 70 C 20 20, 80 20, 90 70" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="20" cy="20" r="3" fill="#0056FF" />
                  <circle cx="80" cy="20" r="3" fill="#0056FF" />
                </svg>
                <span className="font-mono text-[9px]">S-CURVE</span>
              </motion.div>

              {/* Card 2: Typography Sora Aa Card (Royal Blue) */}
              <motion.div
                animate={
                  gravityTumbled
                    ? {
                        y: 10,
                        rotate: 4,
                        transition: { type: 'spring', stiffness: 280, damping: 22 },
                      }
                    : {
                        y: -20,
                        rotate: 0,
                        transition: { type: 'spring', stiffness: 280, damping: 22 },
                      }
                }
                className="flex h-48 w-36 shrink-0 flex-col justify-between rounded-xl bg-[#0056FF] p-4 text-white shadow-xs"
              >
                <span className="font-mono text-[10px] font-bold">TYPOGRAPHY</span>
                <span className="font-sans text-5xl font-black">Aa</span>
                <span className="font-mono text-[9px] text-blue-100">SNPI SYSTEM</span>
              </motion.div>

              {/* Card 3: Quotation Quotes Card (Ice Tint & Navy - Strict Brand Tokens) */}
              <motion.div
                animate={
                  gravityTumbled
                    ? {
                        y: -5,
                        rotate: -3,
                        transition: { type: 'spring', stiffness: 240, damping: 18 },
                      }
                    : {
                        y: -40,
                        rotate: 0,
                        transition: { type: 'spring', stiffness: 240, damping: 18 },
                      }
                }
                className="flex h-52 w-36 shrink-0 flex-col justify-between rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] p-4 text-[#020617] shadow-xs"
              >
                <div className="flex justify-between font-serif text-3xl leading-none font-black text-[#0056FF] opacity-80">
                  <span>“</span>
                  <span>”</span>
                </div>
                <div className="space-y-1 font-sans text-[11px] font-bold">
                  <div>ERROR {activeCode}</div>
                  <div className="text-[9px] text-slate-500">COORDINATE FAULT</div>
                </div>
                <span className="font-mono text-[9px] text-[#0056FF]">QUOTE SPEC</span>
              </motion.div>

              {/* Card 4: Security Lock Shield Card (Azure Blue) */}
              <motion.div
                animate={
                  gravityTumbled
                    ? {
                        y: 15,
                        rotate: 12,
                        transition: { type: 'spring', stiffness: 300, damping: 24 },
                      }
                    : {
                        y: -10,
                        rotate: 0,
                        transition: { type: 'spring', stiffness: 300, damping: 24 },
                      }
                }
                className="flex h-44 w-32 shrink-0 flex-col justify-between rounded-xl bg-[#2277FF] p-3 text-white shadow-xs"
              >
                <span className="font-mono text-[9px] font-bold">SECURITY</span>
                <svg
                  viewBox="0 0 24 24"
                  className="size-10 self-center"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="2" />
                  <circle cx="12" cy="16" r="1.5" fill="white" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeWidth="2" />
                </svg>
                <span className="font-mono text-[9px]">RBAC SCOPES</span>
              </motion.div>

              {/* Card 5: Cluster Mesh Card (Soft Lavender & Royal Blue) */}
              <motion.div
                animate={
                  gravityTumbled
                    ? {
                        y: 0,
                        rotate: -8,
                        transition: { type: 'spring', stiffness: 270, damping: 21 },
                      }
                    : {
                        y: -25,
                        rotate: 0,
                        transition: { type: 'spring', stiffness: 270, damping: 21 },
                      }
                }
                className="hidden h-52 w-32 shrink-0 flex-col justify-between rounded-xl border border-[#CAD3F5] bg-white p-3 text-[#020617] shadow-xs sm:flex"
              >
                <span className="font-mono text-[9px] font-bold text-[#0056FF]">CLUSTER</span>
                <svg
                  viewBox="0 0 40 40"
                  className="size-12 self-center stroke-[#0056FF]"
                  fill="none"
                >
                  <circle cx="10" cy="10" r="3" fill="#2277FF" />
                  <circle cx="30" cy="10" r="3" fill="#2277FF" />
                  <circle cx="20" cy="30" r="3" fill="#0056FF" />
                  <line x1="10" y1="10" x2="30" y2="10" strokeWidth="1.5" />
                  <line x1="10" y1="10" x2="20" y2="30" strokeWidth="1.5" />
                  <line x1="30" y1="10" x2="20" y2="30" strokeWidth="1.5" />
                </svg>
                <span className="font-mono text-[9px] text-slate-500">MESH RS0</span>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
