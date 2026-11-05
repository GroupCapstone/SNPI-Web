'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AsteriskLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'hero';
  /**
   * Visual variant:
   * - standard: Light mode: White/Ice-Tint tile with Royal Blue (#0056FF) Sora asterisk; Dark mode: Deep Navy (#0A1A4A) tile with White Sora asterisk
   * - brand / solid: Royal Blue (#0056FF) gradient squircle tile with crisp White Sora asterisk
   * - tint: Ice Tint (#EFF5FF) tile with Royal Blue (#0056FF) Sora asterisk
   * - outline: 2px border with Royal Blue (#0056FF) Sora asterisk
   * - bare: Transparent background, pure Sora bold asterisk glyph in Royal Blue (#0056FF)
   */
  variant?: 'standard' | 'brand' | 'solid' | 'tint' | 'outline' | 'bare' | 'success';
  mode?: 'light' | 'dark';
  colorVariant?: 'brand' | 'white' | 'white-accent' | 'current' | 'gradient';
  className?: string;
  ariaLabel?: string;
}

const BOX_SIZE_CLASSES: Record<NonNullable<AsteriskLogoProps['size']>, string> = {
  xs: 'size-6 rounded-md',
  sm: 'size-8 rounded-lg',
  md: 'size-10 sm:size-11 rounded-xl',
  lg: 'size-16 rounded-2xl',
  xl: 'size-24 rounded-3xl',
  '2xl': 'size-32 rounded-3xl',
  '3xl': 'size-40 rounded-[2rem]',
  hero: 'size-36 sm:size-44 md:size-52 rounded-[2.25rem] sm:rounded-[2.75rem] shadow-2xl',
};

const BOX_FONT_SIZES: Record<NonNullable<AsteriskLogoProps['size']>, string> = {
  xs: '16px',
  sm: '22px',
  md: '28px',
  lg: '46px',
  xl: '70px',
  '2xl': '94px',
  '3xl': '118px',
  hero: 'clamp(108px, 14vw, 156px)',
};

const BARE_TYPOGRAPHY_MAP: Record<
  NonNullable<AsteriskLogoProps['size']>,
  { fontSize: string; lineHeight: number | string }
> = {
  xs: { fontSize: '16px', lineHeight: 1 },
  sm: { fontSize: '22px', lineHeight: 1 },
  md: { fontSize: '30px', lineHeight: 1 },
  lg: { fontSize: '50px', lineHeight: 0.9 },
  xl: { fontSize: '84px', lineHeight: 0.8 },
  '2xl': { fontSize: '136px', lineHeight: 0.75 },
  '3xl': { fontSize: '180px', lineHeight: 0.7 },
  hero: { fontSize: 'clamp(160px, 20vw, 260px)', lineHeight: 0.65 },
};

/**
 * Official SNPI Star / Asterisk Brand Logo
 * Rendered using the original bold Sora typeface geometric asterisk glyph (*).
 * Enforces pure brand blue (#0056FF / #2277FF) on light canvas with dual light/dark mode adaptation.
 */
export function AsteriskLogo({
  size = 'md',
  variant = 'standard',
  mode = 'light',
  className,
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: AsteriskLogoProps) {
  const soraFontStyle: React.CSSProperties = {
    fontFamily: "'Sora Variable', 'Sora', sans-serif",
    fontWeight: 800,
  };

  // 'bare' variant: 100% transparent background, pure bold Sora asterisk glyph in brand blue
  if (variant === 'bare') {
    const typo = BARE_TYPOGRAPHY_MAP[size];
    const glyphColor = mode === 'dark' ? '#FFFFFF' : '#0056FF';
    return (
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center bg-transparent leading-none transition-transform duration-300 select-none hover:scale-105',
          className,
        )}
        style={{
          ...soraFontStyle,
          fontSize: typo.fontSize,
          lineHeight: typo.lineHeight,
          color: glyphColor,
        }}
        aria-label={ariaLabel}
        role="img"
      >
        <span className="translate-y-[8%] leading-none select-none">*</span>
      </span>
    );
  }

  // Squircle Container Styles mapped to brand tokens (Only Blue)
  const containerClassesByVariant = {
    standard:
      mode === 'dark'
        ? 'bg-[#0A1A4A] text-white border border-white/20 ring-4 ring-white/10 shadow-lg shadow-black/20'
        : 'bg-white text-[#0056FF] border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-sm shadow-[#0056FF]/10',
    brand:
      'bg-gradient-to-b from-[#0056FF] to-[#0048D9] text-white border border-[#0056FF]/40 ring-4 ring-[#0056FF]/20 shadow-md shadow-[#0056FF]/25',
    solid:
      'bg-[#0056FF] text-white border border-white/20 ring-4 ring-white/10 shadow-md shadow-[#0056FF]/20',
    tint:
      mode === 'dark'
        ? 'bg-white/10 text-white border border-white/15'
        : 'bg-[#EFF5FF] text-[#0056FF] border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-2xs',
    outline:
      mode === 'dark'
        ? 'bg-transparent border-2 border-white text-white'
        : 'bg-white border-2 border-[#0056FF] text-[#0056FF] shadow-xs',
    success:
      'bg-white text-[#0056FF] border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-sm shadow-[#0056FF]/10',
  };

  const fontSize = BOX_FONT_SIZES[size];

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-all duration-300 select-none hover:scale-105',
        BOX_SIZE_CLASSES[size],
        containerClassesByVariant[variant],
        className,
      )}
      style={{
        ...soraFontStyle,
        fontSize,
      }}
      aria-label={ariaLabel}
      role="img"
    >
      <span className="translate-y-[8%] leading-none select-none">*</span>
    </div>
  );
}

/**
 * Backward-compatible AsteriskEmblem export referencing the official bold Sora asterisk
 */
export interface AsteriskEmblemProps {
  className?: string;
  size?: number | string;
  colorVariant?: 'brand' | 'white' | 'white-accent' | 'current' | 'gradient';
  ariaLabel?: string;
}

export function AsteriskEmblem({
  className,
  colorVariant = 'brand',
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: AsteriskEmblemProps) {
  const glyphColor =
    colorVariant === 'white' || colorVariant === 'white-accent'
      ? '#FFFFFF'
      : colorVariant === 'current'
        ? 'currentColor'
        : '#0056FF';

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center leading-none select-none',
        className,
      )}
      style={{
        fontFamily: "'Sora Variable', 'Sora', sans-serif",
        fontWeight: 800,
        color: glyphColor,
      }}
      aria-label={ariaLabel}
      role="img"
    >
      <span className="translate-y-[8%] leading-none select-none">*</span>
    </span>
  );
}
