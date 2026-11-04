'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Eye, FileClock, FilterX, Globe, RotateCcw, Search } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useTranslation } from '@/lib/i18n';

import { useAuditLogsQuery } from '../hooks/use-audit-logs';
import type { AuditAction, AuditLog, AuditLogFilters } from '../types';

export const AuditLogTable = () => {
  const { t, isKhmer } = useTranslation();
  const searchParams = useSearchParams();

  const initialUserId = searchParams.get('userId') || '';
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = React.useState<AuditLogFilters>({
    search: initialSearch,
    userId: initialUserId || undefined,
    module: '',
    action: undefined,
    branchId: undefined,
    startDate: undefined,
    endDate: undefined,
    page: 1,
    limit: 15,
  });

  const [selectedLog, setSelectedLog] = React.useState<AuditLog | null>(null);
  const [viewMode, setViewMode] = React.useState<'diff' | 'raw'>('diff');

  const { data: branchesData } = useBranchesQuery({ limit: 100 });
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const { data, isLoading, isError, refetch } = useAuditLogsQuery(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, branchId: e.target.value || undefined, page: 1 }));
  };

  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, module: e.target.value || undefined, page: 1 }));
  };

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      action: (e.target.value as AuditAction) || undefined,
      page: 1,
    }));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, startDate: e.target.value || undefined, page: 1 }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, endDate: e.target.value || undefined, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      userId: undefined,
      module: '',
      action: undefined,
      branchId: undefined,
      startDate: undefined,
      endDate: undefined,
      page: 1,
      limit: 15,
    });
  };

  const hasActiveFilters = Boolean(
    filters.search ||
    filters.userId ||
    filters.module ||
    filters.action ||
    filters.branchId ||
    filters.startDate ||
    filters.endDate,
  );

  const getActionTone = (action: AuditAction) => {
    switch (action) {
      case 'CREATE':
      case 'ACTIVATE':
      case 'USER_ACTIVATED':
      case 'LOGIN_SUCCESS':
      case 'UNLOCK':
        return 'success';
      case 'UPDATE':
      case 'ROLE_ASSIGN':
      case 'ROLE_ASSIGNED':
      case 'ROLE_REMOVED':
      case 'PERMISSION_CHANGE':
      case 'BRANCH_ACCESS_CHANGED':
      case 'DEPARTMENT_ACCESS_CHANGED':
      case 'WORKFLOW_TRANSITION':
      case 'PASSWORD_RESET':
      case 'PASSWORD_CHANGED':
        return 'warning';
      case 'DELETE':
      case 'DEACTIVATE':
      case 'USER_DEACTIVATED':
      case 'LOGIN_FAILED':
      case 'RELOCK':
        return 'danger';
      case 'LOGIN':
      case 'LOGOUT':
      case 'ARCHIVE':
      case 'FINALIZE':
      default:
        return 'neutral';
    }
  };

  const diffItems = React.useMemo(() => {
    if (!selectedLog) return [];
    const oldObj = (selectedLog.oldValue || {}) as Record<string, unknown>;
    const newObj = (selectedLog.newValue || {}) as Record<string, unknown>;

    const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)])).filter(
      (k) => !['_id', '__v', 'updatedAt', 'tokenVersion'].includes(k),
    );

    return allKeys.map((key) => {
      const prev = oldObj[key];
      const curr = newObj[key];
      const prevStr =
        prev === undefined ? '—' : typeof prev === 'object' ? JSON.stringify(prev) : String(prev);
      const currStr =
        curr === undefined ? '—' : typeof curr === 'object' ? JSON.stringify(curr) : String(curr);
      const isChanged = prevStr !== currStr;
      return { key, prevStr, currStr, isChanged };
    });
  }, [selectedLog]);

  return (
    <div className="space-y-4">
      {/* Filters Header */}
      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              placeholder={
                isKhmer ? 'ស្វែងរកតាមហេតុផល ឬឈ្មោះអ្នកប្រើ...' : 'Search actor, reason, entity...'
              }
              value={filters.search ?? ''}
              onChange={handleSearchChange}
              className="h-9 pl-9 text-xs"
            />
          </div>

          {branches.length > 0 && (
            <Select
              value={filters.branchId ?? ''}
              onChange={handleBranchChange}
              className="h-9 text-xs"
            >
              <option value="">{isKhmer ? 'គ្រប់សាខាទាំងអស់' : 'All Campus Branches'}</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchNameEn} ({b.branchCode})
                </option>
              ))}
            </Select>
          )}

          <Select
            value={filters.module ?? ''}
            onChange={handleModuleChange}
            className="h-9 text-xs"
          >
            <option value="">{isKhmer ? 'គ្រប់ម៉ូឌុល' : 'All Modules'}</option>
            <option value="user">User Accounts & Auth</option>
            <option value="school">School & Identity</option>
            <option value="branch">Branch & Campus</option>
            <option value="department">Department</option>
            <option value="position">Position</option>
            <option value="employee">Employee / HR</option>
            <option value="student">Student & Profile</option>
            <option value="enrollment">Enrollment</option>
            <option value="class">Class & Section</option>
            <option value="attendance">Attendance</option>
            <option value="score">Assessment & Score</option>
            <option value="term_result">Term Result</option>
            <option value="tuition">Tuition Structure</option>
            <option value="payment">Billing & Payment</option>
            <option value="setting">System Settings</option>
            <option value="historical_correction">Historical Correction</option>
            <option value="rollover">Academic Rollover</option>
          </Select>

          <Select
            value={filters.action ?? ''}
            onChange={handleActionChange}
            className="h-9 text-xs"
          >
            <option value="">{isKhmer ? 'គ្រប់សកម្មភាព' : 'All Actions'}</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
            <option value="USER_ACTIVATED">USER_ACTIVATED</option>
            <option value="USER_DEACTIVATED">USER_DEACTIVATED</option>
            <option value="PASSWORD_RESET">PASSWORD_RESET</option>
            <option value="ROLE_ASSIGNED">ROLE_ASSIGNED</option>
            <option value="ROLE_REMOVED">ROLE_REMOVED</option>
            <option value="BRANCH_ACCESS_CHANGED">BRANCH_ACCESS_CHANGED</option>
            <option value="WORKFLOW_TRANSITION">WORKFLOW_TRANSITION</option>
            <option value="LOGIN_SUCCESS">LOGIN_SUCCESS</option>
            <option value="LOGIN_FAILED">LOGIN_FAILED</option>
            <option value="LOGOUT">LOGOUT</option>
          </Select>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-medium text-slate-500">
              {isKhmer ? 'ចន្លោះកាលបរិច្ឆេទ:' : 'Date Range:'}
            </span>
            <input
              type="date"
              value={filters.startDate ?? ''}
              onChange={handleStartDateChange}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
              title="Start Date"
            />
            <span className="text-slate-400">→</span>
            <input
              type="date"
              value={filters.endDate ?? ''}
              onChange={handleEndDateChange}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
              title="End Date"
            />

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="h-8 gap-1 text-slate-500 hover:text-rose-600"
              >
                <FilterX className="size-3.5" />
                <span>{isKhmer ? 'សម្អាតចម្រាញ់' : 'Clear Filters'}</span>
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="h-8 gap-1.5 self-end sm:self-auto"
          >
            <RotateCcw className="size-3.5" />
            <span>{isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh Ledger'}</span>
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <Card className="border border-slate-200 bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold whitespace-nowrap text-slate-600 uppercase">
                <tr>
                  <th className="min-w-[170px] px-4 py-3 whitespace-nowrap">
                    {t.auditLogs.timestamp}
                  </th>
                  <th className="min-w-[130px] px-4 py-3 whitespace-nowrap">
                    {t.auditLogs.module}
                  </th>
                  <th className="min-w-[110px] px-4 py-3 whitespace-nowrap">
                    {t.auditLogs.action}
                  </th>
                  <th className="min-w-[180px] px-4 py-3 whitespace-nowrap">
                    {t.auditLogs.entityType}
                  </th>
                  <th className="min-w-[180px] px-4 py-3 whitespace-nowrap">
                    {t.auditLogs.userId}
                  </th>
                  <th className="min-w-[140px] px-4 py-3 whitespace-nowrap">Campus Branch</th>
                  <th className="min-w-[180px] px-4 py-3 whitespace-nowrap">Reason / Summary</th>
                  <th className="w-20 px-4 py-3 text-right whitespace-nowrap">
                    {t.auditLogs.details}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="size-4 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
                        <span>
                          {isKhmer
                            ? 'កំពុងផ្ទុកកំណត់ត្រាសវនកម្ម...'
                            : 'Loading immutable audit ledger...'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-rose-500">
                      <p>Failed to load audit logs.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        className="mt-2"
                      >
                        Retry
                      </Button>
                    </td>
                  </tr>
                ) : !data?.data || data.data.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-12 text-center">
                      <FileClock className="mx-auto size-8 text-slate-300" />
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        {t.auditLogs.noLogsFound}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {isKhmer
                          ? 'រាល់ការកែប្រែ ការបង្កើត និងព្រឹត្តិការណ៍សុវត្ថិភាពនឹងបង្ហាញនៅទីនេះ។'
                          : 'System modifications, creations, and security events will stream here in real time.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  data.data.map((log) => {
                    const formattedDate = new Date(log.timestamp).toLocaleString();

                    return (
                      <tr key={log._id} className="transition-colors hover:bg-slate-50/50">
                        <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                          <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <Calendar className="size-3.5 shrink-0 text-slate-400" />
                            <span>{formattedDate}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-semibold text-slate-900 uppercase">
                            {log.module}
                          </span>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge tone={getActionTone(log.action)}>{log.action}</Badge>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-slate-700">
                          <span className="font-medium">{log.entityType}</span>
                          <span className="ml-1.5 font-mono text-xs text-slate-400">
                            ({String(log.entityId).substring(0, 10)}...)
                          </span>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-slate-700">
                          {log.user ? (
                            <div className="flex flex-col whitespace-nowrap">
                              <span className="font-semibold text-slate-900">
                                {log.user.username}
                              </span>
                              <span className="text-xs text-slate-400">{log.user.email}</span>
                            </div>
                          ) : log.userId ? (
                            <span className="font-mono text-xs text-slate-500">
                              {String(log.userId).substring(0, 12)}...
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                              <Globe className="size-3" />
                              System
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                          {log.branch ? (
                            <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-[#00509d]">
                              {log.branch.branchNameEn}
                            </span>
                          ) : log.branchId ? (
                            <span className="font-mono text-xs text-slate-400">
                              {String(log.branchId).substring(0, 8)}...
                            </span>
                          ) : (
                            <span className="text-slate-400">Organization-wide</span>
                          )}
                        </td>

                        <td className="max-w-[200px] truncate px-4 py-3 text-slate-600">
                          {log.reason ? (
                            <span title={log.reason}>{log.reason}</span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>

                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedLog(log)}
                            className="h-7 gap-1 text-slate-600 hover:text-slate-900"
                          >
                            <Eye className="size-3.5 text-slate-400" />
                            <span>{t.auditLogs.viewDetails}</span>
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
              <span>
                Showing {(data.pagination.page - 1) * data.pagination.limit + 1} to{' '}
                {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of{' '}
                {data.pagination.total} audit entries
              </span>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.pagination.page <= 1}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: Math.max(1, (prev.page ?? 1) - 1),
                    }))
                  }
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.pagination.page >= data.pagination.totalPages}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: (prev.page ?? 1) + 1,
                    }))
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Log Detail Dialog */}
      <Dialog open={Boolean(selectedLog)} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-w-3xl lg:max-w-4xl" onClose={() => setSelectedLog(null)}>
          <DialogHeader>
            <DialogTitle>Audit Entry Details & State Diff</DialogTitle>
            <DialogDescription>
              Captured state transition recorded at{' '}
              {selectedLog ? new Date(selectedLog.timestamp).toLocaleString() : ''}.
            </DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2.5 rounded-lg border border-slate-200 bg-slate-50/60 p-3 sm:grid-cols-4">
                <div>
                  <span className="text-slate-500">Module:</span>
                  <p className="font-semibold text-slate-800 uppercase">{selectedLog.module}</p>
                </div>
                <div>
                  <span className="text-slate-500">Action:</span>
                  <div className="mt-0.5">
                    <Badge tone={getActionTone(selectedLog.action)}>{selectedLog.action}</Badge>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Actor:</span>
                  <p className="font-semibold text-slate-800">
                    {selectedLog.user
                      ? selectedLog.user.username
                      : selectedLog.userId
                        ? String(selectedLog.userId)
                        : 'System'}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Entity:</span>
                  <p className="font-semibold text-slate-800">
                    {selectedLog.entityType} ({String(selectedLog.entityId).substring(0, 10)}...)
                  </p>
                </div>
              </div>

              {selectedLog.reason && (
                <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-2.5 text-xs text-blue-900">
                  <span className="font-semibold text-[#00509d]">Audit Reason: </span>
                  <span>{selectedLog.reason}</span>
                </div>
              )}

              {/* Diff View Switcher */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-semibold text-slate-800">State Change Inspector</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant={viewMode === 'diff' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('diff')}
                    className="h-7 text-xs"
                  >
                    Visual Property Diff
                  </Button>
                  <Button
                    variant={viewMode === 'raw' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('raw')}
                    className="h-7 text-xs"
                  >
                    Raw JSON Blocks
                  </Button>
                </div>
              </div>

              {viewMode === 'diff' ? (
                diffItems.length > 0 ? (
                  <div className="max-h-72 overflow-y-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-normal text-slate-600 uppercase">
                        <tr>
                          <th className="px-3 py-2">Field</th>
                          <th className="px-3 py-2">Previous Value</th>
                          <th className="px-3 py-2">New Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-xs">
                        {diffItems.map((item) => (
                          <tr
                            key={item.key}
                            className={
                              item.isChanged
                                ? 'bg-amber-50/40 font-medium text-slate-900'
                                : 'text-slate-600'
                            }
                          >
                            <td className="px-3 py-2 font-semibold text-slate-700">{item.key}</td>
                            <td
                              className={`max-w-xs px-3 py-2 break-all ${
                                item.isChanged ? 'bg-rose-50/60 text-rose-700' : ''
                              }`}
                            >
                              {item.prevStr}
                            </td>
                            <td
                              className={`max-w-xs px-3 py-2 break-all ${
                                item.isChanged ? 'bg-emerald-50/60 text-emerald-700' : ''
                              }`}
                            >
                              {item.currStr}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-slate-500">
                    No structured property diff recorded for this entry.
                  </div>
                )
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <span className="mb-1 block font-semibold text-slate-700">Previous State:</span>
                    <pre className="max-h-56 overflow-y-auto rounded-md border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-rose-300">
                      {selectedLog.oldValue
                        ? JSON.stringify(selectedLog.oldValue, null, 2)
                        : '(Empty / None)'}
                    </pre>
                  </div>
                  <div>
                    <span className="mb-1 block font-semibold text-slate-700">New State:</span>
                    <pre className="max-h-56 overflow-y-auto rounded-md border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-300">
                      {selectedLog.newValue
                        ? JSON.stringify(selectedLog.newValue, null, 2)
                        : '(Empty / None)'}
                    </pre>
                  </div>
                </div>
              )}

              {/* Forensic Details */}
              {(selectedLog.ipAddress || selectedLog.userAgent) && (
                <div className="flex flex-wrap items-center gap-4 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-500">
                  {selectedLog.ipAddress && (
                    <span>
                      <strong className="font-semibold text-slate-700">IP: </strong>
                      {selectedLog.ipAddress}
                    </span>
                  )}
                  {selectedLog.userAgent && (
                    <span className="max-w-md truncate">
                      <strong className="font-semibold text-slate-700">User Agent: </strong>
                      {selectedLog.userAgent}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
