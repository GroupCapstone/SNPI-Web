'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import type {
  AcademicPeriod,
  CreateAcademicPeriodInput,
  AcademicPeriodType,
  AcademicPeriodStatus,
} from '../types';
import {
  useCreateAcademicPeriodMutation,
  useUpdateAcademicPeriodMutation,
} from '../hooks/use-academic-periods';
import {
  getAcademicYears,
  type AcademicYearItem,
} from '@/features/academic-years/api/get-academic-years';

interface AcademicPeriodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  period?: AcademicPeriod | null;
}

const AcademicPeriodFormContent: React.FC<{
  period?: AcademicPeriod | null;
  onClose: () => void;
}> = ({ period, onClose }) => {
  const [code, setCode] = React.useState(period?.code || '');
  const [name, setName] = React.useState(period?.name || '');
  const [type, setType] = React.useState<AcademicPeriodType>(period?.type || 'TERM');
  const [academicYearId, setAcademicYearId] = React.useState(
    typeof period?.academicYearId === 'object' && period?.academicYearId !== null
      ? period.academicYearId._id
      : String(period?.academicYearId || ''),
  );
  const [startDate, setStartDate] = React.useState(
    period?.startDate ? period.startDate.slice(0, 10) : '',
  );
  const [endDate, setEndDate] = React.useState(period?.endDate ? period.endDate.slice(0, 10) : '');
  const [sequence, setSequence] = React.useState(period?.sequence || 1);
  const [status, setStatus] = React.useState<AcademicPeriodStatus>(period?.status || 'active');
  const [academicYears, setAcademicYears] = React.useState<AcademicYearItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const createMutation = useCreateAcademicPeriodMutation();
  const updateMutation = useUpdateAcademicPeriodMutation();

  React.useEffect(() => {
    getAcademicYears()
      .then((years) => {
        setAcademicYears(years);
        if (!academicYearId && years.length > 0) {
          const current = years.find((y) => y.isCurrent) || years[0];
          setAcademicYearId(current._id);
        }
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Failed to load academic years';
        setError(message);
      });
  }, [academicYearId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name || !academicYearId || !startDate || !endDate) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setError(null);
      const payload: CreateAcademicPeriodInput = {
        code,
        name,
        type,
        academicYearId,
        startDate,
        endDate,
        sequence: Number(sequence),
        status,
      };

      if (period) {
        await updateMutation.mutateAsync({ id: period._id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save academic period';
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
            Period Code <span className="text-red-500">*</span>
          </label>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. TERM-1-2026"
            required
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Period Type <span className="text-red-500">*</span>
          </label>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as AcademicPeriodType)}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          >
            <option value="TERM">Term (e.g. 4-month / 3-month)</option>
            <option value="SHORT_COURSE">Short Course (e.g. 1-month)</option>
            <option value="MONTHLY">Monthly Rolling Intake</option>
            <option value="CUSTOM">Custom Period</option>
          </Select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600">
          Period Name <span className="text-red-500">*</span>
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Term 1 (Aug–Nov 2026)"
          required
          className="border-slate-300 shadow-none focus:border-[#023e8a]"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600">
          Academic Year <span className="text-red-500">*</span>
        </label>
        <Select
          value={academicYearId}
          onChange={(e) => setAcademicYearId(e.target.value)}
          className="border-slate-300 shadow-none focus:border-[#023e8a]"
        >
          {academicYears.map((y) => (
            <option key={y._id} value={y._id}>
              {y.name} ({y.code})
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Start Date <span className="text-red-500">*</span>
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
            End Date <span className="text-red-500">*</span>
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
          <label className="mb-1 block text-xs font-semibold text-slate-600">Sequence Order</label>
          <Input
            type="number"
            min={1}
            value={sequence}
            onChange={(e) => setSequence(Number(e.target.value))}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Status</label>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as AcademicPeriodStatus)}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          >
            <option value="active">Active</option>
            <option value="planned">Planned</option>
            <option value="completed">Completed</option>
            <option value="inactive">Inactive</option>
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
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#023e8a] text-white shadow-none hover:bg-[#00509d]"
        >
          {isSubmitting ? 'Saving...' : period ? 'Update Period' : 'Create Period'}
        </Button>
      </div>
    </form>
  );
};

export const AcademicPeriodDialog: React.FC<AcademicPeriodDialogProps> = ({
  open,
  onOpenChange,
  period,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border border-slate-200 bg-white p-6 shadow-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#023e8a]">
            {period ? 'Edit Academic Period / Term' : 'Add Academic Period / Term'}
          </DialogTitle>
        </DialogHeader>

        {open && (
          <AcademicPeriodFormContent
            key={period?._id || 'new'}
            period={period}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
