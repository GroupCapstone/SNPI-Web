'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Plus } from '@/components/icons';

export interface LibraryFabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
  variant?: 'primary' | 'secondary' | 'surface';
  size?: 'default' | 'small';
}

export function LibraryFab({
  icon = <Plus className="h-6 w-6" />,
  label,
  variant = 'primary',
  size = 'default',
  className,
  ...props
}: LibraryFabProps) {
  const isExtended = Boolean(label);

  const variantStyles = {
    primary:
      'bg-[#0056FF] text-white hover:bg-[#0040C0] border border-[#0056FF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),_0_8px_20px_rgba(0,86,255,0.25)] active:scale-95',
    secondary:
      'bg-[#E3E7FC] text-[#0056FF] hover:bg-[#D5DCFA] border border-[#CAD3F5] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_4px_12px_rgba(0,86,255,0.08)] active:scale-95',
    surface:
      'bg-white text-slate-800 hover:bg-slate-50 border border-slate-200/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),_0_4px_12px_rgba(0,0,0,0.04)] hover:border-[#0056FF]/40 active:scale-95',
  };

  const sizeStyles = {
    default: isExtended
      ? 'h-12 px-5 text-sm font-bold gap-2.5 rounded-[4px]'
      : 'h-12 w-12 rounded-[4px]',
    small: isExtended
      ? 'h-10 px-4 text-xs font-bold gap-2 rounded-[4px]'
      : 'h-10 w-10 rounded-[4px]',
  };

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center transition-all duration-150 select-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:outline-none',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      <span className="shrink-0">{icon}</span>
      {label && <span className="truncate">{label}</span>}
    </button>
  );
}
