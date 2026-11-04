'use client';

import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock, Users } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RolloverValidationSummary } from '../types';

interface RolloverConflictsCardProps {
  summary?: RolloverValidationSummary;
  className?: string;
}

export const RolloverConflictsCard: React.FC<RolloverConflictsCardProps> = ({
  summary,
  className,
}) => {
  if (!summary) return null;

  const hasBlockers = summary.blockingIssues.length > 0;
  const _hasWarnings = summary.warnings.length > 0 || summary.capacityWarnings.length > 0;
  const hasScheduleConflicts = summary.scheduleConflicts.length > 0;

  return (
    <div className={`space-y-4 ${className ?? ''}`}>
      {/* Overall Status Banner */}
      <div
        className={`flex items-center justify-between rounded-xl border p-4 ${
          summary.canExecute
            ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
            : 'border-rose-200 bg-rose-50/70 text-rose-900'
        }`}
      >
        <div className="flex items-center gap-3">
          {summary.canExecute ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          ) : (
            <AlertCircle className="h-6 w-6 text-rose-600" />
          )}
          <div>
            <h4 className="font-semibold">
              {summary.canExecute
                ? 'Pre-Rollover Checks Passed — Ready for Approval & Execution'
                : 'Blocking Issues Detected — Must Be Resolved Prior to Rollover'}
            </h4>
            <p className="text-xs text-slate-600">
              {summary.canExecute
                ? 'All mandatory requirements satisfied. Review any non-blocking warnings before proceeding.'
                : 'The system has detected constraints that prevent historical period sealing and target context generation.'}
            </p>
          </div>
        </div>
        <Badge
          className={summary.canExecute ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}
        >
          {summary.canExecute ? 'Ready' : 'Blocked'}
        </Badge>
      </div>

      {/* Blocking Issues */}
      {hasBlockers && (
        <Card className="border-rose-200 bg-rose-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-rose-800">
              <AlertCircle className="h-4 w-4" />
              Blocking Issues ({summary.blockingIssues.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            {summary.blockingIssues.map((issue, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between rounded-lg border border-rose-200 bg-white p-2.5 text-rose-950"
              >
                <span>{issue.message}</span>
                {issue.count !== undefined && (
                  <Badge tone="danger" className="bg-rose-50 text-rose-800">
                    {issue.count} affected
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Schedule Conflicts */}
      {hasScheduleConflicts && (
        <Card className="border-amber-200 bg-amber-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-amber-800">
              <Clock className="h-4 w-4" />
              Draft Schedule Collisions ({summary.scheduleConflicts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            {summary.scheduleConflicts.map((conflict, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-amber-200 bg-white p-2.5 text-amber-950"
              >
                <span>{conflict.message}</span>
                <Badge tone="warning" className="bg-amber-50 text-amber-900">
                  {conflict.type === 'TEACHER_CONFLICT' ? 'Teacher Overlap' : 'Room Collision'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Capacity Warnings */}
      {summary.capacityWarnings.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-yellow-900">
              <Users className="h-4 w-4 text-[#023e8a]" />
              Class Capacity Warnings ({summary.capacityWarnings.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            {summary.capacityWarnings.map((cap, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-yellow-200 bg-white p-2.5 text-slate-800"
              >
                <span>{cap.message}</span>
                <Badge className="bg-[#ffc300] text-slate-900 hover:bg-[#ffd60a]">
                  {cap.enrolledCount} / {cap.capacity}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* General Warnings */}
      {summary.warnings.length > 0 && (
        <Card className="border-slate-200 bg-slate-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <AlertTriangle className="h-4 w-4 text-[#ffc300]" />
              Operational Warnings ({summary.warnings.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            {summary.warnings.map((warn, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5 text-slate-700"
              >
                <span>{warn.message}</span>
                {warn.count !== undefined && (
                  <Badge tone="neutral" className="text-slate-600">
                    {warn.count} items
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
