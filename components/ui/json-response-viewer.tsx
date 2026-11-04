'use client';

import * as React from 'react';
import { Check, Copy, Download, Code } from '@/components/icons';

interface JsonResponseViewerProps {
  data: unknown;
  url?: string;
  statusCode?: number;
  durationMs?: number;
  title?: string;
  className?: string;
}

// Tokenize and format JSON with GitHub-style light-theme syntax colors
function renderSyntaxHighlightedJson(value: unknown): React.ReactNode {
  const jsonString = JSON.stringify(value, null, 2);
  if (!jsonString) return null;

  const lines = jsonString.split('\n');

  return (
    <div className="font-mono text-xs leading-5">
      {lines.map((line, lineIdx) => {
        // Match key-value pairs or single tokens
        // Regex for JSON tokens: strings (key or value), numbers, booleans, null
        const tokens: React.ReactNode[] = [];
        let remaining = line;
        let tokenKey = 0;

        // Extract leading whitespace for indentation
        const indentMatch = remaining.match(/^(\s+)/);
        if (indentMatch) {
          tokens.push(<span key={tokenKey++}>{indentMatch[1]}</span>);
          remaining = remaining.slice(indentMatch[1].length);
        }

        // Tokenize remainder of the line
        const regex =
          /("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(true|false)|(null)|([{}[\],:])/g;

        let match: RegExpExecArray | null;
        let lastIndex = 0;

        while ((match = regex.exec(remaining)) !== null) {
          if (match.index > lastIndex) {
            tokens.push(
              <span key={tokenKey++} className="text-slate-700">
                {remaining.slice(lastIndex, match.index)}
              </span>,
            );
          }

          const [, str, colon, num, bool, nll, punct] = match;

          if (str) {
            if (colon) {
              // Object Key: GitHub Light blue-slate
              tokens.push(
                <span key={tokenKey++} className="font-semibold text-[#0969da]">
                  {str}
                </span>,
              );
              tokens.push(
                <span key={tokenKey++} className="text-slate-600">
                  {colon}
                </span>,
              );
            } else {
              // String Value: GitHub Light green
              tokens.push(
                <span key={tokenKey++} className="text-[#0a3069]">
                  {str}
                </span>,
              );
            }
          } else if (num) {
            // Number: GitHub orange/brown
            tokens.push(
              <span key={tokenKey++} className="font-medium text-[#953800]">
                {num}
              </span>,
            );
          } else if (bool) {
            // Boolean: GitHub purple
            tokens.push(
              <span key={tokenKey++} className="font-semibold text-[#8250df]">
                {bool}
              </span>,
            );
          } else if (nll) {
            // Null: GitHub purple
            tokens.push(
              <span key={tokenKey++} className="font-semibold text-[#cf222e]">
                {nll}
              </span>,
            );
          } else if (punct) {
            // Punctuation: slate
            tokens.push(
              <span key={tokenKey++} className="text-slate-500">
                {punct}
              </span>,
            );
          }

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < remaining.length) {
          tokens.push(
            <span key={tokenKey++} className="text-slate-700">
              {remaining.slice(lastIndex)}
            </span>,
          );
        }

        return (
          <div key={lineIdx} className="table-row hover:bg-slate-50">
            <span className="table-cell pr-4 text-right text-slate-400 select-none">
              {lineIdx + 1}
            </span>
            <span className="table-cell whitespace-pre">{tokens}</span>
          </div>
        );
      })}
    </div>
  );
}

export function JsonResponseViewer({
  data,
  url,
  statusCode = 200,
  durationMs,
  title = 'REST API Response',
  className = '',
}: JsonResponseViewerProps) {
  const [copied, setCopied] = React.useState(false);

  const jsonString = React.useMemo(() => JSON.stringify(data, null, 2), [data]);
  const payloadSizeKb = React.useMemo(
    () => (new Blob([jsonString]).size / 1024).toFixed(2),
    [jsonString],
  );

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }, [jsonString]);

  const handleDownload = React.useCallback(() => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `api-response-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(blobUrl);
  }, [jsonString]);

  return (
    <div
      className={`overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs ${className}`}
    >
      {/* GitHub-Inspired API Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
            <Code className="size-3.5 text-[#0969da]" />
            <span>{title}</span>
          </div>

          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
              statusCode >= 200 && statusCode < 300
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border border-rose-200 bg-rose-50 text-rose-700'
            }`}
          >
            {statusCode} OK
          </span>

          {durationMs !== undefined && (
            <span className="text-xs text-slate-500">{durationMs} ms</span>
          )}

          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500">{payloadSizeKb} KB</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Copy Raw JSON"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-slate-500" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Download JSON"
          >
            <Download className="size-3.5 text-slate-500" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {url && (
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/40 px-4 py-1.5 font-mono text-[11px] text-slate-600">
          <span className="font-semibold text-emerald-700">GET</span>
          <span className="truncate">{url}</span>
        </div>
      )}

      {/* Formatted Code Canvas */}
      <div className="overflow-x-auto bg-white p-4 select-text">
        <div className="table w-full">{renderSyntaxHighlightedJson(data)}</div>
      </div>
    </div>
  );
}
