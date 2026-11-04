import type { Metadata } from 'next';

import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { TimetableGrid } from '@/features/timetable/components/timetable-grid';

export const metadata: Metadata = {
  title: 'Class Timetable & Schedule | SNPI Management System',
  description: 'View class schedules, shift hours, and weekly room allocations.',
};

export default function TimetablePage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'class.view.assigned_class',
        'class.view.own_branch',
        'class.view.all_branches',
      ]}
    >
      <div className="space-y-6">
        <TimetableGrid />
      </div>
    </PermissionGuard>
  );
}
