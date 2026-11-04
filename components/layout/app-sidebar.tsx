'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, PanelLeftClose, PanelLeftOpen, X } from '@/components/icons';

import { BrandMark } from '@/components/shared/brand-mark';
import { Button } from '@/components/ui/button';
import { getVisibleNavigation } from '@/constants/navigation';
import { useAuth } from '@/features/auth/context/auth-context';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-context';

interface AppSidebarProps {
  onClose?: () => void;
  className?: string;
}

const isPathActive = (href: string, allHrefs: string[], currentPath: string): boolean => {
  if (currentPath === href) return true;
  if (href === '/dashboard') return false;
  if (currentPath.startsWith(`${href}/`)) {
    const hasMoreSpecificMatch = allHrefs.some(
      (otherHref) =>
        otherHref !== href &&
        (currentPath === otherHref || currentPath.startsWith(`${otherHref}/`)) &&
        otherHref.length > href.length,
    );
    return !hasMoreSpecificMatch;
  }
  return false;
};

export const AppSidebar = ({ onClose, className }: AppSidebarProps) => {
  const pathname = usePathname();
  const { user, permissions } = useAuth();
  const { isKhmer } = useTranslation();
  const { isCollapsed: contextCollapsed, toggleCollapse } = useSidebar();

  // If used as a mobile drawer (onClose provided), never collapse to icon-only
  const isMobileDrawer = Boolean(onClose);
  const isCollapsed = isMobileDrawer ? false : contextCollapsed;

  const groups = React.useMemo(() => {
    return getVisibleNavigation(permissions, user?.roles ?? []);
  }, [permissions, user?.roles]);

  const allNavHrefs = React.useMemo(() => {
    return groups.flatMap((group) => group.items.map((item) => item.href));
  }, [groups]);

  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const group of groups) {
      if (!group.label) continue;
      const key = group.id ?? group.label;
      const hasActive = group.items.some((item) => isPathActive(item.href, allNavHrefs, pathname));
      if (hasActive) {
        initial[key] = true;
      }
    }
    return initial;
  });

  const toggleGroup = React.useCallback((key: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const handleCollapsedGroupClick = React.useCallback(
    (key: string) => {
      toggleCollapse();
      setOpenGroups((prev) => ({ ...prev, [key]: true }));
    },
    [toggleCollapse],
  );

  return (
    <aside
      className={cn(
        'flex h-full shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 transition-[width] duration-300 ease-in-out',
        isCollapsed ? 'w-[76px]' : 'w-[272px]',
        className,
      )}
    >
      {/* Sidebar Header (School Brand only, top collapse button removed) */}
      <div
        className={cn(
          'flex h-18 items-center border-b border-slate-800 transition-all duration-300',
          isCollapsed ? 'justify-center px-2' : 'justify-between px-5',
        )}
      >
        <Link href="/dashboard" className="flex items-center transition-opacity hover:opacity-90">
          <BrandMark compact={isCollapsed} inverse size={isCollapsed ? 34 : 38} />
        </Link>

        {/* Mobile Drawer Close Button only */}
        {isMobileDrawer && (
          <Button
            aria-label="Close navigation"
            className="text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            onClick={onClose}
            size="icon"
            type="button"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Navigation Links */}
      <nav
        aria-label="Main navigation"
        className={cn(
          'no-scrollbar flex-1 overflow-y-auto py-4 transition-all duration-300',
          isCollapsed ? 'space-y-3 px-2' : 'space-y-1.5 px-3',
        )}
      >
        {groups.map((group, groupIndex) => {
          const groupKey = group.id ?? group.label ?? `group-${groupIndex}`;
          const groupTitle = isKhmer ? group.labelKh || group.label : group.label;
          const GroupIcon = group.icon;

          // Case 1: Standalone items without a group label (e.g. Dashboard)
          if (!group.label) {
            return (
              <div key={groupKey} className="space-y-1">
                {group.items.map((item) => {
                  const isCurrent = isPathActive(item.href, allNavHrefs, pathname);
                  const itemTitle = isKhmer ? item.labelKh || item.label : item.label;
                  const ItemIcon = item.icon;

                  return (
                    <Link
                      className={cn(
                        'group relative flex items-center rounded-lg text-sm font-medium transition-all duration-200',
                        isCollapsed ? 'mx-auto h-10 w-10 justify-center p-0' : 'h-10 gap-3 px-3',
                        isCurrent
                          ? 'bg-[#00509d] font-semibold text-white shadow-sm'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white',
                      )}
                      href={item.href}
                      key={item.href}
                      onClick={onClose}
                      title={isCollapsed ? itemTitle : undefined}
                    >
                      <ItemIcon
                        className={cn(
                          'shrink-0 transition-transform group-hover:scale-110',
                          isCollapsed ? 'size-5' : 'size-4',
                          isCurrent ? 'text-[#ffd60a]' : 'text-slate-400 group-hover:text-white',
                        )}
                      />
                      {!isCollapsed && <span className="truncate">{itemTitle}</span>}

                      {/* Active Indicator Pip for Collapsed State */}
                      {isCollapsed && isCurrent && (
                        <span className="absolute top-1/2 left-0 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#ffd60a]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          }

          // Case 2: Labeled Group with Submenus
          const isGroupActive = group.items.some((item) =>
            isPathActive(item.href, allNavHrefs, pathname),
          );
          const isOpen = openGroups[groupKey] ?? isGroupActive;

          // Collapsed Icon-only view: single icon button with indicator
          if (isCollapsed) {
            return (
              <div key={groupKey} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => handleCollapsedGroupClick(groupKey)}
                  title={`${groupTitle} (${group.items.length})`}
                  className={cn(
                    'group relative flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200',
                    isGroupActive
                      ? 'bg-[#00509d] font-semibold text-white shadow-sm'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white',
                  )}
                >
                  {GroupIcon && (
                    <GroupIcon
                      className={cn(
                        'size-5 shrink-0 transition-transform group-hover:scale-110',
                        isGroupActive ? 'text-[#ffd60a]' : 'text-slate-400 group-hover:text-white',
                      )}
                    />
                  )}
                  {isGroupActive && (
                    <span className="absolute top-1/2 left-0 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#ffd60a]" />
                  )}
                </button>
              </div>
            );
          }

          // Full-width view: Collapsible Submenu Panel
          return (
            <div key={groupKey} className="space-y-1">
              {/* Submenu Header / Trigger Button */}
              <button
                type="button"
                aria-controls={`submenu-${groupKey}`}
                aria-expanded={isOpen}
                onClick={() => toggleGroup(groupKey)}
                className={cn(
                  'group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                  isGroupActive
                    ? 'bg-slate-900/90 font-semibold text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white',
                )}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  {GroupIcon && (
                    <GroupIcon
                      className={cn(
                        'size-4 shrink-0 transition-transform group-hover:scale-105',
                        isGroupActive
                          ? 'text-[#ffd60a]'
                          : 'text-slate-400 group-hover:text-slate-200',
                      )}
                    />
                  )}
                  <span className="truncate text-left text-sm leading-5">{groupTitle}</span>
                </div>

                <div className="ml-2 flex shrink-0 items-center gap-1.5">
                  {/* Active dot when collapsed */}
                  {isGroupActive && !isOpen && (
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-[#ffd60a]"
                      title="Active section"
                    />
                  )}
                  <ChevronDown
                    className={cn(
                      'size-4 text-slate-400 transition-transform duration-200 ease-in-out',
                      isOpen ? 'rotate-0 text-slate-200' : '-rotate-90 text-slate-500',
                    )}
                  />
                </div>
              </button>

              {/* Submenu Child Links */}
              {isOpen && (
                <div
                  id={`submenu-${groupKey}`}
                  className="relative mt-1 ml-4 space-y-1 border-l border-slate-800/80 pl-2.5 transition-all duration-200"
                >
                  {group.items.map((item) => {
                    const isCurrent = isPathActive(item.href, allNavHrefs, pathname);
                    const itemTitle = isKhmer ? item.labelKh || item.label : item.label;
                    const ItemIcon = item.icon;

                    return (
                      <Link
                        className={cn(
                          'group flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs leading-5 font-medium transition-all duration-150',
                          isCurrent
                            ? 'bg-[#00509d] font-semibold text-white shadow-sm'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white',
                        )}
                        href={item.href}
                        key={item.href}
                        onClick={onClose}
                      >
                        <ItemIcon
                          className={cn(
                            'size-3.5 shrink-0 transition-transform group-hover:scale-105',
                            isCurrent ? 'text-[#ffd60a]' : 'text-slate-400 group-hover:text-white',
                          )}
                        />
                        <span className="truncate">{itemTitle}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer with Single Collapse / Expand Button at the bottom */}
      {!isMobileDrawer && (
        <div
          className={cn(
            'border-t border-slate-800 transition-all duration-300',
            isCollapsed ? 'px-2 py-3' : 'px-4 py-3',
          )}
        >
          {isCollapsed ? (
            <div className="flex justify-center">
              <Button
                aria-label={isKhmer ? 'ពង្រីក Sidebar' : 'Expand sidebar'}
                className="size-10 rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                onClick={toggleCollapse}
                size="icon"
                title={isKhmer ? 'ពង្រីក Sidebar (Expand)' : 'Expand sidebar'}
                type="button"
                variant="ghost"
              >
                <PanelLeftOpen className="size-4 text-emerald-400" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span className="font-medium text-slate-400">Advanced Academic · V1.2</span>
              </div>
              <Button
                aria-label={isKhmer ? 'បង្រួម Sidebar' : 'Collapse sidebar'}
                className="size-8 rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                onClick={toggleCollapse}
                size="icon"
                title={isKhmer ? 'បង្រួម Sidebar (Collapse)' : 'Collapse sidebar'}
                type="button"
                variant="ghost"
              >
                <PanelLeftClose className="size-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
