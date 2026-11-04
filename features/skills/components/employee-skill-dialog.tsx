'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Award } from '@/components/icons';
import { useForm, useWatch } from 'react-hook-form';

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

import {
  useAddEmployeeSkillMutation,
  useSkillsQuery,
  useUpdateEmployeeSkillMutation,
} from '../hooks/use-skills';
import type { EmployeeSkillFormData } from '../schemas';
import { employeeSkillFormSchema } from '../schemas';
import type { EmployeeSkill, ProficiencyLevel } from '../types';

interface EmployeeSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
  employeeSkill?: EmployeeSkill | null;
}

const PROFICIENCY_LEVELS: Array<{ level: ProficiencyLevel; label: string; desc: string }> = [
  { level: 1, label: '1 - Basic', desc: 'Foundational awareness, requires routine guidance' },
  { level: 2, label: '2 - Developing', desc: 'Practical application under general supervision' },
  { level: 3, label: '3 - Competent', desc: 'Independent practitioner, standard mastery' },
  { level: 4, label: '4 - Advanced', desc: 'Deep expertise, mentors colleagues, complex cases' },
  { level: 5, label: '5 - Expert', desc: 'Institutional authority, strategic innovator' },
];

export const EmployeeSkillDialog = ({
  open,
  onOpenChange,
  employeeId,
  employeeSkill,
}: EmployeeSkillDialogProps) => {
  const isEdit = Boolean(employeeSkill);
  const addMutation = useAddEmployeeSkillMutation();
  const updateMutation = useUpdateEmployeeSkillMutation();
  const { data: skillsData } = useSkillsQuery({ isActive: true, limit: 100 });

  const skills = skillsData?.data ?? [];
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<EmployeeSkillFormData>({
    resolver: zodResolver(employeeSkillFormSchema),
    defaultValues: {
      employeeId,
      skillId: '',
      proficiencyLevel: 3,
      yearsExperience: 1,
      evidenceDocument: '',
      evidenceUrl: '',
      expiryDate: '',
      notes: '',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedLevel = watchedValues.proficiencyLevel;

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (employeeSkill) {
      const sId =
        typeof employeeSkill.skillId === 'object' && employeeSkill.skillId !== null
          ? employeeSkill.skillId._id
          : String(employeeSkill.skillId);

      const expDate = employeeSkill.expiryDate
        ? new Date(employeeSkill.expiryDate).toISOString().split('T')[0]
        : '';

      reset({
        employeeId,
        skillId: sId,
        proficiencyLevel: employeeSkill.proficiencyLevel,
        yearsExperience: employeeSkill.yearsExperience ?? 0,
        evidenceDocument: employeeSkill.evidenceDocument ?? '',
        evidenceUrl: employeeSkill.evidenceUrl ?? '',
        expiryDate: expDate,
        notes: employeeSkill.notes ?? '',
      });
    } else {
      reset({
        employeeId,
        skillId: skills[0]?._id ?? '',
        proficiencyLevel: 3,
        yearsExperience: 1,
        evidenceDocument: '',
        evidenceUrl: '',
        expiryDate: '',
        notes: '',
      });
    }
  }, [open, employeeId, employeeSkill, skills, reset]);

  const onSubmit = async (data: EmployeeSkillFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && employeeSkill) {
        await updateMutation.mutateAsync({
          id: employeeSkill._id,
          data: {
            proficiencyLevel: data.proficiencyLevel,
            yearsExperience: data.yearsExperience,
            evidenceDocument: data.evidenceDocument || undefined,
            evidenceUrl: data.evidenceUrl || undefined,
            expiryDate: data.expiryDate || null,
            notes: data.notes || undefined,
          },
        });
      } else {
        await addMutation.mutateAsync({
          employeeId,
          skillId: data.skillId,
          proficiencyLevel: data.proficiencyLevel,
          yearsExperience: data.yearsExperience,
          evidenceDocument: data.evidenceDocument || undefined,
          evidenceUrl: data.evidenceUrl || undefined,
          expiryDate: data.expiryDate || null,
          notes: data.notes || undefined,
        });
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to record employee skill';
      setSubmitError(msg);
    }
  };

  const isLoading = isSubmitting || addMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <Award className="size-5.5 shrink-0 text-[#00509d]" />
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                {isEdit ? 'Update Employee Competency' : 'Record Employee Skill'}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Log demonstrated proficiency, evidence documentation, and certification validity.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {submitError && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
              {submitError}
            </div>
          )}

          {/* Skill Selector */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Competency / Skill <span className="text-rose-500">*</span>
            </label>
            <Select
              {...register('skillId')}
              value={watchedValues.skillId}
              onChange={(e) => setValue('skillId', e.target.value)}
              disabled={isEdit || isLoading}
              className="h-9 text-xs"
            >
              <option value="">Select a skill from catalog...</option>
              {skills.map((s) => (
                <option key={s._id} value={s._id}>
                  [{s.code}] {s.name} ({s.category})
                </option>
              ))}
            </Select>
            {errors.skillId && <p className="text-xs text-rose-600">{errors.skillId.message}</p>}
          </div>

          {/* Proficiency Level Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Demonstrated Proficiency Level <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {PROFICIENCY_LEVELS.map((p) => {
                const isSelected = Number(selectedLevel) === p.level;
                return (
                  <button
                    key={p.level}
                    type="button"
                    onClick={() => setValue('proficiencyLevel', p.level)}
                    className={`flex flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${
                      isSelected
                        ? 'border-[#00509d] bg-blue-50/80 font-bold text-[#00509d]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base font-bold">{p.level}</span>
                    <span className="text-xs">{p.label.split(' - ')[1]}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 italic">
              {PROFICIENCY_LEVELS.find((p) => p.level === Number(selectedLevel))?.desc}
            </p>
          </div>

          {/* Experience & Expiry Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Years Experience</label>
              <Input
                type="number"
                step="0.5"
                min="0"
                max="60"
                {...register('yearsExperience')}
                placeholder="e.g. 3.5"
                disabled={isLoading}
                className="h-9 text-xs"
              />
              {errors.yearsExperience && (
                <p className="text-xs text-rose-600">{errors.yearsExperience.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Certification Expiry Date
              </label>
              <Input
                type="date"
                {...register('expiryDate')}
                disabled={isLoading}
                className="h-9 text-xs"
              />
            </div>
          </div>

          {/* Evidence Document / Certificate URL */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Certificate Name / Ref</label>
              <Input
                {...register('evidenceDocument')}
                placeholder="e.g. CELTA Certificate #4821"
                disabled={isLoading}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Evidence / Document URL
              </label>
              <Input
                {...register('evidenceUrl')}
                placeholder="https://drive.google.com/..."
                disabled={isLoading}
                className="h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Evaluation Notes</label>
            <textarea
              {...register('notes')}
              rows={2}
              placeholder="Context regarding evaluation, observed performance, or training history..."
              disabled={isLoading}
              className="w-full rounded-md border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
            />
          </div>

          <DialogFooter className="border-t border-slate-100 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isLoading}
              className="bg-[#023e8a] text-xs hover:bg-[#00509d]"
            >
              {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Save Competency'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
