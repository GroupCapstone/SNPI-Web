'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { AcademicContextProvider } from '../providers/academic-context-provider';
import { AppSidebar } from './app-sidebar';
import { SidebarProvider, useSidebar } from './sidebar-context';
import { Topbar } from './topbar';

interface DashboardShellProps {
  children: React.ReactNode;
}

const DashboardLayoutInner = ({ children }: DashboardShellProps) => {
  const { isCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Pinned Desktop Sidebar with dynamic collapsible width */}
      <AppSidebar className="fixed inset-y-0 left-0 z-30 hidden lg:flex" />

      {/* Off-canvas Mobile Drawer */}
      {mobileOpen && (
        <div className="animate-in fade-in fixed inset-0 z-40 flex duration-200 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            type="button"
          />
          <AppSidebar className="relative z-10" onClose={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main Responsive Content Container responding dynamically to sidebar collapse state */}
      <div
        className={cn(
          'min-w-0 flex-1 transition-[padding] duration-300 ease-in-out',
          isCollapsed ? 'lg:pl-[76px]' : 'lg:pl-[272px]',
        )}
      >
        <Topbar onOpenNavigation={() => setMobileOpen(true)} />
        <main className="mx-auto w-full max-w-[1500px] p-4 transition-all duration-300 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export const DashboardShell = ({ children }: DashboardShellProps) => {
  return (
    <AcademicContextProvider>
      <SidebarProvider>
        <DashboardLayoutInner>{children}</DashboardLayoutInner>
      </SidebarProvider>
    </AcademicContextProvider>
  );
};
