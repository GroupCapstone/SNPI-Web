'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type DocsTab = 'openapi' | 'library' | 'release';

interface DocsNavContextValue {
  activeTab: DocsTab;
  setActiveTab: (tab: DocsTab, updateHistory?: boolean) => void;
}

const DocsNavContext = React.createContext<DocsNavContextValue | undefined>(undefined);

export function DocsNavProvider({
  children,
  defaultTab,
}: {
  children: React.ReactNode;
  defaultTab?: DocsTab;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLibraryPath =
    pathname?.startsWith('/document/design-system') ||
    pathname === '/design-system' ||
    pathname === '/ui-library';
  const isChangelogPath =
    pathname?.startsWith('/document/changelog') ||
    pathname === '/changelog' ||
    pathname?.startsWith('/document/design') ||
    pathname === '/design';
  const pathDerivedTab: DocsTab = isLibraryPath
    ? 'library'
    : isChangelogPath
      ? 'release'
      : 'openapi';

  const [activeTab, setActiveTabState] = React.useState<DocsTab>(defaultTab || pathDerivedTab);

  React.useEffect(() => {
    setActiveTabState(pathDerivedTab);
  }, [pathDerivedTab]);

  React.useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const p = window.location.pathname;
        const isLib =
          p.startsWith('/document/design-system') || p === '/design-system' || p === '/ui-library';
        const isChange =
          p.startsWith('/document/changelog') ||
          p === '/changelog' ||
          p.startsWith('/document/design') ||
          p === '/design';
        setActiveTabState(isLib ? 'library' : isChange ? 'release' : 'openapi');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setActiveTab = React.useCallback(
    (tab: DocsTab, updateHistory = true) => {
      setActiveTabState(tab);
      if (updateHistory) {
        const isDocsSubdomain =
          typeof window !== 'undefined' && window.location.host.startsWith('docs.snpi.edu.kh');
        const targetPath = isDocsSubdomain
          ? tab === 'library'
            ? '/design-system'
            : tab === 'release'
              ? '/changelog'
              : '/'
          : tab === 'library'
            ? '/document/design-system'
            : tab === 'release'
              ? '/document/design'
              : '/document';
        if (pathname !== targetPath) {
          router.push(targetPath);
        }
      }
    },
    [pathname, router],
  );

  const value = React.useMemo(() => ({ activeTab, setActiveTab }), [activeTab, setActiveTab]);

  return <DocsNavContext.Provider value={value}>{children}</DocsNavContext.Provider>;
}

export function useDocsNav(): DocsNavContextValue {
  const ctx = React.useContext(DocsNavContext);
  if (!ctx) {
    return {
      activeTab: 'openapi',
      setActiveTab: () => {},
    };
  }
  return ctx;
}
