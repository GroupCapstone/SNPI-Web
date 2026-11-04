'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface RadiantHubNode {
  id: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  tag?: string;
  badge?: string;
  tooltip?: string;
}

export interface RadiantIntegrationHubProps {
  center?: {
    title?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    badge?: string;
  };
  leftNodes: RadiantHubNode[];
  rightNodes: RadiantHubNode[];
  activeNodeId?: string;
  onSelectNode?: (id: string) => void;
  className?: string;
}

// 6 Kinetic Brand Card Visual Styles (Compact Responsive Sizing)
const CARD_PALETTE = [
  // 0: Soft Ice Tint
  {
    bg: 'bg-[#EFF5FF]',
    border: 'border-2 border-[#CAD3F5]',
    text: 'text-[#0056FF]',
    accent: '#0056FF',
    subtext: 'text-blue-500',
    tag: 'BÉZIER SPEC',
    height: 'h-36 md:h-40 lg:h-44',
    width: 'w-24 md:w-26 lg:w-28',
    tumbledRotate: -5.5,
    tumbledY: 6,
    shadow: 'shadow-[0_12px_24px_rgba(0,86,255,0.12)]',
  },
  // 1: Solid Brand Royal Blue
  {
    bg: 'bg-[#0056FF]',
    border: 'border-none',
    text: 'text-white',
    accent: '#FFFFFF',
    subtext: 'text-blue-200',
    tag: 'SYSTEM CORE',
    height: 'h-40 md:h-44 lg:h-48',
    width: 'w-26 md:w-28 lg:w-30',
    tumbledRotate: -2.5,
    tumbledY: -2,
    shadow: 'shadow-[0_14px_30px_rgba(0,86,255,0.22)]',
  },
  // 2: Signal / Sunny Yellow (Center Elevated Card)
  {
    bg: 'bg-[#FACC15]',
    border: 'border-none',
    text: 'text-[#0A1A4A]',
    accent: '#0A1A4A',
    subtext: 'text-amber-950/70',
    tag: 'TOKEN SPEC',
    height: 'h-44 md:h-48 lg:h-52',
    width: 'w-28 md:w-30 lg:w-32',
    tumbledRotate: 0.5,
    tumbledY: -10,
    shadow: 'shadow-[0_16px_34px_rgba(250,204,21,0.28)]',
  },
  // 3: Solid Interactive Azure Blue
  {
    bg: 'bg-[#2277FF]',
    border: 'border-none',
    text: 'text-white',
    accent: '#FFFFFF',
    subtext: 'text-sky-100',
    tag: 'LAYOUT MESH',
    height: 'h-38 md:h-42 lg:h-46',
    width: 'w-26 md:w-28 lg:w-30',
    tumbledRotate: 3,
    tumbledY: 3,
    shadow: 'shadow-[0_14px_30px_rgba(34,119,255,0.22)]',
  },
  // 4: Mint Emerald
  {
    bg: 'bg-[#10B981]',
    border: 'border-none',
    text: 'text-white',
    accent: '#FFFFFF',
    subtext: 'text-emerald-100',
    tag: 'ACTION SPEC',
    height: 'h-36 md:h-40 lg:h-44',
    width: 'w-24 md:w-26 lg:w-28',
    tumbledRotate: 5.5,
    tumbledY: 6,
    shadow: 'shadow-[0_12px_24px_rgba(16,185,129,0.22)]',
  },
  // 5: Soft Lavender / White Mesh
  {
    bg: 'bg-[#F8FAFC]',
    border: 'border-2 border-[#CAD3F5]',
    text: 'text-[#0056FF]',
    accent: '#0056FF',
    subtext: 'text-slate-500',
    tag: 'INTELLIGENCE',
    height: 'h-38 md:h-42 lg:h-46',
    width: 'w-24 md:w-26 lg:w-28',
    tumbledRotate: 8.5,
    tumbledY: 12,
    shadow: 'shadow-[0_12px_24px_rgba(10,26,74,0.08)]',
  },
];

/**
 * RadiantIntegrationHub (Kinetic Tumbled Cards Archetype)
 * Minimalist, zero-icon kinetic brand cards:
 * - Zero top buttons, zero header title row, zero bottom active-module bar.
 * - Zero icons inside the cards; minimal high-impact typography only.
 * - Staggered heights, organic gravity tilts, and smooth spring elevation on hover/active.
 * - Stable in-place state with zero section scrolling or page jumping.
 */
export function RadiantIntegrationHub({
  leftNodes,
  rightNodes,
  activeNodeId,
  onSelectNode,
  className,
}: RadiantIntegrationHubProps) {
  const allNodes: RadiantHubNode[] = React.useMemo(() => {
    return [...leftNodes, ...rightNodes].slice(0, 6);
  }, [leftNodes, rightNodes]);

  const [internalActiveId, setInternalActiveId] = React.useState<string>(
    activeNodeId || allNodes[0]?.id || '',
  );
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (activeNodeId) {
      setInternalActiveId(activeNodeId);
    }
  }, [activeNodeId]);

  const activeIdx = Math.max(
    0,
    allNodes.findIndex((n) => n.id === internalActiveId),
  );

  const handleSelect = (idx: number) => {
    const node = allNodes[idx];
    if (node) {
      setInternalActiveId(node.id);
      onSelectNode?.(node.id);
    }
  };

  return (
    <div
      className={cn('relative mx-auto w-full max-w-2xl py-2 select-none lg:max-w-3xl', className)}
    >
      {/* =================================================================== */}
      {/* DESKTOP: 6 KINETIC TUMBLED CARDS (ZERO ICONS, MINIMAL TEXT)         */}
      {/* =================================================================== */}
      <div className="relative hidden h-56 w-full items-end justify-center gap-1.5 overflow-visible pb-2 select-none md:flex md:gap-2 lg:gap-2.5">
        {allNodes.map((node, idx) => {
          const isActive = idx === activeIdx;
          const isHovered = idx === hoveredIdx;
          const isElevated = isHovered;
          const style = CARD_PALETTE[idx % CARD_PALETTE.length];

          // Kinetic animation parameters matching the reference archetype
          const targetY = isElevated ? -16 : style.tumbledY;
          const targetRotate = isElevated ? 0 : style.tumbledRotate;
          const targetScale = isElevated ? 1.04 : 1;
          const targetZ = isElevated ? 40 : 10 + idx;

          return (
            <motion.div
              key={node.id}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              animate={{
                y: targetY,
                rotate: targetRotate,
                scale: targetScale,
                zIndex: targetZ,
              }}
              transition={{
                type: 'spring',
                stiffness: 340,
                damping: 22,
              }}
              style={{
                transformOrigin: 'bottom center',
              }}
              className={cn(
                'relative flex shrink-0 cursor-pointer flex-col justify-between rounded-2xl p-4 transition-shadow duration-200',
                style.width,
                style.height,
                style.bg,
                style.border,
                style.text,
                isElevated ? style.shadow : 'shadow-xs',
              )}
            >
              {/* Top: Minimal Category Tag */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase opacity-85">
                  0{idx + 1}
                </span>
                {isActive && (
                  <span className="py-0.2 rounded-md border border-[#CAD3F5] bg-white px-1.5 font-mono text-[9px] font-bold text-[#0056FF]">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Center: Clean Bold Title (ZERO ICONS) */}
              <div className="my-auto flex flex-col items-center justify-center py-2">
                <span className="text-center font-sans text-base leading-tight font-black tracking-tight sm:text-lg">
                  {node.label}
                </span>
              </div>

              {/* Bottom: Minimal Code / Badge */}
              <div className="flex items-center justify-between font-mono text-[9px] tracking-wider uppercase">
                <span className={style.subtext}>{node.badge || 'MOD 0' + (idx + 1)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* MOBILE: RESPONSIVE HORIZONTAL TOUCH DECK                            */}
      {/* =================================================================== */}
      <div className="no-scrollbar flex w-full snap-x gap-3 overflow-x-auto px-3 pt-2 pb-4 select-none md:hidden">
        {allNodes.map((node, idx) => {
          const isActive = idx === activeIdx;
          const style = CARD_PALETTE[idx % CARD_PALETTE.length];

          return (
            <motion.div
              key={node.id}
              onClick={() => handleSelect(idx)}
              whileTap={{ scale: 0.94 }}
              className={cn(
                'relative flex h-42 w-30 shrink-0 cursor-pointer snap-center flex-col justify-between rounded-2xl p-3.5 transition-all',
                style.bg,
                style.border,
                style.text,
                isActive ? style.shadow + ' ring-2 ring-current' : 'shadow-xs',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold tracking-wider uppercase opacity-85">
                  0{idx + 1}
                </span>
                {isActive && (
                  <span className="py-0.2 rounded-md border border-[#CAD3F5] bg-white px-1.5 font-mono text-[8px] font-bold text-[#0056FF]">
                    ACTIVE
                  </span>
                )}
              </div>

              <div className="my-auto flex flex-col items-center justify-center py-1">
                <span className="text-center font-sans text-sm leading-tight font-black tracking-tight">
                  {node.label}
                </span>
              </div>

              <div className="flex items-center justify-between font-mono text-[8px] tracking-wider uppercase">
                <span className={style.subtext}>{node.badge || 'MOD 0' + (idx + 1)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
