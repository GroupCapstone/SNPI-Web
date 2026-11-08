'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Check, Globe, Database, Terminal } from '@/components/icons';

// 1. Fluid Orb (Luminescent Morphing Gradient Sphere)
export function FluidOrbDemo() {
  const [pulse, setPulse] = React.useState(false);

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="font-sans text-xs font-bold tracking-wider text-slate-800 uppercase">
          Fluid AI Orb
        </span>
        <span className="font-mono text-[10px] font-bold text-[#0056FF]">Real-time Pulse</span>
      </div>

      <div className="flex min-h-[160px] items-center justify-center py-4">
        <button
          type="button"
          onClick={() => setPulse(!pulse)}
          className="group relative flex size-28 items-center justify-center rounded-full focus:outline-none active:scale-95"
        >
          {/* Outer Luminous Glow */}
          <div
            className={cn(
              'absolute inset-0 rounded-full bg-[#0056FF]/20 blur-xl transition-all duration-700',
              pulse ? 'scale-125 opacity-90' : 'animate-pulse',
            )}
          />

          {/* Morphing Inner Sphere */}
          <div className="relative flex size-24 items-center justify-center rounded-full bg-[#0056FF]">
            <div className="flex size-16 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="size-8 text-white" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// 2. Grid Reveal (Matrix Cards with Scanning Beam)
export function GridRevealDemo() {
  const [activeCard, setActiveCard] = React.useState<number | null>(0);
  const cards = [
    { title: 'Autonomous Roster Check', tag: 'Agent 01', speed: '12ms' },
    { title: 'Ledger Hash Proofing', tag: 'Agent 02', speed: '28ms' },
    { title: 'Multi-Branch Sync Gate', tag: 'Agent 03', speed: '19ms' },
    { title: 'Dispute Verification', tag: 'Agent 04', speed: '34ms' },
  ];

  return (
    <div className="w-full max-w-md space-y-3 rounded-2xl border border-[#CAD3F5] bg-white p-4 shadow-none">
      <div className="grid grid-cols-2 gap-2.5">
        {cards.map((card, idx) => {
          const isActive = activeCard === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveCard(idx)}
              className={cn(
                'relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-3.5 text-left transition-all',
                isActive
                  ? 'border-[#0056FF] bg-[#E3E7FC]/40 shadow-none'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300',
              )}
            >
              {/* Scanline Beam on Active */}
              {isActive && <div className="absolute inset-x-0 top-0 h-0.5 bg-[#0056FF]" />}
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span>{card.tag}</span>
                <span className="font-bold text-[#0056FF]">{card.speed}</span>
              </div>
              <h5 className="mt-2 font-sans text-xs font-bold text-slate-900">{card.title}</h5>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// 3. Matrix Orb (Digital Cybernetic Telemetry Orb)
export function MatrixOrbDemo() {
  const [online, setOnline] = React.useState(true);

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-center text-[#09172B] shadow-none">
      <div className="flex min-h-[150px] items-center justify-center py-2">
        <div className="relative flex size-28 items-center justify-center">
          {/* Concentric Rotating Rings */}
          <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-blue-500/40" />
          <div className="animate-reverse-spin absolute inset-2 rounded-full border border-dotted border-cyan-400/50" />

          {/* Central Core */}
          <div className="flex size-16 items-center justify-center">
            <Terminal className="size-7 text-[#0056FF]" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-700">
        <span>Subsystem: Neural Cluster A</span>
        <button
          type="button"
          onClick={() => setOnline(!online)}
          className="cursor-pointer font-bold text-[#0056FF] hover:underline"
        >
          {online ? 'Active' : 'Standby'}
        </button>
      </div>
    </div>
  );
}

// 5. Inline AI Status Pill
export function InlineAiStatusDemo() {
  const [step, setStep] = React.useState(0);
  const statuses = [
    { text: 'Thinking & analyzing query intent...', color: 'bg-blue-500', icon: Sparkles },
    { text: 'Querying 52 MongoDB collections...', color: 'bg-amber-500', icon: Database },
    { text: 'Synthesizing verified institutional audit...', color: 'bg-purple-500', icon: Globe },
    { text: 'Audit verification complete (Exit Code 0)', color: 'bg-emerald-500', icon: Check },
  ];

  const current = statuses[step] || statuses[0]!;

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
      <span className="font-sans text-xs font-bold tracking-wider text-slate-800 uppercase">
        Streaming Agent Status Pill
      </span>

      <div className="flex justify-center py-2">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 shadow-xs transition-all">
          <span className={cn('size-2 rounded-full', current.color)} />
          <span className="font-sans text-xs font-semibold text-slate-800">{current.text}</span>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setStep((step + 1) % statuses.length)}
          className="rounded-full bg-[#0056FF] px-3.5 py-1 font-sans text-xs font-bold text-white hover:bg-blue-700"
        >
          Next Agent State
        </button>
      </div>
    </div>
  );
}
