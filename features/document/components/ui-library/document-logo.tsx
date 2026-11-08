'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AsteriskLogo, SaveLogoButton } from './asterisk-logo';

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

  /**
   * Simple button to save the logo as seen original in web ("only logo")
   */
  showSaveButton?: boolean;
}

const VARIANT_CONTAINER_STYLES = {
  header: {
    container: 'gap-3',
    textContainer: 'min-w-0',
    titleSize: 'text-base sm:text-lg font-black',
    subtitleSize: 'text-[11px] sm:text-xs font-bold',
  },
  hero: {
    container: 'gap-6 sm:gap-8',
    textContainer: 'min-w-0 text-center',
    titleSize: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black',
    subtitleSize: 'text-sm sm:text-base md:text-lg font-bold',
  },
  inline: {
    container: 'gap-2',
    textContainer: 'min-w-0',
    titleSize: 'text-xs sm:text-sm font-bold',
    subtitleSize: 'text-[10px] font-medium',
  },
  footer: {
    container: 'gap-4',
    textContainer: 'min-w-0',
    titleSize: 'text-lg sm:text-xl font-black',
    subtitleSize: 'text-xs sm:text-sm font-bold',
  },
};

const LOGO_SIZE_MAP = {
  header: 'md',
  hero: 'hero',
  inline: 'xs',
  footer: 'lg',
} as const;

export function DocumentLogo({
  variant = 'header',
  mode = 'light',
  showLabel = true,
  label = 'SNPI-SMS',
  subtitle = 'API Documentation',
  className,
  href,
  centered = false,
  showSaveButton,
}: DocumentLogoProps) {
  const styles = VARIANT_CONTAINER_STYLES[variant];
  const shouldShowSaveButton = showSaveButton ?? variant === 'hero';

  // Light mode colors (default for document pages) - STRICT: Motionless logo, NO hover scaling
  const lightModeColors = {
    title: 'text-[#020617]',
    subtitle: 'text-[#0056FF]',
    hoverTitle: 'group-hover:text-[#0056FF]',
  };

  // Dark mode colors (default for navigation headers) - STRICT: Motionless logo, NO hover scaling
  const darkModeColors = {
    title: 'text-white',
    subtitle: 'text-blue-200',
    hoverTitle: 'group-hover:text-blue-100',
  };

  const colors = mode === 'dark' ? darkModeColors : lightModeColors;

  const logoElement = (
    <AsteriskLogo
      size={LOGO_SIZE_MAP[variant]}
      variant={mode === 'dark' ? 'solid' : 'standard'}
      mode={mode}
      ariaLabel={`${label} Official Asterisk Brand Logo`}
    />
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

  const saveButtonElement = shouldShowSaveButton && (
    <div className={centered ? 'mt-4 flex items-center justify-center' : 'mt-2'}>
      <SaveLogoButton />
    </div>
  );

  // STRICT POLICY: Solid, stable container without jumping hover effects or scale animations
  const containerClasses = cn(
    'group flex select-none',
    centered ? 'flex-col items-center justify-center' : 'items-center',
    styles.container,
    className,
  );

  if (href) {
    return (
      <div
        className={
          centered ? 'flex flex-col items-center justify-center' : 'inline-flex items-center gap-3'
        }
      >
        <Link href={href} className={containerClasses} title={`${label} - ${subtitle}`}>
          {logoElement}
          {textElement}
        </Link>
        {saveButtonElement}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {logoElement}
      {textElement}
      {saveButtonElement}
    </div>
  );
}
