'use client';

import * as React from 'react';
import {
  Layers,
  Sparkles,
  Check,
  Copy,
  ChevronRight,
  Sliders,
  Shield,
  BookOpen,
  AppWindow,
  RotateCw,
} from '@/components/icons';
import { cn } from '@/lib/utils';

export interface PsychologicalLawRule {
  id: 'fitts' | 'hicks' | 'millers' | 'doherty' | 'postels' | 'culinary';
  name: string;
  scientist: string;
  year: string;
  mathFormula?: string;
  coreConcept: string;
  agentDesignRule: string;
  metricThreshold: string;
  testEvaluation: (params: AuditParams) => { passed: boolean; scoreText: string; advice: string };
}

export interface AuditParams {
  touchTargetPx: number;
  visibleOptionsCount: number;
  chunkedGroupSize: number;
  feedbackLatencyMs: number;
  inputToleranceActive: boolean;
  culinaryTier: 'ingredients' | 'recipes' | 'entrees' | 'templates' | 'pages' | 'cookbook';
}

export const PSYCHOLOGICAL_LAW_RULES: PsychologicalLawRule[] = [
  {
    id: 'fitts',
    name: "Fitts's Law",
    scientist: 'Paul Fitts',
    year: '1954',
    mathFormula: 'T = a + b * log2(2D / W)',
    coreConcept:
      'The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target.',
    agentDesignRule:
      'All interactive elements must possess an effective hit target >= 44x44px (using ::before hit expansion for compact icons <= 24px) and provide 100ms temporal coyote time on boundary exits.',
    metricThreshold: 'Target Width >= 44px',
    testEvaluation: (params) => {
      const passed = params.touchTargetPx >= 44;
      return {
        passed,
        scoreText: `${params.touchTargetPx}px touch target`,
        advice: passed
          ? 'Meets WCAG 2.1 AAA and Apple HIG spatial acquisition standards.'
          : 'Target too small (<44px). Add relative positioning and ::before expansion.',
      };
    },
  },
  {
    id: 'hicks',
    name: "Hick's Law",
    scientist: 'William Edmund Hick & Ray Hyman',
    year: '1952',
    mathFormula: 'T = b * log2(n + 1)',
    coreConcept:
      'The time it takes to make a decision increases logarithmically as the number of choices increases.',
    agentDesignRule:
      'Never overwhelm users with uncurated choices. Enforce progressive disclosure: surface <= 5 primary actions per tier and defer secondary options behind searchable pickers or expandable drawers.',
    metricThreshold: 'Visible Choices <= 5',
    testEvaluation: (params) => {
      const passed = params.visibleOptionsCount <= 5;
      return {
        passed,
        scoreText: `${params.visibleOptionsCount} visible options`,
        advice: passed
          ? 'Optimal decision velocity. Users maintain rapid cognitive throughput.'
          : 'High cognitive friction (>5 options). Introduce search filtering or progressive disclosure.',
      };
    },
  },
  {
    id: 'millers',
    name: "Miller's Law",
    scientist: 'George A. Miller',
    year: '1956',
    mathFormula: 'Capacity = 7 ± 2 chunks',
    coreConcept:
      'The average person can only keep 7 (plus or minus 2) items in their working memory simultaneously.',
    agentDesignRule:
      'Group dense records, forms, and tables into semantic visual cards containing <= 5 fields per section. Segment long numeric identifiers (phones, payment cards, student IDs) with hyphens or spaces.',
    metricThreshold: 'Chunked Items <= 5 per section',
    testEvaluation: (params) => {
      const passed = params.chunkedGroupSize <= 5;
      return {
        passed,
        scoreText: `${params.chunkedGroupSize} fields per card`,
        advice: passed
          ? 'Working memory load respected. Information easily scanned and retained.'
          : 'Cognitive overload (>5 fields). Segment form fields into modular titled sub-cards.',
      };
    },
  },
  {
    id: 'doherty',
    name: 'Doherty Threshold',
    scientist: 'Walter J. Doherty & Ahrvid Thadhani',
    year: '1979',
    mathFormula: 'Interaction Response <= 400ms',
    coreConcept:
      'Computer and human productivity increases dramatically when interaction pace is sustained at <= 400ms, preserving flow state.',
    agentDesignRule:
      'Provide immediate tactile pointerdown feedback (scale 0.96) within <100ms. For operations requiring >400ms, immediately display animated skeleton shimmers and optimistic UI updates.',
    metricThreshold: 'Feedback Latency <= 400ms',
    testEvaluation: (params) => {
      const passed = params.feedbackLatencyMs <= 400;
      return {
        passed,
        scoreText: `${params.feedbackLatencyMs}ms system response`,
        advice: passed
          ? 'Flow state preserved. User perceives instantaneous physical parity.'
          : 'Cognitive lag detected (>400ms). Implement client optimistic UI and skeleton shimmers.',
      };
    },
  },
  {
    id: 'postels',
    name: "Postel's Law (Robustness Principle)",
    scientist: 'Jon Postel',
    year: '1981',
    mathFormula: 'Liberal Acceptance, Strict Transmission',
    coreConcept:
      'Be conservative in what you send, be liberal in what you accept in human-computer data entry.',
    agentDesignRule:
      'Inputs must accept varied human representations (e.g. date strings, unformatted phone numbers, informal search queries) and normalize internally before dispatching strict ISO/E.164 models to APIs.',
    metricThreshold: 'Input Tolerance Active',
    testEvaluation: (params) => {
      const passed = params.inputToleranceActive;
      return {
        passed,
        scoreText: passed ? 'Forgiving normalization active' : 'Strict regex rejection only',
        advice: passed
          ? 'Robust user tolerance. User intent is parsed without frustrating validation friction.'
          : 'High user error rate. Replace strict regex blocking with permissive input normalizers.',
      };
    },
  },
  {
    id: 'culinary',
    name: 'Culinary Component Hierarchy Rule',
    scientist: 'Brad Frost & Dan Mall (Adapted for SNP-SMS)',
    year: '2026',
    mathFormula: 'Downward Dependency Invariant',
    coreConcept:
      'Components must follow a strict one-way downward composition hierarchy from Ingredients to Cookbook, preventing circular dependencies and architectural bloat.',
    agentDesignRule:
      'Strictly respect the 6 tiers: Ingredients (Tokens) -> Recipes (Atoms) -> Entrees (Organisms) -> Templates (Scaffolds) -> Pages (Real Views) -> Cookbook (Governance). Higher tiers may import lower tiers; lower tiers MUST NEVER import higher tiers.',
    metricThreshold: 'One-Way Downward Dependency',
    testEvaluation: (params) => {
      const tierRank: Record<AuditParams['culinaryTier'], number> = {
        ingredients: 1,
        recipes: 2,
        entrees: 3,
        templates: 4,
        pages: 5,
        cookbook: 6,
      };
      const rank = tierRank[params.culinaryTier];
      return {
        passed: true,
        scoreText: `Tier 0${rank}: ${params.culinaryTier.toUpperCase()}`,
        advice: `Tier 0${rank} can safely import Tiers 01 through 0${Math.max(1, rank - 1)}. Never import upward.`,
      };
    },
  },
];

export function PsychologicalRuleInspector() {
  const [params, setParams] = React.useState<AuditParams>({
    touchTargetPx: 48,
    visibleOptionsCount: 4,
    chunkedGroupSize: 4,
    feedbackLatencyMs: 180,
    inputToleranceActive: true,
    culinaryTier: 'recipes',
  });

  const [activeLawId, setActiveLawId] = React.useState<PsychologicalLawRule['id']>('fitts');
  const [copiedPrompt, setCopiedPrompt] = React.useState<boolean>(false);

  const activeLaw =
    PSYCHOLOGICAL_LAW_RULES.find((l) => l.id === activeLawId) || PSYCHOLOGICAL_LAW_RULES[0];

  const evaluations = React.useMemo(() => {
    return PSYCHOLOGICAL_LAW_RULES.map((law) => ({
      law,
      result: law.testEvaluation(params),
    }));
  }, [params]);

  const passedCount = evaluations.filter((e) => e.result.passed).length;
  const totalCount = evaluations.length;
  const compliancePercentage = Math.round((passedCount / totalCount) * 100);

  const generatedAgentSkillRule = React.useMemo(() => {
    return `### Mandatory AI Agent Skill Rule: Cognitive Psychology & Component Architecture
As an AI coding agent pair-programming on SNP-SMS, you MUST ALWAYS obey the following psychological invariants when designing or implementing user interfaces:

1. FITTS'S LAW (SPATIAL & TEMPORAL ACQUISITION):
   - Touch targets must measure >= 44x44px. For compact icon buttons (<= 24px), expand hit areas via \`::before\` absolute pseudo-elements.
   - Maintain 100ms temporal coyote time on cursor leave boundaries to prevent unintended menu dismissal.

2. HICK'S LAW (COGNITIVE DECISION VELOCITY):
   - Surface <= 5 primary visible actions or options per tier.
   - Employ progressive disclosure: defer secondary configurations behind search fields, expandable drawers, or segmented tabs.

3. MILLER'S LAW (WORKING MEMORY CHUNKING):
   - Group dense forms and ledgers into titled visual cards containing <= 5 fields per section.
   - Chunk identifiers (phones, payment cards, national IDs) into 3-4 character clusters with spaces or hyphens.

4. DOHERTY THRESHOLD (PERCEIVED VELOCITY PARITY):
   - Maintain <= 400ms feedback cycles. Trigger instant active press feedback (scale 0.96) on pointerdown.
   - Display optimistic UI state updates and skeleton shimmers for asynchronous operations requiring > 400ms.

5. POSTEL'S LAW (ROBUSTNESS PRINCIPLE IN INPUTS):
   - Liberal acceptance: Parse loose human formats (dates, phone numbers, search keywords).
   - Strict transmission: Normalize internally to standard ISO/E.164 structures before network dispatch.

6. CULINARY HIERARCHY RULE (ONE-WAY DOWNWARD IMPORTS):
   - Obey the 6-tier architecture: Ingredients (Tokens) -> Recipes (Atoms) -> Entrees (Organisms) -> Templates (Scaffolds) -> Pages (Views) -> Cookbook (Governance).
   - Never import upward. Atomic recipes and entrees must remain presentationally pure and driven by props.

Target Component Tier: ${params.culinaryTier.toUpperCase()}
Audited Touch Target: ${params.touchTargetPx}px
Audited Option Density: ${params.visibleOptionsCount} visible items
Audited Chunking Size: ${params.chunkedGroupSize} fields/card`;
  }, [params]);

  const handleCopyPrompt = async () => {
    if (typeof window === 'undefined') return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(generatedAgentSkillRule);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handleResetDefaults = () => {
    setParams({
      touchTargetPx: 48,
      visibleOptionsCount: 4,
      chunkedGroupSize: 4,
      feedbackLatencyMs: 180,
      inputToleranceActive: true,
      culinaryTier: 'recipes',
    });
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER BANNER & COMPLIANCE SCORE                           */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#CAD3F5] bg-gradient-to-br from-white via-[#F8FAFC] to-[#EFF5FF] p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#0056FF] text-white shadow-2xs">
              <Shield className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-wider text-[#0056FF] uppercase">
                  Cognitive Psychology Engine
                </span>
                <span className="rounded-md border border-[#0056FF]/30 bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                  AI Agent Skill Enforcement
                </span>
              </div>
              <h2 className="mt-0.5 font-sans text-xl font-black text-[#020617] sm:text-2xl">
                Real-Time Psychological Design Rule Inspector
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#CAD3F5] bg-white px-3 py-1.5 shadow-2xs">
              <span className="font-mono text-xs font-bold text-slate-500">Compliance:</span>
              <span
                className={cn(
                  'font-mono text-sm font-black',
                  compliancePercentage >= 80 ? 'text-emerald-600' : 'text-amber-600',
                )}
              >
                {compliancePercentage}% ({passedCount}/{totalCount})
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#CAD3F5] bg-white px-3 py-1.5 font-sans text-xs font-bold text-slate-700 shadow-2xs hover:border-[#0056FF] hover:text-[#0056FF]"
            >
              <RotateCw className="size-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <p className="font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
          This real-time inspector bridges foundational human-computer interaction (HCI) psychology
          with production engineering. Any AI agent or engineer creating new components or views in
          SNP-SMS must evaluate designs against these 6 invariants before implementation.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. REAL-TIME AUDIT CONTROLS & LIVE EVALUATION STRIP          */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left Column: Interactive Audit Sliders (5 cols) */}
        <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs lg:col-span-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-sans text-xs font-black tracking-wide text-[#020617] uppercase">
              Interactive Component Parameters
            </span>
            <span className="font-mono text-[10px] text-slate-400">Live Simulator</span>
          </div>

          {/* Slider 1: Fitts's Law Touch Target */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-sans font-bold text-[#020617]">Touch Target Dimension:</span>
              <span className="font-mono font-bold text-[#0056FF]">{params.touchTargetPx}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="64"
              step="2"
              value={params.touchTargetPx}
              onChange={(e) =>
                setParams((prev) => ({ ...prev, touchTargetPx: Number(e.target.value) }))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-[#0056FF]"
            />
            <div className="flex justify-between font-mono text-[9px] text-slate-400">
              <span>20px (Inaccessible)</span>
              <span>44px (Standard)</span>
              <span>64px (Spacious)</span>
            </div>
          </div>

          {/* Slider 2: Hick's Law Options Count */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-sans font-bold text-[#020617]">Visible Choices per Tier:</span>
              <span className="font-mono font-bold text-[#0056FF]">
                {params.visibleOptionsCount} options
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="16"
              step="1"
              value={params.visibleOptionsCount}
              onChange={(e) =>
                setParams((prev) => ({ ...prev, visibleOptionsCount: Number(e.target.value) }))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-[#0056FF]"
            />
            <div className="flex justify-between font-mono text-[9px] text-slate-400">
              <span>2 choices</span>
              <span>5 choices (Optimal)</span>
              <span>16 choices (Fatigue)</span>
            </div>
          </div>

          {/* Slider 3: Miller's Law Chunking Size */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-sans font-bold text-[#020617]">Fields per Card / Chunk:</span>
              <span className="font-mono font-bold text-[#0056FF]">
                {params.chunkedGroupSize} fields
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              step="1"
              value={params.chunkedGroupSize}
              onChange={(e) =>
                setParams((prev) => ({ ...prev, chunkedGroupSize: Number(e.target.value) }))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-[#0056FF]"
            />
            <div className="flex justify-between font-mono text-[9px] text-slate-400">
              <span>2 fields</span>
              <span>5 fields (Miller Ceiling)</span>
              <span>12 fields (Overload)</span>
            </div>
          </div>

          {/* Slider 4: Doherty Threshold Latency */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-sans font-bold text-[#020617]">Perceived System Response:</span>
              <span className="font-mono font-bold text-[#0056FF]">
                {params.feedbackLatencyMs}ms
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="1200"
              step="50"
              value={params.feedbackLatencyMs}
              onChange={(e) =>
                setParams((prev) => ({ ...prev, feedbackLatencyMs: Number(e.target.value) }))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-[#0056FF]"
            />
            <div className="flex justify-between font-mono text-[9px] text-slate-400">
              <span>50ms (Physical)</span>
              <span>400ms (Flow Threshold)</span>
              <span>1200ms (Lag)</span>
            </div>
          </div>

          {/* Toggle: Postel's Law Permissive Normalization */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#F8FAFC] p-3 pt-2">
            <div>
              <span className="block font-sans text-xs font-bold text-[#020617]">
                Postel Normalization:
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                Liberal input parsing &amp; format auto-fix
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                setParams((prev) => ({
                  ...prev,
                  inputToleranceActive: !prev.inputToleranceActive,
                }))
              }
              className={cn(
                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                params.inputToleranceActive ? 'bg-[#0056FF]' : 'bg-slate-300',
              )}
            >
              <span
                className={cn(
                  'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                  params.inputToleranceActive ? 'translate-x-5' : 'translate-x-0',
                )}
              />
            </button>
          </div>

          {/* Selector: Culinary Tier Selection */}
          <div className="space-y-1.5 pt-2">
            <span className="font-sans text-xs font-bold text-[#020617]">
              Target Component Tier:
            </span>
            <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
              {(
                ['ingredients', 'recipes', 'entrees', 'templates', 'pages', 'cookbook'] as const
              ).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setParams((prev) => ({ ...prev, culinaryTier: tier }))}
                  className={cn(
                    'cursor-pointer rounded-lg border px-2 py-1.5 font-bold uppercase transition-all',
                    params.culinaryTier === tier
                      ? 'border-[#0056FF] bg-[#EFF5FF] text-[#0056FF]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                  )}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Compliance Evaluation Cards (7 cols) */}
        <div className="space-y-3 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-sans text-xs font-black tracking-wide text-[#020617] uppercase">
              Psychological Invariant Checklist (Real-Time Evaluation)
            </span>
            <span className="font-mono text-[10px] text-slate-500">Live Engine</span>
          </div>

          <div className="space-y-2">
            {evaluations.map(({ law, result }) => {
              const isSelected = activeLawId === law.id;

              return (
                <div
                  key={law.id}
                  onClick={() => setActiveLawId(law.id)}
                  className={cn(
                    'group flex cursor-pointer flex-col gap-2 rounded-xl border p-3.5 transition-all',
                    isSelected
                      ? 'border-[#0056FF] bg-[#EFF5FF]/60 shadow-xs ring-2 ring-[#0056FF]/20'
                      : 'border-[#CAD3F5] bg-white hover:bg-[#F8FAFC]',
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-black',
                          result.passed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800',
                        )}
                      >
                        {result.passed ? '✓' : '!'}
                      </span>
                      <span className="font-sans text-xs font-bold text-[#020617] group-hover:text-[#0056FF]">
                        {law.name}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        ({law.scientist}, {law.year})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-500">
                        {result.scoreText}
                      </span>
                      <span
                        className={cn(
                          'py-0.2 rounded-md px-1.5 font-mono text-[9px] font-bold uppercase',
                          result.passed
                            ? 'border border-emerald-300 bg-emerald-50 text-emerald-700'
                            : 'border border-rose-300 bg-rose-50 text-rose-700',
                        )}
                      >
                        {result.passed ? 'Compliant' : 'Violation'}
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-xs leading-snug text-slate-600">{result.advice}</p>

                  {/* Math Formula & Rule Callout */}
                  {isSelected && (
                    <div className="mt-1 space-y-1.5 rounded-lg border border-blue-200 bg-white p-2.5 font-mono text-[10px]">
                      {law.mathFormula && (
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Mathematical Formula:</span>
                          <span className="font-bold text-[#020617]">{law.mathFormula}</span>
                        </div>
                      )}
                      <div className="font-sans text-xs text-slate-700">
                        <strong>Rule:</strong> {law.agentDesignRule}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. AI AGENT SKILL-SPECIFIC PROMPT RULE GENERATOR              */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#0056FF] text-white">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold text-[#020617]">
                AI Agent Skill Rule Specification (Real-Time Output)
              </h3>
              <span className="font-mono text-[10px] text-slate-500">
                Ready-to-use rule prompt for autonomous AI coding agents
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyPrompt}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#0056FF] bg-[#EFF5FF] px-3 py-1.5 font-sans text-xs font-bold text-[#0056FF] shadow-2xs transition-all hover:bg-[#0056FF] hover:text-white"
          >
            {copiedPrompt ? (
              <>
                <Check className="size-3.5 text-emerald-600" />
                <span className="font-black text-emerald-600">Copied Rule Prompt</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy Agent Rule</span>
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0F172A] p-4 font-mono text-xs text-slate-100">
          <pre className="leading-relaxed whitespace-pre-wrap">{generatedAgentSkillRule}</pre>
        </div>
      </div>
    </div>
  );
}
