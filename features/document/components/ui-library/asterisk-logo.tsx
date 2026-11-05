'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AsteriskEmblemProps {
  className?: string;
  size?: number | string;
  /**
   * Color variant controlling stroke and fill tones:
   * - 'brand': Royal Blue base (#0056FF), Azure Blue checkmark arms (#2277FF)
   * - 'white': Pure White monochrome for dark blue headers
   * - 'white-accent': Pure White base with luminous Azure Blue checkmark arms (#60A5FA)
   * - 'current': Inherits currentColor
   * - 'gradient': SVG linear gradient from Royal Blue to Azure Blue
   */
  colorVariant?: 'brand' | 'white' | 'white-accent' | 'current' | 'gradient';
  ariaLabel?: string;
}

/**
 * Pure SVG Geometric 8-Axis Asterisk Emblem
 * Unites:
 * 1. STAR: Excellence & Quality (8-axis radial foundation)
 * 2. CHECK MARK: Accuracy & Expert Level (V-chevron arms)
 * 3. SHIELD: Security & Trust (protective silhouette)
 * 4. HAPPY HUMAN: Customer Satisfaction (Zenith head dot + triumphant arms)
 */
export function AsteriskEmblem({
  className,
  size = '100%',
  colorVariant = 'brand',
  ariaLabel = 'SNPI Official Asterisk Brand Emblem',
}: AsteriskEmblemProps) {
  const gradientId = React.useId();

  // Resolve component colors based on colorVariant
  let headColor = '#0056FF';
  let chevronColor = '#2277FF';
  let baseColor = '#0056FF';

  if (colorVariant === 'white') {
    headColor = '#FFFFFF';
    chevronColor = '#FFFFFF';
    baseColor = '#FFFFFF';
  } else if (colorVariant === 'white-accent') {
    headColor = '#FFFFFF';
    chevronColor = '#60A5FA';
    baseColor = '#FFFFFF';
  } else if (colorVariant === 'current') {
    headColor = 'currentColor';
    chevronColor = 'currentColor';
    baseColor = 'currentColor';
  } else if (colorVariant === 'gradient') {
    headColor = `url(#${gradientId}-brand)`;
    chevronColor = `url(#${gradientId}-accent)`;
    baseColor = `url(#${gradientId}-brand)`;
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 overflow-visible select-none', className)}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id={`${gradientId}-brand`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0056FF" />
          <stop offset="100%" stopColor="#2277FF" />
        </linearGradient>
        <linearGradient id={`${gradientId}-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2277FF" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>

      {/* 1. Zenith Head Dot (Happy Human Mind / Top Anchor) */}
      <circle
        cx="50"
        cy="10"
        r="6.8"
        fill={headColor}
        style={{ fill: headColor, stroke: 'none' }}
      />

      {/* 2. Chevron Arms (Check Mark / Triumphant Raised Arms) */}
      <path
        d="M 18 22 L 50 47 L 82 22"
        fill="none"
        stroke={chevronColor}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: chevronColor, fill: 'none' }}
      />

      {/* 3. Radial Foundation (5 Base Spokes: Horizontal, Diagonals, and Vertical Base) */}
      <path
        d="M 7 54 L 50 64 L 93 54 M 22 86 L 50 64 L 78 86 M 50 64 L 50 94"
        fill="none"
        stroke={baseColor}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: baseColor, fill: 'none' }}
      />
    </svg>
  );
}

export interface AsteriskLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'hero';
  variant?: 'standard' | 'brand' | 'solid' | 'tint' | 'outline' | 'bare' | 'success';
  mode?: 'light' | 'dark';
  colorVariant?: 'brand' | 'white' | 'white-accent' | 'current' | 'gradient';
  className?: string;
  ariaLabel?: string;
}

const BOX_SIZE_CLASSES: Record<NonNullable<AsteriskLogoProps['size']>, string> = {
  xs: 'size-6 rounded-md p-0.5',
  sm: 'size-8 rounded-lg p-1',
  md: 'size-10 sm:size-11 rounded-xl p-1.5',
  lg: 'size-16 rounded-2xl p-2.5',
  xl: 'size-24 rounded-3xl p-3.5',
  '2xl': 'size-32 rounded-3xl p-5',
  '3xl': 'size-40 rounded-[2rem] p-6',
  hero: 'size-36 sm:size-44 md:size-52 rounded-[2.25rem] sm:rounded-[2.75rem] p-7 sm:p-9 shadow-2xl',
};

/**
 * Official SNPI Star / Asterisk Brand Emblem
 * Features high-contrast brand tokens with dual Light and Dark mode adaptation.
 */
export function AsteriskLogo({
  size = 'md',
  variant = 'standard',
  mode = 'light',
  colorVariant,
  className,
  ariaLabel = 'SNPI Official Asterisk Brand Emblem',
}: AsteriskLogoProps) {
  // Determine effective colorVariant if not explicitly set
  const effectiveColorVariant =
    colorVariant ||
    (variant === 'bare'
      ? mode === 'dark'
        ? 'white-accent'
        : 'brand'
      : variant === 'solid' || variant === 'brand'
        ? 'white-accent'
        : mode === 'dark'
          ? 'white-accent'
          : 'brand');

  // 'bare' variant: Transparent background, pure vector emblem
  if (variant === 'bare') {
    return (
      <div
        className={cn(
          'inline-flex shrink-0 items-center justify-center transition-transform duration-300 select-none hover:scale-105',
          BOX_SIZE_CLASSES[size],
          'border-0 bg-transparent p-0 shadow-none ring-0',
          className,
        )}
      >
        <AsteriskEmblem colorVariant={effectiveColorVariant} ariaLabel={ariaLabel} />
      </div>
    );
  }

  // Squircle Container Styles mapped to brand tokens
  const containerClassesByVariant = {
    standard:
      mode === 'dark'
        ? 'bg-[#0A1A4A] border border-white/20 ring-4 ring-white/10 shadow-lg shadow-black/30'
        : 'bg-white border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-sm shadow-[#0056FF]/10',
    brand:
      'bg-gradient-to-b from-[#0056FF] to-[#0048D9] border border-[#0056FF]/40 ring-4 ring-[#0056FF]/20 shadow-lg shadow-[#0056FF]/30',
    solid: 'bg-[#0056FF] border border-white/20 ring-4 ring-white/10 shadow-md shadow-[#0056FF]/20',
    tint:
      mode === 'dark'
        ? 'bg-white/10 border border-white/15 ring-2 ring-white/5'
        : 'bg-[#EFF5FF] border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-2xs',
    outline:
      mode === 'dark'
        ? 'bg-transparent border-2 border-white/30 text-white'
        : 'bg-white border-2 border-[#0056FF] text-[#0056FF]',
    success:
      'bg-emerald-500 border border-emerald-400 ring-4 ring-emerald-500/20 shadow-md shadow-emerald-500/20',
  };

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-all duration-300 select-none hover:scale-105',
        BOX_SIZE_CLASSES[size],
        containerClassesByVariant[variant],
        className,
      )}
      aria-label={ariaLabel}
      role="img"
    >
      <AsteriskEmblem colorVariant={effectiveColorVariant} ariaLabel={ariaLabel} />
    </div>
  );
}
