'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { WHILE_TAP_SCALE, KNOB_STRETCH_RATIO, switchKnobTransition } from '@/lib/motion';

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
    <motion.button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      id={id}
      name={name}
      whileTap={{ scale: disabled ? 1 : WHILE_TAP_SCALE }}
      onClick={() => {
        if (!disabled) onCheckedChange(!checked);
      }}
      className={cn(
        'group relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      {/* Track - Law 9: Ease-in-out for moves */}
      <span
        className={cn(
          'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-blue-500/50',
          checked ? 'bg-[#0056FF]' : 'bg-slate-300',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        {/* Thumb - Law 5: Stretch moving knobs 12% & Law 13: Zero bounce on everyday UI */}
        <motion.span
          animate={{
            x: checked ? 20 : 0,
            scaleX: [1, KNOB_STRETCH_RATIO, 1],
          }}
          transition={switchKnobTransition}
          className="pointer-events-none inline-block size-5 origin-center rounded-full bg-white shadow-xs"
        />
      </span>
    </motion.button>
  );
}
