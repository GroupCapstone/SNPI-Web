'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from '@/components/icons';
import { GeometricButton } from './geometric-tag-primitives';
import {
  MOTION_EASE_OUT,
  POPOVER_INITIAL_SCALE,
  WHILE_TAP_SCALE,
  DROPDOWN_ENTRANCE_DURATION,
  DROPDOWN_EXIT_DURATION,
} from '@/lib/motion';

export interface LibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  isDestructive?: boolean;
}

export function LibraryDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  isDestructive = false,
}: LibraryDialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop - Law 1: Ease-out Entrance & Law 15: 20% Shorter Exit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: DROPDOWN_ENTRANCE_DURATION } }}
            exit={{ opacity: 0, transition: { duration: DROPDOWN_EXIT_DURATION } }}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />

          {/* Dialog Surface - Law 1: Ease-out, Law 10: 0.95 Scale, Law 13: Zero Bounce, Law 15: Exits 20% Shorter */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: POPOVER_INITIAL_SCALE, y: 8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: DROPDOWN_ENTRANCE_DURATION,
                ease: MOTION_EASE_OUT,
              },
            }}
            exit={{
              opacity: 0,
              scale: POPOVER_INITIAL_SCALE,
              y: 8,
              transition: {
                duration: DROPDOWN_EXIT_DURATION, // Law 15: 20% shorter exit
                ease: [0.7, 0, 0.84, 0],
              },
            }}
            className="relative z-50 w-full bg-white p-6 text-slate-900 shadow-xl max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:border-[#CAD3F5] sm:max-w-lg sm:rounded-2xl sm:border sm:border-[#CAD3F5]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                {description && (
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{description}</p>
                )}
              </div>
              {/* Close Button - Law 4: Scale 0.97 on press */}
              <motion.button
                type="button"
                whileTap={{ scale: WHILE_TAP_SCALE }}
                onClick={() => onOpenChange(false)}
                aria-label="Close dialog"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-4" />
              </motion.button>
            </div>

            {children && <div className="mt-4">{children}</div>}

            <div className="mt-6 flex items-center justify-end gap-3">
              <GeometricButton variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                {cancelLabel}
              </GeometricButton>
              <GeometricButton
                variant={isDestructive ? 'orange' : 'blue'}
                size="sm"
                onClick={() => {
                  onConfirm?.();
                  onOpenChange(false);
                }}
              >
                {confirmLabel}
              </GeometricButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
