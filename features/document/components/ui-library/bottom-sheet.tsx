'use client';

import * as React from 'react';
import { X } from '@/components/icons';
import { cn } from '@/lib/utils';

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Panel - Responsive: Mobile rounded-t-2xl border-t | PC Web sm:rounded-2xl sm:border */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative z-50 flex max-h-[85vh] w-full flex-col rounded-t-2xl rounded-b-none border-x-0 border-t border-b-0 border-[#CAD3F5] bg-white p-6 text-slate-900 shadow-none transition-transform duration-300 sm:mx-auto sm:mb-6 sm:max-w-lg sm:rounded-2xl sm:border sm:border-[#CAD3F5]',
          className,
        )}
      >
        {/* Grab Handle */}
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-slate-300" />

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-base font-bold tracking-tight text-slate-950">{title}</h3>}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sheet"
            className="ml-auto flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
