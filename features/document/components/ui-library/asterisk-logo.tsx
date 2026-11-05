'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Download } from '@/components/icons';

export interface AsteriskLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'hero';
  /**
   * Visual variant:
   * - standard: Light mode: Pure White tile with Royal Blue (#0056FF) Sora asterisk; Dark mode: Deep Navy (#0A1A4A) tile with White Sora asterisk
   * - brand / solid: Royal Blue (#0056FF) gradient squircle tile with crisp White Sora asterisk
   * - tint: Ice Tint (#EFF5FF) tile with Royal Blue (#0056FF) Sora asterisk
   * - outline: 2px border with Royal Blue (#0056FF) Sora asterisk
   * - bare: Transparent background, pure Sora bold asterisk vector mark in Royal Blue (#0056FF)
   */
  variant?: 'standard' | 'brand' | 'solid' | 'tint' | 'outline' | 'bare' | 'success';
  mode?: 'light' | 'dark';
  colorVariant?: 'brand' | 'white' | 'white-accent' | 'current' | 'gradient';
  className?: string;
  ariaLabel?: string;
}

/**
 * Official Sora Bold (wght=800) Asterisk Vector Path
 * Mathematically normalized to a 100x100 coordinate space:
 * - Center X: exactly 50.00
 * - Center Y: exactly 50.00
 * - Horizontal Margins: exactly 12.52 on both Left and Right
 * - Vertical Margins: exactly 12.00 on both Top and Bottom
 * - Dead-center, completely stable across all viewports and devices
 */
export const SORA_BOLD_ASTERISK_PATH =
  'M 77.75 75.73 L 55.16 58.98 L 55.16 41.02 L 77.75 24.27 L 87.48 41.62 L 69.67 48.65 L 69.67 51.35 L 87.48 58.38 Z M 56.96 12.00 L 53.81 39.98 L 38.26 48.95 L 12.52 37.73 L 22.55 20.68 L 37.66 32.50 L 39.90 31.15 L 37.06 12.30 Z M 12.52 62.27 L 38.26 51.05 L 53.81 60.02 L 56.96 88.00 L 37.21 87.70 L 39.90 68.85 L 37.66 67.50 L 22.70 79.32 Z';

/**
 * Pure Vector Glyph for the Sora Bold Asterisk Brand Mark
 * Solid vector rendering with zero baseline shift, zero text selection artifacts, and zero font metric wobble.
 */
export function AsteriskVectorGlyph({
  color = '#0056FF',
  className,
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: {
  color?: string;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-full shrink-0 overflow-visible select-none', className)}
      role="img"
      aria-label={ariaLabel}
    >
      <path
        d={SORA_BOLD_ASTERISK_PATH}
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fillRule="nonzero"
      />
    </svg>
  );
}

/**
 * Standardized Squircle Sizing Classes
 * Enlarged for bold, prominent brand visibility and perfectly balanced internal padding.
 */
const BOX_SIZE_CLASSES: Record<NonNullable<AsteriskLogoProps['size']>, string> = {
  xs: 'size-6 rounded-md p-0.5',
  sm: 'size-8 rounded-lg p-1',
  md: 'size-10 sm:size-11 rounded-xl p-1.5',
  lg: 'size-16 rounded-2xl p-2.5',
  xl: 'size-24 rounded-3xl p-3.5',
  '2xl': 'size-32 rounded-3xl p-4.5',
  '3xl': 'size-40 rounded-[2rem] p-5.5',
  hero: 'size-36 sm:size-44 md:size-52 lg:size-60 rounded-[2.25rem] sm:rounded-[2.75rem] p-6 sm:p-8 md:p-10 shadow-2xl',
};

/**
 * Official SNPI Star / Asterisk Brand Logo
 * Rendered using the original bold Sora typeface geometric asterisk as a pure, mathematically centered vector logo.
 * STRICT POLICY: Motionless and stable. Zero hover scaling, zero jumping, zero animation events.
 * Brand Color Standard: Pure Brand Blue (#0056FF / #2277FF) on light canvas; Crisp White (#FFFFFF) on dark/royal surfaces.
 */
export function AsteriskLogo({
  size = 'md',
  variant = 'standard',
  mode = 'light',
  className,
  ariaLabel = 'SNPI Official Asterisk Brand Logo',
}: AsteriskLogoProps) {
  // Determine glyph color: only blue (#0056FF) on light canvas; pure white (#FFFFFF) on dark surfaces
  const isDarkSurface = mode === 'dark' || variant === 'solid' || variant === 'brand';
  const glyphColor = isDarkSurface ? '#FFFFFF' : '#0056FF';

  // 'bare' variant: Transparent background, pure vector emblem without container
  if (variant === 'bare') {
    return (
      <div
        className={cn(
          'inline-flex shrink-0 items-center justify-center border-0 bg-transparent p-0 ring-0 select-none',
          BOX_SIZE_CLASSES[size],
          className,
        )}
      >
        <AsteriskVectorGlyph color={glyphColor} ariaLabel={ariaLabel} />
      </div>
    );
  }

  // Squircle Container Styles mapped to brand tokens (Only Blue)
  // Strictly stationary: NO hover:scale, NO transitions, NO transform wobbles
  const containerClassesByVariant = {
    standard:
      mode === 'dark'
        ? 'bg-[#0A1A4A] border border-white/20 ring-4 ring-white/10 shadow-md shadow-black/20'
        : 'bg-white border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-sm shadow-[#0056FF]/10',
    brand:
      'bg-gradient-to-b from-[#0056FF] to-[#0048D9] border border-[#0056FF]/40 ring-4 ring-[#0056FF]/20 shadow-md shadow-[#0056FF]/25',
    solid: 'bg-[#0056FF] border border-white/20 ring-4 ring-white/10 shadow-md shadow-[#0056FF]/20',
    tint:
      mode === 'dark'
        ? 'bg-white/10 border border-white/15'
        : 'bg-[#EFF5FF] border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-2xs',
    outline:
      mode === 'dark'
        ? 'bg-transparent border-2 border-white'
        : 'bg-white border-2 border-[#0056FF] shadow-xs',
    success:
      'bg-white border border-[#CAD3F5] ring-4 ring-[#0056FF]/10 shadow-sm shadow-[#0056FF]/10',
  };

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center select-none',
        BOX_SIZE_CLASSES[size],
        containerClassesByVariant[variant],
        className,
      )}
      aria-label={ariaLabel}
      role="img"
    >
      <AsteriskVectorGlyph color={glyphColor} ariaLabel={ariaLabel} />
    </div>
  );
}

/**
 * Backward-compatible AsteriskEmblem export referencing the official bold Sora asterisk vector mark
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

  return <AsteriskVectorGlyph color={glyphColor} className={className} ariaLabel={ariaLabel} />;
}

/**
 * Triggers a browser download of the clean, original SNPI Asterisk brand logo vector ("only logo").
 * Generates an SVG matching the exact vector geometry seen on the web.
 */
export function downloadOriginalLogo(filename = 'snpi-brand-logo.svg') {
  if (typeof window === 'undefined') return;
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512" fill="none">
  <path d="${SORA_BOLD_ASTERISK_PATH}" fill="#0056FF" stroke="#0056FF" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" fill-rule="nonzero"/>
</svg>`;
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Simple button to save the logo as seen original in web ("only logo").
 */
export function SaveLogoButton({
  className,
  label = 'Save Logo',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        downloadOriginalLogo();
      }}
      className={cn(
        'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-[#EFF5FF] px-3 py-1.5 font-mono text-xs font-bold text-[#0056FF] shadow-2xs transition-colors select-none hover:border-[#0056FF] hover:bg-[#E3E7FC] active:bg-[#CAD3F5]',
        className,
      )}
      title="Save original brand logo as seen in web (SVG, only logo)"
      aria-label={label}
    >
      <Download className="size-3.5 shrink-0" />
      <span>{label}</span>
    </button>
  );
}
