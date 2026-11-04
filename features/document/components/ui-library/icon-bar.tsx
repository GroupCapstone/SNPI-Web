'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Pen, Layers, Sparkles, Scissors, TypeOutline, Maximize2 } from '@/components/icons';

export interface IconBarItemData {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasStatusDot?: boolean;
  shortcut?: string;
}

export interface IconBarProps {
  items?: IconBarItemData[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export const DEFAULT_ICON_BAR_ITEMS: IconBarItemData[] = [
  { id: 'pen', label: 'Pen', icon: Pen, hasStatusDot: true, shortcut: 'P' },
  { id: 'eraser', label: 'Eraser', icon: Layers, shortcut: 'E' },
  { id: 'fill', label: 'Fill', icon: Sparkles, shortcut: 'G' },
  { id: 'crop', label: 'Crop', icon: Scissors, shortcut: 'C' },
  { id: 'text', label: 'Text', icon: TypeOutline, shortcut: 'T' },
  { id: 'select', label: 'Select', icon: Maximize2, shortcut: 'V' },
];

/**
 * IconBar
 * A horizontal toolbar of icon buttons with bloom-open label reveal on hover/selection,
 * accent dot indicator, and WAI-ARIA roving tabindex keyboard navigation.
 *
 * Blueprint Metrics:
 * - Height: Strict 54px (h-[54px])
 * - Item gap: Strict 4px (gap-1)
 * - Navigation: ArrowLeft/Right/Home/End roving tabindex
 * - Pinning: Enter pins/selects, Esc clears
 */
export function IconBar({
  items = DEFAULT_ICON_BAR_ITEMS,
  selectedId: controlledSelectedId,
  onSelect,
  className,
}: IconBarProps) {
  const [internalSelectedId, setInternalSelectedId] = React.useState<string>(items[0]?.id || '');
  const activeId = controlledSelectedId !== undefined ? controlledSelectedId : internalSelectedId;

  const [focusedIdx, setFocusedIdx] = React.useState<number>(0);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Keep buttonRefs array length synchronized
  React.useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, items.length);
  }, [items]);

  // Focus the active button when focusedIdx changes via keyboard
  const focusButton = (idx: number) => {
    setFocusedIdx(idx);
    buttonRefs.current[idx]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      focusButton((focusedIdx + 1) % items.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      focusButton((focusedIdx - 1 + items.length) % items.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusButton(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusButton(items.length - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const item = items[focusedIdx];
      if (item) {
        const nextId = activeId === item.id ? '' : item.id;
        setInternalSelectedId(nextId);
        onSelect?.(nextId);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setInternalSelectedId('');
      onSelect?.('');
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 54px Fixed Height Toolbar Container */}
      <div
        role="toolbar"
        aria-label="Tool options"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn(
          'relative flex h-[54px] items-center gap-1 rounded-2xl border border-[#CAD3F5] bg-white p-1.5 shadow-none transition-all duration-200 select-none',
          className,
        )}
      >
        {items.map((item, idx) => {
          const isSelected = activeId === item.id;
          const isHovered = hoveredId === item.id;
          const isFocused = focusedIdx === idx;
          const isBloomed = isSelected || isHovered || isFocused;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              ref={(el) => {
                buttonRefs.current[idx] = el;
              }}
              type="button"
              role="button"
              aria-pressed={isSelected}
              aria-label={item.label}
              tabIndex={isFocused ? 0 : -1}
              onClick={() => {
                const nextId = isSelected ? '' : item.id;
                setInternalSelectedId(nextId);
                setFocusedIdx(idx);
                onSelect?.(nextId);
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setFocusedIdx(idx)}
              className={cn(
                'group relative flex h-full cursor-pointer items-center gap-2 rounded-[4px] px-3 transition-all duration-200 ease-out outline-none',
                isSelected
                  ? 'bg-[#E3E7FC] text-[#0056FF] ring-1 ring-[#0056FF]/30'
                  : 'text-slate-600 hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                isFocused && !isSelected && 'bg-[#EFF5FF] ring-1 ring-[#CAD3F5]',
              )}
            >
              {/* Status Indicator Bar (Zero-Dot Standard) */}
              {(item.hasStatusDot ?? isSelected) && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute right-3 bottom-1 left-3 h-0.5 rounded-[1px] transition-all duration-200',
                    isSelected ? 'bg-[#0056FF] opacity-100' : 'bg-transparent opacity-0',
                  )}
                />
              )}

              {/* Tool Icon */}
              <Icon className="size-4.5 shrink-0 stroke-[1.8] transition-transform duration-200 group-hover:scale-105" />

              {/* Bloom-Open Label Reveal */}
              <span
                className={cn(
                  'overflow-hidden font-sans text-xs font-bold tracking-tight whitespace-nowrap transition-all duration-200 ease-out',
                  isBloomed
                    ? 'max-w-[120px] pr-0.5 opacity-100'
                    : 'pointer-events-none max-w-0 opacity-0',
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
