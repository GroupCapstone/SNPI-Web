'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Edit2,
  Eye,
  History,
  MapPin,
  Plus,
  Trash2,
  User,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';
import type { ClassItem } from '../types';

interface ClassCardGridProps {
  classes: ClassItem[];
  hasPermission: (permission: string) => boolean;
  onEdit: (classItem: ClassItem) => void;
  onDelete: (classItem: ClassItem) => void;
  onViewHistory: (classItem: ClassItem) => void;
  onCreate?: () => void;
}

export function getClassAvailabilityMeta(cls: ClassItem) {
  const capacity = cls.capacity > 0 ? cls.capacity : 1;
  const enrolled = cls.currentEnrollmentCount ?? 0;
  const remaining = Math.max(0, capacity - enrolled);
  const occupancyPercent = Math.min(100, Math.round((enrolled / capacity) * 100));

  if (cls.status === 'completed' || cls.status === 'cancelled') {
    return {
      statusKey: 'closed' as const,
      enrolled,
      capacity,
      remaining,
      occupancyPercent,
      barColor: 'bg-slate-400',
      badgeTone: 'neutral' as const,
      pillBg: 'bg-slate-100 text-slate-700',
    };
  }

  if (enrolled >= capacity) {
    return {
      statusKey: 'full' as const,
      enrolled,
      capacity,
      remaining: 0,
      occupancyPercent: 100,
      barColor: 'bg-rose-600',
      badgeTone: 'danger' as const,
      pillBg: 'bg-rose-50 text-rose-700 border-rose-200',
    };
  }

  if (occupancyPercent >= 80 || remaining <= 3) {
    return {
      statusKey: 'nearCapacity' as const,
      enrolled,
      capacity,
      remaining,
      occupancyPercent,
      barColor: 'bg-amber-500',
      badgeTone: 'warning' as const,
      pillBg: 'bg-amber-50 text-amber-800 border-amber-200',
    };
  }

  return {
    statusKey: 'available' as const,
    enrolled,
    capacity,
    remaining,
    occupancyPercent,
    barColor: 'bg-emerald-600',
    badgeTone: 'success' as const,
    pillBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };
}

export const ClassCardGrid: React.FC<ClassCardGridProps> = ({
  classes,
  hasPermission,
  onEdit,
  onDelete,
  onViewHistory,
  onCreate,
}) => {
  const { t, language } = useTranslation();

  if (classes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
        <Users className="mx-auto size-10 text-slate-400" />
        <p className="mt-3 text-base font-semibold text-slate-800">{t.classes.noClassesFound}</p>
        <p className="mt-1 text-sm text-slate-500">{t.classes.noClassesDesc}</p>
        {onCreate && hasPermission('class.create.own_branch') && (
          <Button onClick={onCreate} size="sm" className="mt-4 bg-[#00509d] text-white">
            <Plus className="mr-1.5 size-4" />
            {t.classes.addClass}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {classes.map((cls) => {
        const meta = getClassAvailabilityMeta(cls);

        const programName =
          typeof cls.programId === 'object' && cls.programId !== null
            ? (language === 'kh'
                ? cls.programId.nameKh || cls.programId.nameEn
                : cls.programId.nameEn) || cls.programId.code
            : '—';
        const levelName =
          typeof cls.levelId === 'object' && cls.levelId !== null ? cls.levelId.name : '';
        const branchCode =
          typeof cls.branchId === 'object' && cls.branchId !== null ? cls.branchId.branchCode : '';
        const classroomName =
          typeof cls.classroomId === 'object' && cls.classroomId !== null
            ? cls.classroomId.name || cls.classroomId.code
            : undefined;
        const teacherName =
          typeof cls.classTeacherId === 'object' && cls.classTeacherId !== null
            ? language === 'kh' && cls.classTeacherId.khmerName
              ? cls.classTeacherId.khmerName
              : `${cls.classTeacherId.firstName} ${cls.classTeacherId.lastName}`
            : undefined;

        const shiftLabel =
          t.classes.shifts[cls.shift as keyof typeof t.classes.shifts] || cls.shift || 'morning';

        const daysLabel =
          cls.daysPattern === 'MON_FRI'
            ? t.classes.daysPatterns.monFri
            : cls.daysPattern === 'MON_WED_FRI'
              ? t.classes.daysPatterns.monWedFri
              : cls.daysPattern === 'TUE_THU_SAT'
                ? t.classes.daysPatterns.tueThuSat
                : cls.daysPattern === 'SAT_SUN'
                  ? t.classes.daysPatterns.satSun
                  : t.classes.daysPatterns.custom;

        const availabilityBadgeLabel = t.classes.availabilityStatus[meta.statusKey];

        const seatsText =
          meta.statusKey === 'full'
            ? t.classes.kpis.noSeatsLeft
            : meta.statusKey === 'closed'
              ? t.classes.statuses[cls.status as keyof typeof t.classes.statuses] || cls.status
              : t.classes.kpis.seatsLeft.replace('{count}', String(meta.remaining));

        return (
          <Card
            key={cls._id}
            className="flex flex-col border-slate-200 bg-white transition-all duration-150 hover:border-slate-300 hover:shadow-sm"
          >
            <CardHeader className="p-4 pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#00509d]">
                      {cls.classCode}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="truncate text-xs text-slate-500">{programName}</span>
                  </div>
                  <Link
                    href={`/classes/${cls._id}`}
                    className="mt-1 block truncate text-sm font-bold text-slate-950 hover:text-[#00509d] hover:underline"
                    title={cls.className}
                  >
                    {cls.className}
                  </Link>
                </div>
                <Badge tone={meta.badgeTone} className="shrink-0 text-xs font-semibold">
                  {availabilityBadgeLabel}
                </Badge>
              </div>

              {levelName && (
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <span>{levelName}</span>
                  {branchCode && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="font-medium text-slate-700">{branchCode}</span>
                    </>
                  )}
                </div>
              )}
            </CardHeader>

            <CardContent className="flex-1 space-y-3.5 px-4 pt-0 pb-3">
              {/* Capacity Progress Meter */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">
                    {language === 'kh' ? 'សិស្សបានចុះ / ចំណុះ' : 'Enrolled / Capacity'}
                  </span>
                  <span className="font-bold text-slate-900">
                    {meta.enrolled} / {meta.capacity}{' '}
                    <span className="font-normal text-slate-500">({meta.occupancyPercent}%)</span>
                  </span>
                </div>

                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                  <div
                    className={`h-full transition-all duration-300 ${meta.barColor}`}
                    style={{ width: `${meta.occupancyPercent}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${meta.pillBg}`}
                  >
                    {seatsText}
                  </span>
                  {meta.statusKey === 'nearCapacity' && (
                    <span className="text-[11px] font-medium text-amber-700">
                      {t.classes.kpis.nearLimit}
                    </span>
                  )}
                </div>
              </div>

              {/* Class Attributes */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 truncate">
                  <Clock className="size-3.5 shrink-0 text-slate-400" />
                  <span className="truncate capitalize">{shiftLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Calendar className="size-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{daysLabel}</span>
                </div>
                {classroomName && (
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="size-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{classroomName}</span>
                  </div>
                )}
                {teacherName && (
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="size-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{teacherName}</span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t border-slate-100 p-3">
              <Link href={`/classes/${cls._id}`} className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-full text-xs font-medium text-slate-700 hover:border-[#00509d] hover:bg-slate-50 hover:text-[#00509d]"
                >
                  <Eye className="mr-1.5 size-3.5 text-[#00509d]" />
                  {language === 'kh' ? 'មើលព័ត៌មានលម្អិត' : 'View Details'}
                </Button>
              </Link>

              <div className="ml-2 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewHistory(cls)}
                  className="size-8 text-slate-500 hover:text-[#00509d]"
                  title={language === 'kh' ? 'មើលប្រវត្តិ' : 'View History'}
                  aria-label="View history"
                >
                  <History className="size-3.5" />
                </Button>

                {hasPermission('class.edit.own_branch') && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(cls)}
                    className="size-8 text-slate-500 hover:text-slate-900"
                    title={t.dialogs.update}
                    aria-label="Edit class"
                  >
                    <Edit2 className="size-3.5" />
                  </Button>
                )}

                {hasPermission('class.delete.own_branch') && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(cls)}
                    className="size-8 text-slate-400 hover:text-rose-600"
                    title={t.dialogs.delete}
                    aria-label="Delete class"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
