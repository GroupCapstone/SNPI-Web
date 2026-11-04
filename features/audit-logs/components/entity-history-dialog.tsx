'use client';

import * as React from 'react';
import { Code2, FileClock, History, RefreshCw, User as UserIcon } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

import { useEntityHistoryQuery } from '../hooks/use-entity-history';
import type { AuditAction } from '../types';

export interface EntityHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entityType: string;
  entityId?: string;
  entityTitle?: string;
}

export const EntityHistoryDialog: React.FC<EntityHistoryDialogProps> = ({
  open,
  onOpenChange,
  entityType,
  entityId,
  entityTitle,
}) => {
  const { isKhmer } = useTranslation();
  const [selectedLogId, setSelectedLogId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<'diff' | 'raw'>('diff');

  const { data, isLoading, isError, refetch } = useEntityHistoryQuery({
    entityType,
    entityId,
    limit: 100,
    enabled: open && Boolean(entityId),
  });

  const logs = React.useMemo(() => data?.data ?? [], [data?.data]);

  // Set the first log as selected by default when logs load
  React.useEffect(() => {
    if (logs.length > 0 && (!selectedLogId || !logs.some((l) => l._id === selectedLogId))) {
      setSelectedLogId(logs[0]._id);
    }
  }, [logs, selectedLogId]);

  const selectedLog = React.useMemo(
    () => logs.find((l) => l._id === selectedLogId) || logs[0] || null,
    [logs, selectedLogId],
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
        prev === undefined ? '-' : typeof prev === 'object' ? JSON.stringify(prev) : String(prev);
      const currStr =
        curr === undefined ? '-' : typeof curr === 'object' ? JSON.stringify(curr) : String(curr);
      const isChanged = prevStr !== currStr;
      return { key, prevStr, currStr, isChanged };
    });
  }, [selectedLog]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl lg:max-w-5xl" onClose={() => onOpenChange(false)}>
        <DialogHeader className="border-b border-slate-100 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <History className="size-5.5 shrink-0 text-[#023e8a]" />
              <div>
                <DialogTitle className="text-base font-semibold text-slate-900">
                  {isKhmer
                    ? 'ប្រវត្តិនៃការផ្លាស់ប្តូរ និងសវនកម្ម'
                    : 'Entity Change History & Audit Trail'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  {entityType}
                  {entityTitle ? ` - ${entityTitle}` : ''}{' '}
                  <span className="font-mono text-xs text-slate-400">({entityId})</span>
                </DialogDescription>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
              className="h-8 gap-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              <RefreshCw className={cn('size-3.5', isLoading && 'animate-spin')} />
              <span>{isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}</span>
            </Button>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <RefreshCw className="size-7 animate-spin text-[#00509d]" />
            <p className="mt-3 text-xs font-medium text-slate-600">
              {isKhmer ? 'កំពុងទាញយកប្រវត្តិ...' : 'Loading history records...'}
            </p>
          </div>
        ) : isError ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50/50 p-6 text-center">
            <p className="text-xs font-medium text-rose-800">
              {isKhmer
                ? 'មានបញ្ហាក្នុងការទាញយកប្រវត្តិ សូមព្យាយាមម្តងទៀត'
                : 'Failed to retrieve entity history. Please try again.'}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="mt-3 h-8 text-xs"
            >
              {isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry'}
            </Button>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <FileClock className="size-10 text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-800">
              {isKhmer ? 'មិនមានប្រវត្តិផ្លាស់ប្តូរ' : 'No History Recorded'}
            </p>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              {isKhmer
                ? 'មិនទាន់មានកំណត់ត្រាការកែប្រែ ឬប្រតិបត្តិការសវនកម្មសម្រាប់ទិន្នន័យនេះនៅឡើយទេ។'
                : 'No modifications or audit events have been logged for this entity yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-12">
            {/* Timeline Sidebar (Left) */}
            <div className="max-h-[460px] overflow-y-auto pr-1 md:col-span-5">
              <div className="relative ml-3 space-y-3 border-l border-slate-200 pb-2">
                {logs.map((log) => {
                  const isSelected = log._id === selectedLog?._id;
                  const dateObj = new Date(log.timestamp);
                  const formattedDate = dateObj.toLocaleDateString();
                  const formattedTime = dateObj.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={log._id}
                      onClick={() => setSelectedLogId(log._id)}
                      className={cn(
                        'relative ml-4 cursor-pointer rounded-lg border p-3 transition-all',
                        isSelected
                          ? 'border-[#00509d] bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60',
                      )}
                    >
                      {/* Timeline dot */}
                      <span
                        className={cn(
                          'absolute top-4 -left-[23px] size-2.5 rounded-full border-2 border-white',
                          isSelected ? 'bg-[#00509d] ring-2 ring-blue-200' : 'bg-slate-400',
                        )}
                      />

                      <div className="flex items-center justify-between gap-1">
                        <Badge
                          tone={getActionTone(log.action)}
                          className="px-2 py-0.5 text-xs font-medium"
                        >
                          {log.action}
                        </Badge>
                        <span className="text-xs text-slate-400">
                          {formattedDate} {formattedTime}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-800">
                        <UserIcon className="size-3 text-slate-400" />
                        <span className="truncate">
                          {log.user?.username ||
                            (log.userId ? String(log.userId).substring(0, 10) : 'System')}
                        </span>
                      </div>

                      {log.reason && (
                        <p className="mt-1 line-clamp-2 text-xs text-slate-500">{log.reason}</p>
                      )}

                      {log.changedFields && log.changedFields.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {log.changedFields.slice(0, 3).map((field) => (
                            <span
                              key={field}
                              className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-600"
                            >
                              {field}
                            </span>
                          ))}
                          {log.changedFields.length > 3 && (
                            <span className="text-xs text-slate-400">
                              +{log.changedFields.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Detail & Inspector (Right) */}
            <div className="max-h-[460px] overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/40 p-3.5 text-xs md:col-span-7">
              {selectedLog ? (
                <div className="space-y-3.5">
                  {/* Metadata banner */}
                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-3">
                    <div>
                      <span className="text-xs text-slate-400">
                        {isKhmer ? 'សកម្មភាព' : 'Action'}:
                      </span>
                      <div className="mt-0.5">
                        <Badge tone={getActionTone(selectedLog.action)}>{selectedLog.action}</Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">
                        {isKhmer ? 'កាលបរិច្ឆេទ' : 'Recorded At'}:
                      </span>
                      <p className="mt-0.5 text-xs font-medium text-slate-800">
                        {new Date(selectedLog.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">
                        {isKhmer ? 'អ្នកអនុវត្ត' : 'Actor'}:
                      </span>
                      <p className="mt-0.5 truncate text-xs font-semibold text-slate-800">
                        {selectedLog.user ? (
                          <>
                            {selectedLog.user.username}
                            <span className="block text-xs text-slate-400">
                              {selectedLog.user.email}
                            </span>
                          </>
                        ) : (
                          'System / Automated'
                        )}
                      </p>
                    </div>
                  </div>

                  {selectedLog.reason && (
                    <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-2.5 text-xs text-blue-900">
                      <span className="font-semibold text-[#00509d]">
                        {isKhmer ? 'មូលហេតុ / កំណត់ចំណាំ:' : 'Reason / Note:'}{' '}
                      </span>
                      <span>{selectedLog.reason}</span>
                    </div>
                  )}

                  {/* Mode switcher */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-semibold text-slate-800">
                      {isKhmer ? 'ការវិភាគលើការកែប្រែទិន្នន័យ' : 'State Transition Details'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant={viewMode === 'diff' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('diff')}
                        className="h-7 px-2.5 text-xs"
                      >
                        {isKhmer ? 'ប្រៀបធៀបលម្អិត' : 'Property Diff'}
                      </Button>
                      <Button
                        variant={viewMode === 'raw' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('raw')}
                        className="h-7 px-2.5 text-xs"
                      >
                        <Code2 className="mr-1 size-3.5" />
                        JSON
                      </Button>
                    </div>
                  </div>

                  {/* Diff Table or Raw JSON */}
                  {viewMode === 'diff' ? (
                    diffItems.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white">
                        <table className="w-full text-left text-xs">
                          <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-600">
                            <tr>
                              <th className="px-2.5 py-1.5">{isKhmer ? 'វាលទិន្នន័យ' : 'Field'}</th>
                              <th className="px-2.5 py-1.5">
                                {isKhmer ? 'តម្លៃមុន' : 'Previous Value'}
                              </th>
                              <th className="px-2.5 py-1.5">
                                {isKhmer ? 'តម្លៃថ្មី' : 'New Value'}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-mono">
                            {diffItems.map((item) => (
                              <tr
                                key={item.key}
                                className={
                                  item.isChanged
                                    ? 'bg-amber-50/40 font-medium text-slate-900'
                                    : 'text-slate-600'
                                }
                              >
                                <td className="px-2.5 py-1.5 font-semibold text-slate-700">
                                  {item.key}
                                </td>
                                <td
                                  className={cn(
                                    'max-w-[140px] px-2.5 py-1.5 break-all text-slate-500',
                                    item.isChanged && 'bg-rose-50/70 text-rose-700',
                                  )}
                                >
                                  {item.prevStr}
                                </td>
                                <td
                                  className={cn(
                                    'max-w-[140px] px-2.5 py-1.5 break-all text-slate-700',
                                    item.isChanged &&
                                      'bg-emerald-50/70 font-semibold text-emerald-800',
                                  )}
                                >
                                  {item.currStr}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
                        {isKhmer
                          ? 'មិនមានព័ត៌មានលម្អិតអំពីការប្រៀបធៀបទិន្នន័យទេ'
                          : 'No field-level diff available for this entry.'}
                      </div>
                    )
                  ) : (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div>
                        <span className="text-xs font-semibold text-slate-700">
                          {isKhmer ? 'ទិន្នន័យមុន (Old Value)' : 'Old State'}
                        </span>
                        <pre className="mt-1 max-h-56 overflow-auto rounded-lg border border-slate-200 bg-white p-2 font-mono text-xs text-slate-700">
                          {selectedLog.oldValue
                            ? JSON.stringify(selectedLog.oldValue, null, 2)
                            : '// No previous value'}
                        </pre>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-700">
                          {isKhmer ? 'ទិន្នន័យថ្មី (New Value)' : 'New State'}
                        </span>
                        <pre className="mt-1 max-h-56 overflow-auto rounded-lg border border-slate-200 bg-white p-2 font-mono text-xs text-slate-700">
                          {selectedLog.newValue
                            ? JSON.stringify(selectedLog.newValue, null, 2)
                            : '// No new value'}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
