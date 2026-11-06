'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Info, Alert } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
  MOTION_EASE_OUT,
  WHILE_TAP_SCALE,
  DROPDOWN_ENTRANCE_DURATION,
  DROPDOWN_EXIT_DURATION,
} from '@/lib/motion';

export type SnackbarVariant = 'default' | 'success' | 'info' | 'warning' | 'error';

export interface LibrarySnackbarProps {
  open: boolean;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose: () => void;
  duration?: number;
  variant?: SnackbarVariant;
  showProgress?: boolean;
  className?: string;
}

/**
 * Official Native Snackbar Component
 *
 * Modeled after Gmail and native Google Material Design standards:
 * - Anchored bottom-center (never top-corner toast/sonner drift)
 * - Level 2 elevated obsidian surface (#0F172A) with 1px luminance border
 * - Interactive action recovery button (e.g. "Undo", "Retry") with >= 44x44px touch targets
 * - Smooth countdown progress bar that pauses on hover/focus
 * - High-contrast variant status pills (Success, Info, Warning, Error)
 * - role="status", aria-live="polite" accessibility
 */
export function LibrarySnackbar({
  open,
  message,
  actionLabel,
  onAction,
  onClose,
  duration = 5000,
  variant = 'default',
  showProgress = true,
  className,
}: LibrarySnackbarProps) {
  const [isPaused, setIsPaused] = React.useState(false);
  const [remainingTime, setRemainingTime] = React.useState(duration);
  const startTimeRef = React.useRef<number>(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Reset timer on open or message change
  React.useEffect(() => {
    if (!open || duration <= 0) {
      setRemainingTime(duration);
      return;
    }

    setRemainingTime(duration);
    startTimeRef.current = Date.now();
  }, [open, message, duration]);

  // Handle countdown with pause on hover
  React.useEffect(() => {
    if (!open || duration <= 0 || isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 100) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [open, duration, isPaused, onClose]);

  const progressPercent = duration > 0 ? (remainingTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: DROPDOWN_ENTRANCE_DURATION,
              ease: MOTION_EASE_OUT,
            },
          }}
          exit={{
            opacity: 0,
            y: 12,
            scale: 0.96,
            transition: {
              duration: DROPDOWN_EXIT_DURATION,
              ease: [0.7, 0, 0.84, 0],
            },
          }}
          className={cn(
            'z-50 flex flex-col overflow-hidden border border-[#CAD3F5] bg-white text-[#09172B] shadow-lg select-none max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:w-full max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 sm:fixed sm:bottom-6 sm:left-1/2 sm:w-[calc(100%-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:rounded-2xl',
            className,
          )}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            {/* Status Indicator Icon (Zero Background Color Behind Icon) */}
            <div className="flex shrink-0 items-center">
              {variant === 'success' && <Check className="size-4 stroke-[2.5] text-emerald-600" />}
              {variant === 'info' && <Info className="size-4 stroke-[2.5] text-sky-600" />}
              {variant === 'warning' && <Alert className="size-4 stroke-[2.5] text-amber-600" />}
              {variant === 'error' && <Alert className="size-4 stroke-[2.5] text-rose-600" />}
              {variant === 'default' && <Info className="size-4 stroke-[2.5] text-[#0056FF]" />}
            </div>

            {/* Primary Message */}
            <p className="flex-1 font-sans text-xs leading-relaxed font-semibold text-[#09172B] sm:text-sm">
              {message}
            </p>

            {/* Action Button (e.g. Undo, Retry, View) - Law 4: Scale 0.97 on press */}
            {actionLabel && (
              <motion.button
                type="button"
                whileTap={{ scale: WHILE_TAP_SCALE }}
                onClick={() => {
                  onAction?.();
                  onClose();
                }}
                className={cn(
                  'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] px-3 font-mono text-xs font-bold tracking-wider uppercase transition-colors focus-visible:ring-2 focus-visible:outline-none',
                  variant === 'success' &&
                    'text-emerald-700 hover:bg-emerald-50 focus-visible:ring-emerald-500',
                  variant === 'info' && 'text-sky-700 hover:bg-sky-50 focus-visible:ring-sky-500',
                  variant === 'warning' &&
                    'text-amber-700 hover:bg-amber-50 focus-visible:ring-amber-500',
                  variant === 'error' && 'text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-500',
                  variant === 'default' &&
                    'text-[#0056FF] hover:bg-[#E3E7FC] focus-visible:ring-[#0056FF]',
                )}
              >
                {actionLabel}
              </motion.button>
            )}

            {/* Dismiss Button - Law 4: Scale 0.97 on press */}
            <motion.button
              type="button"
              whileTap={{ scale: WHILE_TAP_SCALE }}
              onClick={onClose}
              aria-label="Dismiss message"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none"
            >
              <X className="size-4" />
            </motion.button>
          </div>

          {/* Auto-Dismiss Progress Indicator Strip */}
          {showProgress && duration > 0 && (
            <div className="h-1 w-full bg-slate-100">
              <div
                className={cn(
                  'h-full transition-all duration-75 ease-linear',
                  variant === 'success' && 'bg-emerald-500',
                  variant === 'info' && 'bg-sky-500',
                  variant === 'warning' && 'bg-amber-500',
                  variant === 'error' && 'bg-rose-500',
                  variant === 'default' && 'bg-[#0056FF]',
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Official Native Snackbar In-Stage Demo Component
 * Rendered directly in place within the component catalog stage
 */
export function NativeSnackbarInline({
  message = 'Student enrollment confirmed for STU-2026-0891.',
  actionLabel = 'Undo',
  variant = 'success',
  onAction,
  onClose,
}: {
  message?: string;
  actionLabel?: string;
  variant?: SnackbarVariant;
  onAction?: () => void;
  onClose?: () => void;
}) {
  const [active, setActive] = React.useState(true);
  const [seconds, setSeconds] = React.useState(5);

  React.useEffect(() => {
    setActive(true);
    setSeconds(5);
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [message, variant]);

  return (
    <div className="w-full max-w-lg space-y-3">
      {/* Native Snackbar Outer Frame (Strict Clean Light Day Mode & Responsive Border) */}
      <div className="relative overflow-hidden border border-[#CAD3F5] bg-white text-[#09172B] shadow-none max-sm:rounded-none max-sm:border-x-0 max-sm:border-y sm:rounded-2xl">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          {/* Status Icon (No Background Color Behind Icon) */}
          <div className="flex shrink-0 items-center">
            {variant === 'success' && <Check className="size-4 stroke-[2.5] text-emerald-600" />}
            {variant === 'info' && <Info className="size-4 stroke-[2.5] text-sky-600" />}
            {variant === 'warning' && <Alert className="size-4 stroke-[2.5] text-amber-600" />}
            {variant === 'error' && <Alert className="size-4 stroke-[2.5] text-rose-600" />}
            {variant === 'default' && <Info className="size-4 stroke-[2.5] text-[#0056FF]" />}
          </div>

          {/* Primary Text */}
          <p className="flex-1 font-sans text-xs leading-relaxed font-semibold text-[#09172B] sm:text-sm">
            {message}
          </p>

          {/* Action Button */}
          {actionLabel && (
            <button
              type="button"
              onClick={() => {
                onAction?.();
              }}
              className={cn(
                'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] px-3 font-mono text-xs font-bold tracking-wider uppercase transition-colors',
                variant === 'success' && 'text-emerald-700 hover:bg-emerald-50',
                variant === 'info' && 'text-sky-700 hover:bg-sky-50',
                variant === 'warning' && 'text-amber-700 hover:bg-amber-50',
                variant === 'error' && 'text-rose-700 hover:bg-rose-50',
                variant === 'default' && 'text-[#0056FF] hover:bg-[#E3E7FC]',
              )}
            >
              {actionLabel}
            </button>
          )}

          {/* Dismiss */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss message"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] text-slate-400 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Countdown Bar */}
        <div className="h-1 w-full bg-slate-100">
          <div
            className={cn(
              'h-full transition-all duration-1000 ease-linear',
              variant === 'success' && 'bg-emerald-500',
              variant === 'info' && 'bg-sky-500',
              variant === 'warning' && 'bg-amber-500',
              variant === 'error' && 'bg-rose-500',
              variant === 'default' && 'bg-[#0056FF]',
            )}
            style={{ width: `${(seconds / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-2 font-mono text-[10px] text-slate-400">
        <span>Anchor: Bottom Center (Native Material)</span>
        <span>Auto-dismiss: {seconds}s (Hover to pause)</span>
      </div>
    </div>
  );
}

export { LibrarySnackbar as NativeSnackbar };
