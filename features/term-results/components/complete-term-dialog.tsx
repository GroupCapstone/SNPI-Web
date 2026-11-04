'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import type { TermResult } from '../types';
import { useCompleteTermMutation } from '../hooks/use-term-results';
import { getAcademicPeriods } from '@/features/academic-periods/api/academic-period-api';
import { getClasses } from '@/features/classes/api/class-api';
import type { AcademicPeriod } from '@/features/academic-periods/types';
import type { ClassItem } from '@/features/classes/types';

interface CompleteTermDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result?: TermResult | null;
}

const CompleteTermFormContent: React.FC<{
  result: TermResult;
  onClose: () => void;
}> = ({ result, onClose }) => {
  const [nextPeriodId, setNextPeriodId] = React.useState(result.nextPeriodId?._id || '');
  const [nextClassId, setNextClassId] = React.useState('');
  const [remarks, setRemarks] = React.useState(result.remarks || '');
  const [periods, setPeriods] = React.useState<AcademicPeriod[]>([]);
  const [classes, setClasses] = React.useState<ClassItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const completeMutation = useCompleteTermMutation();

  React.useEffect(() => {
    const yearId =
      typeof result.academicYearId === 'object' && result.academicYearId !== null
        ? result.academicYearId._id
        : String(result.academicYearId);

    getAcademicPeriods({ academicYearId: yearId, limit: 50 })
      .then((res) => {
        setPeriods(res.data || []);
        if (!nextPeriodId && res.data && res.data.length > 0) {
          setNextPeriodId(res.data[0]._id);
        }
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Failed to load periods';
        setError(message);
      });

    const branchId =
      typeof result.branchId === 'object' && result.branchId !== null
        ? result.branchId._id
        : String(result.branchId);

    const targetLevelId =
      result.nextLevelId?._id ||
      (typeof result.levelId === 'object' && result.levelId !== null
        ? result.levelId._id
        : String(result.levelId));

    getClasses({ branchId, levelId: targetLevelId, limit: 50 })
      .then((res) => {
        setClasses(res.data || []);
        if (res.data && res.data.length > 0) {
          setNextClassId(res.data[0]._id);
        }
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Failed to load classes';
        setError(message);
      });
  }, [result, nextPeriodId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null);
      await completeMutation.mutateAsync({
        id: result._id,
        data: {
          nextPeriodId: nextPeriodId || undefined,
          nextClassId: nextClassId || undefined,
          remarks: remarks || undefined,
        },
      });

      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to complete term';
      setError(message);
    }
  };

  const studentName =
    result.studentId?.khmerName || result.studentId?.englishName || result.studentId?.studentId;

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-slate-500">Student:</span>
          <span className="font-semibold text-slate-900">
            {studentName} ({result.studentId?.studentId})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-slate-500">Final Average / GPA:</span>
          <span className="font-bold text-[#023e8a]">
            {result.averageScore}% ({result.letterGrade} / GPA {result.gpa})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-slate-500">Result Status:</span>
          <span
            className={`font-bold ${result.resultStatus === 'PASSED' ? 'text-emerald-700' : 'text-red-700'}`}
          >
            {result.resultStatus} ({result.promotionStatus})
          </span>
        </div>
        {result.nextLevelId && (
          <div className="flex justify-between">
            <span className="font-medium text-slate-500">Target Next Level:</span>
            <span className="font-semibold text-slate-900">
              {result.nextLevelId.name} ({result.nextLevelId.code})
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Select Next Academic Period / Term
          </label>
          <Select
            value={nextPeriodId}
            onChange={(e) => setNextPeriodId(e.target.value)}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          >
            <option value="">Select Period</option>
            {periods.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} [{p.type}]
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Assign Next Class
          </label>
          <Select
            value={nextClassId}
            onChange={(e) => setNextClassId(e.target.value)}
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.className} ({c.classCode})
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Completion Remarks
          </label>
          <Input
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="e.g. Promoted to Level 2 based on excellent test evaluation"
            className="border-slate-300 shadow-none focus:border-[#023e8a]"
          />
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
            disabled={completeMutation.isPending}
            className="bg-emerald-700 text-white shadow-none hover:bg-emerald-800"
          >
            {completeMutation.isPending ? 'Processing...' : 'Complete Term & Enroll Next'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export const CompleteTermDialog: React.FC<CompleteTermDialogProps> = ({
  open,
  onOpenChange,
  result,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border border-slate-200 bg-white p-6 shadow-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#023e8a]">
            Process Term Completion & Progression
          </DialogTitle>
        </DialogHeader>

        {open && result && (
          <CompleteTermFormContent
            key={result._id}
            result={result}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
