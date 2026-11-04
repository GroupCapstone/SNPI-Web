'use client';

import * as React from 'react';

interface SidebarContextValue {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCollapse: () => void;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMobileOpen: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

const STORAGE_KEY = 'snp_sms_sidebar_collapsed';

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  // Restore collapse state on initial mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setIsCollapsed(stored === 'true');
      }
    } catch {
      // Ignore localStorage read errors in restricted contexts
    }
    setIsMounted(true);
  }, []);

  // Sync collapse state with localStorage
  const handleSetCollapsed: React.Dispatch<React.SetStateAction<boolean>> = React.useCallback(
    (action) => {
      setIsCollapsed((prev) => {
        const nextValue = typeof action === 'function' ? action(prev) : action;
        try {
          localStorage.setItem(STORAGE_KEY, String(nextValue));
        } catch {
          // Ignore localStorage write errors
        }
        return nextValue;
      });
    },
    [],
  );

  const toggleCollapse = React.useCallback(() => {
    handleSetCollapsed((prev) => !prev);
  }, [handleSetCollapsed]);

  const toggleMobileOpen = React.useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  // Prevent scroll when mobile drawer is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const value = React.useMemo(
    () => ({
      isCollapsed: isMounted ? isCollapsed : false,
      setIsCollapsed: handleSetCollapsed,
      toggleCollapse,
      mobileOpen,
      setMobileOpen,
      toggleMobileOpen,
    }),
    [isCollapsed, isMounted, handleSetCollapsed, toggleCollapse, mobileOpen, toggleMobileOpen],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export const useSidebar = (): SidebarContextValue => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
