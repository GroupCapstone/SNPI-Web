'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Layers,
  Sparkles,
  RotateCcw,
  User,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  Eye,
  RefreshCw,
  Folder,
  FileText,
} from '@/components/icons';

// ============================================================================
// 05 CSS CUSTOM PROPERTIES & 06 PSEUDO-ELEMENT SHIMMER STYLES
// ============================================================================

const SKELETON_STYLES = `
@keyframes skeleton-shimmer-sweep {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skeleton-shimmer {
  position: relative;
  overflow: hidden;
  background-color: var(--skeleton-base, #eff5ff);
}

.skeleton-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--skeleton-highlight, rgba(227, 231, 252, 0.95)) 50%,
    transparent 100%
  );
  animation: skeleton-shimmer-sweep var(--skeleton-speed, 1.8s) infinite ease-in-out;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer::after {
    animation: none !important;
    display: none !important;
  }
}
`;

// ============================================================================
// 02 PLACEHOLDER SHAPES & 03 ASPECT RATIOS (Skeleton Primitive)
// ============================================================================

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
  theme?: 'light' | 'dark';
}

export function Skeleton({
  variant = 'rect',
  width,
  height,
  className,
  style,
  theme = 'light',
  ...props
}: SkeletonProps) {
  const variantClass =
    variant === 'circle'
      ? 'rounded-full aspect-square shrink-0'
      : variant === 'text'
        ? 'rounded-[2px] h-3.5 my-1'
        : 'rounded-[4px]';

  const themeVars = {
    '--skeleton-base': '#EFF5FF',
    '--skeleton-highlight': 'rgba(255, 255, 255, 0.9)',
    '--skeleton-speed': '1.8s',
  } as React.CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={cn('skeleton-shimmer block', variantClass, className)}
      style={{
        width,
        height,
        ...themeVars,
        ...style,
      }}
      {...props}
    />
  );
}

// ============================================================================
// PATTERN 1: PROFILE HEADER (Loading Skeleton vs Loaded Content)
// ============================================================================

function ProfileHeaderPattern({ isLoaded }: { isLoaded: boolean; theme?: 'light' | 'dark' }) {
  if (!isLoaded) {
    return (
      <div className="space-y-5 rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-xs max-sm:rounded-none max-sm:border-x-0 max-sm:border-y sm:rounded-2xl sm:border">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          {/* Avatar circle (02 Shape) */}
          <Skeleton variant="circle" className="size-16" />

          <div className="w-full flex-1 space-y-2.5">
            {/* Name bar */}
            <Skeleton className="h-5 w-48 rounded-[4px]" />
            {/* Title & Badge */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-32 rounded-[2px]" />
              <Skeleton className="h-3.5 w-16 rounded-[4px]" />
            </div>
            {/* Bio lines */}
            <Skeleton className="h-3 w-full max-w-md rounded-[2px]" />
            <Skeleton className="h-3 w-3/4 max-w-sm rounded-[2px]" />
          </div>

          {/* Action buttons */}
          <div className="flex w-full shrink-0 gap-2 pt-2 sm:w-auto sm:flex-col sm:pt-0">
            <Skeleton className="h-8 w-24 rounded-[4px]" />
            <Skeleton className="h-8 w-24 rounded-[4px]" />
          </div>
        </div>
      </div>
    );
  }

  // Loaded state
  return (
    <div className="border border-[#CAD3F5] bg-white p-6 shadow-xs max-sm:rounded-none max-sm:border-x-0 max-sm:border-y sm:rounded-2xl sm:border">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div className="flex shrink-0 items-center justify-center">
          <User className="size-10 text-[#0056FF]" />
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-sans text-base font-bold text-[#0A1A4A]">Dr. Sokha Chann</h4>
            <span className="flex items-center gap-1 rounded-[4px] border border-emerald-300 bg-[#ECFDF5] px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
              <ShieldCheck className="size-3" />
              <span>SUPERADMIN VERIFIED</span>
            </span>
          </div>

          <p className="font-mono text-xs font-bold text-[#0056FF]">
            Principal Campus Architect &middot; SNPI Institutional Systems
          </p>
          <p className="max-w-md font-sans text-xs leading-relaxed text-slate-700">
            Directs the 47 modular monolith domain engines, managing student lifecycles, ledger
            hashes, and accreditation pipelines.
          </p>
        </div>

        <div className="flex w-full shrink-0 gap-2 pt-2 sm:w-auto sm:flex-col sm:pt-0">
          <button
            type="button"
            className="rounded-[4px] bg-[#0056FF] px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#2277FF]"
          >
            Edit Profile
          </button>
          <button
            type="button"
            className="rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] px-3.5 py-1.5 font-mono text-xs font-bold text-[#0056FF] transition-colors hover:bg-[#E3E7FC]"
          >
            Passbook
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PATTERN 2: CARD GRID (Loading Skeleton vs Loaded Content)
// ============================================================================

function CardGridPattern({ isLoaded }: { isLoaded: boolean; theme?: 'light' | 'dark' }) {
  const cardsData = [
    {
      code: 'CS-401',
      title: 'Computer Systems Architecture',
      desc: 'RISC-V microarchitectures, instruction pipelines, and memory hierarchies.',
      author: 'Prof. Virak',
      students: '48 Enrolled',
    },
    {
      code: 'DB-502',
      title: 'Database Internals & Sharding',
      desc: 'MongoDB replica sets, write concerns, WAL journaling, and B-tree indexing.',
      author: 'Eng. Chantrea',
      students: '36 Enrolled',
    },
    {
      code: 'SEC-603',
      title: 'Applied Network Cryptography',
      desc: 'Constant-time HMAC operations, PKI x509 cert chains, and timing side-channel defenses.',
      author: 'Dr. Chann',
      students: '29 Enrolled',
    },
  ];

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((key) => (
          <div
            key={key}
            className="space-y-3.5 rounded-2xl border border-[#CAD3F5] bg-white p-4 shadow-xs"
          >
            {/* 03 Aspect Ratio: 16/9 media thumbnail */}
            <Skeleton className="aspect-video w-full rounded-xl" />

            {/* Pill & Title */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-16 rounded-full" />
              <Skeleton className="h-4.5 w-3/4 rounded-lg" />
            </div>

            {/* Body copy lines */}
            <div className="space-y-1.5 pt-1">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-5/6 rounded-md" />
            </div>

            {/* Footer row: avatar + text */}
            <div className="flex items-center justify-between border-t border-[#CAD3F5]/60 pt-3">
              <div className="flex items-center gap-2">
                <Skeleton variant="circle" className="size-6" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Loaded state
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cardsData.map((c) => (
        <div
          key={c.code}
          className="flex flex-col justify-between rounded-2xl border border-[#CAD3F5] bg-white p-4 shadow-xs transition-colors hover:border-[#0056FF]"
        >
          <div className="space-y-3">
            {/* Aspect Video Media Banner */}
            <div className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF]">
              <Folder className="size-8" />
              <span className="mt-1 font-mono text-[10px] font-bold tracking-wider">
                SYLLABUS MODULE
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold text-[#0056FF]">{c.code}</span>
              <h4 className="font-sans text-xs font-bold text-[#0A1A4A]">{c.title}</h4>
              <p className="font-sans text-[11px] leading-relaxed text-slate-700">{c.desc}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#CAD3F5]/60 pt-3 font-mono text-[11px]">
            <span className="font-bold text-slate-700">{c.author}</span>
            <span className="font-bold text-[#0056FF]">{c.students}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// PATTERN 3: CONTENT LIST (Loading Skeleton vs Loaded Content)
// ============================================================================

function ContentListPattern({ isLoaded }: { isLoaded: boolean; theme?: 'light' | 'dark' }) {
  const listItems = [
    {
      title: 'ACID Ledger Commitment TX-9204 Finalized',
      tag: 'FINANCIAL LEDGER',
      time: '2 minutes ago',
      status: 'VERIFIED',
    },
    {
      title: 'Branch Authority Key Rotation Executed',
      tag: 'SECURITY AUDIT',
      time: '14 minutes ago',
      status: 'ROTATED',
    },
    {
      title: 'Term 2 Final Exam Schedule Published',
      tag: 'ACADEMICS',
      time: '1 hour ago',
      status: 'ACTIVE',
    },
    {
      title: 'Cryptographic Student Passbook Batch Minted',
      tag: 'ADMISSIONS',
      time: '3 hours ago',
      status: 'COMPLETED',
    },
  ];

  if (!isLoaded) {
    return (
      <div className="divide-y divide-[#CAD3F5]/60 border border-[#CAD3F5] bg-white shadow-xs max-sm:rounded-none max-sm:border-x-0 max-sm:border-y sm:rounded-2xl sm:border">
        {[1, 2, 3, 4].map((key) => (
          <div key={key} className="flex items-center gap-4 p-4">
            {/* Square Icon Thumbnail */}
            <Skeleton className="size-10 shrink-0 rounded-[4px]" />

            {/* Typography lines */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/5 rounded-[2px]" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20 rounded-[2px]" />
                <Skeleton className="h-3 w-16 rounded-[2px]" />
              </div>
            </div>

            {/* Status Pill */}
            <Skeleton className="h-6 w-20 shrink-0 rounded-[4px]" />
          </div>
        ))}
      </div>
    );
  }

  // Loaded state
  return (
    <div className="divide-y divide-[#CAD3F5]/60 border border-[#CAD3F5] bg-white shadow-xs max-sm:rounded-none max-sm:border-x-0 max-sm:border-y sm:rounded-2xl sm:border">
      {listItems.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between gap-4 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <FileText className="size-5 shrink-0 text-[#0056FF]" />

            <div className="min-w-0 space-y-0.5">
              <h5 className="truncate font-sans text-xs font-bold text-[#0A1A4A]">{item.title}</h5>
              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
                <span className="font-bold text-[#0056FF]">{item.tag}</span>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-2.5" />
                  <span>{item.time}</span>
                </span>
              </div>
            </div>
          </div>

          <span className="shrink-0 rounded-[4px] border border-emerald-300 bg-[#ECFDF5] px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// INTERACTIVE DOCUMENTATION DEMO: SkeletonLoadingScreenDemo
// ============================================================================

export function SkeletonLoadingScreenDemo() {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<'grid' | 'profile' | 'list'>('grid');

  return (
    <div className="w-full space-y-5">
      {/* Inject self-contained pure CSS keyframes & shimmer styles */}
      <style dangerouslySetInnerHTML={{ __html: SKELETON_STYLES }} />

      {/* Control Bar: Active State Toggle, Pattern Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#CAD3F5] pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'grid', label: 'Card Grid' },
              { id: 'profile', label: 'Profile Header' },
              { id: 'list', label: 'Data List' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'cursor-pointer rounded-[4px] px-3 py-1 font-mono text-xs font-bold transition-colors select-none',
                activeTab === tab.id
                  ? 'border border-[#0056FF] bg-[#0056FF] text-white'
                  : 'border border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF] hover:bg-[#E3E7FC]',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Primary Interactive Toggle: Loading vs Loaded */}
        <button
          type="button"
          onClick={() => setIsLoaded(!isLoaded)}
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-[4px] border px-4 py-1.5 font-mono text-xs font-bold transition-all active:scale-[0.98]',
            isLoaded
              ? 'border-emerald-300 bg-[#ECFDF5] text-emerald-800 hover:bg-emerald-100'
              : 'border-[#0056FF] bg-[#0056FF] text-white hover:bg-[#2277FF]',
          )}
        >
          <RefreshCw className={cn('size-3.5', !isLoaded && 'animate-spin')} />
          <span>{isLoaded ? 'STATE: LOADED CONTENT' : 'STATE: SKELETON LOADING'}</span>
        </button>
      </div>

      {/* Single Clean Active Pattern Render */}
      <div className="w-full">
        {activeTab === 'grid' && <CardGridPattern isLoaded={isLoaded} />}
        {activeTab === 'profile' && <ProfileHeaderPattern isLoaded={isLoaded} />}
        {activeTab === 'list' && <ContentListPattern isLoaded={isLoaded} />}
      </div>
    </div>
  );
}
