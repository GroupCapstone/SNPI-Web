'use client';

import * as React from 'react';
import { Calendar, CheckCircle2, Edit2, Trash2 } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useDeleteAcademicYearMutation,
  useUpdateAcademicYearMutation,
} from '../hooks/use-academic-years';
import type { AcademicYear } from '../types';
import { useTranslation } from '@/lib/i18n';

interface AcademicYearTableProps {
  data: AcademicYear[];
  onEdit: (item: AcademicYear) => void;
  canEdit: boolean;
  canDelete: boolean;
}

export const AcademicYearTable: React.FC<AcademicYearTableProps> = ({
  data,
  onEdit,
  canEdit,
  canDelete,
}) => {
  const { t } = useTranslation();
  const deleteMutation = useDeleteAcademicYearMutation();
  const updateMutation = useUpdateAcademicYearMutation();

  const handleDelete = async (year: AcademicYear) => {
    if (
      window.confirm(`Are you sure you want to delete academic year "${year.name}" (${year.code})?`)
    ) {
      try {
        await deleteMutation.mutateAsync(year._id);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to delete academic year';
        alert(msg);
      }
    }
  };

  const handleSetCurrent = async (year: AcademicYear) => {
    try {
      await updateMutation.mutateAsync({
        id: year._id,
        payload: { isCurrent: true },
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to set current academic year';
      alert(msg);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80">
            <TableHead className="font-semibold text-slate-700">
              {t.academicYears.yearCode}
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              {t.academicYears.yearName}
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              {t.academicYears.startDate}
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              {t.academicYears.endDate}
            </TableHead>
            <TableHead className="text-center font-semibold text-slate-700">
              {t.academicYears.isCurrent}
            </TableHead>
            <TableHead className="font-semibold text-slate-700">{t.common.status}</TableHead>
            <TableHead className="w-36 text-right font-semibold text-slate-700">
              {t.common.actions}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-sm text-slate-500">
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <Calendar className="size-6 text-slate-400" />
                  <p className="font-medium text-slate-700">{t.academicYears.noYearsFound}</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((year) => {
              const startStr = year.startDate
                ? new Date(year.startDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'N/A';
              const endStr = year.endDate
                ? new Date(year.endDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'N/A';

              return (
                <TableRow key={year._id} className="hover:bg-slate-50/60">
                  <TableCell className="font-semibold text-slate-900">{year.code}</TableCell>
                  <TableCell className="font-medium text-slate-800">{year.name}</TableCell>
                  <TableCell className="text-xs text-slate-600">{startStr}</TableCell>
                  <TableCell className="text-xs text-slate-600">{endStr}</TableCell>
                  <TableCell className="text-center">
                    {year.isCurrent ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                        <CheckCircle2 className="size-3 text-amber-600" />{' '}
                        {t.academicYears.isCurrent}
                      </span>
                    ) : canEdit ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetCurrent(year)}
                        className="text-xs text-slate-500 hover:text-[#00509d]"
                      >
                        {t.academicYears.setCurrent}
                      </Button>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <Badge
                      tone={
                        year.status === 'active'
                          ? 'success'
                          : year.status === 'closed'
                            ? 'warning'
                            : 'neutral'
                      }
                      className="text-xs capitalize"
                    >
                      {year.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(year)}
                          className="size-8 text-slate-600 hover:text-slate-900"
                          title="Edit"
                        >
                          <Edit2 className="size-3.5" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(year)}
                          className="size-8 text-rose-600 hover:bg-rose-50"
                          title="Delete"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
