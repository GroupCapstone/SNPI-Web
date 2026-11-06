'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
  MOTION_EASE_OUT,
  WHILE_TAP_SCALE,
  DROPDOWN_ENTRANCE_DURATION,
  DROPDOWN_EXIT_DURATION,
} from '@/lib/motion';

export interface LibraryBottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function LibraryBottomSheet({
  open,
  onClose,
  title,
  children,
  className,
}: LibraryBottomSheetProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop - Law 1: Ease-out Entrance & Law 15: 20% Shorter Exit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: DROPDOWN_ENTRANCE_DURATION } }}
            exit={{ opacity: 0, transition: { duration: DROPDOWN_EXIT_DURATION } }}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet Panel - Law 1: Ease-out, Law 13: Zero Bounce, Law 15: Exits 20% Shorter, Law 19: Rubber Band Drag */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: '100%' }}
            animate={{
              y: 0,
              transition: {
                duration: DROPDOWN_ENTRANCE_DURATION + 0.05,
                ease: MOTION_EASE_OUT,
              },
            }}
            exit={{
              y: '100%',
              transition: {
                duration: DROPDOWN_EXIT_DURATION, // Law 15: 20% shorter exit
                ease: [0.7, 0, 0.84, 0],
              },
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.15} // Law 19: Rubber band past bounds
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
            className={cn(
              'relative z-50 flex max-h-[85vh] w-full flex-col rounded-t-2xl rounded-b-none border-x-0 border-t border-b-0 border-[#CAD3F5] bg-white p-6 text-slate-900 shadow-xl sm:mx-auto sm:mb-6 sm:max-w-lg sm:rounded-2xl sm:border sm:border-[#CAD3F5]',
              className,
            )}
          >
            {/* Grab Handle */}
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-slate-300" />

            <div className="flex items-center justify-between pb-3">
              {title && <h3 className="font-sans text-base font-bold text-slate-900">{title}</h3>}
              <motion.button
                type="button"
                whileTap={{ scale: WHILE_TAP_SCALE }}
                onClick={onClose}
                aria-label="Close sheet"
                className="ml-auto flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-4" />
              </motion.button>
            </div>

            <div className="no-scrollbar overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
