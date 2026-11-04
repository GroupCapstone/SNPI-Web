'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LibrarySwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  'aria-label'?: string;
  className?: string;
}

export function LibrarySwitch({
  checked,
  onCheckedChange,
  disabled = false,
  id,
  name,
  'aria-label': ariaLabel,
  className,
}: LibrarySwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      id={id}
      name={name}
      onClick={() => {
        if (!disabled) onCheckedChange(!checked);
      }}
      className={cn(
        'group relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      {/* Track */}
      <span
        className={cn(
          'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-blue-500/50',
          checked ? 'bg-[#0056FF]' : 'bg-slate-300',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        {/* Thumb */}
        <span
          className={cn(
            'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </span>
    </button>
  );
}
