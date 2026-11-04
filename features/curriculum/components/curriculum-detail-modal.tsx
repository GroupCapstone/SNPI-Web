'use client';

import * as React from 'react';
import { BookOpen, Calendar, Clock, Layers, School } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { Curriculum } from '../types';

interface CurriculumDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  curriculum: Curriculum | null;
}

export const CurriculumDetailModal = ({
  open,
  onOpenChange,
  curriculum,
}: CurriculumDetailModalProps) => {
  if (!curriculum) return null;

  const programName =
    typeof curriculum.programId === 'object' ? curriculum.programId.nameEn : 'Program';
  const levelName = typeof curriculum.levelId === 'object' ? curriculum.levelId.name : 'Level';
  const academicYearName =
    typeof curriculum.academicYearId === 'object'
      ? curriculum.academicYearId.name
      : 'Academic Year';

  const totalWeeklyHours = curriculum.subjects.reduce((sum, s) => sum + (s.weeklyHours || 0), 0);
  const totalCourseHours = curriculum.subjects.reduce((sum, s) => sum + (s.totalHours || 0), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] max-w-3xl overflow-y-auto"
        onClose={() => onOpenChange(false)}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <span className="rounded border border-blue-100 bg-blue-50 px-2 py-0.5 font-mono text-xs font-bold text-[#023e8a]">
              {curriculum.code}
            </span>
            <Badge
              tone={
                curriculum.status === 'active'
                  ? 'success'
                  : curriculum.status === 'inactive'
                    ? 'warning'
                    : 'neutral'
              }
            >
              {curriculum.status.toUpperCase()}
            </Badge>
          </div>
          <DialogTitle className="mt-2 text-xl font-bold text-slate-900">
            {curriculum.name}
          </DialogTitle>
          {curriculum.description && (
            <DialogDescription className="mt-1 text-sm text-slate-600">
              {curriculum.description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Overview Stats Cards */}
        <div className="my-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <School className="h-3.5 w-3.5 text-[#023e8a]" />
              <span>Program</span>
            </div>
            <p className="mt-1 truncate text-sm font-semibold text-slate-900">{programName}</p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Layers className="h-3.5 w-3.5 text-[#00509d]" />
              <span>Level</span>
            </div>
            <p className="mt-1 truncate text-sm font-semibold text-slate-900">{levelName}</p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
              <span>Academic Year</span>
            </div>
            <p className="mt-1 truncate text-sm font-semibold text-slate-900">{academicYearName}</p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              <span>Total Hours</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {totalWeeklyHours} hrs/wk ({totalCourseHours}h)
            </p>
          </div>
        </div>

        {/* Subjects Matrix Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
            <div className="flex items-center gap-2 text-xs font-bold tracking-normal text-slate-700 uppercase">
              <BookOpen className="h-4 w-4 text-[#023e8a]" />
              <span>Syllabus Subject Allocation ({curriculum.subjects.length} Subjects)</span>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead>Subject Name</TableHead>
                <TableHead className="text-right">Weekly Hrs</TableHead>
                <TableHead className="text-right">Total Hrs</TableHead>
                <TableHead className="text-right">Pass Score</TableHead>
                <TableHead className="text-center">Required</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {curriculum.subjects.map((item, idx) => {
                const subName =
                  typeof item.subjectId === 'object' ? item.subjectId.name : `Subject ${idx + 1}`;
                const subCode = typeof item.subjectId === 'object' ? item.subjectId.code : '';
                const category = typeof item.subjectId === 'object' ? item.subjectId.category : '';

                return (
                  <TableRow key={idx} className="hover:bg-slate-50/70">
                    <TableCell className="text-center text-xs font-bold text-slate-400">
                      {item.sequence ?? idx + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex min-w-0 flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">{subName}</span>
                          {category && (
                            <Badge tone="neutral" className="text-xs uppercase">
                              {category}
                            </Badge>
                          )}
                        </div>
                        {subCode && (
                          <span className="font-mono text-xs text-slate-500">{subCode}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-700">
                      {item.weeklyHours}h / wk
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-700">
                      {item.totalHours}h
                    </TableCell>
                    <TableCell className="text-right font-semibold text-emerald-700">
                      {item.passingScore ?? 50}%
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                          item.isRequired
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.isRequired ? 'Core' : 'Elective'}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
