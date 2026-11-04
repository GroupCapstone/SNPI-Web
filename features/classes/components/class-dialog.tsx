'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Clock } from '@/components/icons';
import { useForm, useWatch } from 'react-hook-form';

const DAY_OPTIONS = [
  { num: 1, label: 'Mon', kh: 'ច័ន្ទ' },
  { num: 2, label: 'Tue', kh: 'អង្គារ' },
  { num: 3, label: 'Wed', kh: 'ពុធ' },
  { num: 4, label: 'Thu', kh: 'ព្រហ' },
  { num: 5, label: 'Fri', kh: 'សុក្រ' },
  { num: 6, label: 'Sat', kh: 'សៅរ៍' },
  { num: 7, label: 'Sun', kh: 'អាទិត្យ' },
];

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { getAcademicYears } from '@/features/academic-years/api/get-academic-years';
import { getBranches } from '@/features/branches/api/get-branches';
import { getClassrooms } from '@/features/classrooms/api/get-classrooms';
import { useCurriculaQuery } from '@/features/curriculum/hooks/use-curriculum';
import { useLevelsQuery } from '@/features/levels/hooks/use-levels';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';
import { useAuth } from '@/features/auth/context/auth-context';
import { useTranslation } from '@/lib/i18n';

import { useCreateClassMutation, useUpdateClassMutation } from '../hooks/use-classes';
import type { ClassFormData } from '../schemas';
import { classFormSchema } from '../schemas';
import type { ClassItem } from '../types';

interface ClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classItem?: ClassItem | null;
}

export const ClassDialog = ({ open, onOpenChange, classItem }: ClassDialogProps) => {
  const { t, language } = useTranslation();
  const { user, currentBranchId } = useAuth();
  const isEdit = Boolean(classItem);
  const createMutation = useCreateClassMutation();
  const updateMutation = useUpdateClassMutation();

  const { data: allBranches = [] } = useQuery({
    queryKey: ['branches-list'],
    queryFn: getBranches,
  });

  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const { data: academicYears = [] } = useQuery({
    queryKey: ['academic-years-list'],
    queryFn: getAcademicYears,
  });

  const { data: programsData } = useProgramsQuery({ limit: 100 });
  const programs = React.useMemo(() => programsData?.data ?? [], [programsData?.data]);

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClassFormData>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      branchId: '',
      academicYearId: '',
      programId: '',
      levelId: '',
      curriculumId: '',
      classroomId: '',
      classCode: '',
      className: '',
      capacity: 30,
      shift: 'morning',
      daysPattern: 'MON_FRI',
      selectedDays: [1, 2, 3, 4, 5],
      startTime: '08:00',
      endTime: '11:15',
      startDate: '',
      endDate: '',
      status: 'planned',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedProgramId = watchedValues.programId;
  const selectedBranchId = watchedValues.branchId;
  const selectedLevelId = watchedValues.levelId;
  const selectedAcademicYearId = watchedValues.academicYearId;

  // Dependent query: levels filtered by program
  const { data: levelsData } = useLevelsQuery({
    programId: selectedProgramId || undefined,
    limit: 100,
  });
  const filteredLevels = React.useMemo(() => levelsData?.data ?? [], [levelsData?.data]);

  // Dependent query: curricula filtered by program and level
  const { data: curriculaData } = useCurriculaQuery({
    programId: selectedProgramId || undefined,
    levelId: selectedLevelId || undefined,
    academicYearId: selectedAcademicYearId || undefined,
    limit: 50,
  });
  const filteredCurricula = React.useMemo(() => curriculaData?.data ?? [], [curriculaData?.data]);

  // Dependent query: classrooms filtered by branch
  const { data: filteredClassrooms = [] } = useQuery({
    queryKey: ['classrooms-list', selectedBranchId],
    queryFn: () => getClassrooms(selectedBranchId || undefined),
    enabled: Boolean(selectedBranchId),
  });

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (classItem) {
      const branchId =
        typeof classItem.branchId === 'object' && classItem.branchId !== null
          ? classItem.branchId._id
          : String(classItem.branchId);

      const academicYearId =
        typeof classItem.academicYearId === 'object' && classItem.academicYearId !== null
          ? classItem.academicYearId._id
          : String(classItem.academicYearId);

      const programId =
        typeof classItem.programId === 'object' && classItem.programId !== null
          ? classItem.programId._id
          : String(classItem.programId);

      const levelId =
        typeof classItem.levelId === 'object' && classItem.levelId !== null
          ? classItem.levelId._id
          : String(classItem.levelId);

      const curriculumId =
        typeof classItem.curriculumId === 'object' && classItem.curriculumId !== null
          ? classItem.curriculumId._id
          : classItem.curriculumId
            ? String(classItem.curriculumId)
            : '';

      const classroomId =
        typeof classItem.classroomId === 'object' && classItem.classroomId !== null
          ? classItem.classroomId._id
          : classItem.classroomId
            ? String(classItem.classroomId)
            : '';

      reset({
        branchId,
        academicYearId,
        programId,
        levelId,
        curriculumId,
        classroomId,
        classCode: classItem.classCode,
        className: classItem.className,
        capacity: classItem.capacity,
        shift: (classItem.shift as ClassFormData['shift']) || 'morning',
        daysPattern: (classItem.daysPattern as ClassFormData['daysPattern']) || 'MON_FRI',
        selectedDays: classItem.selectedDays || [1, 2, 3, 4, 5],
        startTime: classItem.startTime || '08:00',
        endTime: classItem.endTime || '11:15',
        startDate: classItem.startDate ? classItem.startDate.substring(0, 10) : '',
        endDate: classItem.endDate ? classItem.endDate.substring(0, 10) : '',
        status: classItem.status,
      });
    } else {
      const currentYear = academicYears.find((y) => y.isCurrent) || academicYears[0];
      const defaultBranchId =
        currentBranchId &&
        currentBranchId !== 'all' &&
        branches.some((b) => b._id === currentBranchId)
          ? currentBranchId
          : branches[0]?._id || '';

      reset({
        branchId: defaultBranchId,
        academicYearId: currentYear?._id || '',
        programId: programs[0]?._id || '',
        levelId: '',
        curriculumId: '',
        classroomId: '',
        classCode: '',
        className: '',
        capacity: 30,
        shift: 'morning',
        daysPattern: 'MON_FRI',
        selectedDays: [1, 2, 3, 4, 5],
        startTime: '08:00',
        endTime: '11:15',
        startDate: '',
        endDate: '',
        status: 'planned',
      });
    }
  }, [open, classItem, branches, academicYears, programs, reset]);

  // When program changes in create mode, reset level
  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProgramId = e.target.value;
    setValue('programId', newProgramId);
    setValue('levelId', '');
  };

  const handleShiftChange = (shift: ClassFormData['shift']) => {
    setValue('shift', shift);
    if (shift === 'morning') {
      setValue('startTime', '08:00');
      setValue('endTime', '11:15');
    } else if (shift === 'afternoon') {
      setValue('startTime', '13:30');
      setValue('endTime', '16:45');
    } else if (shift === 'evening') {
      setValue('startTime', '17:30');
      setValue('endTime', '20:30');
    } else if (shift === 'weekend') {
      setValue('startTime', '08:00');
      setValue('endTime', '16:00');
      setValue('daysPattern', 'SAT_SUN');
      setValue('selectedDays', [6, 7]);
    }
  };

  const handleDaysPatternChange = (pattern: ClassFormData['daysPattern']) => {
    setValue('daysPattern', pattern);
    if (pattern === 'MON_FRI') {
      setValue('selectedDays', [1, 2, 3, 4, 5]);
    } else if (pattern === 'MON_WED_FRI') {
      setValue('selectedDays', [1, 3, 5]);
    } else if (pattern === 'TUE_THU_SAT') {
      setValue('selectedDays', [2, 4, 6]);
    } else if (pattern === 'SAT_SUN') {
      setValue('selectedDays', [6, 7]);
    }
  };

  const toggleDay = (dayNum: number) => {
    const currentDays = watchedValues.selectedDays || [];
    const nextDays = currentDays.includes(dayNum)
      ? currentDays.filter((d) => d !== dayNum)
      : [...currentDays, dayNum].sort((a, b) => a - b);
    setValue('selectedDays', nextDays);
    setValue('daysPattern', 'CUSTOM');
  };

  // When branch changes, reset classroom
  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBranchId = e.target.value;
    setValue('branchId', newBranchId);
    setValue('classroomId', '');
  };

  const onSubmit = async (data: ClassFormData) => {
    try {
      setSubmitError(null);
      const payload = {
        ...data,
        curriculumId: data.curriculumId ? data.curriculumId.trim() || undefined : undefined,
        classroomId: data.classroomId ? data.classroomId.trim() || undefined : undefined,
        startDate: data.startDate ? data.startDate.trim() || undefined : undefined,
        endDate: data.endDate ? data.endDate.trim() || undefined : undefined,
        startTime: data.startTime ? data.startTime.trim() || undefined : undefined,
        endTime: data.endTime ? data.endTime.trim() || undefined : undefined,
        classCode: data.classCode.trim(),
        className: data.className.trim(),
      };

      if (isEdit && classItem) {
        await updateMutation.mutateAsync({ id: classItem._id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save class';
      setSubmitError(msg);
    }
  };

  const onValidationError = (formErrors: typeof errors) => {
    const errorKeys = Object.keys(formErrors);
    if (errorKeys.length > 0) {
      const firstKey = errorKeys[0] as keyof typeof formErrors;
      const firstError = formErrors[firstKey];
      const msg =
        typeof firstError?.message === 'string'
          ? firstError.message
          : `Please fill in all required fields (${errorKeys.join(', ')})`;
      setSubmitError(`Validation Error: ${msg}`);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending || isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl lg:max-w-4xl" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>{isEdit ? t.classes.dialogTitleEdit : t.classes.dialogTitleAdd}</DialogTitle>
          <DialogDescription>{t.classes.dialogSubtitle}</DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-4">
          {/* Top Section: Branch & Academic Year */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.campusBranch} *
              </label>
              <Select
                {...register('branchId')}
                value={watchedValues.branchId || ''}
                onChange={handleBranchChange}
                disabled={isEdit || branches.length <= 1}
                error={Boolean(errors.branchId)}
              >
                {branches.length > 1 && <option value="">{t.classes.selectBranch}</option>}
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.branchCode} ·{' '}
                    {language === 'kh' ? b.branchNameKh || b.branchNameEn : b.branchNameEn}
                  </option>
                ))}
              </Select>
              {errors.branchId && (
                <p className="mt-1 text-xs text-rose-600">{errors.branchId.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.academicYear} *
              </label>
              <Select
                {...register('academicYearId')}
                value={watchedValues.academicYearId || ''}
                onChange={(e) => setValue('academicYearId', e.target.value)}
                error={Boolean(errors.academicYearId)}
              >
                <option value="">{t.classes.selectAcademicYear}</option>
                {academicYears.map((ay) => (
                  <option key={ay._id} value={ay._id}>
                    {ay.name}{' '}
                    {ay.isCurrent ? (language === 'kh' ? '(បច្ចុប្បន្ន)' : '(Current)') : ''}
                  </option>
                ))}
              </Select>
              {errors.academicYearId && (
                <p className="mt-1 text-xs text-rose-600">{errors.academicYearId.message}</p>
              )}
            </div>
          </div>

          {/* Middle Section: Program & Level Dependency */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.program} *
              </label>
              <Select
                {...register('programId')}
                value={watchedValues.programId || ''}
                onChange={handleProgramChange}
                error={Boolean(errors.programId)}
              >
                <option value="">{t.classes.selectProgram}</option>
                {programs.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.code} — {language === 'kh' ? p.nameKh || p.nameEn : p.nameEn}
                  </option>
                ))}
              </Select>
              {errors.programId && (
                <p className="mt-1 text-xs text-rose-600">{errors.programId.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.level} *
              </label>
              <Select
                {...register('levelId')}
                value={watchedValues.levelId || ''}
                onChange={(e) => setValue('levelId', e.target.value)}
                disabled={!selectedProgramId || filteredLevels.length === 0}
                error={Boolean(errors.levelId)}
              >
                <option value="">
                  {!selectedProgramId
                    ? t.classes.selectLevelFirst
                    : filteredLevels.length === 0
                      ? t.classes.noLevelsFound
                      : t.classes.selectLevel}
                </option>
                {filteredLevels.map((lvl) => (
                  <option key={lvl._id} value={lvl._id}>
                    {lvl.code} — {lvl.name} (
                    {language === 'kh' ? `លំដាប់: ${lvl.sequence}` : `Seq: ${lvl.sequence}`})
                  </option>
                ))}
              </Select>
              {errors.levelId && (
                <p className="mt-1 text-xs text-rose-600">{errors.levelId.message}</p>
              )}
            </div>
          </div>

          {/* Curriculum Blueprint (Optional) */}
          <div>
            <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
              {t.classes.curriculumOptional}
            </label>
            <Select
              {...register('curriculumId')}
              value={watchedValues.curriculumId || ''}
              onChange={(e) => setValue('curriculumId', e.target.value)}
              disabled={!selectedProgramId || !selectedLevelId || filteredCurricula.length === 0}
            >
              <option value="">
                {!selectedLevelId
                  ? t.classes.selectLevelFirst
                  : filteredCurricula.length === 0
                    ? t.classes.noCurriculumFound
                    : t.classes.selectCurriculumOptional}
              </option>
              {filteredCurricula.map((curr) => (
                <option key={curr._id} value={curr._id}>
                  {curr.code} — {curr.name} ({curr.subjects?.length ?? 0}{' '}
                  {language === 'kh' ? 'មុខវិជ្ជា' : 'subjects'})
                </option>
              ))}
            </Select>
          </div>

          {/* Class Code & Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.classCode} *
              </label>
              <Input
                {...register('classCode')}
                placeholder="e.g. GEP-ELEM-M1"
                error={Boolean(errors.classCode)}
              />
              {errors.classCode && (
                <p className="mt-1 text-xs text-rose-600">{errors.classCode.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.className} *
              </label>
              <Input
                {...register('className')}
                placeholder="e.g. Elementary Morning A"
                error={Boolean(errors.className)}
              />
              {errors.className && (
                <p className="mt-1 text-xs text-rose-600">{errors.className.message}</p>
              )}
            </div>
          </div>

          {/* Classroom & Capacity */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.classroomOptional}
              </label>
              <Select
                {...register('classroomId')}
                value={watchedValues.classroomId || ''}
                onChange={(e) => setValue('classroomId', e.target.value)}
                disabled={!selectedBranchId || filteredClassrooms.length === 0}
              >
                <option value="">{t.classes.selectClassroomOptional}</option>
                {filteredClassrooms.map((cr) => (
                  <option key={cr._id} value={cr._id}>
                    {cr.code} · {cr.name} ({cr.building || 'Main'}, {t.classes.capacity}:{' '}
                    {cr.capacity})
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.capacity} *
              </label>
              <Input
                type="number"
                min="1"
                {...register('capacity', { valueAsNumber: true })}
                error={Boolean(errors.capacity)}
              />
              {errors.capacity && (
                <p className="mt-1 text-xs text-rose-600">{errors.capacity.message}</p>
              )}
            </div>
          </div>

          {/* Study Schedule & Timing */}
          <div className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-normal text-[#023e8a] uppercase">
              <Clock className="size-4 text-[#00509d]" />
              <span>{t.classes.scheduleTimingHeader}</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  {t.classes.shift} *
                </label>
                <Select
                  value={watchedValues.shift || 'morning'}
                  onChange={(e) => handleShiftChange(e.target.value as ClassFormData['shift'])}
                  className="h-9 text-xs"
                >
                  <option value="morning">{t.classes.shifts.morning} (08:00 - 11:15)</option>
                  <option value="afternoon">{t.classes.shifts.afternoon} (13:30 - 16:45)</option>
                  <option value="evening">{t.classes.shifts.evening} (17:30 - 20:30)</option>
                  <option value="weekend">{t.classes.shifts.weekend} (08:00 - 16:00)</option>
                  <option value="hourly">{t.classes.shifts.hourly}</option>
                  <option value="custom">{t.classes.shifts.custom}</option>
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  {t.classes.daysPattern} *
                </label>
                <Select
                  value={watchedValues.daysPattern || 'MON_FRI'}
                  onChange={(e) =>
                    handleDaysPatternChange(e.target.value as ClassFormData['daysPattern'])
                  }
                  className="h-9 text-xs"
                >
                  <option value="MON_FRI">{t.classes.daysPatterns.monFri}</option>
                  <option value="MON_WED_FRI">{t.classes.daysPatterns.monWedFri}</option>
                  <option value="TUE_THU_SAT">{t.classes.daysPatterns.tueThuSat}</option>
                  <option value="SAT_SUN">{t.classes.daysPatterns.satSun}</option>
                  <option value="CUSTOM">{t.classes.daysPatterns.custom}</option>
                </Select>
              </div>
            </div>

            {/* Interactive Day Pills */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                {t.classes.activeStudyDays}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DAY_OPTIONS.map((day) => {
                  const isSelected = (watchedValues.selectedDays || []).includes(day.num);
                  return (
                    <button
                      key={day.num}
                      type="button"
                      onClick={() => toggleDay(day.num)}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#023e8a] font-semibold text-white'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{language === 'kh' ? day.kh : day.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time range inputs */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  {t.classes.startTime}
                </label>
                <Input type="time" {...register('startTime')} className="h-9 text-xs" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  {t.classes.endTime}
                </label>
                <Input type="time" {...register('endTime')} className="h-9 text-xs" />
              </div>
            </div>
          </div>

          {/* Dates & Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.startDate}
              </label>
              <Input type="date" {...register('startDate')} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.endDate}
              </label>
              <Input type="date" {...register('endDate')} error={Boolean(errors.endDate)} />
              {errors.endDate && (
                <p className="mt-1 text-xs text-rose-600">{errors.endDate.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {t.classes.status} *
              </label>
              <Select
                {...register('status')}
                value={watchedValues.status || 'planned'}
                onChange={(e) =>
                  setValue(
                    'status',
                    e.target.value as 'planned' | 'active' | 'completed' | 'cancelled',
                  )
                }
              >
                <option value="planned">{t.classes.statuses.planned}</option>
                <option value="active">{t.classes.statuses.active}</option>
                <option value="completed">{t.classes.statuses.completed}</option>
                <option value="cancelled">{t.classes.statuses.cancelled}</option>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {t.dialogs.cancel}
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#023e8a] hover:bg-[#00509d]">
              {isLoading ? t.dialogs.saving : isEdit ? t.dialogs.saveChanges : t.classes.addClass}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
