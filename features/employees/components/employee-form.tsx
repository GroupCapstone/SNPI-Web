'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Building2,
  CheckCircle2,
  Copy,
  FileText,
  Heart,
  Home,
  MapPin,
  Phone,
  Plus,
  Save,
  Trash2,
  User,
} from '@/components/icons';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useDepartmentsQuery } from '@/features/departments/hooks/use-departments';
import { usePositionsQuery } from '@/features/positions/hooks/use-positions';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';

import { useCreateEmployeeMutation, useUpdateEmployeeMutation } from '../hooks/use-employees';
import type { EmployeeFormData } from '../schemas';
import { employeeFormSchema } from '../schemas';
import type { Employee } from '../types';

interface EmployeeFormProps {
  initialData?: Employee | null;
  isEdit?: boolean;
}

type TabKey =
  | 'employment'
  | 'personal'
  | 'birthplace'
  | 'address'
  | 'contact'
  | 'education'
  | 'family'
  | 'documents';

const TABS: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'employment', label: '1. Employment', icon: Building2 },
  { key: 'personal', label: '2. Personal', icon: User },
  { key: 'birthplace', label: '3. Birthplace', icon: MapPin },
  { key: 'address', label: '4. Current Address', icon: Home },
  { key: 'contact', label: '5. Contact', icon: Phone },
  { key: 'education', label: '6. Education & Skills', icon: BookOpen },
  { key: 'family', label: '7. Family', icon: Heart },
  { key: 'documents', label: '8. Documents', icon: FileText },
];

export const EmployeeForm = ({ initialData, isEdit = false }: EmployeeFormProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<TabKey>('employment');
  const [formError, setFormError] = React.useState<string | null>(null);

  const createMutation = useCreateEmployeeMutation();
  const updateMutation = useUpdateEmployeeMutation();

  const { data: schoolsData } = useSchoolsQuery({ limit: 50 });
  const schools = React.useMemo(() => schoolsData?.data ?? [], [schoolsData?.data]);

  const defaultValues: EmployeeFormData = React.useMemo(() => {
    if (initialData) {
      const schId =
        typeof initialData.schoolId === 'object' && initialData.schoolId !== null
          ? initialData.schoolId._id
          : String(initialData.schoolId);

      const brId =
        typeof initialData.branchId === 'object' && initialData.branchId !== null
          ? initialData.branchId._id
          : String(initialData.branchId);

      const depId =
        typeof initialData.departmentId === 'object' && initialData.departmentId !== null
          ? initialData.departmentId._id
          : String(initialData.departmentId);

      const posId =
        typeof initialData.positionId === 'object' && initialData.positionId !== null
          ? initialData.positionId._id
          : String(initialData.positionId);

      return {
        schoolId: schId,
        branchId: brId,
        departmentId: depId,
        positionId: posId,
        employeeId: initialData.employeeId ?? '',
        legacyEmployeeNumber: initialData.legacyEmployeeNumber ?? '',
        firstName: initialData.firstName ?? '',
        lastName: initialData.lastName ?? '',
        khmerName: initialData.khmerName ?? '',
        gender: initialData.gender ?? 'male',
        dateOfBirth: initialData.dateOfBirth ? initialData.dateOfBirth.substring(0, 10) : '',
        nationality: initialData.nationality ?? 'Cambodian',
        ethnicity: initialData.ethnicity ?? 'Khmer',
        nationalIdNumber: initialData.nationalIdNumber ?? '',
        photo: initialData.photo ?? '',
        maritalStatus: initialData.maritalStatus ?? 'single',
        numberOfChildren: initialData.numberOfChildren ?? 0,
        birthplace: {
          province: initialData.birthplace?.province ?? '',
          district: initialData.birthplace?.district ?? '',
          commune: initialData.birthplace?.commune ?? '',
          village: initialData.birthplace?.village ?? '',
        },
        currentAddress: {
          province: initialData.currentAddress?.province ?? '',
          district: initialData.currentAddress?.district ?? '',
          commune: initialData.currentAddress?.commune ?? '',
          village: initialData.currentAddress?.village ?? '',
          additionalAddress: initialData.currentAddress?.additionalAddress ?? '',
        },
        address: initialData.address ?? '',
        primaryPhone: initialData.primaryPhone ?? initialData.phone ?? '',
        secondaryPhone: initialData.secondaryPhone ?? '',
        phone: initialData.phone ?? '',
        email: initialData.email ?? '',
        educationLevel: initialData.educationLevel ?? 'bachelor',
        major: initialData.major ?? '',
        foreignLanguages: initialData.foreignLanguages ?? [],
        otherSkills: initialData.otherSkills ?? [],
        workExperienceSummary: initialData.workExperienceSummary ?? '',
        father: {
          name: initialData.father?.name ?? '',
          age: initialData.father?.age ?? undefined,
          nationality: initialData.father?.nationality ?? 'Cambodian',
          ethnicity: initialData.father?.ethnicity ?? 'Khmer',
          livingStatus: initialData.father?.livingStatus ?? 'living',
          occupation: initialData.father?.occupation ?? '',
        },
        mother: {
          name: initialData.mother?.name ?? '',
          age: initialData.mother?.age ?? undefined,
          nationality: initialData.mother?.nationality ?? 'Cambodian',
          ethnicity: initialData.mother?.ethnicity ?? 'Khmer',
          livingStatus: initialData.mother?.livingStatus ?? 'living',
          occupation: initialData.mother?.occupation ?? '',
        },
        documents:
          initialData.documents?.map((doc) => ({
            documentType: doc.documentType,
            fileName: doc.fileName,
            fileUrl: doc.fileUrl,
            description: doc.description ?? '',
            status: doc.status ?? 'active',
          })) ?? [],
        employmentType: initialData.employmentType ?? 'full_time',
        joiningDate: initialData.joiningDate
          ? initialData.joiningDate.substring(0, 10)
          : new Date().toISOString().substring(0, 10),
        status: initialData.status ?? 'active',
      };
    }

    return {
      schoolId: '',
      branchId: '',
      departmentId: '',
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
      photo: '',
      maritalStatus: 'single',
      numberOfChildren: 0,
      birthplace: {
        province: '',
        district: '',
        commune: '',
        village: '',
      },
      currentAddress: {
        province: '',
        district: '',
        commune: '',
        village: '',
        additionalAddress: '',
      },
      address: '',
      primaryPhone: '',
      secondaryPhone: '',
      phone: '',
      email: '',
      educationLevel: 'bachelor',
      major: '',
      foreignLanguages: [],
      otherSkills: [],
      workExperienceSummary: '',
      father: {
        name: '',
        age: undefined,
        nationality: 'Cambodian',
        ethnicity: 'Khmer',
        livingStatus: 'living',
        occupation: '',
      },
      mother: {
        name: '',
        age: undefined,
        nationality: 'Cambodian',
        ethnicity: 'Khmer',
        livingStatus: 'living',
        occupation: '',
      },
      documents: [],
      employmentType: 'full_time',
      joiningDate: new Date().toISOString().substring(0, 10),
      status: 'active',
    };
  }, [initialData]);

  const {
    register,
    handleSubmit,

    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues,
  });
  const watchedValues = useWatch({ control });

  // Re-synchronize form when initialData loads or changes
  React.useEffect(() => {
    if (initialData) {
      reset(defaultValues);
    }
  }, [initialData, reset, defaultValues]);

  const {
    fields: docFields,
    append: appendDoc,
    remove: removeDoc,
  } = useFieldArray({
    control,
    name: 'documents',
  });

  const selectedSchoolId = watchedValues.schoolId;
  const selectedBranchId = watchedValues.branchId;
  const selectedDepartmentId = watchedValues.departmentId;
  const birthplaceData = watchedValues.birthplace;

  // Set default school on mount if creating
  React.useEffect(() => {
    if (!isEdit && !selectedSchoolId && schools.length > 0) {
      setValue('schoolId', schools[0]._id, { shouldValidate: true });
    }
  }, [isEdit, selectedSchoolId, schools, setValue]);

  // Cascading queries
  const { data: branchesData } = useBranchesQuery({
    schoolId: selectedSchoolId || undefined,
    limit: 100,
  });
  const filteredBranches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const { data: departmentsData } = useDepartmentsQuery({
    branchId: selectedBranchId || undefined,
    limit: 100,
  });
  const filteredDepartments = React.useMemo(
    () => departmentsData?.data ?? [],
    [departmentsData?.data],
  );

  const { data: positionsData } = usePositionsQuery({
    departmentId: selectedDepartmentId || undefined,
    limit: 100,
  });
  const filteredPositions = React.useMemo(() => positionsData?.data ?? [], [positionsData?.data]);

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setValue('schoolId', val, { shouldValidate: true, shouldDirty: true });
    setValue('branchId', '', { shouldValidate: true, shouldDirty: true });
    setValue('departmentId', '', { shouldValidate: true, shouldDirty: true });
    setValue('positionId', '', { shouldValidate: true, shouldDirty: true });
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setValue('branchId', val, { shouldValidate: true, shouldDirty: true });
    setValue('departmentId', '', { shouldValidate: true, shouldDirty: true });
    setValue('positionId', '', { shouldValidate: true, shouldDirty: true });
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setValue('departmentId', val, { shouldValidate: true, shouldDirty: true });
    setValue('positionId', '', { shouldValidate: true, shouldDirty: true });
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setValue('positionId', val, { shouldValidate: true, shouldDirty: true });
  };

  const copyBirthplaceToCurrentAddress = () => {
    setValue('currentAddress.province', birthplaceData?.province ?? '', { shouldDirty: true });
    setValue('currentAddress.district', birthplaceData?.district ?? '', { shouldDirty: true });
    setValue('currentAddress.commune', birthplaceData?.commune ?? '', { shouldDirty: true });
    setValue('currentAddress.village', birthplaceData?.village ?? '', { shouldDirty: true });
  };

  const [languageInput, setLanguageInput] = React.useState('');
  const currentLanguages = watchedValues.foreignLanguages ?? [];

  const handleAddLanguage = () => {
    if (languageInput.trim() && !currentLanguages.includes(languageInput.trim())) {
      setValue('foreignLanguages', [...currentLanguages, languageInput.trim()], {
        shouldDirty: true,
      });
      setLanguageInput('');
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    setValue(
      'foreignLanguages',
      currentLanguages.filter((l) => l !== lang),
      { shouldDirty: true },
    );
  };

  const [skillInput, setSkillInput] = React.useState('');
  const currentSkills = watchedValues.otherSkills ?? [];

  const handleAddSkill = () => {
    if (skillInput.trim() && !currentSkills.includes(skillInput.trim())) {
      setValue('otherSkills', [...currentSkills, skillInput.trim()], { shouldDirty: true });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setValue(
      'otherSkills',
      currentSkills.filter((s) => s !== skill),
      { shouldDirty: true },
    );
  };

  // Track errors per tab
  const tabErrors = React.useMemo(() => {
    const counts: Record<TabKey, number> = {
      employment: 0,
      personal: 0,
      birthplace: 0,
      address: 0,
      contact: 0,
      education: 0,
      family: 0,
      documents: 0,
    };

    const tabFields: Record<TabKey, Array<keyof EmployeeFormData>> = {
      employment: [
        'schoolId',
        'branchId',
        'departmentId',
        'positionId',
        'employmentType',
        'joiningDate',
        'status',
        'legacyEmployeeNumber',
        'employeeId',
      ],
      personal: [
        'khmerName',
        'firstName',
        'lastName',
        'gender',
        'dateOfBirth',
        'nationality',
        'ethnicity',
        'nationalIdNumber',
        'maritalStatus',
        'numberOfChildren',
        'photo',
      ],
      birthplace: ['birthplace'],
      address: ['currentAddress', 'address'],
      contact: ['primaryPhone', 'secondaryPhone', 'phone', 'email'],
      education: [
        'educationLevel',
        'major',
        'foreignLanguages',
        'otherSkills',
        'workExperienceSummary',
      ],
      family: ['father', 'mother'],
      documents: ['documents'],
    };

    for (const [tabKey, fields] of Object.entries(tabFields)) {
      for (const field of fields) {
        if (errors[field]) {
          counts[tabKey as TabKey] = (counts[tabKey as TabKey] || 0) + 1;
        }
      }
    }

    return counts;
  }, [errors]);

  const onValidationError = (fieldErrors: typeof errors) => {
    const keys = Object.keys(fieldErrors) as Array<keyof EmployeeFormData>;
    if (keys.length === 0) return;

    const tabPriority: TabKey[] = [
      'employment',
      'personal',
      'birthplace',
      'address',
      'contact',
      'education',
      'family',
      'documents',
    ];

    const tabFields: Record<TabKey, Array<keyof EmployeeFormData>> = {
      employment: [
        'schoolId',
        'branchId',
        'departmentId',
        'positionId',
        'employmentType',
        'joiningDate',
        'status',
        'legacyEmployeeNumber',
        'employeeId',
      ],
      personal: [
        'khmerName',
        'firstName',
        'lastName',
        'gender',
        'dateOfBirth',
        'nationality',
        'ethnicity',
        'nationalIdNumber',
        'maritalStatus',
        'numberOfChildren',
        'photo',
      ],
      birthplace: ['birthplace'],
      address: ['currentAddress', 'address'],
      contact: ['primaryPhone', 'secondaryPhone', 'phone', 'email'],
      education: [
        'educationLevel',
        'major',
        'foreignLanguages',
        'otherSkills',
        'workExperienceSummary',
      ],
      family: ['father', 'mother'],
      documents: ['documents'],
    };

    let firstInvalidTab: TabKey | null = null;
    const invalidTabs: string[] = [];

    for (const tab of tabPriority) {
      const hasError = tabFields[tab].some((f) => Boolean(fieldErrors[f]));
      if (hasError) {
        if (!firstInvalidTab) firstInvalidTab = tab;
        invalidTabs.push(tab.toUpperCase());
      }
    }

    if (firstInvalidTab) {
      setActiveTab(firstInvalidTab);
    }

    const firstMsg =
      fieldErrors[keys[0]]?.message ||
      (typeof fieldErrors[keys[0]] === 'object'
        ? JSON.stringify(fieldErrors[keys[0]])
        : 'Please review required fields');

    setFormError(
      `Please fix validation errors in section(s): ${invalidTabs.join(', ')}. Details: ${firstMsg}`,
    );
  };

  const onSubmit = async (data: EmployeeFormData) => {
    setFormError(null);
    try {
      // Filter out empty document placeholders
      const cleanedDocs = (data.documents || []).filter(
        (doc) => doc.fileName?.trim() || doc.fileUrl?.trim() || doc.description?.trim(),
      );
      const payload: EmployeeFormData = {
        ...data,
        documents: cleanedDocs,
      };

      if (isEdit && initialData) {
        await updateMutation.mutateAsync({ id: initialData._id, data: payload });
        router.push(`/employees/${initialData._id}`);
      } else {
        const created = await createMutation.mutateAsync(payload);
        router.push(`/employees/${created.data._id}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save employee record';
      setFormError(msg);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending || isSubmitting;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              router.push(initialData ? `/employees/${initialData._id}` : '/employees')
            }
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                {isEdit ? 'Edit Employee Master Record' : 'Register New Employee Master'}
              </h1>
              <Badge tone="neutral">SNPI HR Master</Badge>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              {isEdit
                ? `Updating information for ${initialData?.firstName} ${initialData?.lastName} (${initialData?.employeeId})`
                : 'Complete all 8 sections to create a standardized staff record.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/employees')}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit(onSubmit, onValidationError)}
            disabled={isLoading}
            className="bg-[#023e8a] hover:bg-[#00509d]"
          >
            <Save className="mr-1.5 size-4" />
            {isLoading ? 'Saving Record...' : isEdit ? 'Save Changes' : 'Save Employee Master'}
          </Button>
        </div>
      </div>

      {formError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-600" />
          <div>
            <span className="font-semibold text-rose-950">Submission Error</span>
            <p className="mt-0.5 text-rose-800">{formError}</p>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const errorCount = tabErrors[tab.key] || 0;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#023e8a] text-white'
                  : errorCount > 0
                    ? 'border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
              {errorCount > 0 && (
                <span className="ml-1 rounded-full bg-rose-600 px-1.5 py-0.5 text-xs font-bold text-white">
                  {errorCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-6">
        {/* TAB 1: EMPLOYMENT INFORMATION */}
        {activeTab === 'employment' && (
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                <Building2 className="size-4 text-[#00509d]" />
                Section 1 — Employment & Organizational Placement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    School Organization <span className="text-rose-500">*</span>
                  </label>
                  <Select
                    {...register('schoolId', { onChange: handleSchoolChange })}
                    value={watchedValues.schoolId || ''}
                    error={Boolean(errors.schoolId)}
                  >
                    <option value="">Select School</option>
                    {schools.map((sch) => (
                      <option key={sch._id} value={sch._id}>
                        {sch.code} · {sch.nameEn}
                      </option>
                    ))}
                  </Select>
                  {errors.schoolId && (
                    <p className="mt-1 text-xs text-rose-600">{errors.schoolId.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Campus Branch <span className="text-rose-500">*</span>
                  </label>
                  <Select
                    {...register('branchId', { onChange: handleBranchChange })}
                    value={watchedValues.branchId || ''}
                    disabled={!selectedSchoolId}
                    error={Boolean(errors.branchId)}
                  >
                    <option value="">
                      {!selectedSchoolId
                        ? 'Select School First'
                        : filteredBranches.length === 0
                          ? 'No branches available'
                          : 'Select Branch'}
                    </option>
                    {filteredBranches.map((br) => (
                      <option key={br._id} value={br._id}>
                        {br.branchCode} · {br.branchNameEn}
                      </option>
                    ))}
                  </Select>
                  {errors.branchId && (
                    <p className="mt-1 text-xs text-rose-600">{errors.branchId.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Department <span className="text-rose-500">*</span>
                  </label>
                  <Select
                    {...register('departmentId', { onChange: handleDepartmentChange })}
                    value={watchedValues.departmentId || ''}
                    disabled={!selectedBranchId}
                    error={Boolean(errors.departmentId)}
                  >
                    <option value="">
                      {!selectedBranchId
                        ? 'Select Branch First'
                        : filteredDepartments.length === 0
                          ? 'No departments'
                          : 'Select Department'}
                    </option>
                    {filteredDepartments.map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.code} · {dept.nameEn}
                      </option>
                    ))}
                  </Select>
                  {errors.departmentId && (
                    <p className="mt-1 text-xs text-rose-600">{errors.departmentId.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Position <span className="text-rose-500">*</span>
                  </label>
                  <Select
                    {...register('positionId', { onChange: handlePositionChange })}
                    value={watchedValues.positionId || ''}
                    disabled={!selectedDepartmentId}
                    error={Boolean(errors.positionId)}
                  >
                    <option value="">
                      {!selectedDepartmentId
                        ? 'Select Department First'
                        : filteredPositions.length === 0
                          ? 'No positions'
                          : 'Select Position'}
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Employment Type <span className="text-rose-500">*</span>
                  </label>
                  <Select
                    {...register('employmentType')}
                    value={watchedValues.employmentType || 'full_time'}
                  >
                    <option value="full_time">Full-Time</option>
                    <option value="part_time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="intern">Intern</option>
                    <option value="temporary">Temporary</option>
                    <option value="probation">Probation</option>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Joining Date <span className="text-rose-500">*</span>
                  </label>
                  <Input type="date" {...register('joiningDate')} />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Employee Status <span className="text-rose-500">*</span>
                  </label>
                  <Select {...register('status')} value={watchedValues.status || 'active'}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on_leave">On Leave</option>
                    <option value="suspended">Suspended</option>
                    <option value="resigned">Resigned</option>
                    <option value="terminated">Terminated</option>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Legacy Employee Number (Excel Ref)
                  </label>
                  <Input {...register('legacyEmployeeNumber')} placeholder="e.g. 001, LEG-025" />
                </div>
              </div>

              {!isEdit && (
                <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3 text-xs text-blue-900">
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="size-4 text-[#00509d]" />
                    <span>Automated Atomic Sequence ID</span>
                  </div>
                  <p className="mt-1 text-xs text-blue-700">
                    Employee ID is automatically generated in sequential format (e.g.{' '}
                    <code>EMP-000001</code>). You may optionally provide a custom code if migrating
                    specific records.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* TAB 2: PERSONAL INFORMATION */}
        {activeTab === 'personal' && (
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                <User className="size-4 text-[#00509d]" />
                Section 2 — Personal Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Khmer Full Name (ឈ្មោះខ្មែរ) <span className="text-rose-500">*</span>
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

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    First Name (Latin) <span className="text-rose-500">*</span>
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
                    Last Name (Latin) <span className="text-rose-500">*</span>
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
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Gender <span className="text-rose-500">*</span>
                  </label>
                  <Select {...register('gender')} value={watchedValues.gender || 'male'}>
                    <option value="male">Male (ប្រុស)</option>
                    <option value="female">Female (ស្រី)</option>
                    <option value="other">Other</option>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Date of Birth <span className="text-rose-500">*</span>
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
                    Nationality (សញ្ជាតិ)
                  </label>
                  <Input {...register('nationality')} placeholder="Cambodian" />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Ethnicity (ជនជាតិ)
                  </label>
                  <Input {...register('ethnicity')} placeholder="Khmer" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    National ID / Passport Number
                  </label>
                  <Input {...register('nationalIdNumber')} placeholder="e.g. 010203040" />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Marital Status
                  </label>
                  <Select
                    {...register('maritalStatus')}
                    value={watchedValues.maritalStatus || 'single'}
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Number of Children
                  </label>
                  <Input
                    type="number"
                    min={0}
                    {...register('numberOfChildren', { valueAsNumber: true })}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Profile Photo URL / Path
                  </label>
                  <Input {...register('photo')} placeholder="https://..." />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 3: BIRTHPLACE */}
        {activeTab === 'birthplace' && (
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                <MapPin className="size-4 text-[#00509d]" />
                Section 3 — Birthplace Details (ទីកន្លែងកំណើត)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Province / Capital (ខេត្ត/រាជធានី)
                  </label>
                  <Input
                    {...register('birthplace.province')}
                    placeholder="e.g. Battambang, Phnom Penh"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    District / Khan (ស្រុក/ខណ្ឌ)
                  </label>
                  <Input
                    {...register('birthplace.district')}
                    placeholder="e.g. Moung Ruessei, Tuol Kouk"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Commune / Sangkat (ឃុំ/សង្កាត់)
                  </label>
                  <Input
                    {...register('birthplace.commune')}
                    placeholder="e.g. Prey Touch, Boeng Kak 1"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Village / Phum (ភូមិ)
                  </label>
                  <Input {...register('birthplace.village')} placeholder="e.g. Phum 1, Phum Toul" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 4: CURRENT ADDRESS */}
        {activeTab === 'address' && (
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                <Home className="size-4 text-[#00509d]" />
                Section 4 — Current Residential Address (អាសយដ្ឋានបច្ចុប្បន្ន)
              </CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={copyBirthplaceToCurrentAddress}
                className="text-xs text-slate-600"
              >
                <Copy className="mr-1.5 size-3.5" />
                Same as Birthplace
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Province / Capital (ខេត្ត/រាជធានី)
                  </label>
                  <Input {...register('currentAddress.province')} placeholder="e.g. Phnom Penh" />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    District / Khan (ស្រុក/ខណ្ឌ)
                  </label>
                  <Input {...register('currentAddress.district')} placeholder="e.g. Tuol Kouk" />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Commune / Sangkat (ឃុំ/សង្កាត់)
                  </label>
                  <Input {...register('currentAddress.commune')} placeholder="e.g. Tuek L’ak 1" />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Village / Phum (ភូមិ)
                  </label>
                  <Input {...register('currentAddress.village')} placeholder="e.g. Phum 3" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  Street / House / Additional Address
                </label>
                <Input
                  {...register('currentAddress.additionalAddress')}
                  placeholder="e.g. #123, St 598, Borey Peng Huoth"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 5: CONTACT */}
        {activeTab === 'contact' && (
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                <Phone className="size-4 text-[#00509d]" />
                Section 5 — Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Primary Phone Number (ទូរស័ព្ទខ្សែទី១)
                  </label>
                  <Input {...register('primaryPhone')} placeholder="+855 12 345 678" />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Secondary Phone Number (ទូរស័ព្ទខ្សែទី២)
                  </label>
                  <Input {...register('secondaryPhone')} placeholder="+855 98 765 432" />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Work Email Address
                  </label>
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder="staff.name@snp.edu.kh"
                    error={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 6: EDUCATION & SKILLS */}
        {activeTab === 'education' && (
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                <BookOpen className="size-4 text-[#00509d]" />
                Section 6 — Education Background & Professional Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Highest Education Level (កម្រិតវប្បធម៌)
                  </label>
                  <Select
                    {...register('educationLevel')}
                    value={watchedValues.educationLevel || 'bachelor'}
                  >
                    <option value="high_school">High School (មធ្យមសិក្សាទុតិយភូមិ)</option>
                    <option value="associate">Associate Degree (បរិញ្ញាបត្ររង)</option>
                    <option value="bachelor">Bachelor Degree (បរិញ្ញាបត្រ)</option>
                    <option value="master">Master Degree (អនុបណ្ឌិត)</option>
                    <option value="doctorate">Doctorate / PhD (បណ្ឌិត)</option>
                    <option value="other">Other Qualification</option>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700">
                    Major / Specialization (ឯកទេស)
                  </label>
                  <Input
                    {...register('major')}
                    placeholder="e.g. English Education, Computer Science, Accounting"
                  />
                </div>
              </div>

              {/* Foreign Languages Multi-tags */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  Foreign Languages (ភាសាបរទេស)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={languageInput}
                    onChange={(e) => setLanguageInput(e.target.value)}
                    placeholder="Type language (e.g. English, Chinese, Thai) and click Add"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddLanguage();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddLanguage}>
                    <Plus className="size-3.5" />
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {currentLanguages.map((lang) => (
                    <span
                      key={lang}
                      className="flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#00509d]"
                    >
                      {lang}
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(lang)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills Multi-tags */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  Other Professional Skills (ជំនាញផ្សេងៗ)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Type skill (e.g. Microsoft Office, Teaching Methodology) and click Add"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddSkill}>
                    <Plus className="size-3.5" />
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {currentSkills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  Work Experience Summary (ប្រវត្តិការងារ)
                </label>
                <Textarea
                  {...register('workExperienceSummary')}
                  placeholder="Summary of previous employment history, years of experience, relevant roles..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 7: FAMILY */}
        {activeTab === 'family' && (
          <div className="space-y-4">
            {/* Father Card */}
            <Card className="border border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Father Details (ព័ត៌មានឪពុក)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Father Name (ឈ្មោះ)
                    </label>
                    <Input {...register('father.name')} placeholder="e.g. Sok Mean" />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Age (អាយុ)
                    </label>
                    <Input
                      type="number"
                      min={0}
                      {...register('father.age', { valueAsNumber: true })}
                      placeholder="65"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Living Status (ស្ថានភាពរស់នៅ)
                    </label>
                    <Select
                      {...register('father.livingStatus')}
                      value={watchedValues.father?.livingStatus || 'living'}
                    >
                      <option value="living">Living (នៅរស់)</option>
                      <option value="deceased">Deceased (ទទួលមរណភាព)</option>
                    </Select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Occupation (មុខរបរ)
                    </label>
                    <Input {...register('father.occupation')} placeholder="Farmer, Teacher..." />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mother Card */}
            <Card className="border border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Mother Details (ព័ត៌មានម្តាយ)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Mother Name (ឈ្មោះ)
                    </label>
                    <Input {...register('mother.name')} placeholder="e.g. Chan Rath" />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Age (អាយុ)
                    </label>
                    <Input
                      type="number"
                      min={0}
                      {...register('mother.age', { valueAsNumber: true })}
                      placeholder="62"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Living Status (ស្ថានភាពរស់នៅ)
                    </label>
                    <Select
                      {...register('mother.livingStatus')}
                      value={watchedValues.mother?.livingStatus || 'living'}
                    >
                      <option value="living">Living (នៅរស់)</option>
                      <option value="deceased">Deceased (ទទួលមរណភាព)</option>
                    </Select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Occupation (មុខរបរ)
                    </label>
                    <Input {...register('mother.occupation')} placeholder="Homemaker, Trader..." />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 8: DOCUMENTS */}
        {activeTab === 'documents' && (
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                <FileText className="size-4 text-[#00509d]" />
                Section 8 — Employee Documents & Certificates
              </CardTitle>
              <Button
                type="button"
                size="sm"
                onClick={() =>
                  appendDoc({
                    documentType: 'National ID Copy',
                    fileName: '',
                    fileUrl: '',
                    description: '',
                    status: 'active',
                  })
                }
                className="bg-[#023e8a] hover:bg-[#00509d]"
              >
                <Plus className="mr-1 size-3.5" />
                Add Document
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {docFields.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400">
                  No documents attached yet. Click &quot;Add Document&quot; to track CV, National
                  ID, degree, or certificates.
                </div>
              ) : (
                docFields.map((field, idx) => (
                  <div
                    key={field.id}
                    className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-4">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">
                          Type
                        </label>
                        <Select {...register(`documents.${idx}.documentType` as const)}>
                          <option value="CV / Resume">CV / Resume</option>
                          <option value="National ID Copy">National ID Copy</option>
                          <option value="Degree Certificate">Degree Certificate</option>
                          <option value="Employment Contract">Employment Contract</option>
                          <option value="Other">Other Document</option>
                        </Select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">
                          File Name
                        </label>
                        <Input
                          {...register(`documents.${idx}.fileName` as const)}
                          placeholder="e.g. cv_sok_dara.pdf"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">
                          File URL / Path
                        </label>
                        <Input
                          {...register(`documents.${idx}.fileUrl` as const)}
                          placeholder="https://..."
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">
                          Description
                        </label>
                        <Input
                          {...register(`documents.${idx}.description` as const)}
                          placeholder="Notes / remarks..."
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDoc(idx)}
                      className="text-rose-500 hover:bg-rose-50 hover:text-rose-700 sm:self-end"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {/* Form Bottom Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(initialData ? `/employees/${initialData._id}` : '/employees')
            }
            disabled={isLoading}
          >
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isLoading} className="bg-[#023e8a] hover:bg-[#00509d]">
              <Save className="mr-1.5 size-4" />
              {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Save Employee Master'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
