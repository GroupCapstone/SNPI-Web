'use client';

import * as React from 'react';
import { X } from '@/components/icons';
import { cn } from '@/lib/utils';

export interface LibraryChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function LibraryChip({
  active = false,
  onDismiss,
  icon,
  children,
  className,
  onClick,
  ...props
}: LibraryChipProps) {
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'inline-flex h-8 items-center gap-1.5 rounded-[4px] px-3 text-xs font-bold transition-all duration-150 ease-out select-none focus-visible:outline-none active:scale-[0.97]',
          active
            ? 'border-0 bg-[#0056FF] text-white shadow-none'
            : 'border border-slate-300 bg-slate-50/80 text-slate-700 hover:border-[#0056FF] hover:bg-blue-50/40 hover:text-[#0056FF]',
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0 bg-transparent">{icon}</span>}
        <span>{children}</span>
      </button>
      {onDismiss && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          aria-label="Remove filter"
          className="ml-1 flex min-h-[44px] min-w-[28px] items-center justify-center rounded-[4px] text-slate-400 hover:text-slate-700"
        >
          <X className="size-3.5" />
        </button>
      )}
    </span>
  );
}
