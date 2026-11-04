'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, UserPlus } from '@/components/icons';

import { Button } from '@/components/ui/button';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { StudentForm } from '@/features/students/components/student-form';

export default function NewStudentPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={['student.create.own_branch', 'student.create.all_branches']}
    >
      <div className="mx-auto max-w-5xl space-y-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/students">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-foreground flex items-center gap-2 text-xl font-bold tracking-tight">
                <UserPlus className="text-primary h-5 w-5" />
                Admit New Student
              </h1>
              <p className="text-muted-foreground text-xs">
                Register student master identity, birthplace, current residence, and family
                guardians.
              </p>
            </div>
          </div>
        </div>

        <StudentForm isPage={true} />
      </div>
    </PermissionGuard>
  );
}
