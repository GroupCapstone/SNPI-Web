'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  BookOpenCheck,
  FileText,
  FileDown,
  FileSpreadsheet,
  GraduationCap,
  Printer,
  ReceiptText,
  UserCheck,
  Users,
} from '@/components/icons';

import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { exportVisibleReport } from '../utils/export-report';

export type ReportSection = 'hub' | 'students' | 'staff' | 'academic' | 'attendance' | 'finance';

interface ReportNavHeaderProps {
  activeSection: ReportSection;
}

export const ReportNavHeader = ({ activeSection }: ReportNavHeaderProps) => {
  const { isKhmer } = useTranslation();

  const sections: Array<{
    id: ReportSection;
    labelKh: string;
    labelEn: string;
    href: string;
    icon: typeof FileText;
  }> = [
    {
      id: 'hub',
      labelKh: 'ទិដ្ឋភាពទូទៅ (Hub)',
      labelEn: 'Executive Hub',
      href: '/reports',
      icon: FileText,
    },
    {
      id: 'students',
      labelKh: 'របាយការណ៍សិស្ស',
      labelEn: 'Student Reports',
      href: '/reports/students',
      icon: Users,
    },
    {
      id: 'staff',
      labelKh: 'របាយការណ៍បុគ្គលិក',
      labelEn: 'Staff Reports',
      href: '/reports/staff',
      icon: UserCheck,
    },
    {
      id: 'academic',
      labelKh: 'របាយការណ៍លទ្ធផលសិក្សា',
      labelEn: 'Academic Reports',
      href: '/reports/academic',
      icon: GraduationCap,
    },
    {
      id: 'attendance',
      labelKh: 'របាយការណ៍វត្តមាន',
      labelEn: 'Attendance Reports',
      href: '/reports/attendance',
      icon: BookOpenCheck,
    },
    {
      id: 'finance',
      labelKh: 'របាយការណ៍ហិរញ្ញវត្ថុ',
      labelEn: 'Financial Reports',
      href: '/reports/finance',
      icon: ReceiptText,
    },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-xs sm:flex-row sm:items-center sm:justify-between print:hidden">
      {/* Navigation Tabs */}
      <nav
        aria-label="Report domain navigation"
        className="no-scrollbar flex items-center gap-1.5 overflow-x-auto scroll-smooth py-0.5"
      >
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          const Icon = sec.icon;
          const label = isKhmer ? sec.labelKh : sec.labelEn;

          return (
            <Link key={sec.id} href={sec.href} className="shrink-0">
              <Button
                type="button"
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'h-9 rounded-xl px-3.5 text-xs font-semibold transition-all',
                  isActive
                    ? 'bg-[#00509d] text-white shadow-xs hover:bg-[#023e8a]'
                    : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900',
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="whitespace-nowrap">{label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Export & Print Actions */}
      <div className="flex shrink-0 items-center gap-1.5 self-end border-t border-slate-100 pt-2 sm:self-auto sm:border-0 sm:pt-0">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 rounded-xl border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          onClick={() => window.print()}
        >
          <Printer className="size-4 shrink-0 text-[#00509d]" />
          <span className="ml-1.5 hidden md:inline">PDF / Print</span>
          <span className="ml-1.5 md:hidden">Print</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 rounded-xl border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          onClick={async () => {
            try {
              await exportVisibleReport('xlsx', `snp-${activeSection}-report`);
            } catch (error) {
              toast.error(error instanceof Error ? error.message : 'Export failed');
            }
          }}
        >
          <FileSpreadsheet className="size-4 shrink-0 text-emerald-600" />
          <span className="ml-1.5">Excel</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 rounded-xl border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          onClick={async () => {
            try {
              await exportVisibleReport('csv', `snp-${activeSection}-report`);
            } catch (error) {
              toast.error(error instanceof Error ? error.message : 'Export failed');
            }
          }}
        >
          <FileDown className="size-4 shrink-0 text-[#00509d]" />
          <span className="ml-1.5">CSV</span>
        </Button>
      </div>
    </div>
  );
};
