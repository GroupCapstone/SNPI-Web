'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AlertCircle, ArrowLeft, Edit2 } from '@/components/icons';

import { Button } from '@/components/ui/button';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { StudentForm } from '@/features/students/components/student-form';
import { useStudentQuery } from '@/features/students/hooks/use-students';

export default function EditStudentPage() {
  const params = useParams();
  const studentId = params.id as string;

  const { data: studentRes, isLoading, isError, error } = useStudentQuery(studentId);
  const student = studentRes?.data;

  return (
    <PermissionGuard
      requiredAnyPermission={['student.edit.own_branch', 'student.edit.all_branches']}
    >
      <div className="mx-auto max-w-5xl space-y-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/students/${studentId}`}>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-foreground flex items-center gap-2 text-xl font-bold tracking-tight">
                <Edit2 className="text-primary h-5 w-5" />
                Edit Student Profile
              </h1>
              <p className="text-muted-foreground text-xs">
                Update personal demographic information, birthplace, address, or emergency
                guardians.
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-muted-foreground p-8 text-center text-xs">
            Loading student information...
          </div>
        ) : isError || !student ? (
          <div className="space-y-3 p-8 text-center">
            <AlertCircle className="text-destructive mx-auto h-8 w-8" />
            <h3 className="text-sm font-bold">Failed to load student</h3>
            <p className="text-muted-foreground text-xs">
              {error instanceof Error
                ? error.message
                : (error as unknown as { response?: { data?: { message?: string } } })?.response
                    ?.data?.message || 'Student record not found or inaccessible'}
            </p>
            <Link href="/students">
              <Button size="sm" variant="outline">
                Back to Students
              </Button>
            </Link>
          </div>
        ) : (
          <StudentForm initialData={student} isPage={true} />
        )}
      </div>
    </PermissionGuard>
  );
}
