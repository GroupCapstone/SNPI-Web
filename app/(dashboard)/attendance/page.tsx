'use client';

import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { AttendanceSheet } from '@/features/attendance/components/attendance-sheet';
import { MonthlyAttendanceMatrix } from '@/features/attendance/components/monthly-attendance-matrix';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { useTranslation } from '@/lib/i18n';

export default function AttendancePage() {
  const { t, isKhmer } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<'daily' | 'monthly'>('daily');

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'attendance.view.assigned_class',
        'attendance.view.own_branch',
        'attendance.view.all_branches',
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.attendance.title}
              </h1>
              <Badge tone="neutral">
                {isKhmer ? 'ប្រតិបត្តិការសិក្សា' : 'Academic Operations'}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-slate-500">{t.attendance.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab('daily')}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === 'daily'
                    ? 'bg-[#023e8a] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isKhmer ? 'កត់វត្តមានប្រចាំថ្ងៃ' : 'Daily Roll-Call'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('monthly')}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === 'monthly'
                    ? 'bg-[#023e8a] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isKhmer ? 'តារាងវត្តមានប្រចាំខែ (៣១ ថ្ងៃ)' : 'Monthly Matrix (31-Day)'}
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'daily' ? <AttendanceSheet /> : <MonthlyAttendanceMatrix />}
      </div>
    </PermissionGuard>
  );
}
