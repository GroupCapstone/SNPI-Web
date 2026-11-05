'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AsteriskLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'hero';
  variant?: 'standard' | 'success' | 'solid' | 'tint' | 'outline' | 'bare';
  className?: string;
  ariaLabel?: string;
}

const BOX_SIZE_CLASSES: Record<NonNullable<AsteriskLogoProps['size']>, string> = {
  xs: 'size-6 rounded-md',
  sm: 'size-8 rounded-lg',
  md: 'size-10 rounded-xl',
  lg: 'size-16 rounded-2xl',
  xl: 'size-24 rounded-3xl',
  '2xl': 'size-32 rounded-3xl',
  '3xl': 'size-40 rounded-[2rem]',
  hero: 'size-36 sm:size-44 md:size-52 rounded-[2.25rem] sm:rounded-[2.75rem] shadow-2xl',
};

const BOX_FONT_SIZES: Record<NonNullable<AsteriskLogoProps['size']>, string> = {
  xs: '14px',
  sm: '18px',
  md: '24px',
  lg: '42px',
  xl: '64px',
  '2xl': '88px',
  '3xl': '112px',
  hero: 'clamp(96px, 13vw, 144px)',
};

const BARE_TYPOGRAPHY_MAP: Record<
  NonNullable<AsteriskLogoProps['size']>,
  { fontSize: string; lineHeight: number | string }
> = {
  xs: { fontSize: '14px', lineHeight: 1 },
  sm: { fontSize: '20px', lineHeight: 1 },
  md: { fontSize: '28px', lineHeight: 1 },
  lg: { fontSize: '48px', lineHeight: 0.9 },
  xl: { fontSize: '84px', lineHeight: 0.8 },
  '2xl': { fontSize: '150px', lineHeight: 0.75 },
  '3xl': { fontSize: '240px', lineHeight: 0.7 },
  hero: { fontSize: 'clamp(240px, 26vw, 380px)', lineHeight: 0.65 },
};

/**
 * Official SNPI Star / Asterisk Brand Emblem
 * Rendered using the Sora typeface geometric 6-spoke rounded asterisk glyph.
 * Standardized squircle tile with the design-system "success" color ramp (#10B981).
 */
export function AsteriskLogo({
  size = 'md',
  variant = 'standard',
  className,
  ariaLabel = 'SNPI Asterisk Brand Emblem',
}: AsteriskLogoProps) {
  const soraFontStyle: React.CSSProperties = {
    fontFamily: "'Sora Variable', 'Sora', sans-serif",
    fontWeight: 800,
  };

  // 'bare' variant: 100% transparent background, clean textual glyph
  if (variant === 'bare') {
    const typo = BARE_TYPOGRAPHY_MAP[size];
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center bg-transparent select-none',
          className,
        )}
        style={{
          ...soraFontStyle,
          fontSize: typo.fontSize,
          lineHeight: typo.lineHeight,
          color: '#10B981',
        }}
        aria-hidden="true"
      >
        *
      </span>
    );
  }

  // Standard Success Squircle Tile: Status Success 500 Base gradient with white Sora asterisk
  const isSuccessVariant = variant === 'standard' || variant === 'success';

  const variantStyleClasses = {
    standard:
      'bg-gradient-to-b from-[#10B981] to-[#059669] text-white shadow-xl shadow-emerald-500/25 border border-emerald-400/40 ring-4 sm:ring-8 ring-emerald-500/10',
    success:
      'bg-gradient-to-b from-[#10B981] to-[#059669] text-white shadow-xl shadow-emerald-500/25 border border-emerald-400/40 ring-4 sm:ring-8 ring-emerald-500/10',
    solid:
      'bg-gradient-to-b from-[#0056FF] to-[#0048D9] text-white shadow-md border border-[#0056FF]/30 ring-4 ring-[#0056FF]/10',
    tint: 'bg-[#ECFDF5] text-[#10B981] border border-emerald-200 shadow-xs',
    outline: 'border-2 border-[#10B981] text-[#10B981] bg-white shadow-xs',
  };

  const fontSize = BOX_FONT_SIZES[size];

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-transform duration-300 select-none hover:scale-105',
        BOX_SIZE_CLASSES[size],
        variantStyleClasses[variant],
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
