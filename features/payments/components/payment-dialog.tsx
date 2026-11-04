'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Receipt } from '@/components/icons';
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
import { Textarea } from '@/components/ui/textarea';
import type { AcademicYearItem } from '@/features/academic-years/hooks/use-academic-years';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import { useStudentsQuery } from '@/features/students/hooks/use-students';
import { useTuitionFeesQuery } from '@/features/tuition/hooks/use-tuition';
import { useDiscountPoliciesQuery } from '@/features/finance-operations/hooks/use-finance-operations';
import { formatCurrency } from '@/lib/formatters';

import { useCreatePaymentMutation, useUpdatePaymentMutation } from '../hooks/use-payments';
import type { PaymentFormData } from '../schemas';
import { paymentFormSchema } from '../schemas';
import type { Payment } from '../types';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment?: Payment | null;
}

export const PaymentDialog = ({ open, onOpenChange, payment }: PaymentDialogProps) => {
  const isEdit = Boolean(payment);
  const createMutation = useCreatePaymentMutation();
  const updateMutation = useUpdatePaymentMutation();
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { data: schoolsData } = useSchoolsQuery();
  const schools = React.useMemo(() => schoolsData?.data ?? [], [schoolsData]);

  const {
    control,
    register,
    handleSubmit,
    reset,

    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      schoolId: '',
      branchId: '',
      academicYearId: '',
      studentId: '',
      tuitionFeeId: '',
      amountDue: 0,
      discountAmount: 0,
      discountPolicyId: '',
      discountReason: '',
      amountPaid: 0,
      currency: 'USD',
      paymentMethod: 'cash',
      paymentType: 'tuition_monthly',
      billingYear: new Date().getFullYear(),
      billingMonth: new Date().getMonth() + 1,
      coveragePeriodLabel: '',
      paymentDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      transactionReference: '',
      remarks: '',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedSchoolId = watchedValues.schoolId;
  const selectedBranchId = watchedValues.branchId;
  const selectedTuitionFeeId = watchedValues.tuitionFeeId;
  const amountDue = watchedValues.amountDue || 0;
  const discountAmount = watchedValues.discountAmount || 0;
  const amountPaid = watchedValues.amountPaid || 0;
  const selectedPolicyId = watchedValues.discountPolicyId || '';

  const netPayable = Math.max(0, amountDue - discountAmount);
  const remainingBalance = Math.max(0, netPayable - amountPaid);

  const { data: branchesData } = useBranchesQuery({
    schoolId: selectedSchoolId || undefined,
  });
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData]);

  const { data: academicYearsData } = useAcademicYearsQuery();
  const academicYears = React.useMemo<AcademicYearItem[]>(
    () => (Array.isArray(academicYearsData) ? academicYearsData : []),
    [academicYearsData],
  );

  const { data: studentsData } = useStudentsQuery({
    branchId: selectedBranchId || undefined,
    limit: 100,
  });
  const students = React.useMemo(() => studentsData?.data ?? [], [studentsData]);

  const { data: tuitionFeesData } = useTuitionFeesQuery({
    branchId: selectedBranchId || undefined,
    status: 'active',
  });
  const tuitionFees = React.useMemo(() => tuitionFeesData?.data ?? [], [tuitionFeesData]);
  const { data: policiesData } = useDiscountPoliciesQuery(selectedBranchId || undefined);
  const policies = policiesData?.data ?? [];
  const selectedPolicy = policies.find((item) => item._id === selectedPolicyId);

  React.useEffect(() => {
    if (!open) return;

    if (payment) {
      reset({
        schoolId: payment.schoolId,
        branchId: typeof payment.branchId === 'object' ? payment.branchId._id : payment.branchId,
        academicYearId:
          typeof payment.academicYearId === 'object'
            ? payment.academicYearId._id
            : payment.academicYearId,
        studentId:
          typeof payment.studentId === 'object' ? payment.studentId._id : payment.studentId,
        tuitionFeeId:
          typeof payment.tuitionFeeId === 'object'
            ? payment.tuitionFeeId._id
            : payment.tuitionFeeId,
        amountDue: payment.amountDue,
        discountAmount: payment.discountAmount,
        discountPolicyId: payment.discountPolicyId ?? '',
        discountReason: payment.discountReason ?? '',
        amountPaid: payment.amountPaid,
        currency: payment.currency,
        paymentMethod: payment.paymentMethod,
        paymentType: payment.paymentType ?? 'tuition_monthly',
        billingYear:
          payment.billingYear ??
          (payment.dueDate ? new Date(payment.dueDate).getFullYear() : new Date().getFullYear()),
        billingMonth:
          payment.billingMonth ??
          (payment.dueDate ? new Date(payment.dueDate).getMonth() + 1 : new Date().getMonth() + 1),
        coveragePeriodLabel: payment.coveragePeriodLabel ?? '',
        paymentDate: payment.paymentDate
          ? new Date(payment.paymentDate).toISOString().split('T')[0]
          : '',
        dueDate: payment.dueDate
          ? new Date(payment.dueDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        transactionReference: payment.transactionReference ?? '',
        remarks: payment.remarks ?? '',
      });
    } else {
      reset({
        schoolId: schools[0]?._id ?? '',
        branchId: '',
        academicYearId: academicYears[0]?._id ?? '',
        studentId: '',
        tuitionFeeId: '',
        amountDue: 0,
        discountAmount: 0,
        discountPolicyId: '',
        discountReason: '',
        amountPaid: 0,
        currency: 'USD',
        paymentMethod: 'cash',
        paymentType: 'tuition_monthly',
        billingYear: new Date().getFullYear(),
        billingMonth: new Date().getMonth() + 1,
        coveragePeriodLabel: '',
        paymentDate: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
        transactionReference: '',
        remarks: '',
      });
    }
  }, [open, payment, reset, schools, academicYears]);

  React.useEffect(() => {
    if (!isEdit && selectedSchoolId && branches.length > 0 && !selectedBranchId) {
      setValue('branchId', branches[0]._id);
    }
  }, [isEdit, selectedSchoolId, branches, selectedBranchId, setValue]);

  // When tuition fee changes, auto-fill standard amount
  React.useEffect(() => {
    if (!isEdit && selectedTuitionFeeId) {
      const found = tuitionFees.find((t) => t._id === selectedTuitionFeeId);
      if (found) {
        setValue('amountDue', found.amount);
        setValue('amountPaid', found.amount);
        setValue('currency', found.currency);
      }
    }
  }, [isEdit, selectedTuitionFeeId, tuitionFees, setValue]);

  React.useEffect(() => {
    if (isEdit || !selectedPolicy) return;
    const calculated =
      selectedPolicy.calculationType === 'percentage'
        ? (amountDue * selectedPolicy.value) / 100
        : selectedPolicy.value;
    const discount = Math.min(
      amountDue,
      selectedPolicy.maximumAmount === undefined
        ? calculated
        : Math.min(calculated, selectedPolicy.maximumAmount),
    );
    setValue('discountAmount', discount);
    setValue('discountReason', `${selectedPolicy.name} (${selectedPolicy.code})`);
    setValue('amountPaid', Math.max(0, amountDue - discount));
  }, [amountDue, isEdit, selectedPolicy, setValue]);

  const onSubmit = async (data: PaymentFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && payment) {
        await updateMutation.mutateAsync({ id: payment._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to process payment';
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
      <DialogContent className="max-w-3xl" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Tuition Receipt Record' : 'Record Student Tuition Payment'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update payment status, transaction reference, and notes.'
              : 'Issue an official receipt (PAY-XXXXXX) and record student payment.'}
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5">
            <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-[#00509d] uppercase">
              <Receipt className="size-3.5" />
              <span>Campus & Student Account</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  School <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('schoolId')}
                  value={watchedValues.schoolId || ''}
                  onChange={(e) => {
                    setValue('schoolId', e.target.value);
                    setValue('branchId', '');
                    setValue('studentId', '');
                    setValue('tuitionFeeId', '');
                  }}
                  error={Boolean(errors.schoolId)}
                >
                  <option value="">Select School</option>
                  {schools.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.nameEn}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Branch <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('branchId')}
                  value={watchedValues.branchId || ''}
                  onChange={(e) => {
                    setValue('branchId', e.target.value);
                    setValue('studentId', '');
                    setValue('tuitionFeeId', '');
                  }}
                  error={Boolean(errors.branchId)}
                >
                  <option value="">Select Branch</option>
                  {branches.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.branchNameEn}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Academic Year <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('academicYearId')}
                  value={watchedValues.academicYearId || ''}
                  onChange={(e) => setValue('academicYearId', e.target.value)}
                  error={Boolean(errors.academicYearId)}
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((ay) => (
                    <option key={ay._id} value={ay._id}>
                      {ay.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Student <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('studentId')}
                  value={watchedValues.studentId || ''}
                  onChange={(e) => setValue('studentId', e.target.value)}
                  error={Boolean(errors.studentId)}
                >
                  <option value="">Select Student</option>
                  {students.map((st) => (
                    <option key={st._id} value={st._id}>
                      [{st.studentId}] {st.firstName} {st.lastName}
                      {st.khmerName ? ` (${st.khmerName})` : ''}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Fee Schedule <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('tuitionFeeId')}
                  value={watchedValues.tuitionFeeId || ''}
                  onChange={(e) => setValue('tuitionFeeId', e.target.value)}
                  error={Boolean(errors.tuitionFeeId)}
                >
                  <option value="">Select Tuition Fee</option>
                  {tuitionFees.map((tf) => (
                    <option key={tf._id} value={tf._id}>
                      {tf.feeName} — {formatCurrency(tf.amount, tf.currency)} ({tf.billingCycle})
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Pricing & Ledger Balance Calculation */}
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-3.5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Fee Due Amount <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('amountDue', { valueAsNumber: true })}
                  min={0}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Discount Policy
                </label>
                <Select
                  {...register('discountPolicyId')}
                  value={selectedPolicyId}
                  onChange={(event) => {
                    setValue('discountPolicyId', event.target.value);
                    if (!event.target.value) setValue('discountAmount', 0);
                  }}
                >
                  <option value="">Manual / No Discount</option>
                  {policies
                    .filter((item) => item.status === 'active')
                    .map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.code} - {item.name}
                      </option>
                    ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Amount Paid <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('amountPaid', { valueAsNumber: true })}
                  min={0}
                />
              </div>

              <div className="flex flex-col justify-end">
                <p className="text-xs font-medium text-slate-500">Remaining Balance</p>
                <p
                  className={`text-lg font-bold ${remainingBalance === 0 ? 'text-emerald-700' : 'text-amber-700'}`}
                >
                  {formatCurrency(remainingBalance, watchedValues.currency || 'USD')}
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Discount / Scholarship Amount
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('discountAmount', { valueAsNumber: true })}
                  min={0}
                  readOnly={Boolean(selectedPolicyId)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Discount Reason
                </label>
                <Input
                  {...register('discountReason')}
                  placeholder="Required for a manual discount"
                  readOnly={Boolean(selectedPolicyId)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Payment Category
              </label>
              <Select
                {...register('paymentType')}
                value={watchedValues.paymentType || 'tuition_monthly'}
                onChange={(e) =>
                  setValue(
                    'paymentType',
                    e.target.value as
                      | 'tuition_monthly'
                      | 'tuition_term'
                      | 'registration_fee'
                      | 'uniform'
                      | 'books'
                      | 'other',
                  )
                }
              >
                <option value="tuition_monthly">Monthly Tuition</option>
                <option value="tuition_term">Term / Semester Tuition</option>
                <option value="registration_fee">Registration Fee</option>
                <option value="uniform">School Uniform</option>
                <option value="books">Books & Courseware</option>
                <option value="other">Other School Fee</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Coverage Month
              </label>
              <Select
                value={String(watchedValues.billingMonth || new Date().getMonth() + 1)}
                onChange={(e) => {
                  const m = Number(e.target.value);
                  setValue('billingMonth', m);
                  const y = watchedValues.billingYear || new Date().getFullYear();
                  const monthNames = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ];
                  setValue('coveragePeriodLabel', `${monthNames[m - 1]} ${y}`);
                }}
              >
                <option value="1">01 - January (មករា)</option>
                <option value="2">02 - February (កុម្ភៈ)</option>
                <option value="3">03 - March (មីនា)</option>
                <option value="4">04 - April (មេសា)</option>
                <option value="5">05 - May (ឧសភា)</option>
                <option value="6">06 - June (មិថុនា)</option>
                <option value="7">07 - July (កក្កដា)</option>
                <option value="8">08 - August (សីហា)</option>
                <option value="9">09 - September (កញ្ញា)</option>
                <option value="10">10 - October (តុលា)</option>
                <option value="11">11 - November (វិច្ឆិកា)</option>
                <option value="12">12 - December (ធ្នូ)</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Coverage Year</label>
              <Input
                type="number"
                min={2020}
                max={2050}
                value={watchedValues.billingYear || new Date().getFullYear()}
                onChange={(e) => {
                  const y = Number(e.target.value);
                  setValue('billingYear', y);
                  const m = watchedValues.billingMonth || new Date().getMonth() + 1;
                  const monthNames = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ];
                  setValue('coveragePeriodLabel', `${monthNames[m - 1]} ${y}`);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Payment Method <span className="text-rose-500">*</span>
              </label>
              <Select
                {...register('paymentMethod')}
                value={watchedValues.paymentMethod || 'cash'}
                onChange={(e) =>
                  setValue(
                    'paymentMethod',
                    e.target.value as 'cash' | 'aba_pay' | 'bank_transfer' | 'credit_card' | 'wing',
                  )
                }
              >
                <option value="cash">Cash (Counter)</option>
                <option value="aba_pay">ABA PAY (KHQR)</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="credit_card">Credit / Debit Card</option>
                <option value="wing">Wing Bank</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Payment Date</label>
              <Input type="date" {...register('paymentDate')} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Billing Month / Due Date
              </label>
              <Input type="date" {...register('dueDate')} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Bank / Txn Ref No.
              </label>
              <Input {...register('transactionReference')} placeholder="e.g. ABA-TXN-88239" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Receipt Notes / Memo
            </label>
            <Textarea
              {...register('remarks')}
              placeholder="Payer name, guardian notes, payment reason..."
              rows={2}
            />
          </div>

          <DialogFooter className="border-t border-slate-100 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#023e8a] hover:bg-[#00509d]">
              {isLoading ? 'Processing...' : isEdit ? 'Save Changes' : 'Issue Receipt & Record'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
