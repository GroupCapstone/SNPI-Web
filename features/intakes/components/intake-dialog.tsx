'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import type { Intake, CreateIntakeInput, IntakeStatus } from '../types';
import { useCreateIntakeMutation, useUpdateIntakeMutation } from '../hooks/use-intakes';
import {
  getAcademicYears,
  type AcademicYearItem,
} from '@/features/academic-years/api/get-academic-years';
import { getAcademicPeriods } from '@/features/academic-periods/api/academic-period-api';
import { getPrograms } from '@/features/programs/api/program-api';
import { getLevels } from '@/features/levels/api/level-api';
import { getBranches } from '@/features/branches/api/branch-api';
import type { Branch } from '@/features/branches/types';
import type { Program } from '@/features/programs/types';
import type { Level } from '@/features/levels/types';
import type { AcademicPeriod } from '@/features/academic-periods/types';
import { useTranslation } from '@/lib/i18n';

interface IntakeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intake?: Intake | null;
}

const IntakeFormContent: React.FC<{
  intake?: Intake | null;
  onClose: () => void;
}> = ({ intake, onClose }) => {
  const { t } = useTranslation();
  const [code, setCode] = React.useState(intake?.code || '');
  const [name, setName] = React.useState(intake?.name || '');
  const [branchId, setBranchId] = React.useState(
    typeof intake?.branchId === 'object' && intake?.branchId !== null
      ? intake.branchId._id
      : String(intake?.branchId || ''),
  );
  const [academicYearId, setAcademicYearId] = React.useState(
    typeof intake?.academicYearId === 'object' && intake?.academicYearId !== null
      ? intake.academicYearId._id
      : String(intake?.academicYearId || ''),
  );
  const [academicPeriodId, setAcademicPeriodId] = React.useState(
    typeof intake?.academicPeriodId === 'object' && intake?.academicPeriodId !== null
      ? intake.academicPeriodId._id
      : String(intake?.academicPeriodId || ''),
  );
  const [programId, setProgramId] = React.useState(
    typeof intake?.programId === 'object' && intake?.programId !== null
      ? intake.programId._id
      : String(intake?.programId || ''),
  );
  const [levelId, setLevelId] = React.useState(
    typeof intake?.levelId === 'object' && intake?.levelId !== null
      ? intake.levelId._id
      : String(intake?.levelId || ''),
  );
  const [startDate, setStartDate] = React.useState(
    intake?.startDate ? intake.startDate.slice(0, 10) : '',
  );
  const [endDate, setEndDate] = React.useState(intake?.endDate ? intake.endDate.slice(0, 10) : '');
  const [capacity, setCapacity] = React.useState<number>(intake?.capacity || 30);
  const [status, setStatus] = React.useState<IntakeStatus>(intake?.status || 'open');

  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [academicYears, setAcademicYears] = React.useState<AcademicYearItem[]>([]);
  const [periods, setPeriods] = React.useState<AcademicPeriod[]>([]);
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [levels, setLevels] = React.useState<Level[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const createMutation = useCreateIntakeMutation();
  const updateMutation = useUpdateIntakeMutation();

  React.useEffect(() => {
    Promise.all([
      getBranches({ limit: 50 }),
      getAcademicYears(),
      getPrograms({ limit: 50 }),
      getLevels({ limit: 50 }),
    ])
      .then(([branchesRes, yearsRes, progsRes, levelsRes]) => {
        setBranches(branchesRes.data || []);
        setAcademicYears(yearsRes || []);
        setPrograms(progsRes.data || []);
        setLevels(levelsRes.data || []);

        if (!branchId && branchesRes.data?.length > 0) {
          setBranchId(branchesRes.data[0]._id);
        }
        if (!academicYearId && yearsRes.length > 0) {
          const curr = yearsRes.find((y) => y.isCurrent) || yearsRes[0];
          setAcademicYearId(curr._id);
        }
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Failed to load options';
        setError(message);
      });
  }, [academicYearId, branchId]);

  React.useEffect(() => {
    if (academicYearId) {
      getAcademicPeriods({ academicYearId, limit: 50 })
        .then((res) => {
          setPeriods(res.data || []);
          if (!academicPeriodId && res.data && res.data.length > 0) {
            setAcademicPeriodId(res.data[0]._id);
          }
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : 'Failed to load periods';
          setError(message);
        });
    }
  }, [academicYearId, academicPeriodId]);

  const filteredLevels = React.useMemo(() => {
    if (!programId) return levels;
    return levels.filter((lvl) => {
      const pid =
        typeof lvl.programId === 'object' && lvl.programId !== null
          ? lvl.programId._id
          : lvl.programId;
      return String(pid) === String(programId);
    });
  }, [levels, programId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !code ||
      !name ||
      !branchId ||
      !academicYearId ||
      !academicPeriodId ||
      !programId ||
      !levelId ||
      !startDate ||
      !endDate
    ) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setError(null);
      const payload: CreateIntakeInput = {
        code,
        name,
        branchId,
        academicYearId,
        academicPeriodId,
        programId,
        levelId,
        startDate,
        endDate,
        capacity: Number(capacity),
        status,
      };

      if (intake) {
        await updateMutation.mutateAsync({ id: intake._id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save offering';
      setError(message);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            {t.nav.branches} <span className="text-red-500">*</span>
          </label>
          <Select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          >
            <option value="">{t.common.selectBranch}</option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.branchNameEn} ({b.branchCode})
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            {t.academicYears.title} <span className="text-red-500">*</span>
          </label>
          <Select
            value={academicYearId}
            onChange={(e) => setAcademicYearId(e.target.value)}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          >
            <option value="">{t.intakes.selectYear}</option>
            {academicYears.map((y) => (
              <option key={y._id} value={y._id}>
                {y.name} ({y.code})
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600">
          {t.intakes.periodTerm} <span className="text-red-500">*</span>
        </label>
        <Select
          value={academicPeriodId}
          onChange={(e) => setAcademicPeriodId(e.target.value)}
          className="border-slate-300 shadow-none focus:border-[#023e8a]"
        >
          <option value="">{t.intakes.selectPeriod}</option>
          {periods.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} [{p.type}]
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            {t.programs.title} <span className="text-red-500">*</span>
          </label>
          <Select
            value={programId}
            onChange={(e) => {
              setProgramId(e.target.value);
              setLevelId('');
            }}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          >
            <option value="">{t.intakes.selectProgram}</option>
            {programs.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nameEn} ({p.code})
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            {t.levels.title} <span className="text-red-500">*</span>
          </label>
          <Select
            value={levelId}
            onChange={(e) => setLevelId(e.target.value)}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          >
            <option value="">{t.intakes.selectLevel}</option>
            {filteredLevels.map((l) => (
              <option key={l._id} value={l._id}>
                {l.name} ({l.code})
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            {t.intakes.intakeCode} <span className="text-red-500">*</span>
          </label>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. INT-2026-T1-ENG"
            required
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            {t.intakes.intakeName} <span className="text-red-500">*</span>
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. August 2026 Term 1 English Intake"
            required
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            {t.intakes.startDate} <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            {t.intakes.endDate} <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            {t.intakes.capacity}
          </label>
          <Input
            type="number"
            min={1}
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            {t.common.status}
          </label>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as IntakeStatus)}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          >
            <option value="open">{t.intakes.openStatus}</option>
            <option value="planned">{t.intakes.planned}</option>
            <option value="closed">{t.intakes.closedStatus}</option>
            <option value="archived">{t.intakes.archivedStatus}</option>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-slate-300 shadow-none"
        >
          {t.common.cancel}
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#023e8a] text-white shadow-none hover:bg-[#00509d]"
        >
          {isSubmitting
            ? t.common.submitting
            : intake
              ? t.intakes.updateOffering
              : t.intakes.createOffering}
        </Button>
      </div>
    </form>
  );
};

export const IntakeDialog: React.FC<IntakeDialogProps> = ({ open, onOpenChange, intake }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border border-slate-200 bg-white p-6 shadow-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#023e8a]">
            {intake ? t.intakes.editOffering : t.intakes.createOffering}
          </DialogTitle>
        </DialogHeader>

        {open && (
          <IntakeFormContent
            key={intake?._id || 'new'}
            intake={intake}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
