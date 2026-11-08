'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FileText } from '@/components/icons';

export type TactileFolderTheme = 'white-blue';

export interface TactileFolderCard {
  id: string;
  title: string;
  badge?: string;
  description?: string;
  content: React.ReactNode;
}

export interface TactileFolderShowcaseProps {
  cards: TactileFolderCard[];
  initialActiveIndex?: number;
  className?: string;
}

/**
 * TactileFolderShowcase
 * Implements the tactile stacked documents folder container with clean White/Blue styling.
 * Features a rounded wallet/folder container with 3 layered document sheets peeking out
 * and a frosted translucent front pocket.
 */
export function TactileFolderShowcase({
  cards,
  initialActiveIndex = 0,
  className,
}: TactileFolderShowcaseProps) {
  const [activeCardIndex, setActiveCardIndex] = React.useState<number>(initialActiveIndex);

  const activeCard = cards[activeCardIndex] || cards[0];

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* =================================================================== */}
      {/* 3D TACTILE FOLDER CONTAINER (WHITE / ROYAL BLUE BRAND DESIGN)       */}
      {/* =================================================================== */}
      <div
        className={cn(
          'relative w-full max-w-xl transition-all duration-300',
          'rounded-[32px] sm:rounded-[36px]',
          'border-2 border-[#CAD3F5] bg-white shadow-[0_20px_50px_rgba(0,86,255,0.08)]',
        )}
      >
        {/* Outer Folder Body Container */}
        <div className="relative min-h-[360px] p-4 pt-10 pb-20 sm:min-h-[400px] sm:p-6 sm:pt-12 sm:pb-24">
          {/* Top Folder Lip / Tab Arch */}
          <div className="absolute -top-3 left-8 h-4 w-28 rounded-t-xl border-x-2 border-t-2 border-[#CAD3F5] bg-[#E3E7FC]" />

          {/* =============================================================== */}
          {/* 3 STACKED DOCUMENT SHEETS PEEKING OUT                           */}
          {/* =============================================================== */}
          <div className="relative mx-auto h-[260px] w-full max-w-md sm:h-[300px]">
            {cards.slice(0, 3).map((card, idx) => {
              const isActive = activeCardIndex === idx;

              // Transformation classes based on card slot position
              let transformClasses = '';
              let zIndexClass = 'z-10';

              if (isActive) {
                transformClasses = 'translate-y-0 rotate-0 scale-100';
                zIndexClass = 'z-20';
              } else if (idx === 0) {
                // Tilted left
                transformClasses = '-translate-y-4 -rotate-4 sm:-rotate-6 scale-95 opacity-85';
                zIndexClass = 'z-10 hover:opacity-100';
              } else if (idx === 1) {
                // Tilted right
                transformClasses = '-translate-y-4 rotate-4 sm:rotate-6 scale-95 opacity-85';
                zIndexClass = 'z-10 hover:opacity-100';
              } else {
                transformClasses = '-translate-y-6 rotate-1 scale-90 opacity-75';
                zIndexClass = 'z-0 hover:opacity-100';
              }

              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCardIndex(idx)}
                  className={cn(
                    'absolute inset-x-0 top-0 mx-auto h-[280px] w-full max-w-sm cursor-pointer rounded-2xl p-4 transition-all duration-300 select-none sm:max-w-md sm:p-5',
                    isActive
                      ? 'border-2 border-[#0056FF]/30 bg-white text-[#020617] shadow-md'
                      : 'border border-slate-200 bg-slate-50 text-slate-800',
                    transformClasses,
                    zIndexClass,
                  )}
                >
                  {/* Card Header Bar */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-[#0056FF]" />
                      <span className="font-sans text-xs font-bold text-slate-900">
                        {card.title}
                      </span>
                    </div>
                    {card.badge && (
                      <span className="rounded bg-[#EFF5FF] px-2 py-0.5 font-mono text-[9px] font-bold text-[#0056FF]">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  {/* Card Main Body Content */}
                  <div className="mt-3 overflow-hidden text-xs">{card.content}</div>
                </div>
              );
            })}
          </div>

          {/* =============================================================== */}
          {/* FROSTED TRANSLUCENT FRONT SLEEVE / POCKET                       */}
          {/* =============================================================== */}
          <div
            className={cn(
              'pointer-events-none absolute inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-[24px] px-5 py-3.5 sm:rounded-[28px]',
              'border border-[#CAD3F5] bg-[#EFF5FF]/90 text-[#020617] shadow-[0_-8px_20px_rgba(0,86,255,0.06)] backdrop-blur-md',
            )}
          >
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-[#0056FF]" />
              <span className="font-mono text-xs font-bold tracking-wider text-[#020617] uppercase">
                {activeCard.title}
              </span>
            </div>

            <span className="font-mono text-[10px] text-slate-500">
              Doc {activeCardIndex + 1} of {cards.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
