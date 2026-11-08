'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check } from '@/components/icons';

export interface ApiSpecTableProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  name: string;
  description: string;
  authRequirement?: string;
  className?: string;
}

export function ApiSpecTable({
  method,
  endpoint,
  name,
  description,
  authRequirement = 'Institutional Authorization (Bearer Token)',
  className,
}: ApiSpecTableProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEndpoint = async () => {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(endpoint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const methodBadgeClass =
    method === 'GET'
      ? 'bg-[#0056FF] text-white'
      : method === 'POST'
        ? 'bg-emerald-600 text-white'
        : method === 'DELETE'
          ? 'bg-rose-600 text-white'
          : 'bg-amber-600 text-white';

  const isPublic =
    authRequirement.toLowerCase().includes('public') ||
    authRequirement.toLowerCase().includes('exempt');

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-[#CAD3F5] bg-[#FFFFFF] shadow-2xs',
        className,
      )}
    >
      <div className="border-b border-[#CAD3F5] bg-[#EFF5FF] px-4 py-2.5">
        <span className="font-mono text-[11px] font-black tracking-widest text-[#0056FF] uppercase">
          Specification Summary
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <tbody>
            <tr className="border-b border-[#CAD3F5]/60 hover:bg-[#EFF5FF]/40">
              <td className="w-40 bg-[#EFF5FF]/50 px-4 py-3 font-semibold text-[#020617]">
                Method
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    'inline-flex items-center rounded-[2px] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider',
                    methodBadgeClass,
                  )}
                  style={{ borderRadius: '2px' }}
                >
                  [{method}]
                </span>
              </td>
            </tr>

            <tr className="border-b border-[#CAD3F5]/60 hover:bg-[#EFF5FF]/40">
              <td className="w-40 bg-[#EFF5FF]/50 px-4 py-3 font-semibold text-[#020617]">Name</td>
              <td className="px-4 py-3 font-bold text-[#020617]">{name}</td>
            </tr>

            <tr className="border-b border-[#CAD3F5]/60 hover:bg-[#EFF5FF]/40">
              <td className="w-40 bg-[#EFF5FF]/50 px-4 py-3 font-semibold text-[#020617]">
                Endpoint
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <code
                    className="rounded-[2px] bg-[#E3E7FC] px-2 py-1 font-mono text-[11px] font-bold text-[#0056FF]"
                    style={{ borderRadius: '2px' }}
                  >
                    {endpoint}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyEndpoint}
                    className="inline-flex items-center gap-1 rounded-[2px] border border-[#CAD3F5] bg-white px-2 py-0.5 font-mono text-[10px] text-slate-600 transition-colors hover:border-[#0056FF] hover:text-[#0056FF]"
                    style={{ borderRadius: '2px' }}
                    title="Copy Endpoint"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </td>
            </tr>

            <tr className="border-b border-[#CAD3F5]/60 hover:bg-[#EFF5FF]/40">
              <td className="w-40 bg-[#EFF5FF]/50 px-4 py-3 font-semibold text-[#020617]">
                Description
              </td>
              <td className="px-4 py-3 text-slate-700">{description}</td>
            </tr>

            <tr className="hover:bg-[#EFF5FF]/40">
              <td className="w-40 bg-[#EFF5FF]/50 px-4 py-3 font-semibold text-[#020617]">
                Authentication
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    'inline-flex items-center rounded-[2px] px-2 py-0.5 font-mono text-[10px] font-bold',
                    isPublic
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
                      : 'border border-[#CAD3F5] bg-[#E3E7FC] text-[#0056FF]',
                  )}
                  style={{ borderRadius: '2px' }}
                >
                  {isPublic ? '[PUBLIC]' : '[PROTECTED]'} {authRequirement}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
