'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Building2, ClipboardList, User } from '@/components/icons';
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
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';

import {
  useCreateRegistrationMutation,
  useUpdateRegistrationMutation,
} from '../hooks/use-registrations';
import type { RegistrationFormData } from '../schemas';
import { registrationFormSchema } from '../schemas';
import type { Registration } from '../types';

interface RegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registration?: Registration | null;
  defaultBranchId?: string;
}

export const RegistrationDialog = ({
  open,
  onOpenChange,
  registration,
  defaultBranchId,
}: RegistrationDialogProps) => {
  const isEdit = Boolean(registration);
  const createMutation = useCreateRegistrationMutation();
  const updateMutation = useUpdateRegistrationMutation();
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { data: schoolsData } = useSchoolsQuery({ limit: 50 });
  const schools = React.useMemo(() => schoolsData?.data ?? [], [schoolsData?.data]);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      registrationNumber: '',
      schoolId: '',
      branchId: defaultBranchId || '',
      academicYearId: '',
      programId: '',
      firstName: '',
      lastName: '',
      khmerName: '',
      gender: 'male',
      dateOfBirth: '',
      phone: '',
      email: '',
      address: '',
      guardianName: '',
      guardianRelationship: 'parent',
      guardianPhone: '',
      status: 'registered',
      registrationDate: new Date().toISOString().split('T')[0],
      remarks: '',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedSchoolId = watchedValues.schoolId;

  const { data: branchesData } = useBranchesQuery({
    schoolId: selectedSchoolId || undefined,
    limit: 50,
  });
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const { data: academicYearsData } = useAcademicYearsQuery();
  const academicYears: AcademicYearItem[] = React.useMemo(
    () => (Array.isArray(academicYearsData) ? academicYearsData : []),
    [academicYearsData],
  );

  const { data: programsData } = useProgramsQuery({ limit: 50 });
  const programs = React.useMemo(() => programsData?.data ?? [], [programsData?.data]);

  React.useEffect(() => {
    if (open) {
      setSubmitError(null);
      if (registration) {
        reset({
          registrationNumber: registration.registrationNumber,
          schoolId:
            typeof registration.schoolId === 'object'
              ? registration.schoolId._id
              : registration.schoolId,
          branchId:
            typeof registration.branchId === 'object'
              ? registration.branchId._id
              : registration.branchId,
          academicYearId:
            typeof registration.academicYearId === 'object'
              ? registration.academicYearId._id
              : registration.academicYearId,
          programId:
            typeof registration.programId === 'object'
              ? registration.programId._id
              : registration.programId,
          firstName: registration.firstName,
          lastName: registration.lastName,
          khmerName: registration.khmerName,
          gender: registration.gender,
          dateOfBirth: registration.dateOfBirth
            ? new Date(registration.dateOfBirth).toISOString().split('T')[0]
            : '',
          phone: registration.phone,
          email: registration.email || '',
          address: registration.address || '',
          guardianName: registration.guardianName,
          guardianRelationship: registration.guardianRelationship,
          guardianPhone: registration.guardianPhone,
          status: registration.status,
          registrationDate: registration.registrationDate
            ? new Date(registration.registrationDate).toISOString().split('T')[0]
            : '',
          remarks: registration.remarks || '',
        });
      } else {
        const defaultSchool = schools.length > 0 ? schools[0]._id : '';
        const currentYear =
          academicYears.find((y: AcademicYearItem) => y.isCurrent) || academicYears[0];

        reset({
          registrationNumber: '',
          schoolId: defaultSchool,
          branchId: defaultBranchId || '',
          academicYearId: currentYear ? currentYear._id : '',
          programId: '',
          firstName: '',
          lastName: '',
          khmerName: '',
          gender: 'male',
          dateOfBirth: '',
          phone: '',
          email: '',
          address: '',
          guardianName: '',
          guardianRelationship: 'parent',
          guardianPhone: '',
          status: 'registered',
          registrationDate: new Date().toISOString().split('T')[0],
          remarks: '',
        });
      }
    }
  }, [open, registration, defaultBranchId, schools, academicYears, reset]);

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && registration) {
        await updateMutation.mutateAsync({
          id: registration._id,
          payload: data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'An error occurred while saving the registration';
      setSubmitError(errorMsg);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <ClipboardList className="size-5 text-[#00509d]" />
            <span>
              {isEdit ? 'Edit Student Registration' : 'New Student Admission Application'}
            </span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            {isEdit
              ? 'Update applicant details or admission progression status.'
              : 'Register a prospective student into the admissions and placement pipeline.'}
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-5">
          {/* Section 1: Campus Context */}
          <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <Building2 className="size-4 text-[#00509d]" />
              <span>Campus & Academic Term</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  School <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedSchoolId || ''}
                  onChange={(e) => {
                    setValue('schoolId', e.target.value);
                    setValue('branchId', '');
                  }}
                  disabled={isSubmitting || schools.length <= 1}
                >
                  <option value="">Select School</option>
                  {schools.map((sch) => (
                    <option key={sch._id} value={sch._id}>
                      {sch.nameEn}
                    </option>
                  ))}
                </Select>
                {errors.schoolId && (
                  <p className="mt-1 text-xs text-red-600">{errors.schoolId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Campus Branch <span className="text-red-500">*</span>
                </label>
                <Select
                  {...register('branchId')}
                  value={watchedValues.branchId || ''}
                  onChange={(e) => setValue('branchId', e.target.value)}
                  disabled={isSubmitting || !selectedSchoolId}
                >
                  <option value="">Select Branch</option>
                  {branches.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.branchNameEn} ({b.branchCode})
                    </option>
                  ))}
                </Select>
                {errors.branchId && (
                  <p className="mt-1 text-xs text-red-600">{errors.branchId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <Select
                  {...register('academicYearId')}
                  value={watchedValues.academicYearId || ''}
                  onChange={(e) => setValue('academicYearId', e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="">Select Year</option>
                  {academicYears.map((ay: AcademicYearItem) => (
                    <option key={ay._id} value={ay._id}>
                      {ay.name} {ay.isCurrent ? '(Current)' : ''}
                    </option>
                  ))}
                </Select>
                {errors.academicYearId && (
                  <p className="mt-1 text-xs text-red-600">{errors.academicYearId.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Desired Program <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('programId')}
                value={watchedValues.programId || ''}
                onChange={(e) => setValue('programId', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select Academic Program</option>
                {programs.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.nameEn} ({p.code})
                  </option>
                ))}
              </Select>
              {errors.programId && (
                <p className="mt-1 text-xs text-red-600">{errors.programId.message}</p>
              )}
            </div>
          </div>

          {/* Section 2: Student Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <User className="size-4 text-[#00509d]" />
              <span>Student Personal Details</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  First Name (EN) <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Bopha"
                  disabled={isSubmitting}
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Last Name (EN) <span className="text-red-500">*</span>
                </label>
                <Input placeholder="e.g. Kouy" disabled={isSubmitting} {...register('lastName')} />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Full Name (Khmer) <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. គុយ បុប្ផា"
                  disabled={isSubmitting}
                  {...register('khmerName')}
                />
                {errors.khmerName && (
                  <p className="mt-1 text-xs text-red-600">{errors.khmerName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Select
                  {...register('gender')}
                  value={watchedValues.gender || 'male'}
                  onChange={(e) =>
                    setValue('gender', e.target.value as 'male' | 'female' | 'other')
                  }
                  disabled={isSubmitting}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <Input type="date" disabled={isSubmitting} {...register('dateOfBirth')} />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-xs text-red-600">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Applicant Phone <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. 012334455"
                  disabled={isSubmitting}
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Guardian Details */}
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <User className="size-4 text-[#00509d]" />
              <span>Primary Guardian Information</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Guardian Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Kouy Vanna"
                  disabled={isSubmitting}
                  {...register('guardianName')}
                />
                {errors.guardianName && (
                  <p className="mt-1 text-xs text-red-600">{errors.guardianName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <Select
                  {...register('guardianRelationship')}
                  value={watchedValues.guardianRelationship || 'parent'}
                  onChange={(e) =>
                    setValue(
                      'guardianRelationship',
                      e.target.value as 'father' | 'mother' | 'parent' | 'guardian' | 'other',
                    )
                  }
                  disabled={isSubmitting}
                >
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="parent">Parent</option>
                  <option value="guardian">Guardian</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Guardian Phone <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. 012334455"
                  disabled={isSubmitting}
                  {...register('guardianPhone')}
                />
                {errors.guardianPhone && (
                  <p className="mt-1 text-xs text-red-600">{errors.guardianPhone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Admission Status & Remarks */}
          <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Admission Status <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('status')}
                value={watchedValues.status || 'registered'}
                onChange={(e) =>
                  setValue(
                    'status',
                    e.target.value as
                      | 'registered'
                      | 'placement_pending'
                      | 'placement_completed'
                      | 'enrollment_pending'
                      | 'enrolled'
                      | 'cancelled',
                  )
                }
                disabled={isSubmitting}
              >
                <option value="registered">Registered (New Inquiry)</option>
                <option value="placement_pending">Placement Pending</option>
                <option value="placement_completed">Placement Completed</option>
                <option value="enrollment_pending">Enrollment Pending</option>
                <option value="enrolled">Enrolled</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Registration Date <span className="text-red-500">*</span>
              </label>
              <Input type="date" disabled={isSubmitting} {...register('registrationDate')} />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Notes / Remarks</label>
            <Textarea
              placeholder="e.g. Placement test scheduled for next Monday, interested in morning shift"
              rows={2}
              disabled={isSubmitting}
              {...register('remarks')}
            />
          </div>

          <DialogFooter className="border-t border-slate-100 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#023e8a] text-white hover:bg-[#00509d]"
            >
              {isSubmitting ? 'Saving...' : isEdit ? 'Update Registration' : 'Submit Registration'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
