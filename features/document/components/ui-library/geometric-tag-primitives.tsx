'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface GeometricButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'outline'
    | 'blue'
    | 'azure'
    | 'black'
    | 'soft-lavender'
    | 'white'
    | 'futurewave'
    | 'midnight'
    | 'green'
    | 'purple'
    | 'orange'
    | 'navy'
    | 'cyan'
    | 'ghost'
    | 'tab'
    | 'ticket'
    | 'speech';
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showAsterisk?: boolean;
  attachedTag?: string;
  icon?: React.ReactNode;
  iconTileClassName?: string;
  notchPosition?: 'top-right' | 'bottom-right' | 'none';
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Capsule Pill Button with Squircle Icon Tile
 * Inspired by reference design (Digital, Finance, Simple, Fast, Secure, Fluid)
 * Features 2px continuous colored stroke, pastel surface tint, and left icon tile.
 */
export const GeometricButton = React.forwardRef<HTMLButtonElement, GeometricButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      isActive = false,
      size = 'md',
      attachedTag,
      icon,
      iconTileClassName,
      href,
      target,
      rel,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Size tokens: Standard Button default border-radius = 4px (rounded-[4px])
    const sizeClasses = {
      sm: 'h-8 px-2.5 text-xs font-bold gap-2 rounded-[4px]',
      md: 'h-10 px-3.5 text-xs font-bold gap-2.5 rounded-[4px]',
      lg: 'h-12 px-4 text-sm font-bold gap-3 rounded-[4px]',
    }[size];

    // Normalize variant aliases
    const resolvedVariant =
      variant === 'primary' || variant === 'tab' || variant === 'ticket' || variant === 'speech'
        ? 'blue'
        : variant;

    // Variant style configurations: Standard Button border = 0px (border-0) & border-radius: 4px
    const variantStyles = {
      blue: {
        button: isActive
          ? 'border-0 bg-[#0056FF] text-white shadow-none'
          : 'border-0 bg-[#0056FF] text-white hover:bg-[#0047D4] active:bg-[#003CB3]',
      },
      azure: {
        button: isActive
          ? 'border-0 bg-[#2277FF] text-white shadow-none'
          : 'border-0 bg-[#2277FF] text-white hover:bg-[#1A63D6]',
      },
      black: {
        button: isActive
          ? 'border-0 bg-[#0056FF] text-white shadow-none'
          : 'border-0 bg-[#0056FF]/10 text-[#0056FF] hover:bg-[#0056FF]/20',
      },
      'soft-lavender': {
        button: isActive
          ? 'border-0 bg-[#CAD3F5] text-[#020617] shadow-none'
          : 'border-0 bg-[#E3E7FC] text-[#020617] hover:bg-[#D5DBF9]',
      },
      white: {
        button: isActive
          ? 'border-0 bg-[#0056FF] text-white shadow-none'
          : 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50',
      },
      futurewave: {
        button: isActive
          ? 'border-0 bg-[#2277FF] text-white shadow-none'
          : 'border-0 bg-[#EFF5FF] text-[#0056FF] hover:bg-[#E3E7FC]',
      },
      midnight: {
        button: isActive
          ? 'border-0 bg-[#0056FF] text-white shadow-none'
          : 'border-0 bg-[#E3E7FC] text-[#0056FF] hover:bg-[#CAD3F5]',
      },
      // Palette-preserving aliases for legacy callers
      green: {
        button: isActive
          ? 'border-0 bg-[#2277FF] text-white shadow-none'
          : 'border-0 bg-[#2277FF]/15 text-[#0056FF] hover:bg-[#2277FF]/25',
      },
      purple: {
        button: isActive
          ? 'border-0 bg-[#CAD3F5] text-[#020617] shadow-none'
          : 'border-0 bg-[#E3E7FC] text-[#020617] hover:bg-[#D5DBF9]',
      },
      orange: {
        button: isActive
          ? 'border-0 bg-[#2277FF] text-white shadow-none'
          : 'border-0 bg-[#EFF5FF] text-[#0056FF] hover:bg-[#E3E7FC]',
      },
      navy: {
        button: isActive
          ? 'border-0 bg-[#0056FF] text-white shadow-none'
          : 'border-0 bg-[#EFF5FF] text-[#0056FF] hover:bg-[#E3E7FC]',
      },
      cyan: {
        button: isActive
          ? 'border-0 bg-[#2277FF] text-white shadow-none'
          : 'border-0 bg-[#2277FF]/15 text-[#0056FF]',
      },
      outline: {
        button: isActive
          ? 'border-0 bg-[#0056FF] text-white shadow-none'
          : 'border border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF] hover:bg-[#E3E7FC]',
      },
      ghost: {
        button: isActive
          ? 'border-0 bg-slate-100 text-slate-900'
          : 'border-0 bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950',
      },
    }[
      resolvedVariant as
        | 'blue'
        | 'azure'
        | 'black'
        | 'soft-lavender'
        | 'white'
        | 'futurewave'
        | 'midnight'
        | 'green'
        | 'purple'
        | 'orange'
        | 'navy'
        | 'cyan'
        | 'outline'
        | 'ghost'
    ] || {
      button: 'border-2 border-slate-300 bg-slate-50 text-slate-700',
    };

    // Separate leading icon child from text children if present
    const childArray = React.Children.toArray(children);
    let leadingIcon = icon;
    let labelChildren: React.ReactNode = children;

    if (
      !leadingIcon &&
      !attachedTag &&
      childArray.length > 1 &&
      React.isValidElement(childArray[0])
    ) {
      leadingIcon = childArray[0];
      labelChildren = childArray.slice(1);
    }

    const tileContent =
      leadingIcon ||
      (attachedTag ? (
        <span className="font-mono font-bold tracking-tight">{attachedTag}</span>
      ) : null);

    const buttonBody = (
      <>
        {tileContent && (
          <span
            className={cn(
              'flex shrink-0 items-center justify-center bg-transparent transition-colors',
              iconTileClassName,
            )}
          >
            {tileContent}
          </span>
        )}
        <span className="truncate tracking-tight">{labelChildren}</span>
      </>
    );

    const commonClasses = cn(
      'group relative inline-flex items-center justify-center font-sans tracking-tight transition-all duration-150 active:scale-[0.97] ease-out select-none cursor-pointer',
      sizeClasses,
      variantStyles.button,
      disabled && 'pointer-events-none cursor-not-allowed opacity-50',
      className,
    );

    if (href) {
      const isExternal = href.startsWith('http') || target === '_blank';
      if (isExternal) {
        return (
          <a
            href={href}
            target={target || '_blank'}
            rel={rel || 'noopener noreferrer'}
            className={commonClasses}
          >
            {buttonBody}
          </a>
        );
      }
      return (
        <Link href={href} prefetch={true} className={commonClasses}>
          {buttonBody}
        </Link>
      );
    }

    return (
      <button ref={ref} disabled={disabled} className={commonClasses} {...props}>
        {buttonBody}
      </button>
    );
  },
);

GeometricButton.displayName = 'GeometricButton';

/**
 * Capsule Pill Input with Matching Button Aesthetics
 * Shares the same 2px continuous border, rounded-full pill geometry,
 * clean inline icon with zero color behind it, and focused states.
 * Incorporates Primary Brand Colors: Royal Blue (#0056FF), Azure Blue (#2277FF),
 * Soft Lavender (#E3E7FC), Black (#000000), and White (#FFFFFF).
 */
export interface GeometricInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  variant?: 'outline' | 'blue' | 'azure' | 'soft-lavender' | 'black' | 'error';
  inputSize?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  isLoading?: boolean;
}

export const GeometricInput = React.forwardRef<HTMLInputElement, GeometricInputProps>(
  (
    {
      className,
      variant = 'outline',
      inputSize = 'md',
      icon,
      clearable = false,
      onClear,
      isLoading = false,
      disabled,
      value,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: 'h-8 px-3 text-xs gap-2 rounded-[4px]',
      md: 'h-11 px-4 text-sm gap-2 rounded-[4px]',
      lg: 'h-12 px-4 text-sm gap-3 rounded-[4px]',
    }[inputSize];

    const variantStyles = {
      outline:
        'border-2 border-[#CAD3F5] bg-[#EFF5FF] text-[#020617] placeholder-[#0056FF]/50 focus-within:border-[#0056FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0056FF]/20 hover:border-[#2277FF]',
      blue: 'border-2 border-[#0056FF] bg-[#EFF5FF] text-[#020617] placeholder-[#0056FF]/50 focus-within:border-[#0056FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0056FF]/20',
      azure:
        'border-2 border-[#2277FF] bg-[#EFF5FF] text-[#020617] placeholder-[#2277FF]/60 focus-within:border-[#2277FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2277FF]/20',
      'soft-lavender':
        'border-2 border-[#CAD3F5] bg-[#E3E7FC] text-[#020617] placeholder-[#0056FF]/50 focus-within:border-[#0056FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0056FF]/20',
      black:
        'border-2 border-[#020617] bg-white text-[#020617] placeholder-[#020617]/40 focus-within:border-[#020617] focus-within:bg-white',
      error:
        'border-2 border-rose-500 bg-rose-50/50 text-rose-950 placeholder-rose-300 focus-within:border-rose-600 focus-within:bg-white',
    }[variant];

    const iconColor = {
      outline: 'text-[#0056FF]',
      blue: 'text-[#0056FF]',
      azure: 'text-[#2277FF]',
      'soft-lavender': 'text-[#0056FF]',
      black: 'text-[#020617]',
      error: 'text-rose-500',
    }[variant];

    const hasValue = value !== undefined && value !== null && String(value).length > 0;

    return (
      <div
        className={cn(
          'group relative flex w-full items-center font-sans tracking-tight transition-all duration-150 select-none',
          sizeClasses,
          variantStyles,
          disabled && 'pointer-events-none cursor-not-allowed opacity-50',
          className,
        )}
      >
        {icon && (
          <span
            className={cn(
              'flex shrink-0 items-center justify-center bg-transparent transition-colors',
              iconColor,
            )}
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          value={value}
          data-geometric="true"
          style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
          className="geometric-input-field w-full min-w-0 border-0 bg-transparent font-sans text-sm font-medium text-[#020617] ring-0 outline-none placeholder:text-[#0056FF]/50 focus:border-0 focus:ring-0 focus:outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none"
          {...props}
        />
        {isLoading && (
          <span className="flex shrink-0 items-center justify-center">
            <span className="size-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-[#0056FF]" />
          </span>
        )}
        {clearable && hasValue && !disabled && !isLoading && (
          <button
            type="button"
            onClick={onClear}
            className="flex size-4 shrink-0 items-center justify-center rounded-full bg-slate-200/80 text-[10px] font-bold text-slate-600 transition-colors hover:bg-slate-300 hover:text-slate-900"
            aria-label="Clear text"
          >
            x
          </button>
        )}
      </div>
    );
  },
);

GeometricInput.displayName = 'GeometricInput';

/**
 * Apple-style Liquid Glass Card Container
 */
export function GeometricCard({
  children,
  className,
  isActive = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'chamfer' | 'ticket' | 'speech' | 'stepped' | 'pinnacle';
  isActive?: boolean;
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl transition-all duration-300 ease-out',
        'border border-[#CAD3F5] bg-white shadow-none',
        isActive ? 'border-[#0056FF] ring-1 ring-[#0056FF]' : 'hover:border-[#0056FF]',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Clean Typographic Stamp (No emoji, no symbol)
 */
export function GeometricHeaderStamp({
  codeA = '20',
  titleA = 'BRAND',
  codeB = '26',
  titleB = 'DESIGN',
  className,
}: {
  codeA?: string;
  titleA?: string;
  codeB?: string;
  titleB?: string;
  className?: string;
}) {
  return (
    <div className={cn('inline-flex flex-col font-sans select-none', className)}>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xl font-black tracking-tighter text-slate-950 sm:text-2xl">
          {codeA}
        </span>
        <span className="h-4 w-[2px] bg-[#0056FF]" />
        <span className="text-base font-black tracking-tight text-slate-950 uppercase sm:text-lg">
          {titleA}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xl font-black tracking-tighter text-slate-950 sm:text-2xl">
          {codeB}
        </span>
        <span className="h-4 w-[2px] bg-[#0056FF]" />
        <span className="text-base font-black tracking-tight text-slate-950 uppercase sm:text-lg">
          {titleB}
        </span>
      </div>
    </div>
  );
}
