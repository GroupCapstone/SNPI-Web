'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AsteriskEmblem } from './asterisk-logo';

export interface DocumentLogoProps {
  /**
   * Visual variant controlling the container style
   * - header: Compact logo for navigation headers
   * - hero: Large centered logo for hero sections
   * - inline: Small inline logo for content
   * - footer: Medium logo for footer sections
   */
  variant?: 'header' | 'hero' | 'inline' | 'footer';

  /**
   * Theme mode for color adaptation
   * - light: White/light background (default for document pages)
   * - dark: Dark background
   */
  mode?: 'light' | 'dark';

  /**
   * Show text label next to logo
   */
  showLabel?: boolean;

  /**
   * Custom label text (defaults to "SNPI-SMS")
   */
  label?: string;

  /**
   * Subtitle text (defaults to "API Documentation")
   */
  subtitle?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Make the logo clickable
   */
  href?: string;

  /**
   * Center align the logo
   */
  centered?: boolean;
}

const VARIANT_STYLES = {
  header: {
    container: 'gap-3',
    logoSize: 'size-10 sm:size-11',
    logoRounded: 'rounded-xl',
    logoShadow: 'shadow-sm',
    emblemPadding: 'p-1.5 sm:p-2',
    textContainer: 'min-w-0',
    titleSize: 'text-base sm:text-lg font-black',
    subtitleSize: 'text-[11px] sm:text-xs font-bold',
  },
  hero: {
    container: 'gap-6',
    logoSize: 'size-32 sm:size-40 md:size-48 lg:size-56',
    logoRounded: 'rounded-3xl sm:rounded-[2.5rem]',
    logoShadow: 'shadow-2xl shadow-[#0056FF]/20',
    emblemPadding: 'p-6 sm:p-8 md:p-10',
    textContainer: 'min-w-0 text-center',
    titleSize: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black',
    subtitleSize: 'text-sm sm:text-base md:text-lg font-bold',
  },
  inline: {
    container: 'gap-2',
    logoSize: 'size-6 sm:size-7',
    logoRounded: 'rounded-lg',
    logoShadow: 'shadow-xs',
    emblemPadding: 'p-0.5 sm:p-1',
    textContainer: 'min-w-0',
    titleSize: 'text-xs sm:text-sm font-bold',
    subtitleSize: 'text-[10px] font-medium',
  },
  footer: {
    container: 'gap-4',
    logoSize: 'size-14 sm:size-16',
    logoRounded: 'rounded-2xl',
    logoShadow: 'shadow-md',
    emblemPadding: 'p-2.5 sm:p-3',
    textContainer: 'min-w-0',
    titleSize: 'text-lg sm:text-xl font-black',
    subtitleSize: 'text-xs sm:text-sm font-bold',
  },
};

export function DocumentLogo({
  variant = 'header',
  mode = 'light',
  showLabel = true,
  label = 'SNPI-SMS',
  subtitle = 'API Documentation',
  className,
  href,
  centered = false,
}: DocumentLogoProps) {
  const styles = VARIANT_STYLES[variant];

  // Light mode colors (default for document pages)
  const lightModeColors = {
    logoBorder: 'border-[#CAD3F5]',
    logoBg: 'bg-white',
    logoRing: 'ring-4 ring-[#0056FF]/10',
    title: 'text-[#0A1A4A]',
    subtitle: 'text-[#0056FF]',
    hoverTitle: 'group-hover:text-[#0056FF]',
    hoverLogo: 'group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-[#0056FF]/30',
    colorVariant: 'brand' as const,
  };

  // Dark mode colors (default for navigation headers)
  const darkModeColors = {
    logoBorder: 'border-white/20',
    logoBg: 'bg-[#0A1A4A]/90 backdrop-blur-md',
    logoRing: 'ring-4 ring-white/10',
    title: 'text-white',
    subtitle: 'text-blue-200',
    hoverTitle: 'group-hover:text-blue-100',
    hoverLogo: 'group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-white/20',
    colorVariant: 'white-accent' as const,
  };

  const colors = mode === 'dark' ? darkModeColors : lightModeColors;

  const logoElement = (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden border transition-all duration-300',
        styles.logoSize,
        styles.logoRounded,
        styles.logoShadow,
        colors.logoBorder,
        colors.logoBg,
        colors.logoRing,
        colors.hoverLogo,
      )}
    >
      <AsteriskEmblem
        colorVariant={colors.colorVariant}
        className={cn('size-full transition-transform duration-300', styles.emblemPadding)}
        ariaLabel={`${label} Official Asterisk Emblem`}
      />
    </div>
  );

  const textElement = showLabel && (
    <div className={styles.textContainer}>
      <p
        className={cn(
          'truncate tracking-tight transition-colors',
          styles.titleSize,
          colors.title,
          colors.hoverTitle,
        )}
      >
        {label}
      </p>
      {subtitle && (
        <p
          className={cn(
            'truncate tracking-wide uppercase transition-colors',
            styles.subtitleSize,
            colors.subtitle,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );

  const containerClasses = cn(
    'group flex select-none transition-all',
    centered ? 'flex-col items-center justify-center' : 'items-center',
    styles.container,
    className,
  );

  if (href) {
    return (
      <Link href={href} className={containerClasses} title={`${label} - ${subtitle}`}>
        {logoElement}
        {textElement}
      </Link>
    );
  }

  return (
    <div className={containerClasses}>
      {logoElement}
      {textElement}
    </div>
  );
}
