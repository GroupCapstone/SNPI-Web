'use client';

import * as React from 'react';
import { Printer } from '@/components/icons';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from '@/lib/i18n';

import type { TeacherRosterClassItem, TeacherRosterFacultyItem } from '../types';

export interface PrintRosterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facultyItem?: TeacherRosterFacultyItem | null;
  classItem?: TeacherRosterClassItem | null;
}

export const PrintRosterDialog: React.FC<PrintRosterDialogProps> = ({
  open,
  onOpenChange,
  facultyItem,
  classItem,
}) => {
  const { isKhmer } = useTranslation();

  if (!facultyItem || !classItem) return null;

  const handlePrint = () => {
    window.print();
  };

  const teacher = facultyItem.teacher;
  const teacherName =
    isKhmer && teacher.khmerName
      ? `${teacher.khmerName} (${teacher.firstName} ${teacher.lastName})`
      : `${teacher.firstName} ${teacher.lastName}${teacher.khmerName ? ` (${teacher.khmerName})` : ''}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl p-6 lg:max-w-5xl print:border-none print:p-0 print:shadow-none"
        onClose={() => onOpenChange(false)}
      >
        <DialogHeader className="border-b border-slate-100 pb-3 print:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Printer className="size-5.5 shrink-0 text-[#023e8a]" />
              <div>
                <DialogTitle className="text-base font-semibold text-slate-900">
                  {isKhmer ? 'បោះពុម្ពបញ្ជីឈ្មោះសិស្សក្នុងថ្នាក់' : 'Official Class Student Roster'}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  {classItem.className} ({classItem.classCode}) - {teacherName}
                </DialogDescription>
              </div>
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={handlePrint}
              className="h-8 gap-1.5 bg-[#023e8a] text-xs text-white hover:bg-[#00509d]"
            >
              <Printer className="size-3.5" />
              <span>{isKhmer ? 'បោះពុម្ព (Print)' : 'Print Roster'}</span>
            </Button>
          </div>
        </DialogHeader>

        {/* Printable Area */}
        <div className="space-y-4 pt-2 text-slate-900 print:text-black">
          {/* Header Banner */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 print:border-slate-300 print:bg-white">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-bold text-[#023e8a] print:text-black">
                  {isKhmer
                    ? 'បញ្ជីរាយនាមសិស្ស និងតាមដានការសិក្សា'
                    : 'Class Roster & Instruction Register'}
                </h2>
                <p className="text-xs text-slate-600">
                  {teacher.branch ? teacher.branch.branchNameEn : 'Main Campus'}
                </p>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p>
                  {isKhmer ? 'កាលបរិច្ឆេទបោះពុម្ព:' : 'Generated Date:'}{' '}
                  {new Date().toLocaleDateString()}
                </p>
                <p className="font-medium text-slate-800">
                  {isKhmer ? 'ចំនួនសិស្សសរុប:' : 'Total Students:'} {classItem.students.length} នាក់
                </p>
              </div>
            </div>

            {/* Class & Teacher Details Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-xs sm:grid-cols-4">
              <div>
                <span className="text-slate-500">{isKhmer ? 'ថ្នាក់រៀន:' : 'Class:'}</span>
                <p className="font-semibold text-slate-900">
                  {classItem.className} ({classItem.classCode})
                </p>
              </div>
              <div>
                <span className="text-slate-500">{isKhmer ? 'គ្រូបង្រៀន:' : 'Instructor:'}</span>
                <p className="font-semibold text-slate-900">{teacherName}</p>
              </div>
              <div>
                <span className="text-slate-500">
                  {isKhmer ? 'កម្មវិធី / កម្រិត:' : 'Program / Level:'}
                </span>
                <p className="font-medium text-slate-800">
                  {classItem.program?.nameEn || '—'}{' '}
                  {classItem.level ? `(${classItem.level.name})` : ''}
                </p>
              </div>
              <div>
                <span className="text-slate-500">
                  {isKhmer ? 'វេនសិក្សា / បន្ទប់:' : 'Shift / Room:'}
                </span>
                <p className="font-medium text-slate-800 capitalize">
                  {classItem.shift || '—'}{' '}
                  {classItem.classroom ? `· ${classItem.classroom.name}` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-100/80 text-xs font-semibold tracking-normal text-slate-700 uppercase print:bg-slate-100">
                <tr>
                  <th className="w-10 px-3 py-2 text-center">#</th>
                  <th className="px-3 py-2">{isKhmer ? 'អត្តលេខ' : 'Student ID'}</th>
                  <th className="px-3 py-2">
                    {isKhmer ? 'គោត្តនាម-នាម' : 'Full Name (Khmer & English)'}
                  </th>
                  <th className="w-16 px-3 py-2 text-center">{isKhmer ? 'ភេទ' : 'Gender'}</th>
                  <th className="px-3 py-2">
                    {isKhmer ? 'ទូរស័ព្ទអាណាព្យាបាល' : 'Guardian Phone'}
                  </th>
                  <th className="w-24 px-3 py-2 text-center">{isKhmer ? 'ស្ថានភាព' : 'Status'}</th>
                  {/* Blank columns for roll-call attendance check */}
                  <th className="w-16 border-l border-slate-200 px-3 py-2 text-center">1</th>
                  <th className="w-16 border-l border-slate-200 px-3 py-2 text-center">2</th>
                  <th className="w-16 border-l border-slate-200 px-3 py-2 text-center">3</th>
                  <th className="w-24 border-l border-slate-200 px-3 py-2 text-center">
                    {isKhmer ? 'កំណត់ចំណាំ' : 'Remarks'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {classItem.students.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-slate-500">
                      {isKhmer
                        ? 'មិនទាន់មានសិស្សចុះឈ្មោះក្នុងថ្នាក់នេះទេ'
                        : 'No students currently enrolled in this class.'}
                    </td>
                  </tr>
                ) : (
                  classItem.students.map((student, index) => {
                    const studentNameFormatted =
                      isKhmer && student.khmerName
                        ? `${student.khmerName} (${student.firstName} ${student.lastName})`
                        : `${student.firstName} ${student.lastName}${student.khmerName ? ` (${student.khmerName})` : ''}`;

                    return (
                      <tr key={student.enrollmentId} className="hover:bg-slate-50/50">
                        <td className="px-3 py-2 text-center font-mono text-xs text-slate-500">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2 font-mono font-medium whitespace-nowrap text-slate-800">
                          {student.studentCode}
                        </td>
                        <td className="px-3 py-2 font-medium text-slate-900">
                          {studentNameFormatted}
                        </td>
                        <td className="px-3 py-2 text-center text-slate-600 capitalize">
                          {student.gender === 'male'
                            ? isKhmer
                              ? 'ប្រុស'
                              : 'M'
                            : isKhmer
                              ? 'ស្រី'
                              : 'F'}
                        </td>
                        <td className="px-3 py-2 font-mono text-slate-600">
                          {student.guardianPhone || '—'}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className="inline-block rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold tracking-normal text-emerald-800 uppercase">
                            {student.status}
                          </span>
                        </td>
                        <td className="border-l border-slate-200"></td>
                        <td className="border-l border-slate-200"></td>
                        <td className="border-l border-slate-200"></td>
                        <td className="border-l border-slate-200"></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Signature Box (Print only) */}
          <div className="hidden grid-cols-2 pt-8 text-center text-xs print:grid">
            <div>
              <p className="font-semibold">
                {isKhmer ? 'ហត្ថលេខាគ្រូបង្រៀន' : 'Instructor Signature'}
              </p>
              <div className="h-16"></div>
              <p className="text-slate-500">...................................................</p>
            </div>
            <div>
              <p className="font-semibold">
                {isKhmer ? 'ការិយាល័យសិក្សាធិការ' : 'Academic Affairs Approval'}
              </p>
              <div className="h-16"></div>
              <p className="text-slate-500">...................................................</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
