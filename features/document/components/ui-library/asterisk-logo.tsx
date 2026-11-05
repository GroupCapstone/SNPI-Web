'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AsteriskLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'solid' | 'tint' | 'outline' | 'bare' | 'glow';
  className?: string;
  ariaLabel?: string;
}

/**
 * Official SNPI Star / Asterisk Brand Emblem
 * Rendered using the Sora typeface geometric 6-spoke rounded asterisk glyph.
 */
export function AsteriskLogo({
  size = 'md',
  variant = 'solid',
  className,
  ariaLabel = 'SNPI Asterisk Emblem',
}: AsteriskLogoProps) {
  const sizeClasses = {
    xs: 'size-5 text-xs rounded-md',
    sm: 'size-7 text-base rounded-lg',
    md: 'size-10 text-2xl rounded-xl',
    lg: 'size-14 sm:size-16 text-3xl sm:text-4xl rounded-2xl',
    xl: 'size-20 sm:size-24 text-5xl sm:text-6xl rounded-3xl',
    '2xl': 'size-24 sm:size-28 md:size-32 text-6xl sm:text-7xl md:text-8xl rounded-3xl shadow-xl',
  };

  const variantClasses = {
    solid:
      'bg-gradient-to-b from-[#0056FF] to-[#0048D9] text-white shadow-md border border-[#0056FF]/30',
    tint: 'bg-[#EFF5FF] text-[#0056FF] border border-[#CAD3F5]',
    outline: 'border-2 border-[#0056FF] text-[#0056FF] bg-white',
    glow: 'bg-gradient-to-b from-[#0056FF] to-[#0048D9] text-white shadow-xl shadow-[#0056FF]/25 border border-[#0056FF]/40 ring-4 ring-[#E3E7FC]',
    bare: 'bg-transparent text-[#0056FF]',
  };

  const soraFontStyle = {
    fontFamily: "'Sora Variable', 'Sora', sans-serif",
    fontWeight: 800,
  };

  if (variant === 'bare') {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center leading-none select-none',
          size === 'xs' && 'text-xs',
          size === 'sm' && 'text-base',
          size === 'md' && 'text-2xl',
          size === 'lg' && 'text-4xl',
          size === 'xl' && 'text-6xl',
          size === '2xl' && 'text-8xl',
          className,
        )}
        style={soraFontStyle}
        aria-hidden="true"
      >
        *
      </span>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center leading-none select-none transition-transform hover:scale-105 duration-200',
        sizeClasses[size],
        variantClasses[variant],
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
