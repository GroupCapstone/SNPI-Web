'use client';

import * as React from 'react';
import { CaseSensitive, Check, ChevronDown } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useDocsNav, DOCS_FONTS } from './docs-nav-context';

/** Docs font switch. English fonts only. */
export function FontSwitch({ variant = 'header' }: { variant?: 'header' | 'panel' }) {
  const { font, setFont } = useDocsNav();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const active = DOCS_FONTS.find((f) => f.id === font) ?? DOCS_FONTS[0];

  return (
    <div ref={rootRef} className={cn('relative', variant === 'panel' && 'w-full')}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch font"
        className={cn(
          'flex min-h-11 max-w-44 cursor-pointer items-center gap-2 rounded-[4px] font-sans text-sm font-bold transition-all active:scale-95',
          variant === 'header'
            ? 'border border-white/20 bg-white/10 px-3 text-white hover:bg-white/20'
            : 'w-full justify-between border border-[#CAD3F5] bg-white px-3 text-[#0A1A4A] hover:bg-[#EFF5FF]',
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          <CaseSensitive className="size-5 shrink-0 stroke-[2]" />
          <span className="truncate">{active.label}</span>
        </span>
        <ChevronDown
          className={cn('size-4 shrink-0 stroke-[2.5] transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Font"
          className={cn(
            'animate-in fade-in zoom-in-95 absolute z-50 overflow-hidden rounded-[4px] border border-[#CAD3F5] bg-white py-1 shadow-lg duration-200',
            variant === 'header'
              ? 'top-[calc(100%+8px)] right-0 w-52'
              : 'top-[calc(100%+6px)] right-0 left-0',
          )}
        >
          {DOCS_FONTS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={option.id === font}
              onClick={() => {
                setFont(option.id);
                setOpen(false);
              }}
              style={{ fontFamily: `${option.family}, sans-serif` }}
              className={cn(
                'flex min-h-11 w-full cursor-pointer items-center justify-between px-3 text-sm font-bold transition-colors',
                option.id === font
                  ? 'bg-[#EFF5FF] text-[#0056FF]'
                  : 'text-[#0A1A4A] hover:bg-[#EFF5FF]',
              )}
            >
              {option.label}
              {option.id === font && <Check className="size-4.5 shrink-0 stroke-[2.5]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
