'use client';

import * as React from 'react';
import { useDocsNav, type DocsTab } from './docs-nav-context';
import { OpenApiView } from './open-api-view';
import { UiLibraryView } from './ui-library-view';
import { DesignSystemHomeView } from './design-system-home-view';

export interface DocsSpaShellProps {
  defaultTab?: DocsTab;
}

export function DocsSpaShell({ defaultTab }: DocsSpaShellProps) {
  const { activeTab, setActiveTab } = useDocsNav();

  // Sync defaultTab only on mount or when defaultTab changes
  React.useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab, false);
    }
  }, [defaultTab, setActiveTab]);

  return (
    <div className="w-full">
      <div className={activeTab === 'openapi' ? 'block' : 'hidden'}>
        <OpenApiView />
      </div>
      <div className={activeTab === 'library' ? 'block' : 'hidden'}>
        <UiLibraryView />
      </div>
      <div className={activeTab === 'release' ? 'block' : 'hidden'}>
        <DesignSystemHomeView />
      </div>
    </div>
  );
}
