'use client';

import * as React from 'react';
import { RailToc, type RailTocItem } from './rail-toc';

export interface TocHeadingItem {
  id: string;
  title: string;
  level?: 1 | 2 | 3;
}

export interface LineTrackerTocProps {
  items: TocHeadingItem[];
  activeId: string;
  onSelect: (id: string) => void;
  onActiveChange?: (id: string) => void;
  title?: string;
  className?: string;
}

/**
 * LineTrackerToc component for document and API portal URLs.
 * Powered by RailToc with flying paper plane along an indented rail,
 * solid passed line, and dashed future track.
 */
export function LineTrackerToc({
  items,
  activeId,
  onSelect,
  onActiveChange,
  title = 'On this page',
  className,
}: LineTrackerTocProps) {
  const railItems = React.useMemo<RailTocItem[]>(() => {
    return items.map((it) => ({
      id: it.id,
      label: it.title,
      depth: it.level ? Math.max(0, it.level - 1) : 0,
    }));
  }, [items]);

  return (
    <div className={className}>
      <RailToc
        items={railItems}
        activeId={activeId}
        onSelect={(id) => {
          onSelect(id);
          onActiveChange?.(id);
        }}
        title={title}
      />
    </div>
  );
}
