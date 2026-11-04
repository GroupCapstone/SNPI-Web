'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RailTocItem {
  id: string;
  label: string;
  depth?: number;
}

export interface RailTocProps {
  /** Headings in document order. Each id must match an element id in the content. Depth sets the indent level and defaults to 0. */
  items: RailTocItem[];
  /** Scroll container to track and scroll within. Defaults to the window when omitted. */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Distance in pixels below the scroller's top edge where a heading counts as reached. Default: 100. */
  offset?: number;
  /** Horizontal step in pixels for each depth level. Default: 12. */
  indent?: number;
  /** Text above the list. It also names the navigation for screen readers. Default: "On this page". */
  title?: string;
  /** Extra classes merged onto the root nav. Inner parts carry data-slot attributes. */
  className?: string;
  /** Active heading override for controlled mode. */
  activeId?: string;
  /** Callback fired when user clicks or scrolls into a heading. */
  onSelect?: (id: string) => void;
  /** Show progress badge (e.g. "3 / 8"). Default: false. */
  showProgress?: boolean;
}

/**
 * RailToc - Clean, Minimalist Table of Contents
 * Enforces clean vertical hierarchy:
 * - Straight continuous vertical track
 * - Crisp vertical accent indicator bar on the active item (zero awkward circle rings or horizontal lines)
 * - Whole-word legible labels with responsive indentation
 */
export function RailToc({
  items,
  containerRef,
  offset = 100,
  indent = 12,
  title = 'On this page',
  className,
  activeId: controlledActiveId,
  onSelect,
  showProgress = false,
}: RailTocProps) {
  const rootNavRef = React.useRef<HTMLElement>(null);

  // Internal active section tracking
  const [activeSectionId, setActiveSectionId] = React.useState<string>(items[0]?.id || '');
  const activeId = controlledActiveId !== undefined ? controlledActiveId : activeSectionId;

  // Handle active heading detection and scroll-tracking
  React.useEffect(() => {
    const handleScroll = () => {
      let currentScroll = 0;
      if (containerRef && containerRef.current) {
        currentScroll = containerRef.current.scrollTop + offset;
      } else {
        currentScroll = window.scrollY + offset;
      }

      const sectionPositions: { id: string; top: number }[] = [];
      items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          let top = window.scrollY + rect.top;
          if (containerRef && containerRef.current) {
            const cRect = containerRef.current.getBoundingClientRect();
            top = containerRef.current.scrollTop + (rect.top - cRect.top);
          }
          sectionPositions.push({ id: item.id, top });
        }
      });

      if (sectionPositions.length > 0) {
        let matchedId = sectionPositions[0].id;
        for (let i = sectionPositions.length - 1; i >= 0; i--) {
          if (currentScroll >= sectionPositions[i].top - 10) {
            matchedId = sectionPositions[i].id;
            break;
          }
        }
        setActiveSectionId(matchedId);
      }
    };

    const container = containerRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    handleScroll();

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [items, offset, containerRef]);

  const handleHeadingClick = (id: string) => {
    setActiveSectionId(id);
    onSelect?.(id);

    const el = document.getElementById(id);
    if (!el) return;

    if (containerRef && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const targetScroll = containerRef.current.scrollTop + elRect.top - containerRect.top - offset;
      containerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      const elTop = window.scrollY + el.getBoundingClientRect().top - offset;
      window.scrollTo({ top: elTop, behavior: 'smooth' });
    }
  };

  const activeIdx = items.findIndex((it) => it.id === activeId);
  const currentStep = activeIdx >= 0 ? activeIdx + 1 : 1;

  return (
    <nav
      ref={rootNavRef}
      aria-label={title}
      data-slot="rail-toc"
      className={cn('relative font-sans text-xs select-none', className)}
    >
      {/* Header with Title and Document Outline Icon */}
      <div
        data-slot="rail-toc-title"
        className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5"
      >
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            className="size-3.5 text-slate-700"
            aria-hidden="true"
          >
            <line x1="2" y1="4" x2="14" y2="4" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="2" y1="8" x2="11" y2="8" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="2" y1="12" x2="7" y2="12" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="font-sans text-xs font-bold tracking-tight text-slate-900">{title}</span>
        </div>

        {/* Optional Progress Badge */}
        {showProgress && (
          <div className="flex items-center gap-1 rounded-md bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
            <span>{currentStep}</span>
            <span className="opacity-40">/</span>
            <span>{items.length}</span>
          </div>
        )}
      </div>

      {/* Clean Headings List with Left Vertical Accent Rail (Zero Circles / Zero Planes) */}
      <div className="relative pl-2.5">
        {/* Subtle Background Vertical Track Line */}
        <div className="pointer-events-none absolute top-1 bottom-1 left-0 w-[1.5px] rounded-full bg-slate-200" />

        <ul data-slot="rail-toc-list" className="space-y-1">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const depth = item.depth || 0;
            const leftPadding = depth * indent;

            return (
              <li key={item.id} className="relative">
                <button
                  type="button"
                  onClick={() => handleHeadingClick(item.id)}
                  style={{ paddingLeft: `${leftPadding + 8}px` }}
                  className={cn(
                    'group relative flex w-full cursor-pointer items-center justify-between rounded-md py-1.5 pr-2.5 text-left font-sans text-xs transition-colors duration-150 select-none focus-visible:ring-2 focus-visible:ring-[#0056FF] focus-visible:outline-none',
                    isActive
                      ? 'bg-[#EFF5FF]/80 font-bold text-[#0056FF]'
                      : 'font-normal text-slate-600 hover:bg-slate-50 hover:text-slate-950',
                  )}
                >
                  {/* Clean Vertical Indicator on Active Item */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute top-1 bottom-1 left-[-10px] w-[2.5px] rounded-full bg-[#0056FF]"
                    />
                  )}
                  <span className="flex-1 leading-snug break-words">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default RailToc;
