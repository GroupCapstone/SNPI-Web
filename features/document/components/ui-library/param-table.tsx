'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ApiParameter {
  parameter: string;
  type: string;
  mandatory: boolean | number | 'required' | 'optional' | string;
  description: string;
}

export interface ParamTableProps {
  title?: string;
  parameters: ApiParameter[];
  emptyMessage?: string;
  className?: string;
}

export function ParamTable({
  title,
  parameters,
  emptyMessage = 'No parameters required for this operation.',
  className,
}: ParamTableProps) {
  const isRequired = (mandatory: ApiParameter['mandatory']): boolean => {
    if (typeof mandatory === 'boolean') return mandatory;
    if (typeof mandatory === 'number') return mandatory === 1;
    if (typeof mandatory === 'string') {
      const lower = mandatory.toLowerCase().trim();
      return lower === '1' || lower === 'required' || lower === 'mandatory' || lower === 'true';
    }
    return false;
  };

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-[#CAD3F5] bg-[#FFFFFF] shadow-2xs',
        className,
      )}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-[#CAD3F5] bg-[#EFF5FF] px-4 py-2.5">
          <span className="font-mono text-[11px] font-black tracking-widest text-[#0056FF] uppercase">
            {title}
          </span>
          <span className="font-mono text-[10px] font-bold text-slate-500">
            {parameters.length} {parameters.length === 1 ? 'Field' : 'Fields'}
          </span>
        </div>
      )}

      <div className="overflow-x-auto">
        {parameters.length === 0 ? (
          <div className="px-4 py-4 text-center text-xs text-slate-500">{emptyMessage}</div>
        ) : (
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#CAD3F5] bg-[#EFF5FF]/60 text-[11px] font-bold text-[#0A1A4A]">
                <th className="px-4 py-2.5">Parameter</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Mandatory</th>
                <th className="px-4 py-2.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CAD3F5]/60">
              {parameters.map((param, idx) => {
                const req = isRequired(param.mandatory);
                return (
                  <tr key={`${param.parameter}-${idx}`} className="hover:bg-[#EFF5FF]/40">
                    <td className="px-4 py-2.5 font-mono font-bold text-[#0A1A4A]">
                      {param.parameter}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className="rounded-[2px] bg-[#E3E7FC] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#0056FF]"
                        style={{ borderRadius: '2px' }}
                      >
                        {param.type}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-[2px] px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider',
                          req
                            ? 'border border-rose-200 bg-rose-50 text-rose-700'
                            : 'border border-slate-200 bg-slate-50 text-slate-600',
                        )}
                        style={{ borderRadius: '2px' }}
                      >
                        {req ? '[REQUIRED]' : '[OPTIONAL]'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-700">{param.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
