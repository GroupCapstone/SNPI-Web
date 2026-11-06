'use client';

import * as React from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';
import { popoverMotionVariants, WHILE_TAP_SCALE, MOTION_EASE_OUT } from '@/lib/motion';
import {
  ChevronDown,
  Layers,
  Sparkles,
  Shield,
  CreditCard,
  Bell,
  ArrowRight,
  ExternalLink,
  Code,
  Compass,
  SquarePen,
} from '@/components/icons';

// ============================================================================
// NAVIGATION MENU COMPOUND COMPONENTS
// ============================================================================

interface NavigationMenuContextValue {
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | null>(null);

function useNavigationMenu() {
  const context = React.useContext(NavigationMenuContext);
  if (!context) {
    throw new Error('NavigationMenu components must be used within a NavigationMenu provider');
  }
  return context;
}

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  value?: string | null;
  onValueChange?: (val: string | null) => void;
  viewport?: boolean;
}

export function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: NavigationMenuProps) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  const navRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveItem(null);
      }
    }
    if (activeItem) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeItem]);

  const contextValue = React.useMemo(
    () => ({
      activeItem,
      setActiveItem,
    }),
    [activeItem],
  );

  return (
    <NavigationMenuContext.Provider value={contextValue}>
      <nav
        ref={navRef}
        className={cn('relative z-50 flex max-w-max flex-1 items-center justify-center', className)}
        {...props}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  );
}

export function NavigationMenuList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}
      {...props}
    >
      {children}
    </ul>
  );
}

export function NavigationMenuItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn('relative', className)} {...props}>
      {children}
    </li>
  );
}

export interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function NavigationMenuTrigger({
  value,
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) {
  const { activeItem, setActiveItem } = useNavigationMenu();
  const isOpen = activeItem === value;

  return (
    <button
      type="button"
      className={cn(
        'group inline-flex h-9 w-max items-center justify-center rounded-[4px] px-3.5 py-1.5 font-sans text-xs font-semibold transition-colors focus-visible:outline-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
        isOpen
          ? 'bg-white/10 text-white shadow-inner'
          : 'text-slate-300 hover:bg-white/5 hover:text-white',
        className,
      )}
      onClick={() => setActiveItem(isOpen ? null : value)}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn('ml-1 size-3 transition-transform duration-200', isOpen && 'rotate-180')}
      />
    </button>
  );
}

export interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  render?: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => React.ReactNode;
  active?: boolean;
}

export function NavigationMenuLink({
  asChild = false,
  render,
  active = false,
  className,
  children,
  href = '#',
  ...props
}: NavigationMenuLinkProps) {
  const anchorProps = {
    href,
    className: cn(
      'inline-flex h-9 w-max items-center justify-center rounded-[4px] px-3.5 py-1.5 font-sans text-xs font-medium transition-colors hover:text-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
      active ? 'font-bold text-white' : 'text-slate-400',
      className,
    ),
    ...props,
  };

  if (render) {
    return <>{render(anchorProps)}</>;
  }

  return <a {...anchorProps}>{children}</a>;
}

export interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function NavigationMenuContent({
  value,
  className,
  children,
  ...props
}: NavigationMenuContentProps) {
  const { activeItem } = useNavigationMenu();
  const isOpen = activeItem === value;

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'animate-in fade-in zoom-in-95 absolute top-full left-1/2 z-50 mt-3 -translate-x-1/2 overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white p-4 text-slate-900 shadow-md',
        'w-[min(calc(100vw-2rem),520px)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================================
// OFFICIAL SNPI FLOATING 3-ISLAND HEADER COMPONENT
// ============================================================================

/**
 * SnpiFloatingNavigationMenu (Floating Island Header)
 *
 * Implements the 3-island floating pill navigation dock adhering to the 5 brand tokens:
 * - Island 1 (Left): [ ✦ SNPI UI ] Brand Pill in Soft Lavender & Royal Blue
 * - Island 2 (Center): [ Home | Components (Mega Menu) | Documentation ] Links Pill
 * - Island 3 (Right): [ GitHub 1.8k ] GitHub stars pill + [ HUD Mode ] Toggle
 *
 * Strict 0px blur shadows, crisp 1px borders (#CAD3F5), high contrast Deep Navy (#0A1A4A).
 */
export function RareUiNavigationMenu({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = React.useState('components');
  const [stars, setStars] = React.useState(1866);
  const [isStarred, setIsStarred] = React.useState(false);

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center py-6 select-none',
        className,
      )}
    >
      {/* Floating 3-Island Header Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {/* ISLAND 1: Brand Capsule Pill [ ✦ SNPI UI ] */}
        <div className="flex h-11 items-center gap-2 rounded-full border border-[#CAD3F5] bg-white px-4 py-2 text-slate-900 shadow-none transition-transform hover:scale-[1.02]">
          <span className="flex size-5 items-center justify-center rounded-full bg-[#E3E7FC] text-[#0056FF]">
            ✦
          </span>
          <span className="font-sans text-xs font-black tracking-tight text-[#0A1A4A]">
            SNPI UI
          </span>
        </div>

        {/* ISLAND 2: Center Navigation Menu Pill [ Home | Components | Docs ] */}
        <NavigationMenu className="h-11 rounded-full border border-[#CAD3F5] bg-white px-3 shadow-none">
          <NavigationMenuList className="gap-1.5">
            {/* Plain Link: Home */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#home"
                active={activeTab === 'home'}
                onClick={() => setActiveTab('home')}
                className="text-slate-600 hover:text-[#0056FF]"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <span className="font-mono text-xs text-slate-300">|</span>

            {/* Mega Menu Trigger: Components */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                value="components"
                onClick={() => setActiveTab('components')}
                className={cn(activeTab === 'components' && 'font-bold text-[#0056FF]')}
              >
                Components
              </NavigationMenuTrigger>

              {/* Mega Menu Panel (Columns with Summaries, Glyphs & CTA) */}
              <NavigationMenuContent value="components">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                  {/* Left Column: Featured Component Showcase Card */}
                  <div className="flex flex-col justify-between rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] p-4 sm:col-span-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[#0056FF]" />
                        <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                          Featured
                        </span>
                      </div>
                      <h4 className="mt-2 font-sans text-sm font-extrabold text-[#0A1A4A]">
                        Cyber Armor Nav
                      </h4>
                      <p className="mt-1 font-sans text-[11px] leading-relaxed text-slate-600">
                        Aerospace mecha HUD console with chamfered armor plates and Royal Blue glow.
                      </p>
                    </div>

                    <a
                      href="#cat-navigation"
                      className="group/cta mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#0056FF] hover:underline"
                    >
                      <span>Explore Docks</span>
                      <ArrowRight className="size-3" />
                    </a>
                  </div>

                  {/* Right Column: Key Navigation Panels with Glyphs & Summaries */}
                  <div className="flex flex-col justify-between gap-2 sm:col-span-7">
                    <a
                      href="#cat-forms"
                      className="group/item flex items-start gap-2.5 rounded-xl border border-transparent p-2 transition-colors hover:border-[#CAD3F5] hover:bg-[#EFF5FF]"
                    >
                      <SquarePen className="mt-0.5 size-4.5 shrink-0 stroke-[2] text-[#020617]" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-sans text-xs font-bold text-[#0A1A4A] group-hover/item:text-[#0056FF]">
                            Rich Text Editor
                          </span>
                          <span className="rounded border border-[#CAD3F5] bg-white px-1 font-mono text-[9px] font-bold text-[#0056FF]">
                            v2
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-slate-500">
                          WYSIWYG editor with allowlist sanitizer and URL scheme guard.
                        </p>
                      </div>
                    </a>

                    <a
                      href="#cat-feedback"
                      className="group/item flex items-start gap-2.5 rounded-xl border border-transparent p-2 transition-colors hover:border-[#CAD3F5] hover:bg-[#EFF5FF]"
                    >
                      <Bell className="mt-0.5 size-4.5 shrink-0 stroke-[2] text-[#020617]" />
                      <div>
                        <span className="font-sans text-xs font-bold text-[#0A1A4A] group-hover/item:text-[#0056FF]">
                          Toast Stack & Alerts
                        </span>
                        <p className="font-sans text-[11px] text-slate-500">
                          Dynamic viewport notification toasts with live progress bars.
                        </p>
                      </div>
                    </a>

                    <a
                      href="#interactive-feed"
                      className="group/item flex items-start gap-2.5 rounded-xl border border-transparent p-2 transition-colors hover:border-[#CAD3F5] hover:bg-[#EFF5FF]"
                    >
                      <Layers className="mt-0.5 size-4.5 shrink-0 stroke-[2] text-[#020617]" />
                      <div>
                        <span className="font-sans text-xs font-bold text-[#0A1A4A] group-hover/item:text-[#0056FF]">
                          73 Design Primitives
                        </span>
                        <p className="font-sans text-[11px] text-slate-500">
                          Complete single-folder component library and tokens.
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <span className="font-mono text-xs text-slate-300">|</span>

            {/* Plain Link: Documentation */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/document"
                active={activeTab === 'docs'}
                onClick={() => setActiveTab('docs')}
                className="text-slate-600 hover:text-[#0056FF]"
              >
                Open API
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* ISLAND 3: GitHub Stars Pill */}
        <button
          type="button"
          onClick={() => {
            setIsStarred(!isStarred);
            setStars((prev) => (isStarred ? prev - 1 : prev + 1));
          }}
          className={cn(
            'flex h-11 cursor-pointer items-center gap-2 rounded-full border border-[#CAD3F5] bg-white px-4 py-2 font-mono text-xs font-bold shadow-none transition-all hover:border-[#0056FF] active:scale-95',
            isStarred ? 'border-[#0056FF] bg-[#E3E7FC] text-[#0056FF]' : 'text-slate-700',
          )}
        >
          <span className="text-[#0056FF]">★</span>
          <span className="tabular-nums">{stars}</span>
        </button>
      </div>
    </div>
  );
}
