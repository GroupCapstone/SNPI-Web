'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Code,
  Copy,
  Check,
  Layers,
  ChevronRight,
  Plus,
  Search as SearchIcon,
  Menu as MenuIcon,
  Bell,
  User,
} from '@/components/icons';

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback
  }
  return false;
}

export interface BlankFutureComponentProps {
  id: string;
  name: string;
  category: string;
  paradigm: string;
  description: string;
  className?: string;
}

/**
 * Blank Future Component
 * Renders a clean, day-first Material 3 architectural blueprint wireframe
 * for upcoming/planned components with interactive previews and technical tokens.
 */
export function BlankFutureComponent({
  id,
  name,
  category,
  paradigm,
  description,
  className,
}: BlankFutureComponentProps) {
  const [copied, setCopied] = React.useState(false);
  const [interactiveState, setInteractiveState] = React.useState<number>(0);

  const handleCopySpec = async () => {
    const spec = `// [M3 COMPONENT SPECIFICATION: ${name}]
// Category: ${category}
// Paradigm: ${paradigm}
// Status: Specification Ready
// Touch Targets: >= 44x44px
// Day Surface Token: #FFFFFF / #EFF5FF / #E3E7FC
// Primary Token: #0056FF (Royal Blue) / #2277FF (Azure Blue)`;

    const ok = await copyTextToClipboard(spec);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        'w-full max-w-4xl rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-xs sm:p-8',
        className,
      )}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#CAD3F5] bg-[#EFF5FF] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF] uppercase">
            [Coming Soon]
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-600">
            {category}
          </span>
          <span className="font-mono text-[10px] text-slate-400">{paradigm}</span>
        </div>

        <button
          type="button"
          onClick={handleCopySpec}
          title="Copy component technical specification"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#CAD3F5] bg-[#EFF5FF] px-3 py-1 font-mono text-xs font-bold text-[#0056FF] transition-all hover:bg-white active:scale-95"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-600" />
              <span>Spec Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy Spec</span>
            </>
          )}
        </button>
      </div>

      {/* Center Wireframe Blueprint Canvas */}
      <div className="my-6 flex min-h-[220px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#CAD3F5] bg-[#EFF5FF]/40 p-6 sm:p-8">
        <div className="w-full max-w-md">
          {renderBlueprintWireframe(id, name, interactiveState, setInteractiveState)}
        </div>
      </div>

      {/* Technical Specifications Grid */}
      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200/80 bg-[#EFF5FF]/50 p-2.5 text-center">
          <span className="block font-mono text-[9px] font-bold text-slate-400 uppercase">
            Elevation
          </span>
          <span className="font-sans text-xs font-bold text-[#020617]">Level 1 Surface</span>
        </div>

        <div className="rounded-lg border border-slate-200/80 bg-[#EFF5FF]/50 p-2.5 text-center">
          <span className="block font-mono text-[9px] font-bold text-slate-400 uppercase">
            Touch Target
          </span>
          <span className="font-sans text-xs font-bold text-emerald-700">
            &ge; 44&times;44px (AAA)
          </span>
        </div>

        <div className="rounded-lg border border-slate-200/80 bg-[#EFF5FF]/50 p-2.5 text-center">
          <span className="block font-mono text-[9px] font-bold text-slate-400 uppercase">
            Contrast Ratio
          </span>
          <span className="font-sans text-xs font-bold text-[#0056FF]">&ge; 7:1 WCAG AAA</span>
        </div>

        <div className="rounded-lg border border-slate-200/80 bg-[#EFF5FF]/50 p-2.5 text-center">
          <span className="block font-mono text-[9px] font-bold text-slate-400 uppercase">
            Readiness
          </span>
          <span className="font-sans text-xs font-bold text-[#020617]">Spec Finalized</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Geometric Blueprint Wireframes for each M3 Future Component
 */
function renderBlueprintWireframe(
  id: string,
  name: string,
  state: number,
  setState: React.Dispatch<React.SetStateAction<number>>,
) {
  // 1. App Bars
  if (id === 'app-bars') {
    return (
      <div className="w-full space-y-2">
        <div className="flex h-12 w-full items-center justify-between rounded-lg border border-[#CAD3F5] bg-white px-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <MenuIcon className="size-4 text-slate-600" />
            <span className="font-sans text-xs font-bold text-[#020617]">App Bar (56px)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <SearchIcon className="size-3.5 text-slate-400" />
            <Bell className="size-3.5 text-slate-400" />
          </div>
        </div>
        <p className="text-center font-mono text-[10px] text-slate-400">
          M3 Center-aligned & Small App Bar Standard
        </p>
      </div>
    );
  }

  // 2. Buttons & Button Variants
  if (
    id === 'buttons' ||
    id === 'all-buttons' ||
    id === 'button-groups' ||
    id === 'segmented-buttons' ||
    id === 'split-button'
  ) {
    return (
      <div className="w-full space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setState((s) => (s + 1) % 4)}
            className="rounded-full bg-[#0056FF] px-4 py-2 font-sans text-xs font-bold text-white transition-all active:scale-95"
          >
            Filled Button
          </button>
          <button
            type="button"
            className="rounded-full border border-[#0056FF] bg-white px-4 py-2 font-sans text-xs font-bold text-[#0056FF] transition-all hover:bg-[#EFF5FF]"
          >
            Outlined
          </button>
          <button
            type="button"
            className="rounded-full bg-[#E3E7FC] px-4 py-2 font-sans text-xs font-bold text-[#0056FF]"
          >
            Tonal
          </button>
        </div>
        <p className="text-center font-mono text-[10px] text-slate-400">
          Interactive State: Variant {state + 1} of 4
        </p>
      </div>
    );
  }

  // 3. Floating Action Buttons (FABs)
  if (id === 'fabs' || id === 'extended-fabs' || id === 'fab-menu') {
    return (
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setState((s) => (s === 0 ? 1 : 0))}
          className="flex size-14 items-center justify-center rounded-2xl border border-[#CAD3F5] bg-[#0056FF] text-white shadow-xs transition-transform active:scale-90"
          title="FAB action"
        >
          <Plus className="size-6 stroke-[2.5]" />
        </button>
        <button
          type="button"
          className="flex h-14 items-center gap-2 rounded-2xl border border-[#CAD3F5] bg-[#E3E7FC] px-5 font-sans text-xs font-bold text-[#0056FF] shadow-xs"
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span>Extended FAB</span>
        </button>
      </div>
    );
  }

  // 4. Checkbox & Radio
  if (id === 'checkbox' || id === 'radio-button') {
    const isChecked = state === 1;
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div
          onClick={() => setState((s) => (s === 1 ? 0 : 1))}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 transition-colors hover:border-[#0056FF]"
        >
          <div
            className={cn(
              'flex size-5 items-center justify-center rounded transition-all',
              id === 'radio-button' ? 'rounded-full' : 'rounded-md',
              isChecked
                ? 'border border-[#0056FF] bg-[#0056FF] text-white'
                : 'border border-slate-300 bg-white',
            )}
          >
            {isChecked &&
              (id === 'radio-button' ? (
                <span className="size-2 rounded-full bg-white" />
              ) : (
                <Check className="size-3.5 stroke-[3]" />
              ))}
          </div>
          <span className="font-sans text-xs font-bold text-[#020617]">
            {id === 'radio-button' ? 'Radio Selection Option' : 'Interactive Checkbox'}
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">
          Click to toggle state ({isChecked ? 'Selected' : 'Unselected'})
        </span>
      </div>
    );
  }

  // 5. Navigation Bar, Rail & Drawer
  if (
    id === 'navigation-bar' ||
    id === 'navigation-rail' ||
    id === 'navigation-drawer' ||
    id === 'tabs' ||
    id === 'toolbars'
  ) {
    const activeTab = state;
    return (
      <div className="w-full space-y-2">
        <div className="flex items-center justify-around rounded-xl border border-[#CAD3F5] bg-white p-1.5 shadow-2xs">
          {['Explore', 'Directory', 'Ledger', 'Reports'].map((item, idx) => (
            <button
              key={item}
              type="button"
              onClick={() => setState(idx)}
              className={cn(
                'rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all select-none',
                activeTab === idx
                  ? 'bg-[#0056FF] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#0056FF]',
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="text-center font-mono text-[10px] text-slate-400">
          Active Segment: {activeTab + 1} of 4
        </p>
      </div>
    );
  }

  // 6. Cards
  if (id === 'cards') {
    return (
      <div className="w-full rounded-xl border border-[#CAD3F5] bg-white p-4 shadow-2xs">
        <div className="mb-2 flex h-20 w-full items-center justify-center rounded-lg bg-[#EFF5FF]">
          <span className="font-mono text-[11px] font-bold text-[#0056FF]">
            Elevated Surface (Card)
          </span>
        </div>
        <h4 className="font-sans text-xs font-bold text-[#020617]">Institutional Academic Card</h4>
        <p className="mt-1 font-sans text-[11px] text-slate-500">
          Standard M3 surface container with 16px corner radius.
        </p>
      </div>
    );
  }

  // 7. Dialogs & Sheets
  if (id === 'dialogs' || id === 'bottom-sheets' || id === 'side-sheets') {
    return (
      <div className="w-full rounded-xl border border-slate-300 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="font-sans text-xs font-bold text-[#020617]">
            {id === 'dialogs' ? 'Confirm Operation' : 'Sheet Surface'}
          </span>
          <span className="size-2 rounded-full bg-emerald-500" />
        </div>
        <p className="py-3 font-sans text-xs text-slate-600">
          Modally focused prompt requiring user decision or inspection.
        </p>
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-2">
          <span className="rounded-md border border-slate-200 px-3 py-1 font-sans text-xs font-semibold text-slate-600">
            Cancel
          </span>
          <span className="rounded-md bg-[#0056FF] px-3 py-1 font-sans text-xs font-bold text-white">
            Confirm
          </span>
        </div>
      </div>
    );
  }

  // 8. Sliders
  if (id === 'sliders') {
    return (
      <div className="w-full space-y-2">
        <div className="relative flex h-8 w-full items-center">
          <div className="h-1.5 w-full rounded-full bg-slate-200">
            <div className="h-1.5 w-3/5 rounded-full bg-[#0056FF]" />
          </div>
          <div className="absolute left-[60%] size-5 -translate-x-1/2 rounded-full border-2 border-white bg-[#0056FF] shadow-xs" />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-slate-400">
          <span>0%</span>
          <span className="font-bold text-[#0056FF]">60% (Active Value)</span>
          <span>100%</span>
        </div>
      </div>
    );
  }

  // 9. Snackbar
  if (id === 'snackbar') {
    return (
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-slate-900 px-4 py-3 text-white shadow-md">
          <span className="font-sans text-xs">Student record saved successfully.</span>
          <button
            type="button"
            className="font-sans text-xs font-bold text-[#CAD3F5] transition-colors hover:text-white"
          >
            Undo
          </button>
        </div>
        <p className="text-center font-mono text-[10px] text-slate-400">
          M3 Transient Bottom Notification Container
        </p>
      </div>
    );
  }

  // 10. Search
  if (id === 'search') {
    return (
      <div className="flex h-11 w-full items-center gap-2 rounded-full border border-[#CAD3F5] bg-white px-4 shadow-2xs">
        <SearchIcon className="size-4 text-slate-400" />
        <span className="font-sans text-xs text-slate-400">
          Search student directory, courses, or ledger...
        </span>
      </div>
    );
  }

  // 10. Badges
  if (id === 'badges') {
    return (
      <div className="flex items-center justify-center gap-6">
        <div className="relative flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white">
          <Bell className="size-5 text-slate-700" />
          <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </div>
        <div className="relative flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white">
          <Bell className="size-5 text-slate-700" />
          <span className="py-0.2 absolute -top-1.5 -right-2 rounded-full bg-[#0056FF] px-1.5 font-mono text-[9px] font-bold text-white ring-2 ring-white">
            14
          </span>
        </div>
      </div>
    );
  }

  // 11. Loading & Progress
  if (id === 'loading-indicator' || id === 'progress-indicators') {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="size-8 animate-spin rounded-full border-3 border-[#EFF5FF] border-t-[#0056FF]" />
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-[#EFF5FF]">
          <div className="h-full w-2/3 rounded-full bg-[#0056FF]" />
        </div>
      </div>
    );
  }

  // Default Universal Blueprint Wireframe
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-dashed border-[#0056FF] bg-[#EFF5FF] text-[#0056FF]">
        <Layers className="size-6" />
      </div>
      <p className="font-mono text-xs font-bold text-[#020617]">{name} Blueprint</p>
      <p className="font-sans text-[11px] text-slate-500">
        Material 3 Standard Component Specification Ready
      </p>
    </div>
  );
}
