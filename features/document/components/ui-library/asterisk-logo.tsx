'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AsteriskLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'hero';
  variant?: 'solid' | 'tint' | 'outline' | 'bare' | 'glow' | 'success';
  className?: string;
  ariaLabel?: string;
}

const SIZE_TYPOGRAPHY_MAP: Record<
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
  hero: { fontSize: 'clamp(280px, 30vw, 460px)', lineHeight: 0.65 },
};

/**
 * Official SNPI Star / Asterisk Brand Emblem
 * Rendered using the Sora typeface geometric 6-spoke rounded asterisk glyph.
 * Supports transparent backgrounds and the design-system "success" color ramp (#10B981).
 */
export function AsteriskLogo({
  size = 'md',
  variant = 'success',
  className,
  ariaLabel = 'SNPI Asterisk Emblem',
}: AsteriskLogoProps) {
  const typo = SIZE_TYPOGRAPHY_MAP[size];

  const soraFontStyle: React.CSSProperties = {
    fontFamily: "'Sora Variable', 'Sora', sans-serif",
    fontWeight: 800,
    fontSize: typo.fontSize,
    lineHeight: typo.lineHeight,
  };

  // 'success' variant: 100% transparent background, vibrant "success" green (#10B981) glyph with subtle emerald glow
  if (variant === 'success') {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center select-none bg-transparent transition-transform hover:scale-105 duration-300',
          size === 'hero' && 'my-2 sm:my-4',
          className,
        )}
        style={{
          ...soraFontStyle,
          color: '#10B981',
          filter: 'drop-shadow(0 8px 30px rgba(16, 185, 129, 0.35))',
        }}
        aria-label={ariaLabel}
        role="img"
      >
        *
      </span>
    );
  }

  // 'bare' variant: 100% transparent background, clean textual glyph
  if (variant === 'bare') {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center select-none bg-transparent',
          className,
        )}
        style={soraFontStyle}
        aria-hidden="true"
      >
        *
      </span>
    );
  }

  // Boxed variants (solid, tint, outline, glow)
  const boxSizeClasses = {
    xs: 'size-6 rounded-md',
    sm: 'size-8 rounded-lg',
    md: 'size-11 rounded-xl',
    lg: 'size-16 rounded-2xl',
    xl: 'size-24 rounded-3xl',
    '2xl': 'size-32 rounded-3xl',
    '3xl': 'size-44 rounded-3xl',
    hero: 'size-56 sm:size-64 md:size-72 rounded-[2.5rem]',
  };

  const boxVariantClasses = {
    solid:
      'bg-gradient-to-b from-[#0056FF] to-[#0048D9] text-white shadow-md border border-[#0056FF]/30',
    tint: 'bg-[#EFF5FF] text-[#0056FF] border border-[#CAD3F5]',
    outline: 'border-2 border-[#10B981] text-[#10B981] bg-transparent',
    glow: 'bg-transparent text-[#10B981] filter drop-shadow(0 8px 30px rgba(16, 185, 129, 0.35))',
  };

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center select-none transition-transform hover:scale-105 duration-200',
        boxSizeClasses[size],
        boxVariantClasses[variant],
        className,
      )}
      style={soraFontStyle}
      aria-label={ariaLabel}
      role="img"
    >
      <span className="translate-y-[8%] leading-none">*</span>
    </div>
  );
}
