'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  Home,
  MapPin,
  Plus,
  Save,
  Trash2,
  User,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import type { School } from '@/features/school/types';

import {
  useCheckDuplicatesMutation,
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from '../hooks/use-students';
import type {
  CreateStudentPayload,
  DuplicateMatchItem,
  Guardian,
  GuardianRelationship,
  Student,
  StudentGender,
  StudentStatus,
  UpdateStudentPayload,
} from '../types';

interface StudentFormProps {
  initialData?: Student | null;
  onSuccess?: (student: Student) => void;
  onCancel?: () => void;
  isPage?: boolean;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
  isPage = false,
}) => {
  const router = useRouter();
  const { user, currentBranchId } = useAuth();
  const isEdit = Boolean(initialData);

  const { data: schoolsData } = useSchoolsQuery({ limit: 50 });
  const schools = schoolsData?.data ?? [];

  const { data: branchesData } = useBranchesQuery({ limit: 50 });
  const allBranches = branchesData?.data ?? [];

  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  // Master Fields State
  const [studentId, setStudentId] = React.useState(initialData?.studentId || '');
  const [selectedSchoolId, setSelectedSchoolId] = React.useState(initialData?.schoolId?._id || '');
  const [selectedBranchId, setSelectedBranchId] = React.useState(initialData?.branchId?._id || '');

  const schoolId = selectedSchoolId || schools[0]?._id || '';
  const branchId =
    selectedBranchId || (currentBranchId !== 'all' ? currentBranchId : branches[0]?._id || '');
  const [khmerName, setKhmerName] = React.useState(initialData?.khmerName || '');
  const [firstName, setFirstName] = React.useState(initialData?.firstName || '');
  const [lastName, setLastName] = React.useState(initialData?.lastName || '');
  const [gender, setGender] = React.useState<StudentGender>(initialData?.gender || 'male');
  const [dateOfBirth, setDateOfBirth] = React.useState(
    initialData?.dateOfBirth ? initialData.dateOfBirth.slice(0, 10) : '',
  );
  const [phone, setPhone] = React.useState(initialData?.phone || '');
  const [email, setEmail] = React.useState(initialData?.email || '');
  const [photo, setPhoto] = React.useState(initialData?.photo || '');
  const [nationalId, setNationalId] = React.useState(initialData?.nationalId || '');
  const [admissionDate, setAdmissionDate] = React.useState(
    initialData?.admissionDate
      ? initialData.admissionDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  );
  const [status, setStatus] = React.useState<StudentStatus>(initialData?.status || 'active');

  // Birthplace State
  const [birthProvince, setBirthProvince] = React.useState(initialData?.birthplace?.province || '');
  const [birthDistrict, setBirthDistrict] = React.useState(initialData?.birthplace?.district || '');
  const [birthCommune, setBirthCommune] = React.useState(initialData?.birthplace?.commune || '');
  const [birthVillage, setBirthVillage] = React.useState(initialData?.birthplace?.village || '');

  // Current Address State
  const [currProvince, setCurrProvince] = React.useState(
    initialData?.currentAddress?.province || initialData?.birthplace?.province || '',
  );
  const [currDistrict, setCurrDistrict] = React.useState(
    initialData?.currentAddress?.district || initialData?.birthplace?.district || '',
  );
  const [currCommune, setCurrCommune] = React.useState(
    initialData?.currentAddress?.commune || initialData?.birthplace?.commune || '',
  );
  const [currVillage, setCurrVillage] = React.useState(
    initialData?.currentAddress?.village || initialData?.birthplace?.village || '',
  );
  const [currStreet, setCurrStreet] = React.useState(initialData?.currentAddress?.street || '');
  const [currHouseNumber, setCurrHouseNumber] = React.useState(
    initialData?.currentAddress?.houseNumber || '',
  );
  const [sameAsBirthplace, setSameAsBirthplace] = React.useState(
    initialData?.currentAddress?.sameAsBirthplace ?? false,
  );

  // Guardians State
  const [guardians, setGuardians] = React.useState<Guardian[]>(
    initialData?.guardians && initialData.guardians.length > 0
      ? initialData.guardians
      : [
          {
            fullName: '',
            khmerName: '',
            relationship: 'father',
            phone: '',
            email: '',
            occupation: '',
            address: '',
            isPrimary: true,
            isEmergencyContact: true,
          },
        ],
  );

  // Duplicate Check
  const [duplicateMatches, setDuplicateMatches] = React.useState<DuplicateMatchItem[]>([]);
  const checkDuplicatesMutation = useCheckDuplicatesMutation();

  const handleCheckDuplicates = async () => {
    if (!khmerName && !phone && (!firstName || !lastName)) return;
    try {
      const res = await checkDuplicatesMutation.mutateAsync({
        khmerName: khmerName || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        dateOfBirth: dateOfBirth || undefined,
        phone: phone || undefined,
        guardianPhone: guardians[0]?.phone || undefined,
        excludeId: initialData?._id,
      });
      if (res.data?.matches) {
        setDuplicateMatches(res.data.matches);
      }
    } catch {
      // Ignore background check errors
    }
  };

  const onBlurDuplicateField = () => {
    handleCheckDuplicates();
  };

  const handleToggleSameAsBirthplace = (checked: boolean) => {
    setSameAsBirthplace(checked);
    if (checked) {
      setCurrProvince(birthProvince);
      setCurrDistrict(birthDistrict);
      setCurrCommune(birthCommune);
      setCurrVillage(birthVillage);
    }
  };

  // Mutations
  const createMutation = useCreateStudentMutation();
  const updateMutation = useUpdateStudentMutation();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleAddGuardian = () => {
    setGuardians((prev) => [
      ...prev,
      {
        fullName: '',
        khmerName: '',
        relationship: 'mother',
        phone: '',
        email: '',
        occupation: '',
        address: '',
        isPrimary: prev.length === 0,
        isEmergencyContact: prev.length === 0,
      },
    ]);
  };

  const handleRemoveGuardian = (index: number) => {
    setGuardians((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGuardianChange = (
    index: number,
    field: keyof Guardian,
    value: Guardian[keyof Guardian],
  ) => {
    setGuardians((prev) => {
      const updated = [...prev];
      if (field === 'isPrimary' && value === true) {
        updated.forEach((g, i) => {
          g.isPrimary = i === index;
        });
      } else {
        const item = updated[index];
        if (item) {
          updated[index] = { ...item, [field]: value };
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!schoolId) {
      setErrorMessage('Please select an affiliated school');
      return;
    }
    if (!branchId) {
      setErrorMessage('Please select a campus branch');
      return;
    }
    if (!khmerName.trim()) {
      setErrorMessage('Khmer Name is required');
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage('English First Name and Last Name are required');
      return;
    }
    if (!dateOfBirth) {
      setErrorMessage('Date of Birth is required');
      return;
    }

    const cleanedGuardians = guardians
      .filter((g) => g.fullName.trim() && g.phone.trim())
      .map((g) => ({
        fullName: g.fullName.trim(),
        khmerName: g.khmerName?.trim() || undefined,
        relationship: g.relationship,
        phone: g.phone.trim(),
        email: g.email?.trim() || undefined,
        occupation: g.occupation?.trim() || undefined,
        address: g.address?.trim() || undefined,
        isPrimary: Boolean(g.isPrimary),
        isEmergencyContact: Boolean(g.isEmergencyContact),
      }));

    const payload: CreateStudentPayload = {
      studentId: studentId.trim() || undefined,
      schoolId,
      branchId,
      khmerName: khmerName.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender,
      dateOfBirth,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      photo: photo.trim() || undefined,
      nationalId: nationalId.trim() || undefined,
      admissionDate,
      status,
      birthplace: {
        province: birthProvince.trim() || undefined,
        district: birthDistrict.trim() || undefined,
        commune: birthCommune.trim() || undefined,
        village: birthVillage.trim() || undefined,
      },
      currentAddress: {
        province: currProvince.trim() || undefined,
        district: currDistrict.trim() || undefined,
        commune: currCommune.trim() || undefined,
        village: currVillage.trim() || undefined,
        street: currStreet.trim() || undefined,
        houseNumber: currHouseNumber.trim() || undefined,
        sameAsBirthplace,
      },
      guardians: cleanedGuardians,
    };

    try {
      if (isEdit && initialData) {
        const res = await updateMutation.mutateAsync({
          id: initialData._id,
          payload: payload as UpdateStudentPayload,
        });
        if (onSuccess) {
          onSuccess(res.data);
        } else if (isPage) {
          router.push(`/students/${initialData._id}`);
        }
      } else {
        const res = await createMutation.mutateAsync(payload);
        if (onSuccess) {
          onSuccess(res.data);
        } else if (isPage) {
          router.push(`/students/${res.data._id}`);
        }
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
            'An error occurred while saving student';
      setErrorMessage(errorMsg);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
          <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {duplicateMatches.length > 0 && (
        <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <span>Potential Duplicate Students Detected ({duplicateMatches.length})</span>
          </div>
          <p className="text-xs text-amber-800">
            We found existing records that share identifiers with this student. Please verify before
            saving.
          </p>
          <div className="mt-2 max-h-40 space-y-1.5 overflow-y-auto">
            {duplicateMatches.map((dup) => (
              <div
                key={dup.studentId}
                className="flex items-center justify-between rounded border border-amber-200 bg-white p-2.5 text-xs"
              >
                <div>
                  <span className="font-medium text-slate-900">{dup.khmerName}</span> (
                  {dup.fullNameEn}) —{' '}
                  <span className="text-primary font-mono font-bold">{dup.studentId}</span>
                  <div className="text-xs text-slate-500">
                    Reasons: {dup.matchReasons.join(', ')} • Branch: {dup.branchName}
                  </div>
                </div>
                <Badge tone={dup.confidence === 'high' ? 'danger' : 'warning'} className="text-xs">
                  {dup.confidence} confidence
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 1: STUDENT MASTER */}
      <Card className="border-border/80 border">
        <CardHeader className="border-border/40 bg-muted/20 border-b pb-3">
          <div className="flex items-center gap-2">
            <User className="text-primary h-5 w-5" />
            <div>
              <CardTitle className="text-base font-semibold">1. Student Master Identity</CardTitle>
              <CardDescription className="text-xs">
                Core student demographic details, names, gender, DOB, and campus assignment.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <label htmlFor="schoolId" className="text-xs font-semibold">
              School <span className="text-destructive">*</span>
            </label>
            <Select
              id="schoolId"
              value={schoolId}
              onChange={(e) => setSelectedSchoolId(e.target.value)}
              disabled={isEdit}
              className="text-xs"
            >
              {schools.map((s: School) => (
                <option key={s._id} value={s._id}>
                  {s.nameEn} ({s.code})
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="branchId" className="text-xs font-semibold">
              Campus Branch <span className="text-destructive">*</span>
            </label>
            <Select
              id="branchId"
              value={branchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="text-xs"
            >
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchNameEn} ({b.branchCode})
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="status" className="text-xs font-semibold">
              Status <span className="text-destructive">*</span>
            </label>
            <Select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as StudentStatus)}
              className="text-xs"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="graduated">Graduated</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="transferred">Transferred</option>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="studentId" className="text-xs font-semibold">
              Student ID{' '}
              <span className="text-muted-foreground font-normal">(Auto if blank: STU-XXXXXX)</span>
            </label>
            <Input
              id="studentId"
              placeholder="e.g. STU-000001"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={isEdit}
              className="font-mono text-xs uppercase"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="admissionDate" className="text-xs font-semibold">
              Admission Date
            </label>
            <Input
              id="admissionDate"
              type="date"
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="khmerName" className="text-xs font-semibold">
              Khmer Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="khmerName"
              placeholder="ឈ្មោះជាភាសាខ្មែរ (e.g. សុខ ដារ៉ា)"
              value={khmerName}
              onChange={(e) => setKhmerName(e.target.value)}
              onBlur={onBlurDuplicateField}
              className="text-xs font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="lastName" className="text-xs font-semibold">
              English Last Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="lastName"
              placeholder="e.g. Sok"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={onBlurDuplicateField}
              className="text-xs"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="firstName" className="text-xs font-semibold">
              English First Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="firstName"
              placeholder="e.g. Dara"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={onBlurDuplicateField}
              className="text-xs"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gender" className="text-xs font-semibold">
              Gender <span className="text-destructive">*</span>
            </label>
            <Select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as StudentGender)}
              className="text-xs"
            >
              <option value="male">Male (ប្រុស)</option>
              <option value="female">Female (ស្រី)</option>
              <option value="other">Other (ផ្សេងៗ)</option>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="dateOfBirth" className="text-xs font-semibold">
              Date of Birth <span className="text-destructive">*</span>
            </label>
            <Input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              onBlur={onBlurDuplicateField}
              className="text-xs"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-semibold">
              Student Phone
            </label>
            <Input
              id="phone"
              placeholder="e.g. 012 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={onBlurDuplicateField}
              className="font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold">
              Student Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. dara.sok@student.snp.edu.kh"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="nationalId" className="text-xs font-semibold">
              National ID / Birth Certificate #
            </label>
            <Input
              id="nationalId"
              placeholder="e.g. 010203040"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="photo" className="text-xs font-semibold">
              Profile Photo URL
            </label>
            <Input
              id="photo"
              placeholder="https://..."
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* SECTION 2: BIRTHPLACE */}
      <Card className="border-border/80 border">
        <CardHeader className="border-border/40 bg-muted/20 border-b pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="text-primary h-5 w-5" />
            <div>
              <CardTitle className="text-base font-semibold">2. Place of Birth</CardTitle>
              <CardDescription className="text-xs">
                Province, District, Commune, and Village of birth.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-1.5">
            <label htmlFor="birthProvince" className="text-xs font-semibold">
              Province / Capital (ខេត្ត/រាជធានី)
            </label>
            <Input
              id="birthProvince"
              placeholder="e.g. Phnom Penh / ភ្នំពេញ"
              value={birthProvince}
              onChange={(e) => setBirthProvince(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="birthDistrict" className="text-xs font-semibold">
              District / Khan (ស្រុក/ខណ្ឌ)
            </label>
            <Input
              id="birthDistrict"
              placeholder="e.g. Chamkar Mon / ចំការមន"
              value={birthDistrict}
              onChange={(e) => setBirthDistrict(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="birthCommune" className="text-xs font-semibold">
              Commune / Sangkat (ឃុំ/សង្កាត់)
            </label>
            <Input
              id="birthCommune"
              placeholder="e.g. Tonle Bassac / ទន្លេបាសាក់"
              value={birthCommune}
              onChange={(e) => setBirthCommune(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="birthVillage" className="text-xs font-semibold">
              Village / Phum (ភូមិ)
            </label>
            <Input
              id="birthVillage"
              placeholder="e.g. Phum 1 / ភូមិ១"
              value={birthVillage}
              onChange={(e) => setBirthVillage(e.target.value)}
              className="text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* SECTION 3: CURRENT ADDRESS */}
      <Card className="border-border/80 border">
        <CardHeader className="border-border/40 bg-muted/20 border-b pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="text-primary h-5 w-5" />
              <div>
                <CardTitle className="text-base font-semibold">3. Current Address</CardTitle>
                <CardDescription className="text-xs">
                  Where the student currently resides with family or guardian.
                </CardDescription>
              </div>
            </div>
            <label className="bg-background border-border flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium select-none">
              <input
                type="checkbox"
                checked={sameAsBirthplace}
                onChange={(e) => handleToggleSameAsBirthplace(e.target.checked)}
                className="text-primary h-3.5 w-3.5 rounded border-gray-300"
              />
              <span>Same as Birthplace</span>
            </label>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-1.5">
            <label htmlFor="currProvince" className="text-xs font-semibold">
              Province / Capital
            </label>
            <Input
              id="currProvince"
              placeholder="e.g. Phnom Penh"
              value={currProvince}
              onChange={(e) => {
                setCurrProvince(e.target.value);
                setSameAsBirthplace(false);
              }}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="currDistrict" className="text-xs font-semibold">
              District / Khan
            </label>
            <Input
              id="currDistrict"
              placeholder="e.g. Tuol Kouk"
              value={currDistrict}
              onChange={(e) => {
                setCurrDistrict(e.target.value);
                setSameAsBirthplace(false);
              }}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="currCommune" className="text-xs font-semibold">
              Commune / Sangkat
            </label>
            <Input
              id="currCommune"
              placeholder="e.g. Boeng Kak 1"
              value={currCommune}
              onChange={(e) => {
                setCurrCommune(e.target.value);
                setSameAsBirthplace(false);
              }}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="currVillage" className="text-xs font-semibold">
              Village / Phum
            </label>
            <Input
              id="currVillage"
              placeholder="e.g. Phum 3"
              value={currVillage}
              onChange={(e) => {
                setCurrVillage(e.target.value);
                setSameAsBirthplace(false);
              }}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="currStreet" className="text-xs font-semibold">
              Street / Road
            </label>
            <Input
              id="currStreet"
              placeholder="e.g. St. 315"
              value={currStreet}
              onChange={(e) => setCurrStreet(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="currHouseNumber" className="text-xs font-semibold">
              House / Building #
            </label>
            <Input
              id="currHouseNumber"
              placeholder="e.g. #12B"
              value={currHouseNumber}
              onChange={(e) => setCurrHouseNumber(e.target.value)}
              className="text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* SECTION 4: GUARDIANS */}
      <Card className="border-border/80 border">
        <CardHeader className="border-border/40 bg-muted/20 border-b pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="text-primary h-5 w-5" />
              <div>
                <CardTitle className="text-base font-semibold">4. Guardians & Parents</CardTitle>
                <CardDescription className="text-xs">
                  Support multiple guardians (Father, Mother, Legal Guardian) with contact
                  information.
                </CardDescription>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddGuardian}
              className="h-8 gap-1 text-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Guardian
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {guardians.map((guardian, index) => (
            <div
              key={index}
              className="border-border/70 bg-card group relative space-y-3 rounded-lg border p-4"
            >
              <div className="border-border/40 flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Badge tone="neutral" className="text-xs">
                    Guardian #{index + 1}
                  </Badge>
                  {guardian.isPrimary && (
                    <Badge tone="success" className="text-xs">
                      Primary Contact
                    </Badge>
                  )}
                  {guardian.isEmergencyContact && (
                    <Badge tone="warning" className="text-xs">
                      Emergency
                    </Badge>
                  )}
                </div>
                {guardians.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveGuardian(index)}
                    className="text-destructive hover:bg-destructive/10 h-7 w-7 p-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Full Name (EN) <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Sok Visal"
                    value={guardian.fullName}
                    onChange={(e) => handleGuardianChange(index, 'fullName', e.target.value)}
                    className="h-8 text-xs"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Khmer Name</label>
                  <Input
                    placeholder="ឈ្មោះខ្មែរ (e.g. សុខ វិសាល)"
                    value={guardian.khmerName || ''}
                    onChange={(e) => handleGuardianChange(index, 'khmerName', e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Relationship <span className="text-destructive">*</span>
                  </label>
                  <Select
                    value={guardian.relationship}
                    onChange={(e) =>
                      handleGuardianChange(
                        index,
                        'relationship',
                        e.target.value as GuardianRelationship,
                      )
                    }
                    className="h-8 text-xs"
                  >
                    <option value="father">Father (ឪពុក)</option>
                    <option value="mother">Mother (ម្តាយ)</option>
                    <option value="guardian">Legal Guardian (អាណាព្យាបាល)</option>
                    <option value="other">Other (ផ្សេងៗ)</option>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="e.g. 012 888 999"
                    value={guardian.phone}
                    onChange={(e) => handleGuardianChange(index, 'phone', e.target.value)}
                    onBlur={onBlurDuplicateField}
                    className="h-8 font-mono text-xs"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email</label>
                  <Input
                    type="email"
                    placeholder="e.g. visal.sok@gmail.com"
                    value={guardian.email || ''}
                    onChange={(e) => handleGuardianChange(index, 'email', e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Occupation</label>
                  <Input
                    placeholder="e.g. Civil Engineer / វិស្វករ"
                    value={guardian.occupation || ''}
                    onChange={(e) => handleGuardianChange(index, 'occupation', e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Guardian Address / Workplace
                  </label>
                  <Input
                    placeholder="e.g. Same as student / Phnom Penh"
                    value={guardian.address || ''}
                    onChange={(e) => handleGuardianChange(index, 'address', e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="text-muted-foreground flex cursor-pointer items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={guardian.isPrimary}
                    onChange={(e) => handleGuardianChange(index, 'isPrimary', e.target.checked)}
                    className="text-primary h-3.5 w-3.5 rounded border-gray-300"
                  />
                  <span>Primary Guardian</span>
                </label>

                <label className="text-muted-foreground flex cursor-pointer items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={guardian.isEmergencyContact}
                    onChange={(e) =>
                      handleGuardianChange(index, 'isEmergencyContact', e.target.checked)
                    }
                    className="text-primary h-3.5 w-3.5 rounded border-gray-300"
                  />
                  <span>Emergency Contact</span>
                </label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        {isPage && (
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} className="min-w-36 gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting
            ? isEdit
              ? 'Updating...'
              : 'Creating...'
            : isEdit
              ? 'Save Changes'
              : 'Create Student'}
        </Button>
      </div>
    </form>
  );
};
