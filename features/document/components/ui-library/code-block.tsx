'use client';

import * as React from 'react';
import { PrettyCodeBlock } from './pretty-code-block';

export interface CodeBlockProps {
  code: string | Record<string, unknown> | Array<unknown>;
  language?: 'json' | 'xml' | 'javascript' | 'typescript' | 'bash';
  title?: string;
  statusBadge?: string;
  statusType?: 'success' | 'error' | 'warning' | 'info';
  showLineNumbers?: boolean;
  maxHeight?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'json',
  title,
  statusBadge,
  statusType = 'success',
  showLineNumbers = true,
  maxHeight = 'max-h-80',
  className,
}: CodeBlockProps) {
  const codeString = React.useMemo(() => {
    if (typeof code === 'string') return code;
    try {
      return JSON.stringify(code, null, 2);
    } catch {
      return String(code);
    }
  }, [code]);

  return (
    <PrettyCodeBlock
      code={codeString}
      language={language}
      title={title}
      statusBadge={statusBadge}
      statusType={statusType}
      showLineNumbers={showLineNumbers}
      maxHeight={maxHeight}
      className={className}
    />
  );
}
