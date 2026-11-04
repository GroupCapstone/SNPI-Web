'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';

import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { StudentProfile } from '@/features/students/components/student-profile';

export default function StudentDetailsPage() {
  const params = useParams();
  const studentId = params.id as string;

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'student.view.assigned_class',
        'student.view.own_branch',
        'student.view.all_branches',
      ]}
    >
      <StudentProfile studentId={studentId} />
    </PermissionGuard>
  );
}
