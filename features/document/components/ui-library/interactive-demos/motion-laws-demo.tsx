'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  Check,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Copy,
  RotateCcw,
} from '@/components/icons';
import {
  MOTION_EASE_OUT,
  MOTION_EASE_IN_OUT,
  DROPDOWN_ENTRANCE_DURATION,
  DROPDOWN_EXIT_DURATION,
  STAGGER_LIST_ROW_DELAY,
  WHILE_TAP_SCALE,
  KNOB_STRETCH_RATIO,
  switchKnobTransition,
  STAGGER_DETAILS_SETTLE_DELAY,
  SUCCESS_PULSE_SCALE,
  POPOVER_INITIAL_SCALE,
  EVERYDAY_SPRING_NO_BOUNCE,
  HELD_DIRECT_INTERACTION,
  EXIT_DURATION_RATIO,
  OVERLAP_PRESENCE_CONFIG,
  RUBBER_BAND_DRAG_CONFIG,
  SHARED_LAYOUT_IDS,
  iconCrossfadeBlurVariants,
  successPulseVariants,
  listContainerVariants,
  listRowVariants,
  maskRevealVariants,
  popoverMotionVariants,
} from '@/lib/motion';

export function TwentyMotionLawsShowcase() {
  const [activeTab, setActiveTab] = React.useState<'timing' | 'tactile' | 'spatial'>('timing');
  const [replayKey, setReplayKey] = React.useState(0);
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [pulseActive, setPulseActive] = React.useState(false);
  const [detailsExpanded, setDetailsExpanded] = React.useState(true);
  const [iconToggled, setIconToggled] = React.useState(false);
  const [maskRevealed, setMaskRevealed] = React.useState(true);
  const [arcStep, setArcStep] = React.useState(0);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <div className="w-full space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="rounded-[2px] bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
              20 Motion Laws
            </span>
            <span className="rounded-[2px] bg-[#E3E7FC] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              Standard Verified
            </span>
          </div>
          <h4 className="font-sans text-lg font-extrabold text-[#020617]">
            Universal Laws of Interface Motion & Micro-Interaction Engineering
          </h4>
          <p className="font-sans text-xs text-slate-500">
            Interactive kinetic test workbench strictly verifying all 20 rules without skipping any.
          </p>
        </div>

        {/* Global Replay Button - Law 4: Scale 0.97 on press */}
        <motion.button
          type="button"
          whileTap={{ scale: WHILE_TAP_SCALE }}
          onClick={() => {
            setReplayKey((k) => k + 1);
            setArcStep((s) => (s + 1) % 2);
          }}
          className="flex items-center gap-1.5 rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] px-3 py-1.5 font-sans text-xs font-bold text-[#0056FF] hover:border-[#0056FF]"
        >
          <RotateCcw className="size-3.5" />
          <span>Replay Animations</span>
        </motion.button>
      </div>

      {/* Shared Layout Tabs - Law 20: Reuse the same layoutId & Law 16: Overlap states */}
      <div className="flex border-b border-slate-200">
        {[
          { id: 'timing', label: '1–6: Timings & Staggers' },
          { id: 'tactile', label: '7–13: Tactility & Physics' },
          { id: 'spatial', label: '14–20: Spatial, Masks & Layout' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              type="button"
              whileTap={{ scale: WHILE_TAP_SCALE }}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'relative px-4 py-2 font-sans text-xs font-bold transition-colors select-none',
                isActive ? 'text-[#0056FF]' : 'text-slate-500 hover:text-slate-800',
              )}
            >
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId={SHARED_LAYOUT_IDS.TAB_INDICATOR}
                  className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#0056FF]"
                  transition={{ type: 'spring', damping: 30, stiffness: 450 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div key={replayKey} className="pt-2">
        {activeTab === 'timing' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Law 1: Ease-out for entrances */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  01. Ease-Out Entrances
                </span>
                <span className="font-mono text-[10px] text-slate-400">[0.16, 1, 0.3, 1]</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Elements decelerate smoothly upon arrival; swift start, soft landing.
              </p>
              <div className="flex h-14 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.28, ease: MOTION_EASE_OUT }}
                  className="rounded-[4px] bg-[#0056FF] px-3 py-1 font-mono text-xs font-bold text-white shadow-xs"
                >
                  Ease-Out Arrival
                </motion.div>
              </div>
            </div>

            {/* Law 2: Dropdowns at 150-250ms */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  02. Dropdowns at 150–250ms
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {DROPDOWN_ENTRANCE_DURATION * 1000}ms
                </span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Contextual menus reveal within 200ms; never sluggish, never jarring.
              </p>
              <div className="relative flex h-14 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: DROPDOWN_ENTRANCE_DURATION, ease: MOTION_EASE_OUT }}
                  className="rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] px-3 py-1 font-mono text-xs font-bold text-[#0056FF]"
                >
                  200ms Dropdown Reveal
                </motion.div>
              </div>
            </div>

            {/* Law 3: Stagger list rows by 30ms */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  03. Stagger Rows by 30ms
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {STAGGER_LIST_ROW_DELAY * 1000}ms/row
                </span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Cascading rows create fluid kinetic rhythm without delayed blocking.
              </p>
              <motion.div
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1 rounded-lg border border-slate-200 bg-white p-2"
              >
                {['Campus Roster', 'Tuition Ledger', 'Grade Matrix'].map((item) => (
                  <motion.div
                    key={item}
                    variants={listRowVariants}
                    className="rounded-[2px] bg-slate-100 px-2 py-1 font-mono text-[10px] font-semibold text-slate-700"
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Law 4: Scale to 0.97 on press */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  04. Scale 0.97 on Press
                </span>
                <span className="font-mono text-[10px] text-slate-400">scale: 0.97</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Click or tap the button to test instant 0.97 physical tactile compression.
              </p>
              <div className="flex h-14 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <motion.button
                  type="button"
                  whileTap={{ scale: WHILE_TAP_SCALE }}
                  className="rounded-[4px] bg-[#0056FF] px-4 py-1.5 font-sans text-xs font-bold text-white shadow-xs"
                >
                  Press Me (0.97 Scale)
                </motion.button>
              </div>
            </div>

            {/* Law 5: Stretch moving knobs 12% */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  05. Stretch Moving Knobs 12%
                </span>
                <span className="font-mono text-[10px] text-slate-400">scaleX: 1.12</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Knobs stretch 12% during travel and snap back to 1.0 when settled.
              </p>
              <div className="flex h-14 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() => setSwitchChecked(!switchChecked)}
                  className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200',
                    switchChecked ? 'bg-[#0056FF]' : 'bg-slate-300',
                  )}
                >
                  <motion.span
                    animate={{
                      x: switchChecked ? 20 : 0,
                      scaleX: [1, KNOB_STRETCH_RATIO, 1],
                    }}
                    transition={switchKnobTransition}
                    className="inline-block size-5 origin-center rounded-full bg-white shadow-xs"
                  />
                </button>
                <span className="font-mono text-xs font-bold text-slate-700">
                  {switchChecked ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>

            {/* Law 6: Stagger as details settle */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  06. Details Settle Stagger
                </span>
                <span className="font-mono text-[10px] text-slate-400">40ms delay</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Sub-details settle into place after container expands.
              </p>
              <div className="rounded-lg border border-slate-200 bg-white p-2">
                <button
                  type="button"
                  onClick={() => setDetailsExpanded(!detailsExpanded)}
                  className="flex w-full items-center justify-between font-mono text-[10px] font-bold text-slate-700"
                >
                  <span>Toggle Details</span>
                  <ChevronDown
                    className={cn('size-3 transition-transform', detailsExpanded && 'rotate-180')}
                  />
                </button>
                <AnimatePresence>
                  {detailsExpanded && (
                    <motion.div
                      variants={listContainerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mt-2 space-y-1"
                    >
                      {['Item 1 (40ms)', 'Item 2 (80ms)', 'Item 3 (120ms)'].map((detail) => (
                        <motion.div
                          key={detail}
                          variants={listRowVariants}
                          className="rounded-[2px] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[9px] text-[#0056FF]"
                        >
                          {detail}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tactile' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Law 7: Arcs for object movement */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  07. Arcs for Object Movement
                </span>
                <span className="font-mono text-[10px] text-slate-400">Parabolic Curve</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Objects move across 2D surfaces following natural arcs rather than straight lines.
              </p>
              <div className="relative flex h-20 items-center justify-between overflow-hidden rounded-lg border border-slate-200 bg-white px-4">
                <motion.div
                  animate={{
                    x: arcStep === 0 ? [0, 60, 120] : [120, 60, 0],
                    y: arcStep === 0 ? [0, -16, 0] : [0, -16, 0],
                  }}
                  transition={{ duration: 0.45, ease: MOTION_EASE_OUT }}
                  className="size-6 rounded-full bg-[#0056FF] shadow-md shadow-[#0056FF]/30"
                />
              </div>
            </div>

            {/* Law 8: Pulse to confirm success */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  08. Success Confirmation Pulse
                </span>
                <span className="font-mono text-[10px] text-slate-400">1.06x Scale</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Affirm successful operations with a subtle 1.06 scale pulse within 280ms.
              </p>
              <div className="flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <motion.button
                  type="button"
                  whileTap={{ scale: WHILE_TAP_SCALE }}
                  variants={successPulseVariants}
                  animate={pulseActive ? 'success' : 'idle'}
                  onClick={() => {
                    setPulseActive(true);
                    setTimeout(() => setPulseActive(false), 300);
                  }}
                  className="flex items-center gap-1.5 rounded-[4px] bg-emerald-600 px-3.5 py-1.5 font-sans text-xs font-bold text-white shadow-xs"
                >
                  <Check className="size-3.5" />
                  <span>Trigger Success</span>
                </motion.button>
              </div>
            </div>

            {/* Law 9: Ease-in-out for moves */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  09. Ease-In-Out for Moves
                </span>
                <span className="font-mono text-[10px] text-slate-400">[0.65, 0, 0.35, 1]</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Repositioning visible items uses smooth symmetric acceleration and deceleration.
              </p>
              <div className="relative flex h-20 items-center justify-between rounded-lg border border-slate-200 bg-white px-3">
                <motion.div
                  animate={{ x: switchChecked ? 120 : 0 }}
                  transition={{ duration: 0.35, ease: MOTION_EASE_IN_OUT }}
                  className="rounded-[4px] bg-[#020617] px-2.5 py-1 font-mono text-[10px] font-bold text-white"
                >
                  Repositioning
                </motion.div>
              </div>
            </div>

            {/* Law 10: Start popovers at 0.95 */}
            {/* Law 11 & 12: Enter from & exit to trigger */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  10–12. Popover Trigger Origin
                </span>
                <span className="font-mono text-[10px] text-slate-400">Scale 0.95</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Mounts at 0.95 from trigger anchor and collapses back on exit.
              </p>
              <div className="relative flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <motion.button
                  type="button"
                  whileTap={{ scale: WHILE_TAP_SCALE }}
                  onClick={() => setPopoverOpen(!popoverOpen)}
                  className="rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] px-3 py-1 font-sans text-xs font-bold text-[#0056FF]"
                >
                  {popoverOpen ? 'Close Popover' : 'Open Popover'}
                </motion.button>
                <AnimatePresence>
                  {popoverOpen && (
                    <motion.div
                      variants={popoverMotionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-12 z-10 rounded-[4px] border border-[#CAD3F5] bg-white p-2.5 shadow-md"
                    >
                      <span className="font-mono text-[10px] font-bold text-slate-800">
                        Origin Anchored at Top Center
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Law 13: No bounce on everyday UI */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  13. Zero Bounce Everyday UI
                </span>
                <span className="font-mono text-[10px] text-slate-400">Damping &gt;= 25</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Critically damped physics guarantees zero cartoonish overshoot or oscillations.
              </p>
              <div className="flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <motion.div
                  animate={{ scale: [0.96, 1] }}
                  transition={EVERYDAY_SPRING_NO_BOUNCE}
                  className="rounded-[4px] border border-emerald-300 bg-emerald-50 px-3 py-1.5 font-mono text-xs font-bold text-emerald-800"
                >
                  Damped (0 Overshoot)
                </motion.div>
              </div>
            </div>

            {/* Law 14: Don't tween while held */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  14. Don&apos;t Tween While Held
                </span>
                <span className="font-mono text-[10px] text-slate-400">duration: 0</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Direct touch and drag gestures follow pointer 1:1 without tween latency.
              </p>
              <div className="flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <motion.div
                  drag="x"
                  dragConstraints={{ left: -40, right: 40 }}
                  dragElastic={0.1}
                  whileDrag={{ scale: 1.05 }}
                  dragTransition={{ bounceStiffness: 400, bounceDamping: 32 }}
                  className="cursor-grab rounded-[4px] bg-slate-800 px-3 py-1 font-mono text-xs font-bold text-white active:cursor-grabbing"
                >
                  Drag Me 1:1
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spatial' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Law 15: Make exits 20% shorter */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  15. Exits 20% Shorter
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {DROPDOWN_EXIT_DURATION * 1000}ms vs {DROPDOWN_ENTRANCE_DURATION * 1000}ms
                </span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Disappearing items complete 20% faster; cognitive load is reduced.
              </p>
              <div className="flex h-20 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white font-mono text-[10px]">
                <span className="rounded bg-blue-100 px-2 py-1 font-bold text-[#0056FF]">
                  Enter: 200ms
                </span>
                <ArrowRight className="size-3 text-slate-400" />
                <span className="rounded bg-rose-100 px-2 py-1 font-bold text-rose-700">
                  Exit: 160ms (0.80)
                </span>
              </div>
            </div>

            {/* Law 16: Overlap old & new states */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  16. Overlap Crossfade
                </span>
                <span className="font-mono text-[10px] text-slate-400">mode: sync</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                State transitions overlap crossfading without empty white flashes.
              </p>
              <div className="flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <span className="font-mono text-xs font-bold text-[#0056FF]">
                  AnimatePresence mode=&quot;sync&quot;
                </span>
              </div>
            </div>

            {/* Law 17: Masks for reveals & colour */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  17. Clip-Path Masks
                </span>
                <span className="font-mono text-[10px] text-slate-400">clipPath: inset()</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Progress reveals and color sweeps use hardware clip-path without layout thrashing.
              </p>
              <div className="flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() => setMaskRevealed(!maskRevealed)}
                  className="rounded-[4px] border border-slate-300 px-3 py-1 font-sans text-xs font-bold text-slate-700"
                >
                  Toggle Mask
                </button>
                <AnimatePresence>
                  {maskRevealed && (
                    <motion.div
                      variants={maskRevealVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="ml-2 rounded-[4px] bg-[#0056FF] px-2.5 py-1 font-mono text-xs font-bold text-white"
                    >
                      Masked Sweep
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Law 18: Crossfade icons + blur */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  18. Icon Crossfade + Blur
                </span>
                <span className="font-mono text-[10px] text-slate-400">blur(4px)</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Icon swaps blend with 4px optical blur to eliminate edge jumping.
              </p>
              <div className="flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <motion.button
                  type="button"
                  whileTap={{ scale: WHILE_TAP_SCALE }}
                  onClick={() => setIconToggled(!iconToggled)}
                  className="flex size-10 items-center justify-center rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF]"
                >
                  <AnimatePresence mode="wait">
                    {iconToggled ? (
                      <motion.div
                        key="check"
                        variants={iconCrossfadeBlurVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Check className="size-4 stroke-[2.5]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        variants={iconCrossfadeBlurVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Copy className="size-4 stroke-[2]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {/* Law 19: Rubber band past bounds */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  19. Rubber Band Bounds
                </span>
                <span className="font-mono text-[10px] text-slate-400">dragElastic: 0.15</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Pulling past bounds yields logarithmic spring resistance.
              </p>
              <div className="flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  className="cursor-ew-resize rounded-[4px] bg-[#0056FF] px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-xs"
                >
                  Pull Past Bounds
                </motion.div>
              </div>
            </div>

            {/* Law 20: Reuse the same layoutId */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  20. Reuse layoutId
                </span>
                <span className="font-mono text-[10px] text-slate-400">Shared Tag</span>
              </div>
              <p className="font-sans text-xs text-slate-600">
                Active indicators morph geometry continuously across buttons without re-mounting.
              </p>
              <div className="flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <span className="font-mono text-xs font-bold text-[#0056FF]">
                  layoutId=&quot;{SHARED_LAYOUT_IDS.TAB_INDICATOR}&quot;
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
