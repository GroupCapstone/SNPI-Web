'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type DocsTab = 'openapi' | 'library' | 'release';

/** Document pages font switch: English fonts only. */
export type DocsFont =
  | 'sora'
  | 'inter'
  | 'google-sans'
  | 'mona-sans'
  | 'nunito'
  | 'tt-firs-neue'
  | 'nexa-light'
  | 'faculty-glyphic'
  | 'roboto-mono';

export const DOCS_FONTS: { id: DocsFont; label: string; family: string }[] = [
  { id: 'google-sans', label: 'Google Sans', family: "'GoogleSans'" },
  { id: 'inter', label: 'Inter', family: "'Inter'" },
  { id: 'sora', label: 'Sora', family: "'Sora'" },
  { id: 'mona-sans', label: 'Mona Sans', family: "'MonaSans'" },
  { id: 'nunito', label: 'Nunito', family: "'Nunito'" },
  { id: 'tt-firs-neue', label: 'TT Firs Neue', family: "'TTFirsNeue'" },
  { id: 'nexa-light', label: 'Nexa Light', family: "'NexaLight'" },
  { id: 'faculty-glyphic', label: 'Faculty Glyphic', family: "'FacultyGlyphic'" },
  { id: 'roboto-mono', label: 'Roboto Mono', family: "'RobotoMono'" },
];

interface DocsNavContextValue {
  activeTab: DocsTab;
  setActiveTab: (tab: DocsTab, updateHistory?: boolean) => void;
  font: DocsFont;
  setFont: (font: DocsFont) => void;
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

  const [font, setFontState] = React.useState<DocsFont>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('snpi-docs-font');
      if (saved && DOCS_FONTS.some((f) => f.id === saved)) return saved as DocsFont;
    }
    return 'google-sans';
  });

  const setFont = React.useCallback((next: DocsFont) => {
    setFontState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('snpi-docs-font', next);
    }
  }, []);

  // Apply the active font to the docs pages (document element survives
  // hydration, so the choice holds on first load and across pages).
  React.useEffect(() => {
    const active = DOCS_FONTS.find((f) => f.id === font) ?? DOCS_FONTS[0];
    document.documentElement.style.setProperty('--docs-font', active.family);
    document.documentElement.setAttribute('data-docs-font', font);
    const root = document.querySelector('.docs-root') as HTMLElement | null;
    if (root) {
      root.setAttribute('data-font', font);
      root.style.setProperty('--docs-font', active.family);
    }
  }, [font, pathname]);

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

  const value = React.useMemo(
    () => ({ activeTab, setActiveTab, font, setFont }),
    [activeTab, setActiveTab, font, setFont],
  );

  return <DocsNavContext.Provider value={value}>{children}</DocsNavContext.Provider>;
}

export function useDocsNav(): DocsNavContextValue {
  const ctx = React.useContext(DocsNavContext);
  if (!ctx) {
    return {
      activeTab: 'openapi',
      setActiveTab: () => {},
      font: 'inter',
      setFont: () => {},
    };
  }
  return ctx;
}
