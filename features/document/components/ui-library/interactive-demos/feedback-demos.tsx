'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Bell,
  BellRing,
  BellDot,
  Check,
  Alert,
  Info,
  X,
  Sparkles,
  RotateCw,
  Play,
  ShieldCheck,
  Trash2,
} from '@/components/icons';
import { StatusPage404, type StatusCode, type StatusMode } from '../status-page-404';

// 1. Toast Notification Stack
export function ToastDemo() {
  const [toasts, setToasts] = React.useState<
    { id: number; title: string; type: 'success' | 'info' | 'warning' }[]
  >([
    { id: 1, title: 'Term 1 Exam grades synchronized successfully', type: 'success' },
    { id: 2, title: 'Backup replica completed in 42ms', type: 'info' },
  ]);

  const addToast = (type: 'success' | 'info' | 'warning', text: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title: text, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  };

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-none">
      <div className="flex items-center justify-end border-b border-slate-100 pb-2.5">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => addToast('success', 'Student STU-890 verified')}
            className="rounded-[4px] bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700 hover:bg-emerald-100"
          >
            + Success
          </button>
          <button
            type="button"
            onClick={() => addToast('warning', 'Session expires in 5m')}
            className="rounded-[4px] bg-amber-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-700 hover:bg-amber-100"
          >
            + Warning
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {toasts.length === 0 ? (
          <div className="py-6 text-center font-sans text-xs text-slate-400">
            No active toasts. Tap above to trigger.
          </div>
        ) : (
          toasts.map((toast) => (
            <div
              key={toast.id}
              className={cn(
                'animate-in fade-in slide-in-from-top-1 flex items-center justify-between rounded-xl border p-3 font-sans text-xs shadow-xs transition-all',
                toast.type === 'success' && 'border-emerald-200 bg-emerald-50/70 text-emerald-900',
                toast.type === 'info' && 'border-blue-200 bg-blue-50/70 text-blue-900',
                toast.type === 'warning' && 'border-amber-200 bg-amber-50/70 text-amber-900',
              )}
            >
              <div className="flex items-center gap-2">
                {toast.type === 'success' && <Check className="size-4 text-emerald-600" />}
                {toast.type === 'info' && <Info className="size-4 text-blue-600" />}
                {toast.type === 'warning' && <Alert className="size-4 text-amber-600" />}
                <span className="font-semibold">{toast.title}</span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 3. Notification Bell with Tap-to-Drop Floating Notification Center
export function NotificationBellDemo() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [filter, setFilter] = React.useState<
    'all' | 'academic' | 'security' | 'finance' | 'system'
  >('all');
  const [hasNewAlert, setHasNewAlert] = React.useState(false);
  const bellContainerRef = React.useRef<HTMLDivElement>(null);

  const [items, setItems] = React.useState([
    {
      id: 1,
      title: 'Biometric Attendance Roster Finalized',
      desc: 'Section CS-2026-A submitted morning biometric roster for review (48/50 present).',
      time: '10m ago',
      branch: 'PP-02',
      category: 'academic' as const,
      read: false,
    },
    {
      id: 2,
      title: 'Cryptographic Signature Key Rotated',
      desc: 'Automatic HMAC rotation completed successfully for campus gateway cluster.',
      time: '1h ago',
      branch: 'SR-01',
      category: 'security' as const,
      read: false,
    },
    {
      id: 3,
      title: 'Tuition Fee Invoice Dispatched',
      desc: 'Consolidated batch invoices issued via Telegram SMS gateway for 312 students.',
      time: '3h ago',
      branch: 'BT-03',
      category: 'finance' as const,
      read: false,
    },
    {
      id: 4,
      title: 'Replica Database Health Probe Normal',
      desc: 'Primary-to-secondary database replication latency is 12ms across all nodes.',
      time: '5h ago',
      branch: 'PP-01',
      category: 'system' as const,
      read: true,
    },
  ]);

  // Click outside and escape key listeners to close floating dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellContainerRef.current && !bellContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const unreadCount = items.filter((n) => !n.read).length;

  const toggleRead = (id: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: !item.read } : item)));
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const removeItem = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllNotifications = () => {
    setItems([]);
  };

  const resetSampleData = () => {
    setItems([
      {
        id: 1,
        title: 'Biometric Attendance Roster Finalized',
        desc: 'Section CS-2026-A submitted morning biometric roster for review (48/50 present).',
        time: '10m ago',
        branch: 'PP-02',
        category: 'academic',
        read: false,
      },
      {
        id: 2,
        title: 'Cryptographic Signature Key Rotated',
        desc: 'Automatic HMAC rotation completed successfully for campus gateway cluster.',
        time: '1h ago',
        branch: 'SR-01',
        category: 'security',
        read: false,
      },
      {
        id: 3,
        title: 'Tuition Fee Invoice Dispatched',
        desc: 'Consolidated batch invoices issued via Telegram SMS gateway for 312 students.',
        time: '3h ago',
        branch: 'BT-03',
        category: 'finance',
        read: false,
      },
      {
        id: 4,
        title: 'Replica Database Health Probe Normal',
        desc: 'Primary-to-secondary database replication latency is 12ms across all nodes.',
        time: '5h ago',
        branch: 'PP-01',
        category: 'system',
        read: true,
      },
    ]);
    setFilter('all');
    setIsOpen(true);
  };

  const triggerNewNotification = (cat: 'academic' | 'security' | 'finance') => {
    setHasNewAlert(true);
    setTimeout(() => setHasNewAlert(false), 2200);

    const templates = {
      academic: {
        title: 'Final Examination Schedule Published',
        desc: 'Academic Directorate published the Term 1 examination timetable for IT Year 3.',
        category: 'academic' as const,
        branch: 'PP-02',
      },
      security: {
        title: 'New Session Device Authorized',
        desc: 'Security policy granted administrator session access from verified MAC terminal.',
        category: 'security' as const,
        branch: 'SR-01',
      },
      finance: {
        title: 'Bakong KHQR Payment Received',
        desc: 'Cashier confirmed tuition transaction $450.00 USD via National Bank of Cambodia gateway.',
        category: 'finance' as const,
        branch: 'BT-03',
      },
    };

    const chosen = templates[cat];
    const newItem = {
      id: Date.now(),
      ...chosen,
      time: 'Just now',
      read: false,
    };
    setItems((prev) => [newItem, ...prev]);
    setIsOpen(true);
  };

  const filteredItems = items.filter((item) =>
    filter === 'all' ? true : item.category === filter,
  );

  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case 'security':
        return {
          label: 'SECURITY',
          badgeClass: 'border-violet-200 bg-violet-50 text-violet-700',
          icon: ShieldCheck,
          iconClass: 'text-violet-600 bg-violet-50 border border-violet-200',
        };
      case 'academic':
        return {
          label: 'ACADEMIC',
          badgeClass: 'border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF]',
          icon: BellRing,
          iconClass: 'text-[#0056FF] bg-[#EFF5FF] border border-[#CAD3F5]',
        };
      case 'finance':
        return {
          label: 'FINANCE',
          badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
          icon: Sparkles,
          iconClass: 'text-emerald-600 bg-emerald-50 border border-emerald-200',
        };
      default:
        return {
          label: 'SYSTEM',
          badgeClass: 'border-amber-200 bg-amber-50 text-amber-700',
          icon: BellDot,
          iconClass: 'text-amber-600 bg-amber-50 border border-amber-200',
        };
    }
  };

  return (
    <div className="relative flex w-full flex-col gap-4 py-2">
      {/* 1. Simulation & State Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#CAD3F5] bg-white p-3 shadow-2xs sm:px-4 sm:py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#0A1A4A] uppercase">
            Simulate Alerts:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => triggerNewNotification('academic')}
              className="flex cursor-pointer items-center gap-1 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] px-2.5 py-1.5 font-mono text-[11px] font-bold text-[#0056FF] transition-all hover:bg-[#E3E7FC] active:scale-95"
            >
              <span>+ Academic</span>
            </button>
            <button
              type="button"
              onClick={() => triggerNewNotification('security')}
              className="flex cursor-pointer items-center gap-1 rounded-xl border border-violet-200 bg-violet-50/70 px-2.5 py-1.5 font-mono text-[11px] font-bold text-violet-700 transition-all hover:bg-violet-100 active:scale-95"
            >
              <span>+ Security</span>
            </button>
            <button
              type="button"
              onClick={() => triggerNewNotification('finance')}
              className="flex cursor-pointer items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50/70 px-2.5 py-1.5 font-mono text-[11px] font-bold text-emerald-700 transition-all hover:bg-emerald-100 active:scale-95"
            >
              <span>+ Finance</span>
            </button>
            <button
              type="button"
              onClick={resetSampleData}
              title="Reset Sample Data"
              className="flex size-7.5 cursor-pointer items-center justify-center rounded-xl border border-[#CAD3F5] text-slate-500 hover:border-[#0056FF] hover:bg-slate-50 hover:text-[#0056FF] active:scale-95"
            >
              <RotateCw className="size-3.5" />
            </button>
          </div>
        </div>

        {/* State Helper Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400">Panel State:</span>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'cursor-pointer rounded-md px-2 py-0.5 text-[11px] font-bold transition-all',
              isOpen
                ? 'border border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF]'
                : 'border border-slate-200 bg-slate-100 text-slate-600 hover:border-[#CAD3F5] hover:text-[#0056FF]',
            )}
          >
            {isOpen ? 'Dropped Down · Tap to close' : 'Collapsed · Tap bell to drop'}
          </button>
        </div>
      </div>

      {/* 2. Interactive Navigation Stage with Floating Dropped-Down List */}
      <div className="relative min-h-[480px] w-full rounded-2xl border-2 border-[#CAD3F5] bg-[#EFF5FF]/20 p-4 sm:min-h-[540px] sm:p-6">
        {/* Mock Application Navbar Header */}
        <div className="relative z-30 flex items-center justify-between rounded-2xl border border-[#CAD3F5] bg-white px-4 py-3 shadow-2xs sm:px-6">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-2.5">
            <span className="flex size-8.5 items-center justify-center rounded-xl bg-[#0056FF] text-xs font-black text-white shadow-xs">
              S
            </span>
            <div className="flex flex-col">
              <span className="font-sans text-xs font-black tracking-tight text-[#0A1A4A] sm:text-sm">
                SNPI Campus Alert Hub
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
                Live Notification Stream
              </span>
            </div>
          </div>

          {/* Right: Notification Bell Trigger & Floating Dropped-Down Popover */}
          <div ref={bellContainerRef} className="relative">
            {/* The Bell Trigger Icon Button */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-label="Toggle notifications dropdown list"
              title={isOpen ? 'Close Notification List' : 'Tap to drop down notifications'}
              className={cn(
                'group relative flex size-11 cursor-pointer items-center justify-center rounded-2xl border-2 transition-all select-none active:scale-95',
                isOpen
                  ? 'border-[#0056FF] bg-[#EFF5FF] text-[#0056FF] shadow-xs ring-4 ring-[#0056FF]/15'
                  : 'border-[#CAD3F5] bg-white text-slate-700 hover:border-[#0056FF] hover:bg-[#EFF5FF]/50 hover:text-[#0056FF]',
                hasNewAlert && 'scale-105 ring-4 ring-[#0056FF]/30',
              )}
            >
              <Bell
                className={cn(
                  'size-5 stroke-[2.2]',
                  hasNewAlert && 'text-[#0056FF]',
                )}
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex size-5.5 items-center justify-center rounded-full bg-[#0056FF] font-mono text-[10px] font-black text-white shadow-xs ring-2 ring-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Tap Dropdown List Popover (Anchored Directly Under Bell) */}
            {isOpen && (
              <div
                role="dialog"
                aria-label="Campus Notifications List"
                className="animate-in fade-in slide-in-from-top-2 zoom-in-95 absolute top-full right-0 z-50 mt-3 w-[calc(100vw-3rem)] max-w-[420px] rounded-2xl border-2 border-[#CAD3F5] bg-white p-4 shadow-[0_20px_60px_-15px_rgba(0,86,255,0.22),_0_10px_20px_-5px_rgba(0,0,0,0.06)] duration-150 select-none sm:w-[420px]"
              >
                {/* 1. Popover Header Row */}
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-black text-[#0A1A4A]">
                      Notifications
                    </span>
                    <span className="rounded-full border border-[#CAD3F5] bg-[#E3E7FC] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                      {unreadCount} Unread
                    </span>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="flex cursor-pointer items-center gap-1 font-mono text-xs font-bold text-[#0056FF] hover:underline"
                    >
                      <Check className="size-3.5 stroke-[2.5]" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                {/* 2. Filter Category Pills */}
                <div className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2.5">
                  {(
                    [
                      { id: 'all', label: 'All', count: items.length },
                      {
                        id: 'academic',
                        label: 'Academic',
                        count: items.filter((i) => i.category === 'academic').length,
                      },
                      {
                        id: 'security',
                        label: 'Security',
                        count: items.filter((i) => i.category === 'security').length,
                      },
                      {
                        id: 'finance',
                        label: 'Finance',
                        count: items.filter((i) => i.category === 'finance').length,
                      },
                      {
                        id: 'system',
                        label: 'System',
                        count: items.filter((i) => i.category === 'system').length,
                      },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFilter(tab.id)}
                      className={cn(
                        'flex shrink-0 cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-all select-none',
                        filter === tab.id
                          ? 'bg-[#0056FF] text-white shadow-2xs'
                          : 'border border-slate-200 bg-slate-50 text-slate-600 hover:border-[#CAD3F5] hover:text-[#0A1A4A]',
                      )}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={cn(
                          'rounded-md px-1 text-[10px]',
                          filter === tab.id
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200/70 text-slate-600',
                        )}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* 3. Scrollable Notification Items List */}
                <div className="no-scrollbar max-h-[320px] space-y-2 overflow-y-auto pt-1 pr-1">
                  {filteredItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#CAD3F5] py-10 text-center">
                      <BellDot className="size-7 text-[#0056FF]/40" />
                      <p className="mt-2 font-sans text-xs font-bold text-[#0A1A4A]">
                        No notifications in this category
                      </p>
                      <p className="mt-0.5 font-sans text-[11px] text-slate-400">
                        Try simulating a new alert above.
                      </p>
                    </div>
                  ) : (
                    filteredItems.map((n) => {
                      const meta = getCategoryMeta(n.category);
                      const IconComponent = meta.icon;

                      return (
                        <div
                          key={n.id}
                          onClick={() => toggleRead(n.id)}
                          className={cn(
                            'group relative flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition-all select-none hover:shadow-2xs',
                            n.read
                              ? 'border-slate-200/80 bg-white opacity-80 hover:bg-slate-50'
                              : 'border-[#CAD3F5] bg-[#EFF5FF]/40 hover:border-[#0056FF]/60 hover:bg-[#EFF5FF]/70',
                            !n.read && 'border-l-3 border-l-[#0056FF]',
                          )}
                        >
                          {/* Domain Icon Badge */}
                          <div
                            className={cn(
                              'flex size-8 shrink-0 items-center justify-center rounded-xl shadow-2xs',
                              meta.iconClass,
                            )}
                          >
                            <IconComponent className="size-4 stroke-[2]" />
                          </div>

                          {/* Content Body */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1.5">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={cn(
                                    'py-0.2 rounded-md border px-1.5 font-mono text-[9px] font-bold tracking-wider uppercase',
                                    meta.badgeClass,
                                  )}
                                >
                                  {meta.label}
                                </span>
                                <span className="py-0.2 rounded border border-[#CAD3F5] bg-white px-1.5 font-mono text-[9px] font-bold text-slate-600">
                                  {n.branch}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                                <span>{n.time}</span>
                                {!n.read && (
                                  <span
                                    className="size-1.5 rounded-full bg-[#0056FF] ring-3 ring-[#EFF5FF]"
                                    title="Unread Notification"
                                  />
                                )}
                              </div>
                            </div>

                            <h5 className="mt-1 font-sans text-xs leading-snug font-bold text-[#0A1A4A]">
                              {n.title}
                            </h5>
                            <p className="mt-0.5 line-clamp-2 font-sans text-[11px] leading-relaxed text-slate-600">
                              {n.desc}
                            </p>

                            <div className="mt-2 flex items-center justify-between font-mono text-[10px]">
                              <span className="text-[#0056FF]/70 group-hover:text-[#0056FF]">
                                {n.read ? 'Tap to mark unread' : 'Tap to mark read'}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => removeItem(e, n.id)}
                                title="Dismiss notification"
                                className="flex size-5 cursor-pointer items-center justify-center rounded-md text-slate-400 opacity-60 transition-colors hover:bg-slate-200/80 hover:text-slate-800 hover:opacity-100"
                              >
                                <Trash2 className="size-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* 4. Popover Footer Row */}
                <div className="mt-3 flex items-center justify-between border-t border-[#CAD3F5]/80 pt-2.5 font-mono text-[11px]">
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    WebSocket Connected
                  </span>
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllNotifications}
                      className="cursor-pointer text-[10px] font-bold text-slate-500 transition-colors hover:text-rose-600"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Helpful Stage Hint */}
        <div className="mt-8 flex flex-col items-center justify-center text-center">
          <p className="font-mono text-xs text-slate-500">
            Interactive Popover: Tap the Notification Bell icon button above to toggle the
            dropped-down list.
          </p>
        </div>
      </div>
    </div>
  );
}

// 3. Status Page (Visual Archetype Engine & Multi-Status Codes)
export function StatusPage404Demo() {
  const [selectedMode, setSelectedMode] = React.useState<StatusMode>('radar');
  const [selectedCode, setSelectedCode] = React.useState<StatusCode>(404);

  const archetypes: { id: StatusMode; label: string; desc: string; tag: string }[] = [
    {
      id: 'radar',
      label: '01 Radar Explorer',
      desc: 'Concentric spatial rings, rotating radar beam, floating 3D numbers, and coordinate tracking.',
      tag: 'AEROSPACE',
    },
    {
      id: 'barcode',
      label: '02 Barcode Ledger',
      desc: 'Cryptographic high-density barcode, editorial typography, hairline accents, and error hash.',
      tag: 'EDITORIAL',
    },
    {
      id: 'noise',
      label: '03 CRT Phosphor',
      desc: 'Synthesized procedural grid canvas, carrier frequency telemetry, and coordinate tracking.',
      tag: 'COORDINATE',
    },
    {
      id: 'gravity',
      label: '04 Gravity Blocks',
      desc: 'Kinetic architectural brand cards with spring physics tumbling and interactive re-alignment.',
      tag: 'KINETIC MOTION',
    },
  ];

  const statusCodes: { code: StatusCode; label: string }[] = [
    { code: 404, label: '404 Not Found' },
    { code: 403, label: '403 Forbidden' },
    { code: 500, label: '500 Server Error' },
    { code: 503, label: '503 Unavailable' },
    { code: 401, label: '401 Unauthorized' },
  ];

  return (
    <div className="w-full max-w-4xl space-y-3 rounded-[4px] border border-[#CAD3F5] bg-white p-5 shadow-2xs sm:p-6">
      {/* HTTP Status Code Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#CAD3F5]/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-sans text-xs font-bold text-[#0A1A4A]">
            Status Archetype Engine
          </span>
          <span className="font-mono text-[10px] text-slate-400">Select Code:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {statusCodes.map((sc) => (
            <button
              key={sc.code}
              type="button"
              onClick={() => setSelectedCode(sc.code)}
              title={`Simulate HTTP ${sc.code} error state`}
              className={cn(
                'cursor-pointer rounded-[2px] border px-2.5 py-1 font-mono text-xs font-bold transition-colors select-none active:scale-95',
                selectedCode === sc.code
                  ? 'border-[#0056FF] bg-[#0056FF] text-white'
                  : 'border-[#CAD3F5] bg-white text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
              )}
            >
              {sc.code}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Mode Picker Strip */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {archetypes.map((arch) => {
          const isSelected = selectedMode === arch.id;
          return (
            <button
              key={arch.id}
              type="button"
              onClick={() => setSelectedMode(arch.id)}
              title={`Switch archetype to ${arch.label}: ${arch.desc}`}
              className={cn(
                'flex cursor-pointer flex-col justify-between rounded-[4px] border p-2.5 text-left transition-all select-none',
                isSelected
                  ? 'border-[#0056FF] bg-[#EFF5FF] ring-1 ring-[#0056FF]/30'
                  : 'border-[#CAD3F5] bg-white hover:bg-[#EFF5FF]/50',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold text-[#0056FF]">{arch.tag}</span>
                {isSelected && <span className="h-1.5 w-1.5 rounded-[1px] bg-[#0056FF]" />}
              </div>
              <div className="mt-1 font-sans text-xs font-bold text-[#0A1A4A]">{arch.label}</div>
            </button>
          );
        })}
      </div>

      {/* Live Component Preview */}
      <div className="overflow-hidden rounded-[4px] border border-[#CAD3F5] bg-white">
        <StatusPage404
          mode={selectedMode}
          statusCode={selectedCode}
          homeLabel="Return to Dashboard"
          showControls={false}
        />
      </div>
    </div>
  );
}
