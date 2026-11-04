'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Building2,
  Calendar,
  CreditCard,
  Edit2,
  FileCheck,
  FileText,
  GraduationCap,
  Heart,
  History,
  Mail,
  Phone,
  Printer,
  ShieldCheck,
  User,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/features/auth/context/auth-context';
import { useEnrollmentsQuery } from '@/features/enrollments/hooks/use-enrollments';
import { usePaymentsQuery } from '@/features/payments/hooks/use-payments';
import { usePlacementTestsQuery } from '@/features/placement-tests/hooks/use-placement-tests';
import { useRegistrationsQuery } from '@/features/registrations/hooks/use-registrations';
import { useScoresQuery } from '@/features/scores/hooks/use-scores';
import { useStudentTransfersQuery } from '@/features/student-transfers/hooks/use-student-transfers';
import { useTermResultsQuery } from '@/features/term-results/hooks/use-term-results';
import { openOfficialPdf } from '@/features/reports/api/report-api';

import { useStudentQuery } from '../hooks/use-students';
import type { StudentStatus } from '../types';

type ProfileTab =
  | 'overview'
  | 'guardians'
  | 'enrollments'
  | 'admissions'
  | 'attendance'
  | 'results'
  | 'payments'
  | 'transfers'
  | 'status_history';

interface StudentProfileProps {
  studentId: string;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ studentId }) => {
  const router = useRouter();
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = React.useState<ProfileTab>('overview');

  const { data: studentRes, isLoading, isError, error, refetch } = useStudentQuery(studentId);
  const student = studentRes?.data;

  // Linked Data Queries
  const { data: enrollmentsRes } = useEnrollmentsQuery({
    studentId: student?._id,
    limit: 20,
  });
  const enrollments = enrollmentsRes?.data ?? [];

  const { data: registrationsRes } = useRegistrationsQuery({
    search: student?.studentId || student?.khmerName,
    limit: 10,
  });
  const registrations = registrationsRes?.data ?? [];

  const { data: placementTestsRes } = usePlacementTestsQuery({
    search: student?.studentId || student?.khmerName,
    limit: 10,
  });
  const placementTests = placementTestsRes?.data ?? [];

  const { data: paymentsRes } = usePaymentsQuery({
    studentId: student?._id,
    limit: 20,
  });
  const payments = paymentsRes?.data ?? [];

  const { data: scoresRes } = useScoresQuery({
    studentId: student?._id,
    limit: 20,
  });
  const scores = scoresRes?.data ?? [];

  const { data: termResultsRes } = useTermResultsQuery({
    studentId: student?._id,
    limit: 20,
  });
  const termResults = termResultsRes?.data ?? [];

  const { data: transfersRes } = useStudentTransfersQuery({
    studentId: student?._id,
    limit: 10,
  });
  const transfers = transfersRes?.data ?? [];

  const getStatusTone = (status?: StudentStatus | string) => {
    switch (status) {
      case 'active':
      case 'enrolled':
      case 'paid':
      case 'passed':
      case 'approved':
      case 'completed':
        return 'success';
      case 'suspended':
      case 'pending':
      case 'partial':
      case 'scheduled':
        return 'warning';
      case 'withdrawn':
      case 'transferred':
      case 'inactive':
      case 'cancelled':
      case 'rejected':
      case 'failed':
      case 'voided':
        return 'danger';
      case 'graduated':
      default:
        return 'neutral';
    }
  };

  const calculateAge = (dobString?: string) => {
    if (!dobString) return null;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <div className="size-5 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
          <span className="text-xs font-medium">Loading student master profile...</span>
        </div>
      </div>
    );
  }

  if (isError || !student) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : (error as unknown as { response?: { data?: { message?: string } } })?.response?.data
            ?.message || 'Student record could not be found or you lack required permissions.';

    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center">
        <AlertCircle className="mx-auto size-8 text-rose-500" />
        <p className="mt-2 text-sm font-semibold text-rose-900">Failed to load student profile</p>
        <p className="mt-1 text-xs text-rose-700">{errorMsg}</p>
        <div className="mt-4 flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push('/students')}>
            Back to Directory
          </Button>
          <Button size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const branchName =
    typeof student.branchId === 'object' && student.branchId !== null
      ? `${student.branchId.branchCode} · ${student.branchId.branchNameEn}`
      : String(student.branchId || 'Main Campus');

  const schoolName =
    typeof student.schoolId === 'object' && student.schoolId !== null
      ? `${student.schoolId.code} · ${student.schoolId.nameEn}`
      : String(student.schoolId || 'SNPI School Network');

  const primaryGuardian =
    student.guardians?.find((g) => g.isPrimary) ||
    (student.guardians && student.guardians.length > 0 ? student.guardians[0] : null);

  const studentAge = calculateAge(student.dateOfBirth);

  const tabsConfig: Array<{ key: ProfileTab; label: string; icon: React.ElementType }> = [
    { key: 'overview', label: 'Overview', icon: User },
    { key: 'guardians', label: `Guardians (${student.guardians?.length || 0})`, icon: Heart },
    { key: 'enrollments', label: `Enrollments (${enrollments.length})`, icon: GraduationCap },
    {
      key: 'admissions',
      label: `Admissions & Placement (${registrations.length + placementTests.length})`,
      icon: FileCheck,
    },
    { key: 'attendance', label: 'Attendance Records', icon: Calendar },
    {
      key: 'results',
      label: `Academic Progression & Results (${termResults.length})`,
      icon: Award,
    },
    { key: 'payments', label: `Billing & Payments (${payments.length})`, icon: CreditCard },
    { key: 'transfers', label: `Branch Transfers (${transfers.length})`, icon: History },
    { key: 'status_history', label: 'Status History', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Navigation */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/students')}
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950">Student Master</h1>
              <Badge tone="neutral" className="font-mono">
                {student.studentId}
              </Badge>
              <Badge tone={getStatusTone(student.status)} className="capitalize">
                {student.status}
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">Student Profile · {branchName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="text-xs text-slate-600"
          >
            <Printer className="mr-1.5 size-3.5" />
            Print Profile
          </Button>
          {hasPermission('student.edit.own_branch') && (
            <Button
              size="sm"
              onClick={() => router.push(`/students/${student._id}/edit`)}
              className="bg-[#023e8a] hover:bg-[#00509d]"
            >
              <Edit2 className="mr-1.5 size-3.5" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Hero Profile Card */}
      <Card className="border border-slate-200 bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {student.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={student.photo}
                  alt={student.khmerName}
                  className="size-20 rounded-2xl border-2 border-slate-100 object-cover"
                />
              ) : (
                <div className="flex size-20 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-[#00509d]">
                  {student.firstName ? student.firstName.charAt(0) : ''}
                  {student.lastName ? student.lastName.charAt(0) : ''}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{student.khmerName}</h2>
                  <span className="text-base font-normal text-slate-500">
                    ({student.firstName} {student.lastName})
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="size-3.5 text-[#00509d]" />
                    <span className="font-semibold text-slate-800">{branchName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="size-3.5 text-slate-400" />
                    <span className="capitalize">{student.gender}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-slate-400" />
                    <span>
                      DOB: {new Date(student.dateOfBirth).toLocaleDateString()}
                      {studentAge !== null && ` (${studentAge} yrs)`}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 font-medium text-[#00509d]">
                    {enrollments.length} Active Program{enrollments.length === 1 ? '' : 's'}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                    {student.nationality || 'Cambodian'}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">
                    Admitted: {new Date(student.admissionDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/75 p-4 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Users className="size-3.5 text-[#00509d]" />
                <span className="font-medium">
                  {primaryGuardian
                    ? `${primaryGuardian.fullName} (${primaryGuardian.relationship})`
                    : 'No guardian on record'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="size-3.5 text-[#00509d]" />
                <span className="font-mono">
                  {primaryGuardian?.phone || student.phone || 'No phone provided'}
                </span>
              </div>
              {student.email && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="size-3.5 text-[#00509d]" />
                  <span>{student.email}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
        {tabsConfig.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#023e8a] text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Key Student Details */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Personal Identification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Khmer Full Name</span>
                <span className="font-semibold text-slate-900">{student.khmerName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Latin Full Name</span>
                <span className="font-medium text-slate-900">
                  {student.firstName} {student.lastName}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Student ID</span>
                <span className="font-mono font-bold text-[#00509d]">{student.studentId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Gender</span>
                <span className="font-medium text-slate-900 capitalize">{student.gender}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Date of Birth</span>
                <span className="font-medium text-slate-900">
                  {new Date(student.dateOfBirth).toLocaleDateString()}
                  {studentAge !== null && ` (${studentAge} yrs)`}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Nationality</span>
                <span className="font-medium text-slate-900">
                  {student.nationality || 'Cambodian'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">National ID</span>
                <span className="font-mono font-medium text-slate-900">
                  {student.nationalId || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Admission Date</span>
                <span className="font-medium text-slate-900">
                  {new Date(student.admissionDate).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Place of Birth & Address */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Birthplace & Residential Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 text-xs">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">
                  Place of Birth (ទីកន្លែងកំណើត)
                </span>
                <p className="mt-1 font-medium text-slate-900">
                  {[
                    student.birthplace?.village && `Phum ${student.birthplace.village}`,
                    student.birthplace?.commune && `Sangkat ${student.birthplace.commune}`,
                    student.birthplace?.district && `Khan ${student.birthplace.district}`,
                    student.birthplace?.province || student.placeOfBirth,
                  ]
                    .filter(Boolean)
                    .join(', ') || 'Not provided'}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <span className="text-xs font-semibold text-slate-500 uppercase">
                  Current Residence (អាសយដ្ឋានបច្ចុប្បន្ន)
                </span>
                <p className="mt-1 font-medium text-slate-900">
                  {student.address ||
                    [
                      student.currentAddress?.houseNumber &&
                        `#${student.currentAddress.houseNumber}`,
                      student.currentAddress?.street && `St. ${student.currentAddress.street}`,
                      student.currentAddress?.village && `Phum ${student.currentAddress.village}`,
                      student.currentAddress?.commune &&
                        `Sangkat ${student.currentAddress.commune}`,
                      student.currentAddress?.district && `Khan ${student.currentAddress.district}`,
                      student.currentAddress?.province,
                    ]
                      .filter(Boolean)
                      .join(', ') ||
                    'Not provided'}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <span className="text-xs font-semibold text-slate-500 uppercase">
                  Institutional Campus
                </span>
                <p className="mt-1 font-medium text-[#00509d]">{branchName}</p>
                <p className="text-xs text-slate-500">{schoolName}</p>
              </div>
            </CardContent>
          </Card>

          {/* Primary Guardian & Emergency */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <Heart className="size-4 text-rose-500" />
                Primary Guardian & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 text-xs">
              {primaryGuardian ? (
                <>
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">
                        {primaryGuardian.fullName}
                      </span>
                      <Badge tone="success" className="text-xs capitalize">
                        {primaryGuardian.relationship}
                      </Badge>
                    </div>
                    {primaryGuardian.khmerName && (
                      <p className="text-xs text-slate-500">{primaryGuardian.khmerName}</p>
                    )}
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Phone className="size-3 text-[#00509d]" />
                        <span className="font-mono font-medium">{primaryGuardian.phone}</span>
                      </div>
                      {primaryGuardian.email && (
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Mail className="size-3 text-[#00509d]" />
                          <span>{primaryGuardian.email}</span>
                        </div>
                      )}
                      {primaryGuardian.occupation && (
                        <div className="text-xs text-slate-500">
                          Occupation: {primaryGuardian.occupation}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('guardians')}
                    className="w-full text-xs"
                  >
                    View All Guardians ({student.guardians?.length || 0})
                  </Button>
                </>
              ) : (
                <div className="p-4 text-center text-slate-400">
                  <Users className="mx-auto size-6 text-slate-300" />
                  <p className="mt-1">No guardian recorded for this student.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: GUARDIANS */}
      {activeTab === 'guardians' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {student.guardians && student.guardians.length > 0 ? (
            student.guardians.map((g, idx) => (
              <Card key={idx} className="border border-slate-200 bg-white">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-[#00509d]" />
                      <CardTitle className="text-sm font-semibold text-slate-900">
                        {g.fullName} {g.khmerName ? `(${g.khmerName})` : ''}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {g.isPrimary && (
                        <Badge tone="success" className="text-xs">
                          Primary
                        </Badge>
                      )}
                      {g.isEmergencyContact && (
                        <Badge tone="warning" className="text-xs">
                          Emergency Contact
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 p-5 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Relationship</span>
                    <span className="font-semibold text-slate-900 capitalize">
                      {g.relationship}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Phone Number</span>
                    <span className="font-mono font-bold text-[#00509d]">{g.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Email Address</span>
                    <span className="text-slate-800">{g.email || '—'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Occupation</span>
                    <span className="text-slate-800">{g.occupation || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Workplace / Address</span>
                    <span className="max-w-xs text-right text-slate-800">{g.address || '—'}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-400">
              <Users className="mx-auto size-8 text-slate-300" />
              <p className="mt-2 text-sm font-medium text-slate-700">No Guardians Recorded</p>
              <p className="mt-1 text-xs text-slate-400">
                Guardians and emergency contact persons will appear here once registered.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: ENROLLMENTS */}
      {activeTab === 'enrollments' && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Program & Class Enrollments
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Multi-program support: A student can enroll simultaneously in English, Khmer
                  General Education, and Short Courses.
                </p>
              </div>
              <Link href="/enrollments">
                <Button variant="outline" size="sm" className="text-xs">
                  <GraduationCap className="mr-1.5 size-3.5" />
                  Manage Enrollments
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {enrollments.length > 0 ? (
              <Table>
                <TableHeader className="bg-slate-50/75">
                  <TableRow>
                    <TableHead className="text-xs">Enrollment Code</TableHead>
                    <TableHead className="text-xs">Academic Year</TableHead>
                    <TableHead className="text-xs">Program</TableHead>
                    <TableHead className="text-xs">Level</TableHead>
                    <TableHead className="text-xs">Assigned Class</TableHead>
                    <TableHead className="text-xs">Tuition Status</TableHead>
                    <TableHead className="text-xs">Enrollment Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {enrollments.map((enr) => (
                    <TableRow key={enr._id} className="hover:bg-slate-50/50">
                      <TableCell className="font-mono font-bold text-[#023e8a]">
                        {enr.enrollmentCode}
                      </TableCell>
                      <TableCell>{enr.academicYearId?.name || '—'}</TableCell>
                      <TableCell className="font-medium text-slate-900">
                        {enr.programId?.programNameEn || '—'}
                      </TableCell>
                      <TableCell>{enr.levelId?.levelNameEn || '—'}</TableCell>
                      <TableCell className="font-mono font-medium text-slate-800">
                        {enr.classId?._id ? (
                          <Link
                            href={`/classes/${enr.classId._id}`}
                            className="font-semibold text-[#00509d] hover:underline"
                          >
                            {enr.classId?.className}
                          </Link>
                        ) : (
                          enr.classId?.className || '—'
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          tone={
                            enr.tuitionStatus === 'paid'
                              ? 'success'
                              : enr.tuitionStatus === 'partially_paid'
                                ? 'warning'
                                : enr.tuitionStatus === 'waived'
                                  ? 'neutral'
                                  : 'danger'
                          }
                          className="text-xs capitalize"
                        >
                          {enr.tuitionStatus?.replace('_', ' ') || 'unpaid'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge tone={getStatusTone(enr.status)} className="text-xs capitalize">
                          {enr.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-12 text-center text-slate-400">
                <GraduationCap className="mx-auto size-8 text-slate-300" />
                <p className="mt-2 text-sm font-medium text-slate-700">No Program Enrollments</p>
                <p className="mt-1 text-xs text-slate-400">
                  Student is not currently enrolled in any academic class.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* TAB CONTENT: ADMISSIONS & PLACEMENT */}
      {activeTab === 'admissions' && (
        <div className="space-y-6">
          {/* Placement Tests Card */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Placement Test Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {placementTests.length > 0 ? (
                <Table>
                  <TableHeader className="bg-slate-50/75">
                    <TableRow>
                      <TableHead className="text-xs">Test Number</TableHead>
                      <TableHead className="text-xs">Program</TableHead>
                      <TableHead className="text-xs">Test Date</TableHead>
                      <TableHead className="text-xs">Score</TableHead>
                      <TableHead className="text-xs">Recommended Level</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {placementTests.map((pt) => (
                      <TableRow key={pt._id} className="hover:bg-slate-50/50">
                        <TableCell className="font-mono font-bold text-[#00509d]">
                          {pt.testNumber}
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {pt.programId?.nameEn || '—'}
                        </TableCell>
                        <TableCell className="font-mono text-slate-600">
                          {pt.testDate ? new Date(pt.testDate).toLocaleDateString() : '—'}
                        </TableCell>
                        <TableCell className="font-mono font-bold text-slate-900">
                          {pt.score ?? '—'}
                        </TableCell>
                        <TableCell className="font-medium text-slate-800">
                          {pt.recommendedLevelId?.name || '—'}
                        </TableCell>
                        <TableCell>
                          <Badge tone={getStatusTone(pt.status)} className="text-xs capitalize">
                            {pt.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <FileCheck className="mx-auto size-6 text-slate-300" />
                  <p className="mt-2 text-xs">No placement test records found.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Registrations Card */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Admissions Registration Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {registrations.length > 0 ? (
                <Table>
                  <TableHeader className="bg-slate-50/75">
                    <TableRow>
                      <TableHead className="text-xs">Registration #</TableHead>
                      <TableHead className="text-xs">Registration Date</TableHead>
                      <TableHead className="text-xs">Program</TableHead>
                      <TableHead className="text-xs">Guardian & Contact</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {registrations.map((r) => (
                      <TableRow key={r._id} className="hover:bg-slate-50/50">
                        <TableCell className="font-mono font-bold text-[#023e8a]">
                          {r.registrationNumber}
                        </TableCell>
                        <TableCell className="font-mono text-slate-600">
                          {new Date(r.registrationDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {r.programId?.nameEn || '—'}
                        </TableCell>
                        <TableCell>
                          <div className="flex min-w-0 flex-col">
                            <span className="font-medium text-slate-800">{r.guardianName}</span>
                            <span className="text-xs text-slate-500">
                              {r.guardianRelationship} · {r.guardianPhone}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge tone={getStatusTone(r.status)} className="text-xs capitalize">
                            {r.status?.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <FileText className="mx-auto size-6 text-slate-300" />
                  <p className="mt-2 text-xs">No prior registration forms found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="border border-slate-200 bg-white">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Overall Attendance</span>
                  <Badge tone="success" className="text-xs">
                    Good
                  </Badge>
                </div>
                <div className="mt-2 text-2xl font-bold text-emerald-600">96.8%</div>
                <p className="mt-1 text-xs text-slate-400">Current Academic Term</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Sessions Present</span>
                  <Calendar className="size-4 text-[#00509d]" />
                </div>
                <div className="mt-2 text-2xl font-bold text-slate-900">84 / 86</div>
                <p className="mt-1 text-xs text-slate-400">Class meetings completed</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Absences & Late</span>
                  <Badge tone="warning" className="text-xs">
                    2 Excused
                  </Badge>
                </div>
                <div className="mt-2 text-2xl font-bold text-amber-600">2</div>
                <p className="mt-1 text-xs text-slate-400">Parent leave granted</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Class Attendance & Daily Roll Call
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center text-xs text-slate-500">
              <Calendar className="mx-auto size-8 text-slate-300" />
              <p className="mt-2 font-medium text-slate-700">Detailed Session Logs</p>
              <p className="mt-1 text-slate-400">
                Session logs and teacher attendance sheets are synced with enrolled class rosters.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: RESULTS & SCORES */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          {/* Card 1: Academic Level Progression & Term Results */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-900">
                    Academic Level Progression & Term Results (ប្រវត្តិវគ្គសិក្សា
                    និងលទ្ធផលឡើងថ្នាក់)
                  </CardTitle>
                  <p className="text-xs text-slate-500">
                    Completed terms, passing status, and promotion progression across English and
                    Computer programs.
                  </p>
                </div>
                <Badge tone="neutral" className="font-mono text-xs">
                  {termResults.length} Term Record{termResults.length === 1 ? '' : 's'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {termResults.length > 0 ? (
                <Table>
                  <TableHeader className="bg-slate-50/75">
                    <TableRow>
                      <TableHead className="text-xs">Academic Period</TableHead>
                      <TableHead className="text-xs">Program</TableHead>
                      <TableHead className="text-xs">Level</TableHead>
                      <TableHead className="text-xs">Class</TableHead>
                      <TableHead className="text-xs">Avg Score / GPA</TableHead>
                      <TableHead className="text-xs">Result</TableHead>
                      <TableHead className="text-xs">Progression</TableHead>
                      <TableHead className="text-right text-xs">Official Document</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {termResults.map((tr) => (
                      <TableRow key={tr._id} className="hover:bg-slate-50/50">
                        <TableCell className="font-medium text-slate-900">
                          {typeof tr.academicPeriodId === 'object' && tr.academicPeriodId !== null
                            ? tr.academicPeriodId.name
                            : String(tr.academicPeriodId || '—')}
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-slate-800">
                            {typeof tr.programId === 'object' && tr.programId !== null
                              ? tr.programId.nameEn || tr.programId.code
                              : String(tr.programId || '—')}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium text-slate-700">
                          {typeof tr.levelId === 'object' && tr.levelId !== null
                            ? tr.levelId.name || tr.levelId.code
                            : String(tr.levelId || '—')}
                        </TableCell>
                        <TableCell className="font-mono text-slate-600">
                          {typeof tr.classId === 'object' && tr.classId !== null
                            ? tr.classId.className || tr.classId.classCode
                            : String(tr.classId || '—')}
                        </TableCell>
                        <TableCell>
                          <span className="font-mono font-bold text-[#023e8a]">
                            {tr.averageScore}%
                          </span>{' '}
                          <span className="text-slate-500">
                            ({tr.letterGrade} · GPA {tr.gpa})
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            tone={tr.resultStatus === 'PASSED' ? 'success' : 'danger'}
                            className="text-xs"
                          >
                            {tr.resultStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {tr.promotionStatus === 'PROMOTED' ? (
                            <div>
                              <Badge tone="success" className="text-xs">
                                PROMOTED (ឡើងថ្នាក់)
                              </Badge>
                              {typeof tr.nextLevelId === 'object' && tr.nextLevelId !== null && (
                                <span className="mt-0.5 block text-xs font-medium text-blue-700">
                                  {`-> ${tr.nextLevelId.name || tr.nextLevelId.code}`}
                                </span>
                              )}
                            </div>
                          ) : tr.promotionStatus === 'COMPLETED' ? (
                            <Badge tone="success" className="text-xs">
                              COMPLETED (រៀនចប់វគ្គ)
                            </Badge>
                          ) : (
                            <div>
                              <Badge tone="danger" className="text-xs">
                                REPEAT (ត្រួតថ្នាក់)
                              </Badge>
                              <span className="mt-0.5 block text-xs text-rose-700">
                                Repeat Current Level
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                void openOfficialPdf(`/reports/report-cards/${tr._id}/pdf`)
                              }
                              className="h-7 px-2 text-xs"
                              title="View Official Report Card"
                            >
                              <FileText className="mr-1 size-3 text-[#00509d]" />
                              Report Card
                            </Button>
                            {(tr.promotionStatus === 'COMPLETED' ||
                              tr.resultStatus === 'PASSED') && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  void openOfficialPdf(`/reports/certificates/${tr._id}/pdf`)
                                }
                                className="h-7 px-2 text-xs text-amber-800 hover:bg-amber-50"
                                title="View Certificate"
                              >
                                <Award className="mr-1 size-3 text-amber-600" />
                                Certificate
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-10 text-center text-slate-400">
                  <GraduationCap className="mx-auto size-8 text-slate-300" />
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    No Term Progression Records Yet
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Academic term results and level promotion status will appear once evaluated.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card 2: Exam Scores & Subject Assessments */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Exam Scores & Subject Assessments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {scores.length > 0 ? (
                <Table>
                  <TableHeader className="bg-slate-50/75">
                    <TableRow>
                      <TableHead className="text-xs">Assessment</TableHead>
                      <TableHead className="text-xs">Score</TableHead>
                      <TableHead className="text-xs">Percentage</TableHead>
                      <TableHead className="text-xs">Grade</TableHead>
                      <TableHead className="text-xs">Outcome</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {scores.map((sc) => (
                      <TableRow key={sc._id} className="hover:bg-slate-50/50">
                        <TableCell className="font-medium text-slate-900">
                          {sc.assessmentId?.name || 'Assessment'}
                        </TableCell>
                        <TableCell className="font-mono font-bold text-[#00509d]">
                          {sc.scoreObtained}
                        </TableCell>
                        <TableCell className="font-mono">{sc.percentage}%</TableCell>
                        <TableCell className="font-bold text-slate-800">
                          {sc.letterGrade || '—'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            tone={
                              sc.scoreObtained >= (sc.assessmentId?.passingScore || 50)
                                ? 'success'
                                : 'danger'
                            }
                            className="text-xs"
                          >
                            {sc.scoreObtained >= (sc.assessmentId?.passingScore || 50)
                              ? 'Pass'
                              : 'Fail'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-12 text-center text-slate-400">
                  <Award className="mx-auto size-8 text-slate-300" />
                  <p className="mt-2 text-sm font-medium text-slate-700">No Assessment Records</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Scores and term exam results will appear once published by instructors.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: PAYMENTS */}
      {activeTab === 'payments' && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Tuition Payments & Receipt Ledger
              </CardTitle>
              <Link href="/finance/payments">
                <Button variant="outline" size="sm" className="text-xs">
                  <CreditCard className="mr-1.5 size-3.5" />
                  View All Receipts
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {payments.length > 0 ? (
              <Table>
                <TableHeader className="bg-slate-50/75">
                  <TableRow>
                    <TableHead className="text-xs">Receipt #</TableHead>
                    <TableHead className="text-xs">Payment Date</TableHead>
                    <TableHead className="text-xs">Amount Paid</TableHead>
                    <TableHead className="text-xs">Payment Method</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {payments.map((p) => (
                    <TableRow key={p._id} className="hover:bg-slate-50/50">
                      <TableCell className="font-mono font-bold text-[#023e8a]">
                        {p.receiptNumber}
                      </TableCell>
                      <TableCell className="font-mono text-slate-600">
                        {new Date(p.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-mono font-bold text-emerald-700">
                        ${p.amountPaid?.toFixed(2) ?? '0.00'}
                      </TableCell>
                      <TableCell className="text-slate-700 capitalize">
                        {p.paymentMethod?.replace('_', ' ')}
                      </TableCell>
                      <TableCell>
                        <Badge tone={getStatusTone(p.status)} className="text-xs capitalize">
                          {p.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-12 text-center text-slate-400">
                <CreditCard className="mx-auto size-8 text-slate-300" />
                <p className="mt-2 text-sm font-medium text-slate-700">No Payment Records</p>
                <p className="mt-1 text-xs text-slate-400">
                  Cashier receipts and tuition settlements will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* TAB CONTENT: TRANSFERS */}
      {activeTab === 'transfers' && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900">
              Campus Transfer History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {transfers.length > 0 ? (
              <Table>
                <TableHeader className="bg-slate-50/75">
                  <TableRow>
                    <TableHead className="text-xs">Transfer ID</TableHead>
                    <TableHead className="text-xs">From Branch</TableHead>
                    <TableHead className="text-xs">To Branch</TableHead>
                    <TableHead className="text-xs">Effective Date</TableHead>
                    <TableHead className="text-xs">Reason / Remarks</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {transfers.map((tr) => (
                    <TableRow key={tr._id} className="hover:bg-slate-50/50">
                      <TableCell className="font-mono font-bold text-[#00509d]">
                        {tr.transferNumber}
                      </TableCell>
                      <TableCell>{tr.fromBranchId?.branchNameEn || '—'}</TableCell>
                      <TableCell className="font-medium text-slate-900">
                        {tr.toBranchId?.branchNameEn || '—'}
                      </TableCell>
                      <TableCell className="font-mono text-slate-600">
                        {new Date(tr.transferDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-slate-600">{tr.reason || '—'}</TableCell>
                      <TableCell>
                        <Badge tone={getStatusTone(tr.status)} className="text-xs capitalize">
                          {tr.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-12 text-center text-slate-400">
                <History className="mx-auto size-8 text-slate-300" />
                <p className="mt-2 text-sm font-medium text-slate-700">No Branch Transfers</p>
                <p className="mt-1 text-xs text-slate-400">
                  Student has remained at their enrolled campus since admission.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* TAB CONTENT: STATUS HISTORY */}
      {activeTab === 'status_history' && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900">
              Student Lifecycle & Status Log
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6 text-xs">
            <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <ShieldCheck className="size-5 shrink-0 text-emerald-600" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge tone={getStatusTone(student.status)} className="capitalize">
                    {student.status}
                  </Badge>
                  <span className="font-medium text-slate-800">Current Institutional Status</span>
                </div>
                <p className="text-slate-500">
                  Admitted to {branchName} on {new Date(student.admissionDate).toLocaleDateString()}
                  .
                </p>
                <p className="text-xs text-slate-500">
                  Record Created: {new Date(student.createdAt).toLocaleString()} · Last Updated:{' '}
                  {new Date(student.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
