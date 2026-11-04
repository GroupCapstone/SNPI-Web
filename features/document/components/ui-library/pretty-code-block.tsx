'use client';

import * as React from 'react';
import { Check, Copy } from '@/components/icons';
import { cn } from '@/lib/utils';

interface PrettyCodeBlockProps {
  code: string;
  language?: 'json' | 'xml' | 'javascript' | 'typescript' | 'bash';
  title?: string;
  statusBadge?: string;
  statusType?: 'success' | 'error' | 'warning' | 'info';
  showLineNumbers?: boolean;
  maxHeight?: string;
  className?: string;
}

// ============================================================================
// TOKENIZERS FOR SYNTAX HIGHLIGHTING
// ============================================================================

function highlightJsonLine(line: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const regex =
    /("(?:\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|[{}\[\],:])/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(line.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.endsWith(':')) {
      const key = token.slice(0, -1);
      tokens.push(
        <span key={`${match.index}-key`} className="font-semibold text-[#38BDF8]">
          {key}
        </span>,
        <span key={`${match.index}-colon`} className="text-slate-400">
          :
        </span>,
      );
    } else if (token.startsWith('"')) {
      tokens.push(
        <span key={match.index} className="text-[#34D399]">
          {token}
        </span>,
      );
    } else if (token === 'true' || token === 'false') {
      tokens.push(
        <span key={match.index} className="font-semibold text-[#F472B6]">
          {token}
        </span>,
      );
    } else if (token === 'null') {
      tokens.push(
        <span key={match.index} className="font-semibold text-[#FB7185]">
          {token}
        </span>,
      );
    } else if (/^-?\d/.test(token)) {
      tokens.push(
        <span key={match.index} className="text-[#FBBF24]">
          {token}
        </span>,
      );
    } else {
      tokens.push(
        <span key={match.index} className="font-bold text-slate-400">
          {token}
        </span>,
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < line.length) {
    tokens.push(line.slice(lastIndex));
  }
  return tokens;
}

function highlightXmlLine(line: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const regex = /(<\/?[a-zA-Z0-9:-]+|\/?>|"[^"]*"|[a-zA-Z:-]+(?==))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(
        <span key={`${lastIndex}-text`} className="text-slate-300">
          {line.slice(lastIndex, match.index)}
        </span>,
      );
    }
    const token = match[0];
    if (token.startsWith('<') || token === '>' || token === '/>') {
      tokens.push(
        <span key={match.index} className="font-semibold text-[#38BDF8]">
          {token}
        </span>,
      );
    } else if (token.startsWith('"')) {
      tokens.push(
        <span key={match.index} className="text-[#34D399]">
          {token}
        </span>,
      );
    } else {
      tokens.push(
        <span key={match.index} className="text-[#FBBF24]">
          {token}
        </span>,
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < line.length) {
    tokens.push(
      <span key={`${lastIndex}-end`} className="text-slate-300">
        {line.slice(lastIndex)}
      </span>,
    );
  }
  return tokens;
}

function highlightGenericLine(line: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const regex =
    /\b(const|let|var|new|async|await|return|function|import|from|export|class|if|else)\b|'[^']*'|"[^"]*"|\b(console|JSON|EventSource|document|window)\b|\b\d+\b/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(line.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (
      /^(const|let|var|new|async|await|return|function|import|from|export|class|if|else)$/.test(
        token,
      )
    ) {
      tokens.push(
        <span key={match.index} className="font-semibold text-[#F472B6]">
          {token}
        </span>,
      );
    } else if (/^(console|JSON|EventSource|document|window)$/.test(token)) {
      tokens.push(
        <span key={match.index} className="font-semibold text-[#38BDF8]">
          {token}
        </span>,
      );
    } else if (token.startsWith("'") || token.startsWith('"')) {
      tokens.push(
        <span key={match.index} className="text-[#34D399]">
          {token}
        </span>,
      );
    } else if (/^\d+$/.test(token)) {
      tokens.push(
        <span key={match.index} className="text-[#FBBF24]">
          {token}
        </span>,
      );
    } else {
      tokens.push(token);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < line.length) {
    tokens.push(line.slice(lastIndex));
  }
  return tokens;
}

// ============================================================================
// MAIN COMPONENT: PRETTY CODE BLOCK
// ============================================================================

export function PrettyCodeBlock({
  code,
  language = 'json',
  title,
  statusBadge,
  statusType = 'success',
  showLineNumbers = true,
  maxHeight = 'max-h-72',
  className,
}: PrettyCodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (typeof window === 'undefined') return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch {
      // Fall through to textarea fallback
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.opacity = '0';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const lines = React.useMemo(() => code.split('\n'), [code]);

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0F172A] shadow-none transition-all',
        className,
      )}
    >
      {/* Top Cute Mac Window Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#1E293B]/70 px-4 py-2.5 backdrop-blur-xs">
        {/* Left: 3 Cute Mac Window Dots + Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#FF5F56] transition-opacity hover:opacity-80" />
            <span className="size-2.5 rounded-full bg-[#FFBD2E] transition-opacity hover:opacity-80" />
            <span className="size-2.5 rounded-full bg-[#27C93F] transition-opacity hover:opacity-80" />
          </div>
          {title && (
            <span className="font-mono text-[11px] font-medium text-slate-400">{title}</span>
          )}
        </div>

        {/* Right: Status Badge & Copy Button */}
        <div className="flex items-center gap-2">
          {statusBadge && (
            <span
              className={cn(
                'rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase',
                statusType === 'success' &&
                  'border border-emerald-500/30 bg-emerald-500/15 text-emerald-400',
                statusType === 'error' && 'border border-rose-500/30 bg-rose-500/15 text-rose-400',
                statusType === 'warning' &&
                  'border border-amber-500/30 bg-amber-500/15 text-amber-400',
                statusType === 'info' && 'border border-sky-500/30 bg-sky-500/15 text-sky-400',
              )}
            >
              {statusBadge}
            </span>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md border border-slate-700/80 bg-slate-800/80 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-300 transition-all hover:border-[#0056FF] hover:bg-[#0056FF] hover:text-white active:scale-95"
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area with Syntax Highlighting */}
      <div
        className={cn(
          'overflow-x-auto overflow-y-auto p-4 font-mono text-[12px] leading-relaxed',
          maxHeight,
        )}
      >
        <table className="w-full border-collapse font-mono">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="transition-colors hover:bg-slate-800/40">
                {showLineNumbers && (
                  <td className="w-10 pr-4 text-right font-mono text-[11px] text-slate-600 select-none">
                    {idx + 1}
                  </td>
                )}
                <td className="font-mono whitespace-pre text-slate-200">
                  {language === 'json'
                    ? highlightJsonLine(line)
                    : language === 'xml'
                      ? highlightXmlLine(line)
                      : highlightGenericLine(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
