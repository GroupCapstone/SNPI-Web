'use client';

import * as React from 'react';
import { FileSpreadsheet, LayoutGrid } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { TeacherAssignmentTable } from '@/features/teacher-assignments/components/teacher-assignment-table';
import { TeacherRosterMatrixDashboard } from '@/features/teacher-assignments/components/teacher-roster-matrix-dashboard';

type TabMode = 'matrix' | 'records';

export default function TeacherAssignmentsPage() {
  const [activeTab, setActiveTab] = React.useState<TabMode>('matrix');

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'teacher_assignment.view.all_branches',
        'teacher_assignment.view.own_branch',
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                Teacher Roster & Matrix
              </h1>
              <Badge tone="neutral">Academic Operations</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Unified faculty matrix, class timetables, student rosters, and assignment management.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex overflow-x-auto rounded-xl border border-slate-200 bg-slate-100/75 p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 font-medium transition-all ${
                activeTab === 'matrix'
                  ? 'bg-white text-[#00509d] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid
                className={`size-3.5 ${activeTab === 'matrix' ? 'text-[#00509d]' : 'text-slate-400'}`}
              />
              <span>Faculty Matrix & Rosters</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('records')}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 font-medium transition-all ${
                activeTab === 'records'
                  ? 'bg-white text-[#00509d] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet
                className={`size-3.5 ${activeTab === 'records' ? 'text-[#00509d]' : 'text-slate-400'}`}
              />
              <span>Assignment Records</span>
            </button>
          </div>
        </div>

        {activeTab === 'matrix' ? <TeacherRosterMatrixDashboard /> : <TeacherAssignmentTable />}
      </div>
    </PermissionGuard>
  );
}
