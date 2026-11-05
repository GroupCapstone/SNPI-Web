'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AsteriskLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'hero';
  variant?: 'solid' | 'tint' | 'outline' | 'bare' | 'glow' | 'success';
  className?: string;
  ariaLabel?: string;
}

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
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-base',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
    '2xl': 'text-8xl',
    '3xl': 'text-9xl sm:text-[130px]',
    hero: 'text-[110px] sm:text-[150px] md:text-[180px]',
  };

  const soraFontStyle: React.CSSProperties = {
    fontFamily: "'Sora Variable', 'Sora', sans-serif",
    fontWeight: 800,
  };

  // 'success' variant: 100% transparent background, vibrant "success" green (#10B981) glyph with subtle emerald glow
  if (variant === 'success') {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center leading-none select-none bg-transparent transition-transform hover:scale-105 duration-300',
          sizeClasses[size],
          className,
        )}
        style={{
          ...soraFontStyle,
          color: '#10B981',
          filter: 'drop-shadow(0 4px 20px rgba(16, 185, 129, 0.3))',
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
          'inline-flex items-center justify-center leading-none select-none bg-transparent',
          sizeClasses[size],
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
    xs: 'size-5 text-xs rounded-md',
    sm: 'size-7 text-base rounded-lg',
    md: 'size-10 text-2xl rounded-xl',
    lg: 'size-14 sm:size-16 text-3xl sm:text-4xl rounded-2xl',
    xl: 'size-20 sm:size-24 text-5xl sm:text-6xl rounded-3xl',
    '2xl': 'size-24 sm:size-28 md:size-32 text-6xl sm:text-7xl md:text-8xl rounded-3xl',
    '3xl': 'size-32 sm:size-36 text-8xl rounded-3xl',
    hero: 'size-40 sm:size-48 text-9xl rounded-3xl',
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
        'inline-flex shrink-0 items-center justify-center leading-none select-none transition-transform hover:scale-105 duration-200',
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
