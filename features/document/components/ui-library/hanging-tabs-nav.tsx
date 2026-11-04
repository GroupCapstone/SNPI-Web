'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { IconComponent } from '@/components/icons';

export interface HangingTabItem {
  id: string;
  label: string;
  icon?: IconComponent | React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: number | string;
  onClick?: () => void;
}

export interface HangingTabsNavProps {
  items: HangingTabItem[];
  activeId: string;
  onSelect?: (id: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcons?: boolean;
}

/**
 * Cyber Armor Mecha SVG Chassis
 * High-tech aerospace / mecha console with dual top stepped armor wings,
 * drop bottom bracket, chamfered 45° corner caps, and debossed tech grooves.
 */
function CyberChassisSvg({
  tabCount = 3,
  activeIdx = 0,
  className,
}: {
  tabCount?: number;
  activeIdx?: number;
  className?: string;
}) {
  const is2Tabs = tabCount === 2;
  const is3Tabs = tabCount === 3;
  const safeActive = Math.max(0, Math.min(tabCount - 1, activeIdx));

  // 3-tab path: 3 elevated wings aligned with 3 modular buttons
  const path3 = `M 18,10 
            L 100,10 
            L 120,0 
            L 220,0 
            L 240,10 
            L 430,10 
            L 450,0 
            L 550,0 
            L 570,10 
            L 760,10 
            L 780,0 
            L 880,0 
            L 900,10 
            L 982,10 
            L 1000,28 
            L 1000,40 
            L 982,58 
            L 880,58 
            L 860,68 
            L 140,68 
            L 120,58 
            L 18,58 
            L 0,40 
            L 0,28 
            Z`;

  // 2-tab path: original 2 elevated wings
  const path2 = `M 18,10 
            L 220,10 
            L 240,0 
            L 360,0 
            L 380,10 
            L 620,10 
            L 640,0 
            L 760,0 
            L 780,10 
            L 982,10 
            L 1000,28 
            L 1000,40 
            L 982,58 
            L 760,58 
            L 740,68 
            L 260,68 
            L 240,58 
            L 18,58 
            L 0,40 
            L 0,28 
            Z`;

  const topBevel3 = `M 19,11 
            L 100,11 
            L 120,1.5 
            L 220,1.5 
            L 240,11 
            L 430,11 
            L 450,1.5 
            L 550,1.5 
            L 570,11 
            L 760,11 
            L 780,1.5 
            L 880,1.5 
            L 900,11 
            L 981,11`;

  const topBevel2 = `M 19,11 
            L 220,11 
            L 240,1.5 
            L 360,1.5 
            L 380,11 
            L 620,11 
            L 640,1.5 
            L 760,1.5 
            L 780,11 
            L 981,11`;

  // Dynamic geometry for multi-tab consoles (>3 tabs, e.g. 8 tabs)
  const usableWidth = 964; // 982 - 18
  const tabWidth = usableWidth / tabCount;
  const tabCenter = Math.round(18 + (safeActive + 0.5) * tabWidth);
  const wingHalfWidth = Math.min(Math.round(tabWidth * 0.44), 48);
  const wingStart = Math.max(24, tabCenter - wingHalfWidth);
  const wingEnd = Math.min(976, tabCenter + wingHalfWidth);
  const chamfer = 12;

  const multiTabPath = `M 18,10 
            L ${Math.max(18, wingStart - chamfer)},10 
            L ${wingStart},0 
            L ${wingEnd},0 
            L ${Math.min(982, wingEnd + chamfer)},10 
            L 982,10 
            L 1000,28 
            L 1000,40 
            L 982,58 
            L 860,58 
            L 840,68 
            L 160,68 
            L 140,58 
            L 18,58 
            L 0,40 
            L 0,28 
            Z`;

  const multiTabTopBevel = `M 19,11 
            L ${Math.max(19, wingStart - chamfer)},11 
            L ${wingStart},1.5 
            L ${wingEnd},1.5 
            L ${Math.min(981, wingEnd + chamfer)},11 
            L 981,11`;

  const activePath = is2Tabs ? path2 : is3Tabs ? path3 : multiTabPath;
  const activeTopBevel = is2Tabs ? topBevel2 : is3Tabs ? topBevel3 : multiTabTopBevel;

  return (
    <svg
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full overflow-visible',
        className,
      )}
      viewBox="0 0 1000 68"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        {/* Ambient Royal Blue Glow Filter */}
        <filter id="royalGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#0056FF" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Main Outer Chassis Path (Chamfered Ears, Stepped Armor Wings, Bottom Drop Bracket - Pure Solid White #FFFFFF, Zero Blue) */}
      <path
        d={activePath}
        fill="#FFFFFF"
        stroke="#CAD3F5"
        strokeWidth="1.75"
        vectorEffect="non-scaling-stroke"
      />

      {/* Top Inner Bevel Highlight (1px Milled Aluminum Glint) */}
      <path
        d={activeTopBevel}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.95"
      />

      {is2Tabs ? (
        <>
          {/* Left Wing Debossed Tech Slot & Glint Accent */}
          <rect
            x="264"
            y="3.5"
            width="72"
            height="3"
            rx="1.5"
            fill={safeActive === 0 ? '#0056FF' : '#CAD3F5'}
          />
          {safeActive === 0 && (
            <rect
              x="270"
              y="4"
              width="22"
              height="2"
              rx="1"
              fill="#FFFFFF"
              filter="url(#royalGlow)"
            />
          )}

          {/* Right Wing Debossed Tech Slot & Glint Accent */}
          <rect
            x="664"
            y="3.5"
            width="72"
            height="3"
            rx="1.5"
            fill={safeActive === 1 ? '#0056FF' : '#CAD3F5'}
          />
          {safeActive === 1 && (
            <rect
              x="708"
              y="4"
              width="22"
              height="2"
              rx="1"
              fill="#FFFFFF"
              filter="url(#royalGlow)"
            />
          )}
        </>
      ) : is3Tabs ? (
        <>
          {/* Wing 1 Debossed Tech Slot & Glint Accent */}
          <rect
            x="135"
            y="3.5"
            width="70"
            height="3"
            rx="1.5"
            fill={safeActive === 0 ? '#0056FF' : '#CAD3F5'}
          />
          {safeActive === 0 && (
            <rect
              x="140"
              y="4"
              width="22"
              height="2"
              rx="1"
              fill="#FFFFFF"
              filter="url(#royalGlow)"
            />
          )}

          {/* Wing 2 Debossed Tech Slot & Glint Accent */}
          <rect
            x="465"
            y="3.5"
            width="70"
            height="3"
            rx="1.5"
            fill={safeActive === 1 ? '#0056FF' : '#CAD3F5'}
          />
          {safeActive === 1 && (
            <rect
              x="490"
              y="4"
              width="22"
              height="2"
              rx="1"
              fill="#FFFFFF"
              filter="url(#royalGlow)"
            />
          )}

          {/* Wing 3 Debossed Tech Slot & Glint Accent */}
          <rect
            x="795"
            y="3.5"
            width="70"
            height="3"
            rx="1.5"
            fill={safeActive === 2 ? '#0056FF' : '#CAD3F5'}
          />
          {safeActive === 2 && (
            <rect
              x="840"
              y="4"
              width="22"
              height="2"
              rx="1"
              fill="#FFFFFF"
              filter="url(#royalGlow)"
            />
          )}
        </>
      ) : (
        <>
          {/* Multi-Tab Dynamic LED Slot Directly Above Active Tab */}
          <rect
            x={tabCenter - Math.round(wingHalfWidth * 0.75)}
            y="3.5"
            width={Math.round(wingHalfWidth * 1.5)}
            height="3"
            rx="1.5"
            fill="#0056FF"
          />
          <rect
            x={tabCenter - 11}
            y="4"
            width="22"
            height="2"
            rx="1"
            fill="#FFFFFF"
            filter="url(#royalGlow)"
          />

          {/* Subtle Secondary Tech Slots For Inactive Tabs */}
          {Array.from({ length: tabCount }).map((_, idx) => {
            if (idx === safeActive) return null;
            const c = Math.round(18 + (idx + 0.5) * tabWidth);
            return (
              <rect
                key={idx}
                x={c - 12}
                y="6"
                width="24"
                height="2"
                rx="1"
                fill="#CAD3F5"
                opacity="0.6"
              />
            );
          })}
        </>
      )}

      {/* Bottom Drop Bracket Milled Groove */}
      <line
        x1={is2Tabs ? '285' : '160'}
        y1="64"
        x2={is2Tabs ? '715' : '840'}
        y2="64"
        stroke="#CAD3F5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Left Stepped Ear Notches */}
      <line
        x1="3"
        y1="30"
        x2="3"
        y2="38"
        stroke="#CAD3F5"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <line
        x1="7"
        y1="26"
        x2="7"
        y2="42"
        stroke="#CAD3F5"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Right Stepped Ear Notches */}
      <line
        x1="997"
        y1="30"
        x2="997"
        y2="38"
        stroke="#CAD3F5"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <line
        x1="993"
        y1="26"
        x2="993"
        y2="42"
        stroke="#CAD3F5"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/**
 * CyberArmorNav (also exported as HangingTabsNav for full backwards compatibility)
 * High-tech modular cyber / mecha dock navigation bar matching the reference design.
 * Features:
 * - Stepped mecha armor chassis with angled chamfers
 * - Physical double-seam dividers between modular buttons
 * - Luminous Royal Blue active glow bar indicator
 * - Full light day mode brand aesthetic (#0056FF, #2277FF, #E3E7FC, #FFFFFF)
 * - Zero dots standard
 */
export function CyberArmorNav({
  items,
  activeId,
  onSelect,
  className,
  size = 'md',
  showIcons = true,
}: HangingTabsNavProps) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const isMultiTab = items.length > 5;

  const containerHeights = {
    sm: 'h-[40px] sm:h-[44px]',
    md: isMultiTab ? 'h-[44px] sm:h-[48px]' : 'h-[46px] sm:h-[50px]',
    lg: 'h-[50px] sm:h-[56px]',
  }[size];

  const buttonHeights = isMultiTab
    ? {
        sm: 'h-[28px] px-1.5 sm:px-2.5',
        md: 'h-[32px] sm:h-[34px] px-2 sm:px-3 md:px-3.5',
        lg: 'h-[36px] sm:h-[40px] px-2.5 sm:px-4 md:px-5',
      }[size]
    : {
        sm: 'h-[32px] px-2.5 sm:px-3.5',
        md: 'h-[36px] px-3 sm:px-5 md:px-6',
        lg: 'h-[42px] px-4 sm:px-7 md:px-8',
      }[size];

  const textSizes = isMultiTab
    ? {
        sm: 'text-[9px] sm:text-[10px]',
        md: 'text-[10px] sm:text-[11px] md:text-xs',
        lg: 'text-xs sm:text-sm',
      }[size]
    : {
        sm: 'text-[10px] sm:text-[11px]',
        md: 'text-[11px] sm:text-[13px]',
        lg: 'text-xs sm:text-base',
      }[size];

  const activeIdx = items.findIndex((item) => item.id === activeId);

  return (
    <nav
      aria-label="Modular Mecha Cyber Navigation"
      className={cn(
        'relative inline-flex max-w-full items-center justify-center select-none',
        isMultiTab
          ? 'w-full min-w-[620px] px-3.5 sm:min-w-0 sm:px-6'
          : 'p-[6px_10px] sm:p-[8px_16px]',
        'drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
        containerHeights,
        className,
      )}
    >
      {/* 1. Underlying Armored Cyber Chassis with Active Laser Wing Highlight */}
      <CyberChassisSvg tabCount={items.length} activeIdx={activeIdx >= 0 ? activeIdx : 0} />

      {/* 2. Overlaid Button Cell Segments */}
      <div
        className={cn(
          'relative z-10 flex h-full items-center',
          isMultiTab ? 'w-full justify-between' : 'justify-center',
        )}
      >
        {items.map((tab, idx) => {
          const isActive = activeId === tab.id;
          const isHovered = hoveredId === tab.id;
          const Icon = tab.icon;
          const isLast = idx === items.length - 1;

          const buttonContent = (
            <div className="relative flex items-center justify-center gap-1.5 sm:gap-2">
              {/* Optional Kinetic Micro-Icon */}
              {showIcons && Icon && (
                <Icon
                  className={cn(
                    'size-3.5 shrink-0 transition-transform duration-150 sm:size-4',
                    isActive
                      ? 'stroke-[2.5] text-slate-950'
                      : isHovered
                        ? 'scale-105 stroke-[2] text-slate-900'
                        : 'stroke-[2] text-slate-500',
                  )}
                />
              )}

              {/* High-Contrast Bold Label: strictly whitespace-nowrap to prevent ugly wrapping */}
              <span
                className={cn(
                  'shrink-0 font-sans tracking-wider whitespace-nowrap uppercase transition-colors duration-150',
                  textSizes,
                  isActive
                    ? 'font-black text-black text-slate-950'
                    : isHovered
                      ? 'font-bold text-slate-900'
                      : 'font-semibold text-slate-600',
                )}
              >
                {tab.label}
              </span>
            </div>
          );

          // Default Background for Active Menu (Zero Active Blue, Clean Seamless Chassis)
          const sharedClasses = cn(
            'group relative flex items-center justify-center cursor-pointer transition-all duration-150 mx-0.5 rounded-[8px]',
            isMultiTab ? 'flex-1 min-w-0' : 'shrink-0',
            buttonHeights,
            isActive
              ? 'bg-transparent text-slate-950 font-black'
              : 'bg-transparent text-slate-600 font-semibold hover:bg-slate-100/60 hover:text-slate-950',
          );

          return (
            <React.Fragment key={tab.id}>
              {tab.href ? (
                <Link
                  href={tab.href}
                  onMouseEnter={() => setHoveredId(tab.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    tab.onClick?.();
                    onSelect?.(tab.id);
                  }}
                  className={sharedClasses}
                >
                  {buttonContent}
                </Link>
              ) : (
                <button
                  type="button"
                  onMouseEnter={() => setHoveredId(tab.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    tab.onClick?.();
                    onSelect?.(tab.id);
                  }}
                  className={sharedClasses}
                >
                  {buttonContent}
                </button>
              )}

              {/* Physical Vertical Seam: Soft Slate-Lavender Seam Line between tabs */}
              {!isLast && (
                <div
                  className={cn(
                    'relative flex shrink-0 items-center',
                    isMultiTab ? 'mx-0.5 sm:mx-1' : 'mx-1 sm:mx-1.5',
                  )}
                >
                  <span className="h-3.5 w-[1px] bg-[#CAD3F5] sm:h-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

// Full backwards compatibility export
export { CyberArmorNav as HangingTabsNav };
