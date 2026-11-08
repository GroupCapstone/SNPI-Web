'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  Folder,
  FileText,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Volume,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Bookmark,
  Heart,
  Share2,
  Search,
  ThumbsUp,
  ExternalLink,
} from '@/components/icons';
import { TactileFolderShowcase } from '../tactile-folder-showcase';

// ============================================================================
// 0. CONTENT CARD COMPONENT (Content, Educational & Research — NOT Payment)
// ============================================================================

export function ContentCardDemo() {
  const [activeArticleId, setActiveArticleId] = React.useState<
    'consensus' | 'security' | 'gateway'
  >('consensus');
  const [bookmarked, setBookmarked] = React.useState(false);
  const [claps, setClaps] = React.useState(48);
  const [hasClapped, setHasClapped] = React.useState(false);
  const [shareFeedback, setShareFeedback] = React.useState(false);

  const articles = {
    consensus: {
      topic: 'DISTRIBUTED CONSENSUS',
      duration: '5 min read',
      date: 'Oct 2026',
      title: 'Consensus-Driven MongoDB Replica Set Transactions in High-Throughput Monoliths',
      abstract:
        'Detailed architectural benchmark analyzing 47 domain modules under concurrent transaction isolation sessions, zero-leak connection pools, and constant-time HMAC verification across multi-campus branches.',
      author: 'Dr. Sovanarith Keo',
      role: 'Chief Systems Architect · Faculty of ICT',
      initials: 'SK',
      tags: ['MongoDB rs0', 'TypeScript', 'ACID Sessions'],
    },
    security: {
      topic: 'CRYPTOGRAPHIC AUDITING',
      duration: '7 min read',
      date: 'Oct 2026',
      title: 'Zero-Trust Token Hygiene & Timing-Safe RBAC Authorization Contracts',
      abstract:
        'Mathematical formulation of constant-time timingSafeEqual verification, single-source-of-truth permission enforcement in @snp/shared, and automated GitLab CI security bots for enterprise student registrars.',
      author: 'Prof. Kimhorng Heng',
      role: 'Head of Cybersecurity & Cryptography',
      initials: 'KH',
      tags: ['Timing-Safe', 'RBAC Scopes', 'Zero Trust'],
    },
    gateway: {
      topic: 'EDGE COMPUTE',
      duration: '4 min read',
      date: 'Nov 2026',
      title: 'Hybrid Serverless & Long-Running Container Deployment Topologies',
      abstract:
        'Next.js 15 App Router serverless edge routing combined with persistent Docker container backend clusters to deliver sub-10ms response times for nationwide academic institutions.',
      author: 'Dara Sok',
      role: 'Principal Cloud Infrastructure Engineer',
      initials: 'DS',
      tags: ['Next.js 15', 'Docker Monolith', 'Edge Proxy'],
    },
  };

  const article = articles[activeArticleId];

  const handleClap = () => {
    setClaps((prev) => prev + 1);
    setHasClapped(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2000);
  };

  return (
    <div className="w-full max-w-xl space-y-4">
      {/* Category Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-[#F8FAFC] p-2">
        <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
          Select Content Archetype:
        </span>
        <div className="flex items-center gap-1">
          {[
            { id: 'consensus', label: 'Research Paper' },
            { id: 'security', label: 'Security Charter' },
            { id: 'gateway', label: 'Cloud Architecture' },
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActiveArticleId(mode.id as typeof activeArticleId)}
              className={cn(
                'cursor-pointer rounded-md px-2.5 py-1 font-sans text-xs font-bold transition-all active:scale-95',
                activeArticleId === mode.id
                  ? 'border border-[#0056FF] bg-[#0056FF] text-white shadow-2xs'
                  : 'border border-transparent text-slate-600 hover:bg-slate-200/60',
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Production-Grade Content Card Component */}
      <div className="relative overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs transition-all hover:border-[#0056FF]/40 sm:p-6">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
              {article.topic}
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {article.duration} · {article.date}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setBookmarked(!bookmarked)}
            className={cn(
              'flex size-8 cursor-pointer items-center justify-center rounded-lg border transition-all active:scale-95',
              bookmarked
                ? 'border-[#0056FF] bg-[#EFF5FF] text-[#0056FF]'
                : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-700',
            )}
            title={bookmarked ? 'Remove Bookmark' : 'Save to Reading List'}
          >
            <Bookmark className={cn('size-4', bookmarked && 'fill-[#0056FF]')} />
          </button>
        </div>

        {/* Title & Abstract */}
        <h3 className="mt-3.5 font-sans text-base font-black text-[#020617] sm:text-lg">
          {article.title}
        </h3>
        <p className="mt-2 font-sans text-xs leading-relaxed text-slate-600">{article.abstract}</p>

        {/* Technical Topic Badges */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-slate-200/60 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Metadata Row */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#0056FF] font-mono text-xs font-bold text-white shadow-2xs">
              {article.initials}
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold text-[#020617]">{article.author}</h4>
              <p className="font-sans text-[11px] text-slate-500">{article.role}</p>
            </div>
          </div>

          {/* Interactive Claps & Share Bar */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleClap}
              title={`Endorse research paper (${claps} endorsements)`}
              className={cn(
                'flex cursor-pointer items-center gap-1 rounded-md border px-2.5 py-1 font-mono text-xs font-bold transition-all active:scale-95',
                hasClapped
                  ? 'border-rose-200 bg-rose-50 text-rose-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-rose-200 hover:text-rose-600',
              )}
            >
              <Heart className={cn('size-3.5', hasClapped && 'fill-rose-600')} />
              <span>{claps}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-all hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF] active:scale-95"
              title="Copy Article Link"
            >
              {shareFeedback ? (
                <Check className="size-3.5 text-emerald-600" />
              ) : (
                <Share2 className="size-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 1. FOLDER COMPONENT (Tactile 3D Documents Folder Container)
// ============================================================================

export function FolderDemo() {
  const [activeFolderTab, setActiveFolderTab] = React.useState<number>(0);

  const folderCards = [
    {
      id: 'curriculum',
      title: 'Curriculum_Master_Roster_2026.pdf',
      badge: 'VERIFIED',
      description: 'Official academic timetable verified by Central Academic Council.',
      content: (
        <div className="space-y-3 font-sans text-xs text-slate-700">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-mono text-[10px] text-slate-400">DOCUMENT ID</span>
            <span className="font-mono text-[10px] font-bold text-[#0056FF]">DOC-CUR-2026-01</span>
          </div>
          <p className="leading-relaxed">
            Standardized 4-year curriculum frameworks for Software Engineering, Applied AI, and
            Cloud Monolith Infrastructure across all 4 regional campuses.
          </p>
          <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
            <div className="rounded border border-slate-100 bg-slate-50 p-1.5">
              <span className="block text-slate-400">TOTAL CREDITS</span>
              <span className="font-bold text-slate-900">128 Credits</span>
            </div>
            <div className="rounded border border-slate-100 bg-slate-50 p-1.5">
              <span className="block text-slate-400">SEMESTERS</span>
              <span className="font-bold text-slate-900">8 Terms</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tuition',
      title: 'Tuition_Ledger_Reconciliation_Q1.xlsx',
      badge: 'LEDGER READY',
      description: 'Consolidated batch tuition transaction hashes and ledger entries.',
      content: (
        <div className="space-y-3 font-sans text-xs text-slate-700">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-mono text-[10px] text-slate-400">RECONCILIATION</span>
            <span className="font-mono text-[10px] font-bold text-emerald-600">100% MATCH</span>
          </div>
          <p className="leading-relaxed">
            Automated bank statement reconciliation verifying 3,120 student tuition transfers with
            zero discrepancies recorded across Cambodian banking gateways.
          </p>
          <div className="rounded-lg bg-[#EFF5FF] p-2 font-mono text-[10px] text-[#0056FF]">
            SHA-256: 8f9b2c0192a834e7...d2a1
          </div>
        </div>
      ),
    },
    {
      id: 'passbook',
      title: 'Cryptographic_Student_Passbook_STU-0891.json',
      badge: 'HMAC SIGNED',
      description: 'Verifiable student credential ledger with cryptographic seal.',
      content: (
        <div className="space-y-3 font-sans text-xs text-slate-700">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-mono text-[10px] text-slate-400">CREDENTIAL ID</span>
            <span className="font-mono text-[10px] font-bold text-[#0056FF]">STU-2026-0891</span>
          </div>
          <p className="leading-relaxed">
            Immutable academic transcript passbook containing verified grades, department honors,
            and biometric RFID gate access tokens.
          </p>
          <div className="flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 p-1.5 font-mono text-[10px] text-emerald-700">
            <Check className="size-3" />
            <span>Constant-Time Signature Authenticated</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-xl space-y-4">
      {/* Folder Control Strip */}
      <div className="flex items-center justify-between rounded-xl border border-[#CAD3F5] bg-white p-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <Folder className="size-4 text-[#0056FF]" />
          <span className="font-sans text-xs font-bold text-[#020617]">
            Tactile Document Folder
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px]">
          <span className="text-slate-400">Tap cards to bring forward:</span>
          <span className="rounded bg-[#EFF5FF] px-2 py-0.5 font-bold text-[#0056FF]">
            {folderCards.length} Documents
          </span>
        </div>
      </div>

      {/* 3D Tactile Folder Showcase */}
      <TactileFolderShowcase cards={folderCards} initialActiveIndex={activeFolderTab} />
    </div>
  );
}

// 2. Code Block Component
export function CodeBlockDemo() {
  const [copied, setCopied] = React.useState(false);
  const code = `import { DatabasePool } from '@snp/shared';

export const ledgerConfig = {
  replicaSet: 'rs0',
  maxPoolSize: 100,
  timeoutMs: 5000,
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white text-left shadow-none">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded-[3px] bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] font-bold text-slate-700">
            CODE
          </span>
          <span className="font-mono text-[10px] font-bold text-slate-600">ledger.ts</span>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 font-mono text-[10px] text-slate-700 hover:bg-slate-50"
        >
          {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-[#09172B]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// 3. Gravity Letters Component
export function GravityLettersDemo() {
  const [dropped, setDropped] = React.useState(false);
  const letters = 'SNPI-SMS ACADEMICS'.split('');

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="font-sans text-xs font-bold tracking-wider text-slate-800 uppercase">
          Gravity Letters Simulation
        </span>
        <button
          type="button"
          onClick={() => setDropped(!dropped)}
          className="rounded-full bg-[#E3E7FC] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]"
        >
          {dropped ? 'Reset Position' : 'Trigger Gravity'}
        </button>
      </div>

      <div className="flex min-h-[90px] items-center justify-center gap-1 overflow-hidden py-4 select-none">
        {letters.map((char, idx) => {
          const rotation = dropped ? ((idx % 3) - 1) * 14 : 0;
          const dropY = dropped ? 18 + (idx % 4) * 5 : 0;

          return (
            <span
              key={idx}
              className={cn(
                'inline-block font-sans text-xl font-black text-[#0056FF] transition-all duration-300 sm:text-2xl',
                char === ' ' ? 'w-2' : '',
              )}
              style={{
                transform: `translateY(${dropY}px) rotate(${rotation}deg)`,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      <p className="font-sans text-xs text-slate-500">
        Simulates physics-based Newtonian drop and ground bounce on typography.
      </p>
    </div>
  );
}

// 5. Step Player Component with Animated Line Loading Connection & Step-to-Step Transitions
export function StepPlayerDemo() {
  const [currentStep, setCurrentStep] = React.useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(false);

  const steps = [
    {
      title: 'Data Intake',
      desc: 'Ingesting and validating payload schema structure',
    },
    {
      title: 'Verify Roles',
      desc: 'Evaluating multi-tenant RBAC permissions and scopes',
    },
    {
      title: 'Commit Ledger',
      desc: 'Writing immutable transaction to replica set cluster',
    },
    {
      title: 'Dispatch Notice',
      desc: 'Broadcasting real-time event notice to institutional nodes',
    },
  ];

  // Auto-play timer for demonstrating automated step-to-step connection loading
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : 1));
    }, 2200);
    return () => clearInterval(timer);
  }, [isAutoPlaying, steps.length]);

  return (
    <div className="w-full max-w-lg space-y-4 rounded-[4px] border border-[#CAD3F5] bg-white p-5 shadow-2xs sm:p-6">
      {/* Header with Progress Tracker and Auto-play Toggle */}
      <div className="flex items-center justify-between border-b border-[#CAD3F5]/60 pb-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider text-slate-500 uppercase">PROGRESS:</span>
          <span className="rounded-[2px] border border-[#CAD3F5] bg-[#E3E7FC] px-1.5 py-0.5 font-bold text-[#0056FF]">
            Step {currentStep} of {steps.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsAutoPlaying((prev) => !prev)}
          className={cn(
            'flex cursor-pointer items-center gap-1.5 rounded-[2px] border px-2 py-0.5 font-sans text-[11px] font-semibold transition-colors',
            isAutoPlaying
              ? 'border-[#0056FF] bg-[#0056FF] text-white'
              : 'border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF] hover:bg-[#E3E7FC]',
          )}
        >
          {isAutoPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
          <span>{isAutoPlaying ? 'Pause' : 'Auto Play'}</span>
        </button>
      </div>

      {/* Stepper Track: Nodes + Animated Connection Lines */}
      <div className="py-2">
        <div className="flex items-center justify-between">
          {steps.map((_, idx) => {
            const stepNum = idx + 1;
            const isDone = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <React.Fragment key={idx}>
                {/* Step Node Circle with Spring Pop Animation */}
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep(stepNum)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'relative z-10 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full font-mono text-xs font-bold transition-all select-none',
                    isDone && 'bg-[#0056FF] text-white shadow-2xs',
                    isCurrent &&
                      'border-2 border-[#0056FF] bg-[#0056FF] text-white shadow-xs ring-4 ring-[#0056FF]/20',
                    !isDone &&
                      !isCurrent &&
                      'border border-[#CAD3F5] bg-[#EFF5FF] text-slate-400 hover:border-[#0056FF] hover:text-[#0056FF]',
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isDone ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                      >
                        <Check className="size-3.5 stroke-[2.5]" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="num"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      >
                        {stepNum}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Animated Line Loading Connection between Steps */}
                {idx < steps.length - 1 && (
                  <div className="relative mx-1.5 h-[3px] flex-1 overflow-hidden rounded-full bg-[#E3E7FC]">
                    {/* Background Filled Line */}
                    <motion.div
                      className="h-full bg-[#0056FF]"
                      initial={false}
                      animate={{
                        width: stepNum < currentStep ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                    {/* Animated Connection Loading Beam */}
                    {stepNum === currentStep - 1 && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2277FF] to-transparent opacity-90"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Titles Grid Aligned Directly Under Nodes */}
        <div className="mt-2.5 grid grid-cols-4 gap-2 text-center">
          {steps.map((st, idx) => {
            const stepNum = idx + 1;
            const isDone = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStep(stepNum)}
                className="cursor-pointer text-center select-none"
              >
                <span
                  className={cn(
                    'block truncate font-sans text-[11px] transition-colors',
                    isCurrent && 'font-bold text-[#020617]',
                    isDone && 'font-medium text-[#0056FF]',
                    !isDone && !isCurrent && 'font-normal text-slate-400',
                  )}
                >
                  {st.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Card with Step-to-Step Slide & Fade Animation */}
      <div className="rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF]/40 p-3.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
            Active Workflow Phase
          </span>
          <span className="rounded-[2px] border border-[#CAD3F5] bg-white px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#020617]">
            Phase 0{currentStep} / 0{steps.length}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mt-1.5"
          >
            <h4 className="font-sans text-xs font-bold text-[#020617]">
              {steps[currentStep - 1].title}
            </h4>
            <p className="mt-0.5 font-sans text-[11px] text-[#334155]">
              {steps[currentStep - 1].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons: Previous, Reset, Next Step */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          className={cn(
            'cursor-pointer rounded-[4px] border px-3 py-1.5 font-sans text-xs font-semibold transition-colors select-none',
            currentStep === 1
              ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
              : 'border-[#CAD3F5] bg-white text-[#020617] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
          )}
        >
          Previous
        </button>

        <div className="flex items-center gap-2">
          {currentStep === steps.length && (
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex cursor-pointer items-center gap-1 rounded-[4px] border border-[#CAD3F5] bg-white px-3 py-1.5 font-sans text-xs font-semibold text-[#0056FF] transition-colors hover:bg-[#EFF5FF]"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            disabled={currentStep === steps.length}
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            className={cn(
              'cursor-pointer rounded-[4px] px-4 py-1.5 font-sans text-xs font-bold text-white transition-colors select-none',
              currentStep === steps.length
                ? 'cursor-not-allowed bg-slate-300'
                : 'bg-[#0056FF] hover:bg-[#2277FF] active:bg-[#0047D4]',
            )}
          >
            {currentStep === steps.length ? 'Completed' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}

// 6. Animated Counter (Odometer Roll Simulation)
export function AnimatedCounterDemo() {
  const [count, setCount] = React.useState(12840);

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-center shadow-xs">
      <div className="py-2">
        <span className="font-mono text-4xl font-black tracking-tight text-[#0056FF] sm:text-5xl">
          {count.toLocaleString()}
        </span>
        <span className="mt-1 block font-sans text-xs text-slate-500">
          Total Validated Enrolled Students
        </span>
      </div>

      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setCount(count + 250)}
          className="rounded-[4px] border-0 bg-[#0056FF] px-3.5 py-1.5 font-sans text-xs font-bold text-white hover:bg-blue-700"
        >
          +250 Students
        </button>
        <button
          type="button"
          onClick={() => setCount(12840)}
          className="rounded-[4px] border border-slate-200 px-3 py-1.5 font-sans text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// 7. Voice Note Audio Waveform Player (Real Web Audio Synthesis & Live Waveform Analyser)
export function VoiceNoteDemo() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState<number>(1);
  const [currentTime, setCurrentTime] = React.useState(0);
  const duration = 12; // 12-second voice memo
  const [liveFrequencies, setLiveFrequencies] = React.useState<number[]>(() =>
    new Array(32).fill(0),
  );

  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const sourceRef = React.useRef<AudioBufferSourceNode | null>(null);
  const bufferRef = React.useRef<AudioBuffer | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const gainNodeRef = React.useRef<GainNode | null>(null);
  const startTimeRef = React.useRef<number>(0);
  const startOffsetRef = React.useRef<number>(0);
  const animFrameRef = React.useRef<number | null>(null);

  // Pre-computed authentic speech energy distribution across 32 bars
  const baseProfile = React.useMemo(
    () => [
      26, 38, 54, 78, 92, 68, 44, 82, 96, 74, 52, 86, 60, 36, 68, 88, 76, 48, 80, 94, 62, 42, 70,
      84, 58, 38, 64, 78, 52, 34, 28, 20,
    ],
    [],
  );

  // Synthesize realistic speech-cadence voice note buffer
  const getOrCreateBuffer = (ctx: AudioContext): AudioBuffer => {
    if (bufferRef.current) return bufferRef.current;
    const sampleRate = ctx.sampleRate;
    const buf = ctx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
    const channel = buf.getChannelData(0);

    for (let i = 0; i < channel.length; i++) {
      const t = i / sampleRate;

      // Conversational speech cadence pauses (bursts of voice separated by natural pauses)
      const cadence = Math.sin(t * 2.4) * Math.sin(t * 0.9);
      const speechGate = cadence > -0.2 ? 1 : 0.06;

      // Natural speech pitch contour (fundamental ~180-210 Hz with expressive inflection)
      const pitch = 192 + Math.sin(t * 4.2) * 22 + Math.sin(t * 8.6) * 9;

      // Vocal harmonics (resonant speech formants)
      const f1 = Math.sin(2 * Math.PI * pitch * t);
      const f2 = 0.45 * Math.sin(2 * Math.PI * (2 * pitch) * t);
      const f3 = 0.22 * Math.sin(2 * Math.PI * (3 * pitch) * t);
      const formant = 0.18 * Math.sin(2 * Math.PI * 720 * t) * Math.cos(2 * Math.PI * 1400 * t);

      // Smooth attack/decay envelope
      const env = Math.min(1, t * 6) * Math.min(1, (duration - t) * 3);
      channel[i] = (f1 + f2 + f3 + formant) * speechGate * env * 0.14;
    }

    bufferRef.current = buf;
    return buf;
  };

  const startPlayback = async (offsetSec: number) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      if (sourceRef.current) {
        sourceRef.current.onended = null;
        try {
          sourceRef.current.stop();
        } catch {
          // ignore
        }
      }

      if (!analyserRef.current) {
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64; // 32 frequency bins
        analyser.smoothingTimeConstant = 0.75;
        analyserRef.current = analyser;
      }

      if (!gainNodeRef.current) {
        const gain = ctx.createGain();
        gain.gain.value = 0.85;
        gain.connect(ctx.destination);
        gainNodeRef.current = gain;
      }

      const buffer = getOrCreateBuffer(ctx);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = speed;

      source.connect(analyserRef.current);
      analyserRef.current.connect(gainNodeRef.current);

      const clampedOffset = Math.max(0, Math.min(duration, offsetSec));
      source.start(0, clampedOffset);
      sourceRef.current = source;
      startTimeRef.current = ctx.currentTime;
      startOffsetRef.current = clampedOffset;
      setIsPlaying(true);

      source.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        startOffsetRef.current = 0;
        setLiveFrequencies(new Array(32).fill(0));
      };

      const updateLoop = () => {
        if (!analyserRef.current || !audioCtxRef.current) return;
        const elapsed = (ctx.currentTime - startTimeRef.current) * speed + startOffsetRef.current;
        if (elapsed >= duration) {
          setCurrentTime(duration);
          setIsPlaying(false);
          startOffsetRef.current = 0;
          setLiveFrequencies(new Array(32).fill(0));
          return;
        }

        setCurrentTime(elapsed);

        // Read real-time frequency amplitude from AnalyserNode
        const dataArr = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArr);
        setLiveFrequencies(Array.from(dataArr));

        animFrameRef.current = requestAnimationFrame(updateLoop);
      };

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(updateLoop);
    } catch {
      // Audio autoplay gracefully handled
    }
  };

  const pausePlayback = () => {
    if (sourceRef.current) {
      sourceRef.current.onended = null;
      try {
        sourceRef.current.stop();
      } catch {
        // ignore
      }
      sourceRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    startOffsetRef.current = currentTime;
    setIsPlaying(false);
    setLiveFrequencies(new Array(32).fill(0));
  };

  const togglePlay = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback(currentTime >= duration ? 0 : currentTime);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = ratio * duration;
    setCurrentTime(targetTime);
    startOffsetRef.current = targetTime;

    if (isPlaying) {
      startPlayback(targetTime);
    }
  };

  const handleToggleSpeed = () => {
    const speeds = [1, 1.5, 2];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setSpeed(nextSpeed);
    if (sourceRef.current) {
      sourceRef.current.playbackRate.value = nextSpeed;
    }
  };

  React.useEffect(() => {
    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const progressPercent = Math.min(100, (currentTime / duration) * 100);

  return (
    <div className="w-full max-w-md rounded-[4px] border border-[#CAD3F5] bg-white p-4 shadow-2xs">
      {/* Clean Header: Icon, Title & Time */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF]">
            <Volume className="size-4 stroke-[2]" />
          </div>
          <div>
            <h4 className="font-sans text-xs font-bold text-[#020617]">Voice Note</h4>
            <span className="font-mono text-[10px] text-slate-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Speed Multiplier Pill */}
        <button
          type="button"
          onClick={handleToggleSpeed}
          className="cursor-pointer rounded-[2px] border border-[#CAD3F5] bg-[#EFF5FF]/60 px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF] transition-colors hover:bg-[#E3E7FC]"
        >
          {speed}x
        </button>
      </div>

      {/* Main Waveform Player Row */}
      <div className="mt-3.5 flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-[#0056FF] text-white shadow-2xs transition-colors hover:bg-[#2277FF] active:bg-[#0047D4]"
          aria-label={isPlaying ? 'Pause voice memo' : 'Play voice memo'}
        >
          {isPlaying ? <Pause className="size-4.5" /> : <Play className="ml-0.5 size-4.5" />}
        </button>

        {/* Real Interactive Waveform (Live Frequency Reactive & Scrubbable) */}
        <div
          onClick={handleSeek}
          className="relative flex h-12 flex-1 cursor-pointer items-center justify-between gap-1 overflow-hidden px-1 select-none"
          title="Click to seek"
        >
          {baseProfile.map((baseH, i) => {
            const barProgress = (i / baseProfile.length) * 100;
            const isPast = barProgress <= progressPercent;
            // Real frequency amplitude from Web Audio AnalyserNode
            const freqVal = liveFrequencies[i] || 0;
            const dynamicScale = isPlaying ? 0.75 + (freqVal / 255) * 0.65 : 1;
            const barHeight = Math.min(96, Math.max(16, Math.round(baseH * dynamicScale)));

            return (
              <div
                key={i}
                className={cn(
                  'w-1.5 rounded-full transition-all duration-75',
                  isPast ? 'bg-[#0056FF]' : 'bg-[#CAD3F5] hover:bg-[#2277FF]',
                )}
                style={{
                  height: `${barHeight}%`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 8. FAQ Accordion Component (Interactive Institutional Knowledge Hub)
export function FaqDemo() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<
    'All' | 'Architecture' | 'Security' | 'Deployment'
  >('All');
  const [helpfulFeedback, setHelpfulFeedback] = React.useState<Record<number, boolean>>({});

  const faqs = [
    {
      id: 0,
      category: 'Architecture',
      q: 'How does the modular monolith preserve tenant isolation?',
      a: 'Every Mongoose schema automatically enforces mandatory schoolId and branchId filters on all reads, updates, and ACID transactions. Express middleware guarantees client-supplied scopes are never trusted.',
    },
    {
      id: 1,
      category: 'Security',
      q: 'Are permissions enforced client-side or server-side?',
      a: 'All RBAC scopes are strictly verified server-side inside Express middleware against @snp/shared contracts using constant-time crypto.timingSafeEqual comparison for token hashes.',
    },
    {
      id: 2,
      category: 'Deployment',
      q: 'How do responsive device previews work in this library?',
      a: 'The Phone and Web toggles adjust the preview viewport container in real-time with CSS container queries without modifying application code or affecting live production routes.',
    },
    {
      id: 3,
      category: 'Architecture',
      q: 'Why are all UI components built developer-library first?',
      a: 'Per repository policy, all new components, dark modes, and designs are built and demoed in the developer portal (/document/design-system) first. They are never injected into the real dashboard without explicit user commands.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-xl space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs sm:p-6">
      {/* Search & Filter Header */}
      <div className="space-y-3 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <h4 className="font-sans text-xs font-bold text-[#020617]">
            Institutional Knowledge FAQ
          </h4>
          <span className="font-mono text-[10px] text-slate-400">
            {filteredFaqs.length} Questions Found
          </span>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute top-3.5 left-3 size-4 text-[#0056FF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search architectural questions or security rules..."
            className="h-11 w-full rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] py-2 pr-3 pl-10 font-sans text-sm text-[#020617] transition-colors outline-none placeholder:text-[#0056FF]/60 hover:border-[#2277FF] focus:border-[#0056FF] focus:bg-white focus:ring-2 focus:ring-[#0056FF]/20"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(['All', 'Architecture', 'Security', 'Deployment'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'cursor-pointer rounded-md px-2.5 py-1 font-mono text-[10px] font-bold transition-all active:scale-95',
                activeCategory === cat
                  ? 'border border-[#0056FF] bg-[#0056FF] text-white shadow-2xs'
                  : 'border border-slate-200 bg-slate-50 text-slate-600 hover:border-[#CAD3F5] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-2.5">
        {filteredFaqs.length === 0 ? (
          <div className="py-8 text-center font-mono text-xs text-slate-400">
            No matching FAQ entries found for &quot;{searchQuery}&quot;.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openIdx === faq.id;
            return (
              <div
                key={faq.id}
                className={cn(
                  'overflow-hidden rounded-xl border transition-all duration-200',
                  isOpen
                    ? 'border-[#0056FF] bg-[#EFF5FF]/30 shadow-2xs'
                    : 'border-slate-200 bg-white hover:border-[#CAD3F5]',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : faq.id)}
                  className="flex w-full cursor-pointer items-center justify-between p-3.5 text-left transition-colors"
                >
                  <div className="flex items-center gap-2 pr-2">
                    <span className="rounded border border-slate-200/60 bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#0056FF] uppercase">
                      {faq.category}
                    </span>
                    <span className="font-sans text-xs font-bold text-[#020617]">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'size-4 shrink-0 transition-transform duration-200',
                      isOpen ? 'rotate-180 text-[#0056FF]' : 'text-slate-400',
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="animate-in fade-in border-t border-slate-100 bg-white p-4 font-sans text-xs leading-relaxed text-slate-700">
                    <p>{faq.a}</p>

                    {/* Helpful Vote Buttons */}
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="font-mono text-[10px] text-slate-400">
                        Was this explanation helpful?
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setHelpfulFeedback({ ...helpfulFeedback, [faq.id]: true })}
                          className={cn(
                            'cursor-pointer rounded px-2 py-0.5 font-mono text-[10px] font-bold transition-all',
                            helpfulFeedback[faq.id]
                              ? 'border border-emerald-300 bg-emerald-50 text-emerald-700'
                              : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100',
                          )}
                        >
                          {helpfulFeedback[faq.id] ? 'Thank You!' : 'Yes'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
