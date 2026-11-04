'use client';

import { useEffect, useRef, useState, type ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

const CORNER = 6;
const DASH = 'repeating-linear-gradient(to top, transparent 0 3px, currentColor 3px 7px)';

export type HookSidebarItem =
  | string
  | {
      label: string;
      href?: string;
      icon?: React.ReactNode;
      onClick?: () => void;
      id?: string;
    };

export type HookSidebarProps = Omit<ComponentProps<'nav'>, 'onChange'> & {
  /** Rows rendered as the vertical list. A plain string or an object with a label is a nav item, and href turns it into a link. */
  items: HookSidebarItem[];
  /** Group title shown above the list, outside the rail. Omit it for a bare list. Also names the nav for screen readers. */
  label?: string;
  /** Active item index for controlled usage. When set, it wins over both the URL and internal state. */
  value?: number;
  /** Initial active index. Used only when no item has an href and value is not provided. */
  defaultValue?: number;
  /** Called with the new index whenever an item is selected. */
  onChange?: (index: number) => void;
  /** Any CSS color for the active rail (hex, rgb, hsl, var). The hover rail stays neutral. Default: #0056FF */
  color?: string;
  /** Draws the rail and its corner as dashes. Set false for a solid line. Default: true */
  dashed?: boolean;
};

const hrefOf = (item: HookSidebarItem) => (typeof item === 'string' ? undefined : item.href);

const labelOf = (item: HookSidebarItem) => (typeof item === 'string' ? item : item.label);

interface RailProps {
  from?: number;
  y: number | null;
  visible: boolean;
  color?: string;
  dashed: boolean;
  className?: string;
}

const Rail = ({ from = 0, y, visible, color, dashed, className }: RailProps) => {
  const reduced = useReducedMotion();
  const travel = reduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.7 };

  return (
    <motion.span
      aria-hidden
      initial={false}
      style={{ color }}
      animate={{ opacity: visible && y !== null ? 1 : 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.2 }}
      className={cn('pointer-events-none absolute inset-0', className)}
    >
      <motion.span
        initial={false}
        animate={{ top: from, height: Math.max(0, (y ?? 0) - CORNER - from) }}
        transition={travel}
        style={dashed ? { backgroundImage: DASH } : { backgroundColor: 'currentColor' }}
        className="absolute left-0.5 w-[2.5px] rounded-full"
      />
      <motion.svg
        initial={false}
        animate={{ top: (y ?? 0) - CORNER }}
        transition={travel}
        width="14"
        height="9"
        viewBox="0 0 14 9"
        fill="none"
        className="absolute left-0.5"
      >
        <path
          d="M1.25 0a6 6 0 0 0 6 6h6.75"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={dashed ? '3 3' : undefined}
        />
      </motion.svg>
    </motion.span>
  );
};

export function HookSidebar({
  items,
  label,
  value,
  defaultValue = 0,
  onChange,
  color = '#0056FF',
  dashed = true,
  className,
  ...props
}: HookSidebarProps) {
  const pathname = usePathname();
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [centers, setCenters] = useState<number[]>([]);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);

  const routed = items.some((item) => hrefOf(item));
  const routeIndex = items.findIndex((item) => hrefOf(item) === pathname);
  const activeIndex = value ?? (routed && routeIndex >= 0 ? routeIndex : internalValue);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () =>
      setCenters(itemRefs.current.map((el) => (el ? el.offsetTop + el.offsetHeight / 2 : 0)));

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [items]);

  const activeY = activeIndex < 0 ? null : (centers[activeIndex] ?? null);
  const hoverY = hoverIndex === null ? null : (centers[hoverIndex] ?? null);

  // Above the active row the accent line already covers the span, so draw only the corner
  const hoverFrom =
    activeY !== null && hoverY !== null && hoverY <= activeY
      ? Math.max(0, hoverY - CORNER)
      : (activeY ?? 0);

  const select = (index: number) => {
    if (value === undefined) setInternalValue(index);
    onChange?.(index);
  };

  return (
    <nav
      data-slot="hook-sidebar"
      aria-label={label}
      className={cn('flex flex-col', className)}
      {...props}
    >
      {label && (
        <span
          data-slot="hook-sidebar-label"
          className="pr-2 pb-2.5 pl-0.5 font-sans text-xs font-bold tracking-wider text-slate-400 uppercase select-none"
        >
          {label}
        </span>
      )}

      <div
        ref={listRef}
        onMouseLeave={() => setPointerInside(false)}
        className="relative flex flex-col gap-0.5"
      >
        {/* Background Neutral Dashed Rail Track */}
        <span
          aria-hidden
          style={dashed ? { backgroundImage: DASH } : { backgroundColor: 'currentColor' }}
          className="pointer-events-none absolute top-1 bottom-1 left-0.5 w-[2.5px] rounded-full text-slate-200"
        />

        <Rail
          from={hoverFrom}
          y={hoverY}
          visible={(pointerInside || focusInside) && hoverIndex !== activeIndex}
          dashed={dashed}
          className="text-slate-300"
        />
        <Rail y={activeY} visible={activeY !== null} color={color} dashed={dashed} />

        {items.map((item, index) => {
          const text = labelOf(item);
          const href = hrefOf(item);
          const icon = typeof item === 'object' ? item.icon : undefined;
          const customOnClick = typeof item === 'object' ? item.onClick : undefined;
          const isActive = index === activeIndex;
          const setRef = (el: HTMLElement | null) => {
            itemRefs.current[index] = el;
          };
          const rowProps = {
            'data-slot': 'hook-sidebar-item',
            'data-active': isActive,
            onMouseEnter: () => {
              setHoverIndex(index);
              setPointerInside(true);
            },
            onFocus: () => {
              setHoverIndex(index);
              setFocusInside(true);
            },
            onBlur: () => setFocusInside(false),
            onClick: () => {
              customOnClick?.();
              select(index);
            },
            className: cn(
              'group flex w-full cursor-pointer items-center rounded-lg py-1 pr-2 pl-5 text-left font-sans text-xs transition-colors duration-150 select-none motion-reduce:transition-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0056FF]',
              isActive
                ? 'font-bold text-slate-950'
                : 'font-normal text-slate-600 hover:text-slate-950',
            ),
          };

          const rowContent = (
            <span className="flex min-w-0 items-center gap-2">
              {icon}
              <span className="flex-1 leading-tight break-words">{text}</span>
            </span>
          );

          return href ? (
            <Link
              key={`${index}-${text}`}
              {...rowProps}
              ref={setRef}
              href={href}
              aria-current={isActive ? 'page' : undefined}
            >
              {rowContent}
            </Link>
          ) : (
            <button
              key={`${index}-${text}`}
              {...rowProps}
              ref={setRef}
              type="button"
              aria-current={isActive ? 'true' : undefined}
            >
              {rowContent}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default HookSidebar;
