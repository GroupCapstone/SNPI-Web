'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Briefcase, Building2, User } from '@/components/icons';
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
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useDepartmentsQuery } from '@/features/departments/hooks/use-departments';
import { usePositionsQuery } from '@/features/positions/hooks/use-positions';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import { useTranslation } from '@/lib/i18n';

import { useCreateEmployeeMutation, useUpdateEmployeeMutation } from '../hooks/use-employees';
import type { EmployeeFormData } from '../schemas';
import { employeeFormSchema } from '../schemas';
import type { Employee } from '../types';

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  defaultBranchId?: string;
  defaultDepartmentId?: string;
}

export const EmployeeDialog = ({
  open,
  onOpenChange,
  employee,
  defaultBranchId,
  defaultDepartmentId,
}: EmployeeDialogProps) => {
  const { t } = useTranslation();
  const isEdit = Boolean(employee);
  const createMutation = useCreateEmployeeMutation();
  const updateMutation = useUpdateEmployeeMutation();

  const { data: schoolsData } = useSchoolsQuery({ limit: 50 });
  const schools = React.useMemo(() => schoolsData?.data ?? [], [schoolsData?.data]);

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      schoolId: '',
      branchId: defaultBranchId ?? '',
      departmentId: defaultDepartmentId ?? '',
      positionId: '',
      employeeId: '',
      legacyEmployeeNumber: '',
      firstName: '',
      lastName: '',
      khmerName: '',
      gender: 'male',
      dateOfBirth: '',
      nationality: 'Cambodian',
      ethnicity: 'Khmer',
      nationalIdNumber: '',
      maritalStatus: 'single',
      numberOfChildren: 0,
      primaryPhone: '',
      secondaryPhone: '',
      phone: '',
      email: '',
      address: '',
      photo: '',
      educationLevel: 'bachelor',
      major: '',
      foreignLanguages: [],
      otherSkills: [],
      workExperienceSummary: '',
      employmentType: 'full_time',
      joiningDate: new Date().toISOString().substring(0, 10),
      status: 'active',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedSchoolId = watchedValues.schoolId;
  const selectedBranchId = watchedValues.branchId;
  const selectedDepartmentId = watchedValues.departmentId;

  // Cascading query: branches filtered by selected school
  const { data: branchesData } = useBranchesQuery({
    schoolId: selectedSchoolId || undefined,
    limit: 100,
  });
  const filteredBranches = React.useMemo(() => branchesData?.data ?? [], [branchesData]);

  // Cascading query: departments filtered by selected branch
  const { data: departmentsData } = useDepartmentsQuery({
    branchId: selectedBranchId || undefined,
    limit: 100,
  });
  const filteredDepartments = React.useMemo(() => departmentsData?.data ?? [], [departmentsData]);

  // Cascading query: positions filtered by selected department
  const { data: positionsData } = usePositionsQuery({
    departmentId: selectedDepartmentId || undefined,
    limit: 100,
  });
  const filteredPositions = React.useMemo(() => positionsData?.data ?? [], [positionsData]);

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (employee) {
      const schId =
        typeof employee.schoolId === 'object' && employee.schoolId !== null
          ? employee.schoolId._id
          : String(employee.schoolId);

      const brId =
        typeof employee.branchId === 'object' && employee.branchId !== null
          ? employee.branchId._id
          : String(employee.branchId);

      const depId =
        typeof employee.departmentId === 'object' && employee.departmentId !== null
          ? employee.departmentId._id
          : String(employee.departmentId);

      const posId =
        typeof employee.positionId === 'object' && employee.positionId !== null
          ? employee.positionId._id
          : String(employee.positionId);

      reset({
        schoolId: schId,
        branchId: brId,
        departmentId: depId,
        positionId: posId,
        employeeId: employee.employeeId,
        legacyEmployeeNumber: employee.legacyEmployeeNumber ?? '',
        firstName: employee.firstName,
        lastName: employee.lastName,
        khmerName: employee.khmerName,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.substring(0, 10) : '',
        nationality: employee.nationality ?? 'Cambodian',
        ethnicity: employee.ethnicity ?? 'Khmer',
        nationalIdNumber: employee.nationalIdNumber ?? '',
        maritalStatus: employee.maritalStatus ?? 'single',
        numberOfChildren: employee.numberOfChildren ?? 0,
        primaryPhone: employee.primaryPhone ?? employee.phone ?? '',
        secondaryPhone: employee.secondaryPhone ?? '',
        phone: employee.phone ?? '',
        email: employee.email ?? '',
        address: employee.address ?? '',
        photo: employee.photo ?? '',
        educationLevel: employee.educationLevel ?? 'bachelor',
        major: employee.major ?? '',
        foreignLanguages: employee.foreignLanguages ?? [],
        otherSkills: employee.otherSkills ?? [],
        workExperienceSummary: employee.workExperienceSummary ?? '',
        employmentType: employee.employmentType ?? 'full_time',
        joiningDate: employee.joiningDate
          ? employee.joiningDate.substring(0, 10)
          : new Date().toISOString().substring(0, 10),
        status: employee.status,
      });
    } else {
      const initialSchool = schools[0]?._id || '';
      reset({
        schoolId: initialSchool,
        branchId: defaultBranchId ?? '',
        departmentId: defaultDepartmentId ?? '',
        positionId: '',
        employeeId: '',
        legacyEmployeeNumber: '',
        firstName: '',
        lastName: '',
        khmerName: '',
        gender: 'male',
        dateOfBirth: '',
        nationality: 'Cambodian',
        ethnicity: 'Khmer',
        nationalIdNumber: '',
        maritalStatus: 'single',
        numberOfChildren: 0,
        primaryPhone: '',
        secondaryPhone: '',
        phone: '',
        email: '',
        address: '',
        photo: '',
        educationLevel: 'bachelor',
        major: '',
        foreignLanguages: [],
        otherSkills: [],
        workExperienceSummary: '',
        employmentType: 'full_time',
        joiningDate: new Date().toISOString().substring(0, 10),
        status: 'active',
      });
    }
  }, [open, employee, defaultBranchId, defaultDepartmentId, schools, reset]);

  // When school changes: reset branch, department, and position
  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSchoolId = e.target.value;
    setValue('schoolId', newSchoolId);
    setValue('branchId', '');
    setValue('departmentId', '');
    setValue('positionId', '');
  };

  // When branch changes: reset department and position
  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBranchId = e.target.value;
    setValue('branchId', newBranchId);
    setValue('departmentId', '');
    setValue('positionId', '');
  };

  // When department changes: reset position
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDeptId = e.target.value;
    setValue('departmentId', newDeptId);
    setValue('positionId', '');
  };

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && employee) {
        await updateMutation.mutateAsync({ id: employee._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save employee master record';
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
      <DialogContent className="max-w-4xl lg:max-w-5xl" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t.employee.dialogTitleEdit : t.employee.dialogTitleAdd}
          </DialogTitle>
          <DialogDescription>{t.employee.dialogSubtitle}</DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-5">
          {/* Section 1: Organizational Hierarchy */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <Building2 className="size-3.5 text-[#00509d]" />
              <span>{t.employee.organizationalPlacement}</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.branch.school} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('schoolId')}
                  value={watchedValues.schoolId || ''}
                  onChange={handleSchoolChange}
                  error={Boolean(errors.schoolId)}
                >
                  <option value="">{t.branch.selectSchool}</option>
                  {schools.map((sch) => (
                    <option key={sch._id} value={sch._id}>
                      {sch.code}
                    </option>
                  ))}
                </Select>
                {errors.schoolId && (
                  <p className="mt-1 text-xs text-rose-600">{errors.schoolId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.department.branch} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('branchId')}
                  value={watchedValues.branchId || ''}
                  onChange={handleBranchChange}
                  disabled={!selectedSchoolId || filteredBranches.length === 0}
                  error={Boolean(errors.branchId)}
                >
                  <option value="">
                    {!selectedSchoolId
                      ? t.branch.selectSchool
                      : filteredBranches.length === 0
                        ? t.branch.noBranchesFound
                        : t.department.selectBranch}
                  </option>
                  {filteredBranches.map((br) => (
                    <option key={br._id} value={br._id}>
                      {br.branchCode}
                    </option>
                  ))}
                </Select>
                {errors.branchId && (
                  <p className="mt-1 text-xs text-rose-600">{errors.branchId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.position.department} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('departmentId')}
                  value={watchedValues.departmentId || ''}
                  onChange={handleDepartmentChange}
                  disabled={!selectedBranchId || filteredDepartments.length === 0}
                  error={Boolean(errors.departmentId)}
                >
                  <option value="">
                    {!selectedBranchId
                      ? t.department.selectBranch
                      : filteredDepartments.length === 0
                        ? t.department.noDepartmentsFound
                        : t.position.selectDepartment}
                  </option>
                  {filteredDepartments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.code}
                    </option>
                  ))}
                </Select>
                {errors.departmentId && (
                  <p className="mt-1 text-xs text-rose-600">{errors.departmentId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.position} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('positionId')}
                  value={watchedValues.positionId || ''}
                  onChange={(e) => setValue('positionId', e.target.value)}
                  disabled={!selectedDepartmentId || filteredPositions.length === 0}
                  error={Boolean(errors.positionId)}
                >
                  <option value="">
                    {!selectedDepartmentId
                      ? t.position.selectDepartment
                      : filteredPositions.length === 0
                        ? t.position.noPositionsFound
                        : t.employee.position}
                  </option>
                  {filteredPositions.map((pos) => (
                    <option key={pos._id} value={pos._id}>
                      {pos.code} — {pos.nameEn}
                    </option>
                  ))}
                </Select>
                {errors.positionId && (
                  <p className="mt-1 text-xs text-rose-600">{errors.positionId.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Personal Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <User className="size-3.5 text-[#00509d]" />
              <span>{t.employee.personalIdentity}</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.firstName} <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register('firstName')}
                  placeholder="e.g. Dara"
                  error={Boolean(errors.firstName)}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-rose-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.lastName} <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register('lastName')}
                  placeholder="e.g. Sok"
                  error={Boolean(errors.lastName)}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-rose-600">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.khmerName} <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register('khmerName')}
                  placeholder="e.g. សុខ តារា"
                  error={Boolean(errors.khmerName)}
                />
                {errors.khmerName && (
                  <p className="mt-1 text-xs text-rose-600">{errors.khmerName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.gender} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('gender')}
                  value={watchedValues.gender || 'male'}
                  onChange={(e) =>
                    setValue('gender', e.target.value as 'male' | 'female' | 'other')
                  }
                >
                  <option value="male">{t.employee.genderMale}</option>
                  <option value="female">{t.employee.genderFemale}</option>
                  <option value="other">{t.employee.genderOther}</option>
                </Select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.dateOfBirth} <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="date"
                  {...register('dateOfBirth')}
                  error={Boolean(errors.dateOfBirth)}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-xs text-rose-600">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.phone}
                </label>
                <Input {...register('primaryPhone')} placeholder="+855 12 345 678" />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.email}
                </label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="name@snp.edu.kh"
                  error={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Employment Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <Briefcase className="size-3.5 text-[#00509d]" />
              <span>{t.employee.employmentParams}</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.employmentType} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('employmentType')}
                  value={watchedValues.employmentType || 'full_time'}
                  onChange={(e) =>
                    setValue(
                      'employmentType',
                      e.target.value as
                        | 'full_time'
                        | 'part_time'
                        | 'contract'
                        | 'intern'
                        | 'temporary'
                        | 'probation',
                    )
                  }
                >
                  <option value="full_time">{t.employee.fullTime}</option>
                  <option value="part_time">{t.employee.partTime}</option>
                  <option value="contract">{t.employee.contract}</option>
                  <option value="intern">Intern</option>
                  <option value="temporary">Temporary</option>
                  <option value="probation">Probation</option>
                </Select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.joiningDate} <span className="text-rose-500">*</span>
                </label>
                <Input type="date" {...register('joiningDate')} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.employee.status} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('status')}
                  value={watchedValues.status || 'active'}
                  onChange={(e) =>
                    setValue(
                      'status',
                      e.target.value as
                        | 'active'
                        | 'inactive'
                        | 'on_leave'
                        | 'suspended'
                        | 'resigned'
                        | 'terminated',
                    )
                  }
                >
                  <option value="active">{t.common.active}</option>
                  <option value="inactive">{t.common.inactive}</option>
                  <option value="on_leave">On Leave</option>
                  <option value="suspended">Suspended</option>
                  <option value="resigned">Resigned</option>
                  <option value="terminated">Terminated</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.employee.address}
              </label>
              <Textarea
                {...register('address')}
                placeholder="Street address, Khan / District, Province / City..."
                rows={2}
              />
            </div>
          </div>

          <DialogFooter className="border-t border-slate-100 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {t.dialogs.cancel}
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#023e8a] hover:bg-[#00509d]">
              {isLoading
                ? t.dialogs.saving
                : isEdit
                  ? t.dialogs.saveChanges
                  : t.employee.addEmployee}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
