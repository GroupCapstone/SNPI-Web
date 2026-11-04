'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, CheckCircle2, RefreshCw } from '@/components/icons';

import { useAcademicContext } from '@/components/providers/academic-context-provider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/features/auth/context/auth-context';
import { useTranslation } from '@/lib/i18n';
import { useDashboardActionItemsQuery } from '../hooks/use-dashboard';
import type { ActionItemBase } from '../types';

type QueueFilter = 'all' | 'attendance' | 'scores' | 'debts' | 'approvals' | 'capacity';

export const ActionItemsQueue: React.FC = () => {
  const { language } = useTranslation();
  const { currentBranchId } = useAuth();
  const { selectedAcademicYearId } = useAcademicContext();
  const [activeTab, setActiveTab] = React.useState<QueueFilter>('all');

  const { data, isLoading, isError, refetch, isFetching } = useDashboardActionItemsQuery({
    branchId: currentBranchId !== 'all' ? currentBranchId : undefined,
    academicYearId: selectedAcademicYearId ?? undefined,
  });

  const response = data?.data;
  const summary = response?.summary;
  const queues = response?.queues;

  const isKhmer = language === 'kh';

  if (isLoading) {
    return (
      <section aria-label="Action Items" className="space-y-3">
        <Skeleton className="h-6 w-56" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !summary || !queues) {
    return (
      <section aria-label="Action Items" className="space-y-3">
        <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 text-sm text-rose-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="size-4 text-rose-600" />
              <span>
                {isKhmer
                  ? 'មិនអាចទាញយកទិន្នន័យកិច្ចការប្រតិបត្តិការបានទេ'
                  : 'Failed to load operational action items.'}
              </span>
            </div>
            <button
              onClick={() => refetch()}
              className="text-xs font-semibold text-rose-700 underline hover:text-rose-900"
            >
              {isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  const allItems: Array<ActionItemBase & { type: string; typeLabel: string }> = [
    ...queues.unmarkedAttendance.map((item) => ({
      ...item,
      type: 'attendance',
      typeLabel: isKhmer ? 'វត្តមានមិនទាន់ស្រង់' : 'Unmarked Attendance',
    })),
    ...queues.unsubmittedScores.map((item) => ({
      ...item,
      type: 'scores',
      typeLabel: isKhmer ? 'ពិន្ទុមិនទាន់បញ្ចូល' : 'Pending Scores',
    })),
    ...queues.overdueDebts.map((item) => ({
      ...item,
      type: 'debts',
      typeLabel: isKhmer ? 'បំណុលហួសកំណត់' : 'Overdue Debt',
    })),
    ...queues.pendingApprovals.map((item) => ({
      ...item,
      type: 'approvals',
      typeLabel: isKhmer ? 'រង់ចាំការអនុម័ត' : 'Pending Approval',
    })),
    ...queues.nearCapacityClasses.map((item) => ({
      ...item,
      type: 'capacity',
      typeLabel: isKhmer ? 'ថ្នាក់ជិតពេញ' : 'Capacity Alert',
    })),
  ];

  const filteredItems =
    activeTab === 'all' ? allItems : allItems.filter((i) => i.type === activeTab);

  const tabs: Array<{ id: QueueFilter; label: string; count: number }> = [
    { id: 'all', label: isKhmer ? 'ទាំងអស់' : 'All Action Items', count: summary.totalActionItems },
    {
      id: 'attendance',
      label: isKhmer ? 'វត្តមាន' : 'Attendance',
      count: summary.unmarkedAttendanceCount,
    },
    { id: 'scores', label: isKhmer ? 'ពិន្ទុ' : 'Scores', count: summary.unsubmittedScoresCount },
    { id: 'debts', label: isKhmer ? 'បំណុល' : 'Overdue Debts', count: summary.overdueDebtsCount },
    {
      id: 'approvals',
      label: isKhmer ? 'ការអនុម័ត' : 'Approvals',
      count: summary.pendingApprovalsCount,
    },
    {
      id: 'capacity',
      label: isKhmer ? 'ថ្នាក់ពេញ' : 'Capacity',
      count: summary.nearCapacityClassesCount,
    },
  ];

  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold text-slate-950">
                {isKhmer ? 'កិច្ចការប្រតិបត្តិការរង់ចាំដោះស្រាយ' : 'Operational Action Queues'}
              </CardTitle>
              <Badge tone={summary.totalActionItems > 0 ? 'warning' : 'success'}>
                {summary.totalActionItems} {isKhmer ? 'កិច្ចការ' : 'Pending'}
              </Badge>
            </div>
            <CardDescription className="mt-0.5 text-xs text-slate-500">
              {isKhmer
                ? 'តាមដានវត្តមានមិនទាន់ស្រង់ ពិន្ទុមិនទាន់បញ្ចូល បំណុលហួសកំណត់ និងការអនុម័ត'
                : 'Real-time task queues requiring staff action across branches and academic cycles.'}
            </CardDescription>
          </div>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex h-8 items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
            title={isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}
          >
            <RefreshCw className={`size-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>{isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}</span>
          </button>
        </div>

        {/* Tab filters */}
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#023e8a] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="size-10 text-emerald-600" />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {isKhmer ? 'គ្មានកិច្ចការរង់ចាំឡើយ' : 'All Clear - No Action Required'}
            </p>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              {isKhmer
                ? 'ជួរការងារទាំងអស់ត្រូវបានដោះស្រាយរួចរាល់ គ្មានទិន្នន័យឬសំណើរង់ចាំការដោះស្រាយបន្ទាន់ទេ។'
                : 'All operational queues are clear. No pending items require immediate attention in this view.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs transition hover:border-[#00509d]/40 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-500">{item.typeLabel}</span>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
                        item.severity === 'high'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {item.severity.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="mt-2 line-clamp-1 text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500">{item.subtitle}</p>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
                  {item.branchName ? (
                    <span className="line-clamp-1 text-xs text-slate-400">{item.branchName}</span>
                  ) : (
                    <span />
                  )}
                  <Link
                    href={item.actionUrl}
                    className="inline-flex items-center gap-1 font-semibold text-[#00509d] hover:underline"
                  >
                    <span>{isKhmer ? 'ដោះស្រាយ' : 'Resolve'}</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
