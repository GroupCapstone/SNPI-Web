'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  Check,
  CircleAlert,
  TriangleAlert,
  Info,
  X,
  Layers,
  Sparkles,
  RotateCcw,
  Play,
  Pause,
  Undo2,
} from '@/components/icons';

// ============================================================================
// TYPES & DATA STRUCTURES
// ============================================================================

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  title?: string;
  duration?: number; // Duration in milliseconds (default 5000)
  action?: ToastAction;
}

export interface ToastItemData {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
  duration: number;
  createdAt: number;
  action?: ToastAction;
}

type ToastListener = (toasts: ToastItemData[]) => void;

// ============================================================================
// PROGRAMMATIC API: Singleton Toast Manager & Event Store
// ============================================================================

class ToastManager {
  private toasts: ToastItemData[] = [];
  private listeners: Set<ToastListener> = new Set();
  private maxToasts = 5; // Stack capacity: Max 5 toasts with automatic overflow
  private counter = 0;

  private notify() {
    const copy = [...this.toasts];
    this.listeners.forEach((listener) => listener(copy));
  }

  public subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    listener([...this.toasts]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public show(message: string, type: ToastType = 'info', options?: ToastOptions): string {
    const id = `toast-${++this.counter}-${Date.now().toString(36)}`;
    const duration = options?.duration ?? 5000;

    const newToast: ToastItemData = {
      id,
      message,
      title: options?.title,
      type,
      duration,
      createdAt: Date.now(),
      action: options?.action,
    };

    // Overflow management: if at capacity, dismiss oldest first
    if (this.toasts.length >= this.maxToasts) {
      this.toasts = this.toasts.slice(1);
    }

    this.toasts = [...this.toasts, newToast];
    this.notify();
    return id;
  }

  public success(message: string, options?: ToastOptions): string {
    return this.show(message, 'success', options);
  }

  public error(message: string, options?: ToastOptions): string {
    return this.show(message, 'error', options);
  }

  public warning(message: string, options?: ToastOptions): string {
    return this.show(message, 'warning', options);
  }

  public info(message: string, options?: ToastOptions): string {
    return this.show(message, 'info', options);
  }

  public dismiss(id: string): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  public dismissAll(): void {
    this.toasts = [];
    this.notify();
  }

  public getToasts(): ToastItemData[] {
    return [...this.toasts];
  }
}

export const toast = new ToastManager();

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastItemData[]>([]);

  React.useEffect(() => {
    return toast.subscribe(setToasts);
  }, []);

  return {
    toasts,
    toast,
    dismiss: (id: string) => toast.dismiss(id),
    dismissAll: () => toast.dismissAll(),
  };
}

// ============================================================================
// BRAND PALETTE TYPE CONFIGURATION (STRICT LIGHT DAY MODE)
// ============================================================================

const VARIANT_CONFIG: Record<
  ToastType,
  {
    icon: React.ComponentType<{ className?: string; size?: number | string }>;
    label: string;
    badgeBg: string;
    badgeText: string;
    progressBar: string;
    iconColor: string;
    accentBorder: string;
  }
> = {
  success: {
    icon: Check,
    label: 'SUCCESS',
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    badgeText: 'text-emerald-700',
    progressBar: 'bg-emerald-500',
    iconColor: 'text-emerald-600',
    accentBorder: 'border-emerald-200',
  },
  error: {
    icon: CircleAlert,
    label: 'ERROR',
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-700',
    badgeText: 'text-rose-700',
    progressBar: 'bg-rose-500',
    iconColor: 'text-rose-600',
    accentBorder: 'border-rose-200',
  },
  warning: {
    icon: TriangleAlert,
    label: 'WARNING',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-700',
    badgeText: 'text-amber-700',
    progressBar: 'bg-amber-500',
    iconColor: 'text-amber-600',
    accentBorder: 'border-amber-200',
  },
  info: {
    icon: Info,
    label: 'INFO',
    badgeBg: 'bg-[#E3E7FC] border-[#CAD3F5] text-[#0056FF]',
    badgeText: 'text-[#0056FF]',
    progressBar: 'bg-[#0056FF]',
    iconColor: 'text-[#0056FF]',
    accentBorder: 'border-[#CAD3F5]',
  },
};

// ============================================================================
// TOAST CARD (With Linear Countdown Bar, Undo Action & Auto-Dismissal)
// ============================================================================

interface ToastCardProps {
  toast: ToastItemData;
  onDismiss: (id: string) => void;
  index: number;
  total: number;
  isExpanded: boolean;
  containerHovered: boolean;
}

function ToastCard({
  toast: item,
  onDismiss,
  index,
  total,
  isExpanded,
  containerHovered,
}: ToastCardProps) {
  const config = VARIANT_CONFIG[item.type];
  const IconComponent = config.icon;

  // Countdown timer state
  const [remainingTime, setRemainingTime] = React.useState(item.duration);
  const [isSelfHovered, setIsSelfHovered] = React.useState(false);
  const lastTickRef = React.useRef<number>(0);

  // Freeze countdown when hovered individually OR when the stack is hovered/expanded
  const isPaused = isSelfHovered || containerHovered;

  React.useEffect(() => {
    lastTickRef.current = Date.now();
    let hasDismissed = false;

    const interval = setInterval(() => {
      if (isPaused || hasDismissed) {
        lastTickRef.current = Date.now();
        return;
      }

      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;

      setRemainingTime((prev) => {
        const next = prev - delta;
        if (next <= 0) {
          if (!hasDismissed) {
            hasDismissed = true;
            clearInterval(interval);
            setTimeout(() => {
              onDismiss(item.id);
            }, 0);
          }
          return 0;
        }
        return next;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [isPaused, onDismiss, item.id]);

  const progressPercent = Math.max(0, Math.min(100, (remainingTime / item.duration) * 100));

  // Stack calculation (Sonner / iOS notification stack physics)
  // When collapsed: front card is at y=0, older cards peek out above with negative Y offsets
  const stackOffset = -index * 12;
  const stackScale = 1 - index * 0.04;
  const stackOpacity = index > 3 ? 0 : 1 - index * 0.12;
  const stackZIndex = 50 - index;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{
        opacity: isExpanded ? 1 : stackOpacity,
        y: isExpanded ? 0 : stackOffset,
        scale: isExpanded ? 1 : stackScale,
        zIndex: stackZIndex,
      }}
      exit={{ opacity: 0, y: -16, scale: 0.92, transition: { duration: 0.18, ease: 'easeOut' } }}
      transition={{
        type: 'spring',
        stiffness: 360,
        damping: 28,
        mass: 0.8,
      }}
      style={{
        position: isExpanded ? 'relative' : index === 0 ? 'relative' : 'absolute',
        bottom: isExpanded ? undefined : 0,
        left: isExpanded ? undefined : 0,
        right: isExpanded ? undefined : 0,
      }}
      onMouseEnter={() => setIsSelfHovered(true)}
      onMouseLeave={() => setIsSelfHovered(false)}
      className="pointer-events-auto w-full select-none"
    >
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'relative flex w-full flex-col overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white p-4',
          'shadow-[0_10px_25px_-5px_rgba(0,86,255,0.08),_0_8px_10px_-6px_rgba(0,0,0,0.04)]',
          'transition-shadow duration-200 hover:shadow-[0_16px_32px_-6px_rgba(0,86,255,0.14)]',
        )}
      >
        {/* Card Header & Content */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            {/* Visual Icon */}
            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center">
              <IconComponent size={18} className={cn('stroke-[2.4]', config.iconColor)} />
            </div>

            {/* Message Body (No text truncation - 100% visible) */}
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-sans text-sm leading-snug font-bold tracking-tight text-[#0A1A4A]">
                  {item.title || (item.type === 'info' ? 'Notification' : config.label)}
                </h4>
                <span
                  className={cn(
                    'py-0.2 rounded-md border px-1.5 font-mono text-[9px] font-bold tracking-wider uppercase',
                    config.badgeBg,
                  )}
                >
                  {config.label}
                </span>
              </div>
              <p className="font-sans text-xs leading-relaxed text-slate-600">{item.message}</p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(item.id);
            }}
            aria-label="Dismiss notification"
            className="flex size-6 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:ring-2 focus-visible:ring-[#0056FF]"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Action Button & Status Bar */}
        {(item.action || isPaused) && (
          <div className="mt-3 flex items-center justify-between pt-1">
            {item.action ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  item.action?.onClick();
                  onDismiss(item.id);
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-[#EFF5FF] px-3.5 py-1.5 font-sans text-xs font-bold text-[#0056FF] transition-all hover:border-[#0056FF] hover:bg-[#E3E7FC] active:scale-[0.97]"
              >
                <Undo2 className="size-3.5" />
                <span>{item.action.label}</span>
              </button>
            ) : (
              <div />
            )}

            {isPaused && (
              <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-amber-600">
                <Pause className="size-3" />
                <span>PAUSED</span>
              </div>
            )}
          </div>
        )}

        {/* Linear Countdown Progress Bar */}
        <div className="absolute inset-x-0 bottom-0 h-[2.5px] w-full bg-slate-100">
          <div
            className={cn('h-full transition-all duration-75', config.progressBar)}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// TOAST STACK CONTAINER (Stacked Resting Deck + Hover / Tap Expansion)
// ============================================================================

export interface ToastContainerProps {
  toasts?: ToastItemData[];
  onDismiss?: (id: string) => void;
  position?: 'fixed' | 'inline';
  className?: string;
}

export function ToastContainer({
  toasts: externalToasts,
  onDismiss: externalDismiss,
  position = 'fixed',
  className,
}: ToastContainerProps) {
  const hook = useToast();
  const activeToasts = externalToasts ?? hook.toasts;
  const handleDismiss = externalDismiss ?? hook.dismiss;

  // Stacking interaction: hover or tap expands the queue
  const [isHovered, setIsHovered] = React.useState(false);
  const [isTapped, setIsTapped] = React.useState(false);
  const isExpanded = isHovered || isTapped;

  // Newest toast first (index 0 is front card)
  const reversedToasts = React.useMemo(() => {
    return [...activeToasts].reverse();
  }, [activeToasts]);

  if (reversedToasts.length === 0) return null;

  const positionClasses =
    position === 'fixed'
      ? 'fixed bottom-6 right-6 z-50 pointer-events-none w-full max-w-sm'
      : 'relative z-20 pointer-events-none w-full max-w-sm mx-auto';

  // Calculate stack top padding so overlapping card tabs don't get clipped
  const stackPaddingTop = isExpanded ? 0 : Math.min(reversedToasts.length - 1, 3) * 12;

  return (
    <div
      aria-label="Notification Stack"
      className={cn(positionClasses, 'transition-all duration-300', className)}
    >
      {/* Top Stack Expansion Indicator Pill */}
      {reversedToasts.length > 1 && (
        <div className="pointer-events-auto mb-2 flex items-center justify-between px-2 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 font-bold text-[#0056FF]">
            <Layers className="size-3.5 text-[#0056FF]" />
            {reversedToasts.length} Stacked · {isExpanded ? 'Expanded' : 'Hover to expand'}
          </span>
          {isExpanded && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsTapped(false);
              }}
              className="cursor-pointer font-sans text-[11px] font-bold text-slate-500 hover:text-[#0056FF]"
            >
              Collapse
            </button>
          )}
        </div>
      )}

      {/* Toast Cards Container */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsTapped((prev) => !prev)}
        style={{ paddingTop: `${stackPaddingTop}px` }}
        className={cn(
          'pointer-events-auto relative flex w-full transition-all duration-300',
          isExpanded ? 'flex-col gap-3' : 'h-[140px] items-end',
        )}
      >
        <AnimatePresence mode="popLayout">
          {reversedToasts.map((t, idx) => (
            <ToastCard
              key={t.id}
              toast={t}
              index={idx}
              total={reversedToasts.length}
              isExpanded={isExpanded}
              containerHovered={isHovered || isTapped}
              onDismiss={handleDismiss}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// INTERACTIVE DOCUMENTATION DEMO: ToastStackDemo
// ============================================================================

export function ToastStackDemo() {
  const [containerMode, setContainerMode] = React.useState<'inline' | 'fixed'>('inline');
  const { toasts, dismiss, dismissAll } = useToast();

  // Fire "Conversation Archived" with active Undo pill
  const fireConversationArchived = React.useCallback(() => {
    toast.info('View archived in the sidebar (≡ menu).', {
      title: 'Conversation Archived',
      duration: 5500,
      action: {
        label: 'Undo',
        onClick: () => {
          toast.success('Conversation restored to active workspace.', {
            title: 'Action Reversed',
            duration: 3500,
          });
        },
      },
    });
  }, []);

  const fireSuccess = React.useCallback(() => {
    toast.success('Batch transaction TX-9204 committed to ledger.', {
      title: 'Ledger Hash Verified',
      duration: 5000,
      action: {
        label: 'View TX',
        onClick: () => {},
      },
    });
  }, []);

  const fireError = React.useCallback(() => {
    toast.error('Constant-time signature check failed for gateway request.', {
      title: 'Security Token Rejected',
      duration: 5500,
      action: {
        label: 'Retry Auth',
        onClick: () => fireSuccess(),
      },
    });
  }, [fireSuccess]);

  const fireWarning = React.useCallback(() => {
    toast.warning('Admission query volume at 88% of tenant burst limit.', {
      title: 'Rate Limit Threshold',
      duration: 4500,
    });
  }, []);

  const fireInfo = React.useCallback(() => {
    toast.info('Synchronized 47 domain modules with schema contracts.', {
      title: 'Changelog Sync',
      duration: 4500,
    });
  }, []);

  // Rapid Burst: Generates 5 stacked notifications immediately
  const fireRapidBurst = React.useCallback(() => {
    toast.info('View archived in the sidebar (≡ menu).', {
      title: 'Conversation Archived',
      duration: 7000,
      action: {
        label: 'Undo',
        onClick: () => {},
      },
    });
    setTimeout(() => {
      toast.success('Student candidate account generated with credentials.', {
        title: 'Candidate Created (2/5)',
        duration: 7000,
        action: {
          label: 'View Profile',
          onClick: () => {},
        },
      });
    }, 150);
    setTimeout(() => {
      toast.warning('Guardian phone number requires country prefix normalization.', {
        title: 'Format Alert (3/5)',
        duration: 7000,
      });
    }, 300);
    setTimeout(() => {
      toast.error('Tuition fee concession waiver expired on 2026-10-15.', {
        title: 'Concession Expired (4/5)',
        duration: 7000,
      });
    }, 450);
    setTimeout(() => {
      toast.success('Cryptographic identity passbook minted on branch ledger.', {
        title: 'Passbook Ready (5/5)',
        duration: 7000,
      });
    }, 600);
  }, []);

  // Automatically initialize with 2 active stacked toasts on mount for instant visual feedback
  React.useEffect(() => {
    const timer = setTimeout(() => {
      fireConversationArchived();
      setTimeout(() => {
        toast.success('Batch transaction TX-9204 committed to ledger.', {
          title: 'Transaction Confirmed',
          duration: 6500,
          action: {
            label: 'View Hash',
            onClick: () => {},
          },
        });
      }, 200);
    }, 300);
    return () => clearTimeout(timer);
  }, [fireConversationArchived]);

  return (
    <div className="w-full space-y-4">
      {/* Refined Action Toolbar - Compact & De-Emphasized */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-[#CAD3F5] bg-white p-2.5 shadow-2xs sm:px-3.5 sm:py-2.5">
        {/* Left: Quick Triggers */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
          {/* Rapid Burst (5 Toasts) */}
          <button
            type="button"
            onClick={fireRapidBurst}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#0056FF] bg-[#0056FF] px-3 py-1.5 font-sans text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-600 active:scale-95"
          >
            <Sparkles className="size-3.5 text-white" />
            <span>Burst Stack (5)</span>
          </button>

          {/* Archive with Undo */}
          <button
            type="button"
            onClick={fireConversationArchived}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-[#EFF5FF] px-3 py-1.5 font-sans text-xs font-bold text-[#0056FF] transition-all hover:bg-blue-100/60 active:scale-95"
          >
            <Undo2 className="size-3.5 text-[#0056FF]" />
            <span>Archive</span>
          </button>

          <span className="mx-0.5 h-4 w-px bg-slate-200" />

          {/* Success */}
          <button
            type="button"
            onClick={fireSuccess}
            className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md border border-emerald-200 bg-emerald-50/60 text-emerald-700 transition-all hover:border-emerald-300 hover:bg-emerald-100 active:scale-95"
            title="Fire Success Toast"
          >
            <Check className="size-3.5 stroke-[2]" />
          </button>

          {/* Error */}
          <button
            type="button"
            onClick={fireError}
            className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md border border-rose-200 bg-rose-50/60 text-rose-700 transition-all hover:border-rose-300 hover:bg-rose-100 active:scale-95"
            title="Fire Error Toast"
          >
            <CircleAlert className="size-3.5 stroke-[2]" />
          </button>

          {/* Warning */}
          <button
            type="button"
            onClick={fireWarning}
            className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md border border-amber-200 bg-amber-50/60 text-amber-700 transition-all hover:border-amber-300 hover:bg-amber-100 active:scale-95"
            title="Fire Warning Toast"
          >
            <TriangleAlert className="size-3.5 stroke-[2]" />
          </button>

          {/* Info */}
          <button
            type="button"
            onClick={fireInfo}
            className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md border border-blue-200 bg-blue-50/60 text-[#0056FF] transition-all hover:border-blue-300 hover:bg-blue-100 active:scale-95"
            title="Fire Info Toast"
          >
            <Info className="size-3.5 stroke-[2]" />
          </button>
        </div>

        {/* Right: Mode & Clear Actions */}
        <div className="flex items-center gap-1.5">
          {/* Placement Switcher */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-[#EFF5FF] p-1">
            <button
              type="button"
              onClick={() => setContainerMode('inline')}
              className={cn(
                'cursor-pointer rounded-md px-2.5 py-1 font-sans text-xs font-bold transition-all',
                containerMode === 'inline'
                  ? 'bg-white text-[#0056FF] shadow-xs'
                  : 'text-slate-600 hover:text-[#0056FF]',
              )}
            >
              Stage
            </button>
            <button
              type="button"
              onClick={() => setContainerMode('fixed')}
              className={cn(
                'cursor-pointer rounded-md px-2.5 py-1 font-sans text-xs font-bold transition-all',
                containerMode === 'fixed'
                  ? 'bg-white text-[#0056FF] shadow-xs'
                  : 'text-slate-600 hover:text-[#0056FF]',
              )}
            >
              Viewport
            </button>
          </div>

          {/* Queue Counter & Dismiss All */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <span className="rounded-lg border border-[#CAD3F5] bg-[#E3E7FC]/80 px-2.5 py-1 text-xs font-bold text-[#0056FF]">
              {toasts.length} Active
            </span>
            {toasts.length > 0 && (
              <button
                type="button"
                onClick={dismissAll}
                className="flex size-6 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 active:scale-95"
                title="Clear all toasts"
              >
                <RotateCcw className="size-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Interactive Toast Stage Canvas */}
      <div className="relative min-h-[380px] w-full overflow-hidden rounded-2xl border border-[#CAD3F5] bg-[#EFF5FF]/20 p-6 shadow-xs sm:min-h-[420px]">
        {/* Stage Status Strip */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-1 font-mono text-[10px] text-slate-400">
          <span className="flex items-center gap-1.5 font-bold text-[#0A1A4A]">
            <Layers className="size-3 shrink-0 text-[#0056FF]" />
            <span>STACKED DECK · HOVER TO EXPAND</span>
          </span>
          <span className="hidden font-mono text-slate-400 sm:inline">COUNTDOWN TIMERS ACTIVE</span>
        </div>

        {/* Live Toast Stack Component in the Stage */}
        <div className="relative z-20 mt-8 flex w-full justify-center sm:mt-12 sm:justify-end">
          <ToastContainer position={containerMode} toasts={toasts} onDismiss={dismiss} />
        </div>
      </div>
    </div>
  );
}
