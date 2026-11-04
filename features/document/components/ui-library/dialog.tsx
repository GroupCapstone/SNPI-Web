'use client';

import * as React from 'react';
import { X } from '@/components/icons';
import { GeometricButton } from './geometric-tag-primitives';

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Dialog Surface - Responsive: Mobile rounded-t-2xl border-t | PC Web sm:rounded-2xl sm:border */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-50 w-full bg-white p-6 text-slate-900 shadow-none transition-all max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:border-[#CAD3F5] sm:max-w-lg sm:rounded-2xl sm:border sm:border-[#CAD3F5]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-950">{title}</h3>
            {description && (
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close dialog"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-4" />
          </button>
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
      </div>
    </div>
  );
}
